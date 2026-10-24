import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompanyStrip } from './components/CompanyStrip';
import { FeaturesSection } from './components/FeaturesSection';
import { CompanyTracks } from './components/CompanyTracks';
import { TrustImpact } from './components/TrustImpact';
import { HowItWorks } from './components/HowItWorks';
import { PricingSection } from './components/PricingSection';
import { PlacementFaq } from './components/PlacementFaq';
import { Footer } from './components/Footer';
import { TrackDetailModal, FeatureDetailModal, AuthModal } from './components/InteractiveModals';
import { CollegeInquiryModal } from './components/CollegeInquiryModal';
import { HackathonsModal } from './components/HackathonsModal';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { LiveCodingPlayground } from './components/LiveCodingPlayground';
import { PlacementRadarSimulator } from './components/PlacementRadarSimulator';
import { PlacementDuelArena } from './components/PlacementDuelArena';
import { DriveTracker } from './components/DriveTracker';
import { COMPANY_TRACKS } from './data/platformData';
import { CompanyTrack, FeatureItem, PricingPlan } from './types';
import { ArrowRight, Sparkles, LayoutDashboard } from 'lucide-react';

export default function App() {
  // Current Active View: 'landing' or 'dashboard'
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  // Modal states
  const [selectedTrack, setSelectedTrack] = useState<CompanyTrack | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'student' | 'college'>('student');
  const [collegesModalOpen, setCollegesModalOpen] = useState(false);
  const [hackathonsModalOpen, setHackathonsModalOpen] = useState(false);

  // Notification toast for user actions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenAuth = (role: 'student' | 'college' = 'student') => {
    if (role === 'student') {
      // Direct smooth transition to the student practice portal
      setCurrentView('dashboard');
      showToast('Welcome to your Student Practice & Progress Portal!');
    } else {
      setAuthRole('college');
      setAuthModalOpen(true);
    }
  };

  const handleSelectCompanyByName = (companyName: string) => {
    const track = COMPANY_TRACKS.find(
      (t) => t.name.toLowerCase() === companyName.toLowerCase()
    );
    if (track) {
      setSelectedTrack(track);
    } else {
      const el = document.getElementById('tracks');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnrollTrack = (companyName: string) => {
    setCurrentView('dashboard');
    showToast(`Enrolled in ${companyName} track! Practice modules are now active.`);
  };

  const handleSelectPlan = (plan: PricingPlan, isAnnual: boolean) => {
    if (plan.id === 'college-campus') {
      setCollegesModalOpen(true);
    } else {
      setCurrentView('dashboard');
      showToast(
        `Selected ${plan.name} (${isAnnual ? 'Yearly' : 'Monthly'})! Practice modules unlocked.`
      );
    }
  };

  const scrollToPractice = () => {
    const el = document.getElementById('features');
    if (el) {
      const navOffset = 72;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      const navOffset = 72;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // If in Student Dashboard view, render the actual interactive portal matching the user's screenshot
  if (currentView === 'dashboard') {
    return (
      <StudentDashboard
        onBackToLanding={() => setCurrentView('landing')}
        onUpgradePlan={() => {
          setCurrentView('landing');
          setTimeout(() => scrollToPricing(), 100);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FF] text-neutral-900 font-sans selection:bg-[#FFD000] selection:text-purple-950 overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 bg-[#120B24] text-white text-xs font-semibold rounded-xl shadow-2xl border border-purple-700/80 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#FFD000] shadow-xs shadow-yellow-500/50" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Student Portal Quick Launcher */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#120B24] text-white text-xs font-bold shadow-xl border border-purple-500/50 hover:border-[#FFD000] hover:scale-105 transition-all cursor-pointer glow-purple"
        >
          <div className="w-6 h-6 rounded-lg bg-[#FFD000] text-purple-950 flex items-center justify-center font-black text-xs">
            D
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-purple-300 font-normal">Live Student Portal</span>
            <span className="text-white group-hover:text-[#FFD000] transition-colors">Open My Progress</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#FFD000] transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* 1. Navbar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenCollegesModal={() => setCollegesModalOpen(true)}
        onOpenHackathonsModal={() => setHackathonsModalOpen(true)}
      />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onStartPreparing={() => setCurrentView('dashboard')}
          onExplorePractice={scrollToPractice}
        />

        {/* 3. Company Preparation Strip */}
        <CompanyStrip onSelectCompany={handleSelectCompanyByName} />

        {/* 4. Interactive In-Browser Live IDE & Sandbox */}
        <LiveCodingPlayground
          onOpenDashboard={() => setCurrentView('dashboard')}
          onCodeSubmitted={(delta) =>
            showToast(`Submission verified! +${delta} Placement XP added to your student profile.`)
          }
        />

        {/* 5. Features Section */}
        <FeaturesSection
          onSelectFeature={(feat) => setSelectedFeature(feat)}
          onExploreCollege={() => setCollegesModalOpen(true)}
        />

        {/* 6. 360° Placement Readiness Radar & Predictive Simulator */}
        <PlacementRadarSimulator
          onStartCustomSprint={(presetName) => {
            setCurrentView('dashboard');
            showToast(`14-Day Sprint initialized for ${presetName}!`);
          }}
        />

        {/* 7. Company Preparation Tracks with CTC Tiers */}
        <CompanyTracks
          onViewTrack={(track) => setSelectedTrack(track)}
          onExploreAll={() => {
            showToast('Showing all curated company blueprints.');
          }}
        />

        {/* 8. Campus 1-on-1 Placement Duel Arena */}
        <PlacementDuelArena />

        {/* 9. Active Campus & Off-Campus Hiring Drives Tracker */}
        <DriveTracker
          onSelectCompanyTrack={handleSelectCompanyByName}
          onSetReminder={(msg) => showToast(msg)}
        />

        {/* 10. Trust and Impact Section */}
        <TrustImpact />

        {/* 7. How It Works Section */}
        <HowItWorks onStartJourney={() => setCurrentView('dashboard')} />

        {/* 8. Pricing Section */}
        <PricingSection
          onSelectPlan={handleSelectPlan}
          onContactColleges={() => setCollegesModalOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <PlacementFaq />
      </main>

      {/* 9. Footer */}
      <Footer
        onSelectTrack={handleSelectCompanyByName}
        onOpenCollegesModal={() => setCollegesModalOpen(true)}
        onOpenAuth={() => handleOpenAuth('student')}
      />

      {/* Interactive Modals */}
      <TrackDetailModal
        track={selectedTrack}
        onClose={() => setSelectedTrack(null)}
        onEnroll={handleEnrollTrack}
      />

      <FeatureDetailModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onAction={() => {
          setSelectedFeature(null);
          setCurrentView('dashboard');
        }}
      />

      <AuthModal
        isOpen={authModalOpen}
        defaultRole={authRole}
        onClose={() => setAuthModalOpen(false)}
      />

      <CollegeInquiryModal
        isOpen={collegesModalOpen}
        onClose={() => setCollegesModalOpen(false)}
      />

      <HackathonsModal
        isOpen={hackathonsModalOpen}
        onClose={() => setHackathonsModalOpen(false)}
        onRegister={(title) => {
          showToast(`Seat reserved for ${title}! Check your email for contest access credentials.`);
        }}
      />
    </div>
  );
}
