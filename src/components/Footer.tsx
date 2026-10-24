import React from 'react';
import { ArrowUp, Mail, Globe, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectTrack: (companyName: string) => void;
  onOpenCollegesModal: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTrack,
  onOpenCollegesModal,
  onOpenAuth
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
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

  return (
    <footer className="bg-[#0B0518] text-purple-200/80 border-t border-purple-950/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-purple-900/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#170B30] border border-purple-800/60 flex items-center justify-center shadow-xs">
                <span className="font-mono font-black text-sm text-[#FFD000] tracking-tighter">
                  D&lt;&gt;
                </span>
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                DK<span className="text-purple-400">oder</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-purple-300/70 max-w-sm leading-relaxed">
              Master aptitude, coding and interview skills with focused practice designed to help engineering students move closer to their dream campus placements.
            </p>

            <div className="space-y-1.5 text-xs text-purple-300/70 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FFD000]" />
                <a href="mailto:support@dkoder.co.in" className="hover:text-white transition-colors">
                  support@dkoder.co.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#FFD000]" />
                <a href="https://dkoder.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>dkoder.co.in</span>
                  <ExternalLink className="w-3 h-3 text-purple-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Company Tracks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD000] font-display mb-4">
              Company Tracks
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-300/70">
              <li>
                <button
                  onClick={() => onSelectTrack('Google')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Google SWE Track
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTrack('Amazon')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Amazon SDE-1 Blueprint
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTrack('Microsoft')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Microsoft Campus Prep
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTrack('TCS')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  TCS Digital / Prime
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTrack('Zoho')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Zoho App Round Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTrack('Infosys')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Infosys Specialist Prep
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Preparation Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD000] font-display mb-4">
              Practice Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-300/70">
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Pattern-Wise DSA Problems
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Quantitative Aptitude Shortcuts
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Logical & Verbal Reasoning
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Company Mock Assessment Series
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Core CS (OS, DBMS, Networks)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: For Colleges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD000] font-display mb-4">
              For Colleges & Campus
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-300/70">
              <li>
                <button
                  onClick={onOpenCollegesModal}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  TPO Placement Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCollegesModal}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Batch Diagnostic Assessments
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCollegesModal}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Schedule Campus Demonstration
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('pricing')}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Institutional Cohort Plans
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuth}
                  className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                >
                  Student Diagnostic Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-purple-400/80">
          <p className="text-center md:text-left leading-relaxed">
            © 2026 DKoder. All rights reserved. Independent preparation platform. Company trademarks belong to their respective owners.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-purple-200 transition-colors">
              Honor Code & Academic Integrity
            </span>
            <span className="hover:text-purple-200 transition-colors">
              Privacy Policy
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#190F36] border border-purple-800 hover:border-purple-600 text-purple-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer ml-2 shadow-xs"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#FFD000]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
