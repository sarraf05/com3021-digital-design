import React, { useId, useState } from 'react';
import { ChevronDown, Cpu } from 'lucide-react';
import type { Language } from '../../types/curriculum';

export const GATE_STYLES = {
  and: { fill: '#E0F2FE', stroke: '#0284C7', text: '#0369A1' },
  or: { fill: '#FFEDD5', stroke: '#EA580C', text: '#C2410C' },
  not: { fill: '#F3E8FF', stroke: '#9333EA', text: '#7E22CE' },
  xor: { fill: '#D1FAE5', stroke: '#059669', text: '#047857' },
  ff: { fill: '#FEF3C7', stroke: '#D97706', text: '#B45309' },
  adder: { fill: '#FFE4E6', stroke: '#E11D48', text: '#BE123C' },
  mux: { fill: '#EDE9FE', stroke: '#7C3AED', text: '#6D28D9' },
  dec: { fill: '#CCFBF1', stroke: '#0D9488', text: '#0F766E' },
  enc: { fill: '#FCE7F3', stroke: '#DB2777', text: '#BE185D' },
  mem: { fill: '#E0E7FF', stroke: '#4F46E5', text: '#3730A3' },
  neutral: { fill: '#F8FAFC', stroke: '#475569', text: '#1E293B' },
} as const;

export const WIRE_COLORS = {
  main: '#334155',
  signalA: '#0284C7',
  signalB: '#EA580C',
  clock: '#D97706',
  control: '#7C3AED',
  active: '#059669',
  alert: '#E11D48',
  muted: '#94A3B8',
} as const;

interface LabDiagramCardProps {
  title: string;
  equation?: string;
  summary?: string;
  lang: Language;
  collapsible?: boolean;
  defaultOpen?: boolean;
  badge?: string;
  children: React.ReactNode;
}

export const LabDiagramCard: React.FC<LabDiagramCardProps> = ({
  title,
  equation,
  summary,
  lang,
  collapsible = true,
  defaultOpen = true,
  badge,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs my-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </span>
          <h4 className="font-display font-bold text-slate-800 text-sm sm:text-[15px] leading-snug break-words">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
              {badge}
            </span>
          )}
          {collapsible && (
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
            >
              <span>
                {isOpen
                  ? lang === 'tr'
                    ? 'Gizle'
                    : 'Hide'
                  : lang === 'tr'
                    ? 'Şemayı Göster'
                    : 'Show Diagram'}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <>
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-2 sm:p-3 overflow-x-auto">
            {children}
          </div>

          {(equation || summary) && (
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              {equation && (
                <div className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2.5 py-1 rounded-lg w-fit max-w-full overflow-x-auto">
                  {equation}
                </div>
              )}
              {summary && (
                <p className="text-slate-600 font-medium leading-relaxed flex-1">
                  {summary}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface SvgMarkerIds {
  main: string;
  blue: string;
  amber: string;
  emerald: string;
  rose: string;
}

const SvgMarkerContext = React.createContext<SvgMarkerIds>({
  main: 'lab-arrow',
  blue: 'lab-arrow-blue',
  amber: 'lab-arrow-amber',
  emerald: 'lab-arrow-emerald',
  rose: 'lab-arrow-rose',
});

export const ArrowWire: React.FC<{
  d: string;
  variant?: keyof SvgMarkerIds;
  color?: string;
  width?: number;
  dashed?: boolean;
  both?: boolean;
}> = ({ d, variant = 'main', color, width = 2.2, dashed = false, both = false }) => {
  const markers = React.useContext(SvgMarkerContext);
  const strokeColor =
    color ??
    (variant === 'blue'
      ? WIRE_COLORS.signalA
      : variant === 'amber'
        ? WIRE_COLORS.clock
        : variant === 'emerald'
          ? WIRE_COLORS.active
          : variant === 'rose'
            ? WIRE_COLORS.alert
            : WIRE_COLORS.main);
  const markerId = markers[variant];
  return (
    <path
      d={d}
      fill="none"
      stroke={strokeColor}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? '5 4' : undefined}
      markerEnd={`url(#${markerId})`}
      markerStart={both ? `url(#${markerId})` : undefined}
    />
  );
};

interface LabSvgCanvasProps {
  viewBox: string;
  ariaLabel: string;
  children: React.ReactNode;
}

export const LabSvgCanvas: React.FC<LabSvgCanvasProps> = ({
  viewBox,
  ariaLabel,
  children,
}) => {
  const uid = useId().replace(/:/g, '');
  const gridId = `lab-dots-${uid}`;
  const markers: SvgMarkerIds = {
    main: `lab-arrow-${uid}`,
    blue: `lab-arrow-blue-${uid}`,
    amber: `lab-arrow-amber-${uid}`,
    emerald: `lab-arrow-emerald-${uid}`,
    rose: `lab-arrow-rose-${uid}`,
  };

  const [, , vbW, vbH] = viewBox.split(' ').map(Number);

  return (
    <SvgMarkerContext.Provider value={markers}>
      <svg
        viewBox={viewBox}
        role="img"
        aria-label={ariaLabel}
        className="w-full h-auto max-w-3xl mx-auto overflow-visible block select-none"
      >
        <defs>
          <pattern id={gridId} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="1.15" fill="#CBD5E1" opacity="0.72" />
          </pattern>
          <marker
            id={markers.main}
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#334155" />
          </marker>
          <marker
            id={markers.blue}
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0284C7" />
          </marker>
          <marker
            id={markers.amber}
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#D97706" />
          </marker>
          <marker
            id={markers.emerald}
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#059669" />
          </marker>
          <marker
            id={markers.rose}
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#E11D48" />
          </marker>
        </defs>
        <rect
          x="0"
          y="0"
          width={vbW || 800}
          height={vbH || 340}
          rx="12"
          fill="#FFFFFF"
        />
        <rect
          x="0"
          y="0"
          width={vbW || 800}
          height={vbH || 340}
          rx="12"
          fill={`url(#${gridId})`}
        />
        {children}
      </svg>
    </SvgMarkerContext.Provider>
  );
};

// Electrical junction dot — ONLY place on wires that genuinely connect/branch!
export const JunctionDot: React.FC<{
  x: number;
  y: number;
  r?: number;
  color?: string;
}> = ({ x, y, r = 3.7, color = '#0F172A' }) => (
  <circle cx={x} cy={y} r={r} fill={color} />
);

export const PinLabel: React.FC<{
  x: number;
  y: number;
  text: string;
  anchor?: 'start' | 'middle' | 'end';
  color?: string;
  size?: number;
  dy?: number;
}> = ({ x, y, text, anchor = 'middle', color = '#1E293B', size = 13, dy }) => (
  <text
    x={x}
    y={y}
    dy={dy}
    textAnchor={anchor}
    dominantBaseline="central"
    fontSize={size}
    fontWeight="700"
    fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fill={color}
  >
    {text}
  </text>
);

export const WireLabel: React.FC<{
  x: number;
  y: number;
  text: string;
  anchor?: 'start' | 'middle' | 'end';
  color?: string;
  size?: number;
  bg?: string;
}> = ({ x, y, text, anchor = 'middle', color = '#1E293B', size = 11.5, bg = '#FFFFFF' }) => {
  const estW = Math.max(24, text.length * size * 0.64 + 10);
  const estH = size + 6;
  const rxX = anchor === 'start' ? x - 5 : anchor === 'end' ? x - estW + 5 : x - estW / 2;
  return (
    <g>
      <rect
        x={rxX}
        y={y - estH / 2}
        width={estW}
        height={estH}
        rx={4}
        fill={bg}
        fillOpacity={0.94}
      />
      <PinLabel x={x} y={y} text={text} anchor={anchor} color={color} size={size} />
    </g>
  );
};

export const SectionTag: React.FC<{
  x: number;
  y: number;
  text: string;
  fill?: string;
  stroke?: string;
  color?: string;
  w?: number;
  h?: number;
}> = ({
  x,
  y,
  text,
  fill = '#F1F5F9',
  stroke = '#CBD5E1',
  color = '#334155',
  w = 210,
  h = 26,
}) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={8} fill={fill} stroke={stroke} strokeWidth={1.4} />
    <text
      x={w / 2}
      y={h / 2}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="12"
      fontWeight="800"
      fill={color}
    >
      {text}
    </text>
  </g>
);

export const Wire: React.FC<{
  d: string;
  color?: string;
  width?: number;
  dashed?: boolean;
}> = ({ d, color = WIRE_COLORS.main, width = 2.2, dashed = false }) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeDasharray={dashed ? '5 4' : undefined}
  />
);

export function getGatePinY(h: number, index: number, total: number): number {
  return (h / (total + 1)) * (index + 1);
}

// IEEE/ANSI Logic Gates positioned by top-left (x, y).
// External wires connect cleanly at left x (x - 9 if inputBubbles) and right x + w.
export const GateAnd: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  inputs?: number;
  label?: string;
  inverted?: boolean;
  inputBubbles?: boolean[];
}> = ({ x, y, w = 64, h = 42, inputs = 2, label, inverted = false, inputBubbles }) => {
  const s = GATE_STYLES.and;
  const bubbleR = 4.5;
  const bodyW = inverted ? w - bubbleR * 2 : w;
  const r = h / 2;
  const straightX = Math.max(10, bodyW - r);
  const pinCount = inputBubbles ? inputBubbles.length : inputs;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={`M 0 0 L ${straightX} 0 A ${r} ${r} 0 0 1 ${straightX} ${h} L 0 ${h} Z`}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={2.2}
      />
      {Array.from({ length: pinCount }).map((_, i) =>
        inputBubbles?.[i] ? (
          <circle
            key={i}
            cx={-bubbleR}
            cy={getGatePinY(h, i, pinCount)}
            r={bubbleR}
            fill="#FFFFFF"
            stroke={s.stroke}
            strokeWidth={2.1}
          />
        ) : null
      )}
      {inverted && (
        <circle
          cx={bodyW + bubbleR}
          cy={h / 2}
          r={bubbleR}
          fill="#FFFFFF"
          stroke={s.stroke}
          strokeWidth={2.1}
        />
      )}
      {label && (
        <text
          x={bodyW * 0.45}
          y={h / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="11"
          fontWeight="800"
          fill={s.text}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export const GateNand: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  inputs?: number;
  label?: string;
  inputBubbles?: boolean[];
}> = (props) => <GateAnd label="NAND" {...props} inverted />;

export const GateOr: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  inputs?: number;
  label?: string;
  inverted?: boolean;
  xor?: boolean;
  inputBubbles?: boolean[];
}> = ({
  x,
  y,
  w = 66,
  h = 42,
  inputs = 2,
  label,
  inverted = false,
  xor = false,
  inputBubbles,
}) => {
  const s = xor ? GATE_STYLES.xor : GATE_STYLES.or;
  const bubbleR = 4.5;
  const xLeft = xor ? 9 : 0;
  const bodyW = Math.max(30, (inverted ? w - bubbleR * 2 : w) - xLeft);
  const backCurve = 10;
  const xRight = xLeft + bodyW;
  const pinCount = inputBubbles ? inputBubbles.length : inputs;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Internal pin lead stubs from x=0 to curved shield so wires at x=0 always attach seamlessly */}
      {Array.from({ length: pinCount }).map((_, i) => {
        const py = getGatePinY(h, i, pinCount);
        return (
          <line
            key={`stub-${i}`}
            x1={0}
            y1={py}
            x2={xLeft + backCurve * 0.8}
            y2={py}
            stroke={WIRE_COLORS.main}
            strokeWidth={2}
          />
        );
      })}
      {xor && (
        <path
          d={`M 0 0 Q ${backCurve} ${h / 2} 0 ${h}`}
          fill="none"
          stroke={s.stroke}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      )}
      <path
        d={`M ${xLeft} 0 L ${xLeft + bodyW * 0.32} 0 Q ${xLeft + bodyW * 0.76} 0 ${xRight} ${h / 2} Q ${xLeft + bodyW * 0.76} ${h} ${xLeft + bodyW * 0.32} ${h} L ${xLeft} ${h} Q ${xLeft + backCurve} ${h / 2} ${xLeft} 0 Z`}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      {Array.from({ length: pinCount }).map((_, i) =>
        inputBubbles?.[i] ? (
          <circle
            key={`bub-${i}`}
            cx={-bubbleR}
            cy={getGatePinY(h, i, pinCount)}
            r={bubbleR - 0.3}
            fill="#FFFFFF"
            stroke={s.stroke}
            strokeWidth={2}
          />
        ) : null
      )}
      {inverted && (
        <circle
          cx={xRight + bubbleR}
          cy={h / 2}
          r={bubbleR}
          fill="#FFFFFF"
          stroke={s.stroke}
          strokeWidth={2.1}
        />
      )}
      {label && (
        <text
          x={xLeft + bodyW * 0.52}
          y={h / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="10.5"
          fontWeight="800"
          fill={s.text}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export const GateNor: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  inputs?: number;
  label?: string;
  inputBubbles?: boolean[];
}> = (props) => <GateOr w={68} label="NOR" {...props} inverted />;

export const GateXor: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  inputs?: number;
  label?: string;
}> = (props) => <GateOr w={72} label="XOR" {...props} xor />;

export const GateXnor: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  inputs?: number;
  label?: string;
}> = (props) => <GateOr w={74} label="XNOR" {...props} xor inverted />;

export const GateNot: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  inverted?: boolean;
  tristate?: boolean;
  label?: string;
}> = ({
  x,
  y,
  w = 44,
  h = 30,
  inverted = true,
  tristate: _tristate = false,
  label,
}) => {
  const s = GATE_STYLES.not;
  const bubbleR = 4.5;
  const triW = inverted ? w - bubbleR * 2 : w;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <polygon
        points={`0,0 ${triW},${h / 2} 0,${h}`}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      {inverted && (
        <circle
          cx={triW + bubbleR}
          cy={h / 2}
          r={bubbleR}
          fill="#FFFFFF"
          stroke={s.stroke}
          strokeWidth={2.1}
        />
      )}
      {label && (
        <text
          x={triW * 0.36}
          y={h / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="10"
          fontWeight="800"
          fill={s.text}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export const GateBuffer: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  tristate?: boolean;
  label?: string;
}> = (props) => <GateNot {...props} inverted={false} />;

export const LogicBlock: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  palette?: keyof typeof GATE_STYLES;
  hasClockAtY?: number;
}> = ({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  palette = 'ff',
  hasClockAtY,
}) => {
  const s = GATE_STYLES[palette];
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        rx={10}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={2.2}
      />
      {hasClockAtY !== undefined && (
        <polyline
          points={`0,${hasClockAtY - 6} 9,${hasClockAtY} 0,${hasClockAtY + 6}`}
          fill="none"
          stroke={s.stroke}
          strokeWidth={2}
        />
      )}
      <text
        x={w / 2}
        y={subtitle ? h / 2 - 7 : h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12.5"
        fontWeight="800"
        fill={s.text}
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={w / 2}
          y={h / 2 + 10}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="10.5"
          fontWeight="600"
          fill={s.text}
          opacity={0.85}
        >
          {subtitle}
        </text>
      )}
    </g>
  );
};

export const BlockBox = LogicBlock;

export const MuxTrapezoid: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  label?: string;
}> = ({ x, y, w = 48, h = 76, label = 'MUX' }) => {
  const s = GATE_STYLES.mux;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <polygon
        points={`0,0 ${w},12 ${w},${h - 12} 0,${h}`}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <text
        x={w / 2}
        y={h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11.5"
        fontWeight="800"
        fill={s.text}
      >
        {label}
      </text>
    </g>
  );
};

export const StateBubble: React.FC<{
  cx: number;
  cy: number;
  r?: number;
  label: string;
  sublabel?: string;
  fill?: string;
  stroke?: string;
  textColor?: string;
}> = ({
  cx,
  cy,
  r = 25,
  label,
  sublabel,
  fill = '#FEF3C7',
  stroke = '#D97706',
  textColor = '#92400E',
}) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={2.3} />
    <text
      x={cx}
      y={sublabel ? cy - 6 : cy}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="13"
      fontWeight="800"
      fill={textColor}
    >
      {label}
    </text>
    {sublabel && (
      <text
        x={cx}
        y={cy + 9}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11"
        fontWeight="700"
        fill={textColor}
      >
        {sublabel}
      </text>
    )}
  </g>
);
