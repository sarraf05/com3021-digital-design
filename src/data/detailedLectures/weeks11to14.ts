import type { DetailedLectureEntry } from './types';

export const DETAILED_WEEKS_11_TO_14: Record<string, DetailedLectureEntry> = {
  // =========================================================================
  // WEEK 11 — Lecture 10: Analysis of Clocked Sequential Circuits (Sec. 5.4-5.5)
  // =========================================================================
  'w11-c1': {
    cardId: 'w11-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.5 · Lecture 10 (Slides 1–4)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.5 · Lecture 10 (Slayt 1–4)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (State Equations & State Tables)',
      },
      body: {
        en: 'The behavior of a clocked synchronous sequential circuit is completely determined by its external inputs, external outputs, and the binary states stored in its flip-flops. A State Equation (transition equation) is an algebraic Boolean expression giving the next flip-flop state Q(t+1)—one clock period after the active clock edge—as a function of present state Q(t) and present inputs (time index (t) is normally omitted for brevity). A State Table tabulates every combination of present states and inputs to list all resulting next states and outputs, either in sequential binary order (2^(m+n) rows for m flip-flops and n inputs) or in a compact three-section table (Present State, Next State for x=0 / x=1, Output for x=0 / x=1).',
        tr: 'Saatli senkron ardışıl bir devrenin davranışı dış girişler, çıkışlar ve flip-floplarda saklanan mevcut durum (present state) tarafından belirlenir. Durum Denklemi (State / Transition Equation), aktif saat kenarından bir saat periyodu sonraki durumu Q(t+1), mevcut durum ve girişler cinsinden ifade eden Boole denklemidir (kısalık için mevcut durumdaki (t) indisi genellikle yazılmaz). Durum Tablosu (State Table) ise m flip-flop ve n giriş için tüm 2^(m+n) kombinasyona karşılık gelen Sonraki Durum (Next State) ve Çıkış değerlerini listeler; tek girişli devrelerde 3 sütunlu kompakt biçimde (Mevcut Durum, x=0/x=1 Sonraki Durum, x=0/x=1 Çıkış) düzenlenebilir.',
      },
      formalEquation: 'D-FF Circuit (Mano Fig. 5.15): A(t+1) = Ax + Bx,  B(t+1) = A\'x,  y = (A + B)x\'',
    },
    procedure: {
      heading: {
        en: 'Constructing State Equations & State Tables Step by Step',
        tr: 'Adım Adım Durum Denklemi ve Durum Tablosu Çıkarma Prosedürü',
      },
      steps: [
        {
          en: '1. Label Flip-Flop Outputs & Clock: Name flip-flop outputs A, B, … and verify all flip-flops share a common Clock edge.',
          tr: '1. Flip-Flop Çıkışlarını Adlandır: Flip-floplara A, B, … isimlerini ver ve ortak bir saat sinyaliyle tetiklendiklerini doğrula.',
        },
        {
          en: '2. Write Next-State & Output Equations: For D flip-flops, A(t+1) equals the Boolean expression driving D_A directly; read external output equations y = f(A, B, x).',
          tr: '2. Durum ve Çıkış Denklemlerini Yaz: D flip-flop için A(t+1) doğrudan D_A girişini süren fonksiyona eşittir; çıkış fonksiyonu y\'yi de çıkar.',
        },
        {
          en: '3. Enumerate All 2^(m+n) Rows: List binary values of (Present State, Input) from 0 up to 2^(m+n) − 1 and evaluate A(t+1), B(t+1), and y row by row.',
          tr: '3. Tüm 2^(m+n) Satırı Doldur: (Mevcut Durum, Giriş) kombinasyonlarını sırayla yazıp her satır için A(t+1), B(t+1) ve y değerlerini hesapla.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked State Table Derivation (Mano Table 5.3 / Fig. 5.15)',
        tr: 'Adım Adım Çözümlü Örnek: Mano Şekil 5.15 Durum Tablosu Çıkarımı',
      },
      problem: {
        en: 'Derive the complete 8-row State Table for the 2-FF sequential circuit defined by A(t+1) = Ax + Bx, B(t+1) = A\'x, and y = (A + B)x\'.',
        tr: 'A(t+1) = Ax + Bx, B(t+1) = A\'x ve y = (A + B)x\' denklemleriyle verilen 2 flip-floplu ardışıl devrenin 8 satırlı Durum Tablosunu oluşturunuz.',
      },
      steps: [
        {
          en: 'Step 1 — Evaluate Row (A=0, B=1, x=0): A(t+1) = 0·0 + 1·0 = 0; B(t+1) = 1·0 = 0; y = (0 + 1)·(0\') = 1.',
          tr: 'Adım 1 — Satır (A=0, B=1, x=0): A(t+1) = 0, B(t+1) = 0, y = (0 + 1)·1 = 1.',
        },
        {
          en: 'Step 2 — Evaluate Row (A=0, B=1, x=1): A(t+1) = 0·1 + 1·1 = 1; B(t+1) = 1·1 = 1; y = (0 + 1)·(1\') = 0.',
          tr: 'Adım 2 — Satır (A=0, B=1, x=1): A(t+1) = 1, B(t+1) = 1, y = (0 + 1)·0 = 0.',
        },
        {
          en: 'Step 3 — Complete Remaining Rows: Notice whenever x = 0, both A(t+1) = 0 and B(t+1) = 0 (circuit resets to 00), while y = A + B!',
          tr: 'Adım 3 — Kalan Satırları Tamamla: x = 0 olan tüm satırlarda sonraki durum daima 00 olur ve çıkış y = A + B değerini alır.',
        },
      ],
      table: {
        caption: {
          en: 'Complete State Table for Mano Fig. 5.15 (Table 5.3)',
          tr: 'Mano Şekil 5.15 İçin Tam Durum Tablosu (Tablo 5.3)',
        },
        headers: ['Present (A B)', 'Input (x)', 'Next (A+ B+)', 'Output (y)'],
        rows: [
          ['0 0', '0', '0 0', '0'],
          ['0 0', '1', '0 1', '0'],
          ['0 1', '0', '0 0', '1'],
          ['0 1', '1', '1 1', '0'],
          ['1 0', '0', '0 0', '1'],
          ['1 0', '1', '1 0', '0'],
          ['1 1', '0', '0 0', '1'],
          ['1 1', '1', '1 0', '0'],
        ],
      },
      finalAnswer: {
        en: 'The 8-row table fully maps every (A, B, x) triplet to Next State (A+, B+) and Output y.',
        tr: '8 satırlı tablo her (A, B, x) üçlüsünün üreteceği Sonraki Durum (A+, B+) ve y çıkışını eksiksiz tanımlar.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do NOT confuse y with Next State! In a Mealy machine (like y = (A+B)x\' above), y is evaluated from the PRESENT state (A, B) and PRESENT input x BEFORE the clock edge!',
          tr: 'Çıkış y\'yi Sonraki Durum ile hesaplamayın! Mealy makinesinde y, saat darbesi vurmadan ÖNCEKİ mevcut durum (A, B) ve şimdiki giriş x ile hesaplanır!',
        },
        {
          en: 'When building the compact 3-section state table, carefully separate Next State (x=0, x=1) columns from Output (x=0, x=1) columns.',
          tr: 'Kompakt 3 bölümlü durum tablosunda x=0 ve x=1 için Sonraki Durum sütunları ile Çıkış sütunlarını karıştırmayın.',
        },
      ],
    },
  },

  'w11-c2': {
    cardId: 'w11-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.5 · Lecture 10 (Slides 4–6)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.5 · Lecture 10 (Slayt 4–6)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (State Diagrams & Flip-Flop Input Equations)',
      },
      body: {
        en: 'A State Diagram translates the tabular information of a state table into a directed graph: each circle represents a binary state (e.g., 00, 01, 10, 11), and each directed arrow represents a clock-triggered transition from present state to next state. On Mealy-type diagrams, arrows carry the label input/output (e.g., 1/0). Algebraically, the combinational logic driving the flip-flop inputs is specified by Flip-Flop Input (Excitation) Equations (such as D_A = Ax + Bx), which specify both the combinational gates and the flip-flop type.',
        tr: 'Durum Diyagramı (State Diagram), durum tablosunun yönlü grafiksel gösterimidir: her daire bir ikili durumu (00, 01, 10, 11), yönlü oklar ise saat darbesiyle gerçekleşen durum geçişini gösterir. Mealy diyagramlarında okların üzerine "giriş/çıkış" (ör. 1/0) etiketi yazılır (çıkışı olmayan devrelerde yalnızca giriş değeri yazılır). Flip-flop girişlerini süren birleşik kapı devresi ise Flip-Flop Giriş (Uyarma) Denklemleri (ör. D_A = Ax + Bx) ile cebirsel olarak tanımlanır.',
      },
      formalEquation: 'Arrow Label (Mealy):  x / y   (e.g., 00 —[1/0]→ 01)   |   D-FF: Q(t+1) = D_Q',
    },
    procedure: {
      heading: {
        en: 'Drawing a State Diagram & Reading Input Equations',
        tr: 'Adım Adım Durum Diyagramı Çizme ve Giriş Denklemi Kuralları',
      },
      steps: [
        {
          en: '1. Draw 2^m State Circles: Create one circle per distinct binary state (00, 01, 10, 11 for 2 flip-flops).',
          tr: '1. Durum Dairelerini Çiz: m flip-flop için 2^m adet durum dairesi (00, 01, 10, 11) çiz.',
        },
        {
          en: '2. Draw Exactly 2^n Outgoing Arrows per State: Every state must have one outgoing transition arrow for every possible input combination (e.g., two arrows: x=0 and x=1). If next state equals present state, draw a self-loop.',
          tr: '2. Her Daireden 2^n Ok Çıkar: Her durum için tüm giriş kombinasyonları adına (ör. x=0 ve x=1) birer ok çiz; sonraki durum mevcut durumla aynıysa kendi üzerine dönen ok (self-loop) koy.',
        },
        {
          en: '3. Label Arrows & Verify Input Equations: Label each arrow with input/output (or input only if there is no external output). Express D_A, J_A, K_A, or T_A as Boolean functions of flip-flop outputs and primary inputs.',
          tr: '3. Okları Etiketle: Okların üzerine "giriş/çıkış" yaz (harici çıkış yoksa sadece giriş yaz). D_A, J_A, K_A veya T_A denklemlerini flip-flop çıkışları ve girişler cinsinden yaz.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Example: Reading Transitions from Mano Fig. 5.16 State Diagram',
        tr: 'Adım Adım Çözümlü Örnek: Durum Diyagramından Geçiş ve Çıkış Okuma',
      },
      problem: {
        en: 'Starting from state 00 in the state diagram of Table 5.3 (D_A = Ax + Bx, D_B = A\'x, y = (A+B)x\'), trace the sequence of states and outputs for the input stream x = 1, 1, 0, 1.',
        tr: 'Tablo 5.3 durum diyagramında (D_A = Ax + Bx, D_B = A\'x, y = (A+B)x\') başlangıç durumu 00 iken girişe sırasıyla x = 1, 1, 0, 1 uygulanırsa durum geçişlerini ve çıkış y dizisini bulunuz.',
      },
      steps: [
        {
          en: 'Clock 1 (State 00, x=1): Follow arrow 1/0 from 00 → outputs y = 0, transitions to 01.',
          tr: '1. Saat (Durum 00, x=1): 00\'dan çıkan 1/0 okunu izle → çıkış y = 0, sonraki durum 01.',
        },
        {
          en: 'Clock 2 (State 01, x=1): Follow arrow 1/0 from 01 → outputs y = 0, transitions to 11.',
          tr: '2. Saat (Durum 01, x=1): 01\'den çıkan 1/0 okunu izle → çıkış y = 0, sonraki durum 11.',
        },
        {
          en: 'Clock 3 (State 11, x=0): Follow arrow 0/1 from 11 → outputs y = 1, resets to 00.',
          tr: '3. Saat (Durum 11, x=0): 11\'den çıkan 0/1 okunu izle → çıkış y = 1, sonraki durum 00.',
        },
        {
          en: 'Clock 4 (State 00, x=1): Follow arrow 1/0 from 00 → outputs y = 0, transitions to 01.',
          tr: '4. Saat (Durum 00, x=1): 00\'dan çıkan 1/0 okunu izle → çıkış y = 0, sonraki durum 01.',
        },
      ],
      finalAnswer: {
        en: 'State path: 00 → 01 → 11 → 00 → 01   |   Output stream y = 0, 0, 1, 0.',
        tr: 'Durum yolu: 00 → 01 → 11 → 00 → 01   |   Çıkış dizisi y = 0, 0, 1, 0.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Count outgoing arrows from EVERY state circle! For a 1-input circuit, every state MUST have exactly 2 outgoing arrows (x=0 and x=1); missing an arrow leaves the state machine incomplete.',
          tr: 'Her durum dairesinden çıkan okları sayın! 1 girişli devrede her durumdan mutlaka 2 ok (0 ve 1 için) çıkmalıdır.',
        },
        {
          en: 'Wait to separate input/output notation carefully: if two inputs lead to the SAME next state with the same output, you may write "0,1 / 0"; if outputs differ, draw separate arrows or write "0/1, 1/0".',
          tr: 'Aynı hedef duruma giden farklı girişlerin çıkışları da aynıysa "0,1/0" şeklinde birleştirilebilir; çıkışlar farklıysa ayrı etiketlenmelidir.',
        },
      ],
    },
  },

  'w11-c3': {
    cardId: 'w11-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.5 · Lecture 10 (Slides 6–11)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.5 · Lecture 10 (Slayt 6–11)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Analysis with D, JK & T Flip-Flops)',
      },
      body: {
        en: 'While D flip-flops equate next state directly to D (A(t+1) = D_A), analyzing circuits built with JK or T flip-flops requires applying their flip-flop behavior to determine next state. Two equivalent methods work: (1) the Tabular Characteristic Method—evaluate the flip-flop input equations (J_A, K_A or T_A) numerically for every row of the state table and look up Q(t+1) from the flip-flop\'s characteristic table—or (2) the Algebraic Substitution Method—plug the input equations directly into the characteristic equation Q(t+1) = J·Q\' + K\'·Q or Q(t+1) = T ⊕ Q.',
        tr: 'D flip-floplu devrelerde sonraki durum doğrudan D girişine eşitken (A(t+1) = D_A), JK veya T flip-floplu devreleri analiz ederken karakteristik davranış uygulanmalıdır. İki eşdeğer yöntem vardır: (1) Tablosal Yöntem—durum tablosunun her satırı için J_A, K_A veya T_A değerlerini hesaplayıp karakteristik tabloya göre Q(t+1)\'i bulmak; (2) Cebirsel Yöntem—giriş denklemlerini doğrudan karakteristik denklemde (A(t+1) = J_A·A\' + K_A\'·A veya A(t+1) = T_A ⊕ A) yerine koyup sadeleştirmektir.',
      },
      formalEquation: 'JK Analysis: A(t+1) = J_A·A\' + K_A\'·A   |   T Analysis: A(t+1) = T_A ⊕ A',
    },
    procedure: {
      heading: {
        en: '3-Step JK / T Sequential Circuit Analysis Procedure (Mano Sec. 5.5)',
        tr: 'Adım Adım JK ve T Flip-Flop Analiz Prosedürü',
      },
      steps: [
        {
          en: '1. Extract Flip-Flop Input Equations: Read the gate connections feeding J_A, K_A, J_B, K_B (or T_A, T_B) in terms of present state (A, B) and external input x.',
          tr: '1. Flip-Flop Giriş Denklemlerini Yaz: J_A, K_A, J_B, K_B (veya T_A, T_B) uçlarını süren Boole ifadelerini çıkar.',
        },
        {
          en: '2. Evaluate Input Columns in State Table: Compute 0/1 values for every flip-flop input column across all rows.',
          tr: '2. Giriş Sütunlarını Doldur: Durum tablosundaki her satır için J, K veya T sayısal değerlerini hesapla.',
        },
        {
          en: '3. Compute Next States (Table or Algebra): Apply JK rule (00→Hold, 01→0, 10→1, 11→Toggle) or T rule (0→Hold, 1→Toggle), OR verify algebraically via characteristic equations.',
          tr: '3. Sonraki Durumu Bul: JK (00→Tut, 01→0, 10→1, 11→Tersle) veya T (0→Tut, 1→Tersle) tablosuyla Q(t+1) sütununu doldur ve karakteristik denklemle sağlamasını yap.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked JK Flip-Flop Circuit Analysis (Mano Fig. 5.18 / Table 5.4 / Lecture 10)',
        tr: 'Adım Adım Çözümlü Örnek: 2-Bit JK Flip-Flop Devre Analizi (Mano Şekil 5.18)',
      },
      problem: {
        en: 'Analyze the JK sequential circuit (no external output) defined by J_A = B, K_A = Bx\', J_B = x\', K_B = A\'x + Ax\' = A ⊕ x using both characteristic equations and the state table.',
        tr: 'J_A = B, K_A = Bx\', J_B = x\', K_B = A ⊕ x giriş denklemlerine sahip JK ardışıl devreyi hem cebirsel denklem hem de durum tablosuyla analiz ediniz.',
      },
      steps: [
        {
          en: 'Step 1 — Algebraic State Equations:\n  • A(t+1) = J_A·A\' + K_A\'·A = B·A\' + (Bx\')\'·A = A\'B + A(B\' + x) = A\'B + AB\' + Ax\n  • B(t+1) = J_B·B\' + K_B\'·B = x\'B\' + (A ⊕ x)\'·B = B\'x\' + ABx + A\'Bx\'.',
          tr: 'Adım 1 — Cebirsel Durum Denklemleri:\n  • A(t+1) = B·A\' + (Bx\')\'·A = A\'B + AB\' + Ax\n  • B(t+1) = x\'B\' + (A ⊕ x)\'·B = B\'x\' + ABx + A\'Bx\'.',
        },
        {
          en: 'Step 2 — Verify Row (AB = 01, x = 0): J_A = B = 1, K_A = 1·1 = 1 (Toggle A: 0→1); J_B = x\' = 1, K_B = 0⊕0 = 0 (Set B: 1→1). Next state = 11!',
          tr: 'Adım 2 — Satır (AB = 01, x = 0) Kontrolü: J_A=1, K_A=1 (A terslenir: 0→1); J_B=1, K_B=0 (B=1 kurulur). Sonraki durum = 11!',
        },
        {
          en: 'Step 3 — Verify Row (AB = 11, x = 0): J_A = 1, K_A = 1 (Toggle A: 1→0); J_B = 1, K_B = 1⊕0 = 1 (Toggle B: 1→0). Next state = 00!',
          tr: 'Adım 3 — Satır (AB = 11, x = 0) Kontrolü: J_A=1, K_A=1 (A: 1→0); J_B=1, K_B=1 (B: 1→0). Sonraki durum = 00!',
        },
      ],
      table: {
        caption: {
          en: 'Complete JK Analysis Table (Mano Table 5.4 / Lecture 10)',
          tr: 'JK Ardışıl Devre Analiz Tablosu (Mano Tablo 5.4)',
        },
        headers: ['Present (A B)', 'Input (x)', 'J_A K_A', 'J_B K_B', 'Next (A+ B+)'],
        rows: [
          ['0 0', '0', '0 0', '1 0', '0 1'],
          ['0 0', '1', '0 0', '0 1', '0 0'],
          ['0 1', '0', '1 1', '1 0', '1 1'],
          ['0 1', '1', '1 0', '0 1', '1 0'],
          ['1 0', '0', '0 0', '1 1', '1 1'],
          ['1 0', '1', '0 0', '0 0', '1 0'],
          ['1 1', '0', '1 1', '1 1', '0 0'],
          ['1 1', '1', '1 0', '0 0', '1 1'],
        ],
      },
      finalAnswer: {
        en: 'Both algebraic equations and row-by-row JK characteristic evaluation yield the exact same 8 transitions.',
        tr: 'Hem cebirsel durum denklemleri hem de satır bazlı JK karakteristik tablosu aynı 8 durum geçişini verir.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Double-check K_A\' when substituting into A(t+1) = J_A·A\' + K_A\'·A! For example, (Bx\')\' = B\' + x by DeMorgan (NOT B\'x).',
          tr: 'Karakteristik denklemde K_A\' alırken DeMorgan hatası yapmayın: K_A = Bx\' ise K_A\' = (Bx\')\' = B\' + x olur!',
        },
        {
          en: 'In a T-FF counter (e.g., T_A = Bx, T_B = x), remember T = 0 does NOT reset Q to 0—it HOLDS the present state Q!',
          tr: 'T flip-flop analizinde T = 0 olması çıkışı 0\'a sıfırlamaz; mevcut değeri AYNEN KORUR!',
        },
      ],
    },
  },

  'w11-c4': {
    cardId: 'w11-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.5 · Lecture 10 (Slides 11–13)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.5 · Lecture 10 (Slayt 11–13)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Mealy vs. Moore Finite State Machines)',
      },
      body: {
        en: 'Finite State Machines (FSMs) are classified into two canonical architectures based on how external outputs are generated. In the Mealy Model, outputs are functions of BOTH the present state and the external inputs; consequently, outputs can change asynchronously mid-cycle whenever inputs change, and state diagrams place input/output labels on transition arrows. In the Moore Model, outputs depend ONLY on the present state (flip-flop outputs); thus outputs remain strictly synchronized with the clock, and state circles are labeled state/output (e.g., 11/1).',
        tr: 'Sonlu Durum Makineleri (Finite State Machines - FSM), çıkışların üretilme biçimine göre iki temel modele ayrılır. Mealy Modelinde çıkış hem mevcut durumun HEM DE dış girişlerin fonksiyonudur; bu yüzden saat darbesi içinde giriş değişirse çıkış anlık olarak değişebilir ve durum diyagramlarında "giriş/çıkış" etiketi okların üzerine yazılır. Moore Modelinde ise çıkış YALNIZCA mevcut durumun (flip-flop çıkışlarının) fonksiyonudur; çıkış tamamen saatle senkronizedir ve diyagramda "durum/çıkış" etiketi (ör. 11/1) dairenin içine yazılır.',
      },
      formalEquation: 'Mealy: y = g(State, Input) [arrow: x/y]   |   Moore: y = g(State) [circle: State/y]',
    },
    procedure: {
      heading: {
        en: 'Distinguishing Mealy vs. Moore Circuits & Timing Behavior',
        tr: 'Adım Adım Mealy ve Moore Ayırt Etme Kuralları',
      },
      steps: [
        {
          en: '1. Inspect Output Logic Schematic: Trace the wires feeding output y. If any primary input (x) connects directly to the output gate(s), it is Mealy; if only flip-flop Q/Q\' outputs feed y, it is Moore.',
          tr: '1. Çıkış Şemasını İzle: Çıkış y\'yi üreten kapılara dış giriş x doğrudan bağlanıyorsa Mealy, yalnızca flip-flop çıkışları (A, B) bağlanıyorsa Moore modelidir.',
        },
        {
          en: '2. Inspect State Table Output Columns: If output y has separate values under x=0 and x=1 for the same present state, it is Mealy; if output y has a single column per present state (identical for x=0 and x=1), it is Moore.',
          tr: '2. Durum Tablosunu İncele: Aynı mevcut durum için x=0 ve x=1 altında çıkış farklılaşabiliyorsa Mealy, her mevcut durum satırı için tek sabit bir çıkış varsa Moore\'dur.',
        },
        {
          en: '3. Inspect State Diagram Slash (/): Output inside circle (11/1) → Moore; output on arrow (1/0) → Mealy.',
          tr: '3. Diyagram İşaretini Kontrol Et: Eğik çizgi (/) daire içindeyse (11/1) Moore, geçiş oku üzerindeyse (1/0) Mealy modelidir.',
        },
      ],
      table: {
        caption: {
          en: 'Mealy vs. Moore Architecture Comparison (Mano Sec. 5.5)',
          tr: 'Mealy ve Moore Modelleri Karşılaştırma Tablosu',
        },
        headers: [
          { en: 'Feature', tr: 'Özellik' },
          { en: 'Mealy Machine', tr: 'Mealy Makinesi' },
          { en: 'Moore Machine', tr: 'Moore Makinesi' },
        ],
        rows: [
          [
            { en: 'Output Formula', tr: 'Çıkış Bağımlılığı' },
            'y = f(State, Input)',
            'y = f(State)',
          ],
          [
            { en: 'Diagram Notation', tr: 'Diyagram Gösterimi' },
            { en: 'On transition arrows (x/y)', tr: 'Geçiş okları üzerinde (x/y)' },
            { en: 'Inside state circles (S/y)', tr: 'Durum daireleri içinde (S/y)' },
          ],
          [
            { en: 'Clock Synchronization', tr: 'Saat Senkronizasyonu' },
            { en: 'Can glitch if input changes mid-cycle', tr: 'Giriş değişirse çevrim içi değişebilir' },
            { en: 'Strictly synchronous with clock edges', tr: 'Saat kenarlarıyla tam senkronize' },
          ],
          [
            { en: 'Typical State Count', tr: 'Tipik Durum Sayısı' },
            { en: 'Often 1 fewer state (faster reaction)', tr: 'Genellikle 1 az durum (aynı çevrim tepki)' },
            { en: 'Often +1 state (1-cycle output delay)', tr: 'Genellikle +1 durum (saat darbesi sonrası çıkış)' },
          ],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Example: Moore T-FF Counter vs. Mealy D-FF Circuit (Mano Ex. 5.5–5.6)',
        tr: 'Adım Adım Çözümlü Örnek: T-FF Moore Sayıcı ve D-FF Mealy Devresi',
      },
      problem: {
        en: 'Compare Circuit 1: A(t+1)=Ax+Bx, B(t+1)=A\'x, y=(A+B)x\' against Circuit 2: T_A = Bx, T_B = x, y = AB.',
        tr: 'Devre 1 (A(t+1)=Ax+Bx, B(t+1)=A\'x, y=(A+B)x\') ile Devre 2 (T_A = Bx, T_B = x, y = AB) yapılarını Mealy/Moore modeline göre analiz ediniz.',
      },
      steps: [
        {
          en: 'Step 1 — Circuit 1 (y = (A+B)x\'): Output y directly contains input x\'. In state 11, y = 1 when x = 0, but y = 0 when x = 1 → Mealy Machine! Changing x mid-clock immediately flips y.',
          tr: 'Adım 1 — Devre 1 (y = (A+B)x\'): Çıkış denklemi x\' girişini doğrudan içerir. Örneğin 11 durumunda x=0 iken y=1, x=1 iken y=0 olur → Mealy Makinesi!',
        },
        {
          en: 'Step 2 — Circuit 2 (y = AB): Output y depends solely on flip-flop states A and B (zero dependence on x). When x = 1 it counts 00→01→10→11→00; when x = 0 it holds state. Output y = 1 ONLY in state 11 (labeled 11/1 inside the circle) → Moore Machine!',
          tr: 'Adım 2 — Devre 2 (y = AB): Çıkış x girişinden tamamen bağımsızdır. x=1 iken 00→01→10→11→00 sayar, x=0 iken durumu korur. Çıkış y yalnızca 11 durumunda 1 olur (daire içinde 11/1) → Moore Makinesi!',
        },
      ],
      finalAnswer: {
        en: 'Circuit 1 is Mealy (y=(A+B)x\'); Circuit 2 is Moore (y=AB, synchronous counter with rollover indicator).',
        tr: 'Devre 1 Mealy modelidir (y=(A+B)x\'); Devre 2 ise Moore modelidir (y=AB, yalnızca saat kenarında güncellenir).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'To prevent momentary false outputs ("glitches") on a Mealy machine, inputs must be synchronized with the clock and outputs sampled strictly right before/at the clock edge.',
          tr: 'Mealy devrelerinde sahte anlık sıçramaları önlemek için girişler saatle senkronize edilmeli ve çıkışlar yalnızca saat kenarı anında örneklenmelidir.',
        },
        {
          en: 'Never assume a circuit with external input x is automatically Mealy—if x only feeds flip-flop inputs (J, K, T, D) and NOT the output gate y, the machine is strictly Moore!',
          tr: 'Devrede dış giriş x bulunması makineyi otomatik olarak Mealy yapmaz: x sadece flip-flop girişlerini sürüp çıkış kapısı y\'ye bağlanmıyorsa devre Moore\'dur!',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 12 — Lecture 11: Design & Synthesis of Synchronous Sequential Circuits
  // =========================================================================
  'w12-c1': {
    cardId: 'w12-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Lecture 11 (Slides 1–2)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Lecture 11 (Slayt 1–2)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (7-Step Sequential Design Procedure)',
      },
      body: {
        en: 'Designing (synthesizing) a clocked synchronous sequential circuit reverses analysis: it starts from a word specification and culminates in a verified gate-and-flip-flop logic diagram. Mano & Ciletti organize this into 7 systematic steps, where Steps 1–3 translate behavioral specs into an encoded state representation (choosing m flip-flops such that 2^(m−1) < M ≤ 2^m for M reduced states), and Steps 4–7 are fully algorithmic hardware synthesis transforming the sequential design into a standard combinational K-map minimization problem.',
        tr: 'Saatli senkron ardışıl devre tasarımı (sentezi), analizin tersi yönde çalışır: sözel bir problem tanımından başlayarak kapı ve flip-flop seviyesinde devre şemasına ulaşır. Mano & Ciletti bu süreci 7 adımda sistemleştirir: ilk 3 adım davranışı durum diyagramına ve en az sayıda ikili durum koduna dönüştürür (M indirgenmiş durum için 2^(m−1) < M ≤ 2^m koşulunu sağlayan m flip-flop seçilir); 4–7. adımlar ise ardışıl problemi tamamen algoritmik bir birleşik devre K-Map sadeleştirme problemine dönüştürür.',
      },
      formalEquation: 'Required Flip-Flops m = ⌈log_2(M)⌉   (2^(m−1) < Number of States M ≤ 2^m)',
    },
    procedure: {
      heading: {
        en: 'Mano’s 7-Step Synchronous Sequential Design Procedure (Sec. 5.8)',
        tr: 'Mano’nun 7 Adımlı Senkron Ardışıl Devre Tasarım Prosedürü',
      },
      steps: [
        {
          en: '1. Derive State Diagram: Translate word specifications into states and transition arrows (choose Mealy or Moore).',
          tr: '1. Durum Diyagramını Çıkar: Sözel tanımdan durumları ve geçiş oklarını (Mealy veya Moore olarak) oluştur.',
        },
        {
          en: '2. State Reduction: Merge equivalent states so no redundant states waste flip-flops.',
          tr: '2. Durum Sayısını Azalt (State Reduction): Eşdeğer durumları birleştirerek gereksiz durumları ele.',
        },
        {
          en: '3. Binary State Assignment: Assign unique m-bit binary codes to the M states (e.g., S_0=00, S_1=01, …).',
          tr: '3. İkili Durum Ataması (State Assignment): M durum için benzersiz m-bitlik ikili kodlar ata.',
        },
        {
          en: '4. Build Binary-Coded State Table: List Present State, Input, Next State, and Output in binary.',
          tr: '4. İkili Durum Tablosunu Kur: Mevcut Durum, Giriş, Sonraki Durum ve Çıkışı ikili tablo haline getir.',
        },
        {
          en: '5. Choose Flip-Flop Type & Append Excitation Columns: Select D, JK, or T flip-flops and fill required FF inputs for every row.',
          tr: '5. Flip-Flop Türünü Seç ve Uyarma Sütunlarını Ekle: D, JK veya T seçip her geçiş için gerekli flip-flop girişlerini yaz.',
        },
        {
          en: '6. Derive Simplified FF Input & Output Equations: Minimize each FF input column and external output via K-maps (marking unused state codes as X initially).',
          tr: '6. K-Map ile Denklemleri Sadeleştir: Her FF girişi ve çıkış için K-Map çiz (kullanılmayan durum kodlarını başlangıçta X al).',
        },
        {
          en: '7. Draw the Logic Diagram: Wire the combinational gates and flip-flops sharing a common Clock line.',
          tr: '7. Lojik Diyagramı Çiz: Ortak Clock hattına bağlı flip-flopları ve birleşik mantık kapılarını bağla.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Sizing Example: Flip-Flop Count & Unused Codes for a 5-State FSM',
        tr: 'Adım Adım Çözümlü Örnek: 5 Durumlu FSM İçin Flip-Flop Sayısı ve Boş Kodlar',
      },
      problem: {
        en: 'A sequential circuit specification initially produces 7 states, which reduce to 5 states after Step 2. Determine (a) the flip-flop savings, (b) the minimum number of flip-flops m needed, and (c) how many binary codes remain unused.',
        tr: 'Başlangıçta 7 durumu olan bir devre Step 2 sonunda 5 duruma indirgeniyor. (a) Kaç flip-flop tasarruf edildiğini, (b) minimum m flip-flop sayısını ve (c) kaç ikili durum kodunun boşta kaldığını hesaplayınız.',
      },
      steps: [
        {
          en: 'Step 1 — Before vs. After Flip-Flop Count: Both 7 states (2^2 < 7 ≤ 2^3 → m = 3) and 5 states (2^2 < 5 ≤ 2^3 → m = 3) require m = 3 flip-flops (saving states simplifies combinational gates even when m stays 3; reducing from 5 down to 4 would save an entire flip-flop!).',
          tr: 'Adım 1 — Flip-Flop Sayısı: Hem 7 durum hem 5 durum için 2^2 < M ≤ 2^3 olduğundan m = 3 flip-flop gerekir (durum indirgeme burada birleşik kapı maliyetini düşürür; 5 yerine 4\'e inseydi 1 flip-flop da azalırdı).',
        },
        {
          en: 'Step 2 — Unused Binary States: 3 flip-flops provide 2^3 = 8 possible binary codes (000 through 111). Using 5 codes leaves 8 − 5 = 3 unused binary states (e.g., 101, 110, 111).',
          tr: 'Adım 2 — Kullanılmayan Durumlar: 3 flip-flop toplam 2^3 = 8 kod (000..111) üretir; 5 tanesi kullanılınca 8 − 5 = 3 adet kullanılmayan durum (101, 110, 111) kalır.',
        },
      ],
      finalAnswer: {
        en: 'm = 3 flip-flops (8 total codes, 5 valid states, 3 unused states usable as don\'t-cares X subject to lock-out check).',
        tr: 'm = 3 flip-flop (8 toplam kod, 5 geçerli durum, 3 kullanılmayan durum X olarak değerlendirilebilir).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Steps 4–7 are purely mechanical synthesis—errors almost always happen in Step 1 (wrong state diagram from ambiguous wording) or Step 6 (forgetting to check unused state transitions for lock-out).',
          tr: '4–7. adımlar tamamen mekanik sentezdir; hatalar neredeyse her zaman 1. adımda (durum diyagramını yanlış kurma) veya 6. adımda (kullanılmayan durumların kilitlenme kontrolünü unutma) yapılır.',
        },
        {
          en: 'Never forget that all flip-flops in a synchronous FSM share the exact same Clock input—never gate the clock with combinational logic!',
          tr: 'Senkron bir FSM\'deki tüm flip-floplar aynı ortak saat sinyalini paylaşır; saat hattına asla mantık kapısı bağlamayın!',
        },
      ],
    },
  },

  'w12-c2': {
    cardId: 'w12-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Lecture 11 (Slides 2–4)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Lecture 11 (Slayt 2–4)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Synthesis with D Flip-Flops: Sequence Detector)',
      },
      body: {
        en: 'Synthesizing a sequential circuit with D Flip-Flops is the simplest hardware realization because a D flip-flop\'s characteristic equation is Q(t+1) = D. Consequently, no separate excitation table is required: the Next State binary columns A(t+1), B(t+1) in the state table directly define the minterms for D_A and D_B. In Mano & Lecture 11\'s classic Moore sequence detector (detecting 3 or more consecutive 1s on input x), four states S_0..S_3 track the count of trailing consecutive 1s.',
        tr: 'D Flip-Flop ile sentez, tüm flip-flop türleri içinde en hızlı olanıdır çünkü D flip-flop için Q(t+1) = D özdeşliği geçerlidir. Bu nedenle ayrıca bir uyarma tablosuna (excitation table) gerek yoktur; durum tablosundaki Sonraki Durum sütunları A(t+1) ve B(t+1) doğrudan D_A ve D_B fonksiyonlarının mintermlerini verir. Mano ve Lecture 11\'deki klasik Moore dizi algılayıcısında (ardışık 3 veya daha fazla 1 geldiğinde çıkış 1), S_0..S_3 durumları art arda gelen 1\'lerin sayısını tutar.',
      },
      formalEquation: 'Moore ">=3 Consecutive 1s": D_A = Ax + Bx,  D_B = Ax + B\'x,  y = AB',
    },
    procedure: {
      heading: {
        en: 'D Flip-Flop Synthesis Steps for Sequence Detection',
        tr: 'Adım Adım D Flip-Flop İle Dizi Algılayıcı Sentezi',
      },
      steps: [
        {
          en: '1. Define State Meanings Clearly: S_0 = 0 consecutive 1s (reset), S_1 = one 1, S_2 = two consecutive 1s, S_3 = three or more consecutive 1s (output y = 1).',
          tr: '1. Durumları Tanımla: S_0 = hiç 1 yok, S_1 = bir adet 1, S_2 = ardışık iki 1, S_3 = ardışık 3+ adet 1 (çıkış y = 1).',
        },
        {
          en: '2. Assign Binary Codes & Build Table: Encode S_0=00, S_1=01, S_2=10, S_3=11; any x=0 transitions back to 00, while x=1 advances 00→01→10→11 and stays in 11.',
          tr: '2. İkili Kodla ve Tablo Kur: S_0=00, S_1=01, S_2=10, S_3=11 ata; her x=0 girişi 00\'a döner, x=1 ise 00→01→10→11 ilerler ve 11\'de kalır.',
        },
        {
          en: '3. Read Minterms Directly & Simplify via 3-Variable K-Maps: Read A(t+1) rows for D_A(A,B,x), B(t+1) rows for D_B(A,B,x), and y rows for y(A,B).',
          tr: '3. Doğrudan K-Map\'ten Sadeleştir: A(t+1) sütunundan D_A(A,B,x), B(t+1) sütunundan D_B(A,B,x) ve çıkıştan y(A,B) denklemlerini çıkar.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Synthesis: Detect 3+ Consecutive 1s with D FFs (Lecture 11, Ex. 1)',
        tr: 'Adım Adım Çözümlü Örnek: 3+ Ardışık 1 Algılayıcı Sentezi (Lecture 11, Örn. 1)',
      },
      problem: {
        en: 'Derive D_A, D_B, and output y for the Moore "three or more consecutive 1s" detector using binary state assignment S_0=00, S_1=01, S_2=10, S_3=11.',
        tr: 'S_0=00, S_1=01, S_2=10, S_3=11 kodlamasıyla "ardışık 3 veya daha fazla 1 algılayıcı" Moore devresinin D_A, D_B ve y denklemlerini çıkarınız.',
      },
      steps: [
        {
          en: 'Step 1 — Read Minterms from State Table: A(t+1) = 1 at rows 3 (01,1), 5 (10,1), and 7 (11,1) → D_A(A,B,x) = ∑(3, 5, 7).',
          tr: 'Adım 1 — D_A Mintermleri: A(t+1) sütunu 3 (011), 5 (101) ve 7 (111) satırlarında 1 → D_A = ∑(3, 5, 7).',
        },
        {
          en: 'Step 2 — Read D_B and y Minterms: B(t+1) = 1 at rows 1 (00,1), 5 (10,1), and 7 (11,1) → D_B(A,B,x) = ∑(1, 5, 7). Output y = 1 at rows 6 (11,0) and 7 (11,1) → y = ∑(6, 7).',
          tr: 'Adım 2 — D_B ve y Mintermleri: B(t+1) için D_B = ∑(1, 5, 7); çıkış y için ise 6 (110) ve 7 (111) satırları 1 → y = ∑(6, 7).',
        },
        {
          en: 'Step 3 — K-Map Minimization:\n  • D_A = ∑(3, 5, 7) → {3,7}=Bx, {5,7}=Ax → D_A = Ax + Bx\n  • D_B = ∑(1, 5, 7) → {1,5}=B\'x, {5,7}=Ax → D_B = Ax + B\'x\n  • y = ∑(6, 7) → y = AB (pure Moore output!).',
          tr: 'Adım 3 — K-Map Sadeleştirme:\n  • D_A = Ax + Bx\n  • D_B = Ax + B\'x\n  • y = AB (yalnızca mevcut duruma bağlı Moore çıkışı!).',
        },
      ],
      table: {
        caption: {
          en: 'Binary-Coded State Table for Moore ">=3 Consecutive 1s" Detector',
          tr: 'Moore "Ardışık 3+ Bir Algılayıcı" İkili Durum Tablosu',
        },
        headers: ['Present (A B)', 'Input (x)', 'Next (A+ B+ = D_A D_B)', 'Output (y)'],
        rows: [
          ['0 0 (S_0)', '0', '0 0', '0'],
          ['0 0 (S_0)', '1', '0 1', '0'],
          ['0 1 (S_1)', '0', '0 0', '0'],
          ['0 1 (S_1)', '1', '1 0', '0'],
          ['1 0 (S_2)', '0', '0 0', '0'],
          ['1 0 (S_2)', '1', '1 1', '0'],
          ['1 1 (S_3)', '0', '0 0', '1'],
          ['1 1 (S_3)', '1', '1 1', '1'],
        ],
      },
      finalAnswer: {
        en: "D_A = Ax + Bx,   D_B = Ax + B'x,   y = AB.",
        tr: "D_A = Ax + Bx,   D_B = Ax + B'x,   y = AB.",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Look closely at S_3 (11) when x = 0: output y is STILL 1 during that clock cycle because Moore outputs reflect PRESENT state 11 before the clock edge resets it to 00!',
          tr: 'S_3 (11) durumunda x = 0 geldiğinde çıkış y O SATIRDA hala 1\'dir; çünkü Moore çıkışı saat darbesinden önce mevcut durum 11\'i yansıtır!',
        },
        {
          en: 'Notice S_3 loops to itself on x = 1 ("three OR MORE consecutive 1s" means overlapping detection stays at y = 1 for the 4th, 5th, … consecutive 1).',
          tr: 'S_3 durumunda x = 1 gelince 11\'de kalınır; böylece 4., 5. ardışık 1\'lerde de çıkış 1 kalmaya devam eder.',
        },
      ],
    },
  },

  'w12-c3': {
    cardId: 'w12-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Lecture 11 (Slides 4–5)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Lecture 11 (Slayt 4–5)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Excitation Tables for JK and T Flip-Flops)',
      },
      body: {
        en: 'During sequential circuit analysis, inputs are known and we find the next state via a Characteristic Table. During synthesis, the situation is inverted: the state table specifies the required state transition Q(t) → Q(t+1), and we must determine the flip-flop inputs needed to force that transition. An Excitation Table lists those required inputs for all four possible transitions (0→0, 0→1, 1→0, 1→1). Because two distinct JK modes can achieve each transition (e.g., 0→0 occurs for both Hold 00 and Reset 01), JK excitation tables contain abundant don\'t-care conditions (X) that significantly reduce K-map gate cost.',
        tr: 'Analiz sırasında flip-flop girişleri bellidir ve Karakteristik Tablo ile sonraki durum bulunur. Sentez (tasarım) sırasında ise tam tersi geçerlidir: durum tablosundan Q(t) → Q(t+1) geçişi bellidir ve bu geçişi gerçekleştirecek flip-flop girişleri aranır. Uyarma Tablosu (Excitation Table), olası 4 geçiş (0→0, 0→1, 1→0, 1→1) için gereken flip-flop girişlerini verir. JK flip-flop\'ta her geçişi sağlayan iki farklı mod olduğundan (ör. 0→0 hem Tut 00 hem Reset 01 ile sağlanır) JK uyarma tablosu çok sayıda X (don\'t-care) üreterek devreyi küçültür.',
      },
      formalEquation: 'JK Excitation: 0→0: 0X, 0→1: 1X, 1→0: X1, 1→1: X0   |   T Excitation: T = Q(t) ⊕ Q(t+1)',
    },
    procedure: {
      heading: {
        en: 'How to Derive & Apply JK and T Excitation Rules',
        tr: 'Adım Adım JK ve T Uyarma Tablosu Çıkarma ve Kullanma',
      },
      steps: [
        {
          en: '1. JK 0 → 0 Transition: Achieved by either Hold (J=0, K=0) or Reset (J=0, K=1). J must be 0, K can be either 0 or 1 → J = 0, K = X.',
          tr: '1. JK 0 → 0 Geçişi: Hem Tut (00) hem Sıfırla (01) ile sağlanır; J=0 zorunlu, K farksızdır → 0 X.',
        },
        {
          en: '2. JK 0 → 1 Transition: Achieved by either Set (J=1, K=0) or Toggle (J=1, K=1) → J = 1, K = X.',
          tr: '2. JK 0 → 1 Geçişi: Hem Kur (10) hem Tersle (11) ile sağlanır → 1 X.',
        },
        {
          en: '3. JK 1 → 0 and 1 → 1 Transitions: 1 → 0 uses Reset (01) or Toggle (11) → J = X, K = 1. 1 → 1 uses Hold (00) or Set (10) → J = X, K = 0.',
          tr: '3. JK 1 → 0 ve 1 → 1 Geçişleri: 1 → 0 için J=X, K=1; 1 → 1 için J=X, K=0.',
        },
        {
          en: '4. T Excitation Shortcut: No change (0→0, 1→1) requires T = 0; change (0→1, 1→0) requires T = 1 → T = Q(t) ⊕ Q(t+1).',
          tr: '4. T Uyarma Kuralı: Bit değişmiyorsa (0→0, 1→1) T = 0; bit değişiyorsa (0→1, 1→0) T = 1 → T = Q(t) ⊕ Q(t+1).',
        },
      ],
      table: {
        caption: {
          en: 'Flip-Flop Excitation Tables: D, JK, and T (Mano Table 5.12)',
          tr: 'D, JK ve T Flip-Flop Uyarma Tabloları (Mano Tablo 5.12)',
        },
        headers: ['Q(t)', 'Q(t+1)', 'D', 'J', 'K', 'T'],
        rows: [
          ['0', '0', '0', '0', 'X', '0'],
          ['0', '1', '1', '1', 'X', '1'],
          ['1', '0', '0', 'X', '1', '1'],
          ['1', '1', '1', 'X', '0', '0'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Example: Filling J_A, K_A, J_B, K_B Columns (Lecture 11, Ex. 2)',
        tr: 'Adım Adım Çözümlü Örnek: Durum Tablosuna JK Uyarma Sütunu Ekleme (Lecture 11, Örn. 2)',
      },
      problem: {
        en: 'Given two rows of a state table: Row 1 has Present AB = 00, x = 1 → Next A+B+ = 01; Row 2 has Present AB = 01, x = 0 → Next A+B+ = 10. Determine J_A, K_A, J_B, K_B and T_A, T_B.',
        tr: 'Bir durum tablosunun iki satırı şöyledir: Satır 1 (AB=00, x=1 → A+B+=01) ve Satır 2 (AB=01, x=0 → A+B+=10). Her iki satır için J_A, K_A, J_B, K_B ve T_A, T_B uyarma değerlerini bulunuz.',
      },
      steps: [
        {
          en: 'Row 1 (A: 0→0, B: 0→1): Flip-flop A transitions 0→0 → J_A=0, K_A=X, T_A=0. Flip-flop B transitions 0→1 → J_B=1, K_B=X, T_B=1.',
          tr: 'Satır 1 (A: 0→0, B: 0→1): A için 0→0 geçişi → J_A=0, K_A=X, T_A=0. B için 0→1 geçişi → J_B=1, K_B=X, T_B=1.',
        },
        {
          en: 'Row 2 (A: 0→1, B: 1→0): Flip-flop A transitions 0→1 → J_A=1, K_A=X, T_A=1. Flip-flop B transitions 1→0 → J_B=X, K_B=1, T_B=1.',
          tr: 'Satır 2 (A: 0→1, B: 1→0): A için 0→1 geçişi → J_A=1, K_A=X, T_A=1. B için 1→0 geçişi → J_B=X, K_B=1, T_B=1.',
        },
      ],
      finalAnswer: {
        en: 'Row 1: (J_A K_A, J_B K_B) = (0X, 1X), T=0,1   |   Row 2: (J_A K_A, J_B K_B) = (1X, X1), T=1,1.',
        tr: 'Satır 1: (0X, 1X), T=0,1   |   Satır 2: (1X, X1), T=1,1.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do NOT confuse the Characteristic Table (columns: J, K → Q(t+1)) with the Excitation Table (columns: Q(t), Q(t+1) → J, K)! Memorize the quick pattern for J: 0, 1, X, X and K: X, X, 1, 0.',
          tr: 'Karakteristik Tablo (J, K → Q(t+1)) ile Uyarma Tablosunu (Q(t), Q(t+1) → J, K) karıştırmayın! Hızlı ezber kalıbı: J sütunu yukarıdan aşağıya 0, 1, X, X; K sütunu ise X, X, 1, 0 şeklindedir.',
        },
        {
          en: 'Verify bit-by-bit carefully: match A(t) ONLY with A(t+1) for J_A, K_A, and match B(t) ONLY with B(t+1) for J_B, K_B.',
          tr: 'Geçiş okurken bitleri karıştırmayın: J_A, K_A için sadece A → A+, J_B, K_B için sadece B → B+ değişimine bakın.',
        },
      ],
    },
  },

  'w12-c4': {
    cardId: 'w12-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Lecture 11 (Slides 5–9)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Lecture 11 (Slayt 5–9)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (JK & T Synthesis: 3-Bit Binary Counter)',
      },
      body: {
        en: 'Synthesizing counters and non-trivial state sequences with JK or T flip-flops often produces much smaller combinational logic than D flip-flops. A binary counter cycles automatically through states 000 → 001 → … → 111 → 000 on every clock pulse; because the clock is implicit in clocked sequential diagrams, it is NEVER drawn as a transition variable on the state diagram. Using T flip-flops exploits their toggle property: a bit in an n-bit synchronous binary up-counter toggles (T = 1) if and only if all lower-order bits are equal to 1.',
        tr: 'JK veya T flip-floplarla sentezlenen sayıcılar ve durum makineleri genellikle D flip-flopa göre çok daha az kapı gerektirir. Bir ikili sayıcı her saat darbesiyle 000 → 001 → … → 111 → 000 dizisini otomatik izler; saat darbesi zaten tüm geçişleri tetiklediği için saat sinyali asla durum diyagramındaki geçiş oklarında giriş değişkeni olarak gösterilmez. T flip-flop\'un tümleme özelliği sayesinde senkron bir ikili yukarı sayıcıda her basamak, kendisinden önceki tüm düşük anlamlı bitler 1 olduğunda terslenir (T_i = A_(i-1)···A_0).',
      },
      formalEquation: '3-Bit Synchronous Binary Counter (A_2 A_1 A_0):  T_A0 = 1,   T_A1 = A_0,   T_A2 = A_1·A_0',
    },
    procedure: {
      heading: {
        en: 'Synthesizing a 3-Bit Binary Counter with T Flip-Flops (Mano Ex. & Lecture 11)',
        tr: 'Adım Adım T Flip-Flop ile 3-Bit İkili Sayıcı Tasarımı',
      },
      steps: [
        {
          en: '1. Draw Unlabeled Cyclic State Diagram: Connect 8 states 000 → 001 → 010 → 011 → 100 → 101 → 110 → 111 → 000 with plain arrows (no x/y labels because clock is the only trigger).',
          tr: '1. Sayıcı Durum Diyagramını Çiz: 000 → 001 → … → 111 → 000 döngüsünü oklarla birleştir (tek tetikleyici saat olduğu için okların üzerine giriş yazma).',
        },
        {
          en: '2. Fill T Excitation Columns: Compare each bit A_i(t) vs A_i(t+1): write T_Ai = 1 wherever bit i flips.',
          tr: '2. T Uyarma Sütunlarını Doldur: Her bit için şimdiki durum ile sonraki durumu kıyaslayıp değişen satırlara 1, değişmeyenlere 0 yaz.',
        },
        {
          en: '3. Simplify via 3-Variable K-Maps: T_A0 = ∑(0..7) = 1; T_A1 = ∑(1,3,5,7) = A_0; T_A2 = ∑(3,7) = A_1·A_0.',
          tr: '3. K-Map ile Sadeleştir: T_A0 = 1 (tüm satırlar 1), T_A1 = A_0 ve T_A2 = A_1·A_0 elde edilir.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Example: Complete 3-Bit Binary Counter Table & Gate Cost (Lecture 11, Ex. 3)',
        tr: 'Adım Adım Çözümlü Örnek: 3-Bit T-FF İkili Sayıcı Sentezi (Lecture 11, Örn. 3)',
      },
      problem: {
        en: 'Construct the full 8-row state and T-excitation table for a 3-bit synchronous binary counter (A_2 A_1 A_0) and verify how it transitions from 011 to 100.',
        tr: '3-bitlik senkron ikili sayıcının (A_2 A_1 A_0) 8 satırlı durum ve T uyarma tablosunu oluşturup 011 → 100 geçişini doğrulayınız.',
      },
      steps: [
        {
          en: 'Step 1 — Inspect Row 011 → 100: All three bits toggle (A_2: 0→1, A_1: 1→0, A_0: 1→0), so T_A2 = 1, T_A1 = 1, T_A0 = 1.',
          tr: 'Adım 1 — 011 → 100 Satırını İncele: Üç bitin tamamı değişir (0→1, 1→0, 1→0), yani (T_A2, T_A1, T_A0) = (1, 1, 1).',
        },
        {
          en: 'Step 2 — Check Equations at 011 (A_2=0, A_1=1, A_0=1): T_A0 = 1; T_A1 = A_0 = 1; T_A2 = A_1·A_0 = 1·1 = 1. All three match!',
          tr: 'Adım 2 — Denklemlerle Doğrula (011): T_A0 = 1; T_A1 = A_0 = 1; T_A2 = 1·1 = 1. Birebir örtüşür!',
        },
      ],
      table: {
        caption: {
          en: '3-Bit Synchronous Binary Counter State & T-Excitation Table (Lecture 11)',
          tr: '3-Bit Senkron İkili Sayıcı Durum ve T-Uyarma Tablosu',
        },
        headers: ['Present (A_2 A_1 A_0)', 'Next (A_2+ A_1+ A_0+)', 'T_A2', 'T_A1', 'T_A0'],
        rows: [
          ['0 0 0', '0 0 1', '0', '0', '1'],
          ['0 0 1', '0 1 0', '0', '1', '1'],
          ['0 1 0', '0 1 1', '0', '0', '1'],
          ['0 1 1', '1 0 0', '1', '1', '1'],
          ['1 0 0', '1 0 1', '0', '0', '1'],
          ['1 0 1', '1 1 0', '0', '1', '1'],
          ['1 1 0', '1 1 1', '0', '0', '1'],
          ['1 1 1', '0 0 0', '1', '1', '1'],
        ],
      },
      finalAnswer: {
        en: 'T_A0 = 1,  T_A1 = A_0,  T_A2 = A_1·A_0 (requires only a single 2-input AND gate for 3 bits!).',
        tr: 'T_A0 = 1,  T_A1 = A_0,  T_A2 = A_1·A_0 (3 bit için yalnızca tek bir 2-girişli AND kapısı yeterlidir!).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'For a 4-bit counter, the MSB toggle input is T_A3 = A_2·A_1·A_0 (the AND of ALL lower bits, NOT just A_2!).',
          tr: '4-bitlik bir sayıcıda en sol bitin T girişi yalnızca bir önceki bit değil, tüm alt bitlerin çarpımıdır: T_A3 = A_2·A_1·A_0!',
        },
        {
          en: 'In synchronous counters, NEVER connect Q_0 as the Clock input of flip-flop 1—all flip-flops must receive the SAME master Clock edge, and Q_0 feeds T_A1 (or Count Enable)!',
          tr: 'Senkron sayıcıda Q_0 çıkışını asla sonraki flip-flop\'un Clock pinine bağlamayın (o asenkron ripple sayıcıdır); tüm flip-floplar ortak Clock alır, Q_0 yalnızca T/JK veri girişine gider!',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 13 — State Reduction, Assignment, Sequence Detectors & Self-Correction
  // =========================================================================
  'w13-c1': {
    cardId: 'w13-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.7 · Week 12/13 (PDF p. 317)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.7 · Hafta 12/13 (PDF s. 317)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (State Reduction & Equivalence Conditions)',
      },
      body: {
        en: 'Two sequential circuits with different numbers of internal states can exhibit the exact same external input–output sequence behavior. State Reduction eliminates redundant states from a completely specified state table to shrink combinational logic complexity and potentially save flip-flops (whenever reducing M crosses a power-of-2 boundary 2^k). Formally, Mano\'s State Equivalence Theorem states: "Two states are equivalent if, for each member of the set of inputs, they give exactly the same output and send the circuit either to the same state or to an equivalent state." When two states are equivalent, one is removed and all occurrences of it in Next State columns are replaced by the surviving state.',
        tr: 'Farklı sayıda iç duruma sahip iki ardışıl devre, dışarıdan bakıldığında birebir aynı giriş-çıkış davranışını üretebilir. Durum İndirgeme (State Reduction), gereksiz (eşdeğer) durumları durum tablosundan temizleyerek kapı maliyetini ve mümkünse flip-flop sayısını azaltır. Mano\'nun resmi Durum Eşdeğerliği Koşulu şöyledir: "İki durum, tüm olası giriş kombinasyonları için birebir aynı çıkışı üretiyor ve devreyi ya aynı sonraki duruma ya da birbirine eşdeğer sonraki durumlara gönderiyorsa bu iki durum eşdeğerdir." Eşdeğer durumlardan biri silinir ve tablodaki tüm referansları kalan durumla değiştirilir.',
      },
      formalEquation: 'p ≡ q  ⇔  ∀x: Output(p, x) = Output(q, x)  AND  NextState(p, x) ≡ NextState(q, x)',
    },
    procedure: {
      heading: {
        en: 'Iterative Row-Inspection State Reduction Algorithm',
        tr: 'Adım Adım Durum İndirgeme (State Reduction) Yöntemi',
      },
      steps: [
        {
          en: '1. Scan for Identical Rows: Find two present states whose Next State AND Output entries match identically across every input column (x=0, x=1, …).',
          tr: '1. Özdeş Satırları Tara: Tüm giriş değerleri için hem Sonraki Durum hem de Çıkış sütunları birebir aynı olan iki mevcut durum bul.',
        },
        {
          en: '2. Remove One & Substitute Globally: Delete the second equivalent state\'s row and replace every appearance of its symbol in the Next State columns with the retained state symbol.',
          tr: '2. Birini Sil ve Yerine Koy: İkinci durumun satırını sil ve tablonun Sonraki Durum sütunlarında geçen her adını kalan durumun adıyla değiştir.',
        },
        {
          en: '3. Repeat Until No New Pairs Match: Because replacing symbols can make two previously different rows identical, re-scan the updated table repeatedly until no further rows match.',
          tr: '3. Sabit Noktaya Kadar Tekrarla: Sembol değişiminden sonra daha önce farklı görünen iki satır artık özdeş hale gelebilir; hiçbir yeni eşleşme kalmayana dek 1–2. adımları tekrarla.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked State Reduction Example: 7 States → 5 States (Mano Table 5.6–5.8)',
        tr: 'Adım Adım Çözümlü Örnek: 7 Durumdan 5 Duruma İndirgeme (Mano Tablo 5.6–5.8)',
      },
      problem: {
        en: 'Reduce the 7-state table (a..g) given in Mano Table 5.6: a→(a,b | 0,0); b→(c,d | 0,0); c→(a,d | 0,0); d→(e,f | 0,1); e→(a,f | 0,1); f→(g,f | 0,1); g→(a,f | 0,1).',
        tr: 'Mano Tablo 5.6\'daki 7 durumlu (a..g) tabloyu durum indirgeme algoritmasıyla en az duruma indirgeyiniz.',
      },
      steps: [
        {
          en: 'Pass 1 — Compare Rows e and g: Both go to (a, f) and produce outputs (0, 1) for (x=0, x=1). Thus g ≡ e! Remove row g and replace every "g" in Next State columns with "e" (row f changes from (g, f) to (e, f)).',
          tr: '1. Tur — e ve g Satırları: İkisi de (a, f) durumlarına gider ve (0, 1) çıkışı verir → g ≡ e! g satırı silinir, tablodaki g yerine e yazılır (böylece f satırı (e, f) olur).',
        },
        {
          en: 'Pass 2 — Re-scan Updated Table: Now row f has Next States (e, f) and outputs (0, 1), which matches row d (e, f | 0, 1) identically! Thus f ≡ d! Remove row f and replace every "f" with "d".',
          tr: '2. Tur — Güncel Tabloyu Tara: f satırı artık (e, f | 0, 1) olduğu için d satırı (e, f | 0, 1) ile birebir aynıdır → f ≡ d! f satırı silinir, f yerine d yazılır.',
        },
        {
          en: 'Pass 3 — Final Check: Remaining 5 rows are a→(a,b|0,0), b→(c,d|0,0), c→(a,d|0,0), d→(e,d|0,1), e→(a,d|0,1). No two rows share identical Next States & Outputs (e.g., b and c differ in x=0: c vs a). Reduction complete!',
          tr: '3. Tur — Son Kontrol: Kalan 5 satırda (a, b, c, d, e) özdeş satır çifti kalmadığı için indirgeme tamamlanır.',
        },
      ],
      table: {
        caption: {
          en: 'Original vs. Final Reduced State Table (Mano Table 5.6 → Table 5.8)',
          tr: 'Başlangıç ve İndirgenmiş Durum Tablosu (7 → 5 Durum)',
        },
        headers: ['State', 'Original Next (x=0, x=1)', 'Reduced Next (x=0, x=1)', 'Outputs (x=0, x=1)'],
        rows: [
          ['a', 'a, b', 'a, b', '0, 0'],
          ['b', 'c, d', 'c, d', '0, 0'],
          ['c', 'a, d', 'a, d', '0, 0'],
          ['d', 'e, f', 'e, d', '0, 1'],
          ['e', 'a, f', 'a, d', '0, 1'],
          ['f (→ d)', 'g, f', '— (merged into d)', '0, 1'],
          ['g (→ e)', 'a, f', '— (merged into e)', '0, 1'],
        ],
      },
      finalAnswer: {
        en: 'Reduced from 7 states {a..g} down to 5 states {a, b, c, d, e} without altering external I/O behavior.',
        tr: '7 durum {a..g}, dış giriş-çıkış davranışı hiç değişmeden 5 duruma {a, b, c, d, e} indirgendi.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'NEVER merge states whose OUTPUTS differ—even if their next states look identical! Equivalence requires BOTH equal outputs AND identical/equivalent next states for every input.',
          tr: 'Sonraki durumları aynı görünse bile ÇIKIŞLARI farklı olan iki durumu asla eşdeğer saymayın! Hem çıkışlar hem sonraki durumlar aynı/eşdeğer olmalıdır.',
        },
        {
          en: 'Always perform a second (and third) pass after deleting a state—secondary equivalences like f ≡ d above only become visible after substituting g → e!',
          tr: 'Bir durumu sildikten sonra tabloyu mutlaka tekrar tarayın; f ≡ d gibi ikincil eşdeğerlikler ancak g → e yerine konulduktan sonra görünür olur.',
        },
      ],
    },
  },

  'w13-c2': {
    cardId: 'w13-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.7–5.8 · Week 13 (PDF p. 320–321)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.7–5.8 · Hafta 13 (PDF s. 320–321)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Binary State Assignment & Unused States)',
      },
      body: {
        en: 'To build a sequential machine in hardware, symbolic states (a, b, c, …) must be assigned distinct m-bit binary codes (State Assignment), where 2^m ≥ number of states M. Different assignments (binary sequential, Gray code, or one-hot encoding) yield identical I/O behavior yet can dramatically change the gate count of the combinational next-state logic. When M < 2^m, the remaining (2^m − M) binary combinations are unused states: treating them as don\'t-cares (X) minimizes gates, but risks a lock-out hazard if electrical noise ever pushes the flip-flops into an unused state that loops among invalid states.',
        tr: 'Sembolik durumların (a, b, c, …) gerçek flip-floplarda saklanabilmesi için 2^m ≥ M koşulunu sağlayan m-bitlik ikili kodlar atanmalıdır (State Assignment). İkili ardışık, Gray veya one-hot kodlama seçimleri dış davranışı değiştirmese de birleşik devre kapı maliyetini doğrudan etkiler. M < 2^m olduğunda artan (2^m − M) kod kullanılmayan durumlardır (unused states): K-Map\'te X (don\'t-care) alınmaları devreyi küçültür, ancak gürültüyle bu kodlardan birine düşüldüğünde geçerli döngüye dönememe riski (Lock-out) doğar.',
      },
      formalEquation: 'Unused Codes = 2^m − M   |   Self-Correcting: Every unused code eventually transitions into a valid state',
    },
    procedure: {
      heading: {
        en: 'State Assignment Options & Lock-Out Verification Steps',
        tr: 'Adım Adım Durum Kodlama ve Lock-Out Kontrol Yöntemi',
      },
      steps: [
        {
          en: '1. Select State Assignment Scheme: Binary (000, 001, 010…), Gray (00, 01, 11, 10—minimizes switching), or One-Hot (m = M flip-flops, one bit = 1 per state—simple next-state logic).',
          tr: '1. Kodlama Stratejisi Seç: İkili (000, 001…), Gray (00, 01, 11, 10—tek bit değişimli) veya One-Hot (M durum için M flip-flop) ataması yap.',
        },
        {
          en: '2. Synthesize with Unused Codes as X: Minimize K-maps for D, JK, or T inputs using the unused rows as don\'t-cares.',
          tr: '2. Kullanılmayan Kodları X Alarak Sentezle: FF giriş denklemlerini çıkarırken boş kodları K-Map\'te X olarak değerlendir.',
        },
        {
          en: '3. Perform Mandatory Self-Correction Check: Plug every unused binary code back into your final minimized equations to compute Next State. If any unused state maps to itself or another unused loop, re-assign its Next State explicitly to 000 (initial state)!',
          tr: '3. Zorunlu Kilitlenme (Lock-Out) Testi Yap: Kullanılmayan her ikili kodu bulduğun nihai denklemlerde yerine koy ve sonraki durumunu hesapla! Eğer bir boş kod geçerli döngüye dönemeyip kısır döngüye giriyorsa o satırı X bırakmak yerine açıkça 000\'a yönlendir.',
        },
      ],
      table: {
        caption: {
          en: 'Comparison of Three Binary State Assignments for 5 States (Mano Table 5.9)',
          tr: '5 Durum İçin Üç Farklı Durum Kodlama Seçeneği (Mano Tablo 5.9)',
        },
        headers: ['State', 'Assignment 1 (Binary)', 'Assignment 2 (Gray)', 'Assignment 3 (One-Hot)'],
        rows: [
          ['a', '000', '000', '00001'],
          ['b', '001', '001', '00010'],
          ['c', '010', '011', '00100'],
          ['d', '011', '010', '01000'],
          ['e', '100', '110', '10000'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Lock-Out Analysis: Mod-3 Counter (00 → 01 → 10 → 00)',
        tr: 'Adım Adım Çözümlü Örnek: Mod-3 Sayıcıda Self-Correcting Doğrulaması',
      },
      problem: {
        en: 'A Mod-3 JK counter cycles 00 → 01 → 10 → 00 with state 11 treated as don\'t-care (X), yielding J_A = B, K_A = 1, J_B = A\', K_B = 1. Determine where the circuit goes if power-up noise puts it into unused state 11.',
        tr: '00 → 01 → 10 → 00 sayan Mod-3 JK sayıcıda 11 durumu X alınarak J_A = B, K_A = 1, J_B = A\', K_B = 1 bulunmuştur. Devre yanlışlıkla 11 durumundan başlarsa sonraki durumu hesaplayıp Self-Correcting olup olmadığını belirleyiniz.',
      },
      steps: [
        {
          en: 'Step 1 — Evaluate JK Inputs at Present State AB = 11 (A = 1, B = 1): J_A = B = 1, K_A = 1; J_B = A\' = 0, K_B = 1.',
          tr: 'Adım 1 — AB = 11 İçin JK Girişlerini Hesapla: J_A = B = 1, K_A = 1; J_B = A\' = 0, K_B = 1.',
        },
        {
          en: 'Step 2 — Apply Characteristic Equations (or JK Modes): For A (J=1, K=1 → Toggle): A+ = 1\' = 0. For B (J=0, K=1 → Reset): B+ = 0. Thus Next State = 00!',
          tr: 'Adım 2 — Sonraki Durumu Bul: A (J=1, K=1 → Tersle): A+ = 0; B (J=0, K=1 → Reset): B+ = 0. Sonraki durum = 00!',
        },
      ],
      finalAnswer: {
        en: 'Unused state 11 transitions directly to 00 on the very first clock pulse—NO lock-out occurs (Self-Correcting!).',
        tr: 'Kullanılmayan 11 durumu ilk saat darbesinde otomatik olarak 00\'a döner—kilitlenme yoktur (Self-Correcting!).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'One-Hot encoding uses M flip-flops instead of ⌈log_2 M⌉—more flip-flops, but often much simpler next-state decoding in FPGAs.',
          tr: 'One-Hot kodlama ⌈log_2 M⌉ yerine M adet flip-flop kullanır; flip-flop sayısı artar ama FPGA\'lerde birleşik lojik kapılarını aşırı sadeleştirir.',
        },
        {
          en: 'Never assume treating unused states as X automatically gives a self-correcting circuit—you MUST test the minimized equations on every unused state!',
          tr: 'Kullanılmayan durumları X almanın devreyi otomatik olarak self-correcting yapacağını sanmayın; denklemleri bulduktan sonra mutlaka boş kodları yerine koyup test edin.',
        },
      ],
    },
  },

  'w13-c3': {
    cardId: 'w13-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Week 13 Sequence Detectors',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Hafta 13 Dizi Algılayıcılar',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Overlapping vs. Non-Overlapping Sequence Detectors)',
      },
      body: {
        en: 'A Sequence Detector monitors a serial 1-bit input stream x and asserts output z = 1 whenever a target bit pattern (such as "101" or "1101") arrives. When a mismatch occurs—or right after a pattern is detected—the next state is chosen by the Longest Valid Suffix-Prefix Rule: retain the longest suffix of the received stream that is still a valid prefix of the target pattern. In an Overlapping detector, trailing bits of a completed match may begin the next match (e.g., "10101" matches "101" twice); in a Non-Overlapping detector, every completed match forces a full reset back to S_0.',
        tr: 'Dizi Algılayıcı (Sequence Detector), seri bir x bit akışında aranan örüntü (ör. "101" veya "1101") tamamlandığında z = 1 çıkışı veren sonlu durum makinesidir. Hatalı bir bit geldiğinde veya dizi tamamlandığında hangi duruma dönüleceği En Uzun Geçerli Sonek–Önek (Suffix–Prefix) Kuralıyla bulunur: o ana kadar alınan dizinin sonundan itibaren aranan örüntünün başlangıcıyla (prefix) örtüşen en uzun parça hangi duruma karşılık geliyorsa o duruma geçilir. Örtüşmeli (Overlapping) tasarımda son bit(ler) yeni dizinin başı olarak korunurken, Örtüşmesiz (Non-Overlapping) tasarımda eşleşme sonrası tamamen S_0\'a dönülür.',
      },
      formalEquation: 'Mealy Pattern Length k → k states (S_0..S_(k−1))   |   Moore Pattern Length k → k + 1 states (S_0..S_k)',
    },
    procedure: {
      heading: {
        en: 'Deriving Sequence Detector State Diagrams Without Guesswork',
        tr: 'Adım Adım Hatasız Dizi Algılayıcı Durum Diyagramı Kurma',
      },
      steps: [
        {
          en: '1. List Prefix States: For target "101", Mealy uses 3 states: S_0 ("none matched"), S_1 ("1" matched), S_2 ("10" matched). (Moore adds S_3 "101 matched / z=1").',
          tr: '1. Önek Durumlarını Tanımla: "101" için Mealy\'de 3 durum yeterlidir: S_0 (boş), S_1 ("1"), S_2 ("10"). (Moore için S_3 "101 / z=1" eklenir).',
        },
        {
          en: '2. Trace Forward Matches: S_0 —(1/0)→ S_1 —(0/0)→ S_2 —(1/1)→ (depends on overlap!).',
          tr: '2. Doğru İlerleme Yolunu Çiz: S_0 —(1/0)→ S_1 —(0/0)→ S_2 ve S_2\'de x=1 geldiğinde z=1 üretilir.',
        },
        {
          en: '3. Apply Suffix-Prefix Rule on Mismatches & Match Completion: At S_1 ("1") + x=1 → stream ends in "11", longest prefix of "101" is "1" → self-loop to S_1! At S_2 ("10") + x=0 → ends in "100", no prefix matches → S_0. At S_2 ("10") + x=1 (match!): Overlapping checks suffix of "101" → "1" matches S_1 (S_2 —(1/1)→ S_1); Non-Overlapping resets to S_0 (S_2 —(1/1)→ S_0).',
          tr: '3. Hata ve Tamamlama Dönüşlerini Sonek–Önek Kuralıyla Belirle: S_1\'de x=1 gelirse "11" olur, en uzun önek "1" olduğundan S_1\'e döner! S_2\'de x=0 gelirse "100" → önek yok → S_0. S_2\'de x=1 ile "101" tamamlanınca: Overlapping son "1"\'i koruyup S_1\'e gider; Non-Overlapping S_0\'a sıfırlar.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Stream Trace: Overlapping vs. Non-Overlapping "101" (Mealy)',
        tr: 'Adım Adım Çözümlü Örnek: x = 10101 Akışında "101" Mealy İzleme',
      },
      problem: {
        en: 'Trace present states and output z for input stream x = 1, 0, 1, 0, 1 starting from S_0 on both (a) Overlapping and (b) Non-Overlapping "101" Mealy detectors.',
        tr: 'S_0\'dan başlayan (a) Örtüşmeli (Overlapping) ve (b) Örtüşmesiz (Non-Overlapping) "101" Mealy algılayıcıları için x = 1, 0, 1, 0, 1 giriş akışının durum ve çıkış z dizisini bulunuz.',
      },
      steps: [
        {
          en: 'Overlapping Trace (S_2 —(1/1)→ S_1): S_0 +1→ S_1 (z=0); S_1 +0→ S_2 (z=0); S_2 +1→ S_1 (z=1, Match #1!); S_1 +0→ S_2 (z=0); S_2 +1→ S_1 (z=1, Match #2!).',
          tr: 'Örtüşmeli İzleme (S_2 —(1/1)→ S_1): S_0 +1→ S_1(0); S_1 +0→ S_2(0); S_2 +1→ S_1(1, 1. Yakalama!); S_1 +0→ S_2(0); S_2 +1→ S_1(1, 2. Yakalama!).',
        },
        {
          en: 'Non-Overlapping Trace (S_2 —(1/1)→ S_0): S_0 +1→ S_1 (z=0); S_1 +0→ S_2 (z=0); S_2 +1→ S_0 (z=1, Match #1!); S_0 +0→ S_0 (z=0); S_0 +1→ S_1 (z=0).',
          tr: 'Örtüşmesiz İzleme (S_2 —(1/1)→ S_0): S_0 +1→ S_1(0); S_1 +0→ S_2(0); S_2 +1→ S_0(1, 1. Yakalama!); S_0 +0→ S_0(0); S_0 +1→ S_1(0).',
        },
      ],
      finalAnswer: {
        en: 'Overlapping z = 0, 0, 1, 0, 1 (2 detections)   |   Non-Overlapping z = 0, 0, 1, 0, 0 (1 detection).',
        tr: 'Örtüşmeli çıkış z = 0, 0, 1, 0, 1 (2 kez algıladı)   |   Örtüşmesiz çıkış z = 0, 0, 1, 0, 0 (1 kez algıladı).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do not automatically send mismatches back to S_0! On "1101" detector at S_3 ("110"), if x=0 arrives ("1100") it goes to S_0, whereas at S_2 ("11") if x=1 arrives ("111") it MUST stay in S_2 ("11")—not drop to S_1 or S_0!',
          tr: 'Yanlış bit geldiğinde her zaman S_0\'a dönmeyin! Örneğin "1101" algılayıcısında S_2 ("11") durumundayken x=1 gelirse ("111") son iki bit hala "11" olduğu için S_2\'de kalınır!',
        },
        {
          en: 'Check whether the problem asks for Mealy (3 states for "101", output on edge) or Moore (4 states for "101", output inside state S_3).',
          tr: 'Sorunun Mealy mi (3 durum) yoksa Moore mu (4 durum) istediğini en başta netleştirin.',
        },
      ],
    },
  },

  'w13-c4': {
    cardId: 'w13-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Week 13 Comparative Synthesis',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.8 · Hafta 13 Karşılaştırmalı Sentez',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Comparative Synthesis: D vs. JK vs. T Flip-Flops)',
      },
      body: {
        en: 'The same state transition table can be synthesized using D, JK, or T flip-flops, yielding identical timing behavior with noticeably different combinational gate counts. D flip-flops require no excitation table (D = Q(t+1)) but provide zero don\'t-cares (X) from transitions, often resulting in larger K-map groups. T flip-flops excel when state transitions toggle regularly (binary up/down counters). JK flip-flops inject don\'t-care (X) entries into 50% of every transition column, typically delivering the smallest external gate network for non-binary sequences such as 2-bit Gray code or Mod-N counters.',
        tr: 'Aynı durum geçiş tablosu D, JK veya T flip-floplarla sentezlendiğinde çalışma davranışı aynı kalır ancak gereken dış mantık kapısı sayısı önemli ölçüde değişir. D flip-flop\'ta uyarma sütunu doğrudan Q(t+1)\'dir ama geçişlerden hiç X (don\'t-care) gelmez. T flip-flop düzenli terslemeli ikili sayıcılarda en sade yapıyı sunar. JK flip-flop ise her geçişin yarısında X ürettiği için Gray kodu sayıcı veya özel Mod-N sayıcılar gibi dizilerde genellikle en az ek kapılı (hatta bazen sıfır kapılı!) çözümü sağlar.',
      },
      formalEquation: '2-Bit Gray Counter (00→01→11→10→00) with JK:  J_A = B,  K_A = B\',  J_B = A\',  K_B = A  (0 external gates!)',
    },
    procedure: {
      heading: {
        en: 'Choosing the Optimal Flip-Flop & Minimizing Gate Cost',
        tr: 'Adım Adım En Uygun Flip-Flop Seçimi ve Sentez Kıyaslaması',
      },
      steps: [
        {
          en: '1. Build Next-State Table: Write Present State (A, B) and required Next State (A+, B+).',
          tr: '1. Durum Geçiş Tablosunu Yaz: Şimdiki durum (A, B) ve hedeflenen sonraki durumu (A+, B+) listele.',
        },
        {
          en: '2. Populate D, T, or JK Columns: Copy A+, B+ for D; compute A⊕A+, B⊕B+ for T; apply (0X, 1X, X1, X0) for JK.',
          tr: '2. D, T veya JK Sütunlarını Doldur: D için A+, B+; T için A⊕A+, B⊕B+; JK için (0X, 1X, X1, X0) kurallarını yaz.',
        },
        {
          en: '3. Solve K-Maps & Compare Gate Count: Remember JK flip-flops already expose both Q and Q\' outputs on chip, so terms like B\' or A\' cost ZERO extra inverters!',
          tr: '3. K-Map Çöz ve Maliyeti Kıyasla: Her flip-flop üzerinde hem Q hem Q\' çıkışı zaten hazır bulunduğu için J_A = B veya K_A = B\' bağlantıları hiçbir harici kapı veya inverter gerektirmez!',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Synthesis Comparison: 2-Bit Gray Code Counter (00 → 01 → 11 → 10 → 00)',
        tr: 'Adım Adım Çözümlü Örnek: 2-Bit Gray Code Sayıcının D, T ve JK ile Sentezi',
      },
      problem: {
        en: 'Synthesize a 2-bit Gray Code counter (00 → 01 → 11 → 10 → 00) using (a) D flip-flops, (b) T flip-flops, and (c) JK flip-flops, and compare external gates required.',
        tr: '00 → 01 → 11 → 10 → 00 sırasıyla sayan 2-bit Gray Code sayıcıyı (a) D, (b) T ve (c) JK flip-floplarla sentezleyip gereken ek kapı sayılarını karşılaştırınız.',
      },
      steps: [
        {
          en: 'Part (a) D Flip-Flops: From the state table, A+ = 1 at 01 and 11 ⇒ D_A = B (0 gates!) and B+ = 1 at 00 and 01 ⇒ D_B = A\' (0 gates!). Both D and JK need 0 external gates for a 2-bit Gray counter!',
          tr: 'Kısım (a) D Flip-Flop: A+ sütunu (01 ve 11 satırlarında 1) ⇒ D_A = B; B+ sütunu (00 ve 01 satırlarında 1) ⇒ D_B = A\'.',
        },
        {
          en: 'Part (b) T Flip-Flops: T_A = A ⊕ A+ = 1 at {01, 10} ⇒ T_A = A ⊕ B (1 XOR gate!). T_B = B ⊕ B+ = 1 at {00, 11} ⇒ T_B = (A ⊕ B)\' (1 XNOR gate!). Total = 2 gates.',
          tr: 'Kısım (b) T Flip-Flop: T_A = A ⊕ B (01 ve 10\'da değişir), T_B = (A ⊕ B)\' (00 ve 11\'de değişir) → 2 kapı gerektirir!',
        },
        {
          en: 'Part (c) JK Flip-Flops: J_A = [0, 1, X, X] → B; K_A = [X, X, 0, 1] → B\'; J_B = [1, X, X, 0] → A\'; K_B = [X, 0, 1, X] → A. Requires 0 external gates and allows independent J/K control!',
          tr: 'Kısım (c) JK Flip-Flop: K-Map\'lerden J_A = B, K_A = B\', J_B = A\', K_B = A çıkar; Q ve Q\' doğrudan çapraz bağlanarak SIFIR ek kapıyla çalışır!',
        },
      ],
      table: {
        caption: {
          en: '2-Bit Gray Code Counter Excitation Table (D vs. T vs. JK)',
          tr: '2-Bit Gray Code Sayıcı İçin D, T ve JK Uyarım Tablosu',
        },
        headers: ['Present (A B)', 'Next (A+ B+)', 'D_A, D_B', 'T_A, T_B', 'J_A K_A, J_B K_B'],
        rows: [
          ['0 0', '0 1', '0, 1', '0, 1', '0 X, 1 X'],
          ['0 1', '1 1', '1, 1', '1, 0', '1 X, X 0'],
          ['1 1', '1 0', '1, 0', '0, 1', 'X 0, X 1'],
          ['1 0', '0 0', '0, 0', '1, 0', 'X 1, 0 X'],
        ],
      },
      finalAnswer: {
        en: 'For 2-bit Gray counter: JK (0 external gates) and D (0 external gates) beat T (2 XOR/XNOR gates); for binary counters, T beats D!',
        tr: '2-bit Gray sayıcıda JK ve D sıfır kapıyla T\'den (2 kapı) üstündür; standart ikili sayıcılarda ise T en ekonomik çözümdür!',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do NOT assume T flip-flops are always simplest—as shown above, T flip-flops need 2 XOR/XNOR gates for a Gray counter whereas JK needs 0!',
          tr: 'T flip-flop\'un her zaman en az kapılı çözümü vereceğini sanmayın—yukarıdaki Gray sayıcıda T 2 kapı isterken JK 0 kapı ister.',
        },
        {
          en: 'Remember that flip-flops provide Q\' natively, so connecting Q\' directly to another gate or J/K pin does NOT count as an extra NOT gate.',
          tr: 'Flip-flop kılıfı üzerinde Q\' çıkışı zaten hazır bulunduğu için Q\' kullanmak ekstra NOT kapısı maliyeti oluşturmaz.',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 14 — Registers, Shift Registers & Counters (Mano Ch. 6.1 - 6.5)
  // =========================================================================
  'w14-c1': {
    cardId: 'w14-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 6.1–6.2 · Week 14 (PDF p. 343–354)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 6.1–6.2 · Hafta 14 (PDF s. 343–354)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Registers, Shift Registers & Universal Shift Register)',
      },
      body: {
        en: 'A Register is a group of n flip-flops sharing a common clock to store n bits of binary data. To prevent clock skew and timing glitches, parallel-load registers NEVER gate the clock with a Load control signal; instead, each D input is fed by a 2-to-1 MUX (Load=0 holds Q, Load=1 loads external input I_i). A Shift Register cascades flip-flops from Q to D so each clock edge shifts bits one position (SISO, SIPO, PISO, PIPO). The 4-Bit Universal Shift Register (Mano Fig. 6.7) places a 4-to-1 MUX before each D flip-flop under mode inputs (S_1, S_0) to support Hold (00), Shift Right (01), Shift Left (10), and Parallel Load (11).',
        tr: 'Yazmaç (Register), ortak bir saat sinyalini paylaşarak n-bitlik veri saklayan n adet flip-flop grubudur. Paralel yüklemeli yazmaçlarda saat kayması (clock skew) ve sahte darbe riskini önlemek için Load sinyali asla saat hattına kapıyla bağlanmaz (Clock Gating yapılmaz); bunun yerine her D girişinin önüne 2×1 MUX konur (Load=0 iken kendi Q çıkışı geri beslenir, Load=1 iken dış veri yüklenir). Kaydırmalı yazmaçlarda (Shift Register) çıkışlar birbirinin girişine bağlanır (SISO, SIPO, PISO, PIPO). 4-Bit Evrensel Kaydırmalı Yazmaç (Universal Shift Register, Mano Şekil 6.7) ise her aşamada 4×1 MUX ve (S_1, S_0) kontrolüyle Tutma (00), Sağa Kaydırma (01), Sola Kaydırma (10) ve Paralel Yükleme (11) modlarını tek devrede birleştirir.',
      },
      formalEquation: 'S_1 S_0: 00 = Hold (Q_i)  |  01 = Shift Right (MSB←SI)  |  10 = Shift Left (LSB←SI)  |  11 = Parallel Load (I_i)',
    },
    procedure: {
      heading: {
        en: 'Universal Shift Register Control & Mode Rules',
        tr: 'Adım Adım Universal Shift Register Kontrol Kuralları',
      },
      steps: [
        {
          en: '1. Preserve Clean Clock Tree: Connect all flip-flop CLK inputs directly to the master clock; put mode selection purely on the 4-to-1 MUXes driving D inputs.',
          tr: '1. Temiz Saat Ağacı: Tüm flip-flopların CLK girişini doğrudan ana saate bağla; mod seçimini yalnızca D girişlerindeki 4×1 MUX\'lar üzerinden yap.',
        },
        {
          en: '2. Wire MUX Inputs per Stage i (A_3 MSB to A_0 LSB): Input 0 = A_i (Hold); Input 1 = A_(i+1) or Right-Shift Serial Input (Shift Right); Input 2 = A_(i−1) or Left-Shift Serial Input (Shift Left); Input 3 = Parallel Data I_i.',
          tr: '2. Her Aşama i İçin MUX Uçlarını Bağla: 0 ucu = A_i (Tut), 1 ucu = sol komşu A_(i+1) veya sağa kaydırma seri girişi, 2 ucu = sağ komşu A_(i−1) veya sola kaydırma seri girişi, 3 ucu = paralel veri I_i.',
        },
        {
          en: '3. Check Asynchronous Clear: Use active-low Clear\' to reset A_3 A_2 A_1 A_0 = 0000 independently of clock.',
          tr: '3. Asenkron Sıfırlama: Başlangıçta yazmacı 0000 yapmak için saatten bağımsız Clear\' pinini kullan.',
        },
      ],
      table: {
        caption: {
          en: '4-Bit Universal Shift Register Function Table (Mano Table 6.3)',
          tr: '4-Bit Evrensel Kaydırmalı Yazmaç Fonksiyon Tablosu (Mano Tablo 6.3)',
        },
        headers: ['S_1', 'S_0', 'Register Operation', 'D_i MUX Source'],
        rows: [
          ['0', '0', 'No change (Hold)', 'A_i (present output)'],
          ['0', '1', 'Shift right (÷ 2)', 'A_(i+1) / Serial_R into A_3'],
          ['1', '0', 'Shift left (× 2)', 'A_(i−1) / Serial_L into A_0'],
          ['1', '1', 'Parallel load', 'External input I_i'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Shift-Register Sequence Trace (Load → Shift Right → Hold → Shift Left)',
        tr: 'Adım Adım Çözümlü Örnek: 4-Bit Universal Shift Register İzleme',
      },
      problem: {
        en: 'A 4-bit Universal Shift Register (A_3 A_2 A_1 A_0) receives parallel input I = 1010, Serial_R = 1, and Serial_L = 0. Trace A across 4 clock pulses with (S_1, S_0) = (1,1), (0,1), (0,0), and (1,0).',
        tr: '4-bit Universal Shift Register (A_3 A_2 A_1 A_0) için paralel giriş I = 1010, sağa kaydırma seri girişi Serial_R = 1, sola kaydırma seri girişi Serial_L = 0 veriliyor. Sırasıyla (S_1, S_0) = (1,1), (0,1), (0,0) ve (1,0) kontrol sinyalleriyle 4 saat darbesi sonrası yazmaç içeriğini bulunuz.',
      },
      steps: [
        {
          en: 'Clock 1 (S_1 S_0 = 11 — Parallel Load): MUX selects I → A = 1010.',
          tr: '1. Saat (11 — Paralel Yükle): MUX I girişini seçer → A = 1010.',
        },
        {
          en: 'Clock 2 (S_1 S_0 = 01 — Shift Right): Bits shift right toward A_0 (dropping 0), and Serial_R = 1 enters MSB A_3 → A = 1101.',
          tr: '2. Saat (01 — Sağa Kaydır): Bitler sağa kayar (en sağdaki 0 düşer), en sol A_3\'e Serial_R = 1 girer → A = 1101.',
        },
        {
          en: 'Clock 3 (S_1 S_0 = 00 — Hold): MUX feeds A_i back to D_i → A stays 1101.',
          tr: '3. Saat (00 — Tut): Her bit kendi çıkışını geri yükler → A = 1101 kalır.',
        },
        {
          en: 'Clock 4 (S_1 S_0 = 10 — Shift Left): Bits shift left toward A_3 (dropping leftmost 1), and Serial_L = 0 enters LSB A_0 → A = 1010.',
          tr: '4. Saat (10 — Sola Kaydır): Bitler sola kayar (en soldaki 1 düşer), en sağ A_0\'a Serial_L = 0 girer → A = 1010.',
        },
      ],
      finalAnswer: {
        en: 'Register sequence: 1010 → 1101 → 1101 → 1010.',
        tr: 'Yazmaç durumu sırasıyla: 1010 → 1101 → 1101 → 1010.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Know the SIPO vs. PISO timing difference: SIPO takes N clock edges to shift in N bits and reads all N bits in parallel immediately; PISO loads all N bits in 1 clock edge and takes N−1 (or N) shift edges to stream them out serially.',
          tr: 'SIPO N saatte seri yükleyip paralel okur; PISO ise 1 saatte paralel yükleyip N saatte seri olarak dışarı aktarır.',
        },
        {
          en: 'Never gate the clock pin with Load (CLK · Load) in synchronous systems—it introduces clock skew and glitches whenever Load changes while CLK = 1.',
          tr: 'Senkron tasarımda saat pinini Load ile AND\'lemeyin (clock gating yapmayın); saat kayması ve sahte kenar hatalarına yol açar.',
        },
      ],
    },
  },

  'w14-c2': {
    cardId: 'w14-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 6.3 · Week 14 (PDF p. 355–359)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 6.3 · Hafta 14 (PDF s. 355–359)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Asynchronous Ripple Counters & Propagation Delay)',
      },
      body: {
        en: 'In a Ripple (Asynchronous) Counter, flip-flops do NOT share a common clock: external clock pulses drive only the LSB flip-flop (A_0), while the output Q (or Q\') of each stage clocks the next higher-order stage. With T = 1 (or J = K = 1) tied permanently high, each stage divides the incoming frequency by 2—toggling on every 1 → 0 transition of the preceding stage (using negative-edge triggering on Q, or positive-edge triggering on Q\'). Although extremely simple in wiring, carry transitions ripple sequentially through all N flip-flops, causing cumulative propagation delay N·t_pd and transient decoding glitches.',
        tr: 'Asenkron Dalgalı Sayıcıda (Ripple Counter) flip-floplar ortak bir saat sinyali paylaşmaz: dış saat darbesi yalnızca en düşük basamağa (A_0) girer; her aşamanın çıkışı bir sonraki aşamanın saat (Clock) girişini sürer. T = 1 (veya J=K=1) tutulduğunda, önceki basamağın 1 → 0 düşen kenarlarında (Q çıkışı düşen kenar tetiklemeli FF\'ye, veya Q\' çıkışı yükselen kenar tetiklemeli FF\'ye bağlanarak) her kat frekansı ikiye böler. Donanımı çok basit olsa da değişimler dalga gibi yayıldığı için toplam gecikme N·t_pd olur ve ara geçişlerde geçici sahte durumlar (glitch) doğar.',
      },
      formalEquation: 'Ripple Up-Counter (Neg-Edge): CLK_0 = Count,  CLK_i = Q_(i−1)   |   Total Settling Delay = N · t_pd',
    },
    procedure: {
      heading: {
        en: 'Designing Up/Down Ripple Counters & Calculating Max Clock Frequency',
        tr: 'Adım Adım Ripple Yukarı/Aşağı Sayıcı ve Maksimum Frekans Hesabı',
      },
      steps: [
        {
          en: '1. Configure Up-Count Polarity: For negative-edge T/JK flip-flops (CLK triggered on 1→0), wire Q_i directly to CLK_(i+1) to count UP (since bit i+1 flips whenever bit i falls 1→0). For positive-edge flip-flops, wire Q_i\' to CLK_(i+1) instead.',
          tr: '1. Yukarı Sayma Bağlantısı: Düşen kenar tetiklemeli FF kullanılıyorsa Q_i doğrudan CLK_(i+1)\'e bağlanır (01→10 geçişinde Q_0 1→0 düştüğünde Q_1 terslenir). Yükselen kenarlı FF kullanılıyorsa Q_i\' bağlanır.',
        },
        {
          en: '2. Configure Down-Count Polarity: Invert the clock chain! On negative-edge flip-flops, connect Q_i\' to CLK_(i+1) so the next stage toggles whenever Q_i rises 0→1 (10→01).',
          tr: '2. Aşağı Sayma Bağlantısı: Saat bağlantısını tersine çevir; düşen kenarlı FF\'lerde Q_i\' ucunu CLK_(i+1)\'e bağlayarak Q_i 0→1 yükseldiğinde (Q_i\' 1→0 düştüğünde) sonraki basamağı tetikle.',
        },
        {
          en: '3. Compute Maximum Clock Frequency: Every ripple transition must finish before the next clock pulse arrives: T_clk(min) ≥ N · t_pd  ⇒  f_max = 1 / (N · t_pd).',
          tr: '3. Maksimum Saat Frekansı Hesabı: Bir sonraki saat darbesi gelmeden tüm N basamağın oturması gerekir: T_clk(min) ≥ N · t_pd  ⇒  f_max = 1 / (N · t_pd).',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Delay & Glitch Example: 4-Bit Ripple Counter (Mano Sec. 6.3)',
        tr: 'Adım Adım Çözümlü Örnek: 4-Bit Ripple Sayıcıda Gecikme ve 0111 → 1000 Geçişi',
      },
      problem: {
        en: 'A 4-bit binary ripple counter uses negative-edge JK flip-flops each with propagation delay t_pd = 15 ns. (a) Calculate the maximum reliable clock frequency f_max. (b) List the transient intermediate states occurring between 0111 and 1000.',
        tr: 'Her birinin yayılım gecikmesi t_pd = 15 ns olan düşen kenar JK flip-floplarla kurulmuş 4-bitlik bir ripple sayıcıda: (a) güvenilir maksimum saat frekansını (f_max) bulunuz, (b) 0111 → 1000 geçişi sırasında oluşan geçici ara durumları yazınız.',
      },
      steps: [
        {
          en: 'Part (a) Worst-Case Ripple Delay: On 0111 → 1000 (or 1111 → 0000), all 4 stages toggle sequentially. Total delay = 4 × 15 ns = 60 ns. Minimum clock period T_min = 60 ns → f_max = 1 / (60 × 10^−9 s) ≈ 16.67 MHz.',
          tr: 'Kısım (a) En Kötü Durum Gecikmesi: 0111 → 1000 geçişinde 4 katın tamamı sırayla tetiklenir. Toplam gecikme = 4 × 15 ns = 60 ns. f_max = 1 / 60 ns ≈ 16.67 MHz.',
        },
        {
          en: 'Part (b) Ripple Glitch Trace (A_3 A_2 A_1 A_0 starting at 0111):\n  • t = 15 ns: A_0 toggles 1→0 → briefly reads 0110!\n  • t = 30 ns: A_0 falling edge toggles A_1 (1→0) → briefly reads 0100!\n  • t = 45 ns: A_1 falling edge toggles A_2 (1→0) → briefly reads 0000!\n  • t = 60 ns: A_2 falling edge toggles A_3 (0→1) → finally settles at 1000.',
          tr: 'Kısım (b) Dalgalı Ara Durumlar (0111 başlangıcı):\n  • t = 15 ns: A_0 değişir → geçici 0110!\n  • t = 30 ns: A_1 değişir → geçici 0100!\n  • t = 45 ns: A_2 değişir → geçici 0000!\n  • t = 60 ns: A_3 değişir → nihai kararlı durum 1000.',
        },
      ],
      finalAnswer: {
        en: '(a) Max frequency f_max = 16.67 MHz (vs. 66.7 MHz for a 15 ns synchronous stage);   (b) Glitches through 0110 → 0100 → 0000 before settling at 1000.',
        tr: '(a) f_max = 16.67 MHz;   (b) 1000\'a oturmadan önce sırasıyla 0110 → 0100 → 0000 sahte durumlarından geçer.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Watch the clock edge polarity carefully! Wiring Q_i to a POSITIVE-edge CLK_(i+1) creates a DOWN counter (not an UP counter), because Q_i rises 0→1 when counting down (e.g., 10→01)!',
          tr: 'Saat tetikleme kenarına dikkat edin! Pozitif kenar tetiklemeli flip-floplarda Q_i\'yi doğrudan CLK_(i+1)\'e bağlarsanız sayıcı yukarı değil AŞAĞI sayar!',
        },
        {
          en: 'Never attach combinational decoders directly to a ripple counter without a strobe/enable delay—the brief 0110 / 0100 / 0000 glitches above will falsely trigger decoded outputs.',
          tr: 'Asenkron sayıcı çıkışlarına doğrudan decoder bağlandığında 0110/0100/0000 ara durumları kısa süreli yanlış çıkış darbeleri (glitch) üretir.',
        },
      ],
    },
  },

  'w14-c3': {
    cardId: 'w14-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 6.4 · Week 14 (PDF p. 360–365)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 6.4 · Hafta 14 (PDF s. 360–365)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Synchronous Binary & BCD Decade Counters)',
      },
      body: {
        en: 'A Synchronous Counter feeds the exact same master clock pulse simultaneously to the CLK pin of every flip-flop, eliminating ripple delay and transition glitches so all bits change in parallel. In a synchronous binary counter with Count Enable (E), stage i toggles if and only if Count Enable is active AND all lower-significance stages are 1: T_0 = E, T_1 = E·Q_0, T_2 = E·Q_0·Q_1, …, T_i = E·Q_0···Q_(i−1). A Synchronous BCD Decade Counter modifies the 4-bit binary cycle (0000–1001) so that upon reaching 1001 (9), the next clock edge wraps directly to 0000 and asserts Output Carry y = Q_8·Q_1 (allowing multi-digit cascading).',
        tr: 'Senkron Sayıcıda (Synchronous Counter) ana saat darbesi tüm flip-flopların CLK pinlerine aynı anda bağlanır; böylece dalga gecikmesi (N·t_pd) ve ara durum hataları ortadan kalkar. Sayma İzni (Count Enable - E) uçlu senkron ikili sayıcıda i. basamağın terslenme koşulu T_i = E · Q_0 · Q_1 · … · Q_(i−1) biçimindeki seri veya paralel AND zinciriyle sağlanır. Senkron BCD Onluk Sayıcı (BCD Decade Counter) ise 0000–1001 (0–9) arasında sayar, 1001\'den sonra bir sonraki saatte 0000\'a döner ve üst basamağı sürmek üzere Elde Çıkışı y = Q_8 · Q_1 üretir.',
      },
      formalEquation: 'Sync Enable Chain: T_i = E · Q_0·Q_1···Q_(i−1)   |   BCD Decade (Q_8 Q_4 Q_2 Q_1): y = Q_8 · Q_1',
    },
    procedure: {
      heading: {
        en: 'Deriving Synchronous BCD Decade Counter T Equations (Mano Table 6.5)',
        tr: 'Adım Adım Senkron BCD Sayıcı T-Flip-Flop Denklemleri Çıkarma',
      },
      steps: [
        {
          en: '1. Write States 0000 (0) to 1001 (9): Notice states 1010–1111 are unused (next state 0000 from 1001).',
          tr: '1. 0000–1001 Geçişlerini Yaz: 0\'dan 8\'e normal ikili artış; 1001 (9) → 0000 (0) dönüşü gerçekleşir.',
        },
        {
          en: '2. Inspect Toggle Conditions for Each Bit (Q_8 Q_4 Q_2 Q_1): Q_1 toggles every step (T_Q1 = 1); Q_2 toggles when Q_1 = 1 EXCEPT at 1001 (where Q_8 = 1) → T_Q2 = Q_8\'·Q_1!',
          tr: '2. Her Bit İçin Terslenme Koşulu: Q_1 her adımda değişir (T_Q1 = 1). Q_2 ise Q_1 = 1 iken değişir ANCAK 1001 (Q_8 = 1) durumunda 0\'da kalır → T_Q2 = Q_8\'·Q_1!',
        },
        {
          en: '3. Derive Q_4, Q_8, and Carry y: Q_4 flips only at 0011 and 0111 → T_Q4 = Q_2·Q_1; Q_8 flips from 0→1 at 0111 (Q_4·Q_2·Q_1) and from 1→0 at 1001 (Q_8·Q_1) → T_Q8 = Q_4·Q_2·Q_1 + Q_8·Q_1; Carry y = Q_8·Q_1.',
          tr: '3. Q_4, Q_8 ve Elde y: T_Q4 = Q_2·Q_1; Q_8 0111\'de 0→1 ve 1001\'de 1→0 olduğu için T_Q8 = Q_4·Q_2·Q_1 + Q_8·Q_1; Elde çıkışı y = Q_8·Q_1.',
        },
      ],
      table: {
        caption: {
          en: 'Synchronous BCD Counter State & T-Excitation Table (Mano Table 6.5)',
          tr: 'Senkron BCD Sayıcı Durum ve T-Uyarma Tablosu (Mano Tablo 6.5)',
        },
        headers: ['Present (Q_8 Q_4 Q_2 Q_1)', 'Next State', 'T_Q8 T_Q4 T_Q2 T_Q1', 'Carry y'],
        rows: [
          ['0 0 0 0 (0)', '0 0 0 1', '0 0 0 1', '0'],
          ['0 0 1 1 (3)', '0 1 0 0', '0 1 1 1', '0'],
          ['0 1 1 1 (7)', '1 0 0 0', '1 1 1 1', '0'],
          ['1 0 0 0 (8)', '1 0 0 1', '0 0 0 1', '0'],
          ['1 0 0 1 (9)', '0 0 0 0', '1 0 0 1', '1'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Transition Verification: BCD Counter 9 → 0 (1001 → 0000)',
        tr: 'Adım Adım Çözümlü Örnek: BCD Sayıcıda 1001 → 0000 Dönüşü ve Elde',
      },
      problem: {
        en: 'Using the synchronous BCD equations (T_Q1=1, T_Q2=Q_8\'·Q_1, T_Q4=Q_2·Q_1, T_Q8=Q_4·Q_2·Q_1 + Q_8·Q_1, y=Q_8·Q_1), evaluate all T inputs and y at state 1001 (decimal 9), then verify the next state.',
        tr: 'Senkron BCD denklemlerini kullanarak 1001 (9) durumunda tüm T girişlerini ve elde y çıkışını hesaplayıp bir sonraki saat darbesindeki durumu doğrulayınız.',
      },
      steps: [
        {
          en: 'Step 1 — Evaluate at Q_8=1, Q_4=0, Q_2=0, Q_1=1: T_Q1 = 1; T_Q2 = (1\')·1 = 0; T_Q4 = 0·1 = 0; T_Q8 = (0·0·1) + (1·1) = 1.',
          tr: 'Adım 1 — 1001 İçin T Değerleri: T_Q1 = 1; T_Q2 = 0·1 = 0; T_Q4 = 0·1 = 0; T_Q8 = 0 + 1·1 = 1.',
        },
        {
          en: 'Step 2 — Evaluate Output Carry y: y = Q_8·Q_1 = 1·1 = 1 (signals the tens-digit BCD stage to increment on this exact clock edge!).',
          tr: 'Adım 2 — Elde Çıkışı y: y = Q_8·Q_1 = 1·1 = 1 (onlar basamağındaki bir sonraki BCD sayıcının Count Enable girişini tetikler!).',
        },
        {
          en: 'Step 3 — Next State on Clock ↑: Q_8 flips 1→0 (T_Q8=1), Q_4 stays 0, Q_2 stays 0, Q_1 flips 1→0 (T_Q1=1) → Next state = 0000!',
          tr: 'Adım 3 — Saat Kenarında Sonraki Durum: Q_8 (1→0) ve Q_1 (1→0) terslenir, Q_4 ve Q_2 sabit kalır → Sonraki durum = 0000!',
        },
      ],
      finalAnswer: {
        en: 'At 1001: (T_Q8, T_Q4, T_Q2, T_Q1) = (1, 0, 0, 1) and y = 1 → cleanly rolls over to 0000 with zero 1010 glitch.',
        tr: '1001 anında (T_Q8, T_Q4, T_Q2, T_Q1) = (1, 0, 0, 1) ve y = 1 olur → geçersiz 1010 durumuna uğramadan doğrudan 0000\'a döner.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'For a synchronous BCD counter, do NOT trigger an asynchronous Clear\' when the count hits 1010—that produces a spike on Q_2/Q_8 and is strictly discouraged in Mano Sec. 6.4! Use synchronous T_Q8/T_Q2 gating from 1001.',
          tr: 'Senkron BCD sayıcıda 1010 durumunu yakalayıp asenkron Clear\' ile sıfırlama yapmayın (kısa süreli spike/glitch üretir); Mano Bölüm 6.4\'teki senkron T_Q8 ve T_Q2 denklemlerini kullanın.',
        },
        {
          en: 'In an Enable-chained binary counter, remember serial AND-gating (T_i = T_(i−1)·Q_(i−1)) saves fan-in but adds (N−2) AND delays, whereas parallel gating computes all T_i in 1 AND delay.',
          tr: 'Seri AND zinciri kapı giriş sayısını azaltır ama N−2 kapı gecikmesi ekler; paralel AND yapısı ise tüm T girişlerini tek kapı gecikmesinde hazırlar.',
        },
      ],
    },
  },

  'w14-c4': {
    cardId: 'w14-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 6.5 · Week 14 (PDF p. 368–372)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 6.5 · Hafta 14 (PDF s. 368–372)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Ring Counter vs. Johnson Switch-Tail Counter)',
      },
      body: {
        en: 'Timing signals in digital processors can be generated directly by circular shift-register counters without binary decoders. A k-bit Ring Counter circulates a single logic-1 around k flip-flops (Q_last feeds D_first), producing exactly k distinguishable one-hot timing states (e.g., 1000 → 0100 → 0010 → 0001). By instead feeding the COMPLEMENTED output Q_last\' back to D_first, a k-bit Johnson Counter (Switch-Tail Ring Counter) doubles capacity to 2k distinguishable states—starting from 0000, filling with 1s, then refilling with 0s—which are decoded cleanly using simple 2-input AND gates.',
        tr: 'Sayısal işlemcilerde zamanlama ve kontrol darbeleri ikili sayıcı + decoder yerine dairesel kaydırmalı yazmaç sayıcılarla doğrudan üretilebilir. k-bitlik Halka Sayıcı (Ring Counter), son çıkış Q_last\'ı doğrudan ilk girişe bağlayarak tek bir 1 bitini döndürür ve tam olarak k adet one-hot zamanlama durumu (1000 → 0100 → 0010 → 0001) üretir. Son çıkışın TÜMLEYENİ Q_last\' ilk girişe bağlandığında ise k-bitlik Johnson (Switch-Tail) Sayıcı elde edilir: 0000\'dan başlayarak sırayla 1 doldurup sonra 0 doldurur, böylece aynı k flip-flopla tam 2k adet durum (her biri tek 2-girişli AND kapısıyla çözülebilen) üretir.',
      },
      formalEquation: 'k-bit Ring Counter: D_0 = Q_(k−1)  →  k states   |   k-bit Johnson Counter: D_0 = Q_(k−1)\'  →  2k states',
    },
    procedure: {
      heading: {
        en: 'Comparing State Cycles, Initialization & Decoding Rules',
        tr: 'Adım Adım Ring ve Johnson Sayıcı Tasarım ve Kod Çözme Kuralları',
      },
      steps: [
        {
          en: '1. Initialize Ring Counter Properly: Preset MSB to 1 and Clear all other bits (1000) before clocking; if all flip-flops start at 0000, a plain Ring Counter remains stuck at 0000 forever!',
          tr: '1. Ring Sayıcıyı Başlatma: Saat başlamadan önce mutlaka 1000 (tek 1) yüklenmelidir; 0000 ile başlarsa sonsuza dek 0000\'da kalır!',
        },
        {
          en: '2. Trace k-bit Johnson Counter from 0000: Feed MSB\'s complement E\' (or Q_last\') into LSB/MSB shift input; 0000 shifts in 1s (1000, 1100, 1110, 1111) then 0s (0111, 0011, 0001, 0000) → 2k = 8 glitch-free states!',
          tr: '2. k-Bit Johnson Sayıcıyı 0000\'dan İzle: 4 flip-flop için 0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001 → 0000 sırasıyla 2k = 8 durum üretilir!',
        },
        {
          en: '3. Decode Johnson States with 2-Input AND Gates: Because consecutive states differ by 1 bit and only two boundaries mark each state, every Johnson state is decoded by a single 2-input AND gate (e.g., S_0 = A\'·E\', S_1 = A·B\', …)!',
          tr: '3. 2-Girişli AND Kapılarıyla Kod Çözme: Her Johnson durumu yalnızca sınır bitlerine bakan tek bir 2-girişli AND kapısıyla (ör. S_0 = A\'·E\', S_1 = A·B\', …) sıfır glitch ile çözülür!',
        },
      ],
      table: {
        caption: {
          en: '4-Bit Johnson (Switch-Tail) Counter Sequence & 2-Input Decoding (Mano Fig. 6.18)',
          tr: '4-Bit Johnson Sayıcı Durum Döngüsü ve 2-Girişli AND Kod Çözücüsü (Mano Şekil 6.18)',
        },
        headers: ['Sequence #', 'State (A B C E)', '2-Input AND Decoder'],
        rows: [
          ['1', '0 0 0 0', "S_0 = A'·E'"],
          ['2', '1 0 0 0', "S_1 = A·B'"],
          ['3', '1 1 0 0', "S_2 = B·C'"],
          ['4', '1 1 1 0', "S_3 = C·E'"],
          ['5', '1 1 1 1', 'S_4 = A·E'],
          ['6', '0 1 1 1', "S_5 = A'·B"],
          ['7', '0 0 1 1', "S_6 = B'·C"],
          ['8', '0 0 0 1', "S_7 = C'·E"],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Comparison: Generating 8 Timing Signals (Ring vs. Johnson vs. Binary)',
        tr: 'Adım Adım Çözümlü Örnek: 8 Zamanlama Sinyali İçin Donanım Kıyaslaması',
      },
      problem: {
        en: 'A control unit requires 8 sequential non-overlapping timing signals T_0..T_7. Compare the flip-flop count and decoder hardware needed using (a) a Ring Counter, (b) a Johnson Counter, and (c) a Binary Counter + Decoder.',
        tr: 'Bir denetim birimi art arda gelen 8 ayrı zamanlama sinyali (T_0..T_7) gerektirmektedir. Bu işlevi (a) Ring Sayıcı, (b) Johnson Sayıcı ve (c) İkili Sayıcı + Decoder ile kurmanın donanım maliyetlerini karşılaştırınız.',
      },
      steps: [
        {
          en: 'Option (a) Ring Counter: Needs k = 8 flip-flops (one per state), 0 decoder gates (each Q_i IS already T_i!), and requires presetting 10000000.',
          tr: 'Seçenek (a) Ring Sayıcı: k = 8 flip-flop gerekir, harici decoder kapısı = 0 (her Q_i doğrudan T_i\'dir), başlangıçta 10000000 yüklenmesi gerekir.',
        },
        {
          en: 'Option (b) Johnson Counter: Needs only k = 8 / 2 = 4 flip-flops, initialized simply by clearing to 0000, plus eight 2-input AND gates (16 gate inputs total) with zero glitch!',
          tr: 'Seçenek (b) Johnson Sayıcı: Yalnızca k = 8 / 2 = 4 flip-flop gerekir, başlangıç için 0000\'a sıfırlamak yeterlidir ve her biri 2 girişli 8 adet AND kapısıyla temiz çözülür!',
        },
        {
          en: 'Option (c) Binary Counter + 3-to-8 Decoder: Needs 3 flip-flops, 1 AND gate (for T_2), and eight 3-input AND gates (24 gate inputs) in the 3×8 decoder.',
          tr: 'Seçenek (c) İkili Sayıcı + 3×8 Decoder: 3 flip-flop ve sekiz adet 3-girişli AND kapısı (toplam 24 kapı girişi) gerektirir.',
        },
      ],
      finalAnswer: {
        en: '4-bit Johnson gives 8 timing phases with half the flip-flops of a Ring counter (4 vs 8) and simpler 2-input decoding than Binary+Decoder.',
        tr: '4-bit Johnson Sayıcı, Ring sayıcının yarı flip-flop sayısıyla (4 vs 8) ve basit 2-girişli AND kapılarıyla 8 fazı hatasız üretir.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Watch out for UNUSED states in Johnson counters! A 4-bit Johnson counter uses 8 of 16 states; the remaining 8 states form a SEPARATE illegal loop (0101 → 0010 → 1001 → 0100 → 1010 → 1101 → 0110 → 1011 → 0101)—making it NOT self-correcting without adding feedback correction (D_B = (A + C)·B or presetting 0000)!',
          tr: 'Johnson sayıcılardaki kullanılmayan durumlara dikkat! 4-bitlik sistemdeki 16 durumun sadece 8\'i ana döngüdedir; geri kalan 8 durum kendi arasında ayrı bir kısır döngü oluşturduğundan güç açılışında mutlaka 0000\'a sıfırlanmalı veya kendi kendini düzelten (self-correcting) geri besleme eklenmelidir!',
        },
        {
          en: 'Remember the exact state counts: k flip-flops → Ring Counter = k states, Johnson Counter = 2k states, Binary Counter = 2^k states.',
          tr: 'k flip-flop için durum sayılarını karıştırmayın: Ring = k durum, Johnson = 2k durum, İkili = 2^k durum.',
        },
      ],
    },
  },
};
