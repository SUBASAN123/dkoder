import React from 'react';
import { UserCheck, Terminal, LineChart, Award, ArrowRight } from 'lucide-react';
import { PLACEMENT_STEPS } from '../data/platformData';

interface HowItWorksProps {
  onStartJourney: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartJourney }) => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'user-check':
        return <UserCheck className="w-5 h-5 transition-colors" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 transition-colors" />;
      case 'line-chart':
        return <LineChart className="w-5 h-5 transition-colors" />;
      case 'award':
        return <Award className="w-5 h-5 transition-colors" />;
      default:
        return <UserCheck className="w-5 h-5 transition-colors" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF7FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
            <span>Structured Framework</span>
            <span>·</span>
            <span>Step-by-Step Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-neutral-950">
            How DKoder Accelerates Your Placement
          </h2>
          <p className="mt-3 text-base text-neutral-600 max-w-xl mx-auto">
            A proven 4-stage roadmap designed to eliminate confusion and turn daily practice into placement offers.
          </p>
        </div>

        {/* 4-Step Placement Journey Grid with Connecting Lines */}
        <div className="relative">
          {/* Desktop Connecting Line with purple tint */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-purple-200 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PLACEMENT_STEPS.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-white border border-purple-200/90 shadow-2xs hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black font-mono text-[#FFD000] bg-[#120B24] border border-purple-900/60 px-3 py-1 rounded-xl shadow-xs">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-700 flex items-center justify-center group-hover:bg-[#FFD000] group-hover:text-purple-950 group-hover:border-[#FFD000] transition-all shadow-2xs">
                      {getStepIcon(step.iconName)}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold font-display text-neutral-950 mb-2 group-hover:text-purple-900 transition-colors">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Practical Deliverable Tag */}
                <div className="pt-3 border-t border-purple-100">
                  <span className="text-[11px] font-bold text-purple-700/80 uppercase tracking-wider block mb-1">
                    Outcome
                  </span>
                  <p className="text-xs font-semibold text-neutral-800">
                    {step.practicalOutcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartJourney}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-all shadow-md shadow-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/30 cursor-pointer"
          >
            <span>Begin Step 01: Free Placement Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
