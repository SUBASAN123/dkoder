import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, DollarSign, MapPin, Sparkles, Building2 } from 'lucide-react';
import { COMPANY_TRACKS } from '../data/platformData';
import { CompanyTrack } from '../types';

interface CompanyTracksProps {
  onViewTrack: (track: CompanyTrack) => void;
  onExploreAll: () => void;
}

export const CompanyTracks: React.FC<CompanyTracksProps> = ({ onViewTrack, onExploreAll }) => {
  const [showAllGrid, setShowAllGrid] = useState(false);
  const [activeTier, setActiveTier] = useState<'All' | 'Super Dream' | 'Dream' | 'Digital'>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredTracks = COMPANY_TRACKS.filter((t) => {
    if (activeTier === 'All') return true;
    return t.tier === activeTier;
  });

  return (
    <section id="tracks" className="py-16 md:py-24 bg-white border-y border-purple-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Controls & Salary Tier Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
              <span>Targeted Preparation</span>
              <span>·</span>
              <span>Company Specific Blueprints & CTC Tiers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-neutral-950">
              Practice for Your Dream Placement
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-xl">
              Targeted problem sets, test patterns, and interview syllabus aligned with actual hiring formats and CTC salary brackets.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAllGrid(!showAllGrid)}
              className="px-4 py-2 text-xs font-bold text-purple-950 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors cursor-pointer"
            >
              {showAllGrid ? 'Show Carousel View' : 'Explore All Companies'}
            </button>

            {!showAllGrid && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll('left')}
                  aria-label="Previous company track"
                  className="p-2 rounded-lg border border-purple-200 bg-white hover:bg-purple-50 text-purple-900 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  aria-label="Next company track"
                  className="p-2 rounded-lg border border-purple-200 bg-white hover:bg-purple-50 text-purple-900 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tier Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {(['All', 'Super Dream', 'Dream', 'Digital'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTier === tier
                  ? 'bg-[#120B24] text-[#FFD000] shadow-md'
                  : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
              }`}
            >
              {tier === 'All'
                ? 'All Salary Tiers'
                : tier === 'Super Dream'
                ? 'Super Dream (₹18+ LPA)'
                : tier === 'Dream'
                ? 'Dream Tier (₹8 - 16 LPA)'
                : 'Digital & Specialist (₹6 - 10 LPA)'}
            </button>
          ))}
        </div>

        {/* Tracks Container */}
        {showAllGrid ? (
          /* Full Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {filteredTracks.map((track) => (
              <TrackCard key={track.id} track={track} onSelect={() => onViewTrack(track)} />
            ))}
          </div>
        ) : (
          /* Scrollable Carousel */
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredTracks.map((track) => (
              <div key={track.id} className="min-w-[320px] sm:min-w-[340px] max-w-[360px] snap-start shrink-0">
                <TrackCard track={track} onSelect={() => onViewTrack(track)} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Context Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF7FF] border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#120B24] text-[#FFD000] flex items-center justify-center font-mono font-bold text-sm border border-purple-900/60 shadow-xs">
              40+
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">
                Looking for other company patterns?
              </h4>
              <p className="text-xs text-neutral-600">
                We also cover Qualcomm, Oracle, Flipkart, Swiggy, Capgemini, and high-growth Indian unicorns.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveTier('All');
              setShowAllGrid(true);
              onExploreAll();
            }}
            className="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-xs hover:shadow-sm"
          >
            Browse Full Company Library
          </button>
        </div>

      </div>
    </section>
  );
};

interface TrackCardProps {
  track: CompanyTrack;
  onSelect: () => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, onSelect }) => {
  return (
    <div className="h-full rounded-2xl p-6 bg-[#FAF7FF] border border-purple-200/90 shadow-2xs hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-400 transition-all flex flex-col justify-between group">
      <div>
        {/* Header with Company Logo & Tier */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#120B24] text-[#FFD000] flex items-center justify-center font-mono font-black text-sm group-hover:scale-105 group-hover:shadow-md group-hover:shadow-purple-900/20 transition-all border border-purple-900/40">
              {track.name.slice(0, 2)}
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-neutral-950 leading-tight">
                {track.name}
              </h3>
              <span className="text-xs text-purple-700 font-semibold">
                {track.badge}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white border border-purple-200 text-purple-900">
            {track.difficulty}
          </span>
        </div>

        {/* Salary CTC & Location Banner */}
        {track.salaryBand && (
          <div className="mb-3.5 p-2 rounded-xl bg-purple-100/70 border border-purple-200/80 flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-purple-950 flex items-center gap-1">
              <span className="text-purple-600 font-normal">CTC:</span>
              <span>{track.salaryBand}</span>
            </span>
            {track.tier && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-purple-900 border border-purple-200">
                {track.tier}
              </span>
            )}
          </div>
        )}

        {/* Target Role */}
        <div className="mb-4 pb-3 border-b border-purple-200/60">
          <span className="text-[11px] font-bold text-purple-700/80 uppercase tracking-wider block mb-0.5">
            Target Role & Selection
          </span>
          <p className="text-sm font-bold text-neutral-900 line-clamp-1">
            {track.role}
          </p>
          <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">
            Cutoff: {track.selectionRatio}
          </span>
        </div>

        {/* Preparation Focus Topics */}
        <div className="mb-6 space-y-2">
          <span className="text-[11px] font-bold text-purple-700/80 uppercase tracking-wider block">
            Core Preparation Topics
          </span>
          <div className="space-y-1.5">
            {track.topics.slice(0, 3).map((topic, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD000] ring-2 ring-yellow-400/30" />
                <span className="truncate">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Meta & View Track CTA */}
      <div className="pt-4 border-t border-purple-200/80 flex items-center justify-between">
        <div className="text-xs text-purple-900/70 font-mono font-medium">
          <span>{track.preparationWeeks}w roadmap</span>
          <span className="mx-1">·</span>
          <span>{track.questionsCount} Qs</span>
        </div>
        <button
          onClick={onSelect}
          className="px-4 py-2 text-xs font-bold text-purple-950 bg-white hover:bg-[#120B24] hover:text-[#FFD000] border border-purple-300 hover:border-purple-900 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <span>Blueprint</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
