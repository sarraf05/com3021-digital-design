import type { ComponentType } from './simulator';

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
  caption: string;
  headers: string[];
  rows: string[][];
  highlightColumn?: number;
}

export interface PositionalBreakdownDiagram {
  kind: 'positional';
  caption: string;
  base: number;
  digits: { symbol: string; weightLabel: string; contribution: string }[];
  resultLabel: string;
}

export interface StepFlowDiagram {
  kind: 'steps';
  caption: string;
  steps: { label: string; detail: string; badge?: string }[];
}

export type VisualDiagramData =
  | VisualTableDiagram
  | PositionalBreakdownDiagram
  | StepFlowDiagram;

export interface VisualSection {
  id: string;
  title: string;
  explanation: string;
  keyPoints?: string[];
  diagram?: VisualDiagramData;
  diagrams?: VisualDiagramData[];
  widget?: WidgetType;
  widgetConfig?: WidgetConfig;
  examTip?: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  title: string;
  difficulty: 'Temel' | 'Orta' | 'Sınav Seviyesi';
  prompt: string;
  options: string[];
  correctIndex: number;
  solutionSteps: { title: string; detail: string }[];
}

export interface TableCellSpec {
  value: string;
  editable?: boolean;
  expected?: string;
  placeholder?: string;
}

export interface InteractiveTableQuestion {
  id: string;
  type: 'interactive-table';
  title: string;
  difficulty: 'Temel' | 'Orta' | 'Sınav Seviyesi';
  prompt: string;
  headers: string[];
  rows: TableCellSpec[][];
  solutionExplanation: string;
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
  title: string;
  difficulty: 'Temel' | 'Orta' | 'Sınav Seviyesi';
  prompt: string;
  inputs: string[];
  outputs: string[];
  allowedComponents: ComponentType[];
  maxComponents?: Partial<Record<ComponentType, number>>;
  expectedTruthTable: TruthTableRowExpectation[];
  sequentialTest?: SequentialTestConfig;
  hint: string;
  solutionDescription: string;
}

export type Question =
  | MultipleChoiceQuestion
  | InteractiveTableQuestion
  | SimulatorBuildQuestion;

export interface WeekModule {
  id: number;
  weekNumber: number;
  englishTitle: string;
  turkishSubtitle: string;
  summary: string;
  learningObjectives: string[];
  isPlaceholder: boolean;
  isExam?: boolean;
  recommendedWidget?: WidgetType;
  recommendedWidgetConfig?: WidgetConfig;
  visualSections: VisualSection[];
  questions: Question[];
}
