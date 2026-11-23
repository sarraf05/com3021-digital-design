import React from 'react';

const CODE_PILL_CLASS =
  'bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-[13px] font-semibold border border-slate-200/70 break-words';
const CRITICAL_CLASS = 'text-rose-600 font-bold';
const TECH_CLASS = 'text-blue-600 font-semibold';
const CALLOUT_BOX_CLASS =
  'bg-rose-50 border-l-4 border-rose-500 text-rose-900 px-3 py-2 rounded-r-xl my-2';

type TokenKind = 'code' | 'critical' | 'tech';

interface MatchRule {
  kind: TokenKind;
  regex: RegExp;
  enforceWordBoundary: boolean;
}

// Technical acronyms & hardware terms ALWAYS checked BEFORE generic ALL-CAPS rules
// so acronyms like NAND, NOR, XOR, MUX, DEMUX, BCD, SOP, POS, FPGA, 74xx stay blue.
const TECH_ACRONYMS_PATTERN =
  '(?:NAND-NAND|NOR-NOR|AND-OR|OR-AND|XNOR|NAND|NOR|XOR|AND|OR|NOT|BUF|MUX|DEMUX|BCD|SOP|POS|RAM|ROM|FPGA|FSM|HDL|ALU|MSB|LSB|EPI|CMOS|RCA|CLA|ASCII|VCC|GND|HIGH|LOW|SISO|SIPO|PISO|PIPO|TTL|IC|PI|SR|JK|FF|HA|FA|COM\\s+3021)';

const TECH_TERMS_PATTERN =
  "(?:DeMorgan(?:'s\\s+Theorem|'s)?|Consensus(?:\\s+Teoremi|\\s+Theorem)?|Karnaugh|Quine-McCluskey|Shannon|Huntington|Boole(?:an)?|K-Map(?:s)?|Decoder(?:s)?|Encoder(?:s)?|Priority\\s+Encoder(?:s)?|Multiplexer(?:s)?|Demultiplexer(?:s)?|Magnitude\\s+Comparator(?:s)?|Comparator(?:s)?|Flip-Flop(?:s)?|D\\s+Flip-Flop|JK\\s+Flip-Flop|T\\s+Flip-Flop|Gated\\s+D\\s+Latch|SR\\s+Latch|D\\s+Latch|Latch(?:es)?|Half\\s+Adder|Full\\s+Adder|Ripple\\s+Carry\\s+Adder|Carry\\s+Lookahead(?:\\s+Adder)?|BCD\\s+Adder|Adder-Subtractor|Universal\\s+Shift\\s+Register|Shift\\s+Register(?:s)?|Johnson(?:\\s*\\(Switch-Tail\\))?\\s+Counter|Ring\\s+Counter|Ripple\\s+Counter|Decade\\s+Counter|Synchronous|Asynchronous|Senkron|Asenkron|Master-Slave|Edge-Triggered|Kenar\\s+Tetiklemeli|Mealy|Moore|Verilog|Register(?:s)?|Active-High|Active-Low|Don't-Care|Essential\\s+Prime\\s+Implicant|Prime\\s+Implicant|Minterm(?:s)?|Maxterm(?:s)?|Excess-3|Gray\\s+Code|Parity|Setup\\s+Time|Hold\\s+Time|Propagation\\s+Delay|2's\\s+Complement|1's\\s+Complement|Signed-Magnitude|Positional|Radix|Three-State|Tri-State|Shared\\s+Bus|Excitation\\s+Table|Characteristic\\s+Equation|Uyarım\\s+Tablosu|Durum\\s+İndirgeme|State\\s+Reduction|State\\s+Table|State\\s+Diagram|Output\\s+Carry|Count\\s+Enable|One-Hot)";

const EXPLICIT_CRITICAL_PATTERN =
  '(?:KRİTİK\\s+SINAV\\s+UYARISI|CRITICAL\\s+EXAM\\s+WARNING|BİRLEŞME\\s+ÖZELLİĞİ\\s+YOKTUR|AŞAĞIDAN\\s+YUKARIYA|YUKARIDAN\\s+AŞAĞIYA|BOTTOM-UP|TOP-DOWN|BULUNMASI\\s+ZORUNLU|SONRAKİ\\s+DURUMLARI|NEXT\\s+STATES|TAM\\s+O\\s+AN|NOT\\s+associative|NOT\\s+equivalent|NOT\\s+available|NOT\\s+complemented|DİKKAT|ÖNEMLİ|UNUTMA|KRİTİK|KRITIK|ASLA|UYARI|YASAK(?:\\s+durumdur)?|TUZAK|KESİNLİKLE|İSTİSNA|ALINMAZ|VEYA|DEĞİL|ÇİFT|TEK|ODD|ANY|ONLY|MUST|BOTH|SAME|ZERO|NEVER|CRITICAL|WARNING|CAUTION|IMPORTANT|Signed\\s+Overflow|Overflow|Race\\s+Condition|Clock\\s+Gating|Clock\\s+Skew|clock\\s+skew|Glitch|glitch|Forbidden|Invalid\\s+State|WITHOUT\\s+complementing|geçici\\s+hatalı\\s+ara\\s+kodlar|istenmeyen\\s+sahte\\s+tetikleme)';

// Note: No `\b` on Unicode Turkish rules because JS `\b` treats ÇĞİÖŞÜ as non-word chars.
// Word boundaries are enforced explicitly via Unicode `isWordChar` in `tokenizeInline`.
const MATCH_RULES: MatchRule[] = [
  // 1. Explicit backticked code
  {
    kind: 'code',
    regex: /`([^`\n]+)`/g,
    enforceWordBoundary: false,
  },
  // 2. Parenthesized radix numbers: (1101.11)₂, (13.75)₁₀, (N)_r
  {
    kind: 'code',
    regex: /\([0-9A-Za-z._+-]+\)[₀₁₂₃₄₅₆₇₈₉r]+/g,
    enforceWordBoundary: false,
  },
  // 3. Minterm / Maxterm notation: Σm(1, 2, 4, 7), ΠM(0, 3)
  {
    kind: 'code',
    regex: /[ΣΠ][mM](?:_[0-9A-Za-z]+)?\([0-9,\s]+\)/g,
    enforceWordBoundary: false,
  },
  // 4. Verilog / Hex literals: 4'b1010, 0xFF
  {
    kind: 'code',
    regex: /(?:\d+'[bBdDhHoO][0-9a-fA-FxXzZ_]+|0[xX][0-9a-fA-F]+)/g,
    enforceWordBoundary: true,
  },
  // 5. Bit / state transition chains: 0 → 1, 1000 → 0100 → 0010 → 0001
  {
    kind: 'code',
    regex: /[01]{1,4}(?:\s*→\s*[01]{1,4})+/g,
    enforceWordBoundary: true,
  },
  // 6. Compact Boolean / algebraic equations & assignments
  {
    kind: 'code',
    regex:
      /(?:\([A-Za-z0-9_'₀₁₂₃₄₅₆₇₈₉ₙᵢ\s=<>!+·×⊕⊙-]{1,18}\)|[A-Za-z0-9][A-Za-z0-9_'₀₁₂₃₄₅₆₇₈₉ₙᵢ]*(?:\([A-Za-z0-9_+\-,\s']{1,12}\))?)\s*(?:=|≠|⊕|⊙)\s*[A-Za-z0-9_'₀₁₂₃₄₅₆₇₈₉ₙᵢ⁺⁻·×+\-*/()⊕⊙!]+(?:\s*(?:[·×+\-⊕⊙=≠]|\/)\s*[A-Za-z0-9_'₀₁₂₃₄₅₆₇₈₉ₙᵢ⁺⁻·×+\-*/()⊕⊙!]+)*/g,
    enforceWordBoundary: false,
  },
  // 7. Standalone 4+ bit binary literals: 0110, 1001, 1111, 0000
  {
    kind: 'code',
    regex: /[01]{4,}(?:_[01]{4,})*/g,
    enforceWordBoundary: true,
  },
  // 8. Timing & range mathematical shorthand
  {
    kind: 'code',
    regex: /(?:2ⁿ\s*-\s*1|2ⁿ|t_pd|t_su|t_h|Hi-Z)/g,
    enforceWordBoundary: true,
  },
  // 9. Explicit multi-word / critical warning phrases (higher priority than single tech tokens inside phrases like "NOT associative")
  {
    kind: 'critical',
    regex: new RegExp(EXPLICIT_CRITICAL_PATTERN, 'g'),
    enforceWordBoundary: true,
  },
  // 10. IC codes (74xx series) -> BLUE
  {
    kind: 'tech',
    regex: /74(?:LS|HC|HCT|ALS|F|S|C)?(?:xx|\d{2,4})/g,
    enforceWordBoundary: true,
  },
  // 11. Hardware & logic gate acronyms -> BLUE (checked BEFORE generic ALL-CAPS warnings)
  {
    kind: 'tech',
    regex: new RegExp(TECH_ACRONYMS_PATTERN, 'g'),
    enforceWordBoundary: true,
  },
  // 12. Named digital design terms & concepts -> BLUE
  {
    kind: 'tech',
    regex: new RegExp(TECH_TERMS_PATTERN, 'g'),
    enforceWordBoundary: true,
  },
  // 13. Any remaining 4+ letter ALL-CAPS emphasized words (non-acronym) -> RED BOLD
  {
    kind: 'critical',
    regex: /[A-ZÇĞİÖŞÜ]{4,}(?:-[A-ZÇĞİÖŞÜ]{2,})*/g,
    enforceWordBoundary: true,
  },
];

function isWordChar(ch: string | undefined): boolean {
  if (!ch) return false;
  return /[A-Za-z0-9_ğüşıöçĞÜŞİÖÇ]/.test(ch);
}

interface Segment {
  kind: 'text' | TokenKind;
  text: string;
}

function tokenizeInline(input: string): Segment[] {
  if (!input) return [];

  const segments: Segment[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    let bestStart = input.length;
    let bestEnd = input.length;
    let bestKind: TokenKind | null = null;
    let bestText = '';

    for (const rule of MATCH_RULES) {
      rule.regex.lastIndex = cursor;
      let match: RegExpExecArray | null;

      while ((match = rule.regex.exec(input)) !== null) {
        const start = match.index;
        if (start >= bestStart) {
          break;
        }

        const rawText = match[0];
        const end = start + rawText.length;

        if (rule.enforceWordBoundary) {
          const prev = start > 0 ? input[start - 1] : undefined;
          const next = end < input.length ? input[end] : undefined;
          if (isWordChar(prev) || isWordChar(next)) {
            if (rule.regex.lastIndex === start) rule.regex.lastIndex++;
            continue;
          }
        } else if (!rule.regex.source.startsWith('`')) {
          const prev = start > 0 ? input[start - 1] : undefined;
          if (isWordChar(prev)) {
            if (rule.regex.lastIndex === start) rule.regex.lastIndex++;
            continue;
          }
        }

        bestStart = start;
        bestEnd = end;
        bestKind = rule.kind;
        bestText = match[1] ?? rawText;
        break;
      }

      if (bestStart === cursor) break;
    }

    if (bestKind === null || bestStart >= input.length) {
      segments.push({ kind: 'text', text: input.slice(cursor) });
      break;
    }

    if (bestStart > cursor) {
      segments.push({ kind: 'text', text: input.slice(cursor, bestStart) });
    }

    segments.push({ kind: bestKind, text: bestText });
    cursor = Math.max(bestEnd, cursor + 1);
  }

  return segments;
}

export const FormattedInline: React.FC<{ text: string }> = ({ text }) => {
  const safeText = typeof text === 'string' ? text : String(text ?? '');
  const segments = React.useMemo(() => tokenizeInline(safeText), [safeText]);

  return (
    <>
      {segments.map((seg, idx) => {
        if (seg.kind === 'code') {
          return (
            <code key={idx} className={CODE_PILL_CLASS}>
              {seg.text}
            </code>
          );
        }
        if (seg.kind === 'critical') {
          return (
            <span key={idx} className={CRITICAL_CLASS}>
              {seg.text}
            </span>
          );
        }
        if (seg.kind === 'tech') {
          return (
            <span key={idx} className={TECH_CLASS}>
              {seg.text}
            </span>
          );
        }
        return <React.Fragment key={idx}>{seg.text}</React.Fragment>;
      })}
    </>
  );
};

const CALLOUT_LEAD_RE =
  /^(?:ÖNEMLİ|DİKKAT|NOT|UYARI|KRİTİK(?:\s+SINAV\s+UYARISI)?|IMPORTANT|NOTE|WARNING|CAUTION|CRITICAL(?:\s+EXAM\s+WARNING)?)(?:\s*\([^)]+\))?\s*:/i;

function isAllUppercaseSentence(line: string): boolean {
  const withoutTech = line.replace(
    /\b(?:NAND|NOR|XOR|XNOR|AND|OR|NOT|MUX|DEMUX|BCD|SOP|POS|RAM|ROM|FPGA|FSM|MSB|LSB|CMOS|RCA|CLA|ASCII|VCC|GND|SISO|SIPO|PISO|PIPO)\b/g,
    ''
  );
  const letters = withoutTech.match(/[A-Za-zÇĞİÖŞÜçğıöşü]/g);
  if (!letters || letters.length < 12) return false;
  const hasLower = letters.some((ch) => /[a-zçğıöşü]/.test(ch));
  return !hasLower;
}

function isCalloutLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  return CALLOUT_LEAD_RE.test(trimmed) || isAllUppercaseSentence(trimmed);
}

/**
 * Splits a dense non-callout paragraph (> 380 chars) into 2 breathable paragraphs.
 */
function splitLongParagraph(text: string): string[] {
  const trimmed = text.trim();
  if (trimmed.length < 380 || isCalloutLine(trimmed)) return [trimmed];

  const breaks: number[] = [];
  for (let i = 40; i < trimmed.length - 40; i++) {
    const ch = trimmed[i];
    if ((ch === '.' || ch === '!' || ch === '?') && trimmed[i + 1] === ' ') {
      const nextChar = trimmed[i + 2];
      if (nextChar && /[A-ZÇĞİÖŞÜ0-9]/.test(nextChar)) {
        breaks.push(i + 1);
      }
    }
  }

  if (breaks.length === 0) return [trimmed];

  const mid = trimmed.length / 2;
  let bestBreak = breaks[0];
  let bestDist = Math.abs(bestBreak - mid);
  for (const b of breaks) {
    const d = Math.abs(b - mid);
    if (d < bestDist) {
      bestDist = d;
      bestBreak = b;
    }
  }

  const first = trimmed.slice(0, bestBreak).trim();
  const second = trimmed.slice(bestBreak).trim();
  if (first.length < 70 || second.length < 70) return [trimmed];
  return [first, second];
}

function splitLeadHeading(line: string): { heading: string | null; body: string } {
  const colonIdx = line.indexOf(':');
  if (colonIdx > 1 && colonIdx <= 65) {
    const candidate = line.slice(0, colonIdx).trim();
    if (!/[=<>⊕⊙→]|https?$/i.test(candidate)) {
      return {
        heading: `${candidate}:`,
        body: line.slice(colonIdx + 1).trimStart(),
      };
    }
  }
  return { heading: null, body: line };
}

interface FormattedProseProps {
  text: string;
  focusMode?: boolean;
}

export const FormattedProse: React.FC<FormattedProseProps> = ({
  text,
  focusMode = false,
}) => {
  const safeText = typeof text === 'string' ? text : String(text ?? '');

  const blocks = React.useMemo(() => {
    const rawLines = safeText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    type Block =
      | { type: 'callout'; content: string }
      | { type: 'paragraph'; content: string }
      | { type: 'bullets'; items: string[] };

    const result: Block[] = [];

    for (const line of rawLines) {
      const isBullet = line.startsWith('•') || line.startsWith('- ');
      if (isBullet) {
        const cleanItem = line.replace(/^[•-]\s*/, '').trim();
        if (isCalloutLine(cleanItem)) {
          result.push({ type: 'callout', content: cleanItem });
          continue;
        }
        const prev = result[result.length - 1];
        if (prev && prev.type === 'bullets') {
          prev.items.push(cleanItem);
        } else {
          result.push({ type: 'bullets', items: [cleanItem] });
        }
      } else if (isCalloutLine(line)) {
        result.push({ type: 'callout', content: line });
      } else {
        for (const subPara of splitLongParagraph(line)) {
          result.push({ type: 'paragraph', content: subPara });
        }
      }
    }

    return result;
  }, [safeText]);

  const textSizeClass = focusMode
    ? 'text-sm sm:text-base leading-[1.75]'
    : 'text-sm sm:text-[15px] leading-relaxed';

  return (
    <div className={`text-slate-700 leading-relaxed max-w-4xl space-y-3 break-words ${textSizeClass}`}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'callout') {
          const { heading, body } = splitLeadHeading(block.content);
          return (
            <div key={bIdx} className={CALLOUT_BOX_CLASS}>
              {heading && (
                <span className="text-rose-600 font-bold mr-1.5">{heading}</span>
              )}
              <FormattedInline text={body} />
            </div>
          );
        }

        if (block.type === 'bullets') {
          return (
            <ul key={bIdx} className="space-y-2 pl-1">
              {block.items.map((item, iIdx) => {
                const { heading, body } = splitLeadHeading(item);
                return (
                  <li key={iIdx} className="flex items-start gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      {heading && (
                        <span className="font-bold text-slate-900 mr-1.5">
                          <FormattedInline text={heading} />
                        </span>
                      )}
                      <FormattedInline text={body} />
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }

        const { heading, body } = splitLeadHeading(block.content);
        return (
          <p key={bIdx}>
            {heading && (
              <span className="font-bold text-slate-900 mr-1.5">
                <FormattedInline text={heading} />
              </span>
            )}
            <FormattedInline text={body} />
          </p>
        );
      })}
    </div>
  );
};

interface FormattedTextProps {
  text: string;
  inline?: boolean;
  focusMode?: boolean;
}

export const FormattedText: React.FC<FormattedTextProps> = ({
  text,
  inline = false,
  focusMode = false,
}) => {
  if (inline) {
    return <FormattedInline text={text} />;
  }
  return <FormattedProse text={text} focusMode={focusMode} />;
};

export default FormattedText;
