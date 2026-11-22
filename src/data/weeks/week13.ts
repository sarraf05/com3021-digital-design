import type { WeekModule } from '../../types/curriculum';

export const week13: WeekModule = {
  id: 13,
  weekNumber: 13,
  englishTitle: 'Synchronous Sequential Logic III (Sequential Circuit Design)',
  turkishSubtitle: '6 Adımlı Ardışıl Devre Tasarımı, Dizi Algılayıcılar ve D/JK/T Sentez Karşılaştırması',
  summary:
    'Sözel bir donanım probleminden başlayarak State Diagram kurmayı, Overlapping / Non-Overlapping Sequence Detector (Dizi Algılayıcı) tasarlamayı, seçilen Flip-Flop\'un Excitation Table sütunlarını K-Map ile sadeleştirip devre şemasına dönüştürmeyi ve Lock-out durumlarını önlemeyi öğrenin.',
  learningObjectives: [
    'Mano\'nun 6 adımlı senkron ardışıl devre tasarım prosedürünü baştan sona uygulamak',
    'Overlapping ve Non-Overlapping Sequence Detector (101, 1101) durum diyagramları kurmak',
    'D, JK ve T Flip-Flop uyarım tablolarıyla K-Map sadeleştirmesi yapıp kapı maliyetini karşılaştırmak',
    'Kullanılmayan durumlarda Lock-out tehlikesini analiz ederek Self-Correcting FSM tasarlamak',
  ],
  isPlaceholder: false,
  recommendedWidget: 'StateMachineExplorer',
  visualSections: [
    {
      id: 'w13-s1',
      title: '1. Mano 6 Adımlı Senkron Ardışıl Devre Tasarım Prosedürü',
      explanation:
        'Bir önceki haftada devreden tabloya gittik (Analiz); bu haftada ise spesifikasyondan devreye gidiyoruz (Tasarım / Sentez). Herhangi bir senkron ardışıl devreyi hatasız sentezlemek için 6 adım izlenir:\n1. Sözlü tanımdan veya zamanlama diyagramından Durum Diyagramı (State Diagram) oluştur.\n2. Gereksiz durum varsa State Reduction ile durumu azalt.\n3. Durumlara ikili kod ata (Binary State Assignment: 00, 01, 10...).\n4. Durum Tablosuna seçilen Flip-Flop türünün Uyarım Tablosu (Excitation Table) giriş sütunlarını ekle.\n5. Her Flip-Flop girişi ve devre çıkışı için K-Map çizip minimum Boole denklemlerini çıkar.\n6. Ortak Clock hattına bağlı Flip-Flop\'ları ve birleşik lojik kapılarını çiz.',
      diagrams: [
        {
          kind: 'steps',
          caption: 'Sentez Akış Şeması: Spesifikasyon → Silikon Devre',
          steps: [
            {
              label: 'Adım 1–3: Model & Kodlama',
              badge: 'State Assignment',
              detail: 'Mealy/Moore seç → Eşdeğer durumları indirge → M durum için ⌈log₂ M⌉ bit ata.',
            },
            {
              label: 'Adım 4: Uyarım Tablosu Ekle',
              badge: 'Excitation Table',
              detail: 'Q(t) → Q(t+1) geçişlerine bakarak her satır için Dᵢ, Tᵢ veya (Jᵢ, Kᵢ) değerlerini yaz.',
            },
            {
              label: 'Adım 5–6: K-Map & Devre',
              badge: 'Donanım Sentezi',
              detail: "JK tablosundaki bol X (Don't-Care) sayesinde kapı sayısı genellikle D FF'ten daha az çıkar!",
            },
          ],
        },
      ],
      examTip:
        'Durum sayısı 2ⁿ\'den küçükse (örneğin 3 veya 5 durum), kullanılmayan ikili kodlar (11 veya 101–111) için K-Map\'e Don\'t-Care (X) yazılabilir; ancak devrenin kendi kendini düzeltmesi (Self-Correcting) isteniyorsa bu durumlar başlangıç durumuna yönlendirilmelidir!',
    },
    {
      id: 'w13-s2',
      title: '2. Dizi Algılayıcı (Sequence Detector): Overlapping vs. Non-Overlapping',
      explanation:
        'Sınavların en klasik tasarım sorusu olan Sequence Detector, seri bir bit akışında (x) belirli bir örüntü (ör. "101" veya "1101") yakalandığında z = 1 çıkışı verir.\n• Overlapping (Örtüşmeli): Dizinin son biti(leri) bir sonraki dizinin başlangıcı olarak tekrar kullanılabilir. Örneğin "1101101" akışında örtüşmeli "1101" algılayıcı 2 kez "1" yakalar; bu nedenle "1101" tamamlandığında son gelen "1" bitini kaybetmemek için "S₀ (Reset)" yerine "S₁ (1 alındı)" durumuna döner!\n• Non-Overlapping (Örtüşmesiz): Dizi yakalandıktan sonra tüm hafıza sıfırlanır ve makine S₀ başlangıç durumuna döner.',
      widget: 'StateMachineExplorer',
      examTip:
        'Mealy "101" veya "1101" algılayıcısında 3-bitlik dizi için 3 durum (S₀, S₁, S₂), 4-bitlik dizi için 4 durum yeterlidir. Moore modelinde ise son "1" çıkışını tutmak için +1 ekstra durum gerekir.',
    },
    {
      id: 'w13-s3',
      title: '3. D, JK ve T Flip-Flop ile Sentez Karşılaştırması',
      explanation:
        'Aynı durum geçiş tablosu üç farklı Flip-Flop türüyle sentezlendiğinde K-Map karmaşıklığı değişir:\n• D Flip-Flop: Uyarım sütunu doğrudan Q(t+1)\'in aynısıdır (D = Q⁺). Çok hızlı tasarlanır ancak hiç X (Don\'t-Care) üretmez.\n• T Flip-Flop: Yalnızca durum değişen satırlarda 1 olur (T = Q ⊕ Q⁺). Özellikle ikili sayıcılar (Binary Counters) için rakipsiz sadeliktedir.\n• JK Flip-Flop: Her geçişin yarısında X (Don\'t-Care) ürettiği için rastgele durum sıralamalarında (örn. Gray Code veya BCD sayıcılar) en az ek kapı maliyetini sunar.',
      diagrams: [
        {
          kind: 'table',
          caption: 'Örnek Sentez Karşılaştırması: 2-Bit Gray Code Sayıcı (00 → 01 → 11 → 10 → 00)',
          headers: ['Şimdiki (A B)', 'Sonraki (A+ B+)', 'D FF (D_A, D_B)', 'T FF (T_A, T_B)', 'JK FF (J_A K_A, J_B K_B)'],
          highlightColumn: 4,
          rows: [
            ['0 0', '0 1', '0, 1', '0, 1', '0 X,  1 X'],
            ['0 1', '1 1', '1, 1', '1, 0', '1 X,  X 0'],
            ['1 1', '1 0', '1, 0', '0, 1', 'X 0,  X 1'],
            ['1 0', '0 0', '0, 0', '1, 0', 'X 1,  0 X'],
          ],
        },
      ],
      examTip:
        'Yukarıdaki Gray Code sayıcı tablosundan JK K-Map\'leri çözüldüğünde tek bir AND/XOR kapısına bile ihtiyaç kalmadan doğrudan J_A = B, K_A = B\', J_B = A\', K_B = A bulunur!',
    },
  ],
  questions: [
    {
      id: 'w13-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · Örtüşmeli (Overlapping) 1101 Mealy Dizi Algılayıcı',
      difficulty: 'Orta',
      prompt:
        'Örtüşmeli (Overlapping) çalışan bir "1101" Mealy dizi algılayıcısında, devre S₃ ("110 alındı") durumundayken girişe x = 1 gelerek "1101" dizisini yakalayıp z = 1 çıkışını ürettiği anda hangi duruma geçiş yapar?',
      options: [
        'S₁ ("1 alındı") durumuna',
        'S₀ ("Başlangıç / Sıfır") durumuna',
        'S₂ ("11 alındı") durumuna',
        'S₃ ("110 alındı") durumunun kendisinde kalır',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Dizinin En Uzun Geçerli Önekini (Prefix) Kontrol Et',
          detail:
            'Alınan dizi "1101". Son 3 bit "101" önek değil; son 2 bit "01" önek değil; ancak son 1 bit olan "1", yeni bir "1101" dizisinin ilk biti olabilir! Dolayısıyla makine S₁ ("1 alındı") durumuna geçer.',
        },
      ],
    },
    {
      id: 'w13-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · JK Flip-Flop ile 2-Bit Gray Code Sayıcı Tasarımı (Mano 5.16)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        '00 → 01 → 11 → 10 → 00 (2-bit Gray Code) çevrimini izleyen bir sayıcı JK Flip-Flop’larla tasarlandığında J_A, K_A, J_B, K_B giriş denklemleri sırasıyla nedir?',
      options: [
        "J_A = B, K_A = B', J_B = A', K_B = A",
        "J_A = B', K_A = B, J_B = A, K_B = A'",
        'J_A = 1, K_A = 1, J_B = A, K_B = B',
        'J_A = A ⊕ B, K_A = 1, J_B = B, K_B = A',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: JK Uyarım Sütunlarını K-Map\'e Yerleştir',
          detail:
            '• J_A (AB=00→0, 01→1, 11→X, 10→X): 01 ve 11 gruplanır ⇒ J_A = B\n• K_A (AB=00→X, 01→X, 11→0, 10→1): 00 ve 10 gruplanır ⇒ K_A = B\'',
        },
        {
          title: 'Adım 2: B Flip-Flop K-Map Sadeleştirmesi',
          detail:
            "• J_B (AB=00→1, 01→X, 11→X, 10→0): 00 ve 01 gruplanır ⇒ J_B = A'\n• K_B (AB=00→X, 01→0, 11→1, 10→X): 11 ve 10 gruplanır ⇒ K_B = A",
        },
      ],
    },
    {
      id: 'w13-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · T Flip-Flop ile 2-Bit İkili Sayıcı Tasarımı (Mano 5.18)',
      difficulty: 'Temel',
      prompt:
        '00 → 01 → 10 → 11 → 00 (2-bit ikili yukarı sayıcı) devresini T Flip-Flop’larla tasarlarken uyarım tablosundan elde edilen T_A (MSB) ve T_B (LSB) giriş denklemleri nedir?',
      options: ['T_A = B ve T_B = 1', 'T_A = 1 ve T_B = A', 'T_A = A ⊕ B ve T_B = 0', "T_A = B' ve T_B = 1"],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Her Bitin Terslenme (Toggle) Koşulunu İncele',
          detail:
            'LSB olan B biti her saat darbesinde 0→1→0→1 değiştiği için T_B = 1. MSB olan A biti ise yalnızca B = 1 iken (01→10 ve 11→00) değiştiği için T_A = B bulunur.',
        },
      ],
    },
    {
      id: 'w13-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · Lock-Out Durumu ve Self-Correcting FSM',
      difficulty: 'Orta',
      prompt:
        '3 Flip-Flop ile tasarlanan 6 durumlu bir ardışıl devrede, kalan 2 kullanılmayan durumun (110 ve 111) Don\'t-Care olarak tasarlanması sonucunda bu durumlardan birine elektriksel gürültüyle düşüldüğünde geçerli bir duruma dönülememesine ne ad verilir ve nasıl önlenir?',
      options: [
        'Lock-out (kilitlenme) durumu; kullanılmayan durumların sonraki durumlarının açıkça geçerli bir başlangıç durumuna (ör. 000) bağlanmasıyla önlenir.',
        'Race condition durumu; saat frekansını iki katına çıkararak önlenir.',
        'Bus contention durumu; Three-State buffer eklenerek önlenir.',
        'Metastability durumu; T Flip-Flop yerine Latch kullanılarak önlenir.',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Self-Correcting (Kendi Kendini Düzeltme) İlkesi',
          detail:
            'Kullanılmayan durumlar K-Map\'te X bırakıldığında, sentezlenen denklemler bu durumları yine kendi aralarında (110 ↔ 111) kısır döngüye sokabilir (Lock-out). Bunu önlemek için tasarımdan sonra kullanılmayan durumların geçişleri kontrol edilir veya açıkça 000\'a yönlendirilir.',
        },
      ],
    },
    {
      id: 'w13-q5',
      type: 'interactive-table',
      title: 'Soru 5 · Mod-3 Sayıcı (00 → 01 → 10 → 00) JK Uyarım Tablosu',
      difficulty: 'Orta',
      prompt:
        '00 → 01 → 10 → 00 sırasıyla sayan (11 durumu kullanılmayan / Don\'t-Care olan) Mod-3 sayıcı tasarımında JK Flip-Flop uyarım sütunlarını (0, 1 veya X olarak tıklayarak) doldurun.',
      headers: ['Şimdiki (A B)', 'Sonraki (A+ B+)', 'J_A', 'K_A', 'J_B', 'K_B'],
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
      solutionExplanation:
        'Bu tablodan K-Map çizildiğinde J_A = B, K_A = 1, J_B = A\', K_B = 1 elde edilir. Dikkat edilirse 11 durumunda A+ = (B)(0) + (0)(1) = 0 ve B+ = (0)(1) + (0)(1) = 0 olduğundan devre 11\'den otomatik 00\'a döner (Self-Correcting!).',
    },
    {
      id: 'w13-q6',
      type: 'simulator-build',
      title: 'Soru 6 · 2-Bit Gray Code Counter Kurulumu (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        "Simülatörde 2 adet JK Flip-Flop (ve gerekirse NOT kapısı) kullanarak 2-Bit Gray Code Counter (00 → 01 → 11 → 10 → 00; J_A = B, K_A = B', J_B = A', K_B = A) devresini kurun. İlk FF çıkışını A LED'ine, ikinci FF çıkışını B LED'ine bağlayın ve Clock darbeleriyle 4 durumlu Gray çevrimini doğrulayın.",
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
      hint: "Her JK Flip-Flop'un zaten Q ve Q' çıkışları vardır! A Flip-Flop'unun J_A pinine B'nin Q çıkışını, K_A pinine B'nin Q' çıkışını bağlayın. B Flip-Flop'unun J_B pinine A'nın Q' çıkışını, K_B pinine A'nın Q çıkışını bağlayın. İki CLK pinini ortak CLK üretecine verin.",
      solutionDescription:
        "JK Flip-Flop'ların kendi Q ve Q' çıkışları doğrudan çapraz bağlanarak (J_A=B, K_A=B', J_B=A', K_B=A) ekstra hiçbir kapı olmadan 00 → 01 → 11 → 10 → 00 Gray Code sayıcısı elde edilir.",
    },
  ],
};
