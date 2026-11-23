import type { WeekModule } from '../../types/curriculum';

export const week8: WeekModule = {
  id: 8,
  weekNumber: 8,
  englishTitle: {
    tr: 'Midterm Exam Simulator (Vize Deneme Sınavı)',
    en: 'Midterm Exam Simulator (Weeks 1–7 Comprehensive)',
  },
  turkishSubtitle: {
    tr: '1–7. Haftalar Kapsamlı Vize Özeti, Kritik Tuzaklar ve 12 Soruluk Deneme Sınavı',
    en: 'Weeks 1–7 Comprehensive Midterm Summary, Critical Pitfalls & 12-Question Practice Exam',
  },
  summary: {
    tr: 'COM 3021 Digital Design I ara sınavı öncesinde 1–7. haftaların tüm kritik formüllerini, sınavda puan kaybettiren 5 tuzak kontrol listesini gözden geçirin ve 12 soruluk kapsamlı vize simülatörüyle kendinizi test edin.',
    en: 'Before the COM 3021 Digital Design I midterm exam, review all critical formulas from Weeks 1–7, check the 5 most costly exam pitfalls, and test yourself with the comprehensive 12-question midterm simulator.',
  },
  learningObjectives: [
    {
      tr: 'Hafta 1–7 konularını tek bir bütünleşik sınav akışında hızla tekrar etmek',
      en: 'Rapidly review Weeks 1–7 topics in a single integrated exam workflow',
    },
    {
      tr: 'Taban aritmetiği, Signed Overflow, Boole sadeleştirme ve Kanonik SOP/POS dönüşümlerinde tam doğruluk sağlamak',
      en: 'Achieve full accuracy in radix arithmetic, signed overflow, Boolean simplification, and canonical SOP/POS conversions',
    },
    {
      tr: 'K-Map, Don\'t-Care, All-NAND dönüşümleri ve Ripple Carry Adder gecikme sorularını süre baskısı altında hatasız çözmek',
      en: 'Solve K-Map, Don\'t-Care, All-NAND conversions, and Ripple Carry Adder delay problems accurately under exam pressure',
    },
  ],
  isPlaceholder: false,
  isExam: true,
  recommendedWidget: 'KMapStudio',
  recommendedWidgetConfig: {
    variables: 4,
    initialMinterms: [0, 2, 5, 7, 8, 10, 13, 15],
  },
  visualSections: [
    {
      id: 'w8-s1',
      title: {
        tr: '1. COM 3021 Vize Hızlı Formül ve Kritik Kurallar Özeti (Exam Cheat-Sheet)',
        en: '1. COM 3021 Midterm Quick Formula & Critical Rules Cheat-Sheet',
      },
      explanation: {
        tr: 'Vize sınavında en hızlı ve hatasız sonuca ulaşmanız için 1–7. haftaların temel matematiksel kuralları tek bir özet matriste toplanmıştır. Her kuralın arkasındaki mantığı bilmek sınır durumlarında hata yapmanızı engeller:\n• İşaretli Taşma (Overflow): Aynı işaretli iki sayıyı toplarken sonucun işaret biti değişirse C_in ≠ C_out olur (V = C_in ⊕ C_out = 1).\n• K-Map & POS: K-Map üzerinde 1\'leri gruplamak doğrudan F\'i (SOP), 0\'ları gruplamak ise F\'\'yi verir; bu nedenle minimum POS için mutlaka DeMorgan uygulanır.\n• Evrensel Kapılar & RCA: 2 girişli NAND/NOR kapıları birleşme özelliğine sahip olmadığı için çok girişli kapılar doğrudan zincirlenemez; Ripple Carry Adder\'da ise son elde geldikten sonra son basamak Sum gecikmesi ayrıca eklenir.',
        en: 'To reach the fastest and most accurate answers on the midterm, the core mathematical rules from Weeks 1–7 are compiled into a single summary matrix. Understanding why each rule holds prevents boundary-case errors:\n• Signed Overflow: When adding two numbers of the same sign flips the sign bit, carry-in and carry-out of the sign bit differ (V = C_in ⊕ C_out = 1).\n• K-Maps & POS: Grouping 1s yields F directly (SOP), whereas grouping 0s yields F\'—so DeMorgan\'s Theorem is always required to obtain minimal POS.\n• Universal Gates & RCA: 2-input NAND/NOR operations are not associative and cannot be blindly chained; in a Ripple Carry Adder, the final stage Sum delay occurs after the final carry arrives.',
      },
      keyPoints: [
        {
          tr: 'Dual (Duality) ≠ Complement: Dual alırken değişkenlerin tümleyeni ALINMAZ; yalnızca AND ↔ OR ve 0 ↔ 1 değişir.',
          en: 'Dual ≠ Complement: Taking the dual swaps AND ↔ OR and 0 ↔ 1 WITHOUT complementing variables.',
        },
        {
          tr: 'Signed Overflow yalnızca aynı işaretli sayılar toplanırken (veya zıt işaretli sayılar çıkarılırken) oluşabilir.',
          en: 'Signed Overflow can only occur when adding same-sign numbers (or subtracting opposite-sign numbers).',
        },
      ],
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: 'Hafta 1–7 Kapsamlı Vize Formül Matrisi',
            en: 'Weeks 1–7 Comprehensive Midterm Formula Matrix',
          },
          headers: [
            { tr: 'Konu Alanı', en: 'Topic Area' },
            { tr: 'Temel Formül / Kural', en: 'Core Formula / Rule' },
            { tr: 'Kritik Kontrol Noktası', en: 'Critical Checkpoint' },
          ],
          highlightColumn: 1,
          rows: [
            [
              { tr: 'Taban Dönüşümleri (H1)', en: 'Base Conversions (W1)' },
              {
                tr: 'Octal = 3-bit grup | Hex = 4-bit grup',
                en: 'Octal = 3-bit group | Hex = 4-bit group',
              },
              {
                tr: 'Gruplamaya daima radix noktasından başla!',
                en: 'Always start grouping outward from the radix point!',
              },
            ],
            [
              { tr: "2's Complement & Overflow (H2)", en: "2's Complement & Overflow (W2)" },
              {
                tr: 'V = C_in ⊕ C_out (İşaret biti eldeleri)',
                en: 'V = C_in ⊕ C_out (Sign-bit carries)',
              },
              {
                tr: 'Yalnızca aynı işaretli iki sayı toplanırken oluşabilir.',
                en: 'Can occur ONLY when adding two numbers with the same sign.',
              },
            ],
            [
              { tr: 'Binary ↔ Gray Code (H2)', en: 'Binary ↔ Gray Code (W2)' },
              {
                tr: 'G_MSB = B_MSB | Gᵢ = Bᵢ₊₁ ⊕ Bᵢ',
                en: 'G_MSB = B_MSB | Gᵢ = Bᵢ₊₁ ⊕ Bᵢ',
              },
              {
                tr: 'Ardışıl kodlar arası yalnızca 1 bit değişir.',
                en: 'Only 1 bit changes between consecutive codewords.',
              },
            ],
            [
              { tr: 'Consensus Teoremi (H3)', en: 'Consensus Theorem (W3)' },
              "xy + x'z + yz = xy + x'z",
              {
                tr: "Duali: (x+y)(x'+z)(y+z) = (x+y)(x'+z).",
                en: "Dual: (x+y)(x'+z)(y+z) = (x+y)(x'+z).",
              },
            ],
            [
              { tr: 'Kanonik Formlar (H4)', en: 'Canonical Forms (W4)' },
              {
                tr: 'Mᵢ = (mᵢ)\' | Σm ve ΠM tümleyendir',
                en: 'Mᵢ = (mᵢ)\' | Σm and ΠM are complements',
              },
              {
                tr: 'NAND ve NOR işlemleri birleşme (associative) özelliğine sahip DEĞİLDİR!',
                en: 'NAND and NOR operations are NOT associative!',
              },
            ],
            [
              { tr: 'K-Map Minimizasyon (H5–H6)', en: 'K-Map Minimization (W5–W6)' },
              {
                tr: '2ⁿ gruplama · Önce yalnız 1\'ler (EPI)',
                en: '2ⁿ grouping · Isolated 1s first (EPIs)',
              },
              {
                tr: 'POS için 0\'ları grupla (F\'), sonra DeMorgan al!',
                en: 'For POS, group 0s (for F\'), then apply DeMorgan!',
              },
            ],
            [
              { tr: 'Ripple Carry Adder (H7)', en: 'Ripple Carry Adder (W7)' },
              't_total = (n - 1)·t_carry + max(t_sum, t_carry)',
              {
                tr: 'Son basamak toplam (Sum) gecikmesini unutma!',
                en: 'Never forget the final stage Sum delay!',
              },
            ],
          ],
        },
      ],
      examTip: {
        tr: 'Vize kağıdında cebirsel sadeleştirme yaptıktan sonra her zaman 3 veya 4 değişkenli küçük bir K-Map çizerek bulduğunuz sonucun gerçekten minimum olup olmadığını 30 saniyede doğrulayabilirsiniz.',
        en: 'After performing algebraic simplification on an exam paper, you can always sketch a quick 3- or 4-variable K-Map to verify in 30 seconds whether your result is truly minimal.',
      },
    },
    {
      id: 'w8-s2',
      title: {
        tr: '2. Sınavda Puan Kaybettiren 5 Kritik Tuzak Kontrol Listesi',
        en: '2. 5 Critical Exam Pitfalls Checklist',
      },
      explanation: {
        tr: 'Öğrencilerin COM 3021 vizesinde en sık puan kaybettiği 5 klasik hata aşağıda özetlenmiştir. Örneğin K-Map başlıklarını ikili sırayla yazmak komşu hücreler arasındaki 1-bitlik Gray Code farkını bozar; yalnızca X hücrelerinden grup açmak ise gereksiz kapı ve literal ekler. Sınav sırasında her cevabınızı bu 5 kontrol noktasına göre gözden geçirin.',
        en: 'The 5 classic mistakes that most frequently cost students points on the COM 3021 midterm are listed below. For example, writing K-Map headers in binary order breaks 1-bit Gray Code adjacency between neighbors, while forming X-only groups adds unnecessary gates and literals. Review every answer against these 5 checkpoints during the exam.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'Vize Öncesi 5 Tuzak Kontrol Listesi',
            en: 'Pre-Midterm 5-Pitfall Checklist',
          },
          steps: [
            {
              label: {
                tr: 'Tuzak 1: K-Map Başlık Sırası',
                en: 'Pitfall 1: K-Map Header Order',
              },
              badge: { tr: 'Gray Code!', en: 'Gray Code!' },
              detail: {
                tr: 'Satır/sütun başlıklarını asla 00, 01, 10, 11 yazma! Daima 00, 01, 11, 10 (Gray Code) sıralamasını kullan.',
                en: 'Never write row/column headers as 00, 01, 10, 11! Always use 00, 01, 11, 10 (Gray Code) order.',
              },
            },
            {
              label: {
                tr: "Tuzak 2: Don't-Care (X) Kullanımı",
                en: "Pitfall 2: Don't-Care (X) Usage",
              },
              badge: { tr: 'Yeni Grup Açma!', en: 'No X-Only Groups!' },
              detail: {
                tr: "X hücrelerini yalnızca mevcut 1'lerin grubunu 2'liden 4'lüye büyütmek için kullan; içinde hiç 1 olmayan X grubu çizme.",
                en: 'Use X cells only to expand groups containing existing 1s (e.g., pair to quad); never draw a group consisting solely of X cells.',
              },
            },
            {
              label: {
                tr: 'Tuzak 3: NAND / NOR Zincirleme',
                en: 'Pitfall 3: Chaining NAND / NOR',
              },
              badge: { tr: 'Associativity Yok', en: 'Not Associative' },
              detail: {
                tr: "(x ↑ y) ↑ z ≠ (xyz)'! 3 girişli NAND veya NOR gereken yerde 2 girişli kapıları doğrudan art arda bağlama.",
                en: "(x ↑ y) ↑ z ≠ (xyz)'! Never chain two 2-input NAND/NOR gates directly where a 3-input gate is required.",
              },
            },
            {
              label: {
                tr: 'Tuzak 4: POS Sadeleştirmede DeMorgan',
                en: 'Pitfall 4: DeMorgan in POS Minimization',
              },
              badge: { tr: "0'lar = F'", en: "0s = F'" },
              detail: {
                tr: "K-Map'te 0'ları gruplayınca bulduğun ifade F' dir! Cevaba mutlaka DeMorgan uygulayarak F'nin POS formunu yaz.",
                en: "Grouping 0s on a K-Map yields F'! Always apply DeMorgan's Theorem to obtain F in minimum POS form.",
              },
            },
            {
              label: {
                tr: 'Tuzak 5: Ripple Carry Gecikmesi',
                en: 'Pitfall 5: Ripple Carry Delay',
              },
              badge: { tr: '(n-1) Carry + Sum', en: '(n-1) Carry + Sum' },
              detail: {
                tr: '4-bit ve 8-bit toplayıcılarda son basamak eldesi geldikten sonra son Sum bitinin gecikmesini (t_sum) eklemeyi unutma.',
                en: 'In 4-bit and 8-bit adders, remember to add the final stage Sum delay (t_sum) after the last carry arrives.',
              },
            },
          ],
        },
      ],
      examTip: {
        tr: 'Aşağıdaki 12 soruluk Vize Deneme Sınavı, sınavdaki soru dağılımını birebir yansıtacak şekilde kolaydan zora doğru sıralanmıştır.',
        en: 'The 12-question Midterm Practice Exam below is ordered from foundational to exam-level difficulty to mirror the actual midterm distribution.',
      },
    },
  ],
  questions: [
    {
      id: 'w8-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Vize Soru 1 · Bilinmeyen Taban Bulma (Hafta 1)',
        en: 'Midterm Q1 · Finding an Unknown Radix (Week 1)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '(35)_r + (24)_r = (62)_r eşitliğini sağlayan r sayı tabanı (Radix) kaçtır?',
        en: 'What is the number base (Radix) r that satisfies the equation (35)_r + (24)_r = (62)_r?',
      },
      options: ['r = 7', 'r = 8', 'r = 9', 'r = 6'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Polinom Açılımını Kur',
            en: 'Step 1: Set Up the Polynomial Expansion',
          },
          detail: '(3r + 5) + (2r + 4) = 6r + 2',
        },
        {
          title: {
            tr: 'Adım 2: r İçin Çöz ve Rakam Sınırını Kontrol Et',
            en: 'Step 2: Solve for r and Verify the Digit Bound',
          },
          detail: {
            tr: '5r + 9 = 6r + 2  ⇒  r = 7. Sayılardaki en büyük rakam 6 (< 7) olduğu için r = 7 geçerlidir.',
            en: '5r + 9 = 6r + 2  ⇒  r = 7. Since the largest digit present is 6 (< 7), r = 7 is valid.',
          },
        },
      ],
    },
    {
      id: 'w8-q2',
      type: 'multiple-choice',
      title: {
        tr: "Vize Soru 2 · 6-Bit 2's Complement & Overflow (Hafta 2)",
        en: "Midterm Q2 · 6-Bit 2's Complement & Overflow (Week 2)",
      },
      difficulty: 'Orta',
      prompt: {
        tr: "6-bit işaretli 2's Complement aritmetiğinde (+21)₁₀ + (+15)₁₀ işlemi yapıldığında ikili sonuç ve Overflow (V) durumu nedir?",
        en: "In 6-bit signed 2's Complement arithmetic, when (+21)₁₀ + (+15)₁₀ is computed, what are the binary result and the Overflow (V) status?",
      },
      options: [
        {
          tr: '100100 ve Overflow = 1 (Taşma Var)',
          en: '100100 and Overflow = 1 (Overflow)',
        },
        {
          tr: '100100 ve Overflow = 0 (Taşma Yok)',
          en: '100100 and Overflow = 0 (No Overflow)',
        },
        {
          tr: '000100 ve Overflow = 1 (Taşma Var)',
          en: '000100 and Overflow = 1 (Overflow)',
        },
        {
          tr: '101100 ve Overflow = 0 (Taşma Yok)',
          en: '101100 and Overflow = 0 (No Overflow)',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: 6-Bit İkili Gösterimleri Topla',
            en: 'Step 1: Add the 6-Bit Binary Representations',
          },
          detail: {
            tr: '  010101 (+21)\n+ 001111 (+15)\n───────────────\n  100100 (-28 görünür!)',
            en: '  010101 (+21)\n+ 001111 (+15)\n───────────────\n  100100 (reads as -28!)',
          },
        },
        {
          title: {
            tr: 'Adım 2: Aralık ve Overflow Kontrolü',
            en: 'Step 2: Range and Overflow Check',
          },
          detail: {
            tr: '6-bit işaretli aralık [-32, +31] dir. +36 bu sınırı aşar. İşaret bitine giren elde C_in = 1, çıkan elde C_out = 0 ⇒ V = 1 ⊕ 0 = 1 (Overflow).',
            en: 'The 6-bit signed range is [-32, +31]. +36 exceeds this range. Carry into sign bit C_in = 1, carry out C_out = 0 ⇒ V = 1 ⊕ 0 = 1 (Overflow).',
          },
        },
      ],
    },
    {
      id: 'w8-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Vize Soru 3 · Binary → Gray Code Dönüşümü (Hafta 2)',
        en: 'Midterm Q3 · Binary → Gray Code Conversion (Week 2)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '(100110)₂ ikili sayısının Gray Code karşılığı nedir?',
        en: 'What is the Gray Code equivalent of the binary number (100110)₂?',
      },
      options: ['110101', '110111', '100101', '111101'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: MSB Sabit, Komşu Bitleri XOR Yap',
            en: 'Step 1: Keep MSB Fixed, XOR Adjacent Bits',
          },
          detail:
            'G₅ = 1 | G₄ = 1⊕0 = 1 | G₃ = 0⊕0 = 0 | G₂ = 0⊕1 = 1 | G₁ = 1⊕1 = 0 | G₀ = 1⊕0 = 1 ⇒ 110101.',
        },
      ],
    },
    {
      id: 'w8-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Vize Soru 4 · Boole Cebiri & Consensus Sadeleştirmesi (Hafta 3)',
        en: 'Midterm Q4 · Boolean Algebra & Consensus Simplification (Week 3)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: "F = AB + A'C + BC + AB'D Boole fonksiyonunun en az literalli sadeleştirilmiş hali aşağıdakilerden hangisidir?",
        en: "Which of the following is the minimum-literal simplified form of the Boolean function F = AB + A'C + BC + AB'D?",
      },
      options: [
        "AB + AD + A'C",
        "AB + BC + A'C",
        "A'C + BD + AB",
        "AB + A'D + A'C",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Consensus Teoremi ile BC Terimini Ele',
            en: 'Step 1: Eliminate BC via the Consensus Theorem',
          },
          detail: {
            tr: "AB + A'C + BC = AB + A'C (BC fazlalık terimdir).",
            en: "AB + A'C + BC = AB + A'C (BC is the redundant consensus term).",
          },
        },
        {
          title: {
            tr: 'Adım 2: AB + AB\'D İfadesini A Parantezinde Sadeleştir',
            en: 'Step 2: Simplify AB + AB\'D by Factoring A',
          },
          detail: "A(B + B'D) + A'C = A(B + D) + A'C = AB + AD + A'C.",
        },
      ],
    },
    {
      id: 'w8-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Vize Soru 5 · Kanonik ΠM ve Σm Dönüşümü (Hafta 4)',
        en: 'Midterm Q5 · Canonical ΠM and Σm Conversion (Week 4)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: "F(x, y, z) = (x + y')(y + z) fonksiyonunun kanonik Product of Maxterms (ΠM) ve Sum of Minterms (Σm) gösterimi nedir?",
        en: "What are the canonical Product of Maxterms (ΠM) and Sum of Minterms (Σm) representations of F(x, y, z) = (x + y')(y + z)?",
      },
      options: [
        {
          tr: 'ΠM(0, 2, 3, 4) ve Σm(1, 5, 6, 7)',
          en: 'ΠM(0, 2, 3, 4) and Σm(1, 5, 6, 7)',
        },
        {
          tr: 'ΠM(1, 4, 5) ve Σm(0, 2, 3, 6, 7)',
          en: 'ΠM(1, 4, 5) and Σm(0, 2, 3, 6, 7)',
        },
        {
          tr: 'ΠM(0, 2, 4, 6) ve Σm(1, 3, 5, 7)',
          en: 'ΠM(0, 2, 4, 6) and Σm(1, 3, 5, 7)',
        },
        {
          tr: 'ΠM(2, 3, 4, 5) ve Σm(0, 1, 6, 7)',
          en: 'ΠM(2, 3, 4, 5) and Σm(0, 1, 6, 7)',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Her Çarpanı Eksik Değişkenle Kanonik Maxtermlere Aç',
            en: 'Step 1: Expand Each Factor with the Missing Variable into Canonical Maxterms',
          },
          detail:
            "• (x + y') = (x + y' + z)(x + y' + z') = M₂ · M₃\n• (y + z) = (x + y + z)(x' + y + z) = M₀ · M₄",
        },
        {
          title: {
            tr: 'Adım 2: ΠM ve Tamamlayıcı Σm Kümesini Yaz',
            en: 'Step 2: Write ΠM and the Complementary Σm Set',
          },
          detail: {
            tr: 'F = ΠM(0, 2, 3, 4)  ⇒  Geri kalan indeksler {1, 5, 6, 7} olduğundan F = Σm(1, 5, 6, 7).',
            en: 'F = ΠM(0, 2, 3, 4)  ⇒  Since the remaining indices are {1, 5, 6, 7}, F = Σm(1, 5, 6, 7).',
          },
        },
      ],
    },
    {
      id: 'w8-q6',
      type: 'multiple-choice',
      title: {
        tr: 'Vize Soru 6 · 4-Değişkenli K-Map SOP & EPI Sayısı (Hafta 5)',
        en: 'Midterm Q6 · 4-Variable K-Map SOP & EPI Count (Week 5)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(0, 1, 2, 4, 5, 7, 11, 15) fonksiyonunun en sade SOP ifadelerinden biri ve toplam Essential Prime Implicant (EPI) sayısı nedir?',
        en: 'For F(A, B, C, D) = Σ(0, 1, 2, 4, 5, 7, 11, 15), what is one of its minimum SOP expressions and the total number of Essential Prime Implicants (EPIs)?',
      },
      options: [
        {
          tr: "3 adet EPI (A'C', A'B'D', ACD); Minimum SOP: F = A'C' + A'B'D' + ACD + A'BD (veya BCD)",
          en: "3 EPIs (A'C', A'B'D', ACD); Minimum SOP: F = A'C' + A'B'D' + ACD + A'BD (or BCD)",
        },
        {
          tr: "4 adet EPI; Minimum SOP: F = A'C' + A'B'D' + BCD + A'BD",
          en: "4 EPIs; Minimum SOP: F = A'C' + A'B'D' + BCD + A'BD",
        },
        {
          tr: "2 adet EPI; Minimum SOP: F = A'C' + ACD + B'D",
          en: "2 EPIs; Minimum SOP: F = A'C' + ACD + B'D",
        },
        {
          tr: "3 adet EPI; Minimum SOP: F = A'C' + B'D' + ACD + A'BD",
          en: "3 EPIs; Minimum SOP: F = A'C' + B'D' + ACD + A'BD",
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Tüm Prime Implicant\'ları ve EPI\'ları Bul',
            en: 'Step 1: Identify All Prime Implicants and EPIs',
          },
          detail: {
            tr: "• {0, 1, 4, 5} = A'C' (m₁ ve m₄'ü tek başına örter ⇒ EPI)\n• {0, 2} = A'B'D' (m₂'yi tek başına örter ⇒ EPI)\n• {11, 15} = ACD (m₁₁'i tek başına örter ⇒ EPI)",
            en: "• {0, 1, 4, 5} = A'C' (uniquely covers m₁ and m₄ ⇒ EPI)\n• {0, 2} = A'B'D' (uniquely covers m₂ ⇒ EPI)\n• {11, 15} = ACD (uniquely covers m₁₁ ⇒ EPI)",
          },
        },
        {
          title: {
            tr: 'Adım 2: Açıkta Kalan m₇ (0111) Hücresini Ört',
            en: 'Step 2: Cover the Remaining m₇ (0111) Cell',
          },
          detail: {
            tr: "m₇ hücresi hem {5, 7} = A'BD hem de {7, 15} = BCD grubuyla örtülebilir. Dolayısıyla 3 EPI vardır ve minimum SOP: A'C' + A'B'D' + ACD + A'BD (veya + BCD).",
            en: "Cell m₇ can be covered by either {5, 7} = A'BD or {7, 15} = BCD. Thus there are 3 EPIs, and minimum SOP is A'C' + A'B'D' + ACD + A'BD (or + BCD).",
          },
        },
      ],
    },
    {
      id: 'w8-q7',
      type: 'multiple-choice',
      title: {
        tr: "Vize Soru 7 · K-Map Üzerinden Minimum POS (Hafta 5)",
        en: "Midterm Q7 · Minimum POS via K-Map (Week 5)",
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(3, 7, 11, 12, 13, 14, 15) fonksiyonunun K-Map üzerindeki 0\'lar gruplanarak elde edilen en sade iki seviyeli POS ifadesi nedir?',
        en: 'What is the minimum two-level POS expression of F(A, B, C, D) = Σ(3, 7, 11, 12, 13, 14, 15) obtained by grouping the 0s on a K-Map?',
      },
      options: [
        {
          tr: 'F = (A + C)(A + D)(B + C)(B + D)   [Çarpanlara ayrılmış hali: AB + CD]',
          en: 'F = (A + C)(A + D)(B + C)(B + D)   [Factored SOP equivalent: AB + CD]',
        },
        "F = (A' + B')(C' + D')",
        'F = (A + B)(C + D)',
        "F = (A + C')(B + D')",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: "Adım 1: 0 Hücrelerini Grupla (F' İçin SOP)",
            en: "Step 1: Group the 0 Cells (SOP for F')",
          },
          detail: {
            tr: "0 olanlar: {0, 1, 2, 4, 5, 6, 8, 9, 10}.\n4'lü gruplar: A'C' {0,1,4,5} + A'D' {0,2,4,6} + B'C' {0,1,8,9} + B'D' {0,2,8,10}.\nF' = A'C' + A'D' + B'C' + B'D'",
            en: "0 cells: {0, 1, 2, 4, 5, 6, 8, 9, 10}.\nQuads: A'C' {0,1,4,5} + A'D' {0,2,4,6} + B'C' {0,1,8,9} + B'D' {0,2,8,10}.\nF' = A'C' + A'D' + B'C' + B'D'",
          },
        },
        {
          title: {
            tr: 'Adım 2: DeMorgan ile Minimum POS Biçimine Çevir',
            en: 'Step 2: Apply DeMorgan to Obtain Minimum POS',
          },
          detail: {
            tr: 'F = (F\')\' = (A + C)(A + D)(B + C)(B + D). (Bu ifade açıldığında doğrudan SOP karşılığı olan AB + CD elde edilir.)',
            en: 'F = (F\')\' = (A + C)(A + D)(B + C)(B + D). (Expanding this yields the equivalent SOP form AB + CD.)',
          },
        },
      ],
    },
    {
      id: 'w8-q8',
      type: 'multiple-choice',
      title: {
        tr: "Vize Soru 8 · Don't-Care Koşullu K-Map Sadeleştirme (Hafta 6)",
        en: "Midterm Q8 · K-Map Simplification with Don't-Cares (Week 6)",
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(2, 3, 10, 11, 12, 13, 14, 15) ve farksız durumları d(A, B, C, D) = Σ(0, 1, 8, 9) olan fonksiyonun en sade SOP ifadesi nedir?',
        en: "What is the minimum SOP expression for F(A, B, C, D) = Σ(2, 3, 10, 11, 12, 13, 14, 15) with don't-care conditions d(A, B, C, D) = Σ(0, 1, 8, 9)?",
      },
      options: ["F = A + B'", "F = B'C + AB", "F = A' + B", "F = AC + B'D"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: İlk ve Son Satırı (AB=00 ve AB=10) İncele',
            en: 'Step 1: Examine the Top and Bottom Rows (AB=00 and AB=10)',
          },
          detail: {
            tr: "AB = 00 satırında {0=X, 1=X, 3=1, 2=1} ve AB = 10 satırında {8=X, 9=X, 11=1, 10=1}. Bu iki satır birleşerek 8'li B' grubunu oluşturur!",
            en: "Row AB = 00 has {0=X, 1=X, 3=1, 2=1} and row AB = 10 has {8=X, 9=X, 11=1, 10=1}. Wrapping these two rows forms an octet for B'!",
          },
        },
        {
          title: {
            tr: 'Adım 2: Alt İki Satırı (AB=11 ve AB=10) Birleştir',
            en: 'Step 2: Combine the Bottom Two Rows (AB=11 and AB=10)',
          },
          detail: {
            tr: "AB = 11 satırı {12,13,15,14} tamamen 1 ve AB = 10 satırı {8,9,11,10} tamamen 1/X olduğundan ikinci 8'li grup = A oluşur.\nSonuç: F = A + B' (yalnızca 2 literal!).",
            en: "Since row AB = 11 {12,13,15,14} is all 1s and row AB = 10 {8,9,11,10} is all 1/X, a second octet forms = A.\nResult: F = A + B' (only 2 literals!).",
          },
        },
      ],
    },
    {
      id: 'w8-q9',
      type: 'multiple-choice',
      title: {
        tr: 'Vize Soru 9 · Yalnızca 2-Girişli NAND ile Kapı Sayısı (Hafta 6)',
        en: 'Midterm Q9 · Gate Count Using Only 2-Input NAND Gates (Week 6)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'F = (A + B)(C + D) ifadesi yalnızca 2-girişli NAND kapıları kullanılarak (girişlerin tümleyenleri verilmemişken) inşa edildiğinde minimum kaç adet NAND kapısı gerekir?',
        en: 'When F = (A + B)(C + D) is implemented using ONLY 2-input NAND gates (assuming complemented inputs are NOT available), what is the minimum number of NAND gates required?',
      },
      options: [
        { tr: '8 adet NAND kapısı', en: '8 NAND gates' },
        { tr: '4 adet NAND kapısı', en: '4 NAND gates' },
        { tr: '6 adet NAND kapısı', en: '6 NAND gates' },
        { tr: '5 adet NAND kapısı', en: '5 NAND gates' },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Her Bir (X + Y) OR İşlemi İçin NAND Sayısı',
            en: 'Step 1: NAND Count for Each (X + Y) OR Operation',
          },
          detail: {
            tr: "A + B = (A' · B')'. A' için 1 NAND, B' için 1 NAND ve bunları birleştirmek için 1 NAND = 3 NAND kapısı gerekir. Aynı şekilde (C + D) için de 3 NAND gerekir (Toplam 6).",
            en: "A + B = (A' · B')'. That requires 1 NAND for A', 1 NAND for B', and 1 NAND to combine them = 3 NAND gates. Similarly, (C + D) requires 3 NANDs (6 total so far).",
          },
        },
        {
          title: {
            tr: 'Adım 2: İki Grubu AND Yapmak İçin NAND Sayısı',
            en: 'Step 2: NAND Count to AND Both Groups',
          },
          detail: {
            tr: 'Son AND işlemi için 1 NAND + 1 çıkış Inverter NAND = 2 kapı gerekir. Genel Toplam = 3 + 3 + 2 = 8 adet NAND kapısı.',
            en: 'The final AND operation requires 1 NAND + 1 output inverter NAND = 2 gates. Grand Total = 3 + 3 + 2 = 8 NAND gates.',
          },
        },
      ],
    },
    {
      id: 'w8-q10',
      type: 'multiple-choice',
      title: {
        tr: 'Vize Soru 10 · 8-Bit Ripple Carry Adder Gecikmesi (Hafta 7)',
        en: 'Midterm Q10 · 8-Bit Ripple Carry Adder Delay (Week 7)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Bir Full Adder bloğunda Sum gecikmesi 25 ns ve Carry gecikmesi 12 ns ise, 8-bitlik bir Ripple Carry Adder devresinin en kötü durum toplam yayılım gecikmesi kaç nanosaniyedir?',
        en: 'If a single Full Adder has a Sum delay of 25 ns and a Carry delay of 12 ns, what is the worst-case total propagation delay of an 8-bit Ripple Carry Adder in nanoseconds?',
      },
      options: ['109 ns', '200 ns', '96 ns', '121 ns'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: İlk 7 Basamağın Carry Gecikmesini Hesapla',
            en: 'Step 1: Compute Carry Delay Across the First 7 Stages',
          },
          detail: {
            tr: 'C₇ sinyali 7 aşamadan geçer: 7 × 12 ns = 84 ns.',
            en: 'Signal C₇ ripples through 7 stages: 7 × 12 ns = 84 ns.',
          },
        },
        {
          title: {
            tr: 'Adım 2: Son Basamak Sum Gecikmesini Ekle',
            en: 'Step 2: Add the Final Stage Sum Delay',
          },
          detail: {
            tr: 'S₇ toplam biti C₇ geldikten 25 ns sonra oluşur: 84 + 25 = 109 ns.',
            en: 'Final sum bit S₇ settles 25 ns after C₇ arrives: 84 + 25 = 109 ns.',
          },
        },
      ],
    },
    {
      id: 'w8-q11',
      type: 'interactive-table',
      title: {
        tr: 'Vize Soru 11 · 4-Değişkenli K-Map Checkerboard Analizi',
        en: 'Midterm Q11 · 4-Variable K-Map Checkerboard Analysis',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(0, 2, 5, 7, 8, 10, 13, 15) fonksiyonunun K-Map matrisindeki tüm hücreleri (0/1 tıklayarak) doldurun ve minimum SOP ifadesini doğrulayın.',
        en: 'Fill all cells of the K-Map matrix for F(A, B, C, D) = Σ(0, 2, 5, 7, 8, 10, 13, 15) by clicking 0/1, and verify the minimum SOP expression.',
      },
      headers: ['AB \\ CD', '00', '01', '11', '10'],
      rows: [
        [
          { value: '00' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: '01' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '11' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '10' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
      ],
      solutionExplanation: {
        tr: "Haritanın 4 köşesi {0, 2, 8, 10} birleşerek B'D' terimini, ortadaki 4 hücre {5, 7, 13, 15} birleşerek BD terimini üretir. Minimum SOP: F = B'D' + BD = (B ⊙ D).",
        en: "The 4 corners {0, 2, 8, 10} combine to give B'D', while the center quad {5, 7, 13, 15} gives BD. Minimum SOP: F = B'D' + BD = (B ⊙ D).",
      },
    },
    {
      id: 'w8-q12',
      type: 'simulator-build',
      title: {
        tr: 'Vize Soru 12 · All-NAND 3-Girişli Çoğunluk Devresi (Canlı Lab)',
        en: 'Midterm Q12 · All-NAND 3-Input Majority Circuit (Live Lab)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: '3 girişli Çoğunluk Devresi (Majority Circuit) olan F(A, B, C) = Σ(3, 5, 6, 7) = AB + BC + AC fonksiyonunu simülatörde YALNIZCA NAND kapıları kullanarak kurun ve 8 satırlık doğruluk tablosuna karşı doğrulayın.',
        en: 'Build the 3-input Majority Circuit F(A, B, C) = Σ(3, 5, 6, 7) = AB + BC + AC in the simulator using ONLY NAND gates, and verify it against the full 8-row truth table.',
      },
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['NAND'],
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: {
        tr: "2-girişli NAND kapılarıyla 3 terimli SOP kurmak için: X = NAND(A,B), Y = NAND(B,C), Z = NAND(A,C) üretin. Sonra U = NAND(X,Y) (= AB+BC) kurun; ardından U sinyalini yeni bir NAND kapısının HEM A HEM B pinine bağlayarak V = U' elde edin; son olarak NAND(V, Z) = AB + BC + AC çıkışını F LED'ine bağlayın!",
        en: "To build a 3-term SOP with 2-input NAND gates: create X = NAND(A,B), Y = NAND(B,C), Z = NAND(A,C). Next build U = NAND(X,Y) (= AB+BC), invert it by wiring U to BOTH pins A and B of a NAND gate to get V = U', and finally connect NAND(V, Z) = AB + BC + AC to output LED F!",
      },
      solutionDescription: {
        tr: "3 terimli SOP olan AB + BC + AC ifadesi 2-girişli NAND kapılarıyla kaskat DeMorgan eşdeğerliğiyle kurulur: U = NAND((AB)', (BC)') = AB + BC, V = NAND(U, U) = (AB + BC)', F = NAND(V, (AC)') = AB + BC + AC.",
        en: "The 3-term SOP AB + BC + AC is implemented with 2-input NAND gates via cascaded DeMorgan equivalence: U = NAND((AB)', (BC)') = AB + BC, V = NAND(U, U) = (AB + BC)', F = NAND(V, (AC)') = AB + BC + AC.",
      },
    },
  ],
};
