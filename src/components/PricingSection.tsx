import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '../data/platformData';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan, isAnnual: boolean) => void;
  onContactColleges: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan,
  onContactColleges
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white border-t border-purple-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
            <span>Student & Campus Pricing</span>
            <span>·</span>
            <span>Illustrative Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-neutral-950">
            Choose Your Plan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
            Transparent options for students preparing individually and universities managing cohort placement training.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-purple-50 rounded-xl border border-purple-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white text-purple-950 shadow-xs'
                  : 'text-purple-700 hover:text-purple-950'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-[#120B24] text-[#FFD000] shadow-xs'
                  : 'text-purple-700 hover:text-purple-950'
              }`}
            >
              <span>Yearly Access</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FFD000] text-purple-950">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isHighlighted = plan.highlighted;
            const isCollege = plan.id === 'college-campus';
            const price = billingCycle === 'yearly' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all ${
                  isHighlighted
                    ? 'bg-[#120B28] text-white shadow-2xl shadow-purple-950/40 ring-2 ring-[#FFD000] -translate-y-1'
                    : 'bg-[#FAF7FF] text-neutral-900 border border-purple-200/90 shadow-2xs hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300'
                }`}
              >
                {/* Popular Pill */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#FFD000] text-purple-950 text-[11px] font-black uppercase tracking-wider rounded-full shadow-md shadow-yellow-500/30">
                    Recommended Plan
                  </div>
                )}

                <div>
                  {/* Plan Name & Subtitle */}
                  <div className="mb-4">
                    <h3
                      className={`text-xl font-bold font-display ${
                        isHighlighted ? 'text-white' : 'text-neutral-950'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        isHighlighted ? 'text-purple-200/80' : 'text-neutral-600'
                      }`}
                    >
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="my-5 pb-5 border-b border-purple-200/50">
                    {isCollege ? (
                      <div>
                        <span
                          className={`text-3xl font-black font-display tracking-tight ${
                            isHighlighted ? 'text-white' : 'text-neutral-950'
                          }`}
                        >
                          Custom
                        </span>
                        <span
                          className={`block text-xs mt-1 ${
                            isHighlighted ? 'text-purple-300' : 'text-purple-700/80'
                          }`}
                        >
                          Per student / department cohort
                        </span>
                      </div>
                    ) : plan.monthlyPrice === 0 ? (
                      <div>
                        <span
                          className={`text-3xl font-black font-display tracking-tight ${
                            isHighlighted ? 'text-white' : 'text-neutral-950'
                          }`}
                        >
                          ₹0
                        </span>
                        <span
                          className={`block text-xs mt-1 ${
                            isHighlighted ? 'text-purple-300' : 'text-purple-700/80'
                          }`}
                        >
                          Free forever for foundational prep
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-3xl font-black font-display tracking-tight tabular-nums ${
                            isHighlighted ? 'text-[#FFD000]' : 'text-neutral-950'
                          }`}
                        >
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={`text-xs font-mono ${
                            isHighlighted ? 'text-purple-300' : 'text-purple-600'
                          }`}
                        >
                          {billingCycle === 'yearly' ? '/year' : '/month'}
                        </span>
                      </div>
                    )}
                    <span
                      className={`block text-[11px] mt-2 font-semibold ${
                        isHighlighted ? 'text-[#FFD000]' : 'text-purple-800'
                      }`}
                    >
                      Target: {plan.idealFor}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-6">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block ${
                        isHighlighted ? 'text-purple-300' : 'text-purple-700'
                      }`}
                    >
                      Included Features:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isHighlighted ? 'text-[#FFD000]' : 'text-purple-700'
                          }`}
                        />
                        <span className={isHighlighted ? 'text-purple-100' : 'text-neutral-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-purple-200/30">
                  <button
                    onClick={() => {
                      if (isCollege) {
                        onContactColleges();
                      } else {
                        onSelectPlan(plan, billingCycle === 'yearly');
                      }
                    }}
                    className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                      isHighlighted
                        ? 'bg-[#FFD000] text-purple-950 hover:bg-[#F0C400] shadow-md shadow-yellow-500/25'
                        : 'bg-[#120B24] text-white hover:bg-[#1C1236]'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p
                    className={`text-[10px] text-center mt-2 ${
                      isHighlighted ? 'text-purple-300' : 'text-neutral-500'
                    }`}
                  >
                    {plan.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Pricing Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-center max-w-2xl mx-auto text-xs text-neutral-600">
          <p>
            <span className="font-semibold text-neutral-900">Note:</span> Displayed fees are illustrative demonstration prices for the DKoder platform evaluation. Checkout workflows do not charge live financial instruments.
          </p>
        </div>
      </div>
    </section>
  );
};
