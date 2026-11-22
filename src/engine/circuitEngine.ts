import type {
  CircuitChallengeConfig,
  CircuitNode,
  CircuitWire,
  LogicValue,
  VerificationResult,
  VerificationRowResult,
} from '../types/simulator';

const inv = (v: LogicValue): LogicValue => (v === 1 ? 0 : 1);

function evaluateCombinationalNode(node: CircuitNode): Record<string, LogicValue> {
  const i = node.inputs;
  switch (node.type) {
    case 'SWITCH':
    case 'BUTTON':
    case 'CLOCK':
      return { out: node.outputs.out ?? 0 };
    case 'LED':
    case 'SEVEN_SEG':
      return {};
    case 'AND':
      return { out: (i.a ?? 0) & (i.b ?? 0) ? 1 : 0 };
    case 'OR':
      return { out: (i.a ?? 0) | (i.b ?? 0) ? 1 : 0 };
    case 'NOT':
      return { out: inv(i.a ?? 0) };
    case 'NAND':
      return { out: (i.a ?? 0) & (i.b ?? 0) ? 0 : 1 };
    case 'NOR':
      return { out: (i.a ?? 0) | (i.b ?? 0) ? 0 : 1 };
    case 'XOR':
      return { out: (i.a ?? 0) !== (i.b ?? 0) ? 1 : 0 };
    case 'XNOR':
      return { out: (i.a ?? 0) === (i.b ?? 0) ? 1 : 0 };
    case 'AND3':
      return { out: (i.a ?? 0) & (i.b ?? 0) & (i.c ?? 0) ? 1 : 0 };
    case 'OR3':
      return { out: (i.a ?? 0) | (i.b ?? 0) | (i.c ?? 0) ? 1 : 0 };
    case 'NAND3':
      return { out: (i.a ?? 0) & (i.b ?? 0) & (i.c ?? 0) ? 0 : 1 };
    case 'NOR3':
      return { out: (i.a ?? 0) | (i.b ?? 0) | (i.c ?? 0) ? 0 : 1 };
    case 'XOR3':
      return { out: ((i.a ?? 0) ^ (i.b ?? 0) ^ (i.c ?? 0)) === 1 ? 1 : 0 };
    case 'XNOR3':
      return { out: ((i.a ?? 0) ^ (i.b ?? 0) ^ (i.c ?? 0)) === 0 ? 1 : 0 };
    case 'HALF_ADDER': {
      const a = i.a ?? 0;
      const b = i.b ?? 0;
      return {
        s: a !== b ? 1 : 0,
        c: a & b ? 1 : 0,
      };
    }
    case 'FULL_ADDER': {
      const a = i.a ?? 0;
      const b = i.b ?? 0;
      const cin = i.cin ?? 0;
      const sum = a + b + cin;
      return {
        s: sum % 2 === 1 ? 1 : 0,
        cout: sum >= 2 ? 1 : 0,
      };
    }
    case 'COMPARATOR_2BIT': {
      const valA = ((i.a1 ?? 0) << 1) | (i.a0 ?? 0);
      const valB = ((i.b1 ?? 0) << 1) | (i.b0 ?? 0);
      return {
        gt: valA > valB ? 1 : 0,
        eq: valA === valB ? 1 : 0,
        lt: valA < valB ? 1 : 0,
      };
    }
    case 'MUX_2X1': {
      const s0 = i.s0 ?? i.s ?? 0;
      return { y: s0 === 0 ? (i.i0 ?? 0) : (i.i1 ?? 0) };
    }
    case 'MUX_4X1': {
      const idx = ((i.s1 ?? 0) << 1) | (i.s0 ?? 0);
      const map = [i.i0 ?? 0, i.i1 ?? 0, i.i2 ?? 0, i.i3 ?? 0];
      return { y: map[idx] };
    }
    case 'MUX_8X1': {
      const idx = ((i.s2 ?? 0) << 2) | ((i.s1 ?? 0) << 1) | (i.s0 ?? 0);
      const map = [
        i.i0 ?? 0,
        i.i1 ?? 0,
        i.i2 ?? 0,
        i.i3 ?? 0,
        i.i4 ?? 0,
        i.i5 ?? 0,
        i.i6 ?? 0,
        i.i7 ?? 0,
      ];
      return { y: map[idx] };
    }
    case 'DEMUX_1TO2': {
      const d = i.d ?? 0;
      const s0 = i.s0 ?? 0;
      return {
        y0: s0 === 0 ? d : 0,
        y1: s0 === 1 ? d : 0,
      };
    }
    case 'DEMUX_1TO4': {
      const d = i.d ?? 0;
      const idx = ((i.s1 ?? 0) << 1) | (i.s0 ?? 0);
      return {
        y0: idx === 0 ? d : 0,
        y1: idx === 1 ? d : 0,
        y2: idx === 2 ? d : 0,
        y3: idx === 3 ? d : 0,
      };
    }
    case 'DEMUX_1TO8': {
      const d = i.d ?? 0;
      const idx = ((i.s2 ?? 0) << 2) | ((i.s1 ?? 0) << 1) | (i.s0 ?? 0);
      return {
        y0: idx === 0 ? d : 0,
        y1: idx === 1 ? d : 0,
        y2: idx === 2 ? d : 0,
        y3: idx === 3 ? d : 0,
        y4: idx === 4 ? d : 0,
        y5: idx === 5 ? d : 0,
        y6: idx === 6 ? d : 0,
        y7: idx === 7 ? d : 0,
      };
    }
    case 'DECODER_2TO4': {
      const e = i.e ?? 1;
      if (e === 0) {
        return { d0: 0, d1: 0, d2: 0, d3: 0 };
      }
      const idx = ((i.a1 ?? 0) << 1) | (i.a0 ?? 0);
      return {
        d0: idx === 0 ? 1 : 0,
        d1: idx === 1 ? 1 : 0,
        d2: idx === 2 ? 1 : 0,
        d3: idx === 3 ? 1 : 0,
      };
    }
    case 'DECODER_3TO8': {
      const e = i.e ?? 1;
      if (e === 0) {
        return { d0: 0, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0 };
      }
      const idx = ((i.a2 ?? 0) << 2) | ((i.a1 ?? 0) << 1) | (i.a0 ?? 0);
      return {
        d0: idx === 0 ? 1 : 0,
        d1: idx === 1 ? 1 : 0,
        d2: idx === 2 ? 1 : 0,
        d3: idx === 3 ? 1 : 0,
        d4: idx === 4 ? 1 : 0,
        d5: idx === 5 ? 1 : 0,
        d6: idx === 6 ? 1 : 0,
        d7: idx === 7 ? 1 : 0,
      };
    }
    case 'ENCODER_4TO2': {
      const d1 = i.d1 ?? 0;
      const d2 = i.d2 ?? 0;
      const d3 = i.d3 ?? 0;
      return {
        a1: (d2 | d3) ? 1 : 0,
        a0: (d1 | d3) ? 1 : 0,
      };
    }
    case 'ENCODER_8TO3': {
      const d1 = i.d1 ?? 0;
      const d2 = i.d2 ?? 0;
      const d3 = i.d3 ?? 0;
      const d4 = i.d4 ?? 0;
      const d5 = i.d5 ?? 0;
      const d6 = i.d6 ?? 0;
      const d7 = i.d7 ?? 0;
      return {
        a2: (d4 | d5 | d6 | d7) ? 1 : 0,
        a1: (d2 | d3 | d6 | d7) ? 1 : 0,
        a0: (d1 | d3 | d5 | d7) ? 1 : 0,
      };
    }
    case 'PRIORITY_ENCODER_4TO2': {
      const d0 = i.d0 ?? 0;
      const d1 = i.d1 ?? 0;
      const d2 = i.d2 ?? 0;
      const d3 = i.d3 ?? 0;
      if (d3 === 1) return { a1: 1, a0: 1, v: 1 };
      if (d2 === 1) return { a1: 1, a0: 0, v: 1 };
      if (d1 === 1) return { a1: 0, a0: 1, v: 1 };
      if (d0 === 1) return { a1: 0, a0: 0, v: 1 };
      return { a1: 0, a0: 0, v: 0 };
    }
    case 'DFF':
    case 'JKFF':
    case 'TFF': {
      const q = node.internal.q ?? 0;
      return { q, qn: inv(q) };
    }
  }
}

/**
 * Propagates combinational signals and optionally triggers positive-edge Flip-Flops.
 */
export function evaluateCircuit(
  nodes: CircuitNode[],
  wires: CircuitWire[],
  triggerSequential = true
): CircuitNode[] {
  const working: CircuitNode[] = nodes.map((n) => ({
    ...n,
    inputs: { ...n.inputs },
    outputs: { ...n.outputs },
    internal: { ...n.internal },
  }));

  const nodeMap = new Map<string, CircuitNode>();
  working.forEach((n) => nodeMap.set(n.id, n));

  const wiredInPins = new Set<string>();
  for (const w of wires) {
    wiredInPins.add(`${w.toNodeId}:${w.toPinId}`);
  }

  const propagateCombinational = () => {
    const passes = Math.max(4, working.length + 2);
    for (let pass = 0; pass < passes; pass++) {
      let changed = false;

      // Reset input pins to 0 (Decoder Active-High E defaults to 1 if unwired)
      for (const n of working) {
        const isDecoder = n.type === 'DECODER_2TO4' || n.type === 'DECODER_3TO8';
        for (const pinId of Object.keys(n.inputs)) {
          n.inputs[pinId] =
            isDecoder && pinId === 'e' && !wiredInPins.has(`${n.id}:e`) ? 1 : 0;
        }
      }

      for (const wire of wires) {
        const src = nodeMap.get(wire.fromNodeId);
        const dst = nodeMap.get(wire.toNodeId);
        if (!src || !dst) continue;
        const val: LogicValue = src.outputs[wire.fromPinId] ?? 0;
        dst.inputs[wire.toPinId] = val;
      }

      // Evaluate combinational outputs
      for (const n of working) {
        const nextOut = evaluateCombinationalNode(n);
        for (const [k, v] of Object.entries(nextOut)) {
          if (n.outputs[k] !== v) {
            n.outputs[k] = v;
            changed = true;
          }
        }
      }

      if (!changed) break;
    }
  };

  propagateCombinational();

  if (triggerSequential) {
    let seqChanged = false;
    for (const n of working) {
      if (n.type === 'DFF' || n.type === 'JKFF' || n.type === 'TFF') {
        const currClk: LogicValue = n.inputs.clk ?? 0;
        const prevClk: LogicValue = n.internal.prevClk ?? 0;
        const currQ: LogicValue = n.internal.q ?? 0;

        if (prevClk === 0 && currClk === 1) {
          let nextQ: LogicValue = currQ;
          if (n.type === 'DFF') {
            nextQ = n.inputs.d ?? 0;
          } else if (n.type === 'TFF') {
            nextQ = (n.inputs.t ?? 0) === 1 ? inv(currQ) : currQ;
          } else if (n.type === 'JKFF') {
            const j = n.inputs.j ?? 0;
            const k = n.inputs.k ?? 0;
            if (j === 0 && k === 0) nextQ = currQ;
            else if (j === 0 && k === 1) nextQ = 0;
            else if (j === 1 && k === 0) nextQ = 1;
            else nextQ = inv(currQ);
          }

          if (nextQ !== currQ) {
            seqChanged = true;
          }
          n.internal.q = nextQ;
          n.outputs.q = nextQ;
          n.outputs.qn = inv(nextQ);
        }
        n.internal.prevClk = currClk;
      }
    }

    if (seqChanged) {
      propagateCombinational();
    }
  }

  return working;
}

/**
 * Automated Circuit Verifier ("Devreyi Doğrula")
 * Tests all 2^n input combinations against expectedTruthTable.
 */
export function verifyCircuitAgainstTruthTable(
  nodes: CircuitNode[],
  wires: CircuitWire[],
  challenge: CircuitChallengeConfig
): VerificationResult {
  const inputNodeMap = new Map<string, CircuitNode>();
  const outputNodeMap = new Map<string, CircuitNode>();

  for (const label of challenge.inputs) {
    const found = nodes.find(
      (n) =>
        (n.type === 'SWITCH' || n.type === 'BUTTON') &&
        n.label.trim().toUpperCase() === label.trim().toUpperCase()
    );
    if (!found) {
      return {
        passed: false,
        rows: [],
        error: `"${label}" etiketli bir Toggle Switch girişi bulunamadı. Lütfen giriş anahtarının etiketini "${label}" olarak koruyun.`,
      };
    }
    inputNodeMap.set(label, found);
  }

  for (const outLabel of challenge.outputs) {
    const found = nodes.find(
      (n) =>
        n.type === 'LED' &&
        n.label.trim().toUpperCase() === outLabel.trim().toUpperCase()
    );
    if (!found) {
      return {
        passed: false,
        rows: [],
        error: `"${outLabel}" etiketli bir LED çıkışı bulunamadı. Lütfen çıkış LED'inin etiketini "${outLabel}" olarak koruyun.`,
      };
    }
    // Check if LED has an incoming wire
    const hasWire = wires.some((w) => w.toNodeId === found.id && w.toPinId === 'in');
    if (!hasWire) {
      return {
        passed: false,
        rows: [],
        error: `"${outLabel}" çıkış LED'ine henüz hiçbir kablo bağlanmamış.`,
      };
    }
    outputNodeMap.set(outLabel, found);
  }

  if (challenge.maxComponents) {
    for (const [compType, maxAllowed] of Object.entries(challenge.maxComponents)) {
      if (maxAllowed === undefined) continue;
      const count = nodes.filter((n) => n.type === compType).length;
      if (count > maxAllowed) {
        return {
          passed: false,
          rows: [],
          error: `Bu görevde en fazla ${maxAllowed} adet ${compType} kapısı kullanabilirsiniz (şu an ${count} adet yerleştirilmiş). İfadeyi önce cebirsel olarak sadeleştirin.`,
        };
      }
    }
  }

  if (challenge.sequentialTest) {
    const seq = challenge.sequentialTest;
    const clkNode = nodes.find(
      (n) =>
        (n.type === 'CLOCK' || n.type === 'SWITCH' || n.type === 'BUTTON') &&
        n.label.trim().toUpperCase() === seq.clkLabel.trim().toUpperCase()
    );
    if (!clkNode) {
      return {
        passed: false,
        rows: [],
        error: `"${seq.clkLabel}" etiketli Clock girişi bulunamadı.`,
      };
    }

    // Initialize cloned nodes with all Flip-Flops reset to Q = 0, prevClk = 0
    let stateNodes: CircuitNode[] = nodes.map((n) => ({
      ...n,
      inputs: { ...n.inputs },
      outputs: {
        ...n.outputs,
        ...(n.type === 'DFF' || n.type === 'JKFF' || n.type === 'TFF'
          ? { q: 0 as LogicValue, qn: 1 as LogicValue }
          : {}),
        ...(n.id === clkNode.id ? { out: 0 as LogicValue } : {}),
      },
      internal: {
        ...n.internal,
        q: 0 as LogicValue,
        prevClk: 0 as LogicValue,
      },
    }));

    const seqResults: VerificationRowResult[] = [];
    let seqPassed = true;

    for (let stepIdx = 0; stepIdx < seq.steps.length; stepIdx++) {
      const step = seq.steps[stepIdx];

      // 1. Apply step inputs with CLK = 0 and settle combinational logic
      stateNodes = stateNodes.map((n) => {
        const nextOut = { ...n.outputs };
        if (n.id === clkNode.id) nextOut.out = 0;
        for (const [inLabel, inNode] of inputNodeMap.entries()) {
          if (n.id === inNode.id) {
            nextOut.out = step.inputs[inLabel] ?? 0;
          }
        }
        return { ...n, outputs: nextOut };
      });
      stateNodes = evaluateCircuit(stateNodes, wires, true);

      // 2. Trigger rising edge CLK = 1
      stateNodes = stateNodes.map((n) =>
        n.id === clkNode.id ? { ...n, outputs: { ...n.outputs, out: 1 as LogicValue } } : n
      );
      stateNodes = evaluateCircuit(stateNodes, wires, true);

      // 3. Read outputs after rising edge
      const actualOutputs: Record<string, LogicValue | null> = {};
      let rowMatch = true;
      for (const outLabel of challenge.outputs) {
        const targetNode = outputNodeMap.get(outLabel);
        const evalNode = stateNodes.find((n) => n.id === targetNode?.id);
        const actualVal: LogicValue = evalNode?.inputs.in ?? 0;
        actualOutputs[outLabel] = actualVal;
        if (actualVal !== step.expectedOutputs[outLabel]) {
          rowMatch = false;
        }
      }
      if (!rowMatch) seqPassed = false;

      // 4. Return CLK to 0 for next pulse
      stateNodes = stateNodes.map((n) =>
        n.id === clkNode.id ? { ...n, outputs: { ...n.outputs, out: 0 as LogicValue } } : n
      );
      stateNodes = evaluateCircuit(stateNodes, wires, true);

      seqResults.push({
        inputs: { ...step.inputs, [seq.clkLabel]: 1 },
        expected: step.expectedOutputs,
        actual: actualOutputs,
        match: rowMatch,
      });
    }

    return {
      passed: seqPassed,
      rows: seqResults,
    };
  }

  const rowResults: VerificationRowResult[] = [];
  let allPassed = true;

  for (const expectedRow of challenge.expectedTruthTable) {
    // Clone nodes for deterministic test run
    const testNodes = nodes.map((n) => {
      const cloned: CircuitNode = {
        ...n,
        inputs: { ...n.inputs },
        outputs: { ...n.outputs },
        internal: { ...n.internal },
      };
      for (const [inLabel, inNode] of inputNodeMap.entries()) {
        if (cloned.id === inNode.id) {
          cloned.outputs.out = expectedRow.inputs[inLabel] ?? 0;
        }
      }
      return cloned;
    });

    const evaluated = evaluateCircuit(testNodes, wires, false);
    const actualOutputs: Record<string, LogicValue | null> = {};
    let rowMatch = true;

    for (const outLabel of challenge.outputs) {
      const targetNode = outputNodeMap.get(outLabel);
      const evalNode = evaluated.find((n) => n.id === targetNode?.id);
      const actualVal: LogicValue = evalNode?.inputs.in ?? 0;
      actualOutputs[outLabel] = actualVal;
      if (actualVal !== expectedRow.outputs[outLabel]) {
        rowMatch = false;
      }
    }

    if (!rowMatch) {
      allPassed = false;
    }

    rowResults.push({
      inputs: expectedRow.inputs,
      expected: expectedRow.outputs,
      actual: actualOutputs,
      match: rowMatch,
    });
  }

  return {
    passed: allPassed,
    rows: rowResults,
  };
}
