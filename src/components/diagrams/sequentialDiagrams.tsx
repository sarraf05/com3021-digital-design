import React from 'react';
import type { Language } from '../../types/curriculum';
import {
  ArrowWire,
  BlockBox,
  GateAnd,
  GateNot,
  GateOr,
  JunctionDot,
  LabSvgCanvas,
  MuxTrapezoid,
  PinLabel,
  SectionTag,
  StateBubble,
  WIRE_COLORS,
  Wire,
} from './svgPrimitives';

export function renderSequentialDiagram(
  id: string,
  lang: Language
): React.ReactNode | null {
  const isEn = lang === 'en';
  switch (id) {
    case 'sr-latch-nor-vs-nand':
      return (
        <LabSvgCanvas viewBox="0 0 780 300" ariaLabel="NOR SR Latch vs NAND S'R' Latch">
          <SectionTag
            x={20}
            y={14}
            w={352}
            text={
              isEn
                ? 'NOR-Based SR Latch (Active-High: R top, S bottom)'
                : 'NOR Tabanlı SR Latch (Active-High: R üstte, S altta)'
            }
            fill="#FFEDD5"
            stroke="#FDBA74"
            color="#C2410C"
          />
          <SectionTag
            x={408}
            y={14}
            w={352}
            text={
              isEn
                ? "NAND-Based S'R' Latch (Active-Low: S' top, R' bottom)"
                : "NAND Tabanlı S'R' Latch (Active-Low: S' üstte, R' altta)"
            }
            fill="#E0F2FE"
            stroke="#7DD3FC"
            color="#0369A1"
          />

          {/* Left: NOR SR Latch — Top NOR: R -> Q, Bottom NOR: S -> Q' */}
          <PinLabel x={46} y={84} text="R" color="#BE123C" size={14} />
          <Wire d="M 64 84 L 146 84" color={WIRE_COLORS.alert} />
          <GateOr x={140} y={72} w={66} h={46} inverted label="NOR" />
          <Wire d="M 206 95 L 320 95" color={WIRE_COLORS.active} />
          <PinLabel x={336} y={95} text="Q" color="#047857" size={14.5} />

          <PinLabel x={46} y={222} text="S" color="#047857" size={14} />
          <Wire d="M 64 222 L 146 222" color={WIRE_COLORS.active} />
          <GateOr x={140} y={188} w={66} h={46} inverted label="NOR" />
          <Wire d="M 206 211 L 320 211" color="#64748B" />
          <PinLabel x={336} y={211} text="Q'" color="#475569" size={14.5} />

          {/* Cross-coupled feedback (NO junction dot on diagonal crossing!) */}
          <JunctionDot x={252} y={95} color={WIRE_COLORS.active} />
          <Wire d="M 252 95 L 252 132 L 104 176 L 104 200 L 146 200" color={WIRE_COLORS.active} />
          <JunctionDot x={252} y={211} color="#475569" />
          <Wire d="M 252 211 L 252 176 L 104 132 L 104 106 L 146 106" color="#64748B" />

          <PinLabel
            x={196}
            y={272}
            text={isEn ? "S=1, R=1 → Forbidden (Q=Q'=0)" : "S=1,R=1 → Yasak (Q=Q'=0)"}
            color="#BE123C"
            size={11.5}
          />

          <line x1={390} y1={14} x2={390} y2={286} stroke="#CBD5E1" strokeWidth={1.8} strokeDasharray="6 5" />

          {/* Right: NAND S'R' Latch — Top NAND: S' -> Q, Bottom NAND: R' -> Q' */}
          <PinLabel x={432} y={84} text="S'" color="#047857" size={14} />
          <Wire d="M 452 84 L 528 84" color={WIRE_COLORS.active} />
          <GateAnd x={528} y={72} w={66} h={46} inverted label="NAND" />
          <Wire d="M 594 95 L 708 95" color={WIRE_COLORS.active} />
          <PinLabel x={724} y={95} text="Q" color="#047857" size={14.5} />

          <PinLabel x={432} y={222} text="R'" color="#BE123C" size={14} />
          <Wire d="M 452 222 L 528 222" color={WIRE_COLORS.alert} />
          <GateAnd x={528} y={188} w={66} h={46} inverted label="NAND" />
          <Wire d="M 594 211 L 708 211" color="#64748B" />
          <PinLabel x={724} y={211} text="Q'" color="#475569" size={14.5} />

          <JunctionDot x={640} y={95} color={WIRE_COLORS.active} />
          <Wire d="M 640 95 L 640 132 L 492 176 L 492 200 L 528 200" color={WIRE_COLORS.active} />
          <JunctionDot x={640} y={211} color="#475569" />
          <Wire d="M 640 211 L 640 176 L 492 132 L 492 106 L 528 106" color="#64748B" />

          <PinLabel
            x={584}
            y={272}
            text={isEn ? "S'=0, R'=0 → Forbidden (Q=Q'=1)" : "S'=0,R'=0 → Yasak (Q=Q'=1)"}
            color="#BE123C"
            size={11.5}
          />
        </LabSvgCanvas>
      );

    case 'gated-d-latch':
      return (
        <LabSvgCanvas viewBox="0 0 760 290" ariaLabel="Gated D Latch 4-NAND Internal Structure">
          <SectionTag
            x={22}
            y={14}
            w={716}
            text={
              isEn
                ? 'Gated D Latch (4 × NAND + NOT): Transparent When E=1 (Q = D), Latched When E=0 (Hold)'
                : 'Gated D Latch (4 × NAND + NOT): Enable (E)=1 İken Şeffaf (Q = D), E=0 İken Kilitli (Hold)'
            }
            fill="#FEF3C7"
            stroke="#FCD34D"
            color="#B45309"
          />
          <PinLabel x={48} y={84} text="D" color="#0369A1" size={14.5} />
          <Wire d="M 66 84 L 244 84" color={WIRE_COLORS.signalA} />
          <JunctionDot x={108} y={84} color={WIRE_COLORS.signalA} />
          <Wire d="M 108 84 L 108 220 L 146 220" color={WIRE_COLORS.signalA} />
          <GateNot x={146} y={205} w={42} h={30} />
          <Wire d="M 188 220 L 244 220" color="#7E22CE" />

          {/* Enable E splits to both input NANDs */}
          <PinLabel x={48} y={152} text="E (En)" color="#7C3AED" size={13} />
          <Wire d="M 78 152 L 194 152" color={WIRE_COLORS.control} />
          <JunctionDot x={194} y={152} color={WIRE_COLORS.control} />
          <Wire d="M 194 152 L 194 106 L 244 106" color={WIRE_COLORS.control} />
          <Wire d="M 194 152 L 194 198 L 244 198" color={WIRE_COLORS.control} />

          {/* Input steering NANDs */}
          <GateAnd x={244} y={72} w={66} h={46} inverted label="NAND" />
          <GateAnd x={244} y={186} w={66} h={46} inverted label="NAND" />

          <Wire d="M 310 95 L 444 95" />
          <Wire d="M 310 209 L 444 209" />

          {/* Output cross-coupled NANDs */}
          <GateAnd x={444} y={82} w={68} h={46} inverted label="NAND" />
          <GateAnd x={444} y={176} w={68} h={46} inverted label="NAND" />

          <ArrowWire d="M 512 105 L 664 105" variant="emerald" />
          <PinLabel x={680} y={105} text="Q" color="#047857" size={15} />
          <ArrowWire d="M 512 199 L 664 199" variant="main" />
          <PinLabel x={680} y={199} text="Q'" color="#475569" size={15} />

          {/* Cross feedback (NO dot on crossing) */}
          <JunctionDot x={568} y={105} color={WIRE_COLORS.active} />
          <Wire d="M 568 105 L 568 136 L 406 168 L 406 188 L 444 188" color={WIRE_COLORS.active} />
          <JunctionDot x={568} y={199} color="#475569" />
          <Wire d="M 568 199 L 568 168 L 406 136 L 406 116 L 444 116" color="#64748B" />
        </LabSvgCanvas>
      );

    case 'master-slave-dff':
      return (
        <LabSvgCanvas viewBox="0 0 760 280" ariaLabel="Positive Edge-Triggered Master-Slave D Flip-Flop">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? "Positive Edge-Triggered (↑) Master-Slave D Flip-Flop (Master: CLK' | Slave: CLK)"
                : "Pozitif Kenar Tetiklemeli (↑) Master-Slave D Flip-Flop (Master: CLK' | Slave: CLK)"
            }
            fill="#FEF3C7"
            stroke="#FCD34D"
            color="#B45309"
          />
          <PinLabel x={48} y={102} text="D" color="#0369A1" size={14.5} />
          <ArrowWire d="M 64 102 L 138 102" variant="blue" />

          {/* Master Latch */}
          <BlockBox
            x={140}
            y={74}
            w={150}
            h={92}
            title="Master D Latch"
            subtitle={isEn ? 'Tracks at CLK=0' : 'CLK=0 iken izler'}
            palette="ff"
          />
          <PinLabel x={154} y={102} text="D" anchor="start" size={11.5} color="#B45309" />
          <PinLabel x={154} y={142} text="E" anchor="start" size={11.5} color="#B45309" />
          <PinLabel x={274} y={102} text="Y" anchor="end" size={11.5} color="#B45309" />

          {/* Connection Master Y -> Slave D */}
          <ArrowWire d="M 290 102 L 382 102" variant="main" />
          <PinLabel x={336} y={88} text="Y" size={12.5} color="#0F172A" />

          {/* Slave Latch */}
          <BlockBox
            x={384}
            y={74}
            w={150}
            h={92}
            title="Slave D Latch"
            subtitle={isEn ? 'Transfers at CLK=1' : "CLK=1'de aktarır"}
            palette="ff"
          />
          <PinLabel x={398} y={102} text="D" anchor="start" size={11.5} color="#B45309" />
          <PinLabel x={398} y={142} text="E" anchor="start" size={11.5} color="#B45309" />
          <PinLabel x={518} y={102} text="Q" anchor="end" size={11.5} color="#047857" />

          <ArrowWire d="M 534 102 L 600 102" variant="emerald" />
          <PinLabel x={614} y={102} text="Q" color="#047857" size={14.5} />

          {/* Clock tree: CLK direct to Slave, inverted via NOT to Master */}
          <PinLabel x={48} y={218} text="CLK ↑" color="#D97706" size={13.5} />
          <Wire d="M 78 218 L 352 218 L 352 142 L 382 142" color={WIRE_COLORS.clock} />
          <JunctionDot x={100} y={218} color={WIRE_COLORS.clock} />
          <Wire d="M 100 218 L 100 184 L 116 184" color={WIRE_COLORS.clock} />
          <GateNot x={108} y={168} w={36} h={28} />
          <Wire d="M 144 182 L 154 182 L 154 166" color="#7E22CE" />
          <PinLabel x={174} y={184} anchor="start" text="CLK'" color="#7E22CE" size={12} />

          {/* Equivalent Edge Symbol on right */}
          <BlockBox
            x={646}
            y={74}
            w={88}
            h={92}
            title="D-FF"
            subtitle="> Edge"
            palette="ff"
            hasClockAtY={68}
          />
          <PinLabel x={658} y={102} text="D" anchor="start" size={11} color="#B45309" />
          <PinLabel x={722} y={102} text="Q" anchor="end" size={11} color="#047857" />
          <PinLabel
            x={400}
            y={248}
            text={
              isEn
                ? 'Only on rising edge (0→1) does Master lock and Slave Q update'
                : 'Yalnızca yükselen kenarda (0→1) Master kilitlenir ve Slave Q güncellenir'
            }
            color="#475569"
            size={11.5}
          />
        </LabSvgCanvas>
      );

    case 'dff-to-jk-t-conversion':
      return (
        <LabSvgCanvas viewBox="0 0 780 300" ariaLabel="Building JK and T Flip-Flops from a D Flip-Flop">
          <SectionTag
            x={20}
            y={14}
            w={416}
            text="1) D FF → JK Flip-Flop: D = J·Q' + K'·Q"
            fill="#FEF3C7"
            stroke="#FCD34D"
            color="#B45309"
          />
          <SectionTag
            x={454}
            y={14}
            w={306}
            text="2) D FF → T Flip-Flop: D = T ⊕ Q"
            fill="#D1FAE5"
            stroke="#6EE7B7"
            color="#047857"
          />

          {/* Left: JK from D-FF */}
          <PinLabel x={36} y={90} text="J" color="#0369A1" size={13.5} />
          <PinLabel x={36} y={158} text="K" color="#BE123C" size={13.5} />
          <Wire d="M 50 90 L 122 90" color={WIRE_COLORS.signalA} />
          <Wire d="M 50 158 L 72 158" color={WIRE_COLORS.alert} />
          <GateNot x={72} y={145} w={34} h={26} />
          <Wire d="M 106 158 L 122 158" color="#7E22CE" />

          <GateAnd x={122} y={80} w={50} h={36} label="AND" />
          <GateAnd x={122} y={148} w={50} h={36} label="AND" />

          <Wire d="M 172 98 L 194 98 L 194 120 L 214 120" />
          <Wire d="M 172 166 L 194 166 L 194 140 L 214 140" />
          <GateOr x={208} y={108} w={56} h={42} label="OR" />
          <ArrowWire d="M 264 129 L 296 129" variant="main" />

          <BlockBox x={298} y={96} w={76} h={82} title="D FF" palette="ff" hasClockAtY={58} />
          <PinLabel x={362} y={114} text="Q" anchor="end" size={11.5} color="#047857" />
          <PinLabel x={362} y={160} text="Q'" anchor="end" size={11.5} color="#64748B" />
          <ArrowWire d="M 374 114 L 414 114" variant="emerald" />
          <PinLabel x={424} y={114} text="Q" color="#047857" size={13.5} />

          {/* Feedback Q -> bottom AND, Q' -> top AND */}
          <JunctionDot x={392} y={114} color={WIRE_COLORS.active} />
          <Wire d="M 392 114 L 392 222 L 106 222 L 106 174 L 122 174" color={WIRE_COLORS.active} />
          <Wire d="M 374 160 L 382 160 L 382 246 L 90 246 L 90 106 L 122 106" color="#64748B" />
          <Wire d="M 278 200 L 278 154 L 298 154" color={WIRE_COLORS.clock} />
          <PinLabel x={278} y={214} text="CLK" color="#D97706" size={11.5} />

          <line x1={444} y1={14} x2={444} y2={286} stroke="#CBD5E1" strokeWidth={1.8} strokeDasharray="6 5" />

          {/* Right: T from D-FF */}
          <PinLabel x={470} y={116} text="T" color="#047857" size={13.5} />
          <Wire d="M 486 116 L 522 116" color={WIRE_COLORS.active} />
          <GateOr x={516} y={104} w={58} h={42} xor label="XOR" />
          <ArrowWire d="M 574 125 L 610 125" variant="main" />

          <BlockBox x={612} y={96} w={76} h={82} title="D FF" palette="ff" hasClockAtY={58} />
          <ArrowWire d="M 688 114 L 732 114" variant="emerald" />
          <PinLabel x={744} y={114} text="Q" color="#047857" size={13.5} />
          <JunctionDot x={710} y={114} color={WIRE_COLORS.active} />
          <Wire d="M 710 114 L 710 218 L 496 218 L 496 134 L 522 134" color={WIRE_COLORS.active} />
          <Wire d="M 592 200 L 592 154 L 612 154" color={WIRE_COLORS.clock} />
          <PinLabel x={592} y={214} text="CLK" color="#D97706" size={11.5} />
        </LabSvgCanvas>
      );

    case 'sequential-timing-tpd':
      return (
        <LabSvgCanvas viewBox="0 0 760 320" ariaLabel="Sequential Clock Edge Sampling and Propagation Delay t_pd">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? 'Clock Edge Sampling & Propagation Delay (t_su, t_h, t_pd) + Feedback Loop'
                : 'Saat Kenarı Örnekleme ve Yayılma Gecikmesi (t_su, t_h, t_pd) + Geri Besleme Döngüsü'
            }
            fill="#FEF3C7"
            stroke="#FCD34D"
            color="#B45309"
          />

          {/* Top loop */}
          <PinLabel x={44} y={76} text="Inputs (x)" color="#0369A1" size={12.5} />
          <ArrowWire d="M 80 76 L 114 76" variant="blue" />
          <BlockBox
            x={116}
            y={50}
            w={164}
            h={64}
            title="Next-State Logic"
            subtitle={isEn ? 'Combinational Logic' : 'Kombinasyonel Devre'}
            palette="and"
          />
          <ArrowWire d="M 280 82 L 386 82" variant="main" />
          <PinLabel x={333} y={66} text="D = Q(t+1)" size={12} />
          <BlockBox x={388} y={50} w={104} h={64} title="Flip-Flop" subtitle="CLK ↑" palette="ff" hasClockAtY={46} />
          <ArrowWire d="M 492 82 L 664 82" variant="emerald" />
          <PinLabel x={682} y={82} text="Q" anchor="start" color="#047857" size={13.5} />
          <JunctionDot x={560} y={82} color={WIRE_COLORS.active} />
          <ArrowWire d="M 560 82 L 560 134 L 96 134 L 96 96 L 114 96" variant="emerald" />
          <PinLabel
            x={338}
            y={146}
            text={isEn ? 'Present State Feedback: Q(t)' : 'Mevcut Durum Geri Beslemesi: Q(t)'}
            color="#047857"
            size={11.5}
          />

          {/* Bottom Timing Waveform */}
          <PinLabel x={34} y={194} anchor="start" text="CLK ↑" color="#D97706" size={12.5} />
          <path
            d="M 104 206 L 230 206 L 230 176 L 440 176 L 440 206 L 690 206"
            fill="none"
            stroke="#D97706"
            strokeWidth={2.6}
          />
          <line x1={230} y1={170} x2={230} y2={304} stroke="#D97706" strokeDasharray="4 4" strokeWidth={1.6} />

          {/* Setup / Hold Window highlight */}
          <rect x={196} y={220} width={54} height={36} rx={4} fill="#FEF3C7" stroke="#F59E0B" strokeDasharray="3 2" />
          <PinLabel x={196} y={214} text="t_su" color="#B45309" size={10.5} />
          <PinLabel x={252} y={214} text="t_h" color="#B45309" size={10.5} />

          <PinLabel x={34} y={240} anchor="start" text={isEn ? 'D (Input)' : 'D (Giriş)'} color="#0369A1" size={12.5} />
          <path
            d="M 104 252 L 182 252 L 190 226 L 348 226 L 356 252 L 690 252"
            fill="none"
            stroke="#0284C7"
            strokeWidth={2.6}
          />

          <PinLabel x={34} y={288} anchor="start" text={isEn ? 'Q (Output)' : 'Q (Çıkış)'} color="#047857" size={12.5} />
          <path
            d="M 104 298 L 288 298 L 296 272 L 690 272"
            fill="none"
            stroke="#059669"
            strokeWidth={2.6}
          />
          <ArrowWire d="M 230 286 L 292 286" variant="rose" />
          <PinLabel x={261} y={268} text="t_pd" color="#BE123C" size={12} />
        </LabSvgCanvas>
      );

    case 'mealy-vs-moore-arch':
      return (
        <LabSvgCanvas viewBox="0 0 780 310" ariaLabel="Mealy vs Moore State Machine Architectures">
          <SectionTag
            x={20}
            y={14}
            w={352}
            text={isEn ? 'Mealy Machine: Output = f(State, Input)' : 'Mealy Makinesi: Çıkış = f(Durum, Giriş)'}
            fill="#E0F2FE"
            stroke="#7DD3FC"
            color="#0369A1"
          />
          <SectionTag
            x={408}
            y={14}
            w={352}
            text={isEn ? 'Moore Machine: Output = f(State Only)' : 'Moore Makinesi: Çıkış = f(Yalnızca Durum)'}
            fill="#ECFDF5"
            stroke="#A7F3D0"
            color="#047857"
          />

          {/* MEALY (Left) */}
          <PinLabel x={50} y={96} text="Inputs" color="#0369A1" size={12} />
          <ArrowWire d="M 76 96 L 106 96" variant="blue" />
          <BlockBox x={108} y={66} w={74} h={64} title="Next" subtitle="Logic" palette="and" />
          <ArrowWire d="M 182 98 L 204 98" variant="main" />
          <BlockBox x={206} y={66} w={68} h={64} title="FFs" subtitle="Q(t)" palette="ff" hasClockAtY={48} />
          <ArrowWire d="M 274 98 L 296 98" variant="emerald" />
          <BlockBox x={298} y={66} w={68} h={64} title="Out" subtitle="Logic" palette="or" />
          {/* Feedback present state -> Next Logic */}
          <JunctionDot x={286} y={98} color={WIRE_COLORS.active} />
          <ArrowWire d="M 286 98 L 286 156 L 144 156 L 144 132" variant="emerald" />
          {/* Direct Mealy bypass Inputs -> Output Logic */}
          <JunctionDot x={90} y={96} color={WIRE_COLORS.alert} />
          <ArrowWire d="M 90 96 L 90 198 L 332 198 L 332 132" variant="rose" width={2.5} />
          <PinLabel
            x={210}
            y={214}
            text={isEn ? 'Direct Input Bypass (Input / Output)' : 'Doğrudan Giriş Bağlantısı (Giriş / Çıkış)'}
            color="#BE123C"
            size={11.5}
          />
          <ArrowWire d="M 332 66 L 332 46" variant="main" />
          <PinLabel x={352} y={50} text="y" color="#0F172A" size={13} />

          <line x1={390} y1={14} x2={390} y2={294} stroke="#CBD5E1" strokeWidth={1.8} strokeDasharray="6 5" />

          {/* MOORE (Right) */}
          <PinLabel x={438} y={96} text="Inputs" color="#0369A1" size={12} />
          <ArrowWire d="M 464 96 L 494 96" variant="blue" />
          <BlockBox x={496} y={66} w={74} h={64} title="Next" subtitle="Logic" palette="and" />
          <ArrowWire d="M 570 98 L 592 98" variant="main" />
          <BlockBox x={594} y={66} w={68} h={64} title="FFs" subtitle="Q(t)" palette="ff" hasClockAtY={48} />
          <ArrowWire d="M 662 98 L 684 98" variant="emerald" />
          <BlockBox x={686} y={66} w={68} h={64} title="Out" subtitle="Logic" palette="xor" />
          <JunctionDot x={674} y={98} color={WIRE_COLORS.active} />
          <ArrowWire d="M 674 98 L 674 156 L 532 156 L 532 132" variant="emerald" />
          <ArrowWire d="M 720 66 L 720 46" variant="emerald" />
          <PinLabel x={740} y={50} text="y" color="#047857" size={13} />
          <PinLabel
            x={586}
            y={214}
            text={isEn ? 'NO Direct Input Path (Fully Synchronous)' : 'Giriş Bağlantısı YOK (Tam Senkron)'}
            color="#047857"
            size={11.5}
          />

          {/* Bottom comparison badges */}
          <PinLabel
            x={196}
            y={266}
            text={isEn ? 'Faster response · Usually fewer states' : 'Daha hızlı tepki · Genelde daha az durum'}
            color="#0369A1"
            size={12}
          />
          <PinLabel
            x={586}
            y={266}
            text={isEn ? 'Glitch-free · May require +1 state' : 'Glitch geçirmez · +1 durum gerekebilir'}
            color="#047857"
            size={12}
          />
        </LabSvgCanvas>
      );

    case 'state-reduction-flow':
      return (
        <LabSvgCanvas viewBox="0 0 780 280" ariaLabel="State Reduction Flow from 5 States to 4 States">
          <SectionTag
            x={20}
            y={14}
            w={346}
            text={isEn ? 'Before: 5 States (⌈log₂5⌉ = 3 Flip-Flops)' : 'Önce: 5 Durum (⌈log₂5⌉ = 3 Flip-Flop)'}
            fill="#FFF1F2"
            stroke="#FECDD3"
            color="#BE123C"
          />
          <SectionTag
            x={414}
            y={14}
            w={346}
            text={isEn ? 'After: 4 States (⌈log₂4⌉ = 2 Flip-Flops!)' : 'Sonra: 4 Durum (⌈log₂4⌉ = 2 Flip-Flop!)'}
            fill="#ECFDF5"
            stroke="#A7F3D0"
            color="#047857"
          />

          {/* Left 5 states with S1 == S3 highlighted */}
          <StateBubble cx={92} cy={112} r={24} label="S₀" />
          <StateBubble cx={196} cy={88} r={24} label="S₁" fill="#D1FAE5" stroke="#059669" textColor="#047857" />
          <StateBubble cx={304} cy={112} r={24} label="S₂" />
          <StateBubble cx={142} cy={204} r={24} label="S₃" fill="#FFE4E6" stroke="#E11D48" textColor="#BE123C" />
          <StateBubble cx={266} cy={204} r={24} label="S₄" />

          <ArrowWire d="M 116 106 L 170 94" variant="main" />
          <ArrowWire d="M 220 94 L 278 106" variant="main" />
          <ArrowWire d="M 294 134 L 276 180" variant="main" />
          <ArrowWire d="M 242 204 L 168 204" variant="main" />
          <ArrowWire d="M 156 182 L 184 114" variant="rose" dashed both />
          <PinLabel x={200} y={150} text="S₃ ≡ S₁" color="#BE123C" size={12.5} />

          <ArrowWire d="M 358 148 L 418 148" variant="emerald" width={3} />
          <PinLabel x={388} y={130} text={isEn ? 'Merge!' : 'Ele!'} color="#047857" size={12} />

          {/* Right 4 states */}
          <StateBubble cx={486} cy={106} r={26} label="S₀" />
          <StateBubble cx={644} cy={106} r={26} label="S₁" fill="#D1FAE5" stroke="#059669" textColor="#047857" />
          <StateBubble cx={644} cy={206} r={26} label="S₂" />
          <StateBubble cx={486} cy={206} r={26} label="S₄" />

          <ArrowWire d="M 514 106 L 616 106" variant="main" />
          <ArrowWire d="M 644 134 L 644 178" variant="main" />
          <ArrowWire d="M 616 206 L 514 206" variant="main" />
          <ArrowWire d="M 486 178 L 486 134" variant="main" />
          <PinLabel x={565} y={156} text={isEn ? 'Saves 1 Flip-Flop!' : '1 Flip-Flop Tasarrufu!'} color="#047857" size={12} />
        </LabSvgCanvas>
      );

    case 'binary-vs-onehot-assignment':
      return (
        <LabSvgCanvas viewBox="0 0 780 280" ariaLabel="Binary vs One-Hot State Assignment Comparison">
          <SectionTag
            x={20}
            y={14}
            w={352}
            text={isEn ? 'Binary Encoding (4 States → 2 Flip-Flops)' : 'Binary Atama (4 Durum → 2 Flip-Flop)'}
            fill="#E0F2FE"
            stroke="#7DD3FC"
            color="#0369A1"
          />
          <SectionTag
            x={408}
            y={14}
            w={352}
            text={isEn ? 'One-Hot Encoding (4 States → 4 Flip-Flops)' : 'One-Hot Atama (4 Durum → 4 Flip-Flop)'}
            fill="#FEF3C7"
            stroke="#FCD34D"
            color="#B45309"
          />

          {/* Binary: 2 FFs + Decoder */}
          <BlockBox x={56} y={76} w={74} h={64} title="FF A" subtitle="MSB" palette="ff" hasClockAtY={46} />
          <BlockBox x={56} y={162} w={74} h={64} title="FF B" subtitle="LSB" palette="ff" hasClockAtY={46} />
          <ArrowWire d="M 130 108 L 194 108" variant="blue" />
          <ArrowWire d="M 130 194 L 194 194" variant="blue" />
          <BlockBox x={196} y={88} w={138} h={124} title="2×4 Decode" subtitle="S₀=00, S₁=01, S₂=10, S₃=11" palette="dec" />
          <PinLabel
            x={196}
            y={252}
            text={isEn ? 'Fewer Flip-Flops · Extra Decoding Logic' : 'Az Flip-Flop · Ek Çözücü Kapı'}
            color="#0369A1"
            size={12}
          />

          <line x1={390} y1={14} x2={390} y2={266} stroke="#CBD5E1" strokeWidth={1.8} strokeDasharray="6 5" />

          {/* One-Hot: 4 FFs */}
          {[
            { name: 'FF₀', code: '1000 (S₀)', y: 66 },
            { name: 'FF₁', code: '0100 (S₁)', y: 114 },
            { name: 'FF₂', code: '0010 (S₂)', y: 162 },
            { name: 'FF₃', code: '0001 (S₃)', y: 210 },
          ].map((ff) => (
            <g key={ff.name}>
              <BlockBox x={450} y={ff.y} w={118} h={36} title={ff.name} palette="ff" hasClockAtY={24} />
              <ArrowWire d={`M 568 ${ff.y + 18} L 634 ${ff.y + 18}`} variant="emerald" />
              <PinLabel x={644} y={ff.y + 18} anchor="start" text={ff.code} color="#047857" size={12} />
            </g>
          ))}
          <PinLabel
            x={586}
            y={262}
            text={isEn ? 'More Flip-Flops · Zero Decoding · Very Fast (FPGA)' : 'Çok Flip-Flop · Sıfır Çözücü · Çok Hızlı (FPGA)'}
            color="#B45309"
            size={11.5}
          />
        </LabSvgCanvas>
      );

    case 'synthesis-6step-pipeline':
      return (
        <LabSvgCanvas viewBox="0 0 780 250" ariaLabel="Mano 6-Step Sequential Circuit Synthesis Pipeline">
          <SectionTag
            x={22}
            y={14}
            w={736}
            text={
              isEn
                ? 'Mano 6-Step Synchronous Sequential Synthesis Pipeline (Spec → Hardware)'
                : 'Mano 6 Adımlı Senkron Ardışıl Devre Sentez Hattı (Spesifikasyon → Donanım)'
            }
            fill="#EDE9FE"
            stroke="#C4B5FD"
            color="#6D28D9"
          />
          {[
            { n: '1', t: 'State Diagram', s: isEn ? 'Word Spec' : 'Sözel Tanım', x: 26, p: 'dec' as const },
            { n: '2', t: 'Reduction', s: isEn ? 'Merge Equiv.' : 'Eşdeğer Ele', x: 150, p: 'and' as const },
            { n: '3', t: 'Assignment', s: '⌈log₂M⌉ FF', x: 274, p: 'mux' as const },
            { n: '4', t: 'Excitation', s: 'D / JK / T', x: 398, p: 'or' as const },
            { n: '5', t: 'K-Map', s: isEn ? 'Min. Eq.' : 'Min. Denklem', x: 522, p: 'xor' as const },
            { n: '6', t: 'Schematic', s: isEn ? 'Common CLK' : 'Ortak CLK', x: 646, p: 'ff' as const },
          ].map((st, idx) => (
            <g key={st.n}>
              <BlockBox x={st.x} y={84} w={106} h={84} title={`${st.n}. ${st.t}`} subtitle={st.s} palette={st.p} />
              {idx < 5 && (
                <ArrowWire d={`M ${st.x + 106} 126 L ${st.x + 124} 126`} variant="main" />
              )}
            </g>
          ))}
          <PinLabel
            x={390}
            y={208}
            text={
              isEn
                ? 'Exact inverse of Analysis (Circuit → Table): Synthesis (Table → Circuit)'
                : 'Analiz (Devre → Tablo) yönünün tam tersi: Sentez (Tablo → Devre)'
            }
            color="#475569"
            size={12}
          />
        </LabSvgCanvas>
      );

    case 'sequence-detector-101':
      return (
        <LabSvgCanvas viewBox="0 0 780 300" ariaLabel="101 Sequence Detector: Overlapping vs Non-Overlapping">
          <SectionTag
            x={20}
            y={14}
            w={352}
            text={isEn ? "Overlapping '101' Detector: S₂ —(1/1)→ S₁" : "Overlapping (Örtüşmeli) '101': S₂ —(1/1)→ S₁"}
            fill="#ECFDF5"
            stroke="#A7F3D0"
            color="#047857"
          />
          <SectionTag
            x={408}
            y={14}
            w={352}
            text={isEn ? "Non-Overlapping '101' Detector: S₂ —(1/1)→ S₀" : "Non-Overlapping (Örtüşmesiz) '101': S₂ —(1/1)→ S₀"}
            fill="#FFF1F2"
            stroke="#FECDD3"
            color="#BE123C"
          />

          {/* LEFT: Overlapping */}
          <StateBubble cx={78} cy={146} r={24} label="S₀" sublabel="Init" />
          <StateBubble cx={196} cy={146} r={24} label="S₁" sublabel="1" fill="#E0F2FE" stroke="#0284C7" textColor="#0369A1" />
          <StateBubble cx={314} cy={146} r={24} label="S₂" sublabel="10" fill="#EDE9FE" stroke="#7C3AED" textColor="#6D28D9" />

          {/* Self loops & transitions */}
          <ArrowWire d="M 64 125 Q 78 86 92 125" variant="main" />
          <PinLabel x={78} y={92} text="0/0" size={11.5} />
          <ArrowWire d="M 182 125 Q 196 86 210 125" variant="main" />
          <PinLabel x={196} y={92} text="1/0" size={11.5} />

          <ArrowWire d="M 102 146 L 170 146" variant="blue" />
          <PinLabel x={136} y={134} text="1/0" color="#0369A1" size={11.5} />
          <ArrowWire d="M 220 146 L 288 146" variant="main" />
          <PinLabel x={254} y={134} text="0/0" size={11.5} />

          {/* S2 -> S1 (1/1) overlapping */}
          <ArrowWire d="M 304 170 Q 255 212 206 170" variant="rose" width={2.6} />
          <PinLabel x={255} y={208} text={isEn ? '1/1 (Overlap!)' : '1/1 (Örtüş!)'} color="#BE123C" size={12} />

          {/* S2 -> S0 (0/0) */}
          <ArrowWire d="M 300 168 Q 196 254 88 168" variant="main" dashed />
          <PinLabel x={196} y={238} text="0/0" size={11.5} />

          <line x1={390} y1={14} x2={390} y2={286} stroke="#CBD5E1" strokeWidth={1.8} strokeDasharray="6 5" />

          {/* RIGHT: Non-Overlapping */}
          <StateBubble cx={466} cy={146} r={24} label="S₀" sublabel="Init" />
          <StateBubble cx={584} cy={146} r={24} label="S₁" sublabel="1" fill="#E0F2FE" stroke="#0284C7" textColor="#0369A1" />
          <StateBubble cx={702} cy={146} r={24} label="S₂" sublabel="10" fill="#EDE9FE" stroke="#7C3AED" textColor="#6D28D9" />

          <ArrowWire d="M 452 125 Q 466 86 480 125" variant="main" />
          <PinLabel x={466} y={92} text="0/0" size={11.5} />
          <ArrowWire d="M 570 125 Q 584 86 598 125" variant="main" />
          <PinLabel x={584} y={92} text="1/0" size={11.5} />

          <ArrowWire d="M 490 146 L 558 146" variant="blue" />
          <PinLabel x={524} y={134} text="1/0" color="#0369A1" size={11.5} />
          <ArrowWire d="M 608 146 L 676 146" variant="main" />
          <PinLabel x={642} y={134} text="0/0" size={11.5} />

          {/* S2 -> S0 (0/0 and 1/1) */}
          <ArrowWire d="M 692 170 Q 584 234 476 170" variant="rose" width={2.6} />
          <PinLabel
            x={584}
            y={222}
            text={isEn ? '1/1  and  0/0  (Full Reset → S₀)' : '1/1  ve  0/0  (Tam Reset → S₀)'}
            color="#BE123C"
            size={12}
          />
        </LabSvgCanvas>
      );

    case 'jk-gray-counter-schematic':
      return (
        <LabSvgCanvas viewBox="0 0 760 280" ariaLabel="2-Bit Gray Code Counter with JK Flip-Flops">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? "JK Flip-Flop Synthesis: 2-Bit Gray Counter (J_A = B, K_A = B', J_B = A', K_B = A — Zero Extra Gates!)"
                : "JK Flip-Flop Sentez Örneği: 2-Bit Gray Sayıcı (J_A = B, K_A = B', J_B = A', K_B = A — Sıfır Ek Kapı!)"
            }
            fill="#FEF3C7"
            stroke="#FCD34D"
            color="#B45309"
          />

          {/* FF A (MSB) */}
          <BlockBox x={170} y={76} w={110} h={108} title="JK FF A" subtitle="MSB" palette="ff" hasClockAtY={54} />
          <PinLabel x={182} y={98} text="J_A" anchor="start" size={11.5} color="#0369A1" />
          <PinLabel x={182} y={162} text="K_A" anchor="start" size={11.5} color="#BE123C" />
          <PinLabel x={268} y={98} text="A" anchor="end" size={12} color="#047857" />
          <PinLabel x={268} y={162} text="A'" anchor="end" size={12} color="#64748B" />

          {/* FF B (LSB) */}
          <BlockBox x={470} y={76} w={110} h={108} title="JK FF B" subtitle="LSB" palette="ff" hasClockAtY={54} />
          <PinLabel x={482} y={98} text="J_B" anchor="start" size={11.5} color="#0369A1" />
          <PinLabel x={482} y={162} text="K_B" anchor="start" size={11.5} color="#BE123C" />
          <PinLabel x={568} y={98} text="B" anchor="end" size={12} color="#047857" />
          <PinLabel x={568} y={162} text="B'" anchor="end" size={12} color="#64748B" />

          {/* A -> K_B, A' -> J_B */}
          <ArrowWire d="M 280 98 L 368 98 L 368 162 L 468 162" variant="emerald" />
          <ArrowWire d="M 280 162 L 344 162 L 344 98 L 468 98" variant="main" />

          {/* B -> J_A, B' -> K_A */}
          <ArrowWire d="M 580 98 L 636 98 L 636 56 L 122 56 L 122 98 L 168 98" variant="blue" />
          <ArrowWire d="M 580 162 L 636 162 L 636 206 L 122 206 L 122 162 L 168 162" variant="rose" />

          {/* Outputs */}
          <JunctionDot x={312} y={98} color={WIRE_COLORS.active} />
          <ArrowWire d="M 312 98 L 312 40" variant="emerald" />
          <PinLabel x={312} y={30} text="A (MSB)" color="#047857" size={12} />

          <JunctionDot x={614} y={98} color={WIRE_COLORS.signalA} />
          <ArrowWire d="M 614 98 L 614 40" variant="blue" />
          <PinLabel x={614} y={30} text="B (LSB)" color="#0369A1" size={12} />

          {/* Common CLK */}
          <PinLabel x={64} y={244} text="Common CLK" color="#D97706" size={12.5} />
          <Wire d="M 114 244 L 440 244" color={WIRE_COLORS.clock} />
          <JunctionDot x={146} y={244} color={WIRE_COLORS.clock} />
          <Wire d="M 146 244 L 146 130 L 170 130" color={WIRE_COLORS.clock} />
          <Wire d="M 440 244 L 440 130 L 470 130" color={WIRE_COLORS.clock} />
        </LabSvgCanvas>
      );

    case 'parallel-load-register-4bit':
      return (
        <LabSvgCanvas viewBox="0 0 780 340" ariaLabel="4-Bit Parallel Load Register with 2x1 MUX">
          <SectionTag
            x={22}
            y={12}
            w={736}
            text={
              isEn
                ? '4-Bit Parallel-Load Register (Load=0: Hold Q_i | Load=1: Load I_i — NO Clock Gating!)'
                : 'Paralel Yüklemeli 4-Bit Register (Load=0: Q_i Korunur | Load=1: I_i Yüklenir — Clock Gating YOK!)'
            }
            fill="#EDE9FE"
            stroke="#C4B5FD"
            color="#6D28D9"
          />

          {/* Common Load line at y=58 */}
          <PinLabel x={34} y={58} anchor="start" text="Load" color="#7C3AED" size={13} />
          <Wire d="M 76 58 L 664 58" color={WIRE_COLORS.control} />

          {/* Common Clock line at y=298 */}
          <PinLabel x={34} y={298} anchor="start" text="Common CLK" color="#D97706" size={12.5} />
          <Wire d="M 118 298 L 680 298" color={WIRE_COLORS.clock} />

          {[0, 1, 2, 3].map((bit) => {
            const x = 104 + bit * 168;
            return (
              <g key={bit}>
                {/* Load select into MUX */}
                <JunctionDot x={x + 22} y={58} color={WIRE_COLORS.control} />
                <Wire d={`M ${x + 22} 58 L ${x + 22} 102`} color={WIRE_COLORS.control} />

                {/* Parallel Data I_bit into MUX bottom (1) */}
                <PinLabel x={x - 24} y={148} text={`I${bit}`} color="#0369A1" size={12.5} />
                <Wire d={`M ${x - 10} 148 L ${x} 148`} color={WIRE_COLORS.signalA} />

                {/* 2x1 MUX */}
                <MuxTrapezoid x={x} y={96} w={44} h={68} label="2×1" />
                <PinLabel x={x + 12} y={114} text="0" size={10} color="#6D28D9" />
                <PinLabel x={x + 12} y={148} text="1" size={10} color="#6D28D9" />
                <ArrowWire d={`M ${x + 44} 130 L ${x + 68} 130`} variant="main" />

                {/* D Flip-Flop */}
                <BlockBox
                  x={x + 70}
                  y={104}
                  w={62}
                  h={76}
                  title={`FF${bit}`}
                  palette="ff"
                  hasClockAtY={54}
                />
                {/* Common CLK to FF */}
                <JunctionDot x={x + 58} y={298} color={WIRE_COLORS.clock} />
                <Wire d={`M ${x + 58} 298 L ${x + 58} 158 L ${x + 70} 158`} color={WIRE_COLORS.clock} />

                {/* Q output up + feedback to MUX 0 */}
                <ArrowWire d={`M ${x + 132} 126 L ${x + 150} 126 L ${x + 150} 236`} variant="emerald" />
                <PinLabel x={x + 150} y={252} text={`A${bit}`} color="#047857" size={13.5} />
                <JunctionDot x={x + 144} y={126} color={WIRE_COLORS.active} />
                <Wire
                  d={`M ${x + 144} 126 L ${x + 144} 82 L ${x - 16} 82 L ${x - 16} 114 L ${x} 114`}
                  color={WIRE_COLORS.active}
                />
              </g>
            );
          })}
        </LabSvgCanvas>
      );

    case 'universal-shift-register-cell':
      return (
        <LabSvgCanvas viewBox="0 0 780 350" ariaLabel="4-Bit Shift Register and Universal Shift Register Cell">
          <SectionTag
            x={20}
            y={12}
            w={740}
            text={
              isEn
                ? '1) 4-Bit Serial Shift Register: SI → Q₀ → Q₁ → Q₂ → Q₃'
                : '1) 4-Bit Seri Kaydırmalı Yazmaç (Shift Register): SI → Q₀ → Q₁ → Q₂ → Q₃'
            }
            fill="#E0F2FE"
            stroke="#7DD3FC"
            color="#0369A1"
          />

          <PinLabel x={46} y={76} text="SI" color="#0369A1" size={13.5} />
          <ArrowWire d="M 62 76 L 106 76" variant="blue" />
          {[0, 1, 2, 3].map((i) => {
            const x = 108 + i * 158;
            return (
              <g key={i}>
                <BlockBox x={x} y={54} w={84} h={64} title={`FF${i}`} subtitle={`Q${i}`} palette="ff" hasClockAtY={46} />
                <ArrowWire d={`M ${x + 84} 76 L ${x + 156} 76`} variant="emerald" />
                <PinLabel x={x + 120} y={62} text={`Q${i}`} color="#047857" size={12.5} />
                <Wire d={`M ${x - 18} 134 L ${x - 18} 100 L ${x} 100`} color={WIRE_COLORS.clock} />
                <JunctionDot x={x - 18} y={134} color={WIRE_COLORS.clock} />
              </g>
            );
          })}
          <Wire d="M 90 134 L 646 134" color={WIRE_COLORS.clock} />
          <PinLabel x={52} y={134} text="CLK" color="#D97706" size={12.5} />

          {/* Bottom: Universal Shift Register Stage with 4x1 MUX */}
          <SectionTag
            x={20}
            y={156}
            w={740}
            text={
              isEn
                ? '2) Universal Shift Register Stage (S₁S₀: 00=Hold · 01=Shift R · 10=Shift L · 11=Parallel Load)'
                : '2) Universal Shift Register Bit Hücresi (S₁S₀: 00=Hold · 01=Shift R · 10=Shift L · 11=Parallel Load)'
            }
            fill="#EDE9FE"
            stroke="#C4B5FD"
            color="#6D28D9"
          />

          <PinLabel x={184} y={222} anchor="end" text={isEn ? '00: Own Qᵢ (Hold)' : '00: Kendi Qᵢ (Hold)'} color="#047857" size={11.5} />
          <PinLabel x={184} y={244} anchor="end" text={isEn ? '01: Serial In Left (Shift R)' : '01: Soldan Gelen (Shift R)'} color="#0369A1" size={11.5} />
          <PinLabel x={184} y={266} anchor="end" text={isEn ? '10: Serial In Right (Shift L)' : '10: Sağdan Gelen (Shift L)'} color="#C2410C" size={11.5} />
          <PinLabel x={184} y={288} anchor="end" text={isEn ? '11: Parallel Input (Iᵢ)' : '11: Paralel Giriş (Iᵢ)'} color="#7C3AED" size={11.5} />

          <Wire d="M 194 222 L 240 222" color={WIRE_COLORS.active} />
          <Wire d="M 194 244 L 240 244" color={WIRE_COLORS.signalA} />
          <Wire d="M 194 266 L 240 266" color={WIRE_COLORS.signalB} />
          <Wire d="M 194 288 L 240 288" color={WIRE_COLORS.control} />

          <MuxTrapezoid x={240} y={206} w={68} h={98} label="4×1 MUX" />
          <PinLabel x={274} y={326} text="S₁, S₀" color="#6D28D9" size={12.5} />
          <ArrowWire d="M 274 316 L 274 298" color={WIRE_COLORS.control} />

          <ArrowWire d="M 308 255 L 398 255" variant="main" />
          <BlockBox x={400} y={214} w={106} h={84} title="D Flip-Flop" subtitle={isEn ? 'Stage Aᵢ' : 'Hücre Aᵢ'} palette="ff" hasClockAtY={62} />
          <Wire d="M 358 312 L 358 276 L 400 276" color={WIRE_COLORS.clock} />
          <PinLabel x={358} y={326} text="CLK" color="#D97706" size={12} />

          <ArrowWire d="M 506 244 L 640 244" variant="emerald" />
          <PinLabel x={652} y={244} anchor="start" text={isEn ? 'Aᵢ (Output)' : 'Aᵢ (Çıkış)'} color="#047857" size={13.5} />
          <JunctionDot x={568} y={244} color={WIRE_COLORS.active} />
          <Wire d="M 568 244 L 568 192 L 214 192 L 214 222" color={WIRE_COLORS.active} />
        </LabSvgCanvas>
      );

    case 'ripple-counter-4bit':
      return (
        <LabSvgCanvas viewBox="0 0 780 350" ariaLabel="4-Bit Asynchronous Ripple Counter and Delay Waveforms">
          <SectionTag
            x={20}
            y={12}
            w={740}
            text={
              isEn
                ? '4-Bit Asynchronous (Ripple) Counter: T=1, Previous Q Drives Next FF Clock (↓)'
                : "4-Bit Asenkron (Ripple) Sayıcı: T=1 ve Q Çıkışları Sonraki FF'in Saatini (↓) Sürer"
            }
            fill="#FEF3C7"
            stroke="#FCD34D"
            color="#B45309"
          />
          <PinLabel x={44} y={70} text="Logic 1" color="#047857" size={12} />
          <Wire d="M 74 70 L 604 70" color={WIRE_COLORS.active} />

          {[0, 1, 2, 3].map((i) => {
            const x = 104 + i * 166;
            return (
              <g key={i}>
                <JunctionDot x={x + 42} y={70} color={WIRE_COLORS.active} />
                <Wire d={`M ${x + 42} 70 L ${x + 42} 84`} color={WIRE_COLORS.active} />
                <BlockBox x={x} y={84} w={86} h={74} title={`TFF ${i}`} subtitle="T = 1" palette="ff" hasClockAtY={48} />
                {/* Falling edge bubble */}
                <circle cx={x - 5} cy={132} r={4.2} fill="#FFFFFF" stroke="#D97706" strokeWidth={2} />
                <ArrowWire d={`M ${x + 86} 106 L ${x + 124} 106`} variant="emerald" />
                <PinLabel x={x + 114} y={90} text={`Q${i}`} color="#047857" size={13} />
                {i < 3 && (
                  <>
                    <JunctionDot x={x + 104} y={106} color={WIRE_COLORS.active} />
                    <Wire d={`M ${x + 104} 106 L ${x + 104} 132 L ${x + 157} 132`} color={WIRE_COLORS.clock} />
                  </>
                )}
              </g>
            );
          })}
          <ArrowWire d="M 38 132 L 95 132" variant="amber" />
          <PinLabel x={34} y={116} text="CLK" color="#D97706" size={12.5} />

          {/* Ripple Delay Waveforms at bottom */}
          <PinLabel
            x={390}
            y={182}
            text={isEn ? 'Cumulative Propagation Delay (N · t_pd Ripple Effect)' : 'Kümülatif Yayılım Gecikmesi (N · t_pd Ripple Effect)'}
            color="#BE123C"
            size={12}
          />
          {[
            { lbl: 'CLK', y: 214, d: 'M 100 222 L 150 222 L 150 198 L 230 198 L 230 222 L 310 222 L 310 198 L 390 198 L 390 222 L 470 222 L 470 198 L 550 198 L 550 222 L 690 222', c: '#D97706' },
            { lbl: 'Q₀ (+1 t_pd)', y: 252, d: 'M 100 260 L 244 260 L 244 236 L 404 236 L 404 260 L 564 260 L 564 236 L 690 236', c: '#0284C7' },
            { lbl: 'Q₁ (+2 t_pd)', y: 290, d: 'M 100 298 L 418 298 L 418 274 L 690 274', c: '#059669' },
            { lbl: 'Q₂ (+3 t_pd)', y: 326, d: 'M 100 334 L 434 334 L 434 312 L 690 312', c: '#E11D48' },
          ].map((w) => (
            <g key={w.lbl}>
              <PinLabel x={22} y={w.y} anchor="start" text={w.lbl} color={w.c} size={11} />
              <path d={w.d} fill="none" stroke={w.c} strokeWidth={2.4} />
            </g>
          ))}
        </LabSvgCanvas>
      );

    case 'sync-counter-4bit':
      return (
        <LabSvgCanvas viewBox="0 0 780 310" ariaLabel="4-Bit Synchronous Binary Counter with AND Enable Chain">
          <SectionTag
            x={20}
            y={12}
            w={740}
            text={
              isEn
                ? '4-Bit Synchronous Binary Counter: Common CLK + AND Chain (T₀=E, T₁=E·Q₀, T₂=E·Q₁Q₀, T₃=E·Q₂Q₁Q₀)'
                : '4-Bit Senkron İkili Sayıcı: Ortak CLK + AND Zinciri (T₀=E, T₁=E·Q₀, T₂=E·Q₁Q₀, T₃=E·Q₂Q₁Q₀)'
            }
            fill="#D1FAE5"
            stroke="#6EE7B7"
            color="#047857"
          />

          {/* Common CLK at bottom */}
          <PinLabel x={34} y={272} anchor="start" text="Common CLK" color="#D97706" size={12.5} />
          <Wire d="M 118 272 L 640 272" color={WIRE_COLORS.clock} />

          {/* Enable E */}
          <PinLabel x={34} y={102} anchor="start" text="Count E" color="#0369A1" size={12.5} />
          <Wire d="M 90 102 L 136 102" color={WIRE_COLORS.signalA} />

          {[0, 1, 2, 3].map((i) => {
            const x = 136 + i * 164;
            return (
              <g key={i}>
                <BlockBox x={x} y={80} w={76} h={72} title={`TFF ${i}`} subtitle={`T${i}`} palette="ff" hasClockAtY={52} />
                <Wire d={`M ${x - 16} 272 L ${x - 16} 132 L ${x} 132`} color={WIRE_COLORS.clock} />
                <JunctionDot x={x - 16} y={272} color={WIRE_COLORS.clock} />

                {/* Q output */}
                <ArrowWire d={`M ${x + 76} 102 L ${x + 114} 102`} variant="emerald" />
                <PinLabel x={x + 104} y={86} text={`Q${i}`} color="#047857" size={13} />

                {/* Cascaded AND gate for next stage */}
                {i < 3 && (
                  <>
                    <JunctionDot x={x + 92} y={102} color={WIRE_COLORS.active} />
                    <Wire d={`M ${x + 92} 102 L ${x + 92} 178 L ${x + 106} 178`} color={WIRE_COLORS.active} />
                    <Wire
                      d={
                        i === 0
                          ? `M 108 102 L 108 202 L ${x + 106} 202`
                          : `M ${x - 12} 190 L ${x - 12} 222 L ${x + 96} 222 L ${x + 96} 202 L ${x + 106} 202`
                      }
                      color={WIRE_COLORS.signalA}
                    />
                    {i === 0 && <JunctionDot x={108} y={102} color={WIRE_COLORS.signalA} />}
                    <GateAnd x={x + 106} y={168} w={42} h={42} label="&" />
                    <Wire d={`M ${x + 148} 189 L ${x + 156} 189 L ${x + 156} 102 L ${x + 164} 102`} color={WIRE_COLORS.signalA} />
                    {i < 2 && <JunctionDot x={x + 152} y={189} color={WIRE_COLORS.signalA} />}
                  </>
                )}
              </g>
            );
          })}
        </LabSvgCanvas>
      );

    case 'ring-vs-johnson-counter':
      return (
        <LabSvgCanvas viewBox="0 0 780 310" ariaLabel="Ring Counter vs Johnson Switch-Tail Counter">
          <SectionTag
            x={20}
            y={12}
            w={740}
            text={
              isEn
                ? "1) Ring Counter (N = 4 States: D₀ = Q₃)   vs.   2) Johnson Counter (2N = 8 States: D₀ = Q₃')"
                : "1) Ring Counter (N = 4 Durum: D₀ = Q₃)   vs.   2) Johnson Counter (2N = 8 Durum: D₀ = Q₃')"
            }
            fill="#ECFDF5"
            stroke="#A7F3D0"
            color="#047857"
          />

          {/* Top: Ring Counter (Q3 -> D0) */}
          <PinLabel x={34} y={84} anchor="start" text="Ring:" color="#0369A1" size={13} />
          {[0, 1, 2, 3].map((i) => {
            const x = 128 + i * 144;
            return (
              <g key={`ring-${i}`}>
                <BlockBox x={x} y={56} w={84} h={56} title={`FF${i}`} subtitle={`Q${i}`} palette="and" hasClockAtY={42} />
                {i < 3 && <ArrowWire d={`M ${x + 84} 76 L ${x + 142} 76`} variant="blue" />}
              </g>
            );
          })}
          <ArrowWire d="M 644 76 L 696 76 L 696 136 L 96 136 L 96 76 L 126 76" variant="blue" width={2.6} />
          <PinLabel
            x={410}
            y={124}
            text={
              isEn
                ? 'Direct Feedback: Q₃ → D₀ (1000 → 0100 → 0010 → 0001)'
                : 'Doğrudan Geri Besleme: Q₃ → D₀ (1000 → 0100 → 0010 → 0001)'
            }
            color="#0369A1"
            size={11.5}
          />

          {/* Bottom: Johnson Counter (Q3' -> D0) */}
          <PinLabel x={34} y={208} anchor="start" text="Johnson:" color="#BE123C" size={13} />
          {[0, 1, 2, 3].map((i) => {
            const x = 128 + i * 144;
            return (
              <g key={`john-${i}`}>
                <BlockBox x={x} y={180} w={84} h={56} title={`FF${i}`} subtitle={`Q${i} / Q'`} palette="ff" hasClockAtY={42} />
                {i < 3 && <ArrowWire d={`M ${x + 84} 198 L ${x + 142} 198`} variant="amber" />}
              </g>
            );
          })}
          <ArrowWire d="M 644 222 L 696 222 L 696 270 L 96 270 L 96 198 L 126 198" variant="rose" width={2.6} />
          <PinLabel
            x={410}
            y={258}
            text={
              isEn
                ? "Inverted Feedback: Q₃' → D₀ (0000 → 1000 → 1100 → 1110 → 1111 → ...)"
                : "Terslenmiş Geri Besleme: Q₃' → D₀ (0000 → 1000 → 1100 → 1110 → 1111 → ...)"
            }
            color="#BE123C"
            size={11.5}
          />
        </LabSvgCanvas>
      );

    case 'ram-cell-1bit':
      return (
        <LabSvgCanvas viewBox="0 0 760 310" ariaLabel="1-Bit Binary RAM Cell (Mano Fig. 7.5)">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? "1-Bit Binary RAM Cell Internal Logic (Select · Read/Write' Control + SR Latch)"
                : "1-Bit Binary RAM Hücresi İç Yapısı (Select · Read/Write' Kontrolü + SR Latch)"
            }
            fill="#E0E7FF"
            stroke="#A5B4FC"
            color="#3730A3"
          />
          <PinLabel x={46} y={76} text="Select" color="#7C3AED" size={12.5} />
          <Wire d="M 78 76 L 548 76" color={WIRE_COLORS.control} />

          <PinLabel x={46} y={118} text="R/W'" color="#C2410C" size={12.5} />
          <Wire d="M 78 118 L 146 118" color={WIRE_COLORS.signalB} />
          <JunctionDot x={118} y={118} color={WIRE_COLORS.signalB} />
          <Wire d="M 118 118 L 118 264 L 548 264" color={WIRE_COLORS.signalB} />
          {/* NOT on R/W' -> Write Enable */}
          <GateNot x={146} y={104} w={36} h={28} />
          <Wire d="M 182 118 L 214 118 L 214 188" color="#7E22CE" />

          <PinLabel x={46} y={184} text="Data In" color="#0369A1" size={12.5} />
          <Wire d="M 80 184 L 244 184" color={WIRE_COLORS.signalA} />
          <JunctionDot x={142} y={184} color={WIRE_COLORS.signalA} />
          <Wire d="M 142 184 L 142 224 L 164 224" color={WIRE_COLORS.signalA} />
          <GateNot x={164} y={210} w={34} h={26} />
          <Wire d="M 198 223 L 244 223" color="#7E22CE" />

          {/* Write gating ANDs */}
          <JunctionDot x={230} y={76} color={WIRE_COLORS.control} />
          <Wire d="M 230 76 L 230 206 L 244 206" color={WIRE_COLORS.control} />
          <JunctionDot x={214} y={118} color="#7E22CE" />
          <Wire d="M 214 118 L 214 166 L 244 166" color="#7E22CE" />
          <Wire d="M 214 188 L 244 188" color="#7E22CE" />

          <GateAnd x={244} y={154} w={52} h={38} label="AND" />
          <GateAnd x={244} y={198} w={52} h={38} label="AND" />

          <ArrowWire d="M 296 173 L 352 173" variant="main" />
          <ArrowWire d="M 296 217 L 352 217" variant="main" />

          {/* SR Latch core */}
          <BlockBox x={354} y={154} w={118} h={82} title="SR Latch" subtitle={isEn ? '1-Bit Storage' : '1-Bit Hafıza'} palette="ff" />
          <PinLabel x={368} y={173} text="S" anchor="start" size={11.5} color="#B45309" />
          <PinLabel x={368} y={217} text="R" anchor="start" size={11.5} color="#B45309" />
          <PinLabel x={458} y={195} text="Q" anchor="end" size={12} color="#047857" />

          {/* Read output AND gate */}
          <Wire d="M 472 195 L 548 195" color={WIRE_COLORS.active} />
          <Wire d="M 548 76 L 548 182" color={WIRE_COLORS.control} />
          <Wire d="M 548 264 L 548 208" color={WIRE_COLORS.signalB} />
          <GateAnd x={548} y={174} w={62} h={42} label="AND3" />
          <ArrowWire d="M 610 195 L 672 195" variant="emerald" />
          <PinLabel x={684} y={195} anchor="start" text="Data Out" color="#047857" size={13} />
        </LabSvgCanvas>
      );

    case 'memory-block-diagram':
      return (
        <LabSvgCanvas viewBox="0 0 760 280" ariaLabel="2^k x n Memory Block Diagram">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? '2ᵏ × n Memory Block Diagram (k-Bit Address → Address Decoder → 2ᵏ Words × n Bits)'
                : '2ᵏ × n Bellek Blok Şeması (k-Bit Adres → Adres Decoder → 2ᵏ Kelime × n Bit Matris)'
            }
            fill="#E0E7FF"
            stroke="#A5B4FC"
            color="#3730A3"
          />
          <PinLabel x={58} y={120} text="k-bit Address" color="#0369A1" size={12.5} />
          <ArrowWire d="M 108 120 L 166 120" variant="blue" width={3} />
          <BlockBox x={168} y={82} w={132} h={84} title="k × 2ᵏ" subtitle="Address Decoder" palette="dec" />

          <ArrowWire d="M 300 100 L 366 100" variant="main" />
          <ArrowWire d="M 300 124 L 366 124" variant="main" />
          <ArrowWire d="M 300 148 L 366 148" variant="main" />
          <PinLabel x={333} y={82} text={isEn ? '2ᵏ words' : '2ᵏ kelime'} color="#0F766E" size={11} />

          <BlockBox
            x={368}
            y={66}
            w={214}
            h={134}
            title={isEn ? 'Memory Array' : 'Bellek Matrisi'}
            subtitle="2ᵏ Words × n Bits"
            palette="mem"
          />

          <ArrowWire d="M 582 132 L 668 132" variant="emerald" width={3} both />
          <PinLabel x={680} y={132} anchor="start" text="n-bit Data" color="#047857" size={13} />

          {/* Control signals at bottom */}
          <ArrowWire d="M 430 236 L 430 202" variant="amber" />
          <PinLabel x={430} y={252} text="Read / Write'" color="#B45309" size={12} />
          <ArrowWire d="M 526 236 L 526 202" variant="main" />
          <PinLabel x={526} y={252} text="Memory Enable (CS)" color="#334155" size={12} />
        </LabSvgCanvas>
      );

    case 'rom-4x4-matrix':
      return (
        <LabSvgCanvas viewBox="0 0 760 320" ariaLabel="4 x 4 ROM Internal Decoder and Fuse Matrix">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? '4 × 4 ROM Internal Structure: 2×4 Decoder (Fixed AND) + Programmable OR Fuse Matrix'
                : '4 × 4 ROM İç Yapısı: 2×4 Decoder (Sabit AND) + Programlanabilir OR Sigorta Matrisi'
            }
            fill="#CCFBF1"
            stroke="#5EEAD4"
            color="#0F766E"
          />

          <PinLabel x={48} y={118} text="A₁" color="#0369A1" size={13.5} />
          <PinLabel x={48} y={158} text="A₀" color="#C2410C" size={13.5} />
          <ArrowWire d="M 66 118 L 116 118" variant="blue" />
          <ArrowWire d="M 66 158 L 116 158" color={WIRE_COLORS.signalB} />

          <BlockBox x={118} y={84} w={118} h={118} title="2×4" subtitle="Decoder" palette="dec" />

          {/* 4 horizontal word lines m0..m3 and 4 vertical bit rails -> OR gates */}
          {[0, 1, 2, 3].map((row) => {
            const y = 94 + row * 34;
            return (
              <g key={`word-${row}`}>
                <PinLabel x={256} y={y - 11} text={`m${row}`} color="#0F766E" size={11.5} />
                <Wire d={`M 236 ${y} L 610 ${y}`} color="#475569" width={2} />
              </g>
            );
          })}

          {[0, 1, 2, 3].map((col) => {
            const x = 320 + col * 78;
            return (
              <g key={`bit-${col}`}>
                <Wire d={`M ${x} 84 L ${x} 230`} color="#0284C7" width={2} />
                <g transform={`translate(${x - 20}, 230)`}>
                  <rect x={0} y={0} width={40} height={32} rx={8} fill="#FFEDD5" stroke="#EA580C" strokeWidth={2} />
                  <PinLabel x={20} y={16} text="OR" color="#C2410C" size={11} />
                </g>
                <ArrowWire d={`M ${x} 262 L ${x} 290`} variant="emerald" />
                <PinLabel x={x} y={304} text={`D${3 - col}`} color="#047857" size={13} />
              </g>
            );
          })}

          {/* Fuse dots ONLY where stored bit = 1 (example ROM contents: 1010, 0101, 1100, 0011) */}
          {[
            [0, 0], [0, 2],
            [1, 1], [1, 3],
            [2, 0], [2, 1],
            [3, 2], [3, 3],
          ].map(([r, c]) => (
            <circle
              key={`fuse-${r}-${c}`}
              cx={320 + c * 78}
              cy={94 + r * 34}
              r={5.2}
              fill="#E11D48"
              stroke="#FFFFFF"
              strokeWidth={1.4}
            />
          ))}
        </LabSvgCanvas>
      );

    case 'pld-prom-pal-pla':
      return (
        <LabSvgCanvas viewBox="0 0 780 280" ariaLabel="PROM vs PAL vs PLA Architecture Comparison">
          <SectionTag
            x={20}
            y={12}
            w={740}
            text={
              isEn
                ? 'Programmable Logic (PLD) Architecture Comparison: PROM vs. PAL vs. PLA'
                : 'Programlanabilir Lojik (PLD) Mimari Karşılaştırması: PROM vs. PAL vs. PLA'
            }
            fill="#F1F5F9"
            stroke="#CBD5E1"
            color="#1E293B"
          />
          {[
            {
              x: 24,
              title: 'PROM',
              andTitle: isEn ? 'Fixed AND' : 'Sabit AND',
              andSub: '(Decoder)',
              andPal: 'dec' as const,
              orTitle: 'Prog. OR',
              orSub: isEn ? '(Fused)' : '(Sigortalı)',
              orPal: 'or' as const,
              note: isEn ? 'All minterms decoded' : 'Tüm mintermler hazır',
            },
            {
              x: 278,
              title: 'PAL',
              andTitle: 'Prog. AND',
              andSub: isEn ? '(Products)' : '(Çarpımlar)',
              andPal: 'and' as const,
              orTitle: isEn ? 'Fixed OR' : 'Sabit OR',
              orSub: isEn ? '(Hardwired)' : '(Bağlı)',
              orPal: 'neutral' as const,
              note: isEn ? 'Fast & low cost' : 'Hızlı & düşük maliyet',
            },
            {
              x: 532,
              title: 'PLA',
              andTitle: 'Prog. AND',
              andSub: isEn ? '(Shared)' : '(Paylaşımlı)',
              andPal: 'and' as const,
              orTitle: 'Prog. OR',
              orSub: isEn ? '(Flexible)' : '(Esnek)',
              orPal: 'or' as const,
              note: isEn ? 'Most flexible architecture' : 'En esnek yapı',
            },
          ].map((col) => (
            <g key={col.title}>
              <rect
                x={col.x}
                y={52}
                width={224}
                height={208}
                rx={12}
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth={1.8}
              />
              <PinLabel x={col.x + 112} y={74} text={col.title} color="#0F172A" size={14.5} />
              <BlockBox x={col.x + 22} y={96} w={80} h={84} title={col.andTitle} subtitle={col.andSub} palette={col.andPal} />
              <ArrowWire d={`M ${col.x + 102} 138 L ${col.x + 122} 138`} variant="main" />
              <BlockBox x={col.x + 124} y={96} w={80} h={84} title={col.orTitle} subtitle={col.orSub} palette={col.orPal} />
              <PinLabel x={col.x + 112} y={214} text={col.note} color="#475569" size={11.5} />
            </g>
          ))}
        </LabSvgCanvas>
      );

    case 'fpga-clb-cell':
      return (
        <LabSvgCanvas viewBox="0 0 760 280" ariaLabel="FPGA CLB Logic Element Architecture">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? 'FPGA Logic Block (CLB / Logic Element): Look-Up Table (LUT) + D Flip-Flop + 2×1 MUX'
                : 'FPGA Mantık Bloğu (CLB / Logic Element): Look-Up Table (LUT) + D Flip-Flop + 2×1 MUX'
            }
            fill="#EDE9FE"
            stroke="#C4B5FD"
            color="#6D28D9"
          />

          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <PinLabel x={48} y={86 + i * 30} text={`I${i}`} color="#0369A1" size={12.5} />
              <ArrowWire d={`M 66 ${86 + i * 30} L 128 ${86 + i * 30}`} variant="blue" />
            </g>
          ))}

          <BlockBox
            x={130}
            y={68}
            w={144}
            h={128}
            title="4-Input LUT"
            subtitle={isEn ? '16×1 SRAM Table' : '16×1 SRAM Tablosu'}
            palette="mem"
          />

          {/* LUT output branches to D-FF and MUX input 0 */}
          <Wire d="M 274 132 L 340 132" color={WIRE_COLORS.active} />
          <JunctionDot x={312} y={132} color={WIRE_COLORS.active} />
          <Wire d="M 312 132 L 312 88 L 528 88 L 528 118 L 552 118" color={WIRE_COLORS.active} />

          <ArrowWire d="M 340 132 L 368 156" variant="main" />
          <BlockBox
            x={370}
            y={132}
            w={104}
            h={82}
            title="D Flip-Flop"
            subtitle={isEn ? 'Registered' : 'Kayıtlı Mod'}
            palette="ff"
            hasClockAtY={58}
          />
          <PinLabel x={324} y={190} text="CLK" color="#D97706" size={12} />
          <Wire d="M 342 190 L 370 190" color={WIRE_COLORS.clock} />

          <Wire d="M 474 170 L 552 170" color={WIRE_COLORS.clock} />

          <MuxTrapezoid x={552} y={102} w={54} h={86} label="2×1" />
          <PinLabel x={564} y={118} text="0" size={10.5} color="#6D28D9" />
          <PinLabel x={564} y={170} text="1" size={10.5} color="#6D28D9" />

          <ArrowWire d="M 579 216 L 579 182" color={WIRE_COLORS.control} />
          <PinLabel x={579} y={232} text="Config (Comb / Reg)" color="#6D28D9" size={11.5} />

          <ArrowWire d="M 606 145 L 682 145" variant="emerald" width={2.8} />
          <PinLabel x={694} y={145} anchor="start" text="OUT" color="#047857" size={13.5} />
        </LabSvgCanvas>
      );

    case 'rtl-datapath-control':
      return (
        <LabSvgCanvas viewBox="0 0 760 320" ariaLabel="RTL Closed-Loop Datapath and Control Unit Architecture">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? 'RTL Architecture: Closed-Loop Datapath & Control Unit (FSM)'
                : 'RTL Mimarisi: Datapath (Veri Yolu) & Control Unit (FSM) Kapalı Çevrimi'
            }
            fill="#F0F9FF"
            stroke="#BAE6FD"
            color="#0369A1"
          />

          {/* Top Datapath Block */}
          <rect x={80} y={54} width={600} height={106} rx={14} fill="#EFF6FF" stroke="#0284C7" strokeWidth={2.2} />
          <PinLabel x={380} y={72} text={isEn ? 'DATAPATH (Data Processing Unit)' : 'DATAPATH (Veri İşleme Birimi)'} color="#0369A1" size={13} />
          <BlockBox x={110} y={88} w={132} h={56} title="MUX & Bus" subtitle={isEn ? 'Data Selection' : 'Veri Seçimi'} palette="mux" />
          <ArrowWire d="M 242 116 L 298 116" variant="blue" />
          <BlockBox x={300} y={88} w={152} h={56} title="ALU / Adder" subtitle={isEn ? 'Arithmetic & Logic' : 'Aritmetik & Mantık'} palette="adder" />
          <ArrowWire d="M 452 116 L 508 116" variant="blue" />
          <BlockBox x={510} y={88} w={140} h={56} title="Registers" subtitle="R0..Rn (CLK)" palette="ff" />

          {/* Bottom Control Unit */}
          <rect x={160} y={214} width={440} height={86} rx={14} fill="#FEF3C7" stroke="#D97706" strokeWidth={2.2} />
          <PinLabel
            x={380}
            y={240}
            text={isEn ? 'CONTROL UNIT (Finite State Machine / FSM)' : 'CONTROL UNIT (Sonlu Durum Makinesi / FSM)'}
            color="#B45309"
            size={13}
          />
          <PinLabel
            x={380}
            y={266}
            text={isEn ? 'Sequences micro-operations (RTL) on each clock cycle' : 'Her saat döngüsünde mikro-işlemleri (RTL) sıralar'}
            color="#92400E"
            size={11.5}
          />

          {/* Control Signals UP, Status Flags DOWN */}
          <ArrowWire d="M 254 214 L 254 162" variant="emerald" width={2.8} />
          <PinLabel x={254} y={188} anchor="end" text="Control Signals (Load, Sel)  " color="#047857" size={11.5} />

          <ArrowWire d="M 506 160 L 506 212" variant="rose" width={2.8} />
          <PinLabel x={514} y={188} anchor="start" text="  Status Flags (Zero, Carry, Sign)" color="#BE123C" size={11.5} />
        </LabSvgCanvas>
      );

    case 'asm-chart-symbols':
      return (
        <LabSvgCanvas viewBox="0 0 760 320" ariaLabel="Algorithmic State Machine ASM Chart Symbols">
          <SectionTag
            x={22}
            y={12}
            w={716}
            text={
              isEn
                ? 'ASM Chart (Algorithmic State Machine) Core Symbols & Conditional Output Flow'
                : 'ASM Chart (Algoritmik Durum Makinesi) Temel Sembolleri ve Koşullu Çıkış Akışı'
            }
            fill="#ECFDF5"
            stroke="#A7F3D0"
            color="#047857"
          />

          {/* 1. State Box */}
          <rect x={120} y={64} width={170} height={74} rx={8} fill="#E0F2FE" stroke="#0284C7" strokeWidth={2.3} />
          <PinLabel x={102} y={76} text="T₀" color="#0369A1" size={14} />
          <PinLabel x={205} y={88} text="State Box" color="#0369A1" size={13} />
          <PinLabel x={205} y={114} text={isEn ? 'R ← 0 (Unconditional)' : 'R ← 0 (Koşulsuz)'} color="#0F172A" size={12} />
          <ArrowWire d="M 205 138 L 205 168" variant="main" />

          {/* 2. Decision Box (Diamond) */}
          <polygon
            points="205,170 296,214 205,258 114,214"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth={2.3}
          />
          <PinLabel x={205} y={204} text="Decision Box" color="#B45309" size={12} />
          <PinLabel x={205} y={224} text="Start = 1?" color="#0F172A" size={12} />

          {/* Branch 0 (left/stay) */}
          <ArrowWire d="M 114 214 L 56 214 L 56 96 L 118 96" variant="main" />
          <PinLabel x={84} y={200} text="0" color="#475569" size={13} />

          {/* Branch 1 -> Conditional Output Box (Oval/Rounded) */}
          <ArrowWire d="M 296 214 L 386 214" variant="emerald" />
          <PinLabel x={342} y={200} text="1" color="#047857" size={13} />

          <rect x={388} y={180} width={194} height={68} rx={34} fill="#D1FAE5" stroke="#059669" strokeWidth={2.3} />
          <PinLabel x={485} y={204} text="Conditional Output Box" color="#047857" size={11.5} />
          <PinLabel x={485} y={226} text="Done ← 1 (Mealy)" color="#0F172A" size={12} />

          <ArrowWire d="M 582 214 L 642 214" variant="main" />
          <rect x={644} y={184} width={92} height={60} rx={8} fill="#E0F2FE" stroke="#0284C7" strokeWidth={2.2} />
          <PinLabel x={690} y={214} text="T₁" color="#0369A1" size={14} />

          {/* Legend on right top */}
          <BlockBox
            x={388}
            y={64}
            w={348}
            h={88}
            title={isEn ? 'ASM Symbol Rules' : 'ASM Sembol Kuralı'}
            subtitle={
              isEn
                ? 'Rectangle: Moore Output | Diamond: Condition | Oval: Mealy Output'
                : 'Dikdörtgen: Moore Çıkışı | Eşkenar Dörtgen: Koşul | Oval: Mealy Çıkışı'
            }
            palette="neutral"
          />
        </LabSvgCanvas>
      );

    default:
      return null;
  }
}
