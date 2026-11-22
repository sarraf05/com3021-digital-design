import { createDefaultNode } from './componentCatalog';
import type { CircuitNode, CircuitWire } from '../types/simulator';

export interface CircuitPreset {
  id: string;
  name: string;
  description: string;
  nodes: CircuitNode[];
  wires: CircuitWire[];
}

export function getCircuitPresets(): CircuitPreset[] {
  // Preset 1: Half Adder from XOR + AND
  const swA = createDefaultNode('SWITCH', 'n_a', 80, 90, 'A');
  const swB = createDefaultNode('SWITCH', 'n_b', 80, 190, 'B');
  const xorGate = createDefaultNode('XOR', 'n_xor', 260, 86, 'XOR');
  const andGate = createDefaultNode('AND', 'n_and', 260, 186, 'AND');
  const ledS = createDefaultNode('LED', 'n_led_s', 450, 90, 'Sum');
  const ledC = createDefaultNode('LED', 'n_led_c', 450, 190, 'Carry');

  const haWires: CircuitWire[] = [
    { id: 'w1', fromNodeId: 'n_a', fromPinId: 'out', toNodeId: 'n_xor', toPinId: 'a' },
    { id: 'w2', fromNodeId: 'n_b', fromPinId: 'out', toNodeId: 'n_xor', toPinId: 'b' },
    { id: 'w3', fromNodeId: 'n_a', fromPinId: 'out', toNodeId: 'n_and', toPinId: 'a' },
    { id: 'w4', fromNodeId: 'n_b', fromPinId: 'out', toNodeId: 'n_and', toPinId: 'b' },
    { id: 'w5', fromNodeId: 'n_xor', fromPinId: 'out', toNodeId: 'n_led_s', toPinId: 'in' },
    { id: 'w6', fromNodeId: 'n_and', fromPinId: 'out', toNodeId: 'n_led_c', toPinId: 'in' },
  ];

  // Preset 2: 2-Bit Synchronous Counter with 7-Segment Display
  const clk = createDefaultNode('CLOCK', 'c_clk', 60, 150, 'CLK');
  const swT = createDefaultNode('SWITCH', 'c_sw1', 72, 60, 'EN=1');
  swT.outputs.out = 1;
  const tff0 = createDefaultNode('TFF', 'c_tff0', 240, 70, 'Q0');
  const tff1 = createDefaultNode('TFF', 'c_tff1', 420, 140, 'Q1');
  const seg = createDefaultNode('SEVEN_SEG', 'c_seg', 610, 80, 'HEX');

  const cntWires: CircuitWire[] = [
    { id: 'cw1', fromNodeId: 'c_sw1', fromPinId: 'out', toNodeId: 'c_tff0', toPinId: 't' },
    { id: 'cw2', fromNodeId: 'c_clk', fromPinId: 'out', toNodeId: 'c_tff0', toPinId: 'clk' },
    { id: 'cw3', fromNodeId: 'c_tff0', fromPinId: 'q', toNodeId: 'c_tff1', toPinId: 't' },
    { id: 'cw4', fromNodeId: 'c_clk', fromPinId: 'out', toNodeId: 'c_tff1', toPinId: 'clk' },
    { id: 'cw5', fromNodeId: 'c_tff0', fromPinId: 'q', toNodeId: 'c_seg', toPinId: 'b0' },
    { id: 'cw6', fromNodeId: 'c_tff1', fromPinId: 'q', toNodeId: 'c_seg', toPinId: 'b1' },
  ];

  // Preset 3: 2x1 MUX using NAND gates
  const mI0 = createDefaultNode('SWITCH', 'm_i0', 70, 60, 'I0');
  const mS = createDefaultNode('SWITCH', 'm_s', 70, 150, 'S');
  const mI1 = createDefaultNode('SWITCH', 'm_i1', 70, 240, 'I1');
  const mNot = createDefaultNode('NOT', 'm_not', 200, 100, "S'");
  const mNand1 = createDefaultNode('NAND', 'm_n1', 330, 70, 'NAND1');
  const mNand2 = createDefaultNode('NAND', 'm_n2', 330, 210, 'NAND2');
  const mNand3 = createDefaultNode('NAND', 'm_n3', 480, 140, 'NAND3');
  const mLed = createDefaultNode('LED', 'm_led', 620, 144, 'Y');

  const muxWires: CircuitWire[] = [
    { id: 'mw1', fromNodeId: 'm_i0', fromPinId: 'out', toNodeId: 'm_n1', toPinId: 'a' },
    { id: 'mw2', fromNodeId: 'm_s', fromPinId: 'out', toNodeId: 'm_not', toPinId: 'a' },
    { id: 'mw3', fromNodeId: 'm_not', fromPinId: 'out', toNodeId: 'm_n1', toPinId: 'b' },
    { id: 'mw4', fromNodeId: 'm_s', fromPinId: 'out', toNodeId: 'm_n2', toPinId: 'a' },
    { id: 'mw5', fromNodeId: 'm_i1', fromPinId: 'out', toNodeId: 'm_n2', toPinId: 'b' },
    { id: 'mw6', fromNodeId: 'm_n1', fromPinId: 'out', toNodeId: 'm_n3', toPinId: 'a' },
    { id: 'mw7', fromNodeId: 'm_n2', fromPinId: 'out', toNodeId: 'm_n3', toPinId: 'b' },
    { id: 'mw8', fromNodeId: 'm_n3', fromPinId: 'out', toNodeId: 'm_led', toPinId: 'in' },
  ];

  return [
    {
      id: 'half-adder',
      name: 'Half Adder (XOR + AND)',
      description: 'Temel kapılarla kurulmuş 1-bit yarım toplayıcı devresi.',
      nodes: [swA, swB, xorGate, andGate, ledS, ledC],
      wires: haWires,
    },
    {
      id: 'nand-mux',
      name: '2x1 MUX (NAND Yapısı)',
      description: 'Sadece NAND ve NOT kapılarıyla 2-to-1 Multiplexer devresi.',
      nodes: [mI0, mS, mI1, mNot, mNand1, mNand2, mNand3, mLed],
      wires: muxWires,
    },
    {
      id: 'tff-counter',
      name: '2-Bit Sayaç (T-FF + 7-Seg)',
      description: 'Clock ile tetiklenen T Flip-Flop sayıcı ve 7-Segment gösterge.',
      nodes: [clk, swT, tff0, tff1, seg],
      wires: cntWires,
    },
    {
      id: 'empty',
      name: 'Boş Çalışma Tuvali',
      description: 'Sıfırdan kendi dijital devrenizi tasarlayın.',
      nodes: [],
      wires: [],
    },
  ];
}
