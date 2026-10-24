import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FREQUENT_QUESTIONS } from '../data/platformData';

export const PlacementFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-[#FAF7FF] border-t border-purple-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-neutral-950">
            Frequently Asked Placement Questions
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Clear answers on curriculum, language support, company tracking, and campus licensing.
          </p>
        </div>

        <div className="space-y-3">
          {FREQUENT_QUESTIONS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-purple-200/80 bg-white transition-all overflow-hidden shadow-2xs hover:border-purple-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm text-neutral-900 hover:text-purple-950 focus-visible:outline-hidden"
                >
                  <span className={isOpen ? 'text-purple-950' : 'text-neutral-900'}>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-purple-600 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-purple-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-purple-100 bg-purple-50/30 animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
