import React, { useState } from 'react';
import { X, CheckCircle2, Building2, Send } from 'lucide-react';

interface CollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollegeInquiryModal: React.FC<CollegeModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: '',
    tpoName: '',
    email: '',
    phone: '',
    batchSize: '300-500 students',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.collegeName || !formData.email) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      collegeName: '',
      tpoName: '',
      email: '',
      phone: '',
      batchSize: '300-500 students',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-purple-200 text-neutral-900 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="college-modal-title"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7FF] border-b border-purple-200">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-800" />
            <h3 id="college-modal-title" className="text-lg font-bold text-neutral-900 font-display">
              DKoder for Colleges & Universities
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-neutral-500 rounded-lg hover:bg-purple-100 hover:text-purple-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto border border-purple-200">
              <CheckCircle2 className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-neutral-900">Demo Scheduled Successfully</h4>
              <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-neutral-900">{formData.tpoName || 'Officer'}</span>. Our institutional placement specialist will reach out to <span className="font-semibold text-neutral-900">{formData.email}</span> within 1 business day with cohort analytics sandbox access.
              </p>
            </div>
            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-xs text-left space-y-1">
              <div className="flex justify-between text-neutral-600">
                <span>College:</span>
                <span className="font-bold text-neutral-900">{formData.collegeName}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Cohort Size:</span>
                <span className="font-bold text-neutral-900">{formData.batchSize}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Modules Requested:</span>
                <span className="font-bold text-purple-800">TPO Dashboard + Proctored Mocks</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg transition-colors shadow-md shadow-yellow-500/20 cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-neutral-600 leading-relaxed">
              Equip your Training & Placement Cell with batch diagnostics, customized company mock drives, and live cohort rankings.
            </p>

            <div>
              <label htmlFor="col-name" className="block text-xs font-semibold text-neutral-700 mb-1">
                Institution / College Name *
              </label>
              <input
                id="col-name"
                type="text"
                required
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                placeholder="e.g. Coimbatore Institute of Technology"
                className="w-full px-3.5 py-2 text-sm bg-purple-50/40 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-neutral-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="col-tpo" className="block text-xs font-semibold text-neutral-700 mb-1">
                  TPO / Faculty In-Charge *
                </label>
                <input
                  id="col-tpo"
                  type="text"
                  required
                  value={formData.tpoName}
                  onChange={(e) => setFormData({ ...formData, tpoName: e.target.value })}
                  placeholder="Prof. S. Narayanan"
                  className="w-full px-3 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-neutral-900"
                />
              </div>
              <div>
                <label htmlFor="col-email" className="block text-xs font-semibold text-neutral-700 mb-1">
                  Official Institute Email *
                </label>
                <input
                  id="col-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="placements@cit.edu.in"
                  className="w-full px-3 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-neutral-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="col-phone" className="block text-xs font-semibold text-neutral-700 mb-1">
                  Contact Phone
                </label>
                <input
                  id="col-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-neutral-900"
                />
              </div>
              <div>
                <label htmlFor="col-batch" className="block text-xs font-semibold text-neutral-700 mb-1">
                  Target Student Cohort
                </label>
                <select
                  id="col-batch"
                  value={formData.batchSize}
                  onChange={(e) => setFormData({ ...formData, batchSize: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-neutral-900"
                >
                  <option value="100-300 students">100 - 300 students</option>
                  <option value="300-500 students">300 - 500 students</option>
                  <option value="500-1000 students">500 - 1000 students</option>
                  <option value="1000+ campus wide">1000+ campus wide</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="col-msg" className="block text-xs font-semibold text-neutral-700 mb-1">
                Specific Placement Requirements (Optional)
              </label>
              <textarea
                id="col-msg"
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="e.g. We want to conduct a 4-week TCS NQT and Amazon readiness bootcamp for our 2026 batch."
                className="w-full px-3 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-black text-neutral-950 bg-[#FFD000] hover:bg-[#F0C400] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-yellow-500/20 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Schedule Live TPO Demo & Pricing</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
