import type { WeekModule } from '../../types/curriculum';

export const week6: WeekModule = {
  id: 6,
  weekNumber: 6,
  englishTitle: 'NAND/NOR & XOR Implementations',
  turkishSubtitle: "Don't-Care (X) Koşulları, Evrensel NAND/NOR Dönüşümleri ve XOR Eşlik Devreleri",
  summary:
    "K-Map'te farksız (Don't-Care) koşullardan yararlanarak maliyet düşürmeyi, SOP/POS devrelerini iki seviyeli ve çok seviyeli yalnızca NAND / yalnızca NOR kapılarına dönüştürmeyi (Bubble Pushing) ve XOR tabanlı Parity devrelerini öğrenin.",
  learningObjectives: [
    "Don't-Care (X) koşullarını K-Map'te yalnızca grupları büyütmek için akıllıca kullanmak",
    'Standard SOP ifadeyi 2-seviyeli NAND-NAND ve Standard POS ifadeyi 2-seviyeli NOR-NOR devresine çevirmek',
    'Çok seviyeli devrelerde Dr. Dhiman Bubble Pushing yöntemiyle tek girişli Inverter gereksinimini belirlemek',
    'XOR / XNOR kapılarıyla Odd & Even Parity Generator ve Checker devrelerini tasarlamak',
  ],
  isPlaceholder: false,
  recommendedWidget: 'KMapStudio',
  recommendedWidgetConfig: {
    variables: 4,
    initialMinterms: [1, 3, 7, 11, 15],
  },
  visualSections: [
    {
      id: 'w6-s1',
      title: "1. Farksız Durumlar (Don't-Care Conditions - X)",
      explanation:
        'Bazı dijital sistemlerde giriş kombinasyonlarının bir kısmı fiziksel olarak asla gerçekleşmez (örneğin 4-bit BCD kodunda 1010–1111 arası 10–15 değerleri geçersizdir). Çıkışının 0 veya 1 olmasının önemsiz olduğu bu durumlara Don\'t-Care (X) denir.\n\nAltın Kural: K-Map üzerindeki X hücrelerini grupları büyütmek (ör. 2\'liden 4\'lüye veya 4\'lüden 8\'liye çıkarmak) için "1" gibi kullanabilirsiniz; fakat X\'leri tek başına kapsamak için ASLA ekstra grup kurmayın! Kullanılmayan X\'ler otomatik olarak "0" kabul edilir.',
      widget: 'KMapStudio',
      widgetConfig: {
        variables: 4,
        initialMinterms: [1, 3, 7, 11, 15],
      },
      examTip:
        'KMapStudio\'da hücrelere iki kez tıklayarak "X" (Don\'t-Care) değerini verebilir ve grupların nasıl büyüyüp sadeleştiğini anlık olarak test edebilirsiniz!',
    },
    {
      id: 'w6-s2',
      title: '2. İki Seviyeli (Two-Level) Yalnızca NAND ve Yalnızca NOR Devreleri',
      explanation:
        'Gerçek entegre devrelerde (IC) CMOS teknolojisi NAND ve NOR kapılarını AND/OR kapılarından daha hızlı ve daha az transistörle üretir. Bu nedenle standart iki seviyeli devreler doğrudan NAND veya NOR eşdeğerlerine dönüştürülür:\n• SOP → NAND-NAND: AND-OR devresinde 1. katman AND çıkışlarına birer baloncuk (NAND), 2. katman OR girişlerine birer baloncuk (Bubbled-OR ≡ NAND) yerleştirin. Çift baloncuk birbirini götürür!\n• POS → NOR-NOR: OR-AND devresinde 1. katman OR çıkışlarına (NOR) ve 2. katman AND girişlerine (Bubbled-AND ≡ NOR) baloncuk koyun.\n\nÖzel Durum: Eğer SOP içinde tek bir literal (ör. F = A + BC) varsa, o literal 2. seviye NAND kapısına girmeden önce mutlaka terslenerek (A\') verilmelidir!',
      diagrams: [
        {
          kind: 'steps',
          caption: 'Two-Level Evrensel Kapı Dönüşüm Kuralları',
          steps: [
            {
              label: 'SOP (AND-OR) → NAND-NAND',
              badge: "F = AB + CD",
              detail: "1. Seviye: NAND(A,B) = (AB)'\nNAND(C,D) = (CD)'\n2. Seviye: NAND((AB)', (CD)')\n= AB + CD",
            },
            {
              label: 'POS (OR-AND) → NOR-NOR',
              badge: 'F = (A+B)(C+D)',
              detail: "1. Seviye: NOR(A,B) = (A+B)'\nNOR(C,D) = (C+D)'\n2. Seviye: NOR((A+B)', (C+D)')\n= (A+B)(C+D)",
            },
            {
              label: 'Tek Literal Kuralı',
              badge: 'F = A + BC',
              detail: "A terimi 1. seviye NAND'dan geçmediği için 2. seviye NAND girişine A' (Inverter ile) olarak girer!",
            },
          ],
        },
      ],
      examTip:
        'NAND-NAND dönüşümünün daima SOP\'tan, NOR-NOR dönüşümünün ise daima POS\'tan başladığını aklınızda tutun. K-Map\'ten SOP bulduysanız NAND\'a, POS bulduysanız NOR\'a geçmek en kısa yoldur.',
    },
    {
      id: 'w6-s3',
      title: '3. Çok Seviyeli Devrelerde Dr. Dhiman "Bubble Pushing" Yöntemi',
      explanation:
        'Parantezli çok seviyeli bir ifadeyi (ör. F = A(CD + B) + BC\') tamamen NAND veya tamamen NOR kapılarına çevirmek için 4 adımlı sistematik yöntem uygulanır:\n1. Tüm AND kapılarını çıkışında baloncuk olan NAND sembolüne çevir; ardından karşısındaki hat üzerine dengeleyici bir baloncuk (Inverter) koy veya bir sonraki OR kapısını girişleri baloncuklu OR (≡ NAND) haline getir.\n2. OR kapılarını girişleri baloncuklu OR (≡ NAND) sembolüne dönüştür.\n3. Bir kablo üzerinde eşleşmeyen tekil baloncuk kalırsa oraya 1-girişli NAND (Inverter) ekle.\n4. Tekil literal doğrudan bir Bubbled-OR girişine bağlanıyorsa tersini al.',
      diagrams: [
        {
          kind: 'steps',
          caption: "Örnek: F = A(CD + B) + BC' İfadesinin NAND Dönüşümü",
          steps: [
            {
              label: 'Katman 1: CD ve (CD + B)',
              badge: 'B\' Inverter',
              detail: "CD → NAND(C, D) = (CD)' (baloncuk var).\n+ B işlemi Bubbled-OR (NAND) olacağı için B girişi B' (1 Inverter) olarak girer!",
            },
            {
              label: 'Katman 2: A · (CD + B) ve BC\'',
              badge: 'C\' Inverter',
              detail: "NAND(A, CD+B) = [A(CD+B)]'.\nC' girişi düz C'den geliyorsa 1 Inverter ile C' üretilir; NAND(B, C') = (BC')'.",
            },
            {
              label: 'Katman 3: Çıkış Toplamı',
              badge: 'Çıkış NAND',
              detail: "İki terim de çıkışında baloncuklu olarak son Bubbled-OR (NAND) kapısına girer ve F elde edilir.",
            },
          ],
        },
      ],
      examTip:
        'İki kablo arasındaki tekil baloncuğu her zaman takip edin: Kablo üzerinde toplam ÇİFT sayıda baloncuk (0 veya 2) varsa mantık korunur; TEK sayıda baloncuk (1) varsa araya mutlaka bir Inverter (tek girişli NAND/NOR) eklenmelidir.',
    },
    {
      id: 'w6-s4',
      title: '4. XOR / XNOR Cebiri ve Eşlik (Parity) Devreleri',
      explanation:
        'XOR (⊕) ve XNOR (⊙) kapıları hata tespitinde (Parity Generator / Checker) ve aritmetik toplayıcılarda temel rol oynar:\n• Tek Eşlik (Odd Function): P = x ⊕ y ⊕ z (Girişlerde tek sayıda 1 varsa P = 1).\n• Çift Eşlik Üreteci (Even Parity Generator): 3-bitlik mesaja eklenecek P biti, toplam 1 sayısını çift yapmalıdır; yani mesajda tek sayıda 1 varsa P = 1 olmalıdır (P = x ⊕ y ⊕ z).\n• Alıcıdaki Even Parity Checker: Mesaj + Parity bitinin tamamı XOR\'lanır: C = x ⊕ y ⊕ z ⊕ P. Hata yoksa toplam 1 sayısı çifttir ve C = 0 çıkar; tek bitlik hata oluşursa C = 1 (Hata!) üretilir.',
      diagrams: [
        {
          kind: 'table',
          caption: 'XOR ve XNOR Temel Cebir Özdeşlikleri',
          headers: ['Özdeşlik', 'XOR Formülü', 'XNOR Formülü'],
          rows: [
            ['Sıfır ile İşlem', 'x ⊕ 0 = x', "x ⊙ 0 = x'"],
            ['Bir ile İşlem', "x ⊕ 1 = x'", 'x ⊙ 1 = x'],
            ['Kendisi ile İşlem', 'x ⊕ x = 0', 'x ⊙ x = 1'],
            ['Tümleyeni ile İşlem', "x ⊕ x' = 1", "x ⊙ x' = 0"],
            ['Değişme & Birleşme', '(x ⊕ y) ⊕ z = x ⊕ (y ⊕ z)', '(x ⊙ y) ⊙ z = x ⊙ (y ⊙ z)'],
          ],
        },
      ],
      examTip:
        '3-bitlik Even Parity Generator formülü P = x ⊕ y ⊕ z iken, Odd Parity Generator formülü bunun tümleyeni olan P_odd = (x ⊕ y ⊕ z)\' = x ⊕ y ⊙ z biçimindedir!',
    },
  ],
  questions: [
    {
      id: 'w6-q1',
      type: 'multiple-choice',
      title: "Soru 1 · Don't-Care Koşullarıyla K-Map Sadeleştirme (Mano 3.15)",
      difficulty: 'Orta',
      prompt:
        'F(A, B, C, D) = Σ(1, 3, 7, 11, 15) ve farksız durumları d(A, B, C, D) = Σ(0, 2, 5) olan fonksiyonun en sade SOP ifadelerinden biri aşağıdakilerden hangisidir?',
      options: [
        "F = A'B' + CD   (veya alternatif: F = A'D + CD)",
        'F = AB + CD',
        "F = A'B' + C'D",
        "F = B'D + AC",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: 1 ve X (Don\'t-Care) Hücrelerini Yerleştir',
          detail: '1 olanlar: {1, 3, 7, 11, 15}. X olanlar: {0, 2, 5}.',
        },
        {
          title: 'Adım 2: Zorunlu CD Sütunu (3, 7, 11, 15)',
          detail: 'CD = 11 sütunundaki dört 1 hücresi {3, 7, 11, 15} birleşerek CD terimini oluşturur.',
        },
        {
          title: 'Adım 3: Kalan m₁ Hücresini X\'lerle Büyüt',
          detail:
            "• Seçenek 1: d(0, 2) hücrelerini 1 kabul edip {0, 1, 2, 3} = A'B' yapmak ⇒ F = A'B' + CD.\n• Seçenek 2: d(5) hücresini 1 kabul edip {1, 3, 5, 7} = A'D yapmak ⇒ F = A'D + CD.\n(İki çözüm de 2 terim ve 4 literalle en sadedir.)",
        },
      ],
    },
    {
      id: 'w6-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · İki Seviyeli NAND Devresi Kapı Sayısı (Mano 3.19)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'F(A, B, C, D) = Σ(1, 2, 3, 4, 5, 7) fonksiyonunun en sade SOP formunu yalnızca 2 seviyeli NAND kapılarıyla (girişlerin tümleyenleri hazır verilmiş kabul edilerek) kurmak için toplam kaç adet NAND kapısı gerekir?',
      options: ['4 adet NAND kapısı', '3 adet NAND kapısı', '5 adet NAND kapısı', '6 adet NAND kapısı'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: K-Map İle Minimum SOP Formunu Bul',
          detail:
            "Mintermler (A=0 yarısında): {1, 3, 5, 7} ⇒ A'D | {2, 3} ⇒ A'B'C | {4, 5} ⇒ A'BC'.\nMinimum SOP: F = A'D + A'B'C + A'BC'",
        },
        {
          title: 'Adım 2: Two-Level NAND-NAND Katmanlarını Say',
          detail:
            "1. Seviye: 3 çarpım teriminin her biri için 1'er NAND kapısı (3 kapı).\n2. Seviye: Bu 3 çıkışı toplayan 1 adet 3-girişli çıkış NAND kapısı (1 kapı).\nToplam: 3 + 1 = 4 adet NAND kapısı.",
        },
      ],
    },
    {
      id: 'w6-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · İki Seviyeli NOR-NOR Çıkış Kapısı İşlevi',
      difficulty: 'Temel',
      prompt:
        "F(A, B, C, D) = (A + B')(C + D) POS ifadesini yalnızca iki seviyeli NOR kapılarıyla kurduğumuzda, 2. seviyedeki çıkış NOR kapısı DeMorgan eşdeğerliği gereği hangi işlemi gerçekleştirir?",
      options: [
        'Invert-AND (Girişleri terslenmiş AND) işlevi görür ve F = (A + B\')(C + D) üretir.',
        'Standart OR işlevi görür.',
        'Invert-OR işlevi görür.',
        'Yalnızca XOR işlevi görür.',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Birinci ve İkinci Seviye Çıkışlarını Yaz',
          detail:
            "1. Seviye NOR çıkışları: X = (A + B')' ve Y = (C + D)'.\n2. Seviye NOR çıkışı: (X + Y)' = X' · Y' = (A + B')(C + D) [Invert-AND].",
        },
      ],
    },
    {
      id: 'w6-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · Çok Seviyeli Bubble Pushing ile Inverter Sayısı (Dr. Dhiman)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        "Yalnızca düz girişler (A, B, C, D) mevcutken F = A(CD + B) + BC' çok seviyeli ifadesi tamamen NAND kapıları kullanılarak çizildiğinde, toplamda kaç adet Inverter (tek girişli NAND) kapısı gerekir?",
      options: ['2 adet (B\' ve C\' için)', '0 adet', '1 adet (yalnızca C\' için)', '4 adet'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Parantez İçi Dönüşüm (CD + B)',
          detail:
            "NAND(C, D) çıkışında baloncuk üretir: (CD)'. Bu sinyali B ile OR yapmak için 2. katman Bubbled-OR (NAND) kullanılır; bu yüzden B girişi B' olarak terslenmelidir (1. Inverter).",
        },
        {
          title: 'Adım 2: Alt Kol Dönüşümü (BC\')',
          detail:
            "BC' çarpımı için NAND(B, C') kullanılır; ancak C' elde etmek için C girişine 1 Inverter bağlanmalıdır (2. Inverter). Toplamda B' ve C' için 2 adet Inverter gerekir.",
        },
      ],
    },
    {
      id: 'w6-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · Even Parity Checker (Çift Eşlik Denetleyicisi)',
      difficulty: 'Temel',
      prompt:
        '3-bitlik veri (x, y, z) ve 1-bitlik Even Parity (P) alan bir alıcı devrede hata kontrol çıkışı C = x ⊕ y ⊕ z ⊕ P hangi durumda 1 (Hata Var) üretir?',
      options: [
        'Alınan 4 bit (x, y, z, P) içinde tek sayıda 1 bulunduğunda',
        'Alınan 4 bit içinde çift sayıda 1 bulunduğunda',
        'Yalnızca P = 1 olduğunda',
        'Tüm bitler 0 olduğunda',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: 4-Girişli XOR Davranışı',
          detail:
            'Even Parity protokolünde hatasız bir 4-bitlik pakette daima ÇİFT sayıda 1 bulunur ve 4-girişli XOR bu durumda 0 üretir. İletimde tek bitlik bir hata olduğunda 1 sayısı TEK olur ve C = 1 yanar.',
        },
      ],
    },
    {
      id: 'w6-q6',
      type: 'simulator-build',
      title: 'Soru 6 · Yalnızca NAND Kapılarıyla Devre Kurulumu (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        "F(A, B, C) = A'B + AC fonksiyonunu simülatörde YALNIZCA NAND kapıları kullanarak (NOT işlemi için A girişini bir NAND kapısının her iki girişine birden bağlayarak) kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.",
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['NAND'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: "1) A'yı 1. NAND kapısının hem a hem b pinine bağlayarak A' üretin. 2) 2. NAND'a A' ve B bağlayın. 3) 3. NAND'a A ve C bağlayın. 4) 2. ve 3. NAND çıkışlarını 4. çıkış NAND'ına bağlayıp F LED'ine iletin.",
      solutionDescription:
        "DeMorgan eşdeğerliği: [(A'B)' · (AC)']' = A'B + AC. Toplam 4 adet NAND kapısı (1 Inverter + 2 birinci seviye + 1 çıkış NAND) ile tam SOP devresi elde edilir.",
    },
    {
      id: 'w6-q7',
      type: 'simulator-build',
      title: 'Soru 7 · Yalnızca NOR Kapılarıyla POS Devresi Kurulumu (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        "F(A, B, C) = (A + B)(A' + C) POS fonksiyonunu simülatörde YALNIZCA NOR kapıları kullanarak (A' için A girişini bir NOR kapısının her iki girişine birden bağlayarak) kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.",
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['NOR'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: "1) A'yı 1. NOR kapısının hem a hem b pinine bağlayarak A' üretin. 2) 2. NOR'a A ve B bağlayın. 3) 3. NOR'a A' ve C bağlayın. 4) 2. ve 3. NOR çıkışlarını 4. çıkış NOR'una bağlayıp F LED'ine iletin.",
      solutionDescription:
        "DeMorgan eşdeğerliği: [(A+B)' + (A'+C)']' = (A+B)(A'+C). Toplam 4 adet NOR kapısı ile iki seviyeli POS devresi gerçekleştirilmiş olur.",
    },
  ],
};
