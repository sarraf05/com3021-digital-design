import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  BookOpen,
  Cpu,
  Star,
  Grid3X3,
  Table2,
  Calculator,
  Activity,
  GitCommitHorizontal,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { WEEKS } from './data/weeks';
import type { WidgetType } from './types/curriculum';
import { VisualSectionCard } from './components/curriculum/VisualSectionCard';
import { QuestionCard } from './components/curriculum/QuestionCard';
import { CircuitSimulator } from './components/simulator/CircuitSimulator';
import { WidgetRenderer } from './components/widgets/WidgetRenderer';

type MainView = 'curriculum' | 'tools' | 'simulator';

const WIDGET_TABS: {
  id: WidgetType;
  label: string;
  icon: LucideIcon;
  iconColor: string;
}[] = [
  {
    id: 'KMapStudio',
    label: 'K-Map',
    icon: Grid3X3,
    iconColor: 'text-emerald-600',
  },
  {
    id: 'TruthTableBuilder',
    label: 'Truth Table',
    icon: Table2,
    iconColor: 'text-sky-600',
  },
  {
    id: 'BaseComplementVisualizer',
    label: 'Taban & Complement',
    icon: Calculator,
    iconColor: 'text-violet-600',
  },
  {
    id: 'TimingDiagramViewer',
    label: 'Timing Diagram',
    icon: Activity,
    iconColor: 'text-amber-600',
  },
  {
    id: 'StateMachineExplorer',
    label: 'State Machine',
    icon: GitCommitHorizontal,
    iconColor: 'text-rose-600',
  },
];

const WEEK_THEMES = [
  {
    activeCard: 'bg-sky-50 border-sky-300 text-sky-950',
    numActive: 'bg-sky-500 text-white',
    numIdle: 'bg-sky-100 text-sky-700',
    heroGradient: 'from-sky-50 via-white to-emerald-50/70',
    accentText: 'text-sky-600',
  },
  {
    activeCard: 'bg-rose-50 border-rose-300 text-rose-950',
    numActive: 'bg-rose-500 text-white',
    numIdle: 'bg-rose-100 text-rose-700',
    heroGradient: 'from-rose-50 via-white to-amber-50/70',
    accentText: 'text-rose-600',
  },
  {
    activeCard: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    numActive: 'bg-emerald-500 text-white',
    numIdle: 'bg-emerald-100 text-emerald-700',
    heroGradient: 'from-emerald-50 via-white to-sky-50/70',
    accentText: 'text-emerald-600',
  },
  {
    activeCard: 'bg-violet-50 border-violet-300 text-violet-950',
    numActive: 'bg-violet-500 text-white',
    numIdle: 'bg-violet-100 text-violet-700',
    heroGradient: 'from-violet-50 via-white to-rose-50/70',
    accentText: 'text-violet-600',
  },
  {
    activeCard: 'bg-amber-50 border-amber-300 text-amber-950',
    numActive: 'bg-amber-500 text-white',
    numIdle: 'bg-amber-100 text-amber-800',
    heroGradient: 'from-amber-50 via-white to-sky-50/70',
    accentText: 'text-amber-600',
  },
];

export default function App() {
  const [activeView, setActiveView] = useState<MainView>('curriculum');
  const [selectedWeekId, setSelectedWeekId] = useState<number>(1);
  const [activeTool, setActiveTool] = useState<WidgetType>('KMapStudio');
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  const activeWeek = WEEKS.find((w) => w.id === selectedWeekId) ?? WEEKS[0];
  const activeTheme = activeWeek.isExam
    ? WEEK_THEMES[4]
    : WEEK_THEMES[(activeWeek.weekNumber - 1) % WEEK_THEMES.length];

  // Close drawer on Escape or clicking outside the drawer
  useEffect(() => {
    if (!drawerOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (
        drawerRef.current?.contains(target) ||
        hamburgerBtnRef.current?.contains(target)
      ) {
        return;
      }
      setDrawerOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawerOpen]);

  const handleMarkCompleted = (qId: string) => {
    setCompletedQuestions((prev) => ({ ...prev, [qId]: true }));
  };

  const handleSelectWeek = (id: number) => {
    setSelectedWeekId(id);
    setActiveView('curriculum');
    setDrawerOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchView = (view: MainView) => {
    setActiveView(view);
    setDrawerOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalQuestionsCount = WEEKS.reduce((acc, w) => acc + w.questions.length, 0);
  const totalCompletedCount = Object.values(completedQuestions).filter(Boolean).length;
  const activeWeekCompleted = activeWeek.questions.filter(
    (q) => completedQuestions[q.id]
  ).length;

  return (
    <div className="h-[100dvh] w-screen overflow-hidden bg-[#FFFDF8] text-slate-800 flex flex-col">
      {/* Responsive Top Navigation Bar */}
      <header className="shrink-0 z-50 h-14 md:h-16 border-b-2 border-slate-200/80 bg-white/95 backdrop-blur px-2.5 sm:px-4 lg:px-6 flex items-center justify-between gap-1.5 md:gap-4 lg:gap-8">
        {/* Zone 1: Cute Hamburger Button + Brand Wordmark */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0 min-w-0">
          <button
            ref={hamburgerBtnRef}
            type="button"
            onClick={() => setDrawerOpen((o) => !o)}
            title="14 Haftalık Müfredat"
            aria-label="14 Haftalık Müfredat"
            aria-expanded={drawerOpen}
            className={`group flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] md:min-h-[40px] px-2.5 md:px-3 py-1.5 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
              drawerOpen
                ? 'bg-sky-500 border-sky-600 text-white shadow-sm'
                : 'bg-sky-50 hover:bg-sky-100 border-sky-200 hover:border-sky-300 text-sky-800'
            }`}
          >
            <span className="flex flex-col justify-center gap-[3.5px] w-4 h-4" aria-hidden="true">
              <span
                className={`block h-[2.5px] w-4 rounded-full transition-colors ${
                  drawerOpen ? 'bg-white' : 'bg-sky-600'
                }`}
              />
              <span
                className={`block h-[2.5px] w-3 rounded-full transition-all ${
                  drawerOpen ? 'bg-white w-4' : 'bg-rose-400 group-hover:w-4'
                }`}
              />
              <span
                className={`block h-[2.5px] w-4 rounded-full transition-colors ${
                  drawerOpen ? 'bg-white' : 'bg-emerald-500'
                }`}
              />
            </span>
            <span className="font-display tracking-tight hidden sm:inline">Müfredat</span>
          </button>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleSwitchView('curriculum');
            }}
            className="font-display text-sm sm:text-base lg:text-lg font-black tracking-tight text-slate-800 whitespace-nowrap shrink-0"
          >
            <span className="md:hidden">COM 3021</span>
            <span className="hidden md:inline">COM 3021 · Digital Design I</span>
          </a>
        </div>

        {/* Mobile (< 768px) Compact Icon+Label Navigation Pills */}
        <nav
          aria-label="Mobil Ana Gezinme"
          className="flex md:hidden items-center gap-1 shrink-0"
        >
          <button
            type="button"
            onClick={() => handleSwitchView('curriculum')}
            className={`flex items-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-xl border-2 text-[11px] font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'curriculum'
                ? 'bg-sky-100 border-sky-300 text-sky-800 shadow-xs'
                : 'bg-white border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Ders</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchView('tools')}
            className={`flex items-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-xl border-2 text-[11px] font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'tools'
                ? 'bg-violet-100 border-violet-300 text-violet-800 shadow-xs'
                : 'bg-white border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 shrink-0" />
            <span>Araçlar</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchView('simulator')}
            className={`flex items-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-xl border-2 text-[11px] font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'simulator'
                ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 shrink-0" />
            <span>Lab</span>
          </button>
        </nav>

        {/* Zone 2: Tablet & Desktop Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm font-bold">
          <button
            type="button"
            onClick={() => handleSwitchView('curriculum')}
            className={`py-1.5 border-b-[3px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'curriculum'
                ? 'border-sky-500 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            14 Haftalık Müfredat
          </button>
          <button
            type="button"
            onClick={() => handleSwitchView('tools')}
            className={`py-1.5 border-b-[3px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'tools'
                ? 'border-violet-500 text-violet-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Görsel Araçlar
          </button>
          <button
            type="button"
            onClick={() => handleSwitchView('simulator')}
            className={`py-1.5 border-b-[3px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'simulator'
                ? 'border-emerald-500 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Devre Simülatörü (Lab)
          </button>
        </nav>

        {/* Zone 3: Single Primary Action (Tablet & Desktop) */}
        <div className="hidden md:block shrink-0">
          <button
            type="button"
            onClick={() =>
              handleSwitchView(activeView === 'simulator' ? 'curriculum' : 'simulator')
            }
            className="px-3.5 lg:px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 border-2 border-emerald-600 border-b-4 active:border-b-2 active:translate-y-0.5 text-white text-xs font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            {activeView === 'simulator' ? 'Müfredata Dön' : "Lab'ı Aç"}
          </button>
        </div>
      </header>

      {/* Main Layout: Dual-Independent Scroll Architecture */}
      <div className="flex-1 min-h-0 flex relative overflow-hidden">
        {/* Soft Visual Backdrop */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-30 bg-slate-900/15 backdrop-blur-[1.5px] transition-opacity duration-300 ${
            drawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Slide-Out 14-Week Syllabus Drawer */}
        <aside
          ref={drawerRef}
          aria-hidden={!drawerOpen}
          className={`absolute inset-y-0 left-0 z-40 w-[84vw] max-w-[320px] lg:w-[330px] lg:max-w-[330px] rounded-r-3xl border-2 border-l-0 border-slate-200/90 bg-white shadow-[14px_0_36px_-10px_rgba(15,23,42,0.16)] flex flex-col overflow-hidden transition-transform duration-300 ease-out ${
            drawerOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
          }`}
        >
          {/* Drawer Header (Fixed inside drawer) */}
          <div className="shrink-0 p-4 border-b-2 border-slate-100 bg-gradient-to-br from-rose-50/85 via-amber-50/70 to-sky-50/85 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs font-display font-extrabold text-slate-800">
                  İstanbul Kültür Üniversitesi
                </div>
                <div className="text-[11px] text-slate-600 font-semibold mt-0.5">
                  Bilgisayar Mühendisliği · 14 Haftalık Plan
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                title="Menüyü Kapat"
                aria-label="Müfredat Çekmecesini Kapat"
                className="w-8 h-8 rounded-xl border-2 border-rose-200 border-b-4 bg-white hover:bg-rose-50 hover:border-rose-300 active:border-b-2 active:translate-y-0.5 text-rose-500 hover:text-rose-600 flex items-center justify-center transition-all shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-0.5 flex items-center justify-between text-xs font-mono font-bold text-amber-700">
              <span className="inline-flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                İlerleme: {totalCompletedCount} / {totalQuestionsCount}
              </span>
              <span>
                %{Math.round((totalCompletedCount / Math.max(1, totalQuestionsCount)) * 100)}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-white border border-slate-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-300"
                style={{
                  width: `${Math.round(
                    (totalCompletedCount / Math.max(1, totalQuestionsCount)) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Independent Drawer Scroll Container (No scroll chaining) */}
          <nav
            className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain pastel-scrollbar p-3 space-y-1.5"
            aria-label="14 Haftalık Ders Planı"
          >
            {WEEKS.map((w) => {
              const isActive = w.id === selectedWeekId;
              const theme = w.isExam
                ? WEEK_THEMES[4]
                : WEEK_THEMES[(w.weekNumber - 1) % WEEK_THEMES.length];
              const weekDone =
                w.questions.length > 0 &&
                w.questions.every((q) => completedQuestions[q.id]);

              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => handleSelectWeek(w.id)}
                  className={`w-full min-h-[48px] text-left px-3 py-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2.5 ${
                    isActive
                      ? `${theme.activeCard} border-b-4`
                      : 'border-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl font-mono text-xs font-extrabold flex items-center justify-center shrink-0 ${
                      isActive ? theme.numActive : theme.numIdle
                    }`}
                  >
                    {String(w.weekNumber).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold leading-snug line-clamp-2 text-slate-800">
                      {w.englishTitle}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {w.questions.length} Soru · {w.visualSections.length} Konu
                    </div>
                  </div>
                  {weekDone && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Independent Main Content Container */}
        <main
          ref={mainRef}
          className={`flex-1 min-w-0 h-full ${
            activeView === 'simulator'
              ? 'overflow-hidden'
              : 'overflow-y-auto overscroll-y-contain'
          }`}
        >
          {activeView === 'curriculum' && (
            <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-5 md:py-8 space-y-6 md:space-y-8">
              {/* Week Hero Header */}
              <header
                className={`rounded-3xl border-2 border-slate-200 border-b-4 bg-gradient-to-br ${activeTheme.heroGradient} p-4 md:p-6 lg:p-7 space-y-4 shadow-sm`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`font-mono font-extrabold ${activeTheme.accentText}`}>
                      Hafta {activeWeek.weekNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>COM 3021 Digital Design I</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {activeWeek.isExam ? 'Ara Sınav Simülatörü' : 'Tam Ders Modülü'}
                    </span>
                  </div>

                  {activeWeek.questions.length > 0 && (
                    <span className="font-mono font-bold text-emerald-700 inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {activeWeekCompleted} / {activeWeek.questions.length} Soru Tamamlandı
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight text-balance">
                    {activeWeek.englishTitle}
                  </h1>
                  <p className={`text-base font-bold ${activeTheme.accentText}`}>
                    {activeWeek.turkishSubtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-3xl">
                  {activeWeek.summary}
                </p>

                {/* Learning Objectives */}
                <div className="rounded-2xl border-2 border-slate-200/80 bg-white/90 p-4 space-y-2.5">
                  <div className="text-xs font-display font-extrabold text-slate-800 flex items-center gap-2">
                    <BookOpen className={`w-4 h-4 ${activeTheme.accentText}`} />
                    <span>Bu Haftanın Öğrenme Hedefleri</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-0.5">
                    {activeWeek.learningObjectives.map((obj, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-700 font-medium flex items-start gap-2 leading-relaxed"
                      >
                        <span className={`font-mono font-extrabold shrink-0 ${activeTheme.accentText}`}>
                          0{idx + 1}.
                        </span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </header>

              {/* Week Content */}
              {!activeWeek.isPlaceholder ? (
                <>
                  <div className="space-y-6">
                    {activeWeek.visualSections.map((sec) => (
                      <VisualSectionCard key={sec.id} section={sec} />
                    ))}
                  </div>

                  <div className="space-y-5 pt-4 border-t-2 border-slate-200/70">
                    <div className="space-y-1">
                      <h2 className="font-display text-xl sm:text-2xl font-black text-slate-800">
                        Alıştırmalar ve Sınav Hazırlık Soruları
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Mano & Dr. Dhiman ders formatına uygun çoktan seçmeli, tablo doldurma ve canlı devre tasarım görevleri.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {activeWeek.questions.map((q) => (
                        <QuestionCard
                          key={q.id}
                          question={q}
                          isCompleted={Boolean(completedQuestions[q.id])}
                          onMarkCompleted={handleMarkCompleted}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="font-display text-base font-bold text-slate-800">
                        Hafta {activeWeek.weekNumber} Etkileşimli Çalışma Alanı
                      </h2>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        Aşağıdaki interaktif aracı kullanarak konuyu adım adım keşfedebilir veya devre simülatörüne geçebilirsiniz.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveView('simulator')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-sky-200 border-b-4 bg-sky-50 hover:bg-sky-100 text-xs font-bold text-sky-800 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Cpu className="w-4 h-4 text-sky-600" />
                      <span>Devre Simülatöründe Dene</span>
                    </button>
                  </div>

                  {activeWeek.recommendedWidget && (
                    <WidgetRenderer
                      type={activeWeek.recommendedWidget}
                      config={activeWeek.recommendedWidgetConfig}
                    />
                  )}
                </div>
              )}

              {/* Bottom Week Pager */}
              <footer className="pt-6 border-t-2 border-slate-200/70 flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={selectedWeekId <= 1}
                  onClick={() => handleSelectWeek(selectedWeekId - 1)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-slate-200 border-b-4 bg-white text-xs font-bold text-slate-700 hover:border-sky-300 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Önceki Hafta</span>
                </button>

                <span className="font-mono text-xs font-bold text-slate-500">
                  {activeWeek.weekNumber} / 14
                </span>

                <button
                  type="button"
                  disabled={selectedWeekId >= 14}
                  onClick={() => handleSelectWeek(selectedWeekId + 1)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-slate-200 border-b-4 bg-white text-xs font-bold text-slate-700 hover:border-sky-300 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <span>Sonraki Hafta</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </footer>
            </div>
          )}

          {activeView === 'tools' && (
            <div className="max-w-7xl mx-auto min-h-[calc(100dvh-56px)] md:min-h-[calc(100dvh-64px)] lg:min-h-0 lg:h-[calc(100dvh-76px)] lg:overflow-hidden flex flex-col justify-between p-3 pb-10 lg:p-4 lg:pb-4 gap-3">
              {/* Cute Pastel Tool Switcher Bar (Horizontally scrollable on narrow phones) */}
              <div className="shrink-0 w-full overflow-x-auto pb-0.5">
                <div className="bg-amber-50/90 border-2 border-amber-200/80 rounded-2xl p-1.5 inline-flex flex-nowrap gap-1.5 min-w-max">
                  {WIDGET_TABS.map((t) => {
                    const Icon = t.icon;
                    const isActive = activeTool === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveTool(t.id)}
                        className={`flex items-center gap-2 min-h-[40px] sm:min-h-0 px-3 sm:px-3.5 py-2 text-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-white text-slate-800 font-bold rounded-xl border-2 border-sky-200 border-b-4 border-b-sky-400 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 rounded-xl border-2 border-transparent font-semibold'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? t.iconColor : 'text-slate-400'}`} />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <WidgetRenderer type={activeTool} studioMode />
            </div>
          )}

          {activeView === 'simulator' && (
            <div className="h-full w-full overflow-hidden flex flex-col p-1.5 sm:p-2.5 lg:p-3">
              <CircuitSimulator mode="lab" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
