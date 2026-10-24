import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { CompanyTrack, FeatureItem } from '../types';
import { ThreeDIconBadge } from './common/ThreeDIconBadge';

interface TrackModalProps {
  track: CompanyTrack | null;
  onClose: () => void;
  onEnroll: (companyName: string) => void;
}

export const TrackDetailModal: React.FC<TrackModalProps> = ({ track, onClose, onEnroll }) => {
  const [activeTab, setActiveTab] = useState<'rounds' | 'sample' | 'syllabus'>('rounds');
  const [showSolution, setShowSolution] = useState(false);

  if (!track) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-purple-200 text-neutral-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="track-modal-title"
      >
        {/* Header Banner */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#FAF7FF] border-b border-purple-200">
          <div className="flex items-center gap-3.5">
            <ThreeDIconBadge toolKey="codeCube" size="md" showGlow={true} />
            <div>
              <div className="flex items-center gap-2">
                <h3 id="track-modal-title" className="text-xl font-bold text-neutral-900 font-display">
                  {track.name} Preparation Track
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
                  {track.badge}
                </span>
              </div>
              <p className="text-sm text-neutral-600">
                Target Role: <span className="font-semibold text-neutral-900">{track.role}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-neutral-500 rounded-lg hover:bg-purple-100 hover:text-purple-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Meta Strip */}
        <div className="grid grid-cols-3 gap-3 px-6 py-3.5 bg-purple-50/50 border-b border-purple-100 text-xs">
          <div>
            <span className="text-purple-700 block font-medium">Preparation Time</span>
            <span className="font-bold text-neutral-900">{track.preparationWeeks} Weeks Recommended</span>
          </div>
          <div>
            <span className="text-purple-700 block font-medium">Curated Questions</span>
            <span className="font-bold text-neutral-900">{track.questionsCount} Company Problems</span>
          </div>
          <div>
            <span className="text-purple-700 block font-medium">Difficulty Profile</span>
            <span className="font-bold text-neutral-900">{track.difficulty} Coding Standard</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-purple-100 px-6 pt-3 gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('rounds')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'rounds' ? 'text-purple-950 font-bold' : 'text-neutral-500 hover:text-purple-900'
            }`}
          >
            Hiring Rounds ({track.rounds.length})
            {activeTab === 'rounds' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD000]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('sample')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'sample' ? 'text-purple-950 font-bold' : 'text-neutral-500 hover:text-purple-900'
            }`}
          >
            Sample Placement Problem
            {activeTab === 'sample' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD000]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'syllabus' ? 'text-purple-950 font-bold' : 'text-neutral-500 hover:text-purple-900'
            }`}
          >
            Focus Topics
            {activeTab === 'syllabus' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD000]" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'rounds' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600 mb-2">
                Typical recruitment stages documented from recent campus drives for {track.name}:
              </p>
              <div className="space-y-3">
                {track.rounds.map((round) => (
                  <div key={round.round} className="p-4 rounded-xl border border-purple-100 bg-[#FAF7FF]/50 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#120B24] text-[#FFD000] text-xs font-black flex items-center justify-center">
                          {round.round}
                        </span>
                        <h4 className="font-bold text-neutral-900 text-sm">{round.title}</h4>
                      </div>
                      <span className="text-xs font-mono bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded font-semibold">
                        {round.format}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 pl-8 leading-relaxed">
                      {round.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sample' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">{track.sampleQuestion.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-purple-700 mt-1 font-semibold">
                    <span>{track.sampleQuestion.category}</span>
                    <span>·</span>
                    <span className="text-amber-600">{track.sampleQuestion.difficulty}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-sm text-neutral-800 leading-relaxed font-sans">
                {track.sampleQuestion.problemStatement}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#0F0822] text-neutral-100 border border-purple-900">
                  <span className="text-purple-300 block mb-1 font-sans text-xs">Sample Input:</span>
                  <code>{track.sampleQuestion.sampleInput}</code>
                </div>
                <div className="p-3 rounded-lg bg-[#0F0822] text-[#FFD000] border border-purple-900">
                  <span className="text-purple-300 block mb-1 font-sans text-xs">Sample Output:</span>
                  <code>{track.sampleQuestion.sampleOutput}</code>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-xs font-bold text-purple-800 underline hover:text-purple-950 transition-colors cursor-pointer"
                >
                  {showSolution ? 'Hide Solution Approach' : 'View Recommended Approach & Time Complexity'}
                </button>
                {showSolution && (
                  <div className="mt-2 p-3.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-950 leading-relaxed">
                    <p className="font-bold mb-1">Algorithmic Insight:</p>
                    {track.sampleQuestion.solutionApproach}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Core subjects and patterns tested heavily in {track.name} technical assessments:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {track.topics.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-sm font-semibold text-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7FF] border border-purple-200 text-xs text-purple-950">
                <p className="font-bold mb-1">Preparation Note:</p>
                DKoder tracks include topic-level diagnostic tests so you only spend time on your weakest algorithms.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7FF] border-t border-purple-200">
          <p className="text-xs text-neutral-500">
            Includes full test suite and sectional mock tests.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll(track.name);
              }}
              className="px-5 py-2 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-yellow-500/20 cursor-pointer"
            >
              Start {track.name} Practice
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureModalProps {
  feature: FeatureItem | null;
  onClose: () => void;
  onAction: () => void;
}

export const FeatureDetailModal: React.FC<FeatureModalProps> = ({ feature, onClose, onAction }) => {
  if (!feature) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-purple-200 text-neutral-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-modal-title"
      >
        <div className="flex items-center justify-between px-6 py-5 bg-[#FAF7FF] border-b border-purple-200">
          <div className="flex items-center gap-4">
            <ThreeDIconBadge toolKey={get3DToolKey(feature.iconName)} size="lg" floating={true} />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  Feature Overview
                </span>
                <span className="text-[10px] font-mono font-bold bg-[#FFD000]/20 text-purple-950 px-2 py-0.5 rounded border border-[#FFD000]/50">
                  Interactive 3D Tool
                </span>
              </div>
              <h3 id="feature-modal-title" className="text-xl font-bold text-neutral-900 font-display">
                {feature.title}
              </h3>
              <p className="text-xs text-purple-700 font-semibold">{feature.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-neutral-500 rounded-lg hover:bg-purple-100 hover:text-purple-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-neutral-700 leading-relaxed">
            {feature.description}
          </p>

          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              Curriculum & Coverage
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {feature.keyTopics.map((topic, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-50/50 border border-purple-100 text-xs font-semibold text-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F0822] text-neutral-100 font-mono text-xs border border-purple-900">
            <span className="text-[#FFD000] block mb-1 text-[11px] font-sans font-bold">
              Live Preview: {feature.interactivePreview.title}
            </span>
            <pre className="overflow-x-auto p-2 bg-[#0A0518] rounded text-purple-100 text-xs">
              {feature.interactivePreview.sampleSnippet}
            </pre>
            <p className="mt-2 text-purple-300 font-sans text-xs">
              {feature.interactivePreview.detail}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7FF] border-t border-purple-200">
          <span className="text-xs text-neutral-500">Free diagnostic questions available</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onAction();
              }}
              className="px-5 py-2 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-yellow-500/20 cursor-pointer"
            >
              {feature.ctaText}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'student' | 'college';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultRole = 'student' }) => {
  const [role, setRole] = useState<'student' | 'college'>(defaultRole);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [targetCompany, setTargetCompany] = useState('Amazon');
  const [gradYear, setGradYear] = useState('2026');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-200 text-neutral-900 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7FF] border-b border-purple-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#120B24] text-[#FFD000] font-bold flex items-center justify-center text-xs font-mono border border-purple-900 shadow-2xs">
              D&lt;&gt;
            </div>
            <h3 id="auth-modal-title" className="text-lg font-bold text-neutral-900 font-display">
              {role === 'student' ? 'Student Placement Portal' : 'College TPO Portal'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            aria-label="Close login dialog"
            className="p-1.5 text-neutral-500 rounded-lg hover:bg-purple-100 hover:text-purple-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto border border-purple-200">
              <CheckCircle2 className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-neutral-900">Welcome to DKoder!</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                We've activated placement readiness track for <span className="font-semibold text-neutral-900">{email}</span>. Check your inbox for your baseline diagnostic test link.
              </p>
            </div>
            <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs text-left space-y-1">
              <div className="flex justify-between text-neutral-600">
                <span>Target:</span>
                <span className="font-bold text-purple-950">{targetCompany} Placement Track</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Batch Year:</span>
                <span className="font-bold text-purple-950">{gradYear} Graduate</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Diagnostic Status:</span>
                <span className="text-purple-700 font-bold">Ready to begin</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg transition-colors shadow-md shadow-yellow-500/20 cursor-pointer"
            >
              Continue to Practice Workspace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-purple-50 rounded-lg text-xs font-bold border border-purple-100">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-1.5 rounded-md transition-colors cursor-pointer ${
                  role === 'student' ? 'bg-white text-purple-950 shadow-xs' : 'text-neutral-600 hover:text-purple-950'
                }`}
              >
                Student Learner
              </button>
              <button
                type="button"
                onClick={() => setRole('college')}
                className={`py-1.5 rounded-md transition-colors cursor-pointer ${
                  role === 'college' ? 'bg-white text-purple-950 shadow-xs' : 'text-neutral-600 hover:text-purple-950'
                }`}
              >
                College / TPO
              </button>
            </div>

            <div>
              <label htmlFor="auth-name" className="block text-xs font-semibold text-neutral-700 mb-1">
                Full Name
              </label>
              <input
                id="auth-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'student' ? 'e.g. Priyanshu Sharma' : 'e.g. Dr. Ramesh Kumar (TPO)'}
                className="w-full px-3.5 py-2 text-sm bg-purple-50/40 border border-purple-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white text-neutral-900"
              />
            </div>

            <div>
              <label htmlFor="auth-email" className="block text-xs font-semibold text-neutral-700 mb-1">
                {role === 'student' ? 'College / Personal Email' : 'Official Institute Email'}
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'student' ? 'priyanshu@engineering.edu' : 'tpo@college.ac.in'}
                className="w-full px-3.5 py-2 text-sm bg-purple-50/40 border border-purple-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white text-neutral-900"
              />
            </div>

            {role === 'student' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="auth-target" className="block text-xs font-semibold text-neutral-700 mb-1">
                    Primary Target
                  </label>
                  <select
                    id="auth-target"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-neutral-900"
                  >
                    <option value="Amazon">Amazon SDE-1</option>
                    <option value="Google">Google SWE-1</option>
                    <option value="Microsoft">Microsoft Campus</option>
                    <option value="TCS">TCS Digital / Prime</option>
                    <option value="Zoho">Zoho Software Dev</option>
                    <option value="Infosys">Infosys Specialist</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="auth-batch" className="block text-xs font-semibold text-neutral-700 mb-1">
                    Graduation Batch
                  </label>
                  <select
                    id="auth-batch"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-neutral-900"
                  >
                    <option value="2025">2025 Batch</option>
                    <option value="2026">2026 Batch</option>
                    <option value="2027">2027 Batch</option>
                    <option value="2028">2028 Batch</option>
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="auth-inst" className="block text-xs font-semibold text-neutral-700 mb-1">
                  Institution Name
                </label>
                <input
                  id="auth-inst"
                  type="text"
                  placeholder="e.g. National Institute of Technology"
                  className="w-full px-3.5 py-2 text-sm bg-purple-50/40 border border-purple-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-neutral-900"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg transition-colors shadow-md shadow-yellow-500/20 cursor-pointer"
            >
              {role === 'student' ? 'Access Free Diagnostic Test' : 'Request TPO Institutional Access'}
            </button>

            <p className="text-[11px] text-center text-neutral-500">
              By continuing you agree to DKoder Terms of Service & Placement Code of Conduct.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
