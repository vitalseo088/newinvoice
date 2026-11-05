import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  HardDrive,
  Cpu,
  EyeOff,
  FileText,
  Trash2,
  Download,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Mail,
  Clock,
  RefreshCw,
  Key,
  ShieldAlert,
} from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { InfoPageSlug } from '../components/Footer';

interface PrivacyPageProps {
  onNavigateHome: () => void;
  onOpenImportExport?: () => void;
  onNavigatePage?: (page: InfoPageSlug) => void;
}

const SUPPORT_EMAIL = 'contact@invoiceo.online';

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  onNavigateHome,
  onOpenImportExport,
  onNavigatePage,
}) => {
  const { t } = useTranslation('common');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [wipeConfirm, setWipeConfirm] = useState(false);
  const [wipeSuccess, setWipeSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SUPPORT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleWipeLocalStorage = () => {
    if (!wipeConfirm) {
      setWipeConfirm(true);
      return;
    }
    try {
      localStorage.removeItem('invoiceo_saved_invoices_v1');
      localStorage.removeItem('invoiceo_current_invoice_v1');
      localStorage.removeItem('invoiceo_customization_v1');
      setWipeSuccess(true);
      setWipeConfirm(false);
      setTimeout(() => setWipeSuccess(false), 4000);
    } catch (e) {
      console.error('Failed to wipe local storage:', e);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#1A3263] transition font-medium cursor-pointer"
        >
          {t('footer.quickLinks', 'Home')}
        </button>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{t('privacy.breadcrumb', 'Privacy Policy')}</span>
      </nav>

      {/* 2. Header Banner */}
      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t('privacy.badge', 'Strict Client-Side Privacy')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
          {t('privacy.title', 'Privacy Policy')}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
          {t(
            'privacy.subtitle',
            'Your financial data belongs exclusively to you. Invoiceo.online was intentionally architected so that your customer data, prices, invoices, and payment details never leave your device.'
          )}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {onOpenImportExport && (
            <button
              type="button"
              onClick={onOpenImportExport}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A3263] hover:bg-[#132549] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Launch Data Export & Backup</span>
            </button>
          )}

          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            <span>Back to Invoicing</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onNavigatePage && (
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              <Mail className="w-4 h-4 text-gray-500" />
              <span>Contact Privacy Officer</span>
            </button>
          )}
        </div>

        <p className="mt-5 text-xs text-gray-400">
          {t('privacy.lastRevised', 'Last revised: November 2026 • Version 2.4 • Effective immediately')}
        </p>
      </div>

      {/* 3. Executive Privacy Summary (4 Pillars) */}
      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-emerald-950 flex items-center gap-2.5">
          <Lock className="w-5 h-5 text-emerald-700" />
          <span>{t('privacy.architectureTitle', 'Our Core Privacy Architecture')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed max-w-3xl">
          We believe financial billing utilities should operate like offline calculators—not surveillance tools. Here are the four foundational pillars that protect your privacy:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-2">
              <HardDrive className="w-4 h-4" />
            </div>
            <strong className="block text-gray-900 text-sm">1. Zero Cloud Databases</strong>
            <p className="text-xs text-gray-600 leading-relaxed">
              We operate no remote customer database. Your invoices and client addresses are never uploaded, indexed, or saved on our servers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1A3263] flex items-center justify-center font-bold text-xs mb-2">
              <Cpu className="w-4 h-4" />
            </div>
            <strong className="block text-gray-900 text-sm">2. In-Browser PDF Engine</strong>
            <p className="text-xs text-gray-600 leading-relaxed">
              PDF generation happens 100% inside your browser's local memory using JavaScript (jsPDF). No document data is transmitted across the internet to generate files.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs mb-2">
              <EyeOff className="w-4 h-4" />
            </div>
            <strong className="block text-gray-900 text-sm">3. Zero Data Selling</strong>
            <p className="text-xs text-gray-600 leading-relaxed">
              We do not sell, rent, monetize, or broker personal or commercial data. We never share customer transaction records with advertisers or data brokers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs mb-2">
              <Key className="w-4 h-4" />
            </div>
            <strong className="block text-gray-900 text-sm">4. Complete Sovereignty</strong>
            <p className="text-xs text-gray-600 leading-relaxed">
              You can export full backups or wipe all stored documents from your browser in a single click whenever you choose.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Live Local Storage Control Panel */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Key className="w-5 h-5 text-[#1A3263]" />
              <span>Your Live Device Storage Controls</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Directly exercise your GDPR & CCPA rights of data portability and erasure on this machine right now.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sandboxed LocalStorage Active</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1 text-xs text-gray-600">
            <p><strong>Storage Key:</strong> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-800">invoiceo_saved_invoices_v1</code></p>
            <p><strong>Scope:</strong> Sandboxed to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-800">https://invoiceo.online</code> on this web browser only.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenImportExport && (
              <button
                type="button"
                onClick={onOpenImportExport}
                className="px-4 py-2 bg-[#1A3263] hover:bg-[#132549] text-white rounded-xl text-xs font-bold transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Backup</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleWipeLocalStorage}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer inline-flex items-center gap-1.5 ${
                wipeConfirm
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-bounce'
                  : 'border border-red-200 hover:bg-red-50 text-red-700'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{wipeConfirm ? 'Click Again to Confirm Wipe' : 'Purge All Local Invoices'}</span>
            </button>
          </div>
        </div>

        {wipeSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Local storage purged successfully! All saved document records have been cleared from this browser.</span>
          </div>
        )}
      </div>

      {/* 5. Detailed Legal & Architectural Sections */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-600 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-[#1A3263]" />
            <span>{t('privacy.sec1Title', '1. Information Storage & Device Storage (localStorage)')}</span>
          </h2>
          <p>
            {t(
              'privacy.sec1P1',
              'When you create, edit, or customize documents on Invoiceo.online, data is saved directly to your browser\'s standard localStorage sandbox under dedicated application keys (e.g., invoiceo_saved_invoices_v1 and invoiceo_customization_v1).'
            )}
          </p>
          <p>
            {t(
              'privacy.sec1P2',
              'This allows you to close your tab or browser and resume your work later without needing an account. This storage is completely local to your computer or mobile device and cannot be accessed by third-party websites or external entities.'
            )}
          </p>
          <p>
            Because this storage operates strictly under the browser's <strong>Same-Origin Policy</strong>, no external scripts or websites can read or retrieve your financial documents.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-[#1A3263]" />
            <span>{t('privacy.sec2Title', '2. How Documents & Vector PDFs are Processed')}</span>
          </h2>
          <p>
            {t(
              'privacy.sec2P1',
              'Unlike many cloud invoicing services that send sensitive billing records to backend rendering farms, Invoiceo.online performs all layout calculations, graphics rendering, SVG processing, and vector PDF compilation directly within your web browser using client-side JavaScript.'
            )}
          </p>
          <p>
            {t(
              'privacy.sec2P2',
              'Your client names, line item amounts, banking information, payment terms, and digital signatures remain entirely client-side.'
            )}
          </p>
          <p>
            Calculations for tax sub-totals (compound/simple VAT, GST, Sales Tax), percentage/fixed line discounts, and shipping charges execute immediately in client RAM, eliminating network latency and data exposure risks.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#1A3263]" />
            <span>3. Digital Signatures & Brand Logo Assets</span>
          </h2>
          <p>
            When you draw a digital signature or upload an authorized company logo (PNG, JPG, SVG), the image is encoded as a local base64 Data URL directly inside your browser.
          </p>
          <p>
            We do not maintain remote image buckets, AWS S3 buckets, or public CDN storage for your brand assets. Your logo and authorized signatures never reside on remote cloud servers.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <EyeOff className="w-5 h-5 text-[#1A3263]" />
            <span>{t('privacy.sec3Title', '4. Third Parties & Zero Data Monetization')}</span>
          </h2>
          <p>
            {t(
              'privacy.sec3P1',
              'We do not sell, rent, monetize, or broker personal or commercial data. Because we do not store your invoices on any server, it is technically impossible for us to share or disclose your commercial transaction records with advertisers, marketers, or data brokers.'
            )}
          </p>
          <p>
            We deploy zero advertising tracking pixels, surveillance beacons, or cross-site profiling scripts.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#1A3263]" />
            <span>{t('privacy.sec4Title', '5. Web Hosting & Technical Logs')}</span>
          </h2>
          <p>
            {t(
              'privacy.sec4P1',
              'Like virtually all internet websites, our hosting servers may automatically collect standard technical transmission logs (such as IP addresses, browser user agent strings, and requested asset URLs) to reliably deliver web pages, protect against DDoS attacks, and maintain infrastructure health. These logs do not contain your invoice data.'
            )}
          </p>
          <p>
            Static web assets are served via secure Content Delivery Networks (CDNs) protected by HTTPS/TLS encryption. Transmission logs are routinely purged in accordance with standard infrastructure security schedules.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#1A3263]" />
            <span>{t('privacy.sec5Title', '6. Your Rights & Data Portability (GDPR, CCPA & Global Alignment)')}</span>
          </h2>
          <p>
            {t(
              'privacy.sec5P1',
              'Under modern privacy regulations including the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain the right to access, rectify, export, and erase your personal information:'
            )}
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-gray-700">
            <li>
              <strong>Right of Access & Data Portability:</strong>{' '}
              {t(
                'privacy.sec5Li1',
                'You can export a full JSON file containing every invoice and customization setting using the built-in "Import / Export" modal.'
              )}
            </li>
            <li>
              <strong>Right to Erasure ("Right to be Forgotten"):</strong>{' '}
              {t(
                'privacy.sec5Li2',
                'Deleting Your Data: You can delete individual invoices or wipe your browser\'s cache/localStorage at any time to purge all local records instantly.'
              )}
            </li>
            <li>
              <strong>Right to Rectification:</strong> You can edit and update any customer, company, or tax details immediately in real-time without administrative delays.
            </li>
            <li>
              <strong>Right to Restriction of Processing:</strong> Because all computation occurs locally on your device, processing is inherently restricted to your personal computer.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#1A3263]" />
            <span>7. Cookie Policy & Tracking Technologies</span>
          </h2>
          <p>
            Invoiceo.online does <strong>not</strong> employ commercial tracking cookies, advertising remarketing pixels, or third-party behavioral profiling scripts.
          </p>
          <p>
            We use purely essential local storage to remember your UI language preference (e.g. English, Spanish, French, German) and active document draft between browser visits.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#1A3263]" />
            <span>8. Data Retention & Offline Durability</span>
          </h2>
          <p>
            Because we do not store your data on remote servers, we maintain a <strong>zero-day retention policy</strong> on our backend infrastructure.
          </p>
          <p>
            Locally stored drafts remain in your browser until you either explicitly delete them, clear your browser history/cookies, or perform a local storage reset. We strongly recommend creating regular JSON backup exports for critical accounting records.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {t('privacy.sec6Title', '9. Contact Regarding Privacy & Data Protection')}
          </h2>
          <p>
            {t(
              'privacy.sec6P1',
              'If you have questions about our architecture or privacy commitments, please contact us at:'
            )}
          </p>

          <div className="p-4 bg-slate-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-medium block">Official Privacy & Data Protection Desk</span>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('[Invoiceo Privacy] Inquiry Regarding Data Protection')}`}
                className="font-bold text-[#1A3263] hover:underline text-sm font-mono"
              >
                {SUPPORT_EMAIL}
              </a>
              <span className="text-xs text-gray-400 block">Response time: Within 24-48 business hours</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 border border-gray-300 hover:bg-white rounded-lg text-xs font-semibold text-gray-700 transition cursor-pointer inline-flex items-center gap-1.5"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied Email' : 'Copy Email'}</span>
              </button>

              {onNavigatePage && (
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className="px-3 py-1.5 bg-[#1A3263] hover:bg-[#132549] text-white rounded-lg text-xs font-semibold transition cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Open Contact Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
