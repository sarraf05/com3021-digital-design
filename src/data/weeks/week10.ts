import type { WeekModule } from '../../types/curriculum';

export const week10: WeekModule = {
  id: 10,
  weekNumber: 10,
  englishTitle: {
    tr: 'Combinational Logic III (Encoders, MUX/DEMUX, Three-State)',
    en: 'Combinational Logic III (Encoders, MUX/DEMUX, Three-State)',
  },
  turkishSubtitle: {
    tr: 'Öncelikli Kodlayıcılar, Multiplexer ile Fonksiyon Sentezi, DEMUX ve Üç Durumlu Tamponlar',
    en: 'Priority Encoders, Multiplexer Function Synthesis, DEMUX & Three-State Buffers',
  },
  summary: {
    tr: 'Decoder\'ın tersi olan Encoder ve çakışmaları çözen Priority Encoder tasarımını, MUX (Multiplexer) veri seçicileriyle Pratik Tablo Yöntemi kullanarak Boole fonksiyonu sentezlemeyi, DEMUX özdeşliğini ve Three-State Buffer veri yolu paylaşımını öğrenin.',
    en: 'Learn Encoder design (the inverse of a Decoder) and Priority Encoders that resolve simultaneous inputs, Boolean function synthesis with Multiplexers (MUX) via the Quick Implementation Table method, Decoder–DEMUX equivalence, and shared bus design using Three-State Buffers.',
  },
  learningObjectives: [
    {
      tr: '4-to-2 Priority Encoder (D₃ > D₂ > D₁ > D₀) ve Valid (V) çıkış denklemlerini K-Map ile türetmek',
      en: 'Derive 4-to-2 Priority Encoder (D₃ > D₂ > D₁ > D₀) and Valid (V) output equations via K-Maps',
    },
    {
      tr: 'Pratik MUX Tablo Yöntemini kullanarak n değişkenli fonksiyonları 2ⁿ⁻¹×1 MUX ile gerçekleştirmek',
      en: 'Implement n-variable Boolean functions using a 2ⁿ⁻¹×1 MUX via the Quick Implementation Table method',
    },
    {
      tr: 'Verilen bir MUX devresinden geriye doğru kanonik minterm toplamını (Σm) okumak',
      en: 'Read the canonical sum of minterms (Σm) backward from a given MUX circuit',
    },
    {
      tr: 'Enable pinli Decoder ↔ DEMUX özdeşliğini ve Three-State Bus Contention riskini açıklamak',
      en: 'Explain Enable-equipped Decoder ↔ DEMUX equivalence and the risk of Three-State Bus Contention',
    },
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
      title: {
        tr: '1. Kodlayıcılar (Encoders) ve Öncelikli Kodlayıcılar (Priority Encoders)',
        en: '1. Encoders & Priority Encoders',
      },
      explanation: {
        tr: 'Encoder, Decoder\'ın tam tersi işlemi yapar: 2ⁿ giriş hattından hangisinin "1" olduğunu n-bitlik ikili koda dönüştürür. Ancak standart Encoder aynı anda birden fazla giriş "1" olduğunda hatalı kod üretir ve "hiçbir giriş 1 değil" (0000) durumuyla "D₀ = 1" (0001) durumunu ayırt edemez.\n\nÇözüm — 4-to-2 Priority Encoder (D₃ > D₂ > D₁ > D₀): En yüksek indekse öncelik verilir ve "en az bir giriş aktif" olduğunu bildiren Valid (V) çıkışı eklenir.\n• Neden y = D₃ + D₁D₂\' (yalnızca D₁D₂\' değil)? 4 değişkenli K-Map çizildiğinde D₃ = 1 olan 8 hücrenin tamamı (m₈–m₁₅) y = 1 ve 0000 hücresi (m₀) X olur; bu sayede D₃\'ün altındaki (D₃=1, D₂=0, D₁=1) hücreleri (m₁₀, m₁₁) D₃=0 grubu (m₂, m₃) ile 4\'lü grup oluşturarak D₁D₂\' terimine sadeleşir!\n• x = D₂ + D₃  |  y = D₃ + D₁D₂\'  |  V = D₀ + D₁ + D₂ + D₃',
        en: 'An Encoder performs the inverse operation of a Decoder: it converts whichever of the 2ⁿ input lines is "1" into an n-bit binary code. However, a plain Encoder fails when multiple inputs are "1" simultaneously and cannot distinguish "all inputs 0" (0000) from "D₀ = 1" (0001).\n\nSolution — 4-to-2 Priority Encoder (D₃ > D₂ > D₁ > D₀): Priority goes to the highest active index, and a Valid (V) indicator signals whether any input is active.\n• Why y = D₃ + D₁D₂\' (instead of just D₃ + D₁D₂\'D₀...)? On the 4-variable K-Map, all 8 cells with D₃ = 1 (m₈–m₁₅) yield y = 1 and cell 0000 is X. Overlapping cells (D₃=1, D₂=0, D₁=1 → m₁₀, m₁₁) with (D₃=0, D₂=0, D₁=1 → m₂, m₃) forms a 4-cell quad that simplifies directly to D₁D₂\'!\n• x = D₂ + D₃  |  y = D₃ + D₁D₂\'  |  V = D₀ + D₁ + D₂ + D₃',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: '4-to-2 Priority Encoder Doğruluk Tablosu (X = Don\'t Care)',
            en: '4-to-2 Priority Encoder Truth Table (X = Don\'t-Care)',
          },
          headers: ['D₃', 'D₂', 'D₁', 'D₀', 'x (MSB)', 'y (LSB)', 'V (Valid)'],
          highlightColumn: 6,
          rows: [
            ['0', '0', '0', '0', 'X', 'X', { tr: '0 (Geçersiz)', en: '0 (Invalid)' }],
            ['0', '0', '0', '1', '0', '0', { tr: '1 (D₀ aktif)', en: '1 (D₀ active)' }],
            ['0', '0', '1', 'X', '0', '1', { tr: '1 (D₁ öncelikli)', en: '1 (D₁ priority)' }],
            ['0', '1', 'X', 'X', '1', '0', { tr: '1 (D₂ öncelikli)', en: '1 (D₂ priority)' }],
            ['1', 'X', 'X', 'X', '1', '1', { tr: '1 (D₃ en yüksek)', en: '1 (D₃ highest)' }],
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'priority-encoder-4to2',
          caption: {
            tr: 'Vektörel Devre Şeması: 4-to-2 Priority Encoder (D₃ > D₂ > D₁ > D₀) ve Valid (V)',
            en: 'Vector Circuit Schematic: 4-to-2 Priority Encoder (D₃ > D₂ > D₁ > D₀) & Valid (V)',
          },
          equation: "x = D₂ + D₃,   y = D₃ + D₁·D₂',   V = D₀ + D₁ + D₂ + D₃",
          summary: {
            tr: 'Birden fazla giriş aynı anda 1 olsa bile yalnızca en yüksek indeksli aktif giriş kodlanır; hiçbir giriş aktif değilse V = 0 uyarısı verir.',
            en: 'Even when multiple inputs assert simultaneously, only the highest-priority active index is encoded; V = 0 flags no active inputs.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      examTip: {
        tr: 'Priority Encoder doğruluk tablosunda V = 0 iken x ve y çıkışları Don\'t-Care (X) kabul edilir; bu sayede K-Map sadeleştirmesinde x ve y ifadeleri çok daha küçük çıkar!',
        en: 'In the Priority Encoder truth table, x and y are Don\'t-Cares (X) when V = 0, allowing K-Map simplification to yield much smaller expressions for x and y!',
      },
    },
    {
      id: 'w10-s2',
      title: {
        tr: '2. Multiplexer (MUX), DEMUX ve Pratik MUX Tablo Yöntemi',
        en: '2. Multiplexers (MUX), DEMUX & Quick MUX Implementation Table',
      },
      explanation: {
        tr: 'Multiplexer (MUX — Veri Seçici), 2ⁿ veri girişinden birini n adet seçme (Select) hattının değerine göre tek bir çıkış hattına yönlendirir. Ayrıca herhangi bir n değişkenli Boole fonksiyonunu 2ⁿ⁻¹ × 1 MUX kullanarak ek kapı (yalnızca kalan değişkenin tersi gerekirse 1 NOT) ile gerçekleştirebiliriz.\n\n• Neden Pratik Tablo Yöntemi Çalışır? Seçiciler (S₂S₁S₀ = ABC) sabitlendiğinde her I_k sütunu aslında F fonksiyonunun iki ardışık mintermi (2k ve 2k+1) üzerindeki Shannon açılımıdır: I_k içinde yalnızca D\' (=0) varsa D\', yalnızca D (=1) varsa D, ikisi de varsa (D\' + D) = 1, hiçbiri yoksa 0 bağlanır.\n\n💡 Pratik MUX Uygulama Tablosu (F(A, B, C, D) için 8×1 MUX, S₂S₁S₀ = A B C):\n• 8 giriş (I₀..I₇) sütun başlığı olarak yazılır.\n• Üst satıra son değişkenin tümleyeni (D\': çift mintermler 0,2,4,6,8,10,12,14), alt satıra kendisi (D: tek mintermler 1,3,5,7,9,11,13,15) yerleştirilir.\n• Fonksiyonda bulunan mintermler işaretlenir ve her sütun okunur: Boş ⇒ 0 | İkisi dolu ⇒ 1 | Yalnız üst ⇒ D\' | Yalnız alt ⇒ D.',
        en: 'A Multiplexer (MUX — Data Selector) routes one of 2ⁿ data inputs to a single output line under n Select lines. Any n-variable Boolean function can also be realized using a 2ⁿ⁻¹ × 1 MUX (plus at most a NOT gate if the residual variable must be inverted).\n\n• Why the Quick Table Works: Fixing select lines (S₂S₁S₀ = ABC) evaluates Shannon expansion across each pair of adjacent minterms (2k and 2k+1) inside column I_k: if only D=0 is active we wire D\', if only D=1 we wire D, if both are active (D\' + D) = 1, and if neither is active we wire 0.\n\n💡 Quick MUX Implementation Table (F(A, B, C, D) on an 8×1 MUX with S₂S₁S₀ = A B C):\n• List the 8 data inputs (I₀..I₇) as column headers.\n• Place D\' (even minterms 0,2,4,6,8,10,12,14) in the top row and D (odd minterms 1,3,5,7,9,11,13,15) in the bottom row.\n• Mark minterms in F and read each column: Neither ⇒ 0 | Both ⇒ 1 | Top only ⇒ D\' | Bottom only ⇒ D.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Pratik 8×1 MUX Eşleştirme Örneği: F(A,B,C,D) = Σ(1, 3, 4, 11, 12, 13, 14, 15)',
            en: 'Quick 8×1 MUX Mapping Example: F(A,B,C,D) = Σ(1, 3, 4, 11, 12, 13, 14, 15)',
          },
          headers: [
            { tr: 'Sütun (ABC)', en: 'Column (ABC)' },
            'I₀ (000)',
            'I₁ (001)',
            'I₂ (010)',
            'I₃ (011)',
            'I₄ (100)',
            'I₅ (101)',
            'I₆ (110)',
            'I₇ (111)',
          ],
          rows: [
            [
              { tr: "D' (Çift m)", en: "D' (Even m)" },
              '0',
              '2',
              '[4] ★',
              '6',
              '8',
              '10',
              '[12] ★',
              '[14] ★',
            ],
            [
              { tr: 'D (Tek m)', en: 'D (Odd m)' },
              '[1] ★',
              '[3] ★',
              '5',
              '7',
              '9',
              '[11] ★',
              '[13] ★',
              '[15] ★',
            ],
            [
              { tr: 'MUX Girişi', en: 'MUX Input' },
              'D',
              'D',
              "D'",
              '0',
              '0',
              'D',
              '1',
              '1',
            ],
          ],
        },
        {
          kind: 'steps',
          caption: {
            tr: 'DEMUX ve Decoder Yapısal Özdeşliği',
            en: 'Structural Equivalence of DEMUX and Decoder',
          },
          steps: [
            {
              label: { tr: '1-to-2ⁿ DEMUX İşlevi', en: '1-to-2ⁿ DEMUX Function' },
              badge: { tr: 'Tek → Çoklu', en: 'One → Many' },
              detail: {
                tr: 'Tek bir Data girişini seçme (Select) bitlerinin gösterdiği 2ⁿ çıkıştan yalnızca birine aktarır.',
                en: 'Routes a single Data input to whichever of the 2ⁿ outputs is addressed by the Select lines.',
              },
            },
            {
              label: { tr: 'Enable Pinli Decoder', en: 'Decoder with Enable' },
              badge: 'E ≡ Data',
              detail: {
                tr: 'Enable girişli bir n-to-2ⁿ Decoder\'ın Enable pini Data girişi olarak kullanıldığında devre birebir 1-to-2ⁿ DEMUX gibi çalışır!',
                en: 'When the Enable pin of an n-to-2ⁿ Decoder serves as the Data input, the circuit operates identically to a 1-to-2ⁿ DEMUX!',
              },
            },
            {
              label: { tr: 'Büyük MUX Ağaçları', en: 'Larger MUX Trees' },
              badge: '2× 4x1 + 2x1',
              detail: {
                tr: 'İki adet 4×1 MUX (seçiciler S₁, S₀) çıkışları bir adet 2×1 MUX\'a (seçici S₂) bağlanarak 8×1 MUX elde edilir.',
                en: 'Two 4×1 MUXes (controlled by S₁, S₀) feeding a final 2×1 MUX (controlled by S₂) form an 8×1 MUX.',
              },
            },
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'mux-4to1-inner',
          caption: {
            tr: 'Vektörel Devre Şeması: 4×1 Multiplexer (Veri Seçici) İç Kapı Mimarisi',
            en: 'Vector Circuit Schematic: Internal Gate Architecture of a 4×1 Multiplexer',
          },
          equation: "Y = I₀·S₁'·S₀' + I₁·S₁'·S₀ + I₂·S₁·S₀' + I₃·S₁·S₀",
          summary: {
            tr: 'Seçme hatları (S₁, S₀) yalnızca tek bir 3-girişli AND kapısını açarak seçilen I_k veri girişini çıkış OR kapısına iletir.',
            en: 'Select lines (S₁, S₀) enable exactly one 3-input AND gate, passing only the addressed I_k data line to the output OR gate.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      widget: 'TruthTableBuilder',
      widgetConfig: {
        variables: 4,
        initialMinterms: [1, 3, 4, 11, 12, 13, 14, 15],
      },
      summaryRule: {
        tr: 'n değişkenli herhangi bir Boole fonksiyonu 2ⁿ⁻¹ × 1 MUX ile sentezlenebilir: n-1 değişken Select pinlerine bağlanır; son değişkenin (ör. D) çift/tek minterm çiftine göre her veri girişi 0, 1, D veya D\' olarak atanır.',
        en: 'Any n-variable Boolean function can be implemented with a 2ⁿ⁻¹ × 1 MUX: connect n-1 variables to the Select lines and wire each data input to 0, 1, D, or D\' from its paired even/odd minterms.',
      },
      examTip: {
        tr: 'Eğer seçme uçlarına en yüksek bitler (A, B, C) değil de örneğin (B, C, D) bağlanırsa tablonun satırları A\' ve A olarak değişir (A\' = 0..7, A = 8..15)! Her zaman hangi değişkenin seçici olmadığına dikkat edin.',
        en: 'If the select lines are connected to (B, C, D) instead of the MSBs (A, B, C), the table rows become A\' (0..7) and A (8..15)! Always check which variable is NOT on the select lines.',
      },
    },
    {
      id: 'w10-s3',
      title: {
        tr: '3. Üç Durumlu Kapılar (Three-State Buffers) ve Ortak Veri Yolu (Shared Bus)',
        en: '3. Three-State Buffers & Shared Bus Architecture',
      },
      explanation: {
        tr: 'Standart lojik kapılar yalnızca 0 veya 1 çıkışı verir. Oysa bilgisayar mimarisinde onlarca kaydedici aynı 32-bit veya 64-bit veri yolunu (Bus) paylaşmak zorundadır. Three-State (Tri-State) Buffer, normal 0 ve 1 lojik durumlarına ek olarak üçüncü bir duruma sahiptir:\n• Control (Enable) = 1: Giriş doğrudan çıkışa aktarılır (0 veya 1).\n• Control (Enable) = 0: Çıkış elektriksel olarak devreden tamamen kopar (High-Impedance / Hi-Z, açık devre) ve diğer sürücülere engel olmaz.\n\nBus Contention (Veri Yolu Çakışması): Ortak bir hatta bağlı iki Three-State tamponun kontrol hatları aynı anda aktif edilir ve biri 1 (VCC), diğeri 0 (GND) sürerse doğrudan kısa devre oluşur! Bu yüzden kontrol hatları mutlaka bir Decoder çıkışından (karşılıklı dışlayıcı) sürülmelidir.',
        en: 'Standard logic gates output only 0 or 1. In computer architecture, however, dozens of registers must share the same 32-bit or 64-bit Bus. A Three-State (Tri-State) Buffer adds a third state alongside 0 and 1:\n• Control (Enable) = 1: Input passes directly to the output (0 or 1).\n• Control (Enable) = 0: Output is electrically disconnected (High-Impedance / Hi-Z, open circuit) so other drivers can use the wire.\n\nBus Contention: If two Three-State buffers on the same wire are enabled simultaneously and one drives 1 (VCC) while the other drives 0 (GND), a direct short circuit occurs! Therefore, their control lines must be driven by mutually exclusive Decoder outputs.',
      },
      keyPoints: [
        {
          tr: 'Three-State Shared Bus vs. MUX: Çok sayıda kaydedicinin tek hatta bağlandığı sistemlerde Three-State tamponlar büyük MUX ağaçlarına göre çok daha az kablo ve kapı kullanır.',
          en: 'Three-State Shared Bus vs. MUX: When many registers share one bus, Three-State buffers require far fewer wires and gates than giant MUX trees.',
        },
      ],
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Three-State Buffer Çalışma Tablosu',
            en: 'Three-State Buffer Operation Table',
          },
          headers: [
            { tr: 'Control (C)', en: 'Control (C)' },
            { tr: 'Veri Girişi (A)', en: 'Data Input (A)' },
            { tr: 'Çıkış (Y)', en: 'Output (Y)' },
            { tr: 'Fiziksel Durum', en: 'Physical State' },
          ],
          highlightColumn: 2,
          rows: [
            [
              '0',
              { tr: '0 veya 1', en: '0 or 1' },
              { tr: 'Hi-Z (Yüksek Empedans)', en: 'Hi-Z (High Impedance)' },
              { tr: 'Açık devre; hatta yük bindirmez', en: 'Open circuit; puts no load on the bus' },
            ],
            ['1', '0', '0 (LOW)', { tr: 'Hattı GND\'ye çeker', en: 'Pulls line to GND' }],
            ['1', '1', '1 (HIGH)', { tr: 'Hattı VCC\'ye sürer', en: 'Drives line to VCC' }],
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'tristate-shared-bus',
          caption: {
            tr: 'Vektörel Devre Şeması: Three-State Tamponlar ve Decoder Korumalı Ortak Veri Yolu (Shared Bus)',
            en: 'Vector Circuit Schematic: Three-State Buffers & Decoder-Guarded Shared Bus',
          },
          equation: 'Enᵢ = 1 ⇒ Y_bus = Aᵢ   |   Enᵢ = 0 ⇒ Hi-Z (Açık Devre)',
          summary: {
            tr: '2-to-4 Decoder kontrol sinyalleri aynı anda yalnızca tek bir tamponu aktif tutar; diğer sürücüler Hi-Z konumunda kalarak Bus Contention riskini önler.',
            en: 'Mutually exclusive 2-to-4 Decoder outputs enable at most one buffer at a time while others stay Hi-Z, preventing Bus Contention.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      examTip: {
        tr: 'Three-State çıkışlar hiçbir zaman bir Boole doğruluk tablosundaki "0" veya "1" ile aynı değildir; "Hi-Z" elektriksel izolasyon anlamına gelir ve ortak veri yolu (Bus) paylaşımında MUX kullanımına alternatif oluşturur.',
        en: 'Three-State outputs are never equivalent to a Boolean "0" or "1"; "Hi-Z" means electrical isolation and provides an efficient alternative to MUXes for shared buses.',
      },
    },
  ],
  questions: [
    {
      id: 'w10-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · Priority Encoder Çıkış Analizi (Mano 4.24)',
        en: 'Question 1 · Priority Encoder Output Analysis (Mano 4.24)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'D₃\'ün en yüksek, D₀\'ın en düşük önceliğe sahip olduğu bir 4-to-2 Priority Encoder devresine D₃D₂D₁D₀ = 0111 girişi uygulandığında (x, y, V) çıkışları ne olur?',
        en: 'In a 4-to-2 Priority Encoder where D₃ has the highest priority and D₀ the lowest, what are the outputs (x, y, V) when D₃D₂D₁D₀ = 0111 is applied?',
      },
      options: ['x = 1, y = 0, V = 1', 'x = 1, y = 1, V = 1', 'x = 0, y = 1, V = 1', 'x = 0, y = 0, V = 0'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Aktif En Yüksek Öncelikli Girişi Bul',
            en: 'Step 1: Find the Highest-Priority Active Input',
          },
          detail: {
            tr: 'D₃ = 0, D₂ = 1, D₁ = 1, D₀ = 1. En yüksek aktif giriş D₂ (indeks 2) olduğundan D₁ ve D₀ göz ardı edilir.',
            en: 'D₃ = 0, D₂ = 1, D₁ = 1, D₀ = 1. Since the highest active input is D₂ (index 2), D₁ and D₀ are ignored.',
          },
        },
        {
          title: {
            tr: 'Adım 2: İkili Kodu ve Valid Bitini Yaz',
            en: 'Step 2: Write the Binary Code and Valid Bit',
          },
          detail: {
            tr: '2₁₀ = (10)₂ ⇒ x = 1, y = 0. En az bir giriş aktif olduğu için V = 1.',
            en: '2₁₀ = (10)₂ ⇒ x = 1, y = 0. Since at least one input is active, V = 1.',
          },
        },
      ],
    },
    {
      id: 'w10-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · 8×1 MUX ile 4-Değişkenli Fonksiyon Sentezi (Mano 4.28)',
        en: 'Question 2 · 4-Variable Function Synthesis via 8×1 MUX (Mano 4.28)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Seçme girişleri S₂ = A, S₁ = B, S₀ = C olan bir 8×1 MUX ile F(A, B, C, D) = Σ(1, 3, 4, 11, 12, 13, 14, 15) fonksiyonunu gerçeklemek için (I₀, I₁, I₂, I₃, I₄, I₅, I₆, I₇) veri girişlerine sırasıyla neler bağlanmalıdır?',
        en: 'To implement F(A, B, C, D) = Σ(1, 3, 4, 11, 12, 13, 14, 15) using an 8×1 MUX with select lines S₂ = A, S₁ = B, S₀ = C, what should be connected to data inputs (I₀, I₁, I₂, I₃, I₄, I₅, I₆, I₇) in order?',
      },
      options: [
        "D, D, D', 0, 0, D, 1, 1",
        "D', D', D, 0, 0, D, 1, 1",
        "D, D, D', 1, 0, D', 1, 0",
        "0, 1, D', D, 0, D, 1, 1",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Pratik Eşleştirme Tablosunu Çiftlere Ayır',
            en: 'Step 1: Group the Lower Half (I₀..I₃) Pairs',
          },
          detail: {
            tr: "I₀(0,1): 1 var ⇒ D | I₁(2,3): 3 var ⇒ D | I₂(4,5): 4 var ⇒ D' | I₃(6,7): yok ⇒ 0",
            en: "I₀(0,1): 1 present ⇒ D | I₁(2,3): 3 present ⇒ D | I₂(4,5): 4 present ⇒ D' | I₃(6,7): none ⇒ 0",
          },
        },
        {
          title: {
            tr: 'Adım 2: Üst Yarı (I₄..I₇) Eşleştirmesi',
            en: 'Step 2: Group the Upper Half (I₄..I₇) Pairs',
          },
          detail: {
            tr: 'I₄(8,9): yok ⇒ 0 | I₅(10,11): 11 var ⇒ D | I₆(12,13): ikisi de var ⇒ 1 | I₇(14,15): ikisi de var ⇒ 1.',
            en: 'I₄(8,9): none ⇒ 0 | I₅(10,11): 11 present ⇒ D | I₆(12,13): both present ⇒ 1 | I₇(14,15): both present ⇒ 1.',
          },
        },
        {
          title: {
            tr: 'Adım 3: Sıralı Giriş Dizilimi',
            en: 'Step 3: Ordered Input Assignment',
          },
          detail: "(I₀..I₇) = (D, D, D', 0, 0, D, 1, 1).",
        },
      ],
    },
    {
      id: 'w10-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · MUX Devresinden Minterm Okuma (Reverse MUX)',
        en: 'Question 3 · Reading Minterms from a MUX Circuit (Reverse MUX)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "Seçme girişleri S₁ = A, S₀ = B ve veri girişleri I₀ = C', I₁ = 0, I₂ = C, I₃ = 1 olan bir 4×1 MUX çıkışının kanonik minterm toplamı (Σm) aşağıdakilerden hangisidir?",
        en: "A 4×1 MUX has select lines S₁ = A, S₀ = B and data inputs I₀ = C', I₁ = 0, I₂ = C, I₃ = 1. Which canonical sum of minterms (Σm) represents its output?",
      },
      options: [
        'Σm(0, 5, 6, 7)',
        'Σm(1, 4, 6, 7)',
        'Σm(0, 2, 5, 7)',
        'Σm(0, 4, 5, 6)',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Her Bir Veri Girişinin Temsil Ettiği Minterm Çiftini Yaz',
            en: 'Step 1: List the Minterm Pair Represented by Each Data Input',
          },
          detail: {
            tr: "• I₀ (AB=00 → m₀, m₁) = C' ⇒ C=0 olan m₀ (000) seçilir.\n• I₁ (AB=01 → m₂, m₃) = 0 ⇒ hiçbiri seçilmez.\n• I₂ (AB=10 → m₄, m₅) = C ⇒ C=1 olan m₅ (101) seçilir.\n• I₃ (AB=11 → m₆, m₇) = 1 ⇒ ikisi de m₆, m₇ seçilir.",
            en: "• I₀ (AB=00 → m₀, m₁) = C' ⇒ selects m₀ (000) where C=0.\n• I₁ (AB=01 → m₂, m₃) = 0 ⇒ selects neither.\n• I₂ (AB=10 → m₄, m₅) = C ⇒ selects m₅ (101) where C=1.\n• I₃ (AB=11 → m₆, m₇) = 1 ⇒ selects both m₆ and m₇.",
          },
        },
        {
          title: {
            tr: 'Adım 2: Mintermleri Birleştir',
            en: 'Step 2: Combine the Selected Minterms',
          },
          detail: 'F(A, B, C) = Σm(0, 5, 6, 7).',
        },
      ],
    },
    {
      id: 'w10-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · DEMUX ve Decoder Yapısal Özdeşliği',
        en: 'Question 4 · Structural Equivalence of DEMUX and Decoder',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Enable girişine sahip bir 3-to-8 Decoder devresi hangi pin eşleştirmesiyle doğrudan 1-to-8 Demultiplexer (DEMUX) olarak çalışır?',
        en: 'Under which pin assignment does a 3-to-8 Decoder with an Enable input operate directly as a 1-to-8 Demultiplexer (DEMUX)?',
      },
      options: [
        {
          tr: "Decoder'ın Enable girişi DEMUX'un Veri (Data) girişi, Decoder'ın 3 girişi ise DEMUX'un Seçme (Select) hatları olarak kullanıldığında",
          en: "When the Decoder's Enable pin is used as the DEMUX Data input and the 3 Decoder inputs are used as Select lines",
        },
        {
          tr: "Decoder'ın 8 çıkışı kısa devre edilip Data girişi yapıldığında",
          en: "When the Decoder's 8 outputs are shorted together as the Data input",
        },
        {
          tr: "Decoder'ın girişlerinden biri sabit 0 yapıldığında",
          en: "When one of the Decoder's address inputs is tied permanently to 0",
        },
        {
          tr: 'İki adet 3-to-8 Decoder paralel bağlandığında',
          en: 'When two 3-to-8 Decoders are connected in parallel',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Sinyal Akışını İncele',
            en: 'Step 1: Trace the Signal Flow',
          },
          detail: {
            tr: 'Enable = Data verildiğinde, Select hatlarının seçtiği çıkış pini doğrudan Data sinyalinin değerini (0 veya 1) dışarı aktarır; diğer 7 çıkış ise pasif kalır.',
            en: 'When Enable = Data, the output line addressed by the Select inputs forwards the Data value (0 or 1), while the other 7 outputs remain inactive.',
          },
        },
      ],
    },
    {
      id: 'w10-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · Three-State Bus Contention (Veri Yolu Çakışması)',
        en: 'Question 5 · Three-State Bus Contention',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Ortak bir veri yoluna (bus) bağlı iki aktif-1 Three-State tamponun (buffer) Enable uçları aynı anda 1 yapılır ve biri hatta 1, diğeri 0 sürerse ne meydana gelir?',
        en: 'If two Active-High Three-State buffers sharing a common bus are enabled simultaneously and one drives 1 while the other drives 0, what occurs?',
      },
      options: [
        {
          tr: 'Bus Contention (elektriksel kısa devre çakışması) oluşur; bunu önlemek için Enable hatları Decoder ile karşılıklı dışlayıcı sürülmelidir.',
          en: 'Bus Contention (an electrical short circuit) occurs; Enable lines must be driven mutually exclusively using a Decoder.',
        },
        {
          tr: 'Hattın gerilimi otomatik olarak High-Z durumuna geçer.',
          en: 'The bus automatically enters the High-Z state.',
        },
        {
          tr: 'İki verinin OR toplamı hatta iletilir.',
          en: 'The logical OR of both data values appears on the bus.',
        },
        {
          tr: 'İki verinin XOR sonucu hatta iletilir.',
          en: 'The logical XOR of both data values appears on the bus.',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Elektriksel Analiz',
            en: 'Step 1: Electrical Analysis',
          },
          detail: {
            tr: 'Bir tampon hattı VCC\'ye (1), diğeri GND\'ye (0) çekmeye çalışınca doğrudan VCC–GND kısa devresi (Bus Contention) oluşur ve yonga zarar görebilir. Bu yüzden ortak bus kontrolünde daima 2-to-4 / 3-to-8 Decoder kullanılır.',
            en: 'When one buffer pulls the wire to VCC (1) and the other pulls it to GND (0), a direct VCC-to-GND short (Bus Contention) occurs and can damage the chip. Hence a 2-to-4 / 3-to-8 Decoder is used for bus control.',
          },
        },
      ],
    },
    {
      id: 'w10-q6',
      type: 'interactive-table',
      title: {
        tr: 'Soru 6 · 4×1 MUX Uygulama Tablosu Doldurma',
        en: 'Question 6 · Completing a 4×1 MUX Implementation Table',
      },
      difficulty: 'Orta',
      prompt: {
        tr: "Seçme uçları S₁ = A, S₀ = B olan bir 4×1 MUX ile F(A, B, C) = Σ(0, 2, 5, 7) fonksiyonunu gerçeklemek için I₀, I₁, I₂, I₃ veri girişlerinin alacağı değerleri (0, 1, C veya C' olarak) yazın.",
        en: "To implement F(A, B, C) = Σ(0, 2, 5, 7) using a 4×1 MUX with select lines S₁ = A, S₀ = B, enter the values (0, 1, C, or C') for data inputs I₀, I₁, I₂, and I₃.",
      },
      headers: [
        { tr: 'MUX Girişi', en: 'MUX Input' },
        { tr: 'Seçim (A B)', en: 'Select (A B)' },
        { tr: 'Kapsanan Mintermler', en: 'Covered Minterms' },
        { tr: "Bağlanacak Değer (0 / 1 / C / C')", en: "Input Value (0 / 1 / C / C')" },
      ],
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
      solutionExplanation: {
        tr: "I₀ için yalnızca C=0 (m₀) aktif olduğundan C'; I₁ için yalnızca C=0 (m₂) aktif olduğundan C'; I₂ ve I₃ için ise yalnızca C=1 durumları (m₅ ve m₇) aktif olduğundan C bağlanır.",
        en: "For I₀ only C=0 (m₀) is active ⇒ C'; for I₁ only C=0 (m₂) is active ⇒ C'; for I₂ and I₃ only C=1 (m₅ and m₇) are active ⇒ C.",
      },
    },
    {
      id: 'w10-q7',
      type: 'simulator-build',
      title: {
        tr: 'Soru 7 · 4×1 MUX ile 3-Bit Odd Parity Gerçekleme (Canlı Lab)',
        en: 'Question 7 · 3-Bit Odd Parity Using a 4×1 MUX (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'Simülatörde yerleşik "4x1 MUX" bileşenini ve gerekirse "NOT" kapısını kullanarak F(A, B, C) = Σ(1, 2, 4, 7) (3-bit Odd Parity) fonksiyonunu S₁ = A, S₀ = B seçme girişleriyle kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.',
        en: 'Use the built-in "4x1 MUX" component (and a "NOT" gate if needed) in the simulator to implement F(A, B, C) = Σ(1, 2, 4, 7) (3-bit Odd Parity) with select lines S₁ = A, S₀ = B, and verify against the 8-row truth table.',
      },
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
      hint: {
        tr: "A'yı S1 pinine, B'yi S0 pinine bağlayın. C'yi NOT kapısından geçirerek C' üretin. Tablo eşleştirmesiyle: I0 = C, I1 = C', I2 = C', I3 = C bağlayıp Y çıkışını F LED'ine iletin!",
        en: "Wire A to S1 and B to S0. Pass C through a NOT gate to produce C'. From the implementation table: connect I0 = C, I1 = C', I2 = C', I3 = C, and wire Y to LED F!",
      },
      solutionDescription: {
        tr: "S₁=A, S₀=B seçildiğinde Σ(1, 2, 4, 7) mintermleri için I₀ = C (m₁), I₁ = C' (m₂), I₂ = C' (m₄) ve I₃ = C (m₇) elde edilir. Tek bir 4×1 MUX ve tek bir NOT kapısı tüm fonksiyonu gerçekler.",
        en: "With S₁=A and S₀=B, Σ(1, 2, 4, 7) yields I₀ = C (m₁), I₁ = C' (m₂), I₂ = C' (m₄), and I₃ = C (m₇). A single 4×1 MUX and one NOT gate realize the entire function.",
      },
    },
  ],
};
