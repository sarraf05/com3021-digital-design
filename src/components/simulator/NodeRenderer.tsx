import React from 'react';
import { getNodeMeta } from '../../engine/componentCatalog';
import type {
  CircuitNode,
  CustomICColor,
  CustomICDefinition,
  LogicValue,
  PinDefinition,
} from '../../types/simulator';

interface NodeRendererProps {
  node: CircuitNode;
  customICs?: CustomICDefinition[];
  selected: boolean;
  connectingFrom: {
    nodeId: string;
    pinId: string;
    direction: 'in' | 'out';
  } | null;
  snappedPinKey: string | null;
  isClockPlaying?: boolean;
  onSelectNode: (nodeId: string, e: React.PointerEvent) => void;
  onStartDragNode: (nodeId: string, e: React.PointerEvent) => void;
  onPinPointerDown: (node: CircuitNode, pin: PinDefinition, e: React.PointerEvent) => void;
  onPinPointerUp: (node: CircuitNode, pin: PinDefinition, e: React.PointerEvent) => void;
  onToggleSwitch: (nodeId: string) => void;
  onButtonState: (nodeId: string, val: LogicValue) => void;
  onToggleClockPlay: (nodeId: string) => void;
  onCycleClockSpeed: (nodeId: string) => void;
  onClockStepPulse: (nodeId: string) => void;
  onContextMenuNode: (nodeId: string, e: React.MouseEvent) => void;
}

const SEVEN_SEG_MAP: Record<
  number,
  [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
> = {
  0: [true, true, true, true, true, true, false],
  1: [false, true, true, false, false, false, false],
  2: [true, true, false, true, true, false, true],
  3: [true, true, true, true, false, false, true],
  4: [false, true, true, false, false, true, true],
  5: [true, false, true, true, false, true, true],
  6: [true, false, true, true, true, true, true],
  7: [true, true, true, false, false, false, false],
  8: [true, true, true, true, true, true, true],
  9: [true, true, true, true, false, true, true],
  10: [true, true, true, false, true, true, true],
  11: [false, false, true, true, true, true, true],
  12: [true, false, false, true, true, true, false],
  13: [false, true, true, true, true, false, true],
  14: [true, false, false, true, true, true, true],
  15: [true, false, false, false, true, true, true],
};

interface GatePalette {
  fill: string;
  stroke: string;
  lip: string;
  text: string;
}

const CUSTOM_IC_THEMES: Record<CustomICColor, GatePalette> = {
  mint: { fill: '#ECFDF5', stroke: '#10B981', lip: '#6EE7B7', text: '#065F46' },
  sky: { fill: '#F0F9FF', stroke: '#0EA5E9', lip: '#7DD3FC', text: '#0369A1' },
  coral: { fill: '#FFF1F2', stroke: '#F43F5E', lip: '#FDA4AF', text: '#BE123C' },
  violet: { fill: '#F5F3FF', stroke: '#8B5CF6', lip: '#C4B5FD', text: '#5B21B6' },
  amber: { fill: '#FFFBEB', stroke: '#F59E0B', lip: '#FCD34D', text: '#92400E' },
};

function getGatePalette(
  node: CircuitNode,
  customICs: CustomICDefinition[]
): GatePalette {
  if (node.type === 'CUSTOM_IC') {
    const bp = node.customIcId
      ? customICs.find((ic) => ic.id === node.customIcId)
      : undefined;
    const color = bp?.color ?? node.customIcColor ?? 'violet';
    return CUSTOM_IC_THEMES[color];
  }
  switch (node.type) {
    case 'AND':
    case 'NAND':
    case 'AND3':
    case 'NAND3':
      return { fill: '#E0F2FE', stroke: '#0284C7', lip: '#7DD3FC', text: '#0369A1' };
    case 'OR':
    case 'NOR':
    case 'OR3':
    case 'NOR3':
      return { fill: '#FFEDD5', stroke: '#EA580C', lip: '#FDBA74', text: '#C2410C' };
    case 'NOT':
      return { fill: '#F3E8FF', stroke: '#9333EA', lip: '#D8B4FE', text: '#7E22CE' };
    case 'XOR':
    case 'XNOR':
    case 'XOR3':
    case 'XNOR3':
      return { fill: '#D1FAE5', stroke: '#059669', lip: '#6EE7B7', text: '#047857' };
    case 'DFF':
    case 'JKFF':
    case 'TFF':
      return { fill: '#FEF3C7', stroke: '#D97706', lip: '#FCD34D', text: '#B45309' };
    case 'HALF_ADDER':
    case 'FULL_ADDER':
      return { fill: '#FFE4E6', stroke: '#E11D48', lip: '#FDA4AF', text: '#BE123C' };
    case 'COMPARATOR_2BIT':
      return { fill: '#CFFAFE', stroke: '#0891B2', lip: '#67E8F9', text: '#0E7490' };
    case 'MUX_2X1':
    case 'MUX_4X1':
    case 'MUX_8X1':
      return { fill: '#EDE9FE', stroke: '#7C3AED', lip: '#C4B5FD', text: '#6D28D9' };
    case 'DEMUX_1TO2':
    case 'DEMUX_1TO4':
    case 'DEMUX_1TO8':
      return { fill: '#E0E7FF', stroke: '#4F46E5', lip: '#A5B4FC', text: '#4338CA' };
    case 'DECODER_2TO4':
    case 'DECODER_3TO8':
      return { fill: '#CCFBF1', stroke: '#0D9488', lip: '#5EEAD4', text: '#0F766E' };
    case 'ENCODER_4TO2':
    case 'ENCODER_8TO3':
    case 'PRIORITY_ENCODER_4TO2':
      return { fill: '#FCE7F3', stroke: '#DB2777', lip: '#F9A8D4', text: '#BE185D' };
    default:
      return { fill: '#FFFFFF', stroke: '#64748B', lip: '#CBD5E1', text: '#334155' };
  }
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  customICs = [],
  selected,
  connectingFrom,
  snappedPinKey,
  isClockPlaying = false,
  onSelectNode,
  onStartDragNode,
  onPinPointerDown,
  onPinPointerUp,
  onToggleSwitch,
  onButtonState,
  onToggleClockPlay,
  onCycleClockSpeed,
  onClockStepPulse,
  onContextMenuNode,
}) => {
  const meta = getNodeMeta(node, customICs);
  const pal = getGatePalette(node, customICs);
  const outVal = node.outputs.out ?? 0;

  const isBasicGate =
    node.type === 'AND' ||
    node.type === 'OR' ||
    node.type === 'NOT' ||
    node.type === 'NAND' ||
    node.type === 'NOR' ||
    node.type === 'XOR' ||
    node.type === 'XNOR' ||
    node.type === 'AND3' ||
    node.type === 'OR3' ||
    node.type === 'NAND3' ||
    node.type === 'NOR3' ||
    node.type === 'XOR3' ||
    node.type === 'XNOR3';

  const segDigit =
    ((node.inputs.b3 ?? 0) << 3) |
    ((node.inputs.b2 ?? 0) << 2) |
    ((node.inputs.b1 ?? 0) << 1) |
    (node.inputs.b0 ?? 0);
  const segs = SEVEN_SEG_MAP[segDigit] ?? SEVEN_SEG_MAP[0];

  const renderGateBody = () => {
    const strokeCol = selected ? '#0EA5E9' : pal.stroke;
    const sw = selected ? 3.4 : 2.8;

    switch (node.type) {
      case 'AND':
      case 'NAND': {
        const path = 'M 10 8 L 46 8 A 22 20 0 0 1 46 48 L 10 48 Z';
        const bubbleX = 74;
        const outStartX = node.type === 'NAND' ? 80 : 68;
        return (
          <>
            <line x1={0} y1={16} x2={10} y2={16} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={40} x2={10} y2={40} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={outStartX} y1={28} x2={meta.width} y2={28} stroke={outVal === 1 ? '#10B981' : strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <path d={path} transform="translate(0, 3.5)" fill={pal.lip} />
            <path d={path} fill={pal.fill} stroke={strokeCol} strokeWidth={sw} strokeLinejoin="round" />
            {node.type === 'NAND' && (
              <circle cx={bubbleX} cy={28} r={5.5} fill="#FFFFFF" stroke={strokeCol} strokeWidth={sw} />
            )}
            <text
              x={37}
              y={32}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
              fill={pal.text}
              style={{ pointerEvents: 'none' }}
            >
              {meta.shortLabel}
            </text>
          </>
        );
      }

      case 'AND3':
      case 'NAND3': {
        const path = 'M 12 10 L 48 10 A 30 32 0 0 1 48 74 L 12 74 Z';
        const bubbleX = 84;
        const outStartX = node.type === 'NAND3' ? 90 : 78;
        return (
          <>
            <line x1={0} y1={18} x2={12} y2={18} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={42} x2={12} y2={42} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={66} x2={12} y2={66} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={outStartX} y1={42} x2={meta.width} y2={42} stroke={outVal === 1 ? '#10B981' : strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <path d={path} transform="translate(0, 3.5)" fill={pal.lip} />
            <path d={path} fill={pal.fill} stroke={strokeCol} strokeWidth={sw} strokeLinejoin="round" />
            {node.type === 'NAND3' && (
              <circle cx={bubbleX} cy={42} r={5.5} fill="#FFFFFF" stroke={strokeCol} strokeWidth={sw} />
            )}
            <text
              x={43}
              y={46}
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
              fill={pal.text}
              style={{ pointerEvents: 'none' }}
            >
              {meta.shortLabel}
            </text>
          </>
        );
      }

      case 'OR':
      case 'NOR': {
        const path = 'M 10 8 Q 24 28 10 48 L 36 48 Q 60 48 72 28 Q 60 8 36 8 Z';
        const outStartX = node.type === 'NOR' ? 84 : 72;
        return (
          <>
            <line x1={0} y1={16} x2={15} y2={16} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={40} x2={15} y2={40} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={outStartX} y1={28} x2={meta.width} y2={28} stroke={outVal === 1 ? '#10B981' : strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <path d={path} transform="translate(0, 3.5)" fill={pal.lip} />
            <path d={path} fill={pal.fill} stroke={strokeCol} strokeWidth={sw} strokeLinejoin="round" />
            {node.type === 'NOR' && (
              <circle cx={78} cy={28} r={5.5} fill="#FFFFFF" stroke={strokeCol} strokeWidth={sw} />
            )}
            <text
              x={42}
              y={32}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
              fill={pal.text}
              style={{ pointerEvents: 'none' }}
            >
              {meta.shortLabel}
            </text>
          </>
        );
      }

      case 'OR3':
      case 'NOR3': {
        const path = 'M 12 10 Q 28 42 12 74 L 40 74 Q 68 74 82 42 Q 68 10 40 10 Z';
        const outStartX = node.type === 'NOR3' ? 94 : 82;
        return (
          <>
            <line x1={0} y1={18} x2={15} y2={18} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={42} x2={19} y2={42} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={66} x2={15} y2={66} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={outStartX} y1={42} x2={meta.width} y2={42} stroke={outVal === 1 ? '#10B981' : strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <path d={path} transform="translate(0, 3.5)" fill={pal.lip} />
            <path d={path} fill={pal.fill} stroke={strokeCol} strokeWidth={sw} strokeLinejoin="round" />
            {node.type === 'NOR3' && (
              <circle cx={88} cy={42} r={5.5} fill="#FFFFFF" stroke={strokeCol} strokeWidth={sw} />
            )}
            <text
              x={47}
              y={46}
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
              fill={pal.text}
              style={{ pointerEvents: 'none' }}
            >
              {meta.shortLabel}
            </text>
          </>
        );
      }

      case 'XOR':
      case 'XNOR': {
        const path = 'M 18 8 Q 31 28 18 48 L 40 48 Q 62 48 74 28 Q 62 8 40 8 Z';
        const arc = 'M 10 9 Q 22 28 10 47';
        const outStartX = node.type === 'XNOR' ? 86 : 74;
        return (
          <>
            <line x1={0} y1={16} x2={14} y2={16} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={40} x2={14} y2={40} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={outStartX} y1={28} x2={meta.width} y2={28} stroke={outVal === 1 ? '#10B981' : strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <path d={path} transform="translate(0, 3.5)" fill={pal.lip} />
            <path d={arc} fill="none" stroke={strokeCol} strokeWidth={sw} strokeLinecap="round" />
            <path d={path} fill={pal.fill} stroke={strokeCol} strokeWidth={sw} strokeLinejoin="round" />
            {node.type === 'XNOR' && (
              <circle cx={80} cy={28} r={5.5} fill="#FFFFFF" stroke={strokeCol} strokeWidth={sw} />
            )}
            <text
              x={46}
              y={32}
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
              fill={pal.text}
              style={{ pointerEvents: 'none' }}
            >
              {meta.shortLabel}
            </text>
          </>
        );
      }

      case 'XOR3':
      case 'XNOR3': {
        const path = 'M 20 10 Q 35 42 20 74 L 44 74 Q 70 74 84 42 Q 70 10 44 10 Z';
        const arc = 'M 11 11 Q 26 42 11 73';
        const outStartX = node.type === 'XNOR3' ? 96 : 84;
        return (
          <>
            <line x1={0} y1={18} x2={14} y2={18} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={42} x2={18} y2={42} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={66} x2={14} y2={66} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={outStartX} y1={42} x2={meta.width} y2={42} stroke={outVal === 1 ? '#10B981' : strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <path d={path} transform="translate(0, 3.5)" fill={pal.lip} />
            <path d={arc} fill="none" stroke={strokeCol} strokeWidth={sw} strokeLinecap="round" />
            <path d={path} fill={pal.fill} stroke={strokeCol} strokeWidth={sw} strokeLinejoin="round" />
            {node.type === 'XNOR3' && (
              <circle cx={90} cy={42} r={5.5} fill="#FFFFFF" stroke={strokeCol} strokeWidth={sw} />
            )}
            <text
              x={52}
              y={46}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
              fill={pal.text}
              style={{ pointerEvents: 'none' }}
            >
              {meta.shortLabel}
            </text>
          </>
        );
      }

      case 'NOT': {
        const path = 'M 12 7 L 58 24 L 12 41 Z';
        return (
          <>
            <line x1={0} y1={24} x2={12} y2={24} stroke={strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={69} y1={24} x2={meta.width} y2={24} stroke={outVal === 1 ? '#10B981' : strokeCol} strokeWidth={2.5} strokeLinecap="round" />
            <path d={path} transform="translate(0, 3)" fill={pal.lip} />
            <path d={path} fill={pal.fill} stroke={strokeCol} strokeWidth={sw} strokeLinejoin="round" />
            <circle cx={64} cy={24} r={5} fill="#FFFFFF" stroke={strokeCol} strokeWidth={sw} />
            <text
              x={29}
              y={27.5}
              textAnchor="middle"
              fontSize="10"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
              fill={pal.text}
              style={{ pointerEvents: 'none' }}
            >
              NOT
            </text>
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onPointerDown={(e) => {
        onSelectNode(node.id, e);
        onStartDragNode(node.id, e);
      }}
      onContextMenu={(e) => onContextMenuNode(node.id, e)}
      style={{ cursor: 'grab', touchAction: 'none' }}
    >
      {/* Selection Halo */}
      {selected && (
        <rect
          x={-5}
          y={-5}
          width={meta.width + 10}
          height={meta.height + 10}
          rx={18}
          fill="none"
          stroke="#0EA5E9"
          strokeWidth={2}
          strokeDasharray="5 3"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Component Body */}
      {isBasicGate && renderGateBody()}

      {node.type === 'SWITCH' && (
        <>
          <rect
            x={0}
            y={3}
            width={meta.width}
            height={meta.height}
            rx={14}
            fill={outVal === 1 ? '#6EE7B7' : '#CBD5E1'}
          />
          <rect
            x={0}
            y={0}
            width={meta.width}
            height={meta.height}
            rx={14}
            fill={outVal === 1 ? '#ECFDF5' : '#FFFFFF'}
            stroke={selected ? '#0EA5E9' : outVal === 1 ? '#10B981' : '#94A3B8'}
            strokeWidth={2.5}
          />

          {/* Output stem leading directly to exact pin (84, 24) */}
          <line
            x1={64}
            y1={24}
            x2={meta.width}
            y2={24}
            stroke={outVal === 1 ? '#10B981' : '#94A3B8'}
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ pointerEvents: 'none' }}
          />

          <text
            x={10}
            y={20}
            fontSize="11.5"
            fontWeight="800"
            fontFamily="JetBrains Mono, monospace"
            fill="#1E293B"
            style={{ pointerEvents: 'none' }}
          >
            {node.label.slice(0, 4)}
          </text>
          <text
            x={10}
            y={36}
            fontSize="9"
            fontWeight="800"
            fontFamily="Nunito, sans-serif"
            fill={outVal === 1 ? '#059669' : '#64748B'}
            style={{ pointerEvents: 'none' }}
          >
            {outVal === 1 ? 'AÇIK' : 'KAPALI'}
          </text>

          {/* Glowing ON halo when latched to 1 */}
          {outVal === 1 && (
            <rect
              x={34}
              y={6}
              width={32}
              height={36}
              rx={11}
              fill="#34D399"
              opacity={0.28}
              style={{ pointerEvents: 'none' }}
            />
          )}

          {/* Tactile Latching Pill (1 = Mint Emerald, 0 = Soft Slate) */}
          <rect
            x={36}
            y={8}
            width={28}
            height={32}
            rx={9}
            fill={outVal === 1 ? '#10B981' : '#E2E8F0'}
            stroke={outVal === 1 ? '#047857' : '#94A3B8'}
            strokeWidth={2}
            style={{ pointerEvents: 'none' }}
          />
          <text
            x={50}
            y={29}
            textAnchor="middle"
            fontSize="13.5"
            fontWeight="900"
            fontFamily="JetBrains Mono, monospace"
            fill={outVal === 1 ? '#FFFFFF' : '#475569'}
            style={{ pointerEvents: 'none' }}
          >
            {outVal}
          </text>

          {/* Generous >= 44x44 interactive tap hitbox clear of the right output pin */}
          <rect
            x={22}
            y={2}
            width={44}
            height={44}
            rx={10}
            fill="transparent"
            style={{ cursor: 'pointer' }}
          />
        </>
      )}

      {node.type === 'BUTTON' && (
        <>
          <rect
            x={0}
            y={3}
            width={meta.width}
            height={meta.height}
            rx={14}
            fill={outVal === 1 ? '#FDA4AF' : '#CBD5E1'}
          />
          <rect
            x={0}
            y={0}
            width={meta.width}
            height={meta.height}
            rx={14}
            fill={outVal === 1 ? '#FFF1F2' : '#FFFFFF'}
            stroke={selected ? '#0EA5E9' : outVal === 1 ? '#F43F5E' : '#94A3B8'}
            strokeWidth={2.5}
          />
          <text
            x={11}
            y={28}
            fontSize="11"
            fontWeight="800"
            fontFamily="JetBrains Mono, monospace"
            fill="#1E293B"
            style={{ pointerEvents: 'none' }}
          >
            {node.label.slice(0, 5)}
          </text>
          <g
            onPointerDown={(e) => {
              e.stopPropagation();
              onButtonState(node.id, 1);
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              onButtonState(node.id, 0);
            }}
            onPointerLeave={() => {
              if (outVal === 1) onButtonState(node.id, 0);
            }}
            onPointerCancel={(e) => {
              e.stopPropagation();
              if (outVal === 1) onButtonState(node.id, 0);
            }}
            style={{ cursor: 'pointer', touchAction: 'none' }}
          >
            <circle
              cx={61}
              cy={24}
              r={13}
              fill={outVal === 1 ? '#FF6B8B' : '#F1F5F9'}
              stroke={outVal === 1 ? '#E11D48' : '#94A3B8'}
              strokeWidth={2.2}
            />
            <text
              x={61}
              y={28.5}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="800"
              fontFamily="JetBrains Mono, monospace"
              fill={outVal === 1 ? '#FFFFFF' : '#475569'}
            >
              {outVal}
            </text>
          </g>
        </>
      )}

      {node.type === 'CLOCK' && (
        <>
          <rect
            x={0}
            y={3}
            width={meta.width}
            height={meta.height}
            rx={14}
            fill="#FCD34D"
          />
          <rect
            x={0}
            y={0}
            width={meta.width}
            height={meta.height}
            rx={14}
            fill="#FFFBEB"
            stroke={selected ? '#0EA5E9' : '#F59E0B'}
            strokeWidth={2.5}
          />
          <text
            x={10}
            y={18}
            fontSize="10.5"
            fontWeight="800"
            fontFamily="JetBrains Mono, monospace"
            fill="#92400E"
            style={{ pointerEvents: 'none' }}
          >
            {node.label}
          </text>
          <rect
            x={76}
            y={6}
            width={22}
            height={16}
            rx={5}
            fill={outVal === 1 ? '#10B981' : '#E2E8F0'}
          />
          <text
            x={87}
            y={18}
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fontFamily="JetBrains Mono, monospace"
            fill={outVal === 1 ? '#FFFFFF' : '#475569'}
          >
            {outVal}
          </text>

          {/* Play/Pause Button */}
          <g
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onToggleClockPlay(node.id);
            }}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={8}
              y={28}
              width={26}
              height={22}
              rx={7}
              fill={isClockPlaying ? '#10B981' : '#FFFFFF'}
              stroke="#D97706"
              strokeWidth={1.6}
            />
            <text
              x={21}
              y={43}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="800"
              fill={isClockPlaying ? '#FFFFFF' : '#92400E'}
            >
              {isClockPlaying ? '❚❚' : '▶'}
            </text>
          </g>

          {/* Hz Cycle Button */}
          <g
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onCycleClockSpeed(node.id);
            }}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={38}
              y={28}
              width={32}
              height={22}
              rx={7}
              fill="#FFFFFF"
              stroke="#D97706"
              strokeWidth={1.6}
            />
            <text
              x={54}
              y={42.5}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
              fill="#92400E"
            >
              {Math.abs(node.internal.clockHz || 1)}Hz
            </text>
          </g>

          {/* Step Pulse ↑ Button */}
          <g
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClockStepPulse(node.id);
            }}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={74}
              y={28}
              width={25}
              height={22}
              rx={7}
              fill="#0EA5E9"
              stroke="#0284C7"
              strokeWidth={1.6}
            />
            <text
              x={86.5}
              y={43}
              textAnchor="middle"
              fontSize="12"
              fontWeight="900"
              fill="#FFFFFF"
            >
              ↑
            </text>
          </g>
        </>
      )}

      {node.type === 'LED' && (
        <>
          {(() => {
            const ledOn = (node.inputs.in ?? 0) === 1;
            return (
              <>
                <rect
                  x={0}
                  y={3}
                  width={meta.width}
                  height={meta.height}
                  rx={14}
                  fill={ledOn ? '#6EE7B7' : '#CBD5E1'}
                />
                <rect
                  x={0}
                  y={0}
                  width={meta.width}
                  height={meta.height}
                  rx={14}
                  fill={ledOn ? '#ECFDF5' : '#FFFFFF'}
                  stroke={selected ? '#0EA5E9' : ledOn ? '#10B981' : '#94A3B8'}
                  strokeWidth={2.5}
                />
                {/* Glowing Bulb */}
                {ledOn && (
                  <circle
                    cx={24}
                    cy={24}
                    r={16}
                    fill="#34D399"
                    opacity={0.3}
                    style={{ pointerEvents: 'none' }}
                  />
                )}
                <circle
                  cx={24}
                  cy={24}
                  r={11.5}
                  fill={ledOn ? '#10B981' : '#E2E8F0'}
                  stroke={ledOn ? '#047857' : '#94A3B8'}
                  strokeWidth={2.2}
                />
                {/* Cute glass highlight */}
                <circle cx={20.5} cy={20} r={3} fill="#FFFFFF" opacity={ledOn ? 0.75 : 0.45} />
                <text
                  x={24}
                  y={28}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="800"
                  fontFamily="JetBrains Mono, monospace"
                  fill={ledOn ? '#FFFFFF' : '#475569'}
                >
                  {node.inputs.in ?? 0}
                </text>
                <text
                  x={56}
                  y={28}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="800"
                  fontFamily="JetBrains Mono, monospace"
                  fill={ledOn ? '#065F46' : '#334155'}
                >
                  {node.label.slice(0, 5)}
                </text>
              </>
            );
          })()}
        </>
      )}

      {node.type === 'SEVEN_SEG' && (
        <>
          <rect x={0} y={3.5} width={meta.width} height={meta.height} rx={16} fill="#CBD5E1" />
          <rect
            x={0}
            y={0}
            width={meta.width}
            height={meta.height}
            rx={16}
            fill="#FFFFFF"
            stroke={selected ? '#0EA5E9' : '#64748B'}
            strokeWidth={2.5}
          />
          {['B3', 'B2', 'B1', 'B0'].map((lbl, idx) => (
            <text
              key={lbl}
              x={10}
              y={25 + idx * 22}
              fontSize="9.5"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
              fill="#64748B"
            >
              {lbl}
            </text>
          ))}
          <rect x={34} y={12} width={54} height={76} rx={10} fill="#1E293B" />
          <g transform="translate(39, 14)">
            <polygon points="10,4 34,4 30,9 14,9" fill={segs[0] ? '#34D399' : '#334155'} />
            <polygon points="35,6 39,10 39,32 35,35 31,31 31,10" fill={segs[1] ? '#34D399' : '#334155'} />
            <polygon points="35,37 39,41 39,62 35,66 31,61 31,41" fill={segs[2] ? '#34D399' : '#334155'} />
            <polygon points="10,68 34,68 30,63 14,63" fill={segs[3] ? '#34D399' : '#334155'} />
            <polygon points="9,37 13,41 13,61 9,66 5,62 5,41" fill={segs[4] ? '#34D399' : '#334155'} />
            <polygon points="9,6 13,10 13,31 9,35 5,32 5,10" fill={segs[5] ? '#34D399' : '#334155'} />
            <polygon points="11,36 14,33 30,33 33,36 30,39 14,39" fill={segs[6] ? '#34D399' : '#334155'} />
          </g>
          <text
            x={61}
            y={104}
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fontFamily="JetBrains Mono, monospace"
            fill="#0F172A"
          >
            HEX: {segDigit.toString(16).toUpperCase()} ({segDigit})
          </text>
        </>
      )}

      {/* MSI & Sequential IC Blocks */}
      {!isBasicGate &&
        node.type !== 'SWITCH' &&
        node.type !== 'BUTTON' &&
        node.type !== 'CLOCK' &&
        node.type !== 'LED' &&
        node.type !== 'SEVEN_SEG' && (
          <>
            <rect
              x={0}
              y={3.5}
              width={meta.width}
              height={meta.height}
              rx={16}
              fill={pal.lip}
            />
            <rect
              x={0}
              y={0}
              width={meta.width}
              height={meta.height}
              rx={16}
              fill={pal.fill}
              stroke={selected ? '#0EA5E9' : pal.stroke}
              strokeWidth={selected ? 3.2 : 2.6}
            />
            {/* Centered chip title badge (clear of left/right edge pin labels) */}
            <rect
              x={node.type === 'CUSTOM_IC' ? 10 : 16}
              y={5}
              width={node.type === 'CUSTOM_IC' ? meta.width - 20 : Math.max(52, meta.width - 32)}
              height={17}
              rx={6}
              fill="#FFFFFF"
              opacity={0.92}
            />
            <text
              x={meta.width / 2}
              y={16.5}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
              fill={pal.text}
              style={{ pointerEvents: 'none' }}
            >
              {node.type === 'CUSTOM_IC'
                ? `🧩 ${node.label.slice(0, 12)}`
                : node.label}
            </text>

            {/* Subtle dashed separator between data pins and select/enable control pins on left side */}
            {(() => {
              const leftInPins = meta.pins.filter((p) => p.direction === 'in');
              const firstCtrlIdx = leftInPins.findIndex((p) => p.role === 'control');
              if (firstCtrlIdx > 0 && meta.category === 'MSI Bloklar' && node.type !== 'CUSTOM_IC') {
                const prevPin = leftInPins[firstCtrlIdx - 1];
                const ctrlPin = leftInPins[firstCtrlIdx];
                const sepY = Math.round((prevPin.relY + ctrlPin.relY) / 2);
                return (
                  <line
                    x1={8}
                    y1={sepY}
                    x2={44}
                    y2={sepY}
                    stroke={pal.stroke}
                    strokeOpacity={0.35}
                    strokeWidth={1.2}
                    strokeDasharray="3 2"
                  />
                );
              }
              return null;
            })()}

            {/* Pin labels positioned directly next to exact pin Y coordinates */}
            {meta.pins.map((p) => {
              if (p.direction === 'in') {
                const isControl = p.role === 'control';
                const ctrlColor =
                  p.id === 'e' || p.id === 'cin' || p.id === 'clk'
                    ? '#B45309'
                    : '#0369A1';
                return (
                  <text
                    key={`lbl_${p.id}`}
                    x={10}
                    y={p.relY + 3.5}
                    fontSize="9.5"
                    fontWeight={isControl ? '800' : '700'}
                    fontFamily="JetBrains Mono, monospace"
                    fill={isControl ? ctrlColor : '#334155'}
                  >
                    {p.id === 'clk' ? '▷CLK' : p.name.slice(0, 6)}
                  </text>
                );
              }
              const activePin = (node.outputs[p.id] ?? 0) === 1;
              return (
                <text
                  key={`lbl_${p.id}`}
                  x={meta.width - 10}
                  y={p.relY + 3.5}
                  textAnchor="end"
                  fontSize="9.5"
                  fontWeight="800"
                  fontFamily="JetBrains Mono, monospace"
                  fill={activePin ? '#059669' : '#475569'}
                >
                  {p.name.slice(0, 6)}
                </text>
              );
            })}
          </>
        )}

      {/* Exact Coordinate Pins */}
      {meta.pins.map((pin) => {
        const val =
          pin.direction === 'out'
            ? (node.outputs[pin.id] ?? 0)
            : (node.inputs[pin.id] ?? 0);
        const isHigh = val === 1;
        const pinKey = `${node.id}:${pin.id}`;
        const isConnectingSource =
          connectingFrom?.nodeId === node.id && connectingFrom?.pinId === pin.id;
        const isCompatibleTarget =
          connectingFrom !== null &&
          connectingFrom.nodeId !== node.id &&
          connectingFrom.direction !== pin.direction;
        const isSnapped = snappedPinKey === pinKey;

        return (
          <g
            key={pin.id}
            transform={`translate(${pin.relX}, ${pin.relY})`}
            onPointerDown={(e) => {
              e.stopPropagation();
              onPinPointerDown(node, pin, e);
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              onPinPointerUp(node, pin, e);
            }}
            style={{ cursor: 'crosshair', touchAction: 'none' }}
          >
            <title>{`${pin.name} (${pin.direction === 'out' ? 'Çıkış' : 'Giriş'}): ${val}`}</title>

            {/* Compatible target subtle hint ring while connecting */}
            {isCompatibleTarget && !isSnapped && (
              <circle
                cx={0}
                cy={0}
                r={10}
                fill="none"
                stroke="#0EA5E9"
                strokeWidth={1.6}
                strokeDasharray="3 2"
                opacity={0.75}
              />
            )}

            {/* Active source pulse ring for Tap-to-Connect */}
            {isConnectingSource && !isSnapped && (
              <circle
                cx={0}
                cy={0}
                r={11.5}
                fill="rgba(14, 165, 233, 0.2)"
                stroke="#0EA5E9"
                strokeWidth={2}
                className="pin-snap-ring"
              />
            )}

            {/* Bouncy pulsing magnetic snap ring when within magnetic threshold */}
            {isSnapped && (
              <circle
                cx={0}
                cy={0}
                r={13}
                fill="rgba(16, 185, 129, 0.22)"
                stroke="#10B981"
                strokeWidth={2.5}
                className="pin-snap-ring"
              />
            )}

            {/* Generous invisible hit circle (r=18px) for effortless touch grabbing/tapping */}
            <circle cx={0} cy={0} r={18} fill="transparent" />

            {/* Exact centered crisp visible pin circle */}
            <circle
              cx={0}
              cy={0}
              r={isConnectingSource || isSnapped ? 6.8 : 5}
              fill={
                isConnectingSource
                  ? '#0EA5E9'
                  : isHigh
                    ? '#10B981'
                    : '#FFFFFF'
              }
              stroke={
                isSnapped
                  ? '#059669'
                  : isConnectingSource
                    ? '#0284C7'
                    : isHigh
                      ? '#047857'
                      : '#475569'
              }
              strokeWidth={2.2}
            />
          </g>
        );
      })}
    </g>
  );
};
