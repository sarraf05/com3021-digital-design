import type { WeekModule } from '../../types/curriculum';

export const week12: WeekModule = {
  id: 12,
  weekNumber: 12,
  englishTitle: 'Synchronous Sequential Logic II (State Tables, Diagrams & Reduction)',
  turkishSubtitle: 'Ardışıl Devre Analizi, Mealy vs. Moore Makineleri ve Durum İndirgeme (State Reduction)',
  summary:
    'Verilen bir saatli ardışıl devre şemasından giriş ve durum denklemlerini çıkarmayı, State Table ve State Diagram oluşturmayı, Mealy ile Moore modellerinin çıkış zamanlama farkını ve State Reduction ile gereksiz durumları eleyerek Flip-Flop tasarrufu sağlamayı öğrenin.',
  learningObjectives: [
    'Verilen D, JK veya T Flip-Flop devresinden giriş denklemleri, State Equation ve State Table türetmek',
    'Mealy (geçiş oku üzerinde çıkış) ve Moore (durum içinde çıkış) diyagramlarını ayırt etmek',
    'İki durumun eşdeğerlik (Equivalence) koşulunu uygulayarak State Reduction gerçekleştirmek',
    'İndirgenmiş durum sayısına (M) göre gereken minimum Flip-Flop sayısını (⌈log₂ M⌉) belirlemek',
  ],
  isPlaceholder: false,
  recommendedWidget: 'StateMachineExplorer',
  visualSections: [
    {
      id: 'w12-s1',
      title: '1. Saat Darbeli Ardışıl Devre Analizi (Mano Bölüm 5.4)',
      explanation:
        'Verilen bir ardışıl devrenin davranışını belirlemek için 4 adımlı sistematik analiz prosedürü izlenir:\n1. Flip-Flop Giriş Denklemleri: Her Flip-Flop\'un giriş pinlerini süren Boole ifadelerini (örn. D_A = Ax + Bx veya J_A, K_A) yaz.\n2. Durum Denklemleri (State Equations): Giriş denklemlerini ilgili Flip-Flop\'un karakteristik denkleminde yerine koy (D FF için doğrudan A(t+1) = D_A; JK FF için A(t+1) = J_A·A\' + K_A\'·A).\n3. Durum Tablosu (State Table): Tüm Mevcut Durum (Present State) ve Giriş (Input) kombinasyonları için Sonraki Durum (Next State) ve Çıkış (Output) değerlerini hesapla.\n4. Durum Diyagramı (State Diagram): Tablodaki her satırı düğümler (S₀, S₁...) ve yönlü oklarla görselleştir.',
      widget: 'StateMachineExplorer',
      examTip:
        'JK Flip-Flop içeren bir devreyi analiz ederken sonraki durumları tek tek tablo satırında JK karakteristik tablosuyla hesaplayabileceğiniz gibi, doğrudan A(t+1) = J_A·A\' + K_A\'·A denklemini yazarak da hatasız bulabilirsiniz!',
    },
    {
      id: 'w12-s2',
      title: '2. Mealy ve Moore Makineleri Farkı (Dr. Dhiman Karşılaştırması)',
      explanation:
        'Sonlu Durum Makineleri (FSM) çıkış üretme biçimlerine göre iki modele ayrılır:\n• Mealy Makinesi: Çıkış hem mevcut duruma hem de o anki girişe bağlıdır [y = f(State, Input)]. Durum diyagramında çıkışlar geçiş oklarının üzerinde "giriş / çıkış" (ör. 1 / 0) şeklinde gösterilir. Giriş değiştiği anda (saat darbesini beklemeden!) çıkış anında tepki verebilir (asenkron çıkış hatası riski taşır ama genellikle daha az durum gerektirir).\n• Moore Makinesi: Çıkış YALNIZCA mevcut duruma bağlıdır [y = f(State)]. Durum diyagramında çıkışlar durum dairesinin içine "Durum / çıkış" (ör. S₀ / 0) biçiminde yazılır; okların üzerinde yalnızca giriş değeri yer alır.',
      diagrams: [
        {
          kind: 'table',
          caption: 'Mealy vs. Moore Durum Makinesi Karşılaştırması',
          headers: ['Özellik', 'Mealy Makinesi', 'Moore Makinesi'],
          highlightColumn: 1,
          rows: [
            ['Çıkış Bağımlılığı', 'Mevcut Durum + Giriş', 'Yalnızca Mevcut Durum'],
            ['Diyagram Gösterimi', 'Ok üzerinde: Giriş / Çıkış (1/0)', 'Daire içinde: Durum / Çıkış (S0/0)'],
            ['Çıkış Tepki Hızı', 'Giriş değişince anında (1 saat önce)', 'Saat darbesi (Clock) ile senkron'],
            ['Durum Sayısı', 'Genellikle daha az durum gerektirir', 'Çoğunlukla +1 fazla durum gerektirir'],
          ],
        },
      ],
      examTip:
        'Bir Mealy makinesinde girişteki kısa süreli gürültüler (glitch) saat darbesi gelmese bile çıkışa yansıyabilir; Moore makinesi ise çıkışı yalnızca Flip-Flop durumlarına bağladığı için tamamen senkron ve gürültüye dayanıklıdır.',
    },
    {
      id: 'w12-s3',
      title: '3. Durum İndirgeme (State Reduction) ve Durum Atama',
      explanation:
        'Tasarım aşamasında sözlü problemden çizilen durum diyagramında bazen aynı davranışı sergileyen fazla durumlar oluşabilir. Durum İndirgeme (State Reduction) gereksiz durumları eleyerek donanım maliyetini düşürür.\n\nEşdeğerlik Tanımı: İki durum (S_a ve S_b), aynı giriş dizileri uygulandığında tamamen aynı çıkış dizisini üretiyorsa eşdeğerdir. Pratik kural: Durum tablosunda iki satırın (1) Tüm girişler için ÇIKTILARI aynı ve (2) Tüm girişler için SONRAKİ DURUMLARI aynı (veya eşdeğer çift) ise bu iki durum birleştirilir ve biri tablodan silinir!\n\nFlip-Flop Sayısı Hesabı: İndirgeme sonrası M adet benzersiz durum kaldıysa gereken minimum Flip-Flop sayısı n = ⌈log₂ M⌉ olur (2ⁿ⁻¹ < M ≤ 2ⁿ).',
      diagrams: [
        {
          kind: 'steps',
          caption: 'Durum Sayısı → Minimum Flip-Flop Dönüşüm Ölçeği',
          steps: [
            {
              label: '2 Durum (M = 2)',
              badge: '1 Flip-Flop',
              detail: '2¹ = 2 durum kodlanabilir (0, 1).',
            },
            {
              label: '3 – 4 Durum (M = 3..4)',
              badge: '2 Flip-Flop',
              detail: '2² = 4 durum kodlanabilir (00, 01, 10, 11). 3 durumlu sistemde 1 durum kullanılmaz.',
            },
            {
              label: '5 – 8 Durum (M = 5..8)',
              badge: '3 Flip-Flop',
              detail: '2³ = 8 durum kodlanabilir. Örneğin 9 durum 5 duruma indirgense bile 3 FF gerekir (4 FF → 3 FF tasarrufu!).',
            },
          ],
        },
      ],
      examTip:
        'Sınavda bir durum tablosu verildiğinde iki durumun aynı çıkışa sahip olmasına rağmen sonraki durumlarının birbirine çapraz gittiği (örn. a→a, b; b→b, a) veya birbirini gösterdiği durumlara dikkat edin; doğrudan satırları birebir aynı olan durumlarla başlayıp elenen durumu tüm tabloda kalan eşdeğeriyle değiştirin.',
    },
  ],
  questions: [
    {
      id: 'w12-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · D Flip-Flop Ardışıl Devre Analizi (Mano 5.9)',
      difficulty: 'Temel',
      prompt:
        "İki D Flip-Flop'lu bir devrede giriş denklemleri D_A = Ax + Bx, D_B = A'x ve çıkış y = (A + B)x' ise, mevcut durum AB = 01 ve giriş x = 1 iken bir sonraki durum A(t+1)B(t+1) ve çıkış y nedir?",
      options: [
        'Sonraki Durum: 11, Çıkış y = 0',
        'Sonraki Durum: 10, Çıkış y = 1',
        'Sonraki Durum: 01, Çıkış y = 0',
        'Sonraki Durum: 11, Çıkış y = 1',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Verilen Değerleri (A=0, B=1, x=1) Denklemlerde Yerine Koy',
          detail:
            "• D_A = Ax + Bx = (0)(1) + (1)(1) = 1 ⇒ A(t+1) = 1\n• D_B = A'x = (1)(1) = 1 ⇒ B(t+1) = 1",
        },
        {
          title: 'Adım 2: Çıkış y Değerini Hesapla',
          detail: "y = (A + B)x' = (0 + 1) · (0) = 0. Sonuç: AB(t+1) = 11, y = 0.",
        },
      ],
    },
    {
      id: 'w12-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · JK Flip-Flop Devresi Sonraki Durum Analizi (Mano 5.10)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        "İki JK Flip-Flop'lu bir ardışıl devrede J_A = B, K_A = Bx' ve J_B = x', K_B = A ⊕ x olarak verilmiştir. Mevcut durum AB = 11 ve giriş x = 0 iken bir sonraki saat darbesindeki durum A(t+1)B(t+1) nedir?",
      options: ['00', '01', '10', '11'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Flip-Flop Giriş Pinlerini Hesapla (A=1, B=1, x=0)',
          detail:
            "• J_A = B = 1,  K_A = B·x' = 1·1 = 1\n• J_B = x' = 1,  K_B = A ⊕ x = 1 ⊕ 0 = 1",
        },
        {
          title: 'Adım 2: JK Karakteristik Tablosunu Uygula',
          detail:
            'Her iki Flip-Flop için J=1, K=1 (Toggle) durumu oluştuğundan A = 1 → 0 ve B = 1 → 0 olur. Sonraki durum = 00.',
        },
      ],
    },
    {
      id: 'w12-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · Mealy Durum Diyagramı Okuma',
      difficulty: 'Temel',
      prompt:
        'Bir Mealy durum diyagramında S₁ durumundan S₂ durumuna giden okun üzerinde "1 / 0" etiketi yazıyorsa bunun anlamı nedir?',
      options: [
        'Devre S₁ durumundayken giriş 1 olduğunda 0 çıkışı üretir ve S₂ durumuna geçer.',
        'Devre S₁ durumundayken daima 1 çıkışı üretir, giriş 0 ise S₂\'ye geçer.',
        'S₁ durumunun ikili kodu 1, S₂ durumunun ikili kodu 0 dır.',
        'Devre yalnızca S₂ durumuna geçtikten sonra 1 çıkışı üretir.',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Mealy Notasyonu (Giriş / Çıkış)',
          detail:
            'Mealy makinelerinde geçiş okları üzerindeki X / Y ifadesinin sol tarafı (X) uygulanan girişi, sağ tarafı (Y) ise o geçiş anında üretilen çıkışı gösterir.',
        },
      ],
    },
    {
      id: 'w12-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · Durum İndirgeme Sonrası Flip-Flop Sayısı (Mano 5.13)',
      difficulty: 'Orta',
      prompt:
        'Durum indirgeme (State Reduction) işlemi sonucunda 9 durumlu bir sonlu durum makinesi (FSM) 5 benzersiz duruma indirgenmiştir. Bu devreyi ikili kodlama (Binary State Assignment) ile gerçeklemek için minimum kaç adet Flip-Flop gerekir?',
      options: ['3 adet Flip-Flop', '2 adet Flip-Flop', '4 adet Flip-Flop', '5 adet Flip-Flop'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: İndirgeme Öncesi ve Sonrası Karşılaştırma',
          detail:
            '9 durum için 2³ < 9 ≤ 2⁴ olduğundan başlangıçta 4 Flip-Flop gerekirdi. 5 duruma indirgendikten sonra 2² < 5 ≤ 2³ olduğundan 3 adet Flip-Flop (8 duruma kadar kapasite) yeterlidir; 1 Flip-Flop tasarrufu sağlanmıştır.',
        },
      ],
    },
    {
      id: 'w12-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · Eşdeğer Durum (Equivalent States) Koşulu',
      difficulty: 'Temel',
      prompt:
        'Bir durum tablosunda iki durumun (S_a ve S_b) "eşdeğer" (equivalent) sayılabilmesi için hangi iki şart aynı anda sağlanmalıdır?',
      options: [
        'Tüm olası giriş kombinasyonları için aynı çıkışı üretmeli VE her giriş için aynı veya eşdeğer sonraki durumlara gitmelidir.',
        'Yalnızca 0 girişi için aynı çıkışı üretmeleri yeterlidir.',
        'İkili durum kodlarının (State Assignment) Hamming mesafesi 1 olmalıdır.',
        'Yalnızca aynı sonraki duruma gitmeleri yeterlidir, çıkışları farklı olabilir.',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Resmi Eşdeğerlik Tanımı',
          detail:
            'Dışarıdan bakan bir gözlemci S_a ile S_b arasındaki farkı asla anlayamamalıdır; bu da her giriş için özdeş çıkış ve eşdeğer sonraki durum gerektirir.',
        },
      ],
    },
    {
      id: 'w12-q6',
      type: 'interactive-table',
      title: 'Soru 6 · D Flip-Flop Devresi Durum Tablosu (State Table)',
      difficulty: 'Orta',
      prompt:
        "D_A = A ⊕ x, D_B = A'B + x ve çıkış y = AB denklemlerine sahip saatli ardışıl devrenin 8 satırlık Durum Tablosunu (A+, B+, y sütunlarını tıklayarak) doldurun.",
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
      solutionExplanation:
        "A(t+1) = A ⊕ x; B(t+1) = A'B + x (x=1 iken daima 1, x=0 iken yalnızca AB=01 satırında 1); Moore çıkışı y = AB yalnızca AB=11 satırlarında 1 olur.",
    },
    {
      id: 'w12-q7',
      type: 'simulator-build',
      title: 'Soru 7 · 2-Bit Senkron Yukarı Sayıcı Analiz & Kurulumu (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        "Simülatörde 2 adet D Flip-Flop, 1 adet XOR ve gerekirse NOT kapısı kullanarak D_A = A ⊕ B, D_B = B' denklemlerine sahip 2-bit senkron yukarı sayıcı devresini kurun. İlk FF'in Q çıkışını A LED'ine, ikinci FF'in Q çıkışını B LED'ine bağlayın ve Clock darbeleriyle 00 → 01 → 10 → 11 → 00 saymasını doğrulayın.",
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
      hint: "Her iki D Flip-Flop'un CLK pinini CLK üretecine bağlayın. B Flip-Flop'unun Q' çıkışını kendi D girişine (veya Q'yu NOT üzerinden D'ye) bağlayarak D_B = B' elde edin. A ve B'nin Q çıkışlarını XOR kapısına bağlayıp A Flip-Flop'unun D girişine verin; Q çıkışlarını sırasıyla A ve B LED'lerine bağlayın.",
      solutionDescription:
        "D_B = B' bağlantısı B bitini her saat darbesinde tersler (0→1→0→1). D_A = A ⊕ B ise B=1 olduğunda A bitini tersleyerek tam 2-bitlik 00 → 01 → 10 → 11 → 00 sayma döngüsünü üretir.",
    },
  ],
};
