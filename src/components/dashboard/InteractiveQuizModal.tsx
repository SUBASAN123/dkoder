import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowRight, Zap, Trophy, RefreshCw } from 'lucide-react';
import { MCQModule } from '../../types/dashboard';
import { ThreeDIconBadge } from '../common/ThreeDIconBadge';

interface QuizModalProps {
  module: MCQModule | null;
  onClose: () => void;
  onCompleteQuestion: (moduleId: string, isCorrect: boolean) => void;
}

export const InteractiveQuizModal: React.FC<QuizModalProps> = ({
  module,
  onClose,
  onCompleteQuestion
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!module) return null;

  const currentQ = module.questions[currentQIndex] || module.questions[0];
  const isLast = currentQIndex === module.questions.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    setIsAnswered(true);
    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setSessionScore((prev) => prev + 1);
    }
    onCompleteQuestion(module.id, isCorrect);
  };

  const handleNext = () => {
    if (isLast) {
      setIsFinished(true);
    } else {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setSessionScore(0);
    setIsFinished(false);
  };

  const getToolKeyForCategory = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'dsa':
        return 'codeCube';
      case 'aptitude':
        return 'aptitudeGear';
      case 'company':
        return 'examShield';
      default:
        return 'pencilCode';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-purple-200 text-neutral-900 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7FF] border-b border-purple-200">
          <div className="flex items-center gap-3">
            <ThreeDIconBadge 
              toolKey={getToolKeyForCategory(module.category)} 
              size="sm" 
              showGlow={true} 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#120B24] text-[#FFD000] font-mono font-bold text-[10px] flex items-center justify-center">
                  M{module.moduleNumber}
                </span>
                <h3 id="quiz-modal-title" className="text-base font-bold text-neutral-900 font-display">
                  {module.title}
                </h3>
              </div>
              <span className="text-[11px] text-purple-700 font-semibold block mt-0.5">
                Question {currentQIndex + 1} of {module.questions.length} · {module.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 rounded-lg hover:bg-purple-100 hover:text-purple-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isFinished ? (
            /* Finished View */
            <div className="text-center py-6 space-y-4">
              <div className="flex justify-center">
                <ThreeDIconBadge 
                  toolKey="examShield" 
                  size="xl" 
                  floating={true} 
                  showGlow={true} 
                />
              </div>
              <div>
                <h4 className="text-2xl font-black font-display text-neutral-950">
                  Module Practice Complete!
                </h4>
                <p className="text-xs text-neutral-600 mt-1">
                  You scored <span className="font-bold text-purple-900">{sessionScore}</span> out of {module.questions.length} on <span className="font-semibold">{module.title}</span>.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-950">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>+{sessionScore * 20} XP Earned! Streak Maintained 🔥</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Module</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-colors shadow-md shadow-yellow-500/20 cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            /* Active Question View */
            <>
              {/* Question Text */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-purple-800 font-semibold">
                  <span>Topic: {currentQ.topic}</span>
                  <span className="font-mono bg-purple-100 px-2 py-0.5 rounded text-purple-900">
                    +20 XP on correct
                  </span>
                </div>
                <h4 className="text-base font-bold text-neutral-950 leading-snug">
                  {currentQ.question}
                </h4>

                {/* Optional Code Snippet */}
                {currentQ.codeSnippet && (
                  <div className="p-3.5 rounded-xl bg-[#0F0822] text-[#FFD000] font-mono text-xs border border-purple-900 overflow-x-auto">
                    <pre className="text-neutral-100">{currentQ.codeSnippet}</pre>
                  </div>
                )}
              </div>

              {/* Options List */}
              <div className="space-y-2.5 pt-1">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let optionStyles = 'border-purple-200/90 bg-white hover:border-purple-400 hover:bg-purple-50/40 text-neutral-800';

                  if (isSelected && !isAnswered) {
                    optionStyles = 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-400/40';
                  }

                  if (isAnswered) {
                    if (isCorrect) {
                      optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/30';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'border-rose-400 bg-rose-50 text-rose-950 font-medium ring-2 ring-rose-400/30';
                    } else {
                      optionStyles = 'border-neutral-200 bg-neutral-50/50 text-neutral-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyles}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card upon answering */}
              {isAnswered && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct! +20 XP awarded</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Incorrect. Explanation below:</span>
                      </>
                    )}
                  </div>
                  <p className="mt-1">{currentQ.explanation}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!isFinished && (
          <div className="px-6 py-4 bg-[#FAF7FF] border-t border-purple-200 flex items-center justify-between">
            <span className="text-xs text-neutral-500">
              Module {module.moduleNumber} · Placement Diagnostic
            </span>

            <div className="flex items-center gap-3">
              {!isAnswered ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className={`px-5 py-2 text-xs font-black rounded-lg transition-all cursor-pointer ${
                    selectedOption !== null
                      ? 'bg-[#FFD000] text-purple-950 hover:bg-[#F0C400] shadow-md shadow-yellow-500/20'
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 text-xs font-black text-white bg-[#120B24] hover:bg-[#1E1238] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>{isLast ? 'Complete Module' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
