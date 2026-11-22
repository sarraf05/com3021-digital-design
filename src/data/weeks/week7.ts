import type { WeekModule } from '../../types/curriculum';

export const week7: WeekModule = {
  id: 7,
  weekNumber: 7,
  englishTitle: 'Combinational Logic I (Adders & Subtractors)',
  turkishSubtitle: 'Birleşik Devre Tasarım Prosedürü, BCD-to-Excess-3, Half/Full Adder ve Adder-Subtractor',
  summary:
    'Çıkışları yalnızca o anki girişlere bağlı olan Combinational Logic devrelerinin 5 adımlı tasarım metodolojisini, 4-bit BCD-to-Excess-3 kod dönüştürücü vaka analizini, Half/Full Adder hiyerarşisini, Ripple Carry Adder yayılım gecikmesini ve M-kontrollü 4-bit Adder-Subtractor devresini öğrenin.',
  learningObjectives: [
    'Mano\'nun 5 adımlı birleşik devre tasarım prosedürünü uygulamak',
    '4-bit BCD-to-Excess-3 kod dönüştürücüsünde Don\'t-Care (10–15) kullanarak K-Map sadeleştirmesi yapmak',
    'İki Half Adder ve bir OR kapısıyla Full Adder kurmak; Ripple Carry Adder gecikmesini hesaplamak',
    'M kontrol girişli Binary Adder-Subtractor devresinde Overflow (V = C₃ ⊕ C₄) tespiti yapmak',
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
      title: '1. Birleşik Devre Tasarım Prosedürü ve BCD-to-Excess-3 Vaka Analizi',
      explanation:
        'Combinational (Birleşik) devrelerde çıkışlar hafıza elemanlarına değil, yalnızca o an uygulanan girişlerin anlık değerlerine bağlıdır. Mano Bölüm 4.3–4.4 tasarım prosedürü 5 adımdan oluşur: (1) Problem tanımından giriş ve çıkış sayısını belirle, (2) Giriş/çıkışlara harf ata, (3) Doğruluk tablosunu çıkar, (4) Her çıkış için K-Map ile sadeleştirilmiş Boole denklemini bul, (5) Lojik şemayı çiz.\n\nVaka Analizi (BCD → Excess-3): Girişler (A, B, C, D) yalnızca 0–9 arası BCD değerleri alacağından 10–15 arası 6 kombinasyon Don\'t-Care (X) kabul edilir. Çıkışlar (w, x, y, z) K-Map ile sadeleştirildiğinde z = D\', y = CD + C\'D\', x = B\'C + B\'D + BC\'D\', w = A + BC + BD elde edilir.',
      diagrams: [
        {
          kind: 'table',
          caption: '4-Bit BCD-to-Excess-3 Doğruluk Tablosu (10–15 Arası Don\'t-Care)',
          headers: ['Decimal', 'BCD Giriş (A B C D)', 'Excess-3 Çıkış (w x y z)', 'Sade Çıkış Denklemi'],
          highlightColumn: 2,
          rows: [
            ['0', '0 0 0 0', '0 0 1 1', "z = D' (Her satırda D terslenir)"],
            ['1', '0 0 0 1', '0 1 0 0', "y = CD + C'D' = (C ⊕ D)'"],
            ['2', '0 0 1 0', '0 1 0 1', "x = B'(C + D) + BC'D'"],
            ['4', '0 1 0 0', '0 1 1 1', 'w = A + B(C + D)'],
            ['7', '0 1 1 1', '1 0 1 0', '10–15 arası tüm girişler X'],
            ['9', '1 0 0 1', '1 1 0 0', 'Ortak terim (C+D) paylaşılır'],
          ],
        },
      ],
      examTip:
        'Çok çıkışlı birleşik devrelerde (örn. BCD-to-Excess-3) denklemlerdeki ortak alt ifadeleri (C + D gibi) yakalamak, kapı sayısını önemli ölçüde azaltır!',
    },
    {
      id: 'w7-s2',
      title: '2. Half Adder, Full Adder ve 4-Bit Ripple Carry Adder',
      explanation:
        'Dijital aritmetiğin kalbi toplayıcılardır:\n• Half Adder (HA): 2 giriş (x, y) alır; Sum S = x ⊕ y ve Carry C = xy üretir.\n• Full Adder (FA): Önceki basamaktan gelen eldeyi (C_in) de katarak 3 biti toplar (x, y, C_in → S, C_out). İki adet Half Adder ve bir adet OR kapısıyla hiyerarşik olarak kurulabilir:\n  S = (x ⊕ y) ⊕ C_in  ve  C_out = xy + C_in(x ⊕ y).\n• Ripple Carry Adder: n adet Full Adder\'ın elde çıkışlarının (C₁ → C₂ → C₃ → C₄) zincirleme bağlanmasıyla oluşturulur. Her aşama bir önceki eldenin gelmesini beklemek zorunda olduğu için kritik yol gecikmesi bit sayısıyla doğrusal artar.',
      diagrams: [
        {
          kind: 'table',
          caption: 'Full Adder (Tam Toplayıcı) Doğruluk Tablosu',
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
          caption: '4-Bit Ripple Carry Adder Gecikme Analizi',
          steps: [
            {
              label: 'Aşama 0 & 1 (C₁, C₂)',
              badge: '2 × t_carry',
              detail: 'FA₀ eldesi C₁ hesaplanır (t_carry), ardından FA₁ eldesi C₂ hesaplanır.',
            },
            {
              label: 'Aşama 2 (C₃)',
              badge: '3 × t_carry',
              detail: 'C₂ geldikten sonra FA₂ eldesi C₃ üretilir ve son basamağa iletilir.',
            },
            {
              label: 'Son Aşama (S₃ ve C₄)',
              badge: '3×t_carry + t_sum',
              detail: 'Son basamak Sum biti C₃ ulaştıktan t_sum süre sonra kesinleşir. Toplam gecikme = 3·t_carry + max(t_sum, t_carry).',
            },
          ],
        },
      ],
      widget: 'TruthTableBuilder',
      widgetConfig: {
        variables: 3,
        initialMinterms: [1, 2, 4, 7],
      },
      examTip:
        'Full Adder\'ın Sum çıkışı Σm(1, 2, 4, 7) (Odd Function), Carry çıkışı ise Σm(3, 5, 6, 7) (Majority Function: en az iki giriş 1 ise 1) olarak çalışır!',
    },
    {
      id: 'w7-s3',
      title: '3. 4-Bit Binary Adder-Subtractor ve Overflow (Taşma) Algılama',
      explanation:
        'Aynı donanımla hem toplama (A + B) hem çıkarma (A - B) yapabilmek için B girişlerinin önüne mod kontrol girişli (M) XOR kapıları yerleştirilir:\n• M = 0 (Toplama): C₀ = 0 verilir ve Bᵢ ⊕ 0 = Bᵢ olduğu için devre doğrudan A + B hesaplar.\n• M = 1 (Çıkarma): C₀ = 1 verilir ve Bᵢ ⊕ 1 = Bᵢ\' olduğu için devre A + B\' + 1 = A + (2\'s Complement of B) = A - B hesaplar.\n\nOverflow (Taşma) Algılama: İşaretsiz sayılarda taşmayı C₄ gösterir; ancak işaretli (2\'s Complement) sayılarda taşma, işaret bitine giren elde (C₃) ile çıkan eldenin (C₄) farklı olmasıdır: V = C₃ ⊕ C₄.',
      diagrams: [
        {
          kind: 'steps',
          caption: 'Mod Kontrol Girişi (M) ve Overflow (V) Çalışma Mantığı',
          steps: [
            {
              label: 'M = 0 (Toplama Modu)',
              badge: 'B ⊕ 0 = B',
              detail: 'C₀ = 0.\nXOR kapıları B bitlerini değiştirmeden geçirir.\nÇıkış = A + B.',
            },
            {
              label: 'M = 1 (Çıkarma Modu)',
              badge: "B ⊕ 1 = B'",
              detail: "C₀ = 1.\nXOR kapıları B'nin tüm bitlerini tersler (1's comp); C₀=1 eklenerek 2's comp tamamlanır: A - B.",
            },
            {
              label: 'İşaretli Taşma (V)',
              badge: 'V = C₃ ⊕ C₄',
              detail: 'V = 1 ise sonuç 4-bit [-8, +7] aralığına sığmamıştır ve işaret biti hatalıdır!',
            },
          ],
        },
      ],
      examTip:
        'Adder-Subtractor devresinde C₀ girişi de doğrudan M hattına bağlanır! Böylece tek bir M pini hem tüm B bitlerini XOR\'lar hem de çıkarma modunda +1 eldesini otomatik verir.',
    },
  ],
  questions: [
    {
      id: 'w7-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · BCD-to-Excess-3 En Düşük Anlamlı Bit (Mano 4.4)',
      difficulty: 'Temel',
      prompt:
        'BCD girişi (A, B, C, D) olan bir BCD-to-Excess-3 kod dönüştürücü devresinde en düşük anlamlı çıkış biti z\'nin en sade Boole ifadesi aşağıdakilerden hangisidir?',
      options: ["z = D'", 'z = D', 'z = C ⊕ D', "z = C'D'"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: +3 (0011₂) Eklemenin LSB Üzerindeki Etkisi',
          detail:
            'Excess-3 kodu, BCD değerine 3 = (0011)₂ eklenerek elde edilir. İkili toplamanın en sağ basamağında D + 1 işlemi yapılır.',
        },
        {
          title: 'Adım 2: Çıkış Biti z',
          detail: "D = 0 ise 0 + 1 = 1; D = 1 ise 1 + 1 = 0 (elde 1). Dolayısıyla her geçerli satırda z = D' olur.",
        },
      ],
    },
    {
      id: 'w7-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · İki Half Adder ile Full Adder İnşası',
      difficulty: 'Temel',
      prompt:
        'Bir Full Adder (Tam Toplayıcı) devresini iki adet Half Adder (HA1 ve HA2) kullanarak inşa ederken, bu iki yarım toplayıcının Carry (Elde) çıkışları hangi mantık kapısıyla birleştirilerek Cout elde edilir?',
      options: ['OR kapısı ile', 'AND kapısı ile', 'XOR kapısı ile', 'NAND kapısı ile'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Hiyerarşik Denklemleri Yaz',
          detail:
            'HA1(A, B) → S₁ = A ⊕ B, C₁ = AB\nHA2(S₁, Cin) → S = (A ⊕ B) ⊕ Cin, C₂ = Cin(A ⊕ B)',
        },
        {
          title: 'Adım 2: Elde Çıkışlarının Birleştirilmesi',
          detail:
            'Cout = C₁ + C₂ = AB + Cin(A ⊕ B). C₁ ve C₂ aynı anda 1 olamayacağı için OR kapısı (veya pratikte XOR) kullanılır; standart Mano tasarımında OR kapısı yer alır.',
        },
      ],
    },
    {
      id: 'w7-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · Ripple Carry Adder Yayılım Gecikmesi (Dr. Dhiman)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'Her bir Full Adder bloğunda Sum çıkış gecikmesi 20 ns ve Carry çıkış gecikmesi 15 ns ise, 4-bitlik bir Ripple Carry Adder devresinde tüm sonuç bitlerinin (S₀..S₃ ve C₄) kesinleşmesi için gereken maksimum süre kaç nanosaniyedir?',
      options: ['65 ns', '80 ns', '60 ns', '35 ns'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Eldelerin Zincirleme Gecikmesini Hesapla',
          detail:
            'C₁ = 15 ns | C₂ = 15 + 15 = 30 ns | C₃ = 30 + 15 = 45 ns | C₄ = 45 + 15 = 60 ns.',
        },
        {
          title: 'Adım 2: En Yavaş Sum Çıkışı (S₃)',
          detail:
            'Son basamak olan FA₃, C₃ eldesini 45. ns\'de alır ve S₃ toplamını +20 ns sonra üretir: 45 + 20 = 65 ns. Tüm çıkışların kesinleşme süresi max(60, 65) = 65 ns dir.',
        },
      ],
    },
    {
      id: 'w7-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · 4-Bit Adder-Subtractor ve İşaretli Overflow Analizi',
      difficulty: 'Sınav Seviyesi',
      prompt:
        '4-bitlik işaretli 2\'s Complement Adder-Subtractor devresinde M = 1 (çıkarma modu), A = 0101 (+5) ve B = 1011 (-5) uygulandığında C₃, C₄ ve Overflow (V) bitlerinin değerleri ne olur?',
      options: [
        'C₃ = 1, C₄ = 0 ve Overflow V = 1 (Taşma Var)',
        'C₃ = 0, C₄ = 0 ve Overflow V = 0 (Taşma Yok)',
        'C₃ = 1, C₄ = 1 ve Overflow V = 0 (Taşma Yok)',
        'C₃ = 0, C₄ = 1 ve Overflow V = 1 (Taşma Var)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: "Adım 1: M = 1 Olduğu İçin B'yi Tersle ve C₀ = 1 Ver",
          detail: "B = 1011 ⇒ B' = 0100. İşlem: A + B' + 1 = 0101 + 0100 + 0001.",
        },
        {
          title: 'Adım 2: Bit Bazında Toplama ve Eldeleri İzle',
          detail:
            'Bit 0: 1+0+1 = 0 (C₁=1) | Bit 1: 0+0+1 = 1 (C₂=0) | Bit 2: 1+1+0 = 0 (C₃=1) | Bit 3: 0+0+1 = 1 (C₄=0).\n4-bit sonuç = 1010 (-6 görünür, hatalı!).',
        },
        {
          title: 'Adım 3: Overflow Kontrolü',
          detail:
            '+5 - (-5) = +10 sonucu 4-bit işaretli [-8, +7] aralığını aşar. Donanım bunu V = C₃ ⊕ C₄ = 1 ⊕ 0 = 1 ile yakalar.',
        },
      ],
    },
    {
      id: 'w7-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · Half Subtractor (Yarım Çıkarıcı) Denklemleri',
      difficulty: 'Temel',
      prompt:
        'Girişleri x ve y olan (x - y işlemini yapan) bir Half Subtractor devresinde Fark (D) ve Borç (B_out) çıkışlarının Boole ifadeleri hangisidir?',
      options: [
        "D = x ⊕ y,  B_out = x'y",
        "D = x ⊕ y,  B_out = xy'",
        'D = x ⊙ y,  B_out = xy',
        "D = x'y + xy',  B_out = x + y'",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: 4 Durumu İncele (x - y)',
          detail:
            '0 - 0 = D:0, B:0 | 0 - 1 = D:1, B:1 (borç gerekir!) | 1 - 0 = D:1, B:0 | 1 - 1 = D:0, B:0.',
        },
        {
          title: 'Adım 2: Denklemleri Yaz',
          detail: "Fark D yalnızca bitler farklıyken 1 olur (x ⊕ y). Borç B_out ise yalnızca x=0 ve y=1 iken 1 olur (x'y).",
        },
      ],
    },
    {
      id: 'w7-q6',
      type: 'simulator-build',
      title: 'Soru 6 · Full Adder Devresini Temel Kapılarla Kurun (Canlı Lab)',
      difficulty: 'Orta',
      prompt:
        'Simülatörde A, B ve Cin girişlerini kullanarak Sum ve Cout çıkışlarını üreten 1-bitlik Full Adder devresini XOR, AND ve OR kapılarıyla kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.',
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
      hint: '1) XOR1(A, B) ile ara toplamı üretin, XOR2(XOR1, Cin) çıkışını Sum LED\'ine bağlayın. 2) AND1(A, B) ve AND2(Cin, XOR1) çıkışlarını bir OR kapısına vererek Cout LED\'ine iletin.',
      solutionDescription:
        'Sum = (A ⊕ B) ⊕ Cin ve Cout = (A · B) + Cin · (A ⊕ B) denklemleri 2 XOR, 2 AND ve 1 OR kapısı kullanılarak 2 Half Adder hiyerarşisiyle kurulur.',
    },
    {
      id: 'w7-q7',
      type: 'simulator-build',
      title: 'Soru 7 · Kontrollü Adder-Subtractor Hücresi (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'Mod kontrol girişi M ile çalışan tek bitlik Adder-Subtractor hücresini (A, B, Cin, M → S, Cout) kurun. M=0 iken B aynen geçmeli (toplama), M=1 iken B terslenmelidir (B ⊕ M). Tüm 16 giriş kombinasyonuna karşı doğrulayın.',
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
      hint: 'İlk olarak B ve M girişlerini bir XOR kapısına vererek B_eff = B ⊕ M üretin. Ardından A, B_eff ve Cin sinyallerini klasik Full Adder yapısına (2 XOR, 2 AND, 1 OR) bağlayın.',
      solutionDescription:
        'B_eff = B ⊕ M sinyali üretilip Full Adder\'ın ikinci girişine bağlandığında M=0 için A + B + Cin, M=1 için ise A + B\' + Cin hesaplanır.',
    },
  ],
};
