import type { WeekModule } from '../../types/curriculum';

export const week12: WeekModule = {
  id: 12,
  weekNumber: 12,
  englishTitle: {
    tr: 'Synchronous Sequential Logic II (State Tables, Diagrams & Reduction)',
    en: 'Synchronous Sequential Logic II (State Tables, Diagrams & Reduction)',
  },
  turkishSubtitle: {
    tr: 'Ardışıl Devre Analizi, Mealy vs. Moore Makineleri ve Durum İndirgeme (State Reduction)',
    en: 'Sequential Circuit Analysis, Mealy vs. Moore Machines & State Reduction',
  },
  summary: {
    tr: 'Verilen bir saatli ardışıl devre şemasından giriş ve durum denklemlerini çıkarmayı, State Table ve State Diagram oluşturmayı, Mealy ile Moore modellerinin çıkış zamanlama farkını ve State Reduction ile gereksiz durumları eleyerek Flip-Flop tasarrufu sağlamayı öğrenin.',
    en: 'Learn to extract Flip-Flop input and state equations from a clocked sequential circuit diagram, construct State Tables and State Diagrams, distinguish Mealy vs. Moore output timing, and eliminate redundant states via State Reduction to save Flip-Flops.',
  },
  learningObjectives: [
    {
      tr: 'Verilen D, JK veya T Flip-Flop devresinden giriş denklemleri, State Equation ve State Table türetmek',
      en: 'Derive input equations, State Equations, and State Tables from given D, JK, or T Flip-Flop circuits',
    },
    {
      tr: 'Mealy (geçiş oku üzerinde çıkış) ve Moore (durum içinde çıkış) diyagramlarını ayırt etmek',
      en: 'Distinguish Mealy (output on transition arrows) and Moore (output inside state circles) diagrams',
    },
    {
      tr: 'İki durumun eşdeğerlik (Equivalence) koşulunu uygulayarak State Reduction gerçekleştirmek',
      en: 'Perform State Reduction by applying the formal state equivalence condition',
    },
    {
      tr: 'İndirgenmiş durum sayısına (M) göre gereken minimum Flip-Flop sayısını (⌈log₂ M⌉) belirlemek',
      en: 'Determine the minimum number of Flip-Flops (⌈log₂ M⌉) required for M reduced states',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'StateMachineExplorer',
  visualSections: [
    {
      id: 'w12-s1',
      title: {
        tr: '1. Saat Darbeli Ardışıl Devre Analizi (Mano Bölüm 5.4)',
        en: '1. Analysis of Clocked Sequential Circuits (Mano Section 5.4)',
      },
      explanation: {
        tr: 'Bir ardışıl devrede Flip-Flop\'lar birleşik mantık geri beslemesini ayrık saat adımlarına böler: saat darbeleri arasında tüm kapılar yeni değerine oturur ve yalnızca yükselen saat kenarında sonraki durum (Next State) kilitlenir. Verilen bir devreyi analiz etmek için 4 adımlı sistematik prosedür izlenir:\n1. Flip-Flop Giriş Denklemleri: Her Flip-Flop\'un giriş pinlerini süren Boole ifadelerini (örn. D_A = Ax + Bx, D_B = A\'x veya J_A, K_A) yaz.\n2. Durum Denklemleri (State Equations): Giriş denklemlerini ilgili Flip-Flop\'un karakteristik denkleminde yerine koy (D FF için doğrudan A(t+1) = D_A; JK FF için A(t+1) = J_A·A\' + K_A\'·A).\n3. Durum Tablosu (State Table): Tüm Mevcut Durum (Present State) ve Giriş (Input) kombinasyonları için Sonraki Durum (Next State) ve Çıkış (Output) değerlerini hesapla.\n4. Durum Diyagramı (State Diagram): Tablodaki her satırı düğümler (00, 01, 10, 11) ve yönlü geçiş oklarıyla görselleştir.',
        en: 'In a clocked sequential circuit, Flip-Flops break combinational feedback loops into discrete clock steps: between edges, all gates settle, and only on the active clock edge is the Next State latched. Follow this 4-step systematic analysis procedure:\n1. Flip-Flop Input Equations: Write the Boolean expressions driving each Flip-Flop input (e.g., D_A = Ax + Bx, D_B = A\'x, or J_A, K_A).\n2. State Equations: Substitute those input equations into each Flip-Flop’s characteristic equation (for D FF: A(t+1) = D_A directly; for JK FF: A(t+1) = J_A·A\' + K_A\'·A).\n3. State Table: Evaluate Next State and Output for every Present State and Input combination.\n4. State Diagram: Map every row of the table onto state circles (00, 01, 10, 11) and directed transition arrows.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: "Örnek Analiz İzleme Tablosu (Mano Fig. 5.15): D_A = Ax + Bx, D_B = A'x, y = (A + B)x'",
            en: "Worked Analysis Trace (Mano Fig. 5.15): D_A = Ax + Bx, D_B = A'x, y = (A + B)x'",
          },
          headers: [
            { tr: 'Mevcut (A B)', en: 'Present (A B)' },
            { tr: 'Giriş (x)', en: 'Input (x)' },
            { tr: 'Sonraki (A+ B+)', en: 'Next (A+ B+)' },
            { tr: 'Çıkış (y)', en: 'Output (y)' },
          ],
          highlightColumn: 2,
          rows: [
            ['0 0', '0', '0 0', '0'],
            ['0 0', '1', '0 1', '0'],
            ['0 1', '0', '0 0', '1'],
            ['0 1', '1', '1 1', '0'],
            ['1 0', '0', '0 0', '1'],
            ['1 0', '1', '1 0', '0'],
            ['1 1', '0', '0 0', '1'],
            ['1 1', '1', '1 0', '0'],
          ],
        },
      ],
      widget: 'StateMachineExplorer',
      examTip: {
        tr: 'JK Flip-Flop içeren bir devreyi analiz ederken sonraki durumları tek tek tablo satırında JK karakteristik tablosuyla hesaplayabileceğiniz gibi, doğrudan A(t+1) = J_A·A\' + K_A\'·A denklemini yazarak da hatasız bulabilirsiniz!',
        en: 'When analyzing a JK Flip-Flop circuit, you can evaluate next states row by row using the JK characteristic table OR directly substitute into A(t+1) = J_A·A\' + K_A\'·A to avoid mistakes!',
      },
    },
    {
      id: 'w12-s2',
      title: {
        tr: '2. Mealy ve Moore Makineleri Farkı (Pratik Karşılaştırma)',
        en: '2. Mealy vs. Moore Finite State Machines (Practical Comparison)',
      },
      explanation: {
        tr: 'Sonlu Durum Makineleri (FSM) çıkış üretme biçimlerine ve zamanlama davranışlarına göre iki modele ayrılır:\n• Mealy Makinesi: Çıkış hem mevcut duruma hem de o anki girişe bağlıdır [y = f(State, Input)]. Durum diyagramında çıkışlar geçiş oklarının üzerinde "giriş / çıkış" (ör. 1 / 0) şeklinde gösterilir. Neden 1 Saat Önce Yanıt Verir? Giriş x değiştiği anda çıkış doğrudan birleşik kapılardan geçip saat kenarını beklemeden değişir (daha hızlı tepki verir ve genellikle 1 durum daha az harcar; ancak girişteki kısa gürültüleri çıkışa iletebilir).\n• Moore Makinesi: Çıkış YALNIZCA mevcut duruma bağlıdır [y = f(State)]. Diyagramda çıkışlar durum dairesinin içine "Durum / çıkış" (ör. S₀ / 0) biçiminde yazılır; okların üzerinde yalnızca giriş vardır. Giriş değişimi önce saat kenarında Flip-Flop\'a yazıldığı için çıkışı gürültüden tamamen arındırılmış ve saatle senkrondur.',
        en: 'Finite State Machines (FSMs) fall into two architectural models based on output logic and timing:\n• Mealy Machine: Outputs depend on BOTH present state and present input [y = f(State, Input)]. Transition arrows carry "input / output" (e.g., 1 / 0). Why 1 Cycle Earlier? Because input x feeds the output combinational logic directly, y responds immediately without waiting for the clock edge (faster response and usually 1 fewer state, though mid-cycle input glitches can leak to y).\n• Moore Machine: Outputs depend ONLY on present state [y = f(State)]. State circles carry "State / output" (e.g., S₀ / 0) while arrows show only inputs. Because inputs must first be clocked into Flip-Flops, Moore outputs are synchronous and glitch-free.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Mealy vs. Moore Durum Makinesi Karşılaştırması',
            en: 'Mealy vs. Moore State Machine Comparison',
          },
          headers: [
            { tr: 'Özellik', en: 'Feature' },
            { tr: 'Mealy Makinesi', en: 'Mealy Machine' },
            { tr: 'Moore Makinesi', en: 'Moore Machine' },
          ],
          highlightColumn: 1,
          rows: [
            [
              { tr: 'Çıkış Bağımlılığı', en: 'Output Dependence' },
              { tr: 'Mevcut Durum + Giriş', en: 'Present State + Input' },
              { tr: 'Yalnızca Mevcut Durum', en: 'Present State Only' },
            ],
            [
              { tr: 'Diyagram Gösterimi', en: 'Diagram Notation' },
              { tr: 'Ok üzerinde: Giriş / Çıkış (1/0)', en: 'On arrow: Input / Output (1/0)' },
              { tr: 'Daire içinde: Durum / Çıkış (S0/0)', en: 'Inside circle: State / Output (S0/0)' },
            ],
            [
              { tr: 'Çıkış Tepki Hızı', en: 'Output Response' },
              { tr: 'Giriş değişince anında (1 saat önce)', en: 'Immediate on input change (1 cycle earlier)' },
              { tr: 'Saat darbesi (Clock) ile senkron', en: 'Synchronous with Clock edge' },
            ],
            [
              { tr: 'Durum Sayısı', en: 'State Count' },
              { tr: 'Genellikle daha az durum gerektirir', en: 'Usually requires fewer states' },
              { tr: 'Çoğunlukla +1 fazla durum gerektirir', en: 'Often requires +1 extra state' },
            ],
          ],
        },
      ],
      summaryRule: {
        tr: 'Mealy makinesinde çıkış y = f(State, Input) doğrudan girişe de bağlıdır (daha hızlı ve genelde daha az durum); Moore makinesinde ise çıkış yalnızca duruma bağlıdır y = f(State) ve saatle tam senkrondur.',
        en: 'In a Mealy machine, output y = f(State, Input) depends directly on inputs (faster response, fewer states); in a Moore machine, output y = f(State) depends strictly on Flip-Flop states and is fully synchronous.',
      },
      examTip: {
        tr: 'Bir Mealy makinesinde girişteki kısa süreli gürültüler (glitch) saat darbesi gelmese bile çıkışa yansıyabilir; Moore makinesi ise çıkışı yalnızca Flip-Flop durumlarına bağladığı için tamamen senkron ve gürültüye dayanıklıdır.',
        en: 'In a Mealy machine, brief input glitches can propagate directly to the output between clock edges; a Moore machine ties its output strictly to Flip-Flop state bits, making it fully synchronous and glitch-free.',
      },
    },
    {
      id: 'w12-s3',
      title: {
        tr: '3. Durum İndirgeme (State Reduction) ve Durum Atama',
        en: '3. State Reduction & State Assignment',
      },
      explanation: {
        tr: 'Tasarım aşamasında sözlü problemden çizilen durum diyagramında aynı davranışı sergileyen fazla durumlar oluşabilir. Durum İndirgeme (State Reduction) dışarıdan gözlemlenen giriş-çıkış işlevini değiştirmeden gereksiz durumları eleyerek donanım maliyetini düşürür.\n\nEşdeğerlik Tanımı & Basamaklı İndirgeme: İki durum (S_a ve S_b), aynı giriş dizileri uygulandığında tamamen aynı çıkış dizisini üretiyorsa eşdeğerdir. Durum tablosunda iki satırın (1) tüm girişler için ÇIKTILARI aynı ve (2) tüm girişler için SONRAKİ DURUMLARI aynı (veya eşdeğer çift) ise biri silinir ve tablodaki tüm referansları hayatta kalan durumla değiştirilir — bu güncelleme bazen başlangıçta farklı görünen yeni satırları da eşdeğer hale getirir!\n\nDurum Atama (State Assignment) & Flip-Flop Sayısı: M benzersiz durum için ikili kodlamada minimum n = ⌈log₂ M⌉ Flip-Flop gerekir (2ⁿ⁻¹ < M ≤ 2ⁿ). Gray veya ardışıl kod seçimi K-Map kapı maliyetini azaltabilir; FPGA tasarımlarında ise M adet Flip-Flop kullanan One-Hot kodlama (0001, 0010...) kapı gecikmesini minimize eder.',
        en: 'When deriving a state diagram from word specifications, redundant states with identical input-output behavior often appear. State Reduction shrinks hardware cost without altering external input-output behavior.\n\nEquivalence & Cascading Reduction: Two states (S_a and S_b) are equivalent if every input sequence produces identical output sequences from both. If two rows have (1) identical OUTPUTS for all inputs and (2) identical (or equivalent) NEXT STATES for all inputs, delete one and replace all occurrences of it throughout the table—which often reveals new cascading equivalent pairs!\n\nState Assignment & Flip-Flop Count: Binary assignment for M states needs n = ⌈log₂ M⌉ Flip-Flops (2ⁿ⁻¹ < M ≤ 2ⁿ). Choosing Gray vs. sequential codes alters combinational gate count, while One-Hot encoding (M Flip-Flops: 0001, 0010...) trades extra Flip-Flops for ultra-fast next-state logic.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'Durum Sayısı → Minimum Flip-Flop Dönüşüm Ölçeği',
            en: 'State Count → Minimum Flip-Flop Scaling',
          },
          steps: [
            {
              label: { tr: '2 Durum (M = 2)', en: '2 States (M = 2)' },
              badge: '1 Flip-Flop',
              detail: {
                tr: '2¹ = 2 durum kodlanabilir (0, 1).',
                en: '2¹ = 2 states can be encoded (0, 1).',
              },
            },
            {
              label: { tr: '3 – 4 Durum (M = 3..4)', en: '3 – 4 States (M = 3..4)' },
              badge: '2 Flip-Flop',
              detail: {
                tr: '2² = 4 durum kodlanabilir (00, 01, 10, 11). 3 durumlu sistemde 1 durum kullanılmaz.',
                en: '2² = 4 states can be encoded (00, 01, 10, 11). In a 3-state FSM, 1 code is unused.',
              },
            },
            {
              label: { tr: '5 – 8 Durum (M = 5..8)', en: '5 – 8 States (M = 5..8)' },
              badge: '3 Flip-Flop',
              detail: {
                tr: '2³ = 8 durum kodlanabilir. Örneğin 9 durum 5 duruma indirgense bile 3 FF gerekir (4 FF → 3 FF tasarrufu!).',
                en: '2³ = 8 states can be encoded. Reducing 9 states down to 5 saves a Flip-Flop (4 FF → 3 FF)!',
              },
            },
          ],
        },
      ],
      examTip: {
        tr: 'Sınavda bir durum tablosu verildiğinde iki durumun aynı çıkışa sahip olmasına rağmen sonraki durumlarının birbirine çapraz gittiği (örn. a→a, b; b→b, a) veya birbirini gösterdiği durumlara dikkat edin; doğrudan satırları birebir aynı olan durumlarla başlayıp elenen durumu tüm tabloda kalan eşdeğeriyle değiştirin.',
        en: 'When inspecting a state table on an exam, start by merging states whose rows have identical next states and outputs, substitute the surviving state label throughout the table, and watch for states with matching outputs whose next states mirror each other (e.g., a→a,b and b→b,a).',
      },
    },
  ],
  questions: [
    {
      id: 'w12-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · D Flip-Flop Ardışıl Devre Analizi (Mano 5.9)',
        en: 'Question 1 · D Flip-Flop Sequential Circuit Analysis (Mano 5.9)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: "İki D Flip-Flop'lu bir devrede giriş denklemleri D_A = Ax + Bx, D_B = A'x ve çıkış y = (A + B)x' ise, mevcut durum AB = 01 ve giriş x = 1 iken bir sonraki durum A(t+1)B(t+1) ve çıkış y nedir?",
        en: "In a two-D Flip-Flop circuit with input equations D_A = Ax + Bx, D_B = A'x, and output y = (A + B)x', what are the next state A(t+1)B(t+1) and output y when the present state is AB = 01 and input x = 1?",
      },
      options: [
        { tr: 'Sonraki Durum: 11, Çıkış y = 0', en: 'Next State: 11, Output y = 0' },
        { tr: 'Sonraki Durum: 10, Çıkış y = 1', en: 'Next State: 10, Output y = 1' },
        { tr: 'Sonraki Durum: 01, Çıkış y = 0', en: 'Next State: 01, Output y = 0' },
        { tr: 'Sonraki Durum: 11, Çıkış y = 1', en: 'Next State: 11, Output y = 1' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Verilen Değerleri (A=0, B=1, x=1) Denklemlerde Yerine Koy',
            en: 'Step 1: Substitute (A=0, B=1, x=1) into the Input Equations',
          },
          detail:
            "• D_A = Ax + Bx = (0)(1) + (1)(1) = 1 ⇒ A(t+1) = 1\n• D_B = A'x = (1)(1) = 1 ⇒ B(t+1) = 1",
        },
        {
          title: {
            tr: 'Adım 2: Çıkış y Değerini Hesapla',
            en: 'Step 2: Compute Output y',
          },
          detail: {
            tr: "y = (A + B)x' = (0 + 1) · (0) = 0. Sonuç: AB(t+1) = 11, y = 0.",
            en: "y = (A + B)x' = (0 + 1) · (0) = 0. Result: AB(t+1) = 11, y = 0.",
          },
        },
      ],
    },
    {
      id: 'w12-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · JK Flip-Flop Devresi Sonraki Durum Analizi (Mano 5.10)',
        en: 'Question 2 · JK Flip-Flop Next-State Analysis (Mano 5.10)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "İki JK Flip-Flop'lu bir ardışıl devrede J_A = B, K_A = Bx' ve J_B = x', K_B = A ⊕ x olarak verilmiştir. Mevcut durum AB = 11 ve giriş x = 0 iken bir sonraki saat darbesindeki durum A(t+1)B(t+1) nedir?",
        en: "A two-JK Flip-Flop circuit has J_A = B, K_A = Bx', J_B = x', and K_B = A ⊕ x. Starting from AB = 11 with input x = 0, what is the next state A(t+1)B(t+1) after the clock edge?",
      },
      options: ['00', '01', '10', '11'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Flip-Flop Giriş Pinlerini Hesapla (A=1, B=1, x=0)',
            en: 'Step 1: Evaluate Flip-Flop Input Pins (A=1, B=1, x=0)',
          },
          detail:
            "• J_A = B = 1,  K_A = B·x' = 1·1 = 1\n• J_B = x' = 1,  K_B = A ⊕ x = 1 ⊕ 0 = 1",
        },
        {
          title: {
            tr: 'Adım 2: JK Karakteristik Tablosunu Uygula',
            en: 'Step 2: Apply the JK Characteristic Table',
          },
          detail: {
            tr: 'Her iki Flip-Flop için J=1, K=1 (Toggle) durumu oluştuğundan A = 1 → 0 ve B = 1 → 0 olur. Sonraki durum = 00.',
            en: 'Since J=1, K=1 (Toggle) holds for both Flip-Flops, A toggles 1 → 0 and B toggles 1 → 0. Next state = 00.',
          },
        },
      ],
    },
    {
      id: 'w12-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · Mealy Durum Diyagramı Okuma',
        en: 'Question 3 · Reading a Mealy State Diagram',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Bir Mealy durum diyagramında S₁ durumundan S₂ durumuna giden okun üzerinde "1 / 0" etiketi yazıyorsa bunun anlamı nedir?',
        en: 'In a Mealy state diagram, if an arrow from state S₁ to state S₂ is labeled "1 / 0", what does this denote?',
      },
      options: [
        {
          tr: 'Devre S₁ durumundayken giriş 1 olduğunda 0 çıkışı üretir ve S₂ durumuna geçer.',
          en: 'While in state S₁, if the input is 1, the circuit outputs 0 and transitions to S₂.',
        },
        {
          tr: 'Devre S₁ durumundayken daima 1 çıkışı üretir, giriş 0 ise S₂\'ye geçer.',
          en: 'In state S₁, it always outputs 1 and moves to S₂ if input is 0.',
        },
        {
          tr: 'S₁ durumunun ikili kodu 1, S₂ durumunun ikili kodu 0 dır.',
          en: 'State S₁ is encoded as 1 and state S₂ is encoded as 0.',
        },
        {
          tr: 'Devre yalnızca S₂ durumuna geçtikten sonra 1 çıkışı üretir.',
          en: 'The circuit produces output 1 only after arriving in S₂.',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Mealy Notasyonu (Giriş / Çıkış)',
            en: 'Step 1: Mealy Notation (Input / Output)',
          },
          detail: {
            tr: 'Mealy makinelerinde geçiş okları üzerindeki X / Y ifadesinin sol tarafı (X) uygulanan girişi, sağ tarafı (Y) ise o geçiş anında üretilen çıkışı gösterir.',
            en: 'In Mealy diagrams, on an X / Y arrow label, the left value (X) is the input and the right value (Y) is the output produced during that transition.',
          },
        },
      ],
    },
    {
      id: 'w12-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · Durum İndirgeme Sonrası Flip-Flop Sayısı (Mano 5.13)',
        en: 'Question 4 · Flip-Flop Count After State Reduction (Mano 5.13)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Durum indirgeme (State Reduction) işlemi sonucunda 9 durumlu bir sonlu durum makinesi (FSM) 5 benzersiz duruma indirgenmiştir. Bu devreyi ikili kodlama (Binary State Assignment) ile gerçeklemek için minimum kaç adet Flip-Flop gerekir?',
        en: 'After State Reduction, a 9-state FSM is reduced to 5 distinct states. Using binary state assignment, what is the minimum number of Flip-Flops required to implement this circuit?',
      },
      options: [
        { tr: '3 adet Flip-Flop', en: '3 Flip-Flops' },
        { tr: '2 adet Flip-Flop', en: '2 Flip-Flops' },
        { tr: '4 adet Flip-Flop', en: '4 Flip-Flops' },
        { tr: '5 adet Flip-Flop', en: '5 Flip-Flops' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: İndirgeme Öncesi ve Sonrası Karşılaştırma',
            en: 'Step 1: Compare Before and After Reduction',
          },
          detail: {
            tr: '9 durum için 2³ < 9 ≤ 2⁴ olduğundan başlangıçta 4 Flip-Flop gerekirdi. 5 duruma indirgendikten sonra 2² < 5 ≤ 2³ olduğundan 3 adet Flip-Flop (8 duruma kadar kapasite) yeterlidir; 1 Flip-Flop tasarrufu sağlanmıştır.',
            en: 'For 9 states, 2³ < 9 ≤ 2⁴ originally required 4 Flip-Flops. Once reduced to 5 states, 2² < 5 ≤ 2³ so 3 Flip-Flops (up to 8 states) suffice—saving 1 Flip-Flop.',
          },
        },
      ],
    },
    {
      id: 'w12-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · Eşdeğer Durum (Equivalent States) Koşulu',
        en: 'Question 5 · Equivalent States Condition',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Bir durum tablosunda iki durumun (S_a ve S_b) "eşdeğer" (equivalent) sayılabilmesi için hangi iki şart aynı anda sağlanmalıdır?',
        en: 'In a state table, what two conditions must hold simultaneously for two states (S_a and S_b) to be considered equivalent?',
      },
      options: [
        {
          tr: 'Tüm olası giriş kombinasyonları için aynı çıkışı üretmeli VE her giriş için aynı veya eşdeğer sonraki durumlara gitmelidir.',
          en: 'They must produce identical outputs for all input combinations AND transition to identical or equivalent next states for every input.',
        },
        {
          tr: 'Yalnızca 0 girişi için aynı çıkışı üretmeleri yeterlidir.',
          en: 'Producing the same output solely for input 0 is sufficient.',
        },
        {
          tr: 'İkili durum kodlarının (State Assignment) Hamming mesafesi 1 olmalıdır.',
          en: 'Their binary state codes must have a Hamming distance of 1.',
        },
        {
          tr: 'Yalnızca aynı sonraki duruma gitmeleri yeterlidir, çıkışları farklı olabilir.',
          en: 'Transitioning to the same next state is enough, even if their outputs differ.',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Resmi Eşdeğerlik Tanımı',
            en: 'Step 1: Formal Definition of Equivalence',
          },
          detail: {
            tr: 'Dışarıdan bakan bir gözlemci S_a ile S_b arasındaki farkı asla anlayamamalıdır; bu da her giriş için özdeş çıkış ve eşdeğer sonraki durum gerektirir.',
            en: 'An external observer must never be able to distinguish S_a from S_b—requiring both identical outputs and equivalent next states across all inputs.',
          },
        },
      ],
    },
    {
      id: 'w12-q6',
      type: 'interactive-table',
      title: {
        tr: 'Soru 6 · D Flip-Flop Devresi Durum Tablosu (State Table)',
        en: 'Question 6 · D Flip-Flop Circuit State Table',
      },
      difficulty: 'Orta',
      prompt: {
        tr: "D_A = A ⊕ x, D_B = A'B + x ve çıkış y = AB denklemlerine sahip saatli ardışıl devrenin 8 satırlık Durum Tablosunu (A+, B+, y sütunlarını tıklayarak) doldurun.",
        en: "Complete the 8-row State Table (click to set A(t+1), B(t+1), and y) for the clocked sequential circuit defined by D_A = A ⊕ x, D_B = A'B + x, and y = AB.",
      },
      headers: ['A', 'B', 'x', 'A(t+1)', 'B(t+1)', 'y'],
      rows: [
        [
          { value: '0' }, { value: '0' }, { value: '0' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '0' }, { value: '1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '1' }, { value: '0' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '1' }, { value: '1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '1' }, { value: '0' }, { value: '0' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '1' }, { value: '0' }, { value: '1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '1' }, { value: '1' }, { value: '0' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: '1' }, { value: '1' }, { value: '1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
      ],
      solutionExplanation: {
        tr: "A(t+1) = A ⊕ x; B(t+1) = A'B + x (x=1 iken daima 1, x=0 iken yalnızca AB=01 satırında 1); Moore çıkışı y = AB yalnızca AB=11 satırlarında 1 olur.",
        en: "A(t+1) = A ⊕ x; B(t+1) = A'B + x (always 1 when x=1, and 1 only at AB=01 when x=0); Moore output y = AB is 1 only when AB=11.",
      },
    },
    {
      id: 'w12-q7',
      type: 'simulator-build',
      title: {
        tr: 'Soru 7 · 2-Bit Senkron Yukarı Sayıcı Analiz & Kurulumu (Canlı Lab)',
        en: 'Question 7 · 2-Bit Synchronous Up-Counter Build & Verification (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "Simülatörde 2 adet D Flip-Flop, 1 adet XOR ve gerekirse NOT kapısı kullanarak D_A = A ⊕ B, D_B = B' denklemlerine sahip 2-bit senkron yukarı sayıcı devresini kurun. İlk FF'in Q çıkışını A LED'ine, ikinci FF'in Q çıkışını B LED'ine bağlayın ve Clock darbeleriyle 00 → 01 → 10 → 11 → 00 saymasını doğrulayın.",
        en: "In the simulator, use 2 D Flip-Flops, 1 XOR gate (and a NOT gate if needed) to build the 2-bit synchronous up-counter defined by D_A = A ⊕ B and D_B = B'. Connect the first FF's Q output to LED A, the second FF's Q output to LED B, and verify the 00 → 01 → 10 → 11 → 00 count sequence on clock pulses.",
      },
      inputs: [],
      outputs: ['A', 'B'],
      allowedComponents: ['DFF', 'XOR', 'NOT'],
      expectedTruthTable: [],
      sequentialTest: {
        clkLabel: 'CLK',
        steps: [
          { inputs: {}, expectedOutputs: { A: 0, B: 1 } },
          { inputs: {}, expectedOutputs: { A: 1, B: 0 } },
          { inputs: {}, expectedOutputs: { A: 1, B: 1 } },
          { inputs: {}, expectedOutputs: { A: 0, B: 0 } },
        ],
      },
      hint: {
        tr: "Her iki D Flip-Flop'un CLK pinini CLK üretecine bağlayın. B Flip-Flop'unun Q' çıkışını kendi D girişine (veya Q'yu NOT üzerinden D'ye) bağlayarak D_B = B' elde edin. A ve B'nin Q çıkışlarını XOR kapısına bağlayıp A Flip-Flop'unun D girişine verin; Q çıkışlarını sırasıyla A ve B LED'lerine bağlayın.",
        en: "Connect both D Flip-Flop CLK pins to the CLK generator. Wire B Flip-Flop's Q' output back to its own D pin (or Q through a NOT gate) for D_B = B'. Feed A and B's Q outputs into the XOR gate to drive A's D pin, and wire the Q outputs to LEDs A and B.",
      },
      solutionDescription: {
        tr: "D_B = B' bağlantısı B bitini her saat darbesinde tersler (0→1→0→1). D_A = A ⊕ B ise B=1 olduğunda A bitini tersleyerek tam 2-bitlik 00 → 01 → 10 → 11 → 00 sayma döngüsünü üretir.",
        en: "Wiring D_B = B' toggles bit B on every clock pulse (0→1→0→1). D_A = A ⊕ B toggles A whenever B = 1, producing the full 2-bit binary sequence 00 → 01 → 10 → 11 → 00.",
      },
    },
  ],
};
