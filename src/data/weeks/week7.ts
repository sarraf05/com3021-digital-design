import type { WeekModule } from '../../types/curriculum';

export const week7: WeekModule = {
  id: 7,
  weekNumber: 7,
  englishTitle: {
    tr: 'Combinational Logic I (Adders & Subtractors)',
    en: 'Combinational Logic I (Adders & Subtractors)',
  },
  turkishSubtitle: {
    tr: 'Birleşik Devre Tasarım Prosedürü, BCD-to-Excess-3, Half/Full Adder ve Adder-Subtractor',
    en: 'Combinational Design Procedure, BCD-to-Excess-3, Half/Full Adders & Adder-Subtractor',
  },
  summary: {
    tr: 'Çıkışları yalnızca o anki girişlere bağlı olan Combinational Logic devrelerinin 5 adımlı tasarım metodolojisini, 4-bit BCD-to-Excess-3 kod dönüştürücü vaka analizini, Half/Full Adder hiyerarşisini, Ripple Carry Adder yayılım gecikmesini ve M-kontrollü 4-bit Adder-Subtractor devresini öğrenin.',
    en: 'Learn the 5-step Combinational Logic design procedure, the 4-bit BCD-to-Excess-3 code converter case study, Half/Full Adder hierarchy, Ripple Carry Adder propagation delay analysis, and the mode-controlled (M) 4-bit Adder-Subtractor with Overflow detection.',
  },
  learningObjectives: [
    {
      tr: 'Mano\'nun 5 adımlı birleşik devre tasarım prosedürünü uygulamak',
      en: 'Apply Mano’s 5-step combinational circuit design procedure',
    },
    {
      tr: '4-bit BCD-to-Excess-3 kod dönüştürücüsünde Don\'t-Care (10–15) kullanarak K-Map sadeleştirmesi yapmak',
      en: 'Minimize a 4-bit BCD-to-Excess-3 code converter using K-Maps and Don\'t-Care states (10–15)',
    },
    {
      tr: 'İki Half Adder ve bir OR kapısıyla Full Adder kurmak; Ripple Carry Adder gecikmesini hesaplamak',
      en: 'Construct a Full Adder from two Half Adders and an OR gate, and compute Ripple Carry Adder delay',
    },
    {
      tr: 'M kontrol girişli Binary Adder-Subtractor devresinde Overflow (V = C₃ ⊕ C₄) tespiti yapmak',
      en: 'Detect signed Overflow (V = C₃ ⊕ C₄) in an M-controlled Binary Adder-Subtractor',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'TruthTableBuilder',
  recommendedWidgetConfig: {
    variables: 3,
    initialMinterms: [1, 2, 4, 7],
  },
  visualSections: [
    {
      id: 'w7-s1',
      title: {
        tr: '1. Birleşik Devre Tasarım Prosedürü ve BCD-to-Excess-3 Vaka Analizi',
        en: '1. Combinational Design Procedure & BCD-to-Excess-3 Case Study',
      },
      explanation: {
        tr: 'Combinational (Birleşik) devrelerde çıkışlar hafıza elemanlarına değil, yalnızca o an uygulanan girişlerin anlık değerlerine bağlıdır. Mano Bölüm 4.3–4.4 tasarım prosedürü 5 adımdan oluşur: (1) Problem tanımından giriş ve çıkış sayısını belirle, (2) Giriş/çıkışlara harf ata, (3) Doğruluk tablosunu çıkar, (4) Her çıkış için K-Map ile sadeleştirilmiş Boole denklemini bul, (5) Lojik şemayı çiz.\n\nVaka Analizi (BCD → Excess-3): Girişler (A, B, C, D) yalnızca 0–9 arası BCD değerleri alacağından 10–15 arası 6 kombinasyon Don\'t-Care (X) kabul edilir. Çıkışlar (w, x, y, z) K-Map ile sadeleştirildiğinde z = D\', y = CD + C\'D\', x = B\'C + B\'D + BC\'D\', w = A + BC + BD elde edilir.',
        en: 'In Combinational circuits, outputs depend solely on the present inputs with no memory elements. Mano’s 5-step design procedure (Sections 4.3–4.4) is: (1) Determine input/output counts from specifications, (2) Assign letter symbols, (3) Derive the truth table, (4) Obtain simplified Boolean equations for each output via K-Maps, and (5) Draw the logic diagram.\n\nCase Study (BCD → Excess-3): Because valid BCD inputs (A, B, C, D) only span 0–9, combinations 10–15 are Don\'t-Care (X). Simplifying outputs (w, x, y, z) yields z = D\', y = CD + C\'D\', x = B\'C + B\'D + BC\'D\', and w = A + BC + BD.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: "4-Bit BCD-to-Excess-3 Doğruluk Tablosu (10–15 Arası Don't-Care)",
            en: "4-Bit BCD-to-Excess-3 Truth Table (10–15 as Don't-Care)",
          },
          headers: [
            'Decimal',
            { tr: 'BCD Giriş (A B C D)', en: 'BCD Input (A B C D)' },
            { tr: 'Excess-3 Çıkış (w x y z)', en: 'Excess-3 Output (w x y z)' },
            { tr: 'Sade Çıkış Denklemi', en: 'Simplified Output Equation' },
          ],
          highlightColumn: 2,
          rows: [
            [
              '0',
              '0 0 0 0',
              '0 0 1 1',
              { tr: "z = D' (Her satırda D terslenir)", en: "z = D' (D inverted on every row)" },
            ],
            ['1', '0 0 0 1', '0 1 0 0', "y = CD + C'D' = (C ⊕ D)'"],
            ['2', '0 0 1 0', '0 1 0 1', "x = B'(C + D) + BC'D'"],
            ['4', '0 1 0 0', '0 1 1 1', 'w = A + B(C + D)'],
            [
              '7',
              '0 1 1 1',
              '1 0 1 0',
              { tr: '10–15 arası tüm girişler X', en: 'Inputs 10–15 treated as X' },
            ],
            [
              '9',
              '1 0 0 1',
              '1 1 0 0',
              { tr: 'Ortak terim (C+D) paylaşılır', en: 'Shared subexpression (C+D)' },
            ],
          ],
        },
      ],
      examTip: {
        tr: 'Çok çıkışlı birleşik devrelerde (örn. BCD-to-Excess-3) denklemlerdeki ortak alt ifadeleri (C + D gibi) yakalamak, kapı sayısını önemli ölçüde azaltır!',
        en: 'In multi-output combinational circuits (like BCD-to-Excess-3), factoring out shared subexpressions such as (C + D) cuts total gate count significantly!',
      },
    },
    {
      id: 'w7-s2',
      title: {
        tr: '2. Half Adder, Full Adder ve 4-Bit Ripple Carry Adder',
        en: '2. Half Adder, Full Adder & 4-Bit Ripple Carry Adder',
      },
      explanation: {
        tr: 'Dijital aritmetiğin kalbi toplayıcılardır:\n• Half Adder (HA): 2 giriş (x, y) alır; Sum S = x ⊕ y ve Carry C = xy üretir.\n• Full Adder (FA): Önceki basamaktan gelen eldeyi (C_in) de katarak 3 biti toplar (x, y, C_in → S, C_out). İki adet Half Adder ve bir adet OR kapısıyla hiyerarşik olarak kurulabilir:\n  S = (x ⊕ y) ⊕ C_in  ve  C_out = xy + C_in(x ⊕ y).\n• Ripple Carry Adder: n adet Full Adder\'ın elde çıkışlarının (C₁ → C₂ → C₃ → C₄) zincirleme bağlanmasıyla oluşturulur. Her aşama bir önceki eldenin gelmesini beklemek zorunda olduğu için kritik yol gecikmesi bit sayısıyla doğrusal artar.',
        en: 'Binary adders form the heart of digital arithmetic:\n• Half Adder (HA): Adds 2 bits (x, y) to produce Sum S = x ⊕ y and Carry C = xy.\n• Full Adder (FA): Adds 3 bits including carry-in (x, y, C_in → S, C_out). It can be built hierarchically from two Half Adders and one OR gate:\n  S = (x ⊕ y) ⊕ C_in  and  C_out = xy + C_in(x ⊕ y).\n• Ripple Carry Adder: Chains n Full Adders via carry lines (C₁ → C₂ → C₃ → C₄). Because each stage must wait for the carry from the previous stage, critical-path delay scales linearly with bit width.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Full Adder (Tam Toplayıcı) Doğruluk Tablosu',
            en: 'Full Adder Truth Table',
          },
          headers: ['A', 'B', 'Cin', 'Sum (S)', 'Carry (Cout)'],
          highlightColumn: 3,
          rows: [
            ['0', '0', '0', '0', '0'],
            ['0', '0', '1', '1', '0'],
            ['0', '1', '0', '1', '0'],
            ['0', '1', '1', '0', '1'],
            ['1', '0', '0', '1', '0'],
            ['1', '0', '1', '0', '1'],
            ['1', '1', '0', '0', '1'],
            ['1', '1', '1', '1', '1'],
          ],
        },
        {
          kind: 'steps',
          caption: {
            tr: '4-Bit Ripple Carry Adder Gecikme Analizi',
            en: '4-Bit Ripple Carry Adder Propagation Delay Analysis',
          },
          steps: [
            {
              label: {
                tr: 'Aşama 0 & 1 (C₁, C₂)',
                en: 'Stages 0 & 1 (C₁, C₂)',
              },
              badge: '2 × t_carry',
              detail: {
                tr: 'FA₀ eldesi C₁ hesaplanır (t_carry), ardından FA₁ eldesi C₂ hesaplanır.',
                en: 'FA₀ computes carry C₁ (t_carry), then FA₁ produces carry C₂.',
              },
            },
            {
              label: {
                tr: 'Aşama 2 (C₃)',
                en: 'Stage 2 (C₃)',
              },
              badge: '3 × t_carry',
              detail: {
                tr: 'C₂ geldikten sonra FA₂ eldesi C₃ üretilir ve son basamağa iletilir.',
                en: 'After C₂ arrives, FA₂ computes C₃ and feeds it to the MSB stage.',
              },
            },
            {
              label: {
                tr: 'Son Aşama (S₃ ve C₄)',
                en: 'Final Stage (S₃ and C₄)',
              },
              badge: '3×t_carry + t_sum',
              detail: {
                tr: 'Son basamak Sum biti C₃ ulaştıktan t_sum süre sonra kesinleşir. Toplam gecikme = 3·t_carry + max(t_sum, t_carry).',
                en: 'The final Sum bit S₃ settles t_sum after C₃ arrives. Total delay = 3·t_carry + max(t_sum, t_carry).',
              },
            },
          ],
        },
      ],
      widget: 'TruthTableBuilder',
      widgetConfig: {
        variables: 3,
        initialMinterms: [1, 2, 4, 7],
      },
      summaryRule: {
        tr: 'Full Adder toplamı S = x ⊕ y ⊕ C_in ve eldesi C_out = xy + C_in(x ⊕ y) olarak üretilir. Mod kontrollü (M) XOR katmanı ve C₀ = M bağlantısı aynı 4-bit toplayıcıyı tek pinle hem Adder (M=0) hem Subtractor (M=1) yapar.',
        en: 'A Full Adder computes Sum S = x ⊕ y ⊕ C_in and Carry C_out = xy + C_in(x ⊕ y). Adding mode-controlled XOR gates with C₀ = M turns a single 4-bit adder into a combined Adder (M=0) and Subtractor (M=1).',
      },
      examTip: {
        tr: 'Full Adder\'ın Sum çıkışı Σm(1, 2, 4, 7) (Odd Function), Carry çıkışı ise Σm(3, 5, 6, 7) (Majority Function: en az iki giriş 1 ise 1) olarak çalışır!',
        en: 'Remember that a Full Adder’s Sum output is Σm(1, 2, 4, 7) (Odd Function), while its Carry output is Σm(3, 5, 6, 7) (Majority Function: 1 when ≥ 2 inputs are 1)!',
      },
    },
    {
      id: 'w7-s3',
      title: {
        tr: '3. 4-Bit Binary Adder-Subtractor ve Overflow (Taşma) Algılama',
        en: '3. 4-Bit Binary Adder-Subtractor & Overflow Detection',
      },
      explanation: {
        tr: 'Aynı donanımla hem toplama (A + B) hem çıkarma (A - B) yapabilmek için B girişlerinin önüne mod kontrol girişli (M) XOR kapıları yerleştirilir:\n• M = 0 (Toplama): C₀ = 0 verilir ve Bᵢ ⊕ 0 = Bᵢ olduğu için devre doğrudan A + B hesaplar.\n• M = 1 (Çıkarma): C₀ = 1 verilir ve Bᵢ ⊕ 1 = Bᵢ\' olduğu için devre A + B\' + 1 = A + (2\'s Complement of B) = A - B hesaplar.\n\nOverflow (Taşma) Algılama: İşaretsiz sayılarda taşmayı C₄ gösterir; ancak işaretli (2\'s Complement) sayılarda taşma, işaret bitine giren elde (C₃) ile çıkan eldenin (C₄) farklı olmasıdır: V = C₃ ⊕ C₄.',
        en: 'To perform both addition (A + B) and subtraction (A - B) on the same adder hardware, place XOR gates controlled by mode input M ahead of each Bᵢ bit:\n• M = 0 (Addition): C₀ = 0 and Bᵢ ⊕ 0 = Bᵢ, so the circuit computes A + B.\n• M = 1 (Subtraction): C₀ = 1 and Bᵢ ⊕ 1 = Bᵢ\', so the circuit computes A + B\' + 1 = A + (2\'s Complement of B) = A - B.\n\nOverflow Detection: For unsigned numbers, carry-out C₄ indicates overflow. For signed (2\'s Complement) numbers, overflow occurs when carry-into and carry-out of the sign bit differ: V = C₃ ⊕ C₄.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'Mod Kontrol Girişi (M) ve Overflow (V) Çalışma Mantığı',
            en: 'Mode Control (M) & Overflow (V) Operating Logic',
          },
          steps: [
            {
              label: {
                tr: 'M = 0 (Toplama Modu)',
                en: 'M = 0 (Addition Mode)',
              },
              badge: 'B ⊕ 0 = B',
              detail: {
                tr: 'C₀ = 0.\nXOR kapıları B bitlerini değiştirmeden geçirir.\nÇıkış = A + B.',
                en: 'C₀ = 0.\nXOR gates pass B bits unchanged.\nOutput = A + B.',
              },
            },
            {
              label: {
                tr: 'M = 1 (Çıkarma Modu)',
                en: 'M = 1 (Subtraction Mode)',
              },
              badge: "B ⊕ 1 = B'",
              detail: {
                tr: "C₀ = 1.\nXOR kapıları B'nin tüm bitlerini tersler (1's comp); C₀=1 eklenerek 2's comp tamamlanır: A - B.",
                en: "C₀ = 1.\nXOR gates invert all B bits (1's comp); C₀=1 completes 2's comp: A - B.",
              },
            },
            {
              label: {
                tr: 'İşaretli Taşma (V)',
                en: 'Signed Overflow (V)',
              },
              badge: 'V = C₃ ⊕ C₄',
              detail: {
                tr: 'V = 1 ise sonuç 4-bit [-8, +7] aralığına sığmamıştır ve işaret biti hatalıdır!',
                en: 'If V = 1, the signed result falls outside the 4-bit range [-8, +7] and the sign bit is invalid!',
              },
            },
          ],
        },
      ],
      examTip: {
        tr: 'Adder-Subtractor devresinde C₀ girişi de doğrudan M hattına bağlanır! Böylece tek bir M pini hem tüm B bitlerini XOR\'lar hem de çıkarma modunda +1 eldesini otomatik verir.',
        en: 'In an Adder-Subtractor, C₀ is wired directly to the mode line M! That single control line both inverts B via XORs and supplies the +1 carry-in needed for 2\'s complement subtraction.',
      },
    },
  ],
  questions: [
    {
      id: 'w7-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · BCD-to-Excess-3 En Düşük Anlamlı Bit (Mano 4.4)',
        en: 'Question 1 · BCD-to-Excess-3 Least Significant Bit (Mano 4.4)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'BCD girişi (A, B, C, D) olan bir BCD-to-Excess-3 kod dönüştürücü devresinde en düşük anlamlı çıkış biti z\'nin en sade Boole ifadesi aşağıdakilerden hangisidir?',
        en: 'In a BCD-to-Excess-3 code converter with inputs (A, B, C, D), what is the minimal Boolean expression for the least significant output bit z?',
      },
      options: ["z = D'", 'z = D', 'z = C ⊕ D', "z = C'D'"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: +3 (0011₂) Eklemenin LSB Üzerindeki Etkisi',
            en: 'Step 1: Effect of Adding +3 (0011₂) on the LSB',
          },
          detail: {
            tr: 'Excess-3 kodu, BCD değerine 3 = (0011)₂ eklenerek elde edilir. İkili toplamanın en sağ basamağında D + 1 işlemi yapılır.',
            en: 'Excess-3 adds 3 = (0011)₂ to the BCD input. At the rightmost bit position, this performs D + 1.',
          },
        },
        {
          title: {
            tr: 'Adım 2: Çıkış Biti z',
            en: 'Step 2: Output Bit z',
          },
          detail: {
            tr: "D = 0 ise 0 + 1 = 1; D = 1 ise 1 + 1 = 0 (elde 1). Dolayısıyla her geçerli satırda z = D' olur.",
            en: "When D = 0, 0 + 1 = 1; when D = 1, 1 + 1 = 0 (carry 1). Hence z = D' for every valid row.",
          },
        },
      ],
    },
    {
      id: 'w7-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · İki Half Adder ile Full Adder İnşası',
        en: 'Question 2 · Building a Full Adder from Two Half Adders',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Bir Full Adder (Tam Toplayıcı) devresini iki adet Half Adder (HA1 ve HA2) kullanarak inşa ederken, bu iki yarım toplayıcının Carry (Elde) çıkışları hangi mantık kapısıyla birleştirilerek Cout elde edilir?',
        en: 'When constructing a Full Adder from two Half Adders (HA1 and HA2), which logic gate combines their two Carry outputs to produce Cout?',
      },
      options: [
        { tr: 'OR kapısı ile', en: 'An OR gate' },
        { tr: 'AND kapısı ile', en: 'An AND gate' },
        { tr: 'XOR kapısı ile', en: 'An XOR gate' },
        { tr: 'NAND kapısı ile', en: 'A NAND gate' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Hiyerarşik Denklemleri Yaz',
            en: 'Step 1: Write Hierarchical Equations',
          },
          detail:
            'HA1(A, B) → S₁ = A ⊕ B, C₁ = AB\nHA2(S₁, Cin) → S = (A ⊕ B) ⊕ Cin, C₂ = Cin(A ⊕ B)',
        },
        {
          title: {
            tr: 'Adım 2: Elde Çıkışlarının Birleştirilmesi',
            en: 'Step 2: Combining the Carry Signals',
          },
          detail: {
            tr: 'Cout = C₁ + C₂ = AB + Cin(A ⊕ B). C₁ ve C₂ aynı anda 1 olamayacağı için OR kapısı (veya pratikte XOR) kullanılır; standart Mano tasarımında OR kapısı yer alır.',
            en: 'Cout = C₁ + C₂ = AB + Cin(A ⊕ B). Standard Mano design combines C₁ and C₂ with an OR gate.',
          },
        },
      ],
    },
    {
      id: 'w7-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · Ripple Carry Adder Yayılım Gecikmesi',
        en: 'Question 3 · Ripple Carry Adder Propagation Delay',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'Her bir Full Adder bloğunda Sum çıkış gecikmesi 20 ns ve Carry çıkış gecikmesi 15 ns ise, 4-bitlik bir Ripple Carry Adder devresinde tüm sonuç bitlerinin (S₀..S₃ ve C₄) kesinleşmesi için gereken maksimum süre kaç nanosaniyedir?',
        en: 'If each Full Adder stage has a Sum delay of 20 ns and a Carry delay of 15 ns, what is the worst-case total propagation delay for all outputs (S₀..S₃ and C₄) of a 4-bit Ripple Carry Adder to settle?',
      },
      options: ['65 ns', '80 ns', '60 ns', '35 ns'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Eldelerin Zincirleme Gecikmesini Hesapla',
            en: 'Step 1: Calculate Cascaded Carry Delays',
          },
          detail: 'C₁ = 15 ns | C₂ = 15 + 15 = 30 ns | C₃ = 30 + 15 = 45 ns | C₄ = 45 + 15 = 60 ns.',
        },
        {
          title: {
            tr: 'Adım 2: En Yavaş Sum Çıkışı (S₃)',
            en: 'Step 2: Slowest Sum Output (S₃)',
          },
          detail: {
            tr: 'Son basamak olan FA₃, C₃ eldesini 45. ns\'de alır ve S₃ toplamını +20 ns sonra üretir: 45 + 20 = 65 ns. Tüm çıkışların kesinleşme süresi max(60, 65) = 65 ns dir.',
            en: 'The MSB stage FA₃ receives C₃ at 45 ns and produces S₃ after +20 ns: 45 + 20 = 65 ns. Total settling time = max(60, 65) = 65 ns.',
          },
        },
      ],
    },
    {
      id: 'w7-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · 4-Bit Adder-Subtractor ve İşaretli Overflow Analizi',
        en: 'Question 4 · 4-Bit Adder-Subtractor & Signed Overflow Analysis',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: '4-bitlik işaretli 2\'s Complement Adder-Subtractor devresinde M = 1 (çıkarma modu), A = 0101 (+5) ve B = 1011 (-5) uygulandığında C₃, C₄ ve Overflow (V) bitlerinin değerleri ne olur?',
        en: 'In a 4-bit signed 2\'s Complement Adder-Subtractor with M = 1 (subtract mode), A = 0101 (+5), and B = 1011 (-5), what are the values of C₃, C₄, and Overflow (V)?',
      },
      options: [
        {
          tr: 'C₃ = 1, C₄ = 0 ve Overflow V = 1 (Taşma Var)',
          en: 'C₃ = 1, C₄ = 0, and Overflow V = 1 (Overflow)',
        },
        {
          tr: 'C₃ = 0, C₄ = 0 ve Overflow V = 0 (Taşma Yok)',
          en: 'C₃ = 0, C₄ = 0, and Overflow V = 0 (No Overflow)',
        },
        {
          tr: 'C₃ = 1, C₄ = 1 ve Overflow V = 0 (Taşma Yok)',
          en: 'C₃ = 1, C₄ = 1, and Overflow V = 0 (No Overflow)',
        },
        {
          tr: 'C₃ = 0, C₄ = 1 ve Overflow V = 1 (Taşma Var)',
          en: 'C₃ = 0, C₄ = 1, and Overflow V = 1 (Overflow)',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: "Adım 1: M = 1 Olduğu İçin B'yi Tersle ve C₀ = 1 Ver",
            en: 'Step 1: Invert B and Set C₀ = 1 (Since M = 1)',
          },
          detail: {
            tr: "B = 1011 ⇒ B' = 0100. İşlem: A + B' + 1 = 0101 + 0100 + 0001.",
            en: "B = 1011 ⇒ B' = 0100. Operation: A + B' + 1 = 0101 + 0100 + 0001.",
          },
        },
        {
          title: {
            tr: 'Adım 2: Bit Bazında Toplama ve Eldeleri İzle',
            en: 'Step 2: Trace Bit-by-Bit Carries',
          },
          detail: {
            tr: 'Bit 0: 1+0+1 = 0 (C₁=1) | Bit 1: 0+0+1 = 1 (C₂=0) | Bit 2: 1+1+0 = 0 (C₃=1) | Bit 3: 0+0+1 = 1 (C₄=0).\n4-bit sonuç = 1010 (-6 görünür, hatalı!).',
            en: 'Bit 0: 1+0+1 = 0 (C₁=1) | Bit 1: 0+0+1 = 1 (C₂=0) | Bit 2: 1+1+0 = 0 (C₃=1) | Bit 3: 0+0+1 = 1 (C₄=0).\n4-bit sum = 1010 (reads -6, invalid!).',
          },
        },
        {
          title: {
            tr: 'Adım 3: Overflow Kontrolü',
            en: 'Step 3: Overflow Check',
          },
          detail: {
            tr: '+5 - (-5) = +10 sonucu 4-bit işaretli [-8, +7] aralığını aşar. Donanım bunu V = C₃ ⊕ C₄ = 1 ⊕ 0 = 1 ile yakalar.',
            en: '+5 - (-5) = +10 exceeds the 4-bit signed range [-8, +7]. Hardware flags this via V = C₃ ⊕ C₄ = 1 ⊕ 0 = 1.',
          },
        },
      ],
    },
    {
      id: 'w7-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · Half Subtractor (Yarım Çıkarıcı) Denklemleri',
        en: 'Question 5 · Half Subtractor Boolean Equations',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Girişleri x ve y olan (x - y işlemini yapan) bir Half Subtractor devresinde Fark (D) ve Borç (B_out) çıkışlarının Boole ifadeleri hangisidir?',
        en: 'For a Half Subtractor computing (x - y), what are the Boolean equations for Difference (D) and Borrow-out (B_out)?',
      },
      options: [
        "D = x ⊕ y,  B_out = x'y",
        "D = x ⊕ y,  B_out = xy'",
        'D = x ⊙ y,  B_out = xy',
        "D = x'y + xy',  B_out = x + y'",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: 4 Durumu İncele (x - y)',
            en: 'Step 1: Inspect All 4 Input Rows (x - y)',
          },
          detail: {
            tr: '0 - 0 = D:0, B:0 | 0 - 1 = D:1, B:1 (borç gerekir!) | 1 - 0 = D:1, B:0 | 1 - 1 = D:0, B:0.',
            en: '0 - 0 = D:0, B:0 | 0 - 1 = D:1, B:1 (borrow needed!) | 1 - 0 = D:1, B:0 | 1 - 1 = D:0, B:0.',
          },
        },
        {
          title: {
            tr: 'Adım 2: Denklemleri Yaz',
            en: 'Step 2: Write the Equations',
          },
          detail: {
            tr: "Fark D yalnızca bitler farklıyken 1 olur (x ⊕ y). Borç B_out ise yalnızca x=0 ve y=1 iken 1 olur (x'y).",
            en: "Difference D = 1 only when bits differ (x ⊕ y). Borrow B_out = 1 only when x=0 and y=1 (x'y).",
          },
        },
      ],
    },
    {
      id: 'w7-q6',
      type: 'simulator-build',
      title: {
        tr: 'Soru 6 · Full Adder Devresini Temel Kapılarla Kurun (Canlı Lab)',
        en: 'Question 6 · Build a Full Adder with Basic Gates (Live Lab)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Simülatörde A, B ve Cin girişlerini kullanarak Sum ve Cout çıkışlarını üreten 1-bitlik Full Adder devresini XOR, AND ve OR kapılarıyla kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.',
        en: 'Build a 1-bit Full Adder (inputs A, B, Cin → outputs Sum, Cout) in the simulator using XOR, AND, and OR gates, and verify against all 8 truth table rows.',
      },
      inputs: ['A', 'B', 'Cin'],
      outputs: ['Sum', 'Cout'],
      allowedComponents: ['XOR', 'AND', 'OR'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, Cin: 0 }, outputs: { Sum: 0, Cout: 0 } },
        { inputs: { A: 0, B: 0, Cin: 1 }, outputs: { Sum: 1, Cout: 0 } },
        { inputs: { A: 0, B: 1, Cin: 0 }, outputs: { Sum: 1, Cout: 0 } },
        { inputs: { A: 0, B: 1, Cin: 1 }, outputs: { Sum: 0, Cout: 1 } },
        { inputs: { A: 1, B: 0, Cin: 0 }, outputs: { Sum: 1, Cout: 0 } },
        { inputs: { A: 1, B: 0, Cin: 1 }, outputs: { Sum: 0, Cout: 1 } },
        { inputs: { A: 1, B: 1, Cin: 0 }, outputs: { Sum: 0, Cout: 1 } },
        { inputs: { A: 1, B: 1, Cin: 1 }, outputs: { Sum: 1, Cout: 1 } },
      ],
      hint: {
        tr: '1) XOR1(A, B) ile ara toplamı üretin, XOR2(XOR1, Cin) çıkışını Sum LED\'ine bağlayın. 2) AND1(A, B) ve AND2(Cin, XOR1) çıkışlarını bir OR kapısına vererek Cout LED\'ine iletin.',
        en: '1) Compute partial sum with XOR1(A, B), then feed XOR1 and Cin into XOR2 for Sum. 2) Feed AND1(A, B) and AND2(Cin, XOR1) into an OR gate to drive Cout.',
      },
      solutionDescription: {
        tr: 'Sum = (A ⊕ B) ⊕ Cin ve Cout = (A · B) + Cin · (A ⊕ B) denklemleri 2 XOR, 2 AND ve 1 OR kapısı kullanılarak 2 Half Adder hiyerarşisiyle kurulur.',
        en: 'Sum = (A ⊕ B) ⊕ Cin and Cout = (A · B) + Cin · (A ⊕ B) are realized hierarchically as two Half Adders using 2 XOR, 2 AND, and 1 OR gate.',
      },
    },
    {
      id: 'w7-q7',
      type: 'simulator-build',
      title: {
        tr: 'Soru 7 · Kontrollü Adder-Subtractor Hücresi (Canlı Lab)',
        en: 'Question 7 · Mode-Controlled Adder-Subtractor Cell (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'Mod kontrol girişi M ile çalışan tek bitlik Adder-Subtractor hücresini (A, B, Cin, M → S, Cout) kurun. M=0 iken B aynen geçmeli (toplama), M=1 iken B terslenmelidir (B ⊕ M). Tüm 16 giriş kombinasyonuna karşı doğrulayın.',
        en: 'Build a 1-bit mode-controlled Adder-Subtractor cell (A, B, Cin, M → S, Cout). When M=0, B passes unchanged (add); when M=1, B is inverted (B ⊕ M, subtract). Verify against all 16 combinations.',
      },
      inputs: ['A', 'B', 'Cin', 'M'],
      outputs: ['S', 'Cout'],
      allowedComponents: ['XOR', 'AND', 'OR'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, Cin: 0, M: 0 }, outputs: { S: 0, Cout: 0 } },
        { inputs: { A: 0, B: 0, Cin: 0, M: 1 }, outputs: { S: 1, Cout: 0 } },
        { inputs: { A: 0, B: 0, Cin: 1, M: 0 }, outputs: { S: 1, Cout: 0 } },
        { inputs: { A: 0, B: 0, Cin: 1, M: 1 }, outputs: { S: 0, Cout: 1 } },
        { inputs: { A: 0, B: 1, Cin: 0, M: 0 }, outputs: { S: 1, Cout: 0 } },
        { inputs: { A: 0, B: 1, Cin: 0, M: 1 }, outputs: { S: 0, Cout: 0 } },
        { inputs: { A: 0, B: 1, Cin: 1, M: 0 }, outputs: { S: 0, Cout: 1 } },
        { inputs: { A: 0, B: 1, Cin: 1, M: 1 }, outputs: { S: 1, Cout: 0 } },
        { inputs: { A: 1, B: 0, Cin: 0, M: 0 }, outputs: { S: 1, Cout: 0 } },
        { inputs: { A: 1, B: 0, Cin: 0, M: 1 }, outputs: { S: 0, Cout: 1 } },
        { inputs: { A: 1, B: 0, Cin: 1, M: 0 }, outputs: { S: 0, Cout: 1 } },
        { inputs: { A: 1, B: 0, Cin: 1, M: 1 }, outputs: { S: 1, Cout: 1 } },
        { inputs: { A: 1, B: 1, Cin: 0, M: 0 }, outputs: { S: 0, Cout: 1 } },
        { inputs: { A: 1, B: 1, Cin: 0, M: 1 }, outputs: { S: 1, Cout: 0 } },
        { inputs: { A: 1, B: 1, Cin: 1, M: 0 }, outputs: { S: 1, Cout: 1 } },
        { inputs: { A: 1, B: 1, Cin: 1, M: 1 }, outputs: { S: 0, Cout: 1 } },
      ],
      hint: {
        tr: 'İlk olarak B ve M girişlerini bir XOR kapısına vererek B_eff = B ⊕ M üretin. Ardından A, B_eff ve Cin sinyallerini klasik Full Adder yapısına (2 XOR, 2 AND, 1 OR) bağlayın.',
        en: 'First wire B and M into an XOR gate to produce B_eff = B ⊕ M. Then feed A, B_eff, and Cin into a standard Full Adder (2 XOR, 2 AND, 1 OR).',
      },
      solutionDescription: {
        tr: 'B_eff = B ⊕ M sinyali üretilip Full Adder\'ın ikinci girişine bağlandığında M=0 için A + B + Cin, M=1 için ise A + B\' + Cin hesaplanır.',
        en: 'Feeding B_eff = B ⊕ M into the second input of a Full Adder computes A + B + Cin when M=0 and A + B\' + Cin when M=1.',
      },
    },
  ],
};
