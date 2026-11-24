export type LogicValue = 0 | 1;

export type ComponentCategory =
  | 'Girişler'
  | 'Çıkışlar'
  | '2-Girişli Kapılar'
  | '3-Girişli Kapılar'
  | '4-Girişli Kapılar'
  | 'MSI Bloklar'
  | 'Ardışıl Elemanlar';

export type MsiSubcategory =
  | 'Multiplexers (MUX)'
  | 'Demultiplexers (DEMUX)'
  | 'Decoders'
  | 'Encoders'
  | 'Aritmetik & Karşılaştırma';

export type ComponentType =
  | 'SWITCH'
  | 'BUTTON'
  | 'CLOCK'
  | 'LED'
  | 'SEVEN_SEG'
  | 'AND'
  | 'OR'
  | 'NOT'
  | 'NAND'
  | 'NOR'
  | 'XOR'
  | 'XNOR'
  | 'AND3'
  | 'OR3'
  | 'NAND3'
  | 'NOR3'
  | 'XOR3'
  | 'XNOR3'
  | 'AND4'
  | 'OR4'
  | 'NAND4'
  | 'NOR4'
  | 'HALF_ADDER'
  | 'FULL_ADDER'
  | 'COMPARATOR_2BIT'
  | 'MUX_2X1'
  | 'MUX_4X1'
  | 'MUX_8X1'
  | 'DEMUX_1TO2'
  | 'DEMUX_1TO4'
  | 'DEMUX_1TO8'
  | 'DECODER_2TO4'
  | 'DECODER_3TO8'
  | 'IC_74155'
  | 'ENCODER_4TO2'
  | 'ENCODER_8TO3'
  | 'PRIORITY_ENCODER_4TO2'
  | 'DFF'
  | 'JKFF'
  | 'TFF'
  | 'CUSTOM_IC';

export type CustomICColor = 'mint' | 'sky' | 'coral' | 'violet' | 'amber';

export interface CustomICPin {
  id: string;
  name: string;
  nodeId: string;
}

export interface CustomICDefinition {
  id: string;
  name: string;
  color: CustomICColor;
  inputPins: CustomICPin[];
  outputPins: CustomICPin[];
  internalNodes: CircuitNode[];
  internalWires: CircuitWire[];
}

export interface PinDefinition {
  id: string;
  name: string;
  direction: 'in' | 'out';
  relX: number;
  relY: number;
  role?: 'data' | 'control';
  inverted?: boolean;
}

export interface ComponentMeta {
  type: ComponentType;
  label: string;
  shortLabel: string;
  category: ComponentCategory;
  subcategory?: MsiSubcategory;
  description: string;
  width: number;
  height: number;
  pins: PinDefinition[];
}

export interface CircuitNode {
  id: string;
  type: ComponentType;
  label: string;
  x: number;
  y: number;
  /** Output pin values (or switch/button/clock current value on pin 'out') */
  outputs: Record<string, LogicValue>;
  /** Evaluated input pin values for visual feedback */
  inputs: Record<string, LogicValue>;
  /** Custom IC identity & pin layout snapshot */
  customIcId?: string;
  customIcColor?: CustomICColor;
  customInputPins?: CustomICPin[];
  customOutputPins?: CustomICPin[];
  /** Internal state for sequential elements (q, prevClk), clock config, or isolated subcircuit state */
  internal: {
    q?: LogicValue;
    prevClk?: LogicValue;
    clockHz?: number;
    subcircuitNodes?: CircuitNode[];
    subcircuitWires?: CircuitWire[];
  };
  locked?: boolean;
}

export interface CircuitWire {
  id: string;
  fromNodeId: string;
  fromPinId: string;
  toNodeId: string;
  toPinId: string;
}

export interface CircuitChallengeConfig {
  inputs: string[];
  outputs: string[];
  allowedComponents?: ComponentType[];
  maxComponents?: Partial<Record<ComponentType, number>>;
  expectedTruthTable: {
    inputs: Record<string, LogicValue>;
    outputs: Record<string, LogicValue>;
  }[];
  sequentialTest?: {
    clkLabel: string;
    steps: {
      inputs: Record<string, LogicValue>;
      expectedOutputs: Record<string, LogicValue>;
    }[];
  };
}

export interface VerificationRowResult {
  inputs: Record<string, LogicValue>;
  expected: Record<string, LogicValue>;
  actual: Record<string, LogicValue | null>;
  match: boolean;
}

export interface VerificationResult {
  passed: boolean;
  rows: VerificationRowResult[];
  error?: string;
}
