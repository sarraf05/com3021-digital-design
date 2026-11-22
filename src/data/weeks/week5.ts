import type { WeekModule } from '../../types/curriculum';

export const week5: WeekModule = {
  id: 5,
  weekNumber: 5,
  englishTitle: 'Gate-Level Minimization (K-Map)',
  turkishSubtitle: 'Karnaugh Haritası (K-Map), Prime Implicant, EPI ve Minimum SOP / POS Sentezi',
  summary:
    'Boole fonksiyonlarını cebirsel deneme-yanılma yerine görsel örüntü tanımayla en az kapı ve literal sayısına indirgeyen Karnaugh Haritası (K-Map) yöntemini, Gray Code komşuluk yapısını, PI/EPI ayrımını ve 0’ları gruplayarak POS elde etmeyi öğrenin.',
  learningObjectives: [
    '2, 3 ve 4 değişkenli K-Map tablolarında Gray Code (00, 01, 11, 10) komşuluk ve wrap-around mantığını kavramak',
    'Dr. Dhiman\'ın 4 Altın Kuralını kullanarak 2ⁿ boyutlu optimal grupları oluşturmak',
    'Prime Implicant (PI) ile Essential Prime Implicant (EPI) kavramlarını kesin olarak ayırt etmek',
    'K-Map üzerindeki 0\'ları gruplayıp DeMorgan uygulayarak minimum POS denklemini türetmek',
  ],
  isPlaceholder: false,
  recommendedWidget: 'KMapStudio',
  recommendedWidgetConfig: {
    variables: 4,
    initialMinterms: [0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14],
  },
  visualSections: [
    {
      id: 'w5-s1',
      title: '1. Gray Code Sıralaması ve 2, 3, 4 Değişkenli K-Map Anatomisi',
      explanation:
        'Karnaugh Haritası (K-Map), doğruluk tablosunun iki boyutlu bir matris biçimidir. Satır ve sütun başlıklarının ikili sayma (00, 01, 10, 11) yerine Gray Code (00, 01, 11, 10) sırasıyla yazılmasının tek bir nedeni vardır: Yan yana veya alt alta duran her iki hücre arasında YALNIZCA 1 bit değişir (mantıksal komşuluk).\n\nSilindirik Birleşme (Wrap-Around): Haritanın en üst kenarı ile en alt kenarı (örn. 00 ile 10) ve en sol kenarı ile en sağ kenarı (00 ile 10) da 1 bit farkla komşudur! Yani haritanın 4 köşesi aslında birbirine bitişik tek bir 4\'lü grup oluşturabilir.',
      diagrams: [
        {
          kind: 'table',
          caption: '4-Değişkenli K-Map Hücre İndeksleri (Minterm m₀ – m₁₅ Yerleşimi)',
          headers: ['AB \\ CD', '00', '01', '11', '10'],
          rows: [
            ['00', 'm₀ (0000)', 'm₁ (0001)', 'm₃ (0011)', 'm₂ (0010)'],
            ['01', 'm₄ (0100)', 'm₅ (0101)', 'm₇ (0111)', 'm₆ (0110)'],
            ['11', 'm₁₂ (1100)', 'm₁₃ (1101)', 'm₁₅ (1111)', 'm₁₄ (1110)'],
            ['10', 'm₈ (1000)', 'm₉ (1001)', 'm₁₁ (1011)', 'm₁₀ (1010)'],
          ],
        },
      ],
      widget: 'KMapStudio',
      widgetConfig: {
        variables: 4,
        initialMinterms: [0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14],
      },
      examTip:
        '4 değişkenli K-Map\'te 3. satırın (AB=11 → m₁₂..m₁₅) 4. satırdan (AB=10 → m₈..m₁₁) ÖNCE geldiğini asla unutmayın! İndeks atlamasını (0,1,3,2 ve 4,5,7,6 ve 12,13,15,14 ve 8,9,11,10) el alışkanlığı haline getirin.',
    },
    {
      id: 'w5-s2',
      title: "2. Dr. Dhiman'ın 4 Altın K-Map Gruplama Kuralı",
      explanation:
        'Bir K-Map\'ten en sade (minimum literal ve minimum terimli) SOP ifadesini hatasız çıkarabilmek için şu 4 kuralı sırasıyla uygulayın:\n• Kural 1: Dikdörtgen/kare grupların boyutu yalnızca 2ⁿ (1, 2, 4, 8 veya 16) olabilir; asla 3, 5, 6 veya çapraz (diagonal) grup yapılamaz.\n• Kural 2: Önce yalnızca tek bir gruba dahil olabilen "yalnız 1" hücrelerini (Essential Prime Implicant) tespit edip işaretleyin.\n• Kural 3: Her grubu mümkün olan EN BÜYÜK 2ⁿ boyutuna genişletin (4 değişkenli haritada 1\'li grup → 4 literal, 2\'li grup → 3 literal, 4\'lü grup → 2 literal, 8\'li grup → 1 literal üretir!).\n• Kural 4: Tüm 1\'ler en az bir gruba dahil olduktan sonra fazladan (redundant) grup eklemeyin.',
      diagrams: [
        {
          kind: 'table',
          caption: '4 Değişkenli K-Map\'te Grup Boyutu ve Elenen Literal İlişkisi',
          headers: ['Grup Boyutu (2ⁿ)', 'Elenen Değişken Sayısı (n)', 'Kalan Literal Sayısı (4 - n)', 'Örnek Terim'],
          highlightColumn: 2,
          rows: [
            ['1 hücre (2⁰)', '0 değişken elenir', '4 literal', "A'BC'D"],
            ['2 hücre (2¹)', '1 değişken elenir', '3 literal', "A'BC'"],
            ['4 hücre (2²)', '2 değişken elenir', '2 literal', "B'D'"],
            ['8 hücre (2³)', '3 değişken elenir', '1 literal', "C'"],
            ['16 hücre (2⁴)', '4 değişken elenir', '0 literal (Sabit 1)', '1'],
          ],
        },
      ],
      examTip:
        'Gruplama yaparken bir hücreyi birden fazla gruba dahil etmek (overlapping) kesinlikle serbesttir ve çoğu zaman diğer grupları 2\'liden 4\'lüye veya 4\'lüden 8\'liye büyütmek için gereklidir!',
    },
    {
      id: 'w5-s3',
      title: '3. Prime Implicant (PI) ve Essential Prime Implicant (EPI) Ayrımı',
      explanation:
        'Sınavlarda en çok karıştırılan iki terim Prime Implicant (PI) ve Essential Prime Implicant (EPI)\'tır:\n• Prime Implicant (PI): K-Map üzerinde daha büyük başka bir geçerli 2ⁿ grubunun içine tam olarak sığmayan (maksimum genişletilmiş) herhangi bir geçerli gruptur.\n• Essential Prime Implicant (EPI): İçindeki en az bir tane "1" hücresini K-Map üzerindeki diğer hiçbir PI\'ın kapsamadığı, dolayısıyla nihai çözümde BULUNMASI ZORUNLU olan Prime Implicant\'tır.\n\nÇözüm Stratejisi (Mano): Önce tüm EPI\'ları seçin. Ardından hâlâ açıkta kalan "1" hücresi varsa, onları örtecek en az sayıda ek PI seçin.',
      diagrams: [
        {
          kind: 'steps',
          caption: 'PI ve EPI Tespit Etme Algoritması',
          steps: [
            {
              label: 'Adım 1: Tüm Maksimal Grupları (PI) Bul',
              badge: 'Prime Implicants',
              detail: 'Her 1 hücresinin genişleyebileceği tüm en büyük 2ⁿ dikdörtgenleri listele. Alt küme olan küçük grupları ele.',
            },
            {
              label: 'Adım 2: Tek Başına Kapsanan 1\'leri Ara',
              badge: 'Essential Check',
              detail: 'Yalnızca tek bir PI tarafından örtülen bir 1 hücresi varsa, o PI mutlaka bir EPI dir ve kesin seçilir.',
            },
            {
              label: 'Adım 3: Kalan 1\'leri En Az PI ile Ört',
              badge: 'Minimum Cover',
              detail: 'EPI\'lar seçildikten sonra açıkta kalan 1\'ler varsa, birden fazla seçenek arasından en az sayıda ek PI ekle.',
            },
          ],
        },
      ],
      examTip:
        'Bir K-Map sorusunda birden fazla doğru minimum SOP sonucu çıkabiliyorsa bunun nedeni, EPI\'lar dışında kalan hücrelerin farklı PI kombinasyonlarıyla örtülebilmesidir. Ancak EPI\'lar her doğru çözümde mutlaka yer alır!',
    },
    {
      id: 'w5-s4',
      title: '4. K-Map ile POS (Product of Sums) Sadeleştirme Tekniği',
      explanation:
        'Bazı fonksiyonların POS (çarpımların toplamı) formu SOP formundan çok daha az kapı gerektirir. K-Map üzerinden doğrudan POS elde etmenin en hatasız yolu:\n1. Haritadaki "1"ler yerine "0" hücrelerini (F\' fonksiyonunu) gruplayın.\n2. Bu "0" gruplarından elde edilen sadeleştirilmiş ifadeyi F\' = (...) + (...) şeklinde SOP olarak yazın.\n3. İki tarafa DeMorgan yasası uygulayarak (F\')\' = F ifadesini POS biçiminde elde edin.',
      diagrams: [
        {
          kind: 'steps',
          caption: 'K-Map Üzerinden 3 Adımda POS Türetme Örneği',
          steps: [
            {
              label: 'Adım 1: 0\'ları Grupla (F\' İçin SOP)',
              badge: "0 Hücreleri",
              detail: "Örnek haritada 0'ları gruplayarak\nF' = AB + BD' + CD elde edildi.",
            },
            {
              label: 'Adım 2: Tümleyeni Al (DeMorgan)',
              badge: "(F')' = F",
              detail: "F = (AB + BD' + CD)'\n= (AB)' · (BD')' · (CD)'",
            },
            {
              label: 'Adım 3: Parantezleri Aç (Minimum POS)',
              badge: 'POS Çıktısı',
              detail: "F = (A' + B')(B' + D)(C' + D')\n(Toplam 3 OR + 1 AND kapısı)",
            },
          ],
        },
      ],
      examTip:
        'Eğer bir K-Map\'te "0" sayısı "1" sayısından azsa veya 0\'lar büyük 4\'lü/8\'li bloklar oluşturuyorsa POS formu SOP formundan daha ekonomik olur.',
    },
  ],
  questions: [
    {
      id: 'w5-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · 4 Değişkenli K-Map Sadeleştirme (Mano 3.5)',
      difficulty: 'Orta',
      prompt:
        'F(A, B, C, D) = Σ(0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14) fonksiyonunun K-Map ile elde edilen en sade SOP ifadesi aşağıdakilerden hangisidir?',
      options: [
        "F = C' + A'D' + BD'",
        "F = C' + B'D' + AD'",
        "F = C + A'D + BD'",
        "F = C' + A'D' + B'D",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Mintermleri 4x4 K-Map\'e Yerleştir',
          detail:
            'CD=00 ve CD=01 sütunlarındaki tüm 8 hücre (0, 1, 4, 5, 12, 13, 8, 9) = 1. Ayrıca CD=10 sütununda 2, 6, 14 = 1.',
        },
        {
          title: 'Adım 2: En Büyük Grupları (EPI) Oluştur',
          detail:
            "• 8'li Grup {0,1,4,5,8,9,12,13}: İlk iki sütun tamamen 1 ⇒ C'\n• 4'lü Wrap-Around Grup {0,2,4,6}: Üst iki satırın sol-sağ kenarları ⇒ A'D'\n• 4'lü Grup {4,6,12,14}: Orta iki satırın sol-sağ kenarları ⇒ BD'",
        },
        {
          title: 'Adım 3: Minimum SOP Denklemi',
          detail: "F = C' + A'D' + BD' (Tüm 11 minterm en az literal ile kapsandı).",
        },
      ],
    },
    {
      id: 'w5-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · Prime Implicant (PI) ve EPI Sayısı (Dr. Dhiman)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'F(A, B, C, D) = Σ(0, 2, 3, 5, 7, 8, 9, 10, 11, 13, 15) Boole fonksiyonunda kaç adet Essential Prime Implicant (EPI) bulunur ve bunlar hangileridir?',
      options: [
        "2 adet EPI bulunur: BD ve B'D'",
        "3 adet EPI bulunur: BD, B'D' ve AB'",
        "4 adet EPI bulunur: BD, B'D', CD ve AD",
        "1 adet EPI bulunur: Yalnızca BD",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Haritadaki Tüm 6 Prime Implicant\'ı (PI) Belirle',
          detail:
            "1) BD = {5, 7, 13, 15} | 2) B'D' = {0, 2, 8, 10} (4 köşe) | 3) AB' = {8, 9, 10, 11} | 4) B'C = {2, 3, 10, 11} | 5) CD = {3, 7, 11, 15} | 6) AD = {9, 11, 13, 15}",
        },
        {
          title: 'Adım 2: Tek Başına Kapsanan Mintermleri Kontrol Et',
          detail:
            "• m₅ (0101) hücresini YALNIZCA BD kapsar ⇒ BD bir EPI'dır.\n• m₀ (0000) hücresini YALNIZCA B'D' kapsar ⇒ B'D' bir EPI'dır.\n• Diğer tüm 1'ler (2, 3, 7, 8, 9, 10, 11, 13, 15) en az iki farklı PI içinde yer alır.",
        },
        {
          title: 'Adım 3: Sonuç',
          detail: "Toplam 6 PI içinden yalnızca 2 tanesi (BD ve B'D') Essential Prime Implicant (EPI)'tır.",
        },
      ],
    },
    {
      id: 'w5-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · K-Map Üzerinden Minimum POS Elde Etme (Mano 3.12)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'F(A, B, C, D) = Σ(0, 1, 2, 5, 8, 9, 10) fonksiyonunun K-Map üzerindeki 0\'lar gruplanarak bulunan en sade POS (Product of Sums) ifadesi nedir?',
      options: [
        "F = (A' + B')(B' + D)(C' + D')",
        "F = (A + B)(B + D')(C + D)",
        "F = (A' + B)(B' + D')(C + D')",
        "F = (A' + B')(B + D)(C' + D)",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: "Adım 1: Haritadaki 0 Hücrelerini (F') Belirle",
          detail: "F = 0 olan indeksler: {3, 4, 6, 7, 11, 12, 13, 14, 15}",
        },
        {
          title: "Adım 2: 0'ları Gruplayarak F' İçin Minimum SOP Bul",
          detail:
            "• {12, 13, 14, 15} ⇒ AB\n• {4, 6, 12, 14} (sol-sağ kenarlar) ⇒ BD'\n• {3, 7, 11, 15} (CD=11 sütunu) ⇒ CD\n⇒ F' = AB + BD' + CD",
        },
        {
          title: 'Adım 3: DeMorgan ile F\'i POS Biçimine Çevir',
          detail: "F = (F')' = (AB + BD' + CD)' = (A' + B')(B' + D)(C' + D')",
        },
      ],
    },
    {
      id: 'w5-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · 3 Değişkenli K-Map Köşe Birleşimi (Wrap-Around)',
      difficulty: 'Temel',
      prompt:
        '3 değişkenli F(x, y, z) = Σ(0, 2, 4, 6) fonksiyonunun K-Map sadeleştirmesi sonucu aşağıdakilerden hangisidir?',
      options: ["F = z'", 'F = z', "F = y'", "F = x'z'"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: K-Map Üzerindeki Konumları İncele',
          detail:
            'yz = 00 sütununda m₀ ve m₄ (sol kenar), yz = 10 sütununda m₂ ve m₆ (sağ kenar) hücreleri 1 dir.',
        },
        {
          title: 'Adım 2: Sağ-Sol Kenar Wrap-Around Gruplaması',
          detail:
            "Bu 4 hücre silindirik olarak birleşerek 4'lü bir grup oluşturur. Hem x (0→1) hem y (0→1) değişirken yalnızca z = 0 sabit kalır ⇒ F = z'.",
        },
      ],
    },
    {
      id: 'w5-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · Gereksiz (Redundant) Grup Tuzağı',
      difficulty: 'Orta',
      prompt:
        'K-Map üzerinde tüm 1 hücreleri başka zorunlu gruplar tarafından halihazırda kapsanmış 4\'lü bir grubu nihai SOP denklemine eklemek devreyi nasıl etkiler?',
      options: [
        'Doğruluk tablosunu değiştirmez, ancak fazladan bir Consensus terimi ekleyerek kapı ve literal maliyetini artırır.',
        'Doğruluk tablosundaki bazı 0 çıkışlarını 1\'e dönüştürür.',
        'Devredeki propagation delay süresini yarıya düşürür.',
        'Essential Prime Implicant sayısını artırır.',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Mantıksal Eşdeğerlik Kontrolü',
          detail:
            'Kapsanan bir terim Boole cebrinde x + x = x özdeşliği gereği fonksiyonun çıkış değerini değiştirmez; ancak donanımda fazladan bir AND kapısı ve OR kapısına ekstra bir giriş pini maliyeti doğurur.',
        },
      ],
    },
    {
      id: 'w5-q6',
      type: 'interactive-table',
      title: 'Soru 6 · 4x4 K-Map Matrisi Doldurma ve Minimum Grup Analizi',
      difficulty: 'Orta',
      prompt:
        'F(A, B, C, D) = Σ(1, 3, 4, 5, 10, 11, 12, 13, 14, 15) fonksiyonunun K-Map matrisindeki boş hücreleri (0 veya 1 olarak tıklayarak) doldurun. (İpucu: 3. satır AB=11, 3. sütun CD=11 Gray sırasındadır!)',
      headers: ['AB \\ CD', '00', '01', '11', '10'],
      rows: [
        [
          { value: '00' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '01' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '11' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: '10' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
      ],
      solutionExplanation:
        "K-Map yerleşimi tamamlandığında 3 Essential Prime Implicant tüm 1'leri kapsar:\n• {1, 3} ⇒ A'B'D\n• {4, 5, 12, 13} ⇒ BC'\n• {10, 11, 14, 15} ⇒ AC\nMinimum SOP: F = A'B'D + BC' + AC (Dikkat: AB = {12,13,14,15} grubu artık gerekmez!).",
    },
    {
      id: 'w5-q7',
      type: 'simulator-build',
      title: 'Soru 7 · K-Map Sadeleştirme Sonrası Minimum Devre (Canlı Lab)',
      difficulty: 'Temel',
      prompt:
        'F(A, B, C) = Σ(2, 3, 6, 7) fonksiyonunu K-Map ile en sade haline indirgeyin ve simülatörde sıfır kapı / minimum bağlantı kullanarak devreyi kurup 8 satırlık doğruluk tablosuna karşı doğrulayın.',
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['AND', 'OR', 'NOT'],
      maxComponents: { AND: 0, OR: 0, NOT: 0 },
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: 'Minterm {2, 3, 6, 7} ikili olarak (010, 011, 110, 111) değerleridir. K-Map\'te 4\'lü bir grup oluşturarak A ve C elenir, F = B çıkar! Yani B anahtarını doğrudan F LED\'ine bağlamanız yeterlidir.',
      solutionDescription:
        'K-Map\'te {2, 3, 6, 7} grubunun sadeleşmiş sonucu F = B\'dir. Herhangi bir mantık kapısı kullanmadan B girişini doğrudan F çıkışına bağlamak en düşük maliyetli (0 kapılı) çözümdür.',
    },
  ],
};
