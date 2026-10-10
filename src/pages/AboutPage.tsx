import React from 'react';
import {
  Info,
  ShieldCheck,
  Zap,
  Lock,
  FileCheck2,
  Download,
  CheckCircle2,
  ArrowRight,
  Globe,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TOOLS_CONFIG } from '../data/toolsConfig';

interface AboutPageProps {
  onNavigateHome: () => void;
  onSelectTool: (slug: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome, onSelectTool }) => {
  const { t } = useTranslation('common');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Breadcrumb & Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#1A3263] transition font-medium cursor-pointer"
        >
          {t('footer.quickLinks', 'Home')}
        </button>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{t('about.breadcrumb', 'About Us')}</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#1A3263]/10 text-[#1A3263] border border-[#1A3263]/15 mb-3">
          <Info className="w-3.5 h-3.5" />
          <span>{t('about.badge', 'About Invoiceo.online')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 max-w-3xl leading-tight">
          {t('about.title', 'Empowering small businesses with free, private, and instant commercial invoicing.')}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
          {t('about.subtitle', 'Invoiceo.online is an open-access web application built for freelancers, contractors, tradespeople, consultants, and independent business owners worldwide. We eliminate the subscription fees, forced account registrations, and intrusive watermarks common in modern invoicing software.')}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A3263] hover:bg-[#132549] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <span>{t('about.createInvoiceBtn', 'Create an Invoice Now')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            <span>{t('about.viewToolsBtn', 'View All 12 Document Tools')}</span>
          </a>
        </div>
      </div>

      {/* Why We Built Invoiceo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A3263] flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">{t('about.privateTitle', '100% Private & Client-Side')}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('about.privateDesc', 'Your billing records, client addresses, and rates stay strictly inside your browser’s local storage. We operate zero databases or remote tracking servers.')}
          </p>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">{t('about.noSignTitle', 'No Sign-Up or Paywalls')}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('about.noSignDesc', 'Open the site and start typing immediately. There are no credit cards, registration forms, monthly invoices to pay, or limits on how many documents you can generate.')}
          </p>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
            <Download className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">{t('about.vectorTitle', 'Crisp Vector PDFs')}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('about.vectorDesc', 'Every document is rendered using true vector PDF technology with selectable text, clean borders, signature integration, and printable layouts.')}
          </p>
        </div>
      </div>

      {/* Our Core Commitments */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('about.principlesTitle', 'Our Guiding Principles')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 block mb-1">{t('about.principle1Title', 'Zero Watermarks on Output')}</strong>
              <p>{t('about.principle1Desc', 'Your business documents should look 100% professional. We never stamp promotional watermarks, vendor URLs, or branding onto your client PDFs.')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 block mb-1">{t('about.principle2Title', 'Global Currency & Multi-Tax Support')}</strong>
              <p>{t('about.principle2Desc', 'Over 35 international currencies and customizable tax, discount, and shipping calculations to comply with global business standards.')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 block mb-1">{t('about.principle3Title', 'Data Portability with JSON Backup')}</strong>
              <p>{t('about.principle3Desc', 'Easily export all your invoices and settings into an encrypted-ready JSON file and restore it on any computer or browser anytime.')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 block mb-1">{t('about.principle4Title', 'Accessible Everywhere')}</strong>
              <p>{t('about.principle4Desc', 'Engineered for high performance on desktops, laptops, tablets, and smartphones without demanding bloated software downloads.')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suite of 12 Generator Tools */}
      <div id="tools" className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('about.generatorsTitle', '12 Commercial Document Generators')}</h2>
            <p className="text-sm text-gray-600 mt-1">{t('about.generatorsSubtitle', 'Each tailored with standard prefixes, document layouts, and fields.')}</p>
          </div>
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-xs font-bold text-[#1A3263] hover:underline cursor-pointer"
          >
            {t('about.primaryGeneratorLink', 'Go to Primary Invoice Generator →')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_CONFIG.map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => onSelectTool(tool.slug)}
              className="p-4 rounded-xl border border-gray-200 hover:border-[#1A3263] hover:shadow-md transition text-left group cursor-pointer bg-slate-50/50 hover:bg-white"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#1A3263] transition">
                  {tool.name}
                </span>
                <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-[#1A3263]">
                  {tool.numberPrefix}0001
                </span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">
                {tool.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
