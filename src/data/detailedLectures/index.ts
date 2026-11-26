import type { DetailedLectureEntry } from './types';
import { DETAILED_WEEKS_1_TO_5 } from './weeks1to5';
import { DETAILED_WEEKS_6_TO_10 } from './weeks6to10';
import { DETAILED_WEEKS_11_TO_14 } from './weeks11to14';

export type {
  DetailedLectureEntry,
  DetailedTable,
  DetailedTableCell,
} from './types';

export const DETAILED_LECTURES_MAP: Record<string, DetailedLectureEntry> = {
  ...DETAILED_WEEKS_1_TO_5,
  ...DETAILED_WEEKS_6_TO_10,
  ...DETAILED_WEEKS_11_TO_14,
};

export function getDetailedLectureByCardId(
  cardId: string
): DetailedLectureEntry | undefined {
  return DETAILED_LECTURES_MAP[cardId];
}
