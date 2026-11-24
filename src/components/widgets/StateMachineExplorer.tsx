import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Calculator,
  Cpu,
  GitCommitHorizontal,
  List,
  Play,
  RotateCcw,
  Table2,
} from 'lucide-react';
import type { WidgetConfig } from '../../types/curriculum';
import { useSession } from '../../context/SessionContext';
import { UI_STRINGS } from '../../i18n/translations';

interface StateMachineExplorerProps {
  config?: WidgetConfig;
  studioMode?: boolean;
}

type PresetId = 'dff-analysis' | 'mealy-2ff' | 'moore-101';
type MachineModel = 'multi-input' | 'mealy' | 'moore';
type TableFormat = 'list' | '2d';

interface StateNodeDef {
  id: string;
  label: string;
  bits: (0 | 1)[];
  mooreOutput?: 0 | 1;
  x: number;
  y: number;
}

interface TransitionDef {
  from: string;
  inputKey: string;
  next: string;
  output: 0 | 1 | null;
}

interface ArcDef {
  from: string;
  next: string;
  inputs: string[];
  d: string;
  lx: number;
  ly: number;
  text: string;
}

interface PresetMachine {
  id: PresetId;
  model: MachineModel;
  stateVars: string[];
  inputVars: string[];
  hasOutput: boolean;
  outputVar?: string;
  equations: string;
  states: StateNodeDef[];
  inputOptions: string[];
  transitions: TransitionDef[];
  arcs: ArcDef[];
  defaultState: string;
  defaultInput: string;
}

const PRESET_MACHINES: Record<PresetId, PresetMachine> = {
  'dff-analysis': {
    id: 'dff-analysis',
    model: 'multi-input',
    stateVars: ['A'],
    inputVars: ['x', 'y'],
    hasOutput: false,
    equations: 'A(t+1) = D_A = A ⊕ x ⊕ y',
    states: [
      { id: '0', label: '0', bits: [0], x: 112, y: 125 },
      { id: '1', label: '1', bits: [1], x: 268, y: 125 },
    ],
    inputOptions: ['00', '01', '10', '11'],
    transitions: [
      { from: '0', inputKey: '00', next: '0', output: null },
      { from: '0', inputKey: '01', next: '1', output: null },
      { from: '0', inputKey: '10', next: '1', output: null },
      { from: '0', inputKey: '11', next: '0', output: null },
      { from: '1', inputKey: '00', next: '1', output: null },
      { from: '1', inputKey: '01', next: '0', output: null },
      { from: '1', inputKey: '10', next: '0', output: null },
      { from: '1', inputKey: '11', next: '1', output: null },
    ],
    arcs: [
      {
        from: '0',
        next: '0',
        inputs: ['00', '11'],
        d: 'M 90 106 C 30 62, 30 188, 90 144',
        lx: 42,
        ly: 129,
        text: '00, 11',
      },
      {
        from: '0',
        next: '1',
        inputs: ['01', '10'],
        d: 'M 136 108 Q 190 66 244 108',
        lx: 190,
        ly: 76,
        text: '01, 10',
      },
      {
        from: '1',
        next: '1',
        inputs: ['00', '11'],
        d: 'M 290 106 C 350 62, 350 188, 290 144',
        lx: 338,
        ly: 129,
        text: '00, 11',
      },
      {
        from: '1',
        next: '0',
        inputs: ['01', '10'],
        d: 'M 244 142 Q 190 184 136 142',
        lx: 190,
        ly: 178,
        text: '01, 10',
      },
    ],
    defaultState: '0',
    defaultInput: '01',
  },
  'mealy-2ff': {
    id: 'mealy-2ff',
    model: 'mealy',
    stateVars: ['A', 'B'],
    inputVars: ['x'],
    hasOutput: true,
    outputVar: 'y',
    equations: "A(t+1) = Ax + Bx · B(t+1) = A'x · y = (A + B)x'",
    states: [
      { id: '00', label: '00', bits: [0, 0], x: 92, y: 66 },
      { id: '01', label: '01', bits: [0, 1], x: 288, y: 66 },
      { id: '10', label: '10', bits: [1, 0], x: 288, y: 186 },
      { id: '11', label: '11', bits: [1, 1], x: 92, y: 186 },
    ],
    inputOptions: ['0', '1'],
    transitions: [
      { from: '00', inputKey: '0', next: '00', output: 0 },
      { from: '00', inputKey: '1', next: '01', output: 0 },
      { from: '01', inputKey: '0', next: '00', output: 1 },
      { from: '01', inputKey: '1', next: '11', output: 0 },
      { from: '10', inputKey: '0', next: '00', output: 1 },
      { from: '10', inputKey: '1', next: '10', output: 0 },
      { from: '11', inputKey: '0', next: '00', output: 1 },
      { from: '11', inputKey: '1', next: '10', output: 0 },
    ],
    arcs: [
      {
        from: '00',
        next: '00',
        inputs: ['0'],
        d: 'M 69 50 C 26 14, 24 108, 67 80',
        lx: 30,
        ly: 64,
        text: '0/0',
      },
      {
        from: '00',
        next: '01',
        inputs: ['1'],
        d: 'M 118 56 Q 190 30 262 56',
        lx: 190,
        ly: 34,
        text: '1/0',
      },
      {
        from: '01',
        next: '00',
        inputs: ['0'],
        d: 'M 262 74 Q 190 96 118 74',
        lx: 190,
        ly: 97,
        text: '0/1',
      },
      {
        from: '01',
        next: '11',
        inputs: ['1'],
        d: 'M 266 84 Q 204 134 114 170',
        lx: 218,
        ly: 142,
        text: '1/0',
      },
      {
        from: '10',
        next: '00',
        inputs: ['0'],
        d: 'M 264 170 Q 178 134 114 82',
        lx: 164,
        ly: 120,
        text: '0/1',
      },
      {
        from: '10',
        next: '10',
        inputs: ['1'],
        d: 'M 311 170 C 354 138, 354 228, 311 200',
        lx: 350,
        ly: 190,
        text: '1/0',
      },
      {
        from: '11',
        next: '00',
        inputs: ['0'],
        d: 'M 86 158 Q 62 126 86 94',
        lx: 54,
        ly: 128,
        text: '0/1',
      },
      {
        from: '11',
        next: '10',
        inputs: ['1'],
        d: 'M 118 194 Q 190 220 262 194',
        lx: 190,
        ly: 224,
        text: '1/0',
      },
    ],
    defaultState: '00',
    defaultInput: '1',
  },
  'moore-101': {
    id: 'moore-101',
    model: 'moore',
    stateVars: ['A', 'B'],
    inputVars: ['x'],
    hasOutput: true,
    outputVar: 'y',
    equations: "A(t+1) = Bx' + AB'x · B(t+1) = x · y = AB",
    states: [
      { id: 'S0', label: 'S0', bits: [0, 0], mooreOutput: 0, x: 92, y: 66 },
      { id: 'S1', label: 'S1', bits: [0, 1], mooreOutput: 0, x: 288, y: 66 },
      { id: 'S2', label: 'S2', bits: [1, 0], mooreOutput: 0, x: 288, y: 186 },
      { id: 'S3', label: 'S3', bits: [1, 1], mooreOutput: 1, x: 92, y: 186 },
    ],
    inputOptions: ['0', '1'],
    transitions: [
      { from: 'S0', inputKey: '0', next: 'S0', output: 0 },
      { from: 'S0', inputKey: '1', next: 'S1', output: 0 },
      { from: 'S1', inputKey: '0', next: 'S2', output: 0 },
      { from: 'S1', inputKey: '1', next: 'S1', output: 0 },
      { from: 'S2', inputKey: '0', next: 'S0', output: 0 },
      { from: 'S2', inputKey: '1', next: 'S3', output: 0 },
      { from: 'S3', inputKey: '0', next: 'S2', output: 1 },
      { from: 'S3', inputKey: '1', next: 'S1', output: 1 },
    ],
    arcs: [
      {
        from: 'S0',
        next: 'S0',
        inputs: ['0'],
        d: 'M 69 50 C 26 14, 24 108, 67 80',
        lx: 30,
        ly: 64,
        text: '0',
      },
      {
        from: 'S0',
        next: 'S1',
        inputs: ['1'],
        d: 'M 118 56 Q 190 30 262 56',
        lx: 190,
        ly: 34,
        text: '1',
      },
      {
        from: 'S1',
        next: 'S1',
        inputs: ['1'],
        d: 'M 311 50 C 354 14, 354 108, 311 80',
        lx: 350,
        ly: 64,
        text: '1',
      },
      {
        from: 'S1',
        next: 'S2',
        inputs: ['0'],
        d: 'M 294 94 Q 318 126 294 158',
        lx: 326,
        ly: 128,
        text: '0',
      },
      {
        from: 'S2',
        next: 'S0',
        inputs: ['0'],
        d: 'M 264 170 Q 190 112 114 82',
        lx: 196,
        ly: 108,
        text: '0',
      },
      {
        from: 'S2',
        next: 'S3',
        inputs: ['1'],
        d: 'M 262 194 Q 190 220 118 194',
        lx: 190,
        ly: 224,
        text: '1',
      },
      {
        from: 'S3',
        next: 'S2',
        inputs: ['0'],
        d: 'M 118 176 Q 190 154 262 176',
        lx: 190,
        ly: 156,
        text: '0',
      },
      {
        from: 'S3',
        next: 'S1',
        inputs: ['1'],
        d: 'M 116 170 Q 190 144 264 82',
        lx: 186,
        ly: 146,
        text: '1',
      },
    ],
    defaultState: 'S0',
    defaultInput: '1',
  },
};

const PRESET_ORDER: PresetId[] = ['dff-analysis', 'mealy-2ff', 'moore-101'];

function jkExcitation(q: 0 | 1, qNext: 0 | 1): { j: string; k: string } {
  if (q === 0 && qNext === 0) return { j: '0', k: 'X' };
  if (q === 0 && qNext === 1) return { j: '1', k: 'X' };
  if (q === 1 && qNext === 0) return { j: 'X', k: '1' };
  return { j: 'X', k: '0' };
}

function getSafeInitialPreset(raw?: string): PresetId {
  if (raw === 'dff-analysis' || raw === 'mealy-2ff' || raw === 'moore-101') {
    return raw;
  }
  return 'mealy-2ff';
}

export const StateMachineExplorer: React.FC<StateMachineExplorerProps> = ({
  studioMode = false,
}) => {
  const { session, updateToolsState } = useSession();
  const sm = UI_STRINGS[session.language].stateMachine;
  const savedSmRef = useRef(studioMode ? session.tools.stateMachine : undefined);

  const initialPreset = getSafeInitialPreset(savedSmRef.current?.presetId);

  const [presetId, setPresetId] = useState<PresetId>(initialPreset);
  const machine = PRESET_MACHINES[presetId];

  const [currentState, setCurrentState] = useState<string>(() => {
    const savedState = savedSmRef.current?.currentState;
    if (savedState && PRESET_MACHINES[initialPreset].states.some((s) => s.id === savedState)) {
      return savedState;
    }
    return PRESET_MACHINES[initialPreset].defaultState;
  });

  const [lastTransition, setLastTransition] = useState<TransitionDef>(() => {
    const m = PRESET_MACHINES[initialPreset];
    const savedInput = savedSmRef.current?.lastInputKey;
    const savedState = savedSmRef.current?.currentState;
    if (savedInput && savedState) {
      const matched = m.transitions.find(
        (t) => t.next === savedState && t.inputKey === savedInput
      );
      if (matched) return matched;
    }
    return (
      m.transitions.find(
        (t) => t.from === m.defaultState && t.inputKey === m.defaultInput
      ) ?? m.transitions[0]
    );
  });

  const [ffMode, setFfMode] = useState<'D' | 'JK'>(savedSmRef.current?.ffMode ?? 'D');
  const [tableFormat, setTableFormat] = useState<TableFormat>(
    savedSmRef.current?.tableFormat ?? 'list'
  );
  const [history, setHistory] = useState<string[]>(() => {
    const savedHist = savedSmRef.current?.history;
    if (
      savedHist &&
      savedHist.length > 0 &&
      savedHist.every((id) => PRESET_MACHINES[initialPreset].states.some((s) => s.id === id))
    ) {
      return savedHist;
    }
    return [PRESET_MACHINES[initialPreset].defaultState];
  });
  const [calcStatesCount, setCalcStatesCount] = useState<number>(
    savedSmRef.current?.calcStatesCount ?? PRESET_MACHINES[initialPreset].states.length
  );

  const skipFirstSyncRef = useRef(true);
  useEffect(() => {
    if (!studioMode) return;
    if (skipFirstSyncRef.current) {
      skipFirstSyncRef.current = false;
      return;
    }
    updateToolsState('stateMachine', {
      presetId,
      currentState,
      lastInput: lastTransition.inputKey === '0' ? 0 : 1,
      lastInputKey: lastTransition.inputKey,
      ffMode,
      tableFormat,
      calcStatesCount,
      history,
    });
  }, [
    studioMode,
    presetId,
    currentState,
    lastTransition,
    ffMode,
    tableFormat,
    calcStatesCount,
    history,
    updateToolsState,
  ]);

  const currentNode = useMemo(
    () => machine.states.find((s) => s.id === currentState) ?? machine.states[0],
    [machine, currentState]
  );

  const activePreview = useMemo(
    () =>
      machine.transitions.find(
        (t) => t.from === currentState && t.inputKey === lastTransition.inputKey
      ) ?? machine.transitions[0],
    [machine, currentState, lastTransition.inputKey]
  );

  const handleSelectPreset = (nextId: PresetId) => {
    const m = PRESET_MACHINES[nextId];
    setPresetId(nextId);
    setCurrentState(m.defaultState);
    const firstTr =
      m.transitions.find((t) => t.from === m.defaultState && t.inputKey === m.defaultInput) ??
      m.transitions[0];
    setLastTransition(firstTr);
    setHistory([m.defaultState]);
    setCalcStatesCount(m.states.length);
  };

  const handlePulseInput = (inputKey: string) => {
    const tr =
      machine.transitions.find((t) => t.from === currentState && t.inputKey === inputKey) ??
      machine.transitions[0];
    setLastTransition(tr);
    setCurrentState(tr.next);
    setHistory((prev) => [...prev.slice(-6), tr.next]);
  };

  const handleReset = () => {
    setCurrentState(machine.defaultState);
    const firstTr =
      machine.transitions.find(
        (t) => t.from === machine.defaultState && t.inputKey === machine.defaultInput
      ) ?? machine.transitions[0];
    setLastTransition(firstTr);
    setHistory([machine.defaultState]);
  };

  const safeN = Math.max(1, Math.min(256, Math.round(calcStatesCount || 1)));
  const minFF = safeN <= 1 ? 0 : Math.ceil(Math.log2(safeN));
  const stateCapacity = Math.pow(2, minFF);
  const unusedStates = Math.max(0, stateCapacity - safeN);

  const diagramHint =
    machine.model === 'mealy'
      ? sm.diagramHintMealy
      : machine.model === 'moore'
        ? sm.diagramHintMoore
        : sm.diagramHintMulti;

  const modelBadgeStyle =
    machine.model === 'mealy'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : machine.model === 'moore'
        ? 'bg-violet-50 text-violet-800 border-violet-200'
        : 'bg-sky-50 text-sky-800 border-sky-200';

  return (
    <div
      className={`bg-white rounded-3xl border-2 border-slate-200 border-b-4 p-3 sm:p-4 flex flex-col gap-3 ${
        studioMode ? 'lg:flex-1 lg:min-h-0' : ''
      }`}
    >
      {/* Top Header + Preset Switcher */}
      <div className="flex flex-col gap-2.5 pb-2.5 border-b-2 border-slate-100 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <GitCommitHorizontal className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
                  {sm.title}
                </h4>
                <span
                  className={`px-2 py-0.5 rounded-lg border text-[10px] font-extrabold ${modelBadgeStyle}`}
                >
                  {sm.modelBadges[machine.model]}
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 truncate">
                {sm.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-amber-50/80 border-2 border-amber-200/80">
              {(['D', 'JK'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setFfMode(m)}
                  className={`min-h-[34px] md:min-h-0 px-2.5 py-1 text-xs font-mono font-extrabold rounded-xl cursor-pointer transition-all ${
                    ffMode === m
                      ? 'bg-[#10B981] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {m} {sm.excitationSuffix}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="min-h-[36px] md:min-h-0 flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 border-rose-200 border-b-4 bg-rose-50 hover:bg-rose-100 active:border-b-2 text-xs font-bold text-rose-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{sm.reset}</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FFFDF8] border-2 border-amber-100 rounded-2xl px-2.5 py-2">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span className="text-[11px] font-extrabold text-slate-500 px-1 shrink-0">
              {sm.presetsLabel}
            </span>
            {PRESET_ORDER.map((id) => {
              const active = presetId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectPreset(id)}
                  className={`min-h-[34px] px-2.5 py-1 rounded-xl border-2 text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-sky-500 border-sky-600 text-white shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                  }`}
                >
                  {sm.presetNames[id]}
                </button>
              );
            })}
          </div>

          <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-indigo-700 font-mono text-[11px] font-bold">
            {machine.equations}
          </span>
        </div>
      </div>

      {/* Scrollable Body (keeps all 3 sections accessible on studio 100dvh desktop & responsive mobile) */}
      <div
        className={`flex flex-col gap-3 ${
          studioMode ? 'lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-1' : ''
        }`}
      >
        {/* Row 1: A) Interactive State Diagram + B) Switchable State Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          {/* A) Interactive SVG State Diagram */}
          <div className="lg:col-span-5 bg-[#FFFDF8] border-2 border-amber-100 rounded-2xl p-3 flex flex-col gap-2.5 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <span className="text-xs font-display font-extrabold text-slate-800">
                {sm.diagramTitle}
              </span>
              <span className="text-[10px] font-semibold text-slate-500">
                {diagramHint}
              </span>
            </div>

            {/* Step Simulate Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 mr-0.5">
                {sm.stepSimulate}
              </span>
              <div
                className={`grid flex-1 gap-1.5 ${
                  machine.inputOptions.length === 4 ? 'grid-cols-4' : 'grid-cols-2'
                }`}
              >
                {machine.inputOptions.map((inpKey, idx) => (
                  <button
                    key={inpKey}
                    type="button"
                    onClick={() => handlePulseInput(inpKey)}
                    className={`min-h-[38px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl border-2 border-b-4 active:border-b-2 text-white font-mono text-xs font-extrabold transition-all cursor-pointer ${
                      idx % 2 === 0
                        ? 'bg-sky-500 hover:bg-sky-600 border-sky-600'
                        : 'bg-emerald-500 hover:bg-emerald-600 border-emerald-600'
                    }`}
                  >
                    <Play className="w-3 h-3 shrink-0" />
                    <span>
                      {machine.inputVars.join('')}={inpKey}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <svg
              viewBox="0 0 380 250"
              className="w-full h-auto bg-white rounded-2xl border-2 border-slate-100"
            >
              <defs>
                <marker
                  id="sm-arrow-muted"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 1 L 7 4 L 0 7 z" fill="#94A3B8" />
                </marker>
                <marker
                  id="sm-arrow-active"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 1 L 7 4 L 0 7 z" fill="#10B981" />
                </marker>
              </defs>

              {machine.arcs.map((arc, idx) => {
                const isAct =
                  lastTransition.from === arc.from &&
                  lastTransition.next === arc.next &&
                  arc.inputs.includes(lastTransition.inputKey);
                return (
                  <g key={`${presetId}_arc_${idx}`}>
                    <path
                      d={arc.d}
                      fill="none"
                      stroke={isAct ? '#10B981' : '#CBD5E1'}
                      strokeWidth={isAct ? '3.2' : '1.9'}
                      markerEnd={
                        isAct ? 'url(#sm-arrow-active)' : 'url(#sm-arrow-muted)'
                      }
                    />
                    <rect
                      x={arc.lx - (arc.text.length * 3.6 + 5)}
                      y={arc.ly - 10}
                      width={arc.text.length * 7.2 + 10}
                      height={14}
                      rx={4}
                      fill={isAct ? '#ECFDF5' : '#FFFFFF'}
                      fillOpacity={0.92}
                    />
                    <text
                      x={arc.lx}
                      y={arc.ly}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight={isAct ? '800' : '700'}
                      fill={isAct ? '#059669' : '#475569'}
                    >
                      {arc.text}
                    </text>
                  </g>
                );
              })}

              {machine.states.map((st) => {
                const isCurrent = currentState === st.id;
                const bits = st.bits.join('');
                const isMoore = machine.model === 'moore';
                return (
                  <g
                    key={`${presetId}_st_${st.id}`}
                    onClick={() => setCurrentState(st.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {isCurrent && (
                      <circle
                        cx={st.x}
                        cy={st.y}
                        r={33}
                        fill="rgba(16, 185, 129, 0.16)"
                      />
                    )}
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r={27}
                      fill={isCurrent ? '#D1FAE5' : '#FFFFFF'}
                      stroke={isCurrent ? '#10B981' : '#94A3B8'}
                      strokeWidth={isCurrent ? '3.4' : '2.2'}
                    />
                    {isMoore ? (
                      <>
                        <text
                          x={st.x}
                          y={st.y - 1}
                          textAnchor="middle"
                          fontSize="12.5"
                          fontWeight="800"
                          fontFamily="JetBrains Mono, monospace"
                          fill="#1E293B"
                        >
                          {st.label} / {st.mooreOutput}
                        </text>
                        <text
                          x={st.x}
                          y={st.y + 13}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                          fill={isCurrent ? '#047857' : '#64748B'}
                        >
                          ({bits})
                        </text>
                      </>
                    ) : (
                      <>
                        <text
                          x={st.x}
                          y={st.y + (st.label === bits ? 4 : -1)}
                          textAnchor="middle"
                          fontSize="14"
                          fontWeight="800"
                          fontFamily="JetBrains Mono, monospace"
                          fill="#1E293B"
                        >
                          {st.label}
                        </text>
                        {st.label !== bits && (
                          <text
                            x={st.x}
                            y={st.y + 13}
                            textAnchor="middle"
                            fontSize="10"
                            fontWeight="700"
                            fontFamily="JetBrains Mono, monospace"
                            fill={isCurrent ? '#047857' : '#64748B'}
                          >
                            {bits}
                          </text>
                        )}
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-xl px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <span className="font-bold text-slate-700">
                {sm.lastTransition}{' '}
                <strong className="text-emerald-700">
                  {lastTransition.from} → {lastTransition.next}
                </strong>{' '}
                ({machine.inputVars.join('')}={lastTransition.inputKey}
                {machine.hasOutput && lastTransition.output !== null ? (
                  <>
                    , {machine.outputVar ?? 'y'}=
                    <strong
                      className={
                        lastTransition.output === 1 ? 'text-emerald-700' : 'text-slate-600'
                      }
                    >
                      {lastTransition.output}
                    </strong>
                  </>
                ) : null}
                )
              </span>
              <span className="text-sky-700 font-bold truncate">
                {sm.trace} {history.join(' → ')}
              </span>
            </div>
          </div>

          {/* B) Two Switchable Academic State Table Formats */}
          <div className="lg:col-span-7 flex flex-col gap-2.5 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-display font-extrabold text-slate-800">
                {sm.stateTableTitle}
              </span>

              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setTableFormat('list')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    tableFormat === 'list'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>{sm.tableFormatList}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTableFormat('2d')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    tableFormat === '2d'
                      ? 'bg-white text-violet-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Table2 className="w-3.5 h-3.5" />
                  <span>{sm.tableFormat2D}</span>
                </button>
              </div>
            </div>

            {tableFormat === 'list' ? (
              <div className="overflow-x-auto max-w-full rounded-2xl border-2 border-slate-200 bg-white flex-1">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b-2 border-slate-100 bg-slate-50 text-slate-500">
                      <th className="py-2 px-2.5 text-left font-bold">
                        {sm.colPresentState} ({machine.stateVars.join(' ')})
                      </th>
                      <th className="py-2 px-2 text-center font-bold">
                        {sm.colInputs} ({machine.inputVars.join(' ')})
                      </th>
                      <th className="py-2 px-2 text-center font-bold">
                        {sm.colNextState} ({machine.stateVars.map((v) => `${v}+`).join(' ')})
                      </th>
                      {machine.hasOutput && (
                        <th className="py-2 px-2 text-center font-bold">
                          {sm.colOutput} ({machine.outputVar ?? 'y'})
                        </th>
                      )}
                      {machine.stateVars.map((v) => (
                        <th key={v} className="py-2 px-2 text-center text-sky-700 font-bold">
                          {ffMode === 'D' ? `D_${v}` : `J_${v} K_${v}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {machine.transitions.map((tr, idx) => {
                      const fromNode = machine.states.find((s) => s.id === tr.from)!;
                      const nextNode = machine.states.find((s) => s.id === tr.next)!;
                      const isLastFired =
                        tr.from === lastTransition.from &&
                        tr.inputKey === lastTransition.inputKey;
                      const isCurrentRow =
                        tr.from === currentState && tr.inputKey === activePreview.inputKey;

                      return (
                        <tr
                          key={idx}
                          className={`border-b border-slate-100 last:border-b-0 transition-colors ${
                            isLastFired
                              ? 'bg-emerald-50 text-emerald-950 font-bold'
                              : isCurrentRow
                                ? 'bg-sky-50/70 text-sky-950'
                                : 'text-slate-700'
                          }`}
                        >
                          <td className="py-1.5 px-2.5 font-bold">
                            {fromNode.label}
                            {fromNode.label !== fromNode.bits.join('') && (
                              <span className="ml-1 text-[10px] text-slate-400">
                                ({fromNode.bits.join('')})
                              </span>
                            )}
                          </td>
                          <td className="py-1.5 px-2 text-center">
                            {tr.inputKey.split('').join(' ')}
                          </td>
                          <td className="py-1.5 px-2 text-center font-bold">
                            {nextNode.label}
                            {nextNode.label !== nextNode.bits.join('') && (
                              <span className="ml-1 text-[10px] text-slate-400">
                                ({nextNode.bits.join('')})
                              </span>
                            )}
                          </td>
                          {machine.hasOutput && (
                            <td
                              className={`py-1.5 px-2 text-center font-extrabold ${
                                tr.output === 1 ? 'text-emerald-600' : 'text-slate-400'
                              }`}
                            >
                              {tr.output ?? '—'}
                            </td>
                          )}
                          {machine.stateVars.map((v, vIdx) => {
                            const q = fromNode.bits[vIdx];
                            const qNext = nextNode.bits[vIdx];
                            if (ffMode === 'D') {
                              return (
                                <td
                                  key={v}
                                  className="py-1.5 px-2 text-center text-sky-700 font-bold"
                                >
                                  {qNext}
                                </td>
                              );
                            }
                            const jk = jkExcitation(q, qNext);
                            return (
                              <td
                                key={v}
                                className="py-1.5 px-2 text-center text-sky-700 font-bold"
                              >
                                {jk.j} {jk.k}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Format 2: Compact 2D State Table (Mano Second Form) */
              <div className="overflow-x-auto max-w-full rounded-2xl border-2 border-slate-200 bg-white flex-1">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                      <th
                        rowSpan={2}
                        className="py-2 px-3 text-left font-bold border-r border-slate-200"
                      >
                        {sm.colPresentState}
                        <div className="text-[10px] font-normal text-slate-400">
                          ({machine.stateVars.join(' ')})
                        </div>
                      </th>
                      <th
                        colSpan={machine.inputOptions.length}
                        className="py-1.5 px-2 text-center font-bold border-r border-slate-200 text-sky-700"
                      >
                        {sm.colNextState} ({machine.stateVars.map((v) => `${v}+`).join(' ')})
                      </th>
                      {machine.hasOutput &&
                        (machine.model === 'moore' ? (
                          <th
                            rowSpan={2}
                            className="py-2 px-2.5 text-center font-bold text-violet-700"
                          >
                            {sm.colMooreOutput}
                            <div className="text-[10px] font-normal text-violet-500">
                              ({machine.outputVar ?? 'y'})
                            </div>
                          </th>
                        ) : (
                          <th
                            colSpan={machine.inputOptions.length}
                            className="py-1.5 px-2 text-center font-bold text-emerald-700"
                          >
                            {sm.colOutput} ({machine.outputVar ?? 'y'})
                          </th>
                        ))}
                    </tr>
                    <tr className="border-b-2 border-slate-200 bg-slate-50/70 text-slate-500">
                      {machine.inputOptions.map((inp) => (
                        <th
                          key={`ns_h_${inp}`}
                          className="py-1 px-2 text-center font-bold border-r border-slate-100 last:border-r-slate-200"
                        >
                          {machine.inputVars.join('')}={inp}
                        </th>
                      ))}
                      {machine.hasOutput &&
                        machine.model !== 'moore' &&
                        machine.inputOptions.map((inp) => (
                          <th key={`out_h_${inp}`} className="py-1 px-2 text-center font-bold">
                            {machine.inputVars.join('')}={inp}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {machine.states.map((st) => {
                      const isRowCurrent = currentState === st.id;
                      return (
                        <tr
                          key={st.id}
                          className={`border-b border-slate-100 last:border-b-0 ${
                            isRowCurrent ? 'bg-sky-50/50' : ''
                          }`}
                        >
                          <td className="py-2 px-3 font-bold border-r border-slate-200 text-slate-800">
                            {st.label}
                            {st.label !== st.bits.join('') && (
                              <span className="ml-1 text-[10px] text-slate-400">
                                ({st.bits.join('')})
                              </span>
                            )}
                          </td>
                          {machine.inputOptions.map((inp) => {
                            const tr = machine.transitions.find(
                              (t) => t.from === st.id && t.inputKey === inp
                            )!;
                            const nextNode = machine.states.find((s) => s.id === tr.next)!;
                            const isFiredCell =
                              lastTransition.from === st.id && lastTransition.inputKey === inp;
                            return (
                              <td
                                key={`ns_${st.id}_${inp}`}
                                className={`py-2 px-2 text-center border-r border-slate-100 ${
                                  isFiredCell
                                    ? 'bg-emerald-100 text-emerald-900 font-extrabold'
                                    : 'text-slate-700 font-semibold'
                                }`}
                              >
                                {nextNode.label}
                              </td>
                            );
                          })}
                          {machine.hasOutput &&
                            (machine.model === 'moore' ? (
                              <td
                                className={`py-2 px-2 text-center font-extrabold ${
                                  st.mooreOutput === 1
                                    ? 'text-emerald-600 bg-emerald-50/60'
                                    : 'text-slate-500'
                                }`}
                              >
                                {st.mooreOutput}
                              </td>
                            ) : (
                              machine.inputOptions.map((inp) => {
                                const tr = machine.transitions.find(
                                  (t) => t.from === st.id && t.inputKey === inp
                                )!;
                                const isFiredCell =
                                  lastTransition.from === st.id &&
                                  lastTransition.inputKey === inp;
                                return (
                                  <td
                                    key={`out_${st.id}_${inp}`}
                                    className={`py-2 px-2 text-center font-extrabold ${
                                      isFiredCell
                                        ? 'bg-emerald-100 text-emerald-900'
                                        : tr.output === 1
                                          ? 'text-emerald-600'
                                          : 'text-slate-400'
                                    }`}
                                  >
                                    {tr.output ?? '—'}
                                  </td>
                                );
                              })
                            ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Excitation & Current State Summary Card */}
            <div className="bg-violet-50/60 border-2 border-violet-200 rounded-2xl px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-violet-900">
              <span>
                {sm.currentState}{' '}
                <strong className="text-emerald-700">{currentNode.label}</strong> (
                {currentNode.bits.join('')})
                {machine.model === 'moore' && currentNode.mooreOutput !== undefined
                  ? ` · ${machine.outputVar ?? 'y'}=${currentNode.mooreOutput}`
                  : ''}
              </span>
              <span>
                {ffMode === 'D'
                  ? `D = ${machine.stateVars.map((v) => `${v}+`).join(', ')}`
                  : sm.jkExcitationRule}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: C) Sequential Circuit Block Diagram & #States -> #FF Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          {/* Sequential Block Diagram */}
          <div className="lg:col-span-7 bg-[#FFFDF8] border-2 border-slate-200 rounded-2xl p-3 flex flex-col gap-2 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-slate-800">
                <Cpu className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{sm.blockArchTitle}</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-800">
                PS={currentNode.bits.join('')} · {machine.inputVars.join('')}={activePreview.inputKey} → NS=
                {machine.states.find((s) => s.id === activePreview.next)?.bits.join('')}
              </span>
            </div>

            <svg
              viewBox="0 0 540 164"
              className="w-full h-auto bg-white rounded-2xl border-2 border-slate-100"
            >
              <defs>
                <marker
                  id="blk-arrow"
                  markerWidth="7"
                  markerHeight="7"
                  refX="6"
                  refY="3.5"
                  orient="auto"
                >
                  <path d="M 0 1 L 6 3.5 L 0 6 z" fill="#475569" />
                </marker>
                <marker
                  id="blk-arrow-sky"
                  markerWidth="7"
                  markerHeight="7"
                  refX="6"
                  refY="3.5"
                  orient="auto"
                >
                  <path d="M 0 1 L 6 3.5 L 0 6 z" fill="#0284C7" />
                </marker>
              </defs>

              {/* Inputs -> Combinational Logic */}
              <line
                x1="28"
                y1="38"
                x2="164"
                y2="38"
                stroke="#0284C7"
                strokeWidth="2.2"
                markerEnd="url(#blk-arrow-sky)"
              />
              <text
                x="92"
                y="29"
                textAnchor="middle"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
                fill="#0369A1"
              >
                {sm.inputsLabel} ({machine.inputVars.join(',')})
              </text>

              {/* Combinational Logic Box */}
              <rect
                x="170"
                y="18"
                width="200"
                height="60"
                rx="12"
                fill="#EFF6FF"
                stroke="#38BDF8"
                strokeWidth="2.2"
              />
              <text
                x="270"
                y="43"
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="800"
                fontFamily="Nunito, sans-serif"
                fill="#0C4A6E"
              >
                {sm.combLogicBlock}
              </text>
              <text
                x="270"
                y="60"
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
                fill="#0369A1"
              >
                {sm.combLogicSub}
              </text>

              {/* Combinational Logic -> Outputs */}
              <line
                x1="370"
                y1="44"
                x2="508"
                y2="44"
                stroke={machine.hasOutput ? '#10B981' : '#CBD5E1'}
                strokeWidth="2.2"
                strokeDasharray={machine.hasOutput ? undefined : '4 3'}
                markerEnd="url(#blk-arrow)"
              />
              <text
                x="442"
                y="34"
                textAnchor="middle"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
                fill={machine.hasOutput ? '#047857' : '#94A3B8'}
              >
                {machine.hasOutput
                  ? `${sm.outputsLabel} (${machine.outputVar ?? 'y'})`
                  : `${sm.outputsLabel}: ${sm.noOutputTag}`}
              </text>

              {/* Next State -> Flip-Flops (Bottom) */}
              <path
                d="M 370 64 L 418 64 L 418 122 L 354 122"
                fill="none"
                stroke="#475569"
                strokeWidth="2.2"
                markerEnd="url(#blk-arrow)"
              />
              <text
                x="456"
                y="98"
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
                fill="#334155"
              >
                {sm.nsLabel}
              </text>

              {/* Flip-Flops Block */}
              <rect
                x="194"
                y="96"
                width="154"
                height="52"
                rx="12"
                fill="#FFFBEB"
                stroke="#F59E0B"
                strokeWidth="2.2"
              />
              <text
                x="271"
                y="119"
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="800"
                fontFamily="Nunito, sans-serif"
                fill="#78350F"
              >
                {sm.ffBlock} ({machine.stateVars.length} FF)
              </text>
              <text
                x="271"
                y="135"
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
                fill="#B45309"
              >
                {sm.ffSub}
              </text>

              {/* Clock Symbol + Line */}
              <polygon points="200,136 208,148 192,148" fill="#F59E0B" />
              <line x1="150" y1="142" x2="194" y2="142" stroke="#D97706" strokeWidth="2" />
              <text
                x="128"
                y="146"
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="800"
                fill="#B45309"
              >
                {sm.clkLabel}
              </text>

              {/* Present State Feedback Loop: Flip-Flops -> Combinational Logic */}
              <path
                d="M 194 120 L 94 120 L 94 64 L 164 64"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.2"
                markerEnd="url(#blk-arrow-sky)"
              />
              <text
                x="132"
                y="112"
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="800"
                fill="#0369A1"
              >
                {sm.psLabel}
              </text>
            </svg>
          </div>

          {/* Dynamic #States -> #FF & #SV Calculator */}
          <div className="lg:col-span-5 bg-violet-50/50 border-2 border-violet-200 rounded-2xl p-3 flex flex-col justify-between gap-2.5 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-violet-950">
              <Calculator className="w-4 h-4 text-violet-600 shrink-0" />
              <span>{sm.calcTitle}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 bg-white border-2 border-violet-100 rounded-xl px-3 py-2">
              <label
                htmlFor="sm-calc-states-input"
                className="text-xs font-mono font-bold text-slate-700"
              >
                {sm.calcStatesLabel}
              </label>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCalcStatesCount(Math.max(1, safeN - 1))}
                  className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-violet-50 font-mono font-extrabold text-slate-700 cursor-pointer"
                >
                  -
                </button>
                <input
                  id="sm-calc-states-input"
                  type="number"
                  min={1}
                  max={256}
                  value={safeN}
                  onChange={(e) => {
                    const parsed = Number.parseInt(e.target.value, 10);
                    setCalcStatesCount(Number.isNaN(parsed) ? 1 : Math.max(1, Math.min(256, parsed)));
                  }}
                  className="w-14 text-center font-mono text-sm font-extrabold text-violet-700 bg-violet-50/70 border border-violet-200 rounded-lg py-1 focus:outline-none focus:border-violet-400"
                />
                <button
                  type="button"
                  onClick={() => setCalcStatesCount(Math.min(256, safeN + 1))}
                  className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-violet-50 font-mono font-extrabold text-slate-700 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[2, 4, 5, 8, 10, 16].map((nVal) => (
                <button
                  key={nVal}
                  type="button"
                  onClick={() => setCalcStatesCount(nVal)}
                  className={`px-2 py-1 rounded-lg border font-mono text-[11px] font-bold cursor-pointer transition-colors ${
                    safeN === nVal
                      ? 'bg-violet-500 border-violet-600 text-white'
                      : 'bg-white border-violet-200 text-violet-800 hover:bg-violet-100'
                  }`}
                >
                  N={nVal}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="bg-white border border-violet-200 rounded-xl p-2">
                <div className="text-[10px] font-bold text-slate-500">{sm.calcMinFF}</div>
                <div className="text-base font-black text-violet-700">{minFF}</div>
              </div>
              <div className="bg-white border border-violet-200 rounded-xl p-2">
                <div className="text-[10px] font-bold text-slate-500">{sm.calcCapacity}</div>
                <div className="text-base font-black text-sky-700">2^{minFF}={stateCapacity}</div>
              </div>
              <div className="bg-white border border-violet-200 rounded-xl p-2">
                <div className="text-[10px] font-bold text-slate-500">{sm.calcUnused}</div>
                <div className="text-base font-black text-amber-700">{unusedStates}</div>
              </div>
            </div>

            <div className="bg-white/90 border border-violet-200 rounded-xl px-3 py-2 text-[11px] font-mono font-bold text-violet-900 flex flex-wrap items-center justify-between gap-1">
              <span>#FF = #SV = ⌈log₂({safeN})⌉ = {minFF}</span>
              <span className="text-emerald-700">
                {safeN} ≤ 2^{minFF} ({stateCapacity})
              </span>
            </div>
            <p className="text-[10px] font-semibold text-violet-700/90 -mt-1">
              {sm.calcFormulaNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateMachineExplorer;
