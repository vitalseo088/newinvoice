import React from 'react';
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
} from 'lucide-react';

interface PrivacyPageProps {
  onNavigateHome: () => void;
  onOpenImportExport?: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigateHome, onOpenImportExport }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#1A3263] transition font-medium cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-gray-900 font-semibold">Privacy Policy</span>
      </nav>

      {/* Header */}
      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-6 sm:p-10 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Strict Client-Side Privacy</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
          Your financial data belongs exclusively to you. Invoiceo.online was intentionally architected
          so that your customer data, prices, invoices, and payment details never leave your device.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Last revised: October 2026 • Effective immediately
        </p>
      </div>

      {/* Key Privacy Highlights Card */}
      <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-700" />
          <span>Our Core Privacy Architecture</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-emerald-900">
          <div className="bg-white/80 rounded-xl p-4 border border-emerald-100">
            <strong className="block text-emerald-950 mb-1">1. Zero Cloud Databases</strong>
            <p className="text-xs text-emerald-800 leading-relaxed">
              We operate no remote customer database. Your invoices and client addresses are never uploaded,
              indexed, or saved on our servers.
            </p>
          </div>
          <div className="bg-white/80 rounded-xl p-4 border border-emerald-100">
            <strong className="block text-emerald-950 mb-1">2. In-Browser PDF Rendering</strong>
            <p className="text-xs text-emerald-800 leading-relaxed">
              PDF generation happens 100% inside your browser's local memory using JavaScript (jsPDF).
              No document data is transmitted across the internet to generate files.
            </p>
          </div>
          <div className="bg-white/80 rounded-xl p-4 border border-emerald-100">
            <strong className="block text-emerald-950 mb-1">3. Complete Local Control</strong>
            <p className="text-xs text-emerald-800 leading-relaxed">
              You can export full backups or wipe all stored documents from your browser in a single click
              whenever you choose.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Legal Sections */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-600 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-[#1A3263]" />
            <span>1. Information Storage & Device Storage (localStorage)</span>
          </h2>
          <p>
            When you create, edit, or customize documents on Invoiceo.online, data is saved directly
            to your browser's standard <code>localStorage</code> sandbox under dedicated application keys
            (e.g., <code>invoiceo_saved_invoices_v1</code> and <code>invoiceo_customization_v1</code>).
          </p>
          <p>
            This allows you to close your tab or browser and resume your work later without needing an
            account. This storage is completely local to your computer or mobile device and cannot be accessed
            by third-party websites or external entities.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-[#1A3263]" />
            <span>2. How Documents & Vector PDFs are Processed</span>
          </h2>
          <p>
            Unlike many cloud invoicing services that send sensitive billing records to backend rendering
            farms, Invoiceo.online performs all layout calculations, graphics rendering, SVG processing,
            and vector PDF compilation directly within your web browser using client-side JavaScript.
          </p>
          <p>
            Your client names, line item amounts, banking information, payment terms, and digital signatures
            remain entirely client-side.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <EyeOff className="w-5 h-5 text-[#1A3263]" />
            <span>3. Third Parties & Zero Data Monetization</span>
          </h2>
          <p>
            We do not sell, rent, monetize, or broker personal or commercial data. Because we do not store
            your invoices on any server, it is technically impossible for us to share or disclose your
            commercial transaction records with advertisers, marketers, or data brokers.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#1A3263]" />
            <span>4. Web Hosting & Technical Logs</span>
          </h2>
          <p>
            Like virtually all internet websites, our hosting servers may automatically collect standard
            technical transmission logs (such as IP addresses, browser user agent strings, and requested asset
            URLs) to reliably deliver web pages, protect against DDoS attacks, and maintain infrastructure
            health. These logs do not contain your invoice data.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#1A3263]" />
            <span>5. Your Rights & Data Portability (GDPR & CCPA Alignment)</span>
          </h2>
          <p>
            Under modern privacy regulations including the General Data Protection Regulation (GDPR) and
            California Consumer Privacy Act (CCPA), you retain the right to access, rectify, export, and erase
            your personal information:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700">
            <li>
              <strong>Exporting Your Data:</strong> You can export a full JSON file containing every invoice
              and customization setting using the built-in "Import / Export" modal.
            </li>
            <li>
              <strong>Deleting Your Data:</strong> You can delete individual invoices or wipe your browser's
              cache/localStorage at any time to purge all local records instantly.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            6. Contact Regarding Privacy
          </h2>
          <p>
            If you have questions about our architecture or privacy commitments, please contact us at:
            <br />
            <a
              href="mailto:privacy@invoiceo.online"
              className="font-bold text-[#1A3263] hover:underline"
            >
              privacy@invoiceo.online
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};
