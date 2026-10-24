import React, { useState } from 'react';
import {
  Boxes,
  Activity,
  GraduationCap,
  Tv,
  Trophy,
  FolderGit2,
  Folder,
  Bookmark,
  Crown,
  Settings,
  Flame,
  Zap,
  Award,
  Search,
  Grid,
  List,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Play,
  RotateCcw,
  User,
  SlidersHorizontal,
  Home,
  Calendar,
  Clock,
  Download,
  Users,
  Eye,
  Github,
  BookOpen,
  Sparkles,
  Send,
  Check
} from 'lucide-react';
import { MCQ_MODULES_DATA, PREPARATION_BUNDLES_LIST, INITIAL_USER_PROGRESS } from '../../data/dashboardData';
import {
  HACKATHONS_DATA,
  WEBINARS_DATA,
  PROJECTS_DATA,
  RESOURCES_DATA,
  LEADERBOARD_STUDENTS,
  HackathonItem,
  WebinarItem,
  ProjectItem,
  ResourceItem
} from '../../data/hackathonsAndEventsData';
import { MCQModule, UserProgress } from '../../types/dashboard';
import { InteractiveQuizModal } from './InteractiveQuizModal';
import hackathonArenaImg from '../../assets/images/hackathon_battle_arena_1792741487659.jpg';
import webinarSpeakerImg from '../../assets/images/webinar_tech_speaker_1792741488399.jpg';
import { ThreeDIconBadge } from '../common/ThreeDIconBadge';
import { LEARNING_TOOLS_3D } from '../../data/learningIcons';

interface StudentDashboardProps {
  onBackToLanding: () => void;
  onUpgradePlan: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onBackToLanding,
  onUpgradePlan
}) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<
    'progress' | 'bundles' | 'courses' | 'events' | 'hackathons' | 'projects' | 'resources' | 'learning' | 'subscription' | 'settings'
  >('progress');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // User Progress State
  const [userProgress, setUserProgress] = useState<UserProgress>(INITIAL_USER_PROGRESS);
  const [modulesList, setModulesList] = useState<MCQModule[]>(MCQ_MODULES_DATA);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'not_started' | 'completed'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Interactive Quiz Runner State
  const [activeQuizModule, setActiveQuizModule] = useState<MCQModule | null>(null);

  const getToolKeyForCategory = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'dsa':
        return 'codeCube';
      case 'aptitude':
        return 'aptitudeGear';
      case 'company':
        return 'examShield';
      default:
        return 'pencilCode';
    }
  };

  // Hackathons & Events State
  const [hackathonsList, setHackathonsList] = useState<HackathonItem[]>(HACKATHONS_DATA);
  const [webinarsList, setWebinarsList] = useState<WebinarItem[]>(WEBINARS_DATA);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Handle Question Completion
  const handleCompleteQuestion = (moduleId: string, isCorrect: boolean) => {
    if (isCorrect) {
      setUserProgress((prev) => {
        const newXp = prev.totalXp + 20;
        const newSolved = prev.mcqsSolved + 1;
        const newStreak = prev.streak + 1;
        const newLevel = Math.floor(newXp / 300) + 1;
        const xpRemaining = 300 - (newXp % 300);

        return {
          ...prev,
          totalXp: newXp,
          mcqsSolved: newSolved,
          streak: newStreak,
          level: newLevel,
          xpToNextLevel: xpRemaining
        };
      });

      setModulesList((prev) =>
        prev.map((mod) => {
          if (mod.id === moduleId) {
            const updatedSolved = Math.min(mod.totalQuestions, mod.solvedQuestions + 1);
            const newStatus = updatedSolved >= mod.totalQuestions ? 'completed' : 'in_progress';
            return {
              ...mod,
              solvedQuestions: updatedSolved,
              status: newStatus
            };
          }
          return mod;
        })
      );
    }
  };

  // Hackathon Registration Handler
  const handleRegisterHackathon = (id: string, title: string) => {
    setHackathonsList((prev) =>
      prev.map((h) => (h.id === id ? { ...h, isRegistered: true, registeredCount: h.registeredCount + 1 } : h))
    );
    showNotification(`Registered for ${title}! Check your email for exam portal credentials.`);
  };

  // Webinar Registration Handler
  const handleRegisterWebinar = (id: string, title: string) => {
    setWebinarsList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isRegistered: true, attendeesCount: w.attendeesCount + 1 } : w))
    );
    showNotification(`Seat reserved for "${title}"! Calendar invite sent to subasan2008@gmail.com.`);
  };

  // Filtered modules calculation
  const filteredModules = modulesList.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completeCount = modulesList.filter((m) => m.status === 'completed').length;
  const inProgressCount = modulesList.filter((m) => m.status === 'in_progress').length;
  const notStartedCount = modulesList.filter((m) => m.status === 'not_started').length;
  const percentageDone = Math.round((userProgress.mcqsSolved / userProgress.totalMCQs) * 100);

  return (
    <div className="min-h-screen bg-[#FAF7FF] text-neutral-900 flex font-sans">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 bg-[#120B24] text-white text-xs font-semibold rounded-xl shadow-2xl border border-purple-700/80 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#FFD000] shadow-xs shadow-yellow-500/50" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. LEFT SIDEBAR */}
      <aside
        className={`bg-white border-r border-purple-200/80 flex flex-col justify-between shrink-0 transition-all duration-300 z-30 sticky top-0 h-screen ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="overflow-y-auto overflow-x-hidden flex-1 py-5 px-3 space-y-6">
          {/* Logo Zone */}
          <div className="flex items-center justify-between px-2">
            <button
              onClick={() => setActiveTab('progress')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#120B24] border border-purple-900/60 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <span className="font-mono font-black text-sm text-[#FFD000] tracking-tighter">
                  D&lt;&gt;
                </span>
              </div>
              {!isSidebarCollapsed && (
                <div className="flex items-center">
                  <span className="font-display font-black text-xl tracking-tight text-neutral-950">
                    Dk<span className="text-purple-700">oder</span>
                  </span>
                  <span className="ml-1 w-1.5 h-1.5 rounded-full bg-[#FFD000]" />
                </div>
              )}
            </button>
          </div>

          {/* Primary Navigation Items */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('bundles')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bundles'
                  ? 'bg-purple-900 text-white shadow-md shadow-purple-900/20'
                  : 'text-neutral-700 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="Preparation Bundles"
            >
              <Boxes className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>Preparation Bundles</span>}
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-purple-900 text-white shadow-md shadow-purple-900/20'
                  : 'text-neutral-700 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="My Progress"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>My Progress</span>}
              </div>
              {!isSidebarCollapsed && activeTab === 'progress' && (
                <span className="w-2 h-2 rounded-full bg-[#FFD000]" />
              )}
            </button>
          </div>

          {/* LEARN SECTION */}
          <div className="space-y-1 pt-2">
            {!isSidebarCollapsed && (
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-3 block mb-1">
                Learn
              </span>
            )}
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-purple-900 text-white'
                  : 'text-neutral-600 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="Courses"
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>Courses</span>}
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-purple-900 text-white'
                  : 'text-neutral-600 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="Events & Webinars"
            >
              <div className="flex items-center gap-3">
                <Tv className="w-4 h-4 shrink-0 text-purple-700" />
                {!isSidebarCollapsed && <span>Events & Webinars</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">
                  New
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('hackathons')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'hackathons'
                  ? 'bg-purple-900 text-white'
                  : 'text-neutral-600 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="Hackathons"
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 shrink-0 text-[#FFD000]" />
                {!isSidebarCollapsed && <span>Hackathons</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                  Live
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-purple-900 text-white'
                  : 'text-neutral-600 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="Final Year Projects"
            >
              <FolderGit2 className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>Final Year Projects</span>}
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-purple-900 text-white'
                  : 'text-neutral-600 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="Resources & Cheatsheets"
            >
              <Folder className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>Resources</span>}
            </button>

            <button
              onClick={() => setActiveTab('learning')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'learning'
                  ? 'bg-purple-900 text-white'
                  : 'text-neutral-600 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="My Learning"
            >
              <Bookmark className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>My Learning</span>}
            </button>
          </div>

          {/* ACCOUNT SECTION */}
          <div className="space-y-1 pt-2">
            {!isSidebarCollapsed && (
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-3 block mb-1">
                Account
              </span>
            )}
            <button
              onClick={() => setActiveTab('subscription')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'subscription'
                  ? 'bg-purple-900 text-white'
                  : 'text-neutral-600 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="Subscription"
            >
              <Crown className="w-4 h-4 shrink-0 text-amber-500" />
              {!isSidebarCollapsed && <span>Subscription</span>}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-purple-900 text-white'
                  : 'text-neutral-600 hover:bg-purple-50 hover:text-purple-950'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>Settings</span>}
            </button>
          </div>
        </div>

        {/* Bottom Plan Card & Collapse */}
        <div className="p-3 border-t border-purple-200/80 space-y-2">
          {!isSidebarCollapsed ? (
            <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="text-[10px] text-neutral-500 block">You're on</span>
                  <span className="font-bold text-purple-950">Free plan</span>
                </div>
              </div>
              <button
                onClick={onUpgradePlan}
                className="text-xs font-bold text-purple-900 hover:text-purple-950 bg-white px-2.5 py-1 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer shadow-2xs"
              >
                Upgrade
              </button>
            </div>
          ) : (
            <button
              onClick={onUpgradePlan}
              className="w-full p-2 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center cursor-pointer"
              title="Upgrade Plan"
            >
              <Crown className="w-4 h-4 text-amber-600" />
            </button>
          )}

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 py-1.5 text-xs font-semibold text-neutral-500 hover:text-purple-900 transition-colors cursor-pointer"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!isSidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-purple-200/80 px-6 flex items-center justify-between sticky top-0 z-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={onBackToLanding}
              className="text-neutral-500 hover:text-purple-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Dkoder Home</span>
            </button>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-500">Portal</span>
            <span className="text-neutral-300">/</span>
            <span className="text-purple-950 font-bold capitalize">
              {activeTab === 'events' ? 'Events & Webinars' : activeTab}
            </span>
          </div>

          {/* Gamified Status Metrics & Profile */}
          <div className="flex items-center gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900 text-white text-xs font-bold shadow-xs">
              <Flame className="w-3.5 h-3.5 fill-[#FFD000] text-[#FFD000]" />
              <span className="text-[#FFD000]">{userProgress.streak}</span>
              <span className="text-[11px] font-normal text-purple-200 hidden sm:inline">day streak</span>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900 text-white text-xs font-bold shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-[#FFD000] text-[#FFD000]" />
              <span className="text-[#FFD000]">{userProgress.totalXp}</span>
              <span className="text-[11px] font-normal text-purple-200 hidden sm:inline">total XP</span>
            </div>

            {/* Level */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900 text-white text-xs font-bold shadow-xs">
              <Award className="w-3.5 h-3.5 text-[#FFD000]" />
              <span>Level {userProgress.level}</span>
              <span className="text-[10px] text-purple-300 font-mono hidden md:inline">
                {userProgress.xpToNextLevel} XP to {userProgress.level + 1}
              </span>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-purple-200">
              <div className="w-8 h-8 rounded-full bg-[#120B24] border border-purple-300 flex items-center justify-center text-xs font-bold text-[#FFD000]">
                S
              </div>
              <div className="hidden lg:block text-left text-xs">
                <span className="font-bold text-neutral-900 block leading-tight">Subasan . S</span>
                <span className="text-[10px] text-purple-700">Student</span>
              </div>
            </div>

            {/* Quick Switcher back to Landing */}
            <button
              onClick={onBackToLanding}
              className="ml-2 px-3 py-1.5 text-xs font-bold text-purple-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>View Landing Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </header>

        {/* 3. TAB CONTENT */}
        <main className="p-6 md:p-8 space-y-8 flex-1 max-w-7xl w-full mx-auto">
          {/* ==================== 1. MY PROGRESS TAB ==================== */}
          {activeTab === 'progress' && (
            <>
              {/* Giant "My Progress" Banner */}
              <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#120B28] via-[#1A0E38] to-[#120B28] text-white shadow-xl shadow-purple-950/20 border border-purple-500/30 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-10 w-64 h-64 bg-[#FFD000]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD000] text-purple-950 text-xs font-black uppercase tracking-wider shadow-sm">
                      <Zap className="w-3.5 h-3.5 fill-purple-950 text-purple-950" />
                      <span>Practice</span>
                    </div>

                    <div>
                      <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
                        My Progress
                      </h1>
                      <p className="text-sm text-purple-200 mt-1">
                        You've solved <span className="text-[#FFD000] font-bold">{userProgress.mcqsSolved}</span> of{' '}
                        <span className="text-white font-bold">{userProgress.totalMCQs}</span> MCQs across{' '}
                        <span className="text-[#FFD000] font-bold">{userProgress.totalModules}</span> modules.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full h-2.5 bg-purple-950/80 rounded-full overflow-hidden border border-purple-800">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 via-[#FFD000] to-[#FFD000] rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.max(percentageDone, 2)}%`
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-purple-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>{completeCount} complete</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span>{inProgressCount} in progress</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-400/60" />
                          <span>{notStartedCount} not started</span>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-purple-950/70 border border-purple-800/80 text-left">
                        <div className="flex items-center gap-1.5 text-xs text-purple-300 font-semibold mb-1">
                          <Zap className="w-3.5 h-3.5 text-[#FFD000]" />
                          <span>Total XP</span>
                        </div>
                        <div className="text-2xl font-black text-white tabular-nums">
                          {userProgress.totalXp}
                        </div>
                        <span className="text-[10px] text-purple-400">Bronze rank</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-purple-950/70 border border-purple-800/80 text-left">
                        <div className="flex items-center gap-1.5 text-xs text-purple-300 font-semibold mb-1">
                          <Activity className="w-3.5 h-3.5 text-purple-300" />
                          <span>MCQs solved</span>
                        </div>
                        <div className="text-2xl font-black text-white tabular-nums">
                          {userProgress.mcqsSolved}
                        </div>
                        <span className="text-[10px] text-purple-400">{userProgress.accuracy}% accuracy</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-purple-950/70 border border-purple-800/80 text-left">
                        <div className="flex items-center gap-1.5 text-xs text-purple-300 font-semibold mb-1">
                          <span className="font-mono text-purple-300">&lt;/&gt;</span>
                          <span>Coding solved</span>
                        </div>
                        <div className="text-2xl font-black text-white tabular-nums">
                          {userProgress.codingSolved}
                        </div>
                        <span className="text-[10px] text-purple-400">100% test accuracy</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-purple-950/40 rounded-2xl border border-purple-800/60 backdrop-blur-xs">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-purple-900/80" />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray={264}
                          strokeDashoffset={264 - (264 * percentageDone) / 100}
                          strokeLinecap="round"
                          fill="transparent"
                          className="text-[#FFD000] transition-all duration-700"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-black font-display text-white tracking-tight">
                          {percentageDone}%
                        </span>
                        <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                          MCQS DONE
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 px-3 py-1 rounded-full bg-purple-900/80 border border-purple-700 text-xs font-bold text-[#FFD000] flex items-center gap-1.5">
                      <span>✨</span>
                      <span>{userProgress.xpToNextLevel} XP to Level {userProgress.level + 1}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Interactive Placement Toolbench */}
              <div className="rounded-2xl p-6 bg-white border border-purple-200/90 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFD000] ring-4 ring-[#FFD000]/30 animate-pulse" />
                    <div>
                      <h2 className="text-lg font-black font-display text-neutral-950">
                        3D Placement Toolbench
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Interactive physical learning tools designed to boost retention and campus placement speed
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/70 self-start sm:self-auto">
                    3D Haptic Visuals Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                  {[
                    {
                      key: 'pencilCode',
                      name: '3D Code Stylus',
                      category: 'Syntax & Notes',
                      desc: 'Draft and sketch algorithm dry-runs, recursion trees & time complexities.',
                      badge: 'Note-taker',
                      actionText: 'Open Core CS',
                      targetModuleId: 'mod-1'
                    },
                    {
                      key: 'codeCube',
                      name: '3D Compiler Cube',
                      category: 'DSA & Logic',
                      desc: 'Interactive runtime evaluator for arrays, graphs, trees and binary search.',
                      badge: 'DSA Engine',
                      actionText: 'Open DSA Quiz',
                      targetModuleId: 'mod-2'
                    },
                    {
                      key: 'aptitudeGear',
                      name: '3D Synapse Sphere',
                      category: 'Quantitative Speed',
                      desc: 'Master percentage tricks, speed math, syllogisms and clock gears.',
                      badge: 'Aptitude Brain',
                      actionText: 'Open Aptitude',
                      targetModuleId: 'mod-3'
                    },
                    {
                      key: 'examShield',
                      name: '3D Honor Shield',
                      category: 'Placement Mock',
                      desc: 'Simulated company rounds under strict TCS, Amazon and Google timers.',
                      badge: 'Mock Exam',
                      actionText: 'Open Mock Series',
                      targetModuleId: 'mod-5'
                    }
                  ].map((tool) => (
                    <div
                      key={tool.key}
                      className="p-4 rounded-xl bg-[#FAF7FF] border border-purple-200/70 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
                      onClick={() => {
                        const target = modulesList.find((m) => m.id === tool.targetModuleId) || modulesList[0];
                        setActiveQuizModule(target);
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <ThreeDIconBadge toolKey={tool.key} size="md" showGlow={true} />
                          <span className="text-[10px] font-mono font-bold text-purple-900 bg-white px-2 py-0.5 rounded border border-purple-200 shadow-2xs">
                            {tool.badge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold font-display text-neutral-950 group-hover:text-purple-900 transition-colors">
                          {tool.name}
                        </h4>
                        <span className="text-[11px] font-semibold text-purple-700 block mb-1.5">
                          {tool.category}
                        </span>
                        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                          {tool.desc}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-purple-200/60 flex items-center justify-between text-xs font-bold text-purple-900 group-hover:text-amber-600 transition-colors">
                        <span>{tool.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Recommendation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-purple-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
                      <span>🏁 Quick Win</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-neutral-950 mb-1">
                      Character Operations
                    </h3>
                    <p className="text-xs text-neutral-500 mb-4">
                      Module 4 · Only 1 question to finish
                    </p>
                    <div className="w-full bg-purple-100 rounded-full h-1.5 mb-6 overflow-hidden">
                      <div className="bg-[#FFD000] h-1.5 rounded-full w-[93%]" />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        const m = modulesList.find((mod) => mod.id === 'mod-4') || modulesList[1];
                        setActiveQuizModule(m);
                      }}
                      className="px-5 py-2.5 text-xs font-black text-white bg-purple-900 hover:bg-purple-950 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Finish it</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FFD000]" />
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-purple-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
                      <span>🚀 Start Fresh</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-neutral-950 mb-1">
                      C — Setup to Syntax
                    </h3>
                    <p className="text-xs text-neutral-500 mb-4">
                      Module 1 · 30 questions waiting
                    </p>
                    <div className="w-full bg-purple-100 rounded-full h-1.5 mb-6 overflow-hidden">
                      <div className="bg-purple-300 h-1.5 rounded-full w-[5%]" />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        const m = modulesList.find((mod) => mod.id === 'mod-1') || modulesList[0];
                        setActiveQuizModule(m);
                      }}
                      className="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-white hover:bg-purple-50 border border-purple-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Start</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* MCQ Modules Browser */}
              <div className="space-y-6 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold font-display text-neutral-950">
                      MCQ modules
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 font-mono text-xs font-bold">
                      {modulesList.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search modules..."
                        className="pl-9 pr-3 py-1.5 text-xs bg-white border border-purple-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-neutral-900 w-44 sm:w-56"
                      />
                    </div>

                    <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-purple-200 text-xs">
                      <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          statusFilter === 'all' ? 'bg-purple-900 text-white' : 'text-neutral-600 hover:text-purple-950'
                        }`}
                      >
                        All <span className="font-mono text-[10px] ml-0.5">{modulesList.length}</span>
                      </button>
                      <button
                        onClick={() => setStatusFilter('in_progress')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          statusFilter === 'in_progress' ? 'bg-purple-900 text-white' : 'text-neutral-600 hover:text-purple-950'
                        }`}
                      >
                        In progress <span className="font-mono text-[10px] ml-0.5">{inProgressCount}</span>
                      </button>
                      <button
                        onClick={() => setStatusFilter('not_started')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          statusFilter === 'not_started' ? 'bg-purple-900 text-white' : 'text-neutral-600 hover:text-purple-950'
                        }`}
                      >
                        Not started <span className="font-mono text-[10px] ml-0.5">{notStartedCount}</span>
                      </button>
                      <button
                        onClick={() => setStatusFilter('completed')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          statusFilter === 'completed' ? 'bg-purple-900 text-white' : 'text-neutral-600 hover:text-purple-950'
                        }`}
                      >
                        Complete <span className="font-mono text-[10px] ml-0.5">{completeCount}</span>
                      </button>
                    </div>

                    <div className="flex items-center p-1 bg-white rounded-lg border border-purple-200 text-neutral-600">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1 rounded cursor-pointer ${viewMode === 'grid' ? 'bg-purple-100 text-purple-900' : 'hover:text-purple-950'}`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-1 rounded cursor-pointer ${viewMode === 'list' ? 'bg-purple-100 text-purple-900' : 'hover:text-purple-950'}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-3'}>
                  {filteredModules.map((mod) => {
                    const modPercentage = Math.round((mod.solvedQuestions / mod.totalQuestions) * 100);

                    return (
                      <div
                        key={mod.id}
                        className="p-5 rounded-2xl bg-white border border-purple-200/90 shadow-2xs hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-400 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start gap-3.5 mb-3">
                            <ThreeDIconBadge 
                              toolKey={getToolKeyForCategory(mod.category)} 
                              size="sm" 
                              showGlow={true} 
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200 truncate">
                                  Module {mod.moduleNumber} · {mod.category}
                                </span>
                                <span
                                  className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded shrink-0 ${
                                    mod.difficulty === 'Easy'
                                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                      : mod.difficulty === 'Medium'
                                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                                  }`}
                                >
                                  {mod.difficulty}
                                </span>
                              </div>
                              <h4 className="text-base font-bold font-display text-neutral-950 group-hover:text-purple-900 transition-colors">
                                {mod.title}
                              </h4>
                            </div>
                          </div>
                          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                            {mod.description}
                          </p>
                        </div>

                        <div>
                          <div className="space-y-1.5 mb-4">
                            <div className="flex items-center justify-between text-xs text-neutral-500">
                              <span>
                                {mod.solvedQuestions} / {mod.totalQuestions} Questions
                              </span>
                              <span className="font-mono font-bold text-purple-950">
                                {modPercentage}%
                              </span>
                            </div>
                            <div className="w-full bg-purple-100 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-[#FFD000] h-1.5 rounded-full transition-all" style={{ width: `${modPercentage}%` }} />
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveQuizModule(mod)}
                            className="w-full py-2 px-3 text-xs font-bold text-neutral-950 bg-purple-50 hover:bg-[#FFD000] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:border-purple-300"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>
                              {mod.solvedQuestions === 0
                                ? 'Start Module Practice'
                                : mod.solvedQuestions >= mod.totalQuestions
                                ? 'Review Module'
                                : 'Resume Practice'}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ==================== 2. HACKATHONS TAB (Dedicated & Engaging) ==================== */}
          {activeTab === 'hackathons' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* High-Energy Arena Banner with Real Visual Asset */}
              <div className="relative rounded-3xl overflow-hidden text-white border border-purple-500/40 shadow-2xl">
                {/* Background Image with Measured Scrim */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={hackathonArenaImg}
                    alt="University competitive coding hackathon battle arena"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== '/assets/images/hackathon_battle_arena_1792741487659.jpg') {
                        target.src = '/assets/images/hackathon_battle_arena_1792741487659.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0F0721]/95 via-[#1A0C38]/90 to-[#0F0721]/80 backdrop-blur-xs" />
                </div>

                <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span>CodeStrike Arena Active</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
                      Placement Hackathons & Battle Sprints
                    </h1>
                    <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                      Compete under strict timed proctoring against students from 120+ top engineering colleges. Earn direct interview fast-track passes and cash prizes.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => setShowLeaderboard(true)}
                      className="px-4 py-2.5 text-xs font-bold text-white bg-purple-900/90 hover:bg-purple-800 border border-purple-500/50 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Trophy className="w-4 h-4 text-[#FFD000]" />
                      <span>Live Leaderboard</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hackathon Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hackathonsList.map((hack) => (
                  <div
                    key={hack.id}
                    className="p-6 rounded-2xl bg-white border border-purple-200/90 shadow-xs hover:shadow-xl hover:border-purple-400 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${hack.badgeColor}`}>
                          {hack.badge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                          <Clock className="w-3.5 h-3.5 text-purple-600" />
                          <span>{hack.duration}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold font-display text-neutral-950 mb-2 group-hover:text-purple-900 transition-colors">
                        {hack.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                        {hack.description}
                      </p>

                      <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-1.5 mb-4">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Prize Pool & Referrals:</span>
                          <span className="font-bold text-purple-950">{hack.prizePool}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Registered Coders:</span>
                          <span className="font-mono font-bold text-purple-700">{hack.registeredCount.toLocaleString()} Students</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Target Companies:</span>
                          <span className="font-semibold text-neutral-900">{hack.companies.join(', ')}</span>
                        </div>
                      </div>

                      <div className="space-y-1 mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                          Format Outline
                        </span>
                        {hack.rounds.map((r, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD000]" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-purple-100 flex items-center justify-between">
                      <div className="text-xs text-purple-900 font-bold">
                        {hack.status === 'live' ? '⚡ Round 1 Live' : hack.date}
                      </div>

                      {hack.isRegistered ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Pass Generated ✓</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRegisterHackathon(hack.id, hack.title)}
                          className="px-5 py-2 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-all shadow-md shadow-yellow-500/20 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{hack.status === 'live' ? 'Enter Battle' : 'Register Free'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 3. EVENTS & WEBINARS TAB (Dedicated & Engaging) ==================== */}
          {activeTab === 'events' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Webinar Stage Banner with Real Visual Asset */}
              <div className="relative rounded-3xl overflow-hidden text-white border border-purple-500/40 shadow-xl">
                <div className="absolute inset-0 z-0">
                  <img
                    src={webinarSpeakerImg}
                    alt="Live placement masterclass technical speaker"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== '/assets/images/webinar_tech_speaker_1792741488399.jpg') {
                        target.src = '/assets/images/webinar_tech_speaker_1792741488399.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#120726]/95 via-[#1E0F3D]/90 to-[#120726]/75 backdrop-blur-xs" />
                </div>

                <div className="relative z-10 p-6 sm:p-8 max-w-3xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD000] text-purple-950 text-xs font-black uppercase tracking-wider shadow-sm">
                    <Tv className="w-3.5 h-3.5" />
                    <span>Live Industry Masterclasses</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
                    Placement Masterclasses & Recruiter AMAs
                  </h1>
                  <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                    Direct access to senior engineers and technical recruiters from Google, Microsoft, Amazon, and TCS. Interactive Q&A, mock coding teardowns, and past papers.
                  </p>
                </div>
              </div>

              {/* Webinar Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {webinarsList.map((web) => (
                  <div
                    key={web.id}
                    className="p-6 rounded-2xl bg-white border border-purple-200/90 shadow-xs hover:shadow-xl hover:border-purple-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                          {web.category}
                        </span>
                        <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-purple-600" />
                          <span>{web.attendeesCount} Registered</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-neutral-950 mb-3 leading-snug">
                        {web.title}
                      </h3>

                      {/* Speaker Badge */}
                      <div className="p-3 rounded-xl bg-[#FAF7FF] border border-purple-100 flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#120B24] text-[#FFD000] font-bold text-xs flex items-center justify-center shrink-0 border border-purple-800">
                          {web.speaker.avatarInitials}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900">{web.speaker.name}</h4>
                          <p className="text-[11px] text-purple-800 font-medium">
                            {web.speaker.role} · <span className="font-bold">{web.speaker.company}</span>
                          </p>
                        </div>
                      </div>

                      {/* Key Takeaways */}
                      <div className="space-y-1.5 mb-5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">
                          What You Will Learn
                        </span>
                        {web.keyTakeaways.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
                      <div className="text-xs font-semibold text-neutral-700">
                        <div className="flex items-center gap-1.5 text-purple-900 font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{web.dateTime}</span>
                        </div>
                        <span className="text-[11px] text-neutral-500">Live on Zoom + Q&A</span>
                      </div>

                      {web.isRegistered ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Seat Confirmed ✓</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRegisterWebinar(web.id, web.title)}
                          className="px-5 py-2 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-all shadow-md shadow-yellow-500/20 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Reserve Free Seat</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 4. FINAL YEAR PROJECTS TAB ==================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black font-display text-neutral-950">
                  Placement-Ready Capstone Projects
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Production-grade full-stack architectures built to impress technical interviewers and score 10/10 in college vivas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PROJECTS_DATA.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-white border border-purple-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {proj.domain}
                        </span>
                        <span className="text-xs font-mono font-bold text-neutral-700">★ {proj.starsCount}</span>
                      </div>
                      <h3 className="font-bold text-base text-neutral-950 mb-2 leading-tight">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.techStack.map((tech, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 text-xs text-purple-950 mb-4">
                        <span className="font-bold block mb-0.5">Interview Viva Relevance:</span>
                        {proj.vivaReadiness}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProject(proj);
                        showNotification(`Opened project documentation for ${proj.title}`);
                      }}
                      className="w-full py-2.5 text-xs font-bold text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Specs & Code Architecture</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 5. RESOURCES & CHEATSHEETS TAB ==================== */}
          {activeTab === 'resources' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black font-display text-neutral-950">
                  Placement Cheatsheets & Formula Handbooks
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Hand-crafted revision guides, DP matrices, SQL query patterns, and ATS resume templates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RESOURCES_DATA.map((res) => (
                  <div
                    key={res.id}
                    className="p-6 rounded-2xl bg-white border border-purple-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                          {res.category}
                        </span>
                        <span className="text-xs font-mono font-medium text-neutral-500">
                          {res.downloadsCount.toLocaleString()} Downloads
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-neutral-950 mb-1 leading-snug">
                        {res.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                        {res.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-purple-900 font-mono font-bold mb-4">
                        <span>{res.format}</span>
                        <span>·</span>
                        <span>{res.pagesOrSize}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedResource(res);
                        showNotification(`Downloaded ${res.title}! Check your downloads folder.`);
                      }}
                      className="w-full py-2.5 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resource Guide</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 6. MY LEARNING TAB ==================== */}
          {activeTab === 'learning' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black font-display text-neutral-950">
                  My Placement Learning Cockpit
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Your bookmarked problems, active practice streaks, and targeted remediation recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
                    Active Practice Tracks
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                      <span className="font-bold text-neutral-900 text-xs block">Amazon SDE-1 Sprint</span>
                      <span className="text-[11px] text-neutral-500">14 of 190 Problems solved (7%)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                      <span className="font-bold text-neutral-900 text-xs block">C Language Foundations</span>
                      <span className="text-[11px] text-neutral-500">14 of 45 Questions solved (31%)</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
                    Weak Topic Diagnostics
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950">
                      <span className="font-bold block">Dynamic Programming (Recursion)</span>
                      <span>Accuracy: 42% · Needs remedial shortcut practice</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
                      <span className="font-bold block">Pipes and Cisterns (Aptitude)</span>
                      <span>Speed: 2.4 min/question (Target: 1.2 min)</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
                    Upcoming Scheduled Tests
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                      <span className="font-bold text-neutral-900 block">TCS Digital Mock Exam #2</span>
                      <span className="text-neutral-500">Tomorrow at 6:00 PM IST</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('progress')}
                      className="w-full mt-2 py-2 text-xs font-bold text-purple-950 bg-[#FFD000] rounded-lg cursor-pointer"
                    >
                      Resume Daily Practice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 7. PREPARATION BUNDLES TAB ==================== */}
          {activeTab === 'bundles' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black font-display text-neutral-950">
                  Company Preparation Bundles
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Structured roadmaps curated for specific campus recruitment patterns.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PREPARATION_BUNDLES_LIST.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="p-6 rounded-2xl bg-white border border-purple-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${bundle.badgeColor}`}>
                          {bundle.tag}
                        </span>
                        <span className="text-xs font-mono font-semibold text-purple-800">
                          {bundle.mcqsCount} MCQs · {bundle.modulesCount} Modules
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-display text-neutral-950 mb-2">
                        {bundle.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                        {bundle.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {bundle.companies.map((c, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-200/80"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const m = modulesList[0];
                        setActiveQuizModule(m);
                      }}
                      className="w-full py-2.5 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Launch Bundle Diagnostic</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 8. COURSES TAB ==================== */}
          {activeTab === 'courses' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black font-display text-neutral-950">
                  Video Concept Courses
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  10-15 minute placement concept breakdowns for Core CS and DSA.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'DSA Masterclass: Two Pointers & Sliders',
                    instructor: 'Arjun Verma (Ex-Amazon)',
                    hours: '8.5 Hours',
                    lessons: '24 Lessons'
                  },
                  {
                    title: 'DBMS Normalization & Concurrency Control',
                    instructor: 'Dr. Meenakshi S.',
                    hours: '6.0 Hours',
                    lessons: '18 Lessons'
                  },
                  {
                    title: 'Quantitative Aptitude Speed Tricks for TCS',
                    instructor: 'Rohit K.',
                    hours: '12.0 Hours',
                    lessons: '36 Lessons'
                  }
                ].map((course, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-purple-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-full h-32 rounded-xl bg-purple-900 text-[#FFD000] flex items-center justify-center font-mono font-bold text-sm mb-4">
                        Video Lecture #{idx + 1}
                      </div>
                      <h3 className="font-bold text-base text-neutral-950 mb-1">{course.title}</h3>
                      <p className="text-xs text-neutral-500 mb-2">By {course.instructor}</p>
                      <div className="flex items-center gap-2 text-xs text-purple-700 font-mono">
                        <span>{course.hours}</span>
                        <span>·</span>
                        <span>{course.lessons}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => showNotification(`Starting video lecture: ${course.title}`)}
                      className="mt-4 w-full py-2 text-xs font-bold text-white bg-purple-900 hover:bg-purple-950 rounded-xl transition-colors cursor-pointer"
                    >
                      Watch Concept Video
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 9. SUBSCRIPTION TAB ==================== */}
          {activeTab === 'subscription' && (
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-purple-200 shadow-lg text-center space-y-6 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto">
                <Crown className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black font-display text-neutral-950">
                  Upgrade Your Placement Preparation
                </h3>
                <p className="text-xs text-neutral-600 mt-1 max-w-md mx-auto">
                  Unlock all 96 modules, 2,328 MCQs, company mock test simulations, and live placement mentor reviews.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-left text-xs space-y-2">
                <div className="flex justify-between font-bold text-neutral-900">
                  <span>Current Plan:</span>
                  <span className="text-purple-800">Free Starter</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Questions Access:</span>
                  <span>50 MCQs / day</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Company Mock Tests:</span>
                  <span>1 Diagnostic Test</span>
                </div>
              </div>

              <button
                onClick={onUpgradePlan}
                className="w-full py-3 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-all shadow-md shadow-yellow-500/20 cursor-pointer"
              >
                Upgrade to Student Pro (₹299/mo)
              </button>
            </div>
          )}

          {/* ==================== 10. SETTINGS TAB ==================== */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white border border-purple-200 shadow-lg space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#120B24] text-[#FFD000] font-bold text-sm flex items-center justify-center">
                  S
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-950">Student Profile & Preferences</h3>
                  <p className="text-xs text-neutral-500">Subasan . S · subasan2008@gmail.com</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Target Engineering Role</label>
                  <input
                    type="text"
                    defaultValue="Software Development Engineer (SDE-1)"
                    className="w-full px-3 py-2 border border-purple-200 rounded-lg bg-neutral-50 text-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Graduation Batch Year</label>
                  <select defaultValue="2026" className="w-full px-3 py-2 border border-purple-200 rounded-lg bg-neutral-50 text-neutral-900">
                    <option value="2025">2025 Batch</option>
                    <option value="2026">2026 Batch</option>
                    <option value="2027">2027 Batch</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Daily Placement Practice Goal</label>
                  <select defaultValue="20" className="w-full px-3 py-2 border border-purple-200 rounded-lg bg-neutral-50 text-neutral-900">
                    <option value="10">10 MCQs / day</option>
                    <option value="20">20 MCQs / day (Recommended)</option>
                    <option value="40">40 MCQs / day (Intensive)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => showNotification('Placement preferences saved successfully!')}
                className="w-full py-2.5 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Save Preferences
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Live Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-purple-200 text-neutral-900 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7FF] border-b border-purple-200">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FFD000]" />
                <h3 className="text-base font-bold text-neutral-900 font-display">
                  National Hackathon Leaderboard
                </h3>
              </div>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="p-1.5 text-neutral-500 rounded-lg hover:bg-purple-100 hover:text-purple-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-3">
              <p className="text-xs text-neutral-600 mb-2">
                Real-time rankings from CodeStrike Placement Sprint #28:
              </p>
              {LEADERBOARD_STUDENTS.map((s) => (
                <div
                  key={s.rank}
                  className="p-3 rounded-xl border border-purple-100 bg-[#FAF7FF]/60 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs ${
                        s.rank === 1
                          ? 'bg-[#FFD000] text-purple-950'
                          : s.rank === 2
                          ? 'bg-neutral-300 text-neutral-800'
                          : s.rank === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-purple-100 text-purple-900'
                      }`}
                    >
                      {s.rank}
                    </span>
                    <div>
                      <span className="font-bold text-neutral-900 block">{s.name}</span>
                      <span className="text-[10px] text-neutral-500">{s.college}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-purple-950 block">{s.score} pts</span>
                    <span className="text-[10px] text-neutral-500">{s.problems} solved in {s.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-3.5 bg-[#FAF7FF] border-t border-purple-200 text-center">
              <button
                onClick={() => setShowLeaderboard(false)}
                className="px-5 py-2 text-xs font-black text-neutral-950 bg-[#FFD000] rounded-lg cursor-pointer"
              >
                Close Leaderboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quiz Runner Modal */}
      <InteractiveQuizModal
        module={activeQuizModule}
        onClose={() => setActiveQuizModule(null)}
        onCompleteQuestion={handleCompleteQuestion}
      />
    </div>
  );
};
