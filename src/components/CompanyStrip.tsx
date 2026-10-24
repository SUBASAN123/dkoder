import React from 'react';
import { COMPANY_PREVIEW_LOGOS } from '../data/platformData';

interface CompanyStripProps {
  onSelectCompany: (companyName: string) => void;
}

export const CompanyStrip: React.FC<CompanyStripProps> = ({ onSelectCompany }) => {
  return (
    <section className="border-y border-purple-200/80 bg-white/80 backdrop-blur-xs py-7 sm:py-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Label */}
          <div className="shrink-0 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
              Curated Placement Blueprints
            </span>
            <p className="text-sm font-bold text-neutral-950 font-display">
              Prepare for Top Tech & Enterprise Drives
            </p>
          </div>

          {/* Company Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5">
            {COMPANY_PREVIEW_LOGOS.map((company) => (
              <button
                key={company.name}
                onClick={() => onSelectCompany(company.name)}
                className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#FAF7FF] border border-purple-200/90 hover:border-purple-500 hover:bg-purple-100/60 transition-all cursor-pointer shadow-2xs hover:shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500"
                title={`Explore ${company.name} Preparation Track`}
              >
                <span className="w-6 h-6 rounded-md bg-[#120B24] text-[#FFD000] font-mono font-bold text-xs flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  {company.symbol}
                </span>
                <span className="text-sm font-bold text-neutral-800 group-hover:text-purple-950 font-display">
                  {company.name}
                </span>
                <span className="text-[10px] text-purple-600/80 font-mono hidden md:inline">
                  {company.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-center text-neutral-500 mt-4">
          Independent student preparation platform. All company names, logos, and trademarks are property of their respective holders and are referenced for syllabus alignment only.
        </p>
      </div>
    </section>
  );
};
