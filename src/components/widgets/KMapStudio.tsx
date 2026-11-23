import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dices, Grid3X3, RotateCcw, Sparkles } from 'lucide-react';
import type { WidgetConfig } from '../../types/curriculum';
import { useSession } from '../../context/SessionContext';
import { UI_STRINGS } from '../../i18n/translations';

interface KMapStudioProps {
  config?: WidgetConfig;
  studioMode?: boolean;
}

type CellValue = 0 | 1 | 'X';

interface KMapGroup {
  cells: number[];
  r0: number;
  c0: number;
  h: number;
  w: number;
  term: string;
  size: number;
  color: string;
  textClass: string;
}

const LOOP_PALETTE = [
  { color: '#10B981', textClass: 'text-emerald-700' },
  { color: '#0EA5E9', textClass: 'text-sky-700' },
  { color: '#FF6B8B', textClass: 'text-rose-600' },
  { color: '#8B5CF6', textClass: 'text-violet-700' },
  { color: '#FFB800', textClass: 'text-amber-700' },
];

const GRAY_2 = [0, 1];
const GRAY_4 = [0, 1, 3, 2];

const GRAY_LABELS_2 = ['0', '1'];
const GRAY_LABELS_4 = ['00', '01', '11', '10'];

function getKMapLayout(varCount: 2 | 3 | 4) {
  if (varCount === 2) {
    return {
      rowVars: 'A',
      colVars: 'B',
      rowLabels: GRAY_LABELS_2,
      colLabels: GRAY_LABELS_2,
      rows: 2,
      cols: 2,
      cellIndex: (r: number, c: number) => (GRAY_2[r] << 1) | GRAY_2[c],
      vars: ['A', 'B'],
    };
  }
  if (varCount === 3) {
    return {
      rowVars: 'A',
      colVars: 'BC',
      rowLabels: GRAY_LABELS_2,
      colLabels: GRAY_LABELS_4,
      rows: 2,
      cols: 4,
      cellIndex: (r: number, c: number) => (GRAY_2[r] << 2) | GRAY_4[c],
      vars: ['A', 'B', 'C'],
    };
  }
  return {
    rowVars: 'AB',
    colVars: 'CD',
    rowLabels: GRAY_LABELS_4,
    colLabels: GRAY_LABELS_4,
    rows: 4,
    cols: 4,
    cellIndex: (r: number, c: number) => (GRAY_4[r] << 2) | GRAY_4[c],
    vars: ['A', 'B', 'C', 'D'],
  };
}

function buildProductTerm(cells: number[], varCount: 2 | 3 | 4, vars: string[]): string {
  if (cells.length === 1 << varCount) return '1';
  const parts: string[] = [];
  for (let b = 0; b < varCount; b++) {
    const shift = varCount - 1 - b;
    const firstBit = (cells[0] >> shift) & 1;
    const allSame = cells.every((m) => ((m >> shift) & 1) === firstBit);
    if (allSame) {
      parts.push(firstBit === 1 ? vars[b] : `${vars[b]}'`);
    }
  }
  return parts.join('') || '1';
}

function buildSumTerm(cells: number[], varCount: 2 | 3 | 4, vars: string[]): string {
  if (cells.length === 1 << varCount) return '0';
  const parts: string[] = [];
  for (let b = 0; b < varCount; b++) {
    const shift = varCount - 1 - b;
    const firstBit = (cells[0] >> shift) & 1;
    const allSame = cells.every((m) => ((m >> shift) & 1) === firstBit);
    if (allSame) {
      parts.push(firstBit === 0 ? vars[b] : `${vars[b]}'`);
    }
  }
  if (parts.length === 0) return '0';
  return parts.length === 1 ? parts[0] : `(${parts.join(' + ')})`;
}

function solveKMap(
  cellsMap: CellValue[],
  varCount: 2 | 3 | 4,
  targetVal: 0 | 1
): KMapGroup[] {
  const layout = getKMapLayout(varCount);
  const { rows, cols, cellIndex, vars } = layout;

  const targets = new Set<number>();
  for (let i = 0; i < 1 << varCount; i++) {
    if (cellsMap[i] === targetVal) targets.add(i);
  }
  if (targets.size === 0) return [];

  const rowHeights = rows === 4 ? [4, 2, 1] : [2, 1];
  const colWidths = cols === 4 ? [4, 2, 1] : [2, 1];

  interface Candidate {
    cells: number[];
    r0: number;
    c0: number;
    h: number;
    w: number;
    size: number;
    key: string;
  }

  const candidatesMap = new Map<string, Candidate>();
  const blockingVal = targetVal === 1 ? 0 : 1;

  for (const h of rowHeights) {
    for (const w of colWidths) {
      for (let r0 = 0; r0 < rows; r0++) {
        for (let c0 = 0; c0 < cols; c0++) {
          const mList: number[] = [];
          let valid = true;
          let containsTarget = false;

          for (let dr = 0; dr < h; dr++) {
            for (let dc = 0; dc < w; dc++) {
              const rr = (r0 + dr) % rows;
              const cc = (c0 + dc) % cols;
              const m = cellIndex(rr, cc);
              if (cellsMap[m] === blockingVal) {
                valid = false;
                break;
              }
              if (cellsMap[m] === targetVal) containsTarget = true;
              mList.push(m);
            }
            if (!valid) break;
          }

          if (valid && containsTarget) {
            const sortedUnique = Array.from(new Set(mList)).sort((a, b) => a - b);
            const key = sortedUnique.join(',');
            if (!candidatesMap.has(key)) {
              candidatesMap.set(key, {
                cells: sortedUnique,
                r0,
                c0,
                h,
                w,
                size: sortedUnique.length,
                key,
              });
            }
          }
        }
      }
    }
  }

  const allCandidates = Array.from(candidatesMap.values());

  const primes = allCandidates.filter(
    (c) =>
      !allCandidates.some(
        (other) =>
          other.size > c.size && c.cells.every((m) => other.cells.includes(m))
      )
  );

  const selected: Candidate[] = [];
  const uncovered = new Set<number>(targets);

  for (const m of targets) {
    const covering = primes.filter((p) => p.cells.includes(m));
    if (covering.length === 1) {
      const epi = covering[0];
      if (!selected.includes(epi)) {
        selected.push(epi);
        epi.cells.forEach((c) => uncovered.delete(c));
      }
    }
  }

  while (uncovered.size > 0) {
    let best: Candidate | null = null;
    let bestScore = -1;
    for (const p of primes) {
      const newlyCovered = p.cells.filter((m) => uncovered.has(m)).length;
      if (newlyCovered === 0) continue;
      const score = newlyCovered * 100 + p.size;
      if (score > bestScore) {
        bestScore = score;
        best = p;
      }
    }
    if (!best) break;
    selected.push(best);
    best.cells.forEach((c) => uncovered.delete(c));
  }

  return selected.map((grp, idx) => {
    const pal = LOOP_PALETTE[idx % LOOP_PALETTE.length];
    return {
      cells: grp.cells,
      r0: grp.r0,
      c0: grp.c0,
      h: grp.h,
      w: grp.w,
      size: grp.size,
      term:
        targetVal === 1
          ? buildProductTerm(grp.cells, varCount, vars)
          : buildSumTerm(grp.cells, varCount, vars),
      ...pal,
    };
  });
}

function getGroupSegments(
  group: KMapGroup,
  rows: number,
  cols: number,
  cellSize: number,
  gap: number,
  inset: number
) {
  const rowRanges: { start: number; len: number }[] =
    group.r0 + group.h <= rows
      ? [{ start: group.r0, len: group.h }]
      : [
          { start: group.r0, len: rows - group.r0 },
          { start: 0, len: group.h - (rows - group.r0) },
        ];

  const colRanges: { start: number; len: number }[] =
    group.c0 + group.w <= cols
      ? [{ start: group.c0, len: group.w }]
      : [
          { start: group.c0, len: cols - group.c0 },
          { start: 0, len: group.w - (cols - group.c0) },
        ];

  const step = cellSize + gap;
  const rects: { x: number; y: number; width: number; height: number }[] = [];

  for (const rr of rowRanges) {
    for (const cr of colRanges) {
      const x = cr.start * step + inset;
      const y = rr.start * step + inset;
      const width = cr.len * cellSize + (cr.len - 1) * gap - inset * 2;
      const height = rr.len * cellSize + (rr.len - 1) * gap - inset * 2;
      rects.push({ x, y, width, height });
    }
  }
  return rects;
}

export const KMapStudio: React.FC<KMapStudioProps> = ({ config, studioMode = false }) => {
  const { session, updateToolsState } = useSession();
  const km = UI_STRINGS[session.language].kmap;
  const savedKmapRef = useRef(studioMode ? session.tools.kmap : undefined);

  const [varCount, setVarCount] = useState<2 | 3 | 4>(
    savedKmapRef.current?.varCount ?? config?.variables ?? 4
  );
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const [cells, setCells] = useState<CellValue[]>(() => {
    if (savedKmapRef.current && Array.isArray(savedKmapRef.current.cells) && savedKmapRef.current.cells.length === 16) {
      return savedKmapRef.current.cells;
    }
    const arr: CellValue[] = new Array(16).fill(0);
    const defaults = config?.initialMinterms ?? [0, 2, 5, 7, 8, 10, 13, 15];
    defaults.forEach((m) => {
      if (m >= 0 && m < 16) arr[m] = 1;
    });
    return arr;
  });

  const skipFirstSyncRef = useRef(true);
  useEffect(() => {
    if (!studioMode) return;
    if (skipFirstSyncRef.current) {
      skipFirstSyncRef.current = false;
      return;
    }
    updateToolsState('kmap', { varCount, cells });
  }, [studioMode, varCount, cells, updateToolsState]);

  const layout = useMemo(() => getKMapLayout(varCount), [varCount]);
  const groups = useMemo(() => solveKMap(cells, varCount, 1), [cells, varCount]);
  const posGroups = useMemo(() => solveKMap(cells, varCount, 0), [cells, varCount]);

  const cellSize = isMobile
    ? varCount === 4
      ? 48
      : varCount === 3
        ? 52
        : 64
    : varCount === 4
      ? 54
      : varCount === 3
        ? 58
        : 68;
  const gap = isMobile ? 6 : 8;
  const gridWidth = layout.cols * cellSize + (layout.cols - 1) * gap;
  const gridHeight = layout.rows * cellSize + (layout.rows - 1) * gap;

  const cycleCell = (mintermIdx: number) => {
    setCells((prev) => {
      const next = [...prev];
      const cur = next[mintermIdx];
      next[mintermIdx] = cur === 0 ? 1 : cur === 1 ? 'X' : 0;
      return next;
    });
  };

  const randomizeCells = () => {
    const total = 1 << varCount;
    setCells((prev) => {
      const next = [...prev];
      for (let i = 0; i < total; i++) {
        const r = Math.random();
        next[i] = r < 0.45 ? 1 : r < 0.88 ? 0 : 'X';
      }
      return next;
    });
  };

  const setAllOnes = () => {
    const total = 1 << varCount;
    setCells((prev) => {
      const next = [...prev];
      for (let i = 0; i < total; i++) next[i] = 1;
      return next;
    });
  };

  const clearCells = () => {
    setCells(new Array(16).fill(0));
  };

  const canonical = useMemo(() => {
    const total = 1 << varCount;
    const minterms: number[] = [];
    const maxterms: number[] = [];
    const dontCares: number[] = [];
    for (let i = 0; i < total; i++) {
      if (cells[i] === 1) minterms.push(i);
      else if (cells[i] === 0) maxterms.push(i);
      else dontCares.push(i);
    }
    return { minterms, maxterms, dontCares };
  }, [cells, varCount]);

  const posExpression = useMemo(() => {
    if (canonical.maxterms.length === 0) return '1';
    if (posGroups.length === 0) return '1';
    return posGroups.map((g) => g.term).join(' · ');
  }, [canonical.maxterms.length, posGroups]);

  const nandExpression = useMemo(() => {
    if (groups.length === 0) return '0';
    if (groups.length === 1 && groups[0].term === '1') return '1';
    if (groups.length === 1) {
      return `((${groups[0].term})')'`;
    }
    const inner = groups.map((g) => `(${g.term})'`).join(' · ');
    return `(${inner})'`;
  }, [groups]);

  return (
    <div
      className={`bg-white rounded-3xl border-2 border-slate-200 border-b-4 p-3 sm:p-4 flex flex-col justify-between gap-3 ${
        studioMode ? 'lg:flex-1 lg:min-h-0' : ''
      }`}
    >
      {/* Compact Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b-2 border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Grid3X3 className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
              {km.title}
            </h4>
            <p className="text-[11px] font-medium text-slate-500 truncate">
              {km.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-amber-50/80 border-2 border-amber-200/80">
            {([2, 3, 4] as const).map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setVarCount(cnt)}
                className={`min-h-[36px] md:min-h-0 px-2.5 py-1 text-xs font-mono font-extrabold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  varCount === cnt
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cnt} {km.variablesSuffix}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={randomizeCells}
            className="min-h-[40px] md:min-h-0 flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 border-sky-200 border-b-4 bg-sky-50 hover:bg-sky-100 active:border-b-2 text-xs font-bold text-sky-800 transition-all cursor-pointer whitespace-nowrap"
          >
            <Dices className="w-3.5 h-3.5 text-sky-600" />
            <span>{km.random}</span>
          </button>

          <button
            type="button"
            onClick={setAllOnes}
            className="min-h-[40px] md:min-h-0 px-2.5 py-1.5 rounded-2xl border-2 border-emerald-200 border-b-4 bg-emerald-50 hover:bg-emerald-100 active:border-b-2 text-xs font-bold text-emerald-800 transition-all cursor-pointer whitespace-nowrap"
          >
            {km.setAllOnes}
          </button>

          <button
            type="button"
            onClick={clearCells}
            className="min-h-[40px] md:min-h-0 flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 border-rose-200 border-b-4 bg-rose-50 hover:bg-rose-100 active:border-b-2 text-xs font-bold text-rose-700 transition-all cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{km.clear}</span>
          </button>
        </div>
      </div>

      {/* Responsive Split Body (Stacked on Phone, Side-by-Side on Tablet & Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 items-center flex-1 min-h-0">
        {/* Left Column: K-Map Grid + Rounded SVG Loops */}
        <div className="md:col-span-5 flex justify-center">
          <div className="bg-[#FFFDF8] border-2 border-amber-100 rounded-2xl p-3 sm:p-4 inline-flex flex-col items-center max-w-[340px] md:max-w-none">
            {/* Diagonal Corner + Column Gray Labels */}
            <div className="flex items-end mb-1.5 sm:mb-2">
              <div className="w-11 sm:w-14 h-8 sm:h-9 mr-1.5 sm:mr-2 relative select-none">
                <svg viewBox="0 0 56 36" className="w-full h-full">
                  <line x1="6" y1="6" x2="50" y2="30" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
                  <text
                    x="48"
                    y="12"
                    textAnchor="end"
                    fontSize="10.5"
                    fontWeight="800"
                    fontFamily="JetBrains Mono, monospace"
                    fill="#0EA5E9"
                  >
                    {layout.colVars}
                  </text>
                  <text
                    x="8"
                    y="32"
                    textAnchor="start"
                    fontSize="10.5"
                    fontWeight="800"
                    fontFamily="JetBrains Mono, monospace"
                    fill="#0EA5E9"
                  >
                    {layout.rowVars}
                  </text>
                </svg>
              </div>

              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${layout.cols}, ${cellSize}px)`,
                  gap: `${gap}px`,
                }}
              >
                {layout.colLabels.map((lbl) => (
                  <div
                    key={lbl}
                    className="text-center font-mono text-xs font-extrabold text-slate-600"
                  >
                    {lbl}
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix + SVG Group Loop Overlay */}
            <div className="flex items-stretch">
              {/* Row Gray Labels */}
              <div
                className="flex flex-col justify-between mr-1.5 sm:mr-2 w-11 sm:w-14"
                style={{ height: gridHeight }}
              >
                {layout.rowLabels.map((rLbl) => (
                  <div
                    key={rLbl}
                    style={{ height: cellSize }}
                    className="flex items-center justify-end pr-1 sm:pr-1.5 font-mono text-xs font-extrabold text-slate-600"
                  >
                    {rLbl}
                  </div>
                ))}
              </div>

              {/* Cells + Overlay SVG */}
              <div
                className="relative"
                style={{ width: gridWidth, height: gridHeight }}
              >
                <div
                  className="grid relative z-10"
                  style={{
                    gridTemplateColumns: `repeat(${layout.cols}, ${cellSize}px)`,
                    gap: `${gap}px`,
                  }}
                >
                  {layout.rowLabels.map((_, rIdx) =>
                    layout.colLabels.map((__, cIdx) => {
                      const mIdx = layout.cellIndex(rIdx, cIdx);
                      const val = cells[mIdx];

                      return (
                        <button
                          key={mIdx}
                          type="button"
                          onClick={() => cycleCell(mIdx)}
                          style={{ width: cellSize, height: cellSize }}
                          className={`relative rounded-2xl border-2 border-b-4 active:border-b-2 font-mono text-base font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                            val === 1
                              ? 'bg-emerald-50/85 border-emerald-300 text-emerald-700'
                              : val === 'X'
                                ? 'bg-amber-50/90 border-amber-300 text-amber-700'
                                : 'bg-white border-slate-200 text-slate-400 hover:border-sky-300'
                          }`}
                        >
                          <span>{val}</span>
                          <span className="absolute bottom-1 right-1.5 text-[9px] font-bold text-slate-400/90">
                            {mIdx}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Rounded SVG Group Loops Overlay */}
                <svg
                  viewBox={`0 0 ${gridWidth} ${gridHeight}`}
                  className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                >
                  {groups.map((grp, gIdx) => {
                    const inset = 2 + (gIdx % 3) * 2.5;
                    const rects = getGroupSegments(
                      grp,
                      layout.rows,
                      layout.cols,
                      cellSize,
                      gap,
                      inset
                    );
                    const isWrapped = rects.length > 1;
                    return (
                      <g key={gIdx}>
                        {rects.map((rect, rIdx) => (
                          <rect
                            key={rIdx}
                            x={rect.x}
                            y={rect.y}
                            width={Math.max(8, rect.width)}
                            height={Math.max(8, rect.height)}
                            rx={13}
                            ry={13}
                            fill={grp.color}
                            fillOpacity={0.11}
                            stroke={grp.color}
                            strokeWidth={2.5}
                            strokeDasharray={isWrapped ? '6 3' : undefined}
                          />
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stacked Pastel Result Cards */}
        <div className="md:col-span-7 flex flex-col gap-2.5 min-w-0 w-full">
          {/* 1. Wide Card: MİNİMİZED SOP */}
          <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-3 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-display font-extrabold tracking-wide text-emerald-700">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                {km.minimizedSop}
              </span>
              <span className="font-mono text-[11px] font-bold text-emerald-700">
                F({layout.vars.join(', ')})
              </span>
            </div>
            <div className="font-mono text-lg sm:text-xl font-black text-slate-800 break-words leading-snug">
              <span className="text-slate-500 mr-1.5">F =</span>
              {groups.length === 0 ? (
                <span className="text-slate-400">0</span>
              ) : (
                groups.map((g, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-slate-400 mx-1.5">+</span>}
                    <span style={{ color: g.color }}>{g.term}</span>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>

          {/* 2. Middle 2-Column Sub-Grid: POS & NAND-ONLY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="bg-sky-50/60 border-2 border-sky-200 rounded-2xl p-3 space-y-1">
              <div className="text-[11px] font-display font-extrabold tracking-wide text-sky-700">
                {km.minimizedPos}
              </div>
              <div className="font-mono text-xs sm:text-sm font-extrabold text-sky-700 break-words leading-snug">
                F = {posExpression}
              </div>
            </div>

            <div className="bg-violet-50/60 border-2 border-violet-200 rounded-2xl p-3 space-y-1">
              <div className="text-[11px] font-display font-extrabold tracking-wide text-violet-700">
                {km.nandOnly}
              </div>
              <div className="font-mono text-xs sm:text-sm font-extrabold text-violet-700 break-words leading-snug">
                F = {nandExpression}
              </div>
            </div>
          </div>

          {/* 3. Canonical Forms Card */}
          <div className="bg-amber-50/50 border-2 border-amber-200/80 rounded-2xl px-3.5 py-2.5 space-y-1 font-mono text-xs font-bold text-amber-950">
            <div className="truncate">
              <span className="text-emerald-700 font-extrabold">F = Σm(</span>
              {canonical.minterms.join(', ') || '∅'}
              <span className="text-emerald-700 font-extrabold">)</span>
              {canonical.dontCares.length > 0 && (
                <span className="text-amber-700 ml-2">
                  + d({canonical.dontCares.join(', ')})
                </span>
              )}
            </div>
            <div className="truncate">
              <span className="text-sky-700 font-extrabold">F = ΠM(</span>
              {canonical.maxterms.join(', ') || '∅'}
              <span className="text-sky-700 font-extrabold">)</span>
            </div>
          </div>

          {/* 4. Group Breakdown Legend */}
          <div className="flex flex-col gap-1 px-1 max-h-[112px] overflow-y-auto pastel-scrollbar">
            {groups.length === 0 ? (
              <div className="text-xs font-medium text-slate-400 py-1">
                {km.emptyHint}
              </div>
            ) : (
              groups.map((g, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 text-xs font-mono py-0.5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      style={{ backgroundColor: g.color }}
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                    />
                    <span className="font-bold text-slate-700 truncate">
                      {km.groupLabel(idx, g.size)}: m({g.cells.join(',')})
                    </span>
                  </div>
                  <span style={{ color: g.color }} className="font-extrabold shrink-0">
                    → {g.term}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
