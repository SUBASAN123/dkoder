import React from 'react';
import { Code2, Brain, Clock, Video, Building2, ArrowRight, Check } from 'lucide-react';
import { FEATURES } from '../data/platformData';
import { FeatureItem } from '../types';
import mockInterviewImg from '../assets/images/mock_interview_simulation_1792741489513.jpg';
import { ThreeDIconBadge } from './common/ThreeDIconBadge';

interface FeaturesSectionProps {
  onSelectFeature: (feature: FeatureItem) => void;
  onExploreCollege: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onSelectFeature,
  onExploreCollege
}) => {
  const getIcon = (name: FeatureItem['iconName']) => {
    switch (name) {
      case 'code':
        return <Code2 className="w-5 h-5 transition-colors" />;
      case 'brain':
        return <Brain className="w-5 h-5 transition-colors" />;
      case 'clock':
        return <Clock className="w-5 h-5 transition-colors" />;
      case 'video':
        return <Video className="w-5 h-5 transition-colors" />;
      case 'building':
        return <Building2 className="w-5 h-5 transition-colors" />;
      default:
        return <Code2 className="w-5 h-5 transition-colors" />;
    }
  };

  const get3DToolKey = (name: FeatureItem['iconName']) => {
    switch (name) {
      case 'code':
        return 'codeCube';
      case 'brain':
        return 'aptitudeGear';
      case 'clock':
        return 'examShield';
      case 'video':
        return 'pencilCode';
      case 'building':
        return 'examShield';
      default:
        return 'pencilCode';
    }
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-[#FAF7FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
            <span>Core Learning Modules</span>
            <span>·</span>
            <span>Structured Placement Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-neutral-950 text-balance">
            Everything You Need for Placement Success
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-2xl">
            From basic aptitude speed tricks to complex dynamic programming and timed campus mock assessments, master every stage of the placement selection funnel.
          </p>
        </div>

        {/* 5 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const isColleges = feature.id === 'for-colleges';
            return (
              <div
                key={feature.id}
                className={`group relative rounded-2xl p-6 sm:p-7 bg-white border border-purple-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-400 transition-all flex flex-col justify-between ${
                  index === 3 || index === 4 ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                <div>
                  {/* 3D Icon & Category Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <ThreeDIconBadge 
                      toolKey={get3DToolKey(feature.iconName)} 
                      size="md" 
                      showGlow={true} 
                      className="group-hover:scale-105 transition-transform"
                    />
                    <span className="text-xs font-mono font-semibold text-purple-800/80 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/60 shadow-2xs">
                      {feature.previewBadge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold font-display text-neutral-950 mb-1 group-hover:text-purple-900 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-semibold text-purple-600 mb-3">
                    {feature.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                    {feature.description}
                  </p>

                  {/* Key Topics List */}
                  <div className="space-y-1.5 pt-2 pb-5 border-t border-purple-100">
                    {feature.keyTopics.slice(0, 3).map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-purple-500 group-hover:text-purple-700 transition-colors shrink-0" />
                        <span className="truncate">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (isColleges) {
                        onExploreCollege();
                      } else {
                        onSelectFeature(feature);
                      }
                    }}
                    className="text-xs font-bold text-purple-900 hover:text-purple-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{feature.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-amber-500" />
                  </button>
                  <span className="text-[11px] text-purple-400 font-mono">
                    Module 0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Impact Visual Spotlight: 1:1 Mock Technical Interview Simulator */}
        <div className="mt-12 rounded-3xl overflow-hidden border border-purple-200/90 bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 relative aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-full min-h-[260px] overflow-hidden">
              <img
                src={mockInterviewImg}
                alt="Technical mock interview session with whiteboard coding"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/assets/images/mock_interview_simulation_1792741489513.jpg') {
                    target.src = '/assets/images/mock_interview_simulation_1792741489513.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#120B24]/90 text-[11px] font-mono text-[#FFD000] border border-purple-500/40 backdrop-blur-md">
                Live Whiteboard Simulator
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-purple-700" />
                <span>Simulated Company Rounds</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-neutral-950 tracking-tight leading-tight">
                Practice Live Technical Interviews Before Campus Day
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Overcome interview anxiety with timed whiteboard coding rounds. Practice explaining time/space complexities, edge cases, and recursive tree traversals just like real interviewers evaluate at Amazon, Google, and Microsoft.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>Real-Time Code Execution</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>Audio & Video Mock Panel</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>Personalized Feedback Rubric</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
