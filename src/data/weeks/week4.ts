import type { WeekModule } from '../../types/curriculum';

export const week4: WeekModule = {
  id: 4,
  weekNumber: 4,
  englishTitle: {
    tr: 'Canonical & Standard Forms',
    en: 'Canonical & Standard Forms',
  },
  turkishSubtitle: {
    tr: 'Minterm, Maxterm, Kanonik SOP/POS Dönüşümleri ve Mantık Kapıları',
    en: 'Minterms, Maxterms, Canonical SOP/POS Conversions & Logic Gates',
  },
  summary: {
    tr: 'Herhangi bir Boole fonksiyonunu standart kanonik biçimlere (Sum of Minterms Σm ve Product of Maxterms ΠM) dönüştürmeyi, iki seviyeli SOP/POS devre yapılarını ve çok girişli NAND/NOR kapılarındaki kritik birleşme (associativity) tuzağını öğrenin.',
    en: 'Learn to express any Boolean function in canonical forms (Sum of Minterms Σm and Product of Maxterms ΠM), compare two-level Standard SOP/POS circuits, and avoid the associativity trap in multi-input NAND/NOR gates.',
  },
  learningObjectives: [
    {
      tr: 'Doğruluk tablosunun her satırı için Minterm (mᵢ) ve Maxterm (Mᵢ) terimlerini yazmak',
      en: 'Write the Minterm (mᵢ) and Maxterm (Mᵢ) corresponding to every row of a truth table',
    },
    {
      tr: 'Kanonik Σm ve ΠM formları ile tümleyen (F\') arasında anında dönüşüm yapmak',
      en: 'Convert effortlessly between Canonical Σm, ΠM, and the complement function F\'',
    },
    {
      tr: 'İki seviyeli standart AND-OR (SOP) ve OR-AND (POS) devrelerini ayırt etmek',
      en: 'Distinguish two-level Standard AND-OR (SOP) and OR-AND (POS) implementations',
    },
    {
      tr: 'XOR/XNOR ile 3+ girişli NAND/NOR kapılarının birleşme özelliği farkını kavramak',
      en: 'Understand associativity rules for XOR/XNOR versus 3+ input NAND/NOR gates',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'TruthTableBuilder',
  recommendedWidgetConfig: {
    variables: 3,
    initialMinterms: [0, 2, 5, 6],
  },
  visualSections: [
    {
      id: 'w4-s1',
      title: {
        tr: '1. Minterm (mᵢ) ve Maxterm (Mᵢ) Kavramı',
        en: '1. Minterms (mᵢ) & Maxterms (Mᵢ)',
      },
      explanation: {
        tr: 'n değişkenli bir Boole fonksiyonunda 2ⁿ adet olası giriş kombinasyonu vardır. Her satır iki şekilde tanımlanabilir:\n• Minterm (mᵢ — Standard Product): Yalnızca o satırda "1" çıkışı üreten AND çarpımıdır. Değişken değeri 1 ise kendisi (x), 0 ise tümleyeni (x\') yazılır.\n• Maxterm (Mᵢ — Standard Sum): Yalnızca o satırda "0" çıkışı üreten OR toplamıdır. Değişken değeri 0 ise kendisi (x), 1 ise tümleyeni (x\') yazılır.\n\nKritik İlişki: Her satır için Minterm ile Maxterm birbirinin tam DeMorgan tümleyenidir: Mᵢ = (mᵢ)\' ve mᵢ = (Mᵢ)\'.',
        en: 'An n-variable Boolean function has 2ⁿ input rows, each represented in two dual ways:\n• Minterm (mᵢ — Standard Product): An AND term that evaluates to "1" ONLY on row i. Write unprimed variable (x) for 1 and primed (x\') for 0.\n• Maxterm (Mᵢ — Standard Sum): An OR term that evaluates to "0" ONLY on row i. Write unprimed variable (x) for 0 and primed (x\') for 1.\n\nKey Identity: On every row i, the Minterm and Maxterm are DeMorgan complements of each other: Mᵢ = (mᵢ)\' and mᵢ = (Mᵢ)\'.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: '3 Değişkenli (x, y, z) Minterm ve Maxterm Tablosu',
            en: '3-Variable (x, y, z) Minterm & Maxterm Table',
          },
          headers: [
            { tr: 'İndeks', en: 'Index' },
            'x y z',
            { tr: 'Minterm (mᵢ) [1 yapar]', en: 'Minterm (mᵢ) [Equals 1]' },
            { tr: 'Maxterm (Mᵢ) [0 yapar]', en: 'Maxterm (Mᵢ) [Equals 0]' },
          ],
          highlightColumn: 2,
          rows: [
            ['0', '0 0 0', "m₀ = x'y'z'", 'M₀ = x + y + z'],
            ['1', '0 0 1', "m₁ = x'y'z", "M₁ = x + y + z'"],
            ['2', '0 1 0', "m₂ = x'yz'", "M₂ = x + y' + z"],
            ['3', '0 1 1', "m₃ = x'yz", "M₃ = x + y' + z'"],
            ['4', '1 0 0', "m₄ = xy'z'", "M₄ = x' + y + z"],
            ['5', '1 0 1', "m₅ = xy'z", "M₅ = x' + y + z'"],
            ['6', '1 1 0', "m₆ = xyz'", "M₆ = x' + y' + z"],
            ['7', '1 1 1', 'm₇ = xyz', "M₇ = x' + y' + z'"],
          ],
        },
      ],
      widget: 'TruthTableBuilder',
      widgetConfig: {
        variables: 3,
        initialMinterms: [0, 2, 5, 6],
      },
      summaryRule: {
        tr: 'Bir fonksiyonun Sum of Minterms (Σm) ve Product of Maxterms (ΠM) index kümeleri {0, 1, ..., 2ⁿ - 1} evrensel kümesini ikiye böler. Her i satırı için Mᵢ = (mᵢ)\' geçerlidir ve F\'nin Σm\'inde olmayan indeksler F\'nin ΠM\'ini oluşturur.',
        en: 'A function\'s Sum of Minterms (Σm) and Product of Maxterms (ΠM) partition the universal set {0, 1, ..., 2ⁿ - 1}. For every row i, Mᵢ = (mᵢ)\', and every index absent from Σm belongs directly to ΠM.',
      },
      examTip: {
        tr: 'Minterm\'de 1 olan değişken düz, 0 olan ters yazılır; Maxterm\'de ise tam tersi olarak 0 olan düz, 1 olan ters yazılır!',
        en: 'In a Minterm, 1 means unprimed (x) and 0 means primed (x\'); in a Maxterm, it is the exact opposite: 0 means unprimed (x) and 1 means primed (x\')!',
      },
    },
    {
      id: 'w4-s2',
      title: {
        tr: '2. Kanonik Formlar (Σm ve ΠM) Arası Hızlı Dönüşüm',
        en: '2. Rapid Conversion Between Canonical Forms (Σm & ΠM)',
      },
      explanation: {
        tr: 'Bir fonksiyonun Doğruluk Tablosunda "1" olan satırlar toplanarak Sum of Minterms (Σm), "0" olan satırlar çarpılarak Product of Maxterms (ΠM) elde edilir. İki gösterim birbirinin tamamlayıcı indeks kümelerinden oluşur:\n\nEğer F(A, B, C) = Σm(1, 3, 5, 7) ise, tabloda geri kalan satırlar {0, 2, 4, 6} olduğundan doğrudan:\n• F(A, B, C) = ΠM(0, 2, 4, 6)\n• F\'(A, B, C) = Σm(0, 2, 4, 6) = ΠM(1, 3, 5, 7) yazılır.',
        en: 'Summing the "1" rows of a truth table yields the Sum of Minterms (Σm), whereas multiplying the "0" rows yields the Product of Maxterms (ΠM). Their index sets are exact complements over {0 .. 2ⁿ-1}:\n\nIf F(A, B, C) = Σm(1, 3, 5, 7), the remaining indices are {0, 2, 4, 6}, giving immediately:\n• F(A, B, C) = ΠM(0, 2, 4, 6)\n• F\'(A, B, C) = Σm(0, 2, 4, 6) = ΠM(1, 3, 5, 7).',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'Cebirsel İfadeden Kanonik SOP (Σm) Elde Etme Yöntemi',
            en: 'Deriving Canonical SOP (Σm) from an Algebraic Expression',
          },
          steps: [
            {
              label: {
                tr: 'Adım 1: Eksik Değişkeni Tespit Et',
                en: 'Step 1: Identify Missing Variables',
              },
              badge: { tr: "Örn: A'B + BC'", en: "Ex: A'B + BC'" },
              detail: {
                tr: "İlk terimde C eksik; ikinci terimde A eksik.\nHer terimi tüm değişkenleri içerecek şekilde genişlet.",
                en: "First term misses C; second term misses A.\nExpand each term to contain all variables.",
              },
            },
            {
              label: {
                tr: "Adım 2: (X + X') = 1 İle Çarp",
                en: "Step 2: Multiply by (X + X') = 1",
              },
              badge: { tr: 'Genişletme', en: 'Expansion' },
              detail: "A'B(C + C') + (A + A')BC'\n= A'BC + A'BC' + ABC' + A'BC'",
            },
            {
              label: {
                tr: 'Adım 3: Tekrarları Ele (x + x = x)',
                en: 'Step 3: Deduplicate (x + x = x)',
              },
              badge: 'Σm(2, 3, 6)',
              detail: {
                tr: "A'BC' (010=2) + A'BC (011=3) + ABC' (110=6)\n⇒ F = Σm(2, 3, 6)",
                en: "A'BC' (010=2) + A'BC (011=3) + ABC' (110=6)\n⇒ F = Σm(2, 3, 6)",
              },
            },
          ],
        },
      ],
      examTip: {
        tr: 'Kanonik form dönüşümlerinde n değişken varsa evrensel küme {0, 1, ..., 2ⁿ-1} elemanlıdır. F\'nin Σm indeksleri ile ΠM indekslerinin birleşimi her zaman tüm 2ⁿ satırı vermelidir.',
        en: 'For n variables, the universal index set is {0, 1, ..., 2ⁿ-1}. The union of Σm indices and ΠM indices for F must always cover all 2ⁿ rows.',
      },
    },
    {
      id: 'w4-s3',
      title: {
        tr: '3. Standart Formlar (SOP & POS) ve İki Seviyeli Devreler',
        en: '3. Standard Forms (SOP & POS) & Two-Level Circuits',
      },
      explanation: {
        tr: 'Kanonik formlarda her terimde tüm değişkenler bulunmak zorundayken, Standart Formlarda (Standard SOP / Standard POS) terimler sadeleştirilmiş olabilir ve daha az literal içerir. Donanım açısından:\n• Standard SOP (Sum of Products): 1. Seviyede AND kapıları, 2. Seviyede tek bir OR kapısı (AND-OR devresi).\n• Standard POS (Product of Sums): 1. Seviyede OR kapıları, 2. Seviyede tek bir AND kapısı (OR-AND devresi).\n\nNot: İki seviyeli devrelerde sinyal en fazla 2 kapı gecikmesinden geçer (Non-standard çok seviyeli formlarda ise gecikme artar).',
        en: 'While canonical terms must contain every variable, Standard Forms (Standard SOP / Standard POS) allow simplified terms with fewer literals. In hardware:\n• Standard SOP (Sum of Products): Level 1 AND gates feeding a single Level 2 OR gate (AND-OR network).\n• Standard POS (Product of Sums): Level 1 OR gates feeding a single Level 2 AND gate (OR-AND network).\n\nNote: Two-level networks incur at most two gate delays, whereas non-standard multi-level networks add propagation delay.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Kanonik vs Standart vs Çok Seviyeli (Non-Standard) Form Karşılaştırması',
            en: 'Comparison: Canonical vs. Standard vs. Non-Standard Forms',
          },
          headers: [
            { tr: 'Form Türü', en: 'Form Type' },
            { tr: 'Örnek İfade', en: 'Example Expression' },
            { tr: 'Kapı Seviyesi', en: 'Gate Levels' },
            { tr: 'Açıklama', en: 'Notes' },
          ],
          highlightColumn: 2,
          rows: [
            [
              'Canonical SOP',
              "x'y'z + x'yz + xyz",
              { tr: '2 Seviye (AND-OR)', en: '2-Level (AND-OR)' },
              {
                tr: 'Her çarpım terimi tüm değişkenleri içerir.',
                en: 'Every product term contains all variables.',
              },
            ],
            [
              'Standard SOP',
              "x'z + yz",
              { tr: '2 Seviye (AND-OR)', en: '2-Level (AND-OR)' },
              {
                tr: 'Sadeleştirilmiş çarpımların toplamıdır; daha az giriş pini ister.',
                en: 'Sum of simplified product terms; fewer gate inputs.',
              },
            ],
            [
              'Standard POS',
              "(x + z')(y + z)",
              { tr: '2 Seviye (OR-AND)', en: '2-Level (OR-AND)' },
              {
                tr: 'Sadeleştirilmiş toplamların çarpımıdır.',
                en: 'Product of simplified sum terms.',
              },
            ],
            [
              'Non-Standard',
              "z(x' + y) + w",
              { tr: '3+ Seviye', en: '3+ Levels' },
              {
                tr: 'Parantezler iç içe geçmiştir; yayılım gecikmesi daha yüksektir.',
                en: 'Factored/nested parentheses; higher propagation delay.',
              },
            ],
          ],
        },
      ],
      examTip: {
        tr: 'Tek bir literal veya tek başına duran bir değişken (ör. F = A + BC) hem SOP hem de POS yapısına uyumlu görünebilir, ancak genel tanımıyla çarpımların toplamı olduğundan Standard SOP olarak sınıflandırılır.',
        en: 'An expression with a standalone literal like F = A + BC is classified as Standard SOP because A is a single-literal product term summed with BC.',
      },
    },
    {
      id: 'w4-s4',
      title: {
        tr: '4. Tüm Mantık Kapıları ve Çok Girişli NAND/NOR Tuzağı',
        en: '4. Digital Logic Gates & the Multi-Input NAND/NOR Trap',
      },
      explanation: {
        tr: 'Temel AND, OR, NOT kapılarının yanı sıra evrensel NAND/NOR ve aritmetik/eşlik kapıları olan XOR/XNOR dijital tasarımın çekirdeğini oluşturur.\n\nKRİTİK SINAV UYARISI (Birleşme Özelliği Tuzağı): AND, OR, XOR ve XNOR kapıları birleşme özelliğine (Associativity) sahiptir: (x ⊕ y) ⊕ z = x ⊕ (y ⊕ z). Ancak NAND (↑) ve NOR (↓) kapılarında BİRLEŞME ÖZELLİĞİ YOKTUR! Yani 3 girişli bir NAND kapısı (x · y · z)\' işlevini yaparken, iki 2-girişli NAND kapısını arka arkaya bağlamak [(x · y)\' · z]\' = xy + z\' üretir ve eşit değildir!',
        en: 'Alongside basic AND, OR, and NOT gates, universal NAND/NOR and arithmetic XOR/XNOR gates form the core of logic design.\n\nCRITICAL EXAM WARNING (Associativity Trap): AND, OR, XOR, and XNOR are associative: (x ⊕ y) ⊕ z = x ⊕ (y ⊕ z). However, NAND (↑) and NOR (↓) are NOT associative! A true 3-input NAND computes (x · y · z)\', whereas cascading two 2-input NAND gates yields [(x · y)\' · z]\' = xy + z\', which is NOT equivalent!',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Temel Mantık Kapılarının Cebirsel İşlevleri ve Birleşme Özelliği',
            en: 'Algebraic Functions & Associativity of Logic Gates',
          },
          headers: [
            { tr: 'Kapı', en: 'Gate' },
            { tr: 'Cebirsel İfade', en: 'Algebraic Function' },
            { tr: 'Çıkışı 1 Yapan Koşul', en: 'Output = 1 Condition' },
            { tr: '3+ Girişe Zincirlenebilir mi? (Associative)', en: 'Associative Across 3+ Inputs?' },
          ],
          highlightColumn: 3,
          rows: [
            [
              'AND',
              'F = x · y',
              { tr: 'Tüm girişler 1 iken', en: 'All inputs equal 1' },
              { tr: 'Evet: (xy)z = x(yz)', en: 'Yes: (xy)z = x(yz)' },
            ],
            [
              'OR',
              'F = x + y',
              { tr: 'En az bir giriş 1 iken', en: 'At least one input is 1' },
              { tr: 'Evet: (x+y)+z = x+(y+z)', en: 'Yes: (x+y)+z = x+(y+z)' },
            ],
            [
              'NAND',
              "F = (x · y)'",
              { tr: 'En az bir giriş 0 iken', en: 'At least one input is 0' },
              { tr: "HAYIR! [(xy)']'z ≠ (xyz)'", en: "NO! [(xy)'z]' ≠ (xyz)'" },
            ],
            [
              'NOR',
              "F = (x + y)'",
              { tr: 'Tüm girişler 0 iken', en: 'All inputs equal 0' },
              { tr: "HAYIR! [(x+y)']'+z ≠ (x+y+z)'", en: "NO! [(x+y)'+z]' ≠ (x+y+z)'" },
            ],
            [
              'XOR',
              "F = x ⊕ y = x'y + xy'",
              { tr: 'Tek sayıda giriş 1 iken (Odd)', en: 'Odd number of 1 inputs' },
              { tr: 'Evet: (x⊕y)⊕z = x⊕(y⊕z)', en: 'Yes: (x⊕y)⊕z = x⊕(y⊕z)' },
            ],
            [
              'XNOR',
              "F = (x ⊕ y)' = xy + x'y'",
              {
                tr: 'Çift sayıda giriş 1 iken (2 girişte Eşitlik)',
                en: 'Even number of 1s (2-input Equivalence)',
              },
              { tr: 'Evet: (x⊙y)⊙z = x⊙(y⊙z)', en: 'Yes: (x⊙y)⊙z = x⊙(y⊙z)' },
            ],
          ],
        },
      ],
      examTip: {
        tr: '3 girişli XOR (A ⊕ B ⊕ C) Odd Function (tek sayıda 1 varsa 1) olarak çalışır. Ancak 3 girişli XNOR yalnızca giriş sayısına bağlı olarak Even Function\'ın tersi olabilir; 3 değişkenli eşitlik dedektörü DEĞİLDİR!',
        en: 'A 3-input XOR (A ⊕ B ⊕ C) works as an Odd Function (1 when an odd number of inputs are 1), whereas a 3-input XNOR is the complement of the Odd Function—NOT an all-3-inputs-equal detector!',
      },
    },
  ],
  questions: [
    {
      id: 'w4-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · Kanonik Sum of Minterms Elde Etme (Mano 2.15)',
        en: 'Question 1 · Deriving Canonical Sum of Minterms (Mano 2.15)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: "F(A, B, C) = A'B + BC' Boole fonksiyonunun kanonik Sum of Minterms (Σm) gösterimi aşağıdakilerden hangisidir?",
        en: "Which of the following is the canonical Sum of Minterms (Σm) form of F(A, B, C) = A'B + BC'?",
      },
      options: [
        'Σm(2, 3, 6)',
        'Σm(1, 3, 6)',
        'Σm(2, 4, 6)',
        'Σm(0, 2, 3, 6)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Eksik Değişkenleri Tamamla',
            en: 'Step 1: Expand Missing Variables',
          },
          detail: "F = A'B(C + C') + (A + A')BC' = A'BC + A'BC' + ABC' + A'BC'",
        },
        {
          title: {
            tr: 'Adım 2: Tekrar Eden Mintermi Teke İndir ve İkili Koda Çevir',
            en: 'Step 2: Deduplicate & Convert Terms to Binary Indices',
          },
          detail: "A'BC' → 010 (m₂) | A'BC → 011 (m₃) | ABC' → 110 (m₆)",
        },
        {
          title: {
            tr: 'Adım 3: Kanonik Gösterimi Yaz',
            en: 'Step 3: Write Canonical Notation',
          },
          detail: 'F(A, B, C) = Σm(2, 3, 6)',
        },
      ],
    },
    {
      id: 'w4-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · Σm → ΠM Dönüşümü ve Sadeleştirme (Mano 2.17)',
        en: 'Question 2 · Σm → ΠM Conversion & Simplification (Mano 2.17)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'F(x, y, z) = Σ(1, 3, 5, 7) fonksiyonunun kanonik Product of Maxterms (ΠM) gösterimi ve en sade cebirsel hali nedir?',
        en: 'What are the canonical Product of Maxterms (ΠM) form and simplest algebraic expression for F(x, y, z) = Σ(1, 3, 5, 7)?',
      },
      options: [
        {
          tr: 'ΠM(0, 2, 4, 6) ve en sade hali F = z',
          en: 'ΠM(0, 2, 4, 6) and simplified F = z',
        },
        {
          tr: "ΠM(0, 2, 4, 6) ve en sade hali F = z'",
          en: "ΠM(0, 2, 4, 6) and simplified F = z'",
        },
        {
          tr: 'ΠM(1, 3, 5, 7) ve en sade hali F = x',
          en: 'ΠM(1, 3, 5, 7) and simplified F = x',
        },
        {
          tr: 'ΠM(0, 2, 4, 6) ve en sade hali F = y + z',
          en: 'ΠM(0, 2, 4, 6) and simplified F = y + z',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Tümleyen İndekslerden ΠM Formunu Yaz',
            en: 'Step 1: Write ΠM from Complementary Indices',
          },
          detail: {
            tr: '3 değişken için tüm indeksler {0..7}. Σ(1, 3, 5, 7) dışındaki indeksler {0, 2, 4, 6} ⇒ ΠM(0, 2, 4, 6).',
            en: 'For 3 variables, total indices are {0..7}. Remaining indices outside Σ(1, 3, 5, 7) are {0, 2, 4, 6} ⇒ ΠM(0, 2, 4, 6).',
          },
        },
        {
          title: {
            tr: 'Adım 2: Mintermlerin İkili Karşılıklarını İncele',
            en: 'Step 2: Inspect Binary Codes of Minterms',
          },
          detail: {
            tr: '1 (001), 3 (011), 5 (101), 7 (111) — Tüm bu tek sayıların en sağ biti z = 1 dir!',
            en: '1 (001), 3 (011), 5 (101), 7 (111) — Every single odd minterm has LSB z = 1!',
          },
        },
        {
          title: {
            tr: 'Adım 3: Cebirsel İspat',
            en: 'Step 3: Algebraic Proof',
          },
          detail: "F = x'y'z + x'yz + xy'z + xyz = z(x'y' + x'y + xy' + xy) = z(1) = z",
        },
      ],
    },
    {
      id: 'w4-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · 4 Değişkenli Kanonik POS Sadeleştirme',
        en: 'Question 3 · 4-Variable Canonical POS Simplification',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'F(A, B, C, D) = Π(0, 2, 4, 6, 8, 10, 12, 14) fonksiyonunun en sade cebirsel karşılığı nedir?',
        en: 'What is the simplest algebraic expression equivalent to F(A, B, C, D) = Π(0, 2, 4, 6, 8, 10, 12, 14)?',
      },
      options: ['F = D', "F = D'", 'F = A', 'F = C + D'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Sıfır Yapan İndekslerin Ortak Özelliğini Bul',
            en: 'Step 1: Find the Pattern of Zero-Producing Indices',
          },
          detail: {
            tr: '0, 2, 4, 6, 8, 10, 12, 14 indekslerinin tamamı ÇİFT sayılardır; yani LSB olan D biti tüm bu durumlarda 0 dır.',
            en: 'Indices 0, 2, 4, 6, 8, 10, 12, 14 are all EVEN integers, meaning the LSB D = 0 in all of them.',
          },
        },
        {
          title: {
            tr: 'Adım 2: Çıkış Davranışını Oku',
            en: 'Step 2: Read Output Behavior',
          },
          detail: {
            tr: 'D = 0 olan tüm 8 satırda F = 0, geri kalan tek indekslerde (D = 1 iken) F = 1 olmaktadır.',
            en: 'F = 0 for all 8 rows with D = 0, and F = 1 for all remaining odd rows (where D = 1).',
          },
        },
        {
          title: {
            tr: 'Adım 3: Sonuç',
            en: 'Step 3: Conclusion',
          },
          detail: {
            tr: 'Dolayısıyla F(A, B, C, D) = Σm(1, 3, 5, 7, 9, 11, 13, 15) = D bulunur.',
            en: 'Therefore, F(A, B, C, D) = Σm(1, 3, 5, 7, 9, 11, 13, 15) = D.',
          },
        },
      ],
    },
    {
      id: 'w4-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · 3 Girişli Odd Function (Tek Eşlik)',
        en: 'Question 4 · 3-Input Odd Function (Odd Parity)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'F(X, Y, Z) = X ⊕ Y ⊕ Z fonksiyonu hangi mintermler için 1 çıkışını üretir?',
        en: 'For which minterms does F(X, Y, Z) = X ⊕ Y ⊕ Z output 1?',
      },
      options: [
        'Σm(1, 2, 4, 7)',
        'Σm(0, 3, 5, 6)',
        'Σm(1, 2, 3, 7)',
        'Σm(0, 1, 6, 7)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: 3-Girişli XOR Kuralı',
            en: 'Step 1: 3-Input XOR Rule',
          },
          detail: {
            tr: 'Çok girişli XOR (Odd Function), girişlerde TEK sayıda 1 (1 adet veya 3 adet) bulunduğunda çıkışa 1 verir.',
            en: 'A multi-input XOR (Odd Function) outputs 1 whenever an ODD number of inputs (1 or 3) equal 1.',
          },
        },
        {
          title: {
            tr: 'Adım 2: Tek Sayıda 1 İçeren 3-Bitlik Sayıları Listele',
            en: 'Step 2: List 3-Bit Numbers with an Odd Number of 1s',
          },
          detail: {
            tr: '001 (1), 010 (2), 100 (4) [bir adet 1] ve 111 (7) [üç adet 1] ⇒ Σm(1, 2, 4, 7).',
            en: '001 (1), 010 (2), 100 (4) [one 1] and 111 (7) [three 1s] ⇒ Σm(1, 2, 4, 7).',
          },
        },
      ],
    },
    {
      id: 'w4-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · Birleşme Özelliği (Associativity) Tuzağı',
        en: 'Question 5 · The Associativity Trap',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'Aşağıdaki Boole operatörü eşitliklerinden hangisi her zaman DOĞRU DEĞİLDİR?',
        en: 'Which of the following Boolean operator identities is NOT always true?',
      },
      options: [
        {
          tr: '(x ↑ y) ↑ z = x ↑ (y ↑ z)   [NAND Operatörü]',
          en: '(x ↑ y) ↑ z = x ↑ (y ↑ z)   [NAND Operator]',
        },
        {
          tr: '(x ⊕ y) ⊕ z = x ⊕ (y ⊕ z)   [XOR Operatörü]',
          en: '(x ⊕ y) ⊕ z = x ⊕ (y ⊕ z)   [XOR Operator]',
        },
        {
          tr: '(x · y) · z = x · (y · z)   [AND Operatörü]',
          en: '(x · y) · z = x · (y · z)   [AND Operator]',
        },
        {
          tr: '(x + y) + z = x + (y + z)   [OR Operatörü]',
          en: '(x + y) + z = x + (y + z)   [OR Operator]',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Karşı Örnek (Counterexample) Testi: x = 1, y = 1, z = 0',
            en: 'Step 1: Counterexample Test: x = 1, y = 1, z = 0',
          },
          detail: {
            tr: 'Sol taraf: (1 ↑ 1) ↑ 0 = 0 ↑ 0 = 1\nSağ taraf: 1 ↑ (1 ↑ 0) = 1 ↑ 1 = 0',
            en: 'LHS: (1 ↑ 1) ↑ 0 = 0 ↑ 0 = 1\nRHS: 1 ↑ (1 ↑ 0) = 1 ↑ 1 = 0',
          },
        },
        {
          title: {
            tr: 'Adım 2: Sonuç',
            en: 'Step 2: Conclusion',
          },
          detail: {
            tr: '1 ≠ 0 olduğu için NAND (↑) ve aynı şekilde NOR (↓) kapıları birleşme özelliğine (associativity) sahip değildir. 3 girişli NAND elde etmek için 2 girişli NAND\'ler doğrudan zincirlenemez!',
            en: 'Since 1 ≠ 0, NAND (↑) and similarly NOR (↓) are NOT associative. You cannot simply cascade 2-input NAND gates to realize a 3-input NAND!',
          },
        },
      ],
    },
    {
      id: 'w4-q6',
      type: 'interactive-table',
      title: {
        tr: 'Soru 6 · Kanonik Σm(0, 2, 5, 6) Doğruluk Tablosu',
        en: 'Question 6 · Truth Table for Canonical Σm(0, 2, 5, 6)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'F(A, B, C) = Σm(0, 2, 5, 6) kanonik fonksiyonunun doğruluk tablosunu F sütununa tıklayarak eksiksiz tamamlayın.',
        en: 'Complete the truth table for the canonical function F(A, B, C) = Σm(0, 2, 5, 6) by clicking each F output cell.',
      },
      headers: ['Minterm', 'A', 'B', 'C', 'F(A, B, C)'],
      rows: [
        [{ value: 'm₀' }, { value: '0' }, { value: '0' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: 'm₁' }, { value: '0' }, { value: '0' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: 'm₂' }, { value: '0' }, { value: '1' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: 'm₃' }, { value: '0' }, { value: '1' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: 'm₄' }, { value: '1' }, { value: '0' }, { value: '0' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: 'm₅' }, { value: '1' }, { value: '0' }, { value: '1' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: 'm₆' }, { value: '1' }, { value: '1' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: 'm₇' }, { value: '1' }, { value: '1' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
      ],
      solutionExplanation: {
        tr: 'Σm(0, 2, 5, 6) gösterimi m₀, m₂, m₅ ve m₆ satırlarının 1, diğer satırların (ΠM(1, 3, 4, 7)) ise 0 olması gerektiğini belirtir.',
        en: 'Σm(0, 2, 5, 6) specifies that rows m₀, m₂, m₅, and m₆ output 1, while the remaining rows ΠM(1, 3, 4, 7) output 0.',
      },
    },
    {
      id: 'w4-q7',
      type: 'simulator-build',
      title: {
        tr: 'Soru 7 · 3-Bit Odd Parity (Tek Eşlik) Üreteci (Canlı Lab)',
        en: 'Question 7 · 3-Bit Odd Parity Generator (Live Lab)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: '3-bit Odd Parity (Tek Eşlik) üreteci olan F(A, B, C) = Σm(1, 2, 4, 7) = A ⊕ B ⊕ C fonksiyonunu simülatörde XOR kapıları kullanarak kurun ve tüm 8 giriş kombinasyonuna karşı doğrulayın.',
        en: 'Build the 3-bit Odd Parity generator F(A, B, C) = Σm(1, 2, 4, 7) = A ⊕ B ⊕ C in the simulator using XOR gates and verify against all 8 input combinations.',
      },
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['XOR'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: {
        tr: 'XOR birleşme özelliğine sahip olduğundan 2 adet 2-girişli XOR kapısını kaskat bağlayabilirsiniz: İlk XOR\'a A ve B bağlayın, çıktısını C ile birlikte ikinci XOR\'a verip F LED\'ine iletin.',
        en: 'Because XOR is associative, cascade two 2-input XOR gates: feed A and B into the first XOR gate, then wire its output with C into the second XOR gate feeding LED F.',
      },
      solutionDescription: {
        tr: '(A ⊕ B) ⊕ C kaskat devresi toplamda 2 adet XOR kapısı kullanır ve girişlerde tek sayıda 1 olduğunda (001, 010, 100, 111) F çıkışını 1 yapar.',
        en: 'The cascaded (A ⊕ B) ⊕ C circuit uses 2 XOR gates and sets output F = 1 whenever an odd number of inputs equal 1 (001, 010, 100, 111).',
      },
    },
  ],
};
