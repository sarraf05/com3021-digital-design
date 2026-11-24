import type { WeekModule } from '../../types/curriculum';

export const week13: WeekModule = {
  id: 13,
  weekNumber: 13,
  englishTitle: {
    tr: 'Synchronous Sequential Logic III (Sequential Circuit Design)',
    en: 'Synchronous Sequential Logic III (Sequential Circuit Design)',
  },
  turkishSubtitle: {
    tr: '6 Adımlı Ardışıl Devre Tasarımı, Dizi Algılayıcılar ve D/JK/T Sentez Karşılaştırması',
    en: '6-Step Sequential Synthesis, Sequence Detectors & D/JK/T Design Comparison',
  },
  summary: {
    tr: 'Sözel bir donanım probleminden başlayarak State Diagram kurmayı, Overlapping / Non-Overlapping Sequence Detector (Dizi Algılayıcı) tasarlamayı, seçilen Flip-Flop\'un Excitation Table sütunlarını K-Map ile sadeleştirip devre şemasına dönüştürmeyi ve Lock-out durumlarını önlemeyi öğrenin.',
    en: 'Learn to move from word specifications to a State Diagram, design Overlapping and Non-Overlapping Sequence Detectors, simplify Flip-Flop Excitation Table columns with K-Maps into gate-level schematics, and prevent lock-out in unused states.',
  },
  learningObjectives: [
    {
      tr: 'Mano\'nun 6 adımlı senkron ardışıl devre tasarım prosedürünü baştan sona uygulamak',
      en: 'Execute Mano’s 6-step synchronous sequential circuit design procedure from start to finish',
    },
    {
      tr: 'Overlapping ve Non-Overlapping Sequence Detector (101, 1101) durum diyagramları kurmak',
      en: 'Construct State Diagrams for Overlapping and Non-Overlapping Sequence Detectors (101, 1101)',
    },
    {
      tr: 'D, JK ve T Flip-Flop uyarım tablolarıyla K-Map sadeleştirmesi yapıp kapı maliyetini karşılaştırmak',
      en: 'Minimize D, JK, and T Flip-Flop excitation columns via K-Maps and compare gate counts',
    },
    {
      tr: 'Kullanılmayan durumlarda Lock-out tehlikesini analiz ederek Self-Correcting FSM tasarlamak',
      en: 'Analyze Lock-out hazards in unused states and design Self-Correcting FSMs',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'StateMachineExplorer',
  visualSections: [
    {
      id: 'w13-s1',
      title: {
        tr: '1. Mano 6 Adımlı Senkron Ardışıl Devre Tasarım Prosedürü',
        en: '1. Mano’s 6-Step Synchronous Sequential Circuit Design Procedure',
      },
      explanation: {
        tr: 'Bir önceki haftada devreden tabloya gittik (Analiz); bu haftada ise sözel spesifikasyondan kapı seviyesinde devreye gidiyoruz (Tasarım / Sentez). Herhangi bir senkron ardışıl devreyi hatasız sentezlemek için Mano\'nun 6 adımlı yöntemi izlenir:\n1. Sözlü tanımdan veya zamanlama diyagramından Durum Diyagramı (State Diagram) oluştur (her durum geçmişteki kritik olayların özetini tutar).\n2. Gereksiz durum varsa State Reduction ile durum sayısını azalt.\n3. Durumlara ikili kod ata (Binary State Assignment: 00, 01, 10...). Seçilen kodlama K-Map sadeleşmesini doğrudan etkiler!\n4. Durum Tablosuna seçilen Flip-Flop türünün Uyarım Tablosu (Excitation Table) giriş sütunlarını ekle — böylece Mevcut Durum + Giriş değerlerinden Flip-Flop pinlerine gitmesi gereken sinyaller okunur.\n5. Her Flip-Flop girişi ve devre çıkışı için K-Map çizip minimum Boole denklemlerini çıkar (kullanılmayan durum kodları varsa başlangıçta X alınabilir).\n6. Ortak Clock hattına bağlı Flip-Flop\'ları ve birleşik lojik kapılarını çiz.',
        en: 'Last week we went from circuit to table (Analysis); this week we go from word specifications to gate-level hardware (Synthesis / Design). Follow Mano’s 6-step procedure to synthesize any clocked sequential circuit:\n1. Derive a State Diagram from the word description (each state summarizes the relevant past input history).\n2. Reduce the number of states using State Reduction if redundant states exist.\n3. Assign binary codes to the states (Binary State Assignment: 00, 01, 10...—coding choices directly affect K-Map gate count!).\n4. Append the Excitation Table columns for your chosen Flip-Flop type so every (Present State, Input) row maps to required FF input pins.\n5. Use K-Maps to derive minimized Boolean equations for every FF input and circuit output (unused state codes may start as Don\'t-Cares X).\n6. Draw the schematic with Flip-Flops sharing a common Clock and combinational gates.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'Sentez Akış Şeması: Spesifikasyon → Silikon Devre',
            en: 'Synthesis Flow: Specification → Gate-Level Circuit',
          },
          steps: [
            {
              label: { tr: 'Adım 1–3: Model & Kodlama', en: 'Steps 1–3: Model & Encoding' },
              badge: 'State Assignment',
              detail: {
                tr: 'Mealy/Moore seç → Eşdeğer durumları indirge → M durum için ⌈log₂ M⌉ bit ata.',
                en: 'Choose Mealy/Moore → Reduce equivalent states → Assign ⌈log₂ M⌉ bits for M states.',
              },
            },
            {
              label: { tr: 'Adım 4: Uyarım Tablosu Ekle', en: 'Step 4: Add Excitation Columns' },
              badge: 'Excitation Table',
              detail: {
                tr: 'Q(t) → Q(t+1) geçişlerine bakarak her satır için Dᵢ, Tᵢ veya (Jᵢ, Kᵢ) değerlerini yaz.',
                en: 'Inspect Q(t) → Q(t+1) transitions to fill Dᵢ, Tᵢ, or (Jᵢ, Kᵢ) for each row.',
              },
            },
            {
              label: { tr: 'Adım 5–6: K-Map & Devre', en: 'Steps 5–6: K-Maps & Schematic' },
              badge: { tr: 'Donanım Sentezi', en: 'Hardware Synthesis' },
              detail: {
                tr: "JK tablosundaki bol X (Don't-Care) sayesinde kapı sayısı genellikle D FF'ten daha az çıkar!",
                en: "Thanks to abundant Don't-Cares (X) in JK excitation tables, JK designs often need fewer gates than D FF!",
              },
            },
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'synthesis-6step-pipeline',
          caption: {
            tr: 'Vektörel Tasarım Akış Şeması: Mano 6 Adımlı Senkron Ardışıl Devre Sentez Boru Hattı',
            en: 'Vector Design Pipeline: Mano’s 6-Step Synchronous Sequential Synthesis Flow',
          },
          equation: 'Spec → State Diagram → Reduction → Assignment → Excitation + K-Map → Circuit',
          summary: {
            tr: 'Sözel problemden başlayarak her adım bir sonraki tablo veya donanım aşamasını sistematik olarak üretir.',
            en: 'Each stage systematically transforms word specifications into the next intermediate table until the gate-level schematic is complete.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      summaryRule: {
        tr: 'Mano 6 Adımlı Sentez Özeti: Durum Diyagramı → State Reduction → İkili Kodlama (⌈log₂ M⌉ Flip-Flop) → Uyarım Tablosu (Excitation Table) → Her FF girişi ve çıkış için K-Map → Ortak Clock\'lu Devre.',
        en: 'Mano 6-Step Synthesis Summary: State Diagram → State Reduction → Binary State Assignment (⌈log₂ M⌉ Flip-Flops) → Excitation Table → K-Maps for each FF input & output → Common-Clock Schematic.',
      },
      examTip: {
        tr: 'Durum sayısı 2ⁿ\'den küçükse (örneğin 3 veya 5 durum), kullanılmayan ikili kodlar (11 veya 101–111) için K-Map\'e Don\'t-Care (X) yazılabilir; ancak devrenin kendi kendini düzeltmesi (Self-Correcting) isteniyorsa bu durumlar başlangıç durumuna yönlendirilmelidir!',
        en: 'When the number of states is less than 2ⁿ (e.g., 3 or 5 states), unused binary codes (11 or 101–111) may be marked Don\'t-Care (X) on K-Maps; however, for a Self-Correcting FSM, explicitly route unused states back to the initial state!',
      },
    },
    {
      id: 'w13-s2',
      title: {
        tr: '2. Dizi Algılayıcı (Sequence Detector): Overlapping vs. Non-Overlapping',
        en: '2. Sequence Detectors: Overlapping vs. Non-Overlapping',
      },
      explanation: {
        tr: 'Sınavların en klasik tasarım sorusu olan Sequence Detector, seri bir bit akışında (x) belirli bir örüntü (ör. "101" veya "1101") yakalandığında z = 1 çıkışı verir. Hangi duruma dönüleceğini belirlemek için "En Uzun Geçerli Sonek-Önek (Suffix-Prefix) Kuralı" uygulanır:\n• Overlapping (Örtüşmeli): Dizinin son biti(leri) bir sonraki dizinin başlangıcı (öneki) olarak tekrar kullanılabilir. Örneğin "10101" akışında örtüşmeli "101" algılayıcı 2 kez "1" yakalar; çünkü 3. bitte "101" tamamlandığında son gelen "1" biti yeni bir "101"in ilk biti olduğundan S₀ yerine S₁ ("1 alındı") durumuna geçer!\n• Non-Overlapping (Örtüşmesiz): Dizi yakalandıktan sonra tüm hafıza sıfırlanır ve makine mutlaka S₀ başlangıç durumuna döner (ör. "10101" akışında yalnızca 1 kez z = 1 üretir).',
        en: 'A Sequence Detector—one of the most classic digital design exam problems—outputs z = 1 whenever a target pattern (e.g., "101" or "1101") appears on a serial input stream (x). To choose the right next state, apply the "Longest Valid Suffix-Prefix Rule":\n• Overlapping: Trailing bit(s) of a matched sequence may be reused as the prefix of the next match. On stream "10101", an overlapping "101" detector fires twice—because upon matching "101", the trailing "1" already starts the next "101", so it transitions to S₁ ("1 received") instead of S₀!\n• Non-Overlapping: Once a pattern completes, all history resets strictly to S₀ (so "10101" fires only once).',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: '"101" Mealy Dizi Algılayıcı Karşılaştırması (Giriş Akışı x = 1 0 1 0 1)',
            en: '"101" Mealy Sequence Detector Comparison (Input Stream x = 1 0 1 0 1)',
          },
          headers: [
            { tr: 'Algılayıcı Modu', en: 'Detector Mode' },
            { tr: 'Durum Sayısı (Mealy / Moore)', en: 'States (Mealy / Moore)' },
            { tr: '101 Tamamlanınca Geçiş', en: 'Transition After "101"' },
            { tr: 'x = 1 0 1 0 1 Çıkışı (z)', en: 'Output z for x = 1 0 1 0 1' },
          ],
          highlightColumn: 3,
          rows: [
            [
              { tr: 'Overlapping (Örtüşmeli)', en: 'Overlapping' },
              { tr: '3 Durum / 4 Durum', en: '3 States / 4 States' },
              { tr: 'S₂ --(1/1)--> S₁ (Son "1" korunur)', en: 'S₂ --(1/1)--> S₁ (Keeps trailing "1")' },
              { tr: '0 0 1 0 1 (2 yakalama!)', en: '0 0 1 0 1 (2 matches!)' },
            ],
            [
              { tr: 'Non-Overlapping (Örtüşmesiz)', en: 'Non-Overlapping' },
              { tr: '3 Durum / 4 Durum', en: '3 States / 4 States' },
              { tr: 'S₂ --(1/1)--> S₀ (Tam sıfırlama)', en: 'S₂ --(1/1)--> S₀ (Full reset)' },
              { tr: '0 0 1 0 0 (1 yakalama)', en: '0 0 1 0 0 (1 match)' },
            ],
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'sequence-detector-101',
          caption: {
            tr: 'Vektörel Durum Diyagramı: "101" Mealy Dizi Algılayıcı (Overlapping vs. Non-Overlapping)',
            en: 'Vector State Diagram: "101" Mealy Sequence Detector (Overlapping vs. Non-Overlapping)',
          },
          equation: 'Overlapping: S₂ —(1/1)→ S₁   |   Non-Overlapping: S₂ —(1/1)→ S₀',
          summary: {
            tr: 'Örtüşmeli tasarımda yakalanan "101" dizisinin son "1" biti S₁\'e dönülerek korunur; örtüşmesizde ise S₀ başlangıç durumuna sıfırlanır.',
            en: 'In overlapping mode, the trailing "1" of "101" is preserved by transitioning to S₁; in non-overlapping mode, it resets to S₀.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      widget: 'StateMachineExplorer',
      examTip: {
        tr: 'Mealy "101" veya "1101" algılayıcısında 3-bitlik dizi için 3 durum (S₀, S₁, S₂), 4-bitlik dizi için 4 durum yeterlidir. Moore modelinde ise son "1" çıkışını tutmak için +1 ekstra durum gerekir.',
        en: 'A Mealy sequence detector needs 3 states (S₀, S₁, S₂) for a 3-bit pattern like "101" and 4 states for a 4-bit pattern like "1101". A Moore model requires +1 extra state to hold the final output z = 1.',
      },
    },
    {
      id: 'w13-s3',
      title: {
        tr: '3. D, JK ve T Flip-Flop ile Sentez Karşılaştırması',
        en: '3. Synthesis Comparison: D, JK & T Flip-Flops',
      },
      explanation: {
        tr: 'Aynı durum geçiş tablosu üç farklı Flip-Flop türüyle sentezlendiğinde K-Map karmaşıklığı ve kapı maliyeti değişir:\n• D Flip-Flop: Uyarım sütunu doğrudan Q(t+1)\'in aynısıdır (D = Q⁺). Çok hızlı tasarlanır ancak hiç X (Don\'t-Care) üretmez.\n• T Flip-Flop: Yalnızca durum değişen satırlarda 1 olur (T = Q ⊕ Q⁺). Özellikle ikili sayıcılar (Binary Counters) için rakipsiz sadeliktedir.\n• JK Flip-Flop: Her geçişin yarısında X (Don\'t-Care) ürettiği için rastgele durum sıralamalarında (örn. Gray Code veya BCD sayıcılar) en az ek kapı maliyetini sunar.\n\nLock-Out Kontrolü (Self-Correcting Doğrulama): Kullanılmayan durumları K-Map\'te X olarak kullandıktan sonra, bu kullanılmayan ikili kodları bulduğunuz sadeleşmiş Flip-Flop denklemlerine geri koyup A(t+1)B(t+1) değerlerini mutlaka hesaplayın! Eğer tüm kullanılmayan durumlar geçerli döngüye dönüyorsa devre Self-Correcting\'dir.',
        en: 'Synthesizing the exact same state transition table with three different Flip-Flop types changes K-Map complexity and gate cost:\n• D Flip-Flop: The excitation column equals Q(t+1) directly (D = Q⁺). Fastest to derive, but yields zero Don\'t-Cares (X).\n• T Flip-Flop: Equals 1 only when the state toggles (T = Q ⊕ Q⁺). Unmatched simplicity for binary counters.\n• JK Flip-Flop: Produces Don\'t-Cares (X) in half of all transitions, giving the lowest external gate cost for arbitrary state sequences (such as Gray Code or BCD counters).\n\nLock-Out Check (Self-Correcting Verification): Whenever unused states are marked X on K-Maps, plug those unused binary codes back into your final minimized Flip-Flop equations and compute A(t+1)B(t+1)! If every unused state flows back into the valid loop, the design is Self-Correcting.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Örnek Sentez Karşılaştırması: 2-Bit Gray Code Sayıcı (00 → 01 → 11 → 10 → 00)',
            en: 'Synthesis Example: 2-Bit Gray Code Counter (00 → 01 → 11 → 10 → 00)',
          },
          headers: [
            { tr: 'Şimdiki (A B)', en: 'Present (A B)' },
            { tr: 'Sonraki (A+ B+)', en: 'Next (A+ B+)' },
            'D FF (D_A, D_B)',
            'T FF (T_A, T_B)',
            'JK FF (J_A K_A, J_B K_B)',
          ],
          highlightColumn: 4,
          rows: [
            ['0 0', '0 1', '0, 1', '0, 1', '0 X,  1 X'],
            ['0 1', '1 1', '1, 1', '1, 0', '1 X,  X 0'],
            ['1 1', '1 0', '1, 0', '0, 1', 'X 0,  X 1'],
            ['1 0', '0 0', '0, 0', '1, 0', 'X 1,  0 X'],
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'jk-gray-counter-schematic',
          caption: {
            tr: 'Vektörel Devre Şeması: Sıfır Ek Kapılı 2-Bit JK Flip-Flop Gray Code Sayıcı',
            en: 'Vector Circuit Schematic: Zero-Gate 2-Bit JK Flip-Flop Gray Code Counter',
          },
          equation: "J_A = B,   K_A = B',   J_B = A',   K_B = A   (00 → 01 → 11 → 10 → 00)",
          summary: {
            tr: 'İki JK Flip-Flop\'un Q ve Q\' çıkışları doğrudan birbirinin J ve K girişlerine çapraz bağlandığında ekstra hiçbir lojik kapı gerekmez.',
            en: 'Cross-wiring the built-in Q and Q\' outputs of two JK Flip-Flops directly to J and K inputs realizes the Gray sequence with zero external gates.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      examTip: {
        tr: 'Yukarıdaki Gray Code sayıcı tablosundan JK K-Map\'leri çözüldüğünde tek bir AND/XOR kapısına bile ihtiyaç kalmadan doğrudan J_A = B, K_A = B\', J_B = A\', K_B = A bulunur!',
        en: 'Solving the JK K-Maps from the Gray Code counter table above yields J_A = B, K_A = B\', J_B = A\', K_B = A—requiring ZERO external logic gates!',
      },
    },
  ],
  questions: [
    {
      id: 'w13-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · Örtüşmeli (Overlapping) 1101 Mealy Dizi Algılayıcı',
        en: 'Question 1 · Overlapping "1101" Mealy Sequence Detector',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Örtüşmeli (Overlapping) çalışan bir "1101" Mealy dizi algılayıcısında, devre S₃ ("110 alındı") durumundayken girişe x = 1 gelerek "1101" dizisini yakalayıp z = 1 çıkışını ürettiği anda hangi duruma geçiş yapar?',
        en: 'In an Overlapping "1101" Mealy sequence detector currently in state S₃ ("110 received"), when input x = 1 arrives—completing "1101" and asserting z = 1—which state does the machine transition to?',
      },
      options: [
        { tr: 'S₁ ("1 alındı") durumuna', en: 'State S₁ ("1 received")' },
        { tr: 'S₀ ("Başlangıç / Sıfır") durumuna', en: 'State S₀ ("Reset / Initial")' },
        { tr: 'S₂ ("11 alındı") durumuna', en: 'State S₂ ("11 received")' },
        { tr: 'S₃ ("110 alındı") durumunun kendisinde kalır', en: 'Remains in state S₃ ("110 received")' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Dizinin En Uzun Geçerli Önekini (Prefix) Kontrol Et',
            en: 'Step 1: Find the Longest Valid Suffix-Prefix Match',
          },
          detail: {
            tr: 'Alınan dizi "1101". Son 3 bit "101" önek değil; son 2 bit "01" önek değil; ancak son 1 bit olan "1", yeni bir "1101" dizisinin ilk biti olabilir! Dolayısıyla makine S₁ ("1 alındı") durumuna geçer.',
            en: 'Received stream ends in "1101". Neither "101" nor "01" is a valid prefix of "1101", but the final "1" can start a new "1101" sequence! Hence it transitions to S₁ ("1 received").',
          },
        },
      ],
    },
    {
      id: 'w13-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · JK Flip-Flop ile 2-Bit Gray Code Sayıcı Tasarımı (Mano 5.16)',
        en: 'Question 2 · 2-Bit Gray Code Counter with JK Flip-Flops (Mano 5.16)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: '00 → 01 → 11 → 10 → 00 (2-bit Gray Code) çevrimini izleyen bir sayıcı JK Flip-Flop’larla tasarlandığında J_A, K_A, J_B, K_B giriş denklemleri sırasıyla nedir?',
        en: 'When a 2-bit Gray Code counter following 00 → 01 → 11 → 10 → 00 is designed using JK Flip-Flops, what are the input equations for J_A, K_A, J_B, and K_B?',
      },
      options: [
        "J_A = B, K_A = B', J_B = A', K_B = A",
        "J_A = B', K_A = B, J_B = A, K_B = A'",
        'J_A = 1, K_A = 1, J_B = A, K_B = B',
        'J_A = A ⊕ B, K_A = 1, J_B = B, K_B = A',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: JK Uyarım Sütunlarını K-Map\'e Yerleştir',
            en: 'Step 1: Map the JK Excitation Columns for Flip-Flop A',
          },
          detail: {
            tr: '• J_A (AB=00→0, 01→1, 11→X, 10→X): 01 ve 11 gruplanır ⇒ J_A = B\n• K_A (AB=00→X, 01→X, 11→0, 10→1): 00 ve 10 gruplanır ⇒ K_A = B\'',
            en: '• J_A (AB=00→0, 01→1, 11→X, 10→X): group 01 & 11 ⇒ J_A = B\n• K_A (AB=00→X, 01→X, 11→0, 10→1): group 00 & 10 ⇒ K_A = B\'',
          },
        },
        {
          title: {
            tr: 'Adım 2: B Flip-Flop K-Map Sadeleştirmesi',
            en: 'Step 2: Simplify Flip-Flop B K-Maps',
          },
          detail: {
            tr: "• J_B (AB=00→1, 01→X, 11→X, 10→0): 00 ve 01 gruplanır ⇒ J_B = A'\n• K_B (AB=00→X, 01→0, 11→1, 10→X): 11 ve 10 gruplanır ⇒ K_B = A",
            en: "• J_B (AB=00→1, 01→X, 11→X, 10→0): group 00 & 01 ⇒ J_B = A'\n• K_B (AB=00→X, 01→0, 11→1, 10→X): group 11 & 10 ⇒ K_B = A",
          },
        },
      ],
    },
    {
      id: 'w13-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · T Flip-Flop ile 2-Bit İkili Sayıcı Tasarımı (Mano 5.18)',
        en: 'Question 3 · 2-Bit Binary Counter with T Flip-Flops (Mano 5.18)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '00 → 01 → 10 → 11 → 00 (2-bit ikili yukarı sayıcı) devresini T Flip-Flop’larla tasarlarken uyarım tablosundan elde edilen T_A (MSB) ve T_B (LSB) giriş denklemleri nedir?',
        en: 'When designing a 2-bit binary up-counter (00 → 01 → 10 → 11 → 00) using T Flip-Flops, what are the excitation equations for T_A (MSB) and T_B (LSB)?',
      },
      options: [
        { tr: 'T_A = B ve T_B = 1', en: 'T_A = B and T_B = 1' },
        { tr: 'T_A = 1 ve T_B = A', en: 'T_A = 1 and T_B = A' },
        { tr: 'T_A = A ⊕ B ve T_B = 0', en: 'T_A = A ⊕ B and T_B = 0' },
        { tr: "T_A = B' ve T_B = 1", en: "T_A = B' and T_B = 1" },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Her Bitin Terslenme (Toggle) Koşulunu İncele',
            en: 'Step 1: Inspect the Toggle Condition for Each Bit',
          },
          detail: {
            tr: 'LSB olan B biti her saat darbesinde 0→1→0→1 değiştiği için T_B = 1. MSB olan A biti ise yalnızca B = 1 iken (01→10 ve 11→00) değiştiği için T_A = B bulunur.',
            en: 'LSB B toggles on every clock pulse (0→1→0→1), so T_B = 1. MSB A toggles only when B = 1 (01→10 and 11→00), yielding T_A = B.',
          },
        },
      ],
    },
    {
      id: 'w13-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · Lock-Out Durumu ve Self-Correcting FSM',
        en: 'Question 4 · Lock-Out Hazard & Self-Correcting FSM',
      },
      difficulty: 'Orta',
      prompt: {
        tr: '3 Flip-Flop ile tasarlanan 6 durumlu bir ardışıl devrede, kalan 2 kullanılmayan durumun (110 ve 111) Don\'t-Care olarak tasarlanması sonucunda bu durumlardan birine elektriksel gürültüyle düşüldüğünde geçerli bir duruma dönülememesine ne ad verilir ve nasıl önlenir?',
        en: 'In a 6-state sequential circuit using 3 Flip-Flops, if the 2 unused states (110 and 111) are treated as Don\'t-Cares during synthesis and electrical noise forces the circuit into one of them with no path back to valid states, what is this called and how is it prevented?',
      },
      options: [
        {
          tr: 'Lock-out (kilitlenme) durumu; kullanılmayan durumların sonraki durumlarının açıkça geçerli bir başlangıç durumuna (ör. 000) bağlanmasıyla önlenir.',
          en: 'Lock-out condition; prevented by explicitly assigning unused states to transition to a valid starting state (e.g., 000).',
        },
        {
          tr: 'Race condition durumu; saat frekansını iki katına çıkararak önlenir.',
          en: 'Race condition; prevented by doubling the clock frequency.',
        },
        {
          tr: 'Bus contention durumu; Three-State buffer eklenerek önlenir.',
          en: 'Bus contention; prevented by adding a Three-State buffer.',
        },
        {
          tr: 'Metastability durumu; T Flip-Flop yerine Latch kullanılarak önlenir.',
          en: 'Metastability; prevented by replacing T Flip-Flops with Latches.',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Self-Correcting (Kendi Kendini Düzeltme) İlkesi',
            en: 'Step 1: Self-Correcting Design Principle',
          },
          detail: {
            tr: 'Kullanılmayan durumlar K-Map\'te X bırakıldığında, sentezlenen denklemler bu durumları yine kendi aralarında (110 ↔ 111) kısır döngüye sokabilir (Lock-out). Bunu önlemek için tasarımdan sonra kullanılmayan durumların geçişleri kontrol edilir veya açıkça 000\'a yönlendirilir.',
            en: 'Leaving unused states as X on K-Maps can accidentally create a closed loop among unused states (110 ↔ 111), locking the circuit out of valid operation. Always verify unused state transitions or force them toward 000.',
          },
        },
      ],
    },
    {
      id: 'w13-q5',
      type: 'interactive-table',
      title: {
        tr: 'Soru 5 · Mod-3 Sayıcı (00 → 01 → 10 → 00) JK Uyarım Tablosu',
        en: 'Question 5 · Mod-3 Counter (00 → 01 → 10 → 00) JK Excitation Table',
      },
      difficulty: 'Orta',
      prompt: {
        tr: '00 → 01 → 10 → 00 sırasıyla sayan (11 durumu kullanılmayan / Don\'t-Care olan) Mod-3 sayıcı tasarımında JK Flip-Flop uyarım sütunlarını (0, 1 veya X olarak tıklayarak) doldurun.',
        en: 'For a Mod-3 counter cycling through 00 → 01 → 10 → 00 (with state 11 unused / Don\'t-Care), complete the JK Flip-Flop excitation columns by clicking 0, 1, or X.',
      },
      headers: [
        { tr: 'Şimdiki (A B)', en: 'Present (A B)' },
        { tr: 'Sonraki (A+ B+)', en: 'Next (A+ B+)' },
        'J_A',
        'K_A',
        'J_B',
        'K_B',
      ],
      rows: [
        [
          { value: '0 0' }, { value: '0 1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
        ],
        [
          { value: '0 1' }, { value: '1 0' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
        ],
        [
          { value: '1 0' }, { value: '0 0' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '1', placeholder: '0/1/X' },
          { value: '', editable: true, expected: '0', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
        ],
        [
          { value: '1 1' }, { value: 'X X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
          { value: '', editable: true, expected: 'X', placeholder: '0/1/X' },
        ],
      ],
      solutionExplanation: {
        tr: "Bu tablodan K-Map çizildiğinde J_A = B, K_A = 1, J_B = A', K_B = 1 elde edilir. Kullanılmayan 11 durumunda (A=1, B=1 ⇒ A'=0, B'=0): A+ = J_A·A' + K_A'·A = (1)(0) + (0)(1) = 0 ve B+ = J_B·B' + K_B'·B = (0)(0) + (0)(1) = 0 olduğundan devre 11'den otomatik 00'a döner (Self-Correcting!).",
        en: "Minimizing with K-Maps yields J_A = B, K_A = 1, J_B = A', K_B = 1. From unused state 11 (A=1, B=1 ⇒ A'=0, B'=0): A+ = J_A·A' + K_A'·A = (1)(0) + (0)(1) = 0 and B+ = J_B·B' + K_B'·B = (0)(0) + (0)(1) = 0, so the counter automatically recovers to 00 (Self-Correcting!).",
      },
    },
    {
      id: 'w13-q6',
      type: 'simulator-build',
      title: {
        tr: 'Soru 6 · 2-Bit Gray Code Counter Kurulumu (Canlı Lab)',
        en: 'Question 6 · 2-Bit Gray Code Counter Build (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "Simülatörde 2 adet JK Flip-Flop (ve gerekirse NOT kapısı) kullanarak 2-Bit Gray Code Counter (00 → 01 → 11 → 10 → 00; J_A = B, K_A = B', J_B = A', K_B = A) devresini kurun. İlk FF çıkışını A LED'ine, ikinci FF çıkışını B LED'ine bağlayın ve Clock darbeleriyle 4 durumlu Gray çevrimini doğrulayın.",
        en: "In the simulator, use 2 JK Flip-Flops (and a NOT gate if desired) to build the 2-Bit Gray Code Counter (00 → 01 → 11 → 10 → 00; J_A = B, K_A = B', J_B = A', K_B = A). Connect the first FF output to LED A, the second FF output to LED B, and verify the 4-state Gray cycle with clock pulses.",
      },
      inputs: [],
      outputs: ['A', 'B'],
      allowedComponents: ['JKFF', 'NOT'],
      expectedTruthTable: [],
      sequentialTest: {
        clkLabel: 'CLK',
        steps: [
          { inputs: {}, expectedOutputs: { A: 0, B: 1 } },
          { inputs: {}, expectedOutputs: { A: 1, B: 1 } },
          { inputs: {}, expectedOutputs: { A: 1, B: 0 } },
          { inputs: {}, expectedOutputs: { A: 0, B: 0 } },
        ],
      },
      hint: {
        tr: "Her JK Flip-Flop'un zaten Q ve Q' çıkışları vardır! 1. Flip-Flop (A)'nın J pinine B'nin Q çıkışını, K pinine B'nin Q' çıkışını bağlayın. 2. Flip-Flop (B)'nin J pinine A'nın Q' çıkışını, K pinine A'nın Q çıkışını bağlayın. A'nın Q çıkışını A LED'ine, B'nin Q çıkışını B LED'ine, iki CLK pinini ise ortak CLK üretecine bağlayın.",
        en: "Each JK Flip-Flop already provides both Q and Q' outputs! Wire FF B's Q output to FF A's J pin and FF B's Q' output to FF A's K pin. Wire FF A's Q' output to FF B's J pin and FF A's Q output to FF B's K pin. Connect Q outputs to LEDs A and B, and both CLK pins to the shared CLK generator.",
      },
      solutionDescription: {
        tr: "JK Flip-Flop'ların kendi Q ve Q' çıkışları doğrudan çapraz bağlanarak (J_A=B, K_A=B', J_B=A', K_B=A) ekstra hiçbir kapı olmadan 00 → 01 → 11 → 10 → 00 Gray Code sayıcısı elde edilir.",
        en: "Cross-wiring the built-in Q and Q' outputs of the two JK Flip-Flops (J_A=B, K_A=B', J_B=A', K_B=A) produces the 00 → 01 → 11 → 10 → 00 Gray Code counter with zero external gates.",
      },
    },
  ],
};
