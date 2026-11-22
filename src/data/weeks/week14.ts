import type { WeekModule } from '../../types/curriculum';

export const week14: WeekModule = {
  id: 14,
  weekNumber: 14,
  englishTitle: 'Registers and Counters (Shift Registers & Counters)',
  turkishSubtitle: 'Yazmaçlar, Universal Shift Register, Ripple / Senkron Sayıcılar ve Ring / Johnson Sayıcıları',
  summary:
    'Paralel yüklemeli yazmaçları (Registers), SISO/SIPO/PISO/Universal Shift Register mimarisini, Ripple vs. Synchronous Binary Counter gecikme ve Enable zinciri farklarını, BCD Decade sayıcıyı ve tek/çift fazlı Ring ile Johnson sayıcılarını öğrenin.',
  learningObjectives: [
    '4-Bit Universal Shift Register devresinde S₁S₀ kontrol uçlarının (Hold, Shift Right, Shift Left, Load) işleyişini analiz etmek',
    'Ripple (Asenkron) sayıcıların yayılım gecikmesini (N · t_pd) senkron sayıcılarla karşılaştırmak',
    'Synchronous Binary Counter için Count Enable zincir denklemlerini (Tᵢ = E · Q₀···Qᵢ₋₁) kurmak',
    'Ring Counter (N durum) ile Johnson Counter (2N durum) arasındaki durum döngüsü ve donanım farklarını açıklamak',
  ],
  isPlaceholder: false,
  recommendedWidget: 'TimingDiagramViewer',
  recommendedWidgetConfig: {
    flipFlopType: 'T',
  },
  visualSections: [
    {
      id: 'w14-s1',
      title: '1. Yazmaçlar (Registers), Shift Registers ve Universal Shift Register',
      explanation:
        'Bir Register, ortak bir Clock hattını paylaşan n adet Flip-Flop grubudur ve n-bitlik veri saklar. Paralel Yüklemeli (Parallel Load) yazmaçlarda Load = 0 iken Flip-Flop çıkışı tekrar D girişine geri beslenerek veri korunur (Clock Gating yapılmaz!).\n\nKaydırmalı Yazmaçlar (Shift Registers) veriyi saat darbesiyle bit bit kaydırır: SISO (Seri Giriş-Seri Çıkış), SIPO (Seri Giriş-Paralel Çıkış), PISO (Paralel Giriş-Seri Çıkış) ve PIPO.\n\n4-Bit Universal Shift Register (Mano Şekil 6.7): Her bir bit hücresinde bir adet D Flip-Flop ve bir adet 4×1 MUX bulunur. Seçme hatlarına (S₁ S₀) göre 4 modu tek devrede birleştirir:\n• 00: Değişiklik Yok (Hold)  |  • 01: Sağa Kaydır (Shift Right)  |  • 10: Sola Kaydır (Shift Left)  |  • 11: Paralel Yükle (Parallel Load)',
      diagrams: [
        {
          kind: 'table',
          caption: '4-Bit Universal Shift Register Fonksiyon Tablosu',
          headers: ['S₁', 'S₀', 'Yazmaç İşlevi', 'MUX Seçilen Girişi'],
          highlightColumn: 2,
          rows: [
            ['0', '0', 'No Change (Hold)', 'I₀ = Kendi Qᵢ çıkışı'],
            ['0', '1', 'Shift Right (A₃ → A₂ → A₁ → A₀)', 'I₁ = Soldaki bit (MSB için Serial_In_R)'],
            ['1', '0', 'Shift Left (A₀ → A₁ → A₂ → A₃)', 'I₂ = Sağdaki bit (LSB için Serial_In_L)'],
            ['1', '1', 'Parallel Load', 'I₃ = Harici Paralel Giriş (Iᵢ)'],
          ],
        },
      ],
      examTip:
        'Shift Right işleminde MSB (sol uç) yerine yeni gelen seri bit girer, LSB (sağ uç) dışarı atılır — bu işlem işaretsiz bir sayıyı 2\'ye bölmeye (÷ 2) eşdeğerdir! Shift Left ise 2 ile çarpar (× 2).',
    },
    {
      id: 'w14-s2',
      title: '2. Asenkron (Ripple) ve Senkron Sayıcılar (Binary & BCD Decade)',
      explanation:
        'Sayıcılar (Counters) saat darbeleri altında belirli bir durum dizisini takip eden özel ardışıl devrelerdir:\n• Asenkron (Ripple) Sayıcı: Yalnızca ilk Flip-Flop (LSB) harici Clock alır; sonraki her Flip-Flop\'un Clock girişi bir önceki Flip-Flop\'un çıkışından sürülür. Basit olmasına rağmen her aşamada t_pd gecikmesi birikir (en kötü durum = N × t_pd) ve anlık hatalı ara kodlar (glitch) üretebilir.\n• Senkron İkili Sayıcı (Synchronous Binary Counter): Tüm Flip-Flop\'lar ortak Clock ile aynı anda tetiklenir! Count Enable (E) sinyali zinciriyle her bit kendinden düşük tüm bitler 1 olduğunda terslenir: T₀ = E, T₁ = E·Q₀, T₂ = E·Q₀Q₁, T₃ = E·Q₀Q₁Q₂.\n• BCD Decade Sayıcı: 0000 (0) ile 1001 (9) arasında sayar; 9 (1001) durumuna ulaşıldığında bir sonraki saat darbesinde 1010 yerine 0000\'a döner ve Carry (y = Q₃Q₀) üretir.',
      widget: 'TimingDiagramViewer',
      widgetConfig: {
        flipFlopType: 'T',
      },
      examTip:
        'Ripple sayıcıda en kötü durum gecikmesi daima tüm bitlerin aynı anda değiştiği "0111 → 1000" (veya 1111 → 0000) geçişidir ve N adet Flip-Flop gecikmesinin toplamına (N × t_pd) eşittir!',
    },
    {
      id: 'w14-s3',
      title: '3. Ring Counter ve Johnson (Switch-Tail) Counter',
      explanation:
        'Kaydırmalı yazmaçların çıkışını girişine geri bağlayarak düşük maliyetli, ek çözücü (decoding) kapısı gerektirmeyen özel sayıcılar elde edilir:\n• Ring Counter: Son Flip-Flop\'un normal çıkışı (Q_{n-1}) ilk Flip-Flop\'un D₀ girişine bağlanır. Başlangıçta tek bir "1" biti yüklenir (ör. 1000 → 0100 → 0010 → 0001). n Flip-Flop ile tam olarak n adet zamanlama sinyali üretir.\n• Johnson (Switch-Tail) Counter: Son Flip-Flop\'un TÜMLEYEN çıkışı (Q\'_{n-1}) ilk Flip-Flop\'un D₀ girişine bağlanır! 0000\'dan başlandığında sırasıyla 1\'ler dolup sonra 0\'lar dolarak n Flip-Flop ile tam 2n adet benzersiz durum üretir.',
      diagrams: [
        {
          kind: 'table',
          caption: 'N-Bit Ring Counter vs. Johnson Counter Karşılaştırması',
          headers: ['Özellik', 'Ring Counter', 'Johnson (Switch-Tail) Counter'],
          highlightColumn: 2,
          rows: [
            ['Geri Besleme Bağlantısı', 'D₀ = Q_{n-1}', "D₀ = Q'_{n-1}"],
            ['Geçerli Durum Sayısı', 'n adet durum', '2n adet durum'],
            ['Kullanılmayan Durum Sayısı', '2ⁿ - n', '2ⁿ - 2n'],
            ['Örnek 4-Bit Döngü', '1000 → 0100 → 0010 → 0001', '0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001'],
          ],
        },
      ],
      examTip:
        'Johnson Counter\'daki herhangi bir durumu tek başına algılamak için kaç girişli AND kapısı gerekir? Cevap her zaman yalnızca 2-girişli AND kapısıdır (ör. 4-bitlik sistemde 1110 durumunu algılamak için Q₀·Q₃\' yeterlidir)!',
    },
  ],
  questions: [
    {
      id: 'w14-q1',
      type: 'multiple-choice',
      title: 'Soru 1 · Universal Shift Register Mod Kontrolü (Mano 6.4)',
      difficulty: 'Temel',
      prompt:
        '4-bitlik bir Universal Shift Register\'da mevcut içerik A₃A₂A₁A₀ = 1101, mod kontrol girişleri S₁S₀ = 01 (Shift Right) ve sağa kaydırma seri girişi Serial_In = 0 iken bir saat darbesi sonrasında yeni yazmaç değeri ne olur?',
      options: ['0110', '1010', '1101', '1011'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Sağa Kaydırma (Shift Right) Yönünü Uygula',
          detail:
            'Her bit bir basamak sağa kayar (A₃ → A₂ → A₁ → A₀). Sağdaki LSB (1) dışarı çıkar, soldaki MSB (A₃) konumuna Serial_In = 0 yerleşir: [0] 1 1 0 ⇒ 0110.',
        },
      ],
    },
    {
      id: 'w14-q2',
      type: 'multiple-choice',
      title: 'Soru 2 · Asenkron (Ripple) Sayıcı Yayılım Gecikmesi',
      difficulty: 'Orta',
      prompt:
        'Her bir Flip-Flop’un saat-çıkış yayılım gecikmesi t_pd = 15 ns olan 4-bitlik bir asenkron (Ripple) sayıcıda 0111 (7) durumundan 1000 (8) durumuna geçerken tüm çıkışların kararlı hale gelmesi için geçen toplam süre kaç nanosaniyedir?',
      options: ['60 ns', '15 ns', '45 ns', '30 ns'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Dalgalanma (Ripple) Zincirini İzle',
          detail:
            '0111 → 1000 geçişinde 4 bitin tamamı değişir! Önce Q₀ (15 ns) değişip Q₁\'i tetikler (30 ns), Q₁ değişip Q₂\'yi tetikler (45 ns), Q₂ değişip Q₃\'ü tetikler: 4 × 15 ns = 60 ns.',
        },
      ],
    },
    {
      id: 'w14-q3',
      type: 'multiple-choice',
      title: 'Soru 3 · Senkron Yukarı İkili Sayıcı T Giriş Denklemi (Mano 6.14)',
      difficulty: 'Temel',
      prompt:
        'Count_Enable = 1 olan 4-bitlik senkron yukarı ikili sayıcıda (Q₃Q₂Q₁Q₀), en anlamlı bit Q₃\'ün bir sonraki saat darbesinde durum değiştirmesi (Toggle) için T₃ girişinin Boole ifadesi nedir?',
      options: ['T₃ = Q₂ Q₁ Q₀', 'T₃ = Q₂ + Q₁ + Q₀', 'T₃ = Q₀', 'T₃ = Q₃ Q₂ Q₁'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Q₃ Bitinin Değiştiği Durumları Bul',
          detail:
            '4-bit sayıcıda Q₃ yalnızca 0111 → 1000 (7→8) ve 1111 → 0000 (15→0) geçişlerinde değişir; her ikisinde de alt üç bit Q₂ = Q₁ = Q₀ = 1 dir ⇒ T₃ = Q₂Q₁Q₀.',
        },
      ],
    },
    {
      id: 'w14-q4',
      type: 'multiple-choice',
      title: 'Soru 4 · Ring Counter vs. Johnson Counter Durum Sayıları (Dr. Dhiman)',
      difficulty: 'Temel',
      prompt:
        '4 adet D Flip-Flop ile inşa edilen bir Ring Counter ve bir Johnson Counter devresinin sahip olduğu geçerli durum sayıları sırasıyla kaçtır?',
      options: [
        'Ring Counter: 4 durum; Johnson Counter: 8 durum',
        'Ring Counter: 8 durum; Johnson Counter: 16 durum',
        'Ring Counter: 4 durum; Johnson Counter: 4 durum',
        'Ring Counter: 16 durum; Johnson Counter: 8 durum',
      ],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Formülleri Uygula (n = 4)',
          detail:
            'Ring Counter (n durum) = 4 durum.\nJohnson Counter (2n durum) = 2 × 4 = 8 durum.',
        },
      ],
    },
    {
      id: 'w14-q5',
      type: 'multiple-choice',
      title: 'Soru 5 · SIPO Kaydırmalı Yazmaç Saat Darbesi Sayısı',
      difficulty: 'Temel',
      prompt:
        '8-bitlik bir veriyi önce seri olarak bir SIPO (Serial-In Parallel-Out) yazmaca yüklemek, ardından paralel olarak okumak için minimum kaç saat darbesi (Clock) gerekir?',
      options: ['8 saat darbesi', '1 saat darbesi', '16 saat darbesi', '9 saat darbesi'],
      correctIndex: 0,
      solutionSteps: [
        {
          title: 'Adım 1: Seri Giriş Süresi + Paralel Okuma',
          detail:
            '8 bitin seri girişten kaydırılarak içeri alınması için 8 saat darbesi gerekir; 8. darbe tamamlandığında tüm bitler paralel çıkış pinlerinden (ekstra saat darbesi olmadan) aynı anda okunabilir.',
        },
      ],
    },
    {
      id: 'w14-q6',
      type: 'interactive-table',
      title: 'Soru 6 · 4-Bit Johnson Counter Durum Döngüsü Tablosu',
      difficulty: 'Orta',
      prompt:
        "Başlangıç durumu 0000 olan 4-bitlik bir Johnson Counter devresinin (D₀ = Q₃', D₁ = Q₀, D₂ = Q₁, D₃ = Q₂) ardışık saat darbeleri boyunca üreteceği Q₀ Q₁ Q₂ Q₃ durum dizisini doldurun.",
      headers: ['Saat Darbesi', 'Q₀', 'Q₁', 'Q₂', 'Q₃'],
      rows: [
        [
          { value: 'Başlangıç (t₀)' },
          { value: '0' }, { value: '0' }, { value: '0' }, { value: '0' },
        ],
        [
          { value: 'Darbe 1 (t₁)' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: 'Darbe 2 (t₂)' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: 'Darbe 3 (t₃)' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
        ],
        [
          { value: 'Darbe 4 (t₄)' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: 'Darbe 5 (t₅)' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: 'Darbe 6 (t₆)' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
        [
          { value: 'Darbe 7 (t₇)' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '0', placeholder: '0/1' },
          { value: '', editable: true, expected: '1', placeholder: '0/1' },
        ],
      ],
      solutionExplanation:
        "Her darbede sağa kaydırma yapılırken sol uca Q₃' girer: 0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001 (8. darbede tekrar 0000'a döner).",
    },
    {
      id: 'w14-q7',
      type: 'simulator-build',
      title: 'Soru 7 · 3-Bit Johnson Counter Kurulumu (Canlı Lab)',
      difficulty: 'Sınav Seviyesi',
      prompt:
        "Simülatörde 3 adet D Flip-Flop kullanarak 3-Bit Johnson Counter (D₀ = Q₂', D₁ = Q₀, D₂ = Q₁) devresini kurun. Üç FF çıkışını sırasıyla Q0, Q1, Q2 LED'lerine bağlayın ve Clock darbeleriyle 6 adımlık durum döngüsünü (000 → 100 → 110 → 111 → 011 → 001 → 000) canlı test edip doğrulayın.",
      inputs: [],
      outputs: ['Q0', 'Q1', 'Q2'],
      allowedComponents: ['DFF'],
      expectedTruthTable: [],
      sequentialTest: {
        clkLabel: 'CLK',
        steps: [
          { inputs: {}, expectedOutputs: { Q0: 1, Q1: 0, Q2: 0 } },
          { inputs: {}, expectedOutputs: { Q0: 1, Q1: 1, Q2: 0 } },
          { inputs: {}, expectedOutputs: { Q0: 1, Q1: 1, Q2: 1 } },
          { inputs: {}, expectedOutputs: { Q0: 0, Q1: 1, Q2: 1 } },
          { inputs: {}, expectedOutputs: { Q0: 0, Q1: 0, Q2: 1 } },
          { inputs: {}, expectedOutputs: { Q0: 0, Q1: 0, Q2: 0 } },
        ],
      },
      hint: "1) Üç D Flip-Flop'un CLK pinlerini ortak CLK üretecine bağlayın. 2) FF0'ın Q çıkışını FF1'in D pinine ve Q0 LED'ine bağlayın. 3) FF1'in Q çıkışını FF2'nin D pinine ve Q1 LED'ine bağlayın. 4) FF2'nin Q çıkışını Q2 LED'ine, Q' (tümleyen) çıkışını ise geri döndürüp FF0'ın D pinine bağlayın!",
      solutionDescription:
        "Son D Flip-Flop'un Q' (tümleyen) çıkışı ilk Flip-Flop'un D₀ girişine geri beslendiğinde ekstra hiçbir kapı kullanmadan 6 benzersiz durumlu (2n = 6) 3-Bit Johnson Counter çalışır.",
    },
  ],
};
