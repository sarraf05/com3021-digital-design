import type { WeekModule } from '../../types/curriculum';

export const week5: WeekModule = {
  id: 5,
  weekNumber: 5,
  englishTitle: {
    tr: 'Gate-Level Minimization (K-Map)',
    en: 'Gate-Level Minimization (K-Map)',
  },
  turkishSubtitle: {
    tr: 'Karnaugh Haritası (K-Map), Prime Implicant, EPI ve Minimum SOP / POS Sentezi',
    en: 'Karnaugh Maps (K-Map), Prime Implicants, EPIs & Minimal SOP / POS Synthesis',
  },
  summary: {
    tr: 'Boole fonksiyonlarını cebirsel deneme-yanılma yerine görsel örüntü tanımayla en az kapı ve literal sayısına indirgeyen Karnaugh Haritası (K-Map) yöntemini, Gray Code komşuluk yapısını, PI/EPI ayrımını ve 0’ları gruplayarak POS elde etmeyi öğrenin.',
    en: 'Master Karnaugh Map (K-Map) minimization using visual pattern recognition instead of algebraic trial-and-error: Gray Code adjacency, Prime Implicant vs. Essential Prime Implicant selection, and grouping zeros for minimal POS synthesis.',
  },
  learningObjectives: [
    {
      tr: '2, 3 ve 4 değişkenli K-Map tablolarında Gray Code (00, 01, 11, 10) komşuluk ve wrap-around mantığını kavramak',
      en: 'Understand Gray Code (00, 01, 11, 10) adjacency and cylindrical wrap-around in 2-, 3-, and 4-variable K-Maps',
    },
    {
      tr: '4 Altın Kuralı kullanarak 2ⁿ boyutlu optimal grupları oluşturmak',
      en: 'Form optimal 2ⁿ-sized groups using the 4 Golden K-Map Grouping Rules',
    },
    {
      tr: 'Prime Implicant (PI) ile Essential Prime Implicant (EPI) kavramlarını kesin olarak ayırt etmek',
      en: 'Distinguish clearly between Prime Implicants (PI) and Essential Prime Implicants (EPI)',
    },
    {
      tr: 'K-Map üzerindeki 0\'ları gruplayıp DeMorgan uygulayarak minimum POS denklemini türetmek',
      en: 'Group 0-cells on a K-Map and apply DeMorgan’s theorem to derive the minimal POS expression',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'KMapStudio',
  recommendedWidgetConfig: {
    variables: 4,
    initialMinterms: [0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14],
  },
  visualSections: [
    {
      id: 'w5-s1',
      title: {
        tr: '1. Gray Code Sıralaması ve 2, 3, 4 Değişkenli K-Map Anatomisi',
        en: '1. Gray Code Ordering & 2-, 3-, and 4-Variable K-Map Anatomy',
      },
      explanation: {
        tr: 'Karnaugh Haritası (K-Map), doğruluk tablosunun iki boyutlu bir matris biçimidir. Satır ve sütun başlıklarının ikili sayma (00, 01, 10, 11) yerine Gray Code (00, 01, 11, 10) sırasıyla yazılmasının tek bir nedeni vardır: Yan yana veya alt alta duran her iki hücre arasında YALNIZCA 1 bit değişir (mantıksal komşuluk).\n\nSilindirik Birleşme (Wrap-Around): Haritanın en üst kenarı ile en alt kenarı (örn. 00 ile 10) ve en sol kenarı ile en sağ kenarı (00 ile 10) da 1 bit farkla komşudur! Yani haritanın 4 köşesi aslında birbirine bitişik tek bir 4\'lü grup oluşturabilir.',
        en: 'A Karnaugh Map (K-Map) is a two-dimensional representation of a truth table. Row and column headers follow Gray Code ordering (00, 01, 11, 10) instead of binary order (00, 01, 10, 11) so that every pair of horizontally or vertically adjacent cells differs by ONLY 1 bit (logical adjacency).\n\nCylindrical Wrap-Around: The top edge and bottom edge (00 and 10), as well as the left edge and right edge (00 and 10), also differ by just 1 bit! Thus, the four corners of a 4×4 K-Map are mutually adjacent and can form a valid 4-cell group.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: '4-Değişkenli K-Map Hücre İndeksleri (Minterm m₀ – m₁₅ Yerleşimi)',
            en: '4-Variable K-Map Cell Indices (Minterm m₀ – m₁₅ Placement)',
          },
          headers: ['AB \\ CD', '00', '01', '11', '10'],
          rows: [
            ['00', 'm₀ (0000)', 'm₁ (0001)', 'm₃ (0011)', 'm₂ (0010)'],
            ['01', 'm₄ (0100)', 'm₅ (0101)', 'm₇ (0111)', 'm₆ (0110)'],
            ['11', 'm₁₂ (1100)', 'm₁₃ (1101)', 'm₁₅ (1111)', 'm₁₄ (1110)'],
            ['10', 'm₈ (1000)', 'm₉ (1001)', 'm₁₁ (1011)', 'm₁₀ (1010)'],
          ],
        },
      ],
      widget: 'KMapStudio',
      widgetConfig: {
        variables: 4,
        initialMinterms: [0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14],
      },
      summaryRule: {
        tr: 'K-Map yalnızca 2ⁿ boyutlu (1, 2, 4, 8, 16) dikdörtgen blokları birleştirir; n değişkenli bir haritada 2ᵏ boyutlu her grup tam olarak k değişkeni eler. Önce Essential Prime Implicant (EPI) gruplarını seçmek minimum çözümü garanti eder.',
        en: 'A K-Map combines only power-of-two (1, 2, 4, 8, 16) rectangular blocks; each 2ᵏ-cell group eliminates exactly k variables. Selecting Essential Prime Implicants (EPIs) first guarantees a minimal cover.',
      },
      examTip: {
        tr: '4 değişkenli K-Map\'te 3. satırın (AB=11 → m₁₂..m₁₅) 4. satırdan (AB=10 → m₈..m₁₁) ÖNCE geldiğini asla unutmayın! İndeks atlamasını (0,1,3,2 ve 4,5,7,6 ve 12,13,15,14 ve 8,9,11,10) el alışkanlığı haline getirin.',
        en: 'Never forget that row 3 (AB=11 → m₁₂..m₁₅) comes BEFORE row 4 (AB=10 → m₈..m₁₁) in a 4-variable K-Map! Train yourself to jump indices automatically: (0,1,3,2; 4,5,7,6; 12,13,15,14; 8,9,11,10).',
      },
    },
    {
      id: 'w5-s2',
      title: {
        tr: '2. 💡 K-Map Gruplamada 4 Altın Kural',
        en: '2. 💡 The 4 Golden K-Map Grouping Rules',
      },
      explanation: {
        tr: 'Bir K-Map\'ten en sade (minimum literal ve minimum terimli) SOP ifadesini hatasız çıkarabilmek için şu 4 kuralı sırasıyla uygulayın:\n• Kural 1: Dikdörtgen/kare grupların boyutu yalnızca 2ⁿ (1, 2, 4, 8 veya 16) olabilir; asla 3, 5, 6 veya çapraz (diagonal) grup yapılamaz.\n• Kural 2: Önce yalnızca tek bir gruba dahil olabilen "yalnız 1" hücrelerini (Essential Prime Implicant) tespit edip işaretleyin.\n• Kural 3: Her grubu mümkün olan EN BÜYÜK 2ⁿ boyutuna genişletin (4 değişkenli haritada 1\'li grup → 4 literal, 2\'li grup → 3 literal, 4\'lü grup → 2 literal, 8\'li grup → 1 literal üretir!).\n• Kural 4: Tüm 1\'ler en az bir gruba dahil olduktan sonra fazladan (redundant) grup eklemeyin.',
        en: 'To extract the minimal SOP expression (fewest product terms and fewest literals) from a K-Map, follow these 4 golden rules in order:\n• Rule 1: Rectangular/square groups must have sizes equal to a power of two (2ⁿ = 1, 2, 4, 8, or 16); never form groups of 3, 5, 6, or diagonal patterns.\n• Rule 2: First locate and lock in Essential Prime Implicants—groups covering a "lonely 1" that no other group can cover.\n• Rule 3: Expand every group to the LARGEST possible 2ⁿ block (in a 4-var map: 1-cell → 4 literals, 2-cell → 3 literals, 4-cell → 2 literals, 8-cell → 1 literal!).\n• Rule 4: Once all 1s are covered, never add redundant groups.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: '4 Değişkenli K-Map\'te Grup Boyutu ve Elenen Literal İlişkisi',
            en: 'Group Size vs. Eliminated Literals in a 4-Variable K-Map',
          },
          headers: [
            { tr: 'Grup Boyutu (2ⁿ)', en: 'Group Size (2ⁿ)' },
            { tr: 'Elenen Değişken Sayısı (n)', en: 'Variables Eliminated (n)' },
            { tr: 'Kalan Literal Sayısı (4 - n)', en: 'Remaining Literals (4 - n)' },
            { tr: 'Örnek Terim', en: 'Example Term' },
          ],
          highlightColumn: 2,
          rows: [
            [
              { tr: '1 hücre (2⁰)', en: '1 cell (2⁰)' },
              { tr: '0 değişken elenir', en: '0 variables eliminated' },
              { tr: '4 literal', en: '4 literals' },
              "A'BC'D",
            ],
            [
              { tr: '2 hücre (2¹)', en: '2 cells (2¹)' },
              { tr: '1 değişken elenir', en: '1 variable eliminated' },
              { tr: '3 literal', en: '3 literals' },
              "A'BC'",
            ],
            [
              { tr: '4 hücre (2²)', en: '4 cells (2²)' },
              { tr: '2 değişken elenir', en: '2 variables eliminated' },
              { tr: '2 literal', en: '2 literals' },
              "B'D'",
            ],
            [
              { tr: '8 hücre (2³)', en: '8 cells (2³)' },
              { tr: '3 değişken elenir', en: '3 variables eliminated' },
              { tr: '1 literal', en: '1 literal' },
              "C'",
            ],
            [
              { tr: '16 hücre (2⁴)', en: '16 cells (2⁴)' },
              { tr: '4 değişken elenir', en: '4 variables eliminated' },
              { tr: '0 literal (Sabit 1)', en: '0 literals (Constant 1)' },
              '1',
            ],
          ],
        },
      ],
      examTip: {
        tr: 'Gruplama yaparken bir hücreyi birden fazla gruba dahil etmek (overlapping) kesinlikle serbesttir ve çoğu zaman diğer grupları 2\'liden 4\'lüye veya 4\'lüden 8\'liye büyütmek için gereklidir!',
        en: 'Overlapping cells across multiple groups is completely valid—and often necessary to expand a group from 2 cells to 4 cells, or from 4 cells to 8 cells!',
      },
    },
    {
      id: 'w5-s3',
      title: {
        tr: '3. Prime Implicant (PI) ve Essential Prime Implicant (EPI) Ayrımı',
        en: '3. Prime Implicants (PI) vs. Essential Prime Implicants (EPI)',
      },
      explanation: {
        tr: 'Sınavlarda en çok karıştırılan iki terim Prime Implicant (PI) ve Essential Prime Implicant (EPI)\'tır:\n• Prime Implicant (PI): K-Map üzerinde daha büyük başka bir geçerli 2ⁿ grubunun içine tam olarak sığmayan (maksimum genişletilmiş) herhangi bir geçerli gruptur.\n• Essential Prime Implicant (EPI): İçindeki en az bir tane "1" hücresini K-Map üzerindeki diğer hiçbir PI\'ın kapsamadığı, dolayısıyla nihai çözümde BULUNMASI ZORUNLU olan Prime Implicant\'tır.\n\nÇözüm Stratejisi (Mano): Önce tüm EPI\'ları seçin. Ardından hâlâ açıkta kalan "1" hücresi varsa, onları örtecek en az sayıda ek PI seçin.',
        en: 'Two crucial concepts frequently tested in exams are Prime Implicant (PI) and Essential Prime Implicant (EPI):\n• Prime Implicant (PI): A product term obtained by combining the maximum possible number of adjacent 1-cells in the map (cannot be completely contained within any larger valid 2ⁿ group).\n• Essential Prime Implicant (EPI): A Prime Implicant that covers at least one minterm (1-cell) not covered by ANY other Prime Implicant—therefore it MUST appear in the final minimal expression.\n\nMano’s Selection Strategy: First select all EPIs. If any 1-cells remain uncovered, choose the fewest additional PIs needed to cover them.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'PI ve EPI Tespit Etme Algoritması',
            en: 'Algorithm for Identifying PIs and EPIs',
          },
          steps: [
            {
              label: {
                tr: 'Adım 1: Tüm Maksimal Grupları (PI) Bul',
                en: 'Step 1: Find All Maximal Groups (PIs)',
              },
              badge: 'Prime Implicants',
              detail: {
                tr: 'Her 1 hücresinin genişleyebileceği tüm en büyük 2ⁿ dikdörtgenleri listele. Alt küme olan küçük grupları ele.',
                en: 'List all largest 2ⁿ rectangles covering the 1s. Discard any smaller group that is a strict subset of a larger valid group.',
              },
            },
            {
              label: {
                tr: 'Adım 2: Tek Başına Kapsanan 1\'leri Ara',
                en: 'Step 2: Look for Uniquely Covered 1s',
              },
              badge: 'Essential Check',
              detail: {
                tr: 'Yalnızca tek bir PI tarafından örtülen bir 1 hücresi varsa, o PI mutlaka bir EPI dir ve kesin seçilir.',
                en: 'If any 1-cell is covered by only a single PI, that PI is an Essential Prime Implicant (EPI) and is mandatory.',
              },
            },
            {
              label: {
                tr: 'Adım 3: Kalan 1\'leri En Az PI ile Ört',
                en: 'Step 3: Cover Remaining 1s Minimally',
              },
              badge: 'Minimum Cover',
              detail: {
                tr: 'EPI\'lar seçildikten sonra açıkta kalan 1\'ler varsa, birden fazla seçenek arasından en az sayıda ek PI ekle.',
                en: 'If any 1-cells remain uncovered after selecting all EPIs, pick the fewest extra PIs to finish covering them.',
              },
            },
          ],
        },
      ],
      examTip: {
        tr: 'Bir K-Map sorusunda birden fazla doğru minimum SOP sonucu çıkabiliyorsa bunun nedeni, EPI\'lar dışında kalan hücrelerin farklı PI kombinasyonlarıyla örtülebilmesidir. Ancak EPI\'lar her doğru çözümde mutlaka yer alır!',
        en: 'When a K-Map has multiple equally minimal SOP solutions, it is because the non-essential 1-cells can be covered by different PI choices—yet every valid minimal solution MUST include all EPIs!',
      },
    },
    {
      id: 'w5-s4',
      title: {
        tr: '4. K-Map ile POS (Product of Sums) Sadeleştirme Tekniği',
        en: '4. Deriving Minimal POS (Product of Sums) via K-Map',
      },
      explanation: {
        tr: 'Bazı fonksiyonların POS (çarpımların toplamı) formu SOP formundan çok daha az kapı gerektirir. K-Map üzerinden doğrudan POS elde etmenin en hatasız yolu:\n1. Haritadaki "1"ler yerine "0" hücrelerini (F\' fonksiyonunu) gruplayın.\n2. Bu "0" gruplarından elde edilen sadeleştirilmiş ifadeyi F\' = (...) + (...) şeklinde SOP olarak yazın.\n3. İki tarafa DeMorgan yasası uygulayarak (F\')\' = F ifadesini POS biçiminde elde edin.',
        en: 'Some Boolean functions require fewer gates in POS form than in SOP form. The cleanest, most error-free way to extract minimal POS from a K-Map is:\n1. Group the 0-cells (which represent the complement F\') instead of the 1-cells.\n2. Write the minimal SOP expression for F\' from those 0-groups.\n3. Apply DeMorgan’s law to both sides to obtain F = (F\')\' directly in minimal POS form.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: 'K-Map Üzerinden 3 Adımda POS Türetme Örneği',
            en: '3-Step Minimal POS Extraction Example',
          },
          steps: [
            {
              label: {
                tr: "Adım 1: 0'ları Grupla (F' İçin SOP)",
                en: "Step 1: Group the 0s (SOP for F')",
              },
              badge: { tr: '0 Hücreleri', en: '0-Cells' },
              detail: {
                tr: "Örnek haritada 0'ları gruplayarak\nF' = AB + BD' + CD elde edildi.",
                en: "Grouping the 0s in the sample map yields\nF' = AB + BD' + CD.",
              },
            },
            {
              label: {
                tr: 'Adım 2: Tümleyeni Al (DeMorgan)',
                en: 'Step 2: Complement Both Sides (DeMorgan)',
              },
              badge: "(F')' = F",
              detail: "F = (AB + BD' + CD)'\n= (AB)' · (BD')' · (CD)'",
            },
            {
              label: {
                tr: 'Adım 3: Parantezleri Aç (Minimum POS)',
                en: 'Step 3: Distribute Complements (Minimal POS)',
              },
              badge: { tr: 'POS Çıktısı', en: 'POS Output' },
              detail: {
                tr: "F = (A' + B')(B' + D)(C' + D')\n(Toplam 3 OR + 1 AND kapısı)",
                en: "F = (A' + B')(B' + D)(C' + D')\n(Total: 3 OR + 1 AND gate)",
              },
            },
          ],
        },
      ],
      examTip: {
        tr: 'Eğer bir K-Map\'te "0" sayısı "1" sayısından azsa veya 0\'lar büyük 4\'lü/8\'li bloklar oluşturuyorsa POS formu SOP formundan daha ekonomik olur.',
        en: 'Whenever a K-Map has fewer 0s than 1s—or the 0s merge into larger 4-cell/8-cell blocks—POS implementation is generally more economical than SOP.',
      },
    },
  ],
  questions: [
    {
      id: 'w5-q1',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 1 · 4 Değişkenli K-Map Sadeleştirme (Mano 3.5)',
        en: 'Question 1 · 4-Variable K-Map Simplification (Mano 3.5)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14) fonksiyonunun K-Map ile elde edilen en sade SOP ifadesi aşağıdakilerden hangisidir?',
        en: 'Using a K-Map, what is the minimal SOP expression for F(A, B, C, D) = Σ(0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14)?',
      },
      options: [
        "F = C' + A'D' + BD'",
        "F = C' + B'D' + AD'",
        "F = C + A'D + BD'",
        "F = C' + A'D' + B'D",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: "Adım 1: Mintermleri 4x4 K-Map'e Yerleştir",
            en: 'Step 1: Plot All Minterms on the 4×4 K-Map',
          },
          detail: {
            tr: 'CD=00 ve CD=01 sütunlarındaki tüm 8 hücre (0, 1, 4, 5, 12, 13, 8, 9) = 1. Ayrıca CD=10 sütununda 2, 6, 14 = 1.',
            en: 'All 8 cells in columns CD=00 and CD=01 (0, 1, 4, 5, 12, 13, 8, 9) equal 1. Cells 2, 6, 14 in column CD=10 are also 1.',
          },
        },
        {
          title: {
            tr: 'Adım 2: En Büyük Grupları (EPI) Oluştur',
            en: 'Step 2: Form Largest Optimal Groups (EPIs)',
          },
          detail: {
            tr: "• 8'li Grup {0,1,4,5,8,9,12,13}: İlk iki sütun tamamen 1 ⇒ C'\n• 4'lü Wrap-Around Grup {0,2,4,6}: Üst iki satırın sol-sağ kenarları ⇒ A'D'\n• 4'lü Grup {4,6,12,14}: Orta iki satırın sol-sağ kenarları ⇒ BD'",
            en: "• 8-cell group {0,1,4,5,8,9,12,13}: first two columns ⇒ C'\n• 4-cell wrap-around {0,2,4,6}: outer columns in top two rows ⇒ A'D'\n• 4-cell wrap-around {4,6,12,14}: outer columns in middle two rows ⇒ BD'",
          },
        },
        {
          title: {
            tr: 'Adım 3: Minimum SOP Denklemi',
            en: 'Step 3: Minimal SOP Equation',
          },
          detail: {
            tr: "F = C' + A'D' + BD' (Tüm 11 minterm en az literal ile kapsandı).",
            en: "F = C' + A'D' + BD' (All 11 minterms covered with minimal literals).",
          },
        },
      ],
    },
    {
      id: 'w5-q2',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 2 · Prime Implicant (PI) ve EPI Sayısı',
        en: 'Question 2 · Counting Prime Implicants (PI) & EPIs',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(0, 2, 3, 5, 7, 8, 9, 10, 11, 13, 15) Boole fonksiyonunda kaç adet Essential Prime Implicant (EPI) bulunur ve bunlar hangileridir?',
        en: 'How many Essential Prime Implicants (EPIs) exist in F(A, B, C, D) = Σ(0, 2, 3, 5, 7, 8, 9, 10, 11, 13, 15), and which terms are they?',
      },
      options: [
        {
          tr: "2 adet EPI bulunur: BD ve B'D'",
          en: "2 EPIs exist: BD and B'D'",
        },
        {
          tr: "3 adet EPI bulunur: BD, B'D' ve AB'",
          en: "3 EPIs exist: BD, B'D', and AB'",
        },
        {
          tr: "4 adet EPI bulunur: BD, B'D', CD ve AD",
          en: "4 EPIs exist: BD, B'D', CD, and AD",
        },
        {
          tr: '1 adet EPI bulunur: Yalnızca BD',
          en: '1 EPI exists: Only BD',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: "Adım 1: Haritadaki Tüm 6 Prime Implicant'ı (PI) Belirle",
            en: 'Step 1: Identify All 6 Prime Implicants (PIs) on the Map',
          },
          detail: {
            tr: "1) BD = {5, 7, 13, 15} | 2) B'D' = {0, 2, 8, 10} (4 köşe) | 3) AB' = {8, 9, 10, 11} | 4) B'C = {2, 3, 10, 11} | 5) CD = {3, 7, 11, 15} | 6) AD = {9, 11, 13, 15}",
            en: "1) BD = {5, 7, 13, 15} | 2) B'D' = {0, 2, 8, 10} (4 corners) | 3) AB' = {8, 9, 10, 11} | 4) B'C = {2, 3, 10, 11} | 5) CD = {3, 7, 11, 15} | 6) AD = {9, 11, 13, 15}",
          },
        },
        {
          title: {
            tr: "Adım 2: Tek Başına Kapsanan 1'leri Kontrol Et",
            en: 'Step 2: Check for Uniquely Covered Minterms',
          },
          detail: {
            tr: "• m₅ (0101) hücresini YALNIZCA BD kapsar ⇒ BD bir EPI'dır.\n• m₀ (0000) hücresini YALNIZCA B'D' kapsar ⇒ B'D' bir EPI'dır.\n• Diğer tüm 1'ler (2, 3, 7, 8, 9, 10, 11, 13, 15) en az iki farklı PI içinde yer alır.",
            en: "• m₅ (0101) is covered ONLY by BD ⇒ BD is an EPI.\n• m₀ (0000) is covered ONLY by B'D' ⇒ B'D' is an EPI.\n• Every other 1-cell (2, 3, 7, 8, 9, 10, 11, 13, 15) is shared by at least two PIs.",
          },
        },
        {
          title: {
            tr: 'Adım 3: Sonuç',
            en: 'Step 3: Conclusion',
          },
          detail: {
            tr: "Toplam 6 PI içinden yalnızca 2 tanesi (BD ve B'D') Essential Prime Implicant (EPI)'tır.",
            en: "Out of 6 total PIs, only 2 (BD and B'D') are Essential Prime Implicants (EPIs).",
          },
        },
      ],
    },
    {
      id: 'w5-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · K-Map Üzerinden Minimum POS Elde Etme (Mano 3.12)',
        en: 'Question 3 · Minimal POS Synthesis via K-Map (Mano 3.12)',
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(0, 1, 2, 5, 8, 9, 10) fonksiyonunun K-Map üzerindeki 0\'lar gruplanarak bulunan en sade POS (Product of Sums) ifadesi nedir?',
        en: 'Grouping the 0s on a K-Map, what is the minimal POS (Product of Sums) expression for F(A, B, C, D) = Σ(0, 1, 2, 5, 8, 9, 10)?',
      },
      options: [
        "F = (A' + B')(B' + D)(C' + D')",
        "F = (A + B)(B + D')(C + D)",
        "F = (A' + B)(B' + D')(C + D')",
        "F = (A' + B')(B + D)(C' + D)",
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: "Adım 1: Haritadaki 0 Hücrelerini (F') Belirle",
            en: "Step 1: Identify All 0-Cells (F')",
          },
          detail: {
            tr: 'F = 0 olan indeksler: {3, 4, 6, 7, 11, 12, 13, 14, 15}',
            en: 'Indices where F = 0: {3, 4, 6, 7, 11, 12, 13, 14, 15}',
          },
        },
        {
          title: {
            tr: "Adım 2: 0'ları Gruplayarak F' İçin Minimum SOP Bul",
            en: "Step 2: Group the 0s to Obtain Minimal SOP for F'",
          },
          detail: {
            tr: "• {12, 13, 14, 15} ⇒ AB\n• {4, 6, 12, 14} (sol-sağ kenarlar) ⇒ BD'\n• {3, 7, 11, 15} (CD=11 sütunu) ⇒ CD\n⇒ F' = AB + BD' + CD",
            en: "• {12, 13, 14, 15} ⇒ AB\n• {4, 6, 12, 14} (left-right wrap) ⇒ BD'\n• {3, 7, 11, 15} (CD=11 column) ⇒ CD\n⇒ F' = AB + BD' + CD",
          },
        },
        {
          title: {
            tr: "Adım 3: DeMorgan ile F'i POS Biçimine Çevir",
            en: 'Step 3: Apply DeMorgan to Convert F into POS Form',
          },
          detail: "F = (F')' = (AB + BD' + CD)' = (A' + B')(B' + D)(C' + D')",
        },
      ],
    },
    {
      id: 'w5-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · 3 Değişkenli K-Map Köşe Birleşimi (Wrap-Around)',
        en: 'Question 4 · 3-Variable K-Map Wrap-Around Grouping',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '3 değişkenli F(x, y, z) = Σ(0, 2, 4, 6) fonksiyonunun K-Map sadeleştirmesi sonucu aşağıdakilerden hangisidir?',
        en: 'What is the K-Map simplified result for the 3-variable function F(x, y, z) = Σ(0, 2, 4, 6)?',
      },
      options: ["F = z'", 'F = z', "F = y'", "F = x'z'"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: K-Map Üzerindeki Konumları İncele',
            en: 'Step 1: Examine Cell Positions on the Map',
          },
          detail: {
            tr: 'yz = 00 sütununda m₀ ve m₄ (sol kenar), yz = 10 sütununda m₂ ve m₆ (sağ kenar) hücreleri 1 dir.',
            en: 'm₀ and m₄ sit on the left edge (yz = 00), while m₂ and m₆ sit on the right edge (yz = 10).',
          },
        },
        {
          title: {
            tr: 'Adım 2: Sağ-Sol Kenar Wrap-Around Gruplaması',
            en: 'Step 2: Left-to-Right Cylindrical Wrap-Around',
          },
          detail: {
            tr: "Bu 4 hücre silindirik olarak birleşerek 4'lü bir grup oluşturur. Hem x (0→1) hem y (0→1) değişirken yalnızca z = 0 sabit kalır ⇒ F = z'.",
            en: "These 4 cells wrap around cylindrically to form one 4-cell group. Both x and y vary, leaving only z = 0 constant ⇒ F = z'.",
          },
        },
      ],
    },
    {
      id: 'w5-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · Gereksiz (Redundant) Grup Tuzağı',
        en: 'Question 5 · The Redundant Group Trap',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'K-Map üzerinde tüm 1 hücreleri başka zorunlu gruplar tarafından halihazırda kapsanmış 4\'lü bir grubu nihai SOP denklemine eklemek devreyi nasıl etkiler?',
        en: 'How does including a 4-cell group whose 1s are already completely covered by essential groups affect the resulting SOP circuit?',
      },
      options: [
        {
          tr: 'Doğruluk tablosunu değiştirmez, ancak fazladan bir Consensus terimi ekleyerek kapı ve literal maliyetini artırır.',
          en: 'It does not change the truth table, but adds a redundant consensus term that increases gate and literal cost.',
        },
        {
          tr: 'Doğruluk tablosundaki bazı 0 çıkışlarını 1\'e dönüştürür.',
          en: 'It flips some 0 outputs in the truth table to 1.',
        },
        {
          tr: 'Devredeki propagation delay süresini yarıya düşürür.',
          en: 'It cuts the circuit propagation delay in half.',
        },
        {
          tr: 'Essential Prime Implicant sayısını artırır.',
          en: 'It increases the number of Essential Prime Implicants.',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Mantıksal Eşdeğerlik Kontrolü',
            en: 'Step 1: Logical Equivalence Check',
          },
          detail: {
            tr: 'Kapsanan bir terim Boole cebrinde x + x = x özdeşliği gereği fonksiyonun çıkış değerini değiştirmez; ancak donanımda fazladan bir AND kapısı ve OR kapısına ekstra bir giriş pini maliyeti doğurur.',
            en: 'By x + x = x, adding an already-covered product term leaves the truth table identical, yet wastes an extra AND gate and OR-gate input pin.',
          },
        },
      ],
    },
    {
      id: 'w5-q6',
      type: 'interactive-table',
      title: {
        tr: 'Soru 6 · 4x4 K-Map Matrisi Doldurma ve Minimum Grup Analizi',
        en: 'Question 6 · Filling a 4×4 K-Map & Minimal Cover Analysis',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'F(A, B, C, D) = Σ(1, 3, 4, 5, 10, 11, 12, 13, 14, 15) fonksiyonunun K-Map matrisindeki boş hücreleri (0 veya 1 olarak tıklayarak) doldurun. (💡 İpucu: 3. satır AB=11, 3. sütun CD=11 Gray sırasındadır!)',
        en: 'Fill in the 4×4 K-Map cells for F(A, B, C, D) = Σ(1, 3, 4, 5, 10, 11, 12, 13, 14, 15) by clicking 0 or 1. (💡 Tip: Row 3 is AB=11 and Column 3 is CD=11 in Gray Code order!)',
      },
      headers: ['AB \\ CD', '00', '01', '11', '10'],
      rows: [
        [
          { value: '00' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '01' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: '11' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: '10' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
      ],
      solutionExplanation: {
        tr: "K-Map yerleşimi tamamlandığında 3 Essential Prime Implicant tüm 1'leri kapsar:\n• {1, 3} ⇒ A'B'D\n• {4, 5, 12, 13} ⇒ BC'\n• {10, 11, 14, 15} ⇒ AC\nMinimum SOP: F = A'B'D + BC' + AC (Dikkat: AB = {12,13,14,15} grubu artık gerekmez!).",
        en: "Once plotted, 3 Essential Prime Implicants cover every 1-cell:\n• {1, 3} ⇒ A'B'D\n• {4, 5, 12, 13} ⇒ BC'\n• {10, 11, 14, 15} ⇒ AC\nMinimal SOP: F = A'B'D + BC' + AC (Notice AB = {12,13,14,15} is completely redundant!).",
      },
    },
    {
      id: 'w5-q7',
      type: 'simulator-build',
      title: {
        tr: 'Soru 7 · K-Map Sadeleştirme Sonrası Minimum Devre (Canlı Lab)',
        en: 'Question 7 · Minimal Circuit After K-Map Reduction (Live Lab)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: 'F(A, B, C) = Σ(2, 3, 6, 7) fonksiyonunu K-Map ile en sade haline indirgeyin ve simülatörde sıfır kapı / minimum bağlantı kullanarak devreyi kurup 8 satırlık doğruluk tablosuna karşı doğrulayın.',
        en: 'Minimize F(A, B, C) = Σ(2, 3, 6, 7) via K-Map, then build and verify the zero-gate minimal circuit in the simulator against all 8 truth table rows.',
      },
      inputs: ['A', 'B', 'C'],
      outputs: ['F'],
      allowedComponents: ['AND', 'OR', 'NOT'],
      maxComponents: { AND: 0, OR: 0, NOT: 0 },
      expectedTruthTable: [
        { inputs: { A: 0, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 0, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 0, B: 1, C: 1 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 0, C: 0 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 0, C: 1 }, outputs: { F: 0 } },
        { inputs: { A: 1, B: 1, C: 0 }, outputs: { F: 1 } },
        { inputs: { A: 1, B: 1, C: 1 }, outputs: { F: 1 } },
      ],
      hint: {
        tr: 'Minterm {2, 3, 6, 7} ikili olarak (010, 011, 110, 111) değerleridir. K-Map\'te 4\'lü bir grup oluşturarak A ve C elenir, F = B çıkar! Yani B anahtarını doğrudan F LED\'ine bağlamanız yeterlidir.',
        en: 'Minterms {2, 3, 6, 7} are (010, 011, 110, 111). Forming a 4-cell group in the K-Map eliminates A and C, leaving F = B! Simply wire switch B directly to LED F.',
      },
      solutionDescription: {
        tr: 'K-Map\'te {2, 3, 6, 7} grubunun sadeleşmiş sonucu F = B\'dir. Herhangi bir mantık kapısı kullanmadan B girişini doğrudan F çıkışına bağlamak en düşük maliyetli (0 kapılı) çözümdür.',
        en: 'The {2, 3, 6, 7} 4-cell group simplifies to F = B. Directly connecting input B to output F with 0 gates is the optimal hardware solution.',
      },
    },
  ],
};
