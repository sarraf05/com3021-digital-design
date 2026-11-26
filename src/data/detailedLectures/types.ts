import type { BilingualText } from '../curriculum';

export type DetailedTableCell = string | BilingualText;

export interface DetailedTable {
  caption: BilingualText;
  headers: DetailedTableCell[];
  rows: DetailedTableCell[][];
  highlightCol?: number;
}

export interface DetailedLectureEntry {
  cardId: string;
  sectionRef: BilingualText;
  definition: {
    heading: BilingualText;
    body: BilingualText;
    formalEquation?: string;
  };
  procedure: {
    heading: BilingualText;
    steps: BilingualText[];
    table?: DetailedTable;
  };
  workedExample: {
    heading: BilingualText;
    problem: BilingualText;
    steps: BilingualText[];
    table?: DetailedTable;
    finalAnswer: BilingualText;
  };
  pitfalls: {
    heading: BilingualText;
    items: BilingualText[];
  };
}
