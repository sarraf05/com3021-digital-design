import type { ComponentType } from './simulator';

export type Language = 'tr' | 'en';
export type LocalizedText = string | { tr: string; en: string };

export type WidgetType =
  | 'BaseComplementVisualizer'
  | 'TruthTableBuilder'
  | 'KMapStudio'
  | 'TimingDiagramViewer'
  | 'StateMachineExplorer';

export interface WidgetConfig {
  defaultMode?: string;
  variables?: 2 | 3 | 4;
  initialValue?: string;
  initialBase?: number;
  initialMinterms?: number[];
  flipFlopType?: 'D' | 'JK' | 'T';
}

export interface VisualTableDiagram {
  kind: 'table';
  caption: LocalizedText;
  headers: LocalizedText[];
  rows: LocalizedText[][];
  highlightColumn?: number;
}

export interface PositionalBreakdownDiagram {
  kind: 'positional';
  caption: LocalizedText;
  base: number;
  digits: { symbol: string; weightLabel: LocalizedText; contribution: LocalizedText }[];
  resultLabel: LocalizedText;
}

export interface StepFlowDiagram {
  kind: 'steps';
  caption: LocalizedText;
  steps: { label: LocalizedText; detail: LocalizedText; badge?: LocalizedText }[];
}

export type VisualDiagramData =
  | VisualTableDiagram
  | PositionalBreakdownDiagram
  | StepFlowDiagram;

export interface VisualSection {
  id: string;
  title: LocalizedText;
  explanation: LocalizedText;
  keyPoints?: LocalizedText[];
  diagram?: VisualDiagramData;
  diagrams?: VisualDiagramData[];
  widget?: WidgetType;
  widgetConfig?: WidgetConfig;
  summaryRule?: LocalizedText;
  examTip?: LocalizedText;
}

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  title: LocalizedText;
  difficulty: 'Temel' | 'Orta' | 'Sınav Seviyesi';
  prompt: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  solutionSteps: { title: LocalizedText; detail: LocalizedText }[];
}

export interface TableCellSpec {
  value: LocalizedText;
  editable?: boolean;
  expected?: string;
  placeholder?: LocalizedText;
}

export interface InteractiveTableQuestion {
  id: string;
  type: 'interactive-table';
  title: LocalizedText;
  difficulty: 'Temel' | 'Orta' | 'Sınav Seviyesi';
  prompt: LocalizedText;
  headers: LocalizedText[];
  rows: TableCellSpec[][];
  solutionExplanation: LocalizedText;
}

export interface TruthTableRowExpectation {
  inputs: Record<string, 0 | 1>;
  outputs: Record<string, 0 | 1>;
}

export interface SequentialTestStep {
  inputs: Record<string, 0 | 1>;
  expectedOutputs: Record<string, 0 | 1>;
}

export interface SequentialTestConfig {
  clkLabel: string;
  steps: SequentialTestStep[];
}

export interface SimulatorBuildQuestion {
  id: string;
  type: 'simulator-build';
  title: LocalizedText;
  difficulty: 'Temel' | 'Orta' | 'Sınav Seviyesi';
  prompt: LocalizedText;
  inputs: string[];
  outputs: string[];
  allowedComponents: ComponentType[];
  maxComponents?: Partial<Record<ComponentType, number>>;
  expectedTruthTable: TruthTableRowExpectation[];
  sequentialTest?: SequentialTestConfig;
  hint: LocalizedText;
  solutionDescription: LocalizedText;
}

export type Question =
  | MultipleChoiceQuestion
  | InteractiveTableQuestion
  | SimulatorBuildQuestion;

export interface WeekModule {
  id: number;
  weekNumber: number;
  englishTitle: LocalizedText;
  turkishSubtitle: LocalizedText;
  summary: LocalizedText;
  learningObjectives: LocalizedText[];
  isPlaceholder: boolean;
  isExam?: boolean;
  recommendedWidget?: WidgetType;
  recommendedWidgetConfig?: WidgetConfig;
  visualSections: VisualSection[];
  questions: Question[];
}
