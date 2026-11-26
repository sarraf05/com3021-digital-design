import type { DetailedLectureEntry } from './types';

export const DETAILED_WEEKS_1_TO_5: Record<string, DetailedLectureEntry> = {
  // =========================================================================
  // WEEK 1 — Lecture 0: Introduction & Digital Systems (Sec. 1.1 & Sec. 2.9)
  // =========================================================================
  'w1-c1': {
    cardId: 'w1-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 1.1 · Lecture 0 (Slides 1–2)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 1.1 · Lecture 0 (Slayt 1–2)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Core Concept & Definition)',
      },
      body: {
        en: 'A digital system represents and processes information using discrete values—specifically binary digits (bits, 0 and 1)—that occupy a finite set of distinct states rather than a continuous range. In contrast, an analog system uses continuous-time, continuous-amplitude signals taking infinitely many values. Within digital hardware, timing distinguishes synchronous systems (signals update only at discrete clock transitions t = 0, 1, 2, …) from asynchronous systems (signals respond immediately whenever inputs change, without a global clock).',
        tr: 'Sayısal sistem (digital system), bilgiyi sürekli bir aralık yerine sonlu sayıda ayrık değerle—özellikle ikili basamaklarla (bit: 0 ve 1)—temsil edip işleyen donanım mimarisidir. Buna karşılık analog sistem (analog system), zaman ve genlik ekseninde sürekli değişerek sonsuz sayıda değer alabilen işaretlerle çalışır. Zamanlama açısından senkron sistemler (synchronous systems) yalnızca ayrık saat darbesi anlarında (t = 0, 1, 2, …) durum değiştirirken, asenkron sistemler (asynchronous systems) küresel bir saat sinyali olmadan giriş değiştiği anda çıkış üretebilir.',
      },
      formalEquation:
        'Binary Set B = {0, 1}   |   Synchronous: updates at t = k·T_clk   |   Asynchronous: updates at any t ∈ ℝ',
    },
    procedure: {
      heading: {
        en: 'Classification Rules & System Comparison',
        tr: 'Adım Adım Sınıflandırma Kuralları ve Karşılaştırma',
      },
      steps: [
        {
          en: '1. Inspect Amplitude Domain: If a physical quantity (voltage, pressure, temperature) varies smoothly across an interval, it is analog; if mapped into discrete binary levels (Logic-0 / Logic-1), it is digital.',
          tr: '1. Genlik Eksenini İncele: Gerilim veya sıcaklık gibi büyüklük bir aralıkta kesintisiz değerler alıyorsa analog; ayrık lojik seviyelere (Lojik-0 / Lojik-1) indirgenmişse sayısaldır (digital).',
        },
        {
          en: '2. Inspect Time Domain: Discrete-time signals are sampled at specific instants n·T, whereas continuous-time signals exist for every instant t.',
          tr: '2. Zaman Eksenini İncele: Ayrık zamanlı (discrete-time) işaretler yalnızca örnekleme anlarında tanımlıdır; sürekli zamanlı (continuous-time) işaretler her t anında tanımlıdır.',
        },
        {
          en: '3. Identify Clocking Discipline: Check whether state changes are gated by a periodic clock pulse (synchronous) or occur freely upon input transitions (asynchronous).',
          tr: '3. Saat Disiplinini Belirle: Durum geçişleri periyodik bir saat (clock) darbesiyle eşzamanlanıyorsa senkron (synchronous); giriş değişimlerine anlık tepki veriyorsa asenkron (asynchronous) yapıdadır.',
        },
      ],
      table: {
        caption: {
          en: 'Analog vs. Digital and Synchronous vs. Asynchronous Criteria',
          tr: 'Analog / Sayısal ve Senkron / Asenkron Sistem Karşılaştırması',
        },
        headers: [
          { en: 'Criterion', tr: 'Ölçüt' },
          { en: 'Analog / Continuous', tr: 'Analog / Sürekli' },
          { en: 'Digital / Discrete', tr: 'Sayısal / Ayrık' },
        ],
        rows: [
          [
            { en: 'Signal Values', tr: 'İşaret Değerleri' },
            { en: 'Infinite continuous range', tr: 'Sonsuz sürekli değer aralığı' },
            { en: 'Finite discrete symbols ({0, 1})', tr: 'Sonlu ayrık semboller ({0, 1})' },
          ],
          [
            { en: 'Noise Immunity', tr: 'Gürültü Bağışıklığı' },
            { en: 'Sensitive to drift & noise', tr: 'Sapma ve gürültüye duyarlı' },
            { en: 'High tolerance via voltage margins', tr: 'Gerilim bantları sayesinde yüksek tolerans' },
          ],
          [
            { en: 'Accuracy Scaling', tr: 'Doğruluk Artırımı' },
            { en: 'Limited by component precision', tr: 'Bileşen hassasiyetiyle sınırlı' },
            { en: 'Easily scaled by adding digits/bits', tr: 'Bit sayısı artırılarak kolayca yükseltilir' },
          ],
          [
            { en: 'Timing Mode', tr: 'Zamanlama Modu' },
            { en: 'Usually continuous / asynchronous', tr: 'Genellikle sürekli / asenkron' },
            { en: 'Synchronous (clocked) or asynchronous', tr: 'Senkron (saatli) veya asenkron' },
          ],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Classification Example (Audio & Clocked Control)',
        tr: 'Adım Adım Çözümlü Sınıflandırma Örneği',
      },
      problem: {
        en: 'Classify (a) a microphone voltage waveform and (b) a microprocessor ALU operating at a 100 MHz clock in terms of signal domain and timing discipline.',
        tr: '(a) Bir mikrofonun çıkışındaki ses gerilimi dalga biçimini ve (b) 100 MHz saat frekansıyla çalışan bir mikroişlemci ALU birimini işaret uzayı ve zamanlama disiplini açısından sınıflandırın.',
      },
      steps: [
        {
          en: 'Step 1 — Microphone Waveform: Air pressure moves the diaphragm continuously over time, producing an analog voltage that takes infinitely many real values within [−V_max, +V_max].',
          tr: 'Adım 1 — Mikrofon Dalga Biçimi: Hava basıncı diyaframı zamanla kesintisiz hareket ettirir; çıkış gerilimi [−V_max, +V_max] aralığında sonsuz sayıda gerçek değer aldığı için sürekli zamanlı analog işarettir.',
        },
        {
          en: 'Step 2 — Microprocessor ALU: Operands are represented as discrete bit vectors (e.g., 32-bit binary words), and register updates occur only on active transitions of the 100 MHz clock (every T = 10 ns).',
          tr: 'Adım 2 — Mikroişlemci ALU Birimi: İşlenenler ayrık ikili bit vektörleriyle (ör. 32-bit) temsil edilir ve yazmaç güncellemeleri yalnızca 100 MHz saat sinyalinin aktif kenarlarında (her T = 10 ns) gerçekleşir.',
        },
      ],
      finalAnswer: {
        en: '(a) Continuous-time Analog Signal; (b) Synchronous Digital System.',
        tr: '(a) Sürekli Zamanlı Analog İşaret; (b) Senkron Sayısal Sistem (Synchronous Digital System).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Discrete-time does not automatically mean digital: a sampled signal whose sample amplitudes are still unquantized real numbers is discrete-time analog, whereas a digital signal is discrete in BOTH time and amplitude.',
          tr: 'Ayrık zamanlı (discrete-time) olmak tek başına sayısal (digital) olmak anlamına gelmez: örneklenmiş ancak genliği henüz kuantalanmamış bir işaret ayrık zamanlı analogdur; sayısal işaret hem zaman hem genlikte ayrık olmalıdır.',
        },
        {
          en: 'Asynchronous digital circuits still use binary 0/1 levels; "asynchronous" refers strictly to the absence of a synchronizing clock, not to analog signals.',
          tr: 'Asenkron sayısal devreler de ikili 0/1 seviyelerini kullanır; "asenkron" kavramı işaretin analog olmasını değil, ortak bir saat darbesinin bulunmamasını ifade eder.',
        },
      ],
    },
  },

  'w1-c2': {
    cardId: 'w1-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 1.1 · Lecture 0 (Slide 2)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 1.1 · Lecture 0 (Slayt 2)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Speed–Hardware Trade-Off & Digitization)',
      },
      body: {
        en: 'Digital design inherently trades execution speed against hardware area and cost. A parallel architecture duplicates arithmetic units to compute all digits simultaneously in one step, whereas a serial architecture reuses a single functional unit across multiple clock cycles. Furthermore, interfacing digital processors with the physical world requires Analog-to-Digital Conversion (ADC)—sampling and quantizing continuous signals—and Digital-to-Analog Conversion (DAC) to reconstruct clean analog outputs.',
        tr: 'Sayısal donanım tasarımında temel mühendislik ödünleşimi hız ile donanım alanı/maliyeti (Speed vs. Hardware Trade-off) arasındadır. Paralel mimari tüm basamakları tek adımda işlemek için donanım birimlerini çoğaltırken, seri mimari tek bir işlevsel birimi ardışık saat çevrimlerinde tekrar kullanarak kapı sayısını en aza indirir. Fiziksel dünya ile sayısal işlemciler arasındaki köprü ise ADC (Analog-to-Digital Converter) ve DAC (Digital-to-Analog Converter) birimleriyle kurulur.',
      },
      formalEquation:
        'Parallel N-digit Add: 1 cycle, N adders   |   Serial N-digit Add: N cycles, 1 adder',
    },
    procedure: {
      heading: {
        en: 'Digitization Pipeline & Architecture Trade-Off Steps',
        tr: 'Adım Adım Sayısallaştırma Zinciri ve Mimari Seçimi',
      },
      steps: [
        {
          en: '1. Analog Acquisition & Filtering: Capture the physical sensor voltage and limit its bandwidth before conversion.',
          tr: '1. Analog Algılama: Fiziksel sensörden gelen sürekli gerilim sinyalini yakala ve bant genişliğini sınırla.',
        },
        {
          en: '2. ADC (Sampling & Quantization): Sample the waveform at discrete times and quantize each sample into a finite-bit binary number (higher bit resolution reduces quantization error).',
          tr: '2. ADC (Örnekleme ve Kuantalama): Dalga biçimini ayrık zamanlarda örnekle ve her örneği sonlu bit uzunluğunda ikili sayıya dönüştür (bit sayısı arttıkça doğruluk artar).',
        },
        {
          en: '3. Digital Processing (Parallel vs. Serial): Choose parallel hardware when throughput/latency dominates, or serial hardware when silicon area and power budget dominate.',
          tr: '3. Sayısal İşleme (Paralel vs. Seri): Hız/gecikme kritikse paralel mimariyi, yonga alanı ve güç tüketimi kritikse seri mimariyi seç.',
        },
        {
          en: '4. DAC Reconstruction: Convert the processed binary stream back into a continuous analog output free of intermediate noise accumulation.',
          tr: '4. DAC Geri Dönüşümü: İşlenmiş ikili veriyi yeniden temiz sürekli analog çıkış işaretine dönüştür.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Trade-Off Example (4-Digit Addition: Parallel vs. Serial)',
        tr: 'Adım Adım Çözümlü Örnek (4 Basamaklı Toplamada Hız–Donanım Takası)',
      },
      problem: {
        en: 'Compare adding two 4-bit binary numbers using (a) a 4-bit parallel adder versus (b) a 1-bit serial adder clocked every 10 ns.',
        tr: 'İki 4-bitlik ikili sayıyı toplamak için (a) 4-bitlik paralel toplayıcı ile (b) her 10 ns\'de bir saat darbesi alan 1-bitlik seri toplayıcıyı donanım ve süre açısından karşılaştırın.',
      },
      steps: [
        {
          en: 'Step 1 — Parallel Architecture: Instantiates 4 Full Adder cells side by side. All 4 bit pairs enter simultaneously; total latency is governed by a single combinational carry chain rather than 4 separate clock cycles.',
          tr: 'Adım 1 — Paralel Mimari: Yan yana 4 adet Tam Toplayıcı (Full Adder) kullanır. 4 bit çifti aynı anda işlenir; işlem çoklu saat döngüsü beklemeden tek bir birleşik gecikme süresinde tamamlanır.',
        },
        {
          en: 'Step 2 — Serial Architecture: Instantiates only 1 Full Adder and a 1-bit carry flip-flop. Shift registers feed bit 0, bit 1, bit 2, and bit 3 sequentially across 4 clock edges = 4 × 10 ns = 40 ns.',
          tr: 'Adım 2 — Seri Mimari: Yalnızca 1 adet Tam Toplayıcı ve 1 adet elde flip-flop\'u kullanır. Kaydırmalı yazmaçlar 0., 1., 2. ve 3. bitleri sırayla 4 saat kenarında besler; toplam süre 4 × 10 ns = 40 ns olur.',
        },
      ],
      finalAnswer: {
        en: 'Parallel uses 4× adder hardware for single-step operation; Serial uses 1× adder hardware and takes 4 clock cycles (40 ns).',
        tr: 'Paralel yapı 4 kat toplayıcı donanımıyla tek adımda sonuç üretir; seri yapı 1 kat toplayıcıyla 4 saat çevriminde (40 ns) tamamlar.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Serial systems are NOT necessarily worse—in low-pin-count buses (UART, SPI, I2C) or ultra-low-area ASICs, serial datapaths dramatically cut routing and power.',
          tr: 'Seri sistemler her zaman kötü değildir; az pinli haberleşme hatlarında (UART, SPI, I2C) ve alan kısıtlı yongalarda seri veri yolları kablo ve güç maliyetini ciddi biçimde düşürür.',
        },
        {
          en: 'Increasing digital precision only requires widening the bit width (e.g., 8-bit → 16-bit), whereas analog precision requires tightly matched resistors/capacitors.',
          tr: 'Sayısal doğruluk yalnızca bit genişliği artırılarak (ör. 8-bit → 16-bit) yükseltilebilirken, analog doğruluk bileşen toleranslarıyla sınırlıdır.',
        },
      ],
    },
  },

  'w1-c3': {
    cardId: 'w1-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 1.1 & 4.1 · Lecture 0 (Slide 2)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 1.1 & 4.1 · Lecture 0 (Slayt 2)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Combinational vs. Sequential Systems)',
      },
      body: {
        en: 'Digital logic systems fall into two structural classes based on memory. A combinational circuit (birleşik devre) is memoryless: its output at instant t is strictly a Boolean function of its present input values at the same instant t, z(t) = F(x(t)). A sequential circuit (ardışıl devre) combines logic gates with binary storage elements (latches or flip-flops); therefore its output at time t depends on both the present external input x(t) and the past sequence of inputs x(0, t) captured inside the internal state.',
        tr: 'Sayısal mantık devreleri bellek barındırıp barındırmamalarına göre iki ana sınıfa ayrılır. Birleşik devre (combinational circuit) belleksizdir: t anındaki çıkışı yalnızca aynı t anındaki mevcut girişlerin bir Boole fonksiyonudur, z(t) = F(x(t)). Ardışıl devre (sequential circuit) ise mantık kapılarına ek olarak ikili bellek elemanları (latch veya flip-flop) içerir; dolayısıyla t anındaki çıkışı hem o anki girişe hem de dahili durumda saklanan geçmiş giriş tarihçesine x(0, t) bağlıdır.',
      },
      formalEquation: 'Combinational: z(t) = F(x(t))   |   Sequential: z(t) = F(x(t), Q(t)) = F(x(0, t))',
    },
    procedure: {
      heading: {
        en: 'How to Distinguish Combinational vs. Sequential Hardware',
        tr: 'Adım Adım Devre Sınıfı Belirleme Kuralları',
      },
      steps: [
        {
          en: '1. Check for Storage Elements: Look for Flip-Flops (D, JK, T) or Latches. Any circuit with flip-flops is sequential.',
          tr: '1. Bellek Elemanı Kontrolü: Devrede D, JK, T Flip-Flop veya Latch olup olmadığını kontrol et; bellek elemanı varsa devre ardışıldır.',
        },
        {
          en: '2. Check for Feedback Loops: Even without explicit flip-flops, a closed feedback path from a gate output back to an earlier gate input creates memory (asynchronous sequential behavior).',
          tr: '2. Geri Besleme Yolu Kontrolü: Açık bir flip-flop olmasa dahi bir kapı çıkışından önceki bir kapı girişine dönen kapalı geri besleme yolu bellek oluşturur.',
        },
        {
          en: '3. Verify Specification Requirement: If identical current inputs can yield different outputs depending on history (like a counter or vending machine), sequential design is mandatory.',
          tr: '3. Davranış Kontrolü: Aynı anlık giriş kombinasyonu geçmişe bağlı olarak farklı çıkışlar üretebiliyorsa (ör. sayıcılar, kilitler), ardışıl tasarım zorunludur.',
        },
      ],
      table: {
        caption: {
          en: 'Structural Comparison: Combinational vs. Sequential Circuits',
          tr: 'Birleşik ve Ardışıl Devrelerin Yapısal Karşılaştırması',
        },
        headers: [
          { en: 'Property', tr: 'Özellik' },
          { en: 'Combinational', tr: 'Birleşik (Combinational)' },
          { en: 'Sequential', tr: 'Ardışıl (Sequential)' },
        ],
        rows: [
          [
            { en: 'Memory Elements', tr: 'Bellek Elemanları' },
            { en: 'None (logic gates only)', tr: 'Yok (yalnızca kapılar)' },
            { en: 'Yes (Latches / Flip-Flops)', tr: 'Var (Latch / Flip-Flop)' },
          ],
          [
            { en: 'Output Dependence', tr: 'Çıkış Bağımlılığı' },
            { en: 'Present inputs only', tr: 'Yalnızca şimdiki girişler' },
            { en: 'Present inputs + Present state (history)', tr: 'Şimdiki girişler + Mevcut durum' },
          ],
          [
            { en: 'Primary Representation', tr: 'Temel İfade Aracı' },
            { en: 'Truth table & Boolean algebra', tr: 'Durum tablosu (State Table) & Diyagram' },
          ],
          [
            { en: 'Classic Examples', tr: 'Klasik Örnekler' },
            { en: 'Adders, MUX, Decoders', tr: 'Toplayıcılar, MUX, Kod Çözücüler' },
            { en: 'Registers, Counters, FSMs', tr: 'Yazmaçlar, Sayıcılar, Sonlu Durum Makineleri' },
          ],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Comparison Example (Binary Adder vs. Binary Counter)',
        tr: 'Adım Adım Çözümlü Örnek (İkili Toplayıcı ve İkili Sayıcı)',
      },
      problem: {
        en: 'Explain why a 4-bit Binary Adder is combinational whereas a 4-bit Binary Counter is sequential even though both perform arithmetic.',
        tr: 'Her ikisi de ikili sayı işlemi yaptığı halde 4-bit İkili Toplayıcı\'nın neden birleşik (combinational), 4-bit İkili Sayıcı\'nın ise neden ardışıl (sequential) olduğunu açıklayın.',
      },
      steps: [
        {
          en: 'Step 1 — 4-Bit Adder: When inputs A = 0011 and B = 0101 are applied, the output is always Sum = 1000 regardless of what A and B were previously. Removing inputs clears the output; no state is retained.',
          tr: 'Adım 1 — 4-Bit Toplayıcı: Girişlere A = 0011 ve B = 0101 uygulandığında önceki girişler ne olursa olsun çıkış daima 1000 olur. Önceki toplam saklanmaz.',
        },
        {
          en: 'Step 2 — 4-Bit Counter: Each clock pulse increments the stored value (0000 → 0001 → 0010 …). Without knowing the present stored state Q(t), the next output Q(t+1) after a clock edge cannot be determined.',
          tr: 'Adım 2 — 4-Bit Sayıcı: Her saat darbesinde saklanan sayı bir artar (0000 → 0001 → 0010 …). Flip-floplarda saklanan mevcut durum Q(t) bilinmeden sonraki çıkış Q(t+1) belirlenemez.',
        },
      ],
      finalAnswer: {
        en: '4-bit Adder is combinational (memoryless); 4-bit Counter is sequential (requires flip-flops to retain count state).',
        tr: '4-bit Toplayıcı birleşik devredir (belleksiz); 4-bit Sayıcı ise sayım durumunu korumak için flip-flop gerektiren ardışıl devredir.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'A sequential circuit almost always CONTAINS a combinational block inside it (next-state and output logic), plus memory elements; having gates does not make a circuit purely combinational.',
          tr: 'Bir ardışıl devrenin içinde neredeyse her zaman bir birleşik mantık bloğu (sonraki durum ve çıkış lojiği) bulunur; devrede kapı olması devreyi tek başına birleşik yapmaz.',
        },
        {
          en: 'Never assume a gate-only diagram is combinational without checking for wire feedback paths.',
          tr: 'Geri besleme (feedback) hatlarını kontrol etmeden yalnızca kapılardan oluşan her şemanın birleşik olduğunu varsaymayın.',
        },
      ],
    },
  },

  'w1-c4': {
    cardId: 'w1-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 2.9 · Lecture 0 (Slide 2)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 2.9 · Lecture 0 (Slayt 2)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (IC Integration Scales & Programmable Logic)',
      },
      body: {
        en: 'Digital integrated circuits (ICs) are classified by their level of integration—the approximate number of logic gates or transistors fabricated on a single semiconductor die (chip). As fabrication technology scaled from Small-Scale Integration (SSI) to Ultra-Large-Scale Integration (ULSI) and System-on-Chip (SoC), designers gained standard fixed-function MSI blocks alongside field-programmable platforms (FPGAs) and custom Application-Specific ICs (ASICs).',
        tr: 'Sayısal tümleşik devreler (Integrated Circuits - ICs), tek bir yarı iletken silikon yonga (die) üzerine yerleştirilen mantık kapısı veya transistör yoğunluğuna göre entegrasyon ölçeklerine ayrılır. Üretim teknolojisi SSI\'dan ULSI ve tek yongalı sistemlere (SoC) ilerledikçe, standart MSI bileşenlerinin yanında sahada programlanabilir FPGA yongaları ve uygulamaya özel ASIC tasarımları ortaya çıkmıştır.',
      },
      formalEquation: 'SSI (<10) → MSI (10–100) → LSI (100–1K) → VLSI (1K–10K+) → ULSI / SoC (>1M)',
    },
    procedure: {
      heading: {
        en: 'Integration Scale Classification & Hardware Mapping',
        tr: 'Adım Adım Entegrasyon Ölçekleri ve Donanım Eşleştirme',
      },
      steps: [
        {
          en: '1. Identify Component Granularity: Individual basic gates belong to SSI; medium functional blocks (adders, decoders, MUXs, registers) belong to MSI.',
          tr: '1. Bileşen Düzeyini Belirle: Tekil temel kapılar SSI; toplayıcı, kod çözücü, MUX ve yazmaç gibi orta ölçekli işlevsel bloklar MSI sınıfındadır.',
        },
        {
          en: '2. Identify System-Level Integration: Memory chips and ALUs fall into LSI/VLSI, while modern CPUs, GPUs, and SoCs exceed millions of transistors (ULSI).',
          tr: '2. Sistem Düzeyi Entegrasyonu Tanı: Bellek dizileri ve ALU\'lar LSI/VLSI; modern işlemciler ve SoC\'ler milyonlarca kapılı ULSI sınıfındadır.',
        },
        {
          en: '3. Select Implementation Target: Choose ASIC for maximum speed/volume efficiency, or FPGA when reconfigurability and rapid prototyping are required.',
          tr: '3. Gerçekleme Platformunu Seç: Yüksek hacim ve en yüksek hız için ASIC; sahada yeniden programlanabilirlik ve hızlı prototipleme için FPGA tercih et.',
        },
      ],
      table: {
        caption: {
          en: 'IC Integration Scales (Lecture 0 & Mano Sec. 2.9)',
          tr: 'Entegre Devre (IC) Ölçekleri Tablosu',
        },
        headers: [
          { en: 'Scale', tr: 'Ölçek' },
          { en: 'Full Name', tr: 'Açılımı' },
          { en: 'Typical Gate / Device Count', tr: 'Tipik Kapı / Bileşen Sayısı' },
          { en: 'Representative Hardware', tr: 'Tipik Donanım Örnekleri' },
        ],
        rows: [
          ['SSI', 'Small-Scale Integration', '≤ 10 gates', '7400 NAND, 7404 NOT, basic gates'],
          ['MSI', 'Medium-Scale Integration', '10 – 100 gates', 'Adders, Decoders, MUX, Flip-Flops'],
          ['LSI', 'Large-Scale Integration', '100 – 1,000 gates', 'Small memories, processors, PLDs'],
          ['VLSI', 'Very Large-Scale Integration', 'Thousands to millions', 'Microprocessors, DSPs, complex ASICs'],
          ['ULSI / SoC', 'Ultra-Large / System on Chip', '> 1,000,000 devices', 'CPUs, GPUs, FPGAs, ARM SoCs'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Mapping Example (74xx Series & SoC Architecture)',
        tr: 'Adım Adım Çözümlü Örnek (74xx Ailesi ve SoC Karşılaştırması)',
      },
      problem: {
        en: 'Classify the following hardware components by IC integration scale: (a) 74LS08 Quad 2-input AND IC, (b) 74LS138 3-to-8 Line Decoder IC, and (c) a smartphone processor integrating CPU cores, GPU, RAM controller, and USB I/O.',
        tr: 'Şu donanım bileşenlerini entegrasyon ölçeğine göre sınıflandırın: (a) 74LS08 Dörtlü 2-girişli AND entegresi, (b) 74LS138 3-to-8 Decoder entegresi, (c) CPU, GPU, bellek denetleyicisi ve I/O birimlerini tek yongada toplayan akıllı telefon işlemcisi.',
      },
      steps: [
        {
          en: 'Step 1 — 74LS08: Contains only 4 independent 2-input AND gates (fewer than 10 gates total) → SSI.',
          tr: 'Adım 1 — 74LS08: Yalnızca 4 adet bağımsız 2-girişli AND kapısı içerir (toplam < 10 kapı) → SSI.',
        },
        {
          en: 'Step 2 — 74LS138: Implements a complete combinational decoding function using ~10–30 internal gates → MSI.',
          tr: 'Adım 2 — 74LS138: Yaklaşık 10–30 iç kapı ile eksiksiz bir kod çözme işlevi sunar → MSI.',
        },
        {
          en: 'Step 3 — Smartphone Chip: Combines processing cores, graphics, memory interfaces, and peripherals on one silicon die → ULSI / SoC (System on Chip).',
          tr: 'Adım 3 — Akıllı Telefon Yongası: İşlemci çekirdekleri, grafik birimi ve çevre birimlerini tek silikonda birleştirir → ULSI / SoC (System on Chip).',
        },
      ],
      finalAnswer: {
        en: '(a) SSI, (b) MSI, (c) ULSI / SoC.',
        tr: '(a) SSI, (b) MSI, (c) ULSI / SoC.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do not confuse MSI devices (decoders, multiplexers, adders) with SSI—MSI devices perform complete elementary digital functions.',
          tr: 'Kod çözücü (decoder), çoklayıcı (MUX) ve toplayıcıları SSI ile karıştırmayın; bunlar temel işlevsel bloklar oldukları için MSI sınıfındadır.',
        },
        {
          en: 'An FPGA is reprogrammable after manufacturing via lookup tables (LUTs) and routing switches, whereas an ASIC has fixed hardwired masks.',
          tr: 'FPGA üretimden sonra LUT ve yönlendirme anahtarları üzerinden yeniden programlanabilirken, ASIC kalıcı maskelerle sabitlenir.',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 2 — Lecture 1: Binary Systems, Base Conversions & Complements (1.2-1.6)
  // =========================================================================
  'w2-c1': {
    cardId: 'w2-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 1.2 · Lecture 1 (Slides 1–2)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 1.2 · Lecture 1 (Slayt 1–2)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Positional Number Systems in Base-r)',
      },
      body: {
        en: 'In a positional number system with radix (base) r, the value of a string of digits depends on both each digit’s symbol and its position relative to the radix point. The base-r system uses r distinct digits {0, 1, …, r − 1}, and every position j carries positional weight r^j (positive powers to the left of the radix point, negative powers to the right). Multiplying each coefficient a_j by r^j and summing produces the decimal equivalent.',
        tr: 'r tabanlı (radix-r) konumsal sayı sisteminde bir sayının değeri, hem basamaktaki rakama hem de bu rakamın taban noktasına (radix point) göre konumuna bağlıdır. r tabanında {0, 1, …, r − 1} kümesinden r adet rakam kullanılır; her j konumu r^j ağırlığına sahiptir (noktanın solunda pozitif, sağında negatif kuvvetler). Her katsayının kendi konumsal ağırlığı r^j ile çarpılıp toplanması sayının onluk (decimal) değerini verir.',
      },
      formalEquation: '(N)_r = ∑_{j=-m}^{n} a_j · r^j   (0 ≤ a_j ≤ r − 1)',
    },
    procedure: {
      heading: {
        en: 'Base-r to Decimal Polynomial Expansion Procedure',
        tr: 'Adım Adım Taban-r’den Onluk Tabana (Decimal) Dönüşüm',
      },
      steps: [
        {
          en: '1. Index Positions from the Radix Point: Assign j = 0, 1, 2, … moving left from the radix point, and j = −1, −2, … moving right.',
          tr: '1. Konumları İndeksle: Taban noktasından sola doğru j = 0, 1, 2, … ve sağa doğru j = −1, −2, … indislerini yaz.',
        },
        {
          en: '2. Replace Letters in Hex (r = 16): Substitute A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.',
          tr: '2. Onaltılık Harfleri Çevir (r = 16): A = 10, B = 11, C = 12, D = 13, E = 14, F = 15 değerlerini yerine koy.',
        },
        {
          en: '3. Compute Weighted Sum: Evaluate ∑ a_j · r^j and add integer and fractional contributions.',
          tr: '3. Ağırlıklı Toplamı Hesapla: Her a_j · r^j terimini çarpıp tam ve kesirli kısımları topla.',
        },
      ],
      table: {
        caption: {
          en: 'Standard Digital Number Systems (Mano Table 1.1 & Lecture 1)',
          tr: 'Temel Sayı Sistemleri ve Taban İlişkileri',
        },
        headers: ['Decimal (r=10)', 'Binary (r=2)', 'Octal (r=8)', 'Hexadecimal (r=16)'],
        rows: [
          ['0', '0000', '0', '0'],
          ['7', '0111', '7', '7'],
          ['8', '1000', '10', '8'],
          ['10', '1010', '12', 'A'],
          ['15', '1111', '17', 'F'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Expansion Example (Mano Ch. 1.2 & Lecture 1)',
        tr: 'Adım Adım Çözümlü Örnek (İkili ve Onaltılık Taban Açılımı)',
      },
      problem: {
        en: 'Convert (a) binary (11010.11)_2 and (b) hexadecimal (37B)_16 to base-10 using power-series expansion.',
        tr: '(a) İkili (11010.11)_2 ve (b) onaltılık (37B)_16 sayılarını kuvvet serisi açılımıyla onluk (decimal) tabana dönüştürün.',
      },
      steps: [
        {
          en: 'Part (a): (11010.11)_2 = 1·2^4 + 1·2^3 + 0·2^2 + 1·2^1 + 0·2^0 + 1·2^−1 + 1·2^−2',
          tr: 'Kısım (a): (11010.11)_2 = 1·2^4 + 1·2^3 + 0·2^2 + 1·2^1 + 0·2^0 + 1·2^−1 + 1·2^−2',
        },
        {
          en: 'Evaluate Part (a): = 16 + 8 + 0 + 2 + 0 + 0.5 + 0.25 = (26.75)_10.',
          tr: 'Kısım (a) Hesabı: = 16 + 8 + 0 + 2 + 0 + 0.5 + 0.25 = (26.75)_10.',
        },
        {
          en: 'Part (b): (37B)_16 = 3·16^2 + 7·16^1 + 11·16^0 = 3·256 + 7·16 + 11·1 = 768 + 112 + 11 = (891)_10.',
          tr: 'Kısım (b): (37B)_16 = 3·16^2 + 7·16^1 + 11·16^0 = 3·256 + 7·16 + 11·1 = 768 + 112 + 11 = (891)_10.',
        },
      ],
      finalAnswer: {
        en: '(11010.11)_2 = (26.75)_10   |   (37B)_16 = (891)_10.',
        tr: '(11010.11)_2 = (26.75)_10   |   (37B)_16 = (891)_10.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Always verify no digit violates a_j ≥ r (for instance, (381)_8 is invalid because 8 is not an octal digit).',
          tr: 'Hiçbir rakamın taban değerine eşit veya büyük olmamasına dikkat edin (örneğin (381)_8 geçersizdir çünkü sekizlik tabanda 8 rakamı yoktur).',
        },
        {
          en: 'Remember 2^−1 = 0.5, 2^−2 = 0.25, 2^−3 = 0.125, and 2^−4 = 0.0625—do not confuse negative powers of 2 with decimal tenths.',
          tr: '2^−1 = 0.5, 2^−2 = 0.25, 2^−3 = 0.125 ve 2^−4 = 0.0625 değerlerini ondalık onda birlerle karıştırmayın.',
        },
      ],
    },
  },

  'w2-c2': {
    cardId: 'w2-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 1.3–1.4 · Lecture 1 (Slides 3–5)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 1.3–1.4 · Lecture 1 (Slayt 3–5)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Radix Conversion Methods)',
      },
      body: {
        en: 'Converting a decimal number with both integer and fractional parts to base-r requires separating the two parts because they invert opposite operations: the integer part is divided repeatedly by r (generating remainders from LSB to MSB), whereas the fractional part is multiplied repeatedly by r (generating integer carries from MSB-fraction a_−1 downward). Because 8 = 2^3 and 16 = 2^4, conversions among Binary, Octal, and Hexadecimal proceed directly by grouping bits in 3s or 4s around the binary point.',
        tr: 'Hem tam hem kesir kısmı olan bir onluk sayıyı r tabanına çevirmek için iki kısım mutlaka ayrı işlenir: tam kısım sürekli r\'ye bölünerek kalanlar en az anlamlı bitten (LSB) en anlamlı bite (MSB) doğru elde edilirken; kesir kısmı sürekli r ile çarpılarak oluşan tam kısımlar yukarıdan aşağıya (a_−1, a_−2, …) sıralanır. 8 = 2^3 ve 16 = 2^4 ilişkisi nedeniyle İkili, Sekizlik ve Onaltılık tabanlar arasında ikili noktadan sağa ve sola 3\'erli veya 4\'erli bit gruplamasıyla doğrudan geçiş yapılır.',
      },
      formalEquation: 'Integer: ÷ r (bottom-to-top remainders)   |   Fraction: × r (top-to-bottom carries)',
    },
    procedure: {
      heading: {
        en: 'Step-by-Step Conversion Procedure',
        tr: 'Adım Adım Taban Dönüşüm Prosedürü',
      },
      steps: [
        {
          en: '1. Split Integer & Fraction: Separate N into integer I and fraction F (N = I + F).',
          tr: '1. Tam ve Kesir Kısmı Ayır: Sayıyı tam kısım I ve kesir kısım F olarak ikiye böl.',
        },
        {
          en: '2. Integer Conversion (Repeated Division): Divide quotient successively by r until quotient reaches 0; read remainders from last (MSB) to first (LSB).',
          tr: '2. Tam Kısım (Ardışık Bölme): Bölüm 0 olana dek sayıyı sürekli r\'ye böl; kalanları sondan başa (aşağıdan yukarıya) yaz.',
        },
        {
          en: '3. Fraction Conversion (Repeated Multiplication): Multiply only the fractional remainder by r at each step; record the integer carry produced at each step from top to bottom until fraction becomes 0 or desired precision is reached.',
          tr: '3. Kesir Kısım (Ardışık Çarpma): Her adımda yalnızca kesirli kısmı r ile çarp; üretilen tam sayıları yukarıdan aşağıya yaz ve kesir sıfırlanınca (veya istenen basamağa ulaşınca) dur.',
        },
        {
          en: '4. Binary ↔ Octal / Hex Grouping: Group bits in 3s (Octal) or 4s (Hex) outward from the binary point; pad outer ends with 0s.',
          tr: '4. İkili ↔ Octal / Hex Gruplaması: İkili noktadan dışa doğru 3\'erli (Octal) veya 4\'erli (Hex) grupla; eksik kalan dış uçları 0 ile tamamla.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Example: Convert (41.6875)_10 to Binary, Octal & Hex (Mano Ex. 1.1–1.4)',
        tr: 'Adım Adım Çözümlü Örnek: (41.6875)_10 Dönüşümleri (Mano Örn. 1.1–1.4)',
      },
      problem: {
        en: 'Convert (41.6875)_10 to Binary, then convert the binary result directly to Octal and Hexadecimal.',
        tr: '(41.6875)_10 sayısını önce İkili (Binary) tabana, ardından doğrudan Sekizlik (Octal) ve Onaltılık (Hexadecimal) tabanlara dönüştürün.',
      },
      steps: [
        {
          en: 'Step 1 — Integer 41 ÷ 2: 41÷2=20 R1 (a_0=1) → 20÷2=10 R0 → 10÷2=5 R0 → 5÷2=2 R1 → 2÷2=1 R0 → 1÷2=0 R1 (a_5=1). Reading bottom-to-top gives (41)_10 = (101001)_2.',
          tr: 'Adım 1 — Tam Kısım 41 ÷ 2: 41÷2=20 K1 → 20÷2=10 K0 → 10÷2=5 K0 → 5÷2=2 K1 → 2÷2=1 K0 → 1÷2=0 K1. Sondan başa okununca (41)_10 = (101001)_2 elde edilir.',
        },
        {
          en: 'Step 2 — Fraction 0.6875 × 2: 0.6875×2 = 1.375 (a_−1=1) → 0.375×2 = 0.75 (a_−2=0) → 0.75×2 = 1.50 (a_−3=1) → 0.50×2 = 1.00 (a_−4=1). Reading top-to-bottom gives (.1011)_2.',
          tr: 'Adım 2 — Kesir Kısım 0.6875 × 2: 0.6875×2 = 1.375 (1) → 0.375×2 = 0.75 (0) → 0.75×2 = 1.50 (1) → 0.50×2 = 1.00 (1). Yukarıdan aşağıya (.1011)_2 olur.',
        },
        {
          en: 'Step 3 — Binary to Octal (groups of 3 from point): (101 001 . 101 100)_2 = (51.54)_8 (padded trailing zero on right).',
          tr: 'Adım 3 — İkili → Octal (noktadan 3\'erli grup): (101 001 . 101 100)_2 = (51.54)_8 (sağdaki eksik grup 0 ile tamamlandı).',
        },
        {
          en: 'Step 4 — Binary to Hex (groups of 4 from point): (0010 1001 . 1011)_2 = (29.B)_16 (padded two leading zeros on left).',
          tr: 'Adım 4 — İkili → Hex (noktadan 4\'erli grup): (0010 1001 . 1011)_2 = (29.B)_16 (soldaki eksik grup 00 ile tamamlandı).',
        },
      ],
      finalAnswer: {
        en: '(41.6875)_10 = (101001.1011)_2 = (51.54)_8 = (29.B)_16.',
        tr: '(41.6875)_10 = (101001.1011)_2 = (51.54)_8 = (29.B)_16.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Most common fraction mistake: padding zeros on the WRONG side! In fractions (.1011)_2, pad zeros on the RIGHT (.101 100 = .54_8), NEVER on the left (.101 001).',
          tr: 'Kesir gruplamasında en sık hata sıfırı yanlış tarafa eklemektir: (.1011)_2 kesrinde 3\'lü grup tamamlamak için 0 her zaman SAĞA eklenir (.101 100 = .54_8), asla sola eklenmez!',
        },
        {
          en: 'Do not reverse the read order for fractions: integer remainders are read bottom-to-top, while fraction carries are read top-to-bottom.',
          tr: 'Okuma yönünü karıştırmayın: tam kısımda kalanlar aşağıdan yukarıya, kesir kısımda tam kısımlar yukarıdan aşağıya yazılır.',
        },
      ],
    },
  },

  'w2-c3': {
    cardId: 'w2-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 1.5 · Lecture 1 (Slides 6–7)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 1.5 · Lecture 1 (Slayt 6–7)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (r’s and (r−1)’s Complements)',
      },
      body: {
        en: 'Complements simplify subtraction and signed-number hardware in digital computers by turning subtraction into addition. For an n-digit number N in base r, there are two types: the Diminished Radix Complement, called the (r − 1)\'s complement, defined as (r^n − 1) − N; and the Radix Complement, called the r\'s complement, defined as r^n − N for N ≠ 0 (and 0 for N = 0). Notice that r\'s complement is always obtained by adding 1 to the (r − 1)\'s complement.',
        tr: 'Tümleyenler (Complements), sayısal bilgisayarlarda çıkarma işlemini toplamaya dönüştürerek donanımı sadeleştirir. r tabanında n basamaklı bir N sayısı için iki tümleyen tanımlanır: Eksiltilmiş Tabana Tümleyen ((r − 1)\'e tümleyen) (r^n − 1) − N formülüyle; Tabana Tümleyen (r\'ye tümleyen) ise N ≠ 0 için r^n − N (N = 0 için 0) formülüyle tanımlanır. r\'ye tümleyen her zaman (r − 1)\'e tümleyene 1 eklenerek elde edilir.',
      },
      formalEquation: "(r−1)'s Comp: (r^n − 1) − N   |   r's Comp: r^n − N = [(r^n − 1) − N] + 1",
    },
    procedure: {
      heading: {
        en: 'Rules for 9’s / 10’s and 1’s / 2’s Complements',
        tr: 'Adım Adım 9’a / 10’a ve 1’e / 2’ye Tümleyen Alma Kuralları',
      },
      steps: [
        {
          en: '1. Fixed Bit/Digit Width n: Pad leading zeros first if N has fewer than n digits (complements depend strictly on n).',
          tr: '1. Sabit Basamak Sayısı n: Sayı n basamaktan kısaysa başına sıfır ekle (tümleyen sonucu basamak sayısına bağlıdır).',
        },
        {
          en: '2. (r−1)\'s Complement: Subtract every digit from (r − 1). In decimal (r=10), subtract each digit from 9; in binary (r=2), invert every bit (0 ↔ 1) to get 1\'s complement.',
          tr: '2. (r−1)\'e Tümleyen: Her rakamı (r−1)\'den çıkar. Onlukta her basamağı 9\'dan çıkar (9\'a tümleyen); ikilide her biti tersle (0 ↔ 1) (1\'e tümleyen).',
        },
        {
          en: '3. r\'s Complement (Method A): Compute (r−1)\'s complement and add 1 to the least significant position.',
          tr: '3. r\'ye Tümleyen (Yöntem A): (r−1)\'e tümleyeni bul ve en sağ basamağa 1 ekle.',
        },
        {
          en: '4. r\'s Complement Shortcut (Method B): Leave all least significant zeros unchanged, subtract the first nonzero digit from r, and subtract all higher digits from (r − 1). For 2\'s complement: keep trailing 0s and the first 1 from the right, then flip all bits to the left.',
          tr: '4. r\'ye Tümleyen Kısa Yolu (Yöntem B): Sağdaki tüm sıfırları aynen bırak, sıfır olmayan ilk basamağı r\'den çıkar, solundakileri (r−1)\'den çıkar. 2\'ye tümleyende: sağdan ilk 1 dahil bitleri koru, solundaki tüm bitleri tersle.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Examples: Decimal 10’s & Binary 2’s Complement (Mano Sec. 1.5)',
        tr: 'Adım Adım Çözümlü Örnek: 10’a ve 2’ye Tümleyen Hesabı',
      },
      problem: {
        en: 'Find (a) the 9\'s and 10\'s complement of 012398 (n = 6), and (b) the 1\'s and 2\'s complement of 1011000 (n = 7).',
        tr: '(a) 012398 (n = 6) sayısının 9\'a ve 10\'a tümleyenini, (b) 1011000 (n = 7) ikili sayısının 1\'e ve 2\'ye tümleyenini bulunuz.',
      },
      steps: [
        {
          en: 'Part (a) — 9\'s Complement: 999999 − 012398 = 987601.',
          tr: 'Kısım (a) — 9\'a Tümleyen: 999999 − 012398 = 987601.',
        },
        {
          en: 'Part (a) — 10\'s Complement: 987601 + 1 = 987602 (Shortcut check: rightmost nonzero 8 → 10−8=2, remaining digits from 9 → 987602).',
          tr: 'Kısım (a) — 10\'a Tümleyen: 987601 + 1 = 987602 (Kısa yol kontrolü: en sağdaki sıfır olmayan 8 → 10−8=2, kalanlar 9\'dan → 987602).',
        },
        {
          en: 'Part (b) — 1\'s Complement: Flip every bit of 1011000 → 0100111.',
          tr: 'Kısım (b) — 1\'e Tümleyen: 1011000 bitlerini tersle → 0100111.',
        },
        {
          en: 'Part (b) — 2\'s Complement: 0100111 + 1 = 0101000 (Shortcut check: keep trailing "1000", invert "101" on left → "010" → 0101000).',
          tr: 'Kısım (b) — 2\'ye Tümleyen: 0100111 + 1 = 0101000 (Kısa yol: sağdan ilk 1 dahil "1000" korunur, soldaki "101" terslenip "010" olur → 0101000).',
        },
      ],
      finalAnswer: {
        en: '(a) 9\'s: 987601, 10\'s: 987602   |   (b) 1\'s: 0100111, 2\'s: 0101000.',
        tr: '(a) 9\'a: 987601, 10\'a: 987602   |   (b) 1\'e: 0100111, 2\'ye: 0101000.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Leading zeros CANNOT be dropped before taking a complement! The 10\'s complement of 012398 (6 digits) is 987602, whereas for 12398 (5 digits) it would be 87602.',
          tr: 'Tümleyen almadan önce baştaki sıfırlar asla silinmez! 6 basamaklı 012398\'in 10\'a tümleyeni 987602 iken, 5 basamaklı 12398 için 87602 olur.',
        },
        {
          en: 'The r\'s complement of 0000 is defined as 0000: if adding 1 to 1111 generates a carry out of n bits (10000), discard the carry.',
          tr: '0000 sayısının 2\'ye tümleyeni yine 0000\'dır; 1111 + 1 = 10000 işleminde n bitten taşan elde atılır.',
        },
      ],
    },
  },

  'w2-c4': {
    cardId: 'w2-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 1.5–1.6 · Lecture 1 (Slides 8–10)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 1.5–1.6 · Lecture 1 (Slayt 8–10)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Subtraction with Complements & Signed Binary)',
      },
      body: {
        en: 'Unsigned subtraction M − N in base r is performed using addition by computing M + (r^n − N) for r\'s complement, or M + (r^n − 1 − N) for (r − 1)\'s complement. Meanwhile, signed binary integers use the leftmost bit as a sign bit (0 for positive, 1 for negative) under three conventions: Signed-Magnitude, Signed-1\'s Complement, and Signed-2\'s Complement—with 2\'s complement being standard because it eliminates duplicate zero (−0) and allows direct hardware addition.',
        tr: 'r tabanında işaretsiz M − N çıkarması, r\'ye tümleyende M + (r^n − N) veya (r − 1)\'e tümleyende M + (r^n − 1 − N) toplanarak donanımda yalnızca toplayıcı ile yapılır. İşaretli ikili sayılarda ise en sol bit işaret bitidir (0: pozitif, 1: negatif). Üç gösterimden (Signed-Magnitude, 1\'s Complement, 2\'s Complement) modern bilgisayarlarda yalnızca tek sıfıra (0000) sahip olan ve işaret bitini doğrudan toplamaya katan Signed-2\'s Complement kullanılır.',
      },
      formalEquation: '4-bit Signed-2\'s Range: [−8, +7]   |   n-bit Signed-2\'s Range: [−2^(n−1), +2^(n−1) − 1]',
    },
    procedure: {
      heading: {
        en: 'Subtraction Algorithm Using Complements',
        tr: 'Adım Adım Tümleyenlerle Çıkarma Algoritması',
      },
      steps: [
        {
          en: '1. Equalize Lengths: Pad M and N to the same n digits.',
          tr: '1. Basamak Eşitle: M ve N sayılarını aynı n basamak uzunluğuna getir.',
        },
        {
          en: '2. Form Complement of N & Add: Compute S = M + (r\'s complement of N). (Or use (r−1)\'s complement).',
          tr: '2. N\'nin Tümleyenini Al ve Topla: S = M + (N\'nin r\'ye tümleyeni) toplamını hesapla.',
        },
        {
          en: '3. Check End Carry (r\'s Complement): If an end carry occurs (M ≥ N), discard the carry; the remaining n digits are the positive answer. If NO end carry occurs (M < N), take the r\'s complement of the sum and prefix a minus sign.',
          tr: '3. Son Elde Kontrolü (r\'ye Tümleyen): Son elde (end carry) oluşursa (M ≥ N) eldeyi at; kalan sonuç pozitiftir. Son elde YOKSA (M < N) toplamın tekrar r\'ye tümleyenini al ve önüne eksi (−) koy.',
        },
        {
          en: '4. Special Rule for (r−1)\'s Complement: If an end carry occurs, add 1 to the LSB (End-Around Carry). If no end carry occurs, take the (r−1)\'s complement of the sum and prefix a minus sign.',
          tr: '4. (r−1)\'e Tümleyen Farkı: Son elde oluşursa sonucu atmak yerine en sağ basamağa +1 olarak ekle (End-Around Carry). Elde yoksa toplamın (r−1)\'e tümleyenini alıp başına eksi koy.',
        },
      ],
      table: {
        caption: {
          en: '4-Bit Signed Binary Representations (Mano Table 1.3)',
          tr: '4-Bit İşaretli İkili Sayı Gösterimleri (Mano Tablo 1.3)',
        },
        headers: ['Decimal', 'Signed-Magnitude', "Signed 1's Comp", "Signed 2's Comp"],
        rows: [
          ['+7', '0111', '0111', '0111'],
          ['+0', '0000', '0000', '0000'],
          ['−0', '1000', '1111', '— (none)'],
          ['−1', '1001', '1110', '1111'],
          ['−7', '1111', '1000', '1001'],
          ['−8', '— (N/A)', '— (N/A)', '1000'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Example: M − N and N − M via 2’s Complement (Mano Ex. 1.7)',
        tr: 'Adım Adım Çözümlü Örnek: 2’ye Tümleyen ile Çıkarma (Mano Örn. 1.7)',
      },
      problem: {
        en: 'Given X = 1010100 and Y = 1000011 (7 bits), compute (a) X − Y and (b) Y − X using 2\'s complement.',
        tr: 'X = 1010100 ve Y = 1000011 (7 bit) veriliyor. 2\'ye tümleyen yöntemiyle (a) X − Y ve (b) Y − X işlemlerini yapınız.',
      },
      steps: [
        {
          en: 'Part (a) X − Y: 2\'s complement of Y = 0111101. Add: 1010100 + 0111101 = 1 0010001. An end carry (1) occurs → discard it → result is +0010001 (+17).',
          tr: 'Kısım (a) X − Y: Y\'nin 2\'ye tümleyeni = 0111101. Toplam: 1010100 + 0111101 = 1 0010001. Son elde (1) oluştu → elde atılır → sonuç +0010001 (+17).',
        },
        {
          en: 'Part (b) Y − X: 2\'s complement of X = 0101100. Add: 1000011 + 0101100 = 1101111. NO end carry occurs! Thus the result is negative.',
          tr: 'Kısım (b) Y − X: X\'in 2\'ye tümleyeni = 0101100. Toplam: 1000011 + 0101100 = 1101111. Son elde OLUŞMADI! Demek ki sonuç negatiftir.',
        },
        {
          en: 'Part (b) Final Step: Take the 2\'s complement of 1101111 → 0010001, and place a minus sign → −0010001 (−17).',
          tr: 'Kısım (b) Son Adım: 1101111 sayısının 2\'ye tümleyeni alınır → 0010001, önüne eksi konur → −0010001 (−17).',
        },
      ],
      finalAnswer: {
        en: '(a) X − Y = +0010001 (17);   (b) Y − X = −0010001 (−17).',
        tr: '(a) X − Y = +0010001 (17);   (b) Y − X = −0010001 (−17).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do NOT apply "end-around carry" (+1) when subtracting with 2\'s or 10\'s complement—end-around carry belongs ONLY to 1\'s or 9\'s complement!',
          tr: '2\'ye veya 10\'a tümleyende oluşan son eldeyi sonuca +1 olarak eklemeyin! Eldeyi sonuca ekleme (end-around carry) kuralı YALNIZCA 1\'e ve 9\'a tümleyene özgüdür.',
        },
        {
          en: 'In Signed-2\'s complement arithmetic, a carry out of the sign bit is discarded, NOT treated as overflow; overflow happens when adding two same-sign numbers yields the opposite sign.',
          tr: 'İşaretli 2\'ye tümleyen toplamada işaret bitinden çıkan elde doğrudan atılır, tek başına taşma değildir; taşma aynı işaretli iki sayıyı toplarken zıt işaretli sonuç çıktığında oluşur.',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 3 — Lecture 2: Binary Codes & Boolean Algebra (Sec. 1.7-1.9 & 2.1-2.5)
  // =========================================================================
  'w3-c1': {
    cardId: 'w3-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 1.7–1.8 · Lecture 2 (Slides 1–4)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 1.7–1.8 · Lecture 2 (Slayt 1–4)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (BCD, Gray Code, ASCII & Parity Bit)',
      },
      body: {
        en: 'Digital systems encode numbers, text, and sensor readings into structured binary codes. Binary-Coded Decimal (BCD / 8421 code) maps each decimal digit 0–9 separately into 4 bits (leaving 1010–1111 unused). Gray Code orders binary values so consecutive integers differ by exactly one bit, preventing false intermediate readings in electromechanical encoders. Alphanumeric characters use 7-bit ASCII (128 symbols), and single-bit error detection adds an Even or Odd Parity bit.',
        tr: 'Sayısal sistemler sayıları, metinleri ve sensör verilerini standart ikili kodlarla temsil eder. BCD (Binary-Coded Decimal / 8421 kodu) her onluk basamağı (0–9) ayrı ayrı 4 bitle kodlar (1010–1111 kullanılmaz). Gray Kodu ardışık sayılar arasında yalnızca 1 bit değişmesini sağlayarak mekanik ve ADC geçiş hatalarını önler. Karakterler 7-bitlik ASCII (128 karakter) ile kodlanır; iletimde tek bit hatalarını yakalamak için ise Çift (Even) veya Tek (Odd) Eşlik (Parity) biti eklenir.',
      },
      formalEquation: '(185)_10 = (0001 1000 0101)_BCD (12 bits)   ≠   (10111001)_2 (8 bits)',
    },
    procedure: {
      heading: {
        en: 'Encoding & Error-Detection Rules',
        tr: 'Adım Adım Kodlama ve Eşlik (Parity) Kuralları',
      },
      steps: [
        {
          en: '1. BCD Encoding: Replace each decimal digit independently with its 4-bit binary group (0000 to 1001); never treat the whole decimal number as a single binary integer.',
          tr: '1. BCD Kodlama: Her onluk basamağı bağımsız olarak 4-bitlik ikili gruba çevir (0000–1001); sayının tamamını tek ikili sayıya çevirme.',
        },
        {
          en: '2. Binary-to-Gray Conversion: Copy MSB directly (G_msb = B_msb); each subsequent Gray bit is G_i = B_(i+1) ⊕ B_i.',
          tr: '2. İkili → Gray Dönüşümü: En sol biti aynen kopyala (G_msb = B_msb); sonraki her bit için komşu iki biti XOR\'la: G_i = B_(i+1) ⊕ B_i.',
        },
        {
          en: '3. Parity Bit Assignment: Count the 1s in the data bits. For Even Parity, set P so total 1s (data + P) is even; for Odd Parity, set P so total 1s is odd.',
          tr: '3. Eşlik (Parity) Biti Atama: Veri bitlerindeki 1\'leri say. Even Parity\'de toplam 1 sayısını çift yapacak, Odd Parity\'de tek yapacak şekilde P bitini (0 veya 1) ekle.',
        },
      ],
      table: {
        caption: {
          en: '4-Bit Binary vs. Gray Code & Even/Odd Parity on 7-bit ASCII "A"',
          tr: '4-Bit İkili ve Gray Kodu Karşılaştırması (Mano Tablo 1.6)',
        },
        headers: ['Decimal', 'Binary (B3 B2 B1 B0)', 'Gray (G3 G2 G1 G0)', 'Bit Changes vs Prev'],
        rows: [
          ['0', '0000', '0000', '—'],
          ['1', '0001', '0001', '1 bit'],
          ['2', '0010', '0011', '1 bit'],
          ['3', '0011', '0010', '1 bit'],
          ['7', '0111', '0100', '1 bit (from 0101)'],
          ['8', '1000', '1100', '1 bit (vs Binary: 4 bits!)'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Example: ASCII Parity & Gray Transition (Mano Sec. 1.7–1.8)',
        tr: 'Adım Adım Çözümlü Örnek: ASCII Eşlik Biti ve BCD Karşılaştırması',
      },
      problem: {
        en: '(a) ASCII for "A" is 1000001 and for "T" is 1010100. Attach the MSB as an Even Parity bit and an Odd Parity bit for both. (b) Show why Gray code prevents glitching at 7 → 8.',
        tr: '(a) "A" (1000001) ve "T" (1010100) 7-bit ASCII kodlarının en soluna Even Parity ve Odd Parity bitlerini ekleyin. (b) 7 → 8 geçişinde Gray kodunun neden hata önlediğini gösterin.',
      },
      steps: [
        {
          en: 'Part (a) "A" = 1000001 (has two 1s — already even): Even Parity P = 0 → 01000001; Odd Parity P = 1 → 11000001.',
          tr: 'Kısım (a) "A" = 1000001 (iki adet 1 içerir — zaten çift): Even Parity P = 0 → 01000001; Odd Parity P = 1 → 11000001.',
        },
        {
          en: 'Part (a) "T" = 1010100 (has three 1s — odd): Even Parity P = 1 → 11010100; Odd Parity P = 0 → 01010100.',
          tr: 'Kısım (a) "T" = 1010100 (üç adet 1 içerir — tek): Even Parity P = 1 → 11010100; Odd Parity P = 0 → 01010100.',
        },
        {
          en: 'Part (b) 7 → 8 Transition: In straight binary, 0111 → 1000 flips all 4 bits simultaneously; sensor skew could briefly read 1111 (15) or 0000 (0). In Gray code, 0100 → 1100 flips only the MSB, so intermediate readings are strictly 7 or 8.',
          tr: 'Kısım (b) 7 → 8 Geçişi: Saf ikilide 0111 → 1000 geçişinde 4 bit birden değiştiği için sensör gecikmesiyle geçici olarak 1111 (15) veya 0000 (0) okunabilir. Gray kodunda ise 0100 → 1100 yalnızca en sol biti değiştirir.',
        },
      ],
      finalAnswer: {
        en: 'Even Parity: A = 01000001, T = 11010100   |   Odd Parity: A = 11000001, T = 01010100.',
        tr: 'Even Parity: A = 01000001, T = 11010100   |   Odd Parity: A = 11000001, T = 01010100.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'BCD is NOT straight binary: BCD always needs 4 bits per decimal digit (so 99 requires 8 bits in BCD vs. 7 bits in binary, and 185 needs 12 bits vs. 8 bits).',
          tr: 'BCD düz ikili sayı değildir: her onluk basamak mutlaka 4 bitle yazılır (ör. 185 sayısı ikilide 8 bit, BCD\'de 12 bit tutar).',
        },
        {
          en: 'A single parity bit DETECTS any odd number of bit errors (1, 3, 5…) but CANNOT detect an even number of bit flips (2 errors) and CANNOT correct errors by itself.',
          tr: 'Tek bir parity biti tek sayıda bit hatasını (1, 3, 5…) yakalar ancak çift sayıda hatayı (2 bit birden bozulursa) fark edemez ve tek başına hatayı düzeltemez.',
        },
      ],
    },
  },

  'w3-c2': {
    cardId: 'w3-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 1.9 · Lecture 2 (Slides 5–6)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 1.9 · Lecture 2 (Slayt 5–6)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Binary Logic Gates & Timing Diagrams)',
      },
      body: {
        en: 'Binary logic operates on variables taking two logical values (0 and 1, or False and True) using three fundamental operations: AND (logical product x·y, equal to 1 only when all inputs are 1), OR (logical sum x + y, equal to 1 when at least one input is 1), and NOT (inversion x\', complementing 0 ↔ 1). Physically, logic gates map these binary values onto distinct high/low voltage ranges separated by a forbidden transition band, and timing diagrams trace their output response over time.',
        tr: 'İkili mantık (binary logic), 0 ve 1 değerlerini alan değişkenler üzerinde üç temel işlem tanımlar: AND (mantıksal çarpım x·y, yalnızca tüm girişler 1 ise 1), OR (mantıksal toplam x + y, en az bir giriş 1 ise 1) ve NOT (tümleme x\', 0 ↔ 1 dönüşümü). Fiziksel devrelerde bu lojik değerler, arada yasak bir geçiş bölgesi (transition region) bulunan belirgin gerilim bantlarıyla temsil edilir ve zamanlama diyagramları (timing diagrams) kapıların giriş değişimlerine zaman eksenindeki tepkisini gösterir.',
      },
      formalEquation: 'AND: z = x · y   |   OR: z = x + y   |   NOT: z = x\'',
    },
    procedure: {
      heading: {
        en: 'Truth Table & Timing Diagram Evaluation Procedure',
        tr: 'Adım Adım Doğruluk Tablosu ve Zamanlama Diyagramı Analizi',
      },
      steps: [
        {
          en: '1. Verify Physical Voltage Levels: Ensure input voltages fall strictly inside the valid Logic-0 (e.g., 0–0.8 V) or Logic-1 (e.g., 2–5 V) bands—avoid the transition region.',
          tr: '1. Gerilim Seviyelerini Doğrula: Giriş gerilimlerinin geçerli Lojik-0 veya Lojik-1 bantlarında kaldığından emin ol; ara geçiş bölgesinden kaçın.',
        },
        {
          en: '2. Partition Time Axis by Transitions: Mark every vertical time instant t_0, t_1, t_2, … where any input signal switches between 0 and 1.',
          tr: '2. Zaman Eksenini Dilimle: Herhangi bir girişin 0↔1 değiştirdiği tüm t_0, t_1, t_2, … geçiş anlarını dikey çizgilerle işaretle.',
        },
        {
          en: '3. Evaluate Interval by Interval: Within each slice, read the static (x, y) level and compute AND, OR, and NOT outputs.',
          tr: '3. Her Dilimde Çıkışı Hesapla: Her zaman dilimi içindeki (x, y) değerlerini okuyarak AND, OR ve NOT çıkışlarını adım adım çiz.',
        },
      ],
      table: {
        caption: {
          en: 'Truth Tables of Fundamental Logic Gates (Mano Table 1.8)',
          tr: 'Temel Mantık Kapılarının Doğruluk Tabloları',
        },
        headers: ['x', 'y', 'AND (x·y)', 'OR (x+y)', "NOT (x')"],
        rows: [
          ['0', '0', '0', '0', '1'],
          ['0', '1', '0', '1', '1'],
          ['1', '0', '0', '1', '0'],
          ['1', '1', '1', '1', '0'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Timing Diagram Trace (Mano Fig. 1.5 & Lecture 2)',
        tr: 'Adım Adım Çözümlü Zamanlama Diyagramı Örneği (Mano Şekil 1.5)',
      },
      problem: {
        en: 'Across 4 equal clock intervals t_0..t_3, inputs are (x, y) = (0,0) in t_0, (1,0) in t_1, (1,1) in t_2, and (0,1) in t_3. Trace the waveforms for AND, OR, and NOT(x).',
        tr: 't_0..t_3 zaman aralıklarında girişler sırasıyla (x, y) = (0,0), (1,0), (1,1) ve (0,1) değerlerini almaktadır. AND, OR ve NOT(x) çıkış dalga biçimlerini çıkarınız.',
      },
      steps: [
        {
          en: 'Interval t_0 (x=0, y=0): AND = 0, OR = 0, NOT(x) = 1.',
          tr: 'Aralık t_0 (x=0, y=0): AND = 0, OR = 0, NOT(x) = 1.',
        },
        {
          en: 'Interval t_1 (x=1, y=0): AND = 0, OR = 1, NOT(x) = 0.',
          tr: 'Aralık t_1 (x=1, y=0): AND = 0, OR = 1, NOT(x) = 0.',
        },
        {
          en: 'Interval t_2 (x=1, y=1): AND = 1, OR = 1, NOT(x) = 0.',
          tr: 'Aralık t_2 (x=1, y=1): AND = 1, OR = 1, NOT(x) = 0.',
        },
        {
          en: 'Interval t_3 (x=0, y=1): AND = 0, OR = 1, NOT(x) = 1.',
          tr: 'Aralık t_3 (x=0, y=1): AND = 0, OR = 1, NOT(x) = 1.',
        },
      ],
      finalAnswer: {
        en: 'Waveforms [t_0, t_1, t_2, t_3]: AND = 0-0-1-0,  OR = 0-1-1-1,  NOT(x) = 1-0-0-1.',
        tr: 'Dalga Biçimleri [t_0, t_1, t_2, t_3]: AND = 0-0-1-0,  OR = 0-1-1-1,  NOT(x) = 1-0-0-1.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do not confuse binary logic addition (1 + 1 = 1 in Boolean OR) with binary arithmetic addition (1 + 1 = 10 in base-2).',
          tr: 'İkili mantık toplamasını (Boole OR işleminde 1 + 1 = 1) ikili aritmetik toplamayla (1 + 1 = 10) karıştırmayın.',
        },
        {
          en: 'In physical TTL/CMOS gates, Logic-1 and Logic-0 are ranges, not exact points (e.g., 2.4 V and 4.8 V both represent Logic-1); the forbidden middle region causes unpredictable behavior.',
          tr: 'Fiziksel TTL/CMOS kapılarında Lojik-1 ve Lojik-0 tek bir nokta değil gerilim bandıdır; aradaki geçiş bölgesine düşen gerilimler kararsız çıkış üretir.',
        },
      ],
    },
  },

  'w3-c3': {
    cardId: 'w3-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 2.1–2.4 · Lecture 2 (Slides 7–11)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 2.1–2.4 · Lecture 2 (Slayt 7–11)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Boolean Axioms, Duality & DeMorgan)',
      },
      body: {
        en: 'Two-valued Boolean algebra is an algebraic system defined on B = {0, 1} with binary operators (+) and (·) and unary complement (\'), governed by Huntington\'s Postulates. Two principles make Boolean algebra unique compared to ordinary arithmetic: (1) the second Distributive Law x + yz = (x + y)(x + z) holds everywhere, and (2) the Duality Principle guarantees that every algebraic theorem remains valid when operators (+ ↔ ·) and identity elements (0 ↔ 1) are interchanged.',
        tr: 'İki değerli Boole cebri, B = {0, 1} kümesi üzerinde (+), (·) ikili operatörleri ve (\') tümleme operatörü ile Huntington Postülatları üzerine kurulu cebirsel yapıdır. Sıradan sayısal cebirden ayrılan iki temel özelliği vardır: (1) ikinci dağılma yasası x + yz = (x + y)(x + z) her zaman geçerlidir ve (2) İkilik (Duality) İlkesi gereğince bir eşitlikte (+ ↔ ·) ve (0 ↔ 1) yer değiştirilirse elde edilen ikil ifade de otomatik olarak doğrudur.',
      },
      formalEquation: 'DeMorgan: (x + y)\' = x\'·y\'   |   (x · y)\' = x\' + y\'   |   Distributive-2: x + yz = (x + y)(x + z)',
    },
    procedure: {
      heading: {
        en: 'Core Theorems & Algebraic Simplification Rules',
        tr: 'Temel Boole Teoremleri ve Sadeleştirme Kuralları',
      },
      steps: [
        {
          en: '1. Identity & Null Laws: x + 0 = x, x·1 = x (identities); x + 1 = 1, x·0 = 0 (null/dominance).',
          tr: '1. Birim ve Yutan Eleman: x + 0 = x, x·1 = x (birim); x + 1 = 1, x·0 = 0 (yutan).',
        },
        {
          en: '2. Idempotent, Involution & Complement: x + x = x, x·x = x; (x\')\' = x; x + x\' = 1, x·x\' = 0.',
          tr: '2. Tek Kuvvet, Çift Tümleme ve Tümleyen: x + x = x, x·x = x; (x\')\' = x; x + x\' = 1, x·x\' = 0.',
        },
        {
          en: '3. Absorption & Consensus: x + xy = x, x(x + y) = x; Consensus theorem: xy + x\'z + yz = xy + x\'z.',
          tr: '3. Yutma ve Uzlaşma (Consensus): x + xy = x, x(x + y) = x; Uzlaşma teoremi: xy + x\'z + yz = xy + x\'z.',
        },
        {
          en: '4. DeMorgan’s Theorems: Break the bar and swap the operator: (x + y)\' = x\'y\' and (xy)\' = x\' + y\'.',
          tr: '4. DeMorgan Teoremleri: Tümleyen çizgisini böl ve operatörü değiştir: (x + y)\' = x\'y\' ve (xy)\' = x\' + y\'.',
        },
      ],
      table: {
        caption: {
          en: 'Dual Pairs of Huntington Postulates & Theorems (Mano Table 2.1)',
          tr: 'Boole Cebri İkil (Dual) Teorem Çiftleri (Mano Tablo 2.1)',
        },
        headers: ['Law / Theorem', 'Form (a)', 'Dual Form (b)'],
        rows: [
          ['Identity', 'x + 0 = x', 'x · 1 = x'],
          ['Null / Dominance', 'x + 1 = 1', 'x · 0 = 0'],
          ['Idempotent', 'x + x = x', 'x · x = x'],
          ['Complement', "x + x' = 1", "x · x' = 0"],
          ['Distributive', 'x(y + z) = xy + xz', 'x + yz = (x + y)(x + z)'],
          ['Absorption', 'x + xy = x', 'x(x + y) = x'],
          ['DeMorgan', "(x + y)' = x'y'", "(xy)' = x' + y'"],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Algebraic Proof: Consensus Theorem (Mano Ex. 2.1.4 & 2.1.5)',
        tr: 'Adım Adım Çözümlü Örnek: Uzlaşma (Consensus) Teoremi (Mano Örn. 2.1)',
      },
      problem: {
        en: 'Simplify F = xy + x\'z + yz to the minimum number of literals, then deduce its dual theorem.',
        tr: 'F = xy + x\'z + yz ifadesini en az literal kalacak şekilde sadeleştirin ve ikil (dual) formunu yazın.',
      },
      steps: [
        {
          en: 'Step 1 — Insert (x + x\' = 1) into the redundant consensus term yz: F = xy + x\'z + yz(x + x\').',
          tr: 'Adım 1 — Fazlalık olan yz terimine (x + x\' = 1) çarpanını ekle: F = xy + x\'z + yz(x + x\').',
        },
        {
          en: 'Step 2 — Distribute yz: F = xy + x\'z + xyz + x\'yz.',
          tr: 'Adım 2 — Dağılma yasasını uygula: F = xy + x\'z + xyz + x\'yz.',
        },
        {
          en: 'Step 3 — Factor xy and x\'z: F = xy(1 + z) + x\'z(1 + y).',
          tr: 'Adım 3 — Ortak paranteze al: F = xy(1 + z) + x\'z(1 + y).',
        },
        {
          en: 'Step 4 — Apply Dominance (1 + z = 1, 1 + y = 1): F = xy + x\'z. By the Duality Principle (swap · ↔ +), we immediately obtain (x + y)(x\' + z)(y + z) = (x + y)(x\' + z).',
          tr: 'Adım 4 — (1 + z = 1) uygula: F = xy + x\'z. İkilik ilkesiyle (· ↔ +) doğrudan (x + y)(x\' + z)(y + z) = (x + y)(x\' + z) elde edilir.',
        },
      ],
      finalAnswer: {
        en: 'xy + x\'z + yz = xy + x\'z   |   Dual: (x + y)(x\' + z)(y + z) = (x + y)(x\' + z).',
        tr: 'xy + x\'z + yz = xy + x\'z   |   İkili: (x + y)(x\' + z)(y + z) = (x + y)(x\' + z).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Duality is NOT Complement! Taking the dual swaps (+ ↔ ·) and (0 ↔ 1) while keeping every literal unflipped; only taking the complement flips literals too.',
          tr: 'İkilik (Dual) almak ile Tümleyen (Complement) almak aynı şey değildir! Dual işleminde literaller terslenmez, sadece (+ ↔ ·) ve (0 ↔ 1) değişir.',
        },
        {
          en: 'Never forget Distributive Law #2: x + yz = (x + y)(x + z). Ordinary algebra intuition often misses this factoring step.',
          tr: 'İkinci dağılma yasasını (x + yz = (x + y)(x + z)) unutmayın; normal cebirde geçerli olmadığı için sınavlarda sıklıkla atlanır.',
        },
      ],
    },
  },

  'w3-c4': {
    cardId: 'w3-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 2.4–2.5 · Lecture 2 (Slides 11–17)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 2.4–2.5 · Lecture 2 (Slayt 11–17)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Operator Precedence & Function Complement)',
      },
      body: {
        en: 'A Boolean expression maps directly onto a gate schematic: each product/sum term corresponds to a gate, and each literal (a variable primed or unprimed) corresponds to a gate input—so algebraic minimization shrinks silicon area and propagation delay. Evaluation strictly obeys operator precedence: (1) Parentheses, (2) NOT, (3) AND, (4) OR. The complement F\' of a function F swaps 0s and 1s in its truth table and can be computed algebraically via Generalized DeMorgan\'s Theorem or the two-step Dual-and-Complement shortcut.',
        tr: 'Bir Boole ifadesi doğrudan mantık kapısı şemasına dönüşür: her terim bir kapıya, her literal (düz veya tümleyenli değişken) ise bir kapı girişine karşılık gelir. İfadeleri değerlendirirken işlem önceliği sırası: (1) Parantezler, (2) NOT, (3) AND, (4) OR şeklindedir. Bir fonksiyonun tümleyeni F\', doğruluk tablosunda 0 ve 1\'leri yer değiştirir ve Genelleştirilmiş DeMorgan Teoremi ya da "Dual Al + Literalleri Tersle" kısa yoluyla bulunur.',
      },
      formalEquation: 'Precedence: () > NOT (\') > AND (·) > OR (+)   |   F\' = Dual(F) with every literal complemented',
    },
    procedure: {
      heading: {
        en: 'Fast Complement (F\') Procedure via Duality',
        tr: 'Adım Adım F\' Tümleyeni Alma Kısa Yolu',
      },
      steps: [
        {
          en: '1. Preserve Grouping with Parentheses: Before taking the dual, add explicit parentheses around every AND-product term so operator precedence is not lost when AND turns into OR.',
          tr: '1. Parantezleri Koru: Dual almadan önce AND terimlerini açıkça paranteze al; aksi halde AND operatörü OR\'a dönüştüğünde işlem önceliği bozulur.',
        },
        {
          en: '2. Take the Dual: Swap every AND (·) with OR (+), every OR (+) with AND (·), and any 0 with 1.',
          tr: '2. İkilini (Dual) Al: Tüm (·) ve (+) operatörlerini, varsa 0 ve 1 sabitlerini karşılıklı değiştir.',
        },
        {
          en: '3. Complement Every Literal: Replace each unprimed variable x with x\' and each primed variable x\' with x.',
          tr: '3. Her Literali Tersle: Düz değişkenleri x\', tümleyenli değişkenleri düz x yap.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Examples: Finding F1\' and F2\' (Mano Ex. 2.2 & 2.3)',
        tr: 'Adım Adım Çözümlü Örnek: Fonksiyon Tümleyeni Alma (Mano Örn. 2.2 & 2.3)',
      },
      problem: {
        en: 'Find the complement F\' of (a) F_1 = x\'yz\' + x\'y\'z and (b) F_2 = x(y\'z\' + yz) using both DeMorgan\'s Theorem and the Dual shortcut.',
        tr: '(a) F_1 = x\'yz\' + x\'y\'z ve (b) F_2 = x(y\'z\' + yz) fonksiyonlarının tümleyenlerini hem DeMorgan hem de Dual kısa yoluyla bulunuz.',
      },
      steps: [
        {
          en: 'Part (a) — DeMorgan: F_1\' = (x\'yz\' + x\'y\'z)\' = (x\'yz\')\'·(x\'y\'z)\' = (x + y\' + z)(x + y + z\').',
          tr: 'Kısım (a) — DeMorgan: F_1\' = (x\'yz\' + x\'y\'z)\' = (x\'yz\')\'·(x\'y\'z)\' = (x + y\' + z)(x + y + z\').',
        },
        {
          en: 'Part (a) — Dual Shortcut: Dual of (x\'yz\') + (x\'y\'z) is (x\' + y + z\')(x\' + y\' + z). Complement each literal → (x + y\' + z)(x + y + z\'). Matches!',
          tr: 'Kısım (a) — Kısa Yol: Dual = (x\' + y + z\')(x\' + y\' + z). Her literali tersle → (x + y\' + z)(x + y + z\'). Birebir aynı!',
        },
        {
          en: 'Part (b) — Dual Shortcut on F_2 = x · [(y\'z\') + (yz)]: Dual is x + [(y\' + z\')(y + z)]. Complement every literal → F_2\' = x\' + (y + z)(y\' + z\').',
          tr: 'Kısım (b) — F_2 = x · [(y\'z\') + (yz)] için Kısa Yol: Dual = x + [(y\' + z\')(y + z)]. Literalleri tersle → F_2\' = x\' + (y + z)(y\' + z\').',
        },
      ],
      finalAnswer: {
        en: "F_1' = (x + y' + z)(x + y + z')   |   F_2' = x' + (y + z)(y' + z').",
        tr: "F_1' = (x + y' + z)(x + y + z')   |   F_2' = x' + (y + z)(y' + z').",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Missing parentheses when taking the dual of A·B + C·D is the #1 error: writing A + B·C + D instead of (A + B)(C + D) breaks precedence completely!',
          tr: 'Dual alırken parantez koymamak 1 numaralı hatadır: A·B + C·D ifadesinin duali A + B·C + D değil, (A + B)(C + D) şeklindedir!',
        },
        {
          en: 'Remember NOT binds tighter than AND: x + y\'z means x + ((y\')·z), NOT (x + y\')·z.',
          tr: 'NOT operatörünün AND\'den, AND\'in de OR\'dan öncelikli olduğunu unutmayın.',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 4 — Lecture 3: Canonical / Standard Forms & Logic Gates (Sec. 2.6-2.8)
  // =========================================================================
  'w4-c1': {
    cardId: 'w4-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 2.6 · Lecture 3 (Slides 1–4)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 2.6 · Lecture 3 (Slayt 1–4)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Minterms & Maxterms)',
      },
      body: {
        en: 'For n binary variables, there are exactly 2^n distinct standard product terms called minterms (m_j) and 2^n distinct standard sum terms called maxterms (M_j), where every variable appears once—either primed or unprimed. A minterm m_j evaluates to 1 for only the single input row with binary index j (0-bits primed, 1-bits unprimed). Conversely, a maxterm M_j evaluates to 0 for only row j (0-bits unprimed, 1-bits primed). By DeMorgan\'s Law, each maxterm is the exact complement of the same-indexed minterm: M_j = m_j\'.',
        tr: 'n ikili değişken için her değişkenin (düz veya tümleyenli olarak) tam bir kez geçtiği 2^n adet minterm (m_j) ve 2^n adet maxterm (M_j) vardır. Minterm m_j, yalnızca ikili indeksi j olan tek bir doğruluk tablosu satırında 1 değerini alır (0 bitleri tümleyenli x\', 1 bitleri düz x). Maxterm M_j ise yalnızca j satırında 0 değerini alır (0 bitleri düz x, 1 bitleri tümleyenli x\'). DeMorgan gereğince aynı indisli minterm ve maxterm birbirinin tümleyenidir: M_j = m_j\'.',
      },
      formalEquation: 'm_j\' = M_j   and   M_j\' = m_j   |   2^n minterms & maxterms for n variables',
    },
    procedure: {
      heading: {
        en: 'Constructing m_j and M_j from Binary Index j',
        tr: 'Adım Adım İkili İndeksten Minterm ve Maxterm Yazma Kuralları',
      },
      steps: [
        {
          en: '1. Write Index j in n-Bit Binary: For example, with variables (x, y, z) and j = 5, write 5 = (101)_2.',
          tr: '1. j İndisini n-Bit İkili Yaz: Örneğin (x, y, z) için j = 5 ise 5 = (101)_2 olarak yaz.',
        },
        {
          en: '2. Form Minterm m_j (AND term): Assign unprimed letter to 1-bits and primed letter to 0-bits (101 → x·y\'·z).',
          tr: '2. Minterm m_j Kur (Çarpım Terimi): 1 bitlerine düz harf, 0 bitlerine tümleyenli harf ver (101 → x·y\'·z).',
        },
        {
          en: '3. Form Maxterm M_j (OR term): Assign unprimed letter to 0-bits and primed letter to 1-bits (101 → x\' + y + z\').',
          tr: '3. Maxterm M_j Kur (Toplam Terimi): 0 bitlerine düz harf, 1 bitlerine tümleyenli harf ver (101 → x\' + y + z\').',
        },
      ],
      table: {
        caption: {
          en: 'Minterms & Maxterms for Three Binary Variables (Mano Table 2.3)',
          tr: 'Üç Değişken İçin Minterm ve Maxterm Tablosu (Mano Tablo 2.3)',
        },
        headers: ['Row j', 'x y z', 'Minterm (m_j)', 'Maxterm (M_j)'],
        rows: [
          ['0', '0 0 0', "m_0 = x'y'z'", 'M_0 = x + y + z'],
          ['1', '0 0 1', "m_1 = x'y'z", "M_1 = x + y + z'"],
          ['3', '0 1 1', "m_3 = x'yz", "M_3 = x + y' + z'"],
          ['5', '1 0 1', "m_5 = xy'z", "M_5 = x' + y + z'"],
          ['7', '1 1 1', 'm_7 = xyz', "M_7 = x' + y' + z'"],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Verification Example: Complement Identity m_5\' = M_5',
        tr: 'Adım Adım Çözümlü Örnek: m_5\' = M_5 Özdeşliğinin Doğrulanması',
      },
      problem: {
        en: 'For variables (x, y, z), write m_5 and M_5, verify their truth-table values on row 101, and prove m_5\' = M_5 algebraically.',
        tr: '(x, y, z) değişkenleri için m_5 ve M_5 terimlerini yazın, 101 satırındaki değerlerini kontrol edin ve m_5\' = M_5 olduğunu cebirsel olarak gösterin.',
      },
      steps: [
        {
          en: 'Step 1 — Binary Index 5 = 101: x = 1, y = 0, z = 1.',
          tr: 'Adım 1 — İkili İndeks 5 = 101: x = 1, y = 0, z = 1.',
        },
        {
          en: 'Step 2 — Minterm m_5: 1→x, 0→y\', 1→z ⇒ m_5 = xy\'z. Evaluating at (1,0,1): 1·(0\')·1 = 1.',
          tr: 'Adım 2 — Minterm m_5: 1→x, 0→y\', 1→z ⇒ m_5 = xy\'z. (1,0,1) için değeri: 1·1·1 = 1.',
        },
        {
          en: 'Step 3 — Maxterm M_5: 1→x\', 0→y, 1→z\' ⇒ M_5 = x\' + y + z\'. Evaluating at (1,0,1): 0 + 0 + 0 = 0.',
          tr: 'Adım 3 — Maxterm M_5: 1→x\', 0→y, 1→z\' ⇒ M_5 = x\' + y + z\'. (1,0,1) için değeri: 0 + 0 + 0 = 0.',
        },
        {
          en: 'Step 4 — DeMorgan Check: (m_5)\' = (xy\'z)\' = x\' + (y\')\' + z\' = x\' + y + z\' = M_5.',
          tr: 'Adım 4 — DeMorgan Kontrolü: (m_5)\' = (xy\'z)\' = x\' + y + z\' = M_5.',
        },
      ],
      finalAnswer: {
        en: "m_5 = xy'z (1 only at 101),   M_5 = x' + y + z' (0 only at 101),   and m_5' = M_5.",
        tr: "m_5 = xy'z (yalnızca 101'de 1),   M_5 = x' + y + z' (yalnızca 101'de 0),   ve m_5' = M_5.",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Reversing the priming rule for Maxterms is the classic trap: in a maxterm M_j, 0 is UNPRIMED and 1 is PRIMED so the OR-sum evaluates to 0 on row j.',
          tr: 'Maxterm yazarken kuralı ters uygulamak en sık hatadır: M_j toplamında 0 olan bit DÜZ (x), 1 olan bit TÜMLEYENLİ (x\') yazılır ki o satırda sonuç 0 çıksın.',
        },
        {
          en: 'Variable order matters! m_4 for F(x,y,z) is xy\'z\' (100), whereas for F(z,y,x) row 4 would correspond to x\'y\'z.',
          tr: 'Değişken sırasına dikkat edin! F(x,y,z) için m_4 = xy\'z\' iken değişken sırası değişirse ikili indeks sırası da değişir.',
        },
      ],
    },
  },

  'w4-c2': {
    cardId: 'w4-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 2.6 · Lecture 3 (Slides 3–10)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 2.6 · Lecture 3 (Slayt 3–10)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Canonical Forms & ∑ ↔ ∏ Conversion)',
      },
      body: {
        en: 'Every Boolean function can be expressed uniquely in two canonical forms: as a Sum of Minterms (∑ m, obtained by ORing all minterms where F = 1) or as a Product of Maxterms (∏ M, obtained by ANDing all maxterms where F = 0). Because F and F\' partition the 2^n rows into complementary sets of indices, converting between ∑ and ∏ simply exchanges the ∑ and ∏ operators and lists the missing indices from {0, 1, …, 2^n − 1}.',
        tr: 'Her Boole fonksiyonu iki kanonik formda tekil olarak yazılabilir: F = 1 olan satırların mintermlerinin OR\'lanmasıyla oluşan Mintermlerin Toplamı (∑ m) ve F = 0 olan satırların maxtermlerinin AND\'lenmesiyle oluşan Maxtermlerin Çarpımı (∏ M). F ve F\' fonksiyonları 2^n satırı birbirini tamamlayan iki kümeye ayırdığı için ∑ ile ∏ arasında geçiş yapmak sembolü değiştirip {0, …, 2^n − 1} evrensel kümesindeki eksik indeksleri yazmaktan ibarettir.',
      },
      formalEquation: 'F(A,B,C) = ∑(1, 4, 5, 6, 7) = ∏(0, 2, 3)   |   F\' = ∑(0, 2, 3) = ∏(1, 4, 5, 6, 7)',
    },
    procedure: {
      heading: {
        en: 'Algebraic Expansion into Sum of Minterms & Product of Maxterms',
        tr: 'Adım Adım Kanonik Formlara Cebirsel Genişletme Yöntemi',
      },
      steps: [
        {
          en: '1. To Canonical SOP (∑ m): First distribute into SOP (AND terms). For any term missing variable v, multiply it by (v + v\' = 1), expand, and remove duplicates.',
          tr: '1. Kanonik SOP (∑ m) Elde Etme: İfadeyi çarpımların toplamına aç. Eksik değişken v varsa ilgili terimi (v + v\' = 1) ile çarp, dağıt ve tekrar eden mintermleri teke indir.',
        },
        {
          en: '2. To Canonical POS (∏ M): First factor into POS (OR terms) using x + yz = (x + y)(x + z). For any sum term missing variable v, add (v·v\' = 0), distribute via A + v·v\' = (A + v)(A + v\'), and remove duplicates.',
          tr: '2. Kanonik POS (∏ M) Elde Etme: İfadeyi x + yz = (x + y)(x + z) ile toplamların çarpımına dönüştür. Eksik değişken v için terime v·v\' ekle, (A + v)(A + v\') şeklinde dağıt ve tekrarları ele.',
        },
        {
          en: '3. Fast ∑ ↔ ∏ Conversion: Take the set complement of the index list inside {0 … 2^n − 1} and swap ∑ with ∏.',
          tr: '3. Hızlı ∑ ↔ ∏ Dönüşümü: {0 … 2^n − 1} kümesine göre indekslerin tümleyen kümesini al ve ∑ ile ∏ sembolünü değiştir.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Examples: F = A + B\'C (∑) and F = xy + x\'z (∏) (Mano Ex. 2.4 & 2.5)',
        tr: 'Adım Adım Çözümlü Örnekler: Kanonik SOP ve POS Genişletme (Mano Örn. 2.4 & 2.5)',
      },
      problem: {
        en: '(a) Express F(A,B,C) = A + B\'C as a Sum of Minterms and deduce its Product of Maxterms. (b) Express F(x,y,z) = xy + x\'z as a Product of Maxterms.',
        tr: '(a) F(A,B,C) = A + B\'C fonksiyonunu Mintermlerin Toplamı biçiminde yazıp ∏ formunu bulunuz. (b) F(x,y,z) = xy + x\'z fonksiyonunu Maxtermlerin Çarpımı biçimine getiriniz.',
      },
      steps: [
        {
          en: 'Part (a) Expand A: A(B + B\') = AB + AB\'; multiply by (C + C\') → ABC + ABC\' + AB\'C + AB\'C\' (m_7, m_6, m_5, m_4).',
          tr: 'Kısım (a) A\'yı Genişlet: A(B + B\')(C + C\') = ABC + ABC\' + AB\'C + AB\'C\' (m_7, m_6, m_5, m_4).',
        },
        {
          en: 'Part (a) Expand B\'C: B\'C(A + A\') = AB\'C + A\'B\'C (m_5, m_1). Combine & drop duplicate m_5 → F = ∑(1, 4, 5, 6, 7). Complement indices in {0..7} → F = ∏(0, 2, 3).',
          tr: 'Kısım (a) B\'C\'yi Genişlet: B\'C(A + A\') = AB\'C + A\'B\'C (m_5, m_1). Tekrarlayan m_5 atılınca F = ∑(1, 4, 5, 6, 7) ve eksik indekslerle F = ∏(0, 2, 3) bulunur.',
        },
        {
          en: 'Part (b) Factor F = xy + x\'z using x + yz = (x + y)(x + z): F = (xy + x\')(xy + z) = (x + x\')(y + x\')(x + z)(y + z) = (x\' + y)(x + z)(y + z).',
          tr: 'Kısım (b) F = xy + x\'z Çarpanlara Ayır: (xy + x\')(xy + z) = (x\' + y)(x + z)(y + z).',
        },
        {
          en: 'Part (b) Expand missing variables: (x\' + y + zz\') = (x\' + y + z)(x\' + y + z\') = M_4·M_5; (x + z + yy\') = M_0·M_2; (y + z + xx\') = M_0·M_4. Removing duplicates yields M_0·M_2·M_4·M_5 = ∏(0, 2, 4, 5).',
          tr: 'Kısım (b) Eksik Değişkenleri Tamamla: (x\'+y+zz\') → M_4·M_5; (x+z+yy\') → M_0·M_2; (y+z+xx\') → M_0·M_4. Tekrarlar elenince F = ∏(0, 2, 4, 5) bulunur.',
        },
      ],
      finalAnswer: {
        en: '(a) F = ∑(1, 4, 5, 6, 7) = ∏(0, 2, 3)   |   (b) F = ∏(0, 2, 4, 5) = ∑(1, 3, 6, 7).',
        tr: '(a) F = ∑(1, 4, 5, 6, 7) = ∏(0, 2, 3)   |   (b) F = ∏(0, 2, 4, 5) = ∑(1, 3, 6, 7).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'When converting ∑ to ∏, do NOT forget the total index count 2^n: for 4 variables, missing indices come from {0..15}, not {0..7}!',
          tr: '∑ ile ∏ dönüşümünde değişken sayısına göre 2^n üst sınırını unutmayın: 4 değişkenli bir fonksiyonda evrensel küme {0..15} aralığıdır!',
        },
        {
          en: 'Never confuse F = ∏(0, 2, 4, 5) with F\' = ∑(0, 2, 4, 5): F has 0s at {0, 2, 4, 5}, whereas F\' has 1s at {0, 2, 4, 5}.',
          tr: 'F = ∏(0, 2, 4, 5) ile F\' = ∑(0, 2, 4, 5) birbirinden farklıdır: F bu satırlarda 0 iken F\' aynı satırlarda 1 olur.',
        },
      ],
    },
  },

  'w4-c3': {
    cardId: 'w4-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 2.6 · Lecture 3 (Slides 11–12)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 2.6 · Lecture 3 (Slayt 11–12)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Standard Forms & Two-Level Circuits)',
      },
      body: {
        en: 'Unlike canonical forms where every term must contain all n variables, standard forms allow each product or sum term to contain one, two, or any number of literals. The two standard forms are Sum of Products (SOP—an OR of AND terms, F = y\' + xy + x\'yz\') and Product of Sums (POS—an AND of OR terms, F = x(y\' + z)(x\' + y + z\')). Both SOP and POS realize logic in a two-level gate network (excluding input inverters), minimizing propagation delay compared to three- or multi-level nonstandard factored forms.',
        tr: 'Her terimde tüm değişkenlerin bulunmasını zorunlu kılan kanonik formların aksine, standart formlarda (standard forms) terimler bir, iki veya daha fazla literal içerebilir. İki standart form vardır: Çarpımların Toplamı (SOP: AND kapılarının tek bir OR kapısında birleşmesi) ve Toplamların Çarpımı (POS: OR kapılarının tek bir AND kapısında birleşmesi). Standart SOP ve POS yapıları, standart olmayan çok katmanlı ifadelere göre devreyi en hızlı 2 seviyeli kapı yapısıyla (two-level implementation) gerçekleştirir.',
      },
      formalEquation: 'Standard SOP: y\' + xy + x\'yz\' (2-level)   |   Nonstandard: AB + C(D + E) (3-level) = AB + CD + CE (2-level)',
    },
    procedure: {
      heading: {
        en: 'Converting Nonstandard Expressions to Two-Level Standard Form',
        tr: 'Adım Adım Standart Olmayan İfadeyi 2 Seviyeye İndirgeme',
      },
      steps: [
        {
          en: '1. Count Gate Levels: Trace the longest signal path from any primary input through AND/OR gates to the output.',
          tr: '1. Kapı Seviyesini Say: Herhangi bir girişten çıkışa kadar seri bağlanmış en uzun AND/OR kapısı zincirini say.',
        },
        {
          en: '2. Distribute Nested Parentheses: Apply x(y + z) = xy + xz to flatten 3+ level factored expressions into Standard SOP (or apply x + yz = (x + y)(x + z) for Standard POS).',
          tr: '2. İç İçe Parantezleri Aç: x(y + z) = xy + xz dağılma yasasını uygulayarak 3 ve üzeri seviyeli ifadeleri 2 seviyeli Standart SOP\'ye (veya diğer dağılma yasasıyla POS\'ye) aç.',
        },
        {
          en: '3. Verify Single-Literal Terms: A standalone literal (such as y\' in SOP or x in POS) feeds directly into the final second-level gate.',
          tr: '3. Tek Literalli Terimleri Bağla: Tek başına duran bir literal (ör. SOP\'deki y\') birinci seviye kapısına girmeden doğrudan ikinci seviyedeki son kapıya bağlanır.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Hardware Level Reduction (Mano Fig. 2.3 & Lecture 3)',
        tr: 'Adım Adım Çözümlü Örnek: 3 Seviyeli Devreyi 2 Seviyeye İndirme (Mano Şekil 2.3)',
      },
      problem: {
        en: 'Compare the gate count and propagation delay levels of F = AB + C(D + E) versus its distributed Standard SOP equivalent.',
        tr: 'F = AB + C(D + E) devresi ile onun açılmış Standart SOP biçimini kapı sayısı ve gecikme seviyesi bakımından karşılaştırınız.',
      },
      steps: [
        {
          en: 'Step 1 — Nonstandard F = AB + C(D + E): Level 1 computes (D + E) via OR gate; Level 2 computes C·(D + E) and A·B via 2 AND gates; Level 3 sums them via an OR gate → 4 gates, 3 gate levels of delay.',
          tr: 'Adım 1 — Standart Olmayan F = AB + C(D + E): 1. seviye (D + E) OR kapısı; 2. seviye A·B ve C·(D + E) AND kapıları; 3. seviye nihai OR kapısı → toplam 4 kapı, 3 seviye gecikme.',
        },
        {
          en: 'Step 2 — Distribute C(D + E): F = AB + CD + CE.',
          tr: 'Adım 2 — Dağılma Yasasını Uygula: F = AB + CD + CE.',
        },
        {
          en: 'Step 3 — Two-Level Standard SOP: Level 1 has 3 parallel 2-input AND gates (AB, CD, CE); Level 2 has one 3-input OR gate → 4 gates, only 2 gate levels of delay!',
          tr: 'Adım 3 — 2 Seviyeli Standart SOP: 1. seviyede 3 adet paralel AND kapısı (AB, CD, CE), 2. seviyede tek bir 3-girişli OR kapısı → yine 4 kapı, ancak yalnızca 2 seviye gecikme!',
        },
      ],
      finalAnswer: {
        en: 'AB + CD + CE cuts gate delay from 3 levels down to 2 levels using the exact same gate count (4 gates).',
        tr: 'AB + CD + CE formu aynı kapı sayısıyla (4 kapı) yayılım gecikmesini 3 seviyeden 2 seviyeye düşürür.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Canonical vs. Standard: Every canonical form IS a standard form, but a standard form (like AB + CD) is NOT canonical unless every term contains all variables.',
          tr: 'Her kanonik form aynı zamanda bir standart formdur; fakat her standart form (ör. AB + CD) tüm değişkenleri içermedikçe kanonik değildir.',
        },
        {
          en: 'By convention in Mano & Ciletti, input inverters (NOT gates creating x\') are NOT counted as an extra level when describing "two-level" SOP/POS networks.',
          tr: 'Mano & Ciletti standardında "iki seviyeli" (two-level) devre denildiğinde giriş değişkenlerinin tümleyenini alan NOT kapıları ayrı bir seviye olarak sayılmaz.',
        },
      ],
    },
  },

  'w4-c4': {
    cardId: 'w4-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 2.7–2.8 · Lecture 3 (Slides 13–19)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 2.7–2.8 · Lecture 3 (Slayt 13–19)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Multi-Input Gates & Positive/Negative Logic)',
      },
      body: {
        en: 'For 2 binary inputs, there are 2^(2^2) = 16 possible Boolean functions, implemented physically by AND, OR, NOT, NAND, NOR, XOR, and XNOR gates. Extending 2-input gates to multiple inputs requires associativity: AND, OR, XOR, and XNOR are associative, whereas NAND (↑) and NOR (↓) are commutative but NOT associative—so multi-input NAND/NOR are defined directly as (xyz)\' and (x + y + z)\'. Furthermore, assigning High voltage = 1, Low = 0 defines Positive Logic, while assigning High = 0, Low = 1 defines Negative Logic, flipping the logical meaning of the exact same physical gate.',
        tr: 'İki ikili değişken için 2^(2^2) = 16 farklı Boole fonksiyonu vardır. Çok girişli kapı tasarlanırken birleşme özelliği (associativity) kritiktir: AND, OR, XOR ve XNOR birleşme özelliğine sahipken NAND (↑) ve NOR (↓) değişme özelliğine sahip ancak BİRLEŞME özelliğine sahip DEĞİLDİR; bu nedenle çok girişli NAND/NOR doğrudan (xyz)\' ve (x + y + z)\' biçiminde tanımlanır. Ayrıca yüksek gerilimin (H) 1, düşük gerilimin (L) 0 alınması Pozitif Mantık; H = 0, L = 1 alınması ise Negatif Mantık olup aynı fiziksel kapının işlevini dualine çevirir.',
      },
      formalEquation: '(x ↑ y) ↑ z ≠ x ↑ (y ↑ z)   |   3-Input NAND: (xyz)\'   |   Positive AND ≡ Negative OR',
    },
    procedure: {
      heading: {
        en: 'Associativity & Polarity Assignment Rules',
        tr: 'Adım Adım Çok Girişli Kapı ve Polarite Dönüşüm Kuralları',
      },
      steps: [
        {
          en: '1. Parenthesize Cascaded NAND/NOR Strictly: Because (x ↑ y) ↑ z = [(xy)\'z]\' = xy + z\' whereas x ↑ (y ↑ z) = x\' + yz, never cascade 2-input NAND/NOR without explicit parentheses.',
          tr: '1. Kaskat NAND/NOR Parantez Kuralı: (x ↑ y) ↑ z = xy + z\' iken x ↑ (y ↑ z) = x\' + yz çıktığından, 2 girişli NAND veya NOR\'ları parantezsiz zincirleme.',
        },
        {
          en: '2. Multi-Input XOR / XNOR: 3+ input XOR equals 1 when an ODD number of inputs are 1 (Odd Function); XNOR equals 1 when an EVEN number of inputs are 1 (Even Function, NOT "all inputs equal" for 3+ inputs!).',
          tr: '2. Çok Girişli XOR / XNOR: Çok girişli XOR tek sayıda 1 varsa 1 verir (Odd Function); 3+ girişli XNOR ise ÇİFT sayıda 1 varsa 1 verir ("tüm girişler eşit" anlamında değildir!).',
        },
        {
          en: '3. Switch Positive ↔ Negative Logic: Complement all 0s and 1s in the voltage truth table (H ↔ L) to read the negative-logic gate identity.',
          tr: '3. Pozitif ↔ Negatif Mantık Geçişi: Gerilim tablosunda H ve L değerlerinin 0/1 karşılıklarını tersleyerek aynı fiziksel kapının negatif mantık işlevini oku.',
        },
      ],
      table: {
        caption: {
          en: 'Same Physical Gate Under Positive vs. Negative Logic (Mano Table 2.6)',
          tr: 'Pozitif ve Negatif Mantıkta Aynı Fiziksel Kapının Davranışı',
        },
        headers: ['Voltage (X, Y → Z)', 'Positive Logic (H=1, L=0)', 'Negative Logic (H=0, L=1)'],
        rows: [
          ['L, L → L', '0, 0 → 0', '1, 1 → 1'],
          ['L, H → L', '0, 1 → 0', '1, 0 → 1'],
          ['H, L → L', '1, 0 → 0', '0, 1 → 1'],
          ['H, H → H', '1, 1 → 1  (AND Gate)', '0, 0 → 0  (OR Gate)'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Non-Associativity Proof for NAND (Mano Sec. 2.8)',
        tr: 'Adım Adım Çözümlü Örnek: NAND Operatörünün Birleşmesizliği',
      },
      problem: {
        en: 'Prove algebraically that (x ↑ y) ↑ z ≠ x ↑ (y ↑ z), and evaluate both at (x, y, z) = (0, 0, 0).',
        tr: '(x ↑ y) ↑ z ≠ x ↑ (y ↑ z) eşitsizliğini cebirsel olarak kanıtlayın ve (x, y, z) = (0, 0, 0) noktasında iki sonucu hesaplayın.',
      },
      steps: [
        {
          en: 'Step 1 — Left Grouping: (x ↑ y) ↑ z = [(xy)\' · z]\' = ((xy)\')\' + z\' = xy + z\'.',
          tr: 'Adım 1 — Sol Gruplama: (x ↑ y) ↑ z = [(xy)\' · z]\' = xy + z\'.',
        },
        {
          en: 'Step 2 — Right Grouping: x ↑ (y ↑ z) = [x · (yz)\']\' = x\' + ((yz)\')\' = x\' + yz.',
          tr: 'Adım 2 — Sağ Gruplama: x ↑ (y ↑ z) = [x · (yz)\']\' = x\' + yz.',
        },
        {
          en: 'Step 3 — Compare: xy + z\' ≠ x\' + yz. At (0,0,1): left gives 0·0 + 0 = 0, while right gives 1 + 0·1 = 1!',
          tr: 'Adım 3 — Karşılaştırma: xy + z\' ≠ x\' + yz. Örneğin (0,0,1) için sol taraf 0 verirken sağ taraf 1 verir!',
        },
      ],
      finalAnswer: {
        en: '(x ↑ y) ↑ z = xy + z\'  ≠  x ↑ (y ↑ z) = x\' + yz; therefore 3-input NAND is defined directly as (xyz)\'.',
        tr: '(x ↑ y) ↑ z = xy + z\'  ≠  x ↑ (y ↑ z) = x\' + yz; bu yüzden 3 girişli NAND doğrudan (xyz)\' olarak tanımlanır.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: '3-input XNOR is NOT an "equivalence detector"! For (1, 0, 0), odd 1s gives XOR = 1 and XNOR = 0; for (1, 1, 0), even 1s gives XNOR = 1 even though the three inputs are NOT equal.',
          tr: '3 girişli XNOR "tüm girişler eşit" dedektörü DEĞİLDİR! (1, 1, 0) girişi için çift sayıda 1 olduğundan XNOR = 1 verir.',
        },
        {
          en: 'In negative logic, physical AND becomes OR, physical OR becomes AND, physical NAND becomes NOR, and physical NOR becomes NAND.',
          tr: 'Negatif mantıkta fiziksel AND ↔ OR, fiziksel NAND ↔ NOR olarak dualine dönüşür.',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 5 — Lecture 4: Karnaugh Maps (Sec. 3.1 - 3.4)
  // =========================================================================
  'w5-c1': {
    cardId: 'w5-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 3.1–3.2 · Lecture 4 (Slides 1–4)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 3.1–3.2 · Lecture 4 (Slayt 1–4)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (K-Map Structure & Gray Code Adjacency)',
      },
      body: {
        en: 'The Karnaugh Map (K-map) is a two-dimensional graphical rearrangement of the truth table in which each cell corresponds to one minterm. Rather than counting in straight binary, rows and columns are indexed in Gray code sequence (00, 01, 11, 10) so that any two geometrically adjacent cells—including wrap-around pairs on opposite outer edges and all four corners—differ in exactly one variable (primed in one square, unprimed in the other).',
        tr: 'Karnaugh Haritası (K-Map), doğruluk tablosunun her hücresi bir minterme karşılık gelecek biçimde iki boyutlu bir tabloya yerleştirilmiş görsel sadeleştirme yöntemidir. Satır ve sütunlar düz ikili yerine Gray kodu sırasıyla (00, 01, 11, 10) etiketlenir; böylece harita üzerindeki fiziksel olarak komşu iki hücre (karşılıklı kenarlar ve 4 köşe dahil) tam olarak YALNIZCA BİR değişken bakımından farklılaşır.',
      },
      formalEquation: 'Gray Axis Order: 00 → 01 → 11 → 10   |   m_i + m_j eliminates the single differing literal',
    },
    procedure: {
      heading: {
        en: 'K-Map Construction & Adjacency Verification Steps',
        tr: 'Adım Adım K-Map Yerleştirme ve Komşuluk Kuralları',
      },
      steps: [
        {
          en: '1. Label Axes in Gray Order: For 3 variables (x, y, z), label rows x ∈ {0, 1} and columns yz ∈ {00, 01, 11, 10}.',
          tr: '1. Eksenleri Gray Sırasıyla Etiketle: 3 değişkende satırları x ∈ {0, 1}, sütunları yz ∈ {00, 01, 11, 10} olarak yaz.',
        },
        {
          en: '2. Map Minterm Numbers Carefully: Because column 11 precedes 10, minterm indices run 0, 1, 3, 2 across row 0 and 4, 5, 7, 6 across row 1!',
          tr: '2. Minterm İndislerini Dikkatle Yerleştir: 11 sütunu 10\'dan önce geldiği için üst satır indeksleri soldan sağa 0, 1, 3, 2; alt satır ise 4, 5, 7, 6 olur!',
        },
        {
          en: '3. Check Cylindrical Wrap-Around: Treat the left edge (yz = 00) and right edge (yz = 10) as touching neighbors (and top/bottom edges on 4-variable maps).',
          tr: '3. Silindirik Kenar Komşuluğu: En sol sütun (00) ile en sağ sütunu (10), ayrıca 4 değişkenli haritada en üst ile en alt satırı komşu kabul et.',
        },
      ],
      table: {
        caption: {
          en: '3-Variable K-Map Minterm Layout F(x, y, z)',
          tr: '3 Değişkenli K-Map Minterm Dizilimi (0,1,3,2 / 4,5,7,6)',
        },
        headers: ['x \\ yz', '00 (y\'z\')', '01 (y\'z)', '11 (yz)', '10 (yz\')'],
        rows: [
          ["0 (x')", 'm_0 (000)', 'm_1 (001)', 'm_3 (011)', 'm_2 (010)'],
          ['1 (x)', 'm_4 (100)', 'm_5 (101)', 'm_7 (111)', 'm_6 (110)'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Adjacency Example: m_0 + m_2 + m_4 + m_6 (Mano Sec. 3.2)',
        tr: 'Adım Adım Çözümlü Örnek: Kenar Komşuluğu ile Sadeleştirme',
      },
      problem: {
        en: 'Use Gray-code wrap-around adjacency to simplify F(x, y, z) = ∑(0, 2, 4, 6) and confirm algebraically.',
        tr: 'F(x, y, z) = ∑(0, 2, 4, 6) fonksiyonunu K-Map kenar komşuluğu kullanarak sadeleştirin ve cebirsel olarak doğrulayın.',
      },
      steps: [
        {
          en: 'Step 1 — Place 1s in K-Map: m_0 (row 0, col 00), m_2 (row 0, col 10), m_4 (row 1, col 00), m_6 (row 1, col 10).',
          tr: 'Adım 1 — 1\'leri Yerleştir: m_0 (satır 0, sütun 00), m_2 (satır 0, sütun 10), m_4 (satır 1, sütun 00), m_6 (satır 1, sütun 10).',
        },
        {
          en: 'Step 2 — Wrap-Around Grouping: Leftmost column (00) wraps around to touch rightmost column (10), forming a 4-square rectangle across both rows.',
          tr: 'Adım 2 — Kenar Birleştirme: En sol sütun (00) ile en sağ sütun (10) komşu olduğundan iki satır boyunca 4 karelik tek bir dikdörtgen grup oluşur.',
        },
        {
          en: 'Step 3 — Read Surviving Literal & Verify Algebraically: x changes (0, 1) and y changes (0, 1), while z stays 0 in both columns → z\'. Check: x\'y\'z\' + x\'yz\' + xy\'z\' + xyz\' = z\'(x\'+x)(y\'+y) = z\'.',
          tr: 'Adım 3 — Sabit Kalan Literali Oku: x (0, 1) ve y (0, 1) değişirken her iki sütunda da z = 0 sabit kalır → z\'. Cebirsel kontrol: z\'(x\'+x)(y\'+y) = z\'.',
        },
      ],
      finalAnswer: {
        en: "F(x, y, z) = z' (a 4-square group eliminates 2 variables, leaving 3 − 2 = 1 literal).",
        tr: "F(x, y, z) = z' (4 karelik grup 2 değişkeni eleyerek 3 − 2 = 1 literal bırakır).",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Swapping columns 11 and 10 into binary order (00, 01, 10, 11) destroys adjacency completely and invalidates every K-map result!',
          tr: 'Sütunları 00, 01, 10, 11 ikili sırasıyla yazmak komşuluğu bozar ve tüm K-Map çözümünü geçersiz kılar! Daima 00, 01, 11, 10 yazın.',
        },
        {
          en: 'Diagonal squares (such as m_1 and m_2) differ in TWO variables and are NEVER adjacent.',
          tr: 'Çapraz duran kareler (ör. m_1 ile m_2) iki değişken birden değiştirdiği için ASLA komşu değildir.',
        },
      ],
    },
  },

  'w5-c2': {
    cardId: 'w5-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 3.2 · Lecture 4 (Slides 4–7)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 3.2 · Lecture 4 (Slayt 4–7)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Power-of-2 Grouping & Prime Implicants)',
      },
      body: {
        en: 'K-map minimization relies on combining adjacent 1-cells into rectangular blocks whose cell count is strictly a power of two (2^k: 1, 2, 4, 8, 16, or 32). In an n-variable K-map, enclosing 2^k adjacent squares eliminates exactly k changing variables and produces a product term (implicant) containing (n − k) literals. A Prime Implicant (PI) is a product term obtained by combining the maximum possible number of adjacent squares; an Essential Prime Implicant (EPI) covers at least one minterm not covered by any other prime implicant.',
        tr: 'K-Map sadeleştirmesinde komşu 1 hücreleri yalnızca 2\'nin kuvveti adedinde (2^k: 1, 2, 4, 8, 16 veya 32) hücre içeren dikdörtgenler halinde gruplanır. n değişkenli bir haritada 2^k karelik bir grup k adet değişkeni eler ve (n − k) literalli bir çarpım terimi üretir. Mümkün olan en büyük karelerin birleşiminden oluşan gruba Asal Çıkarım (Prime Implicant - PI), en az bir mintermi tek başına kapsayan asal çıkarıma ise Zorunlu Asal Çıkarım (Essential Prime Implicant - EPI) denir.',
      },
      formalEquation: 'n variables, group size 2^k  ⇒  Term has (n − k) literals',
    },
    procedure: {
      heading: {
        en: 'Systematic Prime Implicant Selection Method',
        tr: 'Adım Adım Asal Çıkarım (PI / EPI) Seçme Prosedürü',
      },
      steps: [
        {
          en: '1. Find All Prime Implicants: Draw the largest valid power-of-2 rectangles around all 1s (never form 3, 5, 6, or L-shaped groups).',
          tr: '1. Tüm Asal Çıkarımları Bul: 1\'leri kapsayan mümkün olan en büyük 2^k dikdörtgenlerini belirle (asla 3, 5, 6 karelik veya L biçimli grup kurma).',
        },
        {
          en: '2. Select Essential Prime Implicants First: Scan each 1-cell; if a 1 belongs to only ONE prime implicant, that PI is essential and MUST be in the final answer.',
          tr: '2. Önce Zorunlu Asal Çıkarımları (EPI) Seç: Yalnızca tek bir PI içinde kalan 1\'leri bul; bu PI\'ler zorunludur ve mutlaka sonuca alınır.',
        },
        {
          en: '3. Cover Remaining 1s Minimally: Add the fewest additional large PIs needed to cover any leftover 1s; overlap is allowed if it makes a group larger, while redundant groups are discarded.',
          tr: '3. Kalan 1\'leri Ört: Dışarıda kalan 1 varsa onları da en büyük gruplarla ört; daha büyük grup oluşturuyorsa kesişmeye izin ver, tüm hücreleri zaten örtülmüş gereksiz grupları at.',
        },
      ],
      table: {
        caption: {
          en: 'Group Size (2^k) vs. Surviving Literals (Mano & Lecture 4)',
          tr: 'Grup Boyutu (2^k) ve Terimdeki Literal Sayısı Tablosu',
        },
        headers: ['2^k Squares', 'k Eliminated', 'n = 3 Map', 'n = 4 Map', 'n = 5 Map'],
        rows: [
          ['1', '0', '3 literals', '4 literals', '5 literals'],
          ['2', '1', '2 literals', '3 literals', '4 literals'],
          ['4', '2', '1 literal', '2 literals', '3 literals'],
          ['8', '3', 'F = 1', '1 literal', '2 literals'],
          ['16', '4', '—', 'F = 1', '1 literal'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Example: Overlapping & Essential Groups (Mano Ex. 3.3 / Ex. 3.4)',
        tr: 'Adım Adım Çözümlü Örnek: Kesişen Gruplar ve Dönüşüm (Mano Örn. 3.3 & 3.4)',
      },
      problem: {
        en: 'Given F = A\'C + A\'B + AB\'C + BC (Mano Ex. 3.4), map it onto a 3-variable K-map, list its minterms, and extract the minimal SOP.',
        tr: 'F = A\'C + A\'B + AB\'C + BC (Mano Örn. 3.4) fonksiyonunu 3 değişkenli K-Map\'e yerleştirip minterm toplamını ve en sade SOP ifadesini bulunuz.',
      },
      steps: [
        {
          en: 'Step 1 — Plot Each Term: A\'C marks {m_1, m_3}; A\'B marks {m_2, m_3}; AB\'C marks {m_5}; BC marks {m_3, m_7}.',
          tr: 'Adım 1 — Terimleri Haritaya İşle: A\'C → {m_1, m_3}; A\'B → {m_2, m_3}; AB\'C → {m_5}; BC → {m_3, m_7}.',
        },
        {
          en: 'Step 2 — Read Minterm Sum: Active squares are {1, 2, 3, 5, 7} → F(A,B,C) = ∑(1, 2, 3, 5, 7).',
          tr: 'Adım 2 — Minterm Toplamını Oku: İşaretlenen hücreler {1, 2, 3, 5, 7} → F(A,B,C) = ∑(1, 2, 3, 5, 7).',
        },
        {
          en: 'Step 3 — Form Largest Power-of-2 Groups: {m_1, m_3, m_5, m_7} forms a 4-square quad (C = 1 across both rows) → C. The only remaining cell m_2 combines with adjacent m_3 → A\'B.',
          tr: 'Adım 3 — En Büyük 2^k Gruplarını Kur: {m_1, m_3, m_5, m_7} dörtlüsü → C. Kalan tek hücre m_2, komşusu m_3 ile ikili grup yapar → A\'B.',
        },
      ],
      finalAnswer: {
        en: "Sum of Minterms: F(A,B,C) = ∑(1, 2, 3, 5, 7)   |   Minimal SOP: F = C + A'B.",
        tr: "Mintermlerin Toplamı: F(A,B,C) = ∑(1, 2, 3, 5, 7)   |   En Sade SOP: F = C + A'B.",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Never settle for a 2-square group if a 4-square group exists using already-covered 1s: sharing m_3 between C and A\'B above reduces F from 4 terms down to just 2 terms!',
          tr: 'Daha önce kullanılmış bir 1 hücresiyle 4\'lü grup kurulabiliyorsa 2\'li grupla yetinmeyin: m_3 hücresini C ile ortak kullanmak ifadeyi 2 terime indirir.',
        },
        {
          en: 'Avoid redundant groups: once every 1 in a group is already covered by other chosen groups, drop that redundant group.',
          tr: 'Tüm hücreleri başka gruplarca kapsanmış fazlalık (redundant) grupları mutlaka eleyin.',
        },
      ],
    },
  },

  'w5-c3': {
    cardId: 'w5-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 3.3 · Lecture 4 (Slides 7–11)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 3.3 · Lecture 4 (Slayt 7–11)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (4-Variable & 5-Variable K-Maps)',
      },
      body: {
        en: 'A 4-variable K-map (w, x, y, z or A, B, C, D) expands the grid to 16 squares (4 × 4 Gray-coded rows and columns), where top/bottom edges, left/right edges, and all four corner squares are logically adjacent. A 5-variable K-map (A, B, C, D, E) doubles to 32 squares, structured as two 4-variable maps placed side by side: the left map holds A = 0 (minterms 0–15) and the right map holds A = 1 (minterms 16–31). Two squares at identical (B, C, D, E) coordinates across the two maps are 3D-adjacent and eliminate A when combined.',
        tr: '4 değişkenli K-Map (w, x, y, z veya A, B, C, D) 4 × 4 boyutunda 16 kareden oluşur; üst/alt kenarlar, sağ/sol kenarlar ve 4 köşe hücresi birbirine komşudur. 5 değişkenli K-Map (A, B, C, D, E) ise yan yana iki adet 4 değişkenli harita (32 kare) olarak çizilir: sol harita A = 0 (m_0–m_15), sağ harita A = 1 (m_16–m_31) içindir. İki haritada aynı satır-sütun koordinatındaki (aynı BCDE değerindeki) kareler üç boyutlu olarak komşudur ve birleştirildiğinde A değişkeni elenir.',
      },
      formalEquation: '4-Var: 16 squares (m_0..m_15)   |   5-Var: A=0 (m_0..m_15) + A=1 (m_16..m_31)',
    },
    procedure: {
      heading: {
        en: '4-Variable & 5-Variable Grouping Rules',
        tr: 'Adım Adım 4 ve 5 Değişkenli Harita Çözüm Kuralları',
      },
      steps: [
        {
          en: '1. Check 4-Corner Wrap-Around (4-Var): Squares m_0 (0000), m_2 (0010), m_8 (1000), and m_10 (1010) form a valid 4-square corner quad (B\'D\').',
          tr: '1. 4 Köşe Komşuluğunu Kontrol Et (4 Değişken): m_0, m_2, m_8 ve m_10 köşeleri birleşerek 4\'lü grup (B\'D\') oluşturur.',
        },
        {
          en: '2. Split 5-Var Minterms by 16: Place indices < 16 into the A = 0 map, and subtract 16 from indices ≥ 16 to find their matching coordinate in the A = 1 map.',
          tr: '2. 5 Değişkenli Mintermleri 16\'ya Göre Ayır: 0–15 arası indeksleri sol (A = 0) haritaya, 16–31 arasını ise 16 çıkararak sağ (A = 1) haritadaki eş koordinata yerleştir.',
        },
        {
          en: '3. Merge Identical Positions Across A=0 and A=1: A group that appears at the exact same coordinates in both halves doubles in size and drops variable A.',
          tr: '3. İki Haritadaki Ortak Konumları Birleştir: Hem A = 0 hem A = 1 haritasında tam aynı konumda duran gruplar birleşerek A değişkenini eler.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked 5-Variable K-Map Example (Lecture 4, Example 7)',
        tr: 'Adım Adım Çözümlü 5 Değişkenli K-Map Örneği (Lecture 4, Örnek 7)',
      },
      problem: {
        en: 'Simplify the 5-variable Boolean function F(A, B, C, D, E) = ∑(0, 2, 4, 6, 9, 13, 21, 23, 25, 29, 31).',
        tr: 'F(A, B, C, D, E) = ∑(0, 2, 4, 6, 9, 13, 21, 23, 25, 29, 31) 5 değişkenli fonksiyonunu sadeleştiriniz.',
      },
      steps: [
        {
          en: 'Step 1 — Partition Minterms: A = 0 map gets {0, 2, 4, 6, 9, 13}. A = 1 map gets {21, 23, 25, 29, 31} (corresponding to BCDE coordinates {5, 7, 9, 13, 15}).',
          tr: 'Adım 1 — Haritalara Dağıt: A = 0 haritasına {0, 2, 4, 6, 9, 13}; A = 1 haritasına {21, 23, 25, 29, 31} (BCDE karşılıkları {5, 7, 9, 13, 15}) konur.',
        },
        {
          en: 'Step 2 — Group in A = 0 Map: {0, 2, 4, 6} (BCDE = 0000, 0010, 0100, 0110) forms a 4-square block in A = 0 (B = 0, E = 0) → A\'B\'E\'.',
          tr: 'Adım 2 — A = 0 Grubunu Al: {0, 2, 4, 6} hücreleri A = 0 haritasında 4\'lü grup olur (B = 0, E = 0) → A\'B\'E\'.',
        },
        {
          en: 'Step 3 — Cross-Map 3D Group: {9, 13} in A = 0 sits at exact coordinates (1001, 1101) directly matching {25, 29} in A = 1! Together they form a 4-square group eliminating A and C → BD\'E.',
          tr: 'Adım 3 — Haritalar Arası 3B Grup: A = 0\'daki {9, 13} ile A = 1\'deki {25, 29} tam aynı BCDE konumundadır; birleşip 4\'lü grup kurarlar (A ve C elenir) → BD\'E.',
        },
        {
          en: 'Step 4 — Group in A = 1 Map: Remaining {21, 23} combine with {29, 31} inside A = 1 (BCDE = 0101, 0111, 1101, 1111 where C = 1, E = 1) → ACE.',
          tr: 'Adım 4 — A = 1 Grubunu Al: Kalan {21, 23} hücreleri A = 1 haritasındaki {29, 31} ile 4\'lü grup oluşturur (A = 1, C = 1, E = 1) → ACE.',
        },
      ],
      finalAnswer: {
        en: "F(A, B, C, D, E) = A'B'E' + BD'E + ACE.",
        tr: "F(A, B, C, D, E) = A'B'E' + BD'E + ACE.",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Adjacent squares on the drawn border between the A=0 and A=1 maps are NOT adjacent across A! Only squares at the EXACT SAME (B, C, D, E) row-column index are neighbors across A.',
          tr: 'Yan yana çizilen A=0 ve A=1 haritalarının birbirine değen kenarları komşu DEĞİLDİR! İki harita arasında yalnızca tam aynı satır ve sütun koordinatındaki hücreler komşudur.',
        },
        {
          en: 'In 4-variable K-maps, remember row indices also jump 00, 01, 11, 10: row 3 (wx=11) is m_12..m_15 and row 4 (wx=10) is m_8..m_11.',
          tr: '4 değişkenli haritada satırlar da Gray sırasıyla dizildiği için 3. satır m_12..m_15, 4. satır ise m_8..m_11 olur.',
        },
      ],
    },
  },

  'w5-c4': {
    cardId: 'w5-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 3.4 · Lecture 4 (Slides 12–16)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 3.4 · Lecture 4 (Slayt 12–16)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (POS Simplification via K-Map)',
      },
      body: {
        en: 'Because the 0-squares of a K-map represent all minterms where the function equals 0, those exact 0-squares directly define the complement function F\'. Grouping the 0-squares just like 1-squares yields the minimal Sum-of-Products expression for F\', and applying DeMorgan\'s Theorem (complementing every literal and swapping · ↔ +) converts F\' directly into the minimal Product-of-Sums (POS) expression for F.',
        tr: 'K-Map üzerindeki boş (0 değerli) kareler fonksiyonun 0 olduğu tüm mintermleri, yani doğrudan tümleyen fonksiyon F\'yi temsil eder. Bu nedenle haritadaki 0\'ları en büyük 2^k dikdörtgenlerle gruplayarak önce F\' için en sade SOP ifadesi bulunur; ardından F\' ifadesine DeMorgan teoremi uygulanarak (literaller terslenip · ile + yer değiştirilerek) fonksiyon F en sade Çarpımların Toplamı (Product of Sums - POS) biçiminde elde edilir.',
      },
      formalEquation: 'Group 0-cells → Minimal SOP of F\'   ==[ DeMorgan: (F\')\' ]==>   Minimal POS of F',
    },
    procedure: {
      heading: {
        en: '3-Step K-Map Product of Sums (POS) Procedure',
        tr: 'Adım Adım K-Map ile En Sade POS Bulma Yöntemi',
      },
      steps: [
        {
          en: '1. Mark Both 1s and 0s: Enter 1s for the minterms of F, and fill all remaining empty squares explicitly with 0s.',
          tr: '1. Haritaya 0\'ları Yerleştir: F = 1 olan karelere 1 koyduktan sonra kalan tüm boş hücreleri açıkça 0 ile doldur.',
        },
        {
          en: '2. Group the 0s for F\': Form the largest valid power-of-2 rectangles covering all 0s and read off the minimal SOP expression for F\'.',
          tr: '2. 0\'ları Gruplayarak F\' Yaz: Tüm 0\'ları mümkün olan en büyük 2^k gruplarla ört ve F\' için en sade SOP ifadesini çıkar.',
        },
        {
          en: '3. Apply DeMorgan\'s Theorem: Complement F\' to recover F in minimal POS form (each product term becomes a sum term with all literals inverted).',
          tr: '3. DeMorgan Uygula: F\' ifadesinin tümleyenini al; her çarpım terimi, tüm literalleri terslenmiş birer toplam terimine dönüşür ve F\'nin en sade POS biçimi elde edilir.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked POS & SOP Comparison Example (Mano Ex. 3.7)',
        tr: 'Adım Adım Çözümlü Örnek: SOP ve POS Sadeleştirme (Mano Örn. 3.7)',
      },
      problem: {
        en: 'Simplify F(A, B, C, D) = ∑(0, 1, 2, 5, 8, 9, 10) into both (a) minimal SOP and (b) minimal POS form.',
        tr: 'F(A, B, C, D) = ∑(0, 1, 2, 5, 8, 9, 10) fonksiyonunu hem (a) en sade SOP hem de (b) en sade POS biçimine indirgeyiniz.',
      },
      steps: [
        {
          en: 'Part (a) Minimal SOP (Group 1s): {0,1,8,9} → B\'C\'; {0,2,8,10} (4 corners) → B\'D\'; {1,5} → A\'C\'D. Hence F_SOP = B\'D\' + B\'C\' + A\'C\'D.',
          tr: 'Kısım (a) SOP (1\'leri Grupla): {0,1,8,9} → B\'C\'; 4 köşe {0,2,8,10} → B\'D\'; {1,5} → A\'C\'D. Sonuç: F_SOP = B\'D\' + B\'C\' + A\'C\'D.',
        },
        {
          en: 'Part (b) Group 0s for F\': Remaining cells {3,4,6,7,11,12,13,14,15} hold 0s. Grouping: {12,13,14,15} → AB; {3,7,11,15} → CD; {4,6,12,14} → BD\'.',
          tr: 'Kısım (b) F\' İçin 0\'ları Grupla: Kalan 9 karede 0 vardır. Gruplar: {12,13,14,15} → AB; {3,7,11,15} → CD; {4,6,12,14} → BD\'.',
        },
        {
          en: 'Part (b) Write F\' and Apply DeMorgan: F\' = AB + CD + BD\'. Applying (F\')\' gives F_POS = (A\' + B\')(C\' + D\')(B\' + D).',
          tr: 'Kısım (b) DeMorgan İle POS\'ye Geç: F\' = AB + CD + BD\'. Tümleyenini alınca F_POS = (A\' + B\')(C\' + D\')(B\' + D) elde edilir.',
        },
      ],
      finalAnswer: {
        en: "SOP: F = B'D' + B'C' + A'C'D (11 literals)   |   POS: F = (A' + B')(C' + D')(B' + D) (9 literals — cheaper!).",
        tr: "SOP: F = B'D' + B'C' + A'C'D (11 literal)   |   POS: F = (A' + B')(C' + D')(B' + D) (9 literal — daha ekonomik!).",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do NOT stop after grouping the 0s! Grouping 0s gives F\', NOT F—forgetting the final DeMorgan inversion flips the entire output.',
          tr: '0\'ları gruplayıp bıraktığınızda bulduğunuz ifade F değil F\' olur! Son adımda mutlaka DeMorgan uygulayıp F\'yi elde edin.',
        },
        {
          en: 'Check both SOP and POS literal counts when an exam asks for the "minimum two-level circuit"—sometimes POS requires fewer gates/literals than SOP (as in Mano Ex. 3.7).',
          tr: 'Sınavda en az kapılı iki seviyeli devre istendiğinde hem SOP hem POS maliyetini kıyaslayın; bazen POS daha az literal gerektirir.',
        },
      ],
    },
  },
};
