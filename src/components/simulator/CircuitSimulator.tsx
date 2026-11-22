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
} from 'lucide-react';
import {
  COMPONENT_CATALOG,
  COMPONENT_CATEGORIES,
  MSI_SUBCATEGORIES,
  createDefaultNode,
} from '../../engine/componentCatalog';
import {
  evaluateCircuit,
  verifyCircuitAgainstTruthTable,
} from '../../engine/circuitEngine';
import { getCircuitPresets } from '../../engine/presets';
import type {
  CircuitChallengeConfig,
  CircuitNode,
  CircuitWire,
  ComponentCategory,
  ComponentType,
  LogicValue,
  MsiSubcategory,
  PinDefinition,
  VerificationResult,
} from '../../types/simulator';
import { NodeRenderer } from './NodeRenderer';

interface CircuitSimulatorProps {
  mode?: 'lab' | 'challenge';
  challenge?: CircuitChallengeConfig;
  compact?: boolean;
  onChallengePass?: () => void;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.6;

type PhonePaletteTab = 'Temel' | '2-Giriş' | '3-Giriş' | 'MSI' | 'Flip-Flop';

const PHONE_PALETTE_TABS: { id: PhonePaletteTab; categories: ComponentCategory[] }[] = [
  { id: 'Temel', categories: ['Girişler', 'Çıkışlar'] },
  { id: '2-Giriş', categories: ['2-Girişli Kapılar'] },
  { id: '3-Giriş', categories: ['3-Girişli Kapılar'] },
  { id: 'MSI', categories: ['MSI Bloklar'] },
  { id: 'Flip-Flop', categories: ['Ardışıl Elemanlar'] },
];

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

const MSI_SWAP_FAMILIES: {
  label: string;
  accent: string;
  types: ComponentType[];
}[] = [
  {
    label: 'Multiplexer Boyutu',
    accent: 'violet',
    types: ['MUX_2X1', 'MUX_4X1', 'MUX_8X1'],
  },
  {
    label: 'Demultiplexer Boyutu',
    accent: 'indigo',
    types: ['DEMUX_1TO2', 'DEMUX_1TO4', 'DEMUX_1TO8'],
  },
  {
    label: 'Decoder Boyutu',
    accent: 'teal',
    types: ['DECODER_2TO4', 'DECODER_3TO8'],
  },
  {
    label: 'Encoder Boyutu / Türü',
    accent: 'pink',
    types: ['ENCODER_4TO2', 'ENCODER_8TO3', 'PRIORITY_ENCODER_4TO2'],
  },
  {
    label: 'Toplayıcı Türü',
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
  challenge,
  compact = false,
  onChallengePass,
}) => {
  const presets = useMemo(() => getCircuitPresets(), []);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
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

  const [paletteCollapsed, setPaletteCollapsed] = useState(false);
  const [phoneSheetExpanded, setPhoneSheetExpanded] = useState(false);
  const [phonePaletteTab, setPhonePaletteTab] = useState<PhonePaletteTab>('Temel');
  const [collapsedMsiGroups, setCollapsedMsiGroups] = useState<
    Partial<Record<MsiSubcategory, boolean>>
  >({});
  const [viewportSize, setViewportSize] = useState({ width: 780, height: 480 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const [activePresetId, setActivePresetId] = useState<string>(
    mode === 'lab' ? 'half-adder' : 'challenge'
  );
  const [nodes, setNodes] = useState<CircuitNode[]>(() => {
    if (mode === 'challenge' && challenge) {
      return evaluateCircuit(buildChallengeStarter(challenge), [], false);
    }
    const p = presets[0];
    return evaluateCircuit(p.nodes, p.wires, false);
  });

  const [wires, setWires] = useState<CircuitWire[]>(() => {
    if (mode === 'challenge') return [];
    return presets[0].wires;
  });

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedWireId, setSelectedWireId] = useState<string | null>(null);
  const [verification, setVerification] = useState<VerificationResult | null>(null);

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
        const meta = COMPONENT_CATALOG[n.type];
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

  // Center initial challenge nodes on mount/challenge change
  useEffect(() => {
    if (mode === 'challenge' && challenge) {
      const starter = evaluateCircuit(buildChallengeStarter(challenge), [], false);
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
    }
  }, [mode, challenge]);

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
      const evaluated = evaluateCircuit(nextNodes, nextWires, triggerSeq);
      setNodes(evaluated);
    },
    []
  );

  // Convert client pointer event to exact SVG world coordinates across all zoom & pan states
  const clientToSvgCoords = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: pan.x + 120, y: pan.y + 120 };

      const ctm = svg.getScreenCTM();
      if (ctm) {
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const mapped = pt.matrixTransform(ctm.inverse());
        return { x: mapped.x, y: mapped.y };
      }

      const rect = svg.getBoundingClientRect();
      const vw = rect.width > 0 ? rect.width / zoom : viewW;
      const vh = rect.height > 0 ? rect.height / zoom : viewH;
      return {
        x: pan.x + ((clientX - rect.left) / Math.max(1, rect.width)) * vw,
        y: pan.y + ((clientY - rect.top) / Math.max(1, rect.height)) * vh,
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
      const meta = COMPONENT_CATALOG[node.type];
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
  }, [connectingFrom, pointerPos, nodes, zoom]);

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
          return evaluateCircuit(updated, wires, true);
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
      } else if (e.key === 'Escape') {
        setConnectingFrom(null);
        setPointerPos(null);
        setContextMenu(null);
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

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/com3021-component') as ComponentType;
    if (!type || !COMPONENT_CATALOG[type]) return;
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
      if (!panning.hasMoved && Math.hypot(dxClient, dyClient) > 3) {
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
      if (
        Math.hypot(
          e.clientX - draggingNode.startClientX,
          e.clientY - draggingNode.startClientY
        ) > 6
      ) {
        clearLongPressTimer();
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
      const moved = panning.hasMoved;
      setPanning(null);
      if (!moved) {
        setSelectedNodeId(null);
        setSelectedWireId(null);
        setContextMenu(null);
        if (connectingFrom) {
          setConnectingFrom(null);
          setPointerPos(null);
        }
      }
      return;
    }
    if (draggingNode) {
      setDraggingNode(null);
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
    if (activePointersRef.current.size >= 2) return;
    const pinX = node.x + pin.relX;
    const pinY = node.y + pin.relY;

    // Second tap in Tap-to-Connect mode: complete connection or toggle off if same pin
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

  const handleToggleSwitch = (nodeId: string) => {
    const nextNodes = nodes.map((n) =>
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
    applyEvaluation(nextNodes, wires, true);
  };

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

  const pulseClockIds = (targetIds: Set<string>) => {
    if (targetIds.size === 0) return;
    const lowNodes = nodes.map((n) =>
      targetIds.has(n.id) ? { ...n, outputs: { ...n.outputs, out: 0 as LogicValue } } : n
    );
    const settledLow = evaluateCircuit(lowNodes, wires, true);
    const highNodes = settledLow.map((n) =>
      targetIds.has(n.id) ? { ...n, outputs: { ...n.outputs, out: 1 as LogicValue } } : n
    );
    const triggered = evaluateCircuit(highNodes, wires, true);
    setNodes(triggered);

    window.setTimeout(() => {
      setNodes((latest) => {
        const falling = latest.map((n) =>
          targetIds.has(n.id) ? { ...n, outputs: { ...n.outputs, out: 0 as LogicValue } } : n
        );
        return evaluateCircuit(falling, wires, true);
      });
    }, 180);
  };

  const handleClockStepPulse = (nodeId: string) => {
    pulseClockIds(new Set([nodeId]));
  };

  const handleGlobalClockPulse = () => {
    const clockNodes = nodes.filter((n) => n.type === 'CLOCK');
    if (clockNodes.length > 0) {
      pulseClockIds(new Set(clockNodes.map((n) => n.id)));
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

    const oldMeta = COMPONENT_CATALOG[target.type];
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
    const evaluated = evaluateCircuit(found.nodes, found.wires, false);
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
      const starter = evaluateCircuit(buildChallengeStarter(challenge), [], false);
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
    const result = verifyCircuitAgainstTruthTable(nodes, wires, challenge);
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
      if (TWO_INPUT_GATES.includes(node.type) || THREE_INPUT_GATES.includes(node.type)) {
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
      PHONE_PALETTE_TABS.filter((tab) =>
        Object.values(COMPONENT_CATALOG).some(
          (item) =>
            tab.categories.includes(item.category) &&
            (!allowedSet || allowedSet.has(item.type))
        )
      ),
    [allowedSet]
  );

  const activePhoneTabItems = useMemo(() => {
    const activeTab =
      visiblePhoneTabs.find((t) => t.id === phonePaletteTab) ?? visiblePhoneTabs[0];
    if (!activeTab) return [];
    return Object.values(COMPONENT_CATALOG).filter(
      (item) =>
        activeTab.categories.includes(item.category) &&
        (!allowedSet || allowedSet.has(item.type))
    );
  }, [visiblePhoneTabs, phonePaletteTab, allowedSet]);

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
                      {mode === 'challenge' ? 'Devre Bileşenleri' : 'Kapı & Bloklar'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaletteCollapsed(true)}
                    title="Paleti Daralt"
                    aria-label="Paleti Daralt"
                    className="w-6 h-6 rounded-lg border-2 border-slate-200 bg-white hover:border-sky-300 text-slate-600 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10.5px] font-bold text-amber-800 bg-amber-100/80 border border-amber-200 rounded-xl px-2 py-1 text-center">
                  Tıkla veya Sürükle ✨
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPaletteCollapsed(false)}
                  title="Paleti Genişlet"
                  aria-label="Paleti Genişlet"
                  className="w-9 h-8 rounded-xl border-2 border-sky-200 border-b-4 bg-white hover:bg-sky-50 text-sky-700 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Independent Scrollable 2-Column Grid Component List */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain pastel-scrollbar p-2.5 space-y-3">
            {COMPONENT_CATEGORIES.map((category) => {
              const items = Object.values(COMPONENT_CATALOG).filter((item) => {
                if (item.category !== category) return false;
                if (allowedSet && !allowedSet.has(item.type)) return false;
                return true;
              });
              if (items.length === 0) return null;

              const style = CATEGORY_ACCENTS[category];

              if (category === 'MSI Bloklar' && !paletteCollapsed) {
                return (
                  <div key={category} className="space-y-2">
                    <div
                      className={`text-[11px] font-display font-extrabold px-1 truncate ${style.badge}`}
                    >
                      {category}
                    </div>

                    {MSI_SUBCATEGORIES.map((sub) => {
                      const subItems = items.filter((item) => item.subcategory === sub);
                      if (subItems.length === 0) return null;
                      const subAccent = MSI_SUBCATEGORY_ACCENTS[sub];
                      const isCollapsed = Boolean(collapsedMsiGroups[sub]);

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
                            <span className="truncate">{sub}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${
                                isCollapsed ? '-rotate-90' : 'rotate-0'
                              }`}
                            />
                          </button>

                          {!isCollapsed && (
                            <div className="grid grid-cols-2 gap-1.5">
                              {subItems.map((comp) => (
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
                                  title={`${comp.label}: ${comp.description} (Tıkla veya Sürükle)`}
                                  className={`rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer flex flex-col items-center justify-center text-center px-1.5 py-2 ${subAccent.itemBg} ${subAccent.itemBorder}`}
                                >
                                  <span
                                    className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-lg leading-tight ${subAccent.tag}`}
                                  >
                                    {comp.shortLabel}
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-700 truncate w-full mt-1 px-0.5 leading-tight">
                                    {comp.label}
                                  </span>
                                </button>
                              ))}
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
                      {category}
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
                          title={`${comp.label}: ${comp.description} (Tıkla veya Sürükle)`}
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
                              {comp.label}
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

        {/* Main SVG Circuit Canvas */}
        <div
          ref={canvasWrapRef}
          onDragOver={handleCanvasDragOver}
          onDrop={handleCanvasDrop}
          className="relative flex-1 min-h-0 h-full min-w-0 overflow-hidden bg-[#FFFDF9]"
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
            style={{ cursor: panning?.hasMoved ? 'grabbing' : 'default' }}
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

            {/* Unified Layer 1: Exact Pin-to-Pin Bezier Wires */}
            {wires.map((wire) => {
              const srcNode = nodes.find((n) => n.id === wire.fromNodeId);
              const dstNode = nodes.find((n) => n.id === wire.toNodeId);
              if (!srcNode || !dstNode) return null;

              const srcPin = COMPONENT_CATALOG[srcNode.type].pins.find(
                (p) => p.id === wire.fromPinId
              );
              const dstPin = COMPONENT_CATALOG[dstNode.type].pins.find(
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
            {connectingFrom && pointerPos && (
              <g style={{ pointerEvents: 'none' }}>
                <path
                  d={computePreviewBezier(
                    connectingFrom.startX,
                    connectingFrom.startY,
                    snappedTarget ? snappedTarget.x : pointerPos.x,
                    snappedTarget ? snappedTarget.y : pointerPos.y,
                    connectingFrom.direction
                  )}
                  fill="none"
                  stroke={snappedTarget ? '#10B981' : '#0EA5E9'}
                  strokeWidth={3.2}
                  strokeDasharray={snappedTarget ? undefined : '7 5'}
                  strokeLinecap="round"
                />
                <circle
                  cx={snappedTarget ? snappedTarget.x : pointerPos.x}
                  cy={snappedTarget ? snappedTarget.y : pointerPos.y}
                  r={snappedTarget ? 6 : 4.5}
                  fill={snappedTarget ? '#10B981' : '#0EA5E9'}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              </g>
            )}
          </svg>

          {/* Floating Top-Left Pill: Preset Selector + Quick Wire/Desktop Label Editor */}
          <div className="absolute top-2.5 left-2.5 z-20 flex flex-wrap items-center gap-1.5 max-w-[42%] sm:max-w-[44%]">
            {mode === 'lab' && (
              <select
                value={activePresetId}
                onChange={(e) => handleLoadPreset(e.target.value)}
                aria-label="Hazır Devre Seçimi"
                className="bg-white/95 backdrop-blur border-2 border-slate-200 border-b-4 text-slate-700 text-[11px] sm:text-xs font-bold rounded-2xl px-2 sm:px-3 py-1.5 shadow-sm focus:outline-none focus:border-sky-400 cursor-pointer max-w-[126px] sm:max-w-none truncate min-h-[34px]"
              >
                {presets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}

            {selectedNode && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-white/95 backdrop-blur border-2 border-sky-200 border-b-4 text-xs shadow-sm">
                <span className="text-slate-500 font-semibold">Etiket:</span>
                <input
                  type="text"
                  value={selectedNode.label}
                  disabled={selectedNode.locked}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNodes((prev) =>
                      prev.map((n) => (n.id === selectedNode.id ? { ...n, label: val } : n))
                    );
                  }}
                  className="w-14 bg-transparent font-mono font-bold text-sky-700 focus:outline-none disabled:text-slate-500"
                />
                {!selectedNode.locked && (
                  <button
                    type="button"
                    onClick={() => handleDeleteNode(selectedNode.id)}
                    className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer"
                    title="Seçili bileşeni sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {selectedWireId && (
              <button
                type="button"
                onClick={() => handleDeleteWire(selectedWireId)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-rose-500 hover:bg-rose-600 border-2 border-rose-600 border-b-4 active:border-b-2 text-white text-[11px] sm:text-xs font-bold shadow-sm cursor-pointer min-h-[34px]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Kabloyu Sil</span>
              </button>
            )}
          </div>

          {/* Floating Top-Right Pastel Pill Toolbar (Clock, Verify, Clear, Pan/Zoom) */}
          <div className="absolute top-2.5 right-2.5 z-20 bg-white/95 backdrop-blur border-2 border-slate-200 border-b-4 rounded-2xl p-1 sm:p-1.5 shadow-sm flex flex-wrap items-center justify-end gap-1 sm:gap-1.5 max-w-[94%]">
            <button
              type="button"
              onClick={handleGlobalClockPulse}
              title="Saat Darbesi Gönder"
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-amber-800 text-[11px] font-extrabold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
            >
              <Play className="w-3 h-3 fill-amber-500 text-amber-600" />
              <span className="sm:hidden">Darbe</span>
              <span className="hidden sm:inline">Clock Darbesi</span>
            </button>

            {mode === 'challenge' && challenge && (
              <button
                type="button"
                onClick={handleVerifyChallenge}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 border-2 border-emerald-600 text-white text-[11px] font-extrabold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
              >
                <Check className="w-3.5 h-3.5" />
                <span className="sm:hidden">Doğrula</span>
                <span className="hidden sm:inline">Devreyi Doğrula</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleResetCanvas}
              title={mode === 'challenge' ? 'Başlangıca Sıfırla' : 'Tuvali Temizle'}
              aria-label={mode === 'challenge' ? 'Başlangıca Sıfırla' : 'Tuvali Temizle'}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 text-rose-700 text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer min-h-[32px]"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
              <span className="hidden sm:inline">Temizle</span>
            </button>

            <span className="w-px h-5 bg-slate-200 mx-0.5 hidden sm:block" aria-hidden="true" />

            {/* Zoom & Center Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => zoomAtClientPoint(zoom - 0.15)}
                disabled={zoom <= MIN_ZOOM}
                title="Uzaklaştır"
                aria-label="Uzaklaştır"
                className="p-1.5 sm:p-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 disabled:opacity-40 text-slate-700 cursor-pointer min-h-[32px]"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => zoomAtClientPoint(1)}
                title="Yakınlaştırmayı %100 yap"
                className="px-1.5 sm:px-2 py-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 font-mono text-[10.5px] sm:text-[11px] font-extrabold text-slate-700 min-w-[38px] sm:min-w-[46px] text-center cursor-pointer min-h-[32px]"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                onClick={() => zoomAtClientPoint(zoom + 0.15)}
                disabled={zoom >= MAX_ZOOM}
                title="Yakınlaştır"
                aria-label="Yakınlaştır"
                className="p-1.5 sm:p-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 disabled:opacity-40 text-slate-700 cursor-pointer min-h-[32px]"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => centerNodesInViewport(nodes)}
                title="Devreyi Ortala"
                aria-label="Devreyi Ortala"
                className="flex items-center gap-1 px-2 py-1 rounded-xl border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-bold whitespace-nowrap cursor-pointer min-h-[32px]"
              >
                <Crosshair className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                <span className="hidden sm:inline">Ortala</span>
              </button>
            </div>
          </div>

          {/* Floating Selected-Component Touch/Click Action Bar */}
          {selectedNode && !draggingNode && !connectingFrom && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute top-14 left-1/2 -translate-x-1/2 z-30 max-w-[94%] bg-white/95 backdrop-blur border-2 border-sky-200 border-b-4 rounded-2xl px-2.5 py-1.5 shadow-md flex flex-wrap items-center justify-center gap-1.5"
            >
              <span className="px-2 py-0.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 font-display font-extrabold text-[11px] truncate max-w-[130px] sm:max-w-[180px]">
                {COMPONENT_CATALOG[selectedNode.type].shortLabel} · {selectedNode.label}
              </span>

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
                      y: Math.min(Math.max(96, rect.height - 260), 104),
                    });
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-violet-50 hover:bg-violet-100 border-2 border-violet-200 text-violet-800 text-[11px] font-extrabold cursor-pointer min-h-[34px] whitespace-nowrap"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
                  <span>Tür / Boyut Değiştir</span>
                </button>
              )}

              {!selectedNode.locked && (
                <button
                  type="button"
                  onClick={() => handleDeleteNode(selectedNode.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 text-rose-700 text-[11px] font-extrabold cursor-pointer min-h-[34px] whitespace-nowrap"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Çıkar</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setSelectedNodeId(null);
                  setContextMenu(null);
                }}
                aria-label="Seçimi Kapat"
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
              <span>
                Pinlerden sürükleyin veya dokun-bağla yapın · Sağ tık / Uzun basma: Kapı değiştir/sil · Boşluktan sürükle: Kaydır
              </span>
            </div>

            {connectingFrom && (
              <span className="mx-auto md:mx-0 px-3 py-1.5 rounded-2xl bg-sky-500 text-white text-[11px] font-bold shadow-md">
                Bağlantı modu aktif — Hedef pine dokunun (İptal: boşluğa tıkla)
              </span>
            )}
          </div>

          {/* Cute Floating Pastel Right-Click Context Menu */}
          {contextMenu && (() => {
            const ctxNode = nodes.find((n) => n.id === contextMenu.nodeId);
            if (!ctxNode) return null;
            const ctxMeta = COMPONENT_CATALOG[ctxNode.type];
            const isGateSwappable =
              TWO_INPUT_GATES.includes(ctxNode.type) ||
              THREE_INPUT_GATES.includes(ctxNode.type);
            const isFfSwappable = ctxNode.type === 'DFF' || ctxNode.type === 'TFF';
            const isInputSwappable = ctxNode.type === 'SWITCH' || ctxNode.type === 'BUTTON';
            const msiFamily = MSI_SWAP_FAMILIES.find((fam) => fam.types.includes(ctxNode.type));

            const allowedTwo = TWO_INPUT_GATES.filter(
              (t) => !allowedSet || allowedSet.has(t)
            );
            const allowedThree = THREE_INPUT_GATES.filter(
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
                    {ctxMeta.label} ({ctxNode.label})
                  </span>
                  {ctxNode.locked && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg shrink-0">
                      <Lock className="w-3 h-3" /> Kilitli
                    </span>
                  )}
                </div>

                {!ctxNode.locked && isGateSwappable && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-sky-700">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>Kapı Türünü Değiştir</span>
                    </div>

                    {allowedTwo.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 px-1">
                          2-Girişli Kapılar
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
                          3-Girişli Kapılar
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
                  </div>
                )}

                {!ctxNode.locked && msiFamily && allowedMsiVariants.length > 1 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-violet-700">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>Boyut / Tür Değiştir</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 px-1">
                      {msiFamily.label} (Ortak kablolar korunur)
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
                      <span>Kapı Türünü Değiştir</span>
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
                      <span>Giriş Türünü Değiştir</span>
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
                    {ctxNode.locked ? 'Sabit Görev Bileşeni' : 'Devreden Çıkar'}
                  </span>
                </button>
              </div>
            );
          })()}
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
                    {tab.id}
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
              <span>Tüm Parçalar</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {activePhoneTabItems.map((comp) => {
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
                    {comp.label}
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
                  Parça Ekle · Tıkla ✨
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPhoneSheetExpanded(false)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 text-[11px] font-bold cursor-pointer min-h-[36px]"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Küçült</span>
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain pastel-scrollbar p-3 space-y-3">
              {COMPONENT_CATEGORIES.map((category) => {
                const items = Object.values(COMPONENT_CATALOG).filter((item) => {
                  if (item.category !== category) return false;
                  if (allowedSet && !allowedSet.has(item.type)) return false;
                  return true;
                });
                if (items.length === 0) return null;
                const style = CATEGORY_ACCENTS[category];

                if (category === 'MSI Bloklar') {
                  return (
                    <div key={category} className="space-y-2">
                      <div className={`text-[11px] font-display font-extrabold px-1 ${style.badge}`}>
                        {category}
                      </div>
                      {MSI_SUBCATEGORIES.map((sub) => {
                        const subItems = items.filter((item) => item.subcategory === sub);
                        if (subItems.length === 0) return null;
                        const subAccent = MSI_SUBCATEGORY_ACCENTS[sub];
                        return (
                          <div key={sub} className="space-y-1.5">
                            <div
                              className={`px-2 py-1 rounded-xl border text-[10.5px] font-display font-extrabold ${subAccent.header}`}
                            >
                              {sub}
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
                                    {comp.label}
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
                      {category}
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
                            {comp.label}
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
                      Devre Kusursuz Çalışıyor! Tüm {verification.rows.length} doğruluk tablosu satırını tam puanla geçtin.
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    <span className="text-sm font-bold">
                      Neredeyse tamam! Bazı kombinasyonlar beklenen çıkışla uyuşmuyor, aşağıdaki tabloyu kontrol et.
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
                          Saat Darbesi
                        </th>
                      )}
                      {challenge?.inputs.map((inp) => (
                        <th key={inp} className="py-2 px-3 text-left font-bold">
                          {inp}
                        </th>
                      ))}
                      {challenge?.outputs.map((out) => (
                        <th key={`exp_${out}`} className="py-2 px-3 text-left text-sky-700 font-bold">
                          Beklenen {out}
                        </th>
                      ))}
                      {challenge?.outputs.map((out) => (
                        <th key={`act_${out}`} className="py-2 px-3 text-left text-slate-700 font-bold">
                          Devre {out}
                        </th>
                      ))}
                      <th className="py-2 px-3 text-left font-bold">Durum</th>
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
                            ↑ Darbe #{idx + 1}
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
                              <CheckCircle2 className="w-3.5 h-3.5" /> DOĞRU
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                              <XCircle className="w-3.5 h-3.5" /> HATALI
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
