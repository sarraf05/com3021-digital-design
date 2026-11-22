import React from 'react';
import type { WidgetConfig, WidgetType } from '../../types/curriculum';
import { BaseComplementVisualizer } from './BaseComplementVisualizer';
import { TruthTableBuilder } from './TruthTableBuilder';
import { KMapStudio } from './KMapStudio';
import { TimingDiagramViewer } from './TimingDiagramViewer';
import { StateMachineExplorer } from './StateMachineExplorer';

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
