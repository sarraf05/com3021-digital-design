import type { WeekModule } from '../../types/curriculum';

export const week14: WeekModule = {
  id: 14,
  weekNumber: 14,
  englishTitle: {
    tr: 'Registers and Counters (Shift Registers & Counters)',
    en: 'Registers and Counters (Shift Registers & Counters)',
  },
  turkishSubtitle: {
    tr: 'Yazmaçlar, Universal Shift Register, Ripple / Senkron Sayıcılar ve Ring / Johnson Sayıcıları',
    en: 'Registers, Universal Shift Registers, Ripple/Synchronous Counters & Ring/Johnson Counters',
  },
  summary: {
    tr: 'Paralel yüklemeli yazmaçları (Registers), SISO/SIPO/PISO/Universal Shift Register mimarisini, Ripple vs. Synchronous Binary Counter gecikme ve Enable zinciri farklarını, BCD Decade sayıcıyı ve tek/çift fazlı Ring ile Johnson sayıcılarını öğrenin.',
    en: 'Master parallel-load Registers, SISO/SIPO/PISO/Universal Shift Register architectures, Ripple vs. Synchronous Binary Counter propagation delays and Enable chains, BCD Decade counters, and Ring vs. Johnson counters.',
  },
  learningObjectives: [
    {
      tr: '4-Bit Universal Shift Register devresinde S₁S₀ kontrol uçlarının (Hold, Shift Right, Shift Left, Load) işleyişini analiz etmek',
      en: 'Analyze the S₁S₀ mode-control operations (Hold, Shift Right, Shift Left, Load) of a 4-Bit Universal Shift Register',
    },
    {
      tr: 'Ripple (Asenkron) sayıcıların yayılım gecikmesini (N · t_pd) senkron sayıcılarla karşılaştırmak',
      en: 'Compare the propagation delay of Asynchronous Ripple counters (N · t_pd) against Synchronous counters',
    },
    {
      tr: 'Synchronous Binary Counter için Count Enable zincir denklemlerini (Tᵢ = E · Q₀···Qᵢ₋₁) kurmak',
      en: 'Construct Count Enable chain equations (Tᵢ = E · Q₀···Qᵢ₋₁) for Synchronous Binary Counters',
    },
    {
      tr: 'Ring Counter (N durum) ile Johnson Counter (2N durum) arasındaki durum döngüsü ve donanım farklarını açıklamak',
      en: 'Explain the state cycles and hardware differences between Ring Counters (N states) and Johnson Counters (2N states)',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'TimingDiagramViewer',
  recommendedWidgetConfig: {
    flipFlopType: 'T',
  },
  visualSections: [
    {
      id: 'w14-s1',
      title: {
        tr: '1. Yazmaçlar (Registers), Shift Registers ve Universal Shift Register',
        en: '1. Registers, Shift Registers & Universal Shift Registers',
      },
      explanation: {
        tr: 'Bir Register, ortak bir Clock hattını paylaşan n adet Flip-Flop grubudur ve n-bitlik veri saklar. Paralel Yüklemeli (Parallel Load) yazmaçlarda neden Load sinyaliyle Clock kesilmez (Clock Gating yapılmaz)? Çünkü saat hattına kapı koymak saat kayması (clock skew) ve istenmeyen sahte tetikleme (glitch) üretir! Bunun yerine her Flip-Flop girişine 2×1 MUX konur: Load = 0 iken kendi Q çıkışı D girişine geri beslenerek veri korunur, Load = 1 iken yeni veri yüklenir.\n\nKaydırmalı Yazmaçlar (Shift Registers) veriyi her saatte 1 bit kaydırır: SISO (N darbede yükle/oku), SIPO (N darbede seri yükle, anında paralel oku), PISO (1 darbede paralel yükle, N darbede seri oku) ve PIPO.\n\n4-Bit Universal Shift Register (Mano Şekil 6.7): Her bir bit hücresinde bir D Flip-Flop ve bir 4×1 MUX bulunur; S₁S₀ seçicileriyle 4 modu tek devrede birleştirir: 00 (Tut / Hold), 01 (Sağa Kaydır / ÷2), 10 (Sola Kaydır / ×2), 11 (Paralel Yükle).',
        en: 'A Register is a group of n Flip-Flops sharing a common Clock to store n bits. Why do Parallel-Load registers NEVER use Clock Gating (ANDing Load with Clock)? Inserting gates onto the clock tree causes clock skew and glitches! Instead, a 2×1 MUX sits in front of each D input: when Load = 0, Q feeds back to hold data; when Load = 1, new parallel data enters synchronously.\n\nShift Registers move bits one position per clock pulse: SISO (N pulses in/out), SIPO (N pulses serial in, instant parallel out), PISO (1 pulse parallel load, N pulses serial out), and PIPO.\n\n4-Bit Universal Shift Register (Mano Fig. 6.7): Each stage pairs a D Flip-Flop with a 4×1 MUX under S₁S₀ control: 00 (Hold), 01 (Shift Right / ÷2), 10 (Shift Left / ×2), and 11 (Parallel Load).',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: '4-Bit Universal Shift Register Fonksiyon Tablosu',
            en: '4-Bit Universal Shift Register Function Table',
          },
          headers: [
            'S₁',
            'S₀',
            { tr: 'Yazmaç İşlevi', en: 'Register Operation' },
            { tr: 'MUX Seçilen Girişi', en: 'Selected MUX Input' },
          ],
          highlightColumn: 2,
          rows: [
            ['0', '0', { tr: 'Değişiklik Yok (Tut / Hold)', en: 'No Change (Hold)' }, { tr: 'I₀ = Kendi Qᵢ çıkışı', en: 'I₀ = Own Qᵢ output' }],
            [
              '0',
              '1',
              { tr: 'Sağa Kaydır (A₃ → A₂ → A₁ → A₀)', en: 'Shift Right (A₃ → A₂ → A₁ → A₀)' },
              { tr: 'I₁ = Soldaki bit (MSB için Serial_In_R)', en: 'I₁ = Left neighbor (Serial_In_R for MSB)' },
            ],
            [
              '1',
              '0',
              { tr: 'Sola Kaydır (A₀ → A₁ → A₂ → A₃)', en: 'Shift Left (A₀ → A₁ → A₂ → A₃)' },
              { tr: 'I₂ = Sağdaki bit (LSB için Serial_In_L)', en: 'I₂ = Right neighbor (Serial_In_L for LSB)' },
            ],
            ['1', '1', { tr: 'Paralel Yükle (Parallel Load)', en: 'Parallel Load' }, { tr: 'I₃ = Harici Paralel Giriş (Iᵢ)', en: 'I₃ = External Parallel Input (Iᵢ)' }],
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'parallel-load-register-4bit',
          caption: {
            tr: 'Vektörel Devre Şeması: 2×1 MUX Korumalı 4-Bit Parallel-Load Register (Clock Gating Yok)',
            en: 'Vector Circuit Schematic: 4-Bit Parallel-Load Register with 2×1 MUX Control (No Clock Gating)',
          },
          equation: 'Load = 0 ⇒ Dᵢ = Aᵢ (Hold)   |   Load = 1 ⇒ Dᵢ = Iᵢ (Parallel Load)',
          summary: {
            tr: 'Ortak Clock hattı bozulmadan her Flip-Flop önündeki 2×1 MUX üzerinden tutma (Hold) veya paralel yükleme (Load) seçilir.',
            en: 'Keeping the Clock tree clean, a 2×1 MUX ahead of each Flip-Flop selects between holding Aᵢ (Load=0) or loading Iᵢ (Load=1).',
          },
          collapsible: true,
          defaultOpen: true,
        },
        {
          kind: 'schematic',
          diagramId: 'universal-shift-register-cell',
          caption: {
            tr: 'Vektörel Devre Şeması: 4-Bit SISO Kaydırmalı Yazmaç ve Universal Shift Register Hücresi',
            en: 'Vector Circuit Schematic: 4-Bit SISO Shift Register & Universal Shift Register Bit Cell',
          },
          equation: 'S₁S₀: 00 = Hold,  01 = Shift Right,  10 = Shift Left,  11 = Parallel Load',
          summary: {
            tr: 'Her bit hücresindeki 4×1 MUX kendi Qᵢ değerini, sol/sağ komşu çıkışlarını veya paralel girişi Dᵢ ucuna yönlendirir.',
            en: 'Each stage’s 4×1 MUX routes own Qᵢ, left/right neighbor bits, or parallel data Iᵢ into Dᵢ under S₁S₀ control.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      summaryRule: {
        tr: 'Universal Shift Register mod seçimi (S₁S₀): 00 (Tut / Hold), 01 (Sağa Kaydır / ÷2), 10 (Sola Kaydır / ×2), 11 (Paralel Yükle). Sayaçlarda ise Ring Counter n FF ile n durum; Johnson Counter Q\'ₙ₋₁ geri beslemesiyle 2n durum üretir.',
        en: 'Universal Shift Register modes (S₁S₀): 00 (Hold), 01 (Shift Right / ÷2), 10 (Shift Left / ×2), 11 (Parallel Load). For counters, Ring Counter yields n states with n FFs while Johnson Counter yields 2n states via Q\'ₙ₋₁ feedback.',
      },
      examTip: {
        tr: 'Shift Right işleminde MSB (sol uç) yerine yeni gelen seri bit girer, LSB (sağ uç) dışarı atılır — bu işlem işaretsiz bir sayıyı 2\'ye bölmeye (÷ 2) eşdeğerdir! Shift Left ise 2 ile çarpar (× 2).',
        en: 'In a Shift Right operation, a new serial bit enters at the MSB (left) and the LSB (right) shifts out—which corresponds to dividing an unsigned binary number by 2 (÷ 2)! Shift Left multiplies by 2 (× 2).',
      },
    },
    {
      id: 'w14-s2',
      title: {
        tr: '2. Asenkron (Ripple) ve Senkron Sayıcılar (Binary & BCD Decade)',
        en: '2. Asynchronous (Ripple) & Synchronous Counters (Binary & BCD Decade)',
      },
      explanation: {
        tr: 'Sayıcılar (Counters) saat darbeleri altında belirli bir durum dizisini takip eden özel ardışıl devrelerdir:\n• Asenkron (Ripple) Sayıcı: Yalnızca ilk Flip-Flop (LSB) harici Clock alır; sonraki her Flip-Flop\'un Clock girişi bir önceki Flip-Flop\'un çıkışından sürülür. Bu nedenle bitler aynı anda değil dalga halinde değişir: her aşamada t_pd gecikmesi birikir (en kötü durum = N × t_pd) ve geçici hatalı ara kodlar (glitch) üretir.\n• Senkron İkili Sayıcı (Synchronous Binary Counter): Tüm Flip-Flop\'lar ortak Clock ile aynı anda tetiklenir! Count Enable (E) zinciriyle bir bit, yalnızca kendinden düşük tüm bitler 1 olduğunda terslenir (T₀ = E, T₁ = E·Q₀, T₂ = E·Q₀Q₁, T₃ = E·Q₀Q₁Q₂); tüm bitler tek Flip-Flop gecikmesiyle (1 × t_pd) paralel güncellenir.\n• BCD Decade Sayıcı: 0000 (0) – 1001 (9) arası sayar. 1001 (9) durumundayken sonraki saat darbesinde 1010 yerine senkron biçimde 0000\'a geçer ve üst basamağı süren Output Carry (y = Q₃Q₀) üretir.',
        en: 'Counters are specialized sequential circuits that step through a prescribed sequence of states upon clock pulses:\n• Asynchronous (Ripple) Counter: Only the LSB Flip-Flop receives the external Clock; each subsequent Flip-Flop is clocked by the previous Flip-Flop’s output. Because changes ripple stage-by-stage, propagation delays accumulate (worst case = N × t_pd) and produce transient decoding glitches.\n• Synchronous Binary Counter: All Flip-Flops share a common Clock and update simultaneously! Using a Count Enable (E) chain, each bit toggles iff all lower bits equal 1 (T₀ = E, T₁ = E·Q₀, T₂ = E·Q₀Q₁, T₃ = E·Q₀Q₁Q₂)—so all bits settle in parallel within 1 × t_pd.\n• BCD Decade Counter: Counts 0000 (0) to 1001 (9); at 9 (1001), the next clock edge transitions synchronously to 0000 instead of 1010 and asserts Output Carry (y = Q₃Q₀).',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Ripple (Asenkron) vs. Senkron Sayıcı ve BCD Decade Denklemleri',
            en: 'Ripple (Asynchronous) vs. Synchronous Counter & BCD Decade Equations',
          },
          headers: [
            { tr: 'Sayıcı Türü', en: 'Counter Type' },
            { tr: 'Saat Bağlantısı', en: 'Clocking' },
            { tr: 'En Kötü Gecikme', en: 'Worst-Case Delay' },
            { tr: 'Temel Denklemler / Özellik', en: 'Key Equations / Property' },
          ],
          highlightColumn: 2,
          rows: [
            [
              { tr: 'Ripple (Asenkron) Sayıcı', en: 'Ripple (Asynchronous)' },
              { tr: 'Yalnızca LSB harici CLK alır', en: 'Only LSB gets external CLK' },
              'N × t_pd',
              { tr: 'Az kapı kullanır, ancak geçişte ara glitch oluşur', en: 'Minimal gates, but suffers transient decoding glitches' },
            ],
            [
              { tr: 'Senkron İkili Sayıcı', en: 'Synchronous Binary' },
              { tr: 'Tüm FF\'ler ortak CLK paylaşır', en: 'All FFs share common CLK' },
              't_pd + t_AND',
              'T₀ = E, T₁ = E·Q₀, T₂ = E·Q₀Q₁, T₃ = E·Q₀Q₁Q₂',
            ],
            [
              { tr: 'BCD Decade Sayıcı (Mod-10)', en: 'BCD Decade (Mod-10)' },
              { tr: 'Ortak CLK (0000–1001)', en: 'Common CLK (0000–1001)' },
              { tr: 'Senkron (Glitch yok)', en: 'Synchronous (Glitch-free)' },
              'T_Q0=1, T_Q1=Q₃\'Q₀, T_Q2=Q₁Q₀, T_Q3=Q₂Q₁Q₀+Q₃Q₀, Carry y=Q₃Q₀',
            ],
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'ripple-counter-4bit',
          caption: {
            tr: 'Vektörel Devre & Zamanlama Şeması: 4-Bit Asenkron (Ripple) Sayıcı ve Kümülatif Gecikme',
            en: 'Vector Circuit & Timing Schematic: 4-Bit Asynchronous (Ripple) Counter & Cumulative Delay',
          },
          equation: 't_total(worst) = N · t_pd   (0111 → 1000 geçişinde dalga birikimi)',
          summary: {
            tr: 'Her Flip-Flop saatini bir önceki çıkıştan aldığı için değişimler dalga gibi yayılır ve geçici hatalı kodlara (glitch) yol açar.',
            en: 'Because each Flip-Flop is clocked by the preceding stage, bit transitions ripple sequentially and cause transient glitch states.',
          },
          collapsible: true,
          defaultOpen: true,
        },
        {
          kind: 'schematic',
          diagramId: 'sync-counter-4bit',
          caption: {
            tr: 'Vektörel Devre Şeması: Count Enable (E) Zincirli 4-Bit Senkron İkili Sayıcı',
            en: 'Vector Circuit Schematic: 4-Bit Synchronous Binary Counter with Enable Chain',
          },
          equation: 'T₀ = E,   T₁ = E·Q₀,   T₂ = E·Q₀·Q₁,   T₃ = E·Q₀·Q₁·Q₂,   Carry = E·Q₀·Q₁·Q₂·Q₃',
          summary: {
            tr: 'Tüm T Flip-Flop\'lar ortak Clock ile paralel tetiklenir; yalnızca alt bitlerin tamamı 1 olduğunda ilgili AND kapısı bir üst biti tersler.',
            en: 'All T Flip-Flops share a common Clock and update simultaneously; each stage toggles only when Enable and all lower bits equal 1.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      widget: 'TimingDiagramViewer',
      widgetConfig: {
        flipFlopType: 'T',
      },
      examTip: {
        tr: 'Ripple sayıcıda en kötü durum gecikmesi daima tüm bitlerin aynı anda değiştiği "0111 → 1000" (veya 1111 → 0000) geçişidir ve N adet Flip-Flop gecikmesinin toplamına (N × t_pd) eşittir!',
        en: 'In a Ripple counter, worst-case delay always occurs on transitions where every bit changes (e.g., "0111 → 1000" or "1111 → 0000"), totaling N Flip-Flop delays (N × t_pd)!',
      },
    },
    {
      id: 'w14-s3',
      title: {
        tr: '3. Ring Counter ve Johnson (Switch-Tail) Counter',
        en: '3. Ring Counter & Johnson (Switch-Tail) Counter',
      },
      explanation: {
        tr: 'Kaydırmalı yazmaçların çıkışını girişine geri bağlayarak düşük maliyetli, ek çözücü (decoding) kapısı sade olan özel sayıcılar elde edilir:\n• Ring Counter: Son Flip-Flop\'un normal çıkışı (Q_{n-1}) ilk Flip-Flop\'un D₀ girişine bağlanır. Başlangıçta tek bir "1" biti yüklenir (ör. 1000 → 0100 → 0010 → 0001). n Flip-Flop ile tam olarak n adet ayrı zamanlama sinyali üretir (hiç ek çözücü kapı gerektirmez!).\n• Johnson (Switch-Tail) Counter: Son Flip-Flop\'un TÜMLEYEN çıkışı (Q\'_{n-1}) ilk Flip-Flop\'un D₀ girişine bağlanır! 0000\'dan başlandığında önce 1\'ler dolar, sonra 0\'lar dolar; böylece n Flip-Flop ile tam 2n adet durum üretir. Üstelik her durumun içinde yalnızca bir adet bit geçiş sınırı (veya tamamı 0/1) bulunduğu için her bir durum sadece 2-girişli bir AND kapısıyla çözülebilir!',
        en: 'Feeding a shift register’s output back to its serial input yields economical timing counters with minimal decoding logic:\n• Ring Counter: The true output Q_{n-1} of the last Flip-Flop feeds D₀ of the first Flip-Flop. Preloading a single "1" circulates it (1000 → 0100 → 0010 → 0001), producing n separate timing pulses from n Flip-Flops with zero decoding gates!\n• Johnson (Switch-Tail) Counter: The COMPLEMENTED output Q\'_{n-1} feeds D₀! Starting from 0000, 1s fill the register followed by 0s, generating 2n unique states from n Flip-Flops. Because each state has at most a single 1→0 or 0→1 boundary, every state can be uniquely decoded using just a 2-input AND gate!',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'N-Bit Ring Counter vs. Johnson Counter Karşılaştırması',
            en: 'N-Bit Ring Counter vs. Johnson Counter Comparison',
          },
          headers: [
            { tr: 'Özellik', en: 'Feature' },
            'Ring Counter',
            'Johnson (Switch-Tail) Counter',
          ],
          highlightColumn: 2,
          rows: [
            [
              { tr: 'Geri Besleme Bağlantısı', en: 'Feedback Connection' },
              'D₀ = Q_{n-1}',
              "D₀ = Q'_{n-1}",
            ],
            [
              { tr: 'Geçerli Durum Sayısı', en: 'Valid States' },
              { tr: 'n adet durum', en: 'n states' },
              { tr: '2n adet durum', en: '2n states' },
            ],
            [
              { tr: 'Kullanılmayan Durum Sayısı', en: 'Unused States' },
              '2ⁿ - n',
              '2ⁿ - 2n',
            ],
            [
              { tr: 'Örnek 4-Bit Döngü', en: '4-Bit Sequence Example' },
              '1000 → 0100 → 0010 → 0001',
              '0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001',
            ],
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'ring-vs-johnson-counter',
          caption: {
            tr: 'Vektörel Devre Şeması: 4-Bit Ring Counter (D₀ = Q₃) vs. Johnson Counter (D₀ = Q₃\')',
            en: 'Vector Circuit Schematic: 4-Bit Ring Counter (D₀ = Q₃) vs. Johnson Counter (D₀ = Q₃\')',
          },
          equation: "Ring: N durum (D₀ = Q₃)   |   Johnson: 2N durum (D₀ = Q₃', her durum 2-girişli AND ile çözülür)",
          summary: {
            tr: 'Normal geri besleme (Q₃) n durumluk tek-sıcak döngü üretirken, tümleyen geri besleme (Q₃\') aynı donanımla 2n durumluk Johnson döngüsü oluşturur.',
            en: 'True feedback (Q₃) circulates a single bit across n states, while inverted feedback (Q₃\') doubles the cycle to 2n easily decoded states.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      examTip: {
        tr: "Johnson Counter'daki herhangi bir durumu tek başına algılamak için kaç girişli AND kapısı gerekir? Cevap her zaman yalnızca 2-girişli AND kapısıdır! Örneğin 4-bitlik sistemde 1110 durumunu algılamak için Q₂·Q₃' (1→0 sınırı), 0000 için Q₀'·Q₃' ve 1111 için Q₀·Q₃ yeterlidir.",
        en: "How many inputs does an AND gate need to decode any single state of an n-bit Johnson Counter? Always just a 2-input AND gate! For example, in a 4-bit Johnson counter, Q₂·Q₃' (the 1→0 boundary) uniquely decodes 1110, Q₀'·Q₃' decodes 0000, and Q₀·Q₃ decodes 1111.",
      },
    },
    {
      id: 'w14-s4',
      title: {
        tr: '4. İleri Mimari Özeti: Bellek (RAM/ROM), PLD/FPGA ve RTL / ASM Diyagramları',
        en: '4. Advanced Architecture Reference: Memory (RAM/ROM), PLD/FPGA & RTL / ASM',
      },
      explanation: {
        tr: 'Dijital sistem tasarımında yazmaç ve sayıcıların bir adım ötesi büyük bellek dizileri (RAM/ROM), programlanabilir lojik mimariler (PROM, PAL, PLA, FPGA) ve veri yolu–kontrol ünitesi (RTL & ASM) tasarımıdır. Aşağıdaki vektörel blok şemaları bellek hücresinden FPGA mantık bloğuna ve ASM akış sembollerine kadar tüm ileri mimari yapı taşlarını görselleştirir.',
        en: 'Beyond registers and counters, complete digital systems integrate Memory arrays (RAM/ROM), Programmable Logic Devices (PROM, PAL, PLA, FPGA), and Datapath–Control architectures (RTL & ASM). The vector schematics below illustrate these core hardware building blocks from a single 1-bit RAM cell up to FPGA CLBs and ASM charts.',
      },
      diagrams: [
        {
          kind: 'schematic',
          diagramId: 'ram-cell-1bit',
          caption: {
            tr: 'Vektörel Devre Şeması: 1-Bit Statik RAM Hücresi (Select, Read/Write, SR Latch & Three-State)',
            en: 'Vector Circuit Schematic: 1-Bit Static RAM Cell (Select, Read/Write, SR Latch & Three-State)',
          },
          equation: 'Select = 1, R/W = 0 ⇒ Write (S/R)   |   Select = 1, R/W = 1 ⇒ Read (Q → Data Out)',
          summary: {
            tr: 'Select ve R/W kontrol hatları yazma kapılarını veya çıkış Three-State tamponunu açarak tek bir SR mandal üzerinden okuma/yazma yapar.',
            en: 'Select and R/W control gates enable either the write inputs or the output Three-State buffer around a core SR latch.',
          },
          collapsible: true,
          defaultOpen: true,
        },
        {
          kind: 'schematic',
          diagramId: 'memory-block-diagram',
          caption: {
            tr: 'Vektörel Blok Şema: 2ᵏ × n RAM Bellek Modülü (Adres, Veri Giriş/Çıkış ve R/W Kontrolü)',
            en: 'Vector Block Diagram: 2ᵏ × n RAM Memory Unit (Address, Data In/Out & R/W Control)',
          },
          equation: 'Kapasite = 2ᵏ Sözcük × n Bit   (Örn: 1024 × 16 = 2¹⁰ × 16 bit)',
          summary: {
            tr: 'k-bitlik Adres hattı 2ᵏ sözcükten birini seçer; Memory Enable ve R/W sinyalleri n-bitlik veri aktarım yönünü belirler.',
            en: 'A k-bit Address bus selects one of 2ᵏ words while Memory Enable and R/W govern the n-bit read/write data path.',
          },
          collapsible: true,
          defaultOpen: true,
        },
        {
          kind: 'schematic',
          diagramId: 'rom-4x4-matrix',
          caption: {
            tr: 'Vektörel Devre Şeması: 4×4 ROM Matrisi (2-to-4 Decoder + Programlanabilir OR Bağlantıları)',
            en: 'Vector Circuit Schematic: 4×4 ROM Matrix (2-to-4 Decoder + Programmable OR Matrix)',
          },
          equation: 'Sabit AND Dizisi (Decoder) + Programlanabilir OR Dizisi ⇒ Çoklu Fonksiyon Üretimi',
          summary: {
            tr: '2-to-4 Decoder tüm 4 mintermi üretir; yatay sözcük hatlarındaki sigorta/bağlantı noktaları (×) her çıkış sütununda istenen Σm fonksiyonunu sabitler.',
            en: 'A 2-to-4 Decoder produces all 4 minterms, and programmed links (×) along word lines sum selected minterms into each output column.',
          },
          collapsible: true,
          defaultOpen: true,
        },
        {
          kind: 'schematic',
          diagramId: 'pld-prom-pal-pla',
          caption: {
            tr: 'Vektörel Mimari Şeması: PROM, PAL ve PLA Programlanabilir Lojik Dizilerinin Karşılaştırması',
            en: 'Vector Architecture Diagram: Comparing PROM, PAL & PLA Programmable Arrays',
          },
          equation: 'PROM: Sabit AND + Prog. OR   |   PAL: Prog. AND + Sabit OR   |   PLA: İkisi de Prog.',
          summary: {
            tr: 'PROM kalıcı bellek/minterm toplamı, PAL hızlı sabit OR çıkışları, PLA ise paylaşılan çarpım terimleriyle en yüksek esnekliği sunar.',
            en: 'PROM fixes ANDs (Decoder), PAL fixes ORs for speed, and PLA allows programming both AND and OR planes for shared product terms.',
          },
          collapsible: true,
          defaultOpen: true,
        },
        {
          kind: 'schematic',
          diagramId: 'fpga-clb-cell',
          caption: {
            tr: 'Vektörel Mimari Şeması: FPGA Configurable Logic Block (LUT + D Flip-Flop + 2×1 MUX)',
            en: 'Vector Architecture Diagram: FPGA Configurable Logic Block (LUT + D Flip-Flop + 2×1 MUX)',
          },
          equation: '4-Input LUT (16×1 SRAM) → [Doğrudan Birleşik veya D-FF Kayıtlı Çıkış]',
          summary: {
            tr: 'Her FPGA mantık hücresi herhangi bir 4-değişkenli fonksiyonu LUT belleğinde tutar ve çıkış MUX\'u ile saat senkronizasyonunu seçer.',
            en: 'Each FPGA slice stores any 4-variable truth table inside a 16-bit SRAM LUT and selects combinational or registered output via a MUX.',
          },
          collapsible: true,
          defaultOpen: true,
        },
        {
          kind: 'schematic',
          diagramId: 'rtl-datapath-control',
          caption: {
            tr: 'Vektörel Mimari Şeması: RTL Sistemi — Datapath (Veri Yolu) ve Control Unit (FSM) Etkileşimi',
            en: 'Vector Architecture Diagram: RTL System — Datapath & Control Unit (FSM) Interaction',
          },
          equation: 'Control Signals (Load, Shift, Sel) → Datapath   |   Status Flags (Zero, Carry) → FSM',
          summary: {
            tr: 'Kontrol birimi (FSM) durum bayraklarını okuyarak yazmaç, MUX ve ALU üzerindeki kontrol sinyallerini saat adımlarıyla yönetir.',
            en: 'The Control FSM reads status flags from the Datapath and issues clocked control signals to registers, MUXes, and the ALU.',
          },
          collapsible: true,
          defaultOpen: true,
        },
        {
          kind: 'schematic',
          diagramId: 'asm-chart-symbols',
          caption: {
            tr: 'Vektörel Akış Şeması: Algorithmic State Machine (ASM) Sembolleri ve Tek ASM Bloğu',
            en: 'Vector Flowchart Diagram: Algorithmic State Machine (ASM) Symbols & Single ASM Block',
          },
          equation: 'State Box (Moore) · Decision Box (Koşul) · Conditional Box (Mealy)',
          summary: {
            tr: 'Bir ASM bloğu tek bir saat periyodunu temsil eder: dikdörtgen durum kutusu, eşkenar dörtgen karar kutusu ve oval koşullu çıkış kutusundan oluşur.',
            en: 'One ASM block spans a single clock cycle, combining a rectangular State Box, diamond Decision Box, and oval Conditional Output Box.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      summaryRule: {
        tr: 'PROM = Sabit AND (Decoder) + Programlanabilir OR; PAL = Programlanabilir AND + Sabit OR; PLA = Her iki katman da programlanabilir. FPGA hücresi ise LUT (Look-Up Table) + D Flip-Flop + MUX üçlüsünden oluşur.',
        en: 'PROM = Fixed AND (Decoder) + Programmable OR; PAL = Programmable AND + Fixed OR; PLA = Both planes programmable. An FPGA CLB pairs an SRAM LUT with a D Flip-Flop and output MUX.',
      },
      examTip: {
        tr: 'ASM (Algorithmic State Machine) bloklarında State Box içindeki RTL işlemleri saat darbesiyle gerçekleşen Moore çıkışlarıdır; Decision Box sonrasındaki oval Conditional Output kutuları ise girişe bağlı Mealy çıkışlarıdır.',
        en: 'In an ASM block, RTL operations inside the State Box are synchronous Moore actions, whereas actions inside an oval Conditional Box following a Decision Box represent Mealy outputs.',
      },
    },
  ],
  questions: [
    {
      id: 'w14-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · Universal Shift Register Mod Kontrolü (Mano 6.4)',
        en: 'Question 1 · Universal Shift Register Mode Control (Mano 6.4)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '4-bitlik bir Universal Shift Register\'da mevcut içerik A₃A₂A₁A₀ = 1101, mod kontrol girişleri S₁S₀ = 01 (Shift Right) ve sağa kaydırma seri girişi Serial_In = 0 iken bir saat darbesi sonrasında yeni yazmaç değeri ne olur?',
        en: 'A 4-bit Universal Shift Register currently holds A₃A₂A₁A₀ = 1101. If mode control inputs S₁S₀ = 01 (Shift Right) and Serial_In = 0 are applied, what is the register content after one clock pulse?',
      },
      options: ['0110', '1010', '1101', '1011'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Sağa Kaydırma (Shift Right) Yönünü Uygula',
            en: 'Step 1: Apply the Shift Right Operation',
          },
          detail: {
            tr: 'Her bit bir basamak sağa kayar (A₃ → A₂ → A₁ → A₀). Sağdaki LSB (1) dışarı çıkar, soldaki MSB (A₃) konumuna Serial_In = 0 yerleşir: [0] 1 1 0 ⇒ 0110.',
            en: 'Every bit shifts right by one position (A₃ → A₂ → A₁ → A₀). The rightmost LSB (1) is shifted out and Serial_In = 0 enters MSB (A₃): [0] 1 1 0 ⇒ 0110.',
          },
        },
      ],
    },
    {
      id: 'w14-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · Asenkron (Ripple) Sayıcı Yayılım Gecikmesi',
        en: 'Question 2 · Asynchronous (Ripple) Counter Propagation Delay',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Her bir Flip-Flop’un saat-çıkış yayılım gecikmesi t_pd = 15 ns olan 4-bitlik bir asenkron (Ripple) sayıcıda 0111 (7) durumundan 1000 (8) durumuna geçerken tüm çıkışların kararlı hale gelmesi için geçen toplam süre kaç nanosaniyedir?',
        en: 'In a 4-bit asynchronous (Ripple) counter where each Flip-Flop has clock-to-Q propagation delay t_pd = 15 ns, how many nanoseconds does it take for all outputs to settle when transitioning from 0111 (7) to 1000 (8)?',
      },
      options: ['60 ns', '15 ns', '45 ns', '30 ns'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Dalgalanma (Ripple) Zincirini İzle',
            en: 'Step 1: Trace the Ripple Propagation Chain',
          },
          detail: {
            tr: '0111 → 1000 geçişinde 4 bitin tamamı değişir! Önce Q₀ (15 ns) değişip Q₁\'i tetikler (30 ns), Q₁ değişip Q₂\'yi tetikler (45 ns), Q₂ değişip Q₃\'ü tetikler: 4 × 15 ns = 60 ns.',
            en: 'During 0111 → 1000, all 4 bits must toggle sequentially! Q₀ changes (15 ns) triggering Q₁ (30 ns), which triggers Q₂ (45 ns), which triggers Q₃: 4 × 15 ns = 60 ns.',
          },
        },
      ],
    },
    {
      id: 'w14-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · Senkron Yukarı İkili Sayıcı T Giriş Denklemi (Mano 6.14)',
        en: 'Question 3 · Synchronous Binary Up-Counter T Equation (Mano 6.14)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'Count_Enable = 1 olan 4-bitlik senkron yukarı ikili sayıcıda (Q₃Q₂Q₁Q₀), en anlamlı bit Q₃\'ün bir sonraki saat darbesinde durum değiştirmesi (Toggle) için T₃ girişinin Boole ifadesi nedir?',
        en: 'In a 4-bit synchronous binary up-counter (Q₃Q₂Q₁Q₀) with Count_Enable = 1, what is the Boolean expression for T₃ so that MSB Q₃ toggles on the next clock pulse?',
      },
      options: ['T₃ = Q₂ Q₁ Q₀', 'T₃ = Q₂ + Q₁ + Q₀', 'T₃ = Q₀', 'T₃ = Q₃ Q₂ Q₁'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Q₃ Bitinin Değiştiği Durumları Bul',
            en: 'Step 1: Identify When Bit Q₃ Toggles',
          },
          detail: {
            tr: '4-bit sayıcıda Q₃ yalnızca 0111 → 1000 (7→8) ve 1111 → 0000 (15→0) geçişlerinde değişir; her ikisinde de alt üç bit Q₂ = Q₁ = Q₀ = 1 dir ⇒ T₃ = Q₂Q₁Q₀.',
            en: 'In a 4-bit counter, Q₃ toggles only on 0111 → 1000 (7→8) and 1111 → 0000 (15→0); in both cases all three lower bits are 1 (Q₂ = Q₁ = Q₀ = 1) ⇒ T₃ = Q₂Q₁Q₀.',
          },
        },
      ],
    },
    {
      id: 'w14-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · Ring Counter vs. Johnson Counter Durum Sayıları',
        en: 'Question 4 · Ring Counter vs. Johnson Counter State Counts',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '4 adet D Flip-Flop ile inşa edilen bir Ring Counter ve bir Johnson Counter devresinin sahip olduğu geçerli durum sayıları sırasıyla kaçtır?',
        en: 'How many valid states do a 4-Flip-Flop Ring Counter and a 4-Flip-Flop Johnson Counter each have, respectively?',
      },
      options: [
        {
          tr: 'Ring Counter: 4 durum; Johnson Counter: 8 durum',
          en: 'Ring Counter: 4 states; Johnson Counter: 8 states',
        },
        {
          tr: 'Ring Counter: 8 durum; Johnson Counter: 16 durum',
          en: 'Ring Counter: 8 states; Johnson Counter: 16 states',
        },
        {
          tr: 'Ring Counter: 4 durum; Johnson Counter: 4 durum',
          en: 'Ring Counter: 4 states; Johnson Counter: 4 states',
        },
        {
          tr: 'Ring Counter: 16 durum; Johnson Counter: 8 durum',
          en: 'Ring Counter: 16 states; Johnson Counter: 8 states',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Formülleri Uygula (n = 4)',
            en: 'Step 1: Apply the Formulas (n = 4)',
          },
          detail: {
            tr: 'Ring Counter (n durum) = 4 durum.\nJohnson Counter (2n durum) = 2 × 4 = 8 durum.',
            en: 'Ring Counter (n states) = 4 states.\nJohnson Counter (2n states) = 2 × 4 = 8 states.',
          },
        },
      ],
    },
    {
      id: 'w14-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · SIPO Kaydırmalı Yazmaç Saat Darbesi Sayısı',
        en: 'Question 5 · SIPO Shift Register Clock Cycle Count',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '8-bitlik bir veriyi önce seri olarak bir SIPO (Serial-In Parallel-Out) yazmaca yüklemek, ardından paralel olarak okumak için minimum kaç saat darbesi (Clock) gerekir?',
        en: 'What is the minimum number of clock pulses required to shift an 8-bit word serially into a SIPO (Serial-In Parallel-Out) register and then read it in parallel?',
      },
      options: [
        { tr: '8 saat darbesi', en: '8 clock pulses' },
        { tr: '1 saat darbesi', en: '1 clock pulse' },
        { tr: '16 saat darbesi', en: '16 clock pulses' },
        { tr: '9 saat darbesi', en: '9 clock pulses' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Seri Giriş Süresi + Paralel Okuma',
            en: 'Step 1: Serial Load Cycles + Parallel Readout',
          },
          detail: {
            tr: '8 bitin seri girişten kaydırılarak içeri alınması için 8 saat darbesi gerekir; 8. darbe tamamlandığında tüm bitler paralel çıkış pinlerinden (ekstra saat darbesi olmadan) aynı anda okunabilir.',
            en: 'Shifting 8 serial bits in takes 8 clock pulses; immediately after the 8th pulse, all 8 bits are simultaneously available on the parallel output pins without an extra clock.',
          },
        },
      ],
    },
    {
      id: 'w14-q6',
      type: 'interactive-table',
      title: {
        tr: 'Soru 6 · 4-Bit Johnson Counter Durum Döngüsü Tablosu',
        en: 'Question 6 · 4-Bit Johnson Counter State Sequence Table',
      },
      difficulty: 'Orta',
      prompt: {
        tr: "Başlangıç durumu 0000 olan 4-bitlik bir Johnson Counter devresinin (D₀ = Q₃', D₁ = Q₀, D₂ = Q₁, D₃ = Q₂) ardışık saat darbeleri boyunca üreteceği Q₀ Q₁ Q₂ Q₃ durum dizisini doldurun.",
        en: "Starting from 0000, fill in the Q₀ Q₁ Q₂ Q₃ state sequence of a 4-bit Johnson Counter (D₀ = Q₃', D₁ = Q₀, D₂ = Q₁, D₃ = Q₂) across consecutive clock pulses.",
      },
      headers: [
        { tr: 'Saat Darbesi', en: 'Clock Pulse' },
        'Q₀',
        'Q₁',
        'Q₂',
        'Q₃',
      ],
      rows: [
        [
          { value: { tr: 'Başlangıç (t₀)', en: 'Initial (t₀)' } },
          { value: '0' }, { value: '0' }, { value: '0' }, { value: '0' },
        ],
        [
          { value: { tr: 'Darbe 1 (t₁)', en: 'Pulse 1 (t₁)' } },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: { tr: 'Darbe 2 (t₂)', en: 'Pulse 2 (t₂)' } },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: { tr: 'Darbe 3 (t₃)', en: 'Pulse 3 (t₃)' } },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: { tr: 'Darbe 4 (t₄)', en: 'Pulse 4 (t₄)' } },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: { tr: 'Darbe 5 (t₅)', en: 'Pulse 5 (t₅)' } },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: { tr: 'Darbe 6 (t₆)', en: 'Pulse 6 (t₆)' } },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: { tr: 'Darbe 7 (t₇)', en: 'Pulse 7 (t₇)' } },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
      ],
      solutionExplanation: {
        tr: "Her darbede sağa kaydırma yapılırken sol uca Q₃' girer: 0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001 (8. darbede tekrar 0000'a döner).",
        en: "On each pulse, bits shift right while Q₃' enters on the left: 0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001 (returning to 0000 on pulse 8).",
      },
    },
    {
      id: 'w14-q7',
      type: 'simulator-build',
      title: {
        tr: 'Soru 7 · 3-Bit Johnson Counter Kurulumu (Canlı Lab)',
        en: 'Question 7 · 3-Bit Johnson Counter Build (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "Simülatörde 3 adet D Flip-Flop kullanarak 3-Bit Johnson Counter (D₀ = Q₂', D₁ = Q₀, D₂ = Q₁) devresini kurun. Üç FF çıkışını sırasıyla Q0, Q1, Q2 LED'lerine bağlayın ve Clock darbeleriyle 6 adımlık durum döngüsünü (000 → 100 → 110 → 111 → 011 → 001 → 000) canlı test edip doğrulayın.",
        en: "In the simulator, use 3 D Flip-Flops to construct a 3-Bit Johnson Counter (D₀ = Q₂', D₁ = Q₀, D₂ = Q₁). Connect the three FF outputs to LEDs Q0, Q1, and Q2, then pulse the Clock to verify the 6-state cycle (000 → 100 → 110 → 111 → 011 → 001 → 000).",
      },
      inputs: [],
      outputs: ['Q0', 'Q1', 'Q2'],
      allowedComponents: ['DFF'],
      expectedTruthTable: [],
      sequentialTest: {
        clkLabel: 'CLK',
        steps: [
          { inputs: {}, expectedOutputs: { Q0: 1, Q1: 0, Q2: 0 } },
          { inputs: {}, expectedOutputs: { Q0: 1, Q1: 1, Q2: 0 } },
          { inputs: {}, expectedOutputs: { Q0: 1, Q1: 1, Q2: 1 } },
          { inputs: {}, expectedOutputs: { Q0: 0, Q1: 1, Q2: 1 } },
          { inputs: {}, expectedOutputs: { Q0: 0, Q1: 0, Q2: 1 } },
          { inputs: {}, expectedOutputs: { Q0: 0, Q1: 0, Q2: 0 } },
        ],
      },
      hint: {
        tr: "1) Üç D Flip-Flop'un CLK pinlerini ortak CLK üretecine bağlayın. 2) FF0'ın Q çıkışını FF1'in D pinine ve Q0 LED'ine bağlayın. 3) FF1'in Q çıkışını FF2'nin D pinine ve Q1 LED'ine bağlayın. 4) FF2'nin Q çıkışını Q2 LED'ine, Q' (tümleyen) çıkışını ise geri döndürüp FF0'ın D pinine bağlayın!",
        en: "1) Connect all three D Flip-Flop CLK pins to the shared CLK generator. 2) Wire FF0's Q output to FF1's D pin and LED Q0. 3) Wire FF1's Q output to FF2's D pin and LED Q1. 4) Wire FF2's Q output to LED Q2, and feed FF2's Q' (complement) output back to FF0's D pin!",
      },
      solutionDescription: {
        tr: "Son D Flip-Flop'un Q' (tümleyen) çıkışı ilk Flip-Flop'un D₀ girişine geri beslendiğinde ekstra hiçbir kapı kullanmadan 6 benzersiz durumlu (2n = 6) 3-Bit Johnson Counter çalışır.",
        en: "Feeding the complemented Q' output of the final D Flip-Flop back into D₀ of the first Flip-Flop builds a 6-state (2n = 6) 3-Bit Johnson Counter with zero external gates.",
      },
    },
  ],
};
