import type { WeekModule } from '../../types/curriculum';

export const week6: WeekModule = {
  id: 6,
  weekNumber: 6,
  englishTitle: {
    tr: 'NAND/NOR & XOR Implementations',
    en: 'NAND/NOR & XOR Implementations',
  },
  turkishSubtitle: {
    tr: "Don't-Care (X) Koşulları, Evrensel NAND/NOR Dönüşümleri ve XOR Eşlik Devreleri",
    en: "Don't-Care Conditions (X), Universal NAND/NOR Implementations & XOR Parity Circuits",
  },
  summary: {
    tr: "K-Map'te farksız (Don't-Care) koşullardan yararlanarak maliyet düşürmeyi, SOP/POS devrelerini iki seviyeli ve çok seviyeli yalnızca NAND / yalnızca NOR kapılarına dönüştürmeyi (Bubble Pushing) ve XOR tabanlı Parity devrelerini öğrenin.",
    en: "Learn to reduce hardware cost using Don't-Care (X) conditions in K-Maps, convert two-level and multi-level circuits into NAND-only or NOR-only implementations via Bubble Pushing, and design XOR-based Parity generators and checkers.",
  },
  learningObjectives: [
    {
      tr: "Don't-Care (X) koşullarını K-Map'te yalnızca grupları büyütmek için akıllıca kullanmak",
      en: "Use Don't-Care (X) conditions strategically in K-Maps solely to enlarge valid groups",
    },
    {
      tr: 'Standard SOP ifadeyi 2-seviyeli NAND-NAND ve Standard POS ifadeyi 2-seviyeli NOR-NOR devresine çevirmek',
      en: 'Convert Standard SOP expressions to 2-level NAND-NAND and Standard POS to 2-level NOR-NOR circuits',
    },
    {
      tr: 'Çok seviyeli devrelerde Bubble Pushing yöntemiyle tek girişli Inverter gereksinimini belirlemek',
      en: 'Determine single-input Inverter requirements in multi-level circuits via Bubble Pushing',
    },
    {
      tr: 'XOR / XNOR kapılarıyla Odd & Even Parity Generator ve Checker devrelerini tasarlamak',
      en: 'Design Odd & Even Parity Generator and Checker circuits using XOR / XNOR gates',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'KMapStudio',
  recommendedWidgetConfig: {
    variables: 4,
    initialMinterms: [1, 3, 7, 11, 15],
  },
  visualSections: [
    {
      id: 'w6-s1',
      title: {
        tr: "1. Farksız Durumlar (Don't-Care Conditions - X)",
        en: "1. Don't-Care Conditions (X)",
      },
      explanation: {
        tr: 'Bazı dijital sistemlerde giriş kombinasyonlarının bir kısmı fiziksel olarak asla gerçekleşmez (örneğin 4-bit BCD kodunda 1010–1111 arası 10–15 değerleri geçersizdir). Çıkışının 0 veya 1 olmasının önemsiz olduğu bu durumlara Don\'t-Care (X) denir.\n\n💡 Altın Kural: K-Map üzerindeki X hücrelerini grupları büyütmek (ör. 2\'liden 4\'lüye veya 4\'lüden 8\'liye çıkarmak) için "1" gibi kullanabilirsiniz; fakat X\'leri tek başına kapsamak için ASLA ekstra grup kurmayın! Kullanılmayan X\'ler otomatik olarak "0" kabul edilir.',
        en: 'In many digital systems, certain input combinations never occur physically (e.g., codes 1010–1111 in 4-bit BCD). Conditions whose output value does not matter are called Don\'t-Care conditions (X).\n\n💡 Golden Rule: You may treat X cells as "1" ONLY when doing so enlarges a group containing at least one required 1-cell (e.g., expanding 2 → 4 or 4 → 8). NEVER form a group consisting solely of X cells; unused Xs are simply treated as "0".',
      },
      widget: 'KMapStudio',
      widgetConfig: {
        variables: 4,
        initialMinterms: [1, 3, 7, 11, 15],
      },
      examTip: {
        tr: 'KMapStudio\'da hücrelere iki kez tıklayarak "X" (Don\'t-Care) değerini verebilir ve grupların nasıl büyüyüp sadeleştiğini anlık olarak test edebilirsiniz!',
        en: 'Tap a cell twice in KMapStudio to set it to "X" (Don\'t-Care) and observe live how groups expand to minimize literals!',
      },
    },
    {
      id: 'w6-s2',
      title: {
        tr: '2. İki Seviyeli (Two-Level) Yalnızca NAND ve Yalnızca NOR Devreleri',
        en: '2. Two-Level NAND-Only and NOR-Only Implementations',
      },
      explanation: {
        tr: 'Gerçek entegre devrelerde (IC) CMOS teknolojisi NAND ve NOR kapılarını AND/OR kapılarından daha hızlı ve daha az transistörle üretir. Bu nedenle standart iki seviyeli devreler doğrudan NAND veya NOR eşdeğerlerine dönüştürülür:\n• SOP → NAND-NAND: AND-OR devresinde 1. katman AND çıkışlarına birer baloncuk (NAND), 2. katman OR girişlerine birer baloncuk (Bubbled-OR ≡ NAND) yerleştirin. Çift baloncuk birbirini götürür!\n• POS → NOR-NOR: OR-AND devresinde 1. katman OR çıkışlarına (NOR) ve 2. katman AND girişlerine (Bubbled-AND ≡ NOR) baloncuk koyun.\n\nÖzel Durum: Eğer SOP içinde tek bir literal (ör. F = A + BC) varsa, o literal 2. seviye NAND kapısına girmeden önce mutlaka terslenerek (A\') verilmelidir!',
        en: 'In physical CMOS ICs, NAND and NOR gates are faster and require fewer transistors than AND/OR gates, so two-level circuits are routinely converted into universal gates:\n• SOP → NAND-NAND: Place inversion bubbles on Level-1 AND outputs (NAND) and Level-2 OR inputs (Bubbled-OR ≡ NAND); double bubbles cancel!\n• POS → NOR-NOR: Place bubbles on Level-1 OR outputs (NOR) and Level-2 AND inputs (Bubbled-AND ≡ NOR).\n\nSpecial Case: If an SOP contains a single-literal term (e.g., F = A + BC), that literal must be inverted (A\') before entering the Level-2 NAND gate!',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'Two-Level Evrensel Kapı Dönüşüm Kuralları',
            en: 'Two-Level Universal Gate Conversion Rules',
          },
          steps: [
            {
              label: 'SOP (AND-OR) → NAND-NAND',
              badge: 'F = AB + CD',
              detail: {
                tr: "1. Seviye: NAND(A,B) = (AB)'\nNAND(C,D) = (CD)'\n2. Seviye: NAND((AB)', (CD)')\n= AB + CD",
                en: "Level 1: NAND(A,B) = (AB)'\nNAND(C,D) = (CD)'\nLevel 2: NAND((AB)', (CD)')\n= AB + CD",
              },
            },
            {
              label: 'POS (OR-AND) → NOR-NOR',
              badge: 'F = (A+B)(C+D)',
              detail: {
                tr: "1. Seviye: NOR(A,B) = (A+B)'\nNOR(C,D) = (C+D)'\n2. Seviye: NOR((A+B)', (C+D)')\n= (A+B)(C+D)",
                en: "Level 1: NOR(A,B) = (A+B)'\nNOR(C,D) = (C+D)'\nLevel 2: NOR((A+B)', (C+D)')\n= (A+B)(C+D)",
              },
            },
            {
              label: {
                tr: 'Tek Literal Kuralı',
                en: 'Single-Literal Rule',
              },
              badge: 'F = A + BC',
              detail: {
                tr: "A terimi 1. seviye NAND'dan geçmediği için 2. seviye NAND girişine A' (Inverter ile) olarak girer!",
                en: "Because literal A bypasses Level-1 NAND, it must enter the Level-2 NAND gate inverted as A' (via an Inverter)!",
              },
            },
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'and-or-to-nand-nand',
          caption: {
            tr: 'Vektörel Devre Şeması: SOP → NAND-NAND ve POS → NOR-NOR Çift Baloncuk Dönüşümü',
            en: 'Vector Circuit Schematic: SOP → NAND-NAND & POS → NOR-NOR Double-Bubble Conversion',
          },
          equation: "F = A'B + AC ≡ [(A'B)' · (AC)']'   |   F = (A+B)(C+D) ≡ [(A+B)' + (C+D)']'",
          summary: {
            tr: 'İki seviyeli AND-OR devresindeki iç hatlara eklenen çift baloncuklar birbirini iptal ederek doğrudan 2-seviyeli NAND-NAND yapısını verir; OR-AND ise NOR-NOR olur.',
            en: 'Adding canceling double bubbles between levels transforms two-level AND-OR directly into NAND-NAND, and OR-AND into NOR-NOR.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      summaryRule: {
        tr: 'NAND ve NOR evrensel kapılardır: İki seviyeli bir SOP devresi doğrudan NAND-NAND (AND-OR + çift baloncuk) yapısına, iki seviyeli bir POS devresi ise doğrudan NOR-NOR (OR-AND + çift baloncuk) yapısına dönüşür.',
        en: 'NAND and NOR are universal gates: any two-level SOP circuit converts directly to NAND-NAND (via double-bubble cancellation), while any two-level POS circuit converts directly to NOR-NOR.',
      },
      examTip: {
        tr: 'NAND-NAND dönüşümünün daima SOP\'tan, NOR-NOR dönüşümünün ise daima POS\'tan başladığını aklınızda tutun. K-Map\'ten SOP bulduysanız NAND\'a, POS bulduysanız NOR\'a geçmek en kısa yoldur.',
        en: 'Remember that NAND-NAND conversion always starts from SOP, whereas NOR-NOR conversion always starts from POS. Group 1s for NAND, or group 0s for NOR!',
      },
    },
    {
      id: 'w6-s3',
      title: {
        tr: '3. Çok Seviyeli Devrelerde "Bubble Pushing" Yöntemi',
        en: '3. Multi-Level Circuits & the "Bubble Pushing" Method',
      },
      explanation: {
        tr: 'Parantezli çok seviyeli bir ifadeyi (ör. F = A(CD + B) + BC\') tamamen NAND veya tamamen NOR kapılarına çevirmek için 4 adımlı sistematik yöntem uygulanır:\n1. Tüm AND kapılarını çıkışında baloncuk olan NAND sembolüne çevir; ardından karşısındaki hat üzerine dengeleyici bir baloncuk (Inverter) koy veya bir sonraki OR kapısını girişleri baloncuklu OR (≡ NAND) haline getir.\n2. OR kapılarını girişleri baloncuklu OR (≡ NAND) sembolüne dönüştür.\n3. Bir kablo üzerinde eşleşmeyen tekil baloncuk kalırsa oraya 1-girişli NAND (Inverter) ekle.\n4. Tekil literal doğrudan bir Bubbled-OR girişine bağlanıyorsa tersini al.',
        en: 'To convert a factored multi-level Boolean expression (e.g., F = A(CD + B) + BC\') entirely into NAND (or NOR) gates, follow this systematic 4-step Bubble Pushing procedure:\n1. Convert every AND gate to a NAND symbol (output bubble) and every OR gate to a Bubbled-OR symbol (input bubbles, which is also logically a NAND gate).\n2. Track bubbles along every internal wire: two facing bubbles on a wire cancel out cleanly.\n3. Whenever a wire has an unmatched single bubble, insert a 1-input NAND (Inverter).\n4. Complement any primary literal that directly feeds a Bubbled-OR input.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: "Örnek: F = A(CD + B) + BC' İfadesinin NAND Dönüşümü",
            en: "Example: Converting F = A(CD + B) + BC' to NAND-Only",
          },
          steps: [
            {
              label: {
                tr: 'Katman 1: CD ve (CD + B)',
                en: 'Layer 1: CD and (CD + B)',
              },
              badge: "B' Inverter",
              detail: {
                tr: "CD → NAND(C, D) = (CD)' (baloncuk var).\n+ B işlemi Bubbled-OR (NAND) olacağı için B girişi B' (1 Inverter) olarak girer!",
                en: "CD → NAND(C, D) = (CD)' (has output bubble).\nBecause + B becomes a Bubbled-OR (NAND), input B must enter inverted as B' (1 Inverter)!",
              },
            },
            {
              label: {
                tr: "Katman 2: A · (CD + B) ve BC'",
                en: "Layer 2: A · (CD + B) and BC'",
              },
              badge: "C' Inverter",
              detail: {
                tr: "NAND(A, CD+B) = [A(CD+B)]'.\nC' girişi düz C'den geliyorsa 1 Inverter ile C' üretilir; NAND(B, C') = (BC')'.",
                en: "NAND(A, CD+B) = [A(CD+B)]'.\nAssuming unprimed inputs only, C requires 1 Inverter to produce C', feeding NAND(B, C') = (BC')'.",
              },
            },
            {
              label: {
                tr: 'Katman 3: Çıkış Toplamı',
                en: 'Layer 3: Output Sum',
              },
              badge: { tr: 'Çıkış NAND', en: 'Output NAND' },
              detail: {
                tr: 'İki terim de çıkışında baloncuklu olarak son Bubbled-OR (NAND) kapısına girer ve F elde edilir.',
                en: 'Both branches carry output bubbles directly into the final Bubbled-OR (NAND) gate, producing F.',
              },
            },
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'multilevel-bubble-pushing',
          caption: {
            tr: "Vektörel Devre Şeması: F = A(CD + B) + BC' Çok Seviyeli NAND-Only Dönüşümü",
            en: "Vector Circuit Schematic: Multi-Level NAND-Only Conversion of F = A(CD + B) + BC'",
          },
          equation: "F = A(CD + B) + BC'   (2 Inverter: B' ve C')",
          summary: {
            tr: 'Her AND → NAND ve her OR → Bubbled-OR (NAND) çevrilirken eşleşmeyen tekil giriş hatlarına (B ve C) birer Inverter eklenir.',
            en: 'Converting AND → NAND and OR → Bubbled-OR (NAND) requires inverters only on unmatched primary inputs (B\' and C\').',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      examTip: {
        tr: 'İki kablo arasındaki tekil baloncuğu her zaman takip edin: Kablo üzerinde toplam ÇİFT sayıda baloncuk (0 veya 2) varsa mantık korunur; TEK sayıda baloncuk (1) varsa araya mutlaka bir Inverter (tek girişli NAND/NOR) eklenmelidir.',
        en: 'Count inversion bubbles along each wire: an EVEN number of bubbles (0 or 2) preserves logic; an ODD number (1) requires inserting an Inverter (1-input NAND/NOR)!',
      },
    },
    {
      id: 'w6-s4',
      title: {
        tr: '4. XOR / XNOR Cebiri ve Eşlik (Parity) Devreleri',
        en: '4. XOR / XNOR Algebra & Parity Circuits',
      },
      explanation: {
        tr: 'XOR (⊕) ve XNOR (⊙) kapıları hata tespitinde (Parity Generator / Checker) ve aritmetik toplayıcılarda temel rol oynar:\n• Tek Eşlik (Odd Function): P = x ⊕ y ⊕ z (Girişlerde tek sayıda 1 varsa P = 1).\n• Çift Eşlik Üreteci (Even Parity Generator): 3-bitlik mesaja eklenecek P biti, toplam 1 sayısını çift yapmalıdır; yani mesajda tek sayıda 1 varsa P = 1 olmalıdır (P = x ⊕ y ⊕ z).\n• Alıcıdaki Even Parity Checker: Mesaj + Parity bitinin tamamı XOR\'lanır: C = x ⊕ y ⊕ z ⊕ P. Hata yoksa toplam 1 sayısı çifttir ve C = 0 çıkar; tek bitlik hata oluşursa C = 1 (Hata!) üretilir.',
        en: 'XOR (⊕) and XNOR (⊙) gates play central roles in error detection (Parity Generators / Checkers) and binary adders:\n• Odd Function: P = x ⊕ y ⊕ z (outputs 1 when an odd number of inputs equal 1).\n• Even Parity Generator: The parity bit P appended to a 3-bit message must make the total number of 1s even, so P = 1 whenever the message has an odd number of 1s: P = x ⊕ y ⊕ z.\n• Even Parity Checker (Receiver): XOR all 4 received bits: C = x ⊕ y ⊕ z ⊕ P. Error-free transmission yields C = 0; any single-bit error triggers C = 1.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'XOR ve XNOR Temel Cebir Özdeşlikleri',
            en: 'Fundamental Algebraic Identities for XOR & XNOR',
          },
          headers: [
            { tr: 'Özdeşlik', en: 'Identity' },
            { tr: 'XOR Formülü', en: 'XOR Formula' },
            { tr: 'XNOR Formülü', en: 'XNOR Formula' },
          ],
          rows: [
            [{ tr: 'Sıfır ile İşlem', en: 'Operation with 0' }, 'x ⊕ 0 = x', "x ⊙ 0 = x'"],
            [{ tr: 'Bir ile İşlem', en: 'Operation with 1' }, "x ⊕ 1 = x'", 'x ⊙ 1 = x'],
            [{ tr: 'Kendisi ile İşlem', en: 'Self Operation' }, 'x ⊕ x = 0', 'x ⊙ x = 1'],
            [{ tr: 'Tümleyeni ile İşlem', en: 'Complement Operation' }, "x ⊕ x' = 1", "x ⊙ x' = 0"],
            [
              { tr: 'Değişme & Birleşme', en: 'Commutative & Associative' },
              '(x ⊕ y) ⊕ z = x ⊕ (y ⊕ z)',
              '(x ⊙ y) ⊙ z = x ⊙ (y ⊙ z)',
            ],
          ],
        },
        {
          kind: 'schematic',
          diagramId: 'parity-xor-circuits',
          caption: {
            tr: 'Vektörel Devre Şeması: 3-Bit Even Parity Generator (Verici) ve 4-Bit Checker (Alıcı)',
            en: 'Vector Circuit Schematic: 3-Bit Even Parity Generator & 4-Bit Parity Checker',
          },
          equation: 'P = x ⊕ y ⊕ z   |   C = x ⊕ y ⊕ z ⊕ P  (C = 1 ⇒ Hata)',
          summary: {
            tr: 'Verici 3 veri bitini XOR ağacıyla toplayıp eşlik biti P\'yi üretir; alıcı gelen 4 bitin tamamını XOR\'layarak tek bitlik hatada C = 1 bayrağını kaldırır.',
            en: 'The transmitter XORs 3 data bits to generate P; the receiver XORs all 4 received bits and raises error flag C = 1 on any single-bit flip.',
          },
          collapsible: true,
          defaultOpen: true,
        },
      ],
      examTip: {
        tr: '3-bitlik Even Parity Generator formülü P = x ⊕ y ⊕ z iken, Odd Parity Generator formülü bunun tümleyeni olan P_odd = (x ⊕ y ⊕ z)\' = x ⊕ y ⊙ z biçimindedir!',
        en: 'For a 3-bit message, the Even Parity Generator is P = x ⊕ y ⊕ z, whereas the Odd Parity Generator is its complement: P_odd = (x ⊕ y ⊕ z)\' = x ⊕ y ⊙ z!',
      },
    },
  ],
  questions: [
    {
      id: 'w6-q1',
      type: 'multiple-choice',
      title: {
        tr: "Soru 1 · Don't-Care Koşullarıyla K-Map Sadeleştirme (Mano 3.15)",
        en: "Question 1 · K-Map Simplification with Don't-Care Conditions (Mano 3.15)",
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(1, 3, 7, 11, 15) ve farksız durumları d(A, B, C, D) = Σ(0, 2, 5) olan fonksiyonun en sade SOP ifadelerinden biri aşağıdakilerden hangisidir?',
        en: "Given F(A, B, C, D) = Σ(1, 3, 7, 11, 15) with don't-care conditions d(A, B, C, D) = Σ(0, 2, 5), which of the following is a minimal SOP expression?",
      },
      options: [
        {
          tr: "F = A'B' + CD   (veya alternatif: F = A'D + CD)",
          en: "F = A'B' + CD   (or alternatively: F = A'D + CD)",
        },
        'F = AB + CD',
        "F = A'B' + C'D",
        "F = B'D + AC",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: "Adım 1: 1 ve X (Don't-Care) Hücrelerini Yerleştir",
            en: "Step 1: Plot 1-Cells and X (Don't-Care) Cells",
          },
          detail: {
            tr: '1 olanlar: {1, 3, 7, 11, 15}. X olanlar: {0, 2, 5}.',
            en: 'Minterms (1s): {1, 3, 7, 11, 15}. Don\'t-cares (Xs): {0, 2, 5}.',
          },
        },
        {
          title: {
            tr: 'Adım 2: Zorunlu CD Sütunu (3, 7, 11, 15)',
            en: 'Step 2: Mandatory CD Column {3, 7, 11, 15}',
          },
          detail: {
            tr: 'CD = 11 sütunundaki dört 1 hücresi {3, 7, 11, 15} birleşerek CD terimini oluşturur.',
            en: 'All four 1s in column CD = 11 {3, 7, 11, 15} combine into the essential term CD.',
          },
        },
        {
          title: {
            tr: "Adım 3: Kalan m₁ Hücresini X'lerle Büyüt",
            en: 'Step 3: Expand m₁ Using Don\'t-Care Cells',
          },
          detail: {
            tr: "• Seçenek 1: d(0, 2) hücrelerini 1 kabul edip {0, 1, 2, 3} = A'B' yapmak ⇒ F = A'B' + CD.\n• Seçenek 2: d(5) hücresini 1 kabul edip {1, 3, 5, 7} = A'D yapmak ⇒ F = A'D + CD.\n(İki çözüm de 2 terim ve 4 literalle en sadedir.)",
            en: "• Option 1: Treat d(0, 2) as 1 to form {0, 1, 2, 3} = A'B' ⇒ F = A'B' + CD.\n• Option 2: Treat d(5) as 1 to form {1, 3, 5, 7} = A'D ⇒ F = A'D + CD.\n(Both solutions are minimal with 2 terms and 4 literals.)",
          },
        },
      ],
    },
    {
      id: 'w6-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · İki Seviyeli NAND Devresi Kapı Sayısı (Mano 3.19)',
        en: 'Question 2 · Gate Count of Two-Level NAND Circuit (Mano 3.19)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(1, 2, 3, 4, 5, 7) fonksiyonunun en sade SOP formunu yalnızca 2 seviyeli NAND kapılarıyla (girişlerin tümleyenleri hazır verilmiş kabul edilerek) kurmak için toplam kaç adet NAND kapısı gerekir?',
        en: 'Assuming complemented inputs are already available, how many NAND gates in total are needed to implement the minimal SOP of F(A, B, C, D) = Σ(1, 2, 3, 4, 5, 7) as a two-level NAND circuit?',
      },
      options: [
        { tr: '4 adet NAND kapısı', en: '4 NAND gates' },
        { tr: '3 adet NAND kapısı', en: '3 NAND gates' },
        { tr: '5 adet NAND kapısı', en: '5 NAND gates' },
        { tr: '6 adet NAND kapısı', en: '6 NAND gates' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: K-Map İle Minimum SOP Formunu Bul',
            en: 'Step 1: Find Minimal SOP via K-Map',
          },
          detail: {
            tr: "Mintermler (A=0 yarısında): {1, 3, 5, 7} ⇒ A'D | {2, 3} ⇒ A'B'C | {4, 5} ⇒ A'BC'.\nMinimum SOP: F = A'D + A'B'C + A'BC'",
            en: "Minterms (all in A=0 half): {1, 3, 5, 7} ⇒ A'D | {2, 3} ⇒ A'B'C | {4, 5} ⇒ A'BC'.\nMinimal SOP: F = A'D + A'B'C + A'BC'",
          },
        },
        {
          title: {
            tr: 'Adım 2: Two-Level NAND-NAND Katmanlarını Say',
            en: 'Step 2: Count Two-Level NAND-NAND Gates',
          },
          detail: {
            tr: "1. Seviye: 3 çarpım teriminin her biri için 1'er NAND kapısı (3 kapı).\n2. Seviye: Bu 3 çıkışı toplayan 1 adet 3-girişli çıkış NAND kapısı (1 kapı).\nToplam: 3 + 1 = 4 adet NAND kapısı.",
            en: "Level 1: 1 NAND gate per product term (3 gates).\nLevel 2: 1 three-input output NAND gate combining all three (1 gate).\nTotal: 3 + 1 = 4 NAND gates.",
          },
        },
      ],
    },
    {
      id: 'w6-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · İki Seviyeli NOR-NOR Çıkış Kapısı İşlevi',
        en: 'Question 3 · Output Gate Function in Two-Level NOR-NOR',
      },
      difficulty: 'Temel',
      prompt: {
        tr: "F(A, B, C, D) = (A + B')(C + D) POS ifadesini yalnızca iki seviyeli NOR kapılarıyla kurduğumuzda, 2. seviyedeki çıkış NOR kapısı DeMorgan eşdeğerliği gereği hangi işlemi gerçekleştirir?",
        en: "When implementing F(A, B, C, D) = (A + B')(C + D) as a two-level NOR-NOR circuit, what DeMorgan equivalent operation does the Level-2 output NOR gate perform?",
      },
      options: [
        {
          tr: 'Invert-AND (Girişleri terslenmiş AND) işlevi görür ve F = (A + B\')(C + D) üretir.',
          en: 'Invert-AND (Bubbled-AND) operation, producing F = (A + B\')(C + D).',
        },
        { tr: 'Standart OR işlevi görür.', en: 'Standard OR operation.' },
        { tr: 'Invert-OR işlevi görür.', en: 'Invert-OR operation.' },
        { tr: 'Yalnızca XOR işlevi görür.', en: 'XOR operation only.' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Birinci ve İkinci Seviye Çıkışlarını Yaz',
            en: 'Step 1: Write Level-1 and Level-2 Outputs',
          },
          detail: {
            tr: "1. Seviye NOR çıkışları: X = (A + B')' ve Y = (C + D)'.\n2. Seviye NOR çıkışı: (X + Y)' = X' · Y' = (A + B')(C + D) [Invert-AND].",
            en: "Level-1 NOR outputs: X = (A + B')' and Y = (C + D)'.\nLevel-2 NOR output: (X + Y)' = X' · Y' = (A + B')(C + D) [Invert-AND].",
          },
        },
      ],
    },
    {
      id: 'w6-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · Çok Seviyeli Bubble Pushing ile Inverter Sayısı',
        en: 'Question 4 · Inverter Count via Multi-Level Bubble Pushing',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "Yalnızca düz girişler (A, B, C, D) mevcutken F = A(CD + B) + BC' çok seviyeli ifadesi tamamen NAND kapıları kullanılarak çizildiğinde, toplamda kaç adet Inverter (tek girişli NAND) kapısı gerekir?",
        en: "Assuming only unprimed inputs (A, B, C, D) are available, how many Inverters (1-input NAND gates) are required when F = A(CD + B) + BC' is implemented as a multi-level NAND-only circuit?",
      },
      options: [
        { tr: "2 adet (B' ve C' için)", en: "2 Inverters (for B' and C')" },
        { tr: '0 adet', en: '0 Inverters' },
        { tr: "1 adet (yalnızca C' için)", en: "1 Inverter (for C' only)" },
        { tr: '4 adet', en: '4 Inverters' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Parantez İçi Dönüşüm (CD + B)',
            en: 'Step 1: Inner Parenthesis Conversion (CD + B)',
          },
          detail: {
            tr: "NAND(C, D) çıkışında baloncuk üretir: (CD)'. Bu sinyali B ile OR yapmak için 2. katman Bubbled-OR (NAND) kullanılır; bu yüzden B girişi B' olarak terslenmelidir (1. Inverter).",
            en: "NAND(C, D) creates an output bubble: (CD)'. To OR it with B via a Bubbled-OR (NAND), input B must enter inverted as B' (1st Inverter).",
          },
        },
        {
          title: {
            tr: "Adım 2: Alt Kol Dönüşümü (BC')",
            en: "Step 2: Lower Branch Conversion (BC')",
          },
          detail: {
            tr: "BC' çarpımı için NAND(B, C') kullanılır; ancak C' elde etmek için C girişine 1 Inverter bağlanmalıdır (2. Inverter). Toplamda B' ve C' için 2 adet Inverter gerekir.",
            en: "BC' uses NAND(B, C'); since only unprimed C is available, C needs 1 Inverter to produce C' (2nd Inverter). Total = 2 Inverters (B' and C').",
          },
        },
      ],
    },
    {
      id: 'w6-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · Even Parity Checker (Çift Eşlik Denetleyicisi)',
        en: 'Question 5 · Even Parity Checker',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '3-bitlik veri (x, y, z) ve 1-bitlik Even Parity (P) alan bir alıcı devrede hata kontrol çıkışı C = x ⊕ y ⊕ z ⊕ P hangi durumda 1 (Hata Var) üretir?',
        en: 'In a receiver taking 3 data bits (x, y, z) and 1 Even Parity bit (P), when does the error checker output C = x ⊕ y ⊕ z ⊕ P equal 1 (Error Detected)?',
      },
      options: [
        {
          tr: 'Alınan 4 bit (x, y, z, P) içinde tek sayıda 1 bulunduğunda',
          en: 'Whenever the 4 received bits (x, y, z, P) contain an odd number of 1s',
        },
        {
          tr: 'Alınan 4 bit içinde çift sayıda 1 bulunduğunda',
          en: 'Whenever the 4 received bits contain an even number of 1s',
        },
        { tr: 'Yalnızca P = 1 olduğunda', en: 'Only when P = 1' },
        { tr: 'Tüm bitler 0 olduğunda', en: 'When all 4 bits equal 0' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: 4-Girişli XOR Davranışı',
            en: 'Step 1: 4-Input XOR Behavior',
          },
          detail: {
            tr: 'Even Parity protokolünde hatasız bir 4-bitlik pakette daima ÇİFT sayıda 1 bulunur ve 4-girişli XOR bu durumda 0 üretir. İletimde tek bitlik bir hata olduğunda 1 sayısı TEK olur ve C = 1 yanar.',
            en: 'Under Even Parity, a valid 4-bit packet always has an EVEN number of 1s so the 4-input XOR outputs C = 0. Any single-bit transmission error flips parity to ODD, raising C = 1.',
          },
        },
      ],
    },
    {
      id: 'w6-q6',
      type: 'simulator-build',
      title: {
        tr: 'Soru 6 · Yalnızca NAND Kapılarıyla Devre Kurulumu (Canlı Lab)',
        en: 'Question 6 · Build SOP Using Only NAND Gates (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "F(A, B, C) = A'B + AC fonksiyonunu simülatörde YALNIZCA NAND kapıları kullanarak (NOT işlemi için A girişini bir NAND kapısının her iki girişine birden bağlayarak) kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.",
        en: "Build F(A, B, C) = A'B + AC in the simulator using ONLY NAND gates (tie both inputs of a NAND gate to A to invert A) and verify against all 8 truth table rows.",
      },
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['NAND'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: {
        tr: "1) A'yı 1. NAND kapısının hem a hem b pinine bağlayarak A' üretin. 2) 2. NAND'a A' ve B bağlayın. 3) 3. NAND'a A ve C bağlayın. 4) 2. ve 3. NAND çıkışlarını 4. çıkış NAND'ına bağlayıp F LED'ine iletin.",
        en: "1) Wire A to both inputs of NAND1 to produce A'. 2) Wire A' and B to NAND2. 3) Wire A and C to NAND3. 4) Wire outputs of NAND2 and NAND3 into NAND4 and connect its output to LED F.",
      },
      solutionDescription: {
        tr: "DeMorgan eşdeğerliği: [(A'B)' · (AC)']' = A'B + AC. Toplam 4 adet NAND kapısı (1 Inverter + 2 birinci seviye + 1 çıkış NAND) ile tam SOP devresi elde edilir.",
        en: "DeMorgan equivalence: [(A'B)' · (AC)']' = A'B + AC. Four NAND gates (1 Inverter + 2 Level-1 NANDs + 1 output NAND) implement the entire SOP circuit.",
      },
    },
    {
      id: 'w6-q7',
      type: 'simulator-build',
      title: {
        tr: 'Soru 7 · Yalnızca NOR Kapılarıyla POS Devresi Kurulumu (Canlı Lab)',
        en: 'Question 7 · Build POS Using Only NOR Gates (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "F(A, B, C) = (A + B)(A' + C) POS fonksiyonunu simülatörde YALNIZCA NOR kapıları kullanarak (A' için A girişini bir NOR kapısının her iki girişine birden bağlayarak) kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.",
        en: "Build the POS function F(A, B, C) = (A + B)(A' + C) in the simulator using ONLY NOR gates (tie both inputs of a NOR gate to A to invert A) and verify against all 8 truth table rows.",
      },
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['NOR'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: {
        tr: "1) A'yı 1. NOR kapısının hem a hem b pinine bağlayarak A' üretin. 2) 2. NOR'a A ve B bağlayın. 3) 3. NOR'a A' ve C bağlayın. 4) 2. ve 3. NOR çıkışlarını 4. çıkış NOR'una bağlayıp F LED'ine iletin.",
        en: "1) Wire A to both inputs of NOR1 to generate A'. 2) Wire A and B to NOR2. 3) Wire A' and C to NOR3. 4) Feed outputs of NOR2 and NOR3 into NOR4 and connect to LED F.",
      },
      solutionDescription: {
        tr: "DeMorgan eşdeğerliği: [(A+B)' + (A'+C)']' = (A+B)(A'+C). Toplam 4 adet NOR kapısı ile iki seviyeli POS devresi gerçekleştirilmiş olur.",
        en: "DeMorgan equivalence: [(A+B)' + (A'+C)']' = (A+B)(A'+C). Four NOR gates implement the two-level POS network.",
      },
    },
  ],
};
