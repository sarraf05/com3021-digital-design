import { Suspense, lazy, useEffect, useRef, useState } from 'react';
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
  RotateCcw,
  Sparkles,
  LayoutList,
  Check,
  BookMarked,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import { WEEKS } from './data/weeks';
import { getTextbookEntryForWeek } from './data/textbookMap';
import type { WidgetType } from './types/curriculum';
import { useSession, type MainView } from './context/SessionContext';
import { usePWA } from './hooks/usePWA';
import { t, UI_STRINGS } from './i18n/translations';
import { VisualSectionCard } from './components/curriculum/VisualSectionCard';
import { FocusCardDeck } from './components/curriculum/FocusCardDeck';
import { QuestionCard } from './components/curriculum/QuestionCard';
import { ErrorBoundary } from './components/curriculum/ErrorBoundary';
import { WidgetRenderer } from './components/widgets/WidgetRenderer';
import { getWeekCurriculum } from './data/curriculum';

const CircuitSimulator = lazy(() => import('./components/simulator/CircuitSimulator'));

const BookViewer = lazy(() => import('./components/book/BookViewer'));

const WIDGET_TABS: {
  id: WidgetType;
  icon: LucideIcon;
  iconColor: string;
}[] = [
  {
    id: 'KMapStudio',
    icon: Grid3X3,
    iconColor: 'text-emerald-600',
  },
  {
    id: 'TruthTableBuilder',
    icon: Table2,
    iconColor: 'text-sky-600',
  },
  {
    id: 'BaseComplementVisualizer',
    icon: Calculator,
    iconColor: 'text-violet-600',
  },
  {
    id: 'TimingDiagramViewer',
    icon: Activity,
    iconColor: 'text-amber-600',
  },
  {
    id: 'StateMachineExplorer',
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
  const {
    session,
    resetEpoch,
    setLanguage,
    setActiveView,
    setLessonViewMode,
    setFocusSubTab,
    setFocusStepForWeek,
    setFocusQuestionForWeek,
    setSelectedWeekId,
    setActiveTool,
    markQuestionCompleted,
    setBookPage,
    openBookAtPage,
    resetSession,
  } = useSession();

  const {
    language,
    activeView,
    lessonViewMode,
    focusSubTab,
    focusStepByWeek,
    focusQuestionByWeek,
    selectedWeekId,
    activeTool,
    completedQuestions,
    bookPage,
  } = session;
  const ui = UI_STRINGS[language];
  const { isOnline, isOfflineReady, isInstallable, isInstalled, isIOS, install } =
    usePWA();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  const activeWeek = WEEKS.find((w) => w.id === selectedWeekId) ?? WEEKS[0];
  const activeWeekBookEntry = getTextbookEntryForWeek(activeWeek.weekNumber);
  const activeFocusCurriculum = getWeekCurriculum(activeWeek.weekNumber);
  const activeTheme = activeWeek.isExam
    ? WEEK_THEMES[4]
    : WEEK_THEMES[(activeWeek.weekNumber - 1) % WEEK_THEMES.length];

  // Close drawer on Escape or clicking outside the drawer
  useEffect(() => {
    if (!drawerOpen) {
      setConfirmingReset(false);
      return;
    }
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
    markQuestionCompleted(qId);
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

  const handleConfirmResetSession = () => {
    setConfirmingReset(false);
    setDrawerOpen(false);
    resetSession();
    mainRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  };

  const totalQuestionsCount = WEEKS.reduce((acc, w) => acc + w.questions.length, 0);
  const totalCompletedCount = Object.values(completedQuestions).filter(Boolean).length;
  const activeWeekCompleted = activeWeek.questions.filter(
    (q) => completedQuestions[q.id]
  ).length;

  const sectionCount = activeWeek.visualSections.length;
  const focusCardCount = activeFocusCurriculum?.cards.length ?? 0;
  const focusTheoryTotal = activeFocusCurriculum ? focusCardCount : sectionCount;
  const questionCount = activeWeek.questions.length;
  const rawStepIndex = focusStepByWeek[activeWeek.id] ?? 0;
  const safeStepIndex =
    focusTheoryTotal > 0 ? Math.min(Math.max(0, rawStepIndex), focusTheoryTotal - 1) : 0;
  const rawQuestionIndex = focusQuestionByWeek[activeWeek.id] ?? 0;
  const safeQuestionIndex =
    questionCount > 0 ? Math.min(Math.max(0, rawQuestionIndex), questionCount - 1) : 0;
  const effectiveFocusSubTab =
    focusSubTab === 'practice' && questionCount === 0 ? 'theory' : focusSubTab;

  const handleFocusStepChange = (nextIndex: number) => {
    setFocusStepForWeek(activeWeek.id, nextIndex);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFocusQuestionChange = (nextIndex: number) => {
    setFocusQuestionForWeek(activeWeek.id, nextIndex);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFocusSubTabChange = (tab: 'theory' | 'practice') => {
    setFocusSubTab(tab);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleViewModeFromHeader = () => {
    const nextMode = lessonViewMode === 'full' ? 'focus' : 'full';
    setLessonViewMode(nextMode);
    if (activeView !== 'curriculum') {
      setActiveView('curriculum');
    }
  };

  return (
    <div key={resetEpoch} className="h-[100dvh] w-full max-w-full overflow-hidden overflow-x-hidden bg-[#FFFDF8] text-slate-800 flex flex-col">
      {/* Responsive Top Navigation Bar */}
      <header className="shrink-0 z-50 h-14 md:h-16 w-full max-w-full overflow-hidden border-b-2 border-slate-200/80 bg-white/95 backdrop-blur px-2.5 sm:px-4 lg:px-6 flex items-center justify-between gap-1.5 sm:gap-3 lg:gap-6">
        {/* Zone 1: Cute Hamburger Button + Brand Wordmark */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0 min-w-0">
          <button
            ref={hamburgerBtnRef}
            type="button"
            onClick={() => setDrawerOpen((o) => !o)}
            title={ui.header.syllabusTitle}
            aria-label={ui.header.syllabusTitle}
            aria-expanded={drawerOpen}
            className={`group flex items-center justify-center gap-2 min-w-[40px] sm:min-w-[44px] min-h-[40px] md:min-h-[40px] px-2 sm:px-2.5 md:px-3 py-1.5 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
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
            <span className="font-display tracking-tight hidden sm:inline">
              {ui.header.syllabusBtn}
            </span>
          </button>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleSwitchView('curriculum');
            }}
            className="font-display text-xs sm:text-base lg:text-lg font-black tracking-tight text-slate-800 whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline md:hidden">{ui.header.courseShort}</span>
            <span className="hidden md:inline">{ui.header.courseFull}</span>
          </a>
        </div>

        {/* Mobile (< 768px) Compact Icon+Label Navigation Pills */}
        <nav
          aria-label={ui.header.mobileNavLabel}
          className="flex md:hidden items-center gap-1 shrink-0"
        >
          <button
            type="button"
            onClick={() => handleSwitchView('curriculum')}
            className={`flex items-center gap-1 min-h-[38px] px-2 sm:px-2.5 py-1.5 rounded-xl border-2 text-[11px] font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'curriculum'
                ? 'bg-sky-100 border-sky-300 text-sky-800 shadow-xs'
                : 'bg-white border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>{ui.header.tabLessonMobile}</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchView('tools')}
            className={`flex items-center gap-1 min-h-[38px] px-2 sm:px-2.5 py-1.5 rounded-xl border-2 text-[11px] font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'tools'
                ? 'bg-violet-100 border-violet-300 text-violet-800 shadow-xs'
                : 'bg-white border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 shrink-0" />
            <span>{ui.header.tabToolsMobile}</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchView('simulator')}
            className={`flex items-center gap-1 min-h-[38px] px-2 sm:px-2.5 py-1.5 rounded-xl border-2 text-[11px] font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'simulator'
                ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 shrink-0" />
            <span>{ui.header.tabLabMobile}</span>
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
            {ui.header.tabCurriculumDesktop}
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
            {ui.header.tabToolsDesktop}
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
            {ui.header.tabLabDesktop}
          </button>
        </nav>

        {/* Zone 3: Cute View Mode Icon Toggle (Desktop) + TR | EN Pill + Primary Lab Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleToggleViewModeFromHeader}
            title={
              lessonViewMode === 'focus'
                ? ui.header.focusToggleToFull
                : ui.header.focusToggleToFocus
            }
            aria-label={
              lessonViewMode === 'focus'
                ? ui.header.focusToggleToFull
                : ui.header.focusToggleToFocus
            }
            aria-pressed={lessonViewMode === 'focus'}
            className={`hidden lg:inline-flex items-center gap-1.5 min-h-[38px] px-2.5 py-1.5 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 text-[11px] font-display font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              lessonViewMode === 'focus'
                ? 'bg-violet-100 border-violet-300 border-b-violet-400 text-violet-900 shadow-xs'
                : 'bg-white hover:bg-sky-50 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {lessonViewMode === 'focus' ? (
              <Sparkles className="w-3.5 h-3.5 text-violet-600 shrink-0" />
            ) : (
              <LayoutList className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            )}
            <span className="hidden xl:inline">
              {lessonViewMode === 'focus' ? ui.header.focusShort : ui.header.fullShort}
            </span>
          </button>

          <div
            role="group"
            aria-label="Language Switcher"
            className="bg-amber-50/95 border-2 border-amber-200/90 rounded-2xl p-0.5 inline-flex items-center gap-0.5 min-h-[38px]"
          >
            {(['tr', 'en'] as const).map((code) => {
              const isSelected = language === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  aria-pressed={isSelected}
                  className={`min-h-[32px] px-2 sm:px-2.5 py-1 rounded-xl text-[11px] font-display font-extrabold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-white text-slate-800 border border-sky-200 border-b-2 border-b-sky-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 border border-transparent'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              handleSwitchView(activeView === 'simulator' ? 'curriculum' : 'simulator')
            }
            className="hidden md:inline-flex px-3.5 lg:px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 border-2 border-emerald-600 border-b-4 active:border-b-2 active:translate-y-0.5 text-white text-xs font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            {activeView === 'simulator' ? ui.header.backToSyllabus : ui.header.openLab}
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
                  {ui.drawer.university}
                </div>
                <div className="text-[11px] text-slate-600 font-semibold mt-0.5">
                  {ui.drawer.departmentPlan}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                title={ui.drawer.closeMenu}
                aria-label={ui.drawer.closeDrawerAria}
                className="w-8 h-8 rounded-xl border-2 border-rose-200 border-b-4 bg-white hover:bg-rose-50 hover:border-rose-300 active:border-b-2 active:translate-y-0.5 text-rose-500 hover:text-rose-600 flex items-center justify-center transition-all shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-0.5 flex items-center justify-between text-xs font-mono font-bold text-amber-700">
              <span className="inline-flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                {ui.drawer.progress}: {totalCompletedCount} / {totalQuestionsCount}
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
            className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain pastel-scrollbar px-3 pb-3 pt-2 space-y-1.5"
            aria-label={ui.drawer.planAria}
          >
            {/* Sticky Pinned Textbook Card above Week 1 */}
            <div className="sticky top-0 z-10 -mx-1 px-1 pt-0.5 pb-2 bg-white/95 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => handleSwitchView('book')}
                className={`w-full min-h-[54px] text-left px-3 py-2.5 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2.5 shadow-xs ${
                  activeView === 'book'
                    ? 'bg-gradient-to-r from-amber-300 via-amber-200 to-rose-200 border-amber-500 text-slate-900'
                    : 'bg-gradient-to-r from-amber-100/90 via-amber-50 to-rose-50/90 hover:from-amber-200/80 hover:to-rose-100/80 border-amber-300 text-slate-900'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                    activeView === 'book'
                      ? 'bg-amber-600 border-amber-700 text-white'
                      : 'bg-white border-amber-200 text-amber-600'
                  }`}
                >
                  <BookMarked className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-display font-black leading-snug text-slate-900 truncate">
                    {ui.drawer.bookPdfTitle}
                  </div>
                  <div className="text-[11px] font-bold text-amber-900/80 mt-0.5 truncate">
                    {ui.drawer.bookPdfSubtitle}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-700 shrink-0" />
              </button>
            </div>

            {WEEKS.map((w) => {
              const isActive = activeView !== 'book' && w.id === selectedWeekId;
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
                      {t(w.englishTitle, language)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {w.questions.length} {ui.drawer.questionsWord} · {w.visualSections.length} {ui.drawer.topicsWord}
                    </div>
                  </div>
                  {weekDone && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Cute PWA Offline Status, Install Action & Session Reset Footer */}
          <div className="shrink-0 p-3 border-t-2 border-slate-100 bg-amber-50/40 space-y-2">
            {(isOfflineReady || !isOnline) && (
              <div className="flex flex-wrap items-center gap-1.5">
                {isOfflineReady && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    {ui.pwa.readyOffline}
                  </span>
                )}
                {!isOnline && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-amber-300 bg-amber-100/90 text-amber-900 text-[11px] font-bold">
                    {ui.pwa.offlineMode}
                  </span>
                )}
              </div>
            )}

            {!isInstalled && isInstallable && (
              <button
                type="button"
                onClick={() => {
                  void install();
                }}
                className="w-full min-h-[38px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl border-2 border-sky-300 border-b-4 active:border-b-2 active:translate-y-0.5 bg-sky-50 hover:bg-sky-100 text-xs font-extrabold text-sky-800 transition-all cursor-pointer"
              >
                <span>{ui.pwa.installApp}</span>
              </button>
            )}

            {!isInstalled && !isInstallable && isIOS && (
              <button
                type="button"
                onClick={() => setShowIosGuide(true)}
                className="w-full min-h-[38px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl border-2 border-sky-300 border-b-4 active:border-b-2 active:translate-y-0.5 bg-sky-50 hover:bg-sky-100 text-xs font-extrabold text-sky-800 transition-all cursor-pointer"
              >
                <span>{ui.pwa.installApp}</span>
              </button>
            )}

            {!confirmingReset ? (
              <button
                type="button"
                onClick={() => setConfirmingReset(true)}
                className="w-full min-h-[38px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl border-2 border-rose-200/80 bg-white hover:bg-rose-50/90 hover:border-rose-300 text-xs font-bold text-rose-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span>{ui.drawer.resetSession}</span>
              </button>
            ) : (
              <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/90 p-2.5 space-y-2">
                <p className="text-[11px] font-bold text-rose-900 text-center leading-snug">
                  {ui.drawer.resetConfirmPrompt}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleConfirmResetSession}
                    className="flex-1 min-h-[36px] px-2.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 border-2 border-rose-600 text-white text-[11px] font-extrabold transition-all cursor-pointer"
                  >
                    {ui.drawer.resetConfirmYes}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingReset(false)}
                    className="flex-1 min-h-[36px] px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-600 text-[11px] font-bold transition-all cursor-pointer"
                  >
                    {ui.drawer.resetConfirmCancel}
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Independent Main Content Container */}
        <main
          ref={mainRef}
          className={`flex-1 min-w-0 h-full overflow-x-hidden ${
            activeView === 'simulator'
              ? 'overflow-hidden'
              : 'overflow-y-auto overscroll-y-contain'
          }`}
        >
          {activeView === 'curriculum' && (
            <div
              className={`max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 ${
                lessonViewMode === 'focus' && activeFocusCurriculum
                  ? 'py-3.5 md:py-5 space-y-4 md:space-y-5'
                  : 'py-5 md:py-8 space-y-6 md:space-y-8'
              }`}
            >
              {/* Week Hero Header */}
              <header
                className={`rounded-3xl border-2 border-slate-200 border-b-4 bg-gradient-to-br ${activeTheme.heroGradient} ${
                  lessonViewMode === 'focus' && activeFocusCurriculum
                    ? 'p-3.5 md:p-5 space-y-2.5'
                    : 'p-4 md:p-6 lg:p-7 space-y-4'
                } shadow-sm`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-500 font-medium">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`font-mono font-extrabold ${activeTheme.accentText}`}>
                      {ui.curriculum.weekPrefix} {activeWeek.weekNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>COM 3021 Digital Design I</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {activeWeek.isExam ? ui.curriculum.examModule : ui.curriculum.fullModule}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 ml-auto">
                    {activeWeek.questions.length > 0 && (
                      <span className="font-mono font-bold text-emerald-700 inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        {activeWeekCompleted} / {activeWeek.questions.length}{' '}
                        {ui.curriculum.questionsCompleted}
                      </span>
                    )}

                    {/* Cute Tactile Segmented Pill: Tam Görünüm | Odak Modu */}
                    <div
                      role="group"
                      aria-label={ui.curriculum.viewModeAria}
                      className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-1 inline-flex items-center gap-1 shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => setLessonViewMode('full')}
                        aria-pressed={lessonViewMode === 'full'}
                        className={`min-h-[36px] inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-display font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                          lessonViewMode === 'full'
                            ? 'bg-sky-50 text-sky-900 border-2 border-sky-300 border-b-[3px] border-b-sky-400 shadow-xs'
                            : 'text-slate-500 hover:text-slate-800 border-2 border-transparent'
                        }`}
                      >
                        <LayoutList
                          className={`w-3.5 h-3.5 shrink-0 ${
                            lessonViewMode === 'full' ? 'text-sky-600' : 'text-slate-400'
                          }`}
                        />
                        <span>{ui.curriculum.fullView}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setLessonViewMode('focus')}
                        aria-pressed={lessonViewMode === 'focus'}
                        className={`min-h-[36px] inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-display font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                          lessonViewMode === 'focus'
                            ? 'bg-violet-50 text-violet-900 border-2 border-violet-300 border-b-[3px] border-b-violet-400 shadow-xs'
                            : 'text-slate-500 hover:text-slate-800 border-2 border-transparent'
                        }`}
                      >
                        <Sparkles
                          className={`w-3.5 h-3.5 shrink-0 ${
                            lessonViewMode === 'focus' ? 'text-violet-600' : 'text-slate-400'
                          }`}
                        />
                        <span>{ui.curriculum.focusMode}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight text-balance">
                      {t(activeWeek.englishTitle, language)}
                    </h1>
                    <p className={`text-base font-bold ${activeTheme.accentText}`}>
                      {t(activeWeek.turkishSubtitle, language)}
                    </p>
                  </div>

                  {!(lessonViewMode === 'focus' && activeFocusCurriculum) && (
                    <button
                      type="button"
                      onClick={() => openBookAtPage(activeWeekBookEntry.page)}
                      className="w-full sm:w-auto self-start min-h-[42px] px-3.5 py-2 rounded-2xl border-2 border-amber-300 border-b-4 bg-amber-50 hover:bg-amber-100 active:border-b-2 active:translate-y-0.5 text-amber-950 text-xs font-display font-extrabold inline-flex items-center justify-center sm:justify-start gap-1.5 shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{ui.curriculum.openInBook(activeWeekBookEntry.page)}</span>
                    </button>
                  )}
                </div>

                {!(lessonViewMode === 'focus' && activeFocusCurriculum) && (
                  <>
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-3xl">
                      {t(activeWeek.summary, language)}
                    </p>

                    {/* Learning Objectives */}
                    <div className="rounded-2xl border-2 border-slate-200/80 bg-white/90 p-4 space-y-2.5">
                      <div className="text-xs font-display font-extrabold text-slate-800 flex items-center gap-2">
                        <BookOpen className={`w-4 h-4 ${activeTheme.accentText}`} />
                        <span>{ui.curriculum.learningObjectives}</span>
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
                            <span>{t(obj, language)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </header>

              {/* Week Content */}
              {!activeWeek.isPlaceholder ? (
                lessonViewMode === 'full' ? (
                  <>
                    <div className="space-y-6">
                      {activeWeek.visualSections.map((sec) => (
                        <VisualSectionCard key={sec.id} section={sec} />
                      ))}
                    </div>

                    <div className="space-y-5 pt-4 border-t-2 border-slate-200/70">
                      <div className="space-y-1">
                        <h2 className="font-display text-xl sm:text-2xl font-black text-slate-800">
                          {ui.curriculum.exercisesTitle}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600">
                          {ui.curriculum.exercisesSubtitle}
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
                  <div className="space-y-5 md:space-y-6">
                    {/* Focus Mode Sub-View Switcher: Konu Anlatımı | Pratik Sorular */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleFocusSubTabChange('theory')}
                        aria-pressed={effectiveFocusSubTab === 'theory'}
                        className={`min-h-[54px] px-4 py-3 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          effectiveFocusSubTab === 'theory'
                            ? 'bg-sky-50 border-sky-400 text-sky-950 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-sky-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span className="inline-flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              effectiveFocusSubTab === 'theory'
                                ? 'bg-sky-500 text-white'
                                : 'bg-sky-100 text-sky-600'
                            }`}
                          >
                            <BookOpen className="w-4 h-4" />
                          </span>
                          <span className="font-display text-sm font-extrabold truncate">
                            {ui.curriculum.theoryTab}
                          </span>
                        </span>
                        <span
                          className={`font-mono text-xs font-extrabold px-2.5 py-1 rounded-xl shrink-0 ${
                            effectiveFocusSubTab === 'theory'
                              ? 'bg-white text-sky-700 border border-sky-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {activeFocusCurriculum
                            ? language === 'en'
                              ? `${focusCardCount} Cards`
                              : `${focusCardCount} Kart`
                            : ui.curriculum.topicsCountLabel(sectionCount)}
                        </span>
                      </button>

                      {questionCount > 0 && (
                        <button
                          type="button"
                          onClick={() => handleFocusSubTabChange('practice')}
                          aria-pressed={effectiveFocusSubTab === 'practice'}
                          className={`min-h-[54px] px-4 py-3 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            effectiveFocusSubTab === 'practice'
                              ? 'bg-violet-50 border-violet-400 text-violet-950 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-violet-200 text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span className="inline-flex items-center gap-2.5 min-w-0">
                            <span
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                effectiveFocusSubTab === 'practice'
                                  ? 'bg-violet-500 text-white'
                                  : 'bg-violet-100 text-violet-600'
                              }`}
                            >
                              <Sparkles className="w-4 h-4" />
                            </span>
                            <span className="font-display text-sm font-extrabold truncate">
                              {ui.curriculum.practiceTab}
                            </span>
                          </span>
                          <span
                            className={`font-mono text-xs font-extrabold px-2.5 py-1 rounded-xl shrink-0 ${
                              effectiveFocusSubTab === 'practice'
                                ? 'bg-white text-violet-700 border border-violet-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {ui.curriculum.questionsCountLabel(questionCount)}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Focus Theory View: Bilingual Focus Card Deck (Weeks 1-5+) or Section Fallback */}
                    {effectiveFocusSubTab === 'theory' &&
                      (activeFocusCurriculum && focusCardCount > 0 ? (
                        <FocusCardDeck
                          weekCurriculum={activeFocusCurriculum}
                          currentIndex={safeStepIndex}
                          onChangeIndex={handleFocusStepChange}
                          hasPracticeTab={questionCount > 0}
                          onGoToPractice={() => handleFocusSubTabChange('practice')}
                        />
                      ) : (
                        sectionCount > 0 && (
                          <div className="space-y-4 md:space-y-5">
                            {/* Clickable Step Progress Bar */}
                            <div className="rounded-2xl border-2 border-slate-200/90 bg-white px-3.5 py-3 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {activeWeek.visualSections.map((sec, idx) => {
                                  const isCurrent = idx === safeStepIndex;
                                  const isVisited = idx < safeStepIndex;
                                  return (
                                    <button
                                      key={sec.id}
                                      type="button"
                                      onClick={() => handleFocusStepChange(idx)}
                                      title={t(sec.title, language)}
                                      aria-current={isCurrent ? 'step' : undefined}
                                      className={`min-w-[38px] min-h-[38px] px-2.5 rounded-xl border-2 font-mono text-xs font-extrabold transition-all cursor-pointer ${
                                        isCurrent
                                          ? 'bg-sky-500 border-sky-600 text-white shadow-xs'
                                          : isVisited
                                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-300'
                                            : 'bg-[#FFFDF8] border-slate-200 text-slate-600 hover:border-sky-300'
                                      }`}
                                    >
                                      {idx + 1}
                                    </button>
                                  );
                                })}
                              </div>

                              <span className="font-mono text-xs font-extrabold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-xl">
                                {ui.curriculum.stepCounter(safeStepIndex + 1, sectionCount)}
                              </span>
                            </div>

                            <VisualSectionCard
                              key={activeWeek.visualSections[safeStepIndex].id}
                              section={activeWeek.visualSections[safeStepIndex]}
                              focusMode
                            />

                            {/* Step Navigation Footer */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                              <button
                                type="button"
                                disabled={safeStepIndex <= 0}
                                onClick={() => handleFocusStepChange(safeStepIndex - 1)}
                                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-slate-200 border-b-4 bg-white text-xs font-extrabold text-slate-700 hover:border-sky-300 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
                              >
                                <ChevronLeft className="w-4 h-4" />
                                <span>{ui.curriculum.prevStep}</span>
                              </button>

                              {safeStepIndex < sectionCount - 1 ? (
                                <button
                                  type="button"
                                  onClick={() => handleFocusStepChange(safeStepIndex + 1)}
                                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-sky-600 border-b-4 bg-sky-500 hover:bg-sky-600 text-xs font-extrabold text-white active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer"
                                >
                                  <span>{ui.curriculum.nextStep}</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              ) : questionCount > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => handleFocusSubTabChange('practice')}
                                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-emerald-600 border-b-4 bg-emerald-500 hover:bg-emerald-600 text-xs font-extrabold text-white active:border-b-2 active:translate-y-0.5 transition-all shadow-sm cursor-pointer"
                                >
                                  <Sparkles className="w-4 h-4" />
                                  <span>{ui.curriculum.goToPractice}</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  disabled
                                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-slate-200 border-b-4 bg-white text-xs font-extrabold text-slate-400 opacity-35 cursor-not-allowed"
                                >
                                  <span>{ui.curriculum.nextStep}</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      ))}

                    {/* Focus Practice View: One Question at a Time */}
                    {effectiveFocusSubTab === 'practice' && questionCount > 0 && (
                      <div className="space-y-4 md:space-y-5">
                        {/* Question Number Pills with Solved Checkmarks */}
                        <div className="rounded-2xl border-2 border-slate-200/90 bg-white px-3.5 py-3 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {activeWeek.questions.map((q, idx) => {
                              const isCurrent = idx === safeQuestionIndex;
                              const isSolved = Boolean(completedQuestions[q.id]);
                              return (
                                <button
                                  key={q.id}
                                  type="button"
                                  onClick={() => handleFocusQuestionChange(idx)}
                                  aria-current={isCurrent ? 'step' : undefined}
                                  className={`min-w-[40px] min-h-[40px] px-2.5 rounded-xl border-2 font-mono text-xs font-extrabold inline-flex items-center justify-center gap-1 transition-all cursor-pointer ${
                                    isCurrent
                                      ? 'bg-violet-500 border-violet-600 text-white shadow-xs'
                                      : isSolved
                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:border-emerald-400'
                                        : 'bg-[#FFFDF8] border-slate-200 text-slate-600 hover:border-violet-300'
                                  }`}
                                >
                                  <span>{idx + 1}</span>
                                  {isSolved && (
                                    <Check
                                      className={`w-3.5 h-3.5 stroke-[3] ${
                                        isCurrent ? 'text-emerald-200' : 'text-emerald-600'
                                      }`}
                                    />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleFocusSubTabChange('theory')}
                              className="min-h-[34px] px-2.5 py-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 text-[11px] font-bold text-slate-600 hover:text-sky-800 transition-colors cursor-pointer"
                            >
                              {ui.curriculum.backToTheory}
                            </button>
                            <span className="font-mono text-xs font-extrabold text-violet-700 bg-violet-50 border border-violet-200 px-3 py-1 rounded-xl">
                              {ui.curriculum.questionCounter(
                                safeQuestionIndex + 1,
                                questionCount
                              )}
                            </span>
                          </div>
                        </div>

                        <QuestionCard
                          key={activeWeek.questions[safeQuestionIndex].id}
                          question={activeWeek.questions[safeQuestionIndex]}
                          isCompleted={Boolean(
                            completedQuestions[activeWeek.questions[safeQuestionIndex].id]
                          )}
                          onMarkCompleted={handleMarkCompleted}
                          focusMode
                        />

                        {/* Question Stepper Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <button
                            type="button"
                            disabled={safeQuestionIndex <= 0}
                            onClick={() => handleFocusQuestionChange(safeQuestionIndex - 1)}
                            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-slate-200 border-b-4 bg-white text-xs font-extrabold text-slate-700 hover:border-violet-300 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>{ui.curriculum.prevQuestion}</span>
                          </button>

                          <span className="font-mono text-xs font-bold text-slate-500">
                            {ui.curriculum.questionCounter(safeQuestionIndex + 1, questionCount)}
                          </span>

                          <button
                            type="button"
                            disabled={safeQuestionIndex >= questionCount - 1}
                            onClick={() => handleFocusQuestionChange(safeQuestionIndex + 1)}
                            className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-violet-600 border-b-4 bg-violet-500 hover:bg-violet-600 text-xs font-extrabold text-white active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
                          >
                            <span>{ui.curriculum.nextQuestion}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div className="space-y-6">
                  <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="font-display text-base font-bold text-slate-800">
                        {ui.curriculum.weekPrefix} {activeWeek.weekNumber}{' '}
                        {ui.curriculum.interactiveWorkspaceSuffix}
                      </h2>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {ui.curriculum.interactiveWorkspaceDesc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveView('simulator')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-sky-200 border-b-4 bg-sky-50 hover:bg-sky-100 text-xs font-bold text-sky-800 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Cpu className="w-4 h-4 text-sky-600" />
                      <span>{ui.curriculum.tryInSimulator}</span>
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
                  <span>{ui.curriculum.prevWeek}</span>
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
                  <span>{ui.curriculum.nextWeek}</span>
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
                  {WIDGET_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTool === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTool(tab.id)}
                        className={`flex items-center gap-2 min-h-[40px] sm:min-h-0 px-3 sm:px-3.5 py-2 text-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-white text-slate-800 font-bold rounded-xl border-2 border-sky-200 border-b-4 border-b-sky-400 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 rounded-xl border-2 border-transparent font-semibold'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? tab.iconColor : 'text-slate-400'}`} />
                        <span>{ui.toolsTabs[tab.id]}</span>
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
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="h-full w-full rounded-3xl border-2 border-emerald-200 bg-white/90 flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600">
                        <Loader2 className="w-6 h-6 animate-spin" />
                      </div>
                      <p className="font-display text-sm font-extrabold text-slate-700">
                        {ui.pwa.loadingSimulator}
                      </p>
                    </div>
                  }
                >
                  <CircuitSimulator mode="lab" />
                </Suspense>
              </ErrorBoundary>
            </div>
          )}

          {activeView === 'book' && (
            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="w-full h-[calc(100dvh-76px)] p-3 flex items-center justify-center">
                    <div className="rounded-3xl border-2 border-amber-200 bg-white/95 px-6 py-5 shadow-sm flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-amber-600 shrink-0" />
                      <span className="font-display text-sm font-extrabold text-slate-700">
                        {ui.pwa.loadingBook}
                      </span>
                    </div>
                  </div>
                }
              >
                <BookViewer currentPage={bookPage} onPageChange={setBookPage} />
              </Suspense>
            </ErrorBoundary>
          )}
        </main>
      </div>

      {/* Tiny, non-intrusive offline badge when browser loses connectivity */}
      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-3 left-3 z-40 px-3 py-1.5 rounded-2xl border-2 border-amber-300 bg-amber-50/95 text-amber-900 text-xs font-extrabold shadow-sm backdrop-blur-xs"
        >
          {ui.pwa.offlineMode}
        </div>
      )}

      {/* Gentle iOS Safari Add-to-Home-Screen Guide Modal */}
      {showIosGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-pwa-guide-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-xs"
          onClick={() => setShowIosGuide(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl border-2 border-sky-200 border-b-4 bg-[#FFFDF8] p-5 shadow-xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2
                  id="ios-pwa-guide-title"
                  className="text-sm font-display font-extrabold text-slate-800"
                >
                  {ui.pwa.iosGuideTitle}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {ui.pwa.iosGuideSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowIosGuide(false)}
                aria-label={ui.pwa.close}
                className="w-8 h-8 rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-2xl border-2 border-sky-100 bg-sky-50/70 p-3 space-y-1.5 text-xs font-semibold text-slate-700">
              <p>{ui.pwa.iosGuideStep1}</p>
              <p>{ui.pwa.iosGuideStep2}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="w-full min-h-[38px] rounded-2xl border-2 border-sky-400 border-b-4 bg-sky-500 hover:bg-sky-600 text-white text-xs font-extrabold transition-all cursor-pointer"
            >
              {ui.pwa.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
