import type {
  ComponentMeta,
  ComponentType,
  MsiSubcategory,
  PinDefinition,
} from '../types/simulator';

interface MsiPinSpec {
  id: string;
  name: string;
  role?: 'data' | 'control';
}

function buildMsiMeta(config: {
  type: ComponentType;
  label: string;
  shortLabel: string;
  subcategory: MsiSubcategory;
  description: string;
  width: number;
  leftPins: MsiPinSpec[];
  rightPins: MsiPinSpec[];
}): ComponentMeta {
  const { width, leftPins, rightPins } = config;
  const maxPins = Math.max(leftPins.length, rightPins.length);
  const height = maxPins * 24 + 36;
  const topPad = 24;
  const step = 24;

  const leftStartY = topPad + (height - topPad - (leftPins.length - 1) * step) / 2;
  const rightStartY = topPad + (height - topPad - (rightPins.length - 1) * step) / 2;

  const pins: PinDefinition[] = [
    ...leftPins.map((p, idx) => ({
      id: p.id,
      name: p.name,
      direction: 'in' as const,
      relX: 0,
      relY: Math.round(leftStartY + idx * step),
      role: p.role ?? 'data',
    })),
    ...rightPins.map((p, idx) => ({
      id: p.id,
      name: p.name,
      direction: 'out' as const,
      relX: width,
      relY: Math.round(rightStartY + idx * step),
      role: p.role ?? 'data',
    })),
  ];

  return {
    type: config.type,
    label: config.label,
    shortLabel: config.shortLabel,
    category: 'MSI Bloklar',
    subcategory: config.subcategory,
    description: config.description,
    width,
    height,
    pins,
  };
}

export const MSI_SUBCATEGORIES: MsiSubcategory[] = [
  'Multiplexers (MUX)',
  'Demultiplexers (DEMUX)',
  'Decoders',
  'Encoders',
  'Aritmetik & Karşılaştırma',
];

export const COMPONENT_CATALOG: Record<ComponentType, ComponentMeta> = {
  SWITCH: {
    type: 'SWITCH',
    label: 'Toggle Switch',
    shortLabel: 'SW',
    category: 'Girişler',
    description: 'Kalıcı 0 veya 1 lojik giriş anahtarı.',
    width: 84,
    height: 48,
    pins: [{ id: 'out', name: 'OUT', direction: 'out', relX: 84, relY: 24 }],
  },
  BUTTON: {
    type: 'BUTTON',
    label: 'Push Button',
    shortLabel: 'BTN',
    category: 'Girişler',
    description: 'Basılı tutulduğunda 1, bırakıldığında 0 verir.',
    width: 84,
    height: 48,
    pins: [{ id: 'out', name: 'OUT', direction: 'out', relX: 84, relY: 24 }],
  },
  CLOCK: {
    type: 'CLOCK',
    label: 'Clock Generator',
    shortLabel: 'CLK',
    category: 'Girişler',
    description: 'Ayarlanabilir frekanslı saat darbesi ve tek-adım (Step) üreteci.',
    width: 108,
    height: 58,
    pins: [{ id: 'out', name: 'CLK', direction: 'out', relX: 108, relY: 29 }],
  },
  LED: {
    type: 'LED',
    label: 'LED Output',
    shortLabel: 'LED',
    category: 'Çıkışlar',
    description: '1 bitlik çıkışı görsel olarak gösterir.',
    width: 78,
    height: 48,
    pins: [{ id: 'in', name: 'IN', direction: 'in', relX: 0, relY: 24 }],
  },
  SEVEN_SEG: {
    type: 'SEVEN_SEG',
    label: '7-Segment Display',
    shortLabel: '7SEG',
    category: 'Çıkışlar',
    description: '4-bit BCD/Hex girişini (B3-B0) 7 segment ekranda gösterir.',
    width: 100,
    height: 112,
    pins: [
      { id: 'b3', name: 'B3', direction: 'in', relX: 0, relY: 22 },
      { id: 'b2', name: 'B2', direction: 'in', relX: 0, relY: 44 },
      { id: 'b1', name: 'B1', direction: 'in', relX: 0, relY: 66 },
      { id: 'b0', name: 'B0', direction: 'in', relX: 0, relY: 88 },
    ],
  },
  AND: {
    type: 'AND',
    label: 'AND Kapısı',
    shortLabel: 'AND',
    category: '2-Girişli Kapılar',
    description: 'Tüm girişler 1 olduğunda çıkışı 1 yapar (A · B).',
    width: 92,
    height: 56,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 16 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 40 },
      { id: 'out', name: 'Y', direction: 'out', relX: 92, relY: 28 },
    ],
  },
  OR: {
    type: 'OR',
    label: 'OR Kapısı',
    shortLabel: 'OR',
    category: '2-Girişli Kapılar',
    description: 'Girişlerden en az biri 1 olduğunda çıkışı 1 yapar (A + B).',
    width: 92,
    height: 56,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 16 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 40 },
      { id: 'out', name: 'Y', direction: 'out', relX: 92, relY: 28 },
    ],
  },
  NOT: {
    type: 'NOT',
    label: 'NOT (Inverter)',
    shortLabel: 'NOT',
    category: '2-Girişli Kapılar',
    description: 'Girişin tümleyenini alır (A\').',
    width: 84,
    height: 48,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 24 },
      { id: 'out', name: 'Y', direction: 'out', relX: 84, relY: 24 },
    ],
  },
  NAND: {
    type: 'NAND',
    label: 'NAND Kapısı',
    shortLabel: 'NAND',
    category: '2-Girişli Kapılar',
    description: 'Evrensel kapı: (A · B)\'.',
    width: 96,
    height: 56,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 16 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 40 },
      { id: 'out', name: 'Y', direction: 'out', relX: 96, relY: 28 },
    ],
  },
  NOR: {
    type: 'NOR',
    label: 'NOR Kapısı',
    shortLabel: 'NOR',
    category: '2-Girişli Kapılar',
    description: 'Evrensel kapı: (A + B)\'.',
    width: 96,
    height: 56,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 16 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 40 },
      { id: 'out', name: 'Y', direction: 'out', relX: 96, relY: 28 },
    ],
  },
  XOR: {
    type: 'XOR',
    label: 'XOR Kapısı',
    shortLabel: 'XOR',
    category: '2-Girişli Kapılar',
    description: 'Girişler farklıysa 1 verir (A ⊕ B).',
    width: 96,
    height: 56,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 16 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 40 },
      { id: 'out', name: 'Y', direction: 'out', relX: 96, relY: 28 },
    ],
  },
  XNOR: {
    type: 'XNOR',
    label: 'XNOR Kapısı',
    shortLabel: 'XNOR',
    category: '2-Girişli Kapılar',
    description: 'Eşitlik kapısı: girişler aynıysa 1 verir (A ⊙ B).',
    width: 98,
    height: 56,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 16 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 40 },
      { id: 'out', name: 'Y', direction: 'out', relX: 98, relY: 28 },
    ],
  },
  AND3: {
    type: 'AND3',
    label: '3-Girişli AND',
    shortLabel: 'AND-3',
    category: '3-Girişli Kapılar',
    description: 'Üç girişin tümü 1 olduğunda çıkışı 1 yapar (A · B · C).',
    width: 102,
    height: 84,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 18 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 42 },
      { id: 'c', name: 'C', direction: 'in', relX: 0, relY: 66 },
      { id: 'out', name: 'Y', direction: 'out', relX: 102, relY: 42 },
    ],
  },
  OR3: {
    type: 'OR3',
    label: '3-Girişli OR',
    shortLabel: 'OR-3',
    category: '3-Girişli Kapılar',
    description: 'Üç girişten en az biri 1 olduğunda çıkışı 1 yapar (A + B + C).',
    width: 102,
    height: 84,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 18 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 42 },
      { id: 'c', name: 'C', direction: 'in', relX: 0, relY: 66 },
      { id: 'out', name: 'Y', direction: 'out', relX: 102, relY: 42 },
    ],
  },
  NAND3: {
    type: 'NAND3',
    label: '3-Girişli NAND',
    shortLabel: 'NAND-3',
    category: '3-Girişli Kapılar',
    description: 'Üç girişli evrensel NAND kapısı: (A · B · C)\'.',
    width: 106,
    height: 84,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 18 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 42 },
      { id: 'c', name: 'C', direction: 'in', relX: 0, relY: 66 },
      { id: 'out', name: 'Y', direction: 'out', relX: 106, relY: 42 },
    ],
  },
  NOR3: {
    type: 'NOR3',
    label: '3-Girişli NOR',
    shortLabel: 'NOR-3',
    category: '3-Girişli Kapılar',
    description: 'Üç girişli evrensel NOR kapısı: (A + B + C)\'.',
    width: 106,
    height: 84,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 18 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 42 },
      { id: 'c', name: 'C', direction: 'in', relX: 0, relY: 66 },
      { id: 'out', name: 'Y', direction: 'out', relX: 106, relY: 42 },
    ],
  },
  XOR3: {
    type: 'XOR3',
    label: '3-Girişli XOR',
    shortLabel: 'XOR-3',
    category: '3-Girişli Kapılar',
    description: 'Tek eşlik (Odd Parity): tek sayıda giriş 1 ise çıkış 1 olur (A ⊕ B ⊕ C).',
    width: 106,
    height: 84,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 18 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 42 },
      { id: 'c', name: 'C', direction: 'in', relX: 0, relY: 66 },
      { id: 'out', name: 'Y', direction: 'out', relX: 106, relY: 42 },
    ],
  },
  XNOR3: {
    type: 'XNOR3',
    label: '3-Girişli XNOR',
    shortLabel: 'XNOR-3',
    category: '3-Girişli Kapılar',
    description: 'Çift eşlik (Even Parity): çift sayıda giriş 1 ise çıkış 1 olur (A ⊕ B ⊕ C)\'.',
    width: 108,
    height: 84,
    pins: [
      { id: 'a', name: 'A', direction: 'in', relX: 0, relY: 18 },
      { id: 'b', name: 'B', direction: 'in', relX: 0, relY: 42 },
      { id: 'c', name: 'C', direction: 'in', relX: 0, relY: 66 },
      { id: 'out', name: 'Y', direction: 'out', relX: 108, relY: 42 },
    ],
  },

  // Multiplexers (MUX)
  MUX_2X1: buildMsiMeta({
    type: 'MUX_2X1',
    label: '2x1 MUX',
    shortLabel: 'MUX 2x1',
    subcategory: 'Multiplexers (MUX)',
    description: 'Seçici S0=0 ise I0, S0=1 ise I1 çıkışa (Y) aktarılır.',
    width: 118,
    leftPins: [
      { id: 'i0', name: 'I0' },
      { id: 'i1', name: 'I1' },
      { id: 's0', name: 'S0', role: 'control' },
    ],
    rightPins: [{ id: 'y', name: 'Y' }],
  }),
  MUX_4X1: buildMsiMeta({
    type: 'MUX_4X1',
    label: '4x1 MUX',
    shortLabel: 'MUX 4x1',
    subcategory: 'Multiplexers (MUX)',
    description: '4 veri girişinden (I0..I3) birini S1S0 seçicisine göre Y çıkışına aktarır.',
    width: 122,
    leftPins: [
      { id: 'i0', name: 'I0' },
      { id: 'i1', name: 'I1' },
      { id: 'i2', name: 'I2' },
      { id: 'i3', name: 'I3' },
      { id: 's1', name: 'S1', role: 'control' },
      { id: 's0', name: 'S0', role: 'control' },
    ],
    rightPins: [{ id: 'y', name: 'Y' }],
  }),
  MUX_8X1: buildMsiMeta({
    type: 'MUX_8X1',
    label: '8x1 MUX',
    shortLabel: 'MUX 8x1',
    subcategory: 'Multiplexers (MUX)',
    description: '8 veri girişinden (I0..I7) birini S2S1S0 seçicisine göre Y çıkışına aktarır.',
    width: 124,
    leftPins: [
      { id: 'i0', name: 'I0' },
      { id: 'i1', name: 'I1' },
      { id: 'i2', name: 'I2' },
      { id: 'i3', name: 'I3' },
      { id: 'i4', name: 'I4' },
      { id: 'i5', name: 'I5' },
      { id: 'i6', name: 'I6' },
      { id: 'i7', name: 'I7' },
      { id: 's2', name: 'S2', role: 'control' },
      { id: 's1', name: 'S1', role: 'control' },
      { id: 's0', name: 'S0', role: 'control' },
    ],
    rightPins: [{ id: 'y', name: 'Y' }],
  }),

  // Demultiplexers (DEMUX)
  DEMUX_1TO2: buildMsiMeta({
    type: 'DEMUX_1TO2',
    label: '1-to-2 DEMUX',
    shortLabel: 'DMUX 1:2',
    subcategory: 'Demultiplexers (DEMUX)',
    description: 'Tek veri girişini (D) seçici S0 değerine göre Y0 veya Y1 çıkışına yönlendirir.',
    width: 120,
    leftPins: [
      { id: 'd', name: 'D' },
      { id: 's0', name: 'S0', role: 'control' },
    ],
    rightPins: [
      { id: 'y0', name: 'Y0' },
      { id: 'y1', name: 'Y1' },
    ],
  }),
  DEMUX_1TO4: buildMsiMeta({
    type: 'DEMUX_1TO4',
    label: '1-to-4 DEMUX',
    shortLabel: 'DMUX 1:4',
    subcategory: 'Demultiplexers (DEMUX)',
    description: 'D girişini S1S0 seçicisine göre 4 çıkış hattından (Y0..Y3) birine yönlendirir.',
    width: 122,
    leftPins: [
      { id: 'd', name: 'D' },
      { id: 's1', name: 'S1', role: 'control' },
      { id: 's0', name: 'S0', role: 'control' },
    ],
    rightPins: [
      { id: 'y0', name: 'Y0' },
      { id: 'y1', name: 'Y1' },
      { id: 'y2', name: 'Y2' },
      { id: 'y3', name: 'Y3' },
    ],
  }),
  DEMUX_1TO8: buildMsiMeta({
    type: 'DEMUX_1TO8',
    label: '1-to-8 DEMUX',
    shortLabel: 'DMUX 1:8',
    subcategory: 'Demultiplexers (DEMUX)',
    description: 'D girişini S2S1S0 seçicisine göre 8 çıkış hattından (Y0..Y7) birine yönlendirir.',
    width: 124,
    leftPins: [
      { id: 'd', name: 'D' },
      { id: 's2', name: 'S2', role: 'control' },
      { id: 's1', name: 'S1', role: 'control' },
      { id: 's0', name: 'S0', role: 'control' },
    ],
    rightPins: [
      { id: 'y0', name: 'Y0' },
      { id: 'y1', name: 'Y1' },
      { id: 'y2', name: 'Y2' },
      { id: 'y3', name: 'Y3' },
      { id: 'y4', name: 'Y4' },
      { id: 'y5', name: 'Y5' },
      { id: 'y6', name: 'Y6' },
      { id: 'y7', name: 'Y7' },
    ],
  }),

  // Decoders (Active-High Enable E)
  DECODER_2TO4: buildMsiMeta({
    type: 'DECODER_2TO4',
    label: '2-to-4 Decoder',
    shortLabel: 'DEC 2:4',
    subcategory: 'Decoders',
    description: 'Active-High E=1 iken (boşta E=1) A1A0 koduna göre D0..D3 minterm çıkışını 1 yapar.',
    width: 124,
    leftPins: [
      { id: 'a1', name: 'A1' },
      { id: 'a0', name: 'A0' },
      { id: 'e', name: 'E', role: 'control' },
    ],
    rightPins: [
      { id: 'd0', name: 'D0' },
      { id: 'd1', name: 'D1' },
      { id: 'd2', name: 'D2' },
      { id: 'd3', name: 'D3' },
    ],
  }),
  DECODER_3TO8: buildMsiMeta({
    type: 'DECODER_3TO8',
    label: '3-to-8 Decoder',
    shortLabel: 'DEC 3:8',
    subcategory: 'Decoders',
    description: 'Active-High E=1 iken (boşta E=1) A2A1A0 koduna göre D0..D7 minterm çıkışını 1 yapar.',
    width: 126,
    leftPins: [
      { id: 'a2', name: 'A2' },
      { id: 'a1', name: 'A1' },
      { id: 'a0', name: 'A0' },
      { id: 'e', name: 'E', role: 'control' },
    ],
    rightPins: [
      { id: 'd0', name: 'D0' },
      { id: 'd1', name: 'D1' },
      { id: 'd2', name: 'D2' },
      { id: 'd3', name: 'D3' },
      { id: 'd4', name: 'D4' },
      { id: 'd5', name: 'D5' },
      { id: 'd6', name: 'D6' },
      { id: 'd7', name: 'D7' },
    ],
  }),

  // Encoders & Priority Encoders
  ENCODER_4TO2: buildMsiMeta({
    type: 'ENCODER_4TO2',
    label: '4-to-2 Encoder',
    shortLabel: 'ENC 4:2',
    subcategory: 'Encoders',
    description: '4 aktif-1 hattan (D0..D3) gelen sinyali 2-bit ikili koda (A1A0) dönüştürür.',
    width: 120,
    leftPins: [
      { id: 'd0', name: 'D0' },
      { id: 'd1', name: 'D1' },
      { id: 'd2', name: 'D2' },
      { id: 'd3', name: 'D3' },
    ],
    rightPins: [
      { id: 'a1', name: 'A1' },
      { id: 'a0', name: 'A0' },
    ],
  }),
  ENCODER_8TO3: buildMsiMeta({
    type: 'ENCODER_8TO3',
    label: '8-to-3 Encoder',
    shortLabel: 'ENC 8:3',
    subcategory: 'Encoders',
    description: '8 aktif-1 hattan (D0..D7) gelen sinyali 3-bit ikili koda (A2A1A0) dönüştürür.',
    width: 124,
    leftPins: [
      { id: 'd0', name: 'D0' },
      { id: 'd1', name: 'D1' },
      { id: 'd2', name: 'D2' },
      { id: 'd3', name: 'D3' },
      { id: 'd4', name: 'D4' },
      { id: 'd5', name: 'D5' },
      { id: 'd6', name: 'D6' },
      { id: 'd7', name: 'D7' },
    ],
    rightPins: [
      { id: 'a2', name: 'A2' },
      { id: 'a1', name: 'A1' },
      { id: 'a0', name: 'A0' },
    ],
  }),
  PRIORITY_ENCODER_4TO2: buildMsiMeta({
    type: 'PRIORITY_ENCODER_4TO2',
    label: '4-to-2 Priority Encoder',
    shortLabel: 'PRI 4:2',
    subcategory: 'Encoders',
    description: 'Öncelik sırası D3 > D2 > D1 > D0; geçerlilik biti V = D0+D1+D2+D3 üretir.',
    width: 126,
    leftPins: [
      { id: 'd0', name: 'D0' },
      { id: 'd1', name: 'D1' },
      { id: 'd2', name: 'D2' },
      { id: 'd3', name: 'D3' },
    ],
    rightPins: [
      { id: 'a1', name: 'A1' },
      { id: 'a0', name: 'A0' },
      { id: 'v', name: 'V' },
    ],
  }),

  // Arithmetic & Comparison MSI Blocks
  HALF_ADDER: buildMsiMeta({
    type: 'HALF_ADDER',
    label: 'Half Adder',
    shortLabel: 'HA',
    subcategory: 'Aritmetik & Karşılaştırma',
    description: '2-bit yarım toplayıcı (S = A ⊕ B, C = A · B).',
    width: 114,
    leftPins: [
      { id: 'a', name: 'A' },
      { id: 'b', name: 'B' },
    ],
    rightPins: [
      { id: 's', name: 'S' },
      { id: 'c', name: 'C' },
    ],
  }),
  FULL_ADDER: buildMsiMeta({
    type: 'FULL_ADDER',
    label: 'Full Adder',
    shortLabel: 'FA',
    subcategory: 'Aritmetik & Karşılaştırma',
    description: 'Elde girişli tam toplayıcı (A, B, Cin → S, Cout).',
    width: 122,
    leftPins: [
      { id: 'a', name: 'A' },
      { id: 'b', name: 'B' },
      { id: 'cin', name: 'Cin', role: 'control' },
    ],
    rightPins: [
      { id: 's', name: 'S' },
      { id: 'cout', name: 'Cout' },
    ],
  }),
  COMPARATOR_2BIT: buildMsiMeta({
    type: 'COMPARATOR_2BIT',
    label: '2-Bit Comparator',
    shortLabel: 'CMP 2b',
    subcategory: 'Aritmetik & Karşılaştırma',
    description: '2-bit A(A1A0) ve B(B1B0) sayılarını karşılaştırarak A>B, A=B, A<B üretir.',
    width: 126,
    leftPins: [
      { id: 'a1', name: 'A1' },
      { id: 'a0', name: 'A0' },
      { id: 'b1', name: 'B1' },
      { id: 'b0', name: 'B0' },
    ],
    rightPins: [
      { id: 'gt', name: 'A>B' },
      { id: 'eq', name: 'A=B' },
      { id: 'lt', name: 'A<B' },
    ],
  }),

  // Sequential Flip-Flops
  DFF: {
    type: 'DFF',
    label: 'D Flip-Flop',
    shortLabel: 'D-FF',
    category: 'Ardışıl Elemanlar',
    description: 'Pozitif kenar tetiklemeli (↑) D Flip-Flop: Q(t+1) = D.',
    width: 114,
    height: 82,
    pins: [
      { id: 'd', name: 'D', direction: 'in', relX: 0, relY: 24 },
      { id: 'clk', name: 'CLK', direction: 'in', relX: 0, relY: 58, role: 'control' },
      { id: 'q', name: 'Q', direction: 'out', relX: 114, relY: 24 },
      { id: 'qn', name: "Q'", direction: 'out', relX: 114, relY: 58 },
    ],
  },
  JKFF: {
    type: 'JKFF',
    label: 'JK Flip-Flop',
    shortLabel: 'JK-FF',
    category: 'Ardışıl Elemanlar',
    description: 'Pozitif kenar tetiklemeli (↑) JK Flip-Flop (00:Tut, 01:Reset, 10:Set, 11:Toggle).',
    width: 118,
    height: 102,
    pins: [
      { id: 'j', name: 'J', direction: 'in', relX: 0, relY: 22 },
      { id: 'clk', name: 'CLK', direction: 'in', relX: 0, relY: 51, role: 'control' },
      { id: 'k', name: 'K', direction: 'in', relX: 0, relY: 80 },
      { id: 'q', name: 'Q', direction: 'out', relX: 118, relY: 30 },
      { id: 'qn', name: "Q'", direction: 'out', relX: 118, relY: 72 },
    ],
  },
  TFF: {
    type: 'TFF',
    label: 'T Flip-Flop',
    shortLabel: 'T-FF',
    category: 'Ardışıl Elemanlar',
    description: 'Pozitif kenar tetiklemeli (↑) T Flip-Flop: T=1 ise Q terslenir.',
    width: 114,
    height: 82,
    pins: [
      { id: 't', name: 'T', direction: 'in', relX: 0, relY: 24 },
      { id: 'clk', name: 'CLK', direction: 'in', relX: 0, relY: 58, role: 'control' },
      { id: 'q', name: 'Q', direction: 'out', relX: 114, relY: 24 },
      { id: 'qn', name: "Q'", direction: 'out', relX: 114, relY: 58 },
    ],
  },
};

export const COMPONENT_CATEGORIES = [
  'Girişler',
  'Çıkışlar',
  '2-Girişli Kapılar',
  '3-Girişli Kapılar',
  'MSI Bloklar',
  'Ardışıl Elemanlar',
] as const;

export function createDefaultNode(
  type: ComponentType,
  id: string,
  x: number,
  y: number,
  labelOverride?: string,
  locked = false
) {
  const meta = COMPONENT_CATALOG[type];
  const outputs: Record<string, 0 | 1> = {};
  const inputs: Record<string, 0 | 1> = {};
  meta.pins.forEach((pin) => {
    if (pin.direction === 'out') {
      outputs[pin.id] = pin.id === 'qn' ? 1 : 0;
    } else {
      inputs[pin.id] =
        (type === 'DECODER_2TO4' || type === 'DECODER_3TO8') && pin.id === 'e' ? 1 : 0;
    }
  });
  return {
    id,
    type,
    label: labelOverride ?? meta.shortLabel,
    x,
    y,
    outputs,
    inputs,
    internal: {
      q: 0 as const,
      prevClk: 0 as const,
      clockHz: type === 'CLOCK' ? 1 : undefined,
    },
    locked,
  };
}
