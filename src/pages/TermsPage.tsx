import React from 'react';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TermsPageProps {
  onNavigateHome: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigateHome }) => {
  const { t } = useTranslation('common');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#1A3263] transition font-medium cursor-pointer"
        >
          {t('footer.quickLinks', 'Home')}
        </button>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{t('terms.breadcrumb', 'Terms of Use')}</span>
      </nav>

      {/* Header */}
      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-6 sm:p-10 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#1A3263]/10 text-[#1A3263] border border-[#1A3263]/15 mb-3">
          <FileCheck className="w-3.5 h-3.5" />
          <span>{t('terms.badge', 'Terms & Conditions')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
          {t('terms.title', 'Terms of Use')}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
          {t('terms.subtitle', 'Please review these terms governing the use of Invoiceo.online. By accessing or using our free document generation tools, you acknowledge and agree to these terms.')}
        </p>
        <p className="mt-2 text-xs text-gray-400">
          {t('terms.lastRevised', 'Last revised: October 2026 • Version 2.0')}
        </p>
      </div>

      {/* Quick Summary Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#1A3263]" />
          <span>{t('terms.summaryTitle', 'Key Summary in Plain English')}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-gray-600 mt-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <strong className="text-gray-900 block mb-1">{t('terms.sum1Title', '100% Free For Commercial Use')}</strong>
            <p>{t('terms.sum1Desc', 'You may generate unlimited invoices, quotes, receipts, and commercial documents for your business without paying any licensing fees.')}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <strong className="text-gray-900 block mb-1">{t('terms.sum2Title', 'You Own All Your Content')}</strong>
            <p>{t('terms.sum2Desc', 'You retain 100% ownership of your business name, logos, customer lists, and created PDF documents. We claim zero rights.')}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <strong className="text-gray-900 block mb-1">{t('terms.sum3Title', 'Backup Responsibility')}</strong>
            <p>{t('terms.sum3Desc', 'Because data is saved locally on your device, you are responsible for maintaining backups using our JSON export utility.')}</p>
          </div>
        </div>
      </div>

      {/* Full Legal Text */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-sm text-gray-600 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">{t('terms.sec1Title', '1. Acceptance & Service Scope')}</h2>
          <p>
            {t('terms.sec1Desc', 'Invoiceo.online is provided as a free, open-access, browser-based productivity tool designed to facilitate the creation of commercial documents, including invoices, receipts, estimates, quotes, proforma invoices, work orders, timesheets, and packing slips. By accessing our site, you agree to use the service in compliance with all applicable local, national, and international laws.')}
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{t('terms.sec2Title', '2. Permitted Commercial & Personal Use')}</h2>
          <p>
            {t('terms.sec2Desc', 'You are granted a non-exclusive, revocable, royalty-free license to use the generators provided on Invoiceo.online for legitimate personal, professional, and commercial transactions. You agree not to use the service for fraudulent invoicing, illegal transactions, identity deception, or malicious activities.')}
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-900">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold">{t('terms.sec3Title', '3. Calculation & Tax Compliance Disclaimer')}</h2>
          </div>
          <p>
            {t('terms.sec3Desc', 'While Invoiceo.online provides precision client-side mathematical calculation engines (subtotals, compound/simple taxes, percentage or fixed discounts, and shipping additions), you are solely responsible for:')}
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700">
            <li>{t('terms.sec3Li1', 'Verifying all calculation totals, exchange rates, and figures before issuing invoices to customers.')}</li>
            <li>
              {t('terms.sec3Li2', 'Ensuring your invoices meet all statutory invoicing requirements in your jurisdiction, such as Value Added Tax (VAT), Goods and Services Tax (GST), Sales Tax, Tax Registration Numbers, and mandatory fiscal invoice sequences.')}
            </li>
            <li>{t('terms.sec3Li3', 'Consulting with a licensed accountant or legal counsel for jurisdiction-specific compliance.')}</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{t('terms.sec4Title', '4. Device Storage & Backup Responsibility')}</h2>
          <p>
            {t('terms.sec4P1', 'Invoiceo.online does not store your invoice records on remote servers. All data is saved exclusively to your local browser storage (localStorage). Consequently, actions such as clearing browser history, browsing in private/incognito mode, or resetting device settings may permanently erase locally saved invoices.')}
          </p>
          <p>
            {t('terms.sec4P2', 'We strongly recommend using the built-in Export & Backup JSON utility regularly to maintain offline backups of your commercial records. Invoiceo.online is not liable for data loss resulting from browser cache clearance or device failure.')}
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{t('terms.sec5Title', '5. Intellectual Property & Ownership')}</h2>
          <p>
            {t('terms.sec5P1', 'All custom content, business branding, uploaded logos, client records, invoice text, and generated PDF files created by you remain your sole intellectual property. Invoiceo.online claims zero copyright, trademark, or ownership interest in any documents you produce.')}
          </p>
          <p>
            {t('terms.sec5P2', 'The software architecture, source code, styling, visual assets, and trademarks of Invoiceo.online remain the property of the site operators.')}
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-900">
            <ShieldAlert className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-bold">{t('terms.sec6Title', '6. Limitation of Liability & "As Is" Warranty')}</h2>
          </div>
          <p>
            {t('terms.sec6Desc', 'Invoiceo.online is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. In no event shall Invoiceo.online or its contributors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of the use or inability to use this web utility.')}
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{t('terms.sec7Title', '7. Questions & Legal Inquiries')}</h2>
          <p>
            {t('terms.sec7Desc', 'For questions or clarification regarding these Terms of Use, please reach out via email:')}
            <br />
            <a
              href="mailto:legal@invoiceo.online"
              className="font-bold text-[#1A3263] hover:underline"
            >
              legal@invoiceo.online
            </a>
          </p>
        </section>
      </div>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A3263] hover:bg-[#132549] text-white rounded-xl text-sm font-bold shadow-md transition cursor-pointer"
        >
          <span>{t('terms.returnBtn', 'Return to Invoice Generator')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
