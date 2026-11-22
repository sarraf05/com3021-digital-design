import type { WeekModule } from '../../types/curriculum';

export const week11: WeekModule = {
  id: 11,
  weekNumber: 11,
  englishTitle: 'Synchronous Sequential Logic I (Latches & D, JK, T Flip-Flops)',
  turkishSubtitle: 'Mandallar (SR/D Latches), Kenar Tetiklemeli D, JK, T Flip-Flop’lar ve Uyarım Tabloları',
  summary:
    'Çıkışları yalnızca şimdiki girişlere değil geçmiş durum (hafıza) bilgisine de bağlı olan Synchronous Sequential Logic devrelerinin temelini; NOR/NAND SR Latch, Transparent D Latch, pozitif/negatif kenar tetiklemeli D, JK, T Flip-Flop karakteristik denklemlerini ve tasarımın anahtarı olan Excitation Table yapısını öğrenin.',
  learningObjectives: [
    'Level-Triggered (Latch) ile Edge-Triggered (Flip-Flop) arasındaki zamanlama farkını açıklamak',
    'NOR-tabanlı (Active-High) ve NAND-tabanlı (Active-Low) SR Latch çalışma tablolarını analiz etmek',
    'D, JK ve T Flip-Flop karakteristik denklemlerini ve zamanlama diyagramlarını (Timing Diagram) çizmek',
    'Dr. Dhiman Uyarım Tablosu (Excitation Table) Don\'t-Care mantığını tasarım sorularında kullanmak',
  ],
  isPlaceholder: false,
  recommendedWidget: 'TimingDiagramViewer',
  recommendedWidgetConfig: {
    flipFlopType: 'JK',
  },
  visualSections: [
    {
      id: 'w11-s1',
      title: '1. Birleşik Devreden Ardışıl Devreye Geçiş ve Mandallar (Latches)',
      explanation:
        'Birleşik (Combinational) devrelerde hafıza yoktur; giriş değiştiği anda çıkış da değişir. Ardışıl (Sequential) devreler ise bir geri besleme (feedback) yoluyla geçmiş bit bilgisini saklayan 1-bitlik hafıza elemanları içerir.\n• Temel SR Latch (NOR Tabanlı — Active-High): S=1, R=0 (Set → Q=1); S=0, R=1 (Reset → Q=0); S=0, R=0 (Memory / No Change); S=1, R=1 ise Q=Q\'=0 yapan YASAK (Invalid / Race) durumdur.\n• NAND Tabanlı SR Latch (Active-Low S\', R\'): Girişler 0 ile aktif olur; S\'=0, R\'=1 (Set); S\'=1, R\'=1 (Memory); S\'=0, R\'=0 (Invalid).\n• Gated D Latch (Transparent Latch): Enable (En) = 1 olduğu sürece D girişi doğrudan Q\'ya geçer (şeffaf); En = 0 iken son değer kilitlenir. Seviye tetiklemeli (Level-Triggered) olduğu için Clock darbesi boyunca giriş değişimlerine açıktır.',
      diagrams: [
        {
          kind: 'table',
          caption: 'NOR-Tabanlı SR Latch vs Edge-Triggered D Flip-Flop Karşılaştırması',
          headers: ['Bileşen', 'Tetikleme Türü', 'Yasak Durum', 'Davranış Özeti'],
          highlightColumn: 1,
          rows: [
            ['NOR SR Latch', 'Asenkron (Seviye)', 'S = 1, R = 1 (Q=Q\'=0)', 'S=0, R=0 iken son durumu korur'],
            ["NAND S'R' Latch", 'Asenkron (Active-Low)', "S' = 0, R' = 0 (Q=Q'=1)", "S'=1, R'=1 iken son durumu korur"],
            ['Gated D Latch', 'Level-Triggered (En=1)', 'Yok (S ve R zıt)', 'En=1 boyunca Q = D (Transparent)'],
            ['D Flip-Flop', 'Edge-Triggered (↑ veya ↓)', 'Yok', 'Yalnızca aktif Clock kenarında Q(t+1) = D'],
          ],
        },
      ],
      examTip:
        'Latch ile Flip-Flop arasındaki temel fark şudur: Latch, Clock/Enable seviyesi 1 olduğu sürece sürekli değişebilir; Flip-Flop ise yalnızca Clock kenarının (↑ veya ↓) yükseldiği/düştüğü anlık anda girişini örnekler!',
    },
    {
      id: 'w11-s2',
      title: '2. D, JK ve T Flip-Flop Karakteristik Denklemleri ve Zamanlama',
      explanation:
        'Senkron ardışıl devrelerde güvenilir çalışma için kenar tetiklemeli (Edge-Triggered) Flip-Flop\'lar kullanılır. Kararlı örnekleme için veri girişinin saat kenarından önce belirli bir Setup Time boyunca ve kenardan sonra Hold Time boyunca sabit kalması gerekir.\n\nÜç Temel Flip-Flop Karakteristik Denklemi:\n• D Flip-Flop (Data / Delay): Q(t+1) = D\n• JK Flip-Flop (J=Set, K=Reset, 11=Toggle): Q(t+1) = J·Q\' + K\'·Q\n• T Flip-Flop (Toggle): Q(t+1) = T ⊕ Q = T·Q\' + T\'·Q',
      diagrams: [
        {
          kind: 'table',
          caption: 'D, JK ve T Flip-Flop Karakteristik Tabloları',
          headers: ['Flip-Flop', 'Giriş Durumu', 'Q(t+1)', 'İşlem Adı'],
          highlightColumn: 2,
          rows: [
            ['D FF', 'D = 0 / D = 1', '0 / 1', 'Reset / Set (Doğrudan Aktarım)'],
            ['JK FF', 'J = 0, K = 0', 'Q(t)', 'No Change (Hafıza)'],
            ['JK FF', 'J = 0, K = 1', '0', 'Reset (Sıfırla)'],
            ['JK FF', 'J = 1, K = 0', '1', 'Set (1 Yap)'],
            ['JK FF', 'J = 1, K = 1', "Q'(t)", 'Toggle (Durum Tersle)'],
            ['T FF', 'T = 0 / T = 1', "Q(t) / Q'(t)", 'No Change / Toggle'],
          ],
        },
      ],
      widget: 'TimingDiagramViewer',
      widgetConfig: {
        flipFlopType: 'JK',
      },
      examTip:
        'Zamanlama diyagramı çizerken saat kenarına (↑) TAM O AN gelen giriş değerini değil, kenardan hemen önceki (Setup penceresindeki) giriş değerini örneklediğinizi unutmayın!',
    },
    {
      id: 'w11-s3',
      title: "3. Dr. Dhiman Uyarım Tabloları (Excitation Tables) Altın Özeti",
      explanation:
        'Karakteristik tablo "giriş belliyken sonraki durum ne olur?" sorusunu yanıtlar (Analiz). Tasarım yaparken ise tam tersi soruyu sorarız: "Durumun Q(t)\'den Q(t+1)\'e geçmesi için Flip-Flop girişlerine ne vermeliyim?" İşte bunu Excitation Table (Uyarım Tablosu) verir!\n\nSezgisel JK Don\'t-Care (X) Mantığı: Örneğin Q(t) = 0 durumundan Q(t+1) = 0 durumuna kalmak istiyorsak, bunu hem "No Change (J=0, K=0)" hem de "Reset (J=0, K=1)" sağlar. K değeri 0 da olsa 1 de olsa sonuç değişmediği için K = X (Don\'t-Care) yazılır → (J=0, K=X)!',
      diagrams: [
        {
          kind: 'table',
          caption: 'D, JK ve T Flip-Flop Birleşik Uyarım Tablosu (Excitation Table)',
          headers: ['Q(t) → Q(t+1)', 'D', 'J', 'K', 'T', 'Sezgisel Açıklama'],
          highlightColumn: 2,
          rows: [
            ['0 → 0', '0', '0', 'X', '0', '0 kal: Hold (0,0) veya Reset (0,1) → K = X'],
            ['0 → 1', '1', '1', 'X', '1', '1 ol: Set (1,0) veya Toggle (1,1) → K = X'],
            ['1 → 0', '0', 'X', '1', '1', '0 ol: Reset (0,1) veya Toggle (1,1) → J = X'],
            ['1 → 1', '1', 'X', '0', '0', '1 kal: Hold (0,0) veya Set (1,0) → J = X'],
          ],
        },
      ],
      examTip:
        'JK Uyarım Tablosunu ezberlemenin Dr. Dhiman kısayolu: İlk iki satırda (0\'dan başlarken) K = X ve J = Q(t+1); son iki satırda (1\'den başlarken) J = X ve K = Q\'(t+1) olur!',
    },
  ],
  questions: [
    {
      id: 'w11-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · NOR-Tabanlı SR Latch Hafıza Durumu',
      difficulty: 'Temel',
      prompt:
        "İki adet çapraz bağlı NOR kapısıyla kurulan temel bir SR Latch devresinde mevcut durum Q = 1, Q' = 0 iken girişlere S = 0, R = 0 uygulanırsa çıkış ne olur?",
      options: [
        "Q = 1, Q' = 0 olarak mevcut durumunu korur (Hafıza / No-Change).",
        "Q = 0, Q' = 1 olur (Reset).",
        "Q = 0, Q' = 0 olur (Yasak Durum).",
        'Çıkış sürekli 0 ve 1 arasında salınır.',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: NOR Kapılarının Geri Beslemesini İzle',
          detail:
            "R=0 ve Q'=0 girişli üst NOR kapısının çıkışı Q = (0 + 0)' = 1 kalır. S=0 ve Q=1 girişli alt NOR kapısının çıkışı ise Q' = (0 + 1)' = 0 olarak kilitli kalır.",
        },
      ],
    },
    {
      id: 'w11-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · JK Flip-Flop Toggle Modu (Mano 5.6)',
      difficulty: 'Temel',
      prompt:
        'Pozitif kenar tetiklemeli bir JK Flip-Flop’ta Q(t) = 1 iken saat darbesinin yükselen kenarında J = 1, K = 1 uygulanırsa Q(t+1) değeri ne olur?',
      options: ['Q(t+1) = 0 (Toggle)', 'Q(t+1) = 1 (Hold)', 'Belirsiz (Invalid)', "Q(t+1) = 1 ve Q'(t+1) = 1"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: JK Karakteristik Denklemini Uygula',
          detail: "Q(t+1) = J·Q' + K'·Q. J=1, K=1 ve Q=1 yerleştirildiğinde Q(t+1) = 1·(0) + (0)·1 = 0 (Q' değerine terslenir).",
        },
      ],
    },
    {
      id: 'w11-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · JK Flip-Flop Uyarım Tablosu (Dr. Dhiman)',
      difficulty: 'Orta',
      prompt:
        'Bir ardışıl devre tasarımında Flip-Flop durumunun Q(t) = 1\'den Q(t+1) = 0\'a geçmesi isteniyorsa, JK Flip-Flop\'un (J, K) girişlerine ne uygulanmalıdır?',
      options: ['J = X, K = 1', 'J = 0, K = X', 'J = X, K = 0', 'J = 1, K = X'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: 1 → 0 Geçişini Sağlayan Tüm (J, K) Çiftlerini Listele',
          detail:
            'Q = 1 iken çıkışın 0 olması için ya Reset (J=0, K=1) ya da Toggle (J=1, K=1) yapılmalıdır. Her iki durumda da K = 1 zorunludur, J ise 0 veya 1 olabilir ⇒ J = X, K = 1.',
        },
      ],
    },
    {
      id: 'w11-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · D Flip-Flop Zamanlama Diyagramı Örnekleme',
      difficulty: 'Temel',
      prompt:
        'Başlangıçta Q = 0 olan pozitif kenar tetiklemeli bir D Flip-Flop’a 4 ardışık yükselen saat kenarında sırasıyla D = 1, 1, 0, 1 değerleri uygulanırsa, Q çıkışının 4 saat çevrimi boyunca alacağı değer dizisi nedir?',
      options: ['1, 1, 0, 1', '0, 1, 1, 0', '1, 0, 1, 0', '0, 1, 0, 1'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Q(t+1) = D Kuralını Her Kenarda Uygula',
          detail:
            '1. Kenar (D=1) → Q=1 | 2. Kenar (D=1) → Q=1 | 3. Kenar (D=0) → Q=0 | 4. Kenar (D=1) → Q=1.',
        },
      ],
    },
    {
      id: 'w11-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · D Flip-Flop’tan T Flip-Flop Elde Etme',
      difficulty: 'Orta',
      prompt:
        'Elimizde yalnızca bir D Flip-Flop ve bir XOR kapısı varsa, T girişli bir T Flip-Flop elde etmek için D ucuna hangi ifade bağlanmalıdır?',
      options: ['D = T ⊕ Q', 'D = T · Q', "D = T + Q'", 'D = T ⊙ Q'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: İki Karakteristik Denklemi Eşitle',
          detail:
            "T Flip-Flop denklemi: Q(t+1) = T ⊕ Q. D Flip-Flop'ta Q(t+1) = D olduğu için D = T ⊕ Q bağlandığında T=0 iken D=Q (tut), T=1 iken D=Q' (tersle) çalışır.",
        },
      ],
    },
    {
      id: 'w11-q6',
      type: 'interactive-table',
      title: 'Soru 6 · D, JK ve T Flip-Flop Uyarım Tablosu Doldurma',
      difficulty: 'Orta',
      prompt:
        'Aşağıdaki birleşik Uyarım Tablosunda (Excitation Table) eksik olan hücreleri 0, 1 veya X (tıklayarak) ile eksiksiz tamamlayın.',
      headers: ['Q(t) → Q(t+1)', 'D', 'J', 'K', 'T'],
      rows: [
        [
          { value: '0 → 0' },
          { value: '', editable: true, expected: '0', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '0', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '0', placeholder: '0/1/X' },
        ],
        [
          { value: '0 → 1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
        ],
        [
          { value: '1 → 0' },
          { value: '', editable: true, expected: '0', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
        ],
        [
          { value: '1 → 1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '0', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '0', placeholder: '0/1/X' },
        ],
      ],
      solutionExplanation:
        'D her zaman Q(t+1)\'e eşittir (0,1,0,1). T ise durum değiştiğinde 1, aynı kaldığında 0 olur (0,1,1,0). JK tablosu: (0,X), (1,X), (X,1), (X,0).',
    },
    {
      id: 'w11-q7',
      type: 'simulator-build',
      title: 'Soru 7 · D Flip-Flop ve XOR ile T Flip-Flop Kurulumu (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'Simülatörde yerleşik "D Flip-Flop" ve "XOR" kapısını kullanarak D = T ⊕ Q bağlantısıyla çalışan T Flip-Flop devresini kurun. CLK girişini Flip-Flop CLK pinine, Q çıkışını Q LED\'ine bağlayın. Step Pulse butonuyla T=1 iken çıkışın durum değiştirdiğini test edip "Devreyi Doğrula" butonuna basın.',
      inputs: ['T'],
      outputs: ['Q'],
      allowedComponents: ['DFF', 'XOR'],
      expectedTruthTable: [],
      sequentialTest: {
        clkLabel: 'CLK',
        steps: [
          { inputs: { T: 1 }, expectedOutputs: { Q: 1 } },
          { inputs: { T: 1 }, expectedOutputs: { Q: 0 } },
          { inputs: { T: 0 }, expectedOutputs: { Q: 0 } },
          { inputs: { T: 1 }, expectedOutputs: { Q: 1 } },
          { inputs: { T: 0 }, expectedOutputs: { Q: 1 } },
        ],
      },
      hint: '1) D Flip-Flop Q çıkışını hem Q LED\'ine hem de XOR kapısının bir girişine bağlayın. 2) T anahtarını XOR\'un diğer girişine bağlayın. 3) XOR çıkışını D Flip-Flop\'un D pinine, CLK üretecini ise CLK pinine bağlayın.',
      solutionDescription:
        'Geri besleme kablosuyla D = T ⊕ Q sağlandığında, T = 1 iken her yükselen saat darbesinde Q terslenir (0→1→0), T = 0 iken mevcut değer korunur.',
    },
  ],
};
