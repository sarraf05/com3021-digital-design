import { createDefaultNode } from './componentCatalog';
import { UI_STRINGS } from '../i18n/translations';
import type { Language } from '../types/curriculum';
import type { CircuitNode, CircuitWire } from '../types/simulator';

export type PresetCategory =
  | 'arithmetic'
  | 'universal'
  | 'converters'
  | 'combinational'
  | 'sequential'
  | 'canvas';

export const PRESET_CATEGORIES: PresetCategory[] = [
  'arithmetic',
  'universal',
  'converters',
  'combinational',
  'sequential',
  'canvas',
];

export interface CircuitPreset {
  id: string;
  category: PresetCategory;
  name: string;
  shortName: string;
  description: string;
  nodes: CircuitNode[];
  wires: CircuitWire[];
}

export function getCircuitPresets(lang: Language = 'tr'): CircuitPreset[] {
  const presetCopy = UI_STRINGS[lang].simulator.presets;

  // 1. Half Adder (XOR + AND)
  const haA = createDefaultNode('SWITCH', 'ha_a', 80, 90, 'A');
  const haB = createDefaultNode('SWITCH', 'ha_b', 80, 190, 'B');
  const haXor = createDefaultNode('XOR', 'ha_xor', 260, 86, 'XOR');
  const haAnd = createDefaultNode('AND', 'ha_and', 260, 186, 'AND');
  const haLedS = createDefaultNode('LED', 'ha_led_s', 450, 90, 'Sum');
  const haLedC = createDefaultNode('LED', 'ha_led_c', 450, 190, 'Carry');
  const haWires: CircuitWire[] = [
    { id: 'haw1', fromNodeId: 'ha_a', fromPinId: 'out', toNodeId: 'ha_xor', toPinId: 'a' },
    { id: 'haw2', fromNodeId: 'ha_b', fromPinId: 'out', toNodeId: 'ha_xor', toPinId: 'b' },
    { id: 'haw3', fromNodeId: 'ha_a', fromPinId: 'out', toNodeId: 'ha_and', toPinId: 'a' },
    { id: 'haw4', fromNodeId: 'ha_b', fromPinId: 'out', toNodeId: 'ha_and', toPinId: 'b' },
    { id: 'haw5', fromNodeId: 'ha_xor', fromPinId: 'out', toNodeId: 'ha_led_s', toPinId: 'in' },
    { id: 'haw6', fromNodeId: 'ha_and', fromPinId: 'out', toNodeId: 'ha_led_c', toPinId: 'in' },
  ];

  // 2. Full Adder (2 XOR + 2 AND + 1 OR)
  const faA = createDefaultNode('SWITCH', 'fa_a', 60, 60, 'A');
  const faB = createDefaultNode('SWITCH', 'fa_b', 60, 145, 'B');
  const faCin = createDefaultNode('SWITCH', 'fa_cin', 60, 230, 'Cin');
  const faXor1 = createDefaultNode('XOR', 'fa_xor1', 210, 76, 'XOR1');
  const faAnd1 = createDefaultNode('AND', 'fa_and1', 210, 196, 'AND1');
  const faXor2 = createDefaultNode('XOR', 'fa_xor2', 380, 96, 'XOR2');
  const faAnd2 = createDefaultNode('AND', 'fa_and2', 380, 196, 'AND2');
  const faOr = createDefaultNode('OR', 'fa_or', 540, 196, 'OR');
  const faLedSum = createDefaultNode('LED', 'fa_led_sum', 690, 100, 'Sum');
  const faLedCout = createDefaultNode('LED', 'fa_led_cout', 690, 200, 'Cout');
  const faWires: CircuitWire[] = [
    { id: 'faw1', fromNodeId: 'fa_a', fromPinId: 'out', toNodeId: 'fa_xor1', toPinId: 'a' },
    { id: 'faw2', fromNodeId: 'fa_b', fromPinId: 'out', toNodeId: 'fa_xor1', toPinId: 'b' },
    { id: 'faw3', fromNodeId: 'fa_a', fromPinId: 'out', toNodeId: 'fa_and1', toPinId: 'a' },
    { id: 'faw4', fromNodeId: 'fa_b', fromPinId: 'out', toNodeId: 'fa_and1', toPinId: 'b' },
    { id: 'faw5', fromNodeId: 'fa_xor1', fromPinId: 'out', toNodeId: 'fa_xor2', toPinId: 'a' },
    { id: 'faw6', fromNodeId: 'fa_cin', fromPinId: 'out', toNodeId: 'fa_xor2', toPinId: 'b' },
    { id: 'faw7', fromNodeId: 'fa_xor1', fromPinId: 'out', toNodeId: 'fa_and2', toPinId: 'a' },
    { id: 'faw8', fromNodeId: 'fa_cin', fromPinId: 'out', toNodeId: 'fa_and2', toPinId: 'b' },
    { id: 'faw9', fromNodeId: 'fa_and2', fromPinId: 'out', toNodeId: 'fa_or', toPinId: 'a' },
    { id: 'faw10', fromNodeId: 'fa_and1', fromPinId: 'out', toNodeId: 'fa_or', toPinId: 'b' },
    { id: 'faw11', fromNodeId: 'fa_xor2', fromPinId: 'out', toNodeId: 'fa_led_sum', toPinId: 'in' },
    { id: 'faw12', fromNodeId: 'fa_or', fromPinId: 'out', toNodeId: 'fa_led_cout', toPinId: 'in' },
  ];

  // 3. Full Subtractor (2 XOR + 2 NOT + 2 AND + 1 OR)
  const fsX = createDefaultNode('SWITCH', 'fs_x', 60, 60, 'X');
  const fsY = createDefaultNode('SWITCH', 'fs_y', 60, 150, 'Y');
  const fsBin = createDefaultNode('SWITCH', 'fs_bin', 60, 240, 'Bin');
  const fsXor1 = createDefaultNode('XOR', 'fs_xor1', 210, 76, 'XOR1');
  const fsNotX = createDefaultNode('NOT', 'fs_notx', 216, 170, "X'");
  const fsXor2 = createDefaultNode('XOR', 'fs_xor2', 380, 76, 'XOR2');
  const fsNotD1 = createDefaultNode('NOT', 'fs_notd1', 386, 160, "D1'");
  const fsAnd1 = createDefaultNode('AND', 'fs_and1', 382, 240, 'AND1');
  const fsAnd2 = createDefaultNode('AND', 'fs_and2', 540, 165, 'AND2');
  const fsOr = createDefaultNode('OR', 'fs_or', 690, 205, 'OR');
  const fsLedDiff = createDefaultNode('LED', 'fs_led_diff', 840, 80, 'Diff');
  const fsLedBout = createDefaultNode('LED', 'fs_led_bout', 840, 209, 'Bout');
  const fsWires: CircuitWire[] = [
    { id: 'fsw1', fromNodeId: 'fs_x', fromPinId: 'out', toNodeId: 'fs_xor1', toPinId: 'a' },
    { id: 'fsw2', fromNodeId: 'fs_y', fromPinId: 'out', toNodeId: 'fs_xor1', toPinId: 'b' },
    { id: 'fsw3', fromNodeId: 'fs_x', fromPinId: 'out', toNodeId: 'fs_notx', toPinId: 'a' },
    { id: 'fsw4', fromNodeId: 'fs_xor1', fromPinId: 'out', toNodeId: 'fs_xor2', toPinId: 'a' },
    { id: 'fsw5', fromNodeId: 'fs_bin', fromPinId: 'out', toNodeId: 'fs_xor2', toPinId: 'b' },
    { id: 'fsw6', fromNodeId: 'fs_xor1', fromPinId: 'out', toNodeId: 'fs_notd1', toPinId: 'a' },
    { id: 'fsw7', fromNodeId: 'fs_notx', fromPinId: 'out', toNodeId: 'fs_and1', toPinId: 'a' },
    { id: 'fsw8', fromNodeId: 'fs_y', fromPinId: 'out', toNodeId: 'fs_and1', toPinId: 'b' },
    { id: 'fsw9', fromNodeId: 'fs_notd1', fromPinId: 'out', toNodeId: 'fs_and2', toPinId: 'a' },
    { id: 'fsw10', fromNodeId: 'fs_bin', fromPinId: 'out', toNodeId: 'fs_and2', toPinId: 'b' },
    { id: 'fsw11', fromNodeId: 'fs_and2', fromPinId: 'out', toNodeId: 'fs_or', toPinId: 'a' },
    { id: 'fsw12', fromNodeId: 'fs_and1', fromPinId: 'out', toNodeId: 'fs_or', toPinId: 'b' },
    { id: 'fsw13', fromNodeId: 'fs_xor2', fromPinId: 'out', toNodeId: 'fs_led_diff', toPinId: 'in' },
    { id: 'fsw14', fromNodeId: 'fs_or', fromPinId: 'out', toNodeId: 'fs_led_bout', toPinId: 'in' },
  ];

  // 4. XOR Gate using 4 NAND gates
  const nxA = createDefaultNode('SWITCH', 'nx_a', 60, 80, 'A');
  const nxB = createDefaultNode('SWITCH', 'nx_b', 60, 200, 'B');
  const nxN1 = createDefaultNode('NAND', 'nx_n1', 210, 140, 'NAND1');
  const nxN2 = createDefaultNode('NAND', 'nx_n2', 370, 76, 'NAND2');
  const nxN3 = createDefaultNode('NAND', 'nx_n3', 370, 204, 'NAND3');
  const nxN4 = createDefaultNode('NAND', 'nx_n4', 530, 140, 'NAND4');
  const nxLed = createDefaultNode('LED', 'nx_led', 685, 144, 'A⊕B');
  const nxWires: CircuitWire[] = [
    { id: 'nxw1', fromNodeId: 'nx_a', fromPinId: 'out', toNodeId: 'nx_n1', toPinId: 'a' },
    { id: 'nxw2', fromNodeId: 'nx_b', fromPinId: 'out', toNodeId: 'nx_n1', toPinId: 'b' },
    { id: 'nxw3', fromNodeId: 'nx_a', fromPinId: 'out', toNodeId: 'nx_n2', toPinId: 'a' },
    { id: 'nxw4', fromNodeId: 'nx_n1', fromPinId: 'out', toNodeId: 'nx_n2', toPinId: 'b' },
    { id: 'nxw5', fromNodeId: 'nx_n1', fromPinId: 'out', toNodeId: 'nx_n3', toPinId: 'a' },
    { id: 'nxw6', fromNodeId: 'nx_b', fromPinId: 'out', toNodeId: 'nx_n3', toPinId: 'b' },
    { id: 'nxw7', fromNodeId: 'nx_n2', fromPinId: 'out', toNodeId: 'nx_n4', toPinId: 'a' },
    { id: 'nxw8', fromNodeId: 'nx_n3', fromPinId: 'out', toNodeId: 'nx_n4', toPinId: 'b' },
    { id: 'nxw9', fromNodeId: 'nx_n4', fromPinId: 'out', toNodeId: 'nx_led', toPinId: 'in' },
  ];

  // 5. 2x1 MUX using NAND gates
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

  // 6. 4-Bit Binary -> Gray Code Converter
  const bgB3 = createDefaultNode('SWITCH', 'bg_b3', 60, 50, 'B3');
  const bgB2 = createDefaultNode('SWITCH', 'bg_b2', 60, 130, 'B2');
  const bgB1 = createDefaultNode('SWITCH', 'bg_b1', 60, 210, 'B1');
  const bgB0 = createDefaultNode('SWITCH', 'bg_b0', 60, 290, 'B0');
  const bgXor2 = createDefaultNode('XOR', 'bg_x2', 250, 100, 'XOR');
  const bgXor1 = createDefaultNode('XOR', 'bg_x1', 250, 180, 'XOR');
  const bgXor0 = createDefaultNode('XOR', 'bg_x0', 250, 260, 'XOR');
  const bgG3 = createDefaultNode('LED', 'bg_g3', 440, 50, 'G3');
  const bgG2 = createDefaultNode('LED', 'bg_g2', 440, 130, 'G2');
  const bgG1 = createDefaultNode('LED', 'bg_g1', 440, 210, 'G1');
  const bgG0 = createDefaultNode('LED', 'bg_g0', 440, 290, 'G0');
  const bgWires: CircuitWire[] = [
    { id: 'bgw1', fromNodeId: 'bg_b3', fromPinId: 'out', toNodeId: 'bg_g3', toPinId: 'in' },
    { id: 'bgw2', fromNodeId: 'bg_b3', fromPinId: 'out', toNodeId: 'bg_x2', toPinId: 'a' },
    { id: 'bgw3', fromNodeId: 'bg_b2', fromPinId: 'out', toNodeId: 'bg_x2', toPinId: 'b' },
    { id: 'bgw4', fromNodeId: 'bg_x2', fromPinId: 'out', toNodeId: 'bg_g2', toPinId: 'in' },
    { id: 'bgw5', fromNodeId: 'bg_b2', fromPinId: 'out', toNodeId: 'bg_x1', toPinId: 'a' },
    { id: 'bgw6', fromNodeId: 'bg_b1', fromPinId: 'out', toNodeId: 'bg_x1', toPinId: 'b' },
    { id: 'bgw7', fromNodeId: 'bg_x1', fromPinId: 'out', toNodeId: 'bg_g1', toPinId: 'in' },
    { id: 'bgw8', fromNodeId: 'bg_b1', fromPinId: 'out', toNodeId: 'bg_x0', toPinId: 'a' },
    { id: 'bgw9', fromNodeId: 'bg_b0', fromPinId: 'out', toNodeId: 'bg_x0', toPinId: 'b' },
    { id: 'bgw10', fromNodeId: 'bg_x0', fromPinId: 'out', toNodeId: 'bg_g0', toPinId: 'in' },
  ];

  // 7. 4-Bit Gray Code -> Binary Converter
  const gbG3 = createDefaultNode('SWITCH', 'gb_g3', 60, 50, 'G3');
  const gbG2 = createDefaultNode('SWITCH', 'gb_g2', 60, 135, 'G2');
  const gbG1 = createDefaultNode('SWITCH', 'gb_g1', 60, 220, 'G1');
  const gbG0 = createDefaultNode('SWITCH', 'gb_g0', 60, 305, 'G0');
  const gbXor2 = createDefaultNode('XOR', 'gb_x2', 230, 120, 'XOR1');
  const gbXor1 = createDefaultNode('XOR', 'gb_x1', 390, 195, 'XOR2');
  const gbXor0 = createDefaultNode('XOR', 'gb_x0', 550, 270, 'XOR3');
  const gbB3 = createDefaultNode('LED', 'gb_b3', 710, 50, 'B3');
  const gbB2 = createDefaultNode('LED', 'gb_b2', 710, 135, 'B2');
  const gbB1 = createDefaultNode('LED', 'gb_b1', 710, 220, 'B1');
  const gbB0 = createDefaultNode('LED', 'gb_b0', 710, 305, 'B0');
  const gbWires: CircuitWire[] = [
    { id: 'gbw1', fromNodeId: 'gb_g3', fromPinId: 'out', toNodeId: 'gb_b3', toPinId: 'in' },
    { id: 'gbw2', fromNodeId: 'gb_g3', fromPinId: 'out', toNodeId: 'gb_x2', toPinId: 'a' },
    { id: 'gbw3', fromNodeId: 'gb_g2', fromPinId: 'out', toNodeId: 'gb_x2', toPinId: 'b' },
    { id: 'gbw4', fromNodeId: 'gb_x2', fromPinId: 'out', toNodeId: 'gb_b2', toPinId: 'in' },
    { id: 'gbw5', fromNodeId: 'gb_x2', fromPinId: 'out', toNodeId: 'gb_x1', toPinId: 'a' },
    { id: 'gbw6', fromNodeId: 'gb_g1', fromPinId: 'out', toNodeId: 'gb_x1', toPinId: 'b' },
    { id: 'gbw7', fromNodeId: 'gb_x1', fromPinId: 'out', toNodeId: 'gb_b1', toPinId: 'in' },
    { id: 'gbw8', fromNodeId: 'gb_x1', fromPinId: 'out', toNodeId: 'gb_x0', toPinId: 'a' },
    { id: 'gbw9', fromNodeId: 'gb_g0', fromPinId: 'out', toNodeId: 'gb_x0', toPinId: 'b' },
    { id: 'gbw10', fromNodeId: 'gb_x0', fromPinId: 'out', toNodeId: 'gb_b0', toPinId: 'in' },
  ];

  // 8. BCD -> Excess-3 Converter
  const xsB3 = createDefaultNode('SWITCH', 'xs_b3', 60, 50, 'B3');
  const xsB2 = createDefaultNode('SWITCH', 'xs_b2', 60, 135, 'B2');
  const xsB1 = createDefaultNode('SWITCH', 'xs_b1', 60, 220, 'B1');
  const xsB0 = createDefaultNode('SWITCH', 'xs_b0', 60, 305, 'B0');
  const xsOrT = createDefaultNode('OR', 'xs_ort', 240, 135, 'OR1');
  const xsXnor1 = createDefaultNode('XNOR', 'xs_xnor1', 240, 220, 'XNOR');
  const xsNot0 = createDefaultNode('NOT', 'xs_not0', 246, 305, 'NOT');
  const xsXor2 = createDefaultNode('XOR', 'xs_xor2', 420, 115, 'XOR');
  const xsAndC = createDefaultNode('AND', 'xs_andc', 420, 195, 'AND');
  const xsOr3 = createDefaultNode('OR', 'xs_or3', 590, 75, 'OR2');
  const xsE3 = createDefaultNode('LED', 'xs_e3', 750, 75, 'E3');
  const xsE2 = createDefaultNode('LED', 'xs_e2', 750, 155, 'E2');
  const xsE1 = createDefaultNode('LED', 'xs_e1', 750, 235, 'E1');
  const xsE0 = createDefaultNode('LED', 'xs_e0', 750, 305, 'E0');
  const xsWires: CircuitWire[] = [
    { id: 'xsw1', fromNodeId: 'xs_b0', fromPinId: 'out', toNodeId: 'xs_not0', toPinId: 'a' },
    { id: 'xsw2', fromNodeId: 'xs_not0', fromPinId: 'out', toNodeId: 'xs_e0', toPinId: 'in' },
    { id: 'xsw3', fromNodeId: 'xs_b1', fromPinId: 'out', toNodeId: 'xs_xnor1', toPinId: 'a' },
    { id: 'xsw4', fromNodeId: 'xs_b0', fromPinId: 'out', toNodeId: 'xs_xnor1', toPinId: 'b' },
    { id: 'xsw5', fromNodeId: 'xs_xnor1', fromPinId: 'out', toNodeId: 'xs_e1', toPinId: 'in' },
    { id: 'xsw6', fromNodeId: 'xs_b1', fromPinId: 'out', toNodeId: 'xs_ort', toPinId: 'a' },
    { id: 'xsw7', fromNodeId: 'xs_b0', fromPinId: 'out', toNodeId: 'xs_ort', toPinId: 'b' },
    { id: 'xsw8', fromNodeId: 'xs_b2', fromPinId: 'out', toNodeId: 'xs_xor2', toPinId: 'a' },
    { id: 'xsw9', fromNodeId: 'xs_ort', fromPinId: 'out', toNodeId: 'xs_xor2', toPinId: 'b' },
    { id: 'xsw10', fromNodeId: 'xs_xor2', fromPinId: 'out', toNodeId: 'xs_e2', toPinId: 'in' },
    { id: 'xsw11', fromNodeId: 'xs_b2', fromPinId: 'out', toNodeId: 'xs_andc', toPinId: 'a' },
    { id: 'xsw12', fromNodeId: 'xs_ort', fromPinId: 'out', toNodeId: 'xs_andc', toPinId: 'b' },
    { id: 'xsw13', fromNodeId: 'xs_b3', fromPinId: 'out', toNodeId: 'xs_or3', toPinId: 'a' },
    { id: 'xsw14', fromNodeId: 'xs_andc', fromPinId: 'out', toNodeId: 'xs_or3', toPinId: 'b' },
    { id: 'xsw15', fromNodeId: 'xs_or3', fromPinId: 'out', toNodeId: 'xs_e3', toPinId: 'in' },
  ];

  // 9. 2x4 Decoder (Gate-Level: 2 NOT + 4 AND)
  const dcA1 = createDefaultNode('SWITCH', 'dc_a1', 60, 90, 'A1');
  const dcA0 = createDefaultNode('SWITCH', 'dc_a0', 60, 210, 'A0');
  const dcN1 = createDefaultNode('NOT', 'dc_n1', 210, 70, "A1'");
  const dcN0 = createDefaultNode('NOT', 'dc_n0', 210, 190, "A0'");
  const dcAnd0 = createDefaultNode('AND', 'dc_and0', 385, 50, 'D0');
  const dcAnd1 = createDefaultNode('AND', 'dc_and1', 385, 130, 'D1');
  const dcAnd2 = createDefaultNode('AND', 'dc_and2', 385, 210, 'D2');
  const dcAnd3 = createDefaultNode('AND', 'dc_and3', 385, 290, 'D3');
  const dcLed0 = createDefaultNode('LED', 'dc_l0', 555, 54, 'D0');
  const dcLed1 = createDefaultNode('LED', 'dc_l1', 555, 134, 'D1');
  const dcLed2 = createDefaultNode('LED', 'dc_l2', 555, 214, 'D2');
  const dcLed3 = createDefaultNode('LED', 'dc_l3', 555, 294, 'D3');
  const dcWires: CircuitWire[] = [
    { id: 'dcw1', fromNodeId: 'dc_a1', fromPinId: 'out', toNodeId: 'dc_n1', toPinId: 'a' },
    { id: 'dcw2', fromNodeId: 'dc_a0', fromPinId: 'out', toNodeId: 'dc_n0', toPinId: 'a' },
    { id: 'dcw3', fromNodeId: 'dc_n1', fromPinId: 'out', toNodeId: 'dc_and0', toPinId: 'a' },
    { id: 'dcw4', fromNodeId: 'dc_n0', fromPinId: 'out', toNodeId: 'dc_and0', toPinId: 'b' },
    { id: 'dcw5', fromNodeId: 'dc_n1', fromPinId: 'out', toNodeId: 'dc_and1', toPinId: 'a' },
    { id: 'dcw6', fromNodeId: 'dc_a0', fromPinId: 'out', toNodeId: 'dc_and1', toPinId: 'b' },
    { id: 'dcw7', fromNodeId: 'dc_a1', fromPinId: 'out', toNodeId: 'dc_and2', toPinId: 'a' },
    { id: 'dcw8', fromNodeId: 'dc_n0', fromPinId: 'out', toNodeId: 'dc_and2', toPinId: 'b' },
    { id: 'dcw9', fromNodeId: 'dc_a1', fromPinId: 'out', toNodeId: 'dc_and3', toPinId: 'a' },
    { id: 'dcw10', fromNodeId: 'dc_a0', fromPinId: 'out', toNodeId: 'dc_and3', toPinId: 'b' },
    { id: 'dcw11', fromNodeId: 'dc_and0', fromPinId: 'out', toNodeId: 'dc_l0', toPinId: 'in' },
    { id: 'dcw12', fromNodeId: 'dc_and1', fromPinId: 'out', toNodeId: 'dc_l1', toPinId: 'in' },
    { id: 'dcw13', fromNodeId: 'dc_and2', fromPinId: 'out', toNodeId: 'dc_l2', toPinId: 'in' },
    { id: 'dcw14', fromNodeId: 'dc_and3', fromPinId: 'out', toNodeId: 'dc_l3', toPinId: 'in' },
  ];

  // 10. 4x1 Multiplexer (MSI MUX_4X1 + Switches + LED)
  const mxI0 = createDefaultNode('SWITCH', 'mx_i0', 60, 40, 'I0');
  mxI0.outputs.out = 1;
  const mxI1 = createDefaultNode('SWITCH', 'mx_i1', 60, 105, 'I1');
  const mxI2 = createDefaultNode('SWITCH', 'mx_i2', 60, 170, 'I2');
  mxI2.outputs.out = 1;
  const mxI3 = createDefaultNode('SWITCH', 'mx_i3', 60, 235, 'I3');
  const mxS1 = createDefaultNode('SWITCH', 'mx_s1', 60, 310, 'S1');
  const mxS0 = createDefaultNode('SWITCH', 'mx_s0', 60, 375, 'S0');
  const mxBlock = createDefaultNode('MUX_4X1', 'mx_block', 280, 120, 'MUX 4x1');
  const mxLed = createDefaultNode('LED', 'mx_led', 500, 186, 'Y');
  const mxWires: CircuitWire[] = [
    { id: 'mxw1', fromNodeId: 'mx_i0', fromPinId: 'out', toNodeId: 'mx_block', toPinId: 'i0' },
    { id: 'mxw2', fromNodeId: 'mx_i1', fromPinId: 'out', toNodeId: 'mx_block', toPinId: 'i1' },
    { id: 'mxw3', fromNodeId: 'mx_i2', fromPinId: 'out', toNodeId: 'mx_block', toPinId: 'i2' },
    { id: 'mxw4', fromNodeId: 'mx_i3', fromPinId: 'out', toNodeId: 'mx_block', toPinId: 'i3' },
    { id: 'mxw5', fromNodeId: 'mx_s1', fromPinId: 'out', toNodeId: 'mx_block', toPinId: 's1' },
    { id: 'mxw6', fromNodeId: 'mx_s0', fromPinId: 'out', toNodeId: 'mx_block', toPinId: 's0' },
    { id: 'mxw7', fromNodeId: 'mx_block', fromPinId: 'y', toNodeId: 'mx_led', toPinId: 'in' },
  ];

  // 11. 2-Bit Magnitude Comparator
  const cmpA1 = createDefaultNode('SWITCH', 'cmp_a1', 60, 60, 'A1');
  cmpA1.outputs.out = 1;
  const cmpA0 = createDefaultNode('SWITCH', 'cmp_a0', 60, 125, 'A0');
  const cmpB1 = createDefaultNode('SWITCH', 'cmp_b1', 60, 205, 'B1');
  cmpB1.outputs.out = 1;
  const cmpB0 = createDefaultNode('SWITCH', 'cmp_b0', 60, 270, 'B0');
  const cmpBlock = createDefaultNode('COMPARATOR_2BIT', 'cmp_block', 270, 115, 'CMP 2b');
  const cmpGt = createDefaultNode('LED', 'cmp_gt', 490, 80, 'A>B');
  const cmpEq = createDefaultNode('LED', 'cmp_eq', 490, 155, 'A=B');
  const cmpLt = createDefaultNode('LED', 'cmp_lt', 490, 230, 'A<B');
  const cmpWires: CircuitWire[] = [
    { id: 'cmpw1', fromNodeId: 'cmp_a1', fromPinId: 'out', toNodeId: 'cmp_block', toPinId: 'a1' },
    { id: 'cmpw2', fromNodeId: 'cmp_a0', fromPinId: 'out', toNodeId: 'cmp_block', toPinId: 'a0' },
    { id: 'cmpw3', fromNodeId: 'cmp_b1', fromPinId: 'out', toNodeId: 'cmp_block', toPinId: 'b1' },
    { id: 'cmpw4', fromNodeId: 'cmp_b0', fromPinId: 'out', toNodeId: 'cmp_block', toPinId: 'b0' },
    { id: 'cmpw5', fromNodeId: 'cmp_block', fromPinId: 'gt', toNodeId: 'cmp_gt', toPinId: 'in' },
    { id: 'cmpw6', fromNodeId: 'cmp_block', fromPinId: 'eq', toNodeId: 'cmp_eq', toPinId: 'in' },
    { id: 'cmpw7', fromNodeId: 'cmp_block', fromPinId: 'lt', toNodeId: 'cmp_lt', toPinId: 'in' },
  ];

  // 12. SR Latch (Cross-Coupled NOR, initialized cleanly in valid Reset bistable state Q=0, Q'=1)
  const srR = createDefaultNode('SWITCH', 'sr_r', 70, 76, 'R');
  const srS = createDefaultNode('SWITCH', 'sr_s', 70, 204, 'S');
  const srNorQ = createDefaultNode('NOR', 'sr_nor_q', 260, 76, 'NOR-Q');
  srNorQ.outputs.out = 0;
  const srNorQn = createDefaultNode('NOR', 'sr_nor_qn', 260, 204, "NOR-Q'");
  srNorQn.outputs.out = 1;
  const srLedQ = createDefaultNode('LED', 'sr_led_q', 450, 80, 'Q');
  const srLedQn = createDefaultNode('LED', 'sr_led_qn', 450, 208, "Q'");
  const srWires: CircuitWire[] = [
    { id: 'srw1', fromNodeId: 'sr_r', fromPinId: 'out', toNodeId: 'sr_nor_q', toPinId: 'a' },
    { id: 'srw2', fromNodeId: 'sr_nor_qn', fromPinId: 'out', toNodeId: 'sr_nor_q', toPinId: 'b' },
    { id: 'srw3', fromNodeId: 'sr_nor_q', fromPinId: 'out', toNodeId: 'sr_nor_qn', toPinId: 'a' },
    { id: 'srw4', fromNodeId: 'sr_s', fromPinId: 'out', toNodeId: 'sr_nor_qn', toPinId: 'b' },
    { id: 'srw5', fromNodeId: 'sr_nor_q', fromPinId: 'out', toNodeId: 'sr_led_q', toPinId: 'in' },
    { id: 'srw6', fromNodeId: 'sr_nor_qn', fromPinId: 'out', toNodeId: 'sr_led_qn', toPinId: 'in' },
  ];

  // 13. D Latch (Gated NAND, initialized cleanly in Reset bistable state Q=0, Q'=1)
  const dlD = createDefaultNode('SWITCH', 'dl_d', 60, 80, 'D');
  const dlEn = createDefaultNode('SWITCH', 'dl_en', 60, 200, 'EN');
  const dlNot = createDefaultNode('NOT', 'dl_not', 190, 245, "D'");
  dlNot.outputs.out = 1;
  const dlNandS = createDefaultNode('NAND', 'dl_ns', 325, 80, 'NAND-S');
  dlNandS.outputs.out = 1;
  const dlNandR = createDefaultNode('NAND', 'dl_nr', 325, 210, 'NAND-R');
  dlNandR.outputs.out = 1;
  const dlNandQ = createDefaultNode('NAND', 'dl_nq', 495, 88, 'NAND-Q');
  dlNandQ.outputs.out = 0;
  const dlNandQn = createDefaultNode('NAND', 'dl_nqn', 495, 202, "NAND-Q'");
  dlNandQn.outputs.out = 1;
  const dlLedQ = createDefaultNode('LED', 'dl_lq', 665, 92, 'Q');
  const dlLedQn = createDefaultNode('LED', 'dl_lqn', 665, 206, "Q'");
  const dlWires: CircuitWire[] = [
    { id: 'dlw1', fromNodeId: 'dl_d', fromPinId: 'out', toNodeId: 'dl_ns', toPinId: 'a' },
    { id: 'dlw2', fromNodeId: 'dl_en', fromPinId: 'out', toNodeId: 'dl_ns', toPinId: 'b' },
    { id: 'dlw3', fromNodeId: 'dl_d', fromPinId: 'out', toNodeId: 'dl_not', toPinId: 'a' },
    { id: 'dlw4', fromNodeId: 'dl_en', fromPinId: 'out', toNodeId: 'dl_nr', toPinId: 'a' },
    { id: 'dlw5', fromNodeId: 'dl_not', fromPinId: 'out', toNodeId: 'dl_nr', toPinId: 'b' },
    { id: 'dlw6', fromNodeId: 'dl_ns', fromPinId: 'out', toNodeId: 'dl_nq', toPinId: 'a' },
    { id: 'dlw7', fromNodeId: 'dl_nqn', fromPinId: 'out', toNodeId: 'dl_nq', toPinId: 'b' },
    { id: 'dlw8', fromNodeId: 'dl_nq', fromPinId: 'out', toNodeId: 'dl_nqn', toPinId: 'a' },
    { id: 'dlw9', fromNodeId: 'dl_nr', fromPinId: 'out', toNodeId: 'dl_nqn', toPinId: 'b' },
    { id: 'dlw10', fromNodeId: 'dl_nq', fromPinId: 'out', toNodeId: 'dl_lq', toPinId: 'in' },
    { id: 'dlw11', fromNodeId: 'dl_nqn', fromPinId: 'out', toNodeId: 'dl_lqn', toPinId: 'in' },
  ];

  // 14. 2-Bit Synchronous Counter with 7-Segment Display
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

  return [
    {
      id: 'half-adder',
      category: 'arithmetic',
      name: presetCopy['half-adder'].name,
      shortName: presetCopy['half-adder'].shortName,
      description: presetCopy['half-adder'].description,
      nodes: [haA, haB, haXor, haAnd, haLedS, haLedC],
      wires: haWires,
    },
    {
      id: 'full-adder',
      category: 'arithmetic',
      name: presetCopy['full-adder'].name,
      shortName: presetCopy['full-adder'].shortName,
      description: presetCopy['full-adder'].description,
      nodes: [faA, faB, faCin, faXor1, faAnd1, faXor2, faAnd2, faOr, faLedSum, faLedCout],
      wires: faWires,
    },
    {
      id: 'full-subtractor',
      category: 'arithmetic',
      name: presetCopy['full-subtractor'].name,
      shortName: presetCopy['full-subtractor'].shortName,
      description: presetCopy['full-subtractor'].description,
      nodes: [
        fsX,
        fsY,
        fsBin,
        fsXor1,
        fsNotX,
        fsXor2,
        fsNotD1,
        fsAnd1,
        fsAnd2,
        fsOr,
        fsLedDiff,
        fsLedBout,
      ],
      wires: fsWires,
    },
    {
      id: 'nand-xor',
      category: 'universal',
      name: presetCopy['nand-xor'].name,
      shortName: presetCopy['nand-xor'].shortName,
      description: presetCopy['nand-xor'].description,
      nodes: [nxA, nxB, nxN1, nxN2, nxN3, nxN4, nxLed],
      wires: nxWires,
    },
    {
      id: 'nand-mux',
      category: 'universal',
      name: presetCopy['nand-mux'].name,
      shortName: presetCopy['nand-mux'].shortName,
      description: presetCopy['nand-mux'].description,
      nodes: [mI0, mS, mI1, mNot, mNand1, mNand2, mNand3, mLed],
      wires: muxWires,
    },
    {
      id: 'bin-to-gray',
      category: 'converters',
      name: presetCopy['bin-to-gray'].name,
      shortName: presetCopy['bin-to-gray'].shortName,
      description: presetCopy['bin-to-gray'].description,
      nodes: [bgB3, bgB2, bgB1, bgB0, bgXor2, bgXor1, bgXor0, bgG3, bgG2, bgG1, bgG0],
      wires: bgWires,
    },
    {
      id: 'gray-to-bin',
      category: 'converters',
      name: presetCopy['gray-to-bin'].name,
      shortName: presetCopy['gray-to-bin'].shortName,
      description: presetCopy['gray-to-bin'].description,
      nodes: [gbG3, gbG2, gbG1, gbG0, gbXor2, gbXor1, gbXor0, gbB3, gbB2, gbB1, gbB0],
      wires: gbWires,
    },
    {
      id: 'bcd-to-excess3',
      category: 'converters',
      name: presetCopy['bcd-to-excess3'].name,
      shortName: presetCopy['bcd-to-excess3'].shortName,
      description: presetCopy['bcd-to-excess3'].description,
      nodes: [
        xsB3,
        xsB2,
        xsB1,
        xsB0,
        xsOrT,
        xsXnor1,
        xsNot0,
        xsXor2,
        xsAndC,
        xsOr3,
        xsE3,
        xsE2,
        xsE1,
        xsE0,
      ],
      wires: xsWires,
    },
    {
      id: 'decoder-2to4',
      category: 'combinational',
      name: presetCopy['decoder-2to4'].name,
      shortName: presetCopy['decoder-2to4'].shortName,
      description: presetCopy['decoder-2to4'].description,
      nodes: [
        dcA1,
        dcA0,
        dcN1,
        dcN0,
        dcAnd0,
        dcAnd1,
        dcAnd2,
        dcAnd3,
        dcLed0,
        dcLed1,
        dcLed2,
        dcLed3,
      ],
      wires: dcWires,
    },
    {
      id: 'mux-4to1',
      category: 'combinational',
      name: presetCopy['mux-4to1'].name,
      shortName: presetCopy['mux-4to1'].shortName,
      description: presetCopy['mux-4to1'].description,
      nodes: [mxI0, mxI1, mxI2, mxI3, mxS1, mxS0, mxBlock, mxLed],
      wires: mxWires,
    },
    {
      id: 'comparator-2bit',
      category: 'combinational',
      name: presetCopy['comparator-2bit'].name,
      shortName: presetCopy['comparator-2bit'].shortName,
      description: presetCopy['comparator-2bit'].description,
      nodes: [cmpA1, cmpA0, cmpB1, cmpB0, cmpBlock, cmpGt, cmpEq, cmpLt],
      wires: cmpWires,
    },
    {
      id: 'sr-latch',
      category: 'sequential',
      name: presetCopy['sr-latch'].name,
      shortName: presetCopy['sr-latch'].shortName,
      description: presetCopy['sr-latch'].description,
      nodes: [srR, srS, srNorQ, srNorQn, srLedQ, srLedQn],
      wires: srWires,
    },
    {
      id: 'd-latch',
      category: 'sequential',
      name: presetCopy['d-latch'].name,
      shortName: presetCopy['d-latch'].shortName,
      description: presetCopy['d-latch'].description,
      nodes: [dlD, dlEn, dlNot, dlNandS, dlNandR, dlNandQ, dlNandQn, dlLedQ, dlLedQn],
      wires: dlWires,
    },
    {
      id: 'tff-counter',
      category: 'sequential',
      name: presetCopy['tff-counter'].name,
      shortName: presetCopy['tff-counter'].shortName,
      description: presetCopy['tff-counter'].description,
      nodes: [clk, swT, tff0, tff1, seg],
      wires: cntWires,
    },
    {
      id: 'empty',
      category: 'canvas',
      name: presetCopy.empty.name,
      shortName: presetCopy.empty.shortName,
      description: presetCopy.empty.description,
      nodes: [],
      wires: [],
    },
  ];
}
