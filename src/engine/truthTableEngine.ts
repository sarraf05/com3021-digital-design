import { cloneNodesDeep, evaluateCircuit } from './circuitEngine';
import { getNodeMeta } from './componentCatalog';
import type {
  CircuitNode,
  CircuitWire,
  ComponentType,
  CustomICDefinition,
  LogicValue,
} from '../types/simulator';

export type TruthTableMode = 'simple' | 'canonical' | 'compressed' | 'sequential';

export type SequentialActionKind =
  | 'hold'
  | 'set'
  | 'reset'
  | 'toggle'
  | 'forbidden'
  | 'step'
  | 'unstable';

export interface InputSignalMeta {
  nodeId: string;
  label: string;
  currentVal: LogicValue;
}

export interface OutputSignalMeta {
  nodeId: string;
  label: string;
  kind: 'LED' | 'SEVEN_SEG';
  isActiveLow: boolean;
}

export interface StateSignalMeta {
  nodeId: string;
  label: string;
  nodeType: 'DFF' | 'JKFF' | 'TFF' | 'LATCH';
  compNodeId?: string;
  currentVal: LogicValue;
}

export interface CombinationalRow {
  index: number;
  inputBits: LogicValue[];
  outputValues: number[];
  matchesCanvas: boolean;
}

export interface FormulaSummary {
  nodeId: string;
  label: string;
  isActiveLow: boolean;
  minterms: number[];
  maxterms: number[];
  canonicalSop: string;
  canonicalPos: string;
  sopTerms: { idx: number; expr: string }[];
  posTerms: { idx: number; expr: string }[];
}

export interface CompressedRow {
  pattern: ('0' | '1' | 'X')[];
  outputValues: number[];
  coveredIndices: number[];
  matchesCanvas: boolean;
}

export interface SequentialTransitionRow {
  index: number;
  inputBits: LogicValue[];
  presentStateBits: LogicValue[];
  nextStateBits: (LogicValue | '?')[];
  outputValues: number[];
  action: SequentialActionKind;
  actionDetailTr: string;
  actionDetailEn: string;
  matchesCanvas: boolean;
}

export interface TruthTableAnalysis {
  recommendedMode: TruthTableMode;
  hasSequential: boolean;
  hasMsi: boolean;
  hasFeedbackLoop: boolean;
  inputSignals: InputSignalMeta[];
  extraHeldInputs: InputSignalMeta[];
  seqInputSignals: InputSignalMeta[];
  seqExtraHeldInputs: InputSignalMeta[];
  outputSignals: OutputSignalMeta[];
  stateSignals: StateSignalMeta[];
  extraHeldStates: StateSignalMeta[];
  combinationalTruncated: boolean;
  sequentialTruncated: boolean;
  combinationalRows: CombinationalRow[];
  formulas: FormulaSummary[];
  compressedRows: CompressedRow[];
  sequentialRows: SequentialTransitionRow[];
}

const MAX_VAR_COUNT = 6;
const MAX_LATCH_EVAL_STEPS = 12;

const MSI_COMPONENT_TYPES = new Set<ComponentType>([
  'IC_74155',
  'MUX_2X1',
  'MUX_4X1',
  'MUX_8X1',
  'DEMUX_1TO2',
  'DEMUX_1TO4',
  'DEMUX_1TO8',
  'DECODER_2TO4',
  'DECODER_3TO8',
  'ENCODER_4TO2',
  'ENCODER_8TO3',
  'PRIORITY_ENCODER_4TO2',
]);

const FF_TYPES = new Set<ComponentType>(['DFF', 'JKFF', 'TFF']);

const inv = (v: LogicValue): LogicValue => (v === 1 ? 0 : 1);

function sanitizeVarName(raw: string, fallbackIdx: number): string {
  const cleaned = raw.trim().replace(/\s+/g, '');
  return cleaned || `X${fallbackIdx}`;
}

function formatProductTerm(varNames: string[], bits: LogicValue[]): string {
  const useDot = varNames.some((v) => v.length > 1);
  const parts = varNames.map((v, i) => (bits[i] === 1 ? v : `${v}'`));
  return useDot ? parts.join('·') : parts.join('');
}

function formatSumTerm(varNames: string[], bits: LogicValue[]): string {
  const parts = varNames.map((v, i) => (bits[i] === 0 ? v : `${v}'`));
  return `(${parts.join(' + ')})`;
}

function hasSequentialNodeRecursive(
  nodes: CircuitNode[],
  customICs: CustomICDefinition[]
): boolean {
  for (const n of nodes) {
    if (n.type === 'CLOCK' || FF_TYPES.has(n.type)) return true;
    if (n.type === 'CUSTOM_IC') {
      const bp = n.customIcId ? customICs.find((c) => c.id === n.customIcId) : undefined;
      const sub = n.internal.subcircuitNodes ?? bp?.internalNodes ?? [];
      if (sub.length > 0 && hasSequentialNodeRecursive(sub, customICs)) {
        return true;
      }
    }
  }
  return false;
}

function findFeedbackCycleNodes(
  nodes: CircuitNode[],
  wires: CircuitWire[]
): Set<string> {
  const nodeById = new Map<string, CircuitNode>();
  nodes.forEach((n) => nodeById.set(n.id, n));

  const adj = new Map<string, string[]>();
  for (const n of nodes) {
    adj.set(n.id, []);
  }

  for (const w of wires) {
    const src = nodeById.get(w.fromNodeId);
    const dst = nodeById.get(w.toNodeId);
    if (!src || !dst) continue;
    // Synchronous FFs break combinational feedback loops cleanly
    if (FF_TYPES.has(src.type) || FF_TYPES.has(dst.type)) continue;
    if (
      src.type === 'SWITCH' ||
      src.type === 'BUTTON' ||
      src.type === 'CLOCK' ||
      dst.type === 'LED' ||
      dst.type === 'SEVEN_SEG'
    ) {
      continue;
    }
    adj.get(src.id)?.push(dst.id);
  }

  const state = new Map<string, 0 | 1 | 2>(); // 0 unvisited, 1 visiting, 2 visited
  const stack: string[] = [];
  const cycleNodeIds = new Set<string>();

  const dfs = (u: string) => {
    state.set(u, 1);
    stack.push(u);
    for (const v of adj.get(u) ?? []) {
      const st = state.get(v) ?? 0;
      if (st === 0) {
        dfs(v);
      } else if (st === 1) {
        const idx = stack.lastIndexOf(v);
        if (idx !== -1) {
          for (let i = idx; i < stack.length; i++) {
            cycleNodeIds.add(stack[i]);
          }
        }
      }
    }
    stack.pop();
    state.set(u, 2);
  };

  for (const n of nodes) {
    if ((state.get(n.id) ?? 0) === 0) {
      dfs(n.id);
    }
  }

  return cycleNodeIds;
}

function detectActiveLowOutput(
  outNode: CircuitNode,
  nodes: CircuitNode[],
  wires: CircuitWire[],
  customICs: CustomICDefinition[]
): boolean {
  if (outNode.type !== 'LED') return false;
  const label = outNode.label.trim();
  if (/('|_L|_N|BAR)$/i.test(label) || /^[~/]/.test(label)) {
    return true;
  }

  const incoming = wires.find((w) => w.toNodeId === outNode.id && w.toPinId === 'in');
  if (!incoming) return false;
  if (incoming.fromPinId === 'qn') return true;

  const srcNode = nodes.find((n) => n.id === incoming.fromNodeId);
  if (!srcNode) return false;
  const meta = getNodeMeta(srcNode, customICs);
  const srcPin = meta.pins.find((p) => p.id === incoming.fromPinId);
  return Boolean(srcPin?.inverted);
}

function readOutputValue(node: CircuitNode): number {
  if (node.type === 'SEVEN_SEG') {
    return (
      ((node.inputs.b3 ?? 0) << 3) |
      ((node.inputs.b2 ?? 0) << 2) |
      ((node.inputs.b1 ?? 0) << 1) |
      (node.inputs.b0 ?? 0)
    );
  }
  return node.inputs.in ?? 0;
}

interface Cube {
  bits: ('0' | '1' | 'X')[];
  covered: Set<number>;
}

function mergeTwoCubes(a: Cube, b: Cube): Cube | null {
  let diffIdx = -1;
  for (let i = 0; i < a.bits.length; i++) {
    const ca = a.bits[i];
    const cb = b.bits[i];
    if (ca === cb) continue;
    if ((ca === '0' && cb === '1') || (ca === '1' && cb === '0')) {
      if (diffIdx !== -1) return null;
      diffIdx = i;
    } else {
      return null;
    }
  }
  if (diffIdx === -1) return null;
  const nextBits = [...a.bits];
  nextBits[diffIdx] = 'X';
  const nextCovered = new Set<number>(a.covered);
  b.covered.forEach((idx) => nextCovered.add(idx));
  return { bits: nextBits, covered: nextCovered };
}

function compressOutputGroup(
  rows: CombinationalRow[],
  varCount: number
): Omit<CompressedRow, 'matchesCanvas'>[] {
  if (rows.length === 0) return [];
  const outputValues = rows[0].outputValues;

  if (varCount === 0) {
    return [
      {
        pattern: [],
        outputValues,
        coveredIndices: rows.map((r) => r.index),
      },
    ];
  }

  let currentCubes: Cube[] = rows.map((r) => ({
    bits: r.inputBits.map((b) => (b === 1 ? '1' : '0')),
    covered: new Set([r.index]),
  }));

  const primeImplicants = new Map<string, Cube>();

  // Quine-McCluskey iterative pair merging (max 6 vars -> <= 64 rows, runs in <1ms)
  for (let round = 0; round < varCount; round++) {
    const used = new Array<boolean>(currentCubes.length).fill(false);
    const nextMap = new Map<string, Cube>();

    for (let i = 0; i < currentCubes.length; i++) {
      for (let j = i + 1; j < currentCubes.length; j++) {
        const merged = mergeTwoCubes(currentCubes[i], currentCubes[j]);
        if (merged) {
          used[i] = true;
          used[j] = true;
          const key = merged.bits.join('');
          const existing = nextMap.get(key);
          if (existing) {
            merged.covered.forEach((idx) => existing.covered.add(idx));
          } else {
            nextMap.set(key, merged);
          }
        }
      }
    }

    for (let i = 0; i < currentCubes.length; i++) {
      if (!used[i]) {
        const key = currentCubes[i].bits.join('');
        if (!primeImplicants.has(key)) {
          primeImplicants.set(key, currentCubes[i]);
        }
      }
    }

    if (nextMap.size === 0) break;
    currentCubes = Array.from(nextMap.values());
    if (round === varCount - 1) {
      for (const cube of currentCubes) {
        const key = cube.bits.join('');
        if (!primeImplicants.has(key)) {
          primeImplicants.set(key, cube);
        }
      }
    }
  }

  const allPrimes = Array.from(primeImplicants.values());
  const uncovered = new Set<number>(rows.map((r) => r.index));
  const selected: Cube[] = [];

  // 1. Pick Essential Prime Implicants first
  for (const rowIdx of Array.from(uncovered)) {
    const owners = allPrimes.filter((c) => c.covered.has(rowIdx));
    if (owners.length === 1 && !selected.includes(owners[0])) {
      selected.push(owners[0]);
      owners[0].covered.forEach((id) => uncovered.delete(id));
    }
  }

  // 2. Greedy cover for remaining minterms (preferring more X's and cleaner masks)
  while (uncovered.size > 0) {
    let bestCube: Cube | null = null;
    let bestGain = -1;
    let bestXCount = -1;

    for (const cube of allPrimes) {
      if (selected.includes(cube)) continue;
      let gain = 0;
      cube.covered.forEach((id) => {
        if (uncovered.has(id)) gain++;
      });
      const xCount = cube.bits.filter((b) => b === 'X').length;
      if (gain > bestGain || (gain === bestGain && xCount > bestXCount)) {
        bestCube = cube;
        bestGain = gain;
        bestXCount = xCount;
      }
    }

    if (!bestCube || bestGain <= 0) break;
    selected.push(bestCube);
    bestCube.covered.forEach((id) => uncovered.delete(id));
  }

  return selected.map((c) => ({
    pattern: c.bits,
    outputValues,
    coveredIndices: Array.from(c.covered).sort((a, b) => a - b),
  }));
}

function compareCompressedPatterns(
  a: ('0' | '1' | 'X')[],
  b: ('0' | '1' | 'X')[]
): number {
  const rank = (ch: '0' | '1' | 'X') => (ch === '0' ? 0 : ch === '1' ? 1 : 2);
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const diff = rank(a[i]) - rank(b[i]);
    if (diff !== 0) return diff;
  }
  return a.length - b.length;
}

export function doesPatternMatchInputs(
  pattern: ('0' | '1' | 'X')[],
  currentBits: LogicValue[]
): boolean {
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === 'X') continue;
    if (Number(pattern[i]) !== currentBits[i]) return false;
  }
  return true;
}

function discoverLatchStateSignals(
  nodes: CircuitNode[],
  wires: CircuitWire[],
  cycleNodeIds: Set<string>
): StateSignalMeta[] {
  if (cycleNodeIds.size === 0) return [];

  const cycleNodes = nodes
    .filter((n) => cycleNodeIds.has(n.id))
    .sort((a, b) => a.y - b.y || a.x - b.x);
  if (cycleNodes.length === 0) return [];

  // Prefer a cycle node directly feeding an LED labeled Q (not Q'/Qn)
  let primaryQNode: CircuitNode | undefined;
  for (const w of wires) {
    if (!cycleNodeIds.has(w.fromNodeId)) continue;
    const dst = nodes.find((n) => n.id === w.toNodeId && n.type === 'LED');
    if (dst) {
      const lbl = dst.label.trim().toUpperCase();
      if (lbl === 'Q' || (lbl.startsWith('Q') && !lbl.includes("'") && lbl !== 'QN')) {
        primaryQNode = nodes.find((n) => n.id === w.fromNodeId);
        break;
      }
    }
  }
  if (!primaryQNode) {
    primaryQNode = cycleNodes[0];
  }

  // Find cross-coupled complement node if present
  const primaryId = primaryQNode.id;
  const compCandidate = cycleNodes.find((n) => {
    if (n.id === primaryId) return false;
    const feedsPrimary = wires.some((w) => w.fromNodeId === n.id && w.toNodeId === primaryId);
    const fedByPrimary = wires.some((w) => w.fromNodeId === primaryId && w.toNodeId === n.id);
    return feedsPrimary && fedByPrimary;
  });

  return [
    {
      nodeId: primaryQNode.id,
      label: 'Q',
      nodeType: 'LATCH',
      compNodeId: compCandidate?.id,
      currentVal: primaryQNode.outputs.out ?? 0,
    },
  ];
}

function evaluateLatchStepWithBound(
  baseNodes: CircuitNode[],
  wires: CircuitWire[],
  customICs: CustomICDefinition[],
  stateMeta: StateSignalMeta,
  qInit: LogicValue
): {
  nextQ: LogicValue | '?';
  isForbidden: boolean;
  evaluatedNodes: CircuitNode[];
} {
  let working = cloneNodesDeep(baseNodes).map((n) => {
    if (n.id === stateMeta.nodeId) {
      return { ...n, outputs: { ...n.outputs, out: qInit } };
    }
    if (stateMeta.compNodeId && n.id === stateMeta.compNodeId) {
      return { ...n, outputs: { ...n.outputs, out: inv(qInit) } };
    }
    return n;
  });

  const nodeMap = new Map<string, CircuitNode>();
  working.forEach((n) => nodeMap.set(n.id, n));

  let prevQVal: LogicValue = qInit;
  let lastQVal: LogicValue = qInit;
  let stabilized = false;

  // Bounded relaxation steps to detect stability vs oscillation cleanly
  for (let step = 0; step < MAX_LATCH_EVAL_STEPS; step++) {
    const nextNodes = evaluateCircuit(working, wires, false, customICs);
    const qNode = nextNodes.find((n) => n.id === stateMeta.nodeId);
    const curQ: LogicValue = qNode?.outputs.out ?? 0;

    if (step > 0 && curQ === lastQVal) {
      // Confirm 1 extra step to rule out 2-step oscillation
      const confirmNodes = evaluateCircuit(nextNodes, wires, false, customICs);
      const confirmQ = confirmNodes.find((n) => n.id === stateMeta.nodeId)?.outputs.out ?? 0;
      working = confirmNodes;
      prevQVal = lastQVal;
      lastQVal = confirmQ;
      if (confirmQ === curQ) {
        stabilized = true;
        break;
      }
    } else {
      working = nextNodes;
      prevQVal = lastQVal;
      lastQVal = curQ;
    }
  }

  const finalQ = working.find((n) => n.id === stateMeta.nodeId)?.outputs.out ?? 0;
  const finalComp = stateMeta.compNodeId
    ? working.find((n) => n.id === stateMeta.compNodeId)?.outputs.out
    : undefined;

  const oscillating = !stabilized && prevQVal !== finalQ;
  const isForbidden =
    finalComp !== undefined && finalQ === finalComp;

  return {
    nextQ: oscillating ? '?' : finalQ,
    isForbidden,
    evaluatedNodes: working,
  };
}

export function analyzeCircuitTruthTable(
  nodes: CircuitNode[],
  wires: CircuitWire[],
  customICs: CustomICDefinition[] = []
): TruthTableAnalysis {
  const inputNodes = nodes
    .filter((n) => n.type === 'SWITCH' || n.type === 'BUTTON')
    .sort((a, b) => a.y - b.y || a.x - b.x);

  const outputNodes = nodes
    .filter((n) => n.type === 'LED' || n.type === 'SEVEN_SEG')
    .sort((a, b) => a.y - b.y || a.x - b.x);

  const inputSignals: InputSignalMeta[] = inputNodes.map((n, idx) => ({
    nodeId: n.id,
    label: n.label.trim() || `IN${idx}`,
    currentVal: n.outputs.out ?? 0,
  }));

  const outputSignals: OutputSignalMeta[] = outputNodes.map((n, idx) => ({
    nodeId: n.id,
    label: n.label.trim() || (n.type === 'SEVEN_SEG' ? `HEX${idx}` : `OUT${idx}`),
    kind: n.type === 'SEVEN_SEG' ? 'SEVEN_SEG' : 'LED',
    isActiveLow: detectActiveLowOutput(n, nodes, wires, customICs),
  }));

  const ffNodes = nodes
    .filter((n) => FF_TYPES.has(n.type))
    .sort((a, b) => a.y - b.y || a.x - b.x);

  const cycleNodes = findFeedbackCycleNodes(nodes, wires);
  const hasFeedbackLoop = cycleNodes.size > 0;
  const hasSequential =
    ffNodes.length > 0 ||
    hasFeedbackLoop ||
    hasSequentialNodeRecursive(nodes, customICs);
  const hasMsi = nodes.some((n) => MSI_COMPONENT_TYPES.has(n.type));

  const recommendedMode: TruthTableMode = hasSequential
    ? 'sequential'
    : hasMsi
      ? 'compressed'
      : 'simple';

  // --- Combinational Truth Table (max 6 inputs -> 64 rows) ---
  const activeCombInputs = inputSignals.slice(0, MAX_VAR_COUNT);
  const extraHeldInputs = inputSignals.slice(MAX_VAR_COUNT);
  const combinationalTruncated = inputSignals.length > MAX_VAR_COUNT;

  const combInputCount = activeCombInputs.length;
  const combRowCount = 1 << combInputCount;
  const currentCombBits: LogicValue[] = activeCombInputs.map((s) => s.currentVal);

  const combinationalRows: CombinationalRow[] = [];

  if (outputSignals.length > 0 && (combInputCount > 0 || nodes.length > 0)) {
    const activeIdToIndex = new Map<string, number>();
    activeCombInputs.forEach((s, idx) => activeIdToIndex.set(s.nodeId, idx));

    for (let r = 0; r < combRowCount; r++) {
      const bits: LogicValue[] = activeCombInputs.map((_, bitIdx) =>
        ((r >> (combInputCount - 1 - bitIdx)) & 1) === 1 ? 1 : 0
      );

      const testNodes = cloneNodesDeep(nodes).map((n) => {
        const idx = activeIdToIndex.get(n.id);
        if (idx !== undefined) {
          return { ...n, outputs: { ...n.outputs, out: bits[idx] } };
        }
        return n;
      });

      const evaluated = evaluateCircuit(testNodes, wires, false, customICs);
      const evalById = new Map<string, CircuitNode>();
      evaluated.forEach((n) => evalById.set(n.id, n));

      const outVals = outputSignals.map((sig) => {
        const outN = evalById.get(sig.nodeId);
        return outN ? readOutputValue(outN) : 0;
      });

      const matchesCanvas = bits.every((b, idx) => b === currentCombBits[idx]);
      combinationalRows.push({
        index: r,
        inputBits: bits,
        outputValues: outVals,
        matchesCanvas,
      });
    }
  }

  // --- Canonical SOP & POS Formulas (for 1-bit LED outputs) ---
  const sanitizedInputVars = activeCombInputs.map((s, idx) =>
    sanitizeVarName(s.label, idx)
  );
  const formulas: FormulaSummary[] = [];

  if (combinationalRows.length > 0) {
    outputSignals.forEach((sig, outIdx) => {
      if (sig.kind !== 'LED') return;
      const minterms: number[] = [];
      const maxterms: number[] = [];
      const sopTerms: { idx: number; expr: string }[] = [];
      const posTerms: { idx: number; expr: string }[] = [];

      for (const row of combinationalRows) {
        const val = row.outputValues[outIdx] ?? 0;
        if (val === 1) {
          minterms.push(row.index);
          sopTerms.push({
            idx: row.index,
            expr:
              sanitizedInputVars.length > 0
                ? formatProductTerm(sanitizedInputVars, row.inputBits)
                : '1',
          });
        } else {
          maxterms.push(row.index);
          posTerms.push({
            idx: row.index,
            expr:
              sanitizedInputVars.length > 0
                ? formatSumTerm(sanitizedInputVars, row.inputBits)
                : '0',
          });
        }
      }

      const canonicalSop =
        sopTerms.length === 0
          ? '0'
          : sopTerms.length === combinationalRows.length
            ? '1'
            : sopTerms.map((t) => t.expr).join(' + ');

      const canonicalPos =
        posTerms.length === 0
          ? '1'
          : posTerms.length === combinationalRows.length
            ? '0'
            : posTerms.map((t) => t.expr).join('');

      formulas.push({
        nodeId: sig.nodeId,
        label: sig.label,
        isActiveLow: sig.isActiveLow,
        minterms,
        maxterms,
        canonicalSop,
        canonicalPos,
        sopTerms,
        posTerms,
      });
    });
  }

  // --- Compressed Datasheet Rows (Don't Care X reduction) ---
  const compressedRows: CompressedRow[] = [];
  if (combinationalRows.length > 0 && outputSignals.length > 0) {
    const groups = new Map<string, CombinationalRow[]>();
    for (const row of combinationalRows) {
      const key = row.outputValues.join(',');
      const list = groups.get(key);
      if (list) list.push(row);
      else groups.set(key, [row]);
    }

    const rawCompressed: Omit<CompressedRow, 'matchesCanvas'>[] = [];
    for (const groupRows of groups.values()) {
      rawCompressed.push(...compressOutputGroup(groupRows, combInputCount));
    }

    rawCompressed.sort((a, b) => compareCompressedPatterns(a.pattern, b.pattern));
    for (const cr of rawCompressed) {
      compressedRows.push({
        ...cr,
        matchesCanvas: doesPatternMatchInputs(cr.pattern, currentCombBits),
      });
    }
  }

  // --- Sequential State-Transition Table (Q(t) -> Q(t+1)) ---
  let rawStateSignals: StateSignalMeta[] = [];
  if (ffNodes.length > 0) {
    rawStateSignals = ffNodes.map((ff, idx) => {
      const lbl = ff.label.trim();
      const displayLabel =
        lbl && lbl !== 'D-FF' && lbl !== 'JK-FF' && lbl !== 'T-FF'
          ? lbl.startsWith('Q')
            ? lbl
            : `Q_${lbl}`
          : ffNodes.length === 1
            ? 'Q'
            : `Q${idx}`;
      return {
        nodeId: ff.id,
        label: displayLabel,
        nodeType: ff.type as 'DFF' | 'JKFF' | 'TFF',
        currentVal: ff.internal.q ?? ff.outputs.q ?? 0,
      };
    });
  } else if (hasFeedbackLoop) {
    rawStateSignals = discoverLatchStateSignals(nodes, wires, cycleNodes);
  }

  const activeSeqStates = rawStateSignals.slice(0, MAX_VAR_COUNT);
  const extraHeldStates = rawStateSignals.slice(MAX_VAR_COUNT);
  const seqInputBudget = Math.max(0, MAX_VAR_COUNT - activeSeqStates.length);
  const activeSeqInputs = inputSignals.slice(0, seqInputBudget);
  const seqExtraHeldInputs = inputSignals.slice(seqInputBudget);
  const sequentialTruncated =
    rawStateSignals.length > MAX_VAR_COUNT ||
    inputSignals.length > seqInputBudget;

  const sequentialRows: SequentialTransitionRow[] = [];

  if (activeSeqStates.length > 0) {
    const seqInputCount = activeSeqInputs.length;
    const seqStateCount = activeSeqStates.length;
    const totalSeqVars = seqInputCount + seqStateCount;
    const seqRowCount = 1 << totalSeqVars;

    const seqInputMap = new Map<string, number>();
    activeSeqInputs.forEach((s, idx) => seqInputMap.set(s.nodeId, idx));
    const seqStateMap = new Map<string, number>();
    activeSeqStates.forEach((s, idx) => seqStateMap.set(s.nodeId, idx));

    const currentSeqInputBits = activeSeqInputs.map((s) => s.currentVal);
    const currentSeqStateBits = activeSeqStates.map((s) => s.currentVal);

    if (ffNodes.length > 0) {
      const hasClockNode = nodes.some((n) => n.type === 'CLOCK');

      for (let r = 0; r < seqRowCount; r++) {
        const inputBits: LogicValue[] = [];
        for (let b = 0; b < seqInputCount; b++) {
          const shift = totalSeqVars - 1 - b;
          inputBits.push(((r >> shift) & 1) === 1 ? 1 : 0);
        }
        const presentStateBits: LogicValue[] = [];
        for (let s = 0; s < seqStateCount; s++) {
          const shift = seqStateCount - 1 - s;
          presentStateBits.push(((r >> shift) & 1) === 1 ? 1 : 0);
        }

        // Step 1: Set inputs, set CLOCK = 0, initialize Q(t) & prevClk = 0
        let simNodes = cloneNodesDeep(nodes).map((n) => {
          const inIdx = seqInputMap.get(n.id);
          if (inIdx !== undefined) {
            return { ...n, outputs: { ...n.outputs, out: inputBits[inIdx] } };
          }
          if (n.type === 'CLOCK') {
            return { ...n, outputs: { ...n.outputs, out: 0 as LogicValue } };
          }
          const stIdx = seqStateMap.get(n.id);
          if (stIdx !== undefined) {
            const qVal = presentStateBits[stIdx];
            return {
              ...n,
              outputs: { ...n.outputs, q: qVal, qn: inv(qVal) },
              internal: { ...n.internal, q: qVal, prevClk: 0 as LogicValue },
            };
          }
          return n;
        });

        // Settle combinational logic before clock edge while keeping FF states at Q(t)
        simNodes = evaluateCircuit(simNodes, wires, false, customICs);

        // Capture FF inputs pre-edge for accurate classification
        const preEdgeInputsById = new Map<string, Record<string, LogicValue>>();
        simNodes.forEach((n) => {
          if (FF_TYPES.has(n.type)) {
            preEdgeInputsById.set(n.id, { ...n.inputs });
          }
        });

        // Step 2: Apply rising edge CLK: 0 -> 1
        if (hasClockNode) {
          simNodes = simNodes.map((n) =>
            n.type === 'CLOCK'
              ? { ...n, outputs: { ...n.outputs, out: 1 as LogicValue } }
              : n
          );
        }

        // Trigger sequential edge (up to seqStateCount passes safely handles ripple counters)
        for (let pass = 0; pass < Math.max(1, seqStateCount); pass++) {
          simNodes = evaluateCircuit(simNodes, wires, true, customICs);
        }

        const evalById = new Map<string, CircuitNode>();
        simNodes.forEach((n) => evalById.set(n.id, n));

        const nextStateBits: LogicValue[] = activeSeqStates.map((st) => {
          const fn = evalById.get(st.nodeId);
          return fn?.internal.q ?? fn?.outputs.q ?? st.currentVal;
        });

        const outVals = outputSignals.map((sig) => {
          const outN = evalById.get(sig.nodeId);
          return outN ? readOutputValue(outN) : 0;
        });

        // Classify Transition Action
        let action: SequentialActionKind = 'hold';
        let actionDetailTr = 'Koruma';
        let actionDetailEn = 'Hold';

        if (seqStateCount === 1) {
          const st = activeSeqStates[0];
          const q0 = presentStateBits[0];
          const q1 = nextStateBits[0];
          const ffIn = preEdgeInputsById.get(st.nodeId) ?? {};

          if (
            (st.nodeType === 'TFF' && (ffIn.t ?? 0) === 1) ||
            (st.nodeType === 'JKFF' && (ffIn.j ?? 0) === 1 && (ffIn.k ?? 0) === 1)
          ) {
            action = 'toggle';
            actionDetailTr = `Tümleme (${q0}→${q1})`;
            actionDetailEn = `Toggle (${q0}→${q1})`;
          } else if (q0 === q1) {
            if (st.nodeType === 'JKFF' && (ffIn.j ?? 0) === 0 && (ffIn.k ?? 0) === 1) {
              action = 'reset';
              actionDetailTr = 'Reset (0)';
              actionDetailEn = 'Reset (0)';
            } else if (
              st.nodeType === 'JKFF' &&
              (ffIn.j ?? 0) === 1 &&
              (ffIn.k ?? 0) === 0
            ) {
              action = 'set';
              actionDetailTr = 'Set (1)';
              actionDetailEn = 'Set (1)';
            } else {
              action = 'hold';
              actionDetailTr = `Koruma (${q0})`;
              actionDetailEn = `Hold (${q0})`;
            }
          } else if (q1 === 1) {
            action = 'set';
            actionDetailTr = 'Set (1)';
            actionDetailEn = 'Set (1)';
          } else {
            action = 'reset';
            actionDetailTr = 'Reset (0)';
            actionDetailEn = 'Reset (0)';
          }
        } else {
          const allUnchanged = presentStateBits.every((q, i) => q === nextStateBits[i]);
          const allChanged = presentStateBits.every((q, i) => q !== nextStateBits[i]);
          const allZero = nextStateBits.every((q) => q === 0);
          const allOne = nextStateBits.every((q) => q === 1);

          if (allUnchanged) {
            action = 'hold';
            actionDetailTr = 'Koruma (Hold)';
            actionDetailEn = 'Hold';
          } else if (allChanged && allZero) {
            action = 'reset';
            actionDetailTr = 'Reset (0)';
            actionDetailEn = 'Reset (0)';
          } else if (allChanged && allOne) {
            action = 'set';
            actionDetailTr = 'Set (1)';
            actionDetailEn = 'Set (1)';
          } else if (allChanged) {
            action = 'toggle';
            actionDetailTr = 'Tümleme (Toggle)';
            actionDetailEn = 'Toggle';
          } else {
            action = 'step';
            const fromStr = presentStateBits.join('');
            const toStr = nextStateBits.join('');
            actionDetailTr = `Geçiş (${fromStr}→${toStr})`;
            actionDetailEn = `Step (${fromStr}→${toStr})`;
          }
        }

        const matchesCanvas =
          inputBits.every((b, idx) => b === currentSeqInputBits[idx]) &&
          presentStateBits.every((q, idx) => q === currentSeqStateBits[idx]);

        sequentialRows.push({
          index: r,
          inputBits,
          presentStateBits,
          nextStateBits,
          outputValues: outVals,
          action,
          actionDetailTr,
          actionDetailEn,
          matchesCanvas,
        });
      }
    } else if (hasFeedbackLoop && activeSeqStates.length === 1) {
      // Combinational feedback latch (SR Latch / D Latch)
      const latchMeta = activeSeqStates[0];

      for (let r = 0; r < seqRowCount; r++) {
        const inputBits: LogicValue[] = [];
        for (let b = 0; b < seqInputCount; b++) {
          const shift = seqRowCount > 1 ? totalSeqVars - 1 - b : 0;
          inputBits.push(((r >> shift) & 1) === 1 ? 1 : 0);
        }
        const qInit: LogicValue = (r & 1) === 1 ? 1 : 0;

        const baseNodes = cloneNodesDeep(nodes).map((n) => {
          const inIdx = seqInputMap.get(n.id);
          if (inIdx !== undefined) {
            return { ...n, outputs: { ...n.outputs, out: inputBits[inIdx] } };
          }
          return n;
        });

        const { nextQ, isForbidden, evaluatedNodes } = evaluateLatchStepWithBound(
          baseNodes,
          wires,
          customICs,
          latchMeta,
          qInit
        );

        const evalById = new Map<string, CircuitNode>();
        evaluatedNodes.forEach((n) => evalById.set(n.id, n));

        const outVals = outputSignals.map((sig) => {
          const outN = evalById.get(sig.nodeId);
          return outN ? readOutputValue(outN) : 0;
        });

        let action: SequentialActionKind;
        let actionDetailTr: string;
        let actionDetailEn: string;

        if (nextQ === '?') {
          action = 'unstable';
          actionDetailTr = 'Kararsız / Salınım';
          actionDetailEn = 'Oscillating';
        } else if (isForbidden) {
          action = 'forbidden';
          actionDetailTr = 'Yasak (Q = Q\')';
          actionDetailEn = 'Forbidden (Q = Q\')';
        } else if (nextQ === qInit) {
          action = 'hold';
          actionDetailTr = `Koruma (${qInit})`;
          actionDetailEn = `Hold (${qInit})`;
        } else if (nextQ === 1) {
          action = 'set';
          actionDetailTr = 'Set (1)';
          actionDetailEn = 'Set (1)';
        } else {
          action = 'reset';
          actionDetailTr = 'Reset (0)';
          actionDetailEn = 'Reset (0)';
        }

        const matchesCanvas =
          inputBits.every((b, idx) => b === currentSeqInputBits[idx]) &&
          qInit === currentSeqStateBits[0];

        sequentialRows.push({
          index: r,
          inputBits,
          presentStateBits: [qInit],
          nextStateBits: [nextQ],
          outputValues: outVals,
          action,
          actionDetailTr,
          actionDetailEn,
          matchesCanvas,
        });
      }
    }
  }

  return {
    recommendedMode,
    hasSequential,
    hasMsi,
    hasFeedbackLoop,
    inputSignals: activeCombInputs,
    extraHeldInputs,
    seqInputSignals: activeSeqInputs,
    seqExtraHeldInputs,
    outputSignals,
    stateSignals: activeSeqStates,
    extraHeldStates,
    combinationalTruncated,
    sequentialTruncated,
    combinationalRows,
    formulas,
    compressedRows,
    sequentialRows,
  };
}
