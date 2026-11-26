import type { DetailedLectureEntry } from './types';

export const DETAILED_WEEKS_6_TO_10: Record<string, DetailedLectureEntry> = {
  // =========================================================================
  // WEEK 6 — Lecture 5: Don't-Care, NAND/NOR & XOR/Parity (Sec. 3.5 - 3.8)
  // =========================================================================
  'w6-c1': {
    cardId: 'w6-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 3.5 · Lecture 5 (Slides 1–3)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 3.5 · Lecture 5 (Slayt 1–3)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Incompletely Specified Functions & Don’t-Care X)',
      },
      body: {
        en: 'Functions whose output is unspecified for certain input combinations are called incompletely specified functions. Those input combinations either never occur in practice (e.g., 4-bit binary patterns 1010 through 1111 in BCD) or their output does not affect system behavior. On a K-map, these combinations are marked with X (don\'t-care conditions, denoted d = ∑(…)). During minimization, each X may be treated as either 1 or 0—choosing whichever assignment produces larger power-of-2 groups.',
        tr: 'Bazı giriş kombinasyonları için çıkış değeri tanımlanmamış fonksiyonlara eksik tanımlı fonksiyonlar (incompletely specified functions) denir. Bu girişler pratikte asla oluşmaz (ör. BCD kodunda 1010–1111 arası 6 kombinasyon) veya çıkışlarının 0 ya da 1 olması sistemi etkilemez. K-Map üzerinde bu hücreler X (farksız durum / don\'t-care, d = ∑(…)) ile gösterilir. Sadeleştirme sırasında her X hücresi, yalnızca daha büyük 2^k grubu kurmaya yardımcı oluyorsa 1 (SOP için) veya 0 (POS için) sayılır; katkı sağlamıyorsa gruba katılmaz.',
      },
      formalEquation: 'F(w,x,y,z) = ∑m(…) + ∑d(…)   |   Each X ∈ {0, 1} chosen for minimum literals',
    },
    procedure: {
      heading: {
        en: 'K-Map Minimization Rules with Don’t-Care Cells (X)',
        tr: 'Adım Adım Don’t-Care (X) Hücreli K-Map Sadeleştirme Kuralları',
      },
      steps: [
        {
          en: '1. Populate Map: Place 1s in specified minterms (m), X in don\'t-care minterms (d), and 0s everywhere else.',
          tr: '1. Haritayı Doldur: Mintermlere (m) 1, farksız durumlara (d) X ve kalan diğer karelerin tamamına 0 yaz.',
        },
        {
          en: '2. Cover Every 1 (Mandatory): Every specified 1-cell MUST be included in at least one group.',
          tr: '2. Tüm 1\'leri Ört (Zorunlu): Belirtilmiş her 1 hücresi mutlaka en az bir grup içinde yer almalıdır.',
        },
        {
          en: '3. Use X Opportunistically (Optional): Include an X inside a group ONLY if it enlarges a group containing at least one 1 (e.g., turns a 2-cell into a 4-cell). NEVER create a group consisting solely of X cells!',
          tr: '3. X\'i Seçici Kullan (İsteğe Bağlı): Bir X hücresini YALNIZCA en az bir tane 1 içeren grubu 2^k ölçeğinde büyütüyorsa (ör. 2\'liyi 4\'lü yapıyorsa) gruba kat. Asla tamamı X\'ten oluşan bir grup kurma!',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Example: Two Valid Answers for F + d (Mano Ex. 3.8 / Lecture 5)',
        tr: 'Adım Adım Çözümlü Örnek: F ve d İle İki Farklı Geçerli Çözüm (Mano Örn. 3.8)',
      },
      problem: {
        en: 'Simplify F(w, x, y, z) = ∑(1, 3, 7, 11, 15) together with don\'t-care conditions d(w, x, y, z) = ∑(0, 2, 5).',
        tr: 'F(w, x, y, z) = ∑(1, 3, 7, 11, 15) fonksiyonunu d(w, x, y, z) = ∑(0, 2, 5) farksız durumlarıyla birlikte sadeleştiriniz.',
      },
      steps: [
        {
          en: 'Step 1 — Cover Column yz = 11: Minterms {3, 7, 11, 15} form an essential 4-cell column → yz. Only m_1 remains uncovered.',
          tr: 'Adım 1 — yz = 11 Sütununu Al: {3, 7, 11, 15} hücreleri zorunlu 4\'lü grup oluşturur → yz. Geriye sadece m_1 kalır.',
        },
        {
          en: 'Step 2 — Option A (use X at 0 and 2): Combining m_1 with {0, 2, 3} covers row wx = 00 completely → w\'x\'. Total: F_1 = yz + w\'x\' = ∑(0,1,2,3,7,11,15).',
          tr: 'Adım 2 — Seçenek A (X=0 ve X=2 Kullan): m_1 hücresi {0, 2, 3} ile birleşip üst satırı (wx=00) kaplar → w\'x\'. Sonuç: F_1 = yz + w\'x\'.',
        },
        {
          en: 'Step 3 — Option B (use X at 5): Combining m_1 with {3, 5, 7} gives the 4-cell block {1, 3, 5, 7} → w\'z. Total: F_2 = yz + w\'z = ∑(1,3,5,7,11,15).',
          tr: 'Adım 3 — Seçenek B (X=5 Kullan): m_1 hücresi {3, 5, 7} ile 4\'lü grup kurar → w\'z. Sonuç: F_2 = yz + w\'z.',
        },
      ],
      finalAnswer: {
        en: "Both F = yz + w'x' and F = yz + w'z are equally minimal and valid (they differ only on don't-care inputs).",
        tr: "Hem F = yz + w'x' hem F = yz + w'z eşit derecede sade ve geçerlidir (yalnızca farksız X hücrelerinde farklılaşırlar).",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Never include a group made purely of X\'s! Doing so adds extra gates and literals without covering any required 1.',
          tr: 'Tamamı X\'lerden oluşan bir grubu asla almayın! Hiçbir zorunlu 1\'i örtmediği halde devreyi gereksiz kapılarla büyütür.',
        },
        {
          en: 'When finding POS using 0-cells in the same map, remember that any X NOT grouped with 1s does NOT have to be grouped with 0s either—only cover mandatory 0s.',
          tr: 'Aynı haritada POS için 0\'ları gruplarken X\'leri yalnızca 0 grubunu büyütüyorsa dahil edin; zorunlu olarak her X\'i örtmeye çalışmayın.',
        },
      ],
    },
  },

  'w6-c2': {
    cardId: 'w6-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 3.6 · Lecture 5 (Slides 3–8)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 3.6 · Lecture 5 (Slayt 3–8)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Two-Level & Multilevel NAND Implementation)',
      },
      body: {
        en: 'Because NAND gates are faster and cheaper to fabricate in CMOS/TTL families and form a functionally complete universal gate set, digital logic is routinely converted from AND-OR diagrams into all-NAND networks. Graphically, a NAND gate has two DeMorgan-equivalent symbols: AND-invert (an AND body with an output bubble) and Invert-OR (an OR body with input bubbles). For two-level implementation, any simplified Sum of Products (SOP) expression maps directly to an AND-invert first level feeding an Invert-OR (NAND) second level.',
        tr: 'NAND kapıları tümleşik devre teknolojilerinde (CMOS/TTL) daha hızlı ve ekonomik üretilebildiği ve her mantıksal işlevi tek başına kurabilen evrensel bir kapı (universal gate) olduğu için AND-OR şemaları sıkça yalnızca NAND kapılarına dönüştürülür. NAND kapısının DeMorgan eşdeğeri olan iki gösterimi vardır: AND-invert (çıkışında baloncuk bulunan AND) ve Invert-OR (girişlerinde baloncuk bulunan OR). İki seviyeli bir sadeleştirilmiş SOP ifadesi, doğrudan birinci seviye AND-invert ve ikinci seviye Invert-OR (yani tümü NAND) devresine dönüşür.',
      },
      formalEquation: 'F = AB + CD  =  ((AB)\' · (CD)\')\'   |   Single literal x needs Inverter (or x\') into 2nd-level NAND',
    },
    procedure: {
      heading: {
        en: 'General Procedure for Two-Level & Multilevel NAND Conversion',
        tr: 'Adım Adım İki Seviyeli ve Çok Seviyeli NAND Dönüşüm Kuralları',
      },
      steps: [
        {
          en: '1. Start with Simplified SOP (2-level) or Factored AND-OR Diagram (multilevel).',
          tr: '1. Başlangıç Şeması: İki seviyeli devre için en sade SOP ifadesini, çok seviyeli devre için mevcut AND-OR şemasını al.',
        },
        {
          en: '2. Convert Gates to Mixed Notation: Replace every AND gate with an AND-invert symbol and every OR gate with an Invert-OR symbol.',
          tr: '2. Karma Gösterime Çevir: Tüm AND kapılarını AND-invert sembolüne, tüm OR kapılarını Invert-OR sembolüne dönüştür.',
        },
        {
          en: '3. Balance Bubbles Along Every Wire: Two bubbles on the same wire cancel (involution). If a single unmatched bubble remains on a primary input or internal line, insert a 1-input NAND inverter—or feed the complemented literal (e.g., z\' instead of z) directly.',
          tr: '3. Baloncukları Dengele: Aynı hat üzerindeki iki baloncuk birbirini götürür. Bir girişte tek kalan (karşılıksız) baloncuk varsa hatta 1-girişli NAND (inverter) ekle veya o girişin tümleyenini (z yerine z\') doğrudan bağla.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Two-Level & Multilevel NAND Example (Mano Ex. 3.9 & Fig. 3.21)',
        tr: 'Adım Adım Çözümlü Örnek: İki ve Çok Seviyeli NAND Uygulaması (Mano Örn. 3.9)',
      },
      problem: {
        en: 'Implement (a) F(x, y, z) = ∑(1, 2, 3, 4, 5, 7) as a two-level NAND circuit, and (b) F = A(CD + B) + BC\' as a multilevel NAND circuit.',
        tr: '(a) F(x, y, z) = ∑(1, 2, 3, 4, 5, 7) fonksiyonunu iki seviyeli NAND devresiyle, (b) F = A(CD + B) + BC\' ifadesini çok seviyeli NAND devresiyle gerçekleştiriniz.',
      },
      steps: [
        {
          en: 'Part (a) Simplify SOP: K-map gives F = xy\' + x\'y + z (note z is a single-literal term).',
          tr: 'Kısım (a) SOP Sadeleştirme: K-Map ile F = xy\' + x\'y + z bulunur (z tek literalli terimdir).',
        },
        {
          en: 'Part (a) Convert to NAND: Level 1 NANDs compute (xy\')\' and (x\'y)\'. Level 2 Invert-OR (NAND) takes these two outputs plus z\' (complemented to cancel the input bubble!) → F = ((xy\')\' · (x\'y)\' · z\')\' = xy\' + x\'y + z.',
          tr: 'Kısım (a) NAND Dönüşümü: 1. seviye NAND\'lar (xy\')\' ve (x\'y)\' üretir. 2. seviye NAND girişinde tek kalan baloncuk nedeniyle z yerine z\' bağlanır → F = ((xy\')\' · (x\'y)\' · z\')\' = xy\' + x\'y + z.',
        },
        {
          en: 'Part (b) Multilevel Conversion on F = A(CD + B) + BC\': Level 1 NAND computes (CD)\'. Level 2 Invert-OR receives (CD)\' and B\' (complemented!) to output (CD + B). Level 3 NAND computes [A(CD + B)]\', and a parallel NAND computes (BC\')\'. Final Level 4 NAND combines them → F.',
          tr: 'Kısım (b) Çok Seviyeli F = A(CD + B) + BC\': 1. kat (CD)\' NAND; 2. kat Invert-OR (girişleri (CD)\' ve B\') çıkışı CD+B; 3. kat [A(CD+B)]\' ile (BC\')\' NAND\'ları; 4. kat son NAND kapısı F\'yi verir.',
        },
      ],
      finalAnswer: {
        en: "(a) F = ((xy')'·(x'y)'·z')' (3 NAND gates + z');   (b) 5 NAND gates across 4 levels with B complemented at level 2.",
        tr: "(a) F = ((xy')'·(x'y)'·z')' (3 NAND kapısı);   (b) 4 seviyede toplam 5 NAND kapısı (2. seviyede B terslenerek).",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Forgetting to invert a standalone single literal (like + z) feeding the second-level NAND gate is the classic exam error—an uninverted z gives z\' instead of z!',
          tr: 'İkinci seviye NAND kapısına doğrudan bağlanan tek literalli terimi (ör. + z) terslemeyi unutmak en yaygın sınav hatasıdır; z doğrudan bağlanırsa çıkışta z\' olarak çıkar!',
        },
        {
          en: 'Always pair bubbles visually: output bubble + input bubble = plain wire (cancels out). Only unmatched bubbles require an inverter or complemented literal.',
          tr: 'Çıkış baloncuğu ile giriş baloncuğu aynı kablo üzerinde karşılaşırsa birbirini nötrler; yalnızca tek başına kalan baloncuklar için inverter eklenir.',
        },
      ],
    },
  },

  'w6-c3': {
    cardId: 'w6-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 3.6 · Lecture 5 (Slides 8–12)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 3.6 · Lecture 5 (Slayt 8–12)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Two-Level & Multilevel NOR Implementation)',
      },
      body: {
        en: 'The NOR gate is the exact dual of the NAND gate and is equally universal—any Boolean function can be realized exclusively with NOR gates. Its two DeMorgan-equivalent symbols are OR-invert (OR body with output bubble) and Invert-AND (AND body with input bubbles). Whereas NAND synthesis naturally starts from a simplified Sum of Products (SOP), two-level NOR synthesis naturally starts from a simplified Product of Sums (POS) expression.',
        tr: 'NOR kapısı, NAND kapısının tam ikili (dual) olup aynı şekilde evrensel bir kapıdır; tüm dijital sistemler yalnızca NOR kapılarıyla inşa edilebilir. DeMorgan eşdeğeri olan iki sembolü OR-invert (çıkışı baloncuklu OR) ve Invert-AND (girişleri baloncuklu AND) şeklindedir. NAND uygulaması doğal olarak en sade SOP ifadesinden başlarken, iki seviyeli NOR uygulaması doğrudan en sade Çarpımların Toplamı (POS) ifadesinden başlar.',
      },
      formalEquation: 'F = (A + B)(C + D)  =  ((A + B)\' + (C + D)\')\'   |   POS → 2-level NOR',
    },
    procedure: {
      heading: {
        en: 'Step-by-Step NOR Circuit Conversion Rules',
        tr: 'Adım Adım NOR Devresine Dönüşüm Kuralları',
      },
      steps: [
        {
          en: '1. Simplify into POS (for 2-level): Use K-map 0-grouping + DeMorgan to obtain minimal Product of Sums.',
          tr: '1. POS Formuna İndirge: İki seviyeli tasarım için K-Map\'te 0\'ları gruplayıp DeMorgan uygulayarak en sade POS ifadesini bul.',
        },
        {
          en: '2. Replace Gates Using NOR Mixed Symbols: Change all OR gates to OR-invert symbols and all AND gates to Invert-AND symbols.',
          tr: '2. Kapıları NOR Sembollerine Çevir: Tüm OR kapılarını OR-invert, tüm AND kapılarını Invert-AND sembolüyle değiştir.',
        },
        {
          en: '3. Cancel Bubble Pairs & Fix Unmatched Bubbles: On any single-literal sum factor (such as · E in (A+B)·E) or unmatched internal bubble, complement the literal (E\') or insert a 1-input NOR inverter.',
          tr: '3. Baloncukları Dengele: Aynı hatta gelen çift baloncukları sadeleştir; tek başına kalan baloncuk veya tek literalli çarpan varsa (ör. E) girişi tersle (E\') ya da NOR inverter ekle.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Two-Level & Multilevel NOR Example (Mano Fig. 3.24 & 3.25)',
        tr: 'Adım Adım Çözümlü Örnek: İki ve Çok Seviyeli NOR Uygulaması (Mano Şekil 3.24–3.25)',
      },
      problem: {
        en: 'Convert (a) F = (A + B)(C + D)E into a two-level NOR circuit, and (b) F = (AB\' + A\'B)(C + D\') into a multilevel NOR circuit.',
        tr: '(a) F = (A + B)(C + D)E ifadesini iki seviyeli NOR devresine, (b) F = (AB\' + A\'B)(C + D\') ifadesini çok seviyeli NOR devresine dönüştürünüz.',
      },
      steps: [
        {
          en: 'Part (a) First Level: Two OR-invert (NOR) gates compute (A + B)\' and (C + D)\'.',
          tr: 'Kısım (a) 1. Seviye: İki NOR kapısı (A + B)\' ve (C + D)\' sinyallerini üretir.',
        },
        {
          en: 'Part (a) Second Level: One Invert-AND (NOR) gate combines (A + B)\', (C + D)\', and E\' (complemented because E hits an unmatched input bubble!) → [(A+B)\' + (C+D)\' + E\']\' = (A + B)(C + D)E.',
          tr: 'Kısım (a) 2. Seviye: Son Invert-AND (NOR) kapısına (A + B)\', (C + D)\' ve (baloncuğu dengelemek için) E\' girer → [(A+B)\' + (C+D)\' + E\']\' = (A+B)(C+D)E.',
        },
        {
          en: 'Part (b) Multilevel NOR: Convert inner ANDs (AB\', A\'B) to Invert-AND NORs receiving (A\', B) and (A, B\'); feed their outputs into an OR-invert NOR computing (AB\' + A\'B)\', while another NOR computes (C + D\')\'; finally an Invert-AND NOR combines both → F.',
          tr: 'Kısım (b) Çok Seviyeli NOR: İçteki AB\' ve A\'B AND\'leri girişleri terslenmiş (A\', B) ve (A, B\') alan NOR\'lara; orta OR kapısı (AB\'+A\'B)\' NOR\'una; sağdaki (C+D\') NOR\'una ve çıkıştaki son NOR kapısına bağlanır.',
        },
      ],
      finalAnswer: {
        en: "(a) F = ((A+B)' + (C+D)' + E')' (3 NOR gates + E');   (b) 5 NOR gates realizing (AB' + A'B)(C + D').",
        tr: "(a) F = ((A+B)' + (C+D)' + E')' (3 NOR kapısı);   (b) 5 NOR kapısı ile (AB' + A'B)(C + D') gerçeklemesi.",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do not feed an SOP expression directly into two-level NOR gates! Starting NOR design from SOP forces an extra inversion layer; always start from POS for 2-level NOR.',
          tr: 'İki seviyeli NOR tasarımı için asla SOP ifadesinden doğrudan başlamayın; önce K-Map\'ten POS ifadesini çıkarın.',
        },
        {
          en: 'Check single literals on the second-level NOR gate: just like NAND, an unmatched bubble requires complementing that single literal (E → E\').',
          tr: 'İkinci seviye NOR kapısına doğrudan giren tek literalde baloncuğu dengelemek için girişi mutlaka tümleyin (E → E\').',
        },
      ],
    },
  },

  'w6-c4': {
    cardId: 'w6-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 3.8 · Lecture 5 (Slides 13–17)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 3.8 · Lecture 5 (Slayt 13–17)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (XOR, Odd/Even Functions & Parity)',
      },
      body: {
        en: 'The Exclusive-OR (XOR, ⊕) operation outputs 1 only when its two inputs differ (x ⊕ y = xy\' + x\'y), while its complement Exclusive-NOR (XNOR, ⊙) outputs 1 when they match (xy + x\'y\'). Extended to n variables, A ⊕ B ⊕ C ⊕ … acts as an Odd Function—evaluating to 1 if and only if an odd number of inputs equal 1—forming a checkerboard pattern on K-maps. This property directly powers Parity Generators (appending a parity bit P at the transmitter) and Parity Checkers (verifying single-bit integrity at the receiver).',
        tr: 'Özel-VEYA (XOR, ⊕) işlemi iki giriş farklı olduğunda 1 üretir (x ⊕ y = xy\' + x\'y); tümleyeni XNOR (⊙) ise iki giriş eşit olduğunda 1 verir. Çok değişkenli kullanımda A ⊕ B ⊕ C ⊕ … bir Tek Fonksiyon (Odd Function) olarak çalışır ve yalnızca TEK sayıda giriş 1 olduğunda 1 verir (K-Map\'te dama tahtası deseni oluşturur). Bu özellik haberleşme hatlarında tek bit hata yakalayan Eşlik Üreteci (Parity Generator) ve Eşlik Denetleyicisi (Parity Checker) devrelerinin temelini oluşturur.',
      },
      formalEquation: 'x ⊕ y = xy\' + x\'y   |   Even Parity Gen: P = x ⊕ y ⊕ z   |   Parity Checker: C = x ⊕ y ⊕ z ⊕ P',
    },
    procedure: {
      heading: {
        en: 'XOR Algebraic Identities & Parity Circuit Design Steps',
        tr: 'Adım Adım XOR Özdeşlikleri ve Eşlik Devresi Tasarımı',
      },
      steps: [
        {
          en: '1. Apply Key XOR Identities: x ⊕ 0 = x, x ⊕ 1 = x\', x ⊕ x = 0, x ⊕ x\' = 1, and x ⊕ y\' = x\' ⊕ y = (x ⊕ y)\'.',
          tr: '1. Temel XOR Özdeşlikleri: x ⊕ 0 = x, x ⊕ 1 = x\', x ⊕ x = 0, x ⊕ x\' = 1 ve x ⊕ y\' = x\' ⊕ y = (x ⊕ y)\'.',
        },
        {
          en: '2. Recognize Checkerboard K-Maps: Alternate 1s with no adjacent pairs (e.g., ∑(1, 2, 4, 7) for 3 variables) identify an Odd Function (x ⊕ y ⊕ z).',
          tr: '2. Dama Tahtası K-Map Deseni: Haritada birbirine komşu olmayan çapraz 1\'ler (ör. ∑(1, 2, 4, 7)) doğrudan x ⊕ y ⊕ z Tek Fonksiyonunu gösterir.',
        },
        {
          en: '3. Build Even Parity Transmitter & Receiver: Transmitter appends P = x ⊕ y ⊕ z so total 1s in (x, y, z, P) is even; receiver computes C = x ⊕ y ⊕ z ⊕ P (C = 1 indicates an error).',
          tr: '3. Çift Eşlik (Even Parity) Devreleri: Vericide P = x ⊕ y ⊕ z üretilir (böylece 4 bitin toplam 1 sayısı çift olur); alıcıda C = x ⊕ y ⊕ z ⊕ P hesaplanır (C = 1 ise iletim hatası vardır).',
        },
      ],
      table: {
        caption: {
          en: '3-Bit Even Parity Generator & 4-Bit Parity Checker Behavior (Mano Table 3.2)',
          tr: '3-Bit Çift Eşlik Üreteci ve Alıcı Hata Denetimi Özeti',
        },
        headers: ['Message (x y z)', 'Parity Bit P = x⊕y⊕z', 'Transmitted (x y z P)', 'Checker C (if no error)'],
        rows: [
          ['0 0 0', '0', '0 0 0 0', '0'],
          ['0 0 1', '1', '0 0 1 1', '0'],
          ['0 1 1', '0', '0 1 1 0', '0'],
          ['1 1 1', '1', '1 1 1 1', '0 (becomes 1 on any 1-bit flip)'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Parity Transmission & NAND-XOR Verification (Mano Sec. 3.8)',
        tr: 'Adım Adım Çözümlü Örnek: Eşlik Bitli İletim ve 4-NAND XOR Kanıtı',
      },
      problem: {
        en: '(a) A 3-bit message (x, y, z) = (1, 0, 0) uses an Even Parity Generator; what is transmitted, and what does the Parity Checker output if bit y flips to 1 during transmission? (b) Verify how 4 NAND gates build x ⊕ y.',
        tr: '(a) (x, y, z) = (1, 0, 0) mesajı çift eşlik (even parity) ile gönderiliyor. İletilen 4-bitlik sözcüğü bulun ve y biti yolda 1\'e dönerse alıcıdaki C çıkışını hesaplayın. (b) 4 NAND kapısıyla x ⊕ y eşitliğini kanıtlayın.',
      },
      steps: [
        {
          en: 'Part (a) Transmitter: P = 1 ⊕ 0 ⊕ 0 = 1. Transmitted 4-bit word = 1001 (two 1s — even).',
          tr: 'Kısım (a) Verici: P = 1 ⊕ 0 ⊕ 0 = 1. İletilen sözcük = 1001 (toplam iki 1 — çift).',
        },
        {
          en: 'Part (a) Receiver After 1-Bit Error: Bit y flips (0 → 1), so receiver reads (1, 1, 0, 1). Checker computes C = 1 ⊕ 1 ⊕ 0 ⊕ 1 = 1 → Error detected!',
          tr: 'Kısım (a) Tek Bit Hatalı Alım: y biti 1\'e bozulduğunda alıcı 1101 okur. C = 1 ⊕ 1 ⊕ 0 ⊕ 1 = 1 → Hata algılandı!',
        },
        {
          en: 'Part (b) 4-NAND XOR: Gate 1 = (xy)\'; Gate 2 = [x·(xy)\']\' = x\' + xy; Gate 3 = [y·(xy)\']\' = y\' + xy; Gate 4 = [(x\' + xy)(y\' + xy)]\' = x(x\'+y\') + y(x\'+y\') = xy\' + x\'y = x ⊕ y.',
          tr: 'Kısım (b) 4-NAND XOR: Kapı 1 = (xy)\'; Kapı 2 = [x·(xy)\']\'; Kapı 3 = [y·(xy)\']\'; Kapı 4 = [Kapı2 · Kapı3]\' = xy\' + x\'y = x ⊕ y.',
        },
      ],
      finalAnswer: {
        en: '(a) Transmitted = 1001; Error-flipped 1101 yields C = 1.   (b) x ⊕ y requires exactly 4 two-input NAND gates.',
        tr: '(a) İletilen = 1001; hatalı 1101 için C = 1.   (b) x ⊕ y devresi tam 4 adet 2-girişli NAND kapısıyla kurulur.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'For 4+ variables, remember that an Even Function (XNOR of 3 or 4 inputs) is the COMPLEMENT of the Odd Function: (x ⊕ y ⊕ z)\' = x ⊕ y ⊕ z ⊕ 1.',
          tr: '3 veya 4 değişkende Çift Fonksiyon (Even Function), Tek Fonksiyonun tümleyenidir: (x ⊕ y ⊕ z)\' = x ⊕ y ⊕ z ⊕ 1.',
        },
        {
          en: 'A 3-bit Odd Parity Generator simply inverts the Even Parity output: P_odd = (x ⊕ y ⊕ z)\'.',
          tr: 'Tek eşlik (Odd Parity) üreteci, çift eşlik üretecinin çıkışına bir NOT kapısı eklenerek P_odd = (x ⊕ y ⊕ z)\' biçiminde kurulur.',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 7 — Lecture 6: Combinational Analysis, Design & Adders (Sec. 4.1-4.5)
  // =========================================================================
  'w7-c1': {
    cardId: 'w7-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.3 · Lecture 6 (Slides 1–6)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.3 · Lecture 6 (Slayt 1–6)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Combinational Circuit Analysis Procedure)',
      },
      body: {
        en: 'Analysis of a combinational circuit starts from a given gate schematic and determines its logical behavior—expressed as simplified output Boolean functions, a complete 2^n-row truth table, or an operational description (such as recognizing an adder or comparator). Because combinational logic contains no memory elements and no closed feedback loops, signals propagate strictly forward from primary inputs through labeled intermediate gate nodes to primary outputs.',
        tr: 'Birleşik (combinational) devre analizi, verilmiş bir mantık kapısı şemasından yola çıkarak devrenin işlevini (çıkış Boole fonksiyonları, 2^n satırlı doğruluk tablosu veya devrenin yaptığı aritmetik/mantıksal görev olarak) belirleme sürecidir. Birleşik devrede bellek elemanı ve kapalı geri besleme yolu bulunmadığından, işaretler yalnızca girişlerden ara kapı düğümlerine ve çıkışlara doğru tek yönde akar.',
      },
      formalEquation: 'Schematic → Label T_1, T_2, … → Substitute Backwards → Output Equations F_i(inputs) / Truth Table',
    },
    procedure: {
      heading: {
        en: '4-Step Combinational Analysis Procedure (Mano Sec. 4.3)',
        tr: 'Adım Adım Birleşik Devre Analiz Prosedürü (Mano Sec. 4.3)',
      },
      steps: [
        {
          en: '1. Verify Combinational Structure: Confirm the schematic contains only logic gates with NO memory elements and NO feedback paths.',
          tr: '1. Yapıyı Doğrula: Şemada yalnızca mantık kapıları bulunduğunu, flip-flop veya geri besleme döngüsü olmadığını doğrula.',
        },
        {
          en: '2. Label Primary-Input Gate Outputs: Assign symbols (T_1, T_2, …) to gate outputs driven solely by primary inputs and write their Boolean expressions.',
          tr: '2. İlk Katmanı Etiketle: Doğrudan devre girişlerine bağlı kapı çıkışlarını T_1, T_2, … olarak adlandır ve denklemlerini yaz.',
        },
        {
          en: '3. Label Deeper Internal Nodes: Assign new symbols (T_3, …) to downstream gates driven by previously labeled nodes.',
          tr: '3. Ara Düğümleri Etiketle: Bir önceki katmanın çıkışlarını kullanan sonraki kapıları T_3, … ile etiketleyip ifadelerini yaz.',
        },
        {
          en: '4. Repeated Substitution (or Truth Table Trace): Substitute intermediate expressions until every output depends only on primary inputs, then simplify or evaluate all 2^n rows.',
          tr: '4. Yerine Koyma ve Doğruluk Tablosu: Tüm çıkışları birincil girişler cinsinden elde edene dek yerine koy veya tüm 2^n satır için sütun sütun doğruluk tablosunu doldur.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Analysis Example: Identifying a Mystery Circuit (Mano Fig. 4.2 / Lecture 6)',
        tr: 'Adım Adım Çözümlü Analiz Örneği (Mano Şekil 4.2 / Lecture 6)',
      },
      problem: {
        en: 'Analyze the 3-input (A, B, C), 2-output (F_1, F_2) circuit defined by: T_1 = A + B + C, T_2 = ABC, F_2 = AB + AC + BC, T_3 = F_2\'·T_1, F_1 = T_3 + T_2.',
        tr: 'T_1 = A + B + C, T_2 = ABC, F_2 = AB + AC + BC, T_3 = F_2\'·T_1 ve F_1 = T_3 + T_2 bağlantılarına sahip devreyi analiz edip hangi işlevi gerçekleştirdiğini bulunuz.',
      },
      steps: [
        {
          en: 'Step 1 — Expand F_2\': F_2\' = (AB + AC + BC)\' = (A\' + B\')(A\' + C\')(B\' + C\') = (A\' + B\'C\')(B\' + C\') = A\'B\' + A\'C\' + B\'C\'.',
          tr: 'Adım 1 — F_2\'yi Aç: F_2\' = (AB + AC + BC)\' = (A\' + B\')(A\' + C\')(B\' + C\') = A\'B\' + A\'C\' + B\'C\'.',
        },
        {
          en: 'Step 2 — Compute T_3 = F_2\'·T_1: (A\'B\' + A\'C\' + B\'C\')(A + B + C) = A\'B\'C + A\'BC\' + AB\'C\' (all double-complement terms like AA\' vanish!).',
          tr: 'Adım 2 — T_3 = F_2\'·T_1 Hesapla: (A\'B\' + A\'C\' + B\'C\')(A + B + C) = A\'B\'C + A\'BC\' + AB\'C\'.',
        },
        {
          en: 'Step 3 — Combine F_1 = T_3 + T_2: F_1 = A\'B\'C + A\'BC\' + AB\'C\' + ABC = ∑(1, 2, 4, 7) = A ⊕ B ⊕ C; and F_2 = AB + AC + BC = ∑(3, 5, 6, 7).',
          tr: 'Adım 3 — F_1 = T_3 + T_2 Birleştir: F_1 = ∑(1, 2, 4, 7) = A ⊕ B ⊕ C ve F_2 = ∑(3, 5, 6, 7).',
        },
      ],
      finalAnswer: {
        en: 'F_1 = Sum and F_2 = Carry-out — the circuit is a 3-bit Full Adder!',
        tr: 'F_1 = Toplam (Sum) ve F_2 = Elde (Carry) — devre bir Tam Toplayıcıdır (Full Adder)!',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'When algebra becomes messy on deep circuits, build the truth table column-by-column (T_1, T_2, F_2, F_2\', T_3, F_1) directly from gate outputs—it is immune to DeMorgan slips!',
          tr: 'Çok katmanlı devrelerde cebirsel açılım uzuyorsa doğrudan T_1, T_2, F_2, F_2\', T_3, F_1 sütunlarını içeren doğruluk tablosunu kurmak çok daha hatasızdır.',
        },
        {
          en: 'Never forget to inspect the diagram for feedback wires before starting—if an output feeds backward, state equations are required instead.',
          tr: 'Analize başlamadan önce devrede geri besleme kablosu olmadığından mutlaka emin olun.',
        },
      ],
    },
  },

  'w7-c2': {
    cardId: 'w7-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.4 · Lecture 6 (Slides 7–13)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.4 · Lecture 6 (Slayt 7–13)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Combinational Design & Code Conversion)',
      },
      body: {
        en: 'Combinational circuit design is the inverse of analysis: starting from word specifications, the designer derives a truth table mapping n inputs to m outputs and minimizes each output function into a gate-level circuit. A classic multi-output code conversion problem is the BCD-to-Excess-3 converter, which translates 4-bit BCD digits (0000–1001) into Excess-3 code by adding binary 3 (0011), treating invalid BCD codes 1010–1111 as don\'t-cares (X) and factoring common subexpressions to share gates across outputs.',
        tr: 'Birleşik devre tasarımı (design procedure), sözel problem tanımından başlayarak giriş-çıkış doğruluk tablosunu kurma ve her çıkış fonksiyonunu K-Map ile sadeleştirip donanıma dökme sürecidir. Klasik çok çıkışlı kod dönüştürücü örneği olan BCD-to-Excess-3 devresi, 4-bitlik BCD rakamlarına (0–9) ikili 3 (0011) eklerken geçersiz BCD girişlerini (10–15) X (don\'t-care) alır ve çıkışlar arasında ortak terimleri paylaşarak toplam kapı sayısını azaltır.',
      },
      formalEquation: 'Excess-3 Digit = BCD Digit + 0011   (inputs 1010–1111 = X don\'t-cares)',
    },
    procedure: {
      heading: {
        en: '4-Step Combinational Design Procedure (Mano Sec. 4.4)',
        tr: 'Adım Adım 4 Aşamalı Birleşik Devre Tasarım Prosedürü',
      },
      steps: [
        {
          en: '1. Define I/O Symbols: Determine the required number of input variables (n) and output variables (m) from the specification and assign clear letter symbols.',
          tr: '1. Giriş ve Çıkışları Belirle: Problem metninden kaç giriş (n) ve kaç çıkış (m) gerektiğini çıkarıp harf sembolleri ata (ör. giriş A,B,C,D; çıkış w,x,y,z).',
        },
        {
          en: '2. Construct the Truth Table: Enumerate all 2^n input rows and fill every output column (marking unused inputs as X).',
          tr: '2. Doğruluk Tablosunu Kur: 2^n satırın tamamını yazıp her çıkış sütununu belirle; oluşmayacak girişleri X işaretle.',
        },
        {
          en: '3. Minimize Each Output via K-Map: Draw one K-map per output variable (sharing X positions independently for each output) and look for common factored subexpressions.',
          tr: '3. K-Map ile Her Çıkışı Sadeleştir: Her çıkış değişkeni için ayrı K-Map çiz ve çok çıkışlı devrelerde ortak kullanılabilecek alt ifadeleri ara.',
        },
        {
          en: '4. Draw & Verify Logic Diagram: Build the schematic under gate/fan-in constraints and verify against boundary truth-table rows.',
          tr: '4. Şemayı Çiz ve Doğrula: Donanım kısıtlarına göre lojik diyagramı çiz ve doğruluk tablosuyla test et.',
        },
      ],
      table: {
        caption: {
          en: 'BCD-to-Excess-3 Truth Table (Mano Table 4.2)',
          tr: 'BCD → Excess-3 Kod Dönüştürücü Doğruluk Tablosu (Mano Tablo 4.2)',
        },
        headers: ['Decimal', 'BCD Input (A B C D)', 'Excess-3 Output (w x y z)'],
        rows: [
          ['0', '0 0 0 0', '0 0 1 1'],
          ['1', '0 0 0 1', '0 1 0 0'],
          ['4', '0 1 0 0', '0 1 1 1'],
          ['5', '0 1 0 1', '1 0 0 0'],
          ['9', '1 0 0 1', '1 1 0 0'],
          ['10–15', '1010 – 1111', 'X X X X (Don\'t-Care)'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Multi-Output Optimization: BCD-to-Excess-3 (Mano Fig. 4.3–4.4)',
        tr: 'Adım Adım Çözümlü Örnek: BCD-to-Excess-3 Ortak Kapı Paylaşımı',
      },
      problem: {
        en: 'From the BCD-to-Excess-3 truth table (valid digits 0–9, d = ∑(10..15)), derive the minimized equations for w, x, y, z and factor them to share the term (C + D).',
        tr: 'BCD-to-Excess-3 doğruluk tablosundan w, x, y, z denklemlerini türetin ve (C + D) terimini ortak kullanacak şekilde sadeleştirin.',
      },
      steps: [
        {
          en: 'Step 1 — z and y K-Maps: z = ∑(0,2,4,6,8) + d(10..15) → z = D\'. y = ∑(0,3,4,7,8) + d(10..15) → y = CD + C\'D\' = CD + (C + D)\'.',
          tr: 'Adım 1 — z ve y Haritaları: z = D\'. y = CD + C\'D\' olup DeMorgan ile y = CD + (C + D)\' biçimine yazılır.',
        },
        {
          en: 'Step 2 — x K-Map: x = ∑(1,2,3,4,9) + d(10..15) → x = B\'C + B\'D + BC\'D\' = B\'(C + D) + B(C + D)\'.',
          tr: 'Adım 2 — x Haritası: x = B\'C + B\'D + BC\'D\' ifadesi (C + D) ortak paranteziyle x = B\'(C + D) + B(C + D)\' olur.',
        },
        {
          en: 'Step 3 — w K-Map: w = ∑(5,6,7,8,9) + d(10..15) → w = A + BC + BD = A + B(C + D).',
          tr: 'Adım 3 — w Haritası: w = A + BC + BD = A + B(C + D) olarak tek OR terimi paylaşır.',
        },
      ],
      finalAnswer: {
        en: "z = D',  y = CD + (C+D)',  x = B'(C+D) + B(C+D)',  w = A + B(C+D)  (shares one OR gate C+D across x, y, w!).",
        tr: "z = D',  y = CD + (C+D)',  x = B'(C+D) + B(C+D)',  w = A + B(C+D)  ((C+D) kapısı üç çıkışta ortak kullanılır!).",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'In a multi-output circuit, each output (w, x, y, z) chooses its OWN optimal assignment for the don\'t-care cells 10–15 independently—w does not need the same X assignment as z!',
          tr: 'Çok çıkışlı tasarımlarda 10–15 arası X hücreleri her çıkış haritasında birbirinden bağımsız olarak 0 veya 1 seçilebilir.',
        },
        {
          en: 'Notice z = D\' makes sense immediately: adding 3 (odd) always flips the parity/LSB of the BCD digit.',
          tr: 'z = D\' sonucunu zihinden doğrulayın: her rakama tek sayı (3) eklendiğinde en sağ bit mutlaka terslenir.',
        },
      ],
    },
  },

  'w7-c3': {
    cardId: 'w7-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.5 · Lecture 6 (Slides 14–16)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.5 · Lecture 6 (Slayt 14–16)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Half Adder & Full Adder Equations)',
      },
      body: {
        en: 'Binary addition is performed bit-by-bit by two fundamental combinational building blocks. A Half Adder (HA) adds two 1-bit operands (x and y) to produce a Sum bit S and a Carry bit C. A Full Adder (FA) adds three bits—two significant operand bits (x, y) plus an incoming carry (z or C_in) from the previous less-significant stage—generating a Sum S and Carry-out C. In two-level SOP form, the Full Adder carry C = xy + xz + yz acts as a 3-input majority function (1 whenever at least two inputs are 1).',
        tr: 'İkili toplama işleminin temel yapı taşları Yarım Toplayıcı (Half Adder - HA) ve Tam Toplayıcıdır (Full Adder - FA). Yarım Toplayıcı yalnızca iki tek biti (x, y) toplayıp Toplam (S) ve Elde (C) üretir; önceki basamaktan gelen eldeyi işleyemez. Tam Toplayıcı ise iki anlamlı bit (x, y) ile alt basamaktan gelen giriş eldesini (z veya C_in) toplar. İki seviyeli SOP biçiminde Tam Toplayıcı eldesi C = xy + xz + yz olup 3 girişli çoğunluk (majority) fonksiyonudur.',
      },
      formalEquation: 'HA: S = x ⊕ y, C = xy   |   FA: S = x ⊕ y ⊕ z,  C = xy + xz + yz = xy + z(x ⊕ y)',
    },
    procedure: {
      heading: {
        en: 'Truth Table & Boolean Derivation Steps',
        tr: 'Adım Adım Doğruluk Tablosu ve Denklem Çıkarımı',
      },
      steps: [
        {
          en: '1. Half Adder (2 inputs): 0+0=00, 0+1=01, 1+0=01, 1+1=10 → S = x\'y + xy\' = x ⊕ y, C = xy.',
          tr: '1. Yarım Toplayıcı (2 giriş): 0+0=00, 0+1=01, 1+0=01, 1+1=10 → S = x ⊕ y, C = xy.',
        },
        {
          en: '2. Full Adder Sum S (3 inputs): S = 1 when an odd number of inputs are 1 (rows 1, 2, 4, 7) → S = ∑(1,2,4,7) = x ⊕ y ⊕ z.',
          tr: '2. Tam Toplayıcı Toplam S (3 giriş): Tek sayıda giriş 1 olduğunda (1, 2, 4, 7 satırları) S = 1 → S = x ⊕ y ⊕ z.',
        },
        {
          en: '3. Full Adder Carry C (3 inputs): C = 1 when two or three inputs are 1 (rows 3, 5, 6, 7) → K-map gives C = xy + xz + yz (2-level SOP), or factored C = xy + z(x ⊕ y).',
          tr: '3. Tam Toplayıcı Elde C (3 giriş): En az iki giriş 1 ise (3, 5, 6, 7 satırları) C = 1 → K-Map ile C = xy + xz + yz veya çarpanlı C = xy + z(x ⊕ y) bulunur.',
        },
      ],
      table: {
        caption: {
          en: 'Full Adder Truth Table (Mano Table 4.4)',
          tr: 'Tam Toplayıcı (Full Adder) Doğruluk Tablosu',
        },
        headers: ['x', 'y', 'z (C_in)', 'C (Carry)', 'S (Sum)'],
        rows: [
          ['0', '0', '0', '0', '0'],
          ['0', '0', '1', '0', '1'],
          ['0', '1', '0', '0', '1'],
          ['0', '1', '1', '1', '0'],
          ['1', '0', '0', '0', '1'],
          ['1', '0', '1', '1', '0'],
          ['1', '1', '0', '1', '0'],
          ['1', '1', '1', '1', '1'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Equivalence Proof: xy + xz + yz = xy + z(x ⊕ y)',
        tr: 'Adım Adım Çözümlü Örnek: İki Elde Formülünün Özdeşliği',
      },
      problem: {
        en: 'Prove algebraically that the two-level Full Adder carry C = xy + xz + yz equals C = xy + z(x\'y + xy\') = xy + z(x ⊕ y).',
        tr: 'İki seviyeli Tam Toplayıcı eldesi C = xy + xz + yz ifadesinin C = xy + z(x ⊕ y) ifadesine özdeş olduğunu cebirsel olarak kanıtlayınız.',
      },
      steps: [
        {
          en: 'Step 1 — Expand C = xy + z(x ⊕ y): Substitute x ⊕ y = x\'y + xy\' → C = xy + x\'yz + xy\'z.',
          tr: 'Adım 1 — Sağ Tarafı Aç: C = xy + z(x\'y + xy\') = xy + x\'yz + xy\'z.',
        },
        {
          en: 'Step 2 — Use xy = xy + xy·z (Absorption) or x + x\'y = x + y: Group xy + xy\'z = x(y + y\'z) = x(y + z) = xy + xz.',
          tr: 'Adım 2 — xy + xy\'z Grupla: x(y + y\'z) = x(y + z) = xy + xz (ikinci dağılma/yutma).',
        },
        {
          en: 'Step 3 — Repeat with y and x\'yz: xy + x\'yz = y(x + x\'z) = y(x + z) = xy + yz. Combining yields xy + xz + yz!',
          tr: 'Adım 3 — xy + x\'yz Grupla: y(x + x\'z) = y(x + z) = xy + yz. Birleştirilince xy + xz + yz elde edilir!',
        },
      ],
      finalAnswer: {
        en: 'C = xy + xz + yz ≡ xy + z(x ⊕ y); both expressions produce identical truth-table rows {3, 5, 6, 7}.',
        tr: 'C = xy + xz + yz ≡ xy + z(x ⊕ y); her iki form da tam olarak {3, 5, 6, 7} satırlarında 1 verir.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Never try to cascade Half Adders directly for multi-bit addition without incorporating the carry-in bit—bit positions 1, 2, … MUST be Full Adders (unless C_in is guaranteed 0 at bit 0).',
          tr: 'Çok bitli toplayıcılarda alt basamaktan gelen eldeyi işlemek için mutlaka Tam Toplayıcı (Full Adder) kullanın; Yarım Toplayıcı yalnızca en düşük basamakta (C_0 = 0 ise) yeterlidir.',
        },
        {
          en: 'S = ∑(1, 2, 4, 7) has no 2-cell K-map groups (checkerboard), so XOR gates are the most compact algebraic form.',
          tr: 'S = ∑(1, 2, 4, 7) K-Map\'te dama tahtası oluşturduğu için AND/OR yerine XOR kapılarıyla çok daha az kapıda kurulur.',
        },
      ],
    },
  },

  'w7-c4': {
    cardId: 'w7-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.5 · Lecture 6 (Slides 16–18)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.5 · Lecture 6 (Slayt 16–18)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Full Adder from Two Half Adders)',
      },
      body: {
        en: 'Hierarchical modular design constructs a Full Adder from two Half Adders and a single 2-input OR gate. The first Half Adder adds operand bits x and y to produce partial sum (x ⊕ y) and partial carry (xy). The second Half Adder adds that partial sum with incoming carry z to yield final Sum S = (x ⊕ y) ⊕ z and secondary carry z(x ⊕ y). Finally, an OR gate combines both carries into C = xy + z(x ⊕ y).',
        tr: 'Modüler hiyerarşik tasarımda bir Tam Toplayıcı (Full Adder), iki adet Yarım Toplayıcı (Half Adder) ve bir OR kapısıyla inşa edilir. Birinci HA x ve y girişlerinden ara toplam (x ⊕ y) ve ara elde (xy) üretir. İkinci HA, bu ara toplam ile giriş eldesi z\'yi toplayarak nihai toplam S = (x ⊕ y) ⊕ z ile ikinci elde z(x ⊕ y) çıkışını verir. Son OR kapısı iki eldeyi birleştirerek C = xy + z(x ⊕ y) çıkışını oluşturur.',
      },
      formalEquation: 'HA1: S_1 = x ⊕ y, C_1 = xy  →  HA2: S = S_1 ⊕ z, C_2 = z·S_1  →  OR: C = C_1 + C_2',
    },
    procedure: {
      heading: {
        en: 'Modular Wiring & Signal Trace Procedure',
        tr: 'Adım Adım Modüler Bağlantı ve İşaret İzleme',
      },
      steps: [
        {
          en: '1. Wire First Half Adder: Connect primary inputs x and y to HA1; label outputs S_1 = x ⊕ y and C_1 = xy.',
          tr: '1. Birinci HA Bağlantısı: x ve y girişlerini HA1\'e bağla; çıkışları S_1 = x ⊕ y ve C_1 = xy olarak adlandır.',
        },
        {
          en: '2. Wire Second Half Adder: Connect S_1 and carry-in z to HA2; its sum output IS final S = x ⊕ y ⊕ z, and its carry output is C_2 = z(x ⊕ y).',
          tr: '2. İkinci HA Bağlantısı: S_1 ile giriş eldesi z\'yi HA2\'ye bağla; HA2\'nin toplam çıkışı nihai S = x ⊕ y ⊕ z, elde çıkışı C_2 = z(x ⊕ y) olur.',
        },
        {
          en: '3. Combine Carries with OR Gate: Connect C_1 and C_2 to a 2-input OR gate (never both 1 simultaneously!) to produce final Carry-out C.',
          tr: '3. Eldeleri OR Kapısıyla Birleştir: C_1 ve C_2 çıkışlarını tek bir 2-girişli OR kapısına girerek nihai Elde C çıkışını al.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Signal Trace: Inputs (x, y, z) = (1, 0, 1) and (1, 1, 1)',
        tr: 'Adım Adım Çözümlü Örnek: İki HA İçinden İşaret Akışı',
      },
      problem: {
        en: 'Trace internal signals S_1, C_1, C_2 and final outputs (C, S) for (a) (x, y, z) = (1, 0, 1) and (b) (x, y, z) = (1, 1, 1), and check whether C_1 and C_2 can ever both be 1.',
        tr: '(a) (1, 0, 1) ve (b) (1, 1, 1) girişleri için S_1, C_1, C_2 ara sinyallerini ve (C, S) çıkışlarını hesaplayıp C_1 ile C_2\'nin aynı anda 1 olup olamayacağını gösteriniz.',
      },
      steps: [
        {
          en: 'Case (a) (1, 0, 1): HA1 gives S_1 = 1⊕0 = 1, C_1 = 1·0 = 0. HA2 adds (1, 1) → S = 0, C_2 = 1. OR gives C = 0 + 1 = 1. Result: C=1, S=0 (decimal 2).',
          tr: 'Durum (a) (1, 0, 1): HA1: S_1 = 1, C_1 = 0. HA2 (1, 1) toplar → S = 0, C_2 = 1. OR: C = 0 + 1 = 1. Sonuç: C=1, S=0 (ikili 10 = 2).',
        },
        {
          en: 'Case (b) (1, 1, 1): HA1 gives S_1 = 1⊕1 = 0, C_1 = 1·1 = 1. HA2 adds (0, 1) → S = 1, C_2 = 0. OR gives C = 1 + 0 = 1. Result: C=1, S=1 (decimal 3).',
          tr: 'Durum (b) (1, 1, 1): HA1: S_1 = 0, C_1 = 1. HA2 (0, 1) toplar → S = 1, C_2 = 0. OR: C = 1 + 0 = 1. Sonuç: C=1, S=1 (ikili 11 = 3).',
        },
        {
          en: 'Mutual Exclusion Check: C_1 = xy requires x=y=1, which forces S_1 = x⊕y = 0 and thus C_2 = z·0 = 0! Therefore C_1·C_2 = 0 always.',
          tr: 'Ayrıklık Kontrolü: C_1 = 1 olması x=y=1 gerektirir; bu da S_1 = x⊕y = 0 ve dolayısıyla C_2 = 0 yapar. Yani C_1 ve C_2 asla aynı anda 1 olamaz!',
        },
      ],
      finalAnswer: {
        en: '(a) C=1, S=0;   (b) C=1, S=1.  Total gate count = 2 XOR + 2 AND + 1 OR = 5 gates.',
        tr: '(a) C=1, S=0;   (b) C=1, S=1.  Toplam donanım = 2 XOR + 2 AND + 1 OR = 5 kapı.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Because C_1 and C_2 are mutually exclusive, you could theoretically replace the final OR gate with an XOR gate—though standard Mano Fig. 4.8 uses an OR gate.',
          tr: 'C_1 ve C_2 hiçbir zaman aynı anda 1 olmadığı için teorik olarak son OR yerine XOR da çalışır; ancak Mano Şekil 4.8 standardında OR kapısı kullanılır.',
        },
        {
          en: 'Notice propagation delay: an FA built from 2 HAs has 2 XOR delays along S and 2 levels (AND+OR) on carry—relevant when computing ripple-carry delay.',
          tr: 'Gecikme analizi yaparken C yolunun x, y\'den C\'ye tek seviyeli (2-level SOP) veya modüler yapıda 2-3 kapı gecikmesine sahip olabileceğini unutmayın.',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 8 — Lecture 7: Arithmetic & Comparison Circuits (Sec. 4.5 - 4.8)
  // =========================================================================
  'w8-c1': {
    cardId: 'w8-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.5 · Lecture 7 (Slides 1–4)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.5 · Lecture 7 (Slayt 1–4)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Ripple Carry vs. Carry Lookahead Adder)',
      },
      body: {
        en: 'In an n-bit Ripple Carry Adder (RCA), Full Adders are chained so the carry-out of stage i feeds the carry-in of stage i+1; because each carry passes through an AND gate and an OR gate, worst-case carry delay grows linearly as 2n gate levels. The Carry Lookahead (CLA) Adder eliminates this bottleneck by defining two local stage signals—Carry Propagate P_i = A_i ⊕ B_i and Carry Generate G_i = A_i·B_i—so every carry C_(i+1) = G_i + P_i·C_i can be expanded solely in terms of C_0 and computed in parallel in a constant two-level SOP delay.',
        tr: 'n-bitlik Dalga Eldeli Toplayıcıda (Ripple Carry Adder - RCA) her tam toplayıcının çıkış eldesi bir üst basamağın giriş eldesine bağlanır; her basamak elde yoluna 1 AND + 1 OR (2 kapı seviyesi) gecikme eklediği için toplam gecikme 2n kapı seviyesine ulaşır. Elde Öngörülü Toplayıcı (Carry Lookahead Adder - CLA) ise her basamak için Elde İletim P_i = A_i ⊕ B_i ve Elde Üretim G_i = A_i·B_i sinyallerini tanımlayarak C_(i+1) = G_i + P_i·C_i denklemini doğrudan C_0 cinsinden paralel açar ve tüm eldeleri sabit 2 kapı seviyesinde üretir.',
      },
      formalEquation: 'P_i = A_i ⊕ B_i,  G_i = A_i·B_i   |   C_(i+1) = G_i + P_i·C_i   |   S_i = P_i ⊕ C_i',
    },
    procedure: {
      heading: {
        en: 'Carry Lookahead Recursive Expansion Steps',
        tr: 'Adım Adım CLA Elde Denklemleri Türetme Prosedürü',
      },
      steps: [
        {
          en: '1. Compute Local P_i and G_i in Parallel: Every bit i computes P_i = A_i ⊕ B_i (1 XOR) and G_i = A_i·B_i (1 AND) simultaneously.',
          tr: '1. Yerel P_i ve G_i Üret: Tüm bit konumları aynı anda paralel olarak P_i = A_i ⊕ B_i ve G_i = A_i·B_i sinyallerini üretir.',
        },
        {
          en: '2. Expand Carries Algebraically: Substitute C_1 into C_2, C_2 into C_3, etc., so every C_k becomes a two-level AND-OR expression of G, P, and C_0.',
          tr: '2. Elde Denklemlerini Aç: C_1\'i C_2\'de, C_2\'yi C_3\'te yerine koyarak her C_k eldesini yalnızca G_j, P_j ve C_0 cinsinden iki seviyeli SOP\'ye dönüştür.',
        },
        {
          en: '3. Compute Final Sums: Once all carries C_i arrive simultaneously, compute S_i = P_i ⊕ C_i in 1 XOR delay.',
          tr: '3. Toplam Bitlerini Üret: Tüm C_i eldeleri aynı anda hazır olduğunda S_i = P_i ⊕ C_i işlemi tek bir XOR gecikmesiyle tamamlanır.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked 4-Bit CLA Derivation & Delay Comparison (Mano Sec. 4.5)',
        tr: 'Adım Adım Çözümlü Örnek: 4-Bit CLA Elde Açılımı ve Gecikme Kıyaslaması',
      },
      problem: {
        en: 'Expand C_1, C_2, C_3, and C_4 for a 4-bit CLA generator, evaluate them for A = 0111, B = 0011, C_0 = 0, and compare carry gate delay against a 4-bit RCA.',
        tr: '4-bit CLA üreteci için C_1..C_4 denklemlerini türetin; A = 0111, B = 0011, C_0 = 0 için eldeleri hesaplayın ve 4-bit RCA ile kapı gecikmesini karşılaştırın.',
      },
      steps: [
        {
          en: 'Step 1 — Expand CLA Carries:\n  • C_1 = G_0 + P_0·C_0\n  • C_2 = G_1 + P_1·G_0 + P_1·P_0·C_0\n  • C_3 = G_2 + P_2·G_1 + P_2·P_1·G_0 + P_2·P_1·P_0·C_0\n  • C_4 = G_3 + P_3·G_2 + P_3·P_2·G_1 + P_3·P_2·P_1·G_0 + P_3·P_2·P_1·P_0·C_0.',
          tr: 'Adım 1 — CLA Denklemlerini Aç:\n  • C_1 = G_0 + P_0·C_0\n  • C_2 = G_1 + P_1·G_0 + P_1·P_0·C_0\n  • C_3 = G_2 + P_2·G_1 + P_2·P_1·G_0 + P_2·P_1·P_0·C_0\n  • C_4 = G_3 + P_3·G_2 + P_3·P_2·G_1 + P_3·P_2·P_1·G_0 + P_3·P_2·P_1·P_0·C_0.',
        },
        {
          en: 'Step 2 — Evaluate G & P for A=0111, B=0011: bit0 (1,1)→G_0=1,P_0=0; bit1 (1,1)→G_1=1,P_1=0; bit2 (1,0)→G_2=0,P_2=1; bit3 (0,0)→G_3=0,P_3=0.',
          tr: 'Adım 2 — G ve P Değerleri (A=0111, B=0011): bit0→G_0=1,P_0=0; bit1→G_1=1,P_1=0; bit2→G_2=0,P_2=1; bit3→G_3=0,P_3=0.',
        },
        {
          en: 'Step 3 — Parallel Carries: C_1=1, C_2=1, C_3 = 0 + 1·1 = 1, C_4 = 0. Sums: S_0=0⊕0=0, S_1=0⊕1=1, S_2=1⊕1=0, S_3=0⊕1=1 → 1010 (7 + 3 = 10).',
          tr: 'Adım 3 — Paralel Eldeler: C_1=1, C_2=1, C_3=1, C_4=0. Toplamlar: S_0=0, S_1=1, S_2=0, S_3=1 → 1010 (7 + 3 = 10).',
        },
      ],
      finalAnswer: {
        en: '4-bit RCA carry delay = 2×4 = 8 gate levels; 4-bit CLA carry block delay = constant 2 gate levels (independent of n up to fan-in limits).',
        tr: '4-bit RCA elde gecikmesi = 2×4 = 8 kapı seviyesi; 4-bit CLA elde bloğu ise sabit 2 kapı seviyesidir.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'In Mano & Ciletti 6th Ed. Sec. 4.5, P_i is defined using XOR (A_i ⊕ B_i) because S_i = P_i ⊕ C_i reuses the exact same P_i signal—saving hardware.',
          tr: 'Mano & Ciletti 6. Baskı Bölüm 4.5\'te P_i = A_i ⊕ B_i olarak tanımlanır (OR değil); çünkü S_i = P_i ⊕ C_i aynı P_i sinyalini yeniden kullanır.',
        },
        {
          en: 'Practical CLA blocks are typically 4 bits wide because C_4 already needs a 5-input AND gate and 5-input OR gate; wider adders (16/64-bit) cascade 4-bit CLA blocks hierarchically.',
          tr: 'Yüksek fan-in (giriş sayısı) sınırı nedeniyle pratikte CLA blokları 4-bit yapılır; 16/64-bit toplayıcılar 4-bitlik CLA bloklarının kademeli birleştirilmesiyle kurulur.',
        },
      ],
    },
  },

  'w8-c2': {
    cardId: 'w8-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.5 · Lecture 7 (Slides 5–8)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.5 · Lecture 7 (Slayt 5–8)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Adder-Subtractor & Signed Overflow V)',
      },
      body: {
        en: 'A single 4-bit Binary Adder-Subtractor performs both A + B and A − B using a shared chain of Full Adders and one XOR gate per bit of B driven by a mode input M. When M = 0, each XOR passes B_i unchanged and C_0 = 0, computing A + B. When M = 1, each XOR inverts B_i (giving B\', the 1\'s complement) and sets C_0 = 1, adding A + B\' + 1 = A − B in 2\'s complement. To detect arithmetic overflow in signed 2\'s complement addition/subtraction, an output V = C_(n−1) ⊕ C_n compares the carry entering the sign bit against the carry leaving it.',
        tr: '4-bitlik İkili Toplayıcı-Çıkarıcı (Binary Adder-Subtractor), bir mod kontrol ucu M ve her B_i girişine bağlı birer XOR kapısı kullanarak hem A + B hem A − B işlemini tek donanımda yapar. M = 0 iken XOR kapıları B_i\'yi aynen geçirir ve C_0 = 0 olur (A + B). M = 1 iken XOR kapıları B_i\'yi tersler ve C_0 = 1 eklenir; böylece 2\'ye tümleyenle A + B\' + 1 = A − B hesaplanır. İşaretli 2\'ye tümleyen sayılarda taşma (Signed Overflow - V), çıkış eldesi C_n ile değil, işaret bitine giren elde C_(n−1) ile çıkan elde C_n\'in farklı olmasıyla saptanır: V = C_(n−1) ⊕ C_n.',
      },
      formalEquation: 'M=0: S = A + B   |   M=1: S = A + B\' + 1 = A − B   |   Signed Overflow: V = C_(n−1) ⊕ C_n',
    },
    procedure: {
      heading: {
        en: 'Mode Control & Overflow Verification Steps',
        tr: 'Adım Adım Mod Kontrolü ve Taşma (Overflow) Analizi',
      },
      steps: [
        {
          en: '1. Configure Mode M: Connect M directly to carry-in C_0 and to one input of every XOR gate feeding B_i.',
          tr: '1. Mod Ucu M Bağlantısı: M sinyalini doğrudan C_0 giriş eldesine ve her B_i girişinin önündeki XOR kapısının diğer ucuna bağla.',
        },
        {
          en: '2. Interpret Result Based on Number Type: For unsigned numbers, C_n = 1 means carry/overflow in addition (or M ≥ N in subtraction). For signed 2\'s complement numbers, check V = C_(n−1) ⊕ C_n instead!',
          tr: '2. Sayı Türüne Göre Sonucu Yorumla: İşaretsiz sayılarda taşmayı C_n gösterir. İşaretli 2\'ye tümleyen sayılarda ise C_n tek başına anlamlı değildir; V = C_(n−1) ⊕ C_n = 1 ise sonuç taşma nedeniyle geçersizdir!',
        },
        {
          en: '3. Sign-Rule Sanity Check: Signed overflow can ONLY occur when adding two positive numbers yields a negative sign bit (0 + 0 → 1), or adding two negative numbers yields a positive sign bit (1 + 1 → 0).',
          tr: '3. İşaret Kuralı Kontrolü: İşaretli taşma yalnızca iki pozitif sayının toplamı negatif çıkarsa (0+0→1) veya iki negatif sayının toplamı pozitif çıkarsa (1+1→0) meydana gelir.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked 4-Bit Signed Overflow Example (+70 + +80 in 8-bit / +5 + +4 in 4-bit)',
        tr: 'Adım Adım Çözümlü Örnek: 4-Bit İşaretli Toplamada Taşma (Overflow) Testi',
      },
      problem: {
        en: 'In a 4-bit signed 2\'s complement adder (range −8 to +7), compute (a) (+5) + (+4) and (b) (−3) + (+5), evaluating C_3, C_4, and V = C_3 ⊕ C_4.',
        tr: '4-bit işaretli 2\'ye tümleyen toplayıcıda (aralık −8 ile +7) (a) (+5) + (+4) ve (b) (−3) + (+5) işlemlerini yapıp C_3, C_4 ve V = C_3 ⊕ C_4 değerlerini hesaplayınız.',
      },
      steps: [
        {
          en: 'Part (a) (+5) + (+4) = 0101 + 0100: Bit 0→1+0=1 (C_1=0); Bit 1→0+0=0 (C_2=0); Bit 2→1+1=0, C_3=1; Sign Bit 3→0+0+C_3(1)=1, C_4=0.',
          tr: 'Kısım (a) (+5) + (+4) = 0101 + 0100: Sağdan bitlere bakınca 2. bitten işaret bitine C_3 = 1 elde taşınır; işaret bitinde 0 + 0 + 1 = 1 ve C_4 = 0 olur.',
        },
        {
          en: 'Part (a) Overflow Check: Sum bits = 1001 (−7 in 2\'s complement, wrong because +9 > +7!). Formula gives V = C_3 ⊕ C_4 = 1 ⊕ 0 = 1 → Overflow detected!',
          tr: 'Kısım (a) Taşma Kontrolü: Çıkış 1001 (−7) çıkar (çünkü +9, [+7] sınırını aşmıştır!). Formül: V = 1 ⊕ 0 = 1 → Taşma saptandı!',
        },
        {
          en: 'Part (b) (−3) + (+5) = 1101 + 0101: Bit0→1+1=0(C_1=1); Bit1→0+0+1=1(C_2=0); Bit2→1+1=0(C_3=1); Bit3→1+0+1=0, C_4=1. V = C_3 ⊕ C_4 = 1 ⊕ 1 = 0 → Valid result 0010 (+2)!',
          tr: 'Kısım (b) (−3) + (+5) = 1101 + 0101: C_3 = 1 ve C_4 = 1 olur. V = 1 ⊕ 1 = 0 → Taşma yok, sonuç 0010 (+2) geçerlidir!',
        },
      ],
      finalAnswer: {
        en: '(a) Sum = 1001 with V = 1 (overflow!);   (b) Sum = 0010 (+2) with C_4 = 1 discarded and V = 0 (valid).',
        tr: '(a) Toplam = 1001, V = 1 (taşma var!);   (b) Toplam = 0010 (+2), C_4 = 1 atılır, V = 0 (geçerli).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Do NOT use C_4 = 1 to flag signed overflow! As seen in (−3) + (+5) above, C_4 = 1 occurs normally on valid negative+positive additions whenever the result is positive.',
          tr: 'İşaretli sayılarda C_n = 1 olmasını asla taşma sanmayın! Örnek (b)\'de görüldüğü gibi (−3)+(+5) işleminde C_4 = 1 çıktığı halde taşma yoktur.',
        },
        {
          en: 'When M = 1 in subtraction A − B, remember BOTH actions must occur: invert B_i AND feed C_0 = 1; forgetting C_0 = 1 leaves you with 1\'s complement (A − B − 1).',
          tr: 'Çıkarma modunda (M = 1) hem B\'nin bitleri terslenmeli hem de C_0 = 1 verilmelidir; C_0 = 1 unutulursa sonuç 1 eksik çıkar.',
        },
      ],
    },
  },

  'w8-c3': {
    cardId: 'w8-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.6 · Lecture 7 (Slides 9–10)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.6 · Lecture 7 (Slayt 9–10)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (BCD Adder & +6 Correction Logic)',
      },
      body: {
        en: 'A BCD (Decimal) Adder sums two 4-bit BCD digits (each 0–9) plus a decimal carry-in (0 or 1), producing a binary sum Z_8 Z_4 Z_2 Z_1 and carry K between 0 and 19. When the binary sum is ≤ 9 (K = 0 and Z ≤ 1001), the binary result is already valid BCD. Whenever the binary sum exceeds 9 (10–15 with K = 0, or 16–19 with K = 1), adding binary 6 (0110) skips the six unused states (1010–1111), yielding the correct decimal digit in a second 4-bit adder and setting output carry C = 1.',
        tr: 'Onluk (BCD) Toplayıcı, iki adet 4-bit BCD rakamını (0–9) ve bir giriş eldesini (0 veya 1) toplayarak 0 ile 19 arasında bir ikili toplam (K Z_8 Z_4 Z_2 Z_1) üretir. Bu toplam 9\'a eşit veya küçükse sonuç zaten geçerli BCD\'dir. Toplam 9\'dan büyükse (K = 0 iken 10–15, veya K = 1 iken 16–19), geçersiz 6 BCD kodunu (1010–1111) atlamak için ikinci bir 4-bit toplayıcı üzerinden sonuca +6 (0110) eklenir ve onluk çıkış eldesi C = 1 yapılır.',
      },
      formalEquation: 'Correction & Carry-Out Condition: C = K + Z_8·Z_4 + Z_8·Z_2',
    },
    procedure: {
      heading: {
        en: '2-Stage BCD Adder Hardware Procedure',
        tr: 'Adım Adım 2 Aşamalı BCD Toplayıcı Çalışma Kuralları',
      },
      steps: [
        {
          en: '1. Stage 1 (4-Bit Binary Adder): Add the two BCD inputs and C_in to get carry K and 4-bit intermediate sum (Z_8, Z_4, Z_2, Z_1).',
          tr: '1. Aşama (Üst 4-Bit İkili Toplayıcı): İki BCD girişini ve giriş eldesini toplayarak ara elde K ile 4-bit toplamı (Z_8, Z_4, Z_2, Z_1) elde et.',
        },
        {
          en: '2. Correction Detector: Evaluate C = K + Z_8·Z_4 + Z_8·Z_2. Notice C = 1 whenever K = 1 OR (Z_8 = 1 and at least one of Z_4, Z_2 is 1, i.e., 1010..1111).',
          tr: '2. Düzeltme Algılayıcı: C = K + Z_8·Z_4 + Z_8·Z_2 lojiğini hesapla. Bu ifade K = 1 iken (16–19) veya Z ≥ 1010 (10–15) iken 1 olur.',
        },
        {
          en: '3. Stage 2 (Conditional +6 Adder): Feed Z into a second 4-bit binary adder whose other operand is (0 C C 0)_2—so when C = 0 it adds 0000, and when C = 1 it adds 0110 (+6)!',
          tr: '3. Aşama (Koşullu +6 Toplayıcısı): Z sonucunu ikinci 4-bit toplayıcıya ver; ikinci girişe (0 C C 0)_2 bağla—böylece C = 0 iken 0000, C = 1 iken 0110 (+6) eklenir!',
        },
      ],
      table: {
        caption: {
          en: 'Selected Binary Sum vs. Corrected BCD Digit (Mano Table 4.5)',
          tr: 'BCD Toplamada Ara İkili Sonuç ve +6 Düzeltme Tablosu',
        },
        headers: ['Decimal Sum', 'Uncorrected (K Z8 Z4 Z2 Z1)', 'C = K + Z8Z4 + Z8Z2', 'Corrected BCD (C S8 S4 S2 S1)'],
        rows: [
          ['8', '0 1000', '0', '0 1000 (no +6)'],
          ['9', '0 1001', '0', '0 1001 (no +6)'],
          ['10', '0 1010', '1', '1 0000 (+ 0110)'],
          ['12', '0 1100', '1', '1 0010 (+ 0110)'],
          ['16', '1 0000', '1 (via K)', '1 0110 (+ 0110)'],
          ['19', '1 0011', '1 (via K)', '1 1001 (+ 0110)'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked BCD Addition Example: 8 + 9 + 1 = 18',
        tr: 'Adım Adım Çözümlü Örnek: BCD 8 + 9 + 1 (K = 1 Durumu)',
      },
      problem: {
        en: 'Trace the 2-stage BCD adder when adding BCD digits A = 1000 (8), B = 1001 (9), and carry-in C_in = 1.',
        tr: 'A = 1000 (8), B = 1001 (9) BCD rakamları ve C_in = 1 giriş eldesi için 2 aşamalı BCD toplayıcının adımlarını izleyin.',
      },
      steps: [
        {
          en: 'Step 1 — Stage 1 Binary Sum: 1000 + 1001 + 1 = 18 = 1 0010 (so K = 1 and Z_8 Z_4 Z_2 Z_1 = 0010).',
          tr: 'Adım 1 — 1. Aşama İkili Toplam: 1000 + 1001 + 1 = 18 = 1 0010 (yani K = 1, Z = 0010).',
        },
        {
          en: 'Step 2 — Correction Detector: Notice Z_8 = 0, so Z_8·Z_4 + Z_8·Z_2 = 0, BUT K = 1! Therefore C = 1 + 0 = 1.',
          tr: 'Adım 2 — Düzeltme Algılayıcı: Z_8 = 0 olduğu için Z_8·Z_4 + Z_8·Z_2 = 0 çıkar, ANCAK K = 1 olduğu için C = 1 + 0 = 1 olur!',
        },
        {
          en: 'Step 3 — Stage 2 (+6 Correction): Add 0010 + 0110 = 1000 (8) (discarding Stage 2 carry-out, using C = 1 as decimal carry). Result = (0001 1000)_BCD = 18.',
          tr: 'Adım 3 — 2. Aşama (+6 Ekleme): 0010 + 0110 = 1000 (8). Onluk elde C = 1 ile birlikte sonuç (0001 1000)_BCD = 18 olur.',
        },
      ],
      finalAnswer: {
        en: 'Corrected BCD sum = 1000 (8) with decimal carry C = 1 (representing 18).',
        tr: 'Düzeltilmiş BCD rakamı = 1000 (8) ve onluk elde C = 1 (toplam 18).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'If you omit K from C = K + Z_8·Z_4 + Z_8·Z_2, sums 16–19 (like 1 0010 above where Z_8 = 0!) will fail to add +6 and produce completely wrong BCD digits!',
          tr: 'C = K + Z_8·Z_4 + Z_8·Z_2 formülünde K terimini unutursanız 16–19 arası toplamlarda (ör. 18 = 1 0010, Z_8 = 0!) +6 eklenmez ve yanlış BCD rakamı çıkar!',
        },
        {
          en: 'Stage 2 adder\'s own carry-out pin is left unconnected/ignored—the decimal carry is strictly C.',
          tr: 'İkinci 4-bit toplayıcının kendi elde çıkışı kullanılmaz; bir üst basamağa giden onluk elde doğrudan C hattıdır.',
        },
      ],
    },
  },

  'w8-c4': {
    cardId: 'w8-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.7–4.8 · Lecture 7 (Slides 10–16)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.7–4.8 · Lecture 7 (Slayt 10–16)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Binary Multiplier & 4-Bit Magnitude Comparator)',
      },
      body: {
        en: 'A combinational Binary Multiplier mimics paper-and-pencil shift-and-add multiplication: each bit-pair partial product A_i·B_j is formed by an AND gate, and J-bit × K-bit multiplication requires (J × K) AND gates and (J − 1) K-bit adders to generate a (J + K)-bit product. Meanwhile, a Magnitude Comparator compares two unsigned numbers A and B from MSB down to LSB: bitwise equality x_i = A_i·B_i + A_i\'·B_i\' (XNOR) checks whether bit pair i matches, allowing A = B, A > B, and A < B to be computed algorithmically without a 2^(2n)-row truth table.',
        tr: 'Birleşik İkili Çarpıcı (Binary Multiplier), kağıt-kalem çarpmasındaki kısmi çarpımları AND kapılarıyla üretip kaydırarak toplayıcılarla toplar; J-bitlik çarpan ile K-bitlik çarpılan için (J × K) adet AND kapısı ve (J − 1) adet K-bitlik toplayıcı kullanılarak (J + K)-bit çarpım elde edilir. Büyüklük Karşılaştırıcı (Magnitude Comparator) ise iki sayıyı en anlamlı bitten (MSB) başlayarak aşağı doğru inceler; her bit çiftinin eşitliğini x_i = A_i·B_i + A_i\'·B_i\' (XNOR) ile denetleyerek 2^(2n) satırlık dev doğruluk tablosuna gerek kalmadan A = B, A > B ve A < B çıkışlarını üretir.',
      },
      formalEquation: 'Multiplier: (J×K) ANDs, (J−1) K-bit Adders   |   Comparator: (A=B) = x_3·x_2·x_1·x_0',
    },
    procedure: {
      heading: {
        en: 'Multiplier Sizing & MSB-First Comparator Rules',
        tr: 'Adım Adım Çarpıcı Boyutlandırma ve Karşılaştırıcı Kuralları',
      },
      steps: [
        {
          en: '1. Multiplier Gate Count: For J multiplier bits (B) and K multiplicand bits (A), multiply each bit pair with J × K AND gates; sum rows using (J − 1) K-bit binary adders (for 2×2, two Half Adders suffice).',
          tr: '1. Çarpıcı Bileşen Hesabı: J bit çarpan ve K bit çarpılan için J × K adet AND kapısı ile tüm kısmi çarpımları kur; (J − 1) adet K-bit toplayıcı ile satırları topla (2×2 çarpıcıda 2 Half Adder yeterlidir).',
        },
        {
          en: '2. Comparator Equality: Define x_i = (A_i ⊙ B_i) = A_i·B_i + A_i\'·B_i\'. A = B holds iff all bit pairs match: x_3·x_2·x_1·x_0 = 1.',
          tr: '2. Bit Eşitliği x_i: Her i biti için x_i = A_i·B_i + A_i\'·B_i\' (XNOR) tanımla. (A = B) yalnızca x_3·x_2·x_1·x_0 = 1 iken 1 olur.',
        },
        {
          en: '3. Comparator Inequality (MSB to LSB): A > B holds if A_3 > B_3 (A_3·B_3\'), OR if bit 3 matches (x_3=1) and A_2 > B_2, OR bits 3,2 match and A_1 > B_1, OR bits 3,2,1 match and A_0 > B_0.',
          tr: '3. Büyüklük Karşılaştırma (MSB → LSB): A > B koşulu en sol bitten başlar: A_3·B_3\' + x_3·A_2·B_2\' + x_3·x_2·A_1·B_1\' + x_3·x_2·x_1·A_0·B_0\'.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked 4×3 Multiplier Sizing & 4-Bit Comparator Trace',
        tr: 'Adım Adım Çözümlü Örnek: 4×3 Çarpıcı Maliyeti ve Karşılaştırıcı İzleme',
      },
      problem: {
        en: '(a) Determine the number of AND gates, 4-bit adders, and product output bits for a 4-bit multiplicand (B_3..B_0) × 3-bit multiplier (A_2..A_0) (Mano Fig. 4.16). (b) Trace A = 1011 vs B = 1001 in a 4-bit comparator.',
        tr: '(a) 4-bit çarpılan (B_3..B_0) × 3-bit çarpan (A_2..A_0) ikili çarpıcısı için gereken AND kapısı, 4-bit toplayıcı ve çıkış biti sayılarını bulunuz (Mano Şekil 4.16). (b) A = 1011 ve B = 1001 için 4-bit karşılaştırıcıyı çözünüz.',
      },
      steps: [
        {
          en: 'Part (a) Sizing: K = 4, J = 3 → Partial-product AND gates = 4 × 3 = 12 AND gates. Number of 4-bit adders = J − 1 = 2 adders. Output product width = 4 + 3 = 7 bits (C_6..C_0).',
          tr: 'Kısım (a) Hesap: K = 4, J = 3 → 4 × 3 = 12 AND kapısı, J − 1 = 2 adet 4-bit toplayıcı ve 4 + 3 = 7 çıkış biti (C_6..C_0) gerekir.',
        },
        {
          en: 'Part (b) Bitwise XNOR for A=1011, B=1001: bit 3 (1,1)→x_3=1; bit 2 (0,0)→x_2=1; bit 1 (1,0)→x_1=0; bit 0 (1,1)→x_0=1.',
          tr: 'Kısım (b) XNOR Değerleri: x_3 = 1 (1=1), x_2 = 1 (0=0), x_1 = 0 (1≠0), x_0 = 1 (1=1).',
        },
        {
          en: 'Part (b) Evaluate Outputs: (A=B) = 1·1·0·1 = 0. In (A>B), term x_3·x_2·A_1·B_1\' = 1·1·1·1 = 1 → (A > B) = 1 and (A < B) = 0 (11 > 9).',
          tr: 'Kısım (b) Çıkışlar: (A=B) = 0. (A>B) denkleminde x_3·x_2·A_1·B_1\' = 1·1·1·1 = 1 olduğundan (A > B) = 1, (A < B) = 0 (11 > 9).',
        },
      ],
      finalAnswer: {
        en: '(a) 12 AND gates, two 4-bit adders, 7-bit product;   (b) A>B = 1, A=B = 0, A<B = 0.',
        tr: '(a) 12 AND kapısı, 2 adet 4-bit toplayıcı, 7-bit çıkış;   (b) A>B = 1, A=B = 0, A<B = 0.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Always inspect bit 3 down to bit 0 in comparator problems—many students mistakenly write A_0·B_0\' without the x_3·x_2·x_1 prefix, letting LSBs override MSBs!',
          tr: 'Karşılaştırıcı denklemlerinde düşük basamakların önüne mutlaka x_3·x_2·… eşitlik şartlarını ekleyin; aksi halde LSB MSB\'yi ezer!',
        },
        {
          en: 'Note that the standard 4-bit comparator in Mano Sec. 4.8 compares UNSIGNED binary numbers; signed 2\'s complement numbers require inverting sign-bit comparison.',
          tr: 'Mano Bölüm 4.8\'deki standart karşılaştırıcı işaretsiz (unsigned) ikili sayılar içindir.',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 9 — Lecture 8: Decoders, Encoders & Multiplexers (Sec. 4.9 - 4.11)
  // =========================================================================
  'w9-c1': {
    cardId: 'w9-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.9 · Lecture 8 (Slides 1–6)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.9 · Lecture 8 (Slayt 1–6)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Decoders, Demultiplexers & Function Synthesis)',
      },
      body: {
        en: 'An n-to-2^n Line Decoder converts an n-bit binary input code into 2^n mutually exclusive output lines, each generating one canonical minterm m_0 through m_(2^n−1). Adding an Enable input allows cascading smaller decoders into larger ones (such as building a 4×16 decoder from two 3×8 decoders) and lets the decoder operate identically as a 1-to-2^n Demultiplexer (DEMUX), where the Enable pin carries the serial data input and the n select lines route it to one chosen output. Because a decoder produces all 2^n minterms, any n-variable Boolean function can be realized by ORing the minterm lines where F = 1 (or using an external NAND gate with an active-low NAND decoder).',
        tr: 'n-to-2^n Kod Çözücü (Decoder), n-bitlik ikili giriş kodunu birbirinden ayrık 2^n çıkış hattına çözer; her çıkış tam olarak bir kanonik minterm (m_0 … m_(2^n−1)) üretir. Enable (E) girişi eklendiğinde birden fazla küçük decoder birleştirilerek daha büyük decoder kurulabilir (ör. iki 3×8 decoder ile 4×16 yapımı) ve devre doğrudan 1-to-2^n Demultiplexer (DEMUX) olarak çalışır (veri girişi E ucuna, adres ise seçme uçlarına verilir). Decoder tüm mintermleri ürettiği için herhangi bir n değişkenli Boole fonksiyonu, F = 1 olan minterm çıkışlarını harici bir OR kapısına (veya aktif-0 NAND decoder kullanılıyorsa harici NAND kapısına) bağlayarak gerçekleştirilir.',
      },
      formalEquation: 'Active-High Decoder + External OR (for F=1)   ≡   Active-Low NAND Decoder + External NAND',
    },
    procedure: {
      heading: {
        en: 'Implementing Boolean Functions & Expanding Decoders',
        tr: 'Adım Adım Decoder ile Fonksiyon Kurma ve Decoder Genişletme',
      },
      steps: [
        {
          en: '1. Express Function as Sum of Minterms: Find F = ∑ m(…) in n variables.',
          tr: '1. Fonksiyonu Minterm Toplamı Yaz: Fonksiyonu n değişkenli F = ∑ m(…) biçimine getir.',
        },
        {
          en: '2. Choose External Gate by Decoder Polarity & Minterm Count: For active-high outputs, wire active minterms to an OR gate (if > 2^(n−1) minterms, wire the 0-minterms of F\' to a NOR gate to use fewer inputs!). For active-low (NAND) decoders, wire active minterms to an external NAND gate.',
          tr: '2. Çıkış Polaritesine Göre Harici Kapı Seç: Aktif-1 decoder\'da F = 1 mintermlerini OR kapısına bağla (1 sayısı 2^(n−1)\'den fazlaysa F\' mintermlerini NOR kapısına bağlamak daha ekonomiktir!). Aktif-0 (NAND) decoder\'da ise aktif mintermleri harici NAND kapısına bağla.',
        },
        {
          en: '3. Expand 3×8 to 4×16 via MSB w: Connect MSB w directly to the lower decoder\'s Enable and w\' (inverted) to the upper decoder\'s Enable.',
          tr: '3. İki 3×8 ile 4×16 Kurulumu: En anlamlı bit w\'yi tersleyip üst 3×8\'in Enable ucuna (m_0..m_7), düz halini alt 3×8\'in Enable ucuna (m_8..m_15) bağla.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Example: Full Adder Using a 3-to-8 Decoder (Mano Ex. 4.1 / Lecture 8)',
        tr: 'Adım Adım Çözümlü Örnek: 3×8 Decoder ile Tam Toplayıcı (Mano Örn. 4.1)',
      },
      problem: {
        en: 'Implement a Full Adder (inputs x, y, z; outputs Sum S and Carry C) using a single 3-to-8 line decoder and two external OR gates.',
        tr: 'Bir adet 3-to-8 Decoder ve iki harici OR kapısı kullanarak Tam Toplayıcı (girişler x, y, z; çıkışlar S ve C) devresini tasarlayınız.',
      },
      steps: [
        {
          en: 'Step 1 — Write Canonical Minterms from Truth Table: Sum S(x,y,z) = ∑(1, 2, 4, 7); Carry C(x,y,z) = ∑(3, 5, 6, 7).',
          tr: 'Adım 1 — Doğruluk Tablosundan Mintermleri Yaz: S(x,y,z) = ∑(1, 2, 4, 7) ve C(x,y,z) = ∑(3, 5, 6, 7).',
        },
        {
          en: 'Step 2 — Connect Decoder Inputs: Wire x, y, z to the 3 decoder inputs (so outputs D_0..D_7 generate m_0..m_7).',
          tr: 'Adım 2 — Girişleri Bağla: x, y, z sinyallerini decoder girişlerine bağla (çıkışlar D_0..D_7 sırasıyla m_0..m_7 olur).',
        },
        {
          en: 'Step 3 — Wire External OR Gates: Connect {D_1, D_2, D_4, D_7} to OR gate 1 for S, and {D_3, D_5, D_6, D_7} to OR gate 2 for C.',
          tr: 'Adım 3 — Harici OR Kapılarını Bağla: S için {D_1, D_2, D_4, D_7} hatlarını 1. OR kapısına, C için {D_3, D_5, D_6, D_7} hatlarını 2. OR kapısına bağla.',
        },
      ],
      finalAnswer: {
        en: 'S = D_1 + D_2 + D_4 + D_7   |   C = D_3 + D_5 + D_6 + D_7 (one 3×8 decoder + two 4-input OR gates).',
        tr: 'S = D_1 + D_2 + D_4 + D_7   |   C = D_3 + D_5 + D_6 + D_7 (1 adet 3×8 decoder + 2 adet OR kapısı).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'When the decoder is built with NAND gates (active-low outputs, like commercial 74LS138), using an external OR gate produces F\' instead of F! You MUST use an external NAND gate (for ∑m of F) or AND gate (for ∑m of F\').',
          tr: 'Ticari NAND decoder\'larda (aktif-0 çıkışlı, ör. 74LS138) harici OR kapısı kullanırsanız F yerine F\' elde edersiniz! Aktif-0 decoder\'da F = 1 mintermlerini mutlaka harici NAND kapısına bağlayın.',
        },
        {
          en: 'In a DEMUX configuration, remember that the data signal goes to the ENABLE input while the destination address goes to the select inputs.',
          tr: 'DEMUX kullanımında veri sinyalinin Enable (E) ucuna, hedef adresin ise seçme uçlarına bağlandığını unutmayın.',
        },
      ],
    },
  },

  'w9-c2': {
    cardId: 'w9-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.10 · Lecture 8 (Slides 6–8)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.10 · Lecture 8 (Slayt 6–8)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Encoders & Priority Encoder)',
      },
      body: {
        en: 'An Encoder performs the inverse operation of a decoder: it takes 2^n (or fewer) input lines and outputs an n-bit binary code identifying which input is 1. Because a plain encoder fails if two inputs are active simultaneously AND cannot distinguish "all inputs 0" (0000) from "D_0 = 1" (0001)—both yielding output 00—practical hardware uses a Priority Encoder. A Priority Encoder enforces a strict subscript hierarchy (D_3 > D_2 > D_1 > D_0) and adds a Valid indicator V = 1 whenever at least one input line is active.',
        tr: 'Kodlayıcı (Encoder), Decoder\'ın tersi işlevi görerek 2^n girişten aktif olanın numarasını n-bitlik ikili koda çevirir. Standart kodlayıcıların iki büyük kısıtı vardır: aynı anda iki giriş 1 olursa bozuk kod üretir ve "hiçbir giriş aktif değil" (0000) ile "D_0 = 1" (0001) durumlarını ayırt edemez (ikisi de çıkışta 00 verir). Bu iki sorunu çözen Öncelikli Kodlayıcı (Priority Encoder), yüksek indeksli girişe öncelik verir (D_3 > D_2 > D_1 > D_0) ve en az bir giriş 1 ise Valid biti V = 1 üretir.',
      },
      formalEquation: '4-Input Priority Encoder: x = D_2 + D_3,   y = D_3 + D_1·D_2\',   V = D_0 + D_1 + D_2 + D_3',
    },
    procedure: {
      heading: {
        en: 'Deriving Priority Encoder Equations via Truth Table & K-Maps',
        tr: 'Adım Adım Öncelikli Kodlayıcı Denklemlerini Çıkarma',
      },
      steps: [
        {
          en: '1. Build Compact Priority Truth Table: Write highest-priority active bit as 1 and all lower-subscript bits as X (don\'t-care). For 0000, set x = X, y = X, V = 0.',
          tr: '1. Kompakt Öncelik Tablosu Kur: Öncelikli yüksek biti 1, alt indeksli tüm bitleri X (don\'t-care) yaz. 0000 satırında x = X, y = X, V = 0 belirle.',
        },
        {
          en: '2. Expand X-Rows to 4-Variable K-Maps: Notice D_3 = 1 expands to 8 minterms (8..15), D_2 = 1 (with D_3=0) to 4 minterms (4..7), D_1 = 1 (with D_3=D_2=0) to 2 minterms (2, 3).',
          tr: '2. 4 Değişkenli K-Map\'e Aç: D_3 = 1 iken m_8..m_15 (8 hücre), D_3=0,D_2=1 iken m_4..m_7 (4 hücre), D_3=D_2=0,D_1=1 iken m_2,m_3 (2 hücre) dolar.',
        },
        {
          en: '3. Simplify x, y, and V: x groups rows 4–7 and 8–15 → x = D_2 + D_3; y groups 8–15 and overlaps {2,3,10,11} → y = D_3 + D_1·D_2\'; V = D_0 + D_1 + D_2 + D_3.',
          tr: '3. K-Map\'ten Sadeleştir: x = D_2 + D_3; y = D_3 + D_1·D_2\' ({2,3} ile {10,11} birleşir!); V = D_0 + D_1 + D_2 + D_3.',
        },
      ],
      table: {
        caption: {
          en: '4-Input Priority Encoder Truth Table (Mano Table 4.8)',
          tr: '4-Girişli Öncelikli Kodlayıcı Doğruluk Tablosu (Mano Tablo 4.8)',
        },
        headers: ['D_3', 'D_2', 'D_1', 'D_0', 'x (MSB)', 'y (LSB)', 'V (Valid)'],
        rows: [
          ['0', '0', '0', '0', 'X', 'X', '0'],
          ['0', '0', '0', '1', '0', '0', '1'],
          ['0', '0', '1', 'X', '0', '1', '1'],
          ['0', '1', 'X', 'X', '1', '0', '1'],
          ['1', 'X', 'X', 'X', '1', '1', '1'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Priority Test: Simultaneous Inputs (D_3..D_0) = 0101 and 0000',
        tr: 'Adım Adım Çözümlü Örnek: Eşzamanlı Girişlerde Öncelik ve Valid Testi',
      },
      problem: {
        en: 'Evaluate (x, y, V) for input patterns (a) D_3 D_2 D_1 D_0 = 0101 (both D_2 and D_0 active) and (b) 0000.',
        tr: '(a) D_3 D_2 D_1 D_0 = 0101 (hem D_2 hem D_0 aktif) ve (b) 0000 girişleri için (x, y, V) çıkışlarını hesaplayınız.',
      },
      steps: [
        {
          en: 'Case (a) 0101 (D_3=0, D_2=1, D_1=0, D_0=1): x = D_2 + D_3 = 1 + 0 = 1; y = D_3 + D_1·D_2\' = 0 + 0·0 = 0; V = 0 + 1 + 0 + 1 = 1.',
          tr: 'Durum (a) 0101: x = 1 + 0 = 1; y = 0 + 0·0 = 0; V = 1.',
        },
        {
          en: 'Interpret Case (a): Output xy = 10 (code 2), confirming D_2 wins priority over D_0, and V = 1 confirms validity.',
          tr: 'Yorum (a): Çıkış xy = 10 (yani 2) çıkar; D_2 önceliği kazanıp D_0\'ı bastırmıştır.',
        },
        {
          en: 'Case (b) 0000: x = 0, y = 0, and V = 0. Because V = 0, downstream logic knows NO input is active (unlike D_0 = 1 where xy = 00 and V = 1).',
          tr: 'Durum (b) 0000: x = 0, y = 0 ve V = 0. V = 0 olması alıcıya hiçbir girişin aktif olmadığını bildirir (D_0 = 1 iken xy = 00 ama V = 1 olur).',
        },
      ],
      finalAnswer: {
        en: '(a) 0101 → (x, y, V) = (1, 0, 1);   (b) 0000 → (x, y, V) = (0, 0, 0).',
        tr: '(a) 0101 → (x, y, V) = (1, 0, 1);   (b) 0000 → (x, y, V) = (0, 0, 0).',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Notice D_0 does NOT appear in x or y at all! D_0 only contributes to V = D_0 + D_1 + D_2 + D_3 (because when only D_0 = 1, x = y = 0).',
          tr: 'x ve y denklemlerinde D_0 hiç geçmez! D_0 yalnızca Valid çıkışında (V = D_0 + D_1 + D_2 + D_3) yer alır.',
        },
        {
          en: 'Watch the bit order when reading Priority Encoder problems: check whether D_3 or D_0 is assigned highest priority in the question prompt.',
          tr: 'Sınav sorularında en yüksek önceliğin D_3\'e mi yoksa D_0\'a mı verildiğini mutlaka kontrol edin (Mano\'da en büyük indis D_3 önceliklidir).',
        },
      ],
    },
  },

  'w9-c3': {
    cardId: 'w9-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.11 · Lecture 8 (Slides 8–12)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.11 · Lecture 8 (Slayt 8–12)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Multiplexers & Function Synthesis)',
      },
      body: {
        en: 'A Multiplexer (MUX, data selector) routes binary data from one of 2^n data input lines (I_0 … I_(2^n−1)) to a single output line Y under the control of n selection lines. Internally, a 2^n-to-1 MUX is simply an n-to-2^n decoder whose minterm outputs are ANDed with I_k and summed inside an internal OR gate. Crucially, any n-variable Boolean function can be implemented with half the select lines—using a 2^(n−1)-to-1 MUX—by wiring the first (n − 1) variables to the select inputs and expressing each data input I_k in terms of the single remaining variable (0, 1, D, or D\').',
        tr: 'Çoklayıcı (Multiplexer - MUX), n adet seçme hattı (select lines) kullanarak 2^n adet veri girişinden (I_0 … I_(2^n−1)) birini seçip tek çıkışa (Y) yönlendiren veri seçicidir. Yapısal olarak bir n-to-2^n Decoder ile birleşik OR kapısının birleşimidir. Bu özellik sayesinde n değişkenli herhangi bir Boole fonksiyonu, n−1 seçme girişli bir 2^(n−1)-to-1 MUX ile kolayca kurulabilir: ilk (n − 1) değişken seçme uçlarına bağlanır ve her I_k veri girişine son değişkenin durumuna göre 0, 1, D veya D\' verilir.',
      },
      formalEquation: 'n-var Function → 2^(n−1)-to-1 MUX: Select = first (n−1) vars; Data I_k ∈ {0, 1, last_var, last_var\'}',
    },
    procedure: {
      heading: {
        en: '4-Step MUX Function Implementation Table Method (Mano Sec. 4.11)',
        tr: 'Adım Adım Pratik MUX Tablo Yöntemi (Mano Sec. 4.11)',
      },
      steps: [
        {
          en: '1. Assign Select Lines: Connect the first (n − 1) variables (e.g., A, B, C for 4 variables) to select pins S_2, S_1, S_0 of an 8-to-1 MUX.',
          tr: '1. Seçme Uçlarını Bağla: İlk (n − 1) değişkeni (4 değişkende A, B, C) 8-to-1 MUX\'un S_2, S_1, S_0 seçme uçlarına bağla.',
        },
        {
          en: '2. Pair Truth Table Rows: Partition the 2^n truth table into 2^(n−1) consecutive pairs corresponding to I_0, I_1, … (where the last variable D takes 0 in the top row and 1 in the bottom row).',
          tr: '2. Satırları İkili Çiftlere Böl: Doğruluk tablosunu I_0, I_1, … girişlerine karşılık gelen ardışık 2\'li satır çiftlerine ayır (üst satır D=0, alt satır D=1).',
        },
        {
          en: '3. Apply the 4-Case Rule to Each Pair (F when D=0, F when D=1): (0, 0) → I_k = 0; (1, 1) → I_k = 1; (0, 1) → I_k = D; (1, 0) → I_k = D\'.',
          tr: '3. Her Çiftte I_k Değerini Belirle: (D=0, D=1) ikilisine göre F değerleri: (0,0) → 0; (1,1) → 1; (0,1) → D; (1,0) → D\'.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked 4-Var Function on 8-to-1 MUX (Mano Ex. & Lecture 8, Example 2)',
        tr: 'Adım Adım Çözümlü Örnek: 8×1 MUX İle 4 Değişkenli Fonksiyon (Lecture 8, Örnek 2)',
      },
      problem: {
        en: 'Implement F(A, B, C, D) = ∑(1, 3, 4, 11, 12, 13, 14, 15) using an 8-to-1 Multiplexer with A, B, C on select lines S_2, S_1, S_0.',
        tr: 'F(A, B, C, D) = ∑(1, 3, 4, 11, 12, 13, 14, 15) fonksiyonunu A, B, C seçme uçlu 8-to-1 MUX ile gerçekleştiriniz.',
      },
      steps: [
        {
          en: 'Step 1 — Check Pairs I_0..I_3 (A = 0):\n  • I_0 (m_0=0, m_1=1) → (0, 1) → D\n  • I_1 (m_2=0, m_3=1) → (0, 1) → D\n  • I_2 (m_4=1, m_5=0) → (1, 0) → D\'\n  • I_3 (m_6=0, m_7=0) → (0, 0) → 0.',
          tr: 'Adım 1 — I_0..I_3 Çiftleri (A = 0):\n  • I_0 (m_0=0, m_1=1) → D\n  • I_1 (m_2=0, m_3=1) → D\n  • I_2 (m_4=1, m_5=0) → D\'\n  • I_3 (m_6=0, m_7=0) → 0.',
        },
        {
          en: 'Step 2 — Check Pairs I_4..I_7 (A = 1):\n  • I_4 (m_8=0, m_9=0) → (0, 0) → 0\n  • I_5 (m_10=0, m_11=1) → (0, 1) → D\n  • I_6 (m_12=1, m_13=1) → (1, 1) → 1\n  • I_7 (m_14=1, m_15=1) → (1, 1) → 1.',
          tr: 'Adım 2 — I_4..I_7 Çiftleri (A = 1):\n  • I_4 (m_8=0, m_9=0) → 0\n  • I_5 (m_10=0, m_11=1) → D\n  • I_6 (m_12=1, m_13=1) → 1\n  • I_7 (m_14=1, m_15=1) → 1.',
        },
      ],
      table: {
        caption: {
          en: 'MUX Input Mapping for F(A, B, C, D) = ∑(1, 3, 4, 11, 12, 13, 14, 15)',
          tr: 'F(A, B, C, D) = ∑(1, 3, 4, 11, 12, 13, 14, 15) için MUX Veri Girişleri',
        },
        headers: ['Select (A B C)', 'Minterm Pair (D=0, D=1)', 'F Values', 'MUX Input'],
        rows: [
          ['0 0 0', 'm_0, m_1', '0, 1', 'I_0 = D'],
          ['0 0 1', 'm_2, m_3', '0, 1', 'I_1 = D'],
          ['0 1 0', 'm_4, m_5', '1, 0', "I_2 = D'"],
          ['0 1 1', 'm_6, m_7', '0, 0', 'I_3 = 0'],
          ['1 0 0', 'm_8, m_9', '0, 0', 'I_4 = 0'],
          ['1 0 1', 'm_10, m_11', '0, 1', 'I_5 = D'],
          ['1 1 0', 'm_12, m_13', '1, 1', 'I_6 = 1'],
          ['1 1 1', 'm_14, m_15', '1, 1', 'I_7 = 1'],
        ],
      },
      finalAnswer: {
        en: "Connect S_2 S_1 S_0 = A B C; wire I_0=I_1=I_5=D, I_2=D', I_3=I_4=0, I_6=I_7=1.",
        tr: "S_2 S_1 S_0 = A B C seçme uçlarına karşılık I_0=I_1=I_5=D, I_2=D', I_3=I_4=0, I_6=I_7=1 bağlanır.",
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'If a non-LSB variable (like A instead of D) is kept as the data variable, the two rows sharing (B, C, D) are separated by 8 rows instead of being consecutive! Always use the MUX implementation table carefully.',
          tr: 'Seçme uçlarına son değişken dışındaki bir kombinasyon (ör. B, C, D) bağlanırsa A=0 ve A=1 satırları alt alta değil 8 satır aralıklı olur; eşleştirme tablosunu satır numaralarına göre dikkatle kurun.',
        },
        {
          en: 'Verify MSB order on select pins: S_2 = A, S_1 = B, S_0 = C.',
          tr: 'Seçme pinlerinde en anlamlı bit sırasını (S_2 = A, S_1 = B, S_0 = C) ters bağlamamaya özen gösterin.',
        },
      ],
    },
  },

  'w9-c4': {
    cardId: 'w9-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 4.11 · Lecture 8 (Slides 13–14)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 4.11 · Lecture 8 (Slayt 13–14)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Three-State Gates & Shared Bus Systems)',
      },
      body: {
        en: 'A three-state (tri-state) gate exhibits three output conditions instead of two: Logic-0, Logic-1, and a High-Impedance state (Hi-Z), which behaves electrically like an open circuit that disconnects the output driver from the wire. Most commonly built as a three-state buffer with data input A and control input C, the buffer drives Y = A when C = 1 and enters Hi-Z when C = 0. Because Hi-Z outputs float without driving current, multiple three-state buffers can safely share a single common bus line or implement large multiplexers—provided only ONE buffer is enabled at a time.',
        tr: 'Üç durumlu kapı (three-state / tri-state gate), klasik Lojik-0 ve Lojik-1 çıkışlarına ek olarak üçüncü bir durum olan Yüksek Empedans (High-Impedance / Hi-Z) durumuna sahiptir; Hi-Z durumunda çıkış elektriksel olarak açık devre gibi davranarak kapıyı hattan ayırır. En yaygın biçimi olan üç durumlu tamponda (three-state buffer) kontrol girişi C = 1 iken çıkış Y = A olur, C = 0 iken çıkış Hi-Z durumuna geçer. Bu sayede aynı anda YALNIZCA BİR tampon etkinleştirilmek şartıyla birden çok kaynak tek bir ortak veri yolunu (shared bus) kısa devre olmadan paylaşabilir.',
      },
      formalEquation: 'C = 1  ⇒  Y = A (active drive)   |   C = 0  ⇒  Y = Hi-Z (open circuit)',
    },
    procedure: {
      heading: {
        en: 'Shared Bus Arbitration & Multiplexing Rules',
        tr: 'Adım Adım Ortak Veri Yolu (Shared Bus) ve Çakışma Önleme Kuralları',
      },
      steps: [
        {
          en: '1. Enforce Mutual Exclusion on Enable Controls: Drive buffer control pins C_0, C_1, … with a decoder (e.g., 2-to-4 decoder or inverter pair S, S\') so at most ONE buffer has C_k = 1 at any instant.',
          tr: '1. Kontrol Sinyallerini Ayrık Tut: Tamponların kontrol uçlarını (C_0, C_1, …) bir Decoder veya tersleyici çiftiyle (S ve S\') sür ki aynı anda en fazla BİR tampon aktif olsun.',
        },
        {
          en: '2. Avoid Bus Contention: Never allow two enabled three-state buffers driving opposite levels (one 1, one 0) onto the same wire—that creates a destructive V_DD-to-GND short circuit (bus contention).',
          tr: '2. Bus Contention (Veri Yolu Çakışması) Riskini Önle: Aynı anda iki tampon C=1 olup biri 1 diğeri 0 sürerse V_DD–GND kısa devresi ve kararsız voltaj oluşur.',
        },
        {
          en: '3. Build Bus Multiplexers: Connect 2^n three-state buffers to a common output wire Y and decode n select lines to enable the selected channel.',
          tr: '3. Tri-State MUX Kurulumu: 2^n adet tamponun çıkışlarını aynı Y hattında birleştirip seçme hatlarını bir n×2^n Decoder üzerinden kontrol uçlarına ver.',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Example: 4-to-1 Multiplexer Using Three-State Buffers (Mano Fig. 4.30)',
        tr: 'Adım Adım Çözümlü Örnek: Üç Durumlu Tamponlarla 4×1 MUX (Mano Şekil 4.30)',
      },
      problem: {
        en: 'Explain how a 2-to-4 decoder (enabled by EN) and four three-state buffers realize a 4-to-1 MUX with output Y, and trace Y when (S_1, S_0) = (1, 0), EN = 1, and I = (0, 1, 0, 1).',
        tr: 'Enable uçlu bir 2-to-4 Decoder ve dört adet üç durumlu tamponun ortak Y hattı üzerinde nasıl 4×1 MUX oluşturduğunu açıklayın; EN = 1, (S_1, S_0) = (1, 0) ve (I_3, I_2, I_1, I_0) = (0, 1, 0, 1) için Y çıkışını bulun.',
      },
      steps: [
        {
          en: 'Step 1 — Decoder Enable Outputs: With EN = 1 and (S_1, S_0) = (1, 0) = 2, the 2-to-4 decoder outputs (D_3, D_2, D_1, D_0) = (0, 1, 0, 0).',
          tr: 'Adım 1 — Decoder Çıkışları: EN = 1 ve (S_1, S_0) = (1, 0) = 2 olduğundan 2×4 decoder yalnızca D_2 = 1 üretir: (D_3, D_2, D_1, D_0) = (0, 1, 0, 0).',
        },
        {
          en: 'Step 2 — Buffer States: Buffers 0, 1, and 3 receive C = 0 → all three enter Hi-Z (open circuit). Only Buffer 2 receives C = 1, driving Y = I_2 = 1 cleanly onto the shared bus.',
          tr: 'Adım 2 — Tampon Durumları: 0, 1 ve 3 numaralı tamponlar C = 0 ile Hi-Z (açık devre) olur; yalnızca 2 numaralı tampon etkinleşerek Y = I_2 = 1 değerini hatta aktarır.',
        },
        {
          en: 'Step 3 — Disabled Case (EN = 0): All decoder outputs drop to 0, placing all four buffers into Hi-Z simultaneously so external modules can drive the shared bus.',
          tr: 'Adım 3 — Devre Dışı Durumu (EN = 0): Decoder çıkışlarının tümü 0 olur ve 4 tampon birden Hi-Z konumuna geçerek hattı başka birimlere bırakır.',
        },
      ],
      finalAnswer: {
        en: 'When EN = 1 and S_1 S_0 = 10, Buffer 2 drives Y = I_2 = 1 while Buffers 0, 1, 3 are Hi-Z.',
        tr: 'EN = 1 ve S_1 S_0 = 10 iken yalnızca 2. tampon hattı sürer (Y = I_2 = 1), diğer üçü Hi-Z durumundadır.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Hi-Z is NOT Logic-0! Logic-0 actively sinks current to ground (0 V), whereas Hi-Z disconnects the pin completely.',
          tr: 'Hi-Z kesinlikle Lojik-0 demek değildir! Lojik-0 hattı aktif olarak 0 V\'a çekerken, Hi-Z pini hattan fiziksel olarak koparır.',
        },
        {
          en: 'Standard AND/OR/NAND gates cannot be wired together at their outputs—only three-state (or open-collector) outputs can safely share a bus wire.',
          tr: 'Standart lojik kapıların çıkışları asla doğrudan aynı kabloya bağlanamaz; ortak veri yolu paylaşımı için mutlaka üç durumlu çıkışlar gerekir.',
        },
      ],
    },
  },

  // =========================================================================
  // WEEK 10 — Lecture 9: Latches & Flip-Flops (Sec. 5.1 - 5.4)
  // =========================================================================
  'w10-c1': {
    cardId: 'w10-c1',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.1–5.3 · Lecture 9 (Slides 1–8)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.1–5.3 · Lecture 9 (Slayt 1–8)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (SR Latch & Transparent D Latch)',
      },
      body: {
        en: 'A Latch is a level-sensitive binary storage element constructed from cross-coupled NOR or NAND gates forming a regenerative feedback loop. In an active-high NOR SR Latch, S = 1 sets Q = 1, R = 1 resets Q = 0, S = R = 0 holds the stored bit, and S = R = 1 is forbidden (forcing Q = Q\' = 0 and causing an unpredictable race condition if released simultaneously). The gated D Latch solves the indeterminate state by driving S = D and R = D\' gated by Enable C; however, while C = 1, Q continuously follows D ("transparent"), making plain latches unsafe inside clocked feedback loops.',
        tr: 'Mandal (Latch), çapraz bağlı NOR veya NAND kapılarının geri besleme döngüsüyle oluşturulan seviye duyarlı (level-triggered) 1-bitlik bellek elemanıdır. Aktif-1 NOR SR Latch devresinde S = 1 çıkışı 1 yapar (Set), R = 1 çıkışı 0 yapar (Reset), S = R = 0 mevcut durumu saklar; S = R = 1 ise hem Q = 0 hem Q\' = 0 yaptığı için yasaktır. Kapılı D Latch (Gated D Latch), R = S\' bağlantısıyla bu yasak durumu ortadan kaldırır; ancak kontrol ucu C = 1 olduğu sürece çıkış Q giriş D\'yi anlık olarak izlediği (şeffaf / transparent) için doğrudan saatli geri besleme devrelerinde güvenle kullanılamaz.',
      },
      formalEquation: 'NOR SR Forbidden: S=1, R=1   |   NAND S\'R\' Forbidden: S\'=0, R\'=0   |   D Latch (C=1): Q(t+1) = D',
    },
    procedure: {
      heading: {
        en: 'SR Latch & Gated D Latch Operation Rules',
        tr: 'Adım Adım SR ve D Latch Çalışma Kuralları',
      },
      steps: [
        {
          en: '1. NOR SR Latch (Active-High): (0,0) → Hold Q; (0,1) → Reset Q=0; (1,0) → Set Q=1; (1,1) → Invalid (Q=Q\'=0).',
          tr: '1. NOR SR Latch (Aktif-1): (0,0) → Koru; (0,1) → Reset (Q=0); (1,0) → Set (Q=1); (1,1) → Yasak (Q=Q\'=0).',
        },
        {
          en: '2. NAND S\'-R\' Latch (Active-Low): Inputs invert! (1,1) → Hold Q; (1,0) → Reset Q=0; (0,1) → Set Q=1; (0,0) → Invalid (Q=Q\'=1).',
          tr: '2. NAND S\'-R\' Latch (Aktif-0): Girişler ters çalışır! (1,1) → Koru; (1,0) → Reset (Q=0); (0,1) → Set (Q=1); (0,0) → Yasak (Q=Q\'=1).',
        },
        {
          en: '3. Gated D Latch: When Enable C = 0, both internal NAND outputs stay 1, holding Q regardless of D; when C = 1, Q immediately mirrors every change on D.',
          tr: '3. Kapılı D Latch: C = 0 iken mandal kilitlidir ve D değişse bile Q değişmez; C = 1 olduğu sürece D değişimleri anında Q\'ya yansır.',
        },
      ],
      table: {
        caption: {
          en: 'NOR SR Latch vs. NAND S\'-R\' Latch Function Tables (Mano Fig. 5.3–5.4)',
          tr: 'NOR ve NAND SR Latch Karşılaştırma Tablosu',
        },
        headers: ['S, R', 'NOR SR Action', "S', R'", 'NAND S\'-R\' Action'],
        rows: [
          ['0, 0', 'No change (Hold)', '1, 1', 'No change (Hold)'],
          ['0, 1', 'Reset (Q = 0, Q\' = 1)', '1, 0', 'Reset (Q = 0, Q\' = 1)'],
          ['1, 0', 'Set (Q = 1, Q\' = 0)', '0, 1', 'Set (Q = 1, Q\' = 0)'],
          ['1, 1', 'Forbidden (Q = Q\' = 0)', '0, 0', 'Forbidden (Q = Q\' = 1)'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Example: NOR SR Latch Feedback Lock & D Latch Transparency',
        tr: 'Adım Adım Çözümlü Örnek: SR Latch Kilitlemesi ve D Latch Şeffaflığı',
      },
      problem: {
        en: 'Start a NOR SR Latch at Q = 0, Q\' = 1. Apply the sequence (S, R) = (1, 0) → (0, 0) → (1, 1) → (0, 0) and explain what happens at each step.',
        tr: 'Başlangıçta Q = 0, Q\' = 1 olan bir NOR SR Latch\'e sırasıyla (S, R) = (1, 0) → (0, 0) → (1, 1) → (0, 0) uygulandığında çıkışların her adımdaki durumunu açıklayınız.',
      },
      steps: [
        {
          en: 'Step 1 — (S=1, R=0): Top NOR (inputs R=0, Q\') vs bottom NOR (inputs S=1, Q): S=1 immediately forces bottom NOR output Q\' = 0. Then top NOR sees (R=0, Q\'=0) → Q = 1.',
          tr: 'Adım 1 — (S=1, R=0): S=1 alt NOR kapısının çıkışını anında Q\' = 0 yapar; üst NOR (R=0, Q\'=0) görünce Q = 1 olur (Set).',
        },
        {
          en: 'Step 2 — (S=0, R=0): S drops to 0, but bottom NOR STILL sees Q = 1 from feedback, keeping Q\' = 0, which keeps Q = 1! The bit "1" is stored.',
          tr: 'Adım 2 — (S=0, R=0): S sıfıra düşse bile alt NOR geri beslemeden Q = 1 aldığı için Q\' = 0 kalmaya, dolayısıyla Q = 1 kalmaya devam eder (Bellek).',
        },
        {
          en: 'Step 3 — (S=1, R=1) then (0, 0): Both NOR gates force Q = 0 and Q\' = 0 simultaneously (violating Q\' = complement of Q). When returned together to (0, 0), whichever gate switches slightly faster wins—creating an unpredictable race condition!',
          tr: 'Adım 3 — (1, 1) ardından (0, 0): İki çıkış da 0 olur (yasak). Aynı anda (0, 0)\'a dönülürse hangi kapı daha hızlı tepki verirse onun kazandığı belirsiz yarış durumu (race condition) oluşur!',
        },
      ],
      finalAnswer: {
        en: '(1,0) sets Q=1; (0,0) locks Q=1; (1,1) breaks Q\'≠Q and returning to (0,0) creates an indeterminate race condition.',
        tr: '(1,0) ile Q=1 kurulur; (0,0) durumu kilitler; (1,1) ardından (0,0) belirsiz yarış durumu doğurur.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Always check gate type (NOR vs. NAND) on latch schematics! Hold is (0,0) for NOR SR Latch, whereas Hold is (1,1) for active-low NAND S\'-R\' Latch.',
          tr: 'Latch şemasında kapı türüne mutlaka bakın: NOR SR mandalında bellek modu (0,0) iken, NAND S\'-R\' mandalında bellek modu (1,1)\'dir.',
        },
        {
          en: 'Why can\'t a counter use transparent D Latches? While CLK = 1, Q changes and feeds back around to flip D multiple times within one clock pulse!',
          tr: 'Sayıcı devrelerinde neden şeffaf D Latch kullanılamaz? Saat=1 süresince değişen Q geri beslemeyle D\'ye dönüp çıkışın bir darbede kontrolsüzce defalarca değişmesine yol açar.',
        },
      ],
    },
  },

  'w10-c2': {
    cardId: 'w10-c2',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.4 · Lecture 9 (Slides 8–12)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.4 · Lecture 9 (Slayt 8–12)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Edge-Triggered Flip-Flops & Setup/Hold Timing)',
      },
      body: {
        en: 'Unlike a level-sensitive latch, an edge-triggered Flip-Flop samples its inputs and updates output Q strictly at an instant clock transition—either the positive (rising, 0 → 1) edge or the negative (falling, 1 → 0, marked with a bubble at the clock triangle) edge. Edge triggering is built either via a Master–Slave two-latch isolator or a 3-SR-latch edge-triggered architecture that locks out input changes once the clock edge passes. Reliable capture requires obeying Setup Time (t_su: input stable before edge), Hold Time (t_h: input stable after edge), and Propagation Delay (t_p: edge-to-Q delay).',
        tr: 'Seviye tetiklemeli mandaldan farklı olarak kenar tetiklemeli Flip-Flop, girişini yalnızca saat sinyalinin anlık geçiş kenarında—yükselen kenar (positive-edge, 0 → 1) veya düşen kenar (negative-edge, saat üçgeninde baloncuk, 1 → 0)—örnekler ve çıkışı günceller. Bu yalıtım Master–Slave iki mandal yapısıyla veya kenar sonrası girişi kilitleyen 3-mandallı yapıyla sağlanır. Doğru örnekleme için Setup Time (t_su: kenardan önce sabit kalma süresi), Hold Time (t_h: kenardan sonra sabit kalma süresi) ve Propagation Delay (t_p: kenardan çıkışa gecikme) kurallarına uyulmalıdır.',
      },
      formalEquation: 'Positive Edge: ↑ (0 → 1)   |   Negative Edge: ↓ (1 → 0, bubble on CLK)   |   Stable Window: [t_edge − t_su, t_edge + t_h]',
    },
    procedure: {
      heading: {
        en: 'Tracing Edge-Triggered Flip-Flop Waveforms',
        tr: 'Adım Adım Kenar Tetiklemeli Zamanlama Diyagramı Çizme Kuralları',
      },
      steps: [
        {
          en: '1. Check Clock Symbol for Polarity: Plain dynamic triangle (>) = positive-edge triggered (0 → 1); bubble + triangle (o>) = negative-edge triggered (1 → 0).',
          tr: '1. Tetikleme Kenarını Belirle: Üçgen (>) varsa yükselen kenar (0 → 1); üçgenin önünde baloncuk (o>) varsa düşen kenar (1 → 0) tetiklemedir.',
        },
        {
          en: '2. Mark Active Clock Edges Vertically: Draw vertical dashed lines ONLY at the active clock edges across all input waveforms.',
          tr: '2. Aktif Saat Kenarlarını İşaretle: Tüm dalga biçimleri boyunca yalnızca aktif saat kenarı anlarına dikey çizgiler indir.',
        },
        {
          en: '3. Sample Just Before the Edge: Read D (or J, K, T) just prior to each vertical edge (respecting t_su) and hold Q completely flat between active edges—ignoring any mid-cycle input glitches!',
          tr: '3. Kenardan Hemen Önce Örnekle: D (veya J, K, T) değerini her dikey kenarın hemen öncesinden oku; iki aktif saat kenarı arasında giriş değişse bile çıkış Q\'yu kesinlikle düz sabit tut!',
        },
      ],
    },
    workedExample: {
      heading: {
        en: 'Worked Timing Comparison: D Latch vs. Positive-Edge vs. Negative-Edge D FF',
        tr: 'Adım Adım Çözümlü Örnek: D Latch ile Pozitif/Negatif Kenar D Flip-Flop Farkı',
      },
      problem: {
        en: 'Suppose initially Q = 0. Clock C goes 0→1 at t=2, stays 1 until t=6 (goes 1→0). Data D starts at 0, pulses to 1 from t=1 to t=3, drops to 0 at t=3, and rises back to 1 from t=5 to t=7. Trace Q for (a) D Latch, (b) Positive-Edge D FF, and (c) Negative-Edge D FF.',
        tr: 'Başlangıçta Q = 0. Saat C sinyali t=2\'de 0→1, t=6\'da 1→0 oluyor. Veri D ise t=1..3 arası 1, t=3..5 arası 0, t=5..7 arası 1 değerindedir. (a) D Latch, (b) Pozitif Kenar D FF ve (c) Negatif Kenar D FF çıkışlarını izleyin.',
      },
      steps: [
        {
          en: 'Part (a) D Latch (follows D whenever C = 1, i.e., t ∈ [2, 6]): At t=2, D=1 → Q=1; at t=3 (still C=1!), D drops to 0 → Q drops to 0; at t=5 (still C=1!), D rises to 1 → Q rises to 1; at t=6, C becomes 0 → Q latches at 1.',
          tr: 'Kısım (a) D Latch (C=1 iken [2, 6] arası şeffaf): t=2\'de Q=1; t=3\'te C hala 1 olduğu için Q 0\'a düşer; t=5\'te Q yeniden 1\'e çıkar; t=6\'da C=0 olunca 1 olarak kilitlenir.',
        },
        {
          en: 'Part (b) Positive-Edge D FF (samples ONLY at t=2 ↑): At t=2, D = 1 → Q jumps to 1 and stays 1 across t=2..6..8 regardless of D dropping at t=3!',
          tr: 'Kısım (b) Pozitif Kenar D FF (yalnızca t=2 ↑ kenarında örnekler): t=2\'de D=1 olduğu için Q=1 olur ve t=3\'teki düşüşü görmezden gelerek 1 kalır.',
        },
        {
          en: 'Part (c) Negative-Edge D FF (samples ONLY at t=6 ↓): Q stays 0 from t=0..6; at t=6, D = 1 → Q jumps to 1.',
          tr: 'Kısım (c) Negatif Kenar D FF (yalnızca t=6 ↓ kenarında örnekler): Q t=6\'ya kadar 0 kalır; t=6\'da D=1 olduğu için Q=1 olur.',
        },
      ],
      finalAnswer: {
        en: 'At t=4: D Latch Q=0, Pos-Edge Q=1, Neg-Edge Q=0.   At t=7: all three Q=1 (via completely different transition paths!).',
        tr: 't=4 anında: D Latch Q=0, Pozitif Kenar Q=1, Negatif Kenar Q=0; t=7\'de üçü de farklı zamanlarda güncellenerek 1 olur.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'If D changes simultaneously AT the exact clock edge without satisfying t_su and t_h, the flip-flop samples the OLD value right before the edge—or in real silicon enters metastability!',
          tr: 'D girişi saat kenarıyla tam aynı anda değişirse kenardan HEMEN ÖNCEKİ eski değer örneklenir (gerçek donanımda Setup/Hold ihlali metastabilite doğurur).',
        },
        {
          en: 'Notice why Mano Fig. 5.10 locks out D changes while CLK = 1: as soon as CLK rises, internal latch feedback holds R or S clamped at 0 until CLK returns to 0.',
          tr: 'Kenar tetiklemeli D FF\'de CLK=1 boyunca D değişse dahi çıkışın kilitli kalmasının sebebi iç mandal geri beslemesinin CLK=0 olana dek R veya S hattını kilitlemesidir.',
        },
      ],
    },
  },

  'w10-c3': {
    cardId: 'w10-c3',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.4 · Lecture 9 (Slides 12–15)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.4 · Lecture 9 (Slayt 12–15)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (D, JK & T Characteristic Tables & Equations)',
      },
      body: {
        en: 'Every clocked flip-flop supports three fundamental state operations—Set (Q=1), Reset (Q=0), and optionally Hold/Complement—defined formally by its Characteristic Table and Characteristic Equation, which express next state Q(t+1) in terms of inputs and present state Q(t). The D Flip-Flop simply transfers D (Q(t+1) = D). The JK Flip-Flop eliminates the SR forbidden state by turning J=K=1 into Complement/Toggle (Q(t+1) = J·Q\' + K\'·Q). The T (Toggle) Flip-Flop is derived by tying J = K = T (or D = T ⊕ Q), yielding Q(t+1) = T ⊕ Q.',
        tr: 'Saatli flip-flopların mantıksal davranışı, bir sonraki saat darbesinden sonraki durumu Q(t+1) girişler ve mevcut durum Q(t) cinsinden tanımlayan Karakteristik Tablo (Characteristic Table) ve Karakteristik Denklem (Characteristic Equation) ile ifade edilir. D Flip-Flop doğrudan veriyi aktarır: Q(t+1) = D. JK Flip-Flop, SR\'deki yasak (1,1) durumunu Tümleme (Toggle) moduna çevirerek Q(t+1) = J·Q\' + K\'·Q sağlar. T (Toggle) Flip-Flop ise J = K = T (veya D = T ⊕ Q) bağlanarak kurulur ve T = 1 iken çıkışı tersler: Q(t+1) = T ⊕ Q.',
      },
      formalEquation: 'D: Q(t+1) = D   |   JK: Q(t+1) = J·Q\' + K\'·Q   |   T: Q(t+1) = T ⊕ Q = T·Q\' + T\'·Q',
    },
    procedure: {
      heading: {
        en: 'Building JK & T Flip-Flops from a D Flip-Flop (Mano Sec. 5.4)',
        tr: 'Adım Adım D Flip-Flop’tan JK ve T Flip-Flop Elde Etme',
      },
      steps: [
        {
          en: '1. Construct JK from D: Because Q(t+1) = D must equal J·Q\' + K\'·Q, feed D = J·Q\' + K\'·Q into a D Flip-Flop using two AND gates, an inverter on K, and an OR gate.',
          tr: '1. D\'den JK Kurulumu: D girişine D = J·Q\' + K\'·Q birleşik devresini bağlayarak standart D FF\'yi tam bir JK FF\'ye dönüştür.',
        },
        {
          en: '2. Construct T from JK or D: Tie J = K = T on a JK FF, OR feed D = T ⊕ Q = T·Q\' + T\'·Q into a D FF via one XOR gate.',
          tr: '2. JK veya D\'den T Kurulumu: JK FF\'nin J ve K uçlarını T\'de birleştir veya bir D FF girişine D = T ⊕ Q bağla.',
        },
        {
          en: '3. Verify All Modes: For JK: 00 = Hold, 01 = Reset, 10 = Set, 11 = Toggle. For T: 0 = Hold, 1 = Toggle.',
          tr: '3. Modları Doğrula: JK: 00=Tut, 01=Sıfırla (0), 10=Kur (1), 11=Tersle (Q\'). T: 0=Tut, 1=Tersle (Q\').',
        },
      ],
      table: {
        caption: {
          en: 'Characteristic Tables for D, JK, and T Flip-Flops (Mano Table 5.1)',
          tr: 'D, JK ve T Flip-Flop Karakteristik Tabloları (Mano Tablo 5.1)',
        },
        headers: ['FF Type', 'Inputs', 'Q(t+1)', 'Operation'],
        rows: [
          ['D', 'D = 0 / 1', '0 / 1', 'Reset / Set'],
          ['JK', 'J=0, K=0', 'Q(t)', 'No change (Hold)'],
          ['JK', 'J=0, K=1', '0', 'Reset'],
          ['JK', 'J=1, K=0', '1', 'Set'],
          ['JK', 'J=1, K=1', "Q'(t)", 'Complement (Toggle)'],
          ['T', 'T = 0 / 1', "Q(t) / Q'(t)", 'No change / Complement'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Verification: JK Characteristic Equation for All 4 Input Pairs',
        tr: 'Adım Adım Çözümlü Örnek: JK Karakteristik Denkleminin Doğrulanması',
      },
      problem: {
        en: 'Verify that Q(t+1) = J·Q\' + K\'·Q produces the exact 4 behaviors of the JK Flip-Flop for (J, K) = (0,0), (0,1), (1,0), and (1,1).',
        tr: 'Q(t+1) = J·Q\' + K\'·Q denkleminin (J, K) = (0,0), (0,1), (1,0) ve (1,1) için tüm JK işlevlerini verdiğini gösteriniz.',
      },
      steps: [
        {
          en: 'Case (J=0, K=0): Q(t+1) = 0·Q\' + 1·Q = Q (Hold).',
          tr: 'Durum (0,0): Q(t+1) = 0·Q\' + 1·Q = Q (Tut).',
        },
        {
          en: 'Case (J=0, K=1): Q(t+1) = 0·Q\' + 0·Q = 0 (Reset).',
          tr: 'Durum (0,1): Q(t+1) = 0·Q\' + 0·Q = 0 (Sıfırla).',
        },
        {
          en: 'Case (J=1, K=0): Q(t+1) = 1·Q\' + 1·Q = Q\' + Q = 1 (Set).',
          tr: 'Durum (1,0): Q(t+1) = 1·Q\' + 1·Q = 1 (Kur).',
        },
        {
          en: 'Case (J=1, K=1): Q(t+1) = 1·Q\' + 0·Q = Q\' (Toggle / Complement!).',
          tr: 'Durum (1,1): Q(t+1) = 1·Q\' + 0·Q = Q\' (Tersle!).',
        },
      ],
      finalAnswer: {
        en: 'Q(t+1) = J·Q\' + K\'·Q matches Hold, Reset, Set, and Toggle identically across all combinations.',
        tr: 'Q(t+1) = J·Q\' + K\'·Q tüm kombinasyonlarda JK karakteristik tablosuyla birebir örtüşür.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Watch the prime in JK\'s equation: it is J·Q\' + K\'·Q (K is complemented, NOT J! Writing J·Q + K·Q\' is completely wrong).',
          tr: 'JK karakteristik denklemindeki tümleyenlere dikkat edin: J·Q\' + K\'·Q (yani K\'nın tümleyeni K\'·Q alınır, K·Q\' değil!).',
        },
        {
          en: 'D Flip-Flops have NO "Hold" input combination unless external MUX feedback (D = Q when Hold) is added—every clock edge overwrites Q with D.',
          tr: 'D Flip-Flop\'ta harici geri besleme olmadan "Tut" girişi yoktur; her saat kenarında D değeri Q\'ya yazılır.',
        },
      ],
    },
  },

  'w10-c4': {
    cardId: 'w10-c4',
    sectionRef: {
      en: 'Mano & Ciletti 6th Ed., Sec. 5.4 · Lecture 9 (Slides 15–16)',
      tr: 'Mano & Ciletti 6th Ed., Sec. 5.4 · Lecture 9 (Slayt 15–16)',
    },
    definition: {
      heading: {
        en: 'Core Concept & Formal Definition',
        tr: 'Tanım ve Temel Mantık (Asynchronous Direct Inputs: Preset & Clear)',
      },
      body: {
        en: 'When electrical power is first applied to a digital system, flip-flops power up in random, unknown binary states. To initialize all storage elements to a deterministic starting state before normal synchronous clocking begins, flip-flops include asynchronous direct inputs: Direct Set (Preset, forces Q = 1) and Direct Reset (Clear, forces Q = 0). Unlike D, J, K, or T inputs, direct inputs act immediately regardless of the clock signal and are typically active-low (denoted by an inversion bubble on the symbol, e.g., Reset\' / Clear\').',
        tr: 'Bir sayısal sisteme ilk kez enerji verildiğinde flip-flopların başlangıç durumu rastgele ve belirsizdir. Saat darbeleri başlamadan önce tüm belleği bilinen bir başlangıç durumuna getirmek için flip-floplara saat sinyalinden bağımsız çalışan asenkron doğrudan girişler (direct inputs) eklenir: Direct Set (Preset, anında Q = 1 yapar) ve Direct Reset (Clear, anında Q = 0 yapar). Genellikle aktif-0 (sembol üzerinde baloncukla gösterilir) olarak tasarlanırlar ve etkin olduklarında D/J/K girişleri ile saat darbesini tamamen bastırırlar.',
      },
      formalEquation: 'Active-Low Clear\' = 0 ⇒ Q = 0 immediately (overrides CLK & D)   |   Normal Sync Mode: Clear\' = 1, Preset\' = 1',
    },
    procedure: {
      heading: {
        en: 'Function Table & Power-Up Reset Discipline',
        tr: 'Adım Adım Doğrudan Giriş (Preset / Clear) Öncelik Kuralları',
      },
      steps: [
        {
          en: '1. Check Active Polarity: Look for bubbles on the Preset (PRE\') and Clear (CLR\') pins of the graphic symbol; a bubble means 0 activates the override and 1 disables it.',
          tr: '1. Polariteyi Kontrol Et: PRE\' ve CLR\' pinlerinde baloncuk varsa 0 verildiğinde zorlama gerçekleşir, normal çalışma için bu uçlar 1\'de tutulmalıdır.',
        },
        {
          en: '2. Apply Override Priority: Whenever Clear is active (even while Clock is 0 or static), Q drops to 0 immediately—do NOT wait for a clock edge.',
          tr: '2. Asenkron Öncelik: Clear aktif olduğu anda (saat darbesi beklemeksizin!) Q anında 0 olur.',
        },
        {
          en: '3. Release for Synchronous Operation: Deactivate both Preset and Clear (set active-low pins to 1) before synchronous clock edges sample D, J, K, or T.',
          tr: '3. Senkron Moda Geçiş: Normal saatli çalışmanın başlaması için hem Preset hem Clear uçları pasif konuma (aktif-0 için 1\'e) çekilmelidir.',
        },
      ],
      table: {
        caption: {
          en: 'D Flip-Flop with Active-Low Asynchronous Reset (Mano Table 5.2)',
          tr: 'Aktif-0 Asenkron Resetli (R\') D Flip-Flop Fonksiyon Tablosu (Mano Tablo 5.2)',
        },
        headers: ["R' (Clear')", 'CLK', 'D', 'Q(next)', "Q'(next)"],
        rows: [
          ['0', 'X (don\'t care)', 'X', '0', '1  (Async Reset)'],
          ['1', '↑ (0 → 1)', '0', '0', '1  (Sync Reset)'],
          ['1', '↑ (0 → 1)', '1', '1', '0  (Sync Set)'],
          ['1', '0 or 1 (no edge)', 'X', 'Q', 'Q\'  (Hold)'],
        ],
      },
    },
    workedExample: {
      heading: {
        en: 'Worked Timing Override Example: Active-Low Clear\' Interrupting D = 1',
        tr: 'Adım Adım Çözümlü Örnek: Aktif-0 Clear\' Sinyalinin Saatli Çıkışı Bastırması',
      },
      problem: {
        en: 'A positive-edge D flip-flop with active-low Clear\' starts at Q = 0 with D = 1 and Clear\' = 1. Clock rises at t=2 and t=6. Clear\' pulses low (0) from t=4 to t=5. Trace Q from t=0 to t=7.',
        tr: 'Aktif-0 Clear\' uçlu yükselen kenar tetiklemeli D FF başlangıçta Q=0, D=1 ve Clear\'=1 durumundadır. Saat t=2 ve t=6\'da yükseliyor. Clear\' t=4..5 aralığında 0 yapılırsa t=0..7 arası Q çıkışını çiziniz.',
      },
      steps: [
        {
          en: 'Interval [0, 2): Q = 0 initially (Clear\' = 1, no clock edge yet).',
          tr: 'Aralık [0, 2): Başlangıçta Q = 0 (henüz saat kenarı yok).',
        },
        {
          en: 'At t = 2 (Clock ↑): Clear\' = 1 (inactive), D = 1 → synchronous capture sets Q = 1.',
          tr: 't = 2 (Saat ↑): Clear\' = 1 (pasif) ve D = 1 → Q = 1 olur.',
        },
        {
          en: 'At t = 4 (Clear\' goes 0): Asynchronous Clear\' overrides D = 1 immediately without any clock edge → Q drops to 0 right at t = 4!',
          tr: 't = 4 (Clear\' = 0): Saat kenarı olmamasına rağmen asenkron Clear\' anında çıkışı Q = 0 yapar!',
        },
        {
          en: 'At t = 5 (Clear\' returns to 1) & t = 6 (Clock ↑): Q stays 0 at t = 5 (waiting for clock), then at t = 6 rising edge captures D = 1 → Q = 1.',
          tr: 't = 5 (Clear\' = 1) ve t = 6 (Saat ↑): t=5\'te Q=0 kalır; t=6 saat yükselen kenarında D=1 yeniden yakalanır → Q = 1.',
        },
      ],
      finalAnswer: {
        en: 'Q = 0 on [0,2), Q = 1 on [2,4), Q = 0 on [4,6), and Q = 1 on [6,7].',
        tr: 'Q: [0,2)\'de 0, [2,4)\'te 1, [4,6)\'da 0 ve [6,7]\'de 1 değerini alır.',
      },
    },
    pitfalls: {
      heading: {
        en: 'Exam Notes & Common Pitfalls',
        tr: 'Dikkat Edilmesi Gerekenler ve Sınav İpuçları',
      },
      items: [
        {
          en: 'Never activate Preset and Clear simultaneously (e.g., PRE\' = CLR\' = 0)—just like S = R = 1 in an SR latch, it creates a forbidden conflict state!',
          tr: 'Preset ve Clear uçlarını asla aynı anda aktif etmeyin (PRE\' = CLR\' = 0)—tıpkı SR mandalındaki S = R = 1 gibi yasak çakışma durumu üretir!',
        },
        {
          en: 'Do not confuse asynchronous Clear\' (immediate) with a synchronous reset (waits for the next active clock edge).',
          tr: 'Asenkron Clear\' (anında etkili) ile senkron reset (bir sonraki saat kenarını bekleyen) arasındaki zamanlama farkını karıştırmayın.',
        },
      ],
    },
  },
};
