import type { WeekModule } from '../../types/curriculum';

export const week3: WeekModule = {
  id: 3,
  weekNumber: 3,
  englishTitle: {
    tr: 'Boolean Algebra & Logic Gates',
    en: 'Boolean Algebra & Logic Gates',
  },
  turkishSubtitle: {
    tr: 'Huntington Aksiyomları, Dualite İlkesi, DeMorgan Yasaları ve Consensus Teoremi',
    en: 'Huntington Postulates, Principle of Duality, DeMorgan Laws & Consensus Theorem',
  },
  summary: {
    tr: 'İki değerli Boole cebirinin aksiyomatik temelini, Dualite ilkesini, DeMorgan teoreminin kapı seviyesinde uygulanışını, Consensus teoremiyle cebirsel sadeleştirmeyi ve fonksiyon tümleyeni (F\') almayı öğrenin.',
    en: 'Master the axiomatic foundation of two-valued Boolean algebra, the Principle of Duality, gate-level DeMorgan transformations, algebraic simplification via the Consensus Theorem, and fast function complementation (F\').',
  },
  learningObjectives: [
    {
      tr: 'Huntington aksiyomlarını ve Dualite İlkesini (Principle of Duality) uygulamak',
      en: 'Apply Huntington’s postulates and the Principle of Duality',
    },
    {
      tr: 'DeMorgan yasaları ve baloncuk itme (bubble pushing) ile ifadeleri dönüştürmek',
      en: 'Transform expressions using DeMorgan’s laws and gate-level bubble pushing',
    },
    {
      tr: 'Yutma (Absorption) ve Consensus Teoremi ile Boole ifadelerini minimum literale indirgemek',
      en: 'Minimize Boolean expressions to minimum literals using Absorption and the Consensus Theorem',
    },
    {
      tr: 'Verilen bir F fonksiyonunun tümleyenini (F\') iki farklı yöntemle hızlıca türetmek',
      en: 'Derive the complement (F\') of any Boolean function using two distinct methods',
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
      id: 'w3-s1',
      title: {
        tr: '1. Huntington Aksiyomları ve Dualite İlkesi (Principle of Duality)',
        en: '1. Huntington Postulates & the Principle of Duality',
      },
      explanation: {
        tr: 'Boole cebiri, {0, 1} kümesi üzerinde tanımlı VE (·), VEYA (+) ve DEĞİL (\') operatörlerinden oluşur. Dualite İlkesine göre, geçerli herhangi bir Boole eşitliğinde "+" ile "·" operatörleri ve "0" ile "1" birim elemanları karşılıklı olarak yer değiştirilirse elde edilen yeni ifade de daima geçerlidir.',
        en: 'Two-valued Boolean algebra operates on {0, 1} with AND (·), OR (+), and NOT (\') operators. By the Principle of Duality, any valid Boolean identity remains valid if you interchange "+" with "·" and "0" with "1" throughout the equation.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Temel Boole Teoremleri ve Dual Çiftleri (Mano Tablo 2.1)',
            en: 'Basic Boolean Theorems & Dual Pairs (Mano Table 2.1)',
          },
          headers: [
            { tr: 'Teorem / Yasa Adı', en: 'Theorem / Law' },
            { tr: 'Birincil Form (a)', en: 'Primary Form (a)' },
            { tr: 'Dual Form (b)', en: 'Dual Form (b)' },
          ],
          highlightColumn: 2,
          rows: [
            [{ tr: 'Birim Eleman (Identity)', en: 'Identity Element' }, 'x + 0 = x', 'x · 1 = x'],
            [{ tr: 'Sıfır / Yutan Eleman (Null)', en: 'Null / Dominance Law' }, 'x + 1 = 1', 'x · 0 = 0'],
            [{ tr: 'Tek Kuvvet (Idempotence)', en: 'Idempotence' }, 'x + x = x', 'x · x = x'],
            [{ tr: 'Tümleyen (Complement)', en: 'Complementarity' }, "x + x' = 1", "x · x' = 0"],
            [{ tr: 'Çift Tümleyen (Involution)', en: 'Involution' }, "(x')' = x", "(x')' = x"],
            [{ tr: 'Dağılma (Distributive)', en: 'Distributive Law' }, 'x(y + z) = xy + xz', 'x + yz = (x + y)(x + z)'],
            [{ tr: 'Yutma (Absorption)', en: 'Absorption' }, 'x + xy = x', 'x(x + y) = x'],
            [{ tr: 'Sadeleştirme', en: 'Simplification' }, "x + x'y = x + y", "x(x' + y) = xy"],
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'timing-waveform-gates',
          caption: {
            tr: 'Vektörel Zamanlama Şeması: AND, OR ve XOR Kapılarının Giriş Dalgalarına Tepkisi',
            en: 'Vector Timing Diagram: AND, OR & XOR Gate Responses to Input Waveforms',
          },
          equation: 'F_AND = A · B,   F_OR = A + B,   F_XOR = A ⊕ B',
          summary: {
            tr: 't₀..t₅ aralıklarında A ve B işaretlerinin kombinasyonuna göre AND yalnızca ikisi 1 iken, OR en az biri 1 iken, XOR ise yalnızca farklı olduklarında 1 üretir.',
            en: 'Across intervals t₀..t₅, AND asserts when both A and B are 1, OR when either is 1, and XOR only when A and B differ.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      examTip: {
        tr: 'Sıradan cebirde geçerli olmayan x + yz = (x + y)(x + z) ikinci dağılma yasası, Boole sadeleştirme sorularının en güçlü silahıdır!',
        en: 'The second distributive law x + yz = (x + y)(x + z) does NOT hold in ordinary algebra, yet it is one of your strongest tools in Boolean simplification!',
      },
    },
    {
      id: 'w3-s2',
      title: {
        tr: '2. DeMorgan Yasaları ve Baloncuk İtme (Bubble Pushing)',
        en: '2. DeMorgan’s Laws & Gate-Level Bubble Pushing',
      },
      explanation: {
        tr: 'Augustus DeMorgan tarafından formüle edilen iki temel yasa, tümleyen (NOT) operatörünü parantez içine dağıtırken operatörün türünü değiştirir:\n• 1. Yasa: (x + y)\' = x\' · y\'  (NOR kapısı = girişleri terslenmiş AND kapısı)\n• 2. Yasa: (x · y)\' = x\' + y\'  (NAND kapısı = girişleri terslenmiş OR kapısı)\n\nKapı diyagramlarında çıkış baloncuğunu (NOT) girişe doğru iterken kapının gövdesini AND ↔ OR arasında değiştirirseniz devrenin mantığı değişmez (Bubble Pushing).',
        en: 'Formulated by Augustus DeMorgan, two fundamental laws flip the binary operator when distributing complementation across parentheses:\n• Law 1: (x + y)\' = x\' · y\'  (NOR gate ≡ Bubbled-input AND gate)\n• Law 2: (x · y)\' = x\' + y\'  (NAND gate ≡ Bubbled-input OR gate)\n\nIn schematic diagrams, pushing an output inversion bubble back to the inputs while toggling the gate body between AND ↔ OR preserves exact logical equivalence (Bubble Pushing).',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'DeMorgan Yasalarının Kapı Seviyesinde Görsel Eşdeğerliği',
            en: 'Visual Gate-Level Equivalence of DeMorgan’s Laws',
          },
          steps: [
            {
              label: "DeMorgan I: (x + y)' = x' · y'",
              badge: 'NOR ≡ Bubbled-AND',
              detail: {
                tr: 'OR çıkışındaki tümleyen baloncuğu girişlere itildiğinde kapı AND kapısına dönüşür ve her iki girişe baloncuk eklenir.',
                en: 'Pushing the OR output bubble to the inputs converts the gate into an AND gate with bubbles on both inputs.',
              },
            },
            {
              label: "DeMorgan II: (x · y)' = x' + y'",
              badge: 'NAND ≡ Bubbled-OR',
              detail: {
                tr: 'AND çıkışındaki tümleyen baloncuğu girişlere itildiğinde kapı OR kapısına dönüşür ve her iki girişe baloncuk eklenir.',
                en: 'Pushing the AND output bubble to the inputs converts the gate into an OR gate with bubbles on both inputs.',
              },
            },
            {
              label: {
                tr: 'Operatör Önceliği',
                en: 'Operator Precedence',
              },
              badge: "() > ' > · > +",
              detail: {
                tr: 'Önce parantezler, sonra tümleyen (\'), ardından VE (·) ve en son VEYA (+) işlemi değerlendirilir.',
                en: 'Evaluate parentheses first, then NOT (\'), followed by AND (·), and finally OR (+).',
              },
            },
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'demorgan-bubble-push',
          caption: {
            tr: 'Vektörel Devre Şeması: DeMorgan Yasaları ve Baloncuk İtme (Bubble Pushing)',
            en: 'Vector Circuit Schematic: DeMorgan’s Laws & Bubble Pushing',
          },
          equation: "(x · y)' = x' + y' (NAND ≡ Bubbled-OR)   |   (x + y)' = x' · y' (NOR ≡ Bubbled-AND)",
          summary: {
            tr: 'Çıkış baloncuğunu girişlere iterken kapı gövdesini AND ↔ OR arasında değiştirmek mantıksal işlevi birebir korur.',
            en: 'Pushing an output inversion bubble back to the inputs while toggling the gate body between AND ↔ OR preserves exact equivalence.',
          },
          collapsible: true,
          defaultOpen: true,
        },
        {
          kind: 'schematic',
          diagramId: 'universal-nand-nor-gates',
          caption: {
            tr: 'Vektörel Devre Şeması: Evrensel NAND ve NOR Kapılarıyla NOT, AND, OR ve XOR Sentezi',
            en: 'Vector Circuit Schematic: Synthesizing NOT, AND, OR & XOR Using Universal NAND/NOR Gates',
          },
          equation: "NOT(x) = (x·x)' = (x+x)'   |   XOR = 4 × NAND",
          summary: {
            tr: 'Tek bir evrensel kapı ailesi (yalnızca NAND veya yalnızca NOR) kullanılarak tüm temel Boole işlemleri ve 4 kapılı XOR devresi kurulabilir.',
            en: 'Either universal gate family alone (NAND-only or NOR-only) can implement NOT, AND, OR, and a 4-gate XOR network.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      summaryRule: {
        tr: 'DeMorgan Yasaları tümleyen operatörünü parantez içine dağıtırken AND ↔ OR dönüşümü yapar: (x + y)\' = x\' · y\' ve (x · y)\' = x\' + y\'. Şemalarda çıkış baloncuğunu girişlere iterken kapıyı da tersine çevirmek (Bubble Pushing) eşdeğerliği korur.',
        en: 'DeMorgan\'s Laws distribute complementation while toggling AND ↔ OR: (x + y)\' = x\' · y\' and (x · y)\' = x\' + y\'. In schematics, pushing a bubble across a gate body while swapping AND ↔ OR preserves exact logic.',
      },
      examTip: {
        tr: 'DeMorgan uygularken en sık yapılan hata tümleyenin parantez içindeki terimler arasında · ve + işaretini değiştirmeyi unutmaktır. Her zaman operatörü de çevirin!',
        en: 'The most common DeMorgan mistake is forgetting to flip · ↔ + between terms inside parentheses. Always invert both the literals and the operator!',
      },
    },
    {
      id: 'w3-s3',
      title: {
        tr: '3. Cebirsel Sadeleştirme ve Consensus Teoremi',
        en: '3. Algebraic Simplification & the Consensus Theorem',
      },
      explanation: {
        tr: 'Bir lojik devrede kapı maliyetini (literal ve terim sayısını) düşürmek için cebirsel sadeleştirme yapılır. Özellikle üç değişkenli ifadelerde saklı kalan fazlalık terimleri yakalamak için Consensus Teoremi kullanılır:\n\nSOP Consensus: xy + x\'z + yz = xy + x\'z\nPOS (Dual) Consensus: (x + y)(x\' + z)(y + z) = (x + y)(x\' + z)\n\n💡 Sezgisel Mantık: Bir terimde x, diğerinde x\' varsa; kalan kısımların çarpımı olan yz terimi (Consensus terimi) zaten diğer iki terim tarafından kapsanır. Çünkü x=1 ise xy=y, x=0 ise x\'z=z olur; y=1 ve z=1 olduğunda x ne olursa olsun ifadelerden biri mutlaka 1 olur!',
        en: 'Algebraic minimization reduces gate and literal counts. To catch hidden redundant terms in three-variable expressions, apply the Consensus Theorem:\n\nSOP Consensus: xy + x\'z + yz = xy + x\'z\nPOS (Dual) Consensus: (x + y)(x\' + z)(y + z) = (x + y)(x\' + z)\n\n💡 Intuition: Whenever one term contains x and another contains x\', the product of their remaining literals (yz, the consensus term) is already covered by the first two terms—because when y=1 and z=1, either xy=1 (if x=1) or x\'z=1 (if x=0)!',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: "Consensus Teoremi İspatı: xy + x'z + yz = xy + x'z",
            en: "Proof of Consensus Theorem: xy + x'z + yz = xy + x'z",
          },
          steps: [
            {
              label: {
                tr: "Adım 1: (x + x') = 1 Çarpanı Ekle",
                en: "Step 1: Multiply yz by (x + x') = 1",
              },
              badge: { tr: 'Genişletme', en: 'Expansion' },
              detail: "xy + x'z + yz(x + x')\n= xy + x'z + xyz + x'yz",
            },
            {
              label: {
                tr: 'Adım 2: Ortak Paranteze Al',
                en: 'Step 2: Factor Common Terms',
              },
              badge: { tr: 'Gruplama', en: 'Factoring' },
              detail: "xy(1 + z) + x'z(1 + y)",
            },
            {
              label: {
                tr: 'Adım 3: (1 + A = 1) Uygula',
                en: 'Step 3: Apply (1 + A = 1)',
              },
              badge: { tr: 'Yutma', en: 'Elimination' },
              detail: {
                tr: "xy(1) + x'z(1) = xy + x'z\n(yz fazlalık terimi elendi!)",
                en: "xy(1) + x'z(1) = xy + x'z\n(Redundant consensus term yz eliminated!)",
              },
            },
          ],
        },
      ],
      examTip: {
        tr: 'Bir ifadede hem A hem A\' geçiyorsa, yanında A/A\' bulunmayan diğer terimin (Consensus) elenip elenemediğini mutlaka kontrol edin!',
        en: 'Whenever both A and A\' appear in an expression, check whether a third term lacking A/A\' is their redundant Consensus term!',
      },
    },
    {
      id: 'w3-s4',
      title: {
        tr: "4. Boole Fonksiyonunun Tümleyeni (F') Alma Teknikleri",
        en: "4. Techniques for Finding a Function's Complement (F')",
      },
      explanation: {
        tr: "Herhangi bir F fonksiyonunun tümleyeni (F') iki yolla bulunabilir:\n1) Ardışıl DeMorgan Yöntemi: Tüm ifadeyi parantez içine alıp dışına (') koyarak DeMorgan kurallarını adım adım dağıtmak.\n2) 💡 Pratik Kısayol (Dualite + Literalleri Tersleme): Önce ifadenin Dualini al (+ ile · yer değiştir, varsa 0 ile 1 yer değiştir), ardından parantez önceliklerini koruyarak her bir literal değişkeni kendi tümleyeniyle değiştir (x ↔ x').",
        en: "The complement F' of any Boolean function F can be found in two ways:\n1) Successive DeMorgan: Wrap the entire expression in parentheses with (') and distribute DeMorgan’s laws step by step.\n2) 💡 Quick Method (Dual + Invert Literals): First take the Dual of F (swap + ↔ · and 0 ↔ 1 while preserving parentheses), then complement every individual literal (x ↔ x').",
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: "Hızlı Yöntem Örneği: F = x(y'z' + yz) İfadesinin F' Tümleyeni",
            en: "Quick Method Example: Complement F' of F = x(y'z' + yz)",
          },
          steps: [
            {
              label: {
                tr: 'Adım 1: Orijinal Fonksiyon',
                en: 'Step 1: Original Function',
              },
              badge: 'F',
              detail: {
                tr: "F = x · (y'·z' + y·z)\nÖrtük · operatörlerine dikkat et!",
                en: "F = x · (y'·z' + y·z)\nMake implicit · operators explicit!",
              },
            },
            {
              label: {
                tr: 'Adım 2: Dualini Al (+ ↔ ·)',
                en: 'Step 2: Take the Dual (+ ↔ ·)',
              },
              badge: 'F_dual',
              detail: "F_dual = x + (y' + z') · (y + z)",
            },
            {
              label: {
                tr: 'Adım 3: Literalleri Tersle',
                en: 'Step 3: Invert Every Literal',
              },
              badge: "F'",
              detail: "F' = x' + (y + z)(y' + z')",
            },
          ],
        },
      ],
      examTip: {
        tr: 'Dualite kısayolunu kullanırken gizli çarpım (·) noktalarını ve parantezleri kaybetmemek için önce tüm terimleri açıkça · ve () ile yazın.',
        en: 'Before applying the Dual shortcut, write out implicit AND (·) operators and parentheses explicitly so operator precedence is never lost.',
      },
    },
  ],
  questions: [
    {
      id: 'w3-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · Temel Cebirsel Sadeleştirme (Mano 2.2)',
        en: 'Question 1 · Basic Algebraic Simplification (Mano 2.2)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: "F = x'y'z + x'yz + xy' Boole fonksiyonunun en sade hali aşağıdakilerden hangisidir?",
        en: "What is the most simplified form of the Boolean function F = x'y'z + x'yz + xy'?",
      },
      options: ["x'z + xy'", "x'y + xz'", "x'z + x'y", "xz + x'y'"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: İlk İki Terimi Ortak Paranteze Al',
            en: 'Step 1: Factor Common Literals in the First Two Terms',
          },
          detail: "F = x'z(y' + y) + xy'",
        },
        {
          title: {
            tr: "Adım 2: (y' + y) = 1 Özdeşliğini Uygula",
            en: "Step 2: Apply Complement Identity (y' + y) = 1",
          },
          detail: "F = x'z(1) + xy' = x'z + xy'",
        },
        {
          title: {
            tr: 'Adım 3: İleri Sadeleştirme Kontrolü',
            en: 'Step 3: Check for Further Reduction',
          },
          detail: {
            tr: "x'z ve xy' terimleri tek bir literal farkı taşımaz; dolayısıyla en sade SOP formu x'z + xy' olarak kalır.",
            en: "Terms x'z and xy' do not differ by only one variable, so x'z + xy' is the minimum SOP form.",
          },
        },
      ],
    },
    {
      id: 'w3-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · Çok Adımlı Sadeleştirme ve Yutma (Mano 2.3)',
        en: 'Question 2 · Multi-Step Simplification & Absorption (Mano 2.3)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "F = A'C + A'B + AB'C + BC Boole fonksiyonunun en az literalli sadeleştirilmiş hali nedir?",
        en: "Simplify F = A'C + A'B + AB'C + BC to the expression with the fewest literals:",
      },
      options: ["A'B + C", "A'C + B", 'AB + C', "A'B + B'C"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: "Adım 1: A'C + AB'C İfadesini C Parantezinde Sadeleştir",
            en: "Step 1: Factor C Out of A'C + AB'C",
          },
          detail: {
            tr: "A'C + AB'C = C(A' + AB') = C(A' + B') = A'C + B'C  [x' + xy = x' + y kuralı]",
            en: "A'C + AB'C = C(A' + AB') = C(A' + B') = A'C + B'C  [using x' + xy = x' + y]",
          },
        },
        {
          title: {
            tr: "Adım 2: B'C ile BC Terimlerini Birleştir",
            en: "Step 2: Combine B'C and BC",
          },
          detail: "B'C + BC = C(B' + B) = C",
        },
        {
          title: {
            tr: 'Adım 3: Kalan Terimleri Toparla ve Yutma Uygula',
            en: 'Step 3: Collect Remaining Terms & Absorb',
          },
          detail: "F = A'C + A'B + C = C(A' + 1) + A'B = C + A'B = A'B + C",
        },
      ],
    },
    {
      id: 'w3-q3',
      type: 'multiple-choice',
      title: {
        tr: "Soru 3 · Fonksiyon Tümleyeni (F') Bulma (Mano 2.11)",
        en: "Question 3 · Finding the Complement F' (Mano 2.11)",
      },
      difficulty: 'Orta',
      prompt: {
        tr: "F = (A + B')(C' + D) fonksiyonunun tümleyeni (F') aşağıdakilerden hangisidir?",
        en: "What is the complement F' of the Boolean function F = (A + B')(C' + D)?",
      },
      options: ["A'B + CD'", "A'B' + C'D", "(A' + B)(C + D')", "AB' + C'D"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Yöntem 1: DeMorgan Yasası ile Dağıtım',
            en: 'Method 1: Distributing via DeMorgan’s Law',
          },
          detail: "F' = [(A + B') · (C' + D)]' = (A + B')' + (C' + D)' = A'B + CD'",
        },
        {
          title: {
            tr: 'Yöntem 2: Dualite + Literal Tersleme Kısayolu',
            en: 'Method 2: Dual + Invert Literals Shortcut',
          },
          detail: {
            tr: "Dual: (A·B') + (C'·D)  ⇒  Literalleri tersle: A'B + CD'",
            en: "Dual: (A·B') + (C'·D)  ⇒  Invert literals: A'B + CD'",
          },
        },
      ],
    },
    {
      id: 'w3-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · Dual Consensus Teoremi',
        en: 'Question 4 · Dual Consensus Theorem Proof',
      },
      difficulty: 'Orta',
      prompt: {
        tr: "(x + y)(x' + z)(y + z) çarpım ifadesi hangi teorem gereği (x + y)(x' + z) ifadesine eşittir?",
        en: "By which theorem does the product (x + y)(x' + z)(y + z) simplify to (x + y)(x' + z)?",
      },
      options: [
        { tr: 'Dual Consensus Teoremi', en: 'Dual Consensus Theorem' },
        { tr: 'Idempotence (Tek Kuvvet) Yasası', en: 'Idempotence Law' },
        { tr: 'Involution (Çift Tümleyen) Teoremi', en: 'Involution Theorem' },
        { tr: 'DeMorgan Birleşme Özelliği', en: 'DeMorgan Associative Property' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: SOP Consensus Teoreminin Dualini Yaz',
            en: 'Step 1: Take the Dual of the SOP Consensus Theorem',
          },
          detail:
            "SOP Consensus: xy + x'z + yz = xy + x'z\nDual (+ ↔ ·): (x + y)(x' + z)(y + z) = (x + y)(x' + z)",
        },
        {
          title: {
            tr: 'Adım 2: Sezgisel Doğrulama',
            en: 'Step 2: Intuitive Check',
          },
          detail: {
            tr: "y = 0 ve z = 0 olduğunda (y+z)=0 olur; fakat x=0 ise (x+y)=0, x=1 ise (x'+z)=0 olduğundan ilk iki çarpan zaten 0 üretir. Dolayısıyla (y+z) fazlalık (redundant) çarpandır.",
            en: "Whenever y = 0 and z = 0 making (y+z)=0, either x=0 makes (x+y)=0 or x=1 makes (x'+z)=0, so the first two factors already force 0. Thus (y+z) is redundant.",
          },
        },
      ],
    },
    {
      id: 'w3-q5',
      type: 'interactive-table',
      title: {
        tr: 'Soru 5 · Cebirsel İfadenin Doğruluk Tablosu',
        en: 'Question 5 · Truth Table of an Algebraic Expression',
      },
      difficulty: 'Temel',
      prompt: {
        tr: "F(x, y, z) = x'y + xz' fonksiyonu için 8 satırlık doğruluk tablosundaki F çıkışlarını (0 veya 1 olarak tıklayarak) doldurun.",
        en: "Fill in the 8 output values F for F(x, y, z) = x'y + xz' by clicking each cell (0 or 1).",
      },
      headers: ['x', 'y', 'z', "F = x'y + xz'"],
      rows: [
        [{ value: '0' }, { value: '0' }, { value: '0' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: '0' }, { value: '0' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: '0' }, { value: '1' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: '0' }, { value: '1' }, { value: '1' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: '1' }, { value: '0' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: '1' }, { value: '0' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: '1' }, { value: '1' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: '1' }, { value: '1' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
      ],
      solutionExplanation: {
        tr: "x = 0 iken F = y (satır 2 ve 3 → 1); x = 1 iken F = z' (satır 4 ve 6 → 1). Sonuç: [0, 0, 1, 1, 1, 0, 1, 0].",
        en: "When x = 0, F = y (rows 2 and 3 → 1); when x = 1, F = z' (rows 4 and 6 → 1). Output vector: [0, 0, 1, 1, 1, 0, 1, 0].",
      },
    },
    {
      id: 'w3-q6',
      type: 'simulator-build',
      title: {
        tr: 'Soru 6 · Sadeleştir ve 2 Kapıyla Kur (Canlı Lab)',
        en: 'Question 6 · Simplify & Build with 2 Gates (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'F(A, B, C) = AB + A(B + C) + B(B + C) fonksiyonunu önce cebirsel olarak en sade biçimine (F = B + AC) indirgeyin. Ardından simülatörde YALNIZCA 1 adet AND ve 1 adet OR kapısı kullanarak devreyi kurup doğrulayın.',
        en: 'First simplify F(A, B, C) = AB + A(B + C) + B(B + C) algebraically to its minimal form (F = B + AC). Then build and verify the circuit in the simulator using ONLY 1 AND gate and 1 OR gate.',
      },
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['AND', 'OR'],
      maxComponents: { AND: 1, OR: 1 },
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: {
        tr: 'A ve C girişlerini 1 adet AND kapısına bağlayıp (AC) üretin; ardından AND çıkışını ve B girişini 1 adet OR kapısına bağlayıp F LED\'ine iletin.',
        en: 'Feed inputs A and C into 1 AND gate to produce AC; then feed that AND output and input B into 1 OR gate and connect its output to LED F.',
      },
      solutionDescription: {
        tr: 'Cebirsel sadeleştirme: AB + AB + AC + BB + BC = AB + AC + B + BC = B(1 + A + C) + AC = B + AC. Bu sayede 5 kapılı devre yalnızca 1 AND + 1 OR ile gerçeklenir.',
        en: 'Algebraic reduction: AB + AB + AC + BB + BC = AB + AC + B + BC = B(1 + A + C) + AC = B + AC. Thus a 5-gate circuit collapses to just 1 AND + 1 OR gate.',
      },
    },
  ],
};
