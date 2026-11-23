import type { WeekModule } from '../../types/curriculum';

export const week1: WeekModule = {
  id: 1,
  weekNumber: 1,
  englishTitle: {
    tr: 'Digital Systems & Binary Numbers',
    en: 'Digital Systems & Binary Numbers',
  },
  turkishSubtitle: {
    tr: 'Sayısal Sistemler, Konumsal Gösterim, Taban Dönüşümleri ve İkili Aritmetik',
    en: 'Number Systems, Positional Notation, Radix Conversions & Binary Arithmetic',
  },
  summary: {
    tr: 'Sayısal sistemlerin temel yapı taşlarını, Decimal, Binary, Octal ve Hexadecimal konumsal (Positional) ağırlık mantığını, hızlı 3-bit / 4-bit blok dönüşümlerini ve ikili aritmetik işlemlerini (Carry / Borrow) adım adım kavrayın.',
    en: 'Master the building blocks of digital systems, positional weight notation across Decimal, Binary, Octal, and Hexadecimal radices, rapid 3-bit / 4-bit grouping conversions, and binary arithmetic operations (Carry / Borrow) step by step.',
  },
  learningObjectives: [
    {
      tr: 'Decimal, Binary, Octal ve Hexadecimal tabanlarının konumsal ağırlıklarını (r^i) hesaplamak',
      en: 'Compute positional digit weights (r^i) across Decimal, Binary, Octal, and Hexadecimal radices',
    },
    {
      tr: 'Tam ve kesirli sayıları ardışıl bölme ve çarpma yöntemleriyle hedef tabana (Radix) dönüştürmek',
      en: 'Convert integer and fractional numbers to any target radix using repeated division and multiplication',
    },
    {
      tr: 'Binary ↔ Octal (3-bit) ve Binary ↔ Hexadecimal (4-bit) blok gruplama kısayolunu uygulamak',
      en: 'Apply the 3-bit (Binary ↔ Octal) and 4-bit (Binary ↔ Hexadecimal) block grouping shortcuts',
    },
    {
      tr: 'İkili toplama (Carry), çıkarma (Borrow) ve kaydırmalı ikili çarpma işlemlerini gerçekleştirmek',
      en: 'Perform binary addition (Carry), subtraction (Borrow), and shift-and-add binary multiplication',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'BaseComplementVisualizer',
  visualSections: [
    {
      id: 'w1-s1',
      title: {
        tr: '1. Sayı Sistemleri ve Konumsal Ağırlık (Positional Notation)',
        en: '1. Number Systems & Positional Notation',
      },
      explanation: {
        tr: 'Sayısal sistemler bilgiyi iki ayrık mantıksal seviyede işler: Logic HIGH (1) ve Logic LOW (0). Bir r tabanındaki (Radix r) her sayının değeri, basamak rakamlarının bulundukları konumun r^i ağırlığı ile çarpılıp toplanmasıyla belirlenir. En soldaki bit MSB (Most Significant Bit), en sağdaki bit ise LSB (Least Significant Bit) adını alır.',
        en: 'Digital systems process information using two discrete logic levels: Logic HIGH (1) and Logic LOW (0). In any number system of radix r, a number’s value equals the weighted sum of its digits multiplied by their positional radix powers (r^i). The leftmost bit is the MSB (Most Significant Bit), and the rightmost bit is the LSB (Least Significant Bit).',
      },
      keyPoints: [
        {
          tr: 'Polinom Açılımı: (N)_r = ... + d₃·r³ + d₂·r² + d₁·r¹ + d₀·r⁰ + d₋₁·r⁻¹ + d₋₂·r⁻² + ...',
          en: 'Polynomial Expansion: (N)_r = ... + d₃·r³ + d₂·r² + d₁·r¹ + d₀·r⁰ + d₋₁·r⁻¹ + d₋₂·r⁻² + ...',
        },
        {
          tr: 'Decimal (r=10), Binary (r=2), Octal (r=8) ve Hexadecimal (r=16) bilgisayar mühendisliğinin dört temel sayı sistemidir.',
          en: 'Decimal (r=10), Binary (r=2), Octal (r=8), and Hexadecimal (r=16) are the four fundamental number systems in computer engineering.',
        },
        {
          tr: 'n bitlik bir ikili kaydedicide (register) 0 ile 2ⁿ - 1 arasında toplam 2ⁿ farklı işaretsiz tam sayı temsil edilebilir.',
          en: 'An n-bit binary register can represent 2ⁿ distinct unsigned integers spanning the range 0 through 2ⁿ - 1.',
        },
      ],
      diagrams: [
        {
          kind: 'positional',
          caption: {
            tr: 'Konumsal Basamak Ağırlıkları: (1101.11)₂ Örneği',
            en: 'Positional Digit Weights: Example (1101.11)₂',
          },
          base: 2,
          digits: [
            { symbol: '1', weightLabel: 'r³ = 2³ (8)', contribution: '1×8 = 8' },
            { symbol: '1', weightLabel: 'r² = 2² (4)', contribution: '1×4 = 4' },
            { symbol: '0', weightLabel: 'r¹ = 2¹ (2)', contribution: '0×2 = 0' },
            { symbol: '1', weightLabel: 'r⁰ = 2⁰ (1)', contribution: '1×1 = 1' },
            {
              symbol: '.',
              weightLabel: 'Radix Point',
              contribution: { tr: 'Nokta', en: 'Point' },
            },
            { symbol: '1', weightLabel: 'r⁻¹ = 2⁻¹ (0.5)', contribution: '0.5' },
            { symbol: '1', weightLabel: 'r⁻² = 2⁻² (0.25)', contribution: '0.25' },
          ],
          resultLabel: {
            tr: 'Toplam = (13.75)₁₀',
            en: 'Sum = (13.75)₁₀',
          },
        },
        {
          kind: 'table',
          caption: {
            tr: '0–15 Arası 4 Tabanlı Karşılaştırma Matrisi',
            en: '4-Radix Comparison Matrix (0–15)',
          },
          headers: ['Decimal (r=10)', 'Binary (r=2)', 'Octal (r=8)', 'Hexadecimal (r=16)'],
          highlightColumn: 3,
          rows: [
            ['0', '0000', '00', '0'],
            ['1', '0001', '01', '1'],
            ['2', '0010', '02', '2'],
            ['3', '0011', '03', '3'],
            ['4', '0100', '04', '4'],
            ['5', '0101', '05', '5'],
            ['6', '0110', '06', '6'],
            ['7', '0111', '07', '7'],
            ['8', '1000', '10', '8'],
            ['9', '1001', '11', '9'],
            ['10', '1010', '12', 'A'],
            ['11', '1011', '13', 'B'],
            ['12', '1100', '14', 'C'],
            ['13', '1101', '15', 'D'],
            ['14', '1110', '16', 'E'],
            ['15', '1111', '17', 'F'],
          ],
        },
      ],
      summaryRule: {
        tr: 'Bir r tabanında tam kısım MSB\'den LSB\'ye r⁰, r¹, r²... ağırlıklarına; kesir kısmı ise r⁻¹, r⁻²... ağırlıklarına sahiptir. Binary (r=2) ↔ Octal (2³) dönüşümleri 3\'lü, Binary ↔ Hexadecimal (2⁴) dönüşümleri ise 4\'lü bit bloklarıyla yapılır.',
        en: 'In any radix r, integer digits carry weights r⁰, r¹, r²... while fractional digits carry r⁻¹, r⁻²... Binary (r=2) ↔ Octal (2³) maps cleanly in 3-bit blocks, and Binary ↔ Hexadecimal (2⁴) maps in 4-bit blocks.',
      },
      examTip: {
        tr: 'Sınavlarda 2⁰=1 ... 2¹⁰=1024 (1K), 2¹⁶=65536 (64K) ve kesirli kuvvetler (2⁻¹=0.5, 2⁻²=0.25, 2⁻³=0.125, 2⁻⁴=0.0625) ezbere bilinmelidir.',
        en: 'Memorize powers of 2 from 2⁰=1 through 2¹⁰=1024 (1K), 2¹⁶=65536 (64K), and negative powers (2⁻¹=0.5, 2⁻²=0.25, 2⁻³=0.125, 2⁻⁴=0.0625) for fast exam calculations.',
      },
    },
    {
      id: 'w1-s2',
      title: {
        tr: '2. Taban Dönüşümleri ve 3-Bit / 4-Bit Gruplama Kısayolu',
        en: '2. Radix Conversions & 3-Bit / 4-Bit Grouping Shortcut',
      },
      explanation: {
        tr: 'Onluk (Decimal) tabandan herhangi bir r tabanına geçerken sayı iki parçaya ayrılır: Tam kısım sürekli r tabanına bölünür ve kalanlar AŞAĞIDAN YUKARIYA doğru okunur. Kesirli kısım ise sürekli r ile çarpılır ve ortaya çıkan tam kısımlar YUKARIDAN AŞAĞIYA doğru yazılır.\n\n💡 Pratik Yöntem: 8 = 2³ ve 16 = 2⁴ olduğu için Binary ↔ Octal dönüşümünde noktadan itibaren 3-bit bloklar, Binary ↔ Hexadecimal dönüşümünde ise 4-bit bloklar oluşturulur. Uçlardaki eksik bitler 0 ile doldurulur.',
        en: 'When converting from Decimal to any radix r, split the number into two parts: repeatedly divide the integer part by r and read remainders BOTTOM-UP; repeatedly multiply the fractional part by r and record integer carries TOP-DOWN.\n\n💡 Quick Method: Because 8 = 2³ and 16 = 2⁴, group binary digits outward from the radix point into 3-bit blocks for Octal and 4-bit blocks for Hexadecimal, padding outer ends with zeros as needed.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'Örnek Akış: (1101101.1011)₂ Sayısının Octal ve Hexadecimal Dönüşümü',
            en: 'Worked Flow: Converting (1101101.1011)₂ to Octal & Hexadecimal',
          },
          steps: [
            {
              label: {
                tr: 'Adım 1: Radix Noktasından Başla',
                en: 'Step 1: Start from the Radix Point',
              },
              badge: {
                tr: 'Referans',
                en: 'Reference',
              },
              detail: {
                tr: 'Tam kısım noktadan SOLA doğru,\nkesirli kısım noktadan SAĞA doğru gruplanır.\nSayı: 1101101 . 1011',
                en: 'Group the integer part moving LEFT,\nand the fractional part moving RIGHT from the point.\nNumber: 1101101 . 1011',
              },
            },
            {
              label: {
                tr: 'Adım 2: Octal İçin 3-Bit Bloklar',
                en: 'Step 2: 3-Bit Blocks for Octal',
              },
              badge: 'r = 8 = 2³',
              detail: {
                tr: 'Tam: [001] [101] [101] → 1 5 5\nKesir: [101] [100] → . 5 4\nSonuç: (155.54)₈',
                en: 'Int: [001] [101] [101] → 1 5 5\nFrac: [101] [100] → . 5 4\nResult: (155.54)₈',
              },
            },
            {
              label: {
                tr: 'Adım 3: Hex İçin 4-Bit Bloklar',
                en: 'Step 3: 4-Bit Blocks for Hex',
              },
              badge: 'r = 16 = 2⁴',
              detail: {
                tr: 'Tam: [0110] [1101] → 6 D\nKesir: [1011] → . B\nSonuç: (6D.B)₁₆',
                en: 'Int: [0110] [1101] → 6 D\nFrac: [1011] → . B\nResult: (6D.B)₁₆',
              },
            },
          ],
        },
      ],
      widget: 'BaseComplementVisualizer',
      widgetConfig: {
        defaultMode: 'base',
        initialValue: '41.6875',
        initialBase: 2,
      },
      examTip: {
        tr: 'Octal → Hexadecimal dönüşümü sorulduğunda asla 10 tabanına gitmeyin! Octal → 3-bit Binary → 4-bit grupla → Hexadecimal yolu hem çok daha hızlıdır hem de işlem hatası riskini sıfırlar.',
        en: 'Never convert through base 10 when asked for Octal → Hexadecimal! Going Octal → 3-bit Binary → regroup into 4 bits → Hexadecimal is far faster and eliminates arithmetic errors.',
      },
    },
    {
      id: 'w1-s3',
      title: {
        tr: '3. İkili Aritmetik (Binary Addition, Subtraction, Multiplication)',
        en: '3. Binary Arithmetic (Addition, Subtraction, Multiplication)',
      },
      explanation: {
        tr: 'İkili sistemde aritmetik kurallar onluk sistemle aynı mantığa dayanır; tek fark tabanın 2 olmasıdır. Toplamada sütun toplamı 2 veya daha büyükse sonraki sütuna Elde (Carry) aktarılır (1 + 1 = 0 ve Carry = 1; 1 + 1 + 1 = 1 ve Carry = 1). Çıkarmada 0 - 1 işlemi gerektiğinde sol sütundan 2 değerinde Borç (Borrow) alınır (2 - 1 = 1). Çarpmada ise çarpanın her 1 biti için çarpılan sayı sola kaydırılarak toplanır.',
        en: 'Binary arithmetic follows the exact same positional principles as decimal, except the radix is 2. In addition, when a column sum reaches 2 or more, a Carry propagates left (1 + 1 = 0 with Carry = 1; 1 + 1 + 1 = 1 with Carry = 1). In subtraction, 0 - 1 borrows 2 from the next higher column (2 - 1 = 1). In multiplication, shifted copies of the multiplicand are summed for each 1 bit in the multiplier.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'Adım Adım İkili Aritmetik Örnekleri (Carry & Borrow Akışı)',
            en: 'Step-by-Step Binary Arithmetic Examples (Carry & Borrow Flow)',
          },
          steps: [
            {
              label: {
                tr: 'Toplama (Carry Akışı)',
                en: 'Addition (Carry Flow)',
              },
              badge: '1011 + 0111',
              detail: {
                tr: 'Carry:  1 1 1 0\nA:      1 0 1 1  (11)\nB:    + 0 1 1 1  (7)\n─────────────────\nSonuç: 1 0 0 1 0 (18)',
                en: 'Carry:  1 1 1 0\nA:      1 0 1 1  (11)\nB:    + 0 1 1 1  (7)\n─────────────────\nResult: 1 0 0 1 0 (18)',
              },
            },
            {
              label: {
                tr: 'Çıkarma (Borrow Akışı)',
                en: 'Subtraction (Borrow Flow)',
              },
              badge: '1010 - 0111',
              detail: {
                tr: 'Borç:   0 2 0 2\nA:      1 0 1 0  (10)\nB:    - 0 1 1 1  (7)\n─────────────────\nFark:   0 0 1 1  (3)',
                en: 'Borrow: 0 2 0 2\nA:      1 0 1 0  (10)\nB:    - 0 1 1 1  (7)\n─────────────────\nDiff:   0 0 1 1  (3)',
              },
            },
            {
              label: {
                tr: 'Çarpma (Kısmi Çarpımlar)',
                en: 'Multiplication (Partial Products)',
              },
              badge: '1011 × 101',
              detail: {
                tr: '        1 0 1 1  (11)\n      ×   1 0 1  (5)\n─────────────────\n        1 0 1 1  (×1)\n      0 0 0 0    (×0)\n+ 1 0 1 1        (×1)\n─────────────────\n  1 1 0 1 1 1    (55)',
                en: '        1 0 1 1  (11)\n      ×   1 0 1  (5)\n─────────────────\n        1 0 1 1  (×1)\n      0 0 0 0    (×0)\n+ 1 0 1 1        (×1)\n─────────────────\n  1 1 0 1 1 1    (55)',
              },
            },
          ],
        },
      ],
      examTip: {
        tr: 'Çoklu ikili toplama veya çarpma sonucunda elde ettiğiniz sonucu her zaman zihinden onluk tabana çevirerek (örn. 11 × 5 = 55) sağlamasını yapın.',
        en: 'Always verify multi-bit binary addition or multiplication by converting both operands and the final result back to decimal (e.g., 11 × 5 = 55).',
      },
    },
  ],
  questions: [
    {
      id: 'w1-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · Kesirli Onluk Sayı Dönüşümü (Mano 1.3 / 1.4)',
        en: 'Question 1 · Fractional Decimal Conversion (Mano 1.3 / 1.4)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Onluk tabanda verilen (41.6875)₁₀ sayısının ikili (Binary) ve onaltılık (Hexadecimal) karşılıkları sırasıyla aşağıdakilerden hangisidir?',
        en: 'What are the exact Binary and Hexadecimal equivalents of the decimal number (41.6875)₁₀, respectively?',
      },
      options: [
        {
          tr: '(101001.1011)₂ ve (29.B)₁₆',
          en: '(101001.1011)₂ and (29.B)₁₆',
        },
        {
          tr: '(101011.1011)₂ ve (2B.B)₁₆',
          en: '(101011.1011)₂ and (2B.B)₁₆',
        },
        {
          tr: '(101001.1101)₂ ve (29.D)₁₆',
          en: '(101001.1101)₂ and (29.D)₁₆',
        },
        {
          tr: '(100101.1011)₂ ve (25.B)₁₆',
          en: '(100101.1011)₂ and (25.B)₁₆',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Tam Kısım (41)₁₀ İçin Ardışıl Bölme',
            en: 'Step 1: Repeated Division for Integer Part (41)₁₀',
          },
          detail: {
            tr: '41÷2 = 20 (kalan 1) | 20÷2 = 10 (kalan 0) | 10÷2 = 5 (kalan 0) | 5÷2 = 2 (kalan 1) | 2÷2 = 1 (kalan 0) | 1÷2 = 0 (kalan 1) → Alttan üste: (101001)₂',
            en: '41÷2 = 20 (rem 1) | 20÷2 = 10 (rem 0) | 10÷2 = 5 (rem 0) | 5÷2 = 2 (rem 1) | 2÷2 = 1 (rem 0) | 1÷2 = 0 (rem 1) → Bottom-up: (101001)₂',
          },
        },
        {
          title: {
            tr: 'Adım 2: Kesirli Kısım (0.6875)₁₀ İçin Ardışıl Çarpma',
            en: 'Step 2: Repeated Multiplication for Fractional Part (0.6875)₁₀',
          },
          detail: {
            tr: '0.6875×2 = 1.375 (tam: 1) → 0.375×2 = 0.75 (tam: 0) → 0.75×2 = 1.50 (tam: 1) → 0.50×2 = 1.00 (tam: 1) → Üstten alta: (.1011)₂',
            en: '0.6875×2 = 1.375 (int: 1) → 0.375×2 = 0.75 (int: 0) → 0.75×2 = 1.50 (int: 1) → 0.50×2 = 1.00 (int: 1) → Top-down: (.1011)₂',
          },
        },
        {
          title: {
            tr: 'Adım 3: 4-Bit Gruplama ile Hexadecimal Dönüşümü',
            en: 'Step 3: 4-Bit Grouping for Hexadecimal Conversion',
          },
          detail: {
            tr: '[0010] [1001] . [1011] → 0010 = 2, 1001 = 9, 1011 = 11 (B) → Sonuç: (101001.1011)₂ = (29.B)₁₆',
            en: '[0010] [1001] . [1011] → 0010 = 2, 1001 = 9, 1011 = 11 (B) → Result: (101001.1011)₂ = (29.B)₁₆',
          },
        },
      ],
    },
    {
      id: 'w1-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · Bilinmeyen Taban Bulma (Unknown Radix)',
        en: 'Question 2 · Finding an Unknown Radix',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'Aşağıdaki taban aritmetiği eşitliğini sağlayan r sayı tabanı (Radix) kaçtır?\n\n(24)_r + (17)_r = (40)_r',
        en: 'Determine the radix r that satisfies the following base-r addition equation:\n\n(24)_r + (17)_r = (40)_r',
      },
      options: ['r = 10', 'r = 11', 'r = 12', 'r = 9'],
      correctIndex: 1,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Tüm Sayıları Konumsal Polinom Açılımıyla Onluk Tabana Yaz',
            en: 'Step 1: Expand All Operands in Decimal Positional Notation',
          },
          detail: '(24)_r = 2·r¹ + 4·r⁰ = 2r + 4  |  (17)_r = 1·r + 7  |  (40)_r = 4·r + 0 = 4r',
        },
        {
          title: {
            tr: 'Adım 2: Denklemi Kur ve r İçin Çöz',
            en: 'Step 2: Set Up and Solve the Equation for r',
          },
          detail: '(2r + 4) + (r + 7) = 4r  ⇒  3r + 11 = 4r  ⇒  r = 11',
        },
        {
          title: {
            tr: 'Adım 3: Geçerlilik Kontrolü',
            en: 'Step 3: Validity Check',
          },
          detail: {
            tr: 'Kullanılan en büyük rakam 7 olduğu için r > 7 olmalıdır. r = 11 bu koşulu sağlar. Sağlama: (26 + 18 = 44 = 4×11).',
            en: 'Since the largest digit used is 7, we must have r > 7. r = 11 satisfies this condition. Check: (26 + 18 = 44 = 4×11).',
          },
        },
      ],
    },
    {
      id: 'w1-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · Octal → Hexadecimal Doğrudan Dönüşüm (Mano 1.6)',
        en: 'Question 3 · Direct Octal → Hexadecimal Conversion (Mano 1.6)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Sekizlik tabanda verilen (673.124)₈ sayısının onaltılık (Hexadecimal) tabandaki tam karşılığı nedir?',
        en: 'What is the exact Hexadecimal equivalent of the octal number (673.124)₈?',
      },
      options: ['(1BB.2A)₁₆', '(1B3.28)₁₆', '(35B.52)₁₆', '(1BB.54)₁₆'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Her Octal Basamağı 3-Bit Binary Bloğuna Aç',
            en: 'Step 1: Expand Each Octal Digit into a 3-Bit Binary Group',
          },
          detail:
            '6 = 110 | 7 = 111 | 3 = 011  .  1 = 001 | 2 = 010 | 4 = 100 → (110 111 011 . 001 010 100)₂',
        },
        {
          title: {
            tr: 'Adım 2: Noktadan Başlayarak 4-Bit Bloklara Yeniden Grupla',
            en: 'Step 2: Regroup into 4-Bit Blocks Outward from the Radix Point',
          },
          detail: {
            tr: 'Tam kısım (sola): [0001] [1011] [1011]  |  Kesir (sağa): [0010] [1010] [0000]',
            en: 'Integer part (left): [0001] [1011] [1011]  |  Fraction (right): [0010] [1010] [0000]',
          },
        },
        {
          title: {
            tr: 'Adım 3: 4-Bit Blokları Hexadecimal Rakamlara Çevir',
            en: 'Step 3: Convert 4-Bit Blocks to Hexadecimal Digits',
          },
          detail: {
            tr: '0001 = 1, 1011 = B, 1011 = B . 0010 = 2, 1010 = A → Sonuç: (1BB.2A)₁₆',
            en: '0001 = 1, 1011 = B, 1011 = B . 0010 = 2, 1010 = A → Result: (1BB.2A)₁₆',
          },
        },
      ],
    },
    {
      id: 'w1-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · İkili Çarpma İşlemi (Binary Multiplication)',
        en: 'Question 4 · Binary Multiplication',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '(10110)₂ × (101)₂ ikili çarpma işleminin sonucu ikili tabanda aşağıdakilerden hangisidir?',
        en: 'What is the binary product of (10110)₂ × (101)₂?',
      },
      options: ['(1101110)₂', '(1101100)₂', '(1011110)₂', '(1110110)₂'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Kısmi Çarpımları Oluştur',
            en: 'Step 1: Generate Partial Products',
          },
          detail: {
            tr: 'Bit 0 (1): 10110 × 1 = 10110\nBit 1 (0): 10110 × 0 = 000000 (1 sola kaydır)\nBit 2 (1): 10110 × 1 = 1011000 (2 sola kaydır)',
            en: 'Bit 0 (1): 10110 × 1 = 10110\nBit 1 (0): 10110 × 0 = 000000 (shift left 1)\nBit 2 (1): 10110 × 1 = 1011000 (shift left 2)',
          },
        },
        {
          title: {
            tr: 'Adım 2: Kısmi Çarpımları Elde Bitleriyle Topla',
            en: 'Step 2: Sum Partial Products with Carries',
          },
          detail: '10110 + 1011000 = 1101110₂',
        },
        {
          title: {
            tr: 'Adım 3: Onluk Tabanda Sağlama',
            en: 'Step 3: Decimal Verification',
          },
          detail: {
            tr: '(10110)₂ = 22₁₀ ve (101)₂ = 5₁₀ → 22 × 5 = 110₁₀ = 64 + 32 + 8 + 4 + 2 = (1101110)₂.',
            en: '(10110)₂ = 22₁₀ and (101)₂ = 5₁₀ → 22 × 5 = 110₁₀ = 64 + 32 + 8 + 4 + 2 = (1101110)₂.',
          },
        },
      ],
    },
    {
      id: 'w1-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · Kaydedici Kapasitesi ve Maksimum Değer',
        en: 'Question 5 · Register Capacity & Maximum Value',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'n = 12 bitlik bir kaydedicide (register) temsil edilebilecek en büyük işaretsiz (unsigned) onluk tam sayı kaçtır?',
        en: 'What is the largest unsigned decimal integer that can be represented in an n = 12-bit binary register?',
      },
      options: ['4096', '4095', '2047', '2048'],
      correctIndex: 1,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Toplam Durum Sayısını Bul',
            en: 'Step 1: Find Total Number of States',
          },
          detail: {
            tr: 'n bit ile toplam 2ⁿ farklı ikili dizilim oluşturulabilir: 2¹² = 4096 farklı değer.',
            en: 'With n bits, 2ⁿ distinct binary patterns exist: 2¹² = 4096 distinct values.',
          },
        },
        {
          title: {
            tr: 'Adım 2: 0 Dahil Edildiğinde Üst Sınır',
            en: 'Step 2: Upper Bound Including 0',
          },
          detail: {
            tr: 'Sayılar 0 ile başladığı için aralık [0, 2ⁿ - 1] olur: 4096 - 1 = 4095.',
            en: 'Because counting starts at 0, the unsigned range is [0, 2ⁿ - 1]: 4096 - 1 = 4095.',
          },
        },
      ],
    },
    {
      id: 'w1-q6',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 6 · Sonsuz Tekrarlayan İkili Kesirler',
        en: 'Question 6 · Non-Terminating Repeating Binary Fractions',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: '(0.3)₁₀ onluk kesri ikili (Binary) tabana çevrildiğinde neden sonlu bir gösterime sahip değildir ve ilk 6 kesirli biti nedir?',
        en: 'Why does the decimal fraction (0.3)₁₀ have a non-terminating binary expansion, and what are its first 6 fractional bits?',
      },
      options: [
        {
          tr: 'Paydadaki 5 asal çarpanı 2ⁿ formunda olmadığı için sonlanmaz; ilk 6 bit: (0.010011...)₂',
          en: 'The prime factor 5 in the denominator is not a power of 2, so it repeats forever; first 6 bits: (0.010011...)₂',
        },
        {
          tr: 'Onluk sistemde çift sayı olmadığı için sonlanmaz; ilk 6 bit: (0.010101...)₂',
          en: 'Because 3 is not an even digit in decimal; first 6 bits: (0.010101...)₂',
        },
        {
          tr: 'Kesirli kısım 0.5 ten küçük olduğu için sonlanmaz; ilk 6 bit: (0.001100...)₂',
          en: 'Because the fraction is less than 0.5; first 6 bits: (0.001100...)₂',
        },
        {
          tr: '3 asal sayı olduğu için sonlanmaz; ilk 6 bit: (0.011001...)₂',
          en: 'Because 3 is a prime number; first 6 bits: (0.011001...)₂',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Ardışıl 2 İle Çarpma Tablosu',
            en: 'Step 1: Repeated Multiplication by 2 Table',
          },
          detail:
            '0.3 × 2 = 0.6 (0) | 0.6 × 2 = 1.2 (1) | 0.2 × 2 = 0.4 (0) | 0.4 × 2 = 0.8 (0) | 0.8 × 2 = 1.6 (1) | 0.6 × 2 = 1.2 (1)',
        },
        {
          title: {
            tr: 'Adım 2: Periyodik Döngü Tespiti',
            en: 'Step 2: Detect the Periodic Cycle',
          },
          detail: {
            tr: '2. adımdaki 0.6 değeri 5. adımda tekrar karşımıza çıktığı için "0011" bloğu sonsuza dek tekrarlanır: (0.0100110011...)₂',
            en: 'Since 0.6 from step 2 reappears at step 5, the "0011" pattern repeats infinitely: (0.0100110011...)₂',
          },
        },
        {
          title: {
            tr: 'Adım 3: Matematiksel Neden',
            en: 'Step 3: Mathematical Reason',
          },
          detail: {
            tr: '0.3 = 3/10 kesrinin paydasında 2 dışında 5 asal çarpanı bulunduğu için 2 tabanında tam bölünemez ve periyodik devirli olur.',
            en: 'Because the denominator of 3/10 contains the prime factor 5 (not just powers of 2), it cannot terminate in base 2.',
          },
        },
      ],
    },
  ],
};
