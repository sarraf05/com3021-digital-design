import type { WeekModule } from '../../types/curriculum';

export const week10: WeekModule = {
  id: 10,
  weekNumber: 10,
  englishTitle: 'Combinational Logic III (Encoders, MUX/DEMUX, Three-State)',
  turkishSubtitle: 'Öncelikli Kodlayıcılar, Multiplexer ile Fonksiyon Sentezi, DEMUX ve Üç Durumlu Tamponlar',
  summary:
    'Decoder\'ın tersi olan Encoder ve çakışmaları çözen Priority Encoder tasarımını, MUX (Multiplexer) veri seçicileriyle Dr. Dhiman Tablo Yöntemi kullanarak Boole fonksiyonu sentezlemeyi, DEMUX özdeşliğini ve Three-State Buffer veri yolu paylaşımını öğrenin.',
  learningObjectives: [
    '4-to-2 Priority Encoder (D₃ > D₂ > D₁ > D₀) ve Valid (V) çıkış denklemlerini K-Map ile türetmek',
    'Dr. Dhiman MUX Tablo Yöntemini kullanarak n değişkenli fonksiyonları 2ⁿ⁻¹×1 MUX ile gerçekleştirmek',
    'Verilen bir MUX devresinden geriye doğru kanonik minterm toplamını (Σm) okumak',
    'Enable pinli Decoder ↔ DEMUX özdeşliğini ve Three-State Bus Contention riskini açıklamak',
  ],
  isPlaceholder: false,
  recommendedWidget: 'TruthTableBuilder',
  recommendedWidgetConfig: {
    variables: 4,
    initialMinterms: [1, 3, 4, 11, 12, 13, 14, 15],
  },
  visualSections: [
    {
      id: 'w10-s1',
      title: '1. Kodlayıcılar (Encoders) ve Öncelikli Kodlayıcılar (Priority Encoders)',
      explanation:
        'Encoder, Decoder\'ın tam tersi işlemi yapar: 2ⁿ giriş hattından hangisinin "1" olduğunu n-bitlik ikili koda dönüştürür. Ancak standart Encoder aynı anda birden fazla giriş "1" olduğunda belirsiz/hatalı kod üretir ve "hiçbir giriş 1 değil" (0000) durumuyla "D₀ = 1" (0001) durumunu ayırt edemez.\n\nÇözüm — 4-to-2 Priority Encoder (D₃ > D₂ > D₁ > D₀): En yüksek indekse öncelik verilir ve "en az bir giriş aktif" olduğunu bildiren Valid (V) çıkışı eklenir:\n• x = D₂ + D₃\n• y = D₃ + D₁D₂\'\n• V = D₀ + D₁ + D₂ + D₃',
      diagrams: [
        {
          kind: 'table',
          caption: '4-to-2 Priority Encoder Doğruluk Tablosu (X = Don\'t Care)',
          headers: ['D₃', 'D₂', 'D₁', 'D₀', 'x (MSB)', 'y (LSB)', 'V (Valid)'],
          highlightColumn: 6,
          rows: [
            ['0', '0', '0', '0', 'X', 'X', '0 (Geçersiz)'],
            ['0', '0', '0', '1', '0', '0', '1 (D₀ aktif)'],
            ['0', '0', '1', 'X', '0', '1', '1 (D₁ öncelikli)'],
            ['0', '1', 'X', 'X', '1', '0', '1 (D₂ öncelikli)'],
            ['1', 'X', 'X', 'X', '1', '1', '1 (D₃ en yüksek)'],
          ],
        },
      ],
      examTip:
        'Priority Encoder doğruluk tablosunda V = 0 iken x ve y çıkışları Don\'t-Care (X) kabul edilir; bu sayede K-Map sadeleştirmesinde x ve y ifadeleri çok daha küçük çıkar!',
    },
    {
      id: 'w10-s2',
      title: "2. Multiplexer (MUX), DEMUX ve Dr. Dhiman'ın MUX Tablo Yöntemi",
      explanation:
        'Multiplexer (MUX — Veri Seçici), 2ⁿ veri girişinden birini n adet seçme (Select) hattının değerine göre tek bir çıkış hattına yönlendirir. Ayrıca herhangi bir n değişkenli Boole fonksiyonunu 2ⁿ⁻¹ × 1 MUX kullanarak ek kapı (yalnızca tek değişken tersi gerekirse NOT) ile gerçekleştirebiliriz.\n\nDr. Dhiman MUX Uygulama Tablosu (Örn. F(A, B, C, D) için 8×1 MUX, S₂S₁S₀ = A B C):\n• 8 giriş (I₀..I₇) sütun başlığı olarak yazılır.\n• Üst satıra son değişkenin tümleyeni (D\': çift mintermler 0,2,4,6,8,10,12,14), alt satıra kendisi (D: tek mintermler 1,3,5,7,9,11,13,15) yerleştirilir.\n• Fonksiyonda bulunan mintermler daire içine alınır ve her sütun kuralına göre okunur: İkisi de boş ⇒ 0 | İkisi de dolu ⇒ 1 | Yalnız üst dolu ⇒ D\' | Yalnız alt dolu ⇒ D.',
      diagrams: [
        {
          kind: 'table',
          caption: 'Dr. Dhiman 8×1 MUX Eşleştirme Örneği: F(A,B,C,D) = Σ(1, 3, 4, 11, 12, 13, 14, 15)',
          headers: ['Sütun (ABC)', 'I₀ (000)', 'I₁ (001)', 'I₂ (010)', 'I₃ (011)', 'I₄ (100)', 'I₅ (101)', 'I₆ (110)', 'I₇ (111)'],
          rows: [
            ["D' (Çift m)", '0', '2', '[4] ★', '6', '8', '10', '[12] ★', '[14] ★'],
            ['D (Tek m)', '[1] ★', '[3] ★', '5', '7', '9', '[11] ★', '[13] ★', '[15] ★'],
            ['MUX Girişi', 'D', 'D', "D'", '0', '0', 'D', '1', '1'],
          ],
        },
        {
          kind: 'steps',
          caption: 'DEMUX ve Decoder Yapısal Özdeşliği',
          steps: [
            {
              label: '1-to-2ⁿ DEMUX İşlevi',
              badge: 'Tek → Çoklu',
              detail: 'Tek bir Data girişini seçme (Select) bitlerinin gösterdiği 2ⁿ çıkıştan yalnızca birine aktarır.',
            },
            {
              label: 'Enable Pinli Decoder',
              badge: 'E ≡ Data',
              detail: 'Enable girişli bir n-to-2ⁿ Decoder\'ın Enable pini Data girişi olarak kullanıldığında devre birebir 1-to-2ⁿ DEMUX gibi çalışır!',
            },
            {
              label: 'Büyük MUX Ağaçları',
              badge: '2× 4x1 + 2x1',
              detail: 'İki adet 4×1 MUX (seçiciler S₁, S₀) çıkışları bir adet 2×1 MUX\'a (seçici S₂) bağlanarak 8×1 MUX elde edilir.',
            },
          ],
        },
      ],
      widget: 'TruthTableBuilder',
      widgetConfig: {
        variables: 4,
        initialMinterms: [1, 3, 4, 11, 12, 13, 14, 15],
      },
      examTip:
        'Eğer seçme uçlarına en yüksek bitler (A, B, C) değil de örneğin (B, C, D) bağlanırsa tablonun satırları A\' ve A olarak değişir (A\' = 0..7, A = 8..15)! Her zaman hangi değişkenin seçici olmadığına dikkat edin.',
    },
    {
      id: 'w10-s3',
      title: '3. Üç Durumlu Kapılar (Three-State Buffers) ve Ortak Veri Yolu (Shared Bus)',
      explanation:
        'Standart lojik kapılar yalnızca 0 veya 1 çıkışı verir. Oysa bilgisayar mimarisinde onlarca kaydedici aynı 32-bit veya 64-bit veri yolunu (Bus) paylaşmak zorundadır. Three-State (Tri-State) Buffer, normal 0 ve 1 lojik durumlarına ek olarak üçüncü bir duruma sahiptir:\n• Control (Enable) = 1: Giriş doğrudan çıkışa aktarılır (0 veya 1).\n• Control (Enable) = 0: Çıkış elektriksel olarak devreden tamamen kopar (High-Impedance / Hi-Z, açık devre).\n\nBus Contention (Veri Yolu Çakışması): Ortak bir hatta bağlı iki Three-State tamponun kontrol hatları aynı anda aktif edilir ve biri 1 (VCC), diğeri 0 (GND) sürerse doğrudan kısa devre oluşur! Bu yüzden kontrol hatları mutlaka bir Decoder çıkışından (karşılıklı dışlayıcı) sürülmelidir.',
      diagrams: [
        {
          kind: 'table',
          caption: 'Three-State Buffer Çalışma Tablosu',
          headers: ['Control (C)', 'Veri Girişi (A)', 'Çıkış (Y)', 'Fiziksel Durum'],
          highlightColumn: 2,
          rows: [
            ['0', '0 veya 1', 'Hi-Z (Yüksek Empedans)', 'Açık devre; hatta yük bindirmez'],
            ['1', '0', '0 (LOW)', 'Hattı GND\'ye çeker'],
            ['1', '1', '1 (HIGH)', 'Hattı VCC\'ye sürer'],
          ],
        },
      ],
      examTip:
        'Three-State çıkışlar hiçbir zaman bir Boole doğruluk tablosundaki "0" veya "1" ile aynı değildir; "Hi-Z" elektriksel izolasyon anlamına gelir ve ortak veri yolu (Bus) paylaşımında MUX kullanımına alternatif oluşturur.',
    },
  ],
  questions: [
    {
      id: 'w10-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · Priority Encoder Çıkış Analizi (Mano 4.24)',
      difficulty: 'Temel',
      prompt:
        'D₃\'ün en yüksek, D₀\'ın en düşük önceliğe sahip olduğu bir 4-to-2 Priority Encoder devresine D₃D₂D₁D₀ = 0111 girişi uygulandığında (x, y, V) çıkışları ne olur?',
      options: ['x = 1, y = 0, V = 1', 'x = 1, y = 1, V = 1', 'x = 0, y = 1, V = 1', 'x = 0, y = 0, V = 0'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Aktif En Yüksek Öncelikli Girişi Bul',
          detail: 'D₃ = 0, D₂ = 1, D₁ = 1, D₀ = 1. En yüksek aktif giriş D₂ (indeks 2) olduğundan D₁ ve D₀ göz ardı edilir.',
        },
        {
          title: 'Adım 2: İkili Kodu ve Valid Bitini Yaz',
          detail: '2₁₀ = (10)₂ ⇒ x = 1, y = 0. En az bir giriş aktif olduğu için V = 1.',
        },
      ],
    },
    {
      id: 'w10-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · 8×1 MUX ile 4-Değişkenli Fonksiyon Sentezi (Mano 4.28)',
      difficulty: 'Orta',
      prompt:
        'Seçme girişleri S₂ = A, S₁ = B, S₀ = C olan bir 8×1 MUX ile F(A, B, C, D) = Σ(1, 3, 4, 11, 12, 13, 14, 15) fonksiyonunu gerçeklemek için (I₀, I₁, I₂, I₃, I₄, I₅, I₆, I₇) veri girişlerine sırasıyla neler bağlanmalıdır?',
      options: [
        "D, D, D', 0, 0, D, 1, 1",
        "D', D', D, 0, 0, D, 1, 1",
        "D, D, D', 1, 0, D', 1, 0",
        "0, 1, D', D, 0, D, 1, 1",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Dr. Dhiman Eşleştirme Tablosunu Çiftlere Ayır',
          detail:
            "I₀(0,1): 1 var ⇒ D | I₁(2,3): 3 var ⇒ D | I₂(4,5): 4 var ⇒ D' | I₃(6,7): yok ⇒ 0",
        },
        {
          title: 'Adım 2: Üst Yarı (I₄..I₇) Eşleştirmesi',
          detail:
            'I₄(8,9): yok ⇒ 0 | I₅(10,11): 11 var ⇒ D | I₆(12,13): ikisi de var ⇒ 1 | I₇(14,15): ikisi de var ⇒ 1.',
        },
        {
          title: 'Adım 3: Sıralı Giriş Dizilimi',
          detail: "(I₀..I₇) = (D, D, D', 0, 0, D, 1, 1).",
        },
      ],
    },
    {
      id: 'w10-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · MUX Devresinden Minterm Okuma (Dr. Dhiman Reverse MUX)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        "Seçme girişleri S₁ = A, S₀ = B ve veri girişleri I₀ = C', I₁ = 0, I₂ = C, I₃ = 1 olan bir 4×1 MUX çıkışının kanonik minterm toplamı (Σm) aşağıdakilerden hangisidir?",
      options: [
        'Σm(0, 5, 6, 7)',
        'Σm(1, 4, 6, 7)',
        'Σm(0, 2, 5, 7)',
        'Σm(0, 4, 5, 6)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Her Bir Veri Girişinin Temsil Ettiği Minterm Çiftini Yaz',
          detail:
            "• I₀ (AB=00 → m₀, m₁) = C' ⇒ C=0 olan m₀ (000) seçilir.\n• I₁ (AB=01 → m₂, m₃) = 0 ⇒ hiçbiri seçilmez.\n• I₂ (AB=10 → m₄, m₅) = C ⇒ C=1 olan m₅ (101) seçilir.\n• I₃ (AB=11 → m₆, m₇) = 1 ⇒ ikisi de m₆, m₇ seçilir.",
        },
        {
          title: 'Adım 2: Mintermleri Birleştir',
          detail: 'F(A, B, C) = Σm(0, 5, 6, 7).',
        },
      ],
    },
    {
      id: 'w10-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · DEMUX ve Decoder Yapısal Özdeşliği',
      difficulty: 'Temel',
      prompt:
        'Enable girişine sahip bir 3-to-8 Decoder devresi hangi pin eşleştirmesiyle doğrudan 1-to-8 Demultiplexer (DEMUX) olarak çalışır?',
      options: [
        "Decoder'ın Enable girişi DEMUX'un Veri (Data) girişi, Decoder'ın 3 girişi ise DEMUX'un Seçme (Select) hatları olarak kullanıldığında",
        "Decoder'ın 8 çıkışı kısa devre edilip Data girişi yapıldığında",
        "Decoder'ın girişlerinden biri sabit 0 yapıldığında",
        'İki adet 3-to-8 Decoder paralel bağlandığında',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Sinyal Akışını İncele',
          detail:
            'Enable = Data verildiğinde, Select hatlarının seçtiği çıkış pini doğrudan Data sinyalinin değerini (0 veya 1) dışarı aktarır; diğer 7 çıkış ise pasif kalır.',
        },
      ],
    },
    {
      id: 'w10-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · Three-State Bus Contention (Veri Yolu Çakışması)',
      difficulty: 'Temel',
      prompt:
        'Ortak bir veri yoluna (bus) bağlı iki aktif-1 Three-State tamponun (buffer) Enable uçları aynı anda 1 yapılır ve biri hatta 1, diğeri 0 sürerse ne meydana gelir?',
      options: [
        'Bus Contention (elektriksel kısa devre çakışması) oluşur; bunu önlemek için Enable hatları Decoder ile karşılıklı dışlayıcı sürülmelidir.',
        'Hattın gerilimi otomatik olarak High-Z durumuna geçer.',
        'İki verinin OR toplamı hatta iletilir.',
        'İki verinin XOR sonucu hatta iletilir.',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Elektriksel Analiz',
          detail:
            'Bir tampon hattı VCC\'ye (1), diğeri GND\'ye (0) çekmeye çalışınca doğrudan VCC–GND kısa devresi (Bus Contention) oluşur ve yonga zarar görebilir. Bu yüzden ortak bus kontrolünde daima 2-to-4 / 3-to-8 Decoder kullanılır.',
        },
      ],
    },
    {
      id: 'w10-q6',
      type: 'interactive-table',
      title: 'Soru 6 · 4×1 MUX Uygulama Tablosu Doldurma',
      difficulty: 'Orta',
      prompt:
        "Seçme uçları S₁ = A, S₀ = B olan bir 4×1 MUX ile F(A, B, C) = Σ(0, 2, 5, 7) fonksiyonunu gerçeklemek için I₀, I₁, I₂, I₃ veri girişlerinin alacağı değerleri (0, 1, C veya C' olarak) yazın.",
      headers: ['MUX Girişi', 'Seçim (A B)', 'Kapsanan Mintermler', "Bağlanacak Değer (0 / 1 / C / C')"],
      rows: [
        [
          { value: 'I₀' },
          { value: '0 0' },
          { value: 'm₀ (1), m₁ (0)' },
          { value: '', editable: true, expected: "C'", placeholder: "0/1/C/C'" },
        ],
        [
          { value: 'I₁' },
          { value: '0 1' },
          { value: 'm₂ (1), m₃ (0)' },
          { value: '', editable: true, expected: "C'", placeholder: "0/1/C/C'" },
        ],
        [
          { value: 'I₂' },
          { value: '1 0' },
          { value: 'm₄ (0), m₅ (1)' },
          { value: '', editable: true, expected: 'C', placeholder: "0/1/C/C'" },
        ],
        [
          { value: 'I₃' },
          { value: '1 1' },
          { value: 'm₆ (0), m₇ (1)' },
          { value: '', editable: true, expected: 'C', placeholder: "0/1/C/C'" },
        ],
      ],
      solutionExplanation:
        "I₀ için yalnızca C=0 (m₀) aktif olduğundan C'; I₁ için yalnızca C=0 (m₂) aktif olduğundan C'; I₂ ve I₃ için ise yalnızca C=1 durumları (m₅ ve m₇) aktif olduğundan C bağlanır.",
    },
    {
      id: 'w10-q7',
      type: 'simulator-build',
      title: 'Soru 7 · 4×1 MUX ile 3-Bit Odd Parity Gerçekleme (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'Simülatörde yerleşik "4x1 MUX" bileşenini ve gerekirse "NOT" kapısını kullanarak F(A, B, C) = Σ(1, 2, 4, 7) (3-bit Odd Parity) fonksiyonunu S₁ = A, S₀ = B seçme girişleriyle kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.',
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['MUX_4X1', 'NOT'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: "A'yı S1 pinine, B'yi S0 pinine bağlayın. C'yi NOT kapısından geçirerek C' üretin. Tablo eşleştirmesiyle: I0 = C, I1 = C', I2 = C', I3 = C bağlayıp Y çıkışını F LED'ine iletin!",
      solutionDescription:
        "S₁=A, S₀=B seçildiğinde Σ(1, 2, 4, 7) mintermleri için I₀ = C (m₁), I₁ = C' (m₂), I₂ = C' (m₄) ve I₃ = C (m₇) elde edilir. Tek bir 4×1 MUX ve tek bir NOT kapısı tüm fonksiyonu gerçekler.",
    },
  ],
};
