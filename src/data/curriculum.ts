export interface BilingualText {
  en: string;
  tr: string;
}

export interface FocusCard {
  id: string;
  type: 'concept' | 'formula' | 'method' | 'exam-tip';
  title: BilingualText;
  content: BilingualText;
  formulaOrCode?: string;
  pdfPage: number;
}

export interface WeekCurriculum {
  week: number;
  lectureCode: string;
  title: BilingualText;
  bookSection: string;
  pdfRange: [number, number];
  labPreset?: string;
  cards: FocusCard[];
}

export const CURRICULUM_DATA: WeekCurriculum[] = [
  {
    week: 1,
    lectureCode: 'Lecture 0',
    title: {
      en: 'Introduction & Digital Systems',
      tr: 'Derse Giriş ve Sayısal Sistemler',
    },
    bookSection: 'Sec. 1.1 & Sec. 2.9',
    pdfRange: [18, 92],
    cards: [
      {
        id: 'w1-c1',
        type: 'concept',
        title: {
          en: 'Digital vs. Analog & Sync vs. Async Systems',
          tr: 'Sayısal ve Analog / Senkron ve Asenkron Sistemler',
        },
        content: {
          en: '• Digital System: Signals take a finite number of discrete values (0 and 1); discrete-time signals are defined only at specific instants (t = 0, 1, 2...).\n• Analog System: Signals vary continuously over time and take infinitely many values.\n• Synchronous vs. Asynchronous: Synchronous signals change only at discrete clock instants; asynchronous signals can change at any instant.',
          tr: '• Sayısal Sistem: Sinyaller sonlu sayıda ayrık değer (0 ve 1) alır; ayrık zamanlı sinyaller yalnızca belirli zaman anlarında (t = 0, 1, 2...) tanımlıdır.\n• Analog Sistem: Sinyaller zamanla sürekli değişir ve sonsuz sayıda değer alır.\n• Senkron ve Asenkron: Senkron sistemlerde işaretler yalnızca saat darbeleriyle değişirken, asenkron sistemlerde her an değişebilir.',
        },
        pdfPage: 18,
      },
      {
        id: 'w1-c2',
        type: 'concept',
        title: {
          en: 'Speed vs. Hardware Trade-off & Digitization',
          tr: 'Hız-Donanım Takası ve Sayısallaştırma (ADC/DAC)',
        },
        content: {
          en: '• Digital Advantages: Insensitive to component variations and noise; accuracy easily increases by adding more digits.\n• Speed vs. Hardware: Parallel addition processes all digits simultaneously (fast, more hardware), while serial addition uses one adder repeatedly (slower, minimal hardware).\n• ADC & DAC: Real-world analog signals are quantized via ADC, processed digitally, and restored via DAC.',
          tr: '• Sayısal Avantajlar: Bileşen sapmalarına ve gürültüye karşı duyarsızdır; basamak sayısı artırılarak doğruluk kolayca yükseltilir.\n• Hız ve Donanım Takası: Paralel toplama tüm basamakları aynı anda işler (yüksek hız, fazla donanım); seri toplama tek toplayıcıyı tekrar kullanır (düşük hız, az donanım).\n• ADC ve DAC: Gerçek dünya sinyalleri ADC ile sayısala çevrilip işlenir ve DAC ile temiz analog sinyale dönüştürülür.',
        },
        pdfPage: 19,
      },
      {
        id: 'w1-c3',
        type: 'formula',
        title: {
          en: 'Combinational vs. Sequential Systems',
          tr: 'Birleşik (Combinational) ve Ardışıl (Sequential) Sistemler',
        },
        content: {
          en: '• Combinational Systems: Output at time t depends ONLY on the present input at time t. Contains logic gates only (no memory).\n• Sequential Systems: Output at time t depends on both the present input and past input history. Contains logic gates plus memory elements.',
          tr: '• Birleşik Sistemler: t anındaki çıkış YALNIZCA t anındaki girişe bağlıdır. Bellek içermez, sadece mantık kapılarından oluşur.\n• Ardışıl Sistemler: t anındaki çıkış hem o anki girişe hem de geçmiş giriş dizisine bağlıdır. Mantık kapılarına ek olarak bellek elemanları içerir.',
        },
        formulaOrCode: 'Combinational: z(t) = F(x(t))   |   Sequential: z(t) = F(x(0, t))',
        pdfPage: 20,
      },
      {
        id: 'w1-c4',
        type: 'concept',
        title: {
          en: 'IC Integration Scales & Programmable Logic',
          tr: 'Entegre Devre (IC) Ölçekleri ve Programlanabilir Lojik',
        },
        content: {
          en: '• SSI (<=10 transistors): Basic gates (AND, OR, NOT).\n• MSI (10-100): Adders, decoders, multiplexers, flip-flops.\n• LSI (100-1k) & VLSI (1k-10k): Memory arrays, ALUs, early processors.\n• SLSI (10k-100k) & ULSI (>1M): Microcontrollers, CPUs, GPUs, FPGAs.\n• SOC (System on Chip): Integrates CPU, memory, peripherals, and I/O on a single die alongside ASIC/FPGA architectures.',
          tr: '• SSI (<=10 transistör): Temel kapılar (AND, OR, NOT).\n• MSI (10-100): Toplayıcılar, kod çözücüler, MUX ve flip-floplar.\n• LSI (100-1B) ve VLSI (1B-10B): Bellek dizileri, ALU ve işlemciler.\n• SLSI (10B-100B) ve ULSI (>1M): Mikrodenetleyiciler, CPU, GPU ve FPGA yongaları.\n• SOC (System on Chip): Mikroişlemci, bellek ve çevre birimlerini tek silikon yongada birleştirir.',
        },
        pdfPage: 90,
      },
    ],
  },
  {
    week: 2,
    lectureCode: 'Lecture 1',
    title: {
      en: 'Binary Systems, Base Conversions & Complements',
      tr: 'İkili Sayı Sistemleri, Taban Dönüşümleri ve Tümleyenler',
    },
    bookSection: 'Sec. 1.2 - 1.6',
    pdfRange: [21, 39],
    cards: [
      {
        id: 'w2-c1',
        type: 'formula',
        title: {
          en: 'Positional Number Systems (Base-r)',
          tr: 'Konumsal Sayı Sistemleri (r Tabanı)',
        },
        content: {
          en: '• Any number in radix r is expressed as a power series where each coefficient satisfies 0 <= a_j <= r - 1.\n• Standard Bases: Binary (r=2), Octal (r=8), Decimal (r=10), Hexadecimal (r=16, digits 0-9 and A-F).\n• To convert Base-r to Decimal, multiply each digit by its positional weight r^j and sum all terms.',
          tr: '• r tabanındaki her sayı, katsayıları 0 <= a_j <= r - 1 koşulunu sağlayan r kuvvetlerinin toplamı şeklinde yazılır.\n• Temel Tabanlar: İkili (r=2), Sekizlik (r=8), Onluk (r=10), Onaltılık (r=16, rakamlar 0-9 ve A-F).\n• Base-r tabanından onluk tabana geçmek için her basamak kendi ağırlığı (r^j) ile çarpılıp toplanır.',
        },
        formulaOrCode: 'N = a_n·r^n + ... + a_1·r^1 + a_0·r^0 + a_-1·r^-1 + ... + a_-m·r^-m',
        pdfPage: 21,
      },
      {
        id: 'w2-c2',
        type: 'method',
        title: {
          en: 'Number Base Conversion Rules',
          tr: 'Taban Dönüşüm Yöntemleri',
        },
        content: {
          en: '• Decimal to Base-r (Integer): Repeatedly divide by r; collect remainders from bottom (LSB) to top (MSB).\n• Decimal to Base-r (Fraction): Repeatedly multiply fraction by r; collect integer parts from top (a_-1) to bottom.\n• Binary <-> Octal / Hex: Group binary bits in 3s (2^3=8) for Octal or in 4s (2^4=16) for Hex starting from the binary point.',
          tr: '• Onluk -> Base-r (Tam Kısım): Sayıyı sürekli r tabanına böl; kalanları en alttan (en az anlamlı bit) en üste doğru sırala.\n• Onluk -> Base-r (Kesir Kısmı): Kesri sürekli r ile çarp; oluşan tam kısımları yukarıdan aşağıya doğru yaz.\n• İkili <-> Sekizlik / Onaltılık: İkili noktadan sağa ve sola doğru 3\'erli bit grupları Octal, 4\'erli bit grupları Hex rakamlarına karşılık gelir.',
        },
        formulaOrCode: '(41.6875)_10 = (101001.1011)_2 = (51.54)_8 = (29.B)_16',
        pdfPage: 24,
      },
      {
        id: 'w2-c3',
        type: 'formula',
        title: {
          en: 'Radix & Diminished Radix Complements',
          tr: 'Tabana (r) ve (r-1)\'e Tümleyenler',
        },
        content: {
          en: '• (r-1)\'s Complement: Subtract every digit from (r-1). For binary (1\'s complement), flip every bit (0 <-> 1).\n• r\'s Complement: Add 1 to the (r-1)\'s complement.\n• 2\'s Complement Shortcut: Keep all trailing 0s and the first 1 from the right unchanged, then invert all bits to the left.',
          tr: '• (r-1)\'e Tümleyen: Her rakamı (r-1)\'den çıkar. İkili tabanda (1\'e tümleyen) tüm bitler terslenir (0 <-> 1).\n• r\'ye Tümleyen: (r-1)\'e tümleyene 1 eklenir.\n• 2\'ye Tümleyen Kısa Yolu: Sağdan ilk 1 dahil tüm bitleri aynen bırak, solundaki tüm bitleri tersle.',
        },
        formulaOrCode: '(r-1)\'s Comp: (r^n - 1) - N   |   r\'s Comp: r^n - N = [(r^n - 1) - N] + 1',
        pdfPage: 27,
      },
      {
        id: 'w2-c4',
        type: 'exam-tip',
        title: {
          en: 'Subtraction with Complements & Signed Numbers',
          tr: 'Tümleyenlerle Çıkarma ve İşaretli Sayılar',
        },
        content: {
          en: '• M - N via r\'s Complement: Compute M + (r^n - N). If an end carry occurs (M >= N), discard it. If NO end carry occurs (M < N), take the r\'s complement of the sum and place a minus sign.\n• (r-1)\'s Complement Rule: If an end carry occurs, add it back to the LSB (End-Around Carry).\n• Signed Binary: 2\'s complement has a single zero (0000) and represents [-2^(n-1) to +2^(n-1) - 1].',
          tr: '• r\'ye Tümleyen ile M - N: M + (r^n - N) hesaplanır. Son elde (end carry) oluşursa (M >= N) elde atılır. Son elde oluşmazsa (M < N) toplamın tekrar tümleyeni alınır ve başına eksi (-) konur.\n• (r-1)\'e Tümleyen Farkı: Son elde oluşursa sonuca eklenir (End-Around Carry).\n• İşaretli Sayılar: 2\'ye tümleyende tek sıfır (0000) vardır ve 4 bit aralığı -8 ile +7 arasındadır.',
        },
        pdfPage: 31,
      },
    ],
  },
  {
    week: 3,
    lectureCode: 'Lecture 2',
    title: {
      en: 'Binary Codes & Boolean Algebra',
      tr: 'İkili Kodlar ve Boole Cebri',
    },
    bookSection: 'Sec. 1.7 - 1.9 & 2.1 - 2.5',
    pdfRange: [39, 73],
    cards: [
      {
        id: 'w3-c1',
        type: 'concept',
        title: {
          en: 'BCD, Gray Code, ASCII & Parity Bit',
          tr: 'BCD, Gray Kodu, ASCII ve Eşlik (Parity) Biti',
        },
        content: {
          en: '• BCD (Binary-Coded Decimal): Encodes each decimal digit (0-9) into 4 bits (1010-1111 unused).\n• Gray Code: Consecutive numbers differ by ONLY 1 bit, preventing transition errors in analog-to-digital sensors.\n• ASCII: 7-bit character code (128 characters), typically stored in an 8-bit byte.\n• Parity Bit: Extra bit added for single-bit error detection (Even Parity makes total 1s even; Odd Parity makes total 1s odd).',
          tr: '• BCD Kodu: Her onluk basamağı (0-9) 4 bitlik ikili karşılığıyla kodlar (1010-1111 kullanılmaz).\n• Gray Kodu: Ardışık iki sayı arasında YALNIZCA 1 bit değişir; sensör ve ADC geçiş hatalarını önler.\n• ASCII: Alfanümerik karakterler için 7 bitlik (128 karakter) koddur; 8 bitlik byte içinde saklanır.\n• Parity Biti: Tek bitlik iletim hatalarını yakalar (Even Parity toplam 1 sayısını çift, Odd Parity tek yapar).',
        },
        formulaOrCode: '(185)_10 = (0001 1000 0101)_BCD (12-bit)  vs.  (10111001)_2 (8-bit)',
        pdfPage: 39,
      },
      {
        id: 'w3-c2',
        type: 'concept',
        title: {
          en: 'Binary Logic Gates, Voltage Levels & Timing',
          tr: 'Temel Mantık Kapıları, Gerilim Seviyeleri ve Zamanlama',
        },
        content: {
          en: '• Three fundamental operations: AND (x·y), OR (x+y), and NOT (x\').\n• Physical Voltage Ranges: Logic-1 and Logic-0 correspond to distinct voltage bands separated by an unacceptable transition region.\n• Timing Diagrams: Illustrate signal transitions over time and show how gate outputs respond to input changes.',
          tr: '• Üç temel mantık işlemi: AND (x·y), OR (x+y) ve NOT (x\').\n• Fiziksel Gerilim Aralıkları: Lojik-1 ve Lojik-0 belirli gerilim bantlarıyla tanımlanır; aradaki bölge geçiş bölgesidir.\n• Zamanlama Diyagramları: Giriş değişimlerine kapı çıkışlarının zaman ekseninde verdiği tepkiyi gösterir.',
        },
        pdfPage: 51,
      },
      {
        id: 'w3-c3',
        type: 'formula',
        title: {
          en: 'Boolean Axioms, Duality & DeMorgan\'s Theorems',
          tr: 'Boole Aksiyomları, İkilik İlkesi ve DeMorgan Teoremleri',
        },
        content: {
          en: '• Distributive Laws: x(y + z) = xy + xz AND x + yz = (x + y)(x + z) (unique to Boolean algebra).\n• Duality Principle: Every algebraic expression remains valid if operators (· <-> +) and identity elements (0 <-> 1) are interchanged.\n• Absorption: x + xy = x and x(x + y) = x.',
          tr: '• Dağılma Yasaları: x(y + z) = xy + xz ve Boole cebrine özgü x + yz = (x + y)(x + z) eşitliği.\n• İkilik (Duality) İlkesi: İfadedeki operatörler (· <-> +) ve sabitler (0 <-> 1) karşılıklı değiştirilirse ifadenin ikili elde edilir.\n• Yutma (Absorption): x + xy = x ve x(x + y) = x.',
        },
        formulaOrCode: 'DeMorgan: (x + y)\' = x\'y\'   |   (x · y)\' = x\' + y\'',
        pdfPage: 59,
      },
      {
        id: 'w3-c4',
        type: 'method',
        title: {
          en: 'Operator Precedence & Fast Function Complement',
          tr: 'İşlem Önceliği ve Fonksiyonun Tümleyenini Alma Kısa Yolu',
        },
        content: {
          en: '• Precedence Order: 1. Parentheses -> 2. NOT -> 3. AND -> 4. OR.\n• Hardware Cost: Each term corresponds to a gate and each literal corresponds to a gate input; simplification directly reduces chip area and delay.\n• Fast Complement (F\'): Step 1: Take the dual of F (swap · and +, 0 and 1). Step 2: Complement every literal.',
          tr: '• İşlem Önceliği: 1. Parantezler -> 2. NOT -> 3. AND -> 4. OR.\n• Donanım Maliyeti: Her terim bir kapıya, her literal bir kapı girişine karşılık gelir; sadeleştirme maliyeti ve gecikmeyi düşürür.\n• F\' Bulma Kısa Yolu: 1) Fonksiyonun ikilini (dual) al (· <-> +), 2) Her literalin tümleyenini al.',
        },
        formulaOrCode: 'F = x\'yz\' + x\'y\'z  ==>  Dual: (x\'+y+z\')(x\'+y\'+z)  ==>  F\' = (x+y\'+z)(x+y+z\')',
        pdfPage: 68,
      },
    ],
  },
  {
    week: 4,
    lectureCode: 'Lecture 3',
    title: {
      en: 'Canonical / Standard Forms & Logic Gates',
      tr: 'Kanonik / Standart Formlar ve Lojik Kapılar',
    },
    bookSection: 'Sec. 2.6 - 2.8',
    pdfRange: [73, 90],
    labPreset: 'basic-gates',
    cards: [
      {
        id: 'w4-c1',
        type: 'concept',
        title: {
          en: 'Minterms & Maxterms',
          tr: 'Mintermler ve Maxtermler',
        },
        content: {
          en: '• For n variables, there are 2^n minterms and 2^n maxterms.\n• Minterm (m_j): Standard AND term where 0-bits are primed (x\') and 1-bits are unprimed (x). Evaluates to 1 for a single row.\n• Maxterm (M_j): Standard OR term where 0-bits are unprimed (x) and 1-bits are primed (x\'). Evaluates to 0 for a single row.',
          tr: '• n değişken için 2^n adet minterm ve 2^n adet maxterm tanımlanır.\n• Minterm (m_j): 0 olan değişkenin tümleyenli (x\'), 1 olanın düz (x) yazıldığı standart çarpım (AND) terimidir.\n• Maxterm (M_j): 0 olan değişkenin düz (x), 1 olanın tümleyenli (x\') yazıldığı standart toplam (OR) terimidir.',
        },
        formulaOrCode: 'm_j\' = M_j   |   Example (n=3, row 5 = 101): m_5 = xy\'z,  M_5 = x\' + y + z\'',
        pdfPage: 73,
      },
      {
        id: 'w4-c2',
        type: 'method',
        title: {
          en: 'Canonical Forms & Sum-Product Conversion',
          tr: 'Kanonik Formlar ve Sigma - Pi Dönüşümü',
        },
        content: {
          en: '• Sum of Minterms (Sigma): OR of all minterms where F = 1. Expand missing variables in SOP using (x + x\').\n• Product of Maxterms (Pi): AND of all maxterms where F = 0. Expand missing variables in POS by ORing (xx\') and distributing.\n• Conversion Shortcut: Swap Sigma and Pi symbols and list the missing indices from {0 ... 2^n - 1}.',
          tr: '• Mintermlerin Toplamı (Sigma): F = 1 yapan mintermlerin OR\'lanmasıdır. Eksik değişkenler (x + x\') ile çarpılarak genişletilir.\n• Maxtermlerin Çarpımı (Pi): F = 0 yapan maxtermlerin AND\'lenmesidir. Eksik değişkenler xx\' eklenip dağıtılarak genişletilir.\n• Dönüşüm Kısa Yolu: Sigma ve Pi sembollerini değiştir, parantez içine eksik indeksleri yaz.',
        },
        formulaOrCode: 'F(A,B,C) = Sigma(1, 4, 5, 6, 7) = Pi(0, 2, 3)',
        pdfPage: 76,
      },
      {
        id: 'w4-c3',
        type: 'concept',
        title: {
          en: 'Standard Forms & Two-Level Implementation',
          tr: 'Standart Formlar ve İki Seviyeli Devre Uygulaması',
        },
        content: {
          en: '• Standard SOP (Sum of Products): Product terms (AND gates) feeding a single OR gate -> 2-level implementation.\n• Standard POS (Product of Sums): Sum terms (OR gates) feeding a single AND gate -> 2-level implementation.\n• Nonstandard Form: e.g., AB + C(D + E) requires 3 gate levels; distributing to AB + CD + CE reduces propagation delay to 2 levels.',
          tr: '• Standart SOP: AND kapılarından oluşan bir katmanın tek OR kapısına bağlandığı 2 seviyeli devredir.\n• Standart POS: OR kapılarından oluşan bir katmanın tek AND kapısına bağlandığı 2 seviyeli devredir.\n• Standart Olmayan Form: Örneğin AB + C(D + E) 3 seviyeli kapılama gerektirir; AB + CD + CE biçimine açılarak 2 seviyeye indirilir.',
        },
        pdfPage: 79,
      },
      {
        id: 'w4-c4',
        type: 'exam-tip',
        title: {
          en: 'Multi-Input Gates & Positive vs. Negative Logic',
          tr: 'Çok Girişli Kapılar ve Pozitif / Negatif Mantık',
        },
        content: {
          en: '• Non-Associativity Trap: NAND and NOR are commutative (x ↑ y = y ↑ x) but NOT associative: (x ↑ y) ↑ z != x ↑ (y ↑ z). Multi-input NAND/NOR are defined strictly as (xyz)\' and (x+y+z)\'.\n• Multi-input XOR: Acts as an Odd Function (outputs 1 when an odd number of inputs are 1).\n• Positive vs. Negative Logic: Assigning H=1, L=0 gives Positive Logic; H=0, L=1 gives Negative Logic (a physical AND gate becomes a Negative-Logic OR gate).',
          tr: '• Birleşme Özelliği Tuzağı: NAND ve NOR değişme özelliğine sahiptir ancak BİRLEŞME özelliğine sahip DEĞİLDİR: (x ↑ y) ↑ z != x ↑ (y ↑ z). Çok girişli NAND/NOR doğrudan (xyz)\' ve (x+y+z)\' olarak tanımlanır.\n• Çok Girişli XOR: Tek fonksiyon (Odd Function) olarak çalışır (tek sayıda 1 varsa çıkış 1 olur).\n• Pozitif / Negatif Mantık: H=1, L=0 seçimi Pozitif Mantık; H=0, L=1 seçimi Negatif Mantık verir (fiziksel AND kapısı negatif mantıkta OR kapısı olur).',
        },
        pdfPage: 84,
      },
    ],
  },
  {
    week: 5,
    lectureCode: 'Lecture 4',
    title: {
      en: 'Gate-Level Minimization: Karnaugh Maps (K-Maps)',
      tr: 'Kapı Seviyesinde Sadeleştirme: Karnaugh Haritaları',
    },
    bookSection: 'Sec. 3.1 - 3.4',
    pdfRange: [99, 116],
    cards: [
      {
        id: 'w5-c1',
        type: 'concept',
        title: {
          en: 'K-Map Structure & Gray Code Adjacency',
          tr: 'Karnaugh Haritası Yapısı ve Gray Kodu Komşuluğu',
        },
        content: {
          en: '• Visual diagram method for finding minimum two-level SOP or POS expressions without algebraic trial-and-error.\n• Gray Code Ordering: Rows and columns follow 00, 01, 11, 10 so that physically adjacent squares differ in ONLY ONE variable.\n• Wrap-Around Adjacency: Top/bottom edges, left/right edges, and all four corners of a 4-variable map are logically adjacent.',
          tr: '• Cebirsel deneme-yanılma yapmadan en sade iki seviyeli SOP veya POS ifadeyi bulmayı sağlayan görsel yöntemdir.\n• Gray Kodu Sıralaması: Satır ve sütunlar 00, 01, 11, 10 sırasıyla dizilir; böylece komşu iki kare yalnızca 1 değişken bakımından farklıdır.\n• Kenar Komşuluğu: Haritanın üst/alt kenarları, sağ/sol kenarları ve 4 köşesi birbirine komşudur.',
        },
        pdfPage: 99,
      },
      {
        id: 'w5-c2',
        type: 'method',
        title: {
          en: 'K-Map Grouping Rules (Powers of 2)',
          tr: 'K-Map Gruplama Kuralları (2\'nin Kuvvetleri)',
        },
        content: {
          en: '• Group only rectangular blocks of 2^k adjacent 1s (1, 2, 4, 8, 16, or 32 cells).\n• Larger groups eliminate more variables: in an n-variable K-map, a group of 2^k squares eliminates k variables and yields a product term with (n - k) literals.\n• Overlapping groups are allowed and encouraged if they create larger groups; avoid redundant groups whose cells are all covered by other groups.',
          tr: '• Yalnızca 2^k adet (1, 2, 4, 8, 16 veya 32) komşu kareyi içeren dikdörtgen/kare gruplar oluşturulabilir.\n• n değişkenli bir haritada 2^k karenin birleştirilmesi k değişkeni eler ve (n - k) literalli bir çarpım terimi üretir.\n• Daha büyük grup oluşturmak için gruplar kesişebilir; tüm kareleri başka gruplarca kapsanan gereksiz gruplar alınmaz.',
        },
        formulaOrCode: 'n variables, group size 2^k  ==>  Term has (n - k) literals',
        pdfPage: 103,
      },
      {
        id: 'w5-c3',
        type: 'concept',
        title: {
          en: '4-Variable & 5-Variable Karnaugh Maps',
          tr: '4 Değişkenli ve 5 Değişkenli Karnaugh Haritaları',
        },
        content: {
          en: '• 4-Variable K-Map (w, x, y, z): 16 squares; 1-cell = 4 literals, 2-cells = 3 literals, 4-cells = 2 literals, 8-cells = 1 literal.\n• 5-Variable K-Map (A, B, C, D, E): Consists of two 4-variable maps placed side-by-side (left map for A = 0, right map for A = 1).\n• 3D Adjacency: Squares in the exact same row/column coordinates across the A=0 and A=1 maps are adjacent and eliminate variable A.',
          tr: '• 4 Değişkenli Harita: 16 kareden oluşur; 1 kare = 4 literal, 2 kare = 3 literal, 4 kare = 2 literal, 8 kare = 1 literal verir.\n• 5 Değişkenli Harita (A, B, C, D, E): Yan yana iki adet 4 değişkenli haritadan (sol taraf A = 0, sağ taraf A = 1) oluşur.\n• İki haritada aynı satır ve sütun koordinatındaki kareler birbirine komşudur ve birleştirildiğinde A değişkeni elenir.',
        },
        pdfPage: 107,
      },
      {
        id: 'w5-c4',
        type: 'method',
        title: {
          en: 'Product of Sums (POS) Simplification via K-Map',
          tr: 'Karnaugh Haritası ile POS (Çarpımların Toplamı) Sadeleştirme',
        },
        content: {
          en: '• Step 1: Fill all empty squares in the K-map with 0s.\n• Step 2: Group the 0s using the largest possible power-of-2 rectangles to obtain the simplified SOP expression for the complement function F\'.\n• Step 3: Apply DeMorgan\'s Theorem to F\' (complement each literal and swap · with +) to get the minimal POS expression for F.',
          tr: '• Adım 1: Haritadaki boş karelere 0 yerleştir.\n• Adım 2: 0\'ları mümkün olan en büyük 2^k dikdörtgenlerle gruplayarak fonksiyonun tümleyeni F\' için en sade SOP ifadesini yaz.\n• Adım 3: F\' ifadesine DeMorgan teoremi uygulayarak (literalleri tersle, · ile + yer değiştir) F\'yi en sade POS formunda elde et.',
        },
        formulaOrCode: 'Group 0s -> F\' (SOP)  ==[ DeMorgan ]==>  F (Simplified POS)',
        pdfPage: 113,
      },
    ],
  },
  {
    week: 6,
    lectureCode: 'Lecture 5',
    title: {
      en: 'Don\'t-Care Conditions, NAND/NOR & XOR/Parity',
      tr: 'Farksız Durumlar, NAND/NOR Uygulaması ve XOR/Eşlik',
    },
    bookSection: 'Sec. 3.5 - 3.8',
    pdfRange: [116, 138],
    labPreset: 'nand-nor-xor',
    cards: [
      {
        id: 'w6-c1',
        type: 'concept',
        title: {
          en: 'Don\'t-Care Conditions (X)',
          tr: 'Farksız Durumlar (Don\'t-Care Conditions - X)',
        },
        content: {
          en: '• Incompletely Specified Functions: Some input combinations never occur in practice (e.g., 1010-1111 in BCD) or their output value does not matter.\n• K-Map Rule: Mark don\'t-care cells with X. Include an X as 1 (for SOP) or 0 (for POS) ONLY if it helps form a larger power-of-2 group; otherwise leave it out.',
          tr: '• Eksik Tanımlı Fonksiyonlar: Bazı giriş kombinasyonları pratikte hiç oluşmaz (ör. BCD kodunda 1010-1111 arası) veya çıkış değerleri önemsizdir.\n• K-Map Kuralı: Farksız hücreler X ile gösterilir. Yalnızca daha büyük bir 2^k grubu oluşturmaya katkı sağlıyorsa SOP için 1 (veya POS için 0) olarak gruba dahil edilir; sağlamıyorsa dışarıda bırakılır.',
        },
        pdfPage: 116,
      },
      {
        id: 'w6-c2',
        type: 'method',
        title: {
          en: 'Two-Level & Multi-Level NAND Implementation',
          tr: 'İki Seviyeli ve Çok Seviyeli NAND Uygulaması',
        },
        content: {
          en: '• Universal Gate: Any Boolean function can be implemented using ONLY NAND gates.\n• Step 1: Simplify the function into standard SOP form.\n• Step 2: Replace AND gates with AND-invert symbols and OR gates with Invert-OR symbols (DeMorgan equivalent).\n• Step 3: Two bubbles along the same wire cancel out; if a single bubble remains on an input line, add an inverter or complement the literal.',
          tr: '• Evrensel Kapı: Her türlü Boole fonksiyonu YALNIZCA NAND kapıları kullanılarak kurulabilir.\n• Adım 1: Fonksiyonu en sade standart SOP biçimine getir.\n• Adım 2: AND kapılarını AND-invert, OR kapılarını Invert-OR (DeMorgan eşdeğeri) sembolüyle değiştir.\n• Adım 3: Aynı hat üzerindeki iki baloncuk birbirini götürür; tek kalan baloncuk varsa hatta bir inverter ekle veya ilgili giriş literalini tersle.',
        },
        formulaOrCode: 'F = AB + CD  ==>  F = ((AB)\' · (CD)\')\'  (3 NAND gates)',
        pdfPage: 119,
      },
      {
        id: 'w6-c3',
        type: 'method',
        title: {
          en: 'Two-Level & Multi-Level NOR Implementation',
          tr: 'İki Seviyeli ve Çok Seviyeli NOR Uygulaması',
        },
        content: {
          en: '• Dual Procedure of NAND: Start from a simplified Product of Sums (POS) expression.\n• Step 1: Replace OR gates with OR-invert symbols and AND gates with Invert-AND symbols.\n• Step 2: Cancel pairs of bubbles on the same line and complement literals or insert inverters where an unmatched bubble remains.',
          tr: '• NAND Yönteminin İkili: Sadeleştirilmiş Product of Sums (POS) ifadesinden başlanır.\n• Adım 1: OR kapılarını OR-invert, AND kapılarını Invert-AND sembolüyle değiştir.\n• Adım 2: Aynı hat üzerindeki baloncuk çiftlerini sadeleştir; tek baloncuk kalan girişlere inverter ekle veya literali tersle.',
        },
        formulaOrCode: 'F = (A + B)(C + D)  ==>  F = ((A + B)\' + (C + D)\')\'  (3 NOR gates)',
        pdfPage: 123,
      },
      {
        id: 'w6-c4',
        type: 'formula',
        title: {
          en: 'XOR, Odd/Even Functions & Parity Generator/Checker',
          tr: 'XOR, Tek/Çift Fonksiyonlar ve Eşlik (Parity) Devreleri',
        },
        content: {
          en: '• Identities: x ^ 0 = x, x ^ 1 = x\', x ^ x = 0, x ^ x\' = 1. A 2-input XOR requires 4 NAND gates.\n• Odd & Even Functions: Multi-variable XOR outputs 1 when an ODD number of inputs are 1 (checkerboard pattern in K-map); XNOR outputs 1 for an EVEN number of 1s.\n• Parity Circuits: For 3-bit message (x, y, z), even parity generator is P = x ^ y ^ z. Receiver checks C = x ^ y ^ z ^ P (C = 1 flags a single-bit error).',
          tr: '• Özdeşlikler: x ^ 0 = x, x ^ 1 = x\', x ^ x = 0, x ^ x\' = 1. İki girişli XOR, 4 adet NAND kapısı ile inşa edilebilir.\n• Tek ve Çift Fonksiyonlar: Çok girişli XOR, girişlerde TEK sayıda 1 varsa 1 üretir (K-map\'te dama tahtası deseni); XNOR ise ÇİFT sayıda 1 varsa 1 üretir.\n• Eşlik Devreleri: 3 bitlik mesaj için çift eşlik üreteci P = x ^ y ^ z; alıcıdaki hata denetleyici C = x ^ y ^ z ^ P (C = 1 hata olduğunu gösterir).',
        },
        formulaOrCode: 'x ^ y = xy\' + x\'y   |   Parity Gen: P = x ^ y ^ z   |   Checker: C = x ^ y ^ z ^ P',
        pdfPage: 129,
      },
    ],
  },
  {
    week: 7,
    lectureCode: 'Lecture 6',
    title: {
      en: 'Combinational Logic: Analysis, Design & Adders',
      tr: 'Birleşik Lojik Devreler: Analiz, Tasarım ve Toplayıcılar',
    },
    bookSection: 'Sec. 4.1 - 4.5',
    pdfRange: [164, 176],
    labPreset: 'half-full-adder',
    cards: [
      {
        id: 'w7-c1',
        type: 'method',
        title: {
          en: 'Combinational Circuit Analysis Procedure',
          tr: 'Birleşik Devre Analiz Prosedürü',
        },
        content: {
          en: '• Step 1: Verify the circuit is combinational (no feedback paths or memory elements).\n• Step 2: Label all gate outputs that are functions of input variables (T1, T2, ...), then label subsequent internal nodes.\n• Step 3: Express internal node functions in terms of inputs and substitute step-by-step until final output Boolean expressions (or truth table) are obtained.',
          tr: '• Adım 1: Devrede geri besleme yolu veya bellek elemanı bulunmadığını (birleşik olduğunu) doğrula.\n• Adım 2: Girişlere doğrudan bağlı kapı çıkışlarını (T1, T2, ...), ardından sonraki ara düğümleri etiketle.\n• Adım 3: Ara düğüm denklemlerini yazıp yerine koyma yöntemiyle çıkış Boole fonksiyonlarını veya doğruluk tablosunu çıkar.',
        },
        pdfPage: 165,
      },
      {
        id: 'w7-c2',
        type: 'method',
        title: {
          en: 'Design Procedure & BCD-to-Excess-3 Converter',
          tr: 'Tasarım Prosedürü ve BCD-to-Excess-3 Kod Dönüştürücü',
        },
        content: {
          en: '• 4-Step Design: 1) Determine inputs/outputs from specs -> 2) Build truth table -> 3) Simplify each output via K-map -> 4) Draw and verify logic diagram.\n• BCD-to-Excess-3 Example: Adds 3 (0011) to each BCD digit (0-9); inputs 10-15 are treated as don\'t-cares (X). Sharing the common term (C + D) optimizes multi-output gate count.',
          tr: '• 4 Adımlı Tasarım: 1) Giriş/çıkış sembollerini belirle -> 2) Doğruluk tablosunu kur -> 3) K-map ile her çıkışı sadeleştir -> 4) Lojik diyagramı çiz ve doğrula.\n• BCD-to-Excess-3 Örneği: Her BCD rakamına 3 (0011) ekler; 10-15 arası girişler X (don\'t-care) alınır. Ortak (C + D) terimi paylaşılarak kapı sayısı azaltılır.',
        },
        formulaOrCode: 'z = D\',  y = CD + (C+D)\',  x = B\'(C+D) + B(C+D)\',  w = A + B(C+D)',
        pdfPage: 168,
      },
      {
        id: 'w7-c3',
        type: 'formula',
        title: {
          en: 'Half Adder & Full Adder Equations',
          tr: 'Yarım Toplayıcı (Half Adder) ve Tam Toplayıcı (Full Adder)',
        },
        content: {
          en: '• Half Adder (HA): Adds two single bits (x, y) and produces Sum (S) and Carry (C).\n• Full Adder (FA): Adds two significant bits (x, y) plus an incoming carry bit (z) from the previous lower stage.\n• Two-level SOP form for FA carry: C = xy + xz + yz (majority function).',
          tr: '• Yarım Toplayıcı (HA): İki tek biti (x, y) toplar; Toplam (S) ve Elde (C) çıkışlarını üretir.\n• Tam Toplayıcı (FA): İki anlamlı biti (x, y) ve alt basamaktan gelen eldeyi (z) toplar.\n• Tam toplayıcı eldesinin iki seviyeli SOP formu: C = xy + xz + yz (çoğunluk fonksiyonu).',
        },
        formulaOrCode: 'HA: S = x ^ y, C = xy   |   FA: S = x ^ y ^ z, C = xy + z(x ^ y)',
        pdfPage: 172,
      },
      {
        id: 'w7-c4',
        type: 'concept',
        title: {
          en: 'Building a Full Adder from Two Half Adders',
          tr: 'İki Yarım Toplayıcı ile Tam Toplayıcı Kurulumu',
        },
        content: {
          en: '• Modular Construction: First Half Adder computes partial sum (x ^ y) and partial carry (xy).\n• Second Half Adder adds (x ^ y) with carry-in z to produce final Sum S = (x ^ y) ^ z and second carry z(x ^ y).\n• An OR gate combines both carries: C = xy + z(x ^ y).',
          tr: '• Modüler Yapı: Birinci Half Adder ara toplamı (x ^ y) ve ara eldeyi (xy) hesaplar.\n• İkinci Half Adder, (x ^ y) ile giriş eldesi z\'yi toplayarak nihai toplamı S = (x ^ y) ^ z ve ikinci eldeyi z(x ^ y) üretir.\n• Bir OR kapısı iki eldeyi birleştirir: C = xy + z(x ^ y).',
        },
        pdfPage: 175,
      },
    ],
  },
  {
    week: 8,
    lectureCode: 'Lecture 7',
    title: {
      en: 'Arithmetic & Comparison Circuits',
      tr: 'Aritmetik ve Karşılaştırma Devreleri',
    },
    bookSection: 'Sec. 4.5 - 4.8',
    pdfRange: [176, 192],
    labPreset: 'adder-subtractor',
    cards: [
      {
        id: 'w8-c1',
        type: 'formula',
        title: {
          en: 'Ripple Carry Adder vs. Carry Lookahead Generator',
          tr: 'Dalga Eldeli Toplayıcı ve Elde Öngörülü Üreteç (CLA)',
        },
        content: {
          en: '• Ripple Carry Delay: In an n-bit ripple carry adder, each stage adds 2 gate levels (AND + OR) to the carry path, giving a worst-case carry delay of 2n gate levels.\n• Carry Lookahead (CLA): Defines Carry Propagate P_i = A_i ^ B_i and Carry Generate G_i = A_i·B_i so all carries are computed in parallel in a constant 2 gate levels.',
          tr: '• Dalga Elde Gecikmesi: n-bitlik kaskad toplayıcıda her basamak elde yoluna 2 kapı seviyesi (AND + OR) ekler; toplam elde gecikmesi 2n kapı seviyesidir.\n• Elde Öngörülü (CLA): Carry Propagate P_i = A_i ^ B_i ve Carry Generate G_i = A_i·B_i tanımlanarak tüm eldeler sabit 2 kapı seviyesinde paralel hesaplanır.',
        },
        formulaOrCode: 'C_1 = G_0 + P_0·C_0   |   C_2 = G_1 + P_1·G_0 + P_1·P_0·C_0',
        pdfPage: 177,
      },
      {
        id: 'w8-c2',
        type: 'exam-tip',
        title: {
          en: 'Binary Adder-Subtractor & Signed Overflow (V)',
          tr: 'İkili Toplayıcı-Çıkarıcı ve İşaretli Taşma (Overflow - V)',
        },
        content: {
          en: '• Mode Control (M): Each B_i passes through an XOR gate controlled by M.\n  - M = 0 (Addition): B_i ^ 0 = B_i and C_0 = 0 -> computes A + B.\n  - M = 1 (Subtraction): B_i ^ 1 = B_i\' and C_0 = 1 -> computes A + B\' + 1 = A - B.\n• Overflow Trap: Unsigned overflow is detected by carry-out C_n, whereas SIGNED 2\'s complement overflow occurs iff carry-in and carry-out of the sign bit differ: V = C_(n-1) ^ C_n.',
          tr: '• Mod Kontrolü (M): Her B_i girişi M ile kontrol edilen bir XOR kapısından geçer.\n  - M = 0 (Toplama): B_i ^ 0 = B_i ve C_0 = 0 -> A + B hesaplanır.\n  - M = 1 (Çıkarma): B_i ^ 1 = B_i\' ve C_0 = 1 -> A + B\' + 1 = A - B hesaplanır.\n• Taşma Tuzağı: İşaretsiz taşma çıkış eldesi C_n ile anlaşılırken, İŞARETLİ 2\'ye tümleyen taşması işaret bitine giren ve çıkan eldelerin farklı olmasıyla oluşur: V = C_(n-1) ^ C_n.',
        },
        formulaOrCode: 'Signed Overflow: V = C_(n-1) ^ C_n   (V = 1 means invalid signed result)',
        pdfPage: 181,
      },
      {
        id: 'w8-c3',
        type: 'formula',
        title: {
          en: 'Decimal (BCD) Adder & +6 Correction Logic',
          tr: 'Onluk (BCD) Toplayıcı ve +6 Düzeltme Mantığı',
        },
        content: {
          en: '• Adding two BCD digits (0-9) plus carry-in yields a binary sum between 0 and 19.\n• Whenever the binary sum exceeds 9 (1001) or produces a carry K = 1, adding 6 (0110) skips the 6 invalid BCD states and produces the valid BCD digit plus decimal carry C = 1.',
          tr: '• İki BCD rakamı (0-9) ve giriş eldesinin toplamı 0 ile 19 arasında bir ikili sonuç üretir.\n• İkili toplam 9\'u (1001) aştığında veya elde K = 1 oluştuğunda sonuca 6 (0110) eklenerek geçersiz 6 BCD durumu atlanır ve doğru BCD rakamı ile C = 1 eldesi üretilir.',
        },
        formulaOrCode: 'BCD Carry & Add-6 Condition: C = K + Z_8·Z_4 + Z_8·Z_2',
        pdfPage: 184,
      },
      {
        id: 'w8-c4',
        type: 'formula',
        title: {
          en: 'Binary Multiplier & 4-Bit Magnitude Comparator',
          tr: 'İkili Çarpıcı ve 4-Bitlik Büyüklük Karşılaştırıcı',
        },
        content: {
          en: '• Binary Multiplier: Multiplying a K-bit multiplicand by a J-bit multiplier requires (K x J) AND gates and (J - 1) K-bit adders, yielding a (J + K)-bit product.\n• 4-Bit Magnitude Comparator: Bitwise equality is x_i = A_i·B_i + A_i\'·B_i\' (XNOR). Comparison evaluates from MSB (bit 3) down to LSB (bit 0).',
          tr: '• İkili Çarpıcı: K-bit çarpılan ile J-bit çarpan için (K x J) adet AND kapısı ve (J - 1) adet K-bit toplayıcı kullanılarak (J + K)-bit çarpım sonucu üretilir.\n• 4-Bit Büyüklük Karşılaştırıcı: Her bit çiftinin eşitliği x_i = A_i·B_i + A_i\'·B_i\' (XNOR) ile bulunur; karşılaştırma en anlamlı bitten (bit 3) başlar.',
        },
        formulaOrCode: '(A=B) = x_3·x_2·x_1·x_0   |   (A>B) = A_3B_3\' + x_3A_2B_2\' + x_3x_2A_1B_1\' + x_3x_2x_1A_0B_0\'',
        pdfPage: 187,
      },
    ],
  },
  {
    week: 9,
    lectureCode: 'Lecture 8',
    title: {
      en: 'Decoders, Encoders & Multiplexers (MSI Components)',
      tr: 'Kod Çözücüler, Kodlayıcılar ve Çoklayıcılar (MSI Bileşenler)',
    },
    bookSection: 'Sec. 4.9 - 4.11',
    pdfRange: [192, 206],
    labPreset: 'decoder-mux',
    cards: [
      {
        id: 'w9-c1',
        type: 'method',
        title: {
          en: 'Decoders, Demultiplexers & Function Implementation',
          tr: 'Kod Çözücüler (Decoder), Demux ve Fonksiyon Gerçekleme',
        },
        content: {
          en: '• n-to-2^n Decoder: Converts an n-bit binary input into 2^n unique minterm outputs.\n• Enable & Expansion: An Enable input allows building larger decoders (e.g., two 3x8 decoders form a 4x16 decoder) and enables 1-to-2^n Demultiplexer operation.\n• Implementing Boolean Functions: Connect the decoder minterm outputs where F = 1 to an external OR gate (or external NAND gate if active-low NAND decoder is used).',
          tr: '• n-to-2^n Decoder: n-bitlik ikili giriş kodunu 2^n benzersiz minterm çıkışına çözer.\n• Enable ve Genişletme: Enable girişi hem daha büyük kod çözücüler kurmayı (ör. iki 3x8 decoder ile 4x16 yapımı) hem de 1-to-2^n Demultiplexer olarak çalışmayı sağlar.\n• Fonksiyon Gerçekleme: Fonksiyonu 1 yapan minterm çıkışları harici bir OR kapısına (aktif-0 NAND decoder kullanılıyorsa harici NAND kapısına) bağlanır.',
        },
        pdfPage: 192,
      },
      {
        id: 'w9-c2',
        type: 'concept',
        title: {
          en: 'Encoders & Priority Encoder (Valid Bit V)',
          tr: 'Kodlayıcılar (Encoder) ve Öncelikli Kodlayıcı (Valid Biti V)',
        },
        content: {
          en: '• Standard Encoder: Performs the inverse of a decoder (2^n inputs -> n-bit binary code), assuming only one input is active at a time.\n• Priority Encoder: Resolves simultaneous active inputs by giving priority to the highest-subscript input, and outputs a Valid indicator V = 1 whenever at least one input is active (V = 0 distinguishes all-zero inputs from D_0 = 1).',
          tr: '• Standart Encoder: Decoder işleminin tersini yapar (2^n giriş -> n-bit ikili kod); aynı anda tek girişin aktif olduğunu varsayar.\n• Öncelikli Kodlayıcı (Priority Encoder): Birden fazla giriş aynı anda 1 olduğunda en yüksek indeksli girişe öncelik verir ve en az bir giriş aktifse Valid biti V = 1 üretir (V = 0 durumu tüm girişlerin 0 olduğunu D_0 = 1 durumundan ayırır).',
        },
        formulaOrCode: '4-Input Priority Encoder: x = D_2 + D_3,  y = D_3 + D_1·D_2\',  V = D_0 + D_1 + D_2 + D_3',
        pdfPage: 197,
      },
      {
        id: 'w9-c3',
        type: 'method',
        title: {
          en: 'Multiplexers (MUX) & Boolean Function Implementation',
          tr: 'Çoklayıcılar (MUX) ve Boole Fonksiyonu Gerçekleme',
        },
        content: {
          en: '• Data Selector: Uses n select lines to route one of 2^n data inputs to a single output.\n• Implementing an n-Variable Function with a 2^(n-1)-to-1 MUX:\n  1) Connect the first (n - 1) variables to the select lines.\n  2) Group truth table rows into pairs for each select combination.\n  3) Inspect F vs. the last variable (e.g., z) in each pair and wire 0, 1, z, or z\' to that MUX data input.',
          tr: '• Veri Seçici: n adet seçme hattı ile 2^n veri girişinden birini tek çıkışa aktarır.\n• n Değişkenli Fonksiyonu 2^(n-1)-to-1 MUX ile Kurma:\n  1) İlk (n - 1) değişkeni seçme girişlerine bağla.\n  2) Doğruluk tablosunu her seçme kombinasyonu için ikili satır gruplarına böl.\n  3) Her çiftte F\'nin son değişkene (ör. z) göre değerini inceleyip ilgili veri girişine 0, 1, z veya z\' bağla.',
        },
        pdfPage: 200,
      },
      {
        id: 'w9-c4',
        type: 'concept',
        title: {
          en: 'Three-State Gates (Hi-Z) & Shared Bus Systems',
          tr: 'Üç Durumlu Kapılar (Three-State Gates) ve Ortak Veri Yolları',
        },
        content: {
          en: '• Three Output States: Logic-0, Logic-1, and High-Impedance (Hi-Z).\n• When control input C = 0, the output behaves like an open circuit, disconnecting the gate from the wire.\n• Allows multiple three-state buffers to drive a shared bus line or construct large multiplexers without short-circuit contention.',
          tr: '• Üç Çıkış Durumu: Lojik-0, Lojik-1 ve Yüksek Empedans (High-Impedance / Hi-Z).\n• Kontrol girişi C = 0 olduğunda çıkış açık devre gibi davranarak kapıyı hattan ayırır.\n• Birden fazla üç durumlu tamponun çakışma olmadan ortak bir veri yolunu (bus) sürmesini veya büyük MUX yapıları kurmasını sağlar.',
        },
        pdfPage: 205,
      },
    ],
  },
  {
    week: 10,
    lectureCode: 'Lecture 9',
    title: {
      en: 'Synchronous Sequential Logic: Latches & Flip-Flops',
      tr: 'Senkron Ardışıl Lojik Devreler: Mandallar ve Flip-Floplar',
    },
    bookSection: 'Sec. 5.1 - 5.4',
    pdfRange: [262, 278],
    labPreset: 'latches-flipflops',
    cards: [
      {
        id: 'w10-c1',
        type: 'concept',
        title: {
          en: 'Sequential Circuits & Level-Triggered Latches (SR & D)',
          tr: 'Ardışıl Devreler ve Seviye Tetiklemeli Mandallar (SR ve D Latch)',
        },
        content: {
          en: '• Storage Elements: Feedback paths store binary state; next state and outputs depend on external inputs plus present state.\n• SR Latch: Cross-coupled NOR gates (active-1, S=R=1 forbidden) or NAND gates (S\'-R\' latch, active-0, S=R=0 forbidden).\n• D Latch (Transparent): Connects R = S\' to eliminate the indeterminate state. While Enable C = 1, output Q continuously follows D (transparent); unsuitable directly in clocked feedback loops.',
          tr: '• Bellek Elemanları: Geri besleme yolları ikili durumu saklar; sonraki durum ve çıkışlar dış girişler ile mevcut duruma bağlıdır.\n• SR Latch: Çapraz bağlı NOR (aktif-1, S=R=1 yasak) veya NAND (S\'-R\' mandalı, aktif-0, S=R=0 yasak) kapılarından oluşur.\n• D Latch (Şeffaf Mandal): R = S\' bağlantısıyla belirsiz durumu önler. Kontrol C = 1 olduğu sürece çıkış Q, D\'yi sürekli izler (transparent); doğrudan saatli geri besleme döngülerinde risklidir.',
        },
        pdfPage: 262,
      },
      {
        id: 'w10-c2',
        type: 'exam-tip',
        title: {
          en: 'Edge-Triggered Flip-Flops & Timing Constraints',
          tr: 'Kenar Tetiklemeli Flip-Floplar ve Zamanlama Parametreleri',
        },
        content: {
          en: '• Edge Triggering: Samples input and updates Q ONLY at the positive edge (0 -> 1) or negative edge (1 -> 0) of the clock (built via Master-Slave D latches or 3 SR latches).\n• Setup Time (t_su): Minimum time data D must remain stable BEFORE the active clock edge.\n• Hold Time (t_h): Minimum time data D must remain stable AFTER the active clock edge.\n• Propagation Delay (t_p): Time from active clock edge until Q stabilizes.',
          tr: '• Kenar Tetikleme: Girişi örnekler ve Q çıkışını YALNIZCA saat sinyalinin yükselen (0 -> 1) veya düşen (1 -> 0) kenarında günceller (Master-Slave D latch veya üç SR latch ile kurulur).\n• Setup Time (t_su): Aktif saat kenarından ÖNCE D girişinin sabit kalması gereken minimum süre.\n• Hold Time (t_h): Aktif saat kenarından SONRA D girişinin değişmemesi gereken minimum süre.\n• Propagation Delay (t_p): Tetikleme kenarından çıkışın kararlı hale gelmesine kadar geçen süre.',
        },
        pdfPage: 268,
      },
      {
        id: 'w10-c3',
        type: 'formula',
        title: {
          en: 'D, JK & T Flip-Flop Characteristic Equations',
          tr: 'D, JK ve T Flip-Flop Karakteristik Denklemleri',
        },
        content: {
          en: '• D Flip-Flop: Transfers D directly to Q(t+1) on clock edge (D=0 -> Reset, D=1 -> Set).\n• JK Flip-Flop: Refines SR by turning J=K=1 into Complement/Toggle (00 -> No change, 01 -> Reset, 10 -> Set, 11 -> Toggle Q\').\n• T (Toggle) Flip-Flop: Built by tying J = K = T (or D = T ^ Q); T=0 holds state, T=1 complements state.',
          tr: '• D Flip-Flop: Saat kenarında D değerini doğrudan Q(t+1)\'e aktarır (D=0 -> Reset, D=1 -> Set).\n• JK Flip-Flop: J=K=1 durumunu Tümleme (Toggle) yaparak yasak durumu kaldırır (00 -> Değişmez, 01 -> 0, 10 -> 1, 11 -> Q\').\n• T (Toggle) Flip-Flop: J = K = T (veya D = T ^ Q) bağlantısıyla kurulur; T=0 durumu korur, T=1 durumu tersler.',
        },
        formulaOrCode: 'D: Q(t+1) = D   |   JK: Q(t+1) = J·Q\' + K\'·Q   |   T: Q(t+1) = T ^ Q = T·Q\' + T\'·Q',
        pdfPage: 272,
      },
      {
        id: 'w10-c4',
        type: 'concept',
        title: {
          en: 'Asynchronous Direct Inputs (Preset & Clear)',
          tr: 'Asenkron Doğrudan Girişler (Preset ve Clear)',
        },
        content: {
          en: '• Power-Up Initialization: When power is first turned on, flip-flop states are unknown.\n• Direct Set (Preset): Asynchronously forces Q = 1 immediately, independent of the clock signal.\n• Direct Reset (Clear): Asynchronously forces Q = 0 immediately, independent of the clock signal (often active-low, denoted with a bubble).',
          tr: '• İlk Açılış Başlatma: Devreye ilk enerji verildiğinde flip-flopların başlangıç durumu belirsizdir.\n• Direct Set (Preset): Saat darbesinden bağımsız olarak çıkışı anında Q = 1 yapar.\n• Direct Reset (Clear): Saat darbesinden bağımsız olarak çıkışı anında Q = 0 yapar (genellikle aktif-0 olarak baloncukla gösterilir).',
        },
        pdfPage: 276,
      },
    ],
  },
  {
    week: 11,
    lectureCode: 'Lecture 10',
    title: {
      en: 'Analysis of Clocked Sequential Circuits (FSMs)',
      tr: 'Saatli Ardışıl Devrelerin Analizi (Sonlu Durum Makineleri)',
    },
    bookSection: 'Sec. 5.4 - 5.5',
    pdfRange: [279, 291],
    labPreset: 'seq-analysis',
    cards: [
      {
        id: 'w11-c1',
        type: 'concept',
        title: {
          en: 'State Equations & State Tables',
          tr: 'Durum Denklemleri ve Durum Tabloları',
        },
        content: {
          en: '• Behavior of Clocked Sequential Circuits: Both outputs and next states are functions of present state and external inputs.\n• State (Transition) Equation: Expresses next state Q(t+1) one clock edge later in terms of present state and inputs (time index (t) is often omitted for compactness).\n• State Table: Lists all 2^(m+n) combinations for m flip-flops and n inputs, or uses a compact 3-section layout (Present State, Next State for x=0/x=1, Output for x=0/x=1).',
          tr: '• Saatli Ardışıl Devre Davranışı: Hem çıkışlar hem de bir sonraki durum, mevcut durum ile dış girişlerin fonksiyonudur.\n• Durum (Geçiş) Denklemi: Bir saat darbesi sonraki durumu Q(t+1), mevcut durum ve girişler cinsinden ifade eder (kısalık için (t) indisi genellikle yazılmaz).\n• Durum Tablosu: m flip-flop ve n giriş için 2^(m+n) satırı sıralar veya 3 sütunlu kompakt biçimde (Mevcut Durum, x=0/x=1 için Sonraki Durum ve Çıkış) düzenlenir.',
        },
        formulaOrCode: 'Example (D-FF): A(t+1) = Ax + Bx,  B(t+1) = A\'x,  y = (A + B)x\'',
        pdfPage: 279,
      },
      {
        id: 'w11-c2',
        type: 'method',
        title: {
          en: 'State Diagrams & Flip-Flop Input Equations',
          tr: 'Durum Diyagramları ve Flip-Flop Giriş (Uyarma) Denklemleri',
        },
        content: {
          en: '• State Diagram Notation: Each circle represents a state (binary value inside). Directed arrows indicate state transitions.\n• Arrow Labels (Mealy): Labeled as input/output (e.g., 1/0 means when input=1 in present state, output=0 before transitioning on the next clock edge). If a circuit has no external output, arrows show input only.\n• Flip-Flop Input (Excitation) Equations: Algebraic Boolean expressions describing the combinational logic driving the flip-flop inputs (e.g., D_A = Ax + Bx).',
          tr: '• Durum Diyagramı Gösterimi: Her daire bir durumu (içinde ikili durum kodu), yönlü oklar ise durum geçişlerini temsil eder.\n• Ok Etiketleri (Mealy): giriş/çıkış biçiminde yazılır (ör. 1/0 etiketi, mevcut durumda giriş=1 iken çıkışın 0 olduğunu ve sonraki saat darbesinde hedef duruma geçileceğini gösterir). Çıkışı olmayan devrelerde ok üzerinde yalnızca giriş yazılır.\n• Flip-Flop Giriş Denklemleri: Flip-flop girişlerini süren birleşik mantık devresini tanımlayan Boole ifadeleridir (ör. D_A = Ax + Bx).',
        },
        formulaOrCode: 'D Flip-Flop Rule: Q(t+1) = D_Q  (State equation equals input equation)',
        pdfPage: 282,
      },
      {
        id: 'w11-c3',
        type: 'method',
        title: {
          en: 'Analysis with D, JK & T Flip-Flops',
          tr: 'D, JK ve T Flip-Floplu Devrelerin Analizi',
        },
        content: {
          en: '• D Flip-Flops: Next state equals the D input directly (e.g., D_A = A ^ x ^ y -> A(t+1) = A ^ x ^ y).\n• JK & T Flip-Flops (Two Methods):\n  1) Write flip-flop input equations (J_A, K_A or T_A), evaluate binary input values for every row, and apply the flip-flop characteristic table.\n  2) Substitute input equations directly into the characteristic equation (A(t+1) = J_A·A\' + K_A\'·A or A(t+1) = T_A ^ A) to obtain algebraic state equations.',
          tr: '• D Flip-Floplar: Bir sonraki durum doğrudan D girişine eşittir (ör. D_A = A ^ x ^ y ise A(t+1) = A ^ x ^ y).\n• JK ve T Flip-Floplar (İki Yöntem):\n  1) Flip-flop giriş denklemlerini (J_A, K_A veya T_A) yaz, her satır için ikili giriş değerlerini bul ve karakteristik tabloyu uygula.\n  2) Giriş denklemlerini doğrudan karakteristik denklemde (A(t+1) = J_A·A\' + K_A\'·A veya A(t+1) = T_A ^ A) yerine koyarak cebirsel durum denklemlerini türet.',
        },
        formulaOrCode: 'T-FF Counter Example: T_A = Bx,  T_B = x,  y = AB  (Counts 00->01->10->11 when x=1)',
        pdfPage: 285,
      },
      {
        id: 'w11-c4',
        type: 'exam-tip',
        title: {
          en: 'Mealy vs. Moore Finite State Machine (FSM) Models',
          tr: 'Mealy ve Moore Sonlu Durum Makinesi (FSM) Modelleri',
        },
        content: {
          en: '• Mealy Model: Output depends on BOTH present state AND inputs. Outputs can change mid-cycle if inputs change asynchronously; transition arrows are labeled input/output.\n• Moore Model: Output depends ONLY on the present state (flip-flops). Outputs are strictly synchronized with the clock; circles are labeled state/output (e.g., 11/1).\n• Exam Trap: Always check where the output slash (/) is located—inside the circle means Moore, on the transition arrow means Mealy.',
          tr: '• Mealy Modeli: Çıkış hem mevcut durumun HEM DE girişlerin fonksiyonudur. Saat darbesi içinde giriş değişirse çıkış da anlık değişebilir; geçiş okları giriş/çıkış olarak etiketlenir.\n• Moore Modeli: Çıkış YALNIZCA mevcut durumun (flip-flopların) fonksiyonudur ve saat sinyaliyle tam senkronizedir; dairelerin içi durum/çıkış (ör. 11/1) olarak etiketlenir.\n• Sınav İpucu: Eğik çizginin (/) yerine dikkat et—daire içindeyse Moore, ok üzerindeyse Mealy modelidir.',
        },
        formulaOrCode: 'Mealy: Output = f(State, Input)   |   Moore: Output = f(State)',
        pdfPage: 289,
      },
    ],
  },
  {
    week: 12,
    lectureCode: 'Lecture 11',
    title: {
      en: 'Design & Synthesis of Synchronous Sequential Circuits',
      tr: 'Senkron Ardışıl Devrelerin Tasarımı ve Sentezi',
    },
    bookSection: 'Sec. 5.7',
    pdfRange: [302, 312],
    labPreset: 'seq-counters',
    cards: [
      {
        id: 'w12-c1',
        type: 'method',
        title: {
          en: '7-Step Sequential Circuit Design Procedure',
          tr: '7 Adımlı Senkron Ardışıl Devre Tasarım Prosedürü',
        },
        content: {
          en: '• Design Steps:\n  1) Derive state diagram from word specifications.\n  2) Reduce number of states if necessary.\n  3) Assign binary codes to states (m flip-flops needed for up to 2^m states).\n  4) Obtain binary-coded state table.\n  5) Choose flip-flop type (D, JK, or T).\n  6) Simplify flip-flop input & output equations via K-maps.\n  7) Draw the final logic diagram (Steps 4-7 are algorithmic synthesis).',
          tr: '• Tasarım Adımları:\n  1) Problem tanımından durum diyagramını çıkar.\n  2) Gerekirse durum sayısını azalt.\n  3) Durumlara ikili kodlar ata (en fazla 2^m durum için m flip-flop gerekir).\n  4) İkili kodlanmış durum tablosunu oluştur.\n  5) Kullanılacak flip-flop türünü seç (D, JK veya T).\n  6) K-map ile flip-flop giriş ve çıkış denklemlerini sadeleştir.\n  7) Lojik diyagramı çiz (4-7. adımlar algoritmik sentez aşamasıdır).',
        },
        formulaOrCode: 'Number of Flip-Flops (m):  2^(m-1) < Number of States <= 2^m',
        pdfPage: 302,
      },
      {
        id: 'w12-c2',
        type: 'method',
        title: {
          en: 'Synthesis with D Flip-Flops (Sequence Detector Example)',
          tr: 'D Flip-Flop ile Sentez (Dizi Algılayıcı Örneği)',
        },
        content: {
          en: '• Problem: Detect 3 or more consecutive 1s on input x (Moore model).\n• States: S_0=00 (0 ones), S_1=01 (one 1), S_2=10 (two 1s), S_3=11 (>=3 ones, output y=1). Any x=0 returns to S_0.\n• Direct D-FF Advantage: Because D_A = A(t+1) and D_B = B(t+1), the Next State columns directly serve as the K-map minterms for D_A and D_B without needing an excitation table.',
          tr: '• Problem: Giriş hattı x üzerinde ardışık 3 veya daha fazla 1 geldiğini algıla (Moore modeli).\n• Durumlar: S_0=00 (hiç 1 yok), S_1=01 (bir adet 1), S_2=10 (iki adet 1), S_3=11 (>=3 adet 1, çıkış y=1). Herhangi bir x=0 girişi devreyi S_0\'a döndürür.\n• Doğrudan D-FF Kolaylığı: D_A = A(t+1) ve D_B = B(t+1) olduğundan, Sonraki Durum sütunları uyarma tablosuna gerek kalmadan doğrudan K-map mintermlerini verir.',
        },
        formulaOrCode: 'D_A = Ax + Bx,   D_B = Ax + B\'x,   y = AB',
        pdfPage: 304,
      },
      {
        id: 'w12-c3',
        type: 'formula',
        title: {
          en: 'Excitation Tables for JK and T Flip-Flops',
          tr: 'JK ve T Flip-Flop Uyarma (Excitation) Tabloları',
        },
        content: {
          en: '• Purpose: During synthesis, we know the required transition Q(t) -> Q(t+1) from the state table and must find the required flip-flop inputs (including don\'t-cares X).\n• JK Excitation Rules:\n  - 0 -> 0: J=0, K=X   |   0 -> 1: J=1, K=X\n  - 1 -> 0: J=X, K=1   |   1 -> 1: J=X, K=0\n• T Excitation Rules:\n  - Same state (0->0 or 1->1): T = 0\n  - State change (0->1 or 1->0): T = 1',
          tr: '• Kullanım Amacı: Sentez sırasında durum tablosundaki Q(t) -> Q(t+1) geçişi bellidir; bu geçişi sağlayacak flip-flop girişleri (X farksız durumlarıyla birlikte) bulunur.\n• JK Uyarma Kuralları:\n  - 0 -> 0: J=0, K=X   |   0 -> 1: J=1, K=X\n  - 1 -> 0: J=X, K=1   |   1 -> 1: J=X, K=0\n• T Uyarma Kuralları:\n  - Durum değişmiyorsa (0->0 veya 1->1): T = 0\n  - Durum değişiyorsa (0->1 veya 1->0): T = 1',
        },
        formulaOrCode: 'T Excitation Shortcut: T = Q(t) ^ Q(t+1)',
        pdfPage: 306,
      },
      {
        id: 'w12-c4',
        type: 'exam-tip',
        title: {
          en: 'Synthesis with JK & T Flip-Flops (3-Bit Binary Counter)',
          tr: 'JK ve T Flip-Flop ile Sentez (3-Bit İkili Sayıcı Örneği)',
        },
        content: {
          en: '• JK Synthesis: Fill J and K columns using the excitation table for each state transition; exploit the X (don\'t-care) entries in K-maps to minimize gate count.\n• Binary Counters with T-FFs: Most efficient implementation due to T flip-flop\'s complement property.\n• Counter State Diagram Rule: Because state transitions occur automatically on every clock edge, the clock is NOT drawn as an input variable on transition arrows.',
          tr: '• JK Sentezi: Her durum geçişi için uyarma tablosunu kullanarak J ve K sütunlarını doldur; K-map\'teki X (don\'t-care) hücrelerini kullanarak kapı sayısını en aza indir.\n• T Flip-Flop ile İkili Sayıcılar: T flip-flop\'un tümleme özelliği sayesinde sayıcılar en az kapıyla inşa edilir.\n• Sayıcı Durum Diyagramı Kuralı: Geçişler her saat kenarında otomatik gerçekleştiği için saat sinyali geçiş oklarında giriş değişkeni olarak gösterilmez.',
        },
        formulaOrCode: '3-Bit Binary Counter (A_2 A_1 A_0): T_A0 = 1,  T_A1 = A_0,  T_A2 = A_1·A_0',
        pdfPage: 310,
      },
    ],
  },
];

export function getWeekCurriculum(weekNumber: number): WeekCurriculum | undefined {
  return CURRICULUM_DATA.find((item) => item.week === weekNumber);
}
