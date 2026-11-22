import type { WeekModule } from '../../types/curriculum';

export const week8: WeekModule = {
  id: 8,
  weekNumber: 8,
  englishTitle: 'Midterm Exam Simulator (Vize Deneme Sınavı)',
  turkishSubtitle: '1–7. Haftalar Kapsamlı Vize Özeti, Kritik Tuzaklar ve 12 Soruluk Deneme Sınavı',
  summary:
    'COM 3021 Digital Design I ara sınavı öncesinde 1–7. haftaların tüm kritik formüllerini, Dr. Dhiman\'ın puan kaybettiren 5 tuzak kontrol listesini gözden geçirin ve 12 soruluk kapsamlı vize simülatörüyle kendinizi test edin.',
  learningObjectives: [
    'Hafta 1–7 konularını tek bir bütünleşik sınav akışında hızla tekrar etmek',
    'Taban aritmetiği, Signed Overflow, Boole sadeleştirme ve Kanonik SOP/POS dönüşümlerinde tam doğruluk sağlamak',
    'K-Map, Don\'t-Care, All-NAND dönüşümleri ve Ripple Carry Adder gecikme sorularını süre baskısı altında hatasız çözmek',
  ],
  isPlaceholder: false,
  isExam: true,
  recommendedWidget: 'KMapStudio',
  recommendedWidgetConfig: {
    variables: 4,
    initialMinterms: [0, 2, 5, 7, 8, 10, 13, 15],
  },
  visualSections: [
    {
      id: 'w8-s1',
      title: '1. COM 3021 Vize Hızlı Formül ve Kritik Kurallar Özeti (Exam Cheat-Sheet)',
      explanation:
        'Vize sınavında en hızlı ve hatasız sonuca ulaşmanız için 1–7. haftaların temel matematiksel kuralları tek bir özet matriste toplanmıştır. Her soruyu çözmeden önce ilgili kuralın sınır koşullarını kontrol edin.',
      diagrams: [
        {
          kind: 'table',
          caption: 'Hafta 1–7 Kapsamlı Vize Formül Matrisi',
          headers: ['Konu Alanı', 'Temel Formül / Kural', 'Kritik Kontrol Noktası'],
          highlightColumn: 1,
          rows: [
            ['Taban Dönüşümleri (H1)', 'Octal = 3-bit grup | Hex = 4-bit grup', 'Gruplamaya daima radix noktasından başla!'],
            ["2's Complement & Overflow (H2)", 'V = C_in ⊕ C_out (İşaret biti eldeleri)', 'Yalnızca aynı işaretli iki sayı toplanırken oluşabilir.'],
            ['Binary ↔ Gray Code (H2)', 'G_MSB = B_MSB | Gᵢ = Bᵢ₊₁ ⊕ Bᵢ', 'Ardışıl kodlar arası yalnızca 1 bit değişir.'],
            ['Consensus Teoremi (H3)', "xy + x'z + yz = xy + x'z", "Duali: (x+y)(x'+z)(y+z) = (x+y)(x'+z)."],
            ['Kanonik Formlar (H4)', 'Mᵢ = (mᵢ)\' | Σm ve ΠM tümleyendir', '3-girişli NAND ve NOR birleşme (associative) özelliğine sahip DEĞİLDİR!'],
            ['K-Map Minimizasyon (H5–H6)', '2ⁿ gruplama · Önce yalnız 1\'ler (EPI)', 'POS için 0\'ları grupla (F\'), sonra DeMorgan al!'],
            ['Ripple Carry Adder (H7)', 't_total = (n - 1)·t_carry + max(t_sum, t_carry)', 'Son basamak toplam (Sum) gecikmesini unutma!'],
          ],
        },
      ],
      examTip:
        'Vize kağıdında cebirsel sadeleştirme yaptıktan sonra her zaman 3 veya 4 değişkenli küçük bir K-Map çizerek bulduğunuz sonucun gerçekten minimum olup olmadığını 30 saniyede doğrulayabilirsiniz.',
    },
    {
      id: 'w8-s2',
      title: "2. Dr. Dhiman'ın Sınavda Puan Kaybettiren 5 Kritik Tuzak Kontrol Listesi",
      explanation:
        'Öğrencilerin COM 3021 vizesinde en sık puan kaybettiği 5 klasik hata aşağıda listelenmiştir. Sınav sırasında her cevabınızı bu 5 kontrol noktasına göre gözden geçirin.',
      diagrams: [
        {
          kind: 'steps',
          caption: 'Vize Öncesi 5 Tuzak Kontrol Listesi',
          steps: [
            {
              label: 'Tuzak 1: K-Map Başlık Sırası',
              badge: 'Gray Code!',
              detail: 'Satır/sütun başlıklarını asla 00, 01, 10, 11 yazma! Daima 00, 01, 11, 10 (Gray Code) sıralamasını kullan.',
            },
            {
              label: "Tuzak 2: Don't-Care (X) Kullanımı",
              badge: 'Yeni Grup Açma!',
              detail: "X hücrelerini yalnızca mevcut 1'lerin grubunu 2'liden 4'lüye büyütmek için kullan; içinde hiç 1 olmayan X grubu çizme.",
            },
            {
              label: 'Tuzak 3: NAND / NOR Zincirleme',
              badge: 'Associativity Yok',
              detail: "(x ↑ y) ↑ z ≠ (xyz)'! 3 girişli NAND veya NOR gereken yerde 2 girişli kapıları doğrudan art arda bağlama.",
            },
            {
              label: 'Tuzak 4: POS Sadeleştirmede DeMorgan',
              badge: "0'lar = F'",
              detail: "K-Map'te 0'ları gruplayınca bulduğun ifade F' dir! Cevaba mutlaka DeMorgan uygulayarak F'nin POS formunu yaz.",
            },
            {
              label: 'Tuzak 5: Ripple Carry Gecikmesi',
              badge: '(n-1) Carry + Sum',
              detail: '4-bit ve 8-bit toplayıcılarda son basamak eldesi geldikten sonra son Sum bitinin gecikmesini (t_sum) eklemeyi unutma.',
            },
          ],
        },
      ],
      examTip:
        'Aşağıdaki 12 soruluk Vize Deneme Sınavı, sınavdaki soru dağılımını birebir yansıtacak şekilde kolaydan zora doğru sıralanmıştır.',
    },
  ],
  questions: [
    {
      id: 'w8-q1',
      type: 'multiple-choice',
      title: 'Vize Soru 1 · Bilinmeyen Taban Bulma (Hafta 1)',
      difficulty: 'Temel',
      prompt: '(35)_r + (24)_r = (62)_r eşitliğini sağlayan r sayı tabanı (Radix) kaçtır?',
      options: ['r = 7', 'r = 8', 'r = 9', 'r = 6'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Polinom Açılımını Kur',
          detail: '(3r + 5) + (2r + 4) = 6r + 2',
        },
        {
          title: 'Adım 2: r İçin Çöz ve Rakam Sınırını Kontrol Et',
          detail: '5r + 9 = 6r + 2  ⇒  r = 7. Sayılardaki en büyük rakam 6 (< 7) olduğu için r = 7 geçerlidir.',
        },
      ],
    },
    {
      id: 'w8-q2',
      type: 'multiple-choice',
      title: "Vize Soru 2 · 6-Bit 2's Complement & Overflow (Hafta 2)",
      difficulty: 'Orta',
      prompt:
        "6-bit işaretli 2's Complement aritmetiğinde (+21)₁₀ + (+15)₁₀ işlemi yapıldığında ikili sonuç ve Overflow (V) durumu nedir?",
      options: [
        '100100 ve Overflow = 1 (Taşma Var)',
        '100100 ve Overflow = 0 (Taşma Yok)',
        '000100 ve Overflow = 1 (Taşma Var)',
        '101100 ve Overflow = 0 (Taşma Yok)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: 6-Bit İkili Gösterimleri Topla',
          detail: '  010101 (+21)\n+ 001111 (+15)\n───────────────\n  100100 (-28 görünür!)',
        },
        {
          title: 'Adım 2: Aralık ve Overflow Kontrolü',
          detail:
            '6-bit işaretli aralık [-32, +31] dir. +36 bu sınırı aşar. İşaret bitine giren elde C_in = 1, çıkan elde C_out = 0 ⇒ V = 1 ⊕ 0 = 1 (Overflow).',
        },
      ],
    },
    {
      id: 'w8-q3',
      type: 'multiple-choice',
      title: 'Vize Soru 3 · Binary → Gray Code Dönüşümü (Hafta 2)',
      difficulty: 'Temel',
      prompt: '(100110)₂ ikili sayısının Gray Code karşılığı nedir?',
      options: ['110101', '110111', '100101', '111101'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: MSB Sabit, Komşu Bitleri XOR Yap',
          detail:
            'G₅ = 1 | G₄ = 1⊕0 = 1 | G₃ = 0⊕0 = 0 | G₂ = 0⊕1 = 1 | G₁ = 1⊕1 = 0 | G₀ = 1⊕0 = 1 ⇒ 110101.',
        },
      ],
    },
    {
      id: 'w8-q4',
      type: 'multiple-choice',
      title: 'Vize Soru 4 · Boole Cebiri & Consensus Sadeleştirmesi (Hafta 3)',
      difficulty: 'Orta',
      prompt:
        "F = AB + A'C + BC + AB'D Boole fonksiyonunun en az literalli sadeleştirilmiş hali aşağıdakilerden hangisidir?",
      options: [
        "AB + AD + A'C",
        "AB + BC + A'C",
        "A'C + BD + AB",
        "AB + A'D + A'C",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Consensus Teoremi ile BC Terimini Ele',
          detail: "AB + A'C + BC = AB + A'C (BC fazlalık terimdir).",
        },
        {
          title: 'Adım 2: AB + AB\'D İfadesini A Parantezinde Sadeleştir',
          detail: "A(B + B'D) + A'C = A(B + D) + A'C = AB + AD + A'C.",
        },
      ],
    },
    {
      id: 'w8-q5',
      type: 'multiple-choice',
      title: 'Vize Soru 5 · Kanonik ΠM ve Σm Dönüşümü (Hafta 4)',
      difficulty: 'Orta',
      prompt:
        "F(x, y, z) = (x + y')(y + z) fonksiyonunun kanonik Product of Maxterms (ΠM) ve Sum of Minterms (Σm) gösterimi nedir?",
      options: [
        'ΠM(0, 2, 3, 4) ve Σm(1, 5, 6, 7)',
        'ΠM(1, 4, 5) ve Σm(0, 2, 3, 6, 7)',
        'ΠM(0, 2, 4, 6) ve Σm(1, 3, 5, 7)',
        'ΠM(2, 3, 4, 5) ve Σm(0, 1, 6, 7)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Her Çarpanı Eksik Değişkenle Kanonik Maxtermlere Aç',
          detail:
            "• (x + y') = (x + y' + z)(x + y' + z') = M₂ · M₃\n• (y + z) = (x + y + z)(x' + y + z) = M₀ · M₄",
        },
        {
          title: 'Adım 2: ΠM ve Tamamlayıcı Σm Kümesini Yaz',
          detail: 'F = ΠM(0, 2, 3, 4)  ⇒  Geri kalan indeksler {1, 5, 6, 7} olduğundan F = Σm(1, 5, 6, 7).',
        },
      ],
    },
    {
      id: 'w8-q6',
      type: 'multiple-choice',
      title: 'Vize Soru 6 · 4-Değişkenli K-Map SOP & EPI Sayısı (Hafta 5)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'F(A, B, C, D) = Σ(0, 1, 2, 4, 5, 7, 11, 15) fonksiyonunun en sade SOP ifadelerinden biri ve toplam Essential Prime Implicant (EPI) sayısı nedir?',
      options: [
        "3 adet EPI (A'C', A'B'D', ACD); Minimum SOP: F = A'C' + A'B'D' + ACD + A'BD (veya BCD)",
        "4 adet EPI; Minimum SOP: F = A'C' + A'B'D' + BCD + A'BD",
        "2 adet EPI; Minimum SOP: F = A'C' + ACD + B'D",
        "3 adet EPI; Minimum SOP: F = A'C' + B'D' + ACD + A'BD",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Tüm Prime Implicant\'ları ve EPI\'ları Bul',
          detail:
            "• {0, 1, 4, 5} = A'C' (m₁ ve m₄'ü tek başına örter ⇒ EPI)\n• {0, 2} = A'B'D' (m₂'yi tek başına örter ⇒ EPI)\n• {11, 15} = ACD (m₁₁'i tek başına örter ⇒ EPI)",
        },
        {
          title: 'Adım 2: Açıkta Kalan m₇ (0111) Hücresini Ört',
          detail:
            "m₇ hücresi hem {5, 7} = A'BD hem de {7, 15} = BCD grubuyla örtülebilir. Dolayısıyla 3 EPI vardır ve minimum SOP: A'C' + A'B'D' + ACD + A'BD (veya + BCD).",
        },
      ],
    },
    {
      id: 'w8-q7',
      type: 'multiple-choice',
      title: "Vize Soru 7 · K-Map Üzerinden Minimum POS (Hafta 5)",
      difficulty: 'Sınav Seviyesi',
      prompt:
        'F(A, B, C, D) = Σ(3, 7, 11, 12, 13, 14, 15) fonksiyonunun K-Map üzerindeki 0\'lar gruplanarak elde edilen en sade iki seviyeli POS ifadesi nedir?',
      options: [
        'F = (A + C)(A + D)(B + C)(B + D)   [Çarpanlara ayrılmış hali: AB + CD]',
        "F = (A' + B')(C' + D')",
        'F = (A + B)(C + D)',
        "F = (A + C')(B + D')",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: "Adım 1: 0 Hücrelerini Grupla (F' İçin SOP)",
          detail:
            "0 olanlar: {0, 1, 2, 4, 5, 6, 8, 9, 10}.\n4'lü gruplar: A'C' {0,1,4,5} + A'D' {0,2,4,6} + B'C' {0,1,8,9} + B'D' {0,2,8,10}.\nF' = A'C' + A'D' + B'C' + B'D'",
        },
        {
          title: 'Adım 2: DeMorgan ile Minimum POS Biçimine Çevir',
          detail:
            'F = (F\')\' = (A + C)(A + D)(B + C)(B + D). (Bu ifade açıldığında doğrudan SOP karşılığı olan AB + CD elde edilir.)',
        },
      ],
    },
    {
      id: 'w8-q8',
      type: 'multiple-choice',
      title: "Vize Soru 8 · Don't-Care Koşullu K-Map Sadeleştirme (Hafta 6)",
      difficulty: 'Orta',
      prompt:
        'F(A, B, C, D) = Σ(2, 3, 10, 11, 12, 13, 14, 15) ve farksız durumları d(A, B, C, D) = Σ(0, 1, 8, 9) olan fonksiyonun en sade SOP ifadesi nedir?',
      options: ["F = A + B'", "F = B'C + AB", "F = A' + B", 'F = AC + B\'D'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: İlk ve Son Satırı (AB=00 ve AB=10) İncele',
          detail:
            "AB = 00 satırında {0=X, 1=X, 3=1, 2=1} ve AB = 10 satırında {8=X, 9=X, 11=1, 10=1}. Bu iki satır birleşerek 8'li B' grubunu oluşturur!",
        },
        {
          title: 'Adım 2: Alt İki Satırı (AB=11 ve AB=10) Birleştir',
          detail:
            "AB = 11 satırı {12,13,15,14} tamamen 1 ve AB = 10 satırı {8,9,11,10} tamamen 1/X olduğundan ikinci 8'li grup = A oluşur.\nSonuç: F = A + B' (yalnızca 2 literal!).",
        },
      ],
    },
    {
      id: 'w8-q9',
      type: 'multiple-choice',
      title: 'Vize Soru 9 · Yalnızca 2-Girişli NAND ile Kapı Sayısı (Hafta 6)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'F = (A + B)(C + D) ifadesi yalnızca 2-girişli NAND kapıları kullanılarak (girişlerin tümleyenleri verilmemişken) inşa edildiğinde minimum kaç adet NAND kapısı gerekir?',
      options: ['8 adet NAND kapısı', '4 adet NAND kapısı', '6 adet NAND kapısı', '5 adet NAND kapısı'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Her Bir (X + Y) OR İşlemi İçin NAND Sayısı',
          detail:
            "A + B = (A' · B')'. A' için 1 NAND, B' için 1 NAND ve bunları birleştirmek için 1 NAND = 3 NAND kapısı gerekir. Aynı şekilde (C + D) için de 3 NAND gerekir (Toplam 6).",
        },
        {
          title: 'Adım 2: İki Grubu AND Yapmak İçin NAND Sayısı',
          detail:
            'Son AND işlemi için 1 NAND + 1 çıkış Inverter NAND = 2 kapı gerekir. Genel Toplam = 3 + 3 + 2 = 8 adet NAND kapısı.',
        },
      ],
    },
    {
      id: 'w8-q10',
      type: 'multiple-choice',
      title: 'Vize Soru 10 · 8-Bit Ripple Carry Adder Gecikmesi (Hafta 7)',
      difficulty: 'Orta',
      prompt:
        'Bir Full Adder bloğunda Sum gecikmesi 25 ns ve Carry gecikmesi 12 ns ise, 8-bitlik bir Ripple Carry Adder devresinin en kötü durum toplam yayılım gecikmesi kaç nanosaniyedir?',
      options: ['109 ns', '200 ns', '96 ns', '121 ns'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: İlk 7 Basamağın Carry Gecikmesini Hesapla',
          detail: 'C₇ sinyali 7 aşamadan geçer: 7 × 12 ns = 84 ns.',
        },
        {
          title: 'Adım 2: Son Basamak Sum Gecikmesini Ekle',
          detail: 'S₇ toplam biti C₇ geldikten 25 ns sonra oluşur: 84 + 25 = 109 ns.',
        },
      ],
    },
    {
      id: 'w8-q11',
      type: 'interactive-table',
      title: 'Vize Soru 11 · 4-Değişkenli K-Map Checkerboard Analizi',
      difficulty: 'Orta',
      prompt:
        'F(A, B, C, D) = Σ(0, 2, 5, 7, 8, 10, 13, 15) fonksiyonunun K-Map matrisindeki tüm hücreleri (0/1 tıklayarak) doldurun ve minimum SOP ifadesini doğrulayın.',
      headers: ['AB \\ CD', '00', '01', '11', '10'],
      rows: [
        [
          { value: '00' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: '01' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '11' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '10' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
      ],
      solutionExplanation:
        "Haritanın 4 köşesi {0, 2, 8, 10} birleşerek B'D' terimini, ortadaki 4 hücre {5, 7, 13, 15} birleşerek BD terimini üretir. Minimum SOP: F = B'D' + BD = (B ⊙ D).",
    },
    {
      id: 'w8-q12',
      type: 'simulator-build',
      title: 'Vize Soru 12 · All-NAND 3-Girişli Çoğunluk Devresi (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        '3 girişli Çoğunluk Devresi (Majority Circuit) olan F(A, B, C) = Σ(3, 5, 6, 7) = AB + BC + AC fonksiyonunu simülatörde YALNIZCA NAND kapıları kullanarak kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.',
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['NAND'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: "2-girişli NAND kapılarıyla 3 terimli SOP kurmak için: X = NAND(A,B), Y = NAND(B,C), Z = NAND(A,C) üretin. Sonra U = NAND(X,Y) (= AB+BC), ardından U'yu iki bacağı kısa devre bir NAND'dan geçirip V = U' elde edin; son olarak NAND(V, Z) = AB + BC + AC olarak F'ye bağlayın!",
      solutionDescription:
        "3 terimli SOP olan AB + BC + AC ifadesi 2-girişli NAND kapılarıyla kaskat DeMorgan eşdeğerliğiyle kurulur: U = NAND((AB)', (BC)') = AB + BC, V = NAND(U, U) = (AB + BC)', F = NAND(V, (AC)') = AB + BC + AC.",
    },
  ],
};
