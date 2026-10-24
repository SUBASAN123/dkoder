import React from 'react';
import { TRUST_STATS } from '../data/platformData';
import { Shield, Zap, Target } from 'lucide-react';
import placementCelebrationImg from '../assets/images/placement_success_celebration_1792741488902.jpg';

export const TrustImpact: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0F0822] text-white relative overflow-hidden">
      {/* Radiant Yellow & Purple Atmospheric Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FFD000]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E123F] border border-purple-500/40 text-xs font-bold text-[#FFD000] mb-3 shadow-xs">
            <span>Platform Reach & Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Built for Engineers. Trusted for Results.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto">
            Measurable engagement metrics from students preparing for campus hiring drives across technical institutes.
          </p>
        </div>

        {/* Featured Placement Success Outcome Showcase with Real Image */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-purple-500/40 bg-gradient-to-r from-[#170C33] to-[#120726] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 relative aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-full min-h-[260px] overflow-hidden">
              <img
                src={placementCelebrationImg}
                alt="Engineering students celebrating placement offers from tech employers"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/assets/images/placement_success_celebration_1792741488902.jpg') {
                    target.src = '/assets/images/placement_success_celebration_1792741488902.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#120B24]/90 text-[11px] font-mono text-[#FFD000] border border-purple-700/60 backdrop-blur-md">
                Batch of 2024–2026 Placed
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD000]/20 text-[#FFD000] border border-[#FFD000]/40 text-xs font-bold">
                <span>Verified Placement Offers</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                From Daily Practice to Campus Dream Offers
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                Thousands of engineering candidates who practiced consistently on DKoder successfully cleared the coding, aptitude, and technical interview rounds at top companies including Google, Infosys, Amazon, and TCS.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800">
                  <span className="text-[#FFD000] font-black text-lg block">94%</span>
                  <span className="text-purple-300 text-[10px]">Filter Round Clearance</span>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800">
                  <span className="text-[#FFD000] font-black text-lg block">42 min</span>
                  <span className="text-purple-300 text-[10px]">Avg Daily Practice</span>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800">
                  <span className="text-[#FFD000] font-black text-lg block">14 Patterns</span>
                  <span className="text-purple-300 text-[10px]">Cover 90% Problems</span>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800">
                  <span className="text-[#FFD000] font-black text-lg block">120+</span>
                  <span className="text-purple-300 text-[10px]">Partner Colleges</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TRUST_STATS.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#190F36]/90 border border-purple-800/70 hover:border-purple-500/90 hover:shadow-xl hover:shadow-purple-900/30 transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-black font-display text-[#FFD000] tabular-nums tracking-tight mb-1 drop-shadow-xs">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mb-2 font-display">
                  {stat.label}
                </div>
                <p className="text-xs text-purple-200/70 leading-relaxed mb-3">
                  {stat.context}
                </p>
              </div>
              <div className="pt-3 border-t border-purple-800/60 text-[11px] text-purple-400 font-mono">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Qualitative Advantage Strip */}
        <div className="p-8 rounded-2xl bg-[#190F36] border border-purple-800/80 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950 text-[#FFD000] border border-purple-700/60 flex items-center justify-center shrink-0 shadow-xs">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Pattern Mastery Over Rote Memorization
                </h4>
                <p className="text-xs text-purple-200/70 leading-relaxed">
                  Instead of solving 500 random problems, master the 14 core patterns that solve 90% of interview questions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950 text-[#FFD000] border border-purple-700/60 flex items-center justify-center shrink-0 shadow-xs">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Exam Simulation with Sectional Cutoffs
                </h4>
                <p className="text-xs text-purple-200/70 leading-relaxed">
                  Realistic test interfaces mirror TCS iON and HackerRank with real timers, negative marking, and no code copy-paste.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950 text-[#FFD000] border border-purple-700/60 flex items-center justify-center shrink-0 shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Zero Distractions & Verified Solutions
                </h4>
                <p className="text-xs text-purple-200/70 leading-relaxed">
                  No advertisements, no clickbait. Pure engineering focus with verified code implementations in C++, Java, and Python.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Label Note */}
        <p className="text-[11px] text-center text-purple-400 mt-6 font-mono">
          *Platform practice statistics updated weekly. Figures reflect aggregated student activity on DKoder practice modules.
        </p>
      </div>
    </section>
  );
};
