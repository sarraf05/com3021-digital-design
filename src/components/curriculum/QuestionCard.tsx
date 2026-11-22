import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpenCheck,
  Star,
  Sparkles,
} from 'lucide-react';
import type { Question } from '../../types/curriculum';
import { CircuitSimulator } from '../simulator/CircuitSimulator';

interface QuestionCardProps {
  question: Question;
  isCompleted: boolean;
  onMarkCompleted: (questionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isCompleted,
  onMarkCompleted,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [mcChecked, setMcChecked] = useState(false);

  const [tableAnswers, setTableAnswers] = useState<Record<string, string>>({});
  const [tableChecked, setTableChecked] = useState(false);

  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const typeLabel =
    question.type === 'multiple-choice'
      ? 'Çoktan Seçmeli'
      : question.type === 'interactive-table'
        ? 'İnteraktif Tablo'
        : 'Devre Tasarım Görevi';

  const typeAccent =
    question.type === 'multiple-choice'
      ? 'text-sky-600'
      : question.type === 'interactive-table'
        ? 'text-violet-600'
        : 'text-rose-600';

  const handleCheckMultipleChoice = () => {
    if (selectedOption === null || question.type !== 'multiple-choice') return;
    setMcChecked(true);
    if (selectedOption === question.correctIndex) {
      onMarkCompleted(question.id);
    }
  };

  const handleCheckTable = () => {
    if (question.type !== 'interactive-table') return;
    setTableChecked(true);
    let allCorrect = true;
    question.rows.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell.editable) {
          const val = (tableAnswers[`${rIdx}-${cIdx}`] ?? '').trim().toUpperCase();
          if (val !== (cell.expected ?? '').trim().toUpperCase()) {
            allCorrect = false;
          }
        }
      });
    });
    if (allCorrect) {
      onMarkCompleted(question.id);
    }
  };

  return (
    <div
      className={`rounded-3xl border-2 border-b-4 bg-white p-4 md:p-6 space-y-4 transition-colors shadow-sm overflow-hidden ${
        isCompleted ? 'border-emerald-300' : 'border-slate-200'
      }`}
    >
      {/* Header Metadata */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
            <span className={`font-bold ${typeAccent}`}>{typeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{question.difficulty}</span>
            {isCompleted && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> Harika gidiyorsun!
                </span>
              </>
            )}
          </div>
          <h4 className="font-display text-base sm:text-lg font-extrabold text-slate-800 break-words">
            {question.title}
          </h4>
        </div>
      </div>

      <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed break-words">
        {question.prompt}
      </p>

      {/* Mode 1: Multiple Choice */}
      {question.type === 'multiple-choice' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;
              let cardClass =
                'border-slate-200 bg-[#FFFDF8] hover:border-sky-300 hover:bg-sky-50/40 text-slate-800';
              let badgeClass = 'border-slate-300 bg-white text-slate-500';

              if (mcChecked) {
                if (isCorrect) {
                  cardClass = 'border-emerald-400 bg-emerald-50 text-emerald-950';
                  badgeClass = 'border-emerald-500 bg-emerald-500 text-white';
                } else if (isSelected) {
                  cardClass = 'border-rose-400 bg-rose-50 text-rose-950';
                  badgeClass = 'border-rose-500 bg-rose-500 text-white';
                }
              } else if (isSelected) {
                cardClass = 'border-sky-500 bg-sky-50 text-sky-950';
                badgeClass = 'border-sky-500 bg-sky-500 text-white';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedOption(idx);
                    setMcChecked(false);
                  }}
                  className={`flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-0.5 text-left font-mono text-sm font-semibold transition-all cursor-pointer min-w-0 ${cardClass}`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center text-xs font-extrabold shrink-0 ${badgeClass}`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="min-w-0 flex-1 break-words">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleCheckMultipleChoice}
              className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 border-2 border-sky-600 border-b-4 active:border-b-2 active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-extrabold transition-all cursor-pointer"
            >
              Cevabı Kontrol Et
            </button>

            <button
              type="button"
              onClick={() => setShowSolution((s) => !s)}
              className="min-h-[44px] flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 border-b-4 hover:border-violet-300 active:border-b-2 active:translate-y-0.5 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <BookOpenCheck className="w-3.5 h-3.5 text-violet-500" />
              <span>{showSolution ? 'Çözümü Gizle' : 'Adım Adım Çözümü Göster'}</span>
            </button>
          </div>

          {mcChecked && (
            <div
              className={`rounded-2xl border-2 p-3.5 text-xs font-bold flex items-center gap-2.5 ${
                selectedOption === question.correctIndex
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-rose-300 bg-rose-50 text-rose-800'
              }`}
            >
              {selectedOption === question.correctIndex ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Harika gidiyorsun! Doğru cevap — adım adım çözüm aşağıda özetlenmiştir.
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>
                    Bu sefer olmadı ama sorun değil! Adım adım çözümü inceleyip tekrar deneyebilirsin.
                  </span>
                </>
              )}
            </div>
          )}

          {(mcChecked || showSolution) && (
            <div className="rounded-2xl border-2 border-sky-200 bg-sky-50/50 p-4 space-y-2.5">
              <div className="text-xs font-display font-extrabold text-sky-800">
                Adım Adım Görsel Çözüm
              </div>
              <div className="space-y-2">
                {question.solutionSteps.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border-2 border-sky-100 bg-white p-3.5 space-y-1"
                  >
                    <div className="text-xs font-bold text-slate-800">
                      {step.title}
                    </div>
                    <div className="font-mono text-xs font-semibold text-emerald-700 break-words overflow-x-auto max-w-full">
                      {step.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Interactive Table */}
      {question.type === 'interactive-table' && (
        <div className="space-y-4">
          <div className="overflow-x-auto max-w-full rounded-2xl border-2 border-slate-200 bg-white">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b-2 border-slate-100 bg-violet-50/70 text-violet-900">
                  {question.headers.map((h) => (
                    <th key={h} className="py-2.5 px-3 sm:px-4 text-left font-bold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {question.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50/60">
                    {row.map((cell, cIdx) => {
                      const key = `${rIdx}-${cIdx}`;
                      const userVal = tableAnswers[key] ?? '';
                      const isCorrect =
                        userVal.trim().toUpperCase() ===
                        (cell.expected ?? '').trim().toUpperCase();

                      return (
                        <td key={cIdx} className="py-2 px-4">
                          {cell.editable ? (
                            cell.placeholder === '0/1' || cell.placeholder === '0/1/X' ? (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextVal =
                                      cell.placeholder === '0/1/X'
                                        ? userVal === '0'
                                          ? '1'
                                          : userVal === '1'
                                            ? 'X'
                                            : '0'
                                        : userVal === '0'
                                          ? '1'
                                          : userVal === '1'
                                            ? '0'
                                            : '1';
                                    setTableAnswers((prev) => ({
                                      ...prev,
                                      [key]: nextVal,
                                    }));
                                    setTableChecked(false);
                                  }}
                                  className={`min-w-[44px] min-h-[38px] sm:min-h-0 sm:w-11 sm:h-8 rounded-xl border-2 border-b-4 active:border-b-2 font-mono text-xs font-extrabold transition-all cursor-pointer ${
                                    tableChecked
                                      ? isCorrect
                                        ? 'border-emerald-500 bg-emerald-100 text-emerald-800'
                                        : 'border-rose-500 bg-rose-100 text-rose-800'
                                      : userVal === '1'
                                        ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                                        : userVal === 'X'
                                          ? 'border-amber-400 bg-amber-50 text-amber-800'
                                          : userVal === '0'
                                            ? 'border-slate-300 bg-slate-100 text-slate-700'
                                            : 'border-slate-200 bg-[#FFFDF8] text-slate-400 hover:border-sky-400'
                                  }`}
                                  title={`Tıklayarak ${cell.placeholder} seçin`}
                                >
                                  {userVal || '?'}
                                </button>
                                {tableChecked && !isCorrect && (
                                  <span className="text-[11px] font-bold text-rose-600">
                                    (Doğrusu: {cell.expected})
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={userVal}
                                  placeholder={cell.placeholder ?? '...'}
                                  onChange={(e) => {
                                    setTableAnswers((prev) => ({
                                      ...prev,
                                      [key]: e.target.value,
                                    }));
                                    setTableChecked(false);
                                  }}
                                  className={`w-24 min-h-[38px] sm:min-h-0 px-2.5 py-1.5 rounded-xl border-2 bg-[#FFFDF8] text-xs font-mono font-bold focus:outline-none ${
                                    tableChecked
                                      ? isCorrect
                                        ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                                        : 'border-rose-500 text-rose-700 bg-rose-50'
                                      : 'border-slate-200 text-slate-800 focus:border-sky-400'
                                  }`}
                                />
                                {tableChecked && !isCorrect && (
                                  <span className="text-[11px] font-bold text-rose-600">
                                    ({cell.expected})
                                  </span>
                                )}
                              </div>
                            )
                          ) : (
                            <span className="text-slate-700 font-semibold">{cell.value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleCheckTable}
              className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-violet-500 hover:bg-violet-600 border-2 border-violet-600 border-b-4 active:border-b-2 active:translate-y-0.5 text-white text-xs font-extrabold transition-all cursor-pointer"
            >
              Tabloyu Kontrol Et
            </button>
            <button
              type="button"
              onClick={() => setShowSolution((s) => !s)}
              className="min-h-[44px] px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 border-b-4 hover:border-violet-300 active:border-b-2 active:translate-y-0.5 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              {showSolution ? 'Açıklamayı Gizle' : 'Çözüm Açıklaması'}
            </button>
          </div>

          {tableChecked && isCompleted && (
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3 text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Süpersin, tam puan! Tüm tablo hücreleri eksiksiz ve doğru.</span>
            </div>
          )}

          {(tableChecked || showSolution) && (
            <div className="rounded-2xl border-2 border-violet-200 bg-violet-50/40 p-4 text-xs text-slate-700 font-mono whitespace-pre-line break-words overflow-x-auto max-w-full">
              {question.solutionExplanation}
            </div>
          )}
        </div>
      )}

      {/* Mode 3: Simulator Build */}
      {question.type === 'simulator-build' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="text-slate-600 font-medium">
              Girişler:{' '}
              <span className="font-mono font-bold text-sky-700">
                {question.sequentialTest
                  ? [question.sequentialTest.clkLabel, ...question.inputs].join(', ')
                  : question.inputs.join(', ')}
              </span>{' '}
              · Çıkışlar:{' '}
              <span className="font-mono font-bold text-emerald-700">
                {question.outputs.join(', ')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHint((h) => !h)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-800 font-bold hover:bg-amber-100 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>{showHint ? 'İpucunu Gizle' : 'İpucu'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSolution((s) => !s)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border-2 border-sky-200 text-sky-800 font-bold hover:bg-sky-100 cursor-pointer"
              >
                <BookOpenCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>{showSolution ? 'Çözümü Gizle' : 'Çözüm Mantığı'}</span>
              </button>
            </div>
          </div>

          {showHint && (
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-3.5 text-xs font-medium text-amber-950">
              {question.hint}
            </div>
          )}

          {showSolution && (
            <div className="rounded-2xl border-2 border-sky-200 bg-sky-50/80 p-3.5 text-xs font-medium text-sky-950">
              {question.solutionDescription}
            </div>
          )}

          <CircuitSimulator
            mode="challenge"
            compact
            challenge={{
              inputs: question.inputs,
              outputs: question.outputs,
              allowedComponents: question.allowedComponents,
              maxComponents: question.maxComponents,
              expectedTruthTable: question.expectedTruthTable,
              sequentialTest: question.sequentialTest,
            }}
            onChallengePass={() => onMarkCompleted(question.id)}
          />
        </div>
      )}
    </div>
  );
};
