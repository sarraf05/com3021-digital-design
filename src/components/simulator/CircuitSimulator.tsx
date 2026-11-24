import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Trash2,
  Cpu,
  Cable,
  Play,
  AlertTriangle,
  Sparkles,
  ArrowLeftRight,
  Lock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Check,
  X,
  FolderOpen,
  Puzzle,
} from 'lucide-react';
import {
  COMPONENT_CATALOG,
  COMPONENT_CATEGORIES,
  MSI_SUBCATEGORIES,
  buildCustomICMeta,
  createCustomICNode,
  createDefaultNode,
  getNodeMeta,
  resetSubcircuitNodes,
} from '../../engine/componentCatalog';
import {
  cloneNodesDeep,
  evaluateCircuit,
  verifyCircuitAgainstTruthTable,
} from '../../engine/circuitEngine';
import {
  PRESET_CATEGORIES,
  getCircuitPresets,
  type PresetCategory,
} from '../../engine/presets';
import type {
  CircuitChallengeConfig,
  CircuitNode,
  CircuitWire,
  ComponentCategory,
  ComponentType,
  CustomICColor,
  CustomICDefinition,
  CustomICPin,
  LogicValue,
  MsiSubcategory,
  PinDefinition,
  VerificationResult,
} from '../../types/simulator';
import { useSession } from '../../context/SessionContext';
import {
  UI_STRINGS,
  CATEGORY_LABELS,
  MSI_SUBCATEGORY_LABELS,
  COMPONENT_LABELS_EN,
  COMPONENT_DESCRIPTIONS_EN,
} from '../../i18n/translations';
import { NodeRenderer } from './NodeRenderer';

interface CircuitSimulatorProps {
  mode?: 'lab' | 'challenge';
  challengeKey?: string;
  challenge?: CircuitChallengeConfig;
  compact?: boolean;
  onChallengePass?: () => void;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.6;

type PhonePaletteTab =
  | 'Özel IC'
  | 'Temel'
  | '2-Giriş'
  | '3-Giriş'
  | '4-Giriş'
  | 'MSI'
  | 'Flip-Flop';

const PHONE_PALETTE_TABS: { id: PhonePaletteTab; categories: ComponentCategory[] }[] = [
  { id: 'Özel IC', categories: [] },
  { id: 'Temel', categories: ['Girişler', 'Çıkışlar'] },
  { id: '2-Giriş', categories: ['2-Girişli Kapılar'] },
  { id: '3-Giriş', categories: ['3-Girişli Kapılar'] },
  { id: '4-Giriş', categories: ['4-Girişli Kapılar'] },
  { id: 'MSI', categories: ['MSI Bloklar'] },
  { id: 'Flip-Flop', categories: ['Ardışıl Elemanlar'] },
];

const CUSTOM_IC_COLORS: CustomICColor[] = ['mint', 'sky', 'coral', 'violet', 'amber'];

const CUSTOM_IC_ACCENTS: Record<
  CustomICColor,
  {
    itemBg: string;
    itemBorder: string;
    tag: string;
    swatch: string;
    swatchRing: string;
  }
> = {
  mint: {
    itemBg: 'bg-emerald-50/90 hover:bg-emerald-100/90',
    itemBorder: 'border-emerald-200 hover:border-emerald-400',
    tag: 'text-emerald-800 bg-emerald-100',
    swatch: 'bg-emerald-400 border-emerald-600',
    swatchRing: 'ring-emerald-300',
  },
  sky: {
    itemBg: 'bg-sky-50/90 hover:bg-sky-100/90',
    itemBorder: 'border-sky-200 hover:border-sky-400',
    tag: 'text-sky-800 bg-sky-100',
    swatch: 'bg-sky-400 border-sky-600',
    swatchRing: 'ring-sky-300',
  },
  coral: {
    itemBg: 'bg-rose-50/90 hover:bg-rose-100/90',
    itemBorder: 'border-rose-200 hover:border-rose-400',
    tag: 'text-rose-800 bg-rose-100',
    swatch: 'bg-rose-400 border-rose-600',
    swatchRing: 'ring-rose-300',
  },
  violet: {
    itemBg: 'bg-violet-50/90 hover:bg-violet-100/90',
    itemBorder: 'border-violet-200 hover:border-violet-400',
    tag: 'text-violet-800 bg-violet-100',
    swatch: 'bg-violet-400 border-violet-600',
    swatchRing: 'ring-violet-300',
  },
  amber: {
    itemBg: 'bg-amber-50/90 hover:bg-amber-100/90',
    itemBorder: 'border-amber-200 hover:border-amber-400',
    tag: 'text-amber-800 bg-amber-100',
    swatch: 'bg-amber-400 border-amber-600',
    swatchRing: 'ring-amber-300',
  },
};

const PRESET_CATEGORY_ACCENTS: Record<
  PresetCategory,
  { dot: string; idle: string; active: string }
> = {
  arithmetic: {
    dot: 'bg-sky-500',
    idle: 'bg-white border-slate-200 text-slate-700 hover:border-sky-300',
    active: 'bg-sky-50 border-sky-400 text-sky-900 shadow-xs',
  },
  universal: {
    dot: 'bg-violet-500',
    idle: 'bg-white border-slate-200 text-slate-700 hover:border-violet-300',
    active: 'bg-violet-50 border-violet-400 text-violet-900 shadow-xs',
  },
  converters: {
    dot: 'bg-emerald-500',
    idle: 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300',
    active: 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs',
  },
  combinational: {
    dot: 'bg-amber-500',
    idle: 'bg-white border-slate-200 text-slate-700 hover:border-amber-300',
    active: 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs',
  },
  sequential: {
    dot: 'bg-rose-500',
    idle: 'bg-white border-slate-200 text-slate-700 hover:border-rose-300',
    active: 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs',
  },
  canvas: {
    dot: 'bg-slate-400',
    idle: 'bg-white border-slate-200 text-slate-700 hover:border-slate-300',
    active: 'bg-slate-100 border-slate-400 text-slate-900 shadow-xs',
  },
};

const CATEGORY_ACCENTS: Record<
  ComponentCategory,
  { badge: string; itemBg: string; itemBorder: string; tag: string }
> = {
  Girişler: {
    badge: 'text-emerald-700',
    itemBg: 'bg-emerald-50/80 hover:bg-emerald-100/90',
    itemBorder: 'border-emerald-200 hover:border-emerald-400',
    tag: 'text-emerald-800 bg-emerald-100',
  },
  Çıkışlar: {
    badge: 'text-rose-700',
    itemBg: 'bg-rose-50/80 hover:bg-rose-100/90',
    itemBorder: 'border-rose-200 hover:border-rose-400',
    tag: 'text-rose-800 bg-rose-100',
  },
  '2-Girişli Kapılar': {
    badge: 'text-sky-700',
    itemBg: 'bg-sky-50/80 hover:bg-sky-100/90',
    itemBorder: 'border-sky-200 hover:border-sky-400',
    tag: 'text-sky-800 bg-sky-100',
  },
  '3-Girişli Kapılar': {
    badge: 'text-orange-700',
    itemBg: 'bg-orange-50/80 hover:bg-orange-100/90',
    itemBorder: 'border-orange-200 hover:border-orange-400',
    tag: 'text-orange-800 bg-orange-100',
  },
  '4-Girişli Kapılar': {
    badge: 'text-indigo-700',
    itemBg: 'bg-indigo-50/80 hover:bg-indigo-100/90',
    itemBorder: 'border-indigo-200 hover:border-indigo-400',
    tag: 'text-indigo-800 bg-indigo-100',
  },
  'MSI Bloklar': {
    badge: 'text-violet-700',
    itemBg: 'bg-violet-50/80 hover:bg-violet-100/90',
    itemBorder: 'border-violet-200 hover:border-violet-400',
    tag: 'text-violet-800 bg-violet-100',
  },
  'Ardışıl Elemanlar': {
    badge: 'text-amber-700',
    itemBg: 'bg-amber-50/80 hover:bg-amber-100/90',
    itemBorder: 'border-amber-200 hover:border-amber-400',
    tag: 'text-amber-800 bg-amber-100',
  },
};

const MSI_SUBCATEGORY_ACCENTS: Record<
  MsiSubcategory,
  { header: string; itemBg: string; itemBorder: string; tag: string }
> = {
  'Multiplexers (MUX)': {
    header: 'text-violet-700 bg-violet-50/90 border-violet-200',
    itemBg: 'bg-violet-50/80 hover:bg-violet-100/90',
    itemBorder: 'border-violet-200 hover:border-violet-400',
    tag: 'text-violet-800 bg-violet-100',
  },
  'Demultiplexers (DEMUX)': {
    header: 'text-indigo-700 bg-indigo-50/90 border-indigo-200',
    itemBg: 'bg-indigo-50/80 hover:bg-indigo-100/90',
    itemBorder: 'border-indigo-200 hover:border-indigo-400',
    tag: 'text-indigo-800 bg-indigo-100',
  },
  Decoders: {
    header: 'text-teal-700 bg-teal-50/90 border-teal-200',
    itemBg: 'bg-teal-50/80 hover:bg-teal-100/90',
    itemBorder: 'border-teal-200 hover:border-teal-400',
    tag: 'text-teal-800 bg-teal-100',
  },
  Encoders: {
    header: 'text-pink-700 bg-pink-50/90 border-pink-200',
    itemBg: 'bg-pink-50/80 hover:bg-pink-100/90',
    itemBorder: 'border-pink-200 hover:border-pink-400',
    tag: 'text-pink-800 bg-pink-100',
  },
  'Aritmetik & Karşılaştırma': {
    header: 'text-rose-700 bg-rose-50/90 border-rose-200',
    itemBg: 'bg-rose-50/80 hover:bg-rose-100/90',
    itemBorder: 'border-rose-200 hover:border-rose-400',
    tag: 'text-rose-800 bg-rose-100',
  },
};

const TWO_INPUT_GATES: ComponentType[] = ['AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR'];
const THREE_INPUT_GATES: ComponentType[] = ['AND3', 'OR3', 'NAND3', 'NOR3', 'XOR3', 'XNOR3'];
const FOUR_INPUT_GATES: ComponentType[] = ['AND4', 'OR4', 'NAND4', 'NOR4'];

const MSI_SWAP_FAMILIES: {
  familyKey: keyof typeof UI_STRINGS.tr.simulator.msiSwapFamilies;
  accent: string;
  types: ComponentType[];
}[] = [
  {
    familyKey: 'mux',
    accent: 'violet',
    types: ['MUX_2X1', 'MUX_4X1', 'MUX_8X1'],
  },
  {
    familyKey: 'demux',
    accent: 'indigo',
    types: ['DEMUX_1TO2', 'DEMUX_1TO4', 'DEMUX_1TO8'],
  },
  {
    familyKey: 'dec',
    accent: 'teal',
    types: ['DECODER_2TO4', 'DECODER_3TO8'],
  },
  {
    familyKey: 'enc',
    accent: 'pink',
    types: ['ENCODER_4TO2', 'ENCODER_8TO3', 'PRIORITY_ENCODER_4TO2'],
  },
  {
    familyKey: 'adder',
    accent: 'rose',
    types: ['HALF_ADDER', 'FULL_ADDER'],
  },
];

function makeUid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function buildChallengeStarter(challenge: CircuitChallengeConfig): CircuitNode[] {
  const nodes: CircuitNode[] = [];
  let yOffset = 46;
  if (challenge.sequentialTest) {
    nodes.push(
      createDefaultNode(
        'CLOCK',
        `ch_clk_${challenge.sequentialTest.clkLabel}`,
        50,
        yOffset,
        challenge.sequentialTest.clkLabel,
        true
      )
    );
    yOffset += 86;
  }
  challenge.inputs.forEach((label) => {
    nodes.push(createDefaultNode('SWITCH', `ch_in_${label}`, 56, yOffset, label, true));
    yOffset += 78;
  });
  challenge.outputs.forEach((label, idx) => {
    nodes.push(createDefaultNode('LED', `ch_out_${label}`, 640, 62 + idx * 82, label, true));
  });
  return nodes;
}

function computeBezierPath(x1: number, y1: number, x2: number, y2: number): string {
  const dx = Math.max(46, Math.abs(x2 - x1) * 0.5);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

function computePreviewBezier(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  startDir: 'in' | 'out'
): string {
  const dx = Math.max(42, Math.abs(endX - startX) * 0.5);
  if (startDir === 'out') {
    return `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;
  }
  return `M ${startX} ${startY} C ${startX - dx} ${startY}, ${endX + dx} ${endY}, ${endX} ${endY}`;
}

export const CircuitSimulator: React.FC<CircuitSimulatorProps> = ({
  mode = 'lab',
  challengeKey,
  challenge,
  compact = false,
  onChallengePass,
}) => {
  const { session, setLabCircuit, setChallengeCircuit, addCustomIC, removeCustomIC } =
    useSession();
  const customICs = session.customICs;
  const customICsRef = useRef(customICs);
  customICsRef.current = customICs;
  const lang = session.language;
  const sim = UI_STRINGS[lang].simulator;
  const getCompLabel = (comp: { type: ComponentType; label: string }) =>
    lang === 'en' ? COMPONENT_LABELS_EN[comp.type] ?? comp.label : comp.label;
  const getCompDesc = (comp: { type: ComponentType; description: string }) =>
    lang === 'en' ? COMPONENT_DESCRIPTIONS_EN[comp.type] : comp.description;
  const presets = useMemo(() => getCircuitPresets(lang), [lang]);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<number | null>(null);
  const spawnCascadeRef = useRef(0);
  const activePointersRef = useRef<Map<number, { clientX: number; clientY: number }>>(new Map());
  const pinchStateRef = useRef<{
    dist: number;
    midX: number;
    midY: number;
    startZoom: number;
    startPanX: number;
    startPanY: number;
  } | null>(null);
  const longPressTimerRef = useRef<number | null>(null);

  const savedChallengeOnMountRef = useRef(
    mode === 'challenge' && challengeKey
      ? session.challengeCircuits[challengeKey]
      : undefined
  );
  const savedLabOnMountRef = useRef(
    mode === 'lab' ? session.labCircuit : null
  );

  const [paletteCollapsed, setPaletteCollapsed] = useState(false);
  const [phoneSheetExpanded, setPhoneSheetExpanded] = useState(false);
  const [phonePaletteTab, setPhonePaletteTab] = useState<PhonePaletteTab>('Temel');
  const [collapsedMsiGroups, setCollapsedMsiGroups] = useState<
    Partial<Record<MsiSubcategory, boolean>>
  >({});
  const [viewportSize, setViewportSize] = useState({ width: 780, height: 480 });
  const [zoom, setZoom] = useState<number>(() => {
    if (mode === 'lab' && savedLabOnMountRef.current) {
      return savedLabOnMountRef.current.zoom ?? 1;
    }
    if (mode === 'challenge' && savedChallengeOnMountRef.current?.zoom !== undefined) {
      return savedChallengeOnMountRef.current.zoom;
    }
    return 1;
  });
  const [pan, setPan] = useState<{ x: number; y: number }>(() => {
    if (mode === 'lab' && savedLabOnMountRef.current?.pan) {
      return savedLabOnMountRef.current.pan;
    }
    if (mode === 'challenge' && savedChallengeOnMountRef.current?.pan) {
      return savedChallengeOnMountRef.current.pan;
    }
    return { x: 0, y: 0 };
  });

  const [activePresetId, setActivePresetId] = useState<string>(() => {
    if (mode === 'lab') {
      return savedLabOnMountRef.current?.activePresetId ?? 'half-adder';
    }
    return 'challenge';
  });
  const [nodes, setNodes] = useState<CircuitNode[]>(() => {
    if (mode === 'challenge') {
      if (savedChallengeOnMountRef.current) {
        return evaluateCircuit(
          savedChallengeOnMountRef.current.nodes,
          savedChallengeOnMountRef.current.wires,
          false,
          session.customICs
        );
      }
      if (challenge) {
        return evaluateCircuit(buildChallengeStarter(challenge), [], false, session.customICs);
      }
    }
    if (mode === 'lab' && savedLabOnMountRef.current) {
      return evaluateCircuit(
        savedLabOnMountRef.current.nodes,
        savedLabOnMountRef.current.wires,
        false,
        session.customICs
      );
    }
    const p = presets[0];
    return evaluateCircuit(p.nodes, p.wires, false, session.customICs);
  });

  const [wires, setWires] = useState<CircuitWire[]>(() => {
    if (mode === 'challenge') {
      return savedChallengeOnMountRef.current?.wires ?? [];
    }
    if (mode === 'lab' && savedLabOnMountRef.current) {
      return savedLabOnMountRef.current.wires;
    }
    return presets[0].wires;
  });

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedWireId, setSelectedWireId] = useState<string | null>(null);
  const [verification, setVerification] = useState<VerificationResult | null>(() => {
    if (mode === 'challenge' && savedChallengeOnMountRef.current) {
      return savedChallengeOnMountRef.current.verification ?? null;
    }
    return null;
  });

  const [contextMenu, setContextMenu] = useState<{
    nodeId: string;
    x: number;
    y: number;
  } | null>(null);

  const [draggingNode, setDraggingNode] = useState<{
    nodeId: string;
    offsetX: number;
    offsetY: number;
    startClientX: number;
    startClientY: number;
    startTime: number;
    hasMovedPastDeadzone: boolean;
  } | null>(null);

  const [panning, setPanning] = useState<{
    startClientX: number;
    startClientY: number;
    startPanX: number;
    startPanY: number;
    hasMoved: boolean;
  } | null>(null);

  const [connectingFrom, setConnectingFrom] = useState<{
    nodeId: string;
    pinId: string;
    direction: 'in' | 'out';
    startX: number;
    startY: number;
    hasMoved: boolean;
    isTouch?: boolean;
  } | null>(null);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);

  const [clockRunningIds, setClockRunningIds] = useState<Record<string, boolean>>({});
  const [canvasToast, setCanvasToast] = useState<{
    message: string;
    tone: 'warn' | 'success' | 'info';
  } | null>(null);
  const [packageModal, setPackageModal] = useState<{
    name: string;
    color: CustomICColor;
    inputPins: CustomICPin[];
    outputPins: CustomICPin[];
  } | null>(null);

  const showCanvasToast = useCallback(
    (message: string, tone: 'warn' | 'success' | 'info' = 'info') => {
      setCanvasToast({ message, tone });
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = window.setTimeout(() => {
        setCanvasToast(null);
        toastTimerRef.current = null;
      }, 4200);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  // Measure right canvas pixel dimensions so SVG viewBox always matches 1:1 aspect ratio
  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 40 && rect.height > 40) {
        setViewportSize({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const viewW = viewportSize.width / zoom;
  const viewH = viewportSize.height / zoom;

  const centerNodesInViewport = useCallback(
    (targetNodes: CircuitNode[], customSize?: { width: number; height: number }) => {
      const box = customSize ?? viewportSize;
      if (targetNodes.length === 0) {
        setZoom(1);
        setPan({ x: 0, y: 0 });
        return;
      }
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const n of targetNodes) {
        const meta = getNodeMeta(n, customICsRef.current);
        minX = Math.min(minX, n.x);
        minY = Math.min(minY, n.y);
        maxX = Math.max(maxX, n.x + meta.width);
        maxY = Math.max(maxY, n.y + meta.height);
      }
      const contentW = Math.max(120, maxX - minX + 100);
      const contentH = Math.max(120, maxY - minY + 110);
      const fitZoom = Math.min(
        1,
        Math.max(MIN_ZOOM, Math.min(box.width / contentW, box.height / contentH))
      );
      const nextZoom = Number(fitZoom.toFixed(2));
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      setZoom(nextZoom);
      setPan({
        x: cx - box.width / nextZoom / 2,
        y: cy - box.height / nextZoom / 2,
      });
    },
    [viewportSize]
  );

  // Center initial challenge nodes only when starting fresh (never wipe restored session or re-render)
  const challengeRef = useRef(challenge);
  challengeRef.current = challenge;
  const sessionChallengeCircuitsRef = useRef(session.challengeCircuits);
  sessionChallengeCircuitsRef.current = session.challengeCircuits;
  const initializedChallengeKeyRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (mode !== 'challenge' || !challengeRef.current) return;
    if (initializedChallengeKeyRef.current === challengeKey && challengeKey !== undefined) {
      return;
    }
    initializedChallengeKeyRef.current = challengeKey;

    const existing = challengeKey
      ? sessionChallengeCircuitsRef.current[challengeKey]
      : undefined;
    if (existing) {
      const evaluated = evaluateCircuit(
        existing.nodes,
        existing.wires,
        false,
        customICsRef.current
      );
      setNodes(evaluated);
      setWires(existing.wires);
      setVerification(existing.verification ?? null);
      if (existing.zoom !== undefined) setZoom(existing.zoom);
      if (existing.pan) setPan(existing.pan);
      return;
    }

    const starter = evaluateCircuit(
      buildChallengeStarter(challengeRef.current),
      [],
      false,
      customICsRef.current
    );
    setNodes(starter);
    setWires([]);
    setVerification(null);
    setSelectedNodeId(null);
    setSelectedWireId(null);
    setConnectingFrom(null);
    setPointerPos(null);
    setContextMenu(null);
    const rect = canvasWrapRef.current?.getBoundingClientRect();
    centerNodesInViewport(
      starter,
      rect && rect.width > 40 ? { width: rect.width, height: rect.height } : undefined
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, challengeKey]);

  // Sync circuit changes back to SessionContext (debounced persistence in SessionProvider)
  const skipFirstSyncRef = useRef(true);
  useEffect(() => {
    if (skipFirstSyncRef.current) {
      skipFirstSyncRef.current = false;
      return;
    }
    if (mode === 'lab') {
      setLabCircuit({
        activePresetId,
        nodes,
        wires,
        zoom,
        pan,
      });
    } else if (mode === 'challenge' && challengeKey) {
      setChallengeCircuit(challengeKey, {
        nodes,
        wires,
        zoom,
        pan,
        verification,
      });
    }
  }, [
    mode,
    challengeKey,
    activePresetId,
    nodes,
    wires,
    zoom,
    pan,
    verification,
    setLabCircuit,
    setChallengeCircuit,
  ]);

  // Close floating right-click context menu on outside click
  useEffect(() => {
    if (!contextMenu) return;
    const handleOutsidePointerDown = (e: PointerEvent) => {
      if (
        contextMenuRef.current &&
        e.target instanceof Node &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setContextMenu(null);
      }
    };
    window.addEventListener('pointerdown', handleOutsidePointerDown);
    return () => window.removeEventListener('pointerdown', handleOutsidePointerDown);
  }, [contextMenu]);

  const applyEvaluation = useCallback(
    (nextNodes: CircuitNode[], nextWires: CircuitWire[], triggerSeq = true) => {
      const evaluated = evaluateCircuit(
        nextNodes,
        nextWires,
        triggerSeq,
        customICsRef.current
      );
      setNodes(evaluated);
    },
    []
  );

  // Convert client pointer event to exact SVG world coordinates across all zoom & pan states
  const clientToSvgCoords = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: pan.x + 120, y: pan.y + 120 };

      const rect = svg.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return {
          x: pan.x + ((clientX - rect.left) / rect.width) * viewW,
          y: pan.y + ((clientY - rect.top) / rect.height) * viewH,
        };
      }
      return {
        x: pan.x + (clientX - rect.left) / zoom,
        y: pan.y + (clientY - rect.top) / zoom,
      };
    },
    [pan, zoom, viewW, viewH]
  );

  // Smooth zoom around either cursor position or viewport center
  const zoomAtClientPoint = useCallback(
    (rawNextZoom: number, clientX?: number, clientY?: number) => {
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(rawNextZoom.toFixed(2))));
      const svg = svgRef.current;
      if (!svg) {
        setZoom(nextZoom);
        return;
      }
      const rect = svg.getBoundingClientRect();
      const fx =
        clientX !== undefined && rect.width > 0
          ? (clientX - rect.left) / rect.width
          : 0.5;
      const fy =
        clientY !== undefined && rect.height > 0
          ? (clientY - rect.top) / rect.height
          : 0.5;

      const worldX = pan.x + fx * (rect.width / zoom);
      const worldY = pan.y + fy * (rect.height / zoom);

      setZoom(nextZoom);
      setPan({
        x: worldX - fx * (rect.width / nextZoom),
        y: worldY - fy * (rect.height / nextZoom),
      });
    },
    [pan, zoom]
  );

  // Non-passive Ctrl+Wheel zoom on canvas
  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.1 : -0.1;
        zoomAtClientPoint(zoom + delta, e.clientX, e.clientY);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoom, zoomAtClientPoint]);

  // Magnetic snap target finder (expanded 28px threshold on touch screens, scales cleanly with zoom)
  const snappedTarget = useMemo(() => {
    if (!connectingFrom || !pointerPos) return null;
    const baseRadius = connectingFrom.isTouch ? 28 : 22;
    const snapRadius = Math.max(baseRadius, baseRadius / zoom);
    let best: {
      nodeId: string;
      pinId: string;
      direction: 'in' | 'out';
      x: number;
      y: number;
      dist: number;
    } | null = null;

    for (const node of nodes) {
      if (node.id === connectingFrom.nodeId) continue;
      const meta = getNodeMeta(node, customICs);
      for (const pin of meta.pins) {
        if (pin.direction === connectingFrom.direction) continue;
        const px = node.x + pin.relX;
        const py = node.y + pin.relY;
        const dist = Math.hypot(pointerPos.x - px, pointerPos.y - py);
        if (dist <= snapRadius && (!best || dist < best.dist)) {
          best = {
            nodeId: node.id,
            pinId: pin.id,
            direction: pin.direction,
            x: px,
            y: py,
            dist,
          };
        }
      }
    }
    return best;
  }, [connectingFrom, pointerPos, nodes, zoom, customICs]);

  const completeWireConnection = useCallback(
    (
      src: { nodeId: string; pinId: string; direction: 'in' | 'out' },
      dst: { nodeId: string; pinId: string; direction: 'in' | 'out' }
    ) => {
      if (src.nodeId === dst.nodeId || src.direction === dst.direction) return;
      const outPin = src.direction === 'out' ? src : dst;
      const inPin = src.direction === 'in' ? src : dst;

      const filtered = wires.filter(
        (w) => !(w.toNodeId === inPin.nodeId && w.toPinId === inPin.pinId)
      );
      const nextWires: CircuitWire[] = [
        ...filtered,
        {
          id: makeUid('w'),
          fromNodeId: outPin.nodeId,
          fromPinId: outPin.pinId,
          toNodeId: inPin.nodeId,
          toPinId: inPin.pinId,
        },
      ];
      setWires(nextWires);
      setConnectingFrom(null);
      setPointerPos(null);
      applyEvaluation(nodes, nextWires, false);
      setVerification(null);
    },
    [wires, nodes, applyEvaluation]
  );

  // Clock ticking effect
  const activeClocksKey = useMemo(
    () =>
      nodes
        .filter((n) => n.type === 'CLOCK' && clockRunningIds[n.id])
        .map((n) => `${n.id}:${n.internal.clockHz ?? 1}`)
        .join(','),
    [nodes, clockRunningIds]
  );

  useEffect(() => {
    if (!activeClocksKey) return;
    const runningClocks = nodes.filter(
      (n) => n.type === 'CLOCK' && clockRunningIds[n.id]
    );
    if (runningClocks.length === 0) return;

    const timers = runningClocks.map((clkNode) => {
      const hz = Math.max(0.5, Math.abs(clkNode.internal.clockHz ?? 1));
      const halfPeriodMs = Math.round(500 / hz);
      return window.setInterval(() => {
        setNodes((prevNodes) => {
          const updated = prevNodes.map((n) =>
            n.id === clkNode.id
              ? {
                  ...n,
                  outputs: {
                    ...n.outputs,
                    out: (n.outputs.out === 1 ? 0 : 1) as LogicValue,
                  },
                }
              : n
          );
          return evaluateCircuit(updated, wires, true, customICsRef.current);
        });
      }, halfPeriodMs);
    });

    return () => {
      timers.forEach((t) => window.clearInterval(t));
    };
  }, [activeClocksKey, wires]);

  // Keyboard Delete / Backspace / Escape handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConnectingFrom(null);
        setPointerPos(null);
        setContextMenu(null);
        setPackageModal(null);
        return;
      }
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedWireId) {
          e.preventDefault();
          const nextWires = wires.filter((w) => w.id !== selectedWireId);
          setWires(nextWires);
          setSelectedWireId(null);
          applyEvaluation(nodes, nextWires, false);
          setVerification(null);
        } else if (selectedNodeId) {
          const target = nodes.find((n) => n.id === selectedNodeId);
          if (target && !target.locked) {
            e.preventDefault();
            const nextNodes = nodes.filter((n) => n.id !== selectedNodeId);
            const nextWires = wires.filter(
              (w) => w.fromNodeId !== selectedNodeId && w.toNodeId !== selectedNodeId
            );
            setWires(nextWires);
            setSelectedNodeId(null);
            applyEvaluation(nextNodes, nextWires, false);
            setVerification(null);
          }
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedWireId, selectedNodeId, nodes, wires, applyEvaluation]);

  const addComponentAt = (
    type: ComponentType,
    rawX: number,
    rawY: number,
    snapTo10 = true
  ) => {
    const x = snapTo10 ? Math.round(rawX / 10) * 10 : Math.round(rawX);
    const y = snapTo10 ? Math.round(rawY / 10) * 10 : Math.round(rawY);
    const newNode = createDefaultNode(type, makeUid('n'), x, y);
    const nextNodes = [...nodes, newNode];
    applyEvaluation(nextNodes, wires, false);
    setSelectedNodeId(newNode.id);
    setSelectedWireId(null);
    setVerification(null);
  };

  // One-click spawn at visible SVG viewport center with +24px diagonal cascade
  const handlePaletteClick = (type: ComponentType) => {
    const meta = COMPONENT_CATALOG[type];
    const baseStep = (spawnCascadeRef.current % 6) * 24;
    spawnCascadeRef.current += 1;

    let x = Math.round(pan.x + viewW / 2 - meta.width / 2 - 48 + baseStep);
    let y = Math.round(pan.y + viewH / 2 - meta.height / 2 - 48 + baseStep);

    let guard = 0;
    while (
      guard < 8 &&
      nodes.some((n) => Math.hypot(n.x - x, n.y - y) < 20)
    ) {
      x += 24;
      y += 24;
      guard++;
    }

    addComponentAt(type, x, y, false);
  };

  const handleCustomICClick = (ic: CustomICDefinition) => {
    const meta = buildCustomICMeta(ic);
    const baseStep = (spawnCascadeRef.current % 6) * 24;
    spawnCascadeRef.current += 1;

    let x = Math.round(pan.x + viewW / 2 - meta.width / 2 - 48 + baseStep);
    let y = Math.round(pan.y + viewH / 2 - meta.height / 2 - 48 + baseStep);

    let guard = 0;
    while (
      guard < 8 &&
      nodes.some((n) => Math.hypot(n.x - x, n.y - y) < 20)
    ) {
      x += 24;
      y += 24;
      guard++;
    }

    const newNode = createCustomICNode(ic, makeUid('ic'), x, y);
    const nextNodes = [...nodes, newNode];
    applyEvaluation(nextNodes, wires, false);
    setSelectedNodeId(newNode.id);
    setSelectedWireId(null);
    setVerification(null);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const customIcId = e.dataTransfer.getData('application/com3021-custom-ic');
    if (customIcId) {
      const ic = customICs.find((item) => item.id === customIcId);
      if (!ic) return;
      const { x, y } = clientToSvgCoords(e.clientX, e.clientY);
      const meta = buildCustomICMeta(ic);
      const snapX = Math.round((x - meta.width / 2) / 10) * 10;
      const snapY = Math.round((y - meta.height / 2) / 10) * 10;
      const newNode = createCustomICNode(ic, makeUid('ic'), snapX, snapY);
      applyEvaluation([...nodes, newNode], wires, false);
      setSelectedNodeId(newNode.id);
      setSelectedWireId(null);
      setVerification(null);
      return;
    }

    const type = e.dataTransfer.getData('application/com3021-component') as ComponentType;
    if (!type || !COMPONENT_CATALOG[type] || type === 'CUSTOM_IC') return;
    const { x, y } = clientToSvgCoords(e.clientX, e.clientY);
    const meta = COMPONENT_CATALOG[type];
    addComponentAt(type, x - meta.width / 2, y - meta.height / 2);
  };

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearLongPressTimer();
  }, [clearLongPressTimer]);

  const openContextMenuAtClientPos = useCallback(
    (nodeId: string, clientX: number, clientY: number) => {
      setSelectedNodeId(nodeId);
      setSelectedWireId(null);

      const rect = canvasWrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const menuWidth = Math.min(264, rect.width - 16);
      const menuHeight = 250;
      const rawX = clientX - rect.left + 8;
      const rawY = clientY - rect.top + 8;
      setContextMenu({
        nodeId,
        x: Math.max(8, Math.min(rect.width - menuWidth - 8, rawX)),
        y: Math.max(8, Math.min(rect.height - menuHeight - 8, rawY)),
      });
    },
    []
  );

  const handleSvgPointerDownCapture = (e: React.PointerEvent<SVGSVGElement>) => {
    activePointersRef.current.set(e.pointerId, {
      clientX: e.clientX,
      clientY: e.clientY,
    });
    if (activePointersRef.current.size === 2) {
      clearLongPressTimer();
      setPanning(null);
      setDraggingNode(null);
      setConnectingFrom(null);
      setPointerPos(null);
      const pts = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[1].clientX - pts[0].clientX, pts[1].clientY - pts[0].clientY);
      const midX = (pts[0].clientX + pts[1].clientX) / 2;
      const midY = (pts[0].clientY + pts[1].clientY) / 2;
      pinchStateRef.current = {
        dist,
        midX,
        midY,
        startZoom: zoom,
        startPanX: pan.x,
        startPanY: pan.y,
      };
    }
  };

  const handleSvgPointerMoveCapture = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activePointersRef.current.has(e.pointerId)) {
      activePointersRef.current.set(e.pointerId, {
        clientX: e.clientX,
        clientY: e.clientY,
      });
    }
    if (activePointersRef.current.size >= 2 && pinchStateRef.current) {
      const pts = Array.from(activePointersRef.current.values());
      const newDist = Math.hypot(
        pts[1].clientX - pts[0].clientX,
        pts[1].clientY - pts[0].clientY
      );
      const newMidX = (pts[0].clientX + pts[1].clientX) / 2;
      const newMidY = (pts[0].clientY + pts[1].clientY) / 2;
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0 && pinchStateRef.current.dist > 5) {
        const scale = newDist / pinchStateRef.current.dist;
        const nextZoom = Math.min(
          MAX_ZOOM,
          Math.max(MIN_ZOOM, Number((pinchStateRef.current.startZoom * scale).toFixed(2)))
        );
        const startFx = (pinchStateRef.current.midX - rect.left) / rect.width;
        const startFy = (pinchStateRef.current.midY - rect.top) / rect.height;
        const worldMidX =
          pinchStateRef.current.startPanX +
          startFx * (rect.width / pinchStateRef.current.startZoom);
        const worldMidY =
          pinchStateRef.current.startPanY +
          startFy * (rect.height / pinchStateRef.current.startZoom);

        const curFx = (newMidX - rect.left) / rect.width;
        const curFy = (newMidY - rect.top) / rect.height;
        setZoom(nextZoom);
        setPan({
          x: worldMidX - curFx * (rect.width / nextZoom),
          y: worldMidY - curFy * (rect.height / nextZoom),
        });
      }
    }
  };

  const cleanupPointerTracking = (pointerId: number) => {
    activePointersRef.current.delete(pointerId);
    if (activePointersRef.current.size < 2) {
      pinchStateRef.current = null;
    }
    clearLongPressTimer();
    try {
      if (svgRef.current?.hasPointerCapture?.(pointerId)) {
        svgRef.current.releasePointerCapture(pointerId);
      }
    } catch {
      // Ignore already released capture
    }
  };

  const handleSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (activePointersRef.current.size >= 2) return;
    setContextMenu(null);
    try {
      svgRef.current?.setPointerCapture?.(e.pointerId);
    } catch {
      // Safe fallback
    }
    setPanning({
      startClientX: e.clientX,
      startClientY: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
      hasMoved: false,
    });
  };

  const handleSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activePointersRef.current.size >= 2) return;

    if (panning) {
      const dxClient = e.clientX - panning.startClientX;
      const dyClient = e.clientY - panning.startClientY;
      const moveDist = Math.hypot(dxClient, dyClient);
      if (!panning.hasMoved && moveDist <= 5) {
        return;
      }
      if (!panning.hasMoved) {
        setPanning((prev) => (prev ? { ...prev, hasMoved: true } : null));
      }
      setPan({
        x: panning.startPanX - dxClient / zoom,
        y: panning.startPanY - dyClient / zoom,
      });
      return;
    }

    const coords = clientToSvgCoords(e.clientX, e.clientY);
    if (draggingNode) {
      const moveDist = Math.hypot(
        e.clientX - draggingNode.startClientX,
        e.clientY - draggingNode.startClientY
      );
      if (moveDist > 6) {
        clearLongPressTimer();
      }
      if (!draggingNode.hasMovedPastDeadzone) {
        if (moveDist <= 8) {
          return;
        }
        setDraggingNode((prev) =>
          prev ? { ...prev, hasMovedPastDeadzone: true } : null
        );
      }
      const snapX = Math.round((coords.x - draggingNode.offsetX) / 10) * 10;
      const snapY = Math.round((coords.y - draggingNode.offsetY) / 10) * 10;
      setNodes((prev) =>
        prev.map((n) =>
          n.id === draggingNode.nodeId ? { ...n, x: snapX, y: snapY } : n
        )
      );
    }
    if (connectingFrom) {
      setPointerPos(coords);
      if (
        !connectingFrom.hasMoved &&
        Math.hypot(coords.x - connectingFrom.startX, coords.y - connectingFrom.startY) > 7
      ) {
        setConnectingFrom((prev) => (prev ? { ...prev, hasMoved: true } : null));
      }
    }
  };

  const handleSvgPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    cleanupPointerTracking(e.pointerId);

    if (panning) {
      const moved =
        panning.hasMoved ||
        Math.hypot(e.clientX - panning.startClientX, e.clientY - panning.startClientY) > 5;
      setPanning(null);
      if (!moved) {
        setSelectedNodeId(null);
        setSelectedWireId(null);
        setContextMenu(null);
        setConnectingFrom(null);
        setPointerPos(null);
      }
      return;
    }
    if (draggingNode) {
      clearLongPressTimer();
      const dist = Math.hypot(
        e.clientX - draggingNode.startClientX,
        e.clientY - draggingNode.startClientY
      );
      const elapsed = Date.now() - draggingNode.startTime;
      const tappedNode = nodes.find((n) => n.id === draggingNode.nodeId);
      if (
        tappedNode?.type === 'SWITCH' &&
        !draggingNode.hasMovedPastDeadzone &&
        dist <= 8 &&
        elapsed < 450
      ) {
        handleToggleSwitch(tappedNode.id);
      }
      setDraggingNode(null);
      return;
    }
    if (connectingFrom) {
      if (snappedTarget) {
        completeWireConnection(
          {
            nodeId: connectingFrom.nodeId,
            pinId: connectingFrom.pinId,
            direction: connectingFrom.direction,
          },
          {
            nodeId: snappedTarget.nodeId,
            pinId: snappedTarget.pinId,
            direction: snappedTarget.direction,
          }
        );
      } else if (connectingFrom.hasMoved) {
        setConnectingFrom(null);
        setPointerPos(null);
      }
    }
  };

  const handleSvgPointerCancel = (e: React.PointerEvent<SVGSVGElement>) => {
    cleanupPointerTracking(e.pointerId);
    setPanning(null);
    setDraggingNode(null);
  };

  const handleStartDragNode = (nodeId: string, e: React.PointerEvent) => {
    if (activePointersRef.current.size >= 2) return;
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    const coords = clientToSvgCoords(e.clientX, e.clientY);
    try {
      svgRef.current?.setPointerCapture?.(e.pointerId);
    } catch {
      // Safe fallback
    }
    setDraggingNode({
      nodeId,
      offsetX: coords.x - node.x,
      offsetY: coords.y - node.y,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startTime: Date.now(),
      hasMovedPastDeadzone: false,
    });

    clearLongPressTimer();
    if (e.pointerType !== 'mouse') {
      const cx = e.clientX;
      const cy = e.clientY;
      longPressTimerRef.current = window.setTimeout(() => {
        setDraggingNode(null);
        openContextMenuAtClientPos(nodeId, cx, cy);
      }, 500);
    }
  };

  const handlePinPointerDown = (
    node: CircuitNode,
    pin: PinDefinition,
    e: React.PointerEvent
  ) => {
    e.stopPropagation();
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (activePointersRef.current.size >= 2) return;
    const pinX = node.x + pin.relX;
    const pinY = node.y + pin.relY;

    // Second tap/click: complete connection or toggle off if same pin
    if (connectingFrom) {
      if (connectingFrom.nodeId === node.id && connectingFrom.pinId === pin.id) {
        setConnectingFrom(null);
        setPointerPos(null);
        return;
      }
      if (
        connectingFrom.nodeId !== node.id &&
        connectingFrom.direction !== pin.direction
      ) {
        completeWireConnection(
          {
            nodeId: connectingFrom.nodeId,
            pinId: connectingFrom.pinId,
            direction: connectingFrom.direction,
          },
          {
            nodeId: node.id,
            pinId: pin.id,
            direction: pin.direction,
          }
        );
        return;
      }
    }

    try {
      svgRef.current?.setPointerCapture?.(e.pointerId);
    } catch {
      // Safe fallback
    }
    setConnectingFrom({
      nodeId: node.id,
      pinId: pin.id,
      direction: pin.direction,
      startX: pinX,
      startY: pinY,
      hasMoved: false,
      isTouch: e.pointerType !== 'mouse',
    });
    setPointerPos({ x: pinX, y: pinY });
    setSelectedWireId(null);
  };

  const handlePinPointerUp = (
    node: CircuitNode,
    pin: PinDefinition,
    e: React.PointerEvent
  ) => {
    e.stopPropagation();
    cleanupPointerTracking(e.pointerId);
    if (
      connectingFrom &&
      connectingFrom.nodeId !== node.id &&
      connectingFrom.direction !== pin.direction
    ) {
      completeWireConnection(
        {
          nodeId: connectingFrom.nodeId,
          pinId: connectingFrom.pinId,
          direction: connectingFrom.direction,
        },
        {
          nodeId: node.id,
          pinId: pin.id,
          direction: pin.direction,
        }
      );
    }
  };

  const handleToggleSwitch = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) => {
        const nextNodes = prevNodes.map((n) =>
          n.id === nodeId
            ? {
                ...n,
                outputs: {
                  ...n.outputs,
                  out: (n.outputs.out === 1 ? 0 : 1) as LogicValue,
                },
              }
            : n
        );
        return evaluateCircuit(nextNodes, wires, true, customICsRef.current);
      });
    },
    [wires]
  );

  const handleButtonState = (nodeId: string, val: LogicValue) => {
    const nextNodes = nodes.map((n) =>
      n.id === nodeId ? { ...n, outputs: { ...n.outputs, out: val } } : n
    );
    applyEvaluation(nextNodes, wires, true);
  };

  const handleToggleClockPlay = (nodeId: string) => {
    setClockRunningIds((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleCycleClockSpeed = (nodeId: string) => {
    const speeds = [0.5, 1, 2, 4];
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id !== nodeId) return n;
        const curr = n.internal.clockHz ?? 1;
        const idx = speeds.indexOf(curr);
        const next = speeds[(idx + 1) % speeds.length];
        return { ...n, internal: { ...n.internal, clockHz: next } };
      })
    );
  };

  const setInternalClocksValue = (
    list: CircuitNode[],
    val: LogicValue
  ): CircuitNode[] =>
    list.map((n) => {
      if (n.type === 'CLOCK') {
        return { ...n, outputs: { ...n.outputs, out: val } };
      }
      if (n.type === 'CUSTOM_IC' && n.internal.subcircuitNodes) {
        return {
          ...n,
          internal: {
            ...n.internal,
            subcircuitNodes: setInternalClocksValue(n.internal.subcircuitNodes, val),
          },
        };
      }
      return n;
    });

  const hasSubcircuitClock = (node: CircuitNode): boolean =>
    Boolean(
      node.type === 'CUSTOM_IC' &&
        node.internal.subcircuitNodes?.some(
          (sn) => sn.type === 'CLOCK' || hasSubcircuitClock(sn)
        )
    );

  const pulseClockIds = (targetIds: Set<string>, includeSubcircuitClocks = false) => {
    if (targetIds.size === 0 && !includeSubcircuitClocks) return;

    const applyClockLevel = (list: CircuitNode[], val: LogicValue) =>
      list.map((n) => {
        if (targetIds.has(n.id)) {
          return { ...n, outputs: { ...n.outputs, out: val } };
        }
        if (
          includeSubcircuitClocks &&
          n.type === 'CUSTOM_IC' &&
          n.internal.subcircuitNodes
        ) {
          return {
            ...n,
            internal: {
              ...n.internal,
              subcircuitNodes: setInternalClocksValue(n.internal.subcircuitNodes, val),
            },
          };
        }
        return n;
      });

    const lowNodes = applyClockLevel(nodes, 0);
    const settledLow = evaluateCircuit(lowNodes, wires, true, customICsRef.current);
    const highNodes = applyClockLevel(settledLow, 1);
    const triggered = evaluateCircuit(highNodes, wires, true, customICsRef.current);
    setNodes(triggered);

    window.setTimeout(() => {
      setNodes((latest) => {
        const falling = applyClockLevel(latest, 0);
        return evaluateCircuit(falling, wires, true, customICsRef.current);
      });
    }, 180);
  };

  const handleClockStepPulse = (nodeId: string) => {
    pulseClockIds(new Set([nodeId]), false);
  };

  const handleGlobalClockPulse = () => {
    const clockNodes = nodes.filter((n) => n.type === 'CLOCK');
    const hasNestedClocks = nodes.some((n) => hasSubcircuitClock(n));
    if (clockNodes.length > 0 || hasNestedClocks) {
      pulseClockIds(new Set(clockNodes.map((n) => n.id)), hasNestedClocks);
    } else {
      handlePaletteClick('CLOCK');
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    const target = nodes.find((n) => n.id === nodeId);
    if (!target || target.locked) return;
    const nextNodes = nodes.filter((n) => n.id !== nodeId);
    const nextWires = wires.filter(
      (w) => w.fromNodeId !== nodeId && w.toNodeId !== nodeId
    );
    setWires(nextWires);
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
    setContextMenu(null);
    applyEvaluation(nextNodes, nextWires, false);
    setVerification(null);
  };

  const handleSwapComponentType = (nodeId: string, nextType: ComponentType) => {
    const target = nodes.find((n) => n.id === nodeId);
    if (!target || target.locked || target.type === nextType) {
      setContextMenu(null);
      return;
    }

    const oldMeta = getNodeMeta(target, customICs);
    const newMeta = COMPONENT_CATALOG[nextType];

    const validInPinIds = new Set(
      newMeta.pins.filter((p) => p.direction === 'in').map((p) => p.id)
    );
    const validOutPinIds = new Set(
      newMeta.pins.filter((p) => p.direction === 'out').map((p) => p.id)
    );

    const nextWires = wires
      .map((w) => {
        if (w.toNodeId === nodeId) {
          if (
            (target.type === 'DFF' && nextType === 'TFF' && w.toPinId === 'd') ||
            (target.type === 'TFF' && nextType === 'DFF' && w.toPinId === 't')
          ) {
            return { ...w, toPinId: nextType === 'TFF' ? 't' : 'd' };
          }
          if (w.toPinId === 's' && validInPinIds.has('s0')) {
            return { ...w, toPinId: 's0' };
          }
          if (!validInPinIds.has(w.toPinId)) return null;
        }
        if (w.fromNodeId === nodeId) {
          if (
            (target.type === 'HALF_ADDER' && nextType === 'FULL_ADDER' && w.fromPinId === 'c') ||
            (target.type === 'FULL_ADDER' && nextType === 'HALF_ADDER' && w.fromPinId === 'cout')
          ) {
            return { ...w, fromPinId: nextType === 'FULL_ADDER' ? 'cout' : 'c' };
          }
          if (!validOutPinIds.has(w.fromPinId)) return null;
        }
        return w;
      })
      .filter((w): w is CircuitWire => w !== null);

    const nextNodes = nodes.map((n) => {
      if (n.id !== nodeId) return n;
      const nextInputs: Record<string, LogicValue> = {};
      const nextOutputs: Record<string, LogicValue> = {};
      newMeta.pins.forEach((p) => {
        if (p.direction === 'in') {
          if ((nextType === 'DECODER_2TO4' || nextType === 'DECODER_3TO8') && p.id === 'e') {
            nextInputs[p.id] = n.inputs[p.id] ?? 1;
          } else {
            nextInputs[p.id] = n.inputs[p.id] ?? 0;
          }
        } else {
          nextOutputs[p.id] = n.outputs[p.id] ?? (p.id === 'qn' ? 1 : 0);
        }
      });

      const updatedLabel =
        n.label === oldMeta.shortLabel ? newMeta.shortLabel : n.label;

      return {
        ...n,
        type: nextType,
        label: updatedLabel,
        inputs: nextInputs,
        outputs: nextOutputs,
      };
    });

    setWires(nextWires);
    applyEvaluation(nextNodes, nextWires, false);
    setVerification(null);
    setContextMenu(null);
  };

  const handleOpenNodeContextMenu = (nodeId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openContextMenuAtClientPos(nodeId, e.clientX, e.clientY);
  };

  const handleDeleteWire = (wireId: string) => {
    const nextWires = wires.filter((w) => w.id !== wireId);
    setWires(nextWires);
    if (selectedWireId === wireId) setSelectedWireId(null);
    applyEvaluation(nodes, nextWires, false);
    setVerification(null);
  };

  const handleOpenPackageModal = () => {
    const switchNodes = nodes
      .filter((n) => n.type === 'SWITCH')
      .sort((a, b) => a.y - b.y || a.x - b.x);
    const ledNodes = nodes
      .filter((n) => n.type === 'LED')
      .sort((a, b) => a.y - b.y || a.x - b.x);

    if (switchNodes.length < 1 || ledNodes.length < 1) {
      showCanvasToast(sim.customIC.validationNeedPins, 'warn');
      return;
    }

    const inputPins: CustomICPin[] = switchNodes.map((n, idx) => ({
      id: `in_${idx}`,
      name: n.label.trim() || `IN${idx}`,
      nodeId: n.id,
    }));
    const outputPins: CustomICPin[] = ledNodes.map((n, idx) => ({
      id: `out_${idx}`,
      name: n.label.trim() || `OUT${idx}`,
      nodeId: n.id,
    }));

    const defaultColor = CUSTOM_IC_COLORS[customICs.length % CUSTOM_IC_COLORS.length];
    const defaultName =
      lang === 'en'
        ? `Custom IC ${customICs.length + 1}`
        : `Özel IC ${customICs.length + 1}`;

    setPackageModal({
      name: defaultName,
      color: defaultColor,
      inputPins,
      outputPins,
    });
  };

  const handleConfirmPackageIC = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageModal) return;
    const trimmedName = packageModal.name.trim() || `IC ${customICs.length + 1}`;
    const blueprint: CustomICDefinition = {
      id: makeUid('cic'),
      name: trimmedName,
      color: packageModal.color,
      inputPins: packageModal.inputPins.map((p) => ({ ...p })),
      outputPins: packageModal.outputPins.map((p) => ({ ...p })),
      internalNodes: resetSubcircuitNodes(cloneNodesDeep(nodes)),
      internalWires: wires.map((w) => ({ ...w })),
    };

    addCustomIC(blueprint);
    setPackageModal(null);
    setPhonePaletteTab('Özel IC');
    showCanvasToast(sim.customIC.savedToast(blueprint.name), 'success');
  };

  const handleLoadInternalCircuit = (nodeId: string) => {
    const target = nodes.find((n) => n.id === nodeId);
    if (!target || target.type !== 'CUSTOM_IC') return;

    const blueprint = target.customIcId
      ? customICs.find((ic) => ic.id === target.customIcId)
      : undefined;
    const sourceNodes = target.internal.subcircuitNodes ?? blueprint?.internalNodes ?? [];
    const sourceWires = target.internal.subcircuitWires ?? blueprint?.internalWires ?? [];

    if (sourceNodes.length === 0) return;

    const clonedNodes = cloneNodesDeep(sourceNodes).map((n) => ({
      ...n,
      locked: false,
    }));
    const clonedWires = sourceWires.map((w) => ({ ...w }));

    setActivePresetId('empty');
    setClockRunningIds({});
    setSelectedNodeId(null);
    setSelectedWireId(null);
    setConnectingFrom(null);
    setPointerPos(null);
    setContextMenu(null);
    setVerification(null);
    setWires(clonedWires);

    const evaluated = evaluateCircuit(clonedNodes, clonedWires, false, customICs);
    setNodes(evaluated);
    centerNodesInViewport(evaluated);
    showCanvasToast(sim.customIC.loadedToast(target.label), 'info');
  };

  const handleLoadPreset = (presetId: string) => {
    const found = presets.find((p) => p.id === presetId);
    if (!found) return;
    setActivePresetId(presetId);
    setClockRunningIds({});
    setWires(found.wires);
    setSelectedNodeId(null);
    setSelectedWireId(null);
    setConnectingFrom(null);
    setPointerPos(null);
    setContextMenu(null);
    const evaluated = evaluateCircuit(found.nodes, found.wires, false, customICs);
    setNodes(evaluated);
    centerNodesInViewport(evaluated);
  };

  const handleResetCanvas = () => {
    setClockRunningIds({});
    setSelectedNodeId(null);
    setSelectedWireId(null);
    setConnectingFrom(null);
    setPointerPos(null);
    setContextMenu(null);
    setVerification(null);
    if (mode === 'challenge' && challenge) {
      const starter = evaluateCircuit(
        buildChallengeStarter(challenge),
        [],
        false,
        customICs
      );
      setWires([]);
      setNodes(starter);
      centerNodesInViewport(starter);
    } else {
      setWires([]);
      setNodes([]);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  };

  const handleVerifyChallenge = () => {
    if (!challenge) return;
    const result = verifyCircuitAgainstTruthTable(
      nodes,
      wires,
      challenge,
      lang,
      customICs
    );
    setVerification(result);
    if (result.passed && onChallengePass) {
      onChallengePass();
    }
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  const allowedSet = useMemo(() => {
    if (!challenge?.allowedComponents) return null;
    return new Set<ComponentType>([
      ...challenge.allowedComponents,
      'SWITCH',
      'LED',
      ...(challenge.sequentialTest ? (['CLOCK'] as ComponentType[]) : []),
    ]);
  }, [challenge]);

  const handleSvgPointerUpCapture = (e: React.PointerEvent<SVGSVGElement>) => {
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) {
      pinchStateRef.current = null;
    }
    clearLongPressTimer();
  };

  const canNodeSwap = useCallback(
    (node: CircuitNode) => {
      if (node.locked) return false;
      if (
        TWO_INPUT_GATES.includes(node.type) ||
        THREE_INPUT_GATES.includes(node.type) ||
        FOUR_INPUT_GATES.includes(node.type)
      ) {
        return true;
      }
      if (node.type === 'DFF' || node.type === 'TFF') {
        const allowedFfs = (['DFF', 'TFF'] as ComponentType[]).filter(
          (t) => !allowedSet || allowedSet.has(t)
        );
        return allowedFfs.length > 1;
      }
      if (node.type === 'SWITCH' || node.type === 'BUTTON') {
        const allowedIns = (['SWITCH', 'BUTTON'] as ComponentType[]).filter(
          (t) => !allowedSet || allowedSet.has(t)
        );
        return allowedIns.length > 1;
      }
      const fam = MSI_SWAP_FAMILIES.find((f) => f.types.includes(node.type));
      if (fam) {
        const allowedFam = fam.types.filter((t) => !allowedSet || allowedSet.has(t));
        return allowedFam.length > 1;
      }
      return false;
    },
    [allowedSet]
  );

  const visiblePhoneTabs = useMemo(
    () =>
      PHONE_PALETTE_TABS.filter((tab) => {
        if (tab.id === 'Özel IC') {
          return mode === 'lab' && customICs.length > 0;
        }
        return Object.values(COMPONENT_CATALOG).some(
          (item) =>
            item.type !== 'CUSTOM_IC' &&
            tab.categories.includes(item.category) &&
            (!allowedSet || allowedSet.has(item.type))
        );
      }),
    [allowedSet, mode, customICs.length]
  );

  const activePhoneTabItems = useMemo(() => {
    const activeTab =
      visiblePhoneTabs.find((t) => t.id === phonePaletteTab) ?? visiblePhoneTabs[0];
    if (!activeTab || activeTab.id === 'Özel IC') return [];
    return Object.values(COMPONENT_CATALOG).filter(
      (item) =>
        item.type !== 'CUSTOM_IC' &&
        activeTab.categories.includes(item.category) &&
        (!allowedSet || allowedSet.has(item.type))
    );
  }, [visiblePhoneTabs, phonePaletteTab, allowedSet]);

  const activePhoneTabIsCustom = useMemo(() => {
    const activeTab =
      visiblePhoneTabs.find((t) => t.id === phonePaletteTab) ?? visiblePhoneTabs[0];
    return activeTab?.id === 'Özel IC';
  }, [visiblePhoneTabs, phonePaletteTab]);

  return (
    <div
      className={`rounded-3xl border-2 border-slate-200 border-b-4 bg-white overflow-hidden flex flex-col shadow-sm ${
        mode === 'lab' && !compact ? 'h-full w-full' : 'w-full'
      }`}
    >
      {/* Adaptive Workspace: Phone bottom sheet + Canvas on < md; Side-by-Side on md+ */}
      <div
        className={`relative flex flex-col md:flex-row overflow-hidden ${
          mode === 'lab' && !compact ? 'flex-1 h-full min-h-0' : 'h-[500px] md:h-[470px]'
        }`}
      >
        {/* Tablet (slim w-44/w-14) & Desktop (w-64/w-16) Independently Scrollable Left Palette */}
        <aside
          className={`${
            paletteCollapsed ? 'md:w-14 lg:w-16' : 'md:w-44 lg:w-64'
          } hidden md:flex shrink-0 h-full flex-col overflow-hidden border-r-2 border-slate-100 bg-[#FFFDF8] transition-all duration-200`}
        >
          {/* Palette Header */}
          <div className="shrink-0 p-2.5 border-b-2 border-slate-100 bg-gradient-to-br from-sky-50/90 via-amber-50/70 to-emerald-50/70 space-y-1.5">
            {!paletteCollapsed ? (
              <>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-6 h-6 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                      <Cpu className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-display font-extrabold text-xs text-slate-800 truncate">
                      {mode === 'challenge'
                        ? sim.paletteChallengeTitle
                        : sim.paletteLabTitle}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaletteCollapsed(true)}
                    title={sim.collapsePalette}
                    aria-label={sim.collapsePalette}
                    className="w-6 h-6 rounded-lg border-2 border-slate-200 bg-white hover:border-sky-300 text-slate-600 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10.5px] font-bold text-amber-800 bg-amber-100/80 border border-amber-200 rounded-xl px-2 py-1 text-center">
                  {sim.clickOrDragHint}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPaletteCollapsed(false)}
                  title={sim.expandPalette}
                  aria-label={sim.expandPalette}
                  className="w-9 h-8 rounded-xl border-2 border-sky-200 border-b-4 bg-white hover:bg-sky-50 text-sky-700 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Independent Scrollable 2-Column Grid Component List */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain pastel-scrollbar p-2.5 space-y-3">
            {/* Custom ICs Palette Section ("🧩 Özel Bloklarım") */}
            {mode === 'lab' && customICs.length > 0 && (
              <div>
                {!paletteCollapsed && (
                  <div className="text-[11px] font-display font-extrabold mb-1.5 px-1 truncate text-violet-700">
                    {sim.customIC.paletteSectionTitle}
                  </div>
                )}
                <div
                  className={
                    paletteCollapsed ? 'grid grid-cols-1 gap-1.5' : 'grid grid-cols-2 gap-2'
                  }
                >
                  {customICs.map((ic) => {
                    const accent = CUSTOM_IC_ACCENTS[ic.color];
                    const pinDesc = sim.customIC.pinSummary(
                      ic.inputPins.length,
                      ic.outputPins.length
                    );
                    return (
                      <div key={ic.id} className="relative group">
                        <button
                          type="button"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              'application/com3021-component',
                              'CUSTOM_IC'
                            );
                            e.dataTransfer.setData(
                              'application/com3021-custom-ic',
                              ic.id
                            );
                            e.dataTransfer.effectAllowed = 'copy';
                          }}
                          onClick={() => handleCustomICClick(ic)}
                          title={`${ic.name} (${pinDesc}) ${sim.clickOrDragSuffix}`}
                          className={`w-full rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                            paletteCollapsed ? 'px-1 py-2' : 'px-1.5 py-2'
                          } ${accent.itemBg} ${accent.itemBorder}`}
                        >
                          <span
                            className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-lg leading-tight ${accent.tag}`}
                          >
                            🧩 {paletteCollapsed ? '' : 'IC'}
                          </span>
                          {!paletteCollapsed && (
                            <>
                              <span className="text-[10.5px] font-bold text-slate-700 truncate w-full mt-1 px-0.5">
                                {ic.name}
                              </span>
                              <span className="text-[9px] font-semibold text-slate-500 truncate w-full">
                                {pinDesc}
                              </span>
                            </>
                          )}
                        </button>
                        {!paletteCollapsed && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCustomIC(ic.id);
                            }}
                            title={sim.customIC.deleteCustomIc}
                            aria-label={sim.customIC.deleteCustomIc}
                            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center shadow-xs cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {COMPONENT_CATEGORIES.map((category) => {
              const items = Object.values(COMPONENT_CATALOG).filter((item) => {
                if (item.type === 'CUSTOM_IC') return false;
                if (item.category !== category) return false;
                if (allowedSet && !allowedSet.has(item.type)) return false;
                return true;
              });
              if (items.length === 0) return null;

              const style = CATEGORY_ACCENTS[category];
              const categoryLabel = CATEGORY_LABELS[category][lang];

              if (category === 'MSI Bloklar' && !paletteCollapsed) {
                return (
                  <div key={category} className="space-y-2">
                    <div
                      className={`text-[11px] font-display font-extrabold px-1 truncate ${style.badge}`}
                    >
                      {categoryLabel}
                    </div>

                    {MSI_SUBCATEGORIES.map((sub) => {
                      const subItems = items.filter((item) => item.subcategory === sub);
                      if (subItems.length === 0) return null;
                      const subAccent = MSI_SUBCATEGORY_ACCENTS[sub];
                      const isCollapsed = Boolean(collapsedMsiGroups[sub]);
                      const subLabel = MSI_SUBCATEGORY_LABELS[sub][lang];

                      return (
                        <div key={sub} className="space-y-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setCollapsedMsiGroups((prev) => ({
                                ...prev,
                                [sub]: !prev[sub],
                              }))
                            }
                            className={`w-full flex items-center justify-between gap-1.5 px-2 py-1 rounded-xl border text-[10.5px] font-display font-extrabold transition-colors cursor-pointer ${subAccent.header}`}
                          >
                            <span className="truncate">{subLabel}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${
                                isCollapsed ? '-rotate-90' : 'rotate-0'
                              }`}
                            />
                          </button>

                          {!isCollapsed && (
                            <div className="grid grid-cols-2 gap-1.5">
                              {subItems.map((comp) => {
                                const cLabel = getCompLabel(comp);
                                const cDesc = getCompDesc(comp);
                                return (
                                  <button
                                    key={comp.type}
                                    type="button"
                                    draggable
                                    onDragStart={(e) => {
                                      e.dataTransfer.setData(
                                        'application/com3021-component',
                                        comp.type
                                      );
                                      e.dataTransfer.effectAllowed = 'copy';
                                    }}
                                    onClick={() => handlePaletteClick(comp.type)}
                                    title={`${cLabel}: ${cDesc} ${sim.clickOrDragSuffix}`}
                                    className={`rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer flex flex-col items-center justify-center text-center px-1.5 py-2 ${subAccent.itemBg} ${subAccent.itemBorder}`}
                                  >
                                    <span
                                      className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-lg leading-tight ${subAccent.tag}`}
                                    >
                                      {comp.shortLabel}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-700 truncate w-full mt-1 px-0.5 leading-tight">
                                      {cLabel}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              }

              return (
                <div key={category}>
                  {!paletteCollapsed && (
                    <div
                      className={`text-[11px] font-display font-extrabold mb-1.5 px-1 truncate ${style.badge}`}
                    >
                      {categoryLabel}
                    </div>
                  )}

                  <div
                    className={
                      paletteCollapsed ? 'grid grid-cols-1 gap-1.5' : 'grid grid-cols-2 gap-2'
                    }
                  >
                    {items.map((comp) => {
                      const tileAccent =
                        comp.subcategory && paletteCollapsed
                          ? MSI_SUBCATEGORY_ACCENTS[comp.subcategory]
                          : style;
                      const cLabel = getCompLabel(comp);
                      const cDesc = getCompDesc(comp);
                      return (
                        <button
                          key={comp.type}
                          type="button"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('application/com3021-component', comp.type);
                            e.dataTransfer.effectAllowed = 'copy';
                          }}
                          onClick={() => handlePaletteClick(comp.type)}
                          title={`${cLabel}: ${cDesc} ${sim.clickOrDragSuffix}`}
                          className={`rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                            paletteCollapsed ? 'px-1 py-2' : 'px-1.5 py-2'
                          } ${tileAccent.itemBg} ${tileAccent.itemBorder}`}
                        >
                          <span
                            className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-lg leading-tight ${tileAccent.tag}`}
                          >
                            {comp.shortLabel}
                          </span>
                          {!paletteCollapsed && (
                            <span className="text-[10.5px] font-bold text-slate-700 truncate w-full mt-1 px-0.5">
                              {cLabel}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Workspace: Mobile Non-Overlapping Controls + Main SVG Circuit Canvas */}
        <div className="flex-1 min-h-0 h-full min-w-0 flex flex-col overflow-hidden bg-[#FFFDF9]">
          {/* Phone (< md) Top Action Bar + Swipeable Preset Strip (never overlaps SVG canvas) */}
          <div className="flex flex-col md:hidden shrink-0 border-b border-slate-200 bg-white/95 z-30">
            <div className="px-2.5 py-1.5 flex flex-wrap items-center justify-between gap-1">
              <div className="flex items-center gap-1 flex-wrap">
                <button
                  type="button"
                  onClick={handleGlobalClockPulse}
                  title={sim.clockPulseTitle}
                  className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-amber-800 text-[11px] font-extrabold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
                >
                  <Play className="w-3 h-3 fill-amber-500 text-amber-600" />
                  <span>{sim.pulseShort}</span>
                </button>

                {mode === 'lab' && (
                  <button
                    type="button"
                    onClick={handleOpenPackageModal}
                    title={sim.customIC.packageBtnTitle}
                    className="flex items-center gap-1 px-2 py-1 rounded-xl bg-violet-50 hover:bg-violet-100 border-2 border-violet-200 text-violet-800 text-[11px] font-extrabold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
                  >
                    <span>{sim.customIC.packageBtnShort}</span>
                  </button>
                )}

                {mode === 'challenge' && challenge && (
                  <button
                    type="button"
                    onClick={handleVerifyChallenge}
                    className="flex items-center gap-1 px-2 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 border-2 border-emerald-600 text-white text-[11px] font-extrabold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{sim.verifyShort}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetCanvas}
                  title={mode === 'challenge' ? sim.resetToStart : sim.clearCanvas}
                  aria-label={mode === 'challenge' ? sim.resetToStart : sim.clearCanvas}
                  className="flex items-center gap-1 px-2 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 text-rose-700 text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {selectedWireId && (
                  <button
                    type="button"
                    onClick={() => handleDeleteWire(selectedWireId)}
                    className="flex items-center gap-1 px-2 py-1 rounded-xl bg-rose-500 hover:bg-rose-600 border-2 border-rose-600 text-white text-[11px] font-bold shadow-xs cursor-pointer min-h-[32px]"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{sim.deleteWire}</span>
                  </button>
                )}
              </div>

              {/* Mobile Zoom & Center Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => zoomAtClientPoint(zoom - 0.15)}
                  disabled={zoom <= MIN_ZOOM}
                  title={sim.zoomOut}
                  aria-label={sim.zoomOut}
                  className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 disabled:opacity-40 text-slate-700 cursor-pointer min-h-[32px]"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => zoomAtClientPoint(1)}
                  title={sim.resetZoom100}
                  className="px-1.5 py-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 font-mono text-[10.5px] font-extrabold text-slate-700 min-w-[38px] text-center cursor-pointer min-h-[32px]"
                >
                  {Math.round(zoom * 100)}%
                </button>

                <button
                  type="button"
                  onClick={() => zoomAtClientPoint(zoom + 0.15)}
                  disabled={zoom >= MAX_ZOOM}
                  title={sim.zoomIn}
                  aria-label={sim.zoomIn}
                  className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 disabled:opacity-40 text-slate-700 cursor-pointer min-h-[32px]"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => centerNodesInViewport(nodes)}
                  title={sim.centerCircuit}
                  aria-label={sim.centerCircuit}
                  className="flex items-center justify-center px-2 py-1 rounded-xl border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 cursor-pointer min-h-[32px]"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {mode === 'lab' && (
              <div
                aria-label={sim.presetAria}
                className="flex items-center overflow-x-auto whitespace-nowrap gap-2 px-3 py-2 border-t border-slate-100 bg-[#FFFDF8] no-scrollbar"
              >
                {presets.map((p) => {
                  const active = activePresetId === p.id;
                  const accent = PRESET_CATEGORY_ACCENTS[p.category];
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleLoadPreset(p.id)}
                      aria-pressed={active}
                      title={p.description}
                      className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 text-[11px] font-bold transition-all cursor-pointer min-h-[32px] ${
                        active ? accent.active : accent.idle
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
                      <span>{p.shortName}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Main SVG Circuit Canvas */}
          <div
            ref={canvasWrapRef}
            onDragOver={handleCanvasDragOver}
            onDrop={handleCanvasDrop}
            className="relative flex-1 min-h-0 min-w-0 overflow-hidden bg-[#FFFDF9]"
          >
            {/* Unified Pure-Math SVG Canvas */}
          <svg
            ref={svgRef}
            viewBox={`${pan.x} ${pan.y} ${viewW} ${viewH}`}
            preserveAspectRatio="none"
            onPointerDownCapture={handleSvgPointerDownCapture}
            onPointerMoveCapture={handleSvgPointerMoveCapture}
            onPointerUpCapture={handleSvgPointerUpCapture}
            onPointerDown={handleSvgPointerDown}
            onPointerMove={handleSvgPointerMove}
            onPointerUp={handleSvgPointerUp}
            onPointerCancel={handleSvgPointerCancel}
            style={{
              cursor: panning?.hasMoved
                ? 'grabbing'
                : connectingFrom
                  ? 'crosshair'
                  : 'default',
            }}
            className="w-full h-full block select-none touch-none"
          >
            <defs>
              <pattern
                id="cream-dot-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect width="20" height="20" fill="#FFFDF9" />
                <circle cx="10" cy="10" r="1.5" fill="#E5E0D8" />
              </pattern>
            </defs>

            {/* Infinite Warm Cream Dotted Grid Background */}
            <rect
              x={pan.x - 120}
              y={pan.y - 120}
              width={viewW + 240}
              height={viewH + 240}
              fill="url(#cream-dot-grid)"
            />

            {/* Unified Layer 1: Exact Pin-to-Pin Smooth Automatic Wires */}
            {wires.map((wire) => {
              const srcNode = nodes.find((n) => n.id === wire.fromNodeId);
              const dstNode = nodes.find((n) => n.id === wire.toNodeId);
              if (!srcNode || !dstNode) return null;

              const srcPin = getNodeMeta(srcNode, customICs).pins.find(
                (p) => p.id === wire.fromPinId
              );
              const dstPin = getNodeMeta(dstNode, customICs).pins.find(
                (p) => p.id === wire.toPinId
              );
              if (!srcPin || !dstPin) return null;

              const x1 = srcNode.x + srcPin.relX;
              const y1 = srcNode.y + srcPin.relY;
              const x2 = dstNode.x + dstPin.relX;
              const y2 = dstNode.y + dstPin.relY;
              const d = computeBezierPath(x1, y1, x2, y2);
              const signal = srcNode.outputs[srcPin.id] ?? 0;
              const isSelected = selectedWireId === wire.id;

              return (
                <g key={wire.id} style={{ cursor: 'pointer' }}>
                  <path
                    d={d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={20}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWireId(wire.id);
                      setSelectedNodeId(null);
                      setContextMenu(null);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteWire(wire.id);
                    }}
                  />

                  {(signal === 1 || isSelected) && (
                    <path
                      d={d}
                      fill="none"
                      stroke={isSelected ? 'rgba(14, 165, 233, 0.28)' : 'rgba(16, 185, 129, 0.25)'}
                      strokeWidth={9}
                      strokeLinecap="round"
                      style={{ pointerEvents: 'none' }}
                    />
                  )}

                  <path
                    d={d}
                    fill="none"
                    stroke={
                      isSelected
                        ? '#0EA5E9'
                        : signal === 1
                          ? '#10B981'
                          : '#94A3B8'
                    }
                    strokeWidth={isSelected ? 4 : signal === 1 ? 3.4 : 2.6}
                    strokeLinecap="round"
                    style={{ pointerEvents: 'none' }}
                  />
                </g>
              );
            })}

            {/* Unified Layer 2: Cute Chunky SVG Nodes & Exact Pin Circles */}
            {nodes.map((node) => (
              <NodeRenderer
                key={node.id}
                node={node}
                customICs={customICs}
                selected={selectedNodeId === node.id}
                connectingFrom={
                  connectingFrom
                    ? {
                        nodeId: connectingFrom.nodeId,
                        pinId: connectingFrom.pinId,
                        direction: connectingFrom.direction,
                      }
                    : null
                }
                snappedPinKey={
                  snappedTarget ? `${snappedTarget.nodeId}:${snappedTarget.pinId}` : null
                }
                isClockPlaying={Boolean(clockRunningIds[node.id])}
                onSelectNode={(id, e) => {
                  e.stopPropagation();
                  setSelectedNodeId(id);
                  setSelectedWireId(null);
                  setContextMenu(null);
                }}
                onStartDragNode={handleStartDragNode}
                onPinPointerDown={handlePinPointerDown}
                onPinPointerUp={handlePinPointerUp}
                onToggleSwitch={handleToggleSwitch}
                onButtonState={handleButtonState}
                onToggleClockPlay={handleToggleClockPlay}
                onCycleClockSpeed={handleCycleClockSpeed}
                onClockStepPulse={handleClockStepPulse}
                onContextMenuNode={handleOpenNodeContextMenu}
              />
            ))}

            {/* Unified Layer 3: Live Magnetically-Snapped Preview Wire */}
            {connectingFrom && pointerPos && (() => {
              const targetX = snappedTarget ? snappedTarget.x : pointerPos.x;
              const targetY = snappedTarget ? snappedTarget.y : pointerPos.y;
              const previewD = computePreviewBezier(
                connectingFrom.startX,
                connectingFrom.startY,
                targetX,
                targetY,
                connectingFrom.direction
              );

              return (
                <g style={{ pointerEvents: 'none' }}>
                  <path
                    d={previewD}
                    fill="none"
                    stroke={snappedTarget ? '#10B981' : '#0EA5E9'}
                    strokeWidth={3.2}
                    strokeDasharray={snappedTarget ? undefined : '7 5'}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={targetX}
                    cy={targetY}
                    r={snappedTarget ? 6 : 4.5}
                    fill={snappedTarget ? '#10B981' : '#0EA5E9'}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  />
                </g>
              );
            })()}
          </svg>

          {/* Desktop/Tablet (md+) Floating Top Bar (z-30, never collides on mobile) */}
          <div className="hidden md:flex flex-wrap justify-between items-start gap-2 w-full px-2.5 pt-2.5 absolute top-0 left-0 z-30 pointer-events-none">
            {/* Top-Left Pill: Categorized Preset Selector + Delete Wire */}
            <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 w-fit">
              {mode === 'lab' && (
                <select
                  value={activePresetId}
                  onChange={(e) => handleLoadPreset(e.target.value)}
                  aria-label={sim.presetAria}
                  className="bg-white/95 backdrop-blur border-2 border-slate-200 border-b-4 text-slate-700 text-xs font-bold rounded-2xl px-3 py-1.5 shadow-sm focus:outline-none focus:border-sky-400 cursor-pointer max-w-[230px] lg:max-w-[280px] truncate min-h-[34px]"
                >
                  {PRESET_CATEGORIES.map((cat) => {
                    const catPresets = presets.filter((p) => p.category === cat);
                    if (catPresets.length === 0) return null;
                    return (
                      <optgroup key={cat} label={sim.presetCategories[cat]}>
                        {catPresets.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
              )}

              {selectedWireId && (
                <button
                  type="button"
                  onClick={() => handleDeleteWire(selectedWireId)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-rose-500 hover:bg-rose-600 border-2 border-rose-600 border-b-4 active:border-b-2 text-white text-xs font-bold shadow-sm cursor-pointer min-h-[34px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{sim.deleteWire}</span>
                </button>
              )}
            </div>

            {/* Top-Right Compact Stacked Control Panel (w-fit, zero wasted left whitespace) */}
            <div className="pointer-events-auto w-fit flex flex-col items-end gap-1.5">
              {/* Row 1: Clock, Package IC, Verify, Clear */}
              <div className="w-fit bg-white/95 backdrop-blur border-2 border-slate-200 border-b-4 rounded-2xl p-1.5 shadow-sm flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleGlobalClockPulse}
                  title={sim.clockPulseTitle}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-amber-800 text-[11px] font-extrabold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
                >
                  <Play className="w-3 h-3 fill-amber-500 text-amber-600" />
                  <span>{sim.clockPulse}</span>
                </button>

                {mode === 'lab' && (
                  <button
                    type="button"
                    onClick={handleOpenPackageModal}
                    title={sim.customIC.packageBtnTitle}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-violet-50 hover:bg-violet-100 border-2 border-violet-200 text-violet-800 text-[11px] font-extrabold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
                  >
                    <span>{sim.customIC.packageBtn}</span>
                  </button>
                )}

                {mode === 'challenge' && challenge && (
                  <button
                    type="button"
                    onClick={handleVerifyChallenge}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 border-2 border-emerald-600 text-white text-[11px] font-extrabold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{sim.verifyCircuit}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetCanvas}
                  title={mode === 'challenge' ? sim.resetToStart : sim.clearCanvas}
                  aria-label={mode === 'challenge' ? sim.resetToStart : sim.clearCanvas}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 text-rose-700 text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{sim.clear}</span>
                </button>
              </div>

              {/* Row 2: Zoom & Center Controls */}
              <div className="w-fit bg-white/95 backdrop-blur border-2 border-slate-200 border-b-4 rounded-2xl p-1.5 shadow-sm flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => zoomAtClientPoint(zoom - 0.15)}
                  disabled={zoom <= MIN_ZOOM}
                  title={sim.zoomOut}
                  aria-label={sim.zoomOut}
                  className="p-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 disabled:opacity-40 text-slate-700 cursor-pointer min-h-[32px]"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => zoomAtClientPoint(1)}
                  title={sim.resetZoom100}
                  className="px-2 py-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 font-mono text-[11px] font-extrabold text-slate-700 min-w-[46px] text-center cursor-pointer min-h-[32px]"
                >
                  {Math.round(zoom * 100)}%
                </button>

                <button
                  type="button"
                  onClick={() => zoomAtClientPoint(zoom + 0.15)}
                  disabled={zoom >= MAX_ZOOM}
                  title={sim.zoomIn}
                  aria-label={sim.zoomIn}
                  className="p-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 disabled:opacity-40 text-slate-700 cursor-pointer min-h-[32px]"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => centerNodesInViewport(nodes)}
                  title={sim.centerCircuit}
                  aria-label={sim.centerCircuit}
                  className="flex items-center gap-1 px-2 py-1 rounded-xl border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-bold whitespace-nowrap cursor-pointer min-h-[32px]"
                >
                  <Crosshair className="w-3 h-3" />
                  <span>{sim.center}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Friendly Pastel Canvas Toast (Pin validation / Save / Load confirmations) */}
          {canvasToast && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className={`absolute top-2.5 md:top-24 left-1/2 -translate-x-1/2 z-40 max-w-[92%] sm:max-w-md px-3.5 py-2.5 rounded-2xl border-2 border-b-4 shadow-lg flex items-center gap-2.5 text-xs font-bold ${
                canvasToast.tone === 'warn'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : canvasToast.tone === 'success'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-violet-50 border-violet-300 text-violet-900'
              }`}
            >
              <span className="shrink-0 text-sm">
                {canvasToast.tone === 'warn'
                  ? '⚠️'
                  : canvasToast.tone === 'success'
                    ? '✨'
                    : '🧩'}
              </span>
              <span className="flex-1 leading-snug">{canvasToast.message}</span>
              <button
                type="button"
                onClick={() => setCanvasToast(null)}
                className="p-1 rounded-lg hover:bg-black/5 shrink-0 cursor-pointer"
                aria-label={sim.closeSelection}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Unified Floating Bottom-Center Selected-Component Bar */}
          {selectedNode && !draggingNode && !connectingFrom && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 max-w-[95vw] w-fit bg-white/95 backdrop-blur border-2 border-sky-200 border-b-4 rounded-2xl px-2.5 py-1.5 shadow-md flex flex-wrap items-center justify-center gap-1.5"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sky-50 border border-sky-200 text-xs min-h-[34px]">
                <span className="font-display font-extrabold text-[11px] text-sky-900 shrink-0">
                  {selectedNode.type === 'CUSTOM_IC'
                    ? '🧩'
                    : COMPONENT_CATALOG[selectedNode.type].shortLabel}
                </span>
                <span className="text-slate-300" aria-hidden="true">|</span>
                <span className="text-slate-500 font-semibold text-[11px] shrink-0">
                  {sim.labelPrefix}
                </span>
                <input
                  type="text"
                  value={selectedNode.label}
                  disabled={selectedNode.locked}
                  aria-label={sim.labelPrefix}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNodes((prev) =>
                      prev.map((n) => (n.id === selectedNode.id ? { ...n, label: val } : n))
                    );
                  }}
                  className="w-16 sm:w-20 bg-white/85 px-1.5 py-0.5 rounded-lg border border-sky-200/90 font-mono text-[11px] font-bold text-sky-700 focus:outline-none focus:border-sky-400 disabled:bg-transparent disabled:border-transparent disabled:text-slate-500"
                />
              </div>

              {selectedNode.type === 'CUSTOM_IC' && mode === 'lab' && (
                <button
                  type="button"
                  onClick={() => handleLoadInternalCircuit(selectedNode.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-violet-50 hover:bg-violet-100 border-2 border-violet-200 text-violet-800 text-[11px] font-extrabold cursor-pointer min-h-[34px] whitespace-nowrap"
                >
                  <FolderOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>{sim.customIC.loadInternalCircuit}</span>
                </button>
              )}

              {canNodeSwap(selectedNode) && (
                <button
                  type="button"
                  onClick={() => {
                    const rect = canvasWrapRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    if (contextMenu?.nodeId === selectedNode.id) {
                      setContextMenu(null);
                      return;
                    }
                    const menuWidth = Math.min(264, rect.width - 16);
                    setContextMenu({
                      nodeId: selectedNode.id,
                      x: Math.max(8, Math.round((rect.width - menuWidth) / 2)),
                      y: Math.max(16, rect.height - 320),
                    });
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-violet-50 hover:bg-violet-100 border-2 border-violet-200 text-violet-800 text-[11px] font-extrabold cursor-pointer min-h-[34px] whitespace-nowrap"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
                  <span>{sim.swapGateOrSize}</span>
                </button>
              )}

              {!selectedNode.locked && (
                <button
                  type="button"
                  onClick={() => handleDeleteNode(selectedNode.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 text-rose-700 text-[11px] font-extrabold cursor-pointer min-h-[34px] whitespace-nowrap"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{sim.remove}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setSelectedNodeId(null);
                  setContextMenu(null);
                }}
                aria-label={sim.closeSelection}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Subtle Bottom Help / Connection Status Strip */}
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/85 backdrop-blur border border-slate-200/80 text-[11px] font-medium text-slate-500">
              <Cable className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>{sim.helpStrip}</span>
            </div>

            {connectingFrom && (
              <span className="mx-auto md:mx-0 px-3 py-1.5 rounded-2xl bg-sky-500 text-white text-[11px] font-bold shadow-md">
                {sim.wiringModeActive}
              </span>
            )}
          </div>

          {/* Cute Floating Pastel Right-Click Context Menu */}
          {contextMenu && (() => {
            const ctxNode = nodes.find((n) => n.id === contextMenu.nodeId);
            if (!ctxNode) return null;
            const ctxMeta = getNodeMeta(ctxNode, customICs);
            const isGateSwappable =
              TWO_INPUT_GATES.includes(ctxNode.type) ||
              THREE_INPUT_GATES.includes(ctxNode.type) ||
              FOUR_INPUT_GATES.includes(ctxNode.type);
            const isFfSwappable = ctxNode.type === 'DFF' || ctxNode.type === 'TFF';
            const isInputSwappable = ctxNode.type === 'SWITCH' || ctxNode.type === 'BUTTON';
            const msiFamily = MSI_SWAP_FAMILIES.find((fam) => fam.types.includes(ctxNode.type));

            const allowedTwo = TWO_INPUT_GATES.filter(
              (t) => !allowedSet || allowedSet.has(t)
            );
            const allowedThree = THREE_INPUT_GATES.filter(
              (t) => !allowedSet || allowedSet.has(t)
            );
            const allowedFour = FOUR_INPUT_GATES.filter(
              (t) => !allowedSet || allowedSet.has(t)
            );
            const allowedFfs = (['DFF', 'TFF'] as ComponentType[]).filter(
              (t) => !allowedSet || allowedSet.has(t)
            );
            const allowedInputs = (['SWITCH', 'BUTTON'] as ComponentType[]).filter(
              (t) => !allowedSet || allowedSet.has(t)
            );
            const allowedMsiVariants = msiFamily
              ? msiFamily.types.filter((t) => !allowedSet || allowedSet.has(t))
              : [];

            return (
              <div
                ref={contextMenuRef}
                style={{ left: contextMenu.x, top: contextMenu.y }}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onContextMenu={(e) => e.preventDefault()}
                className="absolute z-40 w-[264px] rounded-3xl border-2 border-sky-200 border-b-4 bg-white/95 backdrop-blur-sm p-3 shadow-xl space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2 px-1.5 pb-1.5 border-b border-slate-100">
                  <span className="font-display font-extrabold text-xs text-slate-800 truncate">
                    {ctxNode.type === 'CUSTOM_IC'
                      ? `🧩 ${ctxNode.label}`
                      : `${getCompLabel(ctxMeta)} (${ctxNode.label})`}
                  </span>
                  {ctxNode.locked && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg shrink-0">
                      <Lock className="w-3 h-3" /> {sim.locked}
                    </span>
                  )}
                </div>

                {ctxNode.type === 'CUSTOM_IC' && (
                  <div className="space-y-2">
                    <div className="px-2 py-1 rounded-xl bg-violet-50 border border-violet-200 text-[11px] font-bold text-violet-800 text-center">
                      {sim.customIC.pinSummary(
                        ctxMeta.pins.filter((p) => p.direction === 'in').length,
                        ctxMeta.pins.filter((p) => p.direction === 'out').length
                      )}
                    </div>
                    {mode === 'lab' && (
                      <button
                        type="button"
                        onClick={() => handleLoadInternalCircuit(ctxNode.id)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-2xl border-2 border-violet-200 bg-violet-50 hover:bg-violet-500 hover:border-violet-600 text-violet-800 hover:text-white text-xs font-extrabold transition-all cursor-pointer"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>{sim.customIC.loadInternalCircuit}</span>
                      </button>
                    )}
                  </div>
                )}

                {!ctxNode.locked && isGateSwappable && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-sky-700">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>{sim.swapGateType}</span>
                    </div>

                    {allowedTwo.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 px-1">
                          {CATEGORY_LABELS['2-Girişli Kapılar'][lang]}
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          {allowedTwo.map((gType) => {
                            const active = ctxNode.type === gType;
                            return (
                              <button
                                key={gType}
                                type="button"
                                onClick={() => handleSwapComponentType(ctxNode.id, gType)}
                                className={`px-2 py-1.5 rounded-xl font-mono text-[10px] font-extrabold border-2 transition-all cursor-pointer ${
                                  active
                                    ? 'bg-sky-500 border-sky-600 text-white'
                                    : 'bg-sky-50/70 border-sky-200 text-sky-800 hover:border-sky-400 hover:bg-sky-100'
                                }`}
                              >
                                {COMPONENT_CATALOG[gType].shortLabel}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {allowedThree.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 px-1">
                          {CATEGORY_LABELS['3-Girişli Kapılar'][lang]}
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          {allowedThree.map((gType) => {
                            const active = ctxNode.type === gType;
                            return (
                              <button
                                key={gType}
                                type="button"
                                onClick={() => handleSwapComponentType(ctxNode.id, gType)}
                                className={`px-1.5 py-1.5 rounded-xl font-mono text-[10px] font-extrabold border-2 transition-all cursor-pointer ${
                                  active
                                    ? 'bg-orange-500 border-orange-600 text-white'
                                    : 'bg-orange-50/70 border-orange-200 text-orange-800 hover:border-orange-400 hover:bg-orange-100'
                                }`}
                              >
                                {COMPONENT_CATALOG[gType].shortLabel}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {allowedFour.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 px-1">
                          {CATEGORY_LABELS['4-Girişli Kapılar'][lang]}
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {allowedFour.map((gType) => {
                            const active = ctxNode.type === gType;
                            return (
                              <button
                                key={gType}
                                type="button"
                                onClick={() => handleSwapComponentType(ctxNode.id, gType)}
                                className={`px-1.5 py-1.5 rounded-xl font-mono text-[10px] font-extrabold border-2 transition-all cursor-pointer ${
                                  active
                                    ? 'bg-indigo-500 border-indigo-600 text-white'
                                    : 'bg-indigo-50/70 border-indigo-200 text-indigo-800 hover:border-indigo-400 hover:bg-indigo-100'
                                }`}
                              >
                                {COMPONENT_CATALOG[gType].shortLabel}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!ctxNode.locked && msiFamily && allowedMsiVariants.length > 1 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-violet-700">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>{sim.swapSizeType}</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 px-1">
                      {sim.msiSwapFamilies[msiFamily.familyKey]} {sim.sharedWiresKept}
                    </div>
                    <div
                      className={`grid gap-1 ${
                        allowedMsiVariants.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                      }`}
                    >
                      {allowedMsiVariants.map((msiType) => {
                        const active = ctxNode.type === msiType;
                        return (
                          <button
                            key={msiType}
                            type="button"
                            onClick={() => handleSwapComponentType(ctxNode.id, msiType)}
                            className={`px-1.5 py-1.5 rounded-xl font-mono text-[10px] font-extrabold border-2 transition-all cursor-pointer truncate ${
                              active
                                ? 'bg-violet-500 border-violet-600 text-white'
                                : 'bg-violet-50/70 border-violet-200 text-violet-800 hover:border-violet-400 hover:bg-violet-100'
                            }`}
                          >
                            {COMPONENT_CATALOG[msiType].shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!ctxNode.locked && isFfSwappable && allowedFfs.length > 1 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-amber-700">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>{sim.swapGateType}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {allowedFfs.map((ffType) => {
                        const active = ctxNode.type === ffType;
                        return (
                          <button
                            key={ffType}
                            type="button"
                            onClick={() => handleSwapComponentType(ctxNode.id, ffType)}
                            className={`px-2 py-1.5 rounded-xl font-mono text-[11px] font-extrabold border-2 transition-all cursor-pointer ${
                              active
                                ? 'bg-amber-500 border-amber-600 text-white'
                                : 'bg-amber-50 border-amber-200 text-amber-800 hover:border-amber-400'
                            }`}
                          >
                            {COMPONENT_CATALOG[ffType].shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!ctxNode.locked && isInputSwappable && allowedInputs.length > 1 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-emerald-700">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>{sim.swapInputType}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {allowedInputs.map((inType) => {
                        const active = ctxNode.type === inType;
                        return (
                          <button
                            key={inType}
                            type="button"
                            onClick={() => handleSwapComponentType(ctxNode.id, inType)}
                            className={`px-2 py-1.5 rounded-xl font-mono text-[11px] font-extrabold border-2 transition-all cursor-pointer ${
                              active
                                ? 'bg-emerald-500 border-emerald-600 text-white'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:border-emerald-400'
                            }`}
                          >
                            {COMPONENT_CATALOG[inType].shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  disabled={Boolean(ctxNode.locked)}
                  onClick={() => handleDeleteNode(ctxNode.id)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-2xl border-2 border-rose-200 bg-rose-50/70 text-rose-700 hover:bg-[#FF6B8B] hover:border-[#FF6B8B] hover:text-white disabled:opacity-45 disabled:cursor-not-allowed text-xs font-extrabold transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>
                    {ctxNode.locked ? sim.lockedChallengeComp : sim.removeFromCircuit}
                  </span>
                </button>
              </div>
            );
          })()}
          </div>
        </div>

        {/* Phone (< 768px) Collapsed Bottom Sheet Bar */}
        <div className="md:hidden h-28 shrink-0 border-t-2 border-slate-200 bg-[#FFFDF8] flex flex-col justify-between px-2.5 py-2 z-20">
          <div className="flex items-center gap-1.5">
            <div className="flex-1 min-w-0 flex items-center gap-1 overflow-x-auto no-scrollbar">
              {visiblePhoneTabs.map((tab) => {
                const active = tab.id === phonePaletteTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPhonePaletteTab(tab.id)}
                    className={`shrink-0 px-2.5 py-1 rounded-xl border text-[11px] font-display font-extrabold transition-all cursor-pointer min-h-[30px] ${
                      active
                        ? 'bg-sky-500 border-sky-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {sim.phoneTabs[tab.id]}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setPhoneSheetExpanded(true)}
              className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-800 text-[11px] font-display font-extrabold cursor-pointer min-h-[32px]"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>{sim.allParts}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {activePhoneTabIsCustom
              ? customICs.map((ic) => {
                  const accent = CUSTOM_IC_ACCENTS[ic.color];
                  return (
                    <button
                      key={ic.id}
                      type="button"
                      onClick={() => handleCustomICClick(ic)}
                      className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer min-h-[42px] ${accent.itemBg} ${accent.itemBorder}`}
                    >
                      <span
                        className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-lg leading-tight ${accent.tag}`}
                      >
                        🧩 IC
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
                        {ic.name}
                      </span>
                    </button>
                  );
                })
              : activePhoneTabItems.map((comp) => {
                  const accent = comp.subcategory
                    ? MSI_SUBCATEGORY_ACCENTS[comp.subcategory]
                    : CATEGORY_ACCENTS[comp.category];
                  return (
                    <button
                      key={comp.type}
                      type="button"
                      onClick={() => handlePaletteClick(comp.type)}
                      className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer min-h-[42px] ${accent.itemBg} ${accent.itemBorder}`}
                    >
                      <span
                        className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-lg leading-tight ${accent.tag}`}
                      >
                        {comp.shortLabel}
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
                        {getCompLabel(comp)}
                      </span>
                    </button>
                  );
                })}
          </div>
        </div>

        {/* Phone (< 768px) Expanded Bottom Sheet Drawer Overlay */}
        {phoneSheetExpanded && (
          <div
            onPointerDown={(e) => e.stopPropagation()}
            className={`md:hidden absolute inset-x-0 bottom-0 z-30 border-t-2 border-sky-200 bg-[#FFFDF8]/98 backdrop-blur-sm rounded-t-3xl shadow-2xl flex flex-col overflow-hidden ${
              compact ? 'max-h-[300px]' : 'h-[52dvh]'
            }`}
          >
            <div className="shrink-0 px-3.5 py-2.5 border-b-2 border-slate-100 bg-gradient-to-r from-sky-50 via-amber-50/70 to-emerald-50/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                  <Cpu className="w-3.5 h-3.5" />
                </span>
                <span className="font-display font-extrabold text-xs text-slate-800 truncate">
                  {sim.addPartTap}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPhoneSheetExpanded(false)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 text-[11px] font-bold cursor-pointer min-h-[36px]"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                <span>{sim.minimize}</span>
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain pastel-scrollbar p-3 space-y-3">
              {mode === 'lab' && customICs.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-display font-extrabold px-1 text-violet-700">
                    {sim.customIC.paletteSectionTitle}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {customICs.map((ic) => {
                      const accent = CUSTOM_IC_ACCENTS[ic.color];
                      return (
                        <div key={ic.id} className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              handleCustomICClick(ic);
                              setPhoneSheetExpanded(false);
                            }}
                            className={`w-full rounded-2xl border-2 border-b-4 active:border-b-2 px-2 py-2 flex flex-col items-center justify-center text-center cursor-pointer min-h-[54px] ${accent.itemBg} ${accent.itemBorder}`}
                          >
                            <span
                              className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-lg ${accent.tag}`}
                            >
                              🧩 IC
                            </span>
                            <span className="text-[10.5px] font-bold text-slate-700 truncate w-full mt-1">
                              {ic.name}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCustomIC(ic.id);
                            }}
                            aria-label={sim.customIC.deleteCustomIc}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-rose-200 text-rose-500 flex items-center justify-center shadow-xs cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {COMPONENT_CATEGORIES.map((category) => {
                const items = Object.values(COMPONENT_CATALOG).filter((item) => {
                  if (item.type === 'CUSTOM_IC') return false;
                  if (item.category !== category) return false;
                  if (allowedSet && !allowedSet.has(item.type)) return false;
                  return true;
                });
                if (items.length === 0) return null;
                const style = CATEGORY_ACCENTS[category];
                const categoryLabel = CATEGORY_LABELS[category][lang];

                if (category === 'MSI Bloklar') {
                  return (
                    <div key={category} className="space-y-2">
                      <div className={`text-[11px] font-display font-extrabold px-1 ${style.badge}`}>
                        {categoryLabel}
                      </div>
                      {MSI_SUBCATEGORIES.map((sub) => {
                        const subItems = items.filter((item) => item.subcategory === sub);
                        if (subItems.length === 0) return null;
                        const subAccent = MSI_SUBCATEGORY_ACCENTS[sub];
                        const subLabel = MSI_SUBCATEGORY_LABELS[sub][lang];
                        return (
                          <div key={sub} className="space-y-1.5">
                            <div
                              className={`px-2 py-1 rounded-xl border text-[10.5px] font-display font-extrabold ${subAccent.header}`}
                            >
                              {subLabel}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                              {subItems.map((comp) => (
                                <button
                                  key={comp.type}
                                  type="button"
                                  onClick={() => {
                                    handlePaletteClick(comp.type);
                                    setPhoneSheetExpanded(false);
                                  }}
                                  className={`rounded-2xl border-2 border-b-4 active:border-b-2 px-2 py-2 flex flex-col items-center justify-center text-center cursor-pointer min-h-[54px] ${subAccent.itemBg} ${subAccent.itemBorder}`}
                                >
                                  <span
                                    className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-lg ${subAccent.tag}`}
                                  >
                                    {comp.shortLabel}
                                  </span>
                                  <span className="text-[10.5px] font-bold text-slate-700 truncate w-full mt-1">
                                    {getCompLabel(comp)}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                return (
                  <div key={category} className="space-y-1.5">
                    <div className={`text-[11px] font-display font-extrabold px-1 ${style.badge}`}>
                      {categoryLabel}
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {items.map((comp) => (
                        <button
                          key={comp.type}
                          type="button"
                          onClick={() => {
                            handlePaletteClick(comp.type);
                            setPhoneSheetExpanded(false);
                          }}
                          className={`rounded-2xl border-2 border-b-4 active:border-b-2 px-1.5 py-2 flex flex-col items-center justify-center text-center cursor-pointer min-h-[54px] ${style.itemBg} ${style.itemBorder}`}
                        >
                          <span
                            className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-lg ${style.tag}`}
                          >
                            {comp.shortLabel}
                          </span>
                          <span className="text-[10px] font-bold text-slate-700 truncate w-full mt-1">
                            {getCompLabel(comp)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cute Custom IC Packaging Modal */}
        {packageModal && (
          <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setPackageModal(null)}
            className="fixed inset-0 z-50 bg-slate-900/35 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          >
            <form
              onSubmit={handleConfirmPackageIC}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl border-2 border-violet-200 border-b-4 bg-[#FFFDF9] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-4 py-3.5 border-b-2 border-slate-100 bg-gradient-to-r from-violet-50 via-sky-50 to-emerald-50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-8 h-8 rounded-2xl bg-violet-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Puzzle className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display font-extrabold text-sm text-slate-800 truncate">
                      {sim.customIC.modalTitle}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-snug">
                      {sim.customIC.modalSubtitle}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPackageModal(null)}
                  className="p-1.5 rounded-xl bg-white/90 border border-slate-200 text-slate-500 hover:text-slate-800 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Block Name Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-display font-extrabold text-slate-700">
                    {sim.customIC.nameLabel}
                  </label>
                  <input
                    type="text"
                    autoFocus
                    maxLength={24}
                    value={packageModal.name}
                    onChange={(e) =>
                      setPackageModal((prev) =>
                        prev ? { ...prev, name: e.target.value } : null
                      )
                    }
                    placeholder={sim.customIC.namePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-violet-400 bg-white text-sm font-bold text-slate-800 focus:outline-none"
                  />
                </div>

                {/* Pastel Color Picker */}
                <div className="space-y-1.5">
                  <div className="text-xs font-display font-extrabold text-slate-700">
                    {sim.customIC.colorLabel}
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {CUSTOM_IC_COLORS.map((colorKey) => {
                      const active = packageModal.color === colorKey;
                      const accent = CUSTOM_IC_ACCENTS[colorKey];
                      return (
                        <button
                          key={colorKey}
                          type="button"
                          onClick={() =>
                            setPackageModal((prev) =>
                              prev ? { ...prev, color: colorKey } : null
                            )
                          }
                          className={`flex flex-col items-center gap-1 py-2 px-1 rounded-2xl border-2 transition-all cursor-pointer ${
                            active
                              ? `${accent.itemBg} ${accent.itemBorder} ring-2 ${accent.swatchRing}`
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 ${accent.swatch}`}
                          />
                          <span className="text-[10.5px] font-bold text-slate-700">
                            {sim.customIC.colors[colorKey]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Detected Pins Preview (Left Input & Right Output) */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-2.5 space-y-1.5">
                    <div className="text-[10.5px] font-display font-extrabold text-emerald-800">
                      {sim.customIC.leftPinsTitle}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {packageModal.inputPins.map((pin) => (
                        <span
                          key={pin.id}
                          className="px-2 py-0.5 rounded-lg bg-white border border-emerald-200 font-mono text-[11px] font-bold text-emerald-800"
                        >
                          {pin.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-sky-200 bg-sky-50/60 p-2.5 space-y-1.5">
                    <div className="text-[10.5px] font-display font-extrabold text-sky-800">
                      {sim.customIC.rightPinsTitle}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {packageModal.outputPins.map((pin) => (
                        <span
                          key={pin.id}
                          className="px-2 py-0.5 rounded-lg bg-white border border-sky-200 font-mono text-[11px] font-bold text-sky-800"
                        >
                          {pin.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-4 py-3 border-t-2 border-slate-100 bg-slate-50/70 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPackageModal(null)}
                  className="px-3.5 py-2 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-600 cursor-pointer"
                >
                  {sim.customIC.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-2xl border-2 border-b-4 border-violet-600 bg-violet-500 hover:bg-violet-600 active:border-b-2 text-white text-xs font-extrabold shadow-xs cursor-pointer"
                >
                  {sim.customIC.saveBtn}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Challenge Verification Output Matrix */}
      {verification && (
        <div className="border-t-2 border-slate-100 bg-[#FFFDF8] p-4">
          {verification.error ? (
            <div className="flex items-start gap-3 text-amber-900 text-sm bg-amber-50 border-2 border-amber-200 rounded-2xl p-3.5 font-medium">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span>{verification.error}</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                className={`rounded-2xl border-2 p-3 flex items-center gap-3 ${
                  verification.passed
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {verification.passed ? (
                  <>
                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-bold">
                      {sim.verifyPassed(verification.rows.length)}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    <span className="text-sm font-bold">
                      {sim.verifyFailed}
                    </span>
                  </>
                )}
              </div>

              <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-white">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-100 bg-slate-50 text-slate-500">
                      {challenge?.sequentialTest && (
                        <th className="py-2 px-3 text-left text-amber-700 font-bold">
                          {sim.clockPulseCol}
                        </th>
                      )}
                      {challenge?.inputs.map((inp) => (
                        <th key={inp} className="py-2 px-3 text-left font-bold">
                          {inp}
                        </th>
                      ))}
                      {challenge?.outputs.map((out) => (
                        <th key={`exp_${out}`} className="py-2 px-3 text-left text-sky-700 font-bold">
                          {sim.expectedCol} {out}
                        </th>
                      ))}
                      {challenge?.outputs.map((out) => (
                        <th key={`act_${out}`} className="py-2 px-3 text-left text-slate-700 font-bold">
                          {sim.circuitCol} {out}
                        </th>
                      ))}
                      <th className="py-2 px-3 text-left font-bold">{sim.statusCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verification.rows.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-slate-100 ${
                          row.match ? 'bg-emerald-50/40' : 'bg-rose-50/60'
                        }`}
                      >
                        {challenge?.sequentialTest && (
                          <td className="py-2 px-3 text-amber-700 font-bold">
                            ↑ {sim.pulseRow} #{idx + 1}
                          </td>
                        )}
                        {challenge?.inputs.map((inp) => (
                          <td key={inp} className="py-2 px-3 text-slate-700 font-semibold">
                            {row.inputs[inp]}
                          </td>
                        ))}
                        {challenge?.outputs.map((out) => (
                          <td key={`exp_${out}`} className="py-2 px-3 text-sky-700 font-bold">
                            {row.expected[out]}
                          </td>
                        ))}
                        {challenge?.outputs.map((out) => (
                          <td
                            key={`act_${out}`}
                            className={`py-2 px-3 font-bold ${
                              row.actual[out] === row.expected[out]
                                ? 'text-emerald-700'
                                : 'text-rose-600'
                            }`}
                          >
                            {row.actual[out] ?? '-'}
                          </td>
                        ))}
                        <td className="py-2 px-3">
                          {row.match ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {sim.passBadge}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                              <XCircle className="w-3.5 h-3.5" /> {sim.failBadge}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CircuitSimulator;
