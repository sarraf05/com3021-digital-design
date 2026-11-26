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

export const TEXTBOOK_SECTION_PAGES: Record<string, number> = {
  '1.1': 18,
  '1.2': 21,
  '1.3': 23,
  '1.4': 26,
  '1.5': 28,
  '1.6': 34,
  '1.7': 39,
  '1.8': 48,
  '1.9': 51,
  '2.1': 59,
  '2.2': 59,
  '2.3': 60,
  '2.4': 64,
  '2.5': 67,
  '2.6': 73,
  '2.7': 82,
  '2.8': 84,
  '2.9': 90,
  '3.1': 100,
  '3.2': 100,
  '3.3': 107,
  '3.4': 112,
  '3.5': 116,
  '3.6': 119,
  '3.7': 127,
  '3.8': 132,
  '3.9': 138,
  '4.1': 165,
  '4.2': 165,
  '4.3': 166,
  '4.4': 170,
  '4.5': 173,
  '4.6': 185,
  '4.7': 187,
  '4.8': 189,
  '4.9': 192,
  '4.10': 196,
  '4.11': 199,
  '4.12': 206,
  '5.1': 263,
  '5.2': 263,
  '5.3': 265,
  '5.4': 270,
  '5.5': 278,
  '5.6': 292,
  '5.7': 317,
  '5.8': 322,
  '6.1': 343,
  '6.2': 347,
  '6.3': 355,
  '6.4': 360,
};

export function getTextbookPageForSection(sectionCode: string): number | undefined {
  const normalized = sectionCode.trim().replace(/^Sec\.\s*/i, '');
  return TEXTBOOK_SECTION_PAGES[normalized];
}

export const TEXTBOOK_ENTRIES: TextbookEntry[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    page: 18,
    chapterRef: 'Ch. 1.1–1.4',
    label: {
      tr: '1. Hafta: Sayısal Sistemler ve Sayı Sistemleri (Ch. 1.1–1.4)',
      en: 'Week 1: Digital Systems & Number Systems (Ch. 1.1–1.4)',
    },
    shortLabel: {
      tr: 'Hafta 1 · Sayısal Sistemler & Taban Dönüşümleri',
      en: 'Week 1 · Digital Systems & Number Systems',
    },
  },
  {
    id: 'week-2',
    weekNumber: 2,
    page: 28,
    chapterRef: 'Ch. 1.5–1.9',
    label: {
      tr: '2. Hafta: Tümleyenler, İşaretli Sayılar ve İkili Kodlar (Ch. 1.5–1.9)',
      en: 'Week 2: Complements, Signed Numbers & Binary Codes (Ch. 1.5–1.9)',
    },
    shortLabel: {
      tr: 'Hafta 2 · Tümleyenler, İşaretli Sayılar & Kodlar',
      en: 'Week 2 · Complements, Signed Numbers & Codes',
    },
  },
  {
    id: 'week-3',
    weekNumber: 3,
    page: 58,
    chapterRef: 'Ch. 2.1–2.4',
    label: {
      tr: '3. Hafta: Boole Cebiri Postülatları ve Teoremleri (Ch. 2.1–2.4)',
      en: 'Week 3: Boolean Algebra Postulates & Theorems (Ch. 2.1–2.4)',
    },
    shortLabel: {
      tr: 'Hafta 3 · Boole Cebiri Postülatları & Teoremleri',
      en: 'Week 3 · Boolean Algebra Postulates & Theorems',
    },
  },
  {
    id: 'week-4',
    weekNumber: 4,
    page: 67,
    chapterRef: 'Ch. 2.5–2.9',
    label: {
      tr: '4. Hafta: Boole Fonksiyonları, Kanonik Formlar ve Kapılar (Ch. 2.5–2.9)',
      en: 'Week 4: Boolean Functions, Canonical/Standard Forms & Gates (Ch. 2.5–2.9)',
    },
    shortLabel: {
      tr: 'Hafta 4 · Kanonik/Standart Formlar & Kapılar',
      en: 'Week 4 · Canonical/Standard Forms & Gates',
    },
  },
  {
    id: 'week-5',
    weekNumber: 5,
    page: 99,
    chapterRef: 'Ch. 3.1–3.3',
    label: {
      tr: '5. Hafta: Kapı Seviyesi Sadeleştirme ve K-Map (Ch. 3.1–3.3)',
      en: 'Week 5: Gate-Level Minimization & K-Maps (Ch. 3.1–3.3)',
    },
    shortLabel: {
      tr: 'Hafta 5 · Kapı Seviyesi Sadeleştirme & K-Map',
      en: 'Week 5 · Gate-Level Minimization & K-Maps',
    },
  },
  {
    id: 'week-6',
    weekNumber: 6,
    page: 112,
    chapterRef: 'Ch. 3.4–3.5',
    label: {
      tr: "6. Hafta: POS Sadeleştirme ve Don't-Care Koşulları (Ch. 3.4–3.5)",
      en: "Week 6: POS Simplification & Don't-Care Conditions (Ch. 3.4–3.5)",
    },
    shortLabel: {
      tr: "Hafta 6 · POS Sadeleştirme & Don't-Care",
      en: "Week 6 · POS Simplification & Don't-Care",
    },
  },
  {
    id: 'week-7',
    weekNumber: 7,
    page: 119,
    chapterRef: 'Ch. 3.6–3.8',
    label: {
      tr: '7. Hafta: NAND/NOR Uygulamaları ve XOR Fonksiyonu (Ch. 3.6–3.8)',
      en: 'Week 7: NAND/NOR Implementations & XOR Function (Ch. 3.6–3.8)',
    },
    shortLabel: {
      tr: 'Hafta 7 · NAND/NOR & XOR Uygulamaları',
      en: 'Week 7 · NAND/NOR & XOR Implementations',
    },
  },
  {
    id: 'week-8',
    weekNumber: 8,
    page: 164,
    chapterRef: 'Ch. 4.1–4.4',
    label: {
      tr: '8. Hafta: Birleşik Devreler, Analiz ve Tasarım Prosedürü (Ch. 4.1–4.4)',
      en: 'Week 8: Combinational Circuits, Analysis & Design (Ch. 4.1–4.4)',
    },
    shortLabel: {
      tr: 'Hafta 8 · Birleşik Devreler, Analiz & Tasarım',
      en: 'Week 8 · Combinational Circuits & Design',
    },
  },
  {
    id: 'week-9',
    weekNumber: 9,
    page: 173,
    chapterRef: 'Ch. 4.5–4.7',
    label: {
      tr: '9. Hafta: Toplayıcı-Çıkarıcı, BCD Toplayıcı ve Çarpıcı (Ch. 4.5–4.7)',
      en: 'Week 9: Binary Adder-Subtractor, Decimal Adder & Multiplier (Ch. 4.5–4.7)',
    },
    shortLabel: {
      tr: 'Hafta 9 · Adder-Subtractor, BCD Adder & Multiplier',
      en: 'Week 9 · Adder-Subtractor, BCD Adder & Multiplier',
    },
  },
  {
    id: 'week-10',
    weekNumber: 10,
    page: 189,
    chapterRef: 'Ch. 4.8–4.10',
    label: {
      tr: '10. Hafta: Karşılaştırıcı, Kod Çözücü ve Kodlayıcılar (Ch. 4.8–4.10)',
      en: 'Week 10: Magnitude Comparator, Decoders & Encoders (Ch. 4.8–4.10)',
    },
    shortLabel: {
      tr: 'Hafta 10 · Comparator, Decoders & Encoders',
      en: 'Week 10 · Comparator, Decoders & Encoders',
    },
  },
  {
    id: 'week-11',
    weekNumber: 11,
    page: 199,
    chapterRef: 'Ch. 4.11',
    label: {
      tr: '11. Hafta: Çoklayıcılar ve Üç Durumlu Kapılar (Ch. 4.11)',
      en: 'Week 11: Multiplexers & Three-State Gates (Ch. 4.11)',
    },
    shortLabel: {
      tr: 'Hafta 11 · Multiplexers & Three-State Gates',
      en: 'Week 11 · Multiplexers & Three-State Gates',
    },
  },
  {
    id: 'week-12',
    weekNumber: 12,
    page: 262,
    chapterRef: 'Ch. 5.1–5.4',
    label: {
      tr: "12. Hafta: Ardışıl Devreler, Mandallar ve Flip-Flop'lar (Ch. 5.1–5.4)",
      en: 'Week 12: Sequential Circuits, Latches & Flip-Flops (Ch. 5.1–5.4)',
    },
    shortLabel: {
      tr: "Hafta 12 · Ardışıl Devreler, Latch & Flip-Flop'lar",
      en: 'Week 12 · Sequential Circuits, Latches & Flip-Flops',
    },
  },
  {
    id: 'week-13',
    weekNumber: 13,
    page: 278,
    chapterRef: 'Ch. 5.5 & 5.7',
    label: {
      tr: '13. Hafta: Saatli Ardışıl Analiz ve Durum İndirgeme (Ch. 5.5 & 5.7)',
      en: 'Week 13: Clocked Sequential Analysis & State Reduction (Ch. 5.5 & 5.7)',
    },
    shortLabel: {
      tr: 'Hafta 13 · Saatli Ardışıl Analiz & State Reduction',
      en: 'Week 13 · Clocked Sequential Analysis & Reduction',
    },
  },
  {
    id: 'week-14',
    weekNumber: 14,
    page: 322,
    chapterRef: 'Ch. 5.8',
    label: {
      tr: '14. Hafta: Ardışıl Devre Tasarım Prosedürü (Ch. 5.8)',
      en: 'Week 14: Sequential Circuit Design Procedure (Ch. 5.8)',
    },
    shortLabel: {
      tr: 'Hafta 14 · Ardışıl Devre Tasarım Prosedürü',
      en: 'Week 14 · Sequential Circuit Design Procedure',
    },
  },
  {
    id: 'ch-6',
    weekNumber: null,
    page: 343,
    chapterRef: 'Ch. 6.1–6.4',
    label: {
      tr: 'Bölüm 6: Yazmaçlar, Kaydırmalı Yazmaçlar ve Sayıcılar (Ch. 6.1–6.4)',
      en: 'Chapter 6: Registers, Shift Registers & Counters (Ch. 6.1–6.4)',
    },
    shortLabel: {
      tr: 'Ch. 6 · Yazmaçlar & Sayıcılar',
      en: 'Ch. 6 · Registers & Counters',
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
  if (!Number.isFinite(page)) return 18;
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
