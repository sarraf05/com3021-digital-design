import React from 'react';
import type { Language, SchematicDiagramData } from '../types/curriculum';
import { t } from '../i18n/translations';
import { LabDiagramCard } from './diagrams/svgPrimitives';
import { renderCombinationalDiagram } from './diagrams/combinationalDiagrams';
import { renderSequentialDiagram } from './diagrams/sequentialDiagrams';

interface CurriculumDiagramProps {
  schematic: SchematicDiagramData;
  lang: Language;
}

export const CurriculumDiagram: React.FC<CurriculumDiagramProps> = ({
  schematic,
  lang,
}) => {
  const svgContent =
    renderCombinationalDiagram(schematic.diagramId, lang) ??
    renderSequentialDiagram(schematic.diagramId, lang);

  if (!svgContent) return null;

  return (
    <LabDiagramCard
      title={t(schematic.caption, lang)}
      equation={schematic.equation ? t(schematic.equation, lang) : undefined}
      summary={schematic.summary ? t(schematic.summary, lang) : undefined}
      lang={lang}
      collapsible={schematic.collapsible ?? true}
      defaultOpen={schematic.defaultOpen ?? true}
      badge="Lab SVG"
    >
      {svgContent}
    </LabDiagramCard>
  );
};

export { LabDiagramCard } from './diagrams/svgPrimitives';
