import type { WeekModule } from '../../types/curriculum';

export const week2: WeekModule = {
  id: 2,
  weekNumber: 2,
  englishTitle: 'Number Complements & Binary Codes',
  turkishSubtitle: 'Sayı Tümleyenleri, İşaretli Sayılar, Overflow ve İkili Kodlar (BCD, Gray, Excess-3)',
  summary:
    'Bilgisayarların çıkarma işlemini nasıl toplama devreleriyle gerçekleştirdiğini (r\'s ve (r-1)\'s Complement), işaretli sayılarda taşma (Overflow) analizini ve BCD, Gray Code, Excess-3, ASCII ikili kodlarını derinlemesine öğrenin.',
  learningObjectives: [
    '1\'s, 2\'s, 9\'s ve 10\'s Complement hesaplamalarını hızlı ve hatasız gerçekleştirmek',
    'M - N çıkarma işlemini ödünç (borrow) almadan tümleyen toplamasıyla yapmak',
    'Signed-Magnitude, 1\'s ve 2\'s Complement gösterim aralıklarını ve Overflow (V) koşulunu analiz etmek',
    'BCD (8421), Excess-3 ve Gray Code dönüşümlerini kavramak ve Binary-to-Gray devresi kurmak',
  ],
  isPlaceholder: false,
  recommendedWidget: 'BaseComplementVisualizer',
  recommendedWidgetConfig: {
    defaultMode: 'complement',
  },
  visualSections: [
    {
      id: 'w2-s1',
      title: "1. Taban Tümleyenleri: r's Complement ve (r-1)'s Complement",
      explanation:
        'Sayısal sistemlerde çıkarma işlemini basitleştirmek ve negatif sayıları temsil etmek için iki tür tümleyen (Complement) kullanılır: Azaltılmış Taban Tümleyeni [(r-1)\'s Complement: İkilide 1\'s, onlukta 9\'s] ve Taban Tümleyeni [r\'s Complement: İkilide 2\'s, onlukta 10\'s].\n\nDr. Dhiman Altın Kuralı (2\'s Complement Kısayolu): Uzun uzun tüm bitleri tersleyip +1 eklemek yerine, sayının en sağından (LSB) başlayarak sola doğru ilerleyin; ilk "1" bitini görene kadar tüm 0\'ları ve o ilk "1" bitini aynen yazın, ilk "1"den sonraki tüm sol bitleri tersleyin (0 ↔ 1).',
      keyPoints: [
        "(r-1)'s Complement Formülü: n basamaklı N sayısı için (rⁿ - 1) - N (Onlukta her rakamı 9'dan çıkar; İkilide tüm bitleri tersle).",
        "r's Complement Formülü: [(r-1)'s Complement] + 1 = rⁿ - N (N ≠ 0 ise).",
        'Örnek (Dr. Dhiman Kuralı): 01011000 → Sağdaki "1000" aynen kalır, soldaki "0101" terslenir → 10101000.',
      ],
      widget: 'BaseComplementVisualizer',
      widgetConfig: {
        defaultMode: 'complement',
      },
      examTip:
        'Bir sayının 2\'s Complement\'inin tekrar 2\'s Complement\'i alınırsa sayının kendisi elde edilir: (N\'\') = N. Bu özelliği sınavda sağlama yapmak için kullanın.',
    },
    {
      id: 'w2-s2',
      title: '2. Tümleyenlerle Çıkarma (M - N), İşaretli Sayılar ve Overflow',
      explanation:
        'İki n-basamaklı işaretsiz sayının r\'s tümleyen ile çıkarılması (M - N = M + (rⁿ - N)) tek bir donanım toplayıcısı ile çözülür:\n• Eğer toplam sonunda bir Elde (End Carry) oluşursa: M ≥ N demektir; oluşan elde atılır ve kalan sonuç doğrudan pozitif cevaptır.\n• Eğer toplam sonunda Elde oluşmazsa: M < N demektir; sonuç negatiftir ve gerçek değeri bulmak için elde edilen toplamın tekrar r\'s tümleyeni alınıp başına "-" işareti konur.\n\nİşaretli sayılarda (Signed Numbers) en sol bit işaret bitidir (0 = pozitif, 1 = negatif). İki aynı işaretli sayı toplandığında işaret bitine giren elde (C_in) ile işaret bitinden çıkan elde (C_out) farklıysa Overflow (Taşma) gerçekleşir: V = C_in ⊕ C_out.',
      diagrams: [
        {
          kind: 'steps',
          caption: 'r\'s Complement ile Çıkarma (M - N) Karar Akışı',
          steps: [
            {
              label: 'Adım 1: N\'in r\'s Tümleyenini Topla',
              badge: 'M + N\'',
              detail: 'M ve N sayılarının basamak sayısını eşitle (başa 0 ekle), ardından M ile N\'in r\'s tümleyenini topla.',
            },
            {
              label: 'Durum A: Elde (Carry) = 1 ise',
              badge: 'M ≥ N',
              detail: 'En soldan taşan 1 eldesini AT (discard). Kalan n basamak doğrudan (+) sonuçtur.',
            },
            {
              label: 'Durum B: Elde (Carry) = 0 ise',
              badge: 'M < N',
              detail: 'Sonuç negatiftir! Elde edilen toplamın tekrar r\'s tümleyenini al ve başına (-) işareti koy.',
            },
          ],
        },
        {
          kind: 'table',
          caption: 'n-Bit İşaretli Sayı Gösterim Aralıkları (Örnek: n = 8 bit)',
          headers: ['Gösterim Yöntemi', 'Genel Aralık Formülü', '8-Bit Aralık', 'Sıfırın Temsili'],
          highlightColumn: 2,
          rows: [
            ['Signed-Magnitude', '-(2ⁿ⁻¹ - 1) … +(2ⁿ⁻¹ - 1)', '-127 … +127', 'Çift Sıfır (+0 ve -0)'],
            ["1's Complement", '-(2ⁿ⁻¹ - 1) … +(2ⁿ⁻¹ - 1)', '-127 … +127', 'Çift Sıfır (00000000 ve 11111111)'],
            ["2's Complement", '-2ⁿ⁻¹ … +(2ⁿ⁻¹ - 1)', '-128 … +127', 'Tek Sıfır (00000000)'],
          ],
        },
      ],
      examTip:
        'Overflow (Taşma) yalnızca aynı işaretli iki sayı toplandığında (Pozitif + Pozitif veya Negatif + Negatif) meydana gelebilir. Zıt işaretli iki sayının toplamında asla Overflow oluşmaz!',
    },
    {
      id: 'w2-s3',
      title: '3. İkili Kodlar: BCD (8421), Excess-3, Gray Code ve ASCII',
      explanation:
        'Sayısal sistemler yalnızca saf ikili aritmetik değil, aynı zamanda onluk rakamları (BCD), elektromekanik açı sensörlerini (Gray Code) ve metin karakterlerini (ASCII) de kodlar.\n• BCD (8421): Her onluk basamağı ayrı bir 4-bitlik ikili kodla gösterir (1010–1111 arası 6 kod kullanılmaz).\n• Excess-3: Her onluk basamağa +3 eklenerek elde edilen ağırlıksız ve Self-Complementing (öz-tümleyen) koddur.\n• Gray Code: Ardışıl her sayı arasında yalnızca 1 bit değişir; bu sayede mekanik sensörlerde geçiş hatası (glitch) yaşanmaz.',
      diagrams: [
        {
          kind: 'table',
          caption: '0–9 Arası BCD, Excess-3 ve Gray Code Karşılaştırma Tablosu',
          headers: ['Decimal', 'Saf Binary (4-bit)', 'BCD (8421)', 'Excess-3', 'Gray Code'],
          highlightColumn: 4,
          rows: [
            ['0', '0000', '0000', '0011', '0000'],
            ['1', '0001', '0001', '0100', '0001'],
            ['2', '0010', '0010', '0101', '0011'],
            ['3', '0011', '0011', '0110', '0010'],
            ['4', '0100', '0100', '0111', '0110'],
            ['5', '0101', '0101', '1000', '0111'],
            ['6', '0110', '0110', '1001', '0101'],
            ['7', '0111', '0111', '1010', '0100'],
            ['8', '1000', '1000', '1011', '1100'],
            ['9', '1001', '1001', '1100', '1101'],
          ],
        },
        {
          kind: 'steps',
          caption: 'Binary ↔ Gray Code Dönüşüm Kuralları (XOR Zinciri)',
          steps: [
            {
              label: 'Binary → Gray Code',
              badge: 'G_i = B_{i+1} ⊕ B_i',
              detail: 'En soldaki bit (MSB) aynen kopyalanır: G_MSB = B_MSB.\nDiğer her bit, kendi solundaki Binary biti ile XOR yapılır.',
            },
            {
              label: 'Gray Code → Binary',
              badge: 'B_i = B_{i+1} ⊕ G_i',
              detail: 'En soldaki bit (MSB) aynen alınır: B_MSB = G_MSB.\nSonraki her bit, bir önceki BULUNAN Binary bit ile sıradaki Gray bitin XOR\'udur.',
            },
            {
              label: 'ASCII & Parity Bit',
              badge: '7-bit + 1 Parity',
              detail: 'Standart ASCII 7-bit (128 karakter) kullanır; tek bitlik iletim hatalarını yakalamak için 8. bit olarak Even/Odd Parity eklenir.',
            },
          ],
        },
      ],
      examTip:
        'BCD kesinlikle saf ikili sayı değildir! Örneğin (15)₁₀ sayısı saf ikilide 4 bit (1111) iken, BCD kodunda iki hane × 4 bit = 8 bit (0001 0101) ile gösterilir.',
    },
  ],
  questions: [
    {
      id: 'w2-q1',
      type: 'multiple-choice',
      title: "Soru 1 · 10's Complement ile Çıkarma (Mano 1.14)",
      difficulty: 'Orta',
      prompt:
        "10'a tümleyen (10's Complement) yöntemini kullanarak 3250 - 72532 çıkarma işlemini adım adım gerçekleştiriniz.",
      options: ['-69282', '-69382', '+30718', '-68282'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Basamak Sayılarını Eşitle (5 Hane)',
          detail: 'M = 03250  |  N = 72532',
        },
        {
          title: "Adım 2: N'in 10's Complement Değerini Hesapla",
          detail: "9's Complement (99999 - 72532) = 27467  ⇒  10's Complement (+1) = 27468",
        },
        {
          title: 'Adım 3: M ile Topla ve Elde (End Carry) Durumunu Kontrol Et',
          detail:
            '03250 + 27468 = 30718. En soldan taşan elde OLMADIĞI (Carry = 0) için M < N ve sonuç negatiftir.',
        },
        {
          title: "Adım 4: Sonucun Tekrar 10's Complement Değerini Al",
          detail: "100000 - 30718 = 69282  ⇒  Başına (-) koy: -69282",
        },
      ],
    },
    {
      id: 'w2-q2',
      type: 'multiple-choice',
      title: "Soru 2 · 8-Bit 2's Complement Aritmetiği ve Overflow (Mano 1.15)",
      difficulty: 'Sınav Seviyesi',
      prompt:
        "8-bit işaretli 2'ye tümleyen (2's Complement) sisteminde (-45)₁₀ + (-90)₁₀ toplama işlemi yapıldığında elde edilen 8-bit toplam ve Overflow (V) durumu nedir?",
      options: [
        '8-bit Toplam: 01111001 (+121), Overflow (V) = 1 (Taşma Var)',
        '8-bit Toplam: 10000111 (-121), Overflow (V) = 0 (Taşma Yok)',
        '8-bit Toplam: 01111001 (+121), Overflow (V) = 0 (Taşma Yok)',
        '8-bit Toplam: 11111001 (-7), Overflow (V) = 1 (Taşma Var)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: "Adım 1: Sayıların 8-Bit 2's Complement Gösterimlerini Yaz",
          detail:
            '+45 = 00101101₂ → -45 = 11010011₂\n+90 = 01011010₂ → -90 = 10100110₂',
        },
        {
          title: 'Adım 2: 8-Bit Toplama İşlemini Yap',
          detail:
            '  11010011 (-45)\n+ 10100110 (-90)\n─────────────────\n(1) 01111001  (8-bit alan: 01111001 = +121)',
        },
        {
          title: 'Adım 3: Overflow (V = C_in ⊕ C_out) Analizi',
          detail:
            'İşaret bitine giren elde C_in = 0, işaret bitinden çıkan elde C_out = 1 ⇒ V = 0 ⊕ 1 = 1 (Taşma Var). İki negatif sayı toplanıp pozitif sonuç (0 ile başlayan) üretildiği için ve -135 ∉ [-128, +127] olduğundan Overflow gerçekleşmiştir.',
        },
      ],
    },
    {
      id: 'w2-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · Binary → Gray Code Dönüşümü (Dr. Dhiman Yöntemi)',
      difficulty: 'Temel',
      prompt: '(101101)₂ ikili sayısının Gray Code karşılığı aşağıdakilerden hangisidir?',
      options: ['111011', '110110', '101011', '111001'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: MSB Bitini Aynen Al',
          detail: 'B = [1, 0, 1, 1, 0, 1]  ⇒  G₅ = B₅ = 1',
        },
        {
          title: 'Adım 2: Ardışıl Komşu Bitleri XOR İşlemine Sok',
          detail:
            'G₄ = 1⊕0 = 1 | G₃ = 0⊕1 = 1 | G₂ = 1⊕1 = 0 | G₁ = 1⊕0 = 1 | G₀ = 0⊕1 = 1',
        },
        {
          title: 'Adım 3: Bitleri Birleştir',
          detail: 'Gray Code = 111011',
        },
      ],
    },
    {
      id: 'w2-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · BCD (8421) vs Saf Binary Bit Sayısı',
      difficulty: 'Temel',
      prompt:
        '(185)₁₀ onluk sayısı BCD (8421) koduyla ve saf ikili (Pure Binary) sistemle yazıldığında sırasıyla kaç bit gerekir?',
      options: [
        'BCD: 12 bit (0001 1000 0101), Saf Binary: 8 bit (10111001)',
        'BCD: 8 bit (10111001), Saf Binary: 12 bit (0001 1000 0101)',
        'BCD: 12 bit (0001 1000 0101), Saf Binary: 7 bit (0111001)',
        'BCD: 9 bit, Saf Binary: 8 bit',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: BCD (8421) Kodlaması',
          detail: '1 → 0001 | 8 → 1000 | 5 → 0101  ⇒  3 basamak × 4 bit = 12 bit gerekir.',
        },
        {
          title: 'Adım 2: Saf Binary Dönüşümü',
          detail: '185 = 128 + 32 + 16 + 8 + 1 = (10111001)₂  ⇒  8 bit yeterlidir.',
        },
      ],
    },
    {
      id: 'w2-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · Excess-3 Self-Complementing Özelliği',
      difficulty: 'Orta',
      prompt:
        'Excess-3 (Artı-3) kodunun aritmetik devrelerde tercih edilmesini sağlayan "Self-Complementing" (öz-tümleyen) özelliği ne anlama gelir?',
      options: [
        'Bir onluk rakamın 9\'a tümleyeni, Excess-3 kodunun tüm bitlerini tersleyerek (1\'s complement) doğrudan elde edilir.',
        'Her rakamın ikili karşılığı 3 ile çarpılarak taşma önlenir.',
        'Negatif sayılar için ayrı bir işaret biti gerekmez.',
        'Ardışıl rakamlar arasında yalnızca tek bir bit değişir.',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Matematiksel Doğrulama',
          detail:
            'Rakam d için Excess-3 kodu (d + 3)₂\'dir. Tüm 4 bit terslenirse 15 - (d + 3) = (9 - d) + 3 elde edilir; bu da tam olarak (9 - d) rakamının Excess-3 kodudur!',
        },
        {
          title: 'Adım 2: Sayısal Örnek (d = 2 ve 9 - d = 7)',
          detail: '2 → Excess-3: 0101. Bitleri tersle → 1010 = 10₁₀ = 7 + 3 (7\'nin Excess-3 kodu).',
        },
      ],
    },
    {
      id: 'w2-q6',
      type: 'simulator-build',
      title: 'Soru 6 · 2-Bit Binary-to-Gray Code Dönüştürücü (Canlı Lab)',
      difficulty: 'Orta',
      prompt:
        'Simülatörde 2-bit Binary-to-Gray Code dönüştürücü devresini kurun. Girişler: B1 (MSB) ve B0 (LSB). Çıkışlar: G1 = B1 ve G0 = B1 ⊕ B0. Kablo ve XOR kapısı kullanarak devreyi tamamlayın ve "Devreyi Doğrula" butonuna basın.',
      inputs: ['B1', 'B0'],
      outputs: ['G1', 'G0'],
      allowedComponents: ['XOR'],
      expectedTruthTable: [
        { inputs: { B1: 0, B0: 0 }, outputs: { G1: 0, G0: 0 } },
        { inputs: { B1: 0, B0: 1 }, outputs: { G1: 0, G0: 1 } },
        { inputs: { B1: 1, B0: 0 }, outputs: { G1: 1, G0: 1 } },
        { inputs: { B1: 1, B0: 1 }, outputs: { G1: 1, G0: 0 } },
      ],
      hint: 'B1 çıkış pinini doğrudan G1 LED\'ine bağlayın (G1 = B1). Ayrıca B1 ve B0 girişlerini bir XOR kapısına bağlayıp XOR çıkışını G0 LED\'ine iletin.',
      solutionDescription:
        'Gray Code dönüşümünde en anlamlı bit değişmez (G1 = B1), sonraki bit ise B1 ⊕ B0 ile üretilir. Bu devre yalnızca 1 adet XOR kapısı ve doğrudan kablo bağlantısıyla 4 satırlık tüm dönüşüm tablosunu sağlar.',
    },
  ],
};
