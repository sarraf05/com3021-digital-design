import type { WeekModule } from '../../types/curriculum';

export const week1: WeekModule = {
  id: 1,
  weekNumber: 1,
  englishTitle: 'Digital Systems & Binary Numbers',
  turkishSubtitle: 'Sayısal Sistemler, Konumsal Gösterim, Taban Dönüşümleri ve İkili Aritmetik',
  summary:
    'Sayısal sistemlerin temel yapı taşlarını, Decimal, Binary, Octal ve Hexadecimal konumsal (Positional) ağırlık mantığını, hızlı 3-bit / 4-bit blok dönüşümlerini ve ikili aritmetik işlemlerini (Carry / Borrow) adım adım kavrayın.',
  learningObjectives: [
    'Decimal, Binary, Octal ve Hexadecimal tabanlarının konumsal ağırlıklarını (r^i) hesaplamak',
    'Tam ve kesirli sayıları ardışıl bölme ve çarpma yöntemleriyle hedef tabana (Radix) dönüştürmek',
    'Binary ↔ Octal (3-bit) ve Binary ↔ Hexadecimal (4-bit) blok gruplama kısayolunu uygulamak',
    'İkili toplama (Carry), çıkarma (Borrow) ve kaydırmalı ikili çarpma işlemlerini gerçekleştirmek',
  ],
  isPlaceholder: false,
  recommendedWidget: 'BaseComplementVisualizer',
  visualSections: [
    {
      id: 'w1-s1',
      title: '1. Sayı Sistemleri ve Konumsal Ağırlık (Positional Notation)',
      explanation:
        'Sayısal sistemler bilgiyi iki ayrık mantıksal seviyede işler: Logic HIGH (1) ve Logic LOW (0). Bir r tabanındaki (Radix r) her sayının değeri, basamak rakamlarının bulundukları konumun r^i ağırlığı ile çarpılıp toplanmasıyla belirlenir. En soldaki bit MSB (Most Significant Bit), en sağdaki bit ise LSB (Least Significant Bit) adını alır.',
      keyPoints: [
        'Polinom Açılımı: (N)_r = ... + d₃·r³ + d₂·r² + d₁·r¹ + d₀·r⁰ + d₋₁·r⁻¹ + d₋₂·r⁻² + ...',
        'Decimal (r=10), Binary (r=2), Octal (r=8) ve Hexadecimal (r=16) bilgisayar mühendisliğinin dört temel sayı sistemidir.',
        'n bitlik bir ikili kaydedicide (register) 0 ile 2ⁿ - 1 arasında toplam 2ⁿ farklı işaretsiz tam sayı temsil edilebilir.',
      ],
      diagrams: [
        {
          kind: 'positional',
          caption: 'Konumsal Basamak Ağırlıkları: (1101.11)₂ Örneği',
          base: 2,
          digits: [
            { symbol: '1', weightLabel: 'r³ = 2³ (8)', contribution: '1×8 = 8' },
            { symbol: '1', weightLabel: 'r² = 2² (4)', contribution: '1×4 = 4' },
            { symbol: '0', weightLabel: 'r¹ = 2¹ (2)', contribution: '0×2 = 0' },
            { symbol: '1', weightLabel: 'r⁰ = 2⁰ (1)', contribution: '1×1 = 1' },
            { symbol: '.', weightLabel: 'Radix Point', contribution: 'Nokta' },
            { symbol: '1', weightLabel: 'r⁻¹ = 2⁻¹ (0.5)', contribution: '0.5' },
            { symbol: '1', weightLabel: 'r⁻² = 2⁻² (0.25)', contribution: '0.25' },
          ],
          resultLabel: 'Toplam = (13.75)₁₀',
        },
        {
          kind: 'table',
          caption: '0–15 Arası 4 Tabanlı Karşılaştırma Matrisi',
          headers: ['Decimal (r=10)', 'Binary (r=2)', 'Octal (r=8)', 'Hexadecimal (r=16)'],
          highlightColumn: 3,
          rows: [
            ['0', '0000', '00', '0'],
            ['1', '0001', '01', '1'],
            ['2', '0010', '02', '2'],
            ['3', '0011', '03', '3'],
            ['4', '0100', '04', '4'],
            ['5', '0101', '05', '5'],
            ['6', '0110', '06', '6'],
            ['7', '0111', '07', '7'],
            ['8', '1000', '10', '8'],
            ['9', '1001', '11', '9'],
            ['10', '1010', '12', 'A'],
            ['11', '1011', '13', 'B'],
            ['12', '1100', '14', 'C'],
            ['13', '1101', '15', 'D'],
            ['14', '1110', '16', 'E'],
            ['15', '1111', '17', 'F'],
          ],
        },
      ],
      examTip:
        'Sınavlarda 2⁰=1 ... 2¹⁰=1024 (1K), 2¹⁶=65536 (64K) ve kesirli kuvvetler (2⁻¹=0.5, 2⁻²=0.25, 2⁻³=0.125, 2⁻⁴=0.0625) ezbere bilinmelidir.',
    },
    {
      id: 'w1-s2',
      title: '2. Taban Dönüşümleri ve Dr. Dhiman 3-Bit / 4-Bit Gruplama Kısayolu',
      explanation:
        'Onluk (Decimal) tabandan herhangi bir r tabanına geçerken sayı iki parçaya ayrılır: Tam kısım sürekli r tabanına bölünür ve kalanlar AŞAĞIDAN YUKARIYA doğru okunur. Kesirli kısım ise sürekli r ile çarpılır ve ortaya çıkan tam kısımlar YUKARIDAN AŞAĞIYA doğru yazılır.\n\nDr. Dhiman Kısayolu: 8 = 2³ ve 16 = 2⁴ olduğu için Binary ↔ Octal dönüşümünde noktadan itibaren 3-bit bloklar, Binary ↔ Hexadecimal dönüşümünde ise 4-bit bloklar oluşturulur. Uçlardaki eksik bitler 0 ile doldurulur.',
      diagrams: [
        {
          kind: 'steps',
          caption: 'Örnek Akış: (1101101.1011)₂ Sayısının Octal ve Hexadecimal Dönüşümü',
          steps: [
            {
              label: 'Adım 1: Radix Noktasından Başla',
              badge: 'Referans',
              detail:
                'Tam kısım noktadan SOLA doğru,\nkesirli kısım noktadan SAĞA doğru gruplanır.\nSayı: 1101101 . 1011',
            },
            {
              label: 'Adım 2: Octal İçin 3-Bit Bloklar',
              badge: 'r = 8 = 2³',
              detail:
                'Tam: [001] [101] [101] → 1 5 5\nKesir: [101] [100] → . 5 4\nSonuç: (155.54)₈',
            },
            {
              label: 'Adım 3: Hex İçin 4-Bit Bloklar',
              badge: 'r = 16 = 2⁴',
              detail:
                'Tam: [0110] [1101] → 6 D\nKesir: [1011] → . B\nSonuç: (6D.B)₁₆',
            },
          ],
        },
      ],
      widget: 'BaseComplementVisualizer',
      widgetConfig: {
        defaultMode: 'base',
        initialValue: '41.6875',
        initialBase: 2,
      },
      examTip:
        'Octal → Hexadecimal dönüşümü sorulduğunda asla 10 tabanına gitmeyin! Octal → 3-bit Binary → 4-bit grupla → Hexadecimal yolu hem çok daha hızlıdır hem de işlem hatası riskini sıfırlar.',
    },
    {
      id: 'w1-s3',
      title: '3. İkili Aritmetik (Binary Addition, Subtraction, Multiplication)',
      explanation:
        'İkili sistemde aritmetik kurallar onluk sistemle aynı mantığa dayanır; tek fark tabanın 2 olmasıdır. Toplamada sütun toplamı 2 veya daha büyükse sonraki sütuna Elde (Carry) aktarılır (1 + 1 = 0 ve Carry = 1; 1 + 1 + 1 = 1 ve Carry = 1). Çıkarmada 0 - 1 işlemi gerektiğinde sol sütundan 2 değerinde Borç (Borrow) alınır (2 - 1 = 1). Çarpmada ise çarpanın her 1 biti için çarpılan sayı sola kaydırılarak toplanır.',
      diagrams: [
        {
          kind: 'steps',
          caption: 'Adım Adım İkili Aritmetik Örnekleri (Carry & Borrow Akışı)',
          steps: [
            {
              label: 'Toplama (Carry Akışı)',
              badge: '1011 + 0111',
              detail:
                'Carry:  1 1 1 0\nA:      1 0 1 1  (11)\nB:    + 0 1 1 1  (7)\n─────────────────\nSonuç: 1 0 0 1 0 (18)',
            },
            {
              label: 'Çıkarma (Borrow Akışı)',
              badge: '1010 - 0111',
              detail:
                'Borç:   0 2 0 2\nA:      1 0 1 0  (10)\nB:    - 0 1 1 1  (7)\n─────────────────\nFark:   0 0 1 1  (3)',
            },
            {
              label: 'Çarpma (Kısmi Çarpımlar)',
              badge: '1011 × 101',
              detail:
                '        1 0 1 1  (11)\n      ×   1 0 1  (5)\n─────────────────\n        1 0 1 1  (×1)\n      0 0 0 0    (×0)\n+ 1 0 1 1        (×1)\n─────────────────\n  1 1 0 1 1 1    (55)',
            },
          ],
        },
      ],
      examTip:
        'Çoklu ikili toplama veya çarpma sonucunda elde ettiğiniz sonucu her zaman zihinden onluk tabana çevirerek (örn. 11 × 5 = 55) sağlamasını yapın.',
    },
  ],
  questions: [
    {
      id: 'w1-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · Kesirli Onluk Sayı Dönüşümü (Mano 1.3 / 1.4)',
      difficulty: 'Temel',
      prompt:
        'Onluk tabanda verilen (41.6875)₁₀ sayısının ikili (Binary) ve onaltılık (Hexadecimal) karşılıkları sırasıyla aşağıdakilerden hangisidir?',
      options: [
        '(101001.1011)₂ ve (29.B)₁₆',
        '(101011.1011)₂ ve (2B.B)₁₆',
        '(101001.1101)₂ ve (29.D)₁₆',
        '(100101.1011)₂ ve (25.B)₁₆',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Tam Kısım (41)₁₀ İçin Ardışıl Bölme',
          detail:
            '41÷2 = 20 (kalan 1) | 20÷2 = 10 (kalan 0) | 10÷2 = 5 (kalan 0) | 5÷2 = 2 (kalan 1) | 2÷2 = 1 (kalan 0) | 1÷2 = 0 (kalan 1) → Alttan üste: (101001)₂',
        },
        {
          title: 'Adım 2: Kesirli Kısım (0.6875)₁₀ İçin Ardışıl Çarpma',
          detail:
            '0.6875×2 = 1.375 (tam: 1) → 0.375×2 = 0.75 (tam: 0) → 0.75×2 = 1.50 (tam: 1) → 0.50×2 = 1.00 (tam: 1) → Üstten alta: (.1011)₂',
        },
        {
          title: 'Adım 3: 4-Bit Gruplama ile Hexadecimal Dönüşümü',
          detail:
            '[0010] [1001] . [1011] → 0010 = 2, 1001 = 9, 1011 = 11 (B) → Sonuç: (101001.1011)₂ = (29.B)₁₆',
        },
      ],
    },
    {
      id: 'w1-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · Bilinmeyen Taban Bulma (Dr. Dhiman Unknown Radix)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'Aşağıdaki taban aritmetiği eşitliğini sağlayan r sayı tabanı (Radix) kaçtır?\n\n(24)_r + (17)_r = (40)_r',
      options: ['r = 10', 'r = 11', 'r = 12', 'r = 9'],
      correctIndex: 1,
      solutionSteps: [
        {
          title: 'Adım 1: Tüm Sayıları Konumsal Polinom Açılımıyla Onluk Tabana Yaz',
          detail: '(24)_r = 2·r¹ + 4·r⁰ = 2r + 4  |  (17)_r = 1·r + 7  |  (40)_r = 4·r + 0 = 4r',
        },
        {
          title: 'Adım 2: Denklemi Kur ve r İçin Çöz',
          detail: '(2r + 4) + (r + 7) = 4r  ⇒  3r + 11 = 4r  ⇒  r = 11',
        },
        {
          title: 'Adım 3: Geçerlilik Kontrolü',
          detail:
            'Kullanılan en büyük rakam 7 olduğu için r > 7 olmalıdır. r = 11 bu koşulu sağlar. Sağlama: (26 + 18 = 44 = 4×11).',
        },
      ],
    },
    {
      id: 'w1-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · Octal → Hexadecimal Doğrudan Dönüşüm (Mano 1.6)',
      difficulty: 'Orta',
      prompt:
        'Sekizlik tabanda verilen (673.124)₈ sayısının onaltılık (Hexadecimal) tabandaki tam karşılığı nedir?',
      options: ['(1BB.2A)₁₆', '(1B3.28)₁₆', '(35B.52)₁₆', '(1BB.54)₁₆'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Her Octal Basamağı 3-Bit Binary Bloğuna Aç',
          detail:
            '6 = 110 | 7 = 111 | 3 = 011  .  1 = 001 | 2 = 010 | 4 = 100 → (110 111 011 . 001 010 100)₂',
        },
        {
          title: 'Adım 2: Noktadan Başlayarak 4-Bit Bloklara Yeniden Grupla',
          detail:
            'Tam kısım (sola): [0001] [1011] [1011]  |  Kesir (sağa): [0010] [1010] [0000]',
        },
        {
          title: 'Adım 3: 4-Bit Blokları Hexadecimal Rakamlara Çevir',
          detail: '0001 = 1, 1011 = B, 1011 = B . 0010 = 2, 1010 = A → Sonuç: (1BB.2A)₁₆',
        },
      ],
    },
    {
      id: 'w1-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · İkili Çarpma İşlemi (Binary Multiplication)',
      difficulty: 'Temel',
      prompt:
        '(10110)₂ × (101)₂ ikili çarpma işleminin sonucu ikili tabanda aşağıdakilerden hangisidir?',
      options: ['(1101110)₂', '(1101100)₂', '(1011110)₂', '(1110110)₂'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Kısmi Çarpımları Oluştur',
          detail:
            'Bit 0 (1): 10110 × 1 = 10110\nBit 1 (0): 10110 × 0 = 000000 (1 sola kaydır)\nBit 2 (1): 10110 × 1 = 1011000 (2 sola kaydır)',
        },
        {
          title: 'Adım 2: Kısmi Çarpımları Elde Bitleriyle Topla',
          detail: '10110 + 1011000 = 1101110₂',
        },
        {
          title: 'Adım 3: Onluk Tabanda Sağlama',
          detail: '(10110)₂ = 22₁₀ ve (101)₂ = 5₁₀ → 22 × 5 = 110₁₀ = 64 + 32 + 8 + 4 + 2 = (1101110)₂.',
        },
      ],
    },
    {
      id: 'w1-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · Kaydedici Kapasitesi ve Maksimum Değer',
      difficulty: 'Temel',
      prompt:
        'n = 12 bitlik bir kaydedicide (register) temsil edilebilecek en büyük işaretsiz (unsigned) onluk tam sayı kaçtır?',
      options: ['4096', '4095', '2047', '2048'],
      correctIndex: 1,
      solutionSteps: [
        {
          title: 'Adım 1: Toplam Durum Sayısını Bul',
          detail: 'n bit ile toplam 2ⁿ farklı ikili dizilim oluşturulabilir: 2¹² = 4096 farklı değer.',
        },
        {
          title: 'Adım 2: 0 Dahil Edildiğinde Üst Sınır',
          detail: 'Sayılar 0 ile başladığı için aralık [0, 2ⁿ - 1] olur: 4096 - 1 = 4095.',
        },
      ],
    },
    {
      id: 'w1-q6',
      type: 'multiple-choice',
      title: 'Soru 6 · Sonsuz Tekrarlayan İkili Kesirler',
      difficulty: 'Sınav Seviyesi',
      prompt:
        '(0.3)₁₀ onluk kesri ikili (Binary) tabana çevrildiğinde neden sonlu bir gösterime sahip değildir ve ilk 6 kesirli biti nedir?',
      options: [
        'Paydadaki 5 asal çarpanı 2ⁿ formunda olmadığı için sonlanmaz; ilk 6 bit: (0.010011...)₂',
        'Onluk sistemde çift sayı olmadığı için sonlanmaz; ilk 6 bit: (0.010101...)₂',
        'Kesirli kısım 0.5 ten küçük olduğu için sonlanmaz; ilk 6 bit: (0.001100...)₂',
        '3 asal sayı olduğu için sonlanmaz; ilk 6 bit: (0.011001...)₂',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Ardışıl 2 İle Çarpma Tablosu',
          detail:
            '0.3 × 2 = 0.6 (0) | 0.6 × 2 = 1.2 (1) | 0.2 × 2 = 0.4 (0) | 0.4 × 2 = 0.8 (0) | 0.8 × 2 = 1.6 (1) | 0.6 × 2 = 1.2 (1)',
        },
        {
          title: 'Adım 2: Periyodik Döngü Tespiti',
          detail:
            '2. adımdaki 0.6 değeri 5. adımda tekrar karşımıza çıktığı için "0011" bloğu sonsuza dek tekrarlanır: (0.0100110011...)₂',
        },
        {
          title: 'Adım 3: Matematiksel Neden',
          detail:
            '0.3 = 3/10 kesrinin paydasında 2 dışında 5 asal çarpanı bulunduğu için 2 tabanında tam bölünemez ve periyodik devirli olur.',
        },
      ],
    },
  ],
};
