import React from 'react';
import { ArrowRight, Flame, Code2, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import heroStudentCoderImg from '../assets/images/hero_student_coder_1792739349570.jpg';
import { ThreeDIconBadge } from './common/ThreeDIconBadge';
import { LEARNING_TOOLS_3D } from '../data/learningIcons';

interface HeroProps {
  onStartPreparing: () => void;
  onExplorePractice: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPreparing, onExplorePractice }) => {
  return (
    <section id="hero" className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#FAF7FF] bg-purple-grid">
      {/* Dynamic Purple and Yellow Ambient Glow Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-purple-600/12 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#FFD000]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-10 w-[350px] h-[350px] bg-purple-900/8 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headline, Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Context Badge with Purple and Yellow accents */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-purple-200/90 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FFD000] ring-4 ring-[#FFD000]/30 animate-pulse" />
              <span className="text-xs font-bold text-purple-950">
                2025–2026 Campus Placement Preparation
              </span>
              <span className="text-purple-300">·</span>
              <span className="text-xs font-mono font-semibold text-purple-700">DSA + Aptitude + Mocks</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-neutral-950 leading-[1.08] text-balance">
              Your Dream{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-neutral-950">Placement</span>
                <span className="absolute bottom-1.5 left-0 w-full h-4 bg-[#FFD000] -rotate-1 -z-0 opacity-90 rounded-sm shadow-xs" />
              </span>{' '}
              Starts Here.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-700 max-w-2xl font-normal leading-relaxed">
              Master aptitude, coding and interview skills with focused practice designed to help you move closer to your dream job.
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs text-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#FFD000] text-purple-950 flex items-center justify-center font-black text-xs shadow-2xs">
                  ✓
                </div>
                <span className="font-semibold text-neutral-900">Company-specific patterns</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#FFD000] text-purple-950 flex items-center justify-center font-black text-xs shadow-2xs">
                  ✓
                </div>
                <span className="font-semibold text-neutral-900">Real sectional timers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#FFD000] text-purple-950 flex items-center justify-center font-black text-xs shadow-2xs">
                  ✓
                </div>
                <span className="font-semibold text-neutral-900">Detailed video solutions</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStartPreparing}
                className="px-7 py-3.5 text-sm font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-all shadow-md shadow-yellow-500/25 hover:shadow-lg hover:shadow-yellow-500/35 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Start Preparing</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onExplorePractice}
                className="px-6 py-3.5 text-sm font-bold text-purple-950 bg-white/90 hover:bg-purple-50/80 border border-purple-300 rounded-xl transition-all shadow-2xs hover:border-purple-400 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-purple-700" />
                <span>Explore Practice</span>
              </button>
            </div>

            {/* Trust Micro-Row */}
            <div className="pt-4 flex items-center gap-3 text-xs text-neutral-600 border-t border-purple-200/70">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#120B24] text-[#FFD000] text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs">
                  IIT
                </div>
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  NIT
                </div>
                <div className="w-7 h-7 rounded-full bg-[#FFD000] text-purple-950 text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  VIT
                </div>
              </div>
              <p>
                Trusted by students from <span className="font-bold text-purple-950">120+ engineering colleges</span> across India.
              </p>
            </div>

            {/* 3D Interactive Placement Tools Quick Dock */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800">
                  Interactive 3D Learning Tools
                </span>
                <span className="text-[10px] text-amber-800 bg-amber-100/90 font-semibold px-2 py-0.5 rounded-full border border-amber-300">
                  Touch & Tilt 3D
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { key: 'pencilCode', label: '3D Code Stylus', desc: 'Syntax & Notes', targetId: 'live-compiler' },
                  { key: 'codeCube', label: 'Compiler Cube', desc: 'Algorithms & DSA', targetId: 'live-compiler' },
                  { key: 'aptitudeGear', label: 'Synapse Sphere', desc: 'Aptitude Gears', targetId: 'readiness-radar' },
                  { key: 'examShield', label: 'Honor Shield', desc: 'Mock Testing', targetId: 'duel-arena' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(item.targetId);
                      if (el) {
                        const navOffset = 72;
                        const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
                        window.scrollTo({ top: pos, behavior: 'smooth' });
                      } else {
                        onExplorePractice();
                      }
                    }}
                    className="p-2 rounded-xl bg-white/95 border border-purple-200/90 hover:border-amber-400 hover:shadow-md transition-all flex items-center gap-2.5 text-left group cursor-pointer"
                  >
                    <ThreeDIconBadge toolKey={item.key} size="sm" showGlow={false} />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-neutral-900 group-hover:text-purple-950 truncate">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-neutral-500 truncate">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-Quality Student Visual with Floating Progress Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Back Accent Card Frame with rich Purple & Yellow gradient */}
              <div className="absolute -inset-3.5 bg-gradient-to-tr from-purple-700/40 via-[#FFD000]/40 to-purple-900/30 rounded-3xl transform rotate-1 -z-10 shadow-lg blur-xs" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-300/80 bg-neutral-900 aspect-4/3 sm:aspect-4/3">
                <img
                  src={heroStudentCoderImg}
                  alt="Student preparing for placement coding interview with laptop"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== '/assets/images/hero_student_coder_1792739349570.jpg') {
                      target.src = '/assets/images/hero_student_coder_1792739349570.jpg';
                    }
                  }}
                />
                
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-purple-950/20 pointer-events-none" />

                {/* Target Role Tag */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-[#120B24]/90 backdrop-blur-md text-[11px] font-mono text-[#FFD000] border border-purple-500/40 shadow-sm">
                  Target: SDE 2026
                </div>
              </div>

              {/* Floating Card 1: Placement Readiness Score (Top Left) */}
              <div className="absolute -top-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-purple-200/90 shadow-xl shadow-purple-900/10 text-neutral-900 max-w-[215px] transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                    Readiness Score
                  </span>
                  <span className="text-[10px] font-bold text-purple-950 bg-purple-100 px-1.5 py-0.2 rounded border border-purple-200">
                    +14% this month
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-display text-neutral-950 tabular-nums">
                    88%
                  </span>
                  <span className="text-[11px] text-neutral-600 font-medium">Placement Ready</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-[#FFD000] h-2 rounded-full w-[88%]" />
                </div>
                <p className="text-[10px] text-neutral-500 mt-1.5 font-medium">
                  Top 5% among campus cohort
                </p>
              </div>

              {/* Floating Card 2: Coding Streak (Bottom Right) */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#120B28] text-white p-4 rounded-2xl border border-purple-500/40 shadow-2xl shadow-purple-950/50 max-w-[210px] transition-transform hover:translate-y-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD000]/20 text-[#FFD000] flex items-center justify-center border border-[#FFD000]/30 shadow-xs">
                    <Flame className="w-4 h-4 fill-[#FFD000] text-[#FFD000]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">42-Day Streak</span>
                    <span className="text-[10px] text-purple-300">Consistent Practice</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pt-1.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className={`h-4 flex-1 rounded-xs transition-colors ${
                        day <= 6 ? 'bg-[#FFD000] shadow-xs shadow-yellow-500/30' : 'bg-purple-900/60'
                      }`}
                      title={day <= 6 ? 'Practice Completed' : 'Today'}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-purple-300 block mt-1.5">6/7 days solved this week</span>
              </div>

              {/* Floating Card 3: Questions Solved (Bottom Left) */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-purple-200/90 shadow-lg text-xs font-medium text-neutral-800 hidden sm:flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-[#FFD000] text-purple-950 flex items-center justify-center font-black text-xs shadow-2xs">
                  ✓
                </div>
                <div>
                  <span className="font-black text-neutral-950 block">320+ Questions Solved</span>
                  <span className="text-[11px] text-purple-700 font-mono">DSA: 180 · Aptitude: 140</span>
                </div>
              </div>

              {/* Floating 3D Tool Icon 1: 3D Code Stylus (Pencil) */}
              <div 
                className="absolute -bottom-8 -left-8 z-20 hidden md:flex flex-col items-center animate-float cursor-pointer group"
                onClick={onExplorePractice}
                title="Click to explore 3D Code Stylus practice"
              >
                <ThreeDIconBadge toolKey="pencilCode" size="md" showGlow={true} />
                <span className="text-[10px] font-mono font-bold text-purple-950 bg-white/95 px-2 py-0.5 rounded-md shadow-md border border-purple-200 mt-1.5 opacity-90 group-hover:opacity-100 group-hover:border-amber-400 transition-all">
                  3D Code Stylus
                </span>
              </div>

              {/* Floating 3D Tool Icon 2: 3D Compiler Cube */}
              <div 
                className="absolute -top-7 -right-7 z-20 hidden md:flex flex-col items-center animate-float-delayed cursor-pointer group"
                onClick={onStartPreparing}
                title="Click to launch compiler test suite"
              >
                <ThreeDIconBadge toolKey="codeCube" size="md" showGlow={true} />
                <span className="text-[10px] font-mono font-bold text-purple-950 bg-white/95 px-2 py-0.5 rounded-md shadow-md border border-purple-200 mt-1.5 opacity-90 group-hover:opacity-100 group-hover:border-purple-400 transition-all">
                  Compiler Cube
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
