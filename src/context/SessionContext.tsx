import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Language, WidgetType } from '../types/curriculum';
import type {
  CircuitNode,
  CircuitWire,
  CustomICDefinition,
  VerificationResult,
} from '../types/simulator';

export type MainView = 'curriculum' | 'tools' | 'simulator' | 'book';
export type LessonViewMode = 'full' | 'focus';
export type FocusSubTab = 'theory' | 'practice';

export interface QuestionSessionState {
  selectedOption?: number | null;
  mcChecked?: boolean;
  tableAnswers?: Record<string, string>;
  tableChecked?: boolean;
  showHint?: boolean;
  showSolution?: boolean;
}

export interface LabCircuitSession {
  activePresetId: string;
  nodes: CircuitNode[];
  wires: CircuitWire[];
  zoom: number;
  pan: { x: number; y: number };
}

export interface ChallengeCircuitSession {
  nodes: CircuitNode[];
  wires: CircuitWire[];
  zoom?: number;
  pan?: { x: number; y: number };
  verification?: VerificationResult | null;
}

export interface KMapToolSession {
  varCount: 2 | 3 | 4;
  cells: (0 | 1 | 'X')[];
}

export interface TruthTableToolSession {
  varCount: 2 | 3 | 4;
  outputs: (0 | 1)[];
  selectedRow: number;
}

export interface BaseComplementToolSession {
  numberInput: string;
  sourceBase: number;
  targetBase: number;
  bitWidth: 4 | 8 | 16;
}

export interface TimingDiagramToolSession {
  ffType: 'D' | 'JK' | 'T';
  edgeType: 'rising' | 'falling';
  initialQ: 0 | 1;
  dWave: (0 | 1)[];
  jWave: (0 | 1)[];
  kWave: (0 | 1)[];
  tWave: (0 | 1)[];
}

export interface StateMachineToolSession {
  currentState: 'S0' | 'S1' | 'S2' | 'S3';
  lastInput: 0 | 1;
  ffMode: 'D' | 'JK';
  history: string[];
}

export interface ToolsSessionState {
  kmap?: KMapToolSession;
  truthTable?: TruthTableToolSession;
  baseComplement?: BaseComplementToolSession;
  timingDiagram?: TimingDiagramToolSession;
  stateMachine?: StateMachineToolSession;
}

export interface SessionState {
  language: Language;
  activeView: MainView;
  lessonViewMode: LessonViewMode;
  focusSubTab: FocusSubTab;
  focusStepByWeek: Record<number, number>;
  focusQuestionByWeek: Record<number, number>;
  selectedWeekId: number;
  activeTool: WidgetType;
  completedQuestions: Record<string, boolean>;
  questionStates: Record<string, QuestionSessionState>;
  labCircuit: LabCircuitSession | null;
  challengeCircuits: Record<string, ChallengeCircuitSession>;
  customICs: CustomICDefinition[];
  bookPage: number;
  tools: ToolsSessionState;
}

const SESSION_STORAGE_KEY = 'com3021_digital_design_session_v1';
const WRITE_DEBOUNCE_MS = 300;

const VALID_VIEWS = new Set<MainView>(['curriculum', 'tools', 'simulator', 'book']);
const VALID_TOOLS = new Set<WidgetType>([
  'BaseComplementVisualizer',
  'TruthTableBuilder',
  'KMapStudio',
  'TimingDiagramViewer',
  'StateMachineExplorer',
]);

function createInitialSessionState(): SessionState {
  return {
    language: 'tr',
    activeView: 'curriculum',
    lessonViewMode: 'full',
    focusSubTab: 'theory',
    focusStepByWeek: {},
    focusQuestionByWeek: {},
    selectedWeekId: 1,
    activeTool: 'KMapStudio',
    completedQuestions: {},
    questionStates: {},
    labCircuit: null,
    challengeCircuits: {},
    customICs: [],
    bookPage: 25,
    tools: {},
  };
}

function readFromSessionStorage(): SessionState {
  const fallback = createInitialSessionState();
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<SessionState> | null;
    if (!parsed || typeof parsed !== 'object') return fallback;

    const language: Language =
      parsed.language === 'en' || parsed.language === 'tr'
        ? parsed.language
        : fallback.language;

    const activeView: MainView =
      parsed.activeView && VALID_VIEWS.has(parsed.activeView)
        ? parsed.activeView
        : fallback.activeView;

    const lessonViewMode: LessonViewMode =
      parsed.lessonViewMode === 'focus' || parsed.lessonViewMode === 'full'
        ? parsed.lessonViewMode
        : fallback.lessonViewMode;

    const focusSubTab: FocusSubTab =
      parsed.focusSubTab === 'theory' || parsed.focusSubTab === 'practice'
        ? parsed.focusSubTab
        : fallback.focusSubTab;

    const focusStepByWeek =
      parsed.focusStepByWeek && typeof parsed.focusStepByWeek === 'object'
        ? parsed.focusStepByWeek
        : {};

    const focusQuestionByWeek =
      parsed.focusQuestionByWeek && typeof parsed.focusQuestionByWeek === 'object'
        ? parsed.focusQuestionByWeek
        : {};

    const selectedWeekId =
      typeof parsed.selectedWeekId === 'number' &&
      Number.isInteger(parsed.selectedWeekId) &&
      parsed.selectedWeekId >= 1 &&
      parsed.selectedWeekId <= 14
        ? parsed.selectedWeekId
        : fallback.selectedWeekId;

    const activeTool: WidgetType =
      parsed.activeTool && VALID_TOOLS.has(parsed.activeTool)
        ? parsed.activeTool
        : fallback.activeTool;

    const completedQuestions =
      parsed.completedQuestions && typeof parsed.completedQuestions === 'object'
        ? parsed.completedQuestions
        : {};

    const questionStates =
      parsed.questionStates && typeof parsed.questionStates === 'object'
        ? parsed.questionStates
        : {};

    const labCircuit =
      parsed.labCircuit &&
      typeof parsed.labCircuit === 'object' &&
      Array.isArray(parsed.labCircuit.nodes) &&
      Array.isArray(parsed.labCircuit.wires)
        ? parsed.labCircuit
        : null;

    const challengeCircuits =
      parsed.challengeCircuits && typeof parsed.challengeCircuits === 'object'
        ? parsed.challengeCircuits
        : {};

    const customICs = Array.isArray(parsed.customICs) ? parsed.customICs : [];

    const bookPage =
      typeof parsed.bookPage === 'number' &&
      Number.isInteger(parsed.bookPage) &&
      parsed.bookPage >= 1 &&
      parsed.bookPage <= 712
        ? parsed.bookPage
        : fallback.bookPage;

    const tools =
      parsed.tools && typeof parsed.tools === 'object' ? parsed.tools : {};

    return {
      language,
      activeView,
      lessonViewMode,
      focusSubTab,
      focusStepByWeek,
      focusQuestionByWeek,
      selectedWeekId,
      activeTool,
      completedQuestions,
      questionStates,
      labCircuit,
      challengeCircuits,
      customICs,
      bookPage,
      tools,
    };
  } catch {
    return fallback;
  }
}

function writeToSessionStorage(state: SessionState) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Gracefully ignore storage quota or restricted iframe errors
  }
}

function removeFromSessionStorage() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Gracefully ignore restricted iframe errors
  }
}

interface SessionContextValue {
  session: SessionState;
  resetEpoch: number;
  setLanguage: (language: Language) => void;
  setActiveView: (view: MainView) => void;
  setLessonViewMode: (mode: LessonViewMode) => void;
  setFocusSubTab: (tab: FocusSubTab) => void;
  setFocusStepForWeek: (weekId: number, stepIndex: number) => void;
  setFocusQuestionForWeek: (weekId: number, questionIndex: number) => void;
  setSelectedWeekId: (weekId: number) => void;
  setActiveTool: (tool: WidgetType) => void;
  markQuestionCompleted: (questionId: string) => void;
  updateQuestionState: (
    questionId: string,
    patch: Partial<QuestionSessionState>
  ) => void;
  setLabCircuit: (lab: LabCircuitSession | null) => void;
  setChallengeCircuit: (
    challengeKey: string,
    challengeState: ChallengeCircuitSession
  ) => void;
  addCustomIC: (ic: CustomICDefinition) => void;
  removeCustomIC: (id: string) => void;
  setBookPage: (page: number) => void;
  openBookAtPage: (page: number) => void;
  updateToolsState: <K extends keyof ToolsSessionState>(
    key: K,
    value: ToolsSessionState[K]
  ) => void;
  resetSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<SessionState>(() =>
    readFromSessionStorage()
  );
  const [resetEpoch, setResetEpoch] = useState<number>(0);

  const isFirstRenderRef = useRef(true);
  const skipNextPersistRef = useRef(false);
  const dirtyRef = useRef(false);
  const debounceTimerRef = useRef<number | null>(null);
  const latestSessionRef = useRef<SessionState>(session);

  latestSessionRef.current = session;

  // Debounced sync to window.sessionStorage (300ms) for 60fps dragging
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }

    dirtyRef.current = true;
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      writeToSessionStorage(latestSessionRef.current);
      dirtyRef.current = false;
      debounceTimerRef.current = null;
    }, WRITE_DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [session]);

  // Flush any pending debounced write synchronously before F5 reload or tab backgrounding
  useEffect(() => {
    const flushPending = () => {
      if (!dirtyRef.current) return;
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      writeToSessionStorage(latestSessionRef.current);
      dirtyRef.current = false;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushPending();
      }
    };

    window.addEventListener('beforeunload', flushPending);
    window.addEventListener('pagehide', flushPending);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('beforeunload', flushPending);
      window.removeEventListener('pagehide', flushPending);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const setLanguage = useCallback((language: Language) => {
    setSession((prev) =>
      prev.language === language ? prev : { ...prev, language }
    );
  }, []);

  const setActiveView = useCallback((view: MainView) => {
    setSession((prev) =>
      prev.activeView === view ? prev : { ...prev, activeView: view }
    );
  }, []);

  const setLessonViewMode = useCallback((lessonViewMode: LessonViewMode) => {
    setSession((prev) =>
      prev.lessonViewMode === lessonViewMode ? prev : { ...prev, lessonViewMode }
    );
  }, []);

  const setFocusSubTab = useCallback((focusSubTab: FocusSubTab) => {
    setSession((prev) =>
      prev.focusSubTab === focusSubTab ? prev : { ...prev, focusSubTab }
    );
  }, []);

  const setFocusStepForWeek = useCallback((weekId: number, stepIndex: number) => {
    const safeIdx = Math.max(0, Math.floor(stepIndex));
    setSession((prev) => {
      if (prev.focusStepByWeek[weekId] === safeIdx) return prev;
      return {
        ...prev,
        focusStepByWeek: {
          ...prev.focusStepByWeek,
          [weekId]: safeIdx,
        },
      };
    });
  }, []);

  const setFocusQuestionForWeek = useCallback(
    (weekId: number, questionIndex: number) => {
      const safeIdx = Math.max(0, Math.floor(questionIndex));
      setSession((prev) => {
        if (prev.focusQuestionByWeek[weekId] === safeIdx) return prev;
        return {
          ...prev,
          focusQuestionByWeek: {
            ...prev.focusQuestionByWeek,
            [weekId]: safeIdx,
          },
        };
      });
    },
    []
  );

  const setSelectedWeekId = useCallback((weekId: number) => {
    setSession((prev) =>
      prev.selectedWeekId === weekId
        ? prev
        : { ...prev, selectedWeekId: weekId, focusSubTab: 'theory' }
    );
  }, []);

  const setActiveTool = useCallback((tool: WidgetType) => {
    setSession((prev) =>
      prev.activeTool === tool ? prev : { ...prev, activeTool: tool }
    );
  }, []);

  const markQuestionCompleted = useCallback((questionId: string) => {
    setSession((prev) => {
      if (prev.completedQuestions[questionId]) return prev;
      return {
        ...prev,
        completedQuestions: {
          ...prev.completedQuestions,
          [questionId]: true,
        },
      };
    });
  }, []);

  const updateQuestionState = useCallback(
    (questionId: string, patch: Partial<QuestionSessionState>) => {
      setSession((prev) => ({
        ...prev,
        questionStates: {
          ...prev.questionStates,
          [questionId]: {
            ...(prev.questionStates[questionId] ?? {}),
            ...patch,
          },
        },
      }));
    },
    []
  );

  const setLabCircuit = useCallback((lab: LabCircuitSession | null) => {
    setSession((prev) => ({
      ...prev,
      labCircuit: lab,
    }));
  }, []);

  const setChallengeCircuit = useCallback(
    (challengeKey: string, challengeState: ChallengeCircuitSession) => {
      setSession((prev) => ({
        ...prev,
        challengeCircuits: {
          ...prev.challengeCircuits,
          [challengeKey]: challengeState,
        },
      }));
    },
    []
  );

  const addCustomIC = useCallback((ic: CustomICDefinition) => {
    setSession((prev) => ({
      ...prev,
      customICs: [...prev.customICs, ic],
    }));
  }, []);

  const removeCustomIC = useCallback((id: string) => {
    setSession((prev) => ({
      ...prev,
      customICs: prev.customICs.filter((ic) => ic.id !== id),
    }));
  }, []);

  const setBookPage = useCallback((page: number) => {
    const clamped = Math.min(712, Math.max(1, Math.round(page)));
    setSession((prev) =>
      prev.bookPage === clamped ? prev : { ...prev, bookPage: clamped }
    );
  }, []);

  const openBookAtPage = useCallback((page: number) => {
    const clamped = Math.min(712, Math.max(1, Math.round(page)));
    setSession((prev) => ({
      ...prev,
      bookPage: clamped,
      activeView: 'book',
    }));
  }, []);

  const updateToolsState = useCallback(
    <K extends keyof ToolsSessionState>(key: K, value: ToolsSessionState[K]) => {
      setSession((prev) => ({
        ...prev,
        tools: {
          ...prev.tools,
          [key]: value,
        },
      }));
    },
    []
  );

  const resetSession = useCallback(() => {
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    dirtyRef.current = false;
    skipNextPersistRef.current = true;
    removeFromSessionStorage();
    setSession(createInitialSessionState());
    setResetEpoch((e) => e + 1);
  }, []);

  return (
    <SessionContext.Provider
      value={{
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
        updateQuestionState,
        setLabCircuit,
        setChallengeCircuit,
        addCustomIC,
        removeCustomIC,
        setBookPage,
        openBookAtPage,
        updateToolsState,
        resetSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return ctx;
}
