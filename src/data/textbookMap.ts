import type { Language } from '../types/curriculum';

export const BOOK_PDF_URL = '/books/digital-design-6e.pdf';
export const BOOK_MIN_PAGE = 1;
export const BOOK_TOTAL_PAGES = 712;

export interface TextbookEntry {
  id: string;
  weekNumber: number | null;
  page: number;
  chapterRef: string;
  label: Record<Language, string>;
  shortLabel: Record<Language, string>;
}

export const TEXTBOOK_ENTRIES: TextbookEntry[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    page: 25,
    chapterRef: 'Ch. 1.1–1.4',
    label: {
      tr: '1. Hafta: Sayı Sistemleri ve Taban Dönüşümleri (Ch. 1.1–1.4)',
      en: 'Week 1: Number Systems & Base Conversions (Ch. 1.1–1.4)',
    },
    shortLabel: {
      tr: 'Hafta 1 · Sayı Sistemleri & Taban Dönüşümleri',
      en: 'Week 1 · Number Systems & Base Conversions',
    },
  },
  {
    id: 'week-2',
    weekNumber: 2,
    page: 35,
    chapterRef: 'Ch. 1.5–1.9',
    label: {
      tr: '2. Hafta: Tümleyenler, İşaretli Sayılar, BCD ve Gray Kodları (Ch. 1.5–1.9)',
      en: 'Week 2: Complements, Signed Numbers, BCD & Gray Codes (Ch. 1.5–1.9)',
    },
    shortLabel: {
      tr: 'Hafta 2 · Tümleyenler, İşaretli Sayılar & Kodlar',
      en: 'Week 2 · Complements, Signed Numbers & Codes',
    },
  },
  {
    id: 'week-3',
    weekNumber: 3,
    page: 67,
    chapterRef: 'Ch. 2',
    label: {
      tr: '3. Hafta: Boole Cebiri ve Kanonik Formlar SOP/POS (Ch. 2)',
      en: 'Week 3: Boolean Algebra & Canonical SOP/POS Forms (Ch. 2)',
    },
    shortLabel: {
      tr: 'Hafta 3 · Boole Cebiri & Kanonik Formlar',
      en: 'Week 3 · Boolean Algebra & Canonical Forms',
    },
  },
  {
    id: 'week-4',
    weekNumber: 4,
    page: 107,
    chapterRef: 'Ch. 3.1–3.4',
    label: {
      tr: "4. Hafta: Karnaugh Haritaları K-Map ve Don't Care (Ch. 3.1–3.4)",
      en: "Week 4: Karnaugh Maps (K-Map) & Don't Care (Ch. 3.1–3.4)",
    },
    shortLabel: {
      tr: "Hafta 4 · K-Map & Don't Care Minimizasyonu",
      en: "Week 4 · K-Map & Don't Care Minimization",
    },
  },
  {
    id: 'week-5',
    weekNumber: 5,
    page: 131,
    chapterRef: 'Ch. 3.5–3.8',
    label: {
      tr: '5. Hafta: NAND/NOR Dönüşümleri, XOR ve Verilog (Ch. 3.5–3.8)',
      en: 'Week 5: NAND/NOR Conversions, XOR & Verilog (Ch. 3.5–3.8)',
    },
    shortLabel: {
      tr: 'Hafta 5 · NAND/NOR Dönüşümleri, XOR & Verilog',
      en: 'Week 5 · NAND/NOR Conversions, XOR & Verilog',
    },
  },
  {
    id: 'week-6',
    weekNumber: 6,
    page: 167,
    chapterRef: 'Ch. 4.1–4.5',
    label: {
      tr: '6. Hafta: Combinational Devreler, Adder ve Subtractor (Ch. 4.1–4.5)',
      en: 'Week 6: Combinational Circuits, Adder & Subtractor (Ch. 4.1–4.5)',
    },
    shortLabel: {
      tr: 'Hafta 6 · Combinational Devreler, Adder & Subtractor',
      en: 'Week 6 · Combinational Circuits, Adder & Subtractor',
    },
  },
  {
    id: 'week-7',
    weekNumber: 7,
    page: 191,
    chapterRef: 'Ch. 4.6–4.8',
    label: {
      tr: '7. Hafta: Binary Multiplier ve Magnitude Comparator (Ch. 4.6–4.8)',
      en: 'Week 7: Binary Multiplier & Magnitude Comparator (Ch. 4.6–4.8)',
    },
    shortLabel: {
      tr: 'Hafta 7 · Binary Multiplier & Magnitude Comparator',
      en: 'Week 7 · Binary Multiplier & Magnitude Comparator',
    },
  },
  {
    id: 'week-8',
    weekNumber: 8,
    page: 201,
    chapterRef: 'Ch. 4.9–4.11',
    label: {
      tr: '8. Hafta: Decoder 74138/74155, Encoder ve Multiplexer (Ch. 4.9–4.11)',
      en: 'Week 8: Decoder 74138/74155, Encoder & Multiplexer (Ch. 4.9–4.11)',
    },
    shortLabel: {
      tr: 'Hafta 8 · Decoder, Encoder & Multiplexer',
      en: 'Week 8 · Decoder, Encoder & Multiplexer',
    },
  },
  {
    id: 'week-9',
    weekNumber: 9,
    page: 241,
    chapterRef: 'Ch. 5.1–5.4',
    label: {
      tr: "9. Hafta: Ardışıl Devreler, Latch ve Flip-Flop'lar (Ch. 5.1–5.4)",
      en: 'Week 9: Sequential Circuits, Latches & Flip-Flops (Ch. 5.1–5.4)',
    },
    shortLabel: {
      tr: "Hafta 9 · Ardışıl Devreler, Latch & Flip-Flop'lar",
      en: 'Week 9 · Sequential Circuits, Latches & Flip-Flops',
    },
  },
  {
    id: 'week-10',
    weekNumber: 10,
    page: 259,
    chapterRef: 'Ch. 5.5',
    label: {
      tr: '10. Hafta: Saatli Ardışıl Devre Analizi ve Durum Diyagramları (Ch. 5.5)',
      en: 'Week 10: Clocked Sequential Analysis & State Diagrams (Ch. 5.5)',
    },
    shortLabel: {
      tr: 'Hafta 10 · Saatli Ardışıl Analiz & Durum Diyagramları',
      en: 'Week 10 · Clocked Sequential Analysis & State Diagrams',
    },
  },
  {
    id: 'week-11',
    weekNumber: 11,
    page: 271,
    chapterRef: 'Ch. 5.6–5.8',
    label: {
      tr: '11. Hafta: Durum İndirgeme (State Reduction) ve Ardışıl Tasarım (Ch. 5.6–5.8)',
      en: 'Week 11: State Reduction & Sequential Design (Ch. 5.6–5.8)',
    },
    shortLabel: {
      tr: 'Hafta 11 · State Reduction & Ardışıl Tasarım',
      en: 'Week 11 · State Reduction & Sequential Design',
    },
  },
  {
    id: 'week-12',
    weekNumber: 12,
    page: 307,
    chapterRef: 'Ch. 6.1–6.2',
    label: {
      tr: '12. Hafta: Registers ve Shift Registers (Ch. 6.1–6.2)',
      en: 'Week 12: Registers & Shift Registers (Ch. 6.1–6.2)',
    },
    shortLabel: {
      tr: 'Hafta 12 · Registers & Shift Registers',
      en: 'Week 12 · Registers & Shift Registers',
    },
  },
  {
    id: 'week-13',
    weekNumber: 13,
    page: 319,
    chapterRef: 'Ch. 6.3–6.5',
    label: {
      tr: '13. Hafta: Counters - Ripple ve Synchronous Sayıcılar (Ch. 6.3–6.5)',
      en: 'Week 13: Counters - Ripple & Synchronous Counters (Ch. 6.3–6.5)',
    },
    shortLabel: {
      tr: 'Hafta 13 · Ripple & Synchronous Sayıcılar',
      en: 'Week 13 · Ripple & Synchronous Counters',
    },
  },
  {
    id: 'week-14',
    weekNumber: 14,
    page: 359,
    chapterRef: 'Ch. 7',
    label: {
      tr: '14. Hafta: RAM, ROM, PLA, PAL ve FPGA Mimarisi (Ch. 7)',
      en: 'Week 14: RAM, ROM, PLA, PAL & FPGA Architecture (Ch. 7)',
    },
    shortLabel: {
      tr: 'Hafta 14 · RAM, ROM, PLA, PAL & FPGA',
      en: 'Week 14 · RAM, ROM, PLA, PAL & FPGA',
    },
  },
  {
    id: 'lab-74xx',
    weekNumber: null,
    page: 571,
    chapterRef: 'Ch. 9',
    label: {
      tr: "Lab Deneyleri - 74xx Serisi IC'ler (Ch. 9)",
      en: 'Lab Experiments - 74xx Series ICs (Ch. 9)',
    },
    shortLabel: {
      tr: "Lab Deneyleri · 74xx Serisi IC'ler",
      en: 'Lab Experiments · 74xx Series ICs',
    },
  },
];

export function clampBookPage(page: number): number {
  if (!Number.isFinite(page)) return 25;
  return Math.min(BOOK_TOTAL_PAGES, Math.max(BOOK_MIN_PAGE, Math.round(page)));
}

export function getTextbookEntryForWeek(weekNumber: number): TextbookEntry {
  return (
    TEXTBOOK_ENTRIES.find((entry) => entry.weekNumber === weekNumber) ??
    TEXTBOOK_ENTRIES[0]
  );
}

export function getTextbookEntryForPage(page: number): TextbookEntry {
  const exact = TEXTBOOK_ENTRIES.find((entry) => entry.page === page);
  if (exact) return exact;

  let active = TEXTBOOK_ENTRIES[0];
  for (const entry of TEXTBOOK_ENTRIES) {
    if (entry.page <= page) {
      active = entry;
    } else {
      break;
    }
  }
  return active;
}
