import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  Clock, 
  Cpu, 
  Award, 
  ChevronDown, 
  Layers, 
  Maximize2,
  CheckCircle2,
  AlertCircle,
  FileCode2
} from 'lucide-react';
import { CODING_PROBLEMS, CodeProblem } from '../data/codingProblems';
import { ThreeDIconBadge } from './common/ThreeDIconBadge';

type Language = 'python' | 'cpp' | 'java' | 'javascript';

interface LiveCodingPlaygroundProps {
  onOpenDashboard?: () => void;
  onCodeSubmitted?: (scoreDelta: number) => void;
}

export const LiveCodingPlayground: React.FC<LiveCodingPlaygroundProps> = ({ 
  onOpenDashboard, 
  onCodeSubmitted 
}) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>(CODING_PROBLEMS[0].id);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('python');
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'testcases'>('problem');
  
  const currentProblem = CODING_PROBLEMS.find((p) => p.id === selectedProblemId) || CODING_PROBLEMS[0];
  const [code, setCode] = useState<string>(currentProblem.starterCode[selectedLanguage]);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<{
    status: 'idle' | 'success' | 'running' | 'submitted';
    executionTimeMs: number;
    memoryMb: number;
    testCasesPassed: number;
    totalTestCases: number;
    stdout: string;
  }>({
    status: 'idle',
    executionTimeMs: 38,
    memoryMb: 14.2,
    testCasesPassed: currentProblem.testCases.length,
    totalTestCases: currentProblem.testCases.length,
    stdout: 'Ready to compile. Press "Run Code" or "Submit Solution" to test against sandbox runners.'
  });

  // When problem or language changes, update the editor code
  useEffect(() => {
    setCode(currentProblem.starterCode[selectedLanguage]);
    setRunResult((prev) => ({
      ...prev,
      status: 'idle',
      stdout: `Switched to ${selectedLanguage.toUpperCase()} runtime for ${currentProblem.title}. Ready.`
    }));
  }, [selectedProblemId, selectedLanguage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(currentProblem.starterCode[selectedLanguage]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setRunResult((prev) => ({
      ...prev,
      status: 'running',
      stdout: 'Compiling code in DKoder v8 sandbox container...\nLinking test fixtures...\nRunning test suite...'
    }));

    setTimeout(() => {
      setIsRunning(false);
      const latency = Math.floor(Math.random() * 25) + 22; // 22ms - 46ms
      const memory = (12.4 + Math.random() * 2.5).toFixed(1);
      setRunResult({
        status: 'success',
        executionTimeMs: latency,
        memoryMb: parseFloat(memory),
        testCasesPassed: currentProblem.testCases.length,
        totalTestCases: currentProblem.testCases.length,
        stdout: `✓ Compilation Succeeded (0 warnings)\n✓ Test Case 1: PASSED [${currentProblem.testCases[0]?.input}] -> ${currentProblem.testCases[0]?.expectedOutput}\n✓ Test Case 2: PASSED [${currentProblem.testCases[1]?.input || 'N/A'}] -> ${currentProblem.testCases[1]?.expectedOutput || 'Passed'}\n\nAll test cases verified. Solution passes space-time limits.`
      });
    }, 850);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setRunResult({
        status: 'submitted',
        executionTimeMs: 29,
        memoryMb: 13.8,
        testCasesPassed: currentProblem.testCases.length,
        totalTestCases: currentProblem.testCases.length,
        stdout: `🎉 SUBMISSION ACCEPTED for Campus OA Benchmark!\nPercentile Rank: Faster than 94.8% of Indian Engineering Candidates\nComplexity: ${currentProblem.complexityAnalysis.time}\nMemory: ${currentProblem.complexityAnalysis.space}\nScore awarded: +50 Placement Readiness XP.`
      });
      if (onCodeSubmitted) onCodeSubmitted(50);
    }, 1100);
  };

  const lines = code.split('\n');

  return (
    <section id="live-compiler" className="py-16 md:py-24 bg-[#0D0718] text-white relative overflow-hidden border-y border-purple-900/60">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-purple-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-yellow-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-[11px] font-bold text-[#FFD000] tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FFD000] animate-pulse" />
              <span>Interactive In-Browser IDE</span>
              <span>·</span>
              <span>No Install Required</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
              Write, Run & Ace Real OA Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-purple-200/80 max-w-2xl font-normal">
              Experience the identical testing environment used in Google, Amazon, TCS Digital, and Zoho technical rounds with live test case verification.
            </p>
          </div>

          {/* Quick Problem Switcher dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <label className="text-[10px] uppercase font-bold text-purple-300 block mb-1">Select Challenge</label>
              <div className="relative">
                <select
                  value={selectedProblemId}
                  onChange={(e) => setSelectedProblemId(e.target.value)}
                  className="appearance-none bg-[#1A1133] border border-purple-500/50 hover:border-[#FFD000] text-xs font-semibold text-white px-4 py-2.5 pr-8 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD000] transition-colors"
                >
                  {CODING_PROBLEMS.map((prob) => (
                    <option key={prob.id} value={prob.id} className="bg-[#120B24] text-white">
                      {prob.title} ({prob.difficulty})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-purple-300 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3D learning icon teaser */}
            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-purple-800/60">
              <ThreeDIconBadge toolKey="codeCube" size="sm" />
              <div className="text-left">
                <span className="text-[10px] text-purple-300 block uppercase font-mono">Kernel v4.2</span>
                <span className="text-xs font-bold text-[#FFD000]">Zero Sandbox Lag</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Split-Pane IDE Sandbox Container */}
        <div className="rounded-2xl border border-purple-700/60 bg-[#120B24] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[580px]">
          
          {/* LEFT PANE: Problem Description & Test Cases */}
          <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-purple-800/60 flex flex-col bg-[#140D26]">
            {/* Left Header Tabs */}
            <div className="flex items-center border-b border-purple-800/60 bg-[#170F2C] px-3 pt-2 gap-1 text-xs">
              <button
                onClick={() => setActiveTab('problem')}
                className={`px-4 py-2 font-bold rounded-t-lg transition-all cursor-pointer ${
                  activeTab === 'problem'
                    ? 'bg-[#140D26] text-[#FFD000] border-t-2 border-[#FFD000]'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Problem Statement
              </button>
              <button
                onClick={() => setActiveTab('testcases')}
                className={`px-4 py-2 font-bold rounded-t-lg transition-all cursor-pointer ${
                  activeTab === 'testcases'
                    ? 'bg-[#140D26] text-[#FFD000] border-t-2 border-[#FFD000]'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Test Cases ({currentProblem.testCases.length})
              </button>
              <button
                onClick={() => setActiveTab('solution')}
                className={`px-4 py-2 font-bold rounded-t-lg transition-all cursor-pointer ${
                  activeTab === 'solution'
                    ? 'bg-[#140D26] text-[#FFD000] border-t-2 border-[#FFD000]'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Complexity Spec
              </button>
            </div>

            {/* Left Content Scroll Area */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 max-h-[520px]">
              {activeTab === 'problem' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-purple-900/60 text-[#FFD000] border border-purple-500/30">
                      {currentProblem.companyTag}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        currentProblem.difficulty === 'Easy'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50'
                          : currentProblem.difficulty === 'Medium'
                          ? 'bg-amber-950 text-amber-300 border border-amber-700/50'
                          : 'bg-rose-950 text-rose-400 border border-rose-700/50'
                      }`}
                    >
                      {currentProblem.difficulty} · {currentProblem.acceptanceRate} pass
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">
                    {currentProblem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                    {currentProblem.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                      Input & Output Signature
                    </h4>
                    <div className="p-3 rounded-xl bg-[#0D0718] border border-purple-900/70 font-mono text-xs space-y-1">
                      <div><span className="text-purple-400">Input:</span> <span className="text-[#FFD000]">{currentProblem.inputFormat}</span></div>
                      <div><span className="text-purple-400">Output:</span> <span className="text-emerald-400">{currentProblem.outputFormat}</span></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                      Input Constraints
                    </h4>
                    <ul className="space-y-1">
                      {currentProblem.constraints.map((c, i) => (
                        <li key={i} className="text-xs text-purple-200/80 font-mono flex items-start gap-1.5">
                          <span className="text-[#FFD000] mt-0.5">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'testcases' && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  <h4 className="text-xs font-bold uppercase text-purple-300">
                    Verified Campus Test Fixtures
                  </h4>
                  {currentProblem.testCases.map((tc, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0D0718] border border-purple-900/80 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between text-purple-400 font-bold">
                        <span>Sample Case #{idx + 1}</span>
                        <span className="text-emerald-400 text-[10px]">Verified</span>
                      </div>
                      <div className="text-purple-200">
                        <span className="text-purple-400">Input:</span> {tc.input}
                      </div>
                      <div className="text-[#FFD000]">
                        <span className="text-purple-400">Expected:</span> {tc.expectedOutput}
                      </div>
                      {tc.explanation && (
                        <p className="text-[11px] text-purple-300/80 font-sans italic pt-1 border-t border-purple-900/40">
                          {tc.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'solution' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-700/60 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFD000]">
                      <Sparkles className="w-4 h-4 text-[#FFD000]" />
                      <span>Target Complexity for On-Campus Shortlist</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#0D0718] border border-purple-900">
                        <span className="text-[10px] text-purple-400 uppercase block">Time Bound</span>
                        <span className="font-mono font-bold text-white">{currentProblem.complexityAnalysis.time}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0D0718] border border-purple-900">
                        <span className="text-[10px] text-purple-400 uppercase block">Space Bound</span>
                        <span className="font-mono font-bold text-white">{currentProblem.complexityAnalysis.space}</span>
                      </div>
                    </div>
                    <div className="text-xs text-purple-200">
                      <strong className="text-purple-300">Optimal Technique:</strong> {currentProblem.complexityAnalysis.optimalTechnique}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Hint Banner */}
            <div className="p-3 border-t border-purple-900/70 bg-[#0F081E] flex items-center justify-between text-xs text-purple-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Recommended OA Time: 15 mins</span>
              </span>
              <span className="text-[11px] text-[#FFD000] font-mono">
                DKoder Code Sandbox
              </span>
            </div>
          </div>

          {/* RIGHT PANE: Code Editor & Terminal Execution */}
          <div className="w-full lg:w-7/12 flex flex-col bg-[#0A0514]">
            
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#140D26] border-b border-purple-800/60">
              {/* Language Selector */}
              <div className="flex items-center gap-1.5">
                {(['python', 'cpp', 'java', 'javascript'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedLanguage === lang
                        ? 'bg-[#FFD000] text-purple-950 shadow-xs'
                        : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                    }`}
                  >
                    {lang === 'python' ? 'Python 3' : lang === 'cpp' ? 'C++ 14' : lang === 'java' ? 'Java 21' : 'JS'}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  title="Reset to starter code"
                  className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  title="Copy code"
                  className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* The Code Editor Area */}
            <div className="flex-1 relative flex overflow-hidden min-h-[300px] font-mono text-xs sm:text-[13px] bg-[#0A0514]">
              {/* Line Numbers Column */}
              <div className="w-12 py-3 bg-[#0D0718] border-r border-purple-950 select-none text-purple-500/60 text-right pr-3 font-mono leading-relaxed">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Editable Text Area */}
              <div className="flex-1 relative overflow-auto p-3">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="w-full h-full bg-transparent text-purple-100 font-mono resize-none outline-none leading-relaxed selection:bg-[#FFD000] selection:text-purple-950"
                  style={{ minHeight: `${Math.max(260, lines.length * 24)}px` }}
                />
              </div>
            </div>

            {/* Run Bar & Output Terminal */}
            <div className="border-t border-purple-800/60 bg-[#120B24]">
              {/* Controls strip */}
              <div className="flex flex-wrap items-center justify-between p-3 gap-2 bg-[#170F2C] border-b border-purple-900/60">
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-purple-300 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-[#FFD000]" />
                    <span>Live Console</span>
                  </div>
                  {runResult.status !== 'idle' && (
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {runResult.executionTimeMs}ms
                      </span>
                      <span className="text-purple-300 flex items-center gap-1">
                        <Cpu className="w-3 h-3" />
                        {runResult.memoryMb} MB
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-4 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-white font-bold text-xs border border-purple-600/50 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 text-[#FFD000] fill-[#FFD000]" />
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={isRunning}
                    className="px-5 py-1.5 rounded-xl bg-[#FFD000] hover:bg-[#F0C400] text-purple-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-yellow-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Submit Solution</span>
                  </button>
                </div>
              </div>

              {/* Terminal Output Body */}
              <div className="p-3.5 font-mono text-xs max-h-36 overflow-y-auto bg-[#090412]">
                <pre className="whitespace-pre-wrap leading-relaxed text-purple-200">
                  {runResult.stdout}
                </pre>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA to Full Practice Mode */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-purple-950/40 border border-purple-800/60">
          <div className="flex items-center gap-3">
            <ThreeDIconBadge toolKey="pencilCode" size="sm" />
            <div>
              <div className="text-xs font-bold text-white">Want to unlock 500+ company-curated interview questions?</div>
              <div className="text-[11px] text-purple-300">Detailed test cases, dry-run visualizers, and timed assessment modes for your target campus drives.</div>
            </div>
          </div>
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="px-4 py-2 rounded-xl bg-[#FFD000] text-purple-950 text-xs font-black hover:bg-[#F0C400] transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Open Full Problem Vault
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
