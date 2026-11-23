import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import type { WidgetConfig, WidgetType } from '../../types/curriculum';
import { useSession } from '../../context/SessionContext';
import { UI_STRINGS } from '../../i18n/translations';
import { ErrorBoundary } from '../curriculum/ErrorBoundary';

const BaseComplementVisualizer = lazy(() => import('./BaseComplementVisualizer'));
const TruthTableBuilder = lazy(() => import('./TruthTableBuilder'));
const KMapStudio = lazy(() => import('./KMapStudio'));
const TimingDiagramViewer = lazy(() => import('./TimingDiagramViewer'));
const StateMachineExplorer = lazy(() => import('./StateMachineExplorer'));

interface WidgetRendererProps {
  type: WidgetType;
  config?: WidgetConfig;
  studioMode?: boolean;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  type,
  config,
  studioMode = false,
}) => {
  const {
    session: { language },
  } = useSession();

  const renderWidget = () => {
    switch (type) {
      case 'BaseComplementVisualizer':
        return <BaseComplementVisualizer config={config} studioMode={studioMode} />;
      case 'TruthTableBuilder':
        return <TruthTableBuilder config={config} studioMode={studioMode} />;
      case 'KMapStudio':
        return <KMapStudio config={config} studioMode={studioMode} />;
      case 'TimingDiagramViewer':
        return <TimingDiagramViewer config={config} studioMode={studioMode} />;
      case 'StateMachineExplorer':
        return <StateMachineExplorer config={config} studioMode={studioMode} />;
    }
  };

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-[220px] w-full rounded-2xl border-2 border-violet-200 bg-violet-50/40 flex items-center justify-center gap-2.5 p-6">
            <Loader2 className="w-5 h-5 animate-spin text-violet-600 shrink-0" />
            <span className="font-display text-xs font-extrabold text-slate-700">
              {UI_STRINGS[language].pwa.loadingTool}
            </span>
          </div>
        }
      >
        {renderWidget()}
      </Suspense>
    </ErrorBoundary>
  );
};
