import React, { useState } from 'react';
import { Shield, FileCheck, X } from 'lucide-react';

interface FooterProps {
  onOpenImportExport: () => void;
  onNewInvoice: () => void;
  onOpenMyInvoices: () => void;
  onOpenCustomize: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenImportExport,
  onNewInvoice,
  onOpenMyInvoices,
  onOpenCustomize,
}) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#2D3139] text-gray-300 mt-6 sm:mt-8 border-t border-gray-700/60">
      {/* 4-column main footer */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Invoice Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Invoice Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onNewInvoice}
                  className="hover:text-white transition text-gray-300"
                >
                  Create New Invoice
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCustomize}
                  className="hover:text-white transition text-gray-300"
                >
                  Invoice Customization
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenMyInvoices}
                  className="hover:text-white transition text-gray-300"
                >
                  Saved Invoices Manager
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenImportExport}
                  className="hover:text-white transition text-gray-300"
                >
                  Export & Backup JSON
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Business Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Business Tools
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <span className="hover:text-white cursor-pointer" onClick={onNewInvoice}>
                  Tax Invoice Generator
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer" onClick={onNewInvoice}>
                  Freelance Billing Format
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer" onClick={onNewInvoice}>
                  Consulting Services Invoice
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer" onClick={onNewInvoice}>
                  Commercial Billing
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a
                  href="#7-steps"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('7-steps') || document.getElementById('invoiceo-guide');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  7-Step Invoice Guide
                </a>
              </li>
              <li>
                <a
                  href="#examples-by-profession"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('examples-by-profession') || document.getElementById('invoiceo-guide');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  Profession Invoice Examples
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('faq') || document.getElementById('invoiceo-guide');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  Frequently Asked Questions (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Website */}
          <div>
            <div className="mb-3">
              <span className="font-extrabold text-white text-lg tracking-tight">
                Invoiceo<span className="text-blue-300">.online</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              A 100% free, private browser-based invoice generator. No sign up required, no tracking, and high-quality vector PDF output.
            </p>
          </div>
        </div>
      </div>

      {/* Separate Copyright bottom bar */}
      <div className="border-t border-gray-700/80 bg-[#22252B] py-5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-400">
          <div>
            © {new Date().getFullYear()} Invoiceo.online. All rights reserved. Free Invoice Generator.
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-gray-200 transition underline underline-offset-4"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-gray-200 transition underline underline-offset-4"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Terms Modals */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs cursor-pointer animate-in fade-in duration-150"
          onClick={() => setLegalModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white text-gray-800 shadow-2xl overflow-hidden p-6 sm:p-7 animate-in fade-in zoom-in-95 cursor-auto border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-3.5 mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2.5">
                {legalModal === 'privacy' ? (
                  <>
                    <Shield className="w-5 h-5 text-[#1A3263]" /> Privacy Policy
                  </>
                ) : (
                  <>
                    <FileCheck className="w-5 h-5 text-[#1A3263]" /> Terms of Use
                  </>
                )}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="Close dialog"
                className="cursor-pointer p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            <div className="text-sm text-gray-600 space-y-3.5 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p className="font-bold text-gray-900">
                    Your financial and customer data never leaves your computer.
                  </p>
                  <p>
                    Invoiceo.online is strictly a client-side web application. All invoices, client contact info, rates, signatures, and attached files are stored exclusively in your device's browser localStorage.
                  </p>
                  <p>
                    We do not maintain databases, user accounts, servers, or external tracking telemetry for invoice contents. When you generate a PDF, it is compiled directly in your browser's memory using JavaScript (jsPDF).
                  </p>
                  <p>
                    You are in complete control: you can export all your invoices as a backup JSON file or delete them at any time.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-gray-900">
                    Terms for Free Invoice Generation
                  </p>
                  <p>
                    Invoiceo.online provides this free invoice generator as an open utility for small businesses, freelancers, contractors, and individuals worldwide.
                  </p>
                  <p>
                    You are solely responsible for ensuring the accuracy of invoice calculations, local tax compliance (such as VAT or GST filings), and legal invoicing standards applicable to your jurisdiction.
                  </p>
                  <p>
                    Because data is saved locally in your browser cache, clearing your browser data or browsing in private/incognito mode may remove local records. We encourage using the "Import / Export" backup feature regularly.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="cursor-pointer px-6 py-2.5 text-sm font-bold bg-[#1A3263] text-white rounded-lg hover:bg-[#132549] transition shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
