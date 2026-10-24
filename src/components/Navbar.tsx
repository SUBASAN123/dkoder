import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (role?: 'student' | 'college') => void;
  onOpenCollegesModal: () => void;
  onOpenHackathonsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenCollegesModal,
  onOpenHackathonsModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF7FF]/95 backdrop-blur-md shadow-xs border-b border-purple-200/80'
          : 'bg-[#FAF7FF] border-b border-purple-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
          aria-label="DKoder Home"
        >
          <div className="w-9 h-9 rounded-xl bg-[#120B24] border border-purple-900/50 flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 group-hover:shadow-purple-500/20 group-hover:shadow-md">
            <span className="font-mono font-black text-sm text-[#FFD000] tracking-tighter">
              D&lt;&gt;
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-display font-black text-xl tracking-tight text-neutral-950">
                DK<span className="text-purple-700">oder</span>
              </span>
              <span className="ml-1 w-1.5 h-1.5 rounded-full bg-[#FFD000] ring-2 ring-purple-400/40" />
            </div>
            <span className="text-[10px] font-semibold text-purple-700/80 uppercase tracking-widest -mt-1 hidden sm:block">
              Placement Platform
            </span>
          </div>
        </a>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-700">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-purple-800 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('live-compiler')}
            className="hover:text-purple-800 transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1 font-semibold text-purple-900"
          >
            <span>Live IDE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </button>
          <button
            onClick={() => scrollToSection('readiness-radar')}
            className="hover:text-purple-800 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Readiness Radar
          </button>
          <button
            onClick={() => scrollToSection('tracks')}
            className="hover:text-purple-800 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Company Tracks
          </button>
          <button
            onClick={() => scrollToSection('duel-arena')}
            className="hover:text-purple-800 transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1.5"
          >
            <span>Duel Arena</span>
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-sm bg-[#FFD000] text-purple-950">
              1v1
            </span>
          </button>
          <button
            onClick={() => scrollToSection('hiring-drives')}
            className="hover:text-purple-800 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Drives
          </button>
          <button
            onClick={onOpenHackathonsModal}
            className="hover:text-purple-800 transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1.5"
          >
            <span>Hackathons</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-900 border border-purple-300">
              Live
            </span>
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:text-purple-800 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Pricing
          </button>
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenAuth('student')}
            className="px-4 py-2 text-xs font-semibold text-purple-950 hover:text-purple-700 hover:bg-purple-100/60 rounded-lg transition-colors cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => onOpenAuth('student')}
            className="px-4.5 py-2 text-xs font-bold text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg transition-all shadow-xs hover:shadow-md hover:shadow-yellow-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenAuth('student')}
            className="px-3 py-1.5 text-xs font-bold text-neutral-950 bg-[#FFD000] rounded-md shadow-xs"
          >
            Get Started
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2 text-neutral-700 hover:text-purple-900 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-purple-200 bg-[#FAF7FF] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-150">
          <div className="flex flex-col space-y-3 text-sm font-medium text-neutral-800">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-colors"
            >
              Learn
            </button>
            <button
              onClick={() => scrollToSection('tracks')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-colors"
            >
              Coding Practice & Company Tracks
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHackathonsModal();
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-colors flex items-center justify-between"
            >
              <span>Hackathons & Contests</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
                Live
              </span>
            </button>
            <button
              onClick={() => scrollToSection('colleges')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-colors"
            >
              For Colleges (TPO Platform)
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-colors"
            >
              Pricing
            </button>

            <div className="pt-4 mt-2 border-t border-purple-200/80 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('student');
                }}
                className="py-2.5 text-xs font-semibold text-purple-950 bg-purple-100/80 hover:bg-purple-200/80 rounded-lg text-center"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('student');
                }}
                className="py-2.5 text-xs font-bold text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg text-center shadow-xs"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
