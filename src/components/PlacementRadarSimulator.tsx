import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ThreeDIconBadge } from './common/ThreeDIconBadge';

interface SkillScores {
  dsa: number;
  aptitude: number;
  coreCs: number;
  systemDesign: number;
  communication: number;
}

const PRESETS: { name: string; description: string; scores: SkillScores }[] = [
  {
    name: 'Super Dream Contender',
    description: 'High DSA + System Design geared for Amazon & Google',
    scores: { dsa: 92, aptitude: 85, coreCs: 88, systemDesign: 84, communication: 82 }
  },
  {
    name: 'Product Specialist',
    description: 'Practical problem solving tuned for Zoho & Swiggy',
    scores: { dsa: 80, aptitude: 78, coreCs: 86, systemDesign: 76, communication: 80 }
  },
  {
    name: 'Non-CS to Tech Transition',
    description: 'Focusing on Core fundamentals and high Aptitude',
    scores: { dsa: 65, aptitude: 88, coreCs: 70, systemDesign: 52, communication: 85 }
  },
  {
    name: 'Campus Foundation Starter',
    description: 'Balanced starting profile for TCS Digital & Infosys DSE',
    scores: { dsa: 68, aptitude: 75, coreCs: 65, systemDesign: 55, communication: 70 }
  }
];

interface PlacementRadarSimulatorProps {
  onStartCustomSprint?: (presetName: string) => void;
}

export const PlacementRadarSimulator: React.FC<PlacementRadarSimulatorProps> = ({ 
  onStartCustomSprint 
}) => {
  const [scores, setScores] = useState<SkillScores>(PRESETS[0].scores);
  const [activePreset, setActivePreset] = useState<string>('Super Dream Contender');

  const updateScore = (key: keyof SkillScores, val: number) => {
    setActivePreset('Custom');
    setScores((prev) => ({ ...prev, [key]: val }));
  };

  // Calculate composite metrics
  const compositeIndex = Math.round(
    scores.dsa * 0.35 +
    scores.aptitude * 0.20 +
    scores.coreCs * 0.20 +
    scores.systemDesign * 0.15 +
    scores.communication * 0.10
  );

  // CTC prediction logic based on Indian campus tiers
  let predictedCtc = '₹3.5 - 5 LPA';
  let tierBadge = 'Service Mass Tier';
  let tierColor = 'text-amber-400 border-amber-500/40 bg-amber-950/40';

  if (compositeIndex >= 85) {
    predictedCtc = '₹16 - 28+ LPA';
    tierBadge = 'Super Dream (Tier 1)';
    tierColor = 'text-[#FFD000] border-yellow-500/60 bg-yellow-950/40';
  } else if (compositeIndex >= 72) {
    predictedCtc = '₹8.5 - 15 LPA';
    tierBadge = 'Dream Tier (Product & High-Tech)';
    tierColor = 'text-purple-300 border-purple-500/50 bg-purple-950/50';
  } else if (compositeIndex >= 58) {
    predictedCtc = '₹6 - 9 LPA';
    tierBadge = 'Digital / Specialist Tier';
    tierColor = 'text-emerald-300 border-emerald-500/50 bg-emerald-950/40';
  }

  // Calculate Radar polygon points (SVG Radar)
  // 5 axes: DSA (Top), Aptitude (Top-Right), CoreCS (Bottom-Right), SystemDesign (Bottom-Left), Communication (Top-Left)
  const center = 150;
  const radius = 100;
  const numAxes = 5;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const radarPolygonPoints = [
    getCoordinates(scores.dsa, 0),
    getCoordinates(scores.aptitude, 1),
    getCoordinates(scores.coreCs, 2),
    getCoordinates(scores.systemDesign, 3),
    getCoordinates(scores.communication, 4)
  ].map((p) => `${p.x},${p.y}`).join(' ');

  // Company Match Odds
  const companyOdds = [
    { name: 'Amazon / Google', threshold: 84, prob: Math.min(99, Math.max(12, Math.round(compositeIndex * 1.05 - 10))) },
    { name: 'Zoho / Swiggy / Flipkart', threshold: 74, prob: Math.min(99, Math.max(25, Math.round(compositeIndex * 1.12))) },
    { name: 'TCS Digital / Infosys SP', threshold: 62, prob: Math.min(99, Math.max(40, Math.round(compositeIndex * 1.25))) },
    { name: 'TCS Ninja / Cognizant GenC', threshold: 45, prob: Math.min(100, Math.max(70, Math.round(compositeIndex * 1.35))) },
  ];

  return (
    <section id="readiness-radar" className="py-16 md:py-24 bg-[#120B24] text-white relative overflow-hidden border-b border-purple-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-[11px] font-bold text-[#FFD000] tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD000]" />
            <span>Interactive Placement Diagnostic</span>
            <span>·</span>
            <span>AI Predictive Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
            360° Placement Readiness Radar
          </h2>
          <p className="mt-3 text-sm sm:text-base text-purple-200/80">
            Calibrate your skill dimensions in real time. See instant predicted CTC, company probability cutoffs, and your personalized 14-day placement sprint.
          </p>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setScores(p.scores);
                  setActivePreset(p.name);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePreset === p.name
                    ? 'bg-[#FFD000] text-purple-950 shadow-md shadow-yellow-500/20 scale-105'
                    : 'bg-[#1A1133] text-purple-300 hover:text-white border border-purple-700/50 hover:border-purple-500'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* The Diagnostic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Sliders & Adjusters (5 cols) */}
          <div className="lg:col-span-5 space-y-4 bg-[#170F2C] p-6 rounded-2xl border border-purple-700/60 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-purple-800/60">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FFD000]" />
                Skill Proficiency Tuning
              </span>
              <span className="text-xs font-mono text-[#FFD000] font-bold">
                Live Dynamic
              </span>
            </div>

            {/* 1. DSA */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-purple-200">Data Structures & Algo (DSA)</span>
                <span className="font-mono text-[#FFD000] font-bold">{scores.dsa}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="99"
                value={scores.dsa}
                onChange={(e) => updateScore('dsa', parseInt(e.target.value))}
                className="w-full accent-[#FFD000] h-2 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-purple-400">
                <span>Arrays / Trees</span>
                <span>DP / Graphs</span>
              </div>
            </div>

            {/* 2. Aptitude */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-purple-200">Aptitude & Speed Reasoning</span>
                <span className="font-mono text-[#FFD000] font-bold">{scores.aptitude}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="99"
                value={scores.aptitude}
                onChange={(e) => updateScore('aptitude', parseInt(e.target.value))}
                className="w-full accent-[#FFD000] h-2 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-purple-400">
                <span>Quant Basics</span>
                <span>Speed Math / Logic</span>
              </div>
            </div>

            {/* 3. Core CS */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-purple-200">Core CS (OS, DBMS, CN)</span>
                <span className="font-mono text-[#FFD000] font-bold">{scores.coreCs}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="99"
                value={scores.coreCs}
                onChange={(e) => updateScore('coreCs', parseInt(e.target.value))}
                className="w-full accent-[#FFD000] h-2 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-purple-400">
                <span>SQL / Acid Properties</span>
                <span>Deadlocks / TCP</span>
              </div>
            </div>

            {/* 4. System Design */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-purple-200">System Design & OOP</span>
                <span className="font-mono text-[#FFD000] font-bold">{scores.systemDesign}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="99"
                value={scores.systemDesign}
                onChange={(e) => updateScore('systemDesign', parseInt(e.target.value))}
                className="w-full accent-[#FFD000] h-2 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-purple-400">
                <span>OOP & Clean Code</span>
                <span>Distributed Caching</span>
              </div>
            </div>

            {/* 5. Communication */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-purple-200">Interview Communication & HR</span>
                <span className="font-mono text-[#FFD000] font-bold">{scores.communication}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="99"
                value={scores.communication}
                onChange={(e) => updateScore('communication', parseInt(e.target.value))}
                className="w-full accent-[#FFD000] h-2 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-purple-400">
                <span>Basic English</span>
                <span>STAR Method Fluency</span>
              </div>
            </div>

          </div>

          {/* CENTER: SVG Radar Visualization (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#150E28] border border-purple-800/80 shadow-2xl relative">
            <div className="absolute top-3 right-3">
              <ThreeDIconBadge toolKey="aptitudeGear" size="sm" />
            </div>

            <div className="text-center mb-2">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Placement Radar Map</span>
              <h4 className="text-sm font-bold text-white">Skill Shape Vector</h4>
            </div>

            {/* SVG Polygon Radar */}
            <div className="relative w-[280px] h-[280px]">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                {/* Concentric Pentagons for 25%, 50%, 75%, 100% */}
                {[0.25, 0.5, 0.75, 1.0].map((level, i) => {
                  const points = [0, 1, 2, 3, 4]
                    .map((idx) => {
                      const coord = getCoordinates(level * 100, idx);
                      return `${coord.x},${coord.y}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={i}
                      points={points}
                      fill="none"
                      stroke="rgba(168, 85, 247, 0.25)"
                      strokeWidth="1"
                      strokeDasharray={level === 1 ? 'none' : '3 3'}
                    />
                  );
                })}

                {/* Axis lines */}
                {[0, 1, 2, 3, 4].map((idx) => {
                  const outer = getCoordinates(100, idx);
                  return (
                    <line
                      key={idx}
                      x1={center}
                      y1={center}
                      x2={outer.x}
                      y2={outer.y}
                      stroke="rgba(168, 85, 247, 0.3)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* The Filled Active Radar Polygon */}
                <polygon
                  points={radarPolygonPoints}
                  fill="rgba(255, 208, 0, 0.25)"
                  stroke="#FFD000"
                  strokeWidth="2.5"
                  className="transition-all duration-300 ease-out"
                />

                {/* Radar Vertex Points */}
                {[
                  getCoordinates(scores.dsa, 0),
                  getCoordinates(scores.aptitude, 1),
                  getCoordinates(scores.coreCs, 2),
                  getCoordinates(scores.systemDesign, 3),
                  getCoordinates(scores.communication, 4)
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="4"
                    fill="#FFD000"
                    stroke="#120B24"
                    strokeWidth="2"
                  />
                ))}

                {/* Labels around the perimeter */}
                <text x="150" y="22" textAnchor="middle" fill="#E9D5FF" fontSize="10" fontWeight="bold">DSA</text>
                <text x="272" y="115" textAnchor="middle" fill="#E9D5FF" fontSize="10" fontWeight="bold">Aptitude</text>
                <text x="228" y="278" textAnchor="middle" fill="#E9D5FF" fontSize="10" fontWeight="bold">Core CS</text>
                <text x="72" y="278" textAnchor="middle" fill="#E9D5FF" fontSize="10" fontWeight="bold">System</text>
                <text x="28" y="115" textAnchor="middle" fill="#E9D5FF" fontSize="10" fontWeight="bold">Soft Skill</text>
              </svg>
            </div>

            {/* Composite Index Metric */}
            <div className="mt-3 flex items-center gap-3 px-4 py-2 rounded-xl bg-purple-950/70 border border-purple-700/60">
              <span className="text-xs text-purple-300">Composite Readiness:</span>
              <span className="text-base font-black font-mono text-[#FFD000]">{compositeIndex} / 100</span>
            </div>
          </div>

          {/* RIGHT: Predicted CTC & Company Cutoff Match (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Predicted CTC Card */}
            <div className="p-5 rounded-2xl bg-[#170F2C] border border-purple-700/60 shadow-xl space-y-3">
              <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider flex items-center justify-between">
                <span>Predicted CTC Band</span>
                <TrendingUp className="w-3.5 h-3.5 text-[#FFD000]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">
                {predictedCtc}
              </div>
              <div className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${tierColor}`}>
                {tierBadge}
              </div>
            </div>

            {/* Company Match Probabilities */}
            <div className="p-4 rounded-2xl bg-[#170F2C] border border-purple-700/60 shadow-xl space-y-3">
              <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                Hiring Clearing Odds
              </div>
              <div className="space-y-2.5">
                {companyOdds.map((co) => (
                  <div key={co.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-200 font-medium truncate max-w-[150px]">{co.name}</span>
                      <span className="font-mono text-[#FFD000] font-bold">{co.prob}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-purple-950 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          co.prob >= 80 ? 'bg-[#FFD000]' : co.prob >= 60 ? 'bg-purple-400' : 'bg-purple-600'
                        }`}
                        style={{ width: `${co.prob}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Targeted Sprint button */}
            {onStartCustomSprint && (
              <button
                onClick={() => onStartCustomSprint(activePreset)}
                className="w-full py-3 rounded-xl bg-[#FFD000] hover:bg-[#F0C400] text-purple-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 transition-all cursor-pointer hover:scale-105"
              >
                <span>Generate 14-Day Sprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
