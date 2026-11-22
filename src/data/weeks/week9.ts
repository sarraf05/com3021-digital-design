import type { WeekModule } from '../../types/curriculum';

export const week9: WeekModule = {
  id: 9,
  weekNumber: 9,
  englishTitle: 'Combinational Logic II (BCD Adder, Multiplier, Comparator, Decoders)',
  turkishSubtitle: 'BCD Toplayıcı (+6 Düzeltmesi), İkili Çarpıcı, Büyüklük Karşılaştırıcı ve Kod Çözücüler',
  summary:
    'Orta Ölçekli Tümleşik (MSI) birleşik devre bloklarını öğrenin: 9\'dan büyük toplamlarda +6 (0110) ekleyen BCD Adder, AND dizisi + Adder bloklu Binary Multiplier, XNOR eşitlik kontrollü 4-bit Magnitude Comparator ve Enable pinli Decoder ağaçları.',
  learningObjectives: [
    'BCD Adder devresinde C = K + Z₈Z₄ + Z₈Z₂ düzeltme mantığını ve +6 (0110) ekleme nedenini açıklamak',
    'N×M bitlik kombinasyonel Binary Multiplier için gereken AND kapısı ve paralel toplayıcı sayısını hesaplamak',
    '4-bit Magnitude Comparator (A > B, A = B, A < B) denklemlerini XNOR eşitlik terimiyle kurmak',
    'Enable pinli küçük Decoder\'lardan büyük Decoder ağaçları kurmak ve Decoder + OR/NAND ile fonksiyon sentezlemek',
  ],
  isPlaceholder: false,
  recommendedWidget: 'TruthTableBuilder',
  recommendedWidgetConfig: {
    variables: 3,
    initialMinterms: [1, 2, 4, 7],
  },
  visualSections: [
    {
      id: 'w9-s1',
      title: '1. BCD Toplayıcı (Decimal Adder) ve "+6 (0110) Düzeltme Mantığı"',
      explanation:
        'İki 4-bitlik BCD rakamı (0–9 arası) ve bir giriş eldesi (C_in) 4-bitlik bir Binary Adder ile toplandığında ham toplam 0 ile 19 arasında olabilir. Toplam ≤ 9 (1001) ise ikili sonuç zaten geçerli bir BCD rakamıdır. Ancak toplam 10 ile 19 arasında çıktığında:\n• 10–15 arası ikili kodlar (1010–1111) geçersiz BCD kodudur (elde K = 0 olsa bile).\n• 16–19 arası toplamlar K = 1 taşması üretir fakat kalan 4 bit (0000–0011) gerçek onluk basamağın 6 eksiğidir!\n\nNeden +6 (0110) Eklenir? 4-bitlik ikili sistem mod-16, BCD ise mod-10 çalışır. Aradaki 16 - 10 = 6 farkını kapatmak için toplam > 9 olduğunda ham sonuca 0110 (+6) ekleyen ikinci bir 4-bit toplayıcı devreye girer. Düzeltme koşulu denklemi: C = K + Z₈Z₄ + Z₈Z₂.',
      diagrams: [
        {
          kind: 'table',
          caption: 'BCD Toplama: Ham İkili Toplam (K Z₈ Z₄ Z₂ Z₁) → +6 Düzeltmeli BCD Çıkışı',
          headers: ['Onluk Toplam', 'Ham İkili (K Z₈ Z₄ Z₂ Z₁)', 'Düzeltme C = K + Z₈Z₄ + Z₈Z₂', 'Düzeltilmiş BCD (Cout S₈ S₄ S₂ S₁)'],
          highlightColumn: 2,
          rows: [
            ['0 – 9', '0 0000 – 0 1001', 'C = 0 (+0000 ekle)', '0 0000 – 0 1001'],
            ['10 (1010)', '0 1010 (Z₈=1, Z₂=1)', 'C = 1 (+0110 ekle)', '1 0000 (Carry=1, Rakam=0)'],
            ['12 (1100)', '0 1100 (Z₈=1, Z₄=1)', 'C = 1 (+0110 ekle)', '1 0010 (Carry=1, Rakam=2)'],
            ['15 (1111)', '0 1111 (Z₈=1, Z₄=1, Z₂=1)', 'C = 1 (+0110 ekle)', '1 0101 (Carry=1, Rakam=5)'],
            ['18 (10010)', '1 0010 (K=1)', 'C = 1 (+0110 ekle)', '1 1000 (Carry=1, Rakam=8)'],
            ['19 (10011)', '1 0011 (K=1)', 'C = 1 (+0110 ekle)', '1 1001 (Carry=1, Rakam=9)'],
          ],
        },
      ],
      examTip:
        'BCD Adder blok şemasında ikinci toplayıcının alt girişlerine [0, C, C, 0] bağlanır! Böylece C = 0 iken +0000, C = 1 iken otomatik +0110 (+6) eklenmiş olur.',
    },
    {
      id: 'w9-s2',
      title: '2. İkili Çarpıcı (Binary Multiplier) ve Büyüklük Karşılaştırıcı (Magnitude Comparator)',
      explanation:
        'İki işaretsiz ikili sayının kombinasyonel çarpımında J bitlik çarpan ile K bitlik çarpılan için J × K adet AND kapısı kısmi çarpımları üretir ve (J - 1) adet K-bitlik paralel toplayıcı blok bu kısmi çarpımları kaydırarak toplar.\n\n4-Bit Magnitude Comparator: İki 4-bitlik A = A₃A₂A₁A₀ ve B = B₃B₂B₁B₀ sayısını karşılaştırırken önce her bit için XNOR eşitlik terimi tanımlanır: xᵢ = Aᵢ ⊙ Bᵢ = AᵢBᵢ + Aᵢ\'Bᵢ\'.\n• Eşitlik (A = B): Tüm bitler eşit olmalıdır ⇒ (A = B) = x₃ · x₂ · x₁ · x₀.\n• Büyüklük (A > B): En anlamlı (MSB) bitten başlayarak ilk farklı bit konumunda A = 1, B = 0 olmalıdır:\n  (A > B) = A₃B₃\' + x₃A₂B₂\' + x₃x₂A₁B₁\' + x₃x₂x₁A₀B₀\'.',
      diagrams: [
        {
          kind: 'steps',
          caption: '4-Bit Magnitude Comparator Karşılaştırma Hiyerarşisi (MSB → LSB)',
          steps: [
            {
              label: 'A = B Çıkışı',
              badge: '4-Girişli AND',
              detail: '(A = B) = x₃ x₂ x₁ x₀\nBurada xᵢ = (Aᵢ ⊕ Bᵢ)\' XNOR kapısıdır.',
            },
            {
              label: 'A > B Çıkışı',
              badge: 'MSB Önceliği',
              detail: "A₃B₃' + x₃A₂B₂' + x₃x₂A₁B₁' + x₃x₂x₁A₀B₀'",
            },
            {
              label: 'A < B Çıkışı',
              badge: 'Simetrik Yapı',
              detail: "A₃'B₃ + x₃A₂'B₂ + x₃x₂A₁'B₁ + x₃x₂x₁A₀'B₀",
            },
          ],
        },
      ],
      examTip:
        'J × K bitlik Binary Multiplier sorularında daima J × K adet AND kapısı ve (J - 1) adet K-bitlik Adder gerektiğini (veya 2×2 için özel 2 adet Half Adder yettiğini) unutmayın!',
    },
    {
      id: 'w9-s3',
      title: '3. Kod Çözücüler (Decoders), Enable Pini ve Fonksiyon Sentezi',
      explanation:
        'Bir n-to-2ⁿ Decoder, n-bitlik ikili giriş kodunu 2ⁿ adet karşılıklı dışlayıcı (mutually exclusive) çıkış hattından yalnızca birini aktif ederek çözer. Her bir çıkış hattı aslında bir Minterm (mᵢ) üretir!\n\n• Ağaç Genişletme (Decoder Expansion): Enable (E) girişi kullanılarak küçük Decoder\'lardan daha büyük Decoder\'lar inşa edilebilir (ör. iki 3-to-8 Decoder + bir Inverter ile 4-to-16 Decoder; veya beş 2-to-4 Decoder ile 4-to-16 Decoder).\n• Dr. Dhiman Fonksiyon Sentez Kuralı: Active-High çıkışlı bir Decoder\'ın minterm uçları OR kapısıyla toplanarak herhangi bir Boole fonksiyonu elde edilir. Eğer Decoder Active-Low (baloncuklu, terslenmiş mᵢ\') çıkışa sahipse, OR yerine NAND kapısı kullanılır (DeMorgan gereği NAND(m₁\', m₂\') = m₁ + m₂)!',
      widget: 'TruthTableBuilder',
      widgetConfig: {
        variables: 3,
        initialMinterms: [1, 2, 4, 7],
      },
      examTip:
        'Active-Low çıkışlı Decoder + NAND kapısı birleşimi, Active-High çıkışlı Decoder + OR kapısı birleşimiyle birebir aynı Sum of Minterms işlevini gerçekleştirir!',
    },
  ],
  questions: [
    {
      id: 'w9-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · BCD Adder +6 Düzeltme Hesabı (Mano 4.10)',
      difficulty: 'Orta',
      prompt:
        'Bir BCD Adder devresine A = 7 (0111) ve B = 8 (1000) girişleri (Cin = 0) uygulandığında, ilk 4-bit toplayıcının ham çıkışı (K, Z₈ Z₄ Z₂ Z₁), düzeltme sinyali C ve nihai düzeltilmiş BCD çıkışı nedir?',
      options: [
        'Ham: (0, 1111) | C = 1 | Nihai: Carry Out = 1, BCD = 0101 (15)',
        'Ham: (1, 0101) | C = 0 | Nihai: Carry Out = 1, BCD = 0101 (15)',
        'Ham: (0, 1111) | C = 0 | Nihai: Carry Out = 0, BCD = 1111 (15)',
        'Ham: (0, 1101) | C = 1 | Nihai: Carry Out = 1, BCD = 0011 (13)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: İlk 4-Bit İkili Toplayıcı Çıkışı',
          detail: '0111 (7) + 1000 (8) = 1111 (15). Taşma olmadığı için K = 0, Z₈Z₄Z₂Z₁ = 1111.',
        },
        {
          title: 'Adım 2: Düzeltme Koşulu C Hesabı',
          detail: 'C = K + Z₈Z₄ + Z₈Z₂ = 0 + (1)(1) + (1)(1) = 1 ⇒ +0110 (+6) ekleme aktif!',
        },
        {
          title: 'Adım 3: İkinci 4-Bit Toplayıcı (+0110)',
          detail: '1111 + 0110 = 1 0101 ⇒ Carry Out = 1 (onlar basamağı), BCD = 0101 (birler basamağı 5) → 15.',
        },
      ],
    },
    {
      id: 'w9-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · 4×3 Binary Multiplier Donanım Maliyeti',
      difficulty: 'Temel',
      prompt:
        '4-bitlik bir sayı ile 3-bitlik bir sayıyı çarpan kombinasyonel Binary Multiplier devresinde toplam kaç adet AND kapısı ve kaç adet 4-bitlik paralel toplayıcı blok gerekir?',
      options: [
        '12 adet AND kapısı ve 2 adet 4-bit paralel toplayıcı blok',
        '7 adet AND kapısı ve 3 adet 4-bit paralel toplayıcı blok',
        '12 adet AND kapısı ve 3 adet 4-bit paralel toplayıcı blok',
        '16 adet AND kapısı ve 2 adet 4-bit paralel toplayıcı blok',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Kısmi Çarpım AND Matrisi',
          detail: '4 × 3 bitlik çarpımda her bit çifti için bir AND gerekir: 4 × 3 = 12 adet AND kapısı.',
        },
        {
          title: 'Adım 2: Paralel Toplayıcı Blok Sayısı',
          detail: '3 adet 4-bitlik kısmi çarpım satırını toplamak için (3 - 1) = 2 adet 4-bitlik paralel toplayıcı blok yeterlidir.',
        },
      ],
    },
    {
      id: 'w9-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · 4-Bit Magnitude Comparator Denklemi (Mano 4.13)',
      difficulty: 'Orta',
      prompt:
        '4-bitlik bir Magnitude Comparator devresinde bit eşitliği xᵢ = Aᵢ ⊙ Bᵢ olmak üzere (A > B) çıkışının tam Boole ifadesi nedir?',
      options: [
        "A₃B₃' + x₃A₂B₂' + x₃x₂A₁B₁' + x₃x₂x₁A₀B₀'",
        "A₃'B₃ + x₃A₂'B₂ + x₃x₂A₁'B₁ + x₃x₂x₁A₀'B₀",
        "A₃B₃' + A₂B₂' + A₁B₁' + A₀B₀'",
        'x₃x₂x₁x₀',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: En Yüksek Anlamlı Bitten (MSB) Başla',
          detail:
            "A > B olması için ya A₃=1, B₃=0 olmalı (A₃B₃'), ya da 3. bitler eşitken (x₃=1) A₂=1, B₂=0 olmalı (x₃A₂B₂') şeklinde LSB'ye kadar inilir.",
        },
      ],
    },
    {
      id: 'w9-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · Decoder Ağacı ile 4-to-16 Genişletme (Dr. Dhiman)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'Enable girişine sahip 2-to-4 Decoder blokları kullanılarak (ekstra mantık kapısı kullanmadan) bir 4-to-16 Decoder inşa etmek için toplam kaç adet 2-to-4 Decoder gerekir?',
      options: ['5 adet', '4 adet', '8 adet', '6 adet'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: 2 Seviyeli Ağaç Yapısını Kur',
          detail:
            '• 1. Seviye (Ön Kod Çözücü): 1 adet 2-to-4 Decoder, en anlamlı iki biti (A₃, A₂) çözer ve 4 çıkışını alt blokların Enable uçlarına verir.\n• 2. Seviye (Çıkış Katmanı): 4 adet 2-to-4 Decoder, (A₁, A₀) bitlerini alarak toplam 4 × 4 = 16 çıkış üretir.\nToplam: 1 + 4 = 5 adet.',
        },
      ],
    },
    {
      id: 'w9-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · Active-Low Decoder ile Full Adder Sentezi (Mano 4.21)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'Active-Low (aktif-0) çıkışlı bir 3-to-8 Decoder kullanarak Tam Toplayıcı (Full Adder: S = Σ(1,2,4,7), C = Σ(3,5,6,7)) devresi kurmak için Decoder çıkışlarına hangi kapılar bağlanmalıdır?',
      options: [
        'İki adet 4-girişli NAND kapısı',
        'İki adet 4-girişli OR kapısı',
        'İki adet 4-girişli NOR kapısı',
        'İki adet 4-girişli AND kapısı',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Active-Low Çıkışların Matematiksel Anlamı',
          detail:
            "Active-Low Decoder çıkışları mᵢ' (minterm tümleyeni) üretir. Bu çıkışları NAND kapısına bağlamak DeMorgan yasası gereği (m₁'·m₂'·m₄'·m₇')' = m₁ + m₂ + m₄ + m₇ üretir! Dolayısıyla S ve C için iki adet 4-girişli NAND kapısı gerekir.",
        },
      ],
    },
    {
      id: 'w9-q6',
      type: 'interactive-table',
      title: "Soru 6 · Active-Low Enable (E') 2-to-4 Decoder Doğruluk Tablosu",
      difficulty: 'Temel',
      prompt:
        "Active-Low Enable (E') girişine sahip bir 2-to-4 Decoder'ın (E' = 0 iken aktif, E' = 1 iken tüm çıkışlar 0; çıkışlar Active-High) doğruluk tablosunu doldurun.",
      headers: ["E'", 'A1', 'A0', 'D0', 'D1', 'D2', 'D3'],
      rows: [
        [
          { value: '1' }, { value: '0' }, { value: '0' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '1' }, { value: '1' }, { value: '1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '0' }, { value: '0' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '0' }, { value: '1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '1' }, { value: '0' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '1' }, { value: '1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
      ],
      solutionExplanation:
        "E' = 1 iken Decoder devre dışıdır (tüm çıkışlar 0). E' = 0 iken A1A0 ikili değerine karşılık gelen D0..D3 çıkışlarından yalnızca biri 1 olur.",
    },
    {
      id: 'w9-q7',
      type: 'simulator-build',
      title: 'Soru 7 · 2-to-4 Decoder + OR Kapısı ile XOR Fonksiyonu (Canlı Lab)',
      difficulty: 'Orta',
      prompt:
        'Simülatörde yerleşik "2-to-4 Decoder" bloğunu ve 1 adet "OR" kapısını kullanarak F(A, B) = Σ(1, 2) (XOR fonksiyonu) devresini kurun. Not: Decoder\'ın E (Enable) girişini aktif etmek için paletten ekstra bir Toggle Switch ekleyip 1 konumuna getirerek E pinine bağlayın.',
      inputs: ['A', 'B'],
      outputs: ['F'],
      allowedComponents: ['DECODER_2TO4', 'OR'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1 }, outputs: { F: 0 } },
      ],
      hint: 'A girişini Decoder\'ın A1 pinine, B girişini A0 pinine bağlayın. Paletten yeni bir Toggle Switch ekleyip değerini 1 yapın ve Decoder\'ın E pinine bağlayın. Decoder\'ın D1 ve D2 çıkışlarını OR kapısına verip çıkışı F LED\'ine bağlayın.',
      solutionDescription:
        'Enable = 1 iken 2-to-4 Decoder tüm 4 mintermi (D0=m₀, D1=m₁, D2=m₂, D3=m₃) üretir. D1 ve D2 çıkışlarının bir OR kapısıyla toplanması F = m₁ + m₂ = A ⊕ B fonksiyonunu oluşturur.',
    },
  ],
};
