import type { WeekModule } from '../../types/curriculum';

export const week11: WeekModule = {
  id: 11,
  weekNumber: 11,
  englishTitle: {
    tr: 'Synchronous Sequential Logic I (Latches & D, JK, T Flip-Flops)',
    en: 'Synchronous Sequential Logic I (Latches & D, JK, T Flip-Flops)',
  },
  turkishSubtitle: {
    tr: 'Mandallar (SR/D Latches), Kenar Tetiklemeli D, JK, T Flip-Flop’lar ve Uyarım Tabloları',
    en: 'Latches (SR/D), Edge-Triggered D, JK, T Flip-Flops & Excitation Tables',
  },
  summary: {
    tr: 'Çıkışları yalnızca şimdiki girişlere değil geçmiş durum (hafıza) bilgisine de bağlı olan Synchronous Sequential Logic devrelerinin temelini; NOR/NAND SR Latch, Transparent D Latch, pozitif/negatif kenar tetiklemeli D, JK, T Flip-Flop karakteristik denklemlerini ve tasarımın anahtarı olan Excitation Table yapısını öğrenin.',
    en: 'Learn the foundation of Synchronous Sequential Logic where outputs depend on both present inputs and stored state: NOR/NAND SR Latches, Transparent D Latches, positive/negative edge-triggered D, JK, and T Flip-Flop characteristic equations, and Excitation Tables for circuit synthesis.',
  },
  learningObjectives: [
    {
      tr: 'Level-Triggered (Latch) ile Edge-Triggered (Flip-Flop) arasındaki zamanlama farkını açıklamak',
      en: 'Explain the timing difference between Level-Triggered Latches and Edge-Triggered Flip-Flops',
    },
    {
      tr: 'NOR-tabanlı (Active-High) ve NAND-tabanlı (Active-Low) SR Latch çalışma tablolarını analiz etmek',
      en: 'Analyze NOR-based (Active-High) and NAND-based (Active-Low) SR Latch function tables',
    },
    {
      tr: 'D, JK ve T Flip-Flop karakteristik denklemlerini ve zamanlama diyagramlarını (Timing Diagram) çizmek',
      en: 'Write D, JK, and T Flip-Flop characteristic equations and trace Timing Diagrams',
    },
    {
      tr: 'Uyarım Tablosu (Excitation Table) Don\'t-Care mantığını tasarım sorularında kullanmak',
      en: 'Apply Excitation Table Don\'t-Care logic in sequential synthesis problems',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'TimingDiagramViewer',
  recommendedWidgetConfig: {
    flipFlopType: 'JK',
  },
  visualSections: [
    {
      id: 'w11-s1',
      title: {
        tr: '1. Birleşik Devreden Ardışıl Devreye Geçiş ve Mandallar (Latches)',
        en: '1. From Combinational to Sequential Circuits & Latches',
      },
      explanation: {
        tr: 'Birleşik (Combinational) devrelerde hafıza yoktur; giriş değiştiği anda çıkış da değişir. Ardışıl (Sequential) devreler ise çapraz geri besleme (cross-coupled feedback) yoluyla geçmiş bit bilgisini kilitleyen 1-bitlik hafıza elemanları içerir.\n• Temel SR Latch (NOR Tabanlı — Active-High): Q çıkışı alt NOR kapısına, Q\' çıkışı üst NOR kapısına bağlanır. S=1, R=0 (Set → Q=1) uygulandıktan sonra S=0, R=0 (Memory) konumuna dönülse bile Q=1 sinyali alt NOR kapısını 0\'da, o da üst NOR kapısını 1\'de kilitli tutar! S=1, R=1 ise hem Q=0 hem Q\'=0 yapan YASAK durumdur; üstelik aynı anda (0,0)\'a dönülürse hangi kapının kazanacağı belirsizdir (Race Condition).\n• NAND Tabanlı SR Latch (Active-Low S\', R\'): Girişler 0 ile aktif olur; S\'=0, R\'=1 (Set); S\'=1, R\'=1 (Memory); S\'=0, R\'=0 (Invalid).\n• Gated D Latch (Transparent Latch): S = D·En ve R = D\'·En bağlanarak yasak durum ortadan kaldırılır. Ancak Enable (En) = 1 olduğu sürece D değişimleri doğrudan Q\'ya sızar (Transparency) — bu yüzden kendi çıkışını geri besleyen sayaçlarda kullanılamaz!',
        en: 'Combinational circuits have no memory—outputs respond immediately to input changes. Sequential circuits use cross-coupled feedback to lock a stored 1-bit state in place.\n• Basic SR Latch (NOR-Based — Active-High): Q feeds the bottom NOR and Q\' feeds the top NOR. After S=1, R=0 (Set → Q=1), returning to S=0, R=0 (Hold) keeps Q=1 holding Q\'=0, which in turn holds Q=1 indefinitely! However, S=1, R=1 forces Q=Q\'=0 (Forbidden), and releasing both to (0,0) simultaneously causes an unpredictable Race Condition.\n• NAND-Based SR Latch (Active-Low S\', R\'): Inputs are active at 0; S\'=0, R\'=1 (Set); S\'=1, R\'=1 (Hold); S\'=0, R\'=0 (Invalid).\n• Gated D Latch (Transparent Latch): Wiring S = D·En and R = D\'·En eliminates the forbidden state, yet while En = 1, any change at D passes transparently to Q—making latches unsafe for feedback counters!',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'NOR-Tabanlı SR Latch vs Edge-Triggered D Flip-Flop Karşılaştırması',
            en: 'NOR-Based SR Latch vs. Edge-Triggered D Flip-Flop Comparison',
          },
          headers: [
            { tr: 'Bileşen', en: 'Element' },
            { tr: 'Tetikleme Türü', en: 'Triggering' },
            { tr: 'Yasak Durum', en: 'Forbidden State' },
            { tr: 'Davranış Özeti', en: 'Behavior Summary' },
          ],
          highlightColumn: 1,
          rows: [
            [
              'NOR SR Latch',
              { tr: 'Asenkron (Seviye)', en: 'Asynchronous (Level)' },
              "S = 1, R = 1 (Q=Q'=0)",
              { tr: 'S=0, R=0 iken son durumu korur', en: 'Holds last state when S=0, R=0' },
            ],
            [
              "NAND S'R' Latch",
              { tr: 'Asenkron (Active-Low)', en: 'Asynchronous (Active-Low)' },
              "S' = 0, R' = 0 (Q=Q'=1)",
              { tr: "S'=1, R'=1 iken son durumu korur", en: "Holds last state when S'=1, R'=1" },
            ],
            [
              'Gated D Latch',
              'Level-Triggered (En=1)',
              { tr: 'Yok (S ve R zıt)', en: 'None (S & R inverted)' },
              { tr: 'En=1 boyunca Q = D (Transparent)', en: 'Q = D while En=1 (Transparent)' },
            ],
            [
              'D Flip-Flop',
              { tr: 'Edge-Triggered (↑ veya ↓)', en: 'Edge-Triggered (↑ or ↓)' },
              { tr: 'Yok', en: 'None' },
              {
                tr: 'Yalnızca aktif Clock kenarında Q(t+1) = D',
                en: 'Samples Q(t+1) = D only on active Clock edge',
              },
            ],
          ],
        },
      ],
      examTip: {
        tr: 'Latch ile Flip-Flop arasındaki temel fark şudur: Latch, Clock/Enable seviyesi 1 olduğu sürece sürekli değişebilir; Flip-Flop ise yalnızca Clock kenarının (↑ veya ↓) yükseldiği/düştüğü anlık anda girişini örnekler!',
        en: 'The core difference between a Latch and a Flip-Flop is timing: a Latch responds continuously while Clock/Enable is high, whereas a Flip-Flop samples its input only at the instant of a Clock edge (↑ or ↓)!',
      },
    },
    {
      id: 'w11-s2',
      title: {
        tr: '2. D, JK ve T Flip-Flop Karakteristik Denklemleri ve Zamanlama',
        en: '2. D, JK & T Flip-Flop Characteristic Equations and Timing',
      },
      explanation: {
        tr: 'Senkron ardışıl devrelerde şeffaflık (transparency) sorununu çözmek için kenar tetiklemeli (Edge-Triggered) Flip-Flop\'lar kullanılır. Master-Slave veya kenar algılayıcı yapı sayesinde çıkış yalnızca saat kenarının (↑ veya ↓) geçici anında güncellenir; bu sayede Q\' çıkışını D\'ye geri bağladığınızda kontrolsüz salınım yerine her saatte temiz 1 bitlik tersleme elde edilir. Kararlı örnekleme için verinin saat kenarından önce Setup Time (t_su) ve kenardan sonra Hold Time (t_h) boyunca sabit kalması gerekir.\n\nÜç Temel Flip-Flop Karakteristik Denklemi:\n• D Flip-Flop (Data / Delay): Q(t+1) = D\n• JK Flip-Flop (J=Set, K=Reset, 11=Toggle): Q(t+1) = J·Q\' + K\'·Q (SR\'deki yasak 11 durumunu mevcut durumu tersleyerek çözer!)\n• T Flip-Flop (Toggle): Q(t+1) = T ⊕ Q = T·Q\' + T\'·Q',
        en: 'Synchronous sequential circuits solve latch transparency using Edge-Triggered Flip-Flops. Via a Master-Slave or edge-detector stage, Q updates strictly at the instant of a clock edge (↑ or ↓)—allowing clean feedback loops like Q\' → D without uncontrolled oscillation. For reliable sampling, data must remain stable for Setup Time (t_su) before the clock edge and Hold Time (t_h) after it.\n\nThree Core Flip-Flop Characteristic Equations:\n• D Flip-Flop (Data / Delay): Q(t+1) = D\n• JK Flip-Flop (J=Set, K=Reset, 11=Toggle): Q(t+1) = J·Q\' + K\'·Q (resolves SR’s forbidden 11 input by toggling!)\n• T Flip-Flop (Toggle): Q(t+1) = T ⊕ Q = T·Q\' + T\'·Q',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'D, JK ve T Flip-Flop Karakteristik Tabloları',
            en: 'D, JK & T Flip-Flop Characteristic Tables',
          },
          headers: [
            'Flip-Flop',
            { tr: 'Giriş Durumu', en: 'Input Condition' },
            'Q(t+1)',
            { tr: 'İşlem Adı', en: 'Operation' },
          ],
          highlightColumn: 2,
          rows: [
            ['D FF', 'D = 0 / D = 1', '0 / 1', { tr: 'Reset / Set (Doğrudan Aktarım)', en: 'Reset / Set (Direct Transfer)' }],
            ['JK FF', 'J = 0, K = 0', 'Q(t)', { tr: 'No Change (Hafıza)', en: 'No Change (Hold)' }],
            ['JK FF', 'J = 0, K = 1', '0', { tr: 'Reset (Sıfırla)', en: 'Reset (Clear)' }],
            ['JK FF', 'J = 1, K = 0', '1', { tr: 'Set (1 Yap)', en: 'Set (to 1)' }],
            ['JK FF', 'J = 1, K = 1', "Q'(t)", { tr: 'Toggle (Durum Tersle)', en: 'Toggle (Complement)' }],
            ['T FF', 'T = 0 / T = 1', "Q(t) / Q'(t)", { tr: 'Koru (Hold) / Tersle (Toggle)', en: 'No Change (Hold) / Toggle' }],
          ],
        },
      ],
      widget: 'TimingDiagramViewer',
      widgetConfig: {
        flipFlopType: 'JK',
      },
      examTip: {
        tr: 'Zamanlama diyagramı çizerken saat kenarına (↑) TAM O AN gelen giriş değerini değil, kenardan hemen önceki (Setup penceresindeki) giriş değerini örneklediğinizi unutmayın!',
        en: 'When sketching timing diagrams, remember that the Flip-Flop samples the input value present just BEFORE the active clock edge (within the Setup window), not a simultaneous post-edge change!',
      },
    },
    {
      id: 'w11-s3',
      title: {
        tr: '3. Uyarım Tabloları (Excitation Tables) Altın Özeti',
        en: '3. Flip-Flop Excitation Tables Golden Summary',
      },
      explanation: {
        tr: 'Karakteristik tablo "giriş belliyken sonraki durum ne olur?" sorusunu yanıtlar (Analiz). Tasarım yaparken ise tam tersi soruyu sorarız: "Durumun Q(t)\'den Q(t+1)\'e geçmesi için Flip-Flop girişlerine ne vermeliyim?" İşte bunu Excitation Table (Uyarım Tablosu) verir!\n\nSezgisel JK Don\'t-Care (X) Mantığı: JK Flip-Flop\'ta her hedef geçiş iki farklı komutla sağlanabildiği için tablonun yarısı Don\'t-Care (X) çıkar:\n• 0 → 0: Ya Hold (0,0) ya Reset (0,1) ⇒ J = 0, K = X\n• 0 → 1: Ya Set (1,0) ya Toggle (1,1) ⇒ J = 1, K = X\n• 1 → 0: Ya Reset (0,1) ya Toggle (1,1) ⇒ J = X, K = 1\n• 1 → 1: Ya Hold (0,0) ya Set (1,0) ⇒ J = X, K = 0',
        en: 'A characteristic table answers "given the inputs, what is the next state?" (Analysis). During synthesis, we ask the reverse question: "to transition from Q(t) to Q(t+1), what inputs must we drive?" That is provided by the Excitation Table!\n\nIntuitive JK Don\'t-Care (X) Logic: Because two distinct (J, K) commands achieve each transition, half of the JK excitation table becomes Don\'t-Cares (X):\n• 0 → 0: Hold (0,0) or Reset (0,1) ⇒ J = 0, K = X\n• 0 → 1: Set (1,0) or Toggle (1,1) ⇒ J = 1, K = X\n• 1 → 0: Reset (0,1) or Toggle (1,1) ⇒ J = X, K = 1\n• 1 → 1: Hold (0,0) or Set (1,0) ⇒ J = X, K = 0',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'D, JK ve T Flip-Flop Birleşik Uyarım Tablosu (Excitation Table)',
            en: 'Combined D, JK & T Flip-Flop Excitation Table',
          },
          headers: [
            'Q(t) → Q(t+1)',
            'D',
            'J',
            'K',
            'T',
            { tr: 'Sezgisel Açıklama', en: 'Intuitive Explanation' },
          ],
          highlightColumn: 2,
          rows: [
            ['0 → 0', '0', '0', 'X', '0', { tr: '0 kal: Hold (0,0) veya Reset (0,1) → K = X', en: 'Stay 0: Hold (0,0) or Reset (0,1) → K = X' }],
            ['0 → 1', '1', '1', 'X', '1', { tr: '1 ol: Set (1,0) veya Toggle (1,1) → K = X', en: 'Become 1: Set (1,0) or Toggle (1,1) → K = X' }],
            ['1 → 0', '0', 'X', '1', '1', { tr: '0 ol: Reset (0,1) veya Toggle (1,1) → J = X', en: 'Become 0: Reset (0,1) or Toggle (1,1) → J = X' }],
            ['1 → 1', '1', 'X', '0', '0', { tr: '1 kal: Hold (0,0) veya Set (1,0) → J = X', en: 'Stay 1: Hold (0,0) or Set (1,0) → J = X' }],
          ],
        },
      ],
      examTip: {
        tr: '💡 İpucu — JK Uyarım Tablosunu ezberleme kısayolu: İlk iki satırda (0\'dan başlarken) K = X ve J = Q(t+1); son iki satırda (1\'den başlarken) J = X ve K = Q\'(t+1) olur!',
        en: '💡 Tip — Quick shortcut for the JK Excitation Table: in the first two rows (starting from 0), K = X and J = Q(t+1); in the last two rows (starting from 1), J = X and K = Q\'(t+1)!',
      },
    },
  ],
  questions: [
    {
      id: 'w11-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · NOR-Tabanlı SR Latch Hafıza Durumu',
        en: 'Question 1 · NOR-Based SR Latch Memory State',
      },
      difficulty: 'Temel',
      prompt: {
        tr: "İki adet çapraz bağlı NOR kapısıyla kurulan temel bir SR Latch devresinde mevcut durum Q = 1, Q' = 0 iken girişlere S = 0, R = 0 uygulanırsa çıkış ne olur?",
        en: "In a basic cross-coupled NOR SR Latch currently in state Q = 1, Q' = 0, what happens to the outputs when inputs S = 0, R = 0 are applied?",
      },
      options: [
        {
          tr: "Q = 1, Q' = 0 olarak mevcut durumunu korur (Hafıza / No-Change).",
          en: "Holds its present state Q = 1, Q' = 0 (Memory / No-Change).",
        },
        {
          tr: "Q = 0, Q' = 1 olur (Reset).",
          en: "Becomes Q = 0, Q' = 1 (Reset).",
        },
        {
          tr: "Q = 0, Q' = 0 olur (Yasak Durum).",
          en: "Becomes Q = 0, Q' = 0 (Forbidden State).",
        },
        {
          tr: 'Çıkış sürekli 0 ve 1 arasında salınır.',
          en: 'Outputs oscillate continuously between 0 and 1.',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: NOR Kapılarının Geri Beslemesini İzle',
            en: 'Step 1: Trace the Cross-Coupled NOR Feedback',
          },
          detail: {
            tr: "R=0 ve Q'=0 girişli üst NOR kapısının çıkışı Q = (0 + 0)' = 1 kalır. S=0 ve Q=1 girişli alt NOR kapısının çıkışı ise Q' = (0 + 1)' = 0 olarak kilitli kalır.",
            en: "The top NOR gate with R=0 and Q'=0 outputs Q = (0 + 0)' = 1. The bottom NOR gate with S=0 and Q=1 remains locked at Q' = (0 + 1)' = 0.",
          },
        },
      ],
    },
    {
      id: 'w11-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · JK Flip-Flop Toggle Modu (Mano 5.6)',
        en: 'Question 2 · JK Flip-Flop Toggle Mode (Mano 5.6)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Pozitif kenar tetiklemeli bir JK Flip-Flop’ta Q(t) = 1 iken saat darbesinin yükselen kenarında J = 1, K = 1 uygulanırsa Q(t+1) değeri ne olur?',
        en: 'In a positive-edge-triggered JK Flip-Flop currently at Q(t) = 1, what is Q(t+1) after a rising clock edge when J = 1 and K = 1?',
      },
      options: [
        { tr: 'Q(t+1) = 0 (Tersle / Toggle)', en: 'Q(t+1) = 0 (Toggle)' },
        { tr: 'Q(t+1) = 1 (Koru / Hold)', en: 'Q(t+1) = 1 (Hold)' },
        { tr: 'Belirsiz (Invalid)', en: 'Indeterminate (Invalid)' },
        { tr: "Q(t+1) = 1 ve Q'(t+1) = 1", en: "Q(t+1) = 1 and Q'(t+1) = 1" },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: JK Karakteristik Denklemini Uygula',
            en: 'Step 1: Apply the JK Characteristic Equation',
          },
          detail: {
            tr: "Q(t+1) = J·Q' + K'·Q. J=1, K=1 ve Q=1 yerleştirildiğinde Q(t+1) = 1·(0) + (0)·1 = 0 (Q' değerine terslenir).",
            en: "Q(t+1) = J·Q' + K'·Q. Substituting J=1, K=1, and Q=1 gives Q(t+1) = 1·(0) + (0)·1 = 0 (toggled to Q').",
          },
        },
      ],
    },
    {
      id: 'w11-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · JK Flip-Flop Uyarım Tablosu',
        en: 'Question 3 · JK Flip-Flop Excitation Table',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Bir ardışıl devre tasarımında Flip-Flop durumunun Q(t) = 1\'den Q(t+1) = 0\'a geçmesi isteniyorsa, JK Flip-Flop\'un (J, K) girişlerine ne uygulanmalıdır?',
        en: 'In sequential circuit synthesis, if a Flip-Flop must transition from Q(t) = 1 to Q(t+1) = 0, what must be applied to its (J, K) inputs?',
      },
      options: ['J = X, K = 1', 'J = 0, K = X', 'J = X, K = 0', 'J = 1, K = X'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: 1 → 0 Geçişini Sağlayan Tüm (J, K) Çiftlerini Listele',
            en: 'Step 1: List All (J, K) Pairs Achieving 1 → 0',
          },
          detail: {
            tr: 'Q = 1 iken çıkışın 0 olması için ya Reset (J=0, K=1) ya da Toggle (J=1, K=1) yapılmalıdır. Her iki durumda da K = 1 zorunludur, J ise 0 veya 1 olabilir ⇒ J = X, K = 1.',
            en: 'Starting from Q = 1, reaching 0 requires either Reset (J=0, K=1) or Toggle (J=1, K=1). In both cases K must be 1 while J can be 0 or 1 ⇒ J = X, K = 1.',
          },
        },
      ],
    },
    {
      id: 'w11-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · D Flip-Flop Zamanlama Diyagramı Örnekleme',
        en: 'Question 4 · D Flip-Flop Timing Diagram Sampling',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Başlangıçta Q = 0 olan pozitif kenar tetiklemeli bir D Flip-Flop’a 4 ardışık yükselen saat kenarında sırasıyla D = 1, 1, 0, 1 değerleri uygulanırsa, Q çıkışının 4 saat çevrimi boyunca alacağı değer dizisi nedir?',
        en: 'A positive-edge-triggered D Flip-Flop starts at Q = 0 and sees D = 1, 1, 0, 1 across 4 consecutive rising clock edges. What sequence does Q take over the 4 clock cycles?',
      },
      options: ['1, 1, 0, 1', '0, 1, 1, 0', '1, 0, 1, 0', '0, 1, 0, 1'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Q(t+1) = D Kuralını Her Kenarda Uygula',
            en: 'Step 1: Apply Q(t+1) = D at Each Rising Edge',
          },
          detail: {
            tr: '1. Kenar (D=1) → Q=1 | 2. Kenar (D=1) → Q=1 | 3. Kenar (D=0) → Q=0 | 4. Kenar (D=1) → Q=1.',
            en: 'Edge 1 (D=1) → Q=1 | Edge 2 (D=1) → Q=1 | Edge 3 (D=0) → Q=0 | Edge 4 (D=1) → Q=1.',
          },
        },
      ],
    },
    {
      id: 'w11-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · D Flip-Flop’tan T Flip-Flop Elde Etme',
        en: 'Question 5 · Building a T Flip-Flop from a D Flip-Flop',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Elimizde yalnızca bir D Flip-Flop ve bir XOR kapısı varsa, T girişli bir T Flip-Flop elde etmek için D ucuna hangi ifade bağlanmalıdır?',
        en: 'Given only a D Flip-Flop and an XOR gate, what expression must drive the D input to implement a T Flip-Flop with input T?',
      },
      options: ['D = T ⊕ Q', 'D = T · Q', "D = T + Q'", 'D = T ⊙ Q'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: İki Karakteristik Denklemi Eşitle',
            en: 'Step 1: Equate the Two Characteristic Equations',
          },
          detail: {
            tr: "T Flip-Flop denklemi: Q(t+1) = T ⊕ Q. D Flip-Flop'ta Q(t+1) = D olduğu için D = T ⊕ Q bağlandığında T=0 iken D=Q (tut), T=1 iken D=Q' (tersle) çalışır.",
            en: "The T Flip-Flop equation is Q(t+1) = T ⊕ Q. Since a D Flip-Flop obeys Q(t+1) = D, wiring D = T ⊕ Q gives D=Q (hold) when T=0 and D=Q' (toggle) when T=1.",
          },
        },
      ],
    },
    {
      id: 'w11-q6',
      type: 'interactive-table',
      title: {
        tr: 'Soru 6 · D, JK ve T Flip-Flop Uyarım Tablosu Doldurma',
        en: 'Question 6 · Completing the D, JK & T Excitation Table',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Aşağıdaki birleşik Uyarım Tablosunda (Excitation Table) eksik olan hücreleri 0, 1 veya X (tıklayarak) ile eksiksiz tamamlayın.',
        en: 'Complete every missing cell in the combined Excitation Table below by clicking to cycle through 0, 1, or X.',
      },
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
      solutionExplanation: {
        tr: 'D her zaman Q(t+1)\'e eşittir (0,1,0,1). T ise durum değiştiğinde 1, aynı kaldığında 0 olur (0,1,1,0). JK tablosu: (0,X), (1,X), (X,1), (X,0).',
        en: 'D always equals Q(t+1) (0, 1, 0, 1). T is 1 when the state changes and 0 when it holds (0, 1, 1, 0). The JK pairs are (0,X), (1,X), (X,1), (X,0).',
      },
    },
    {
      id: 'w11-q7',
      type: 'simulator-build',
      title: {
        tr: 'Soru 7 · D Flip-Flop ve XOR ile T Flip-Flop Kurulumu (Canlı Lab)',
        en: 'Question 7 · Building a T Flip-Flop with D Flip-Flop & XOR (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'Simülatörde yerleşik "D Flip-Flop" ve "XOR" kapısını kullanarak D = T ⊕ Q bağlantısıyla çalışan T Flip-Flop devresini kurun. CLK girişini Flip-Flop CLK pinine, Q çıkışını Q LED\'ine bağlayın. Step Pulse butonuyla T=1 iken çıkışın durum değiştirdiğini test edip "Devreyi Doğrula" butonuna basın.',
        en: 'Use a "D Flip-Flop" and an "XOR" gate in the simulator to build a T Flip-Flop wired as D = T ⊕ Q. Connect CLK to the Flip-Flop CLK pin and Q to the Q LED. Test toggling with T=1 using Step Pulse, then click "Verify Circuit".',
      },
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
      hint: {
        tr: '1) D Flip-Flop Q çıkışını hem Q LED\'ine hem de XOR kapısının bir girişine bağlayın. 2) T anahtarını XOR\'un diğer girişine bağlayın. 3) XOR çıkışını D Flip-Flop\'un D pinine, CLK üretecini ise CLK pinine bağlayın.',
        en: '1) Connect the D Flip-Flop Q output to both LED Q and one input of the XOR gate. 2) Wire toggle switch T to the other XOR input. 3) Connect the XOR output to the D Flip-Flop D pin and the CLK generator to the CLK pin.',
      },
      solutionDescription: {
        tr: 'Geri besleme kablosuyla D = T ⊕ Q sağlandığında, T = 1 iken her yükselen saat darbesinde Q terslenir (0→1→0), T = 0 iken mevcut değer korunur.',
        en: 'With feedback D = T ⊕ Q, Q toggles (0→1→0) on every rising clock edge when T = 1 and holds its current value when T = 0.',
      },
    },
  ],
};
