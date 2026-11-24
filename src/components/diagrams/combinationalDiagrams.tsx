import React from 'react';
import type { Language } from '../../types/curriculum';
import {
  ArrowWire,
  BlockBox,
  GATE_STYLES,
  GateAnd,
  GateNot,
  GateOr,
  JunctionDot,
  LabSvgCanvas,
  PinLabel,
  SectionTag,
  WIRE_COLORS,
  Wire,
} from './svgPrimitives';

export function renderCombinationalDiagram(
  id: string,
  lang: Language
): React.ReactNode | null {
  const isEn = lang === 'en';
  switch (id) {
    case 'binary-grouping-bus':
      return (
        <LabSvgCanvas
          viewBox="0 0 760 290"
          ariaLabel="3-bit Octal and 4-bit Hexadecimal Binary Grouping"
        >
          <SectionTag
            x={24}
            y={16}
            w={712}
            text={
              lang === 'tr'
                ? 'Radix Noktasından Dışa Doğru 3-Bit (Octal) ve 4-Bit (Hex) Gruplama Mimarisi'
                : 'Outward 3-Bit (Octal) & 4-Bit (Hex) Grouping from the Radix Point'
            }
            fill="#F0F9FF"
            stroke="#BAE6FD"
            color="#0369A1"
          />

          {/* Top Octal 3-bit blocks */}
          <PinLabel
            x={30}
            y={74}
            text="Octal (r = 8 = 2³)"
            anchor="start"
            color="#0369A1"
            size={12.5}
          />
          {[
            { x: 185, bits: '0 0 1', val: '1', pad: true },
            { x: 295, bits: '1 0 1', val: '5' },
            { x: 405, bits: '1 0 1', val: '5' },
            { x: 525, bits: '1 0 1', val: '5' },
            { x: 635, bits: '1 0 0', val: '4', pad: true },
          ].map((g, idx) => (
            <g key={idx}>
              <rect
                x={g.x}
                y={54}
                width={96}
                height={42}
                rx={9}
                fill={g.pad ? '#FEF3C7' : '#E0F2FE'}
                stroke={g.pad ? '#D97706' : '#0284C7'}
                strokeWidth={2}
              />
              <PinLabel
                x={g.x + 48}
                y={68}
                text={g.bits}
                color="#0F172A"
                size={13}
              />
              <PinLabel
                x={g.x + 48}
                y={85}
                text={`→ (${g.val})₈`}
                color={g.pad ? '#B45309' : '#0369A1'}
                size={11.5}
              />
            </g>
          ))}
          <PinLabel x={513} y={75} text="." color="#E11D48" size={22} />

          {/* Center Binary Bus */}
          <rect
            x={190}
            y={124}
            width={535}
            height={42}
            rx={10}
            fill="#F8FAFC"
            stroke="#334155"
            strokeWidth={2.2}
          />
          <PinLabel
            x={30}
            y={145}
            text="Binary Bus (2)"
            anchor="start"
            color="#1E293B"
            size={12.5}
          />
          <PinLabel
            x={350}
            y={145}
            text="1   1   0   1   1   0   1"
            color="#0F172A"
            size={15}
          />
          <PinLabel x={513} y={145} text="." color="#E11D48" size={24} />
          <PinLabel
            x={622}
            y={145}
            text="1   0   1   1"
            color="#0F172A"
            size={15}
          />

          {/* Group arrows outward from radix point */}
          <ArrowWire d="M 505 114 L 220 114" variant="rose" />
          <ArrowWire d="M 521 114 L 705 114" variant="rose" />
          <PinLabel
            x={513}
            y={114}
            text="•"
            color="#E11D48"
            size={18}
          />

          {/* Bottom Hex 4-bit blocks */}
          <PinLabel
            x={30}
            y={216}
            text="Hex (r = 16 = 2⁴)"
            anchor="start"
            color="#6D28D9"
            size={12.5}
          />
          {[
            { x: 215, bits: '0 1 1 0', val: '6', pad: true },
            { x: 365, bits: '1 1 0 1', val: 'D' },
            { x: 525, bits: '1 0 1 1', val: 'B' },
          ].map((g, idx) => (
            <g key={idx}>
              <rect
                x={g.x}
                y={192}
                width={136}
                height={46}
                rx={9}
                fill={g.pad ? '#FEF3C7' : '#EDE9FE'}
                stroke={g.pad ? '#D97706' : '#7C3AED'}
                strokeWidth={2}
              />
              <PinLabel
                x={g.x + 68}
                y={207}
                text={g.bits}
                color="#0F172A"
                size={13.5}
              />
              <PinLabel
                x={g.x + 68}
                y={226}
                text={`→ (${g.val})₁₆`}
                color={g.pad ? '#B45309' : '#6D28D9'}
                size={12}
              />
            </g>
          ))}
          <PinLabel x={513} y={215} text="." color="#E11D48" size={22} />

          {/* Footer Legend */}
          <rect
            x={215}
            y={252}
            width={16}
            height={16}
            rx={4}
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth={1.6}
          />
          <PinLabel
            x={240}
            y={260}
            anchor="start"
            size={11.5}
            color="#92400E"
            text={
              lang === 'tr'
                ? 'Sarı bloklar: Dış uçlara eklenen sıfır dolgusu (Zero-padding)'
                : 'Amber blocks: Outer zero-padding added to complete bit groups'
            }
          />
        </LabSvgCanvas>
      );

    case 'binary-addition-slice':
      return (
        <LabSvgCanvas
          viewBox="0 0 760 280"
          ariaLabel="4-Bit Binary Addition Carry Chain"
        >
          <SectionTag
            x={24}
            y={16}
            w={712}
            text={
              lang === 'tr'
                ? 'İkili Toplama (0101 + 0011 = 1000) — Elde (Carry) Yayılım Akışı'
                : 'Binary Addition (0101 + 0011 = 1000) — Carry Propagation Flow'
            }
            fill="#FFE4E6"
            stroke="#FDA4AF"
            color="#BE123C"
          />
          {[
            { bit: 3, x: 90, a: 0, b: 0, cin: 1, s: 1, cout: 0 },
            { bit: 2, x: 255, a: 1, b: 0, cin: 1, s: 0, cout: 1 },
            { bit: 1, x: 420, a: 0, b: 1, cin: 1, s: 0, cout: 1 },
            { bit: 0, x: 585, a: 1, b: 1, cin: 0, s: 0, cout: 1 },
          ].map((col, idx) => (
            <g key={col.bit}>
              <PinLabel
                x={col.x + 25}
                y={66}
                text={`A${col.bit}=${col.a}`}
                color="#0369A1"
              />
              <PinLabel
                x={col.x + 75}
                y={66}
                text={`B${col.bit}=${col.b}`}
                color="#C2410C"
              />
              <ArrowWire d={`M ${col.x + 25} 78 L ${col.x + 25} 112`} variant="blue" />
              <ArrowWire d={`M ${col.x + 75} 78 L ${col.x + 75} 112`} color={WIRE_COLORS.signalB} />
              <BlockBox
                x={col.x}
                y={114}
                w={100}
                h={64}
                title={`Bit ${col.bit}`}
                subtitle={`Cin=${col.cin}`}
                palette="adder"
              />
              <ArrowWire d={`M ${col.x + 50} 178 L ${col.x + 50} 222`} variant="emerald" />
              <PinLabel
                x={col.x + 50}
                y={238}
                text={`S${col.bit} = ${col.s}`}
                color="#047857"
                size={14}
              />
              {idx > 0 && (
                <>
                  <ArrowWire
                    d={`M ${col.x} 146 L ${col.x - 65} 146`}
                    variant="rose"
                  />
                  <PinLabel
                    x={col.x - 32}
                    y={132}
                    text={`C${col.bit + 1}=${col.cout}`}
                    color="#BE123C"
                    size={12}
                  />
                </>
              )}
            </g>
          ))}
          <ArrowWire d="M 730 146 L 688 146" variant="main" />
          <PinLabel x={718} y={132} text="C0=0" size={12} />
          <ArrowWire d="M 90 146 L 34 146" variant="rose" />
          <PinLabel x={58} y={132} text="C4=0" color="#BE123C" size={12} />
        </LabSvgCanvas>
      );

    case 'twos-complement-overflow':
      return (
        <LabSvgCanvas
          viewBox="0 0 760 280"
          ariaLabel="Signed 2s Complement Overflow Detection V = C3 XOR C4"
        >
          <SectionTag
            x={24}
            y={16}
            w={712}
            text={
              lang === 'tr'
                ? "İşaretli Sayılarda Overflow (Taşma) Algılama: V = Cₙ₋₁ ⊕ Cₙ"
                : 'Signed Overflow Detection Circuit: V = Cₙ₋₁ ⊕ Cₙ'
            }
            fill="#FFF1F2"
            stroke="#FECDD3"
            color="#BE123C"
          />

          {/* Lower 3-bit adder block */}
          <BlockBox
            x={420}
            y={86}
            w={240}
            h={88}
            title="FA₂..FA₀ (Bits 2..0)"
            subtitle="A[2:0] + B[2:0] (or B')"
            palette="adder"
          />
          <Wire d="M 710 130 L 660 130" />
          <PinLabel x={720} y={130} text="C₀" anchor="start" />

          {/* Sign bit FA3 */}
          <BlockBox
            x={150}
            y={86}
            w={135}
            h={88}
            title="FA₃ (Sign Bit)"
            subtitle="MSB: A₃ + B₃ + C₃"
            palette="ff"
          />
          <ArrowWire d="M 218 52 L 218 84" variant="blue" />
          <PinLabel x={218} y={40} text="A₃, B₃ (Sign)" color="#0369A1" size={12} />
          <ArrowWire d="M 218 174 L 218 228" variant="emerald" />
          <PinLabel x={218} y={244} text="S₃ (Result Sign)" color="#047857" size={12.5} />

          {/* C3 carry line feeding both FA3 and XOR */}
          <ArrowWire d="M 420 130 L 288 130" variant="rose" />
          <PinLabel x={368} y={114} text="C₃ (C_in)" color="#BE123C" size={12.5} />
          <JunctionDot x={342} y={130} color="#E11D48" />
          <Wire d="M 342 130 L 342 204 L 414 204" color="#E11D48" />

          {/* C4 carry line leaving FA3 and feeding XOR */}
          <Wire d="M 150 130 L 82 130" color="#E11D48" />
          <PinLabel x={72} y={130} text="C₄" anchor="end" color="#BE123C" size={13} />
          <JunctionDot x={110} y={130} color="#E11D48" />
          <Wire d="M 110 130 L 110 184 L 414 184" color="#E11D48" />

          {/* Overflow XOR Gate */}
          <GateOr x={412} y={172} w={68} h={44} xor label="XOR" />
          <ArrowWire d="M 480 194 L 560 194" variant="rose" />
          <PinLabel
            x={570}
            y={194}
            anchor="start"
            text="V = C₃ ⊕ C₄ (Overflow)"
            color="#BE123C"
            size={13}
          />
        </LabSvgCanvas>
      );

    case 'binary-gray-converter':
      return (
        <LabSvgCanvas
          viewBox="0 0 780 350"
          ariaLabel="4-Bit Binary to Gray and Gray to Binary Converters"
        >
          {/* Left Panel: Binary -> Gray */}
          <SectionTag
            x={22}
            y={16}
            w={352}
            text={isEn ? 'Binary → Gray Code (Parallel XOR)' : 'Binary → Gray Code (Paralel XOR)'}
            fill="#ECFDF5"
            stroke="#A7F3D0"
            color="#047857"
          />
          {[0, 1, 2, 3].map((idx) => {
            const y = 76 + idx * 66;
            const bLabel = `B${3 - idx}`;
            const gLabel = `G${3 - idx}`;
            return (
              <g key={`b2g-${idx}`}>
                <PinLabel x={44} y={y} text={bLabel} color="#0369A1" size={14} />
                {idx === 0 ? (
                  <>
                    <Wire d={`M 66 ${y} L 325 ${y}`} color={WIRE_COLORS.signalA} />
                    <JunctionDot x={132} y={y} color={WIRE_COLORS.signalA} />
                    <Wire
                      d={`M 132 ${y} L 132 ${y + 42} L 184 ${y + 42}`}
                      color={WIRE_COLORS.signalA}
                    />
                  </>
                ) : (
                  <>
                    <Wire d={`M 66 ${y} L 184 ${y}`} color={WIRE_COLORS.signalA} />
                    {idx < 3 && (
                      <>
                        <JunctionDot x={132} y={y} color={WIRE_COLORS.signalA} />
                        <Wire
                          d={`M 132 ${y} L 132 ${y + 42} L 184 ${y + 42}`}
                          color={WIRE_COLORS.signalA}
                        />
                      </>
                    )}
                    <GateOr x={182} y={y - 3} w={62} h={42} xor label="XOR" />
                    <Wire d={`M 244 ${y + 18} L 325 ${y + 18}`} color={WIRE_COLORS.active} />
                  </>
                )}
                <PinLabel
                  x={344}
                  y={idx === 0 ? y : y + 18}
                  text={gLabel}
                  color="#047857"
                  size={14}
                />
              </g>
            );
          })}

          {/* Center Divider */}
          <line
            x1={390}
            y1={16}
            x2={390}
            y2={334}
            stroke="#CBD5E1"
            strokeWidth={1.8}
            strokeDasharray="6 5"
          />

          {/* Right Panel: Gray -> Binary */}
          <SectionTag
            x={406}
            y={16}
            w={352}
            text={isEn ? 'Gray → Binary (Cascaded XOR Chain)' : 'Gray → Binary (Kademeli XOR Zinciri)'}
            fill="#EFF6FF"
            stroke="#BFDBFE"
            color="#1D4ED8"
          />
          {[0, 1, 2, 3].map((idx) => {
            const y = 76 + idx * 66;
            const gLabel = `G${3 - idx}`;
            const bLabel = `B${3 - idx}`;
            const outY = idx === 0 ? y : y + 18;
            return (
              <g key={`g2b-${idx}`}>
                <PinLabel x={428} y={y} text={gLabel} color="#7C3AED" size={14} />
                {idx === 0 ? (
                  <>
                    <Wire d={`M 450 ${y} L 710 ${y}`} color={WIRE_COLORS.control} />
                    <JunctionDot x={668} y={y} color={WIRE_COLORS.signalA} />
                    <Wire
                      d={`M 668 ${y} L 668 112 L 516 112 L 516 ${y + 84} L 566 ${y + 84}`}
                      color={WIRE_COLORS.signalA}
                    />
                  </>
                ) : (
                  <>
                    <Wire d={`M 450 ${y} L 566 ${y}`} color={WIRE_COLORS.control} />
                    <GateOr x={564} y={y - 3} w={62} h={42} xor label="XOR" />
                    <Wire d={`M 626 ${outY} L 710 ${outY}`} color={WIRE_COLORS.signalA} />
                    {idx < 3 && (
                      <>
                        <JunctionDot x={668} y={outY} color={WIRE_COLORS.signalA} />
                        <Wire
                          d={`M 668 ${outY} L 668 ${outY + 34} L 516 ${outY + 34} L 516 ${y + 84} L 566 ${y + 84}`}
                          color={WIRE_COLORS.signalA}
                        />
                      </>
                    )}
                  </>
                )}
                <PinLabel x={732} y={outY} text={bLabel} color="#0369A1" size={14} />
              </g>
            );
          })}
        </LabSvgCanvas>
      );

    case 'timing-waveform-gates': {
      // 6 equal slots: x = 120..720 (step = 100px per slot)
      // A: 0, 1, 1, 0, 1, 0
      // B: 0, 0, 1, 1, 0, 0
      // AND: 0, 0, 1, 0, 0, 0
      // OR:  0, 1, 1, 1, 1, 0
      // XOR: 0, 1, 0, 1, 1, 0
      const slotsA = [0, 1, 1, 0, 1, 0];
      const slotsB = [0, 0, 1, 1, 0, 0];
      const slotsAnd = slotsA.map((a, i) => a & slotsB[i]);
      const slotsOr = slotsA.map((a, i) => a | slotsB[i]);
      const slotsXor = slotsA.map((a, i) => a ^ slotsB[i]);

      const buildWavePath = (bits: number[], yLow: number, yHigh: number) => {
        const startX = 120;
        const step = 100;
        let d = `M ${startX} ${bits[0] ? yHigh : yLow}`;
        bits.forEach((b, i) => {
          const x1 = startX + i * step;
          const x2 = x1 + step;
          const y = b ? yHigh : yLow;
          if (i > 0 && bits[i - 1] !== b) {
            d += ` L ${x1} ${y}`;
          }
          d += ` L ${x2} ${y}`;
        });
        return d;
      };

      const tracks = [
        { label: 'Giriş A', en: 'Input A', bits: slotsA, color: '#0284C7', y: 66 },
        { label: 'Giriş B', en: 'Input B', bits: slotsB, color: '#EA580C', y: 122 },
        { label: 'AND (A·B)', en: 'AND (A·B)', bits: slotsAnd, color: '#0369A1', y: 178 },
        { label: 'OR (A+B)', en: 'OR (A+B)', bits: slotsOr, color: '#C2410C', y: 234 },
        { label: 'XOR (A⊕B)', en: 'XOR (A⊕B)', bits: slotsXor, color: '#059669', y: 290 },
      ];

      return (
        <LabSvgCanvas viewBox="0 0 760 338" ariaLabel="Logic Gates Timing Waveform">
          <SectionTag
            x={24}
            y={12}
            w={712}
            text={
              lang === 'tr'
                ? 'Zamanlama Diyagramı (Timing Diagram): A ve B Girişlerine Göre AND, OR, XOR Çıkışları'
                : 'Timing Diagram: AND, OR & XOR Waveforms for Square-Wave Inputs A & B'
            }
            fill="#F0FDF4"
            stroke="#BBF7D0"
            color="#047857"
          />

          {/* Vertical time slot guides */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const x = 120 + i * 100;
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={50}
                  x2={x}
                  y2={308}
                  stroke="#CBD5E1"
                  strokeWidth={1.3}
                  strokeDasharray="4 4"
                />
                {i < 6 && (
                  <PinLabel
                    x={x + 50}
                    y={322}
                    text={`t${i}`}
                    color="#64748B"
                    size={12}
                  />
                )}
              </g>
            );
          })}

          {tracks.map((tr) => {
            const yHigh = tr.y - 12;
            const yLow = tr.y + 14;
            return (
              <g key={tr.label}>
                <PinLabel
                  x={26}
                  y={tr.y + 1}
                  anchor="start"
                  text={lang === 'tr' ? tr.label : tr.en}
                  color={tr.color}
                  size={12.5}
                />
                <line
                  x1={120}
                  y1={yLow}
                  x2={720}
                  y2={yLow}
                  stroke="#E2E8F0"
                  strokeWidth={1}
                />
                <path
                  d={buildWavePath(tr.bits, yLow, yHigh)}
                  fill="none"
                  stroke={tr.color}
                  strokeWidth={2.8}
                  strokeLinejoin="miter"
                />
                {tr.bits.map((b, idx) => (
                  <PinLabel
                    key={idx}
                    x={170 + idx * 100}
                    y={tr.y + 1}
                    text={String(b)}
                    color={b === 1 ? tr.color : '#94A3B8'}
                    size={11.5}
                  />
                ))}
              </g>
            );
          })}
        </LabSvgCanvas>
      );
    }

    case 'demorgan-bubble-push':
      return (
        <LabSvgCanvas viewBox="0 0 760 280" ariaLabel="DeMorgan Bubble Pushing Equivalence">
          {/* Top Law: NAND == Bubbled-OR */}
          <SectionTag
            x={24}
            y={16}
            w={712}
            text={
              isEn
                ? "DeMorgan's Law (Bubble Pushing): NAND ≡ Bubbled-OR  &  NOR ≡ Bubbled-AND"
                : 'DeMorgan Yasası (Bubble Pushing): NAND ≡ Bubbled-OR  &  NOR ≡ Bubbled-AND'
            }
            fill="#EFF6FF"
            stroke="#BFDBFE"
            color="#1D4ED8"
          />

          {/* Row 1: NAND -> Bubbled-OR */}
          <PinLabel x={58} y={84} text="A" color="#0369A1" />
          <PinLabel x={58} y={108} text="B" color="#C2410C" />
          <Wire d="M 74 84 L 130 84" color={WIRE_COLORS.signalA} />
          <Wire d="M 74 108 L 130 108" color={WIRE_COLORS.signalB} />
          <GateAnd x={130} y={72} w={70} h={48} inverted label="NAND" />
          <Wire d="M 200 96 L 265 96" />
          <PinLabel x={274} y={96} anchor="start" text="(A·B)'" size={13} />

          <PinLabel x={378} y={96} text="≡" color="#E11D48" size={26} />

          <PinLabel x={442} y={84} text="A" color="#0369A1" />
          <PinLabel x={442} y={108} text="B" color="#C2410C" />
          <Wire d="M 458 84 L 516 84" color={WIRE_COLORS.signalA} />
          <Wire d="M 458 108 L 516 108" color={WIRE_COLORS.signalB} />
          <GateOr x={518} y={72} w={70} h={48} label="OR" inputBubbles={[true, true]} />
          <Wire d="M 588 96 L 645 96" />
          <PinLabel x={654} y={96} anchor="start" text="A' + B'" size={13} />

          {/* Row 2: NOR -> Bubbled-AND */}
          <PinLabel x={58} y={186} text="A" color="#0369A1" />
          <PinLabel x={58} y={210} text="B" color="#C2410C" />
          <Wire d="M 74 186 L 135 186" color={WIRE_COLORS.signalA} />
          <Wire d="M 74 210 L 135 210" color={WIRE_COLORS.signalB} />
          <GateOr x={130} y={174} w={70} h={48} inverted label="NOR" />
          <Wire d="M 200 198 L 265 198" />
          <PinLabel x={274} y={198} anchor="start" text="(A+B)'" size={13} />

          <PinLabel x={378} y={198} text="≡" color="#E11D48" size={26} />

          <PinLabel x={442} y={186} text="A" color="#0369A1" />
          <PinLabel x={442} y={210} text="B" color="#C2410C" />
          <Wire d="M 458 186 L 514 186" color={WIRE_COLORS.signalA} />
          <Wire d="M 458 210 L 514 210" color={WIRE_COLORS.signalB} />
          <GateAnd x={520} y={174} w={70} h={48} label="AND" inputBubbles={[true, true]} />
          <Wire d="M 590 198 L 645 198" />
          <PinLabel x={654} y={198} anchor="start" text="A' · B'" size={13} />
        </LabSvgCanvas>
      );

    case 'universal-nand-nor-gates':
      return (
        <LabSvgCanvas viewBox="0 0 780 410" ariaLabel="Universal Gates NAND and NOR Implementations">
          <SectionTag
            x={22}
            y={14}
            w={438}
            text={
              lang === 'tr'
                ? 'Yalnızca NAND ile: NOT, AND, OR ve 4-NAND XOR'
                : 'Using ONLY NAND: NOT, AND, OR & 4-NAND XOR'
            }
            fill="#E0F2FE"
            stroke="#7DD3FC"
            color="#0369A1"
          />
          <SectionTag
            x={476}
            y={14}
            w={282}
            text={
              lang === 'tr'
                ? 'Yalnızca NOR ile: NOT, OR ve AND'
                : 'Using ONLY NOR: NOT, OR & AND'
            }
            fill="#FFEDD5"
            stroke="#FDBA74"
            color="#C2410C"
          />

          {/* NAND: NOT */}
          <PinLabel x={34} y={76} text="A" color="#0369A1" />
          <Wire d="M 48 76 L 78 76" />
          <JunctionDot x={78} y={76} />
          <Wire d="M 78 66 L 78 86 M 78 66 L 106 66 M 78 86 L 106 86" />
          <GateAnd x={106} y={56} w={58} h={40} inverted label="NAND" />
          <Wire d="M 164 76 L 198 76" />
          <PinLabel x={208} y={76} anchor="start" text="A' (NOT)" size={12} />

          {/* NAND: AND */}
          <PinLabel x={34} y={134} text="A" color="#0369A1" />
          <PinLabel x={34} y={154} text="B" color="#C2410C" />
          <Wire d="M 48 134 L 84 134 M 48 154 L 84 154" />
          <GateAnd x={84} y={124} w={58} h={40} inverted label="NAND" />
          <Wire d="M 142 144 L 166 144" />
          <JunctionDot x={166} y={144} />
          <Wire d="M 166 134 L 166 154 M 166 134 L 188 134 M 166 154 L 188 154" />
          <GateAnd x={188} y={124} w={58} h={40} inverted label="NAND" />
          <Wire d="M 246 144 L 274 144" />
          <PinLabel x={282} y={144} anchor="start" text="A·B (AND)" size={12} />

          {/* NAND: OR */}
          <PinLabel x={34} y={204} text="A" color="#0369A1" />
          <Wire d="M 48 204 L 68 204" />
          <JunctionDot x={68} y={204} />
          <Wire d="M 68 195 L 68 213 M 68 195 L 86 195 M 68 213 L 86 213" />
          <GateAnd x={86} y={186} w={54} h={36} inverted label="NAND" />
          <PinLabel x={34} y={252} text="B" color="#C2410C" />
          <Wire d="M 48 252 L 68 252" />
          <JunctionDot x={68} y={252} />
          <Wire d="M 68 243 L 68 261 M 68 243 L 86 243 M 68 261 L 86 261" />
          <GateAnd x={86} y={234} w={54} h={36} inverted label="NAND" />
          <Wire d="M 140 204 L 168 204 L 168 218 L 190 218" />
          <Wire d="M 140 252 L 168 252 L 168 238 L 190 238" />
          <GateAnd x={190} y={208} w={58} h={40} inverted label="NAND" />
          <Wire d="M 248 228 L 276 228" />
          <PinLabel x={284} y={228} anchor="start" text="A+B (OR)" size={12} />

          {/* NAND: 4-NAND XOR */}
          <PinLabel x={34} y={310} text="A" color="#0369A1" />
          <PinLabel x={34} y={366} text="B" color="#C2410C" />
          <Wire d="M 48 310 L 200 310" color={WIRE_COLORS.signalA} />
          <Wire d="M 48 366 L 200 366" color={WIRE_COLORS.signalB} />
          <JunctionDot x={86} y={310} color={WIRE_COLORS.signalA} />
          <JunctionDot x={86} y={366} color={WIRE_COLORS.signalB} />
          <Wire d="M 86 310 L 86 330 L 106 330" color={WIRE_COLORS.signalA} />
          <Wire d="M 86 366 L 86 346 L 106 346" color={WIRE_COLORS.signalB} />
          <GateAnd x={106} y={320} w={56} h={36} inverted label="G1" />
          {/* G1 fans out to G2 bottom and G3 top */}
          <Wire d="M 162 338 L 178 338" />
          <JunctionDot x={178} y={338} />
          <Wire d="M 178 326 L 178 354 M 178 326 L 200 326 M 178 354 L 200 354" />
          <GateAnd x={200} y={300} w={56} h={36} inverted label="G2" />
          <GateAnd x={200} y={346} w={56} h={36} inverted label="G3" />
          <Wire d="M 256 318 L 276 318 L 276 330 L 294 330" />
          <Wire d="M 256 364 L 276 364 L 276 346 L 294 346" />
          <GateAnd x={294} y={320} w={58} h={36} inverted label="G4" />
          <Wire d="M 352 338 L 380 338" color={WIRE_COLORS.active} />
          <PinLabel x={386} y={338} anchor="start" text="A⊕B" color="#047857" size={13} />

          {/* Divider */}
          <line
            x1={466}
            y1={14}
            x2={466}
            y2={394}
            stroke="#CBD5E1"
            strokeWidth={1.8}
            strokeDasharray="6 5"
          />

          {/* NOR: NOT */}
          <PinLabel x={486} y={76} text="A" color="#0369A1" />
          <Wire d="M 500 76 L 520 76" />
          <JunctionDot x={520} y={76} />
          <Wire d="M 520 66 L 520 86 M 520 66 L 548 66 M 520 86 L 548 86" />
          <GateOr x={542} y={56} w={60} h={40} inverted label="NOR" />
          <Wire d="M 602 76 L 640 76" />
          <PinLabel x={648} y={76} anchor="start" text="A' (NOT)" size={12} />

          {/* NOR: OR */}
          <PinLabel x={486} y={146} text="A" color="#0369A1" />
          <PinLabel x={486} y={166} text="B" color="#C2410C" />
          <Wire d="M 500 146 L 538 146 M 500 166 L 538 166" />
          <GateOr x={532} y={136} w={58} h={40} inverted label="NOR" />
          <Wire d="M 590 156 L 614 156" />
          <JunctionDot x={614} y={156} />
          <Wire d="M 614 146 L 614 166 M 614 146 L 636 146 M 614 166 L 636 166" />
          <GateOr x={630} y={136} w={58} h={40} inverted label="NOR" />
          <Wire d="M 688 156 L 710 156" />
          <PinLabel x={716} y={156} anchor="start" text="A+B" size={12} />

          {/* NOR: AND */}
          <PinLabel x={486} y={248} text="A" color="#0369A1" />
          <Wire d="M 500 248 L 516 248" />
          <JunctionDot x={516} y={248} />
          <Wire d="M 516 239 L 516 257 M 516 239 L 536 239 M 516 257 L 536 257" />
          <GateOr x={530} y={230} w={54} h={36} inverted label="NOR" />
          <PinLabel x={486} y={298} text="B" color="#C2410C" />
          <Wire d="M 500 298 L 516 298" />
          <JunctionDot x={516} y={298} />
          <Wire d="M 516 289 L 516 307 M 516 289 L 536 289 M 516 307 L 536 307" />
          <GateOr x={530} y={280} w={54} h={36} inverted label="NOR" />
          <Wire d="M 584 248 L 608 248 L 608 263 L 630 263" />
          <Wire d="M 584 298 L 608 298 L 608 283 L 630 283" />
          <GateOr x={624} y={253} w={58} h={40} inverted label="NOR" />
          <Wire d="M 682 273 L 708 273" />
          <PinLabel x={714} y={273} anchor="start" text="A·B" size={12} />
        </LabSvgCanvas>
      );

    case 'all-standard-gates': {
      const cells = [
        { name: 'Buffer', eq: 'Y = A', single: true, render: (x: number, y: number) => <GateNot x={x} y={y + 7} inverted={false} label="BUF" /> },
        { name: 'NOT (Inverter)', eq: "Y = A'", single: true, render: (x: number, y: number) => <GateNot x={x} y={y + 7} inverted label="NOT" /> },
        { name: 'AND', eq: 'Y = A · B', single: false, render: (x: number, y: number) => <GateAnd x={x} y={y} label="AND" /> },
        { name: 'OR', eq: 'Y = A + B', single: false, render: (x: number, y: number) => <GateOr x={x} y={y} label="OR" /> },
        { name: 'NAND', eq: "Y = (A · B)'", single: false, render: (x: number, y: number) => <GateAnd x={x} y={y} inverted label="NAND" /> },
        { name: 'NOR', eq: "Y = (A + B)'", single: false, render: (x: number, y: number) => <GateOr x={x} y={y} inverted label="NOR" /> },
        { name: 'XOR', eq: 'Y = A ⊕ B', single: false, render: (x: number, y: number) => <GateOr x={x} y={y} xor label="XOR" /> },
        { name: 'XNOR', eq: "Y = (A ⊕ B)'", single: false, render: (x: number, y: number) => <GateOr x={x} y={y} xor inverted label="XNOR" /> },
      ];
      return (
        <LabSvgCanvas viewBox="0 0 780 340" ariaLabel="All 8 IEEE/ANSI Standard Logic Gates">
          {cells.map((c, idx) => {
            const col = idx % 4;
            const row = Math.floor(idx / 4);
            const cardX = 18 + col * 188;
            const cardY = 18 + row * 158;
            const gateX = cardX + 58;
            const gateY = cardY + 48;
            return (
              <g key={c.name}>
                <rect
                  x={cardX}
                  y={cardY}
                  width={176}
                  height={142}
                  rx={12}
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth={1.8}
                />
                <PinLabel
                  x={cardX + 88}
                  y={cardY + 22}
                  text={c.name}
                  color="#0F172A"
                  size={12.5}
                />
                {c.single ? (
                  <>
                    <PinLabel x={cardX + 26} y={gateY + 22} text="A" color="#0369A1" size={12} />
                    <Wire d={`M ${cardX + 38} ${gateY + 22} L ${gateX} ${gateY + 22}`} />
                    {c.render(gateX + 8, gateY)}
                    <Wire d={`M ${gateX + 50} ${gateY + 22} L ${cardX + 140} ${gateY + 22}`} />
                  </>
                ) : (
                  <>
                    <PinLabel x={cardX + 24} y={gateY + 12} text="A" color="#0369A1" size={12} />
                    <PinLabel x={cardX + 24} y={gateY + 32} text="B" color="#C2410C" size={12} />
                    <Wire d={`M ${cardX + 36} ${gateY + 12} L ${gateX + 6} ${gateY + 12}`} />
                    <Wire d={`M ${cardX + 36} ${gateY + 32} L ${gateX + 6} ${gateY + 32}`} />
                    {c.render(gateX, gateY)}
                    <Wire d={`M ${gateX + 63} ${gateY + 22} L ${cardX + 140} ${gateY + 22}`} />
                  </>
                )}
                <PinLabel x={cardX + 150} y={gateY + 22} text="Y" color="#047857" size={12} />
                <rect
                  x={cardX + 24}
                  y={cardY + 108}
                  width={128}
                  height={22}
                  rx={6}
                  fill="#F1F5F9"
                />
                <PinLabel
                  x={cardX + 88}
                  y={cardY + 119}
                  text={c.eq}
                  color="#3730A3"
                  size={11.5}
                />
              </g>
            );
          })}
        </LabSvgCanvas>
      );
    }

    case 'two-level-sop-pos':
      return (
        <LabSvgCanvas viewBox="0 0 760 280" ariaLabel="Two-Level SOP (AND-OR) vs POS (OR-AND)">
          <SectionTag
            x={24}
            y={16}
            w={344}
            text={isEn ? 'Standard SOP → 2-Level AND-OR' : 'Standard SOP → 2 Seviye AND-OR'}
            fill="#E0F2FE"
            stroke="#7DD3FC"
            color="#0369A1"
          />
          <SectionTag
            x={392}
            y={16}
            w={344}
            text={isEn ? 'Standard POS → 2-Level OR-AND' : 'Standard POS → 2 Seviye OR-AND'}
            fill="#FFEDD5"
            stroke="#FDBA74"
            color="#C2410C"
          />

          {/* Left: F = A'B + AC */}
          <PinLabel x={44} y={84} text="A'" color="#7E22CE" />
          <PinLabel x={44} y={108} text="B" color="#0369A1" />
          <Wire d="M 62 84 L 116 84 M 62 108 L 116 108" />
          <GateAnd x={116} y={74} w={60} h={44} label="AND" />

          <PinLabel x={44} y={164} text="A" color="#0369A1" />
          <PinLabel x={44} y={188} text="C" color="#047857" />
          <Wire d="M 62 164 L 116 164 M 62 188 L 116 188" />
          <GateAnd x={116} y={154} w={60} h={44} label="AND" />

          <Wire d="M 176 96 L 208 96 L 208 126 L 236 126" />
          <Wire d="M 176 176 L 208 176 L 208 146 L 236 146" />
          <GateOr x={230} y={114} w={64} h={44} label="OR" />
          <Wire d="M 294 136 L 325 136" color={WIRE_COLORS.active} />
          <PinLabel x={338} y={136} text="F" color="#047857" size={14} />
          <PinLabel x={196} y={244} text="F = A'B + AC" color="#0369A1" size={12.5} />

          <line
            x1={380}
            y1={16}
            x2={380}
            y2={264}
            stroke="#CBD5E1"
            strokeWidth={1.8}
            strokeDasharray="6 5"
          />

          {/* Right: F = (A+B)(A'+C) */}
          <PinLabel x={412} y={84} text="A" color="#0369A1" />
          <PinLabel x={412} y={108} text="B" color="#C2410C" />
          <Wire d="M 430 84 L 490 84 M 430 108 L 490 108" />
          <GateOr x={484} y={74} w={62} h={44} label="OR" />

          <PinLabel x={412} y={164} text="A'" color="#7E22CE" />
          <PinLabel x={412} y={188} text="C" color="#047857" />
          <Wire d="M 430 164 L 490 164 M 430 188 L 490 188" />
          <GateOr x={484} y={154} w={62} h={44} label="OR" />

          <Wire d="M 546 96 L 578 96 L 578 126 L 604 126" />
          <Wire d="M 546 176 L 578 176 L 578 146 L 604 146" />
          <GateAnd x={604} y={114} w={62} h={44} label="AND" />
          <Wire d="M 666 136 L 696 136" color={WIRE_COLORS.active} />
          <PinLabel x={710} y={136} text="F" color="#047857" size={14} />
          <PinLabel x={568} y={244} text="F = (A+B)(A'+C)" color="#C2410C" size={12.5} />
        </LabSvgCanvas>
      );

    case 'kmap-minimization-gates':
      return (
        <LabSvgCanvas viewBox="0 0 760 280" ariaLabel="K-Map Grouping to Minimal Gate Circuit">
          <SectionTag
            x={24}
            y={14}
            w={712}
            text={
              lang === 'tr'
                ? 'K-Map Gruplama → Donanım Sadeleştirme: F(A,B,C) = Σm(1, 2, 3, 5, 7) → A\'B + C'
                : 'K-Map Grouping → Hardware Reduction: F(A,B,C) = Σm(1, 2, 3, 5, 7) → A\'B + C'
            }
            fill="#ECFDF5"
            stroke="#A7F3D0"
            color="#047857"
          />

          {/* 3-var K-Map grid (A rows 0,1; BC cols 00,01,11,10) */}
          <PinLabel x={72} y={76} text="A \ BC" size={11.5} color="#475569" />
          {['00', '01', '11', '10'].map((bc, c) => (
            <PinLabel key={bc} x={140 + c * 52} y={76} text={bc} size={12} color="#0F172A" />
          ))}
          {['0', '1'].map((a, r) => (
            <PinLabel key={a} x={88} y={118 + r * 52} text={a} size={12.5} color="#0F172A" />
          ))}
          {[
            [0, 1, 1, 1],
            [0, 1, 1, 0],
          ].map((row, r) =>
            row.map((val, c) => (
              <g key={`${r}-${c}`}>
                <rect
                  x={114 + c * 52}
                  y={92 + r * 52}
                  width={52}
                  height={52}
                  fill="#FFFFFF"
                  stroke="#94A3B8"
                  strokeWidth={1.5}
                />
                <PinLabel
                  x={140 + c * 52}
                  y={118 + r * 52}
                  text={String(val)}
                  color={val ? '#0F172A' : '#94A3B8'}
                  size={15}
                />
              </g>
            ))
          )}
          {/* Quad EPI C: cols 01, 11 */}
          <rect
            x={168}
            y={96}
            width={100}
            height={96}
            rx={12}
            fill="#0284C7"
            fillOpacity={0.14}
            stroke="#0284C7"
            strokeWidth={2.5}
          />
          {/* Pair EPI A'B: row 0, cols 11, 10 */}
          <rect
            x={222}
            y={99}
            width={96}
            height={38}
            rx={10}
            fill="#059669"
            fillOpacity={0.16}
            stroke="#059669"
            strokeWidth={2.5}
          />
          <PinLabel
            x={218}
            y={224}
            text={isEn ? "Quad EPI = C   |   Pair EPI = A'B" : "4'lü EPI = C   |   2'li EPI = A'B"}
            color="#047857"
            size={12}
          />

          {/* Arrow to minimal circuit */}
          <ArrowWire d="M 342 144 L 408 144" variant="emerald" width={2.8} />

          {/* Minimal 2-gate circuit */}
          <PinLabel x={436} y={102} text="A" color="#0369A1" />
          <Wire d="M 450 102 L 474 102" color={WIRE_COLORS.signalA} />
          <GateNot x={474} y={87} w={40} h={30} label="NOT" />
          <Wire d="M 514 102 L 542 102" />
          <PinLabel x={436} y={126} text="B" color="#C2410C" />
          <Wire d="M 450 126 L 542 126" color={WIRE_COLORS.signalB} />
          <GateAnd x={542} y={92} w={58} h={42} label="AND" />

          <PinLabel x={436} y={182} text="C" color="#047857" />
          <Wire d="M 450 182 L 604 182 L 604 150 L 634 150" color={WIRE_COLORS.active} />
          <Wire d="M 600 113 L 614 113 L 614 130 L 634 130" />
          <GateOr x={628} y={118} w={62} h={44} label="OR" />
          <Wire d="M 690 140 L 720 140" color={WIRE_COLORS.active} />
          <PinLabel x={732} y={140} text="F" color="#047857" size={14} />
          <PinLabel
            x={590}
            y={224}
            text={isEn ? '5 Minterms → Only 3 Gates!' : '5 Minterm → Yalnızca 3 Kapı!'}
            color="#0369A1"
            size={12}
          />
        </LabSvgCanvas>
      );

    case 'and-or-to-nand-nand':
      return (
        <LabSvgCanvas viewBox="0 0 780 350" ariaLabel="AND-OR to NAND-NAND and OR-AND to NOR-NOR Conversion">
          {/* Top Half: AND-OR -> NAND-NAND */}
          <SectionTag
            x={22}
            y={12}
            w={736}
            text={
              isEn
                ? "1) SOP Conversion: AND-OR  →  NAND-NAND (F = A'B + AC)"
                : "1) SOP Dönüşümü: AND-OR  →  NAND-NAND (F = A'B + AC)"
            }
            fill="#E0F2FE"
            stroke="#7DD3FC"
            color="#0369A1"
          />
          {/* Left AND-OR */}
          <PinLabel x={38} y={70} text="A'" color="#7E22CE" />
          <PinLabel x={38} y={92} text="B" color="#0369A1" />
          <Wire d="M 52 70 L 82 70 M 52 92 L 82 92" />
          <GateAnd x={82} y={62} w={54} h={38} label="AND" />
          <PinLabel x={38} y={128} text="A" color="#0369A1" />
          <PinLabel x={38} y={150} text="C" color="#047857" />
          <Wire d="M 52 128 L 82 128 M 52 150 L 82 150" />
          <GateAnd x={82} y={120} w={54} h={38} label="AND" />
          <Wire d="M 136 81 L 158 81 L 158 100 L 182 100" />
          <Wire d="M 136 139 L 158 139 L 158 120 L 182 120" />
          <GateOr x={176} y={90} w={58} h={40} label="OR" />
          <Wire d="M 234 110 L 260 110" />
          <PinLabel x={270} y={110} text="F" color="#047857" />

          {/* Arrow + Double Bubble note */}
          <ArrowWire d="M 294 110 L 392 110" variant="blue" width={2.6} />
          <PinLabel x={343} y={94} text={isEn ? 'Double Bubble' : 'Çift Baloncuk'} color="#0369A1" size={11} />
          <PinLabel x={343} y={126} text="(DeMorgan)" color="#64748B" size={11} />

          {/* Right NAND-NAND */}
          <PinLabel x={422} y={70} text="A'" color="#7E22CE" />
          <PinLabel x={422} y={92} text="B" color="#0369A1" />
          <Wire d="M 436 70 L 466 70 M 436 92 L 466 92" />
          <GateAnd x={466} y={62} w={58} h={38} inverted label="NAND" />
          <PinLabel x={422} y={128} text="A" color="#0369A1" />
          <PinLabel x={422} y={150} text="C" color="#047857" />
          <Wire d="M 436 128 L 466 128 M 436 150 L 466 150" />
          <GateAnd x={466} y={120} w={58} h={38} inverted label="NAND" />
          <Wire d="M 524 81 L 548 81 L 548 100 L 570 100" />
          <Wire d="M 524 139 L 548 139 L 548 120 L 570 120" />
          <GateAnd x={570} y={90} w={58} h={40} inverted label="NAND" />
          <Wire d="M 628 110 L 664 110" color={WIRE_COLORS.active} />
          <PinLabel x={678} y={110} anchor="start" text="F = A'B+AC" color="#047857" size={12} />

          {/* Bottom Half: OR-AND -> NOR-NOR */}
          <SectionTag
            x={22}
            y={184}
            w={736}
            text={
              isEn
                ? '2) POS Conversion: OR-AND  →  NOR-NOR (F = (A+B)(C+D))'
                : '2) POS Dönüşümü: OR-AND  →  NOR-NOR (F = (A+B)(C+D))'
            }
            fill="#FFEDD5"
            stroke="#FDBA74"
            color="#C2410C"
          />
          <PinLabel x={38} y={242} text="A" color="#0369A1" />
          <PinLabel x={38} y={264} text="B" color="#C2410C" />
          <Wire d="M 52 242 L 86 242 M 52 264 L 86 264" />
          <GateOr x={80} y={234} w={56} h={38} label="OR" />
          <PinLabel x={38} y={300} text="C" color="#047857" />
          <PinLabel x={38} y={322} text="D" color="#7C3AED" />
          <Wire d="M 52 300 L 86 300 M 52 322 L 86 322" />
          <GateOr x={80} y={292} w={56} h={38} label="OR" />
          <Wire d="M 136 253 L 158 253 L 158 272 L 180 272" />
          <Wire d="M 136 311 L 158 311 L 158 292 L 180 292" />
          <GateAnd x={180} y={262} w={56} h={40} label="AND" />
          <Wire d="M 236 282 L 260 282" />
          <PinLabel x={270} y={282} text="F" color="#047857" />

          <ArrowWire d="M 294 282 L 392 282" color={WIRE_COLORS.signalB} width={2.6} />
          <PinLabel x={343} y={266} text={isEn ? 'Double Bubble' : 'Çift Baloncuk'} color="#C2410C" size={11} />
          <PinLabel x={343} y={298} text="(DeMorgan)" color="#64748B" size={11} />

          <PinLabel x={422} y={242} text="A" color="#0369A1" />
          <PinLabel x={422} y={264} text="B" color="#C2410C" />
          <Wire d="M 436 242 L 470 242 M 436 264 L 470 264" />
          <GateOr x={464} y={234} w={58} h={38} inverted label="NOR" />
          <PinLabel x={422} y={300} text="C" color="#047857" />
          <PinLabel x={422} y={322} text="D" color="#7C3AED" />
          <Wire d="M 436 300 L 470 300 M 436 322 L 470 322" />
          <GateOr x={464} y={292} w={58} h={38} inverted label="NOR" />
          <Wire d="M 522 253 L 546 253 L 546 272 L 570 272" />
          <Wire d="M 522 311 L 546 311 L 546 292 L 570 292" />
          <GateOr x={564} y={262} w={60} h={40} inverted label="NOR" />
          <Wire d="M 624 282 L 664 282" color={WIRE_COLORS.active} />
          <PinLabel x={678} y={282} anchor="start" text="F = (A+B)(C+D)" color="#047857" size={11.5} />
        </LabSvgCanvas>
      );

    case 'multilevel-bubble-pushing':
      return (
        <LabSvgCanvas viewBox="0 0 760 280" ariaLabel="Multi-level Bubble Pushing F = A(CD + B) + BC'">
          <SectionTag
            x={24}
            y={14}
            w={712}
            text={
              isEn
                ? "Multi-Level NAND Conversion: F = A(CD + B) + BC' (Insert Inverter on Odd Bubble)"
                : "Çok Seviyeli NAND Dönüşümü: F = A(CD + B) + BC' (Tekil Baloncuğa Inverter Ekle)"
            }
            fill="#F3E8FF"
            stroke="#D8B4FE"
            color="#7E22CE"
          />
          {/* Branch 1: CD -> NAND(C,D) + B' -> NAND -> A -> NAND */}
          <PinLabel x={42} y={76} text="C" color="#0369A1" />
          <PinLabel x={42} y={98} text="D" color="#047857" />
          <Wire d="M 58 76 L 106 76 M 58 98 L 106 98" />
          <GateAnd x={106} y={66} w={56} h={40} inverted label="NAND" />

          <PinLabel x={42} y={136} text="B" color="#C2410C" />
          <Wire d="M 58 136 L 106 136" color={WIRE_COLORS.signalB} />
          <GateNot x={106} y={121} w={42} h={30} label="B'" />
          <Wire d="M 162 86 L 200 86 L 200 100 L 228 100" />
          <Wire d="M 148 136 L 200 136 L 200 120 L 228 120" />
          <GateAnd x={228} y={90} w={58} h={40} inverted label="NAND" />

          <PinLabel x={256} y={62} text="A" color="#0369A1" />
          <Wire d="M 272 62 L 324 62 L 324 102 L 352 102" color={WIRE_COLORS.signalA} />
          <Wire d="M 286 110 L 308 110 L 308 122 L 352 122" />
          <GateAnd x={352} y={92} w={58} h={40} inverted label="NAND" />

          {/* Branch 2: B · C' */}
          <PinLabel x={42} y={196} text="B" color="#C2410C" />
          <PinLabel x={42} y={232} text="C" color="#0369A1" />
          <Wire d="M 58 196 L 228 196" color={WIRE_COLORS.signalB} />
          <Wire d="M 58 232 L 106 232" color={WIRE_COLORS.signalA} />
          <GateNot x={106} y={217} w={42} h={30} label="C'" />
          <Wire d="M 148 232 L 200 232 L 200 218 L 228 218" />
          <GateAnd x={228} y={186} w={58} h={40} inverted label="NAND" />

          {/* Output NAND combining branches */}
          <Wire d="M 410 112 L 486 112 L 486 146 L 520 146" />
          <Wire d="M 286 206 L 486 206 L 486 168 L 520 168" />
          <GateAnd x={520} y={136} w={62} h={42} inverted label="NAND" />
          <ArrowWire d="M 582 157 L 642 157" variant="emerald" />
          <PinLabel x={652} y={157} anchor="start" text="F = A(CD+B)+BC'" color="#047857" size={12.5} />
        </LabSvgCanvas>
      );

    case 'parity-xor-circuits':
      return (
        <LabSvgCanvas viewBox="0 0 780 280" ariaLabel="3-Bit Even Parity Generator and 4-Bit Parity Checker">
          <SectionTag
            x={22}
            y={14}
            w={348}
            text={isEn ? 'Transmitter: 3-Bit Even Parity Generator' : 'Verici: 3-Bit Even Parity Generator'}
            fill="#ECFDF5"
            stroke="#A7F3D0"
            color="#047857"
          />
          <SectionTag
            x={410}
            y={14}
            w={348}
            text={isEn ? 'Receiver: 4-Bit Even Parity Checker' : 'Alıcı: 4-Bit Even Parity Checker'}
            fill="#EFF6FF"
            stroke="#BFDBFE"
            color="#1D4ED8"
          />

          {/* Left: Generator P = x ^ y ^ z */}
          <PinLabel x={44} y={88} text="x" color="#0369A1" />
          <PinLabel x={44} y={114} text="y" color="#C2410C" />
          <PinLabel x={44} y={168} text="z" color="#7C3AED" />
          <Wire d="M 58 88 L 106 88 M 58 114 L 106 114" />
          <GateOr x={102} y={78} w={60} h={44} xor label="XOR" />
          <Wire d="M 162 100 L 186 100 L 186 128 L 210 128" />
          <Wire d="M 58 168 L 186 168 L 186 148 L 210 148" color={WIRE_COLORS.control} />
          <GateOr x={206} y={116} w={60} h={44} xor label="XOR" />
          <ArrowWire d="M 266 138 L 320 138" variant="emerald" />
          <PinLabel x={332} y={138} text="P" color="#047857" size={14} />
          <PinLabel x={190} y={230} text={isEn ? 'P = x ⊕ y ⊕ z (P=1 for odd # of 1s)' : 'P = x ⊕ y ⊕ z (Tek 1 varsa P=1)'} color="#047857" size={12} />

          {/* Transmission channel dashed */}
          <ArrowWire d="M 354 138 L 414 138" dashed variant="main" />

          {/* Right: Checker C = x ^ y ^ z ^ P */}
          <PinLabel x={432} y={82} text="x" color="#0369A1" />
          <PinLabel x={432} y={106} text="y" color="#C2410C" />
          <Wire d="M 446 82 L 488 82 M 446 106 L 488 106" />
          <GateOr x={484} y={72} w={54} h={42} xor label="XOR" />

          <PinLabel x={432} y={154} text="z" color="#7C3AED" />
          <PinLabel x={432} y={178} text="P" color="#047857" />
          <Wire d="M 446 154 L 488 154 M 446 178 L 488 178" />
          <GateOr x={484} y={144} w={54} h={42} xor label="XOR" />

          <Wire d="M 538 93 L 566 93 L 566 118 L 594 118" />
          <Wire d="M 538 165 L 566 165 L 566 138 L 594 138" />
          <GateOr x={590} y={106} w={56} h={44} xor label="XOR" />
          <ArrowWire d="M 646 128 L 692 128" variant="rose" />
          <PinLabel x={720} y={128} text={isEn ? 'C (Error)' : 'C (Hata)'} color="#BE123C" size={12.5} />
          <PinLabel x={586} y={230} text={isEn ? 'C = x ⊕ y ⊕ z ⊕ P (0: Valid, 1: Error)' : 'C = x ⊕ y ⊕ z ⊕ P (0: Doğru, 1: Hata)'} color="#1D4ED8" size={12} />
        </LabSvgCanvas>
      );

    case 'half-full-adder-inner':
      return (
        <LabSvgCanvas viewBox="0 0 780 310" ariaLabel="Half Adder and Full Adder Internal Gate Architecture">
          <SectionTag
            x={20}
            y={14}
            w={250}
            text="1) Half Adder (HA)"
            fill="#FFE4E6"
            stroke="#FDA4AF"
            color="#BE123C"
          />
          <SectionTag
            x={290}
            y={14}
            w={470}
            text={isEn ? '2) Full Adder = 2 × Half Adder + OR Gate' : '2) Full Adder = 2 × Half Adder + OR Kapısı'}
            fill="#FFE4E6"
            stroke="#FDA4AF"
            color="#BE123C"
          />

          {/* Half Adder */}
          <PinLabel x={34} y={96} text="A" color="#0369A1" />
          <PinLabel x={34} y={156} text="B" color="#C2410C" />
          <Wire d="M 48 96 L 130 96" color={WIRE_COLORS.signalA} />
          <Wire d="M 48 156 L 80 156 L 80 116 L 130 116" color={WIRE_COLORS.signalB} />
          <JunctionDot x={66} y={96} color={WIRE_COLORS.signalA} />
          <JunctionDot x={80} y={156} color={WIRE_COLORS.signalB} />
          <Wire d="M 66 96 L 66 170 L 130 170" color={WIRE_COLORS.signalA} />
          <Wire d="M 80 156 L 80 190 L 130 190" color={WIRE_COLORS.signalB} />
          <GateOr x={126} y={84} w={60} h={42} xor label="XOR" />
          <GateAnd x={130} y={160} w={58} h={40} label="AND" />
          <Wire d="M 186 105 L 222 105" color={WIRE_COLORS.active} />
          <Wire d="M 188 180 L 222 180" color={WIRE_COLORS.signalA} />
          <PinLabel x={238} y={105} text="S" color="#047857" size={14} />
          <PinLabel x={238} y={180} text="C" color="#0369A1" size={14} />

          {/* Divider */}
          <line x1={276} y1={14} x2={276} y2={296} stroke="#CBD5E1" strokeWidth={1.8} strokeDasharray="6 5" />

          {/* Full Adder from 2 HA + OR */}
          <PinLabel x={298} y={84} text="A" color="#0369A1" />
          <PinLabel x={298} y={120} text="B" color="#C2410C" />
          <PinLabel x={298} y={196} text="Cin" color="#7C3AED" />
          <Wire d="M 314 84 L 352 84 M 314 120 L 352 120" />
          <BlockBox x={352} y={68} w={90} h={68} title="HA 1" subtitle="A, B" palette="adder" />

          {/* HA1 S -> HA2 top; HA1 C -> OR bottom */}
          <Wire d="M 442 88 L 502 88" color={WIRE_COLORS.active} />
          <Wire d="M 318 196 L 474 196 L 474 114 L 502 114" color={WIRE_COLORS.control} />
          <BlockBox x={502} y={70} w={90} h={68} title="HA 2" subtitle="S1, Cin" palette="adder" />

          {/* Sum out */}
          <ArrowWire d="M 592 92 L 700 92" variant="emerald" />
          <PinLabel x={720} y={92} text="Sum" color="#047857" size={13.5} />

          {/* Carries -> OR */}
          <Wire d="M 592 122 L 620 122 L 620 198 L 638 198" color={WIRE_COLORS.alert} />
          <Wire d="M 442 120 L 458 120 L 458 218 L 638 218" color={WIRE_COLORS.alert} />
          <GateOr x={632} y={186} w={60} h={42} label="OR" />
          <ArrowWire d="M 692 207 L 722 207" variant="rose" />
          <PinLabel x={744} y={207} text="Cout" color="#BE123C" size={13} />

          <PinLabel x={524} y={272} text="S = (A⊕B)⊕Cin   |   Cout = AB + Cin(A⊕B)" color="#BE123C" size={12} />
        </LabSvgCanvas>
      );

    case 'ripple-carry-adder-4bit':
      return (
        <LabSvgCanvas viewBox="0 0 780 280" ariaLabel="4-Bit Ripple Carry Adder">
          <SectionTag
            x={22}
            y={14}
            w={736}
            text={
              isEn
                ? '4-Bit Ripple Carry Adder (Carry Propagation Chain C₀ → C₁ → C₂ → C₃ → C₄)'
                : '4-Bit Ripple Carry Adder (Elde Sinyali C₀ → C₁ → C₂ → C₃ → C₄ Zinciri)'
            }
            fill="#FFE4E6"
            stroke="#FDA4AF"
            color="#BE123C"
          />
          {[
            { bit: 3, x: 94 },
            { bit: 2, x: 256 },
            { bit: 1, x: 418 },
            { bit: 0, x: 580 },
          ].map((st, idx) => (
            <g key={st.bit}>
              <PinLabel x={st.x + 24} y={62} text={`A${st.bit}`} color="#0369A1" />
              <PinLabel x={st.x + 76} y={62} text={`B${st.bit}`} color="#C2410C" />
              <ArrowWire d={`M ${st.x + 24} 74 L ${st.x + 24} 106`} variant="blue" />
              <ArrowWire d={`M ${st.x + 76} 74 L ${st.x + 76} 106`} color={WIRE_COLORS.signalB} />
              <BlockBox
                x={st.x}
                y={108}
                w={100}
                h={68}
                title={`FA${st.bit}`}
                subtitle="Full Adder"
                palette="adder"
              />
              <ArrowWire d={`M ${st.x + 50} 176 L ${st.x + 50} 224`} variant="emerald" />
              <PinLabel x={st.x + 50} y={240} text={`S${st.bit}`} color="#047857" size={14} />
              {idx > 0 && (
                <>
                  <ArrowWire d={`M ${st.x} 142 L ${st.x - 62} 142`} variant="rose" width={2.6} />
                  <PinLabel x={st.x - 31} y={127} text={`C${st.bit + 1}`} color="#BE123C" size={12.5} />
                </>
              )}
            </g>
          ))}
          <ArrowWire d="M 738 142 L 682 142" variant="main" />
          <PinLabel x={744} y={142} anchor="start" text="C₀" size={13} />
          <ArrowWire d="M 94 142 L 42 142" variant="rose" width={2.6} />
          <PinLabel x={26} y={142} text="C₄" color="#BE123C" size={13.5} />
        </LabSvgCanvas>
      );

    case 'adder-subtractor-4bit':
      return (
        <LabSvgCanvas viewBox="0 0 780 330" ariaLabel="4-Bit Binary Adder-Subtractor with Mode M and Overflow">
          <SectionTag
            x={22}
            y={12}
            w={736}
            text="4-Bit Binary Adder-Subtractor: M=0 (A+B) | M=1 (A+B'+1 = A-B) | V = C₃⊕C₄"
            fill="#F0F9FF"
            stroke="#BAE6FD"
            color="#0369A1"
          />

          {/* Common Mode M Rail at y=58 */}
          <PinLabel x={744} y={58} anchor="end" text="M (Mode)" color="#7C3AED" size={12.5} />
          <Wire d="M 164 58 L 692 58" color={WIRE_COLORS.control} />
          <Wire d="M 692 58 L 692 204 L 664 204" color={WIRE_COLORS.control} />
          <PinLabel x={718} y={196} text="C₀=M" color="#7C3AED" size={11.5} />

          {[
            { bit: 3, x: 100 },
            { bit: 2, x: 256 },
            { bit: 1, x: 412 },
            { bit: 0, x: 568 },
          ].map((st, idx) => (
            <g key={st.bit}>
              {/* B_i -> XOR top; M -> XOR bottom */}
              <PinLabel x={st.x + 68} y={82} text={`B${st.bit}`} color="#C2410C" size={12} />
              <Wire d={`M ${st.x + 68} 94 L ${st.x + 68} 106`} color={WIRE_COLORS.signalB} />
              <JunctionDot x={st.x + 64} y={58} color={WIRE_COLORS.control} />
              <Wire d={`M ${st.x + 64} 58 L ${st.x + 64} 106`} color={WIRE_COLORS.control} />
              <g transform={`translate(${st.x + 48}, 104)`}>
                <rect x={0} y={0} width={38} height={28} rx={7} fill="#D1FAE5" stroke="#059669" strokeWidth={2} />
                <PinLabel x={19} y={14} text="⊕" color="#047857" size={14} />
              </g>
              <ArrowWire d={`M ${st.x + 67} 132 L ${st.x + 67} 168`} variant="emerald" />

              {/* A_i direct into FA */}
              <PinLabel x={st.x + 24} y={142} text={`A${st.bit}`} color="#0369A1" size={12.5} />
              <ArrowWire d={`M ${st.x + 24} 152 L ${st.x + 24} 168`} variant="blue" />

              <BlockBox x={st.x} y={170} w={96} h={64} title={`FA${st.bit}`} palette="adder" />
              <ArrowWire d={`M ${st.x + 48} 234 L ${st.x + 48} 274`} variant="emerald" />
              <PinLabel x={st.x + 48} y={290} text={`S${st.bit}`} color="#047857" size={13.5} />

              {idx > 0 && (
                <>
                  <ArrowWire d={`M ${st.x} 202 L ${st.x - 60} 202`} variant="rose" />
                  <PinLabel x={st.x - 30} y={188} text={`C${st.bit + 1}`} color="#BE123C" size={11.5} />
                </>
              )}
            </g>
          ))}

          {/* Overflow XOR tapping C3 and C4 */}
          <Wire d="M 100 202 L 42 202" color={WIRE_COLORS.alert} />
          <PinLabel x={26} y={202} text="C₄" color="#BE123C" size={13} />
          <JunctionDot x={72} y={202} color={WIRE_COLORS.alert} />
          <JunctionDot x={224} y={202} color={WIRE_COLORS.alert} />
          <Wire d="M 72 202 L 72 268 L 106 268" color={WIRE_COLORS.alert} />
          <Wire d="M 224 202 L 224 286 L 106 286" color={WIRE_COLORS.alert} />
          <GateOr x={104} y={258} w={54} h={38} xor label="⊕" />
          <ArrowWire d="M 158 277 L 196 277" variant="rose" />
          <PinLabel x={204} y={277} anchor="start" text="V (Overflow)" color="#BE123C" size={12} />
        </LabSvgCanvas>
      );

    case 'midterm-gate-delay-recap':
      return (
        <LabSvgCanvas viewBox="0 0 780 260" ariaLabel="Midterm Delay and Overflow Recap">
          <SectionTag
            x={22}
            y={14}
            w={352}
            text={isEn ? '1) 2-Level Gate Delay (2 · t_pd)' : '1) 2-Seviye Kapı Gecikmesi (2 · t_pd)'}
            fill="#E0F2FE"
            stroke="#7DD3FC"
            color="#0369A1"
          />
          <SectionTag
            x={404}
            y={14}
            w={354}
            text={isEn ? '2) RCA Critical Path: 3·t_carry + t_sum' : '2) RCA Kritik Yol: 3·t_carry + t_sum'}
            fill="#FFE4E6"
            stroke="#FDA4AF"
            color="#BE123C"
          />
          <GateAnd x={52} y={76} w={56} h={40} inverted label="NAND" />
          <GateAnd x={52} y={136} w={56} h={40} inverted label="NAND" />
          <Wire d="M 108 96 L 136 96 L 136 116 L 166 116" />
          <Wire d="M 108 156 L 136 156 L 136 136 L 166 136" />
          <GateAnd x={166} y={106} w={58} h={40} inverted label="NAND" />
          <ArrowWire d="M 224 126 L 274 126" variant="blue" />
          <PinLabel x={284} y={126} anchor="start" text="F (2 t_pd)" color="#0369A1" size={12.5} />
          <PinLabel x={196} y={216} text={isEn ? 'SOP → NAND-NAND equal delay' : 'SOP → NAND-NAND eşit gecikme'} color="#475569" size={12} />

          <line x1={390} y1={14} x2={390} y2={244} stroke="#CBD5E1" strokeWidth={1.8} strokeDasharray="6 5" />

          {[0, 1, 2, 3].map((i) => {
            const x = 668 - i * 82;
            return (
              <g key={i}>
                <BlockBox x={x} y={90} w={56} h={52} title={`FA${i}`} palette="adder" />
                {i < 3 && (
                  <ArrowWire d={`M ${x} 116 L ${x - 24} 116`} variant="rose" />
                )}
              </g>
            );
          })}
          <ArrowWire d="M 450 142 L 450 184" variant="emerald" />
          <PinLabel x={450} y={198} text={isEn ? 'S₃ (Final Output)' : 'S₃ (Son Çıkış)'} color="#047857" size={12} />
          <PinLabel x={582} y={226} text={isEn ? 'Critical Path = C₀→C₁→C₂→C₃→S₃' : 'Kritik Yol = C₀→C₁→C₂→C₃→S₃'} color="#BE123C" size={12} />
        </LabSvgCanvas>
      );

    case 'bcd-adder-block':
      return (
        <LabSvgCanvas viewBox="0 0 780 340" ariaLabel="4-Bit BCD Adder with +6 Correction Circuit">
          <SectionTag
            x={22}
            y={12}
            w={736}
            text={
              isEn
                ? 'BCD Adder: If Raw Sum ≥ 10, Add +6 (0110) via C = K + Z₈Z₄ + Z₈Z₂'
                : 'BCD Adder: Ham Toplam ≥ 10 İse C = K + Z₈Z₄ + Z₈Z₂ ile +6 (0110) Düzeltmesi'
            }
            fill="#FFF1F2"
            stroke="#FDA4AF"
            color="#BE123C"
          />
          <PinLabel x={150} y={62} text="Addend (A₃..A₀)" color="#0369A1" size={12} />
          <PinLabel x={310} y={62} text="Augend (B₃..B₀)" color="#C2410C" size={12} />
          <ArrowWire d="M 150 74 L 150 102" variant="blue" />
          <ArrowWire d="M 310 74 L 310 102" color={WIRE_COLORS.signalB} />

          <BlockBox
            x={100}
            y={104}
            w={260}
            h={62}
            title="4-Bit Binary Adder #1"
            subtitle="Z₈ Z₄ Z₂ Z₁ + Carry K"
            palette="adder"
          />
          <Wire d="M 412 135 L 360 135" />
          <PinLabel x={422} y={135} anchor="start" text="Cin" size={12.5} />

          {/* Outputs Z8..Z1 down to Adder #2 & Correction logic */}
          <ArrowWire d="M 230 166 L 230 228" variant="main" />
          <PinLabel x={256} y={194} text="Z₈ Z₄ Z₂ Z₁" color="#334155" size={11.5} />

          {/* Tap Z8, Z4, Z2 & K to correction logic */}
          <Wire d="M 100 135 L 60 135 L 60 218 L 570 218" color={WIRE_COLORS.alert} />
          <PinLabel x={78} y={122} text="K" color="#BE123C" size={12.5} />
          <JunctionDot x={230} y={194} />
          <Wire d="M 230 194 L 460 194" color={WIRE_COLORS.signalA} />
          <BlockBox
            x={460}
            y={166}
            w={235}
            h={66}
            title={isEn ? 'Correction Logic' : 'Düzeltme Mantığı'}
            subtitle="C = K + Z₈Z₄ + Z₈Z₂"
            palette="or"
          />

          {/* C signal -> Cout and [0, C, C, 0] */}
          <ArrowWire d="M 578 232 L 578 260 L 364 260" variant="rose" />
          <PinLabel x={480} y={248} text="[0, C, C, 0] = +6 (0110)" color="#BE123C" size={12} />
          <ArrowWire d="M 695 198 L 736 198" variant="rose" />
          <PinLabel x={736} y={182} text="Cout" color="#BE123C" size={12.5} />

          <BlockBox
            x={100}
            y={230}
            w={260}
            h={62}
            title="4-Bit Binary Adder #2"
            subtitle="+ 0000 (C=0)  |  + 0110 (C=1)"
            palette="ff"
          />
          <ArrowWire d="M 230 292 L 230 322" variant="emerald" />
          <PinLabel x={342} y={316} text={isEn ? 'Valid BCD Output (S₈ S₄ S₂ S₁)' : 'Geçerli BCD Çıkış (S₈ S₄ S₂ S₁)'} color="#047857" size={12.5} />
        </LabSvgCanvas>
      );

    case 'comparator-2bit-logic':
      return (
        <LabSvgCanvas viewBox="0 0 760 280" ariaLabel="2-Bit Magnitude Comparator Logic">
          <SectionTag
            x={24}
            y={14}
            w={712}
            text={
              isEn
                ? "Magnitude Comparator: XNOR Bit Equality xᵢ = (Aᵢ ⊕ Bᵢ)' with MSB → LSB Priority"
                : "Büyüklük Karşılaştırıcı: XNOR Bit Eşitliği xᵢ = (Aᵢ ⊕ Bᵢ)' ile MSB → LSB Önceliği"
            }
            fill="#CFFAFE"
            stroke="#67E8F9"
            color="#0E7490"
          />
          <PinLabel x={48} y={84} text="A₁, B₁" color="#0369A1" size={12.5} />
          <Wire d="M 78 84 L 128 84" />
          <GateOr x={124} y={62} w={66} h={44} xor inverted label="XNOR" />
          <Wire d="M 190 84 L 284 84" color={WIRE_COLORS.active} />
          <PinLabel x={232} y={68} text="x₁" color="#047857" size={13} />

          <PinLabel x={48} y={168} text="A₀, B₀" color="#C2410C" size={12.5} />
          <Wire d="M 78 168 L 128 168" />
          <GateOr x={124} y={146} w={66} h={44} xor inverted label="XNOR" />
          <Wire d="M 190 168 L 284 168" color={WIRE_COLORS.active} />
          <PinLabel x={232} y={152} text="x₀" color="#047857" size={13} />

          {/* Equality AND */}
          <Wire d="M 284 84 L 330 84 L 330 116 L 372 116" color={WIRE_COLORS.active} />
          <Wire d="M 284 168 L 330 168 L 330 136 L 372 136" color={WIRE_COLORS.active} />
          <GateAnd x={372} y={104} w={64} h={44} label="AND" />
          <ArrowWire d="M 436 126 L 520 126" variant="emerald" />
          <PinLabel x={534} y={126} anchor="start" text="(A = B) = x₁ · x₀" color="#047857" size={13} />

          {/* Summary formulas on right */}
          <BlockBox
            x={490}
            y={172}
            w={246}
            h={78}
            title={isEn ? 'A > B  &  A < B Equations' : 'A > B  &  A < B Denklemleri'}
            subtitle="A>B = A₁B₁' + x₁A₀B₀'"
            palette="neutral"
          />
          <PinLabel x={613} y={232} text="A<B = A₁'B₁ + x₁A₀'B₀" color="#0E7490" size={11.5} />
        </LabSvgCanvas>
      );

    case 'decoder-2to4-inner':
      return (
        <LabSvgCanvas viewBox="0 0 760 360" ariaLabel="2-to-4 Active-High Decoder Internal Gate Structure">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? "2×4 Active-High Decoder Internal Gate Logic (D₀ = E·A₁'·A₀' … D₃ = E·A₁·A₀)"
                : "2×4 Active-High Decoder İç Kapı Yapısı (D₀ = E·A₁'·A₀' … D₃ = E·A₁·A₀)"
            }
            fill="#CCFBF1"
            stroke="#5EEAD4"
            color="#0F766E"
          />
          {/* Input Labels & Vertical Rails: A1, A1', A0, A0', E */}
          <PinLabel x={68} y={54} text="A₁ (MSB)" color="#0369A1" size={12.5} />
          <PinLabel x={164} y={54} text="A₀ (LSB)" color="#C2410C" size={12.5} />
          <PinLabel x={256} y={54} text="Enable (E)" color="#7C3AED" size={12.5} />

          {/* A1 rail at x=68, NOT at y=86, A1' rail at x=112 */}
          <Wire d="M 68 68 L 68 326" color={WIRE_COLORS.signalA} />
          <JunctionDot x={68} y={84} color={WIRE_COLORS.signalA} />
          <Wire d="M 68 84 L 84 84" color={WIRE_COLORS.signalA} />
          <GateNot x={84} y={71} w={30} h={26} />
          <Wire d="M 114 84 L 120 84 L 120 326" color="#7E22CE" />

          {/* A0 rail at x=164, NOT at y=84, A0' rail at x=214 */}
          <Wire d="M 164 68 L 164 326" color={WIRE_COLORS.signalB} />
          <JunctionDot x={164} y={84} color={WIRE_COLORS.signalB} />
          <Wire d="M 164 84 L 180 84" color={WIRE_COLORS.signalB} />
          <GateNot x={180} y={71} w={30} h={26} />
          <Wire d="M 210 84 L 216 84 L 216 326" color="#7E22CE" />

          {/* Enable rail at x=256 */}
          <Wire d="M 256 68 L 256 326" color={WIRE_COLORS.control} />

          {/* 4 rows of 3-input AND gates */}
          {[
            { label: "D₀ = E·A₁'·A₀'", y: 122, rail1: 120, rail2: 216, c1: '#7E22CE', c2: '#7E22CE' },
            { label: "D₁ = E·A₁'·A₀", y: 178, rail1: 120, rail2: 164, c1: '#7E22CE', c2: WIRE_COLORS.signalB },
            { label: "D₂ = E·A₁·A₀'", y: 234, rail1: 68, rail2: 216, c1: WIRE_COLORS.signalA, c2: '#7E22CE' },
            { label: 'D₃ = E·A₁·A₀', y: 290, rail1: 68, rail2: 164, c1: WIRE_COLORS.signalA, c2: WIRE_COLORS.signalB },
          ].map((row, idx) => (
            <g key={idx}>
              <JunctionDot x={row.rail1} y={row.y + 8} color={row.c1} />
              <Wire d={`M ${row.rail1} ${row.y + 8} L 348 ${row.y + 8}`} color={row.c1} />

              <JunctionDot x={row.rail2} y={row.y + 20} color={row.c2} />
              <Wire d={`M ${row.rail2} ${row.y + 20} L 348 ${row.y + 20}`} color={row.c2} />

              <JunctionDot x={256} y={row.y + 32} color={WIRE_COLORS.control} />
              <Wire d={`M 256 ${row.y + 32} L 348 ${row.y + 32}`} color={WIRE_COLORS.control} />

              <GateAnd x={348} y={row.y} w={66} h={40} label="AND3" />
              <ArrowWire d={`M 414 ${row.y + 20} L 500 ${row.y + 20}`} variant="emerald" />
              <PinLabel
                x={512}
                y={row.y + 20}
                anchor="start"
                text={row.label}
                color="#0F766E"
                size={13}
              />
            </g>
          ))}
        </LabSvgCanvas>
      );

    case 'decoder-3to8-from-2to4':
      return (
        <LabSvgCanvas viewBox="0 0 760 310" ariaLabel="3-to-8 Decoder Built from Two 2-to-4 Decoders">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? '3×8 Decoder Built from Two 2×4 Decoders (A₂ MSB Enable Control)'
                : 'İki 2×4 Decoder ile 3×8 Decoder Kurulumu (A₂ MSB Enable Kontrolü)'
            }
            fill="#CCFBF1"
            stroke="#5EEAD4"
            color="#0F766E"
          />

          {/* Shared A1, A0 Inputs */}
          <PinLabel x={52} y={92} text="A₁" color="#0369A1" size={14} />
          <PinLabel x={52} y={122} text="A₀" color="#C2410C" size={14} />
          <Wire d="M 70 92 L 310 92" color={WIRE_COLORS.signalA} />
          <Wire d="M 70 122 L 310 122" color={WIRE_COLORS.signalB} />
          <JunctionDot x={160} y={92} color={WIRE_COLORS.signalA} />
          <JunctionDot x={190} y={122} color={WIRE_COLORS.signalB} />
          <Wire d="M 160 92 L 160 202 L 310 202" color={WIRE_COLORS.signalA} />
          <Wire d="M 190 122 L 190 232 L 310 232" color={WIRE_COLORS.signalB} />

          {/* MSB A2 -> NOT -> Top E, Direct -> Bottom E */}
          <PinLabel x={52} y={268} text="A₂ (MSB)" color="#7C3AED" size={13} />
          <Wire d="M 94 268 L 224 268" color={WIRE_COLORS.control} />
          <JunctionDot x={122} y={268} color={WIRE_COLORS.control} />
          <Wire d="M 122 268 L 122 152 L 224 152" color={WIRE_COLORS.control} />
          <GateNot x={224} y={138} w={42} h={28} />
          <ArrowWire d="M 266 152 L 308 152" color="#7E22CE" />
          <ArrowWire d="M 224 268 L 308 268" color={WIRE_COLORS.control} />

          {/* Top 2x4 Decoder */}
          <BlockBox
            x={310}
            y={72}
            w={195}
            h={96}
            title={isEn ? 'Upper 2×4 Decoder' : 'Üst 2×4 Decoder'}
            subtitle={isEn ? "Active when A₂ = 0 (E = A₂')" : "A₂ = 0 iken aktif (E = A₂')"}
            palette="dec"
          />
          <PinLabel x={324} y={92} text="A₁" anchor="start" size={11} color="#0F766E" />
          <PinLabel x={324} y={122} text="A₀" anchor="start" size={11} color="#0F766E" />
          <PinLabel x={324} y={152} text="E" anchor="start" size={11} color="#7E22CE" />

          {/* Bottom 2x4 Decoder */}
          <BlockBox
            x={310}
            y={186}
            w={195}
            h={96}
            title={isEn ? 'Lower 2×4 Decoder' : 'Alt 2×4 Decoder'}
            subtitle={isEn ? 'Active when A₂ = 1 (E = A₂)' : 'A₂ = 1 iken aktif (E = A₂)'}
            palette="dec"
          />
          <PinLabel x={324} y={202} text="A₁" anchor="start" size={11} color="#0F766E" />
          <PinLabel x={324} y={232} text="A₀" anchor="start" size={11} color="#0F766E" />
          <PinLabel x={324} y={268} text="E" anchor="start" size={11} color="#7C3AED" />

          {/* Outputs D0..D3 and D4..D7 */}
          {[0, 1, 2, 3].map((i) => (
            <g key={`top-${i}`}>
              <ArrowWire d={`M 505 ${86 + i * 22} L 605 ${86 + i * 22}`} variant="emerald" />
              <PinLabel x={618} y={86 + i * 22} anchor="start" text={`D${i} (m${i})`} color="#047857" size={12} />
            </g>
          ))}
          {[4, 5, 6, 7].map((i, idx) => (
            <g key={`bot-${i}`}>
              <ArrowWire d={`M 505 ${200 + idx * 22} L 605 ${200 + idx * 22}`} variant="emerald" />
              <PinLabel x={618} y={200 + idx * 22} anchor="start" text={`D${i} (m${i})`} color="#047857" size={12} />
            </g>
          ))}
        </LabSvgCanvas>
      );

    case 'priority-encoder-4to2':
      return (
        <LabSvgCanvas viewBox="0 0 760 300" ariaLabel="4-to-2 Priority Encoder Gate Schematic">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? "4-to-2 Priority Encoder (Priority: D₃ > D₂ > D₁ > D₀): x = D₂+D₃ | y = D₃+D₁D₂' | V = D₀+D₁+D₂+D₃"
                : "4-to-2 Priority Encoder (Öncelik: D₃ > D₂ > D₁ > D₀): x = D₂+D₃ | y = D₃+D₁D₂' | V = D₀+D₁+D₂+D₃"
            }
            fill="#FCE7F3"
            stroke="#F9A8D4"
            color="#BE185D"
          />
          {/* Inputs on left */}
          {[
            { lbl: 'D₃', y: 74, c: '#BE185D' },
            { lbl: 'D₂', y: 128, c: '#0369A1' },
            { lbl: 'D₁', y: 182, c: '#047857' },
            { lbl: 'D₀', y: 236, c: '#C2410C' },
          ].map((inp) => (
            <g key={inp.lbl}>
              <PinLabel x={46} y={inp.y} text={inp.lbl} color={inp.c} size={13.5} />
              <Wire d={`M 64 ${inp.y} L 154 ${inp.y}`} color={inp.c} />
            </g>
          ))}

          {/* x = D2 + D3 */}
          <JunctionDot x={108} y={74} color="#BE185D" />
          <JunctionDot x={128} y={128} color="#0369A1" />
          <Wire d="M 108 74 L 408 74" color="#BE185D" />
          <Wire d="M 128 128 L 128 96 L 408 96" color="#0369A1" />
          <GateOr x={402} y={64} w={62} h={42} label="OR" />
          <ArrowWire d="M 464 85 L 558 85" variant="main" />
          <PinLabel x={570} y={85} anchor="start" text="x = D₂ + D₃" color="#0F172A" size={12.5} />

          {/* y = D3 + D1·D2' */}
          <JunctionDot x={154} y={128} color="#0369A1" />
          <Wire d="M 154 128 L 194 128" color="#0369A1" />
          <GateNot x={194} y={114} w={38} h={28} />
          <Wire d="M 232 128 L 260 128 L 260 144 L 292 144" color="#7E22CE" />
          <JunctionDot x={154} y={182} color="#047857" />
          <Wire d="M 154 182 L 260 182 L 260 166 L 292 166" color="#047857" />
          <GateAnd x={292} y={134} w={56} h={42} label="AND" />
          <JunctionDot x={380} y={74} color="#BE185D" />
          <Wire d="M 380 74 L 380 140 L 408 140" color="#BE185D" />
          <Wire d="M 348 155 L 408 155" />
          <GateOr x={402} y={128} w={62} h={42} label="OR" />
          <ArrowWire d="M 464 149 L 558 149" variant="main" />
          <PinLabel x={570} y={149} anchor="start" text="y = D₃ + D₁D₂'" color="#0F172A" size={12.5} />

          {/* V = D0+D1+D2+D3 */}
          <Wire d="M 90 74 L 90 212 L 408 212" color="#BE185D" />
          <JunctionDot x={90} y={74} color="#BE185D" />
          <Wire d="M 110 128 L 110 222 L 408 222" color="#0369A1" />
          <JunctionDot x={110} y={128} color="#0369A1" />
          <Wire d="M 134 182 L 134 232 L 408 232" color="#047857" />
          <JunctionDot x={134} y={182} color="#047857" />
          <Wire d="M 154 236 L 408 236" color="#C2410C" />
          <GateOr x={402} y={204} w={64} h={44} label="OR4" />
          <ArrowWire d="M 466 226 L 558 226" variant="emerald" />
          <PinLabel x={570} y={226} anchor="start" text="V (Valid Bit)" color="#047857" size={12.5} />
        </LabSvgCanvas>
      );

    case 'mux-4to1-inner':
      return (
        <LabSvgCanvas viewBox="0 0 760 360" ariaLabel="4-to-1 Multiplexer Internal Gate Structure">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? '4×1 Multiplexer Internal Gate Structure (S₁S₀ Selectors + 4× AND3 + Output OR4)'
                : '4×1 Multiplexer İç Kapı Yapısı (S₁S₀ Seçicileri + 4× AND3 + Çıkışta OR4)'
            }
            fill="#EDE9FE"
            stroke="#C4B5FD"
            color="#6D28D9"
          />

          {/* Select Rails: S1, S1', S0, S0' */}
          <PinLabel x={74} y={52} text="S₁" color="#7C3AED" size={13.5} />
          <PinLabel x={164} y={52} text="S₀" color="#0369A1" size={13.5} />

          <Wire d="M 74 64 L 74 326" color={WIRE_COLORS.control} />
          <JunctionDot x={74} y={82} color={WIRE_COLORS.control} />
          <Wire d="M 74 82 L 90 82" color={WIRE_COLORS.control} />
          <GateNot x={90} y={69} w={30} h={26} />
          <Wire d="M 120 82 L 126 82 L 126 326" color="#7E22CE" />

          <Wire d="M 164 64 L 164 326" color={WIRE_COLORS.signalA} />
          <JunctionDot x={164} y={82} color={WIRE_COLORS.signalA} />
          <Wire d="M 164 82 L 180 82" color={WIRE_COLORS.signalA} />
          <GateNot x={180} y={69} w={30} h={26} />
          <Wire d="M 210 82 L 216 82 L 216 326" color="#0EA5E9" />

          {[
            { iLabel: 'I₀', y: 120, r1: 126, r2: 216, c1: '#7E22CE', c2: '#0EA5E9', outY: 194 },
            { iLabel: 'I₁', y: 174, r1: 126, r2: 164, c1: '#7E22CE', c2: WIRE_COLORS.signalA, outY: 204 },
            { iLabel: 'I₂', y: 228, r1: 74, r2: 216, c1: WIRE_COLORS.control, c2: '#0EA5E9', outY: 214 },
            { iLabel: 'I₃', y: 282, r1: 74, r2: 164, c1: WIRE_COLORS.control, c2: WIRE_COLORS.signalA, outY: 224 },
          ].map((row, idx) => (
            <g key={idx}>
              <PinLabel x={252} y={row.y + 8} text={row.iLabel} color="#C2410C" size={13} />
              <Wire d={`M 266 ${row.y + 8} L 340 ${row.y + 8}`} color={WIRE_COLORS.signalB} />

              <JunctionDot x={row.r1} y={row.y + 20} color={row.c1} />
              <Wire d={`M ${row.r1} ${row.y + 20} L 340 ${row.y + 20}`} color={row.c1} />

              <JunctionDot x={row.r2} y={row.y + 32} color={row.c2} />
              <Wire d={`M ${row.r2} ${row.y + 32} L 340 ${row.y + 32}`} color={row.c2} />

              <GateAnd x={340} y={row.y} w={62} h={40} label="AND3" />
              <Wire d={`M 402 ${row.y + 20} L ${452 + idx * 14} ${row.y + 20} L ${452 + idx * 14} ${row.outY} L 542 ${row.outY}`} />
            </g>
          ))}

          <GateOr x={534} y={182} w={74} h={56} label="OR4" />
          <ArrowWire d="M 608 210 L 680 210" variant="emerald" width={2.8} />
          <PinLabel x={694} y={210} anchor="start" text={isEn ? 'Y (Output)' : 'Y (Çıkış)'} color="#047857" size={13.5} />
        </LabSvgCanvas>
      );

    case 'tristate-shared-bus':
      return (
        <LabSvgCanvas viewBox="0 0 820 310" ariaLabel="Three-State Buffers on a Shared Bus">
          <SectionTag
            x={22}
            y={12}
            w={776}
            text={
              isEn
                ? 'Three-State Buffers & Shared Bus: Only 1 Driver Active, Others Hi-Z!'
                : 'Three-State Buffers & Ortak Veri Yolu (Shared Bus): Yalnızca 1 Sürücü Aktif, Diğerleri Hi-Z!'
            }
            fill="#F3E8FF"
            stroke="#D8B4FE"
            color="#7E22CE"
          />

          {/* 2x4 Decoder preventing bus contention */}
          <PinLabel x={46} y={156} text="S₁, S₀" color="#0F766E" size={12.5} />
          <ArrowWire d="M 74 156 L 116 156" variant="main" />
          <BlockBox
            x={118}
            y={102}
            w={136}
            h={116}
            title="2×4 Decoder"
            subtitle={isEn ? 'Prevents Contention' : 'Çakışmayı Önler'}
            palette="dec"
          />

          {/* Three Tri-state drivers onto vertical Bus */}
          {[
            {
              name: 'Reg A',
              y: 84,
              active: true,
              wireD: 'M 254 114 L 274 114 L 274 68 L 381 68 L 381 91.5',
              lblX: 326,
              lblY: 56,
            },
            {
              name: 'Reg B',
              y: 158,
              active: false,
              wireD: 'M 254 140 L 381 140 L 381 165.5',
              lblX: 318,
              lblY: 128,
            },
            {
              name: 'Reg C',
              y: 232,
              active: false,
              wireD: 'M 254 208 L 381 208 L 381 239.5',
              lblX: 318,
              lblY: 196,
            },
          ].map((drv) => (
            <g key={drv.name}>
              {/* Decoder Enable wire -> Tri-state control edge (exact top edge touch at x=381, y=drv.y+7.5) */}
              <Wire
                d={drv.wireD}
                color={drv.active ? WIRE_COLORS.active : WIRE_COLORS.muted}
                dashed={!drv.active}
              />
              <PinLabel
                x={drv.lblX}
                y={drv.lblY}
                text={drv.active ? (isEn ? 'EN=1 (Active)' : 'EN=1 (Aktif)') : 'EN=0 (Hi-Z)'}
                color={drv.active ? '#047857' : '#64748B'}
                size={10.5}
              />
              <PinLabel x={306} y={drv.y + 15} text={drv.name} color="#0369A1" size={12} />
              <Wire d={`M 332 ${drv.y + 15} L 360 ${drv.y + 15}`} />
              <GateNot x={360} y={drv.y} w={42} h={30} inverted={false} label="3S" />
              <Wire
                d={`M 402 ${drv.y + 15} L 542 ${drv.y + 15}`}
                color={drv.active ? WIRE_COLORS.active : WIRE_COLORS.muted}
                dashed={!drv.active}
              />
              <JunctionDot
                x={542}
                y={drv.y + 15}
                color={drv.active ? WIRE_COLORS.active : '#475569'}
              />
            </g>
          ))}

          {/* Shared Vertical Bus */}
          <Wire d="M 542 64 L 542 278" color="#0F172A" width={4} />
          <ArrowWire d="M 542 173 L 642 173" variant="emerald" width={3} />
          <PinLabel x={654} y={173} anchor="start" text="Shared Bus" color="#047857" size={13.5} />
          <PinLabel
            x={654}
            y={194}
            anchor="start"
            text={isEn ? '(Conflict-Free Hi-Z)' : '(Hi-Z Çakışmasız)'}
            color="#64748B"
            size={11}
          />
        </LabSvgCanvas>
      );

    default:
      return null;
  }
}
