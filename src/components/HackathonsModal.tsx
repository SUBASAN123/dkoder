import React, { useState } from 'react';
import { X, Calendar, Trophy, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface HackathonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (hackathonTitle: string) => void;
}

export const HackathonsModal: React.FC<HackathonsModalProps> = ({ isOpen, onClose, onRegister }) => {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  if (!isOpen) return null;

  const events = [
    {
      id: 'h1',
      title: 'DKoder Placement Sprint #24',
      type: 'Algorithmic Speed Challenge',
      date: 'This Saturday, 7:00 PM IST',
      duration: '2.5 Hours',
      prize: '₹25,000 + Amazon Mock Referrals',
      participants: '1,420 Registered',
      description: '4 algorithmic problems ranging from LeetCode Medium to Hard with strict memory & execution limits.'
    },
    {
      id: 'h2',
      title: 'TCS Digital National Simulation',
      type: 'Sectional NQT Speed Test',
      date: 'Next Wednesday, 6:00 PM IST',
      duration: '110 Minutes',
      prize: 'Top 100 Rankers Get Free Mentor Review',
      participants: '3,890 Registered',
      description: 'Full simulation covering Numerical Ability, Advanced Reasoning, and hands-on coding under actual exam pressure.'
    },
    {
      id: 'h3',
      title: 'Low-Level Design Hackathon',
      type: 'Console Architecture Sprint',
      date: 'Oct 31, 10:00 AM IST',
      duration: '4 Hours',
      prize: '₹35,000 Prize Pool',
      participants: '810 Registered',
      description: 'Design and implement a working OOP engine for a Ride Sharing or Smart Locker system without third-party frameworks.'
    }
  ];

  const handleRegisterEvent = (title: string) => {
    if (!registeredEvents.includes(title)) {
      setRegisteredEvents([...registeredEvents, title]);
    }
    onRegister(title);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-purple-200 text-neutral-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hackathon-modal-title"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7FF] border-b border-purple-200">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FFD000]" />
            <h3 id="hackathon-modal-title" className="text-lg font-bold text-neutral-900 font-display">
              Live Placement Contests & Hackathons
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 rounded-lg hover:bg-purple-100 hover:text-purple-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-neutral-600 leading-relaxed">
            Test your problem solving under real competition pressure. Compete against students from top engineering campuses across India.
          </p>

          <div className="space-y-3">
            {events.map((event) => {
              const isReg = registeredEvents.includes(event.title);
              return (
                <div
                  key={event.id}
                  className="p-4 rounded-xl border border-purple-200 bg-[#FAF7FF]/50 hover:bg-white hover:border-purple-400 transition-all shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-900 font-display">
                          {event.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-purple-100 text-purple-900 border border-purple-300 font-semibold">
                          {event.type}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-100 text-xs">
                    <div className="flex items-center gap-4 text-purple-700">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {event.duration}
                      </span>
                      <span className="text-neutral-900 font-bold hidden sm:inline">
                        {event.prize}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRegisterEvent(event.title)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isReg
                          ? 'bg-purple-100 text-purple-900 border border-purple-300'
                          : 'bg-[#120B24] text-[#FFD000] hover:bg-[#1C1236] shadow-xs'
                      }`}
                    >
                      {isReg ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Registered</span>
                        </>
                      ) : (
                        <>
                          <span>Register Free</span>
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-4 bg-[#FAF7FF] border-t border-purple-200 flex items-center justify-between text-xs text-neutral-500">
          <span>Weekly contests feature proctoring & plagiarism checks.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
