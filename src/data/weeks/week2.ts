import type { WeekModule } from '../../types/curriculum';

export const week2: WeekModule = {
  id: 2,
  weekNumber: 2,
  englishTitle: {
    tr: 'Number Complements & Binary Codes',
    en: 'Number Complements & Binary Codes',
  },
  turkishSubtitle: {
    tr: 'Sayı Tümleyenleri, İşaretli Sayılar, Overflow ve İkili Kodlar (BCD, Gray, Excess-3)',
    en: 'Number Complements, Signed Numbers, Overflow & Binary Codes (BCD, Gray, Excess-3)',
  },
  summary: {
    tr: 'Bilgisayarların çıkarma işlemini nasıl toplama devreleriyle gerçekleştirdiğini (r\'s ve (r-1)\'s Complement), işaretli sayılarda taşma (Overflow) analizini ve BCD, Gray Code, Excess-3, ASCII ikili kodlarını derinlemesine öğrenin.',
    en: 'Learn how computers perform subtraction using adder hardware (r\'s and (r-1)\'s Complements), analyze signed-number Overflow conditions, and master BCD, Gray Code, Excess-3, and ASCII binary codes.',
  },
  learningObjectives: [
    {
      tr: '1\'s, 2\'s, 9\'s ve 10\'s Complement hesaplamalarını hızlı ve hatasız gerçekleştirmek',
      en: 'Compute 1\'s, 2\'s, 9\'s, and 10\'s Complements quickly and accurately',
    },
    {
      tr: 'M - N çıkarma işlemini ödünç (borrow) almadan tümleyen toplamasıyla yapmak',
      en: 'Perform M - N subtraction without borrows via complement addition',
    },
    {
      tr: 'Signed-Magnitude, 1\'s ve 2\'s Complement gösterim aralıklarını ve Overflow (V) koşulunu analiz etmek',
      en: 'Analyze Signed-Magnitude, 1\'s, and 2\'s Complement ranges and the Overflow (V) condition',
    },
    {
      tr: 'BCD (8421), Excess-3 ve Gray Code dönüşümlerini kavramak ve Binary-to-Gray devresi kurmak',
      en: 'Master BCD (8421), Excess-3, and Gray Code conversions and build a Binary-to-Gray circuit',
    },
  ],
  isPlaceholder: false,
  recommendedWidget: 'BaseComplementVisualizer',
  recommendedWidgetConfig: {
    defaultMode: 'complement',
  },
  visualSections: [
    {
      id: 'w2-s1',
      title: {
        tr: "1. Taban Tümleyenleri: r's Complement ve (r-1)'s Complement",
        en: "1. Radix Complements: r's Complement and (r-1)'s Complement",
      },
      explanation: {
        tr: 'Sayısal sistemlerde çıkarma işlemini basitleştirmek ve negatif sayıları temsil etmek için iki tür tümleyen (Complement) kullanılır: Azaltılmış Taban Tümleyeni [(r-1)\'s Complement: İkilide 1\'s, onlukta 9\'s] ve Taban Tümleyeni [r\'s Complement: İkilide 2\'s, onlukta 10\'s].\n\n💡 Altın Kural (2\'s Complement Kısayolu): Uzun uzun tüm bitleri tersleyip +1 eklemek yerine, sayının en sağından (LSB) başlayarak sola doğru ilerleyin; ilk "1" bitini görene kadar tüm 0\'ları ve o ilk "1" bitini aynen yazın, ilk "1"den sonraki tüm sol bitleri tersleyin (0 ↔ 1).',
        en: 'Digital systems simplify subtraction and represent negative numbers using two complement types: Diminished Radix Complement [(r-1)\'s Complement: 1\'s in binary, 9\'s in decimal] and Radix Complement [r\'s Complement: 2\'s in binary, 10\'s in decimal].\n\n💡 Golden Rule (2\'s Complement Shortcut): Instead of inverting all bits and adding 1, scan from the rightmost bit (LSB) toward the left: keep all trailing 0s and the first "1" unchanged, then invert (0 ↔ 1) every bit to the left of that first "1".',
      },
      keyPoints: [
        {
          tr: "(r-1)'s Complement Formülü: n basamaklı N sayısı için (rⁿ - 1) - N (Onlukta her rakamı 9'dan çıkar; İkilide tüm bitleri tersle).",
          en: "(r-1)'s Complement Formula: (rⁿ - 1) - N for an n-digit number N (subtract each decimal digit from 9; invert every binary bit).",
        },
        {
          tr: "r's Complement Formülü: [(r-1)'s Complement] + 1 = rⁿ - N (N ≠ 0 ise).",
          en: "r's Complement Formula: [(r-1)'s Complement] + 1 = rⁿ - N (for N ≠ 0).",
        },
        {
          tr: 'Örnek (Pratik Kural): 01011000 → Sağdaki "1000" aynen kalır, soldaki "0101" terslenir → 10101000.',
          en: 'Example (Quick Method): 01011000 → Rightmost "1000" stays unchanged, leftmost "0101" is inverted → 10101000.',
        },
      ],
      widget: 'BaseComplementVisualizer',
      widgetConfig: {
        defaultMode: 'complement',
      },
      examTip: {
        tr: 'Bir sayının 2\'s Complement\'inin tekrar 2\'s Complement\'i alınırsa sayının kendisi elde edilir: (N\'\') = N. Bu özelliği sınavda sağlama yapmak için kullanın.',
        en: 'Taking the 2\'s Complement twice restores the original number: (N\'\') = N. Always use this involution property to double-check your exam answers.',
      },
    },
    {
      id: 'w2-s2',
      title: {
        tr: '2. Tümleyenlerle Çıkarma (M - N), İşaretli Sayılar ve Overflow',
        en: '2. Subtraction with Complements (M - N), Signed Numbers & Overflow',
      },
      explanation: {
        tr: 'İki n-basamaklı işaretsiz sayının r\'s tümleyen ile çıkarılması (M - N = M + (rⁿ - N)) tek bir donanım toplayıcısı ile çözülür:\n• Eğer toplam sonunda bir Elde (End Carry) oluşursa: M ≥ N demektir; oluşan elde atılır ve kalan sonuç doğrudan pozitif cevaptır.\n• Eğer toplam sonunda Elde oluşmazsa: M < N demektir; sonuç negatiftir ve gerçek değeri bulmak için elde edilen toplamın tekrar r\'s tümleyeni alınıp başına "-" işareti konur.\n\nİşaretli sayılarda (Signed Numbers) en sol bit işaret bitidir (0 = pozitif, 1 = negatif). İki aynı işaretli sayı toplandığında işaret bitine giren elde (C_in) ile işaret bitinden çıkan elde (C_out) farklıysa Overflow (Taşma) gerçekleşir: V = C_in ⊕ C_out.',
        en: 'Subtracting two n-digit unsigned numbers via r\'s complement (M - N = M + (rⁿ - N)) requires only adder hardware:\n• If an End Carry is produced: M ≥ N; discard the end carry, and the remaining n digits give the positive result directly.\n• If NO End Carry is produced: M < N; the result is negative—take the r\'s complement of the sum and place a minus (-) sign in front.\n\nIn Signed Numbers, the MSB acts as the sign bit (0 = positive, 1 = negative). When adding two same-sign numbers, Overflow occurs if the carry into the sign bit (C_in) differs from the carry out of the sign bit (C_out): V = C_in ⊕ C_out.',
      },
      diagrams: [
        {
          kind: 'steps',
          caption: {
            tr: "r's Complement ile Çıkarma (M - N) Karar Akışı",
            en: "Decision Flow for Subtraction with r's Complement (M - N)",
          },
          steps: [
            {
              label: {
                tr: "Adım 1: N'in r's Tümleyenini Topla",
                en: "Step 1: Add the r's Complement of N",
              },
              badge: "M + N'",
              detail: {
                tr: "M ve N sayılarının basamak sayısını eşitle (başa 0 ekle), ardından M ile N'in r's tümleyenini topla.",
                en: "Match digit widths of M and N (pad leading zeros), then add M to the r's complement of N.",
              },
            },
            {
              label: {
                tr: 'Durum A: Elde (Carry) = 1 ise',
                en: 'Case A: End Carry = 1',
              },
              badge: 'M ≥ N',
              detail: {
                tr: 'En soldan taşan 1 eldesini AT (discard). Kalan n basamak doğrudan (+) sonuçtur.',
                en: 'DISCARD the end carry. The remaining n digits form the positive result directly.',
              },
            },
            {
              label: {
                tr: 'Durum B: Elde (Carry) = 0 ise',
                en: 'Case B: End Carry = 0',
              },
              badge: 'M < N',
              detail: {
                tr: "Sonuç negatiftir! Elde edilen toplamın tekrar r's tümleyenini al ve başına (-) işareti koy.",
                en: "The result is negative! Take the r's complement of the sum and attach a minus (-) sign.",
              },
            },
          ],
        },
        {
          kind: 'table',
          caption: {
            tr: 'n-Bit İşaretli Sayı Gösterim Aralıkları (Örnek: n = 8 bit)',
            en: 'n-Bit Signed Number Representation Ranges (Example: n = 8 bits)',
          },
          headers: [
            { tr: 'Gösterim Yöntemi', en: 'Representation' },
            { tr: 'Genel Aralık Formülü', en: 'General Range Formula' },
            { tr: '8-Bit Aralık', en: '8-Bit Range' },
            { tr: 'Sıfırın Temsili', en: 'Zero Representation' },
          ],
          highlightColumn: 2,
          rows: [
            [
              'Signed-Magnitude',
              '-(2ⁿ⁻¹ - 1) … +(2ⁿ⁻¹ - 1)',
              '-127 … +127',
              { tr: 'Çift Sıfır (+0 ve -0)', en: 'Two Zeros (+0 and -0)' },
            ],
            [
              "1's Complement",
              '-(2ⁿ⁻¹ - 1) … +(2ⁿ⁻¹ - 1)',
              '-127 … +127',
              {
                tr: 'Çift Sıfır (00000000 ve 11111111)',
                en: 'Two Zeros (00000000 and 11111111)',
              },
            ],
            [
              "2's Complement",
              '-2ⁿ⁻¹ … +(2ⁿ⁻¹ - 1)',
              '-128 … +127',
              {
                tr: 'Tek Sıfır (00000000)',
                en: 'Unique Zero (00000000)',
              },
            ],
          ],
        },
      ],
      examTip: {
        tr: 'Overflow (Taşma) yalnızca aynı işaretli iki sayı toplandığında (Pozitif + Pozitif veya Negatif + Negatif) meydana gelebilir. Zıt işaretli iki sayının toplamında asla Overflow oluşmaz!',
        en: 'Overflow can ONLY occur when adding two numbers of the SAME sign (Positive + Positive or Negative + Negative). Adding two opposite-signed numbers never overflows!',
      },
    },
    {
      id: 'w2-s3',
      title: {
        tr: '3. İkili Kodlar: BCD (8421), Excess-3, Gray Code ve ASCII',
        en: '3. Binary Codes: BCD (8421), Excess-3, Gray Code & ASCII',
      },
      explanation: {
        tr: 'Sayısal sistemler yalnızca saf ikili aritmetik değil, aynı zamanda onluk rakamları (BCD), elektromekanik açı sensörlerini (Gray Code) ve metin karakterlerini (ASCII) de kodlar.\n• BCD (8421): Her onluk basamağı ayrı bir 4-bitlik ikili kodla gösterir (1010–1111 arası 6 kod kullanılmaz).\n• Excess-3: Her onluk basamağa +3 eklenerek elde edilen ağırlıksız ve Self-Complementing (öz-tümleyen) koddur.\n• Gray Code: Ardışıl her sayı arasında yalnızca 1 bit değişir; bu sayede mekanik sensörlerde geçiş hatası (glitch) yaşanmaz.',
        en: 'Digital systems encode not only pure binary arithmetic, but also decimal digits (BCD), rotary shaft encoders (Gray Code), and text characters (ASCII).\n• BCD (8421): Represents each decimal digit independently with 4 bits (codes 1010–1111 are unused).\n• Excess-3: An unweighted, self-complementing code obtained by adding +3 to each decimal digit.\n• Gray Code: Adjacent code words differ in only 1 bit, preventing switching glitches in electromechanical sensors.',
      },
      diagrams: [
        {
          kind: 'table',
          caption: {
            tr: '0–9 Arası BCD, Excess-3 ve Gray Code Karşılaştırma Tablosu',
            en: 'Comparison Table of BCD, Excess-3, and Gray Code (0–9)',
          },
          headers: [
            'Decimal',
            { tr: 'Saf Binary (4-bit)', en: 'Pure Binary (4-bit)' },
            'BCD (8421)',
            'Excess-3',
            'Gray Code',
          ],
          highlightColumn: 4,
          rows: [
            ['0', '0000', '0000', '0011', '0000'],
            ['1', '0001', '0001', '0100', '0001'],
            ['2', '0010', '0010', '0101', '0011'],
            ['3', '0011', '0011', '0110', '0010'],
            ['4', '0100', '0100', '0111', '0110'],
            ['5', '0101', '0101', '1000', '0111'],
            ['6', '0110', '0110', '1001', '0101'],
            ['7', '0111', '0111', '1010', '0100'],
            ['8', '1000', '1000', '1011', '1100'],
            ['9', '1001', '1001', '1100', '1101'],
          ],
        },
        {
          kind: 'steps',
          caption: {
            tr: 'Binary ↔ Gray Code Dönüşüm Kuralları (XOR Zinciri)',
            en: 'Binary ↔ Gray Code Conversion Rules (XOR Chain)',
          },
          steps: [
            {
              label: 'Binary → Gray Code',
              badge: 'G_i = B_{i+1} ⊕ B_i',
              detail: {
                tr: 'En soldaki bit (MSB) aynen kopyalanır: G_MSB = B_MSB.\nDiğer her bit, kendi solundaki Binary biti ile XOR yapılır.',
                en: 'Copy the leftmost bit (MSB) directly: G_MSB = B_MSB.\nEach subsequent Gray bit is the XOR of the current Binary bit and the one to its left.',
              },
            },
            {
              label: 'Gray Code → Binary',
              badge: 'B_i = B_{i+1} ⊕ G_i',
              detail: {
                tr: 'En soldaki bit (MSB) aynen alınır: B_MSB = G_MSB.\nSonraki her bit, bir önceki BULUNAN Binary bit ile sıradaki Gray bitin XOR\'udur.',
                en: 'Copy the leftmost bit (MSB) directly: B_MSB = G_MSB.\nEach subsequent Binary bit is the XOR of the previously computed Binary bit and the current Gray bit.',
              },
            },
            {
              label: 'ASCII & Parity Bit',
              badge: '7-bit + 1 Parity',
              detail: {
                tr: 'Standart ASCII 7-bit (128 karakter) kullanır; tek bitlik iletim hatalarını yakalamak için 8. bit olarak Even/Odd Parity eklenir.',
                en: 'Standard ASCII uses 7 bits (128 characters); an 8th Even/Odd Parity bit is appended to detect single-bit transmission errors.',
              },
            },
          ],
        },
      ],
      examTip: {
        tr: 'BCD kesinlikle saf ikili sayı değildir! Örneğin (15)₁₀ sayısı saf ikilide 4 bit (1111) iken, BCD kodunda iki hane × 4 bit = 8 bit (0001 0101) ile gösterilir.',
        en: 'BCD is NOT pure binary! For instance, (15)₁₀ takes 4 bits (1111) in pure binary, whereas in BCD it requires two digits × 4 bits = 8 bits (0001 0101).',
      },
    },
  ],
  questions: [
    {
      id: 'w2-q1',
      type: 'multiple-choice',
      title: {
        tr: "Soru 1 · 10's Complement ile Çıkarma (Mano 1.14)",
        en: "Question 1 · Subtraction via 10's Complement (Mano 1.14)",
      },
      difficulty: 'Orta',
      prompt: {
        tr: "10'a tümleyen (10's Complement) yöntemini kullanarak 3250 - 72532 çıkarma işlemini adım adım gerçekleştiriniz.",
        en: "Perform the decimal subtraction 3250 - 72532 step by step using the 10's Complement method.",
      },
      options: ['-69282', '-69382', '+30718', '-68282'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Basamak Sayılarını Eşitle (5 Hane)',
            en: 'Step 1: Equalize Digit Widths (5 Digits)',
          },
          detail: 'M = 03250  |  N = 72532',
        },
        {
          title: {
            tr: "Adım 2: N'in 10's Complement Değerini Hesapla",
            en: "Step 2: Compute the 10's Complement of N",
          },
          detail: "9's Complement (99999 - 72532) = 27467  ⇒  10's Complement (+1) = 27468",
        },
        {
          title: {
            tr: 'Adım 3: M ile Topla ve Elde (End Carry) Durumunu Kontrol Et',
            en: 'Step 3: Add to M and Check for an End Carry',
          },
          detail: {
            tr: '03250 + 27468 = 30718. En soldan taşan elde OLMADIĞI (Carry = 0) için M < N ve sonuç negatiftir.',
            en: '03250 + 27468 = 30718. Because there is NO End Carry (Carry = 0), M < N and the result is negative.',
          },
        },
        {
          title: {
            tr: "Adım 4: Sonucun Tekrar 10's Complement Değerini Al",
            en: "Step 4: Take the 10's Complement of the Sum",
          },
          detail: {
            tr: '100000 - 30718 = 69282  ⇒  Başına (-) koy: -69282',
            en: '100000 - 30718 = 69282  ⇒  Attach (-): -69282',
          },
        },
      ],
    },
    {
      id: 'w2-q2',
      type: 'multiple-choice',
      title: {
        tr: "Soru 2 · 8-Bit 2's Complement Aritmetiği ve Overflow (Mano 1.15)",
        en: "Question 2 · 8-Bit 2's Complement Arithmetic & Overflow (Mano 1.15)",
      },
      difficulty: 'Sınav Seviyesi',
      prompt: {
        tr: "8-bit işaretli 2'ye tümleyen (2's Complement) sisteminde (-45)₁₀ + (-90)₁₀ toplama işlemi yapıldığında elde edilen 8-bit toplam ve Overflow (V) durumu nedir?",
        en: "In an 8-bit signed 2's Complement system, what are the 8-bit sum and Overflow (V) status when computing (-45)₁₀ + (-90)₁₀?",
      },
      options: [
        {
          tr: '8-bit Toplam: 01111001 (+121), Overflow (V) = 1 (Taşma Var)',
          en: '8-bit Sum: 01111001 (+121), Overflow (V) = 1 (Overflow)',
        },
        {
          tr: '8-bit Toplam: 10000111 (-121), Overflow (V) = 0 (Taşma Yok)',
          en: '8-bit Sum: 10000111 (-121), Overflow (V) = 0 (No Overflow)',
        },
        {
          tr: '8-bit Toplam: 01111001 (+121), Overflow (V) = 0 (Taşma Yok)',
          en: '8-bit Sum: 01111001 (+121), Overflow (V) = 0 (No Overflow)',
        },
        {
          tr: '8-bit Toplam: 11111001 (-7), Overflow (V) = 1 (Taşma Var)',
          en: '8-bit Sum: 11111001 (-7), Overflow (V) = 1 (Overflow)',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: "Adım 1: Sayıların 8-Bit 2's Complement Gösterimlerini Yaz",
            en: "Step 1: Write the 8-Bit 2's Complement Representations",
          },
          detail:
            '+45 = 00101101₂ → -45 = 11010011₂\n+90 = 01011010₂ → -90 = 10100110₂',
        },
        {
          title: {
            tr: 'Adım 2: 8-Bit Toplama İşlemini Yap',
            en: 'Step 2: Perform 8-Bit Addition',
          },
          detail: {
            tr: '  11010011 (-45)\n+ 10100110 (-90)\n─────────────────\n(1) 01111001  (8-bit alan: 01111001 = +121)',
            en: '  11010011 (-45)\n+ 10100110 (-90)\n─────────────────\n(1) 01111001  (8-bit result: 01111001 = +121)',
          },
        },
        {
          title: {
            tr: 'Adım 3: Overflow (V = C_in ⊕ C_out) Analizi',
            en: 'Step 3: Overflow Analysis (V = C_in ⊕ C_out)',
          },
          detail: {
            tr: 'İşaret bitine giren elde C_in = 0, işaret bitinden çıkan elde C_out = 1 ⇒ V = 0 ⊕ 1 = 1 (Taşma Var). İki negatif sayı toplanıp pozitif sonuç (0 ile başlayan) üretildiği için ve -135 ∉ [-128, +127] olduğundan Overflow gerçekleşmiştir.',
            en: 'Carry into sign bit C_in = 0 and carry out of sign bit C_out = 1 ⇒ V = 0 ⊕ 1 = 1 (Overflow). Adding two negative numbers produced a positive result (MSB = 0) because -135 falls outside [-128, +127].',
          },
        },
      ],
    },
    {
      id: 'w2-q3',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 3 · Binary → Gray Code Dönüşümü (Pratik Yöntem)',
        en: 'Question 3 · Binary → Gray Code Conversion (Quick Method)',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '(101101)₂ ikili sayısının Gray Code karşılığı aşağıdakilerden hangisidir?',
        en: 'What is the Gray Code equivalent of the binary number (101101)₂?',
      },
      options: ['111011', '110110', '101011', '111001'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: MSB Bitini Aynen Al',
            en: 'Step 1: Copy the MSB Unchanged',
          },
          detail: 'B = [1, 0, 1, 1, 0, 1]  ⇒  G₅ = B₅ = 1',
        },
        {
          title: {
            tr: 'Adım 2: Ardışıl Komşu Bitleri XOR İşlemine Sok',
            en: 'Step 2: XOR Adjacent Binary Bits',
          },
          detail:
            'G₄ = 1⊕0 = 1 | G₃ = 0⊕1 = 1 | G₂ = 1⊕1 = 0 | G₁ = 1⊕0 = 1 | G₀ = 0⊕1 = 1',
        },
        {
          title: {
            tr: 'Adım 3: Bitleri Birleştir',
            en: 'Step 3: Combine the Resulting Bits',
          },
          detail: 'Gray Code = 111011',
        },
      ],
    },
    {
      id: 'w2-q4',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 4 · BCD (8421) vs Saf Binary Bit Sayısı',
        en: 'Question 4 · BCD (8421) vs Pure Binary Bit Width',
      },
      difficulty: 'Temel',
      prompt: {
        tr: '(185)₁₀ onluk sayısı BCD (8421) koduyla ve saf ikili (Pure Binary) sistemle yazıldığında sırasıyla kaç bit gerekir?',
        en: 'How many bits are required to represent (185)₁₀ in BCD (8421) code versus Pure Binary, respectively?',
      },
      options: [
        {
          tr: 'BCD: 12 bit (0001 1000 0101), Saf Binary: 8 bit (10111001)',
          en: 'BCD: 12 bits (0001 1000 0101), Pure Binary: 8 bits (10111001)',
        },
        {
          tr: 'BCD: 8 bit (10111001), Saf Binary: 12 bit (0001 1000 0101)',
          en: 'BCD: 8 bits (10111001), Pure Binary: 12 bits (0001 1000 0101)',
        },
        {
          tr: 'BCD: 12 bit (0001 1000 0101), Saf Binary: 7 bit (0111001)',
          en: 'BCD: 12 bits (0001 1000 0101), Pure Binary: 7 bits (0111001)',
        },
        {
          tr: 'BCD: 9 bit, Saf Binary: 8 bit',
          en: 'BCD: 9 bits, Pure Binary: 8 bits',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: BCD (8421) Kodlaması',
            en: 'Step 1: BCD (8421) Encoding',
          },
          detail: {
            tr: '1 → 0001 | 8 → 1000 | 5 → 0101  ⇒  3 basamak × 4 bit = 12 bit gerekir.',
            en: '1 → 0001 | 8 → 1000 | 5 → 0101  ⇒  3 decimal digits × 4 bits = 12 bits.',
          },
        },
        {
          title: {
            tr: 'Adım 2: Saf Binary Dönüşümü',
            en: 'Step 2: Pure Binary Conversion',
          },
          detail: {
            tr: '185 = 128 + 32 + 16 + 8 + 1 = (10111001)₂  ⇒  8 bit yeterlidir.',
            en: '185 = 128 + 32 + 16 + 8 + 1 = (10111001)₂  ⇒  8 bits are sufficient.',
          },
        },
      ],
    },
    {
      id: 'w2-q5',
      type: 'multiple-choice',
      title: {
        tr: 'Soru 5 · Excess-3 Self-Complementing Özelliği',
        en: 'Question 5 · Self-Complementing Property of Excess-3',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Excess-3 (Artı-3) kodunun aritmetik devrelerde tercih edilmesini sağlayan "Self-Complementing" (öz-tümleyen) özelliği ne anlama gelir?',
        en: 'What does the "Self-Complementing" property of Excess-3 code mean in digital arithmetic circuits?',
      },
      options: [
        {
          tr: 'Bir onluk rakamın 9\'a tümleyeni, Excess-3 kodunun tüm bitlerini tersleyerek (1\'s complement) doğrudan elde edilir.',
          en: 'The 9\'s complement of a decimal digit is obtained directly by inverting all 4 bits (1\'s complement) of its Excess-3 code.',
        },
        {
          tr: 'Her rakamın ikili karşılığı 3 ile çarpılarak taşma önlenir.',
          en: 'Each digit\'s binary code is multiplied by 3 to prevent overflow.',
        },
        {
          tr: 'Negatif sayılar için ayrı bir işaret biti gerekmez.',
          en: 'No separate sign bit is needed for negative numbers.',
        },
        {
          tr: 'Ardışıl rakamlar arasında yalnızca tek bir bit değişir.',
          en: 'Only a single bit changes between consecutive decimal digits.',
        },
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: {
            tr: 'Adım 1: Matematiksel Doğrulama',
            en: 'Step 1: Mathematical Verification',
          },
          detail: {
            tr: 'Rakam d için Excess-3 kodu (d + 3)₂\'dir. Tüm 4 bit terslenirse 15 - (d + 3) = (9 - d) + 3 elde edilir; bu da tam olarak (9 - d) rakamının Excess-3 kodudur!',
            en: 'For decimal digit d, Excess-3 is (d + 3)₂. Inverting all 4 bits yields 15 - (d + 3) = (9 - d) + 3, which is exactly the Excess-3 code for (9 - d)!',
          },
        },
        {
          title: {
            tr: 'Adım 2: Sayısal Örnek (d = 2 ve 9 - d = 7)',
            en: 'Step 2: Numerical Example (d = 2 and 9 - d = 7)',
          },
          detail: {
            tr: '2 → Excess-3: 0101. Bitleri tersle → 1010 = 10₁₀ = 7 + 3 (7\'nin Excess-3 kodu).',
            en: '2 → Excess-3: 0101. Invert bits → 1010 = 10₁₀ = 7 + 3 (Excess-3 code for 7).',
          },
        },
      ],
    },
    {
      id: 'w2-q6',
      type: 'simulator-build',
      title: {
        tr: 'Soru 6 · 2-Bit Binary-to-Gray Code Dönüştürücü (Canlı Lab)',
        en: 'Question 6 · 2-Bit Binary-to-Gray Code Converter (Live Lab)',
      },
      difficulty: 'Orta',
      prompt: {
        tr: 'Simülatörde 2-bit Binary-to-Gray Code dönüştürücü devresini kurun. Girişler: B1 (MSB) ve B0 (LSB). Çıkışlar: G1 = B1 ve G0 = B1 ⊕ B0. Kablo ve XOR kapısı kullanarak devreyi tamamlayın ve "Devreyi Doğrula" butonuna basın.',
        en: 'Build a 2-bit Binary-to-Gray Code converter in the simulator. Inputs: B1 (MSB) and B0 (LSB). Outputs: G1 = B1 and G0 = B1 ⊕ B0. Wire the circuit using an XOR gate and click "Verify Circuit".',
      },
      inputs: ['B1', 'B0'],
      outputs: ['G1', 'G0'],
      allowedComponents: ['XOR'],
      expectedTruthTable: [
        { inputs: { B1: 0, B0: 0 }, outputs: { G1: 0, G0: 0 } },
        { inputs: { B1: 0, B0: 1 }, outputs: { G1: 0, G0: 1 } },
        { inputs: { B1: 1, B0: 0 }, outputs: { G1: 1, G0: 1 } },
        { inputs: { B1: 1, B0: 1 }, outputs: { G1: 1, G0: 0 } },
      ],
      hint: {
        tr: 'B1 çıkış pinini doğrudan G1 LED\'ine bağlayın (G1 = B1). Ayrıca B1 ve B0 girişlerini bir XOR kapısına bağlayıp XOR çıkışını G0 LED\'ine iletin.',
        en: 'Connect input B1 directly to output LED G1 (G1 = B1). Then feed B1 and B0 into an XOR gate and connect its output to LED G0.',
      },
      solutionDescription: {
        tr: 'Gray Code dönüşümünde en anlamlı bit değişmez (G1 = B1), sonraki bit ise B1 ⊕ B0 ile üretilir. Bu devre yalnızca 1 adet XOR kapısı ve doğrudan kablo bağlantısıyla 4 satırlık tüm dönüşüm tablosunu sağlar.',
        en: 'In Gray Code conversion, the MSB passes through unchanged (G1 = B1), while the next bit is G0 = B1 ⊕ B0. Only 1 XOR gate and one direct wire satisfy all 4 rows.',
      },
    },
  ],
};
