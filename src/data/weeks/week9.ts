import type { WeekModule } from '../../types/curriculum';

export const week9: WeekModule = {
  id: 9,
  weekNumber: 9,
  englishTitle: {
    tr: 'Combinational Logic II (BCD Adder, Multiplier, Comparator, Decoders)',
    en: 'Combinational Logic II (BCD Adder, Multiplier, Comparator, Decoders)',
  },
  turkishSubtitle: {
    tr: 'BCD Toplayıcı (+6 Düzeltmesi), İkili Çarpıcı, Büyüklük Karşılaştırıcı ve Kod Çözücüler',
    en: 'BCD Adder (+6 Correction), Binary Multiplier, Magnitude Comparator & Decoders',
  },
  summary: {
    tr: 'Orta Ölçekli Tümleşik (MSI) birleşik devre bloklarını öğrenin: 9\'dan büyük toplamlarda +6 (0110) ekleyen BCD Adder, AND dizisi + Adder bloklu Binary Multiplier, XNOR eşitlik kontrollü 4-bit Magnitude Comparator ve Enable pinli Decoder ağaçları.',
    en: 'Master Medium-Scale Integration (MSI) combinational building blocks: the BCD Adder adding +6 (0110) when sums exceed 9, Binary Multipliers built from AND arrays and adders, 4-bit Magnitude Comparators using XNOR equality terms, and Decoder trees with Enable pins.',
  },
  learningObjectives: [
    {
      tr: 'BCD Adder devresinde C = K + Z₈Z₄ + Z₈Z₂ düzeltme mantığını ve +6 (0110) ekleme nedenini açıklamak',
      en: 'Explain the BCD Adder correction logic C = K + Z₈Z₄ + Z₈Z₂ and why +6 (0110) is added',
    },
    {
      tr: 'N×M bitlik kombinasyonel Binary Multiplier için gereken AND kapısı ve paralel toplayıcı sayısını hesaplamak',
      en: 'Calculate the required AND gates and parallel adders for an N×M-bit combinational Binary Multiplier',
    },
    {
      tr: '4-bit Magnitude Comparator (A > B, A = B, A < B) denklemlerini XNOR eşitlik terimiyle kurmak',
      en: 'Derive 4-bit Magnitude Comparator equations (A > B, A = B, A < B) using XNOR bit-equality terms',
    },
    {
      tr: 'Enable pinli küçük Decoder\'lardan büyük Decoder ağaçları kurmak ve Decoder + OR/NAND ile fonksiyon sentezlemek',
      en: 'Build larger Decoder trees from smaller Enable-equipped Decoders and synthesize Boolean functions using Decoder + OR/NAND',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'TruthTableBuilder',
  recommendedWidgetConfig: {
    variables: 3,
    initialMinterms: [1, 2, 4, 7],
  },
  visualSections: [
    {
      id: 'w9-s1',
      title: {
        tr: '1. BCD Toplayıcı (Decimal Adder) ve "+6 (0110) Düzeltme Mantığı"',
        en: '1. BCD Adder (Decimal Adder) & "+6 (0110) Correction Logic"',
      },
      explanation: {
        tr: 'İki 4-bitlik BCD rakamı (0–9 arası) ve bir giriş eldesi (C_in) 4-bitlik bir Binary Adder ile toplandığında ham toplam 0 ile 19 arasında olabilir. Toplam ≤ 9 (1001) ise ikili sonuç zaten geçerli bir BCD rakamıdır. Ancak toplam 10 ile 19 arasında çıktığında:\n• 10–15 arası ikili kodlar (1010–1111) geçersiz BCD kodudur (elde K = 0 olsa bile).\n• 16–19 arası toplamlar K = 1 taşması üretir fakat kalan 4 bit (0000–0011) gerçek onluk basamağın 6 eksiğidir!\n\nNeden +6 (0110) Eklenir ve Neden C = K + Z₈Z₄ + Z₈Z₂? 4-bitlik ikili sistem mod-16, BCD ise mod-10 çalışır. Aradaki 16 - 10 = 6 kullanılmayan durumu atlamak için ikinci bir 4-bit toplayıcı ham sonuca 0110 (+6) ekler. 0–19 arasındaki 20 olası toplam incelendiğinde: 16–19 için K = 1, 12–15 (1100–1111) için Z₈Z₄ = 1, 10–11 (1010–1011) için Z₈Z₂ = 1 olurken 0–9 (0000–1001) için bu üç terimin tamamı 0 kalır. Böylece düzeltme sinyali tam olarak C = K + Z₈Z₄ + Z₈Z₂ olur!',
        en: 'When two 4-bit BCD digits (0–9) and a carry-in (C_in) are added with a 4-bit Binary Adder, the raw binary sum ranges from 0 to 19. If the sum is ≤ 9 (1001), the binary output is already a valid BCD digit. However, when the sum lies between 10 and 19:\n• Sums 10–15 (1010–1111) are invalid BCD codes (even though carry K = 0).\n• Sums 16–19 produce an output carry K = 1, leaving the lower 4 bits (0000–0011) short by 6 from the true decimal units digit!\n\nWhy +6 (0110) and Why C = K + Z₈Z₄ + Z₈Z₂? A 4-bit binary adder works modulo-16 while BCD works modulo-10, so adding 0110 (+6) skips the 16 - 10 = 6 invalid states. Checking all 20 possible sums: K = 1 covers 16–19, Z₈Z₄ = 1 covers 12–15 (1100–1111), and Z₈Z₂ = 1 covers 10–11 (1010–1011), while all three terms remain 0 for 0–9 (0000–1001). Thus C = K + Z₈Z₄ + Z₈Z₂ is exact!',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'BCD Toplama: Ham İkili Toplam (K Z₈ Z₄ Z₂ Z₁) → +6 Düzeltmeli BCD Çıkışı',
            en: 'BCD Addition: Raw Binary Sum (K Z₈ Z₄ Z₂ Z₁) → +6 Corrected BCD Output',
          },
          headers: [
            { tr: 'Onluk Toplam', en: 'Decimal Sum' },
            { tr: 'Ham İkili (K Z₈ Z₄ Z₂ Z₁)', en: 'Raw Binary (K Z₈ Z₄ Z₂ Z₁)' },
            { tr: 'Düzeltme C = K + Z₈Z₄ + Z₈Z₂', en: 'Correction C = K + Z₈Z₄ + Z₈Z₂' },
            { tr: 'Düzeltilmiş BCD (Cout S₈ S₄ S₂ S₁)', en: 'Corrected BCD (Cout S₈ S₄ S₂ S₁)' },
          ],
          highlightColumn: 2,
          rows: [
            [
              '0 – 9',
              '0 0000 – 0 1001',
              { tr: 'C = 0 (+0000 ekle)', en: 'C = 0 (add +0000)' },
              '0 0000 – 0 1001',
            ],
            [
              '10 (1010)',
              '0 1010 (Z₈=1, Z₂=1)',
              { tr: 'C = 1 (+0110 ekle)', en: 'C = 1 (add +0110)' },
              { tr: '1 0000 (Carry=1, Rakam=0)', en: '1 0000 (Carry=1, Digit=0)' },
            ],
            [
              '12 (1100)',
              '0 1100 (Z₈=1, Z₄=1)',
              { tr: 'C = 1 (+0110 ekle)', en: 'C = 1 (add +0110)' },
              { tr: '1 0010 (Carry=1, Rakam=2)', en: '1 0010 (Carry=1, Digit=2)' },
            ],
            [
              '15 (1111)',
              '0 1111 (Z₈=1, Z₄=1, Z₂=1)',
              { tr: 'C = 1 (+0110 ekle)', en: 'C = 1 (add +0110)' },
              { tr: '1 0101 (Carry=1, Rakam=5)', en: '1 0101 (Carry=1, Digit=5)' },
            ],
            [
              '18 (10010)',
              '1 0010 (K=1)',
              { tr: 'C = 1 (+0110 ekle)', en: 'C = 1 (add +0110)' },
              { tr: '1 1000 (Carry=1, Rakam=8)', en: '1 1000 (Carry=1, Digit=8)' },
            ],
            [
              '19 (10011)',
              '1 0011 (K=1)',
              { tr: 'C = 1 (+0110 ekle)', en: 'C = 1 (add +0110)' },
              { tr: '1 1001 (Carry=1, Rakam=9)', en: '1 1001 (Carry=1, Digit=9)' },
            ],
          ],
        },
      ],
      examTip: {
        tr: 'BCD Adder blok şemasında ikinci toplayıcının alt girişlerine [0, C, C, 0] bağlanır! Böylece C = 0 iken +0000, C = 1 iken otomatik +0110 (+6) eklenmiş olur.',
        en: 'In the BCD Adder block diagram, the lower inputs of the second 4-bit adder are wired to [0, C, C, 0]! That automatically adds +0000 when C = 0 and +0110 (+6) when C = 1.',
      },
    },
    {
      id: 'w9-s2',
      title: {
        tr: '2. İkili Çarpıcı (Binary Multiplier) ve Büyüklük Karşılaştırıcı (Magnitude Comparator)',
        en: '2. Binary Multiplier & Magnitude Comparator',
      },
      explanation: {
        tr: 'İki işaretsiz ikili sayının kombinasyonel çarpımında J bitlik çarpan (multiplier) ile K bitlik çarpılan (multiplicand) için J × K adet AND kapısı kısmi çarpım matrisini (Bᵢ · Aⱼ) üretir ve (J - 1) adet K-bitlik paralel toplayıcı blok bu satırları birer basamak sola kaydırarak toplar (toplam J + K bitlik ürün).\n\n4-Bit Magnitude Comparator: İki 4-bitlik A = A₃A₂A₁A₀ ve B = B₃B₂B₁B₀ sayısını karşılaştırırken önce her bit için XNOR eşitlik terimi tanımlanır: xᵢ = Aᵢ ⊙ Bᵢ = AᵢBᵢ + Aᵢ\'Bᵢ\'.\n• Neden Bu Denklem Çalışır? MSB\'den (bit 3) LSB\'ye (bit 0) tarama yapılır: Eğer üst bitler farklıysa ilgili xᵢ = 0 olur ve kendisinden daha düşük tüm terimleri maskeleyip devre dışı bırakır. Ancak kendinden yüksek tüm bitler eşitse (x₃... = 1) sıradaki ilk farklı bit (AᵢBᵢ\' veya Aᵢ\'Bᵢ) büyüklük kararını verir!\n• Eşitlik (A = B): Tüm bitler eşit olmalıdır ⇒ (A = B) = x₃ · x₂ · x₁ · x₀.',
        en: 'In a combinational unsigned binary multiplier with a J-bit multiplier and a K-bit multiplicand, J × K AND gates generate the partial-product array (Bᵢ · Aⱼ), and (J - 1) K-bit parallel adders sum the shifted rows to produce a (J + K)-bit product.\n\n4-Bit Magnitude Comparator: To compare A = A₃A₂A₁A₀ and B = B₃B₂B₁B₀, we first define the XNOR bit-equality signal for each position: xᵢ = Aᵢ ⊙ Bᵢ = AᵢBᵢ + Aᵢ\'Bᵢ\'.\n• Why This Equation Works: Scanning from MSB (bit 3) to LSB (bit 0), if a higher bit disagrees, its xᵢ = 0 masks out all lower-bit terms. Only when all more significant bits are equal (x₃... = 1) does the first differing bit position (AᵢBᵢ\' or Aᵢ\'Bᵢ) decide the comparison!\n• Equality (A = B): All bits must match ⇒ (A = B) = x₃ · x₂ · x₁ · x₀.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'J × K Bit Kombinasyonel Binary Multiplier Donanım Ölçekleme Tablosu',
            en: 'J × K Bit Combinational Binary Multiplier Hardware Scaling Table',
          },
          headers: [
            { tr: 'Çarpıcı Boyutu (J × K)', en: 'Multiplier Size (J × K)' },
            { tr: 'AND Kapısı (J × K)', en: 'AND Gates (J × K)' },
            { tr: 'Paralel Toplayıcı', en: 'Parallel Adders' },
            { tr: 'Çıkış Biti (J + K)', en: 'Output Bits (J + K)' },
          ],
          highlightColumn: 2,
          rows: [
            ['2 × 2', '4 AND', { tr: '2 adet Half Adder (özel durum)', en: '2 Half Adders (special case)' }, '4 bit (C₃..C₀)'],
            ['3 × 4 (J=3, K=4)', '12 AND', { tr: '2 adet 4-bit Adder (J - 1)', en: '2 × 4-bit Adders (J - 1)' }, '7 bit (C₆..C₀)'],
            ['4 × 4 (J=4, K=4)', '16 AND', { tr: '3 adet 4-bit Adder (J - 1)', en: '3 × 4-bit Adders (J - 1)' }, '8 bit (C₇..C₀)'],
          ],
        },
        {
          kind: 'steps',
          caption: {
            tr: '4-Bit Magnitude Comparator Karşılaştırma Hiyerarşisi (MSB → LSB)',
            en: '4-Bit Magnitude Comparator Comparison Hierarchy (MSB → LSB)',
          },
          steps: [
            {
              label: { tr: 'A = B Çıkışı', en: 'A = B Output' },
              badge: { tr: '4-Girişli AND', en: '4-Input AND' },
              detail: {
                tr: '(A = B) = x₃ x₂ x₁ x₀\nBurada xᵢ = (Aᵢ ⊕ Bᵢ)\' XNOR kapısıdır.',
                en: '(A = B) = x₃ x₂ x₁ x₀\nWhere xᵢ = (Aᵢ ⊕ Bᵢ)\' is the XNOR equality gate.',
              },
            },
            {
              label: { tr: 'A > B Çıkışı', en: 'A > B Output' },
              badge: { tr: 'MSB Önceliği', en: 'MSB Priority' },
              detail: "A₃B₃' + x₃A₂B₂' + x₃x₂A₁B₁' + x₃x₂x₁A₀B₀'",
            },
            {
              label: { tr: 'A < B Çıkışı', en: 'A < B Output' },
              badge: { tr: 'Simetrik Yapı', en: 'Symmetric Form' },
              detail: "A₃'B₃ + x₃A₂'B₂ + x₃x₂A₁'B₁ + x₃x₂x₁A₀'B₀",
            },
          ],
        },
      ],
      examTip: {
        tr: 'J × K bitlik Binary Multiplier sorularında daima J × K adet AND kapısı ve (J - 1) adet K-bitlik Adder gerektiğini (veya 2×2 için özel 2 adet Half Adder yettiğini) unutmayın!',
        en: 'For J × K-bit Binary Multiplier problems, remember that it always requires J × K AND gates and (J - 1) K-bit Adders (while a special 2×2 multiplier only needs 2 Half Adders)!',
      },
    },
    {
      id: 'w9-s3',
      title: {
        tr: '3. Kod Çözücüler (Decoders), Enable Pini ve Fonksiyon Sentezi',
        en: '3. Decoders, Enable Pin & Function Synthesis',
      },
      explanation: {
        tr: 'Bir n-to-2ⁿ Decoder, n-bitlik ikili giriş kodunu 2ⁿ adet karşılıklı dışlayıcı (mutually exclusive) çıkış hattından yalnızca birini aktif ederek çözer. Çünkü her çıkış hattı, girişlerin benzersiz bir AND çarpımına (Minterm mᵢ) karşılık gelir!\n\n• Ağaç Genişletme (Decoder Expansion): Enable (E) girişi kullanılarak küçük Decoder\'lardan daha büyük Decoder\'lar inşa edilebilir: MSB biti bir Inverter ile iki 3-to-8 Decoder\'ın Enable pinine bağlandığında 4-to-16 Decoder oluşur; aynı şekilde 1 adet ön-kod çözücü 2-to-4 Decoder ve 4 adet çıkış katmanı 2-to-4 Decoder (toplam 5 adet) ek kapısız 4-to-16 Decoder oluşturur.\n• 💡 Pratik Fonksiyon Sentez Kuralı: Active-High çıkışlı bir Decoder\'ın minterm uçları OR kapısıyla toplanarak herhangi bir Boole fonksiyonu elde edilir. Eğer Decoder Active-Low (baloncuklu, terslenmiş mᵢ\') çıkışa sahipse, OR yerine NAND kapısı kullanılır (DeMorgan gereği NAND(m₁\', m₂\') = m₁ + m₂)!',
        en: 'An n-to-2ⁿ Decoder converts an n-bit binary input into 2ⁿ mutually exclusive output lines, activating at most one line at a time because each output line implements one unique canonical Minterm (mᵢ)!\n\n• Decoder Expansion Trees: Using Enable (E) inputs, smaller Decoders cascade into larger ones: driving two 3-to-8 Decoder Enable pins with the MSB and its complement forms a 4-to-16 Decoder; similarly, 1 pre-decoder 2-to-4 Decoder driving 4 downstream 2-to-4 Decoders (5 total) builds a 4-to-16 Decoder with zero extra gates.\n• 💡 Quick Synthesis Rule: Any Boolean function can be realized by connecting the active minterms of an Active-High Decoder to an OR gate. If the Decoder has Active-Low (bubbled, complemented mᵢ\') outputs, replace the OR gate with a NAND gate (by DeMorgan, NAND(m₁\', m₂\') = m₁ + m₂)!',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Decoder Çıkış Polaritesi ve Fonksiyon Sentez / Genişletme Özeti',
            en: 'Decoder Output Polarity, Function Synthesis & Tree Expansion Summary',
          },
          headers: [
            { tr: 'Decoder Türü / Yapısı', en: 'Decoder Type / Structure' },
            { tr: 'Çıkış Hattı Anlamı', en: 'Output Line Meaning' },
            { tr: 'Fonksiyon Toplama Kapısı', en: 'Combining Gate for F = Σm' },
          ],
          highlightColumn: 2,
          rows: [
            [
              { tr: 'Active-High Çıkışlı Decoder', en: 'Active-High Output Decoder' },
              { tr: 'Dᵢ = mᵢ (Aktif iken 1)', en: 'Dᵢ = mᵢ (1 when active)' },
              { tr: 'OR Kapısı (veya çok minterm varsa F\' için NOR)', en: 'OR Gate (or NOR on 0-minterms for F\')' },
            ],
            [
              { tr: 'Active-Low Çıkışlı Decoder', en: 'Active-Low Output Decoder' },
              { tr: 'Dᵢ\' = mᵢ\' (Aktif iken 0)', en: 'Dᵢ\' = mᵢ\' (0 when active)' },
              { tr: 'NAND Kapısı [DeMorgan: (Π mᵢ\')\' = Σ mᵢ]', en: 'NAND Gate [DeMorgan: (Π mᵢ\')\' = Σ mᵢ]' },
            ],
            [
              { tr: '4-to-16 Ağaç (3-to-8 × 2)', en: '4-to-16 Tree (3-to-8 × 2)' },
              { tr: 'MSB (A₃) Enable seçimini yapar', en: 'MSB (A₃) selects upper/lower bank' },
              { tr: '2 × (3-to-8) + 1 × NOT kapısı', en: '2 × (3-to-8) + 1 × NOT gate' },
            ],
            [
              { tr: '4-to-16 Ağaç (2-to-4 × 5)', en: '4-to-16 Tree (2-to-4 × 5)' },
              { tr: 'Üst 2-to-4 (A₃A₂), 4 alt bloğu sürer', en: 'Top 2-to-4 (A₃A₂) drives 4 Enable pins' },
              { tr: '5 × (2-to-4), ekstra kapı gerekmez', en: '5 × (2-to-4), zero extra gates' },
            ],
          ],
        },
      ],
      widget: 'TruthTableBuilder',
      widgetConfig: {
        variables: 3,
        initialMinterms: [1, 2, 4, 7],
      },
      examTip: {
        tr: 'Active-Low çıkışlı Decoder + NAND kapısı birleşimi, Active-High çıkışlı Decoder + OR kapısı birleşimiyle birebir aynı Sum of Minterms işlevini gerçekleştirir!',
        en: 'An Active-Low output Decoder + NAND gate realizes the exact same Sum of Minterms function as an Active-High output Decoder + OR gate!',
      },
    },
  ],
  questions: [
    {
      id: 'w9-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · BCD Adder +6 Düzeltme Hesabı (Mano 4.10)',
        en: 'Question 1 · BCD Adder +6 Correction Calculation (Mano 4.10)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Bir BCD Adder devresine A = 7 (0111) ve B = 8 (1000) girişleri (Cin = 0) uygulandığında, ilk 4-bit toplayıcının ham çıkışı (K, Z₈ Z₄ Z₂ Z₁), düzeltme sinyali C ve nihai düzeltilmiş BCD çıkışı nedir?',
        en: 'When A = 7 (0111) and B = 8 (1000) with Cin = 0 are applied to a BCD Adder, what are the raw output (K, Z₈ Z₄ Z₂ Z₁) of the first 4-bit adder, the correction signal C, and the final corrected BCD output?',
      },
      options: [
        {
          tr: 'Ham: (0, 1111) | C = 1 | Nihai: Carry Out = 1, BCD = 0101 (15)',
          en: 'Raw: (0, 1111) | C = 1 | Final: Carry Out = 1, BCD = 0101 (15)',
        },
        {
          tr: 'Ham: (1, 0101) | C = 0 | Nihai: Carry Out = 1, BCD = 0101 (15)',
          en: 'Raw: (1, 0101) | C = 0 | Final: Carry Out = 1, BCD = 0101 (15)',
        },
        {
          tr: 'Ham: (0, 1111) | C = 0 | Nihai: Carry Out = 0, BCD = 1111 (15)',
          en: 'Raw: (0, 1111) | C = 0 | Final: Carry Out = 0, BCD = 1111 (15)',
        },
        {
          tr: 'Ham: (0, 1101) | C = 1 | Nihai: Carry Out = 1, BCD = 0011 (13)',
          en: 'Raw: (0, 1101) | C = 1 | Final: Carry Out = 1, BCD = 0011 (13)',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: İlk 4-Bit İkili Toplayıcı Çıkışı',
            en: 'Step 1: First 4-Bit Binary Adder Output',
          },
          detail: {
            tr: '0111 (7) + 1000 (8) = 1111 (15). Taşma olmadığı için K = 0, Z₈Z₄Z₂Z₁ = 1111.',
            en: '0111 (7) + 1000 (8) = 1111 (15). Since there is no 4-bit overflow, K = 0 and Z₈Z₄Z₂Z₁ = 1111.',
          },
        },
        {
          title: {
            tr: 'Adım 2: Düzeltme Koşulu C Hesabı',
            en: 'Step 2: Correction Condition C Calculation',
          },
          detail: {
            tr: 'C = K + Z₈Z₄ + Z₈Z₂ = 0 + (1)(1) + (1)(1) = 1 ⇒ +0110 (+6) ekleme aktif!',
            en: 'C = K + Z₈Z₄ + Z₈Z₂ = 0 + (1)(1) + (1)(1) = 1 ⇒ +0110 (+6) correction active!',
          },
        },
        {
          title: {
            tr: 'Adım 3: İkinci 4-Bit Toplayıcı (+0110)',
            en: 'Step 3: Second 4-Bit Adder (+0110)',
          },
          detail: {
            tr: '1111 + 0110 = 1 0101 ⇒ Carry Out = 1 (onlar basamağı), BCD = 0101 (birler basamağı 5) → 15.',
            en: '1111 + 0110 = 1 0101 ⇒ Carry Out = 1 (tens digit), BCD = 0101 (units digit 5) → 15.',
          },
        },
      ],
    },
    {
      id: 'w9-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · 4×3 Binary Multiplier Donanım Maliyeti',
        en: 'Question 2 · 4×3 Binary Multiplier Hardware Cost',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '4-bitlik bir çarpılan (multiplicand) ile 3-bitlik bir çarpanı (multiplier) çarpan kombinasyonel Binary Multiplier devresinde toplam kaç adet AND kapısı ve kaç adet 4-bitlik paralel toplayıcı blok gerekir?',
        en: 'In a combinational Binary Multiplier multiplying a 4-bit multiplicand by a 3-bit multiplier, how many AND gates and how many 4-bit parallel adder blocks are required in total?',
      },
      options: [
        {
          tr: '12 adet AND kapısı ve 2 adet 4-bit paralel toplayıcı blok',
          en: '12 AND gates and 2 4-bit parallel adder blocks',
        },
        {
          tr: '7 adet AND kapısı ve 3 adet 4-bit paralel toplayıcı blok',
          en: '7 AND gates and 3 4-bit parallel adder blocks',
        },
        {
          tr: '12 adet AND kapısı ve 3 adet 4-bit paralel toplayıcı blok',
          en: '12 AND gates and 3 4-bit parallel adder blocks',
        },
        {
          tr: '16 adet AND kapısı ve 2 adet 4-bit paralel toplayıcı blok',
          en: '16 AND gates and 2 4-bit parallel adder blocks',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Kısmi Çarpım AND Matrisi',
            en: 'Step 1: Partial-Product AND Array',
          },
          detail: {
            tr: '4 × 3 bitlik çarpımda her bit çifti için bir AND gerekir: 4 × 3 = 12 adet AND kapısı.',
            en: 'For a 4 × 3 multiplication, one AND gate is needed per bit pair: 4 × 3 = 12 AND gates.',
          },
        },
        {
          title: {
            tr: 'Adım 2: Paralel Toplayıcı Blok Sayısı',
            en: 'Step 2: Number of Parallel Adder Blocks',
          },
          detail: {
            tr: '3 adet 4-bitlik kısmi çarpım satırını toplamak için (3 - 1) = 2 adet 4-bitlik paralel toplayıcı blok yeterlidir.',
            en: 'Summing 3 rows of 4-bit partial products requires (3 - 1) = 2 4-bit parallel adder blocks.',
          },
        },
      ],
    },
    {
      id: 'w9-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · 4-Bit Magnitude Comparator Denklemi (Mano 4.13)',
        en: 'Question 3 · 4-Bit Magnitude Comparator Equation (Mano 4.13)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: '4-bitlik bir Magnitude Comparator devresinde bit eşitliği xᵢ = Aᵢ ⊙ Bᵢ olmak üzere (A > B) çıkışının tam Boole ifadesi nedir?',
        en: 'In a 4-bit Magnitude Comparator with bit-equality terms xᵢ = Aᵢ ⊙ Bᵢ, what is the full Boolean expression for the (A > B) output?',
      },
      options: [
        "A₃B₃' + x₃A₂B₂' + x₃x₂A₁B₁' + x₃x₂x₁A₀B₀'",
        "A₃'B₃ + x₃A₂'B₂ + x₃x₂A₁'B₁ + x₃x₂x₁A₀'B₀",
        "A₃B₃' + A₂B₂' + A₁B₁' + A₀B₀'",
        'x₃x₂x₁x₀',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: En Yüksek Anlamlı Bitten (MSB) Başla',
            en: 'Step 1: Start from the Most Significant Bit (MSB)',
          },
          detail: {
            tr: "A > B olması için ya A₃=1, B₃=0 olmalı (A₃B₃'), ya da 3. bitler eşitken (x₃=1) A₂=1, B₂=0 olmalı (x₃A₂B₂') şeklinde LSB'ye kadar inilir.",
            en: "For A > B, either A₃=1, B₃=0 (A₃B₃'), or bit 3 is equal (x₃=1) and A₂=1, B₂=0 (x₃A₂B₂'), continuing down to the LSB.",
          },
        },
      ],
    },
    {
      id: 'w9-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · Decoder Ağacı ile 4-to-16 Genişletme (💡 Pratik Soru)',
        en: 'Question 4 · 4-to-16 Expansion with a Decoder Tree (💡 Practical)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'Enable girişine sahip 2-to-4 Decoder blokları kullanılarak (ekstra mantık kapısı kullanmadan) bir 4-to-16 Decoder inşa etmek için toplam kaç adet 2-to-4 Decoder gerekir?',
        en: 'How many 2-to-4 Decoder blocks with Enable inputs are required in total (with no extra logic gates) to construct a 4-to-16 Decoder?',
      },
      options: [
        { tr: '5 adet', en: '5 decoders' },
        { tr: '4 adet', en: '4 decoders' },
        { tr: '8 adet', en: '8 decoders' },
        { tr: '6 adet', en: '6 decoders' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: 2 Seviyeli Ağaç Yapısını Kur',
            en: 'Step 1: Construct the 2-Level Tree Structure',
          },
          detail: {
            tr: '• 1. Seviye (Ön Kod Çözücü): 1 adet 2-to-4 Decoder, en anlamlı iki biti (A₃, A₂) çözer ve 4 çıkışını alt blokların Enable uçlarına verir.\n• 2. Seviye (Çıkış Katmanı): 4 adet 2-to-4 Decoder, (A₁, A₀) bitlerini alarak toplam 4 × 4 = 16 çıkış üretir.\nToplam: 1 + 4 = 5 adet.',
            en: '• Level 1 (Pre-decoder): 1 2-to-4 Decoder decodes the two MSBs (A₃, A₂) and drives the Enable pins of 4 downstream decoders.\n• Level 2 (Output layer): 4 2-to-4 Decoders take (A₁, A₀) to produce 4 × 4 = 16 outputs.\nTotal: 1 + 4 = 5 decoders.',
          },
        },
      ],
    },
    {
      id: 'w9-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · Active-Low Decoder ile Full Adder Sentezi (Mano 4.21)',
        en: 'Question 5 · Full Adder Synthesis via Active-Low Decoder (Mano 4.21)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'Active-Low (aktif-0) çıkışlı bir 3-to-8 Decoder kullanarak Tam Toplayıcı (Full Adder: S = Σ(1,2,4,7), C = Σ(3,5,6,7)) devresi kurmak için Decoder çıkışlarına hangi kapılar bağlanmalıdır?',
        en: 'To implement a Full Adder (S = Σ(1,2,4,7), C = Σ(3,5,6,7)) using an Active-Low output 3-to-8 Decoder, which gates should be connected to the Decoder outputs?',
      },
      options: [
        {
          tr: 'İki adet 4-girişli NAND kapısı',
          en: 'Two 4-input NAND gates',
        },
        {
          tr: 'İki adet 4-girişli OR kapısı',
          en: 'Two 4-input OR gates',
        },
        {
          tr: 'İki adet 4-girişli NOR kapısı',
          en: 'Two 4-input NOR gates',
        },
        {
          tr: 'İki adet 4-girişli AND kapısı',
          en: 'Two 4-input AND gates',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Active-Low Çıkışların Matematiksel Anlamı',
            en: 'Step 1: Mathematical Meaning of Active-Low Outputs',
          },
          detail: {
            tr: "Active-Low Decoder çıkışları mᵢ' (minterm tümleyeni) üretir. Bu çıkışları NAND kapısına bağlamak DeMorgan yasası gereği (m₁'·m₂'·m₄'·m₇')' = m₁ + m₂ + m₄ + m₇ üretir! Dolayısıyla S ve C için iki adet 4-girişli NAND kapısı gerekir.",
            en: "Active-Low Decoder outputs produce mᵢ' (complemented minterms). Feeding them into a NAND gate yields (m₁'·m₂'·m₄'·m₇')' = m₁ + m₂ + m₄ + m₇ by DeMorgan's Law! Thus S and C require two 4-input NAND gates.",
          },
        },
      ],
    },
    {
      id: 'w9-q6',
      type: 'interactive-table',
      title: {
        tr: "Soru 6 · Active-Low Enable (E') 2-to-4 Decoder Doğruluk Tablosu",
        en: "Question 6 · Active-Low Enable (E') 2-to-4 Decoder Truth Table",
      },
      difficulty: 'Temel',
      prompt: {
        tr: "Active-Low Enable (E') girişine sahip bir 2-to-4 Decoder'ın (E' = 0 iken aktif, E' = 1 iken tüm çıkışlar 0; çıkışlar Active-High) doğruluk tablosunu doldurun.",
        en: "Complete the truth table for a 2-to-4 Decoder with an Active-Low Enable (E') input (active when E' = 0; all outputs 0 when E' = 1; outputs are Active-High).",
      },
      headers: ["E'", 'A1', 'A0', 'D0', 'D1', 'D2', 'D3'],
      rows: [
        [
          { value: '1' }, { value: '0' }, { value: '0' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '1' }, { value: '1' }, { value: '1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '0' }, { value: '0' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '0' }, { value: '1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '1' }, { value: '0' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '0' }, { value: '1' }, { value: '1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
      ],
      solutionExplanation: {
        tr: "E' = 1 iken Decoder devre dışıdır (tüm çıkışlar 0). E' = 0 iken A1A0 ikili değerine karşılık gelen D0..D3 çıkışlarından yalnızca biri 1 olur.",
        en: "When E' = 1, the Decoder is disabled (all outputs are 0). When E' = 0, exactly one output among D0..D3 corresponding to binary A1A0 becomes 1.",
      },
    },
    {
      id: 'w9-q7',
      type: 'simulator-build',
      title: {
        tr: 'Soru 7 · 2-to-4 Decoder + OR Kapısı ile XOR Fonksiyonu (Canlı Lab)',
        en: 'Question 7 · XOR Function with 2-to-4 Decoder + OR Gate (Live Lab)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Simülatörde yerleşik "2-to-4 Decoder" bloğunu ve 1 adet "OR" kapısını kullanarak F(A, B) = Σ(1, 2) (XOR fonksiyonu) devresini kurun. Not: Simülatördeki Decoder’ın Active-High E (Enable) girişi boş bırakıldığında otomatik olarak E = 1 kabul edilir (isterseniz 1 konumunda bir Toggle Switch de bağlayabilirsiniz).',
        en: 'Use the built-in "2-to-4 Decoder" block and 1 "OR" gate in the simulator to build F(A, B) = Σ(1, 2) (XOR function). Note: The simulator Decoder’s Active-High E (Enable) pin automatically defaults to E = 1 when left unwired (or you may optionally wire a Toggle Switch set to 1).',
      },
      inputs: ['A', 'B'],
      outputs: ['F'],
      allowedComponents: ['DECODER_2TO4', 'OR'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1 }, outputs: { F: 0 } },
      ],
      hint: {
        tr: 'A girişini Decoder\'ın A1 pinine, B girişini A0 pinine bağlayın (E pinini boş bırakabilirsiniz; simülatörde boşta E = 1’dir). Decoder\'ın D1 ve D2 çıkışlarını OR kapısına verip çıkışı F LED\'ine bağlayın.',
        en: 'Connect input A to the Decoder’s A1 pin and B to A0 (you can leave pin E unwired since E defaults to 1 in the simulator). Wire Decoder outputs D1 and D2 into the OR gate and connect its output to LED F.',
      },
      solutionDescription: {
        tr: 'Enable = 1 iken 2-to-4 Decoder tüm 4 mintermi (D0=m₀, D1=m₁, D2=m₂, D3=m₃) üretir. D1 ve D2 çıkışlarının bir OR kapısıyla toplanması F = m₁ + m₂ = A ⊕ B fonksiyonunu oluşturur.',
        en: 'When Enable = 1, the 2-to-4 Decoder generates all 4 minterms (D0=m₀, D1=m₁, D2=m₂, D3=m₃). OR-ing outputs D1 and D2 produces F = m₁ + m₂ = A ⊕ B.',
      },
    },
  ],
};
