import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Bell, 
  Check, 
  Building2, 
  Briefcase, 
  Sparkles,
  Bookmark,
  ChevronRight
} from 'lucide-react';

interface Drive {
  id: string;
  company: string;
  role: string;
  ctc: string;
  tier: 'Super Dream' | 'Dream' | 'Digital' | 'Mass';
  eligibleBatches: string[];
  deadline: string;
  daysLeft: number;
  patternSummary: string;
  status: 'Open' | 'Closing Soon' | 'Announced';
}

const DRIVES: Drive[] = [
  {
    id: 'tcs-nqt-2026',
    company: 'Tata Consultancy Services',
    role: 'TCS Prime & Digital Ninja',
    ctc: '₹9.0 LPA / ₹7.0 LPA / ₹3.6 LPA',
    tier: 'Digital',
    eligibleBatches: ['2025', '2026'],
    deadline: 'Nov 18, 2026',
    daysLeft: 6,
    patternSummary: 'Advanced Coding (2 Qs) + Cognitive Aptitude + Technical Assessment',
    status: 'Closing Soon'
  },
  {
    id: 'amazon-sde-campus',
    company: 'Amazon India',
    role: 'Software Development Engineer (SDE-1)',
    ctc: '₹28.5 - 44 LPA (Base + Stocks)',
    tier: 'Super Dream',
    eligibleBatches: ['2026 Batch Graduates'],
    deadline: 'Dec 05, 2026',
    daysLeft: 23,
    patternSummary: 'OA (HackerRank 2 Qs) + Work Simulation + 3 Chime Live Coding Rounds',
    status: 'Open'
  },
  {
    id: 'zoho-developer',
    company: 'Zoho Corporation',
    role: 'Software Developer & Quality Analyst',
    ctc: '₹8.4 - 12.0 LPA',
    tier: 'Dream',
    eligibleBatches: ['2025', '2026', '2027'],
    deadline: 'Nov 29, 2026',
    daysLeft: 17,
    patternSummary: 'Round 1: C/C++ Aptitude & Flowcharts -> Round 2: Basic Programming -> Round 3: Advanced App Design',
    status: 'Open'
  },
  {
    id: 'infosys-sp-dse',
    company: 'Infosys Limited',
    role: 'Specialist Programmer (SP) & DSE',
    ctc: '₹9.5 LPA / ₹6.25 LPA',
    tier: 'Digital',
    eligibleBatches: ['2026 Batch'],
    deadline: 'Dec 12, 2026',
    daysLeft: 30,
    patternSummary: '3 Competitive Coding Problems (Greedy, DP, Graph) within 3 hours',
    status: 'Open'
  },
  {
    id: 'cognizant-genc-elevate',
    company: 'Cognizant Technology Solutions',
    role: 'GenC Next / GenC Elevate',
    ctc: '₹6.75 LPA / ₹5.0 LPA',
    tier: 'Digital',
    eligibleBatches: ['2026 Batch'],
    deadline: 'Nov 25, 2026',
    daysLeft: 13,
    patternSummary: 'Skill-based Hackathon + DBMS/Java hands-on challenge + Technical Interview',
    status: 'Open'
  }
];

interface DriveTrackerProps {
  onSelectCompanyTrack?: (companyName: string) => void;
  onSetReminder?: (driveTitle: string) => void;
}

export const DriveTracker: React.FC<DriveTrackerProps> = ({ 
  onSelectCompanyTrack, 
  onSetReminder 
}) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['tcs-nqt-2026']);
  const [activeFilter, setActiveFilter] = useState<'all' | 'Super Dream' | 'Dream' | 'Digital'>('all');

  const toggleBookmark = (id: string, driveTitle: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
      if (onSetReminder) {
        onSetReminder(`Reminder set for ${driveTitle}! We will alert you 48h before deadline.`);
      }
    }
  };

  const filteredDrives = DRIVES.filter((d) => 
    activeFilter === 'all' ? true : d.tier === activeFilter
  );

  return (
    <section id="hiring-drives" className="py-16 md:py-24 bg-white border-b border-purple-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
              <Calendar className="w-4 h-4 text-purple-700" />
              <span>Campus Hiring Calendar 2026</span>
              <span>·</span>
              <span>Real-Time Deadlines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-neutral-950">
              Active Campus & Off-Campus Drives
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-neutral-600 max-w-xl">
              Track open registration windows, CTC breakdowns, and practice matching test patterns directly.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'all' ? 'bg-[#120B24] text-white shadow-xs' : 'text-purple-900 hover:text-purple-950'
              }`}
            >
              All Drives
            </button>
            <button
              onClick={() => setActiveFilter('Super Dream')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'Super Dream' ? 'bg-[#120B24] text-[#FFD000] shadow-xs' : 'text-purple-900 hover:text-purple-950'
              }`}
            >
              Super Dream
            </button>
            <button
              onClick={() => setActiveFilter('Dream')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'Dream' ? 'bg-[#120B24] text-[#FFD000] shadow-xs' : 'text-purple-900 hover:text-purple-950'
              }`}
            >
              Dream Tier
            </button>
            <button
              onClick={() => setActiveFilter('Digital')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'Digital' ? 'bg-[#120B24] text-[#FFD000] shadow-xs' : 'text-purple-900 hover:text-purple-950'
              }`}
            >
              Digital / Specialist
            </button>
          </div>
        </div>

        {/* Drives Table / Cards */}
        <div className="space-y-3">
          {filteredDrives.map((drive) => {
            const isBookmarked = bookmarkedIds.includes(drive.id);
            return (
              <div
                key={drive.id}
                className="p-5 rounded-2xl bg-[#FAF7FF] border border-purple-200/90 hover:border-purple-400 hover:shadow-lg transition-all duration-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                {/* Left info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-[#120B24] text-[#FFD000] flex items-center justify-center font-black text-base shrink-0 shadow-xs">
                    {drive.company[0]}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-neutral-950">
                        {drive.company}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          drive.tier === 'Super Dream'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : drive.tier === 'Dream'
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}
                      >
                        {drive.tier}
                      </span>
                      {drive.status === 'Closing Soon' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-rose-600" />
                          Closing in {drive.daysLeft}d
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-purple-900">
                      {drive.role} · <span className="font-mono text-neutral-900">{drive.ctc}</span>
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-1">
                      <strong className="text-neutral-800">Pattern:</strong> {drive.patternSummary}
                    </p>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-purple-200/60 shrink-0">
                  <div className="text-left lg:text-right font-mono text-xs">
                    <div className="text-neutral-500 text-[10px]">Deadline</div>
                    <div className="font-bold text-neutral-900">{drive.deadline}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(drive.id, `${drive.company} (${drive.role})`)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isBookmarked
                          ? 'bg-[#120B24] border-[#120B24] text-[#FFD000]'
                          : 'bg-white border-purple-200 text-purple-800 hover:bg-purple-50'
                      }`}
                      title={isBookmarked ? 'Alert set' : 'Set drive alert'}
                    >
                      {isBookmarked ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    </button>

                    {onSelectCompanyTrack && (
                      <button
                        onClick={() => onSelectCompanyTrack(drive.company)}
                        className="px-4 py-2.5 rounded-xl bg-[#FFD000] hover:bg-[#F0C400] text-purple-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                      >
                        <span>Practice Blueprint</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
