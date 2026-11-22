import type { WeekModule } from '../../types/curriculum';

export const week3: WeekModule = {
  id: 3,
  weekNumber: 3,
  englishTitle: 'Boolean Algebra & Logic Gates',
  turkishSubtitle: 'Huntington Aksiyomları, Dualite İlkesi, DeMorgan Yasaları ve Consensus Teoremi',
  summary:
    'İki değerli Boole cebirinin aksiyomatik temelini, Dualite ilkesini, DeMorgan teoreminin kapı seviyesinde uygulanışını, Consensus teoremiyle cebirsel sadeleştirmeyi ve fonksiyon tümleyeni (F\') almayı öğrenin.',
  learningObjectives: [
    'Huntington aksiyomlarını ve Dualite İlkesini (Principle of Duality) uygulamak',
    'DeMorgan yasaları ve baloncuk itme (bubble pushing) ile ifadeleri dönüştürmek',
    'Yutma (Absorption) ve Consensus Teoremi ile Boole ifadelerini minimum literale indirgemek',
    'Verilen bir F fonksiyonunun tümleyenini (F\') iki farklı yöntemle hızlıca türetmek',
  ],
  isPlaceholder: false,
  recommendedWidget: 'TruthTableBuilder',
  recommendedWidgetConfig: {
    variables: 3,
    initialMinterms: [1, 2, 4, 7],
  },
  visualSections: [
    {
      id: 'w3-s1',
      title: '1. Huntington Aksiyomları ve Dualite İlkesi (Principle of Duality)',
      explanation:
        'Boole cebiri, {0, 1} kümesi üzerinde tanımlı VE (·), VEYA (+) ve DEĞİL (\') operatörlerinden oluşur. Dualite İlkesine göre, geçerli herhangi bir Boole eşitliğinde "+" ile "·" operatörleri ve "0" ile "1" birim elemanları karşılıklı olarak yer değiştirilirse elde edilen yeni ifade de daima geçerlidir.',
      diagrams: [
        {
          kind: 'table',
          caption: 'Temel Boole Teoremleri ve Dual Çiftleri (Mano Tablo 2.1)',
          headers: ['Teorem / Yasa Adı', 'Birincil Form (a)', 'Dual Form (b)'],
          highlightColumn: 2,
          rows: [
            ['Birim Eleman (Identity)', 'x + 0 = x', 'x · 1 = x'],
            ['Sıfır / Yutan Eleman (Null)', 'x + 1 = 1', 'x · 0 = 0'],
            ['Tek Kuvvet (Idempotence)', 'x + x = x', 'x · x = x'],
            ['Tümleyen (Complement)', "x + x' = 1", "x · x' = 0"],
            ['Çift Tümleyen (Involution)', "(x')' = x", "(x')' = x"],
            ['Dağılma (Distributive)', 'x(y + z) = xy + xz', 'x + yz = (x + y)(x + z)'],
            ['Yutma (Absorption)', 'x + xy = x', 'x(x + y) = x'],
            ['Sadeleştirme', "x + x'y = x + y", "x(x' + y) = xy"],
          ],
        },
      ],
      examTip:
        'Sıradan cebirde geçerli olmayan x + yz = (x + y)(x + z) ikinci dağılma yasası, Boole sadeleştirme sorularının en güçlü silahıdır!',
    },
    {
      id: 'w3-s2',
      title: '2. DeMorgan Yasaları ve Baloncuk İtme (Bubble Pushing)',
      explanation:
        'Augustus DeMorgan tarafından formüle edilen iki temel yasa, tümleyen (NOT) operatörünü parantez içine dağıtırken operatörün türünü değiştirir:\n• 1. Yasa: (x + y)\' = x\' · y\'  (NOR kapısı = girişleri terslenmiş AND kapısı)\n• 2. Yasa: (x · y)\' = x\' + y\'  (NAND kapısı = girişleri terslenmiş OR kapısı)\n\nKapı diyagramlarında çıkış baloncuğunu (NOT) girişe doğru iterken kapının gövdesini AND ↔ OR arasında değiştirirseniz devrenin mantığı değişmez (Bubble Pushing).',
      diagrams: [
        {
          kind: 'steps',
          caption: 'DeMorgan Yasalarının Kapı Seviyesinde Görsel Eşdeğerliği',
          steps: [
            {
              label: "DeMorgan I: (x + y)' = x' · y'",
              badge: 'NOR ≡ Bubbled-AND',
              detail: 'OR çıkışındaki tümleyen baloncuğu girişlere itildiğinde kapı AND kapısına dönüşür ve her iki girişe baloncuk eklenir.',
            },
            {
              label: "DeMorgan II: (x · y)' = x' + y'",
              badge: 'NAND ≡ Bubbled-OR',
              detail: 'AND çıkışındaki tümleyen baloncuğu girişlere itildiğinde kapı OR kapısına dönüşür ve her iki girişe baloncuk eklenir.',
            },
            {
              label: 'Operatör Önceliği',
              badge: "() > ' > · > +",
              detail: 'Önce parantezler, sonra tümleyen (\'), ardından VE (·) ve en son VEYA (+) işlemi değerlendirilir.',
            },
          ],
        },
      ],
      examTip:
        'DeMorgan uygularken en sık yapılan hata tümleyenin parantez içindeki terimler arasında · ve + işaretini değiştirmeyi unutmaktır. Her zaman operatörü de çevirin!',
    },
    {
      id: 'w3-s3',
      title: '3. Cebirsel Sadeleştirme ve Consensus Teoremi',
      explanation:
        'Bir lojik devrede kapı maliyetini (literal ve terim sayısını) düşürmek için cebirsel sadeleştirme yapılır. Özellikle üç değişkenli ifadelerde saklı kalan fazlalık terimleri yakalamak için Consensus Teoremi kullanılır:\n\nSOP Consensus: xy + x\'z + yz = xy + x\'z\nPOS (Dual) Consensus: (x + y)(x\' + z)(y + z) = (x + y)(x\' + z)\n\nSezgisel Mantık (Dr. Dhiman): Bir terimde x, diğerinde x\' varsa; kalan kısımların çarpımı olan yz terimi (Consensus terimi) zaten diğer iki terim tarafından kapsanır. Çünkü x=1 ise xy=y, x=0 ise x\'z=z olur; y=1 ve z=1 olduğunda x ne olursa olsun ifadelerden biri mutlaka 1 olur!',
      diagrams: [
        {
          kind: 'steps',
          caption: 'Consensus Teoremi İspatı: xy + x\'z + yz = xy + x\'z',
          steps: [
            {
              label: 'Adım 1: (x + x\') = 1 Çarpanı Ekle',
              badge: 'Genişletme',
              detail: "xy + x'z + yz(x + x')\n= xy + x'z + xyz + x'yz",
            },
            {
              label: 'Adım 2: Ortak Paranteze Al',
              badge: 'Gruplama',
              detail: "xy(1 + z) + x'z(1 + y)",
            },
            {
              label: 'Adım 3: (1 + A = 1) Uygula',
              badge: 'Yutma',
              detail: "xy(1) + x'z(1) = xy + x'z\n(yz fazlalık terimi elendi!)",
            },
          ],
        },
      ],
      examTip:
        'Bir ifadede hem A hem A\' geçiyorsa, yanında A/A\' bulunmayan diğer terimin (Consensus) elenip elenemediğini mutlaka kontrol edin!',
    },
    {
      id: 'w3-s4',
      title: "4. Boole Fonksiyonunun Tümleyeni (F') Alma Teknikleri",
      explanation:
        "Herhangi bir F fonksiyonunun tümleyeni (F') iki yolla bulunabilir:\n1) Ardışıl DeMorgan Yöntemi: Tüm ifadeyi parantez içine alıp dışına (') koyarak DeMorgan kurallarını adım adım dağıtmak.\n2) Dualite + Literalleri Tersleme Kısayolu (Dr. Dhiman): Önce ifadenin Dualini al (+ ile · yer değiştir, varsa 0 ile 1 yer değiştir), ardından parantez önceliklerini koruyarak her bir literal değişkeni kendi tümleyeniyle değiştir (x ↔ x').",
      diagrams: [
        {
          kind: 'steps',
          caption: "Hızlı Yöntem Örneği: F = x(y'z' + yz) İfadesinin F' Tümleyeni",
          steps: [
            {
              label: 'Adım 1: Orijinal Fonksiyon',
              badge: 'F',
              detail: "F = x · (y'·z' + y·z)\nÖrtük · operatörlerine dikkat et!",
            },
            {
              label: 'Adım 2: Dualini Al (+ ↔ ·)',
              badge: 'F_dual',
              detail: "F_dual = x + (y' + z') · (y + z)",
            },
            {
              label: 'Adım 3: Literalleri Tersle',
              badge: "F'",
              detail: "F' = x' + (y + z)(y' + z')",
            },
          ],
        },
      ],
      examTip:
        'Dualite kısayolunu kullanırken gizli çarpım (·) noktalarını ve parantezleri kaybetmemek için önce tüm terimleri açıkça · ve () ile yazın.',
    },
  ],
  questions: [
    {
      id: 'w3-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · Temel Cebirsel Sadeleştirme (Mano 2.2)',
      difficulty: 'Temel',
      prompt: "F = x'y'z + x'yz + xy' Boole fonksiyonunun en sade hali aşağıdakilerden hangisidir?",
      options: ["x'z + xy'", "x'y + xz'", "x'z + x'y", "xz + x'y'"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: İlk İki Terimi Ortak Paranteze Al',
          detail: "F = x'z(y' + y) + xy'",
        },
        {
          title: "Adım 2: (y' + y) = 1 Özdeşliğini Uygula",
          detail: "F = x'z(1) + xy' = x'z + xy'",
        },
        {
          title: 'Adım 3: İleri Sadeleştirme Kontrolü',
          detail: "x'z ve xy' terimleri tek bir literal farkı taşımaz; dolayısıyla en sade SOP formu x'z + xy' olarak kalır.",
        },
      ],
    },
    {
      id: 'w3-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · Çok Adımlı Sadeleştirme ve Yutma (Mano 2.3)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        "F = A'C + A'B + AB'C + BC Boole fonksiyonunun en az literalli sadeleştirilmiş hali nedir?",
      options: ["A'B + C", "A'C + B", 'AB + C', "A'B + B'C"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: "Adım 1: A'C + AB'C İfadesini C Parantezinde Sadeleştir",
          detail: "A'C + AB'C = C(A' + AB') = C(A' + B') = A'C + B'C  [x' + xy = x' + y kuralı]",
        },
        {
          title: 'Adım 2: B\'C ile BC Terimlerini Birleştir',
          detail: "B'C + BC = C(B' + B) = C",
        },
        {
          title: 'Adım 3: Kalan Terimleri Toparla ve Yutma Uygula',
          detail: "F = A'C + A'B + C = C(A' + 1) + A'B = C + A'B = A'B + C",
        },
      ],
    },
    {
      id: 'w3-q3',
      type: 'multiple-choice',
      title: "Soru 3 · Fonksiyon Tümleyeni (F') Bulma (Mano 2.11)",
      difficulty: 'Orta',
      prompt: "F = (A + B')(C' + D) fonksiyonunun tümleyeni (F') aşağıdakilerden hangisidir?",
      options: ["A'B + CD'", "A'B' + C'D", "(A' + B)(C + D')", "AB' + C'D"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Yöntem 1: DeMorgan Yasası ile Dağıtım',
          detail: "F' = [(A + B') · (C' + D)]' = (A + B')' + (C' + D)' = A'B + CD'",
        },
        {
          title: 'Yöntem 2: Dualite + Literal Tersleme Kısayolu',
          detail: "Dual: (A·B') + (C'·D)  ⇒  Literalleri tersle: A'B + CD'",
        },
      ],
    },
    {
      id: 'w3-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · Dual Consensus Teoremi (Dr. Dhiman Proof)',
      difficulty: 'Orta',
      prompt:
        "(x + y)(x' + z)(y + z) çarpım ifadesi hangi teorem gereği (x + y)(x' + z) ifadesine eşittir?",
      options: [
        'Dual Consensus Teoremi',
        'Idempotence (Tek Kuvvet) Yasası',
        'Involution (Çift Tümleyen) Teoremi',
        'DeMorgan Birleşme Özelliği',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: SOP Consensus Teoreminin Dualini Yaz',
          detail:
            "SOP Consensus: xy + x'z + yz = xy + x'z\nDual (+ ↔ ·): (x + y)(x' + z)(y + z) = (x + y)(x' + z)",
        },
        {
          title: 'Adım 2: Sezgisel Doğrulama',
          detail:
            "y = 0 ve z = 0 olduğunda (y+z)=0 olur; fakat x=0 ise (x+y)=0, x=1 ise (x'+z)=0 olduğundan ilk iki çarpan zaten 0 üretir. Dolayısıyla (y+z) fazlalık (redundant) çarpandır.",
        },
      ],
    },
    {
      id: 'w3-q5',
      type: 'interactive-table',
      title: 'Soru 5 · Cebirsel İfadenin Doğruluk Tablosu',
      difficulty: 'Temel',
      prompt:
        "F(x, y, z) = x'y + xz' fonksiyonu için 8 satırlık doğruluk tablosundaki F çıkışlarını (0 veya 1 olarak tıklayarak) doldurun.",
      headers: ['x', 'y', 'z', "F = x'y + xz'"],
      rows: [
        [{ value: '0' }, { value: '0' }, { value: '0' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: '0' }, { value: '0' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: '0' }, { value: '1' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: '0' }, { value: '1' }, { value: '1' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: '1' }, { value: '0' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: '1' }, { value: '0' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: '1' }, { value: '1' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: '1' }, { value: '1' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
      ],
      solutionExplanation:
        "x = 0 iken F = y (satır 2 ve 3 → 1); x = 1 iken F = z' (satır 4 ve 6 → 1). Sonuç: [0, 0, 1, 1, 1, 0, 1, 0].",
    },
    {
      id: 'w3-q6',
      type: 'simulator-build',
      title: 'Soru 6 · Sadeleştir ve 2 Kapıyla Kur (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'F(A, B, C) = AB + A(B + C) + B(B + C) fonksiyonunu önce cebirsel olarak en sade biçimine (F = B + AC) indirgeyin. Ardından simülatörde YALNIZCA 1 adet AND ve 1 adet OR kapısı kullanarak devreyi kurup doğrulayın.',
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['AND', 'OR'],
      maxComponents: { AND: 1, OR: 1 },
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: 'A ve C girişlerini 1 adet AND kapısına bağlayıp (AC) üretin; ardından AND çıkışını ve B girişini 1 adet OR kapısına bağlayıp F LED\'ine iletin.',
      solutionDescription:
        'Cebirsel sadeleştirme: AB + AB + AC + BB + BC = AB + AC + B + BC = B(1 + A + C) + AC = B + AC. Bu sayede 5 kapılı devre yalnızca 1 AND + 1 OR ile gerçeklenir.',
    },
  ],
};
