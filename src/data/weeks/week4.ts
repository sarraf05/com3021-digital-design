import type { WeekModule } from '../../types/curriculum';

export const week4: WeekModule = {
  id: 4,
  weekNumber: 4,
  englishTitle: 'Canonical & Standard Forms',
  turkishSubtitle: 'Minterm, Maxterm, Kanonik SOP/POS Dönüşümleri ve Mantık Kapıları',
  summary:
    'Herhangi bir Boole fonksiyonunu standart kanonik biçimlere (Sum of Minterms Σm ve Product of Maxterms ΠM) dönüştürmeyi, iki seviyeli SOP/POS devre yapılarını ve çok girişli NAND/NOR kapılarındaki kritik birleşme (associativity) tuzağını öğrenin.',
  learningObjectives: [
    'Doğruluk tablosunun her satırı için Minterm (mᵢ) ve Maxterm (Mᵢ) terimlerini yazmak',
    'Kanonik Σm ve ΠM formları ile tümleyen (F\') arasında anında dönüşüm yapmak',
    'İki seviyeli standart AND-OR (SOP) ve OR-AND (POS) devrelerini ayırt etmek',
    'XOR/XNOR ile 3+ girişli NAND/NOR kapılarının birleşme özelliği farkını kavramak',
  ],
  isPlaceholder: false,
  recommendedWidget: 'TruthTableBuilder',
  recommendedWidgetConfig: {
    variables: 3,
    initialMinterms: [0, 2, 5, 6],
  },
  visualSections: [
    {
      id: 'w4-s1',
      title: '1. Minterm (mᵢ) ve Maxterm (Mᵢ) Kavramı',
      explanation:
        'n değişkenli bir Boole fonksiyonunda 2ⁿ adet olası giriş kombinasyonu vardır. Her satır iki şekilde tanımlanabilir:\n• Minterm (mᵢ — Standard Product): Yalnızca o satırda "1" çıkışı üreten AND çarpımıdır. Değişken değeri 1 ise kendisi (x), 0 ise tümleyeni (x\') yazılır.\n• Maxterm (Mᵢ — Standard Sum): Yalnızca o satırda "0" çıkışı üreten OR toplamıdır. Değişken değeri 0 ise kendisi (x), 1 ise tümleyeni (x\') yazılır.\n\nKritik İlişki: Her satır için Minterm ile Maxterm birbirinin tam DeMorgan tümleyenidir: Mᵢ = (mᵢ)\' ve mᵢ = (Mᵢ)\'.',
      diagrams: [
        {
          kind: 'table',
          caption: '3 Değişkenli (x, y, z) Minterm ve Maxterm Tablosu',
          headers: ['İndeks', 'x y z', 'Minterm (mᵢ) [1 yapar]', 'Maxterm (Mᵢ) [0 yapar]'],
          highlightColumn: 2,
          rows: [
            ['0', '0 0 0', "m₀ = x'y'z'", 'M₀ = x + y + z'],
            ['1', '0 0 1', "m₁ = x'y'z", "M₁ = x + y + z'"],
            ['2', '0 1 0', "m₂ = x'yz'", "M₂ = x + y' + z"],
            ['3', '0 1 1', "m₃ = x'yz", "M₃ = x + y' + z'"],
            ['4', '1 0 0', "m₄ = xy'z'", "M₄ = x' + y + z"],
            ['5', '1 0 1', "m₅ = xy'z", "M₅ = x' + y + z'"],
            ['6', '1 1 0', "m₆ = xyz'", "M₆ = x' + y' + z"],
            ['7', '1 1 1', 'm₇ = xyz', "M₇ = x' + y' + z'"],
          ],
        },
      ],
      widget: 'TruthTableBuilder',
      widgetConfig: {
        variables: 3,
        initialMinterms: [0, 2, 5, 6],
      },
      examTip:
        'Minterm\'de 1 olan değişken düz, 0 olan ters yazılır; Maxterm\'de ise tam tersi olarak 0 olan düz, 1 olan ters yazılır!',
    },
    {
      id: 'w4-s2',
      title: '2. Kanonik Formlar (Σm ve ΠM) Arası Hızlı Dönüşüm',
      explanation:
        'Bir fonksiyonun Doğruluk Tablosunda "1" olan satırlar toplanarak Sum of Minterms (Σm), "0" olan satırlar çarpılarak Product of Maxterms (ΠM) elde edilir. İki gösterim birbirinin tamamlayıcı indeks kümelerinden oluşur:\n\nEğer F(A, B, C) = Σm(1, 3, 5, 7) ise, tabloda geri kalan satırlar {0, 2, 4, 6} olduğundan doğrudan:\n• F(A, B, C) = ΠM(0, 2, 4, 6)\n• F\'(A, B, C) = Σm(0, 2, 4, 6) = ΠM(1, 3, 5, 7) yazılır.',
      diagrams: [
        {
          kind: 'steps',
          caption: 'Cebirsel İfadeden Kanonik SOP (Σm) Elde Etme Yöntemi',
          steps: [
            {
              label: 'Adım 1: Eksik Değişkeni Tespit Et',
              badge: "Örn: A'B + BC'",
              detail: "İlk terimde C eksik; ikinci terimde A eksik.\nHer terimi tüm değişkenleri içerecek şekilde genişlet.",
            },
            {
              label: 'Adım 2: (X + X\') = 1 İle Çarp',
              badge: 'Genişletme',
              detail: "A'B(C + C') + (A + A')BC'\n= A'BC + A'BC' + ABC' + A'BC'",
            },
            {
              label: 'Adım 3: Tekrarları Ele (x + x = x)',
              badge: 'Σm(2, 3, 6)',
              detail: "A'BC' (010=2) + A'BC (011=3) + ABC' (110=6)\n⇒ F = Σm(2, 3, 6)",
            },
          ],
        },
      ],
      examTip:
        'Kanonik form dönüşümlerinde n değişken varsa evrensel küme {0, 1, ..., 2ⁿ-1} elemanlıdır. F\'nin Σm indeksleri ile ΠM indekslerinin birleşimi her zaman tüm 2ⁿ satırı vermelidir.',
    },
    {
      id: 'w4-s3',
      title: '3. Standart Formlar (SOP & POS) ve İki Seviyeli Devreler',
      explanation:
        'Kanonik formlarda her terimde tüm değişkenler bulunmak zorundayken, Standart Formlarda (Standard SOP / Standard POS) terimler sadeleştirilmiş olabilir ve daha az literal içerir. Donanım açısından:\n• Standard SOP (Sum of Products): 1. Seviyede AND kapıları, 2. Seviyede tek bir OR kapısı (AND-OR devresi).\n• Standard POS (Product of Sums): 1. Seviyede OR kapıları, 2. Seviyede tek bir AND kapısı (OR-AND devresi).\n\nNot: İki seviyeli devrelerde sinyal en fazla 2 kapı gecikmesinden geçer (Non-standard çok seviyeli formlarda ise gecikme artar).',
      diagrams: [
        {
          kind: 'table',
          caption: 'Kanonik vs Standart vs Çok Seviyeli (Non-Standard) Form Karşılaştırması',
          headers: ['Form Türü', 'Örnek İfade', 'Kapı Seviyesi', 'Açıklama'],
          highlightColumn: 2,
          rows: [
            ['Canonical SOP', "x'y'z + x'yz + xyz", '2 Seviye (AND-OR)', 'Her çarpım terimi tüm değişkenleri içerir.'],
            ['Standard SOP', "x'z + yz", '2 Seviye (AND-OR)', 'Sadeleştirilmiş çarpımların toplamıdır; daha az giriş pini ister.'],
            ['Standard POS', "(x + z')(y + z)", '2 Seviye (OR-AND)', 'Sadeleştirilmiş toplamların çarpımıdır.'],
            ['Non-Standard', "z(x' + y) + w", '3+ Seviye', 'Parantezler iç içe geçmiştir; yayılım gecikmesi daha yüksektir.'],
          ],
        },
      ],
      examTip:
        'Tek bir literal veya tek başına duran bir değişken (ör. F = A + BC) hem SOP hem de POS yapısına uyumlu görünebilir, ancak genel tanımıyla çarpımların toplamı olduğundan Standard SOP olarak sınıflandırılır.',
    },
    {
      id: 'w4-s4',
      title: '4. Tüm Mantık Kapıları ve Çok Girişli NAND/NOR Tuzağı',
      explanation:
        'Temel AND, OR, NOT kapılarının yanı sıra evrensel NAND/NOR ve aritmetik/eşlik kapıları olan XOR/XNOR dijital tasarımın çekirdeğini oluşturur.\n\nKRİTİK SINAV UYARISI (Birleşme Özelliği Tuzağı): AND, OR, XOR ve XNOR kapıları birleşme özelliğine (Associativity) sahiptir: (x ⊕ y) ⊕ z = x ⊕ (y ⊕ z). Ancak NAND (↑) ve NOR (↓) kapılarında BİRLEŞME ÖZELLİĞİ YOKTUR! Yani 3 girişli bir NAND kapısı (x · y · z)\' işlevini yaparken, iki 2-girişli NAND kapısını arka arkaya bağlamak [(x · y)\' · z]\' = xy + z\' üretir ve eşit değildir!',
      diagrams: [
        {
          kind: 'table',
          caption: 'Temel Mantık Kapılarının Cebirsel İşlevleri ve Birleşme Özelliği',
          headers: ['Kapı', 'Cebirsel İfade', 'Çıkışı 1 Yapan Koşul', '3+ Girişe Zincirlenebilir mi? (Associative)'],
          highlightColumn: 3,
          rows: [
            ['AND', 'F = x · y', 'Tüm girişler 1 iken', 'Evet: (xy)z = x(yz)'],
            ['OR', 'F = x + y', 'En az bir giriş 1 iken', 'Evet: (x+y)+z = x+(y+z)'],
            ['NAND', "F = (x · y)'", 'En az bir giriş 0 iken', "HAYIR! [(xy)']'z ≠ (xyz)'"],
            ['NOR', "F = (x + y)'", 'Tüm girişler 0 iken', "HAYIR! [(x+y)']'+z ≠ (x+y+z)'"],
            ['XOR', "F = x ⊕ y = x'y + xy'", 'Tek sayıda giriş 1 iken (Odd)', 'Evet: (x⊕y)⊕z = x⊕(y⊕z)'],
            ['XNOR', "F = (x ⊕ y)' = xy + x'y'", 'Çift sayıda giriş 1 iken (2 girişte Eşitlik)', 'Evet: (x⊙y)⊙z = x⊙(y⊙z)'],
          ],
        },
      ],
      examTip:
        '3 girişli XOR (A ⊕ B ⊕ C) Odd Function (tek sayıda 1 varsa 1) olarak çalışır. Ancak 3 girişli XNOR yalnızca giriş sayısına bağlı olarak Even Function\'ın tersi olabilir; 3 değişkenli eşitlik dedektörü DEĞİLDİR!',
    },
  ],
  questions: [
    {
      id: 'w4-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · Kanonik Sum of Minterms Elde Etme (Mano 2.15)',
      difficulty: 'Temel',
      prompt:
        "F(A, B, C) = A'B + BC' Boole fonksiyonunun kanonik Sum of Minterms (Σm) gösterimi aşağıdakilerden hangisidir?",
      options: [
        'Σm(2, 3, 6)',
        'Σm(1, 3, 6)',
        'Σm(2, 4, 6)',
        'Σm(0, 2, 3, 6)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Eksik Değişkenleri Tamamla',
          detail: "F = A'B(C + C') + (A + A')BC' = A'BC + A'BC' + ABC' + A'BC'",
        },
        {
          title: 'Adım 2: Tekrar Eden Mintermi Teke İndir ve İkili Koda Çevir',
          detail:
            "A'BC' → 010 (m₂) | A'BC → 011 (m₃) | ABC' → 110 (m₆)",
        },
        {
          title: 'Adım 3: Kanonik Gösterimi Yaz',
          detail: 'F(A, B, C) = Σm(2, 3, 6)',
        },
      ],
    },
    {
      id: 'w4-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · Σm → ΠM Dönüşümü ve Sadeleştirme (Mano 2.17)',
      difficulty: 'Orta',
      prompt:
        'F(x, y, z) = Σ(1, 3, 5, 7) fonksiyonunun kanonik Product of Maxterms (ΠM) gösterimi ve en sade cebirsel hali nedir?',
      options: [
        'ΠM(0, 2, 4, 6) ve en sade hali F = z',
        "ΠM(0, 2, 4, 6) ve en sade hali F = z'",
        'ΠM(1, 3, 5, 7) ve en sade hali F = x',
        'ΠM(0, 2, 4, 6) ve en sade hali F = y + z',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Tümleyen İndekslerden ΠM Formunu Yaz',
          detail: '3 değişken için tüm indeksler {0..7}. Σ(1, 3, 5, 7) dışındaki indeksler {0, 2, 4, 6} ⇒ ΠM(0, 2, 4, 6).',
        },
        {
          title: 'Adım 2: Mintermlerin İkili Karşılıklarını İncele',
          detail: '1 (001), 3 (011), 5 (101), 7 (111) — Tüm bu tek sayıların en sağ biti z = 1 dir!',
        },
        {
          title: 'Adım 3: Cebirsel İspat',
          detail: "F = x'y'z + x'yz + xy'z + xyz = z(x'y' + x'y + xy' + xy) = z(1) = z",
        },
      ],
    },
    {
      id: 'w4-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · 4 Değişkenli Kanonik POS Sadeleştirme (Dr. Dhiman)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        'F(A, B, C, D) = Π(0, 2, 4, 6, 8, 10, 12, 14) fonksiyonunun en sade cebirsel karşılığı nedir?',
      options: ['F = D', "F = D'", 'F = A', 'F = C + D'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Sıfır Yapan İndekslerin Ortak Özelliğini Bul',
          detail:
            '0, 2, 4, 6, 8, 10, 12, 14 indekslerinin tamamı ÇİFT sayılardır; yani LSB olan D biti tüm bu durumlarda 0 dır.',
        },
        {
          title: 'Adım 2: Çıkış Davranışını Oku',
          detail:
            'D = 0 olan tüm 8 satırda F = 0, geri kalan tek indekslerde (D = 1 iken) F = 1 olmaktadır.',
        },
        {
          title: 'Adım 3: Sonuç',
          detail: 'Dolayısıyla F(A, B, C, D) = Σm(1, 3, 5, 7, 9, 11, 13, 15) = D bulunur.',
        },
      ],
    },
    {
      id: 'w4-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · 3 Girişli Odd Function (Tek Eşlik)',
      difficulty: 'Temel',
      prompt:
        'F(X, Y, Z) = X ⊕ Y ⊕ Z fonksiyonu hangi mintermler için 1 çıkışını üretir?',
      options: [
        'Σm(1, 2, 4, 7)',
        'Σm(0, 3, 5, 6)',
        'Σm(1, 2, 3, 7)',
        'Σm(0, 1, 6, 7)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: 3-Girişli XOR Kuralı',
          detail: 'Çok girişli XOR (Odd Function), girişlerde TEK sayıda 1 (1 adet veya 3 adet) bulunduğunda çıkışa 1 verir.',
        },
        {
          title: 'Adım 2: Tek Sayıda 1 İçeren 3-Bitlik Sayıları Listele',
          detail: '001 (1), 010 (2), 100 (4) [bir adet 1] ve 111 (7) [üç adet 1] ⇒ Σm(1, 2, 4, 7).',
        },
      ],
    },
    {
      id: 'w4-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · Birleşme Özelliği (Associativity) Tuzağı',
      difficulty: 'Sınav Seviyesi',
      prompt: 'Aşağıdaki Boole operatörü eşitliklerinden hangisi her zaman DOĞRU DEĞİLDİR?',
      options: [
        '(x ↑ y) ↑ z = x ↑ (y ↑ z)   [NAND Operatörü]',
        '(x ⊕ y) ⊕ z = x ⊕ (y ⊕ z)   [XOR Operatörü]',
        '(x · y) · z = x · (y · z)   [AND Operatörü]',
        '(x + y) + z = x + (y + z)   [OR Operatörü]',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Karşı Örnek (Counterexample) Testi: x = 1, y = 1, z = 0',
          detail:
            "Sol taraf: (1 ↑ 1) ↑ 0 = 0 ↑ 0 = 1\nSağ taraf: 1 ↑ (1 ↑ 0) = 1 ↑ 1 = 0",
        },
        {
          title: 'Adım 2: Sonuç',
          detail:
            '1 ≠ 0 olduğu için NAND (↑) ve aynı şekilde NOR (↓) kapıları birleşme özelliğine (associativity) sahip değildir. 3 girişli NAND elde etmek için 2 girişli NAND\'ler doğrudan zincirlenemez!',
        },
      ],
    },
    {
      id: 'w4-q6',
      type: 'interactive-table',
      title: 'Soru 6 · Kanonik Σm(0, 2, 5, 6) Doğruluk Tablosu',
      difficulty: 'Temel',
      prompt:
        'F(A, B, C) = Σm(0, 2, 5, 6) kanonik fonksiyonunun doğruluk tablosunu F sütununa tıklayarak eksiksiz tamamlayın.',
      headers: ['Minterm', 'A', 'B', 'C', 'F(A, B, C)'],
      rows: [
        [{ value: 'm₀' }, { value: '0' }, { value: '0' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: 'm₁' }, { value: '0' }, { value: '0' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: 'm₂' }, { value: '0' }, { value: '1' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: 'm₃' }, { value: '0' }, { value: '1' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: 'm₄' }, { value: '1' }, { value: '0' }, { value: '0' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
        [{ value: 'm₅' }, { value: '1' }, { value: '0' }, { value: '1' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: 'm₆' }, { value: '1' }, { value: '1' }, { value: '0' }, { value: '', editable: true, expected: '1', placeholder: '0/1' }],
        [{ value: 'm₇' }, { value: '1' }, { value: '1' }, { value: '1' }, { value: '', editable: true, expected: '0', placeholder: '0/1' }],
      ],
      solutionExplanation:
        'Σm(0, 2, 5, 6) gösterimi m₀, m₂, m₅ ve m₆ satırlarının 1, diğer satırların (ΠM(1, 3, 4, 7)) ise 0 olması gerektiğini belirtir.',
    },
    {
      id: 'w4-q7',
      type: 'simulator-build',
      title: 'Soru 7 · 3-Bit Odd Parity (Tek Eşlik) Üreteci (Canlı Lab)',
      difficulty: 'Orta',
      prompt:
        '3-bit Odd Parity (Tek Eşlik) üreteci olan F(A, B, C) = Σm(1, 2, 4, 7) = A ⊕ B ⊕ C fonksiyonunu simülatörde XOR kapıları kullanarak kurun ve tüm 8 giriş kombinasyonuna karşı doğrulayın.',
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['XOR'],
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
      hint: 'XOR birleşme özelliğine sahip olduğundan 2 adet 2-girişli XOR kapısını kaskat bağlayabilirsiniz: İlk XOR\'a A ve B bağlayın, çıktısını C ile birlikte ikinci XOR\'a verip F LED\'ine iletin.',
      solutionDescription:
        '(A ⊕ B) ⊕ C kaskat devresi toplamda 2 adet XOR kapısı kullanır ve girişlerde tek sayıda 1 olduğunda (001, 010, 100, 111) F çıkışını 1 yapar.',
    },
  ],
};
