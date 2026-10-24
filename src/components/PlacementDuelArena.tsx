import React, { useState, useEffect } from 'react';
import { 
  Swords, 
  Flame, 
  Trophy, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Zap,
  Users,
  ShieldCheck
} from 'lucide-react';
import { ThreeDIconBadge } from './common/ThreeDIconBadge';

interface DuelQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

const DUEL_QUESTIONS: DuelQuestion[] = [
  {
    id: 1,
    question: 'What is the time complexity of searching an element in a Balanced AVL Tree with N elements in worst case?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctIndex: 1,
    explanation: 'An AVL tree strictly maintains height balance with factor in {-1, 0, 1}, guaranteeing O(log N) lookup.',
    topic: 'TCS Digital / Amazon SDE'
  },
  {
    id: 2,
    question: 'What will be printed by this C snippet: int a = 5; printf("%d %d", a++, ++a); (assuming right-to-left evaluation)?',
    options: ['5 7', '6 6', '6 7', 'Undefined / Compiler Dependent'],
    correctIndex: 3,
    explanation: 'Modifying a variable multiple times without a sequence point invokes undefined behavior in C/C++ ANSI standard.',
    topic: 'Zoho / Cognizant Technical'
  },
  {
    id: 3,
    question: 'In a round-robin scheduling algorithm, what happens if the time quantum is set to be excessively large?',
    options: [
      'It degrades to First-Come-First-Served (FCFS)',
      'It degrades to Shortest Job Next (SJN)',
      'Context switches increase exponentially',
      'System enters a guaranteed deadlock'
    ],
    correctIndex: 0,
    explanation: 'If quantum exceeds the burst time of all processes, each process runs to completion, exactly identical to FCFS.',
    topic: 'Infosys SP / Core OS'
  }
];

const OPPONENTS = [
  { name: 'Rohan Verma', college: 'IIT Kharagpur', rating: '2140', avatarBg: 'bg-emerald-600' },
  { name: 'Pooja Iyer', college: 'NIT Trichy', rating: '2085', avatarBg: 'bg-blue-600' },
  { name: 'Aditya Sen', college: 'VIT Vellore', rating: '1995', avatarBg: 'bg-purple-600' },
  { name: 'Megha Reddy', college: 'BITS Pilani', rating: '2190', avatarBg: 'bg-amber-600' }
];

export const PlacementDuelArena: React.FC = () => {
  const [matchState, setMatchState] = useState<'idle' | 'searching' | 'battling' | 'finished'>('idle');
  const [opponent, setOpponent] = useState(OPPONENTS[0]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(25);
  const [streak, setStreak] = useState(0);

  // Timer effect when battling
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (matchState === 'battling' && timeLeft > 0 && selectedOption === null) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && selectedOption === null && matchState === 'battling') {
      // Time expired for this question
      handleOptionSelect(-1);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, matchState, selectedOption]);

  const handleStartMatch = () => {
    setMatchState('searching');
    setUserScore(0);
    setOpponentScore(0);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setStreak(0);
    setTimeLeft(25);

    // Pick random opponent
    const randomOpp = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
    setOpponent(randomOpp);

    setTimeout(() => {
      setMatchState('battling');
    }, 1400);
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    const currentQ = DUEL_QUESTIONS[currentQIndex];
    const isCorrect = index === currentQ.correctIndex;

    // User score calculation with time bonus
    let earnedPoints = 0;
    if (isCorrect) {
      earnedPoints = 100 + timeLeft * 5 + streak * 20;
      setUserScore((prev) => prev + earnedPoints);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    // Opponent random accuracy (75% probability of getting it right)
    const opponentCorrect = Math.random() < 0.75;
    if (opponentCorrect) {
      const oppEarned = 100 + Math.floor(Math.random() * 15) * 5;
      setOpponentScore((prev) => prev + oppEarned);
    }

    // Move to next question after 1.8 seconds
    setTimeout(() => {
      if (currentQIndex < DUEL_QUESTIONS.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedOption(null);
        setTimeLeft(25);
      } else {
        setMatchState('finished');
      }
    }, 1800);
  };

  const currentQ = DUEL_QUESTIONS[currentQIndex];

  return (
    <section id="duel-arena" className="py-16 md:py-24 bg-[#0A0514] text-white relative overflow-hidden border-b border-purple-900/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-950/60 border border-yellow-500/40 text-[11px] font-bold text-[#FFD000] uppercase tracking-wider mb-2">
              <Swords className="w-3.5 h-3.5 text-[#FFD000]" />
              <span>Gamified Placement Arena</span>
              <span>·</span>
              <span>1-on-1 Speed Battle</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              Campus Placement Duel
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
              Battle live with engineering peers from across India under authentic 25-second OA time constraints.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ThreeDIconBadge toolKey="examShield" size="sm" />
            <div className="text-left font-mono">
              <div className="text-[10px] text-purple-400 uppercase">Season 4 Leaderboard</div>
              <div className="text-xs font-bold text-[#FFD000]">Top 500 Campus Knights</div>
            </div>
          </div>
        </div>

        {/* Battle Arena Wrapper */}
        <div className="rounded-2xl border border-purple-700/60 bg-[#120B24] p-6 shadow-2xl relative">
          
          {/* STATE 1: IDLE */}
          {matchState === 'idle' && (
            <div className="py-12 px-4 text-center max-w-lg mx-auto space-y-5 animate-in fade-in duration-200">
              <div className="w-20 h-20 rounded-2xl bg-purple-900/40 border border-purple-500/40 mx-auto flex items-center justify-center text-[#FFD000] shadow-xl">
                <Swords className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Ready for a Live Placement Duel?</h3>
                <p className="text-xs text-purple-200/80 mt-2">
                  Match with a candidate from another Indian university. Answer 3 rapid aptitude and coding MCQs. Earn Placement XP and climb the campus rank table.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-purple-300">
                <span className="flex items-center gap-1.5"><Timer className="w-3.5 h-3.5 text-[#FFD000]" /> 25s per question</span>
                <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-rose-400" /> Streak bonus XP</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Anti-cheat verified</span>
              </div>

              <button
                onClick={handleStartMatch}
                className="px-8 py-3.5 rounded-xl bg-[#FFD000] hover:bg-[#F0C400] text-purple-950 font-black text-sm flex items-center justify-center gap-2 mx-auto shadow-xl shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-purple-950" />
                <span>Find Live Opponent Now</span>
              </button>
            </div>
          )}

          {/* STATE 2: SEARCHING */}
          {matchState === 'searching' && (
            <div className="py-16 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full border-4 border-[#FFD000] border-t-transparent animate-spin mx-auto" />
              <h3 className="text-lg font-bold text-white">Searching Campus Queue...</h3>
              <p className="text-xs text-purple-300 font-mono">Connecting with candidates currently online across Tier 1 & Tier 2 colleges</p>
            </div>
          )}

          {/* STATE 3: BATTLING */}
          {matchState === 'battling' && currentQ && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Score & Opponent Header Bar */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A1133] border border-purple-800/80">
                {/* You */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFD000] text-purple-950 font-black flex items-center justify-center text-sm shadow-md">
                    YOU
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-purple-300 uppercase font-bold block">Your Score</span>
                    <span className="font-mono font-black text-lg text-[#FFD000]">{userScore} PTS</span>
                  </div>
                </div>

                {/* Center Timer & Round */}
                <div className="text-center font-mono">
                  <span className="text-[10px] text-purple-300 uppercase block">Q {currentQIndex + 1} of 3</span>
                  <div className="flex items-center justify-center gap-1.5 text-lg font-black text-white">
                    <Timer className={`w-4 h-4 ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-[#FFD000]'}`} />
                    <span className={timeLeft <= 5 ? 'text-rose-400 font-bold' : 'text-white'}>{timeLeft}s</span>
                  </div>
                </div>

                {/* Opponent */}
                <div className="flex items-center gap-3 text-right">
                  <div className="text-right">
                    <span className="text-[10px] text-purple-300 uppercase font-bold block">{opponent.name}</span>
                    <span className="font-mono font-black text-lg text-purple-200">{opponentScore} PTS</span>
                  </div>
                  <div className={`w-10 h-10 rounded-full ${opponent.avatarBg} text-white font-bold flex items-center justify-center text-xs shadow-md`}>
                    {opponent.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                </div>
              </div>

              {/* Progress bar for timer */}
              <div className="w-full h-1.5 bg-purple-950 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    timeLeft <= 5 ? 'bg-rose-500' : 'bg-[#FFD000]'
                  }`}
                  style={{ width: `${(timeLeft / 25) * 100}%` }}
                />
              </div>

              {/* The Question Box */}
              <div className="p-5 rounded-xl bg-[#0D0718] border border-purple-900/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                  <span>Topic: {currentQ.topic}</span>
                  {streak > 1 && (
                    <span className="text-amber-400 flex items-center gap-1 font-bold">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" />
                      {streak}x Streak Combo!
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  const showResult = selectedOption !== null;

                  let btnStyle = 'bg-[#170F2C] border-purple-800/80 text-purple-100 hover:border-[#FFD000]';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-white font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-white font-bold';
                    } else {
                      btnStyle = 'bg-[#120B24] border-purple-950 text-purple-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(idx)}
                      className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Post-answer explanation */}
              {selectedOption !== null && (
                <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-700/60 text-xs text-purple-200 animate-in fade-in duration-150">
                  <span className="font-bold text-[#FFD000] block mb-0.5">Placement Answer Insight:</span>
                  {currentQ.explanation}
                </div>
              )}

            </div>
          )}

          {/* STATE 4: FINISHED */}
          {matchState === 'finished' && (
            <div className="py-8 px-4 text-center max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-[#FFD000] text-purple-950 mx-auto flex items-center justify-center font-black shadow-xl">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black font-display text-white">
                  {userScore >= opponentScore ? 'Victory! Placement Duel Won!' : 'Battle Complete! Good Effort!'}
                </h3>
                <p className="text-xs text-purple-200 mt-1">
                  You faced {opponent.name} from {opponent.college}.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#1A1133] border border-purple-800/80">
                <div>
                  <span className="text-[10px] text-purple-300 uppercase block">Your Score</span>
                  <span className="text-xl font-black font-mono text-[#FFD000]">{userScore} PTS</span>
                </div>
                <div>
                  <span className="text-[10px] text-purple-300 uppercase block">{opponent.name}</span>
                  <span className="text-xl font-black font-mono text-purple-200">{opponentScore} PTS</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-700/60 text-xs text-purple-200 font-mono">
                +120 Placement Rating XP awarded to your DKoder student profile!
              </div>

              <button
                onClick={handleStartMatch}
                className="px-6 py-3 rounded-xl bg-[#FFD000] hover:bg-[#F0C400] text-purple-950 font-black text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer transition-all hover:scale-105"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rematch Another Opponent</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
