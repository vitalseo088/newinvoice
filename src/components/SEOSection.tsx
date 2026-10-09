import React from 'react';
import {
  CheckCircle,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  Zap,
  Globe2,
} from 'lucide-react';

export const SEOSection: React.FC = () => {
  return (
    <section className="mt-16 border-t border-gray-200/80 pt-12 pb-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section title as specified */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2.5">
            How to Create a Professional Invoice
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Generate, customize, and download client-ready invoices in seconds with our streamlined 4-step workflow.
          </p>
        </div>

        {/* 4 Steps Cards with large font sizes and #1A3263 badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#1A3263] text-white flex items-center justify-center font-extrabold text-base mb-3.5 shadow-xs">
              1
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">Add Business & Client Info</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Enter your company name, contact info, logo, and your client's billing address.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#1A3263] text-white flex items-center justify-center font-extrabold text-base mb-3.5 shadow-xs">
              2
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">List Items & Calculate</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Add products or services with quantities and rates. Totals, discounts, and taxes calculate automatically.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#1A3263] text-white flex items-center justify-center font-extrabold text-base mb-3.5 shadow-xs">
              3
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">Brand & Customize</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Match your brand accent color, adjust logo dimensions, select typography, and set currency.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#1A3263] text-white flex items-center justify-center font-extrabold text-base mb-3.5 shadow-xs">
              4
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">Download Searchable PDF</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Download clean, vector-rendered PDF documents ready to email or print immediately.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white p-6 rounded-xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">100% Private & Free</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                No signups, accounts, or tracking. Data is preserved exclusively in your local browser storage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Instant Autosave</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Every keystroke and line item is debounced and preserved so you never lose invoice progress.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600 shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Multi-Currency & Taxes</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Supports international currencies ($ € £ ¥ ₹ CHF kr), custom tax labels, and net payment terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
