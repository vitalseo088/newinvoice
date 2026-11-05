import React, { useState } from 'react';
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
  FileText,
  Database,
  Cpu,
  Layers,
  HelpCircle,
  ChevronDown,
  Mail,
  PenTool,
  Printer,
  Scale,
  DollarSign,
  Award,
  Users,
  Copy,
  Check,
  ExternalLink,
  XCircle,
} from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { TOOLS_CONFIG, ToolConfig } from '../data/toolsConfig';
import { InfoPageSlug } from '../components/Footer';

export interface AboutPageProps {
  onNavigateHome: () => void;
  onSelectTool: (slug: string) => void;
  onNavigatePage?: (page: InfoPageSlug) => void;
}

const SUPPORT_EMAIL = 'contact@invoiceo.online';

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onSelectTool,
  onNavigatePage,
}) => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const categories = [
    'All',
    'Billing',
    'Sales & Quotes',
    'Operations & Fulfillment',
    'Time & Contracting',
  ];

  const filteredTools =
    selectedCategory === 'All'
      ? TOOLS_CONFIG
      : TOOLS_CONFIG.filter((tool) => tool.category === selectedCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SUPPORT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'Is Invoiceo really 100% free with no hidden charges or subscriptions?',
      a: 'Yes, completely. There are no paywalls, hidden upgrade tiers, credit card requests, or limits on how many documents you can generate. All 12 commercial tools, PDF vector rendering, template customization, and digital signature features are freely accessible to businesses of all sizes worldwide.',
    },
    {
      q: 'Where is my sensitive financial and customer data stored?',
      a: 'All data is stored exclusively in your local browser storage (HTML5 localStorage). When you edit an invoice or add customer details, that information never leaves your device and is never sent to our servers. We run zero cloud databases, ensuring absolute confidentiality for your client records and billing amounts.',
    },
    {
      q: 'Are Invoiceo PDF documents legally valid for commercial accounting and tax compliance?',
      a: 'Yes. Invoiceo generates true vector PDF files with selectable text, standard billing numbering sequences, precise math engines (subtotals, multi-rate tax/VAT/GST, line discounts, shipping), authorized signature blocks, and payment instructions. Always verify that your invoice includes statutory requirements specific to your jurisdiction (such as VAT ID or fiscal registration).',
    },
    {
      q: 'Can I add my company logo, digital signature, and custom brand colors?',
      a: 'Absolutely. You can upload high-resolution company logos (PNG, JPG, SVG), select from 5 curated font pairings, adjust primary and header background accent colors, and draw or upload an authorized digital signature with custom job titles and signature dates.',
    },
    {
      q: 'What happens if I clear my browser history or switch computers?',
      a: 'Because data is stored on your device rather than our servers, clearing your browser cache or switching devices will not automatically sync your invoices. We provide a built-in 1-click JSON Import/Export utility that allows you to download an offline encrypted-ready backup of all your saved invoices and restore them on any computer at any time.',
    },
    {
      q: 'How can I get technical support, submit feedback, or request a new generator?',
      a: 'You can email our developer support team directly at contact@invoiceo.online or use our built-in Contact Us page. We actively review user suggestions, bug reports, and regional tax calculation requests, typically responding within 24 to 48 business hours.',
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* 1. Breadcrumb & Navigation */}
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

      {/* 2. Hero Header Section */}
      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#1A3263]/10 text-[#1A3263] border border-[#1A3263]/15 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('about.badge', 'About Invoiceo.online')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 max-w-4xl leading-[1.15]">
          {t('about.title', 'Empowering small businesses with free, private, and instant commercial invoicing.')}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
          {t(
            'about.subtitle',
            'Invoiceo.online is an open-access web application built for freelancers, contractors, tradespeople, consultants, and independent business owners worldwide. We eliminate the subscription paywalls, forced account registrations, and intrusive watermarks common in modern invoicing software.'
          )}
        </p>

        {/* Action CTAs */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#1A3263] hover:bg-[#132549] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <span>{t('about.createInvoiceBtn', 'Create an Invoice Now')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#tools"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            <Layers className="w-4 h-4 text-gray-600" />
            <span>{t('about.viewToolsBtn', 'View All 12 Document Tools')}</span>
          </a>

          {onNavigatePage && (
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              <Mail className="w-4 h-4 text-gray-500" />
              <span>Contact Our Team</span>
            </button>
          )}
        </div>

        {/* Trust Badges / Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 mt-8 border-t border-gray-100">
          <div className="p-3 bg-slate-50/70 rounded-xl border border-gray-200/60">
            <div className="text-2xl font-extrabold text-[#1A3263]">12 Tools</div>
            <div className="text-xs text-gray-600 font-medium mt-0.5">Commercial document generators</div>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-gray-200/60">
            <div className="text-2xl font-extrabold text-emerald-700">$0 Cost</div>
            <div className="text-xs text-gray-600 font-medium mt-0.5">100% free with zero paywalls</div>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-gray-200/60">
            <div className="text-2xl font-extrabold text-purple-700">100% Private</div>
            <div className="text-xs text-gray-600 font-medium mt-0.5">Zero cloud storage or tracking</div>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-gray-200/60">
            <div className="text-2xl font-extrabold text-blue-700">26 Languages</div>
            <div className="text-xs text-gray-600 font-medium mt-0.5">With full LTR & RTL support</div>
          </div>
        </div>
      </div>

      {/* 3. The Problem with Legacy Invoicing vs The Invoiceo Way */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Why We Built Invoiceo
          </h2>
          <p className="text-sm text-gray-600">
            Invoicing software used to be straightforward. Over time, corporate platforms added paywalls, logins, and lock-in. We built a modern alternative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Traditional Software Card */}
          <div className="bg-red-50/40 border border-red-200/70 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Traditional Invoicing Software</h3>
                <span className="text-xs text-red-700 font-medium">Subscription traps & privacy risks</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>$15 to $35/month recurring subscription fees just to send basic billing PDFs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Forced user sign-ups, password management, and unwanted marketing newsletters.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Confidential billing rates and client rosters stored on vulnerable third-party servers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Ugly promotional watermarks and vendor branding stamped onto your client documents.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Proprietary data formats designed to create artificial vendor lock-in.</span>
              </li>
            </ul>
          </div>

          {/* The Invoiceo Approach Card */}
          <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">The Invoiceo.online Approach</h3>
                <span className="text-xs text-emerald-700 font-medium">100% free, private & instant</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% free forever for unlimited invoices, receipts, quotes, and work orders.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>No sign-up or login required: open the page and generate clean documents instantly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero-server storage: client records remain strictly in your browser’s localStorage.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Pristine vector PDFs with crisp typography, digital signatures, and zero watermarks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Complete data portability: export and restore all invoices with 1-click JSON backups.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Client-Side Zero-Server Architecture Explanation */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1A3263] border border-blue-200/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Architecture & Data Safety</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            How Our Zero-Server Privacy Architecture Protects You
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Unlike cloud accounting platforms that upload your business data to remote cloud databases, Invoiceo is engineered as a purely client-side static web application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl border border-gray-200/80 bg-slate-50/50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#1A3263] flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Local Browser Storage</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              When you draft invoices or add client names, all data is saved securely to your browser’s HTML5 localStorage. No centralized database holds your records.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200/80 bg-slate-50/50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">In-Browser PDF Rendering</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              PDF generation happens locally on your computer’s processor using client-side vector synthesis. No documents are transmitted across the web to be converted.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200/80 bg-slate-50/50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Zero Data Monetization</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Because we never collect your invoice data, it is technically impossible for us to sell, share, or analyze your commercial transactions or customer lists.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Platform Feature Pillars */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Professional Invoicing Capabilities
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Engineered to handle every stage of your billing, quoting, and commercial record-keeping workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-gray-200/80 hover:border-[#1A3263] transition space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1A3263] flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Crisp Vector PDFs</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              True vector PDF output with searchable text, crisp lines, transparent logo rendering, and standard ISO printing dimensions.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200/80 hover:border-[#1A3263] transition space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">35+ Currencies & Smart Taxes</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Full support for USD, EUR, GBP, JPY, CAD, AUD, INR, and more with configurable VAT, GST, discounts, and shipping additions.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200/80 hover:border-[#1A3263] transition space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <PenTool className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Interactive Digital Signatures</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Draw on-screen or upload transparent signature assets with signer names, job titles, and authorized sign dates.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200/80 hover:border-[#1A3263] transition space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">1-Click JSON Data Portability</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Export and import full JSON archives of your invoices, custom templates, and settings to move across devices without lock-in.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200/80 hover:border-[#1A3263] transition space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">26 Languages & RTL Support</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Full multi-language user interfaces with native Right-to-Left (RTL) formatting for Arabic and Urdu speaking businesses.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200/80 hover:border-[#1A3263] transition space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Zero Watermarks Guarantee</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Your invoices should reflect your brand, not ours. We never place marketing banners or promotional text onto your PDFs.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Suite of 12 Document Tools with Interactive Category Filter */}
      <div id="tools" className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Complete Commercial Document Suite
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Select any generator to open a tailored template with standard prefixes and industry layouts.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-xs font-bold text-[#1A3263] hover:underline cursor-pointer inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Primary Invoice Generator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-b border-gray-100 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1A3263] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {filteredTools.map((tool: ToolConfig) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => onSelectTool(tool.slug)}
              className="p-5 rounded-xl border border-gray-200/90 hover:border-[#1A3263] hover:shadow-md transition text-left group cursor-pointer bg-slate-50/40 hover:bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-900 group-hover:text-[#1A3263] transition">
                    {tool.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-[#1A3263] bg-white group-hover:bg-blue-50 px-2 py-0.5 rounded border border-gray-200/60 transition">
                    {tool.numberPrefix}0001
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">{tool.category}</span>
                <span className="text-[#1A3263] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 7. Frequently Asked Questions Section */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/60">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600">
            Everything you need to know about our free invoicing architecture and data privacy.
          </p>
        </div>

        <div className="divide-y divide-gray-100 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left font-bold text-gray-900 text-sm sm:text-base hover:text-[#1A3263] transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1A3263]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed pr-6 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. Contact & Support Outreach Card */}
      <div className="bg-gradient-to-br from-[#1A3263] to-[#132549] text-white rounded-2xl p-6 sm:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 text-white border border-white/20 inline-block mb-1">
            Direct Developer Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Have questions or suggestions?
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            We are dedicated to maintaining the world’s most accessible, transparent, and private billing tool. Reach out anytime with feedback or feature requests.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/20 px-4 py-2.5 rounded-xl text-sm font-semibold">
            <Mail className="w-4 h-4 text-blue-200" />
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-white hover:underline font-mono text-xs sm:text-sm"
            >
              {SUPPORT_EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-1 hover:bg-white/20 rounded transition cursor-pointer ml-1"
              title="Copy email address"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {onNavigatePage && (
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className="px-5 py-2.5 bg-white text-[#1A3263] hover:bg-blue-50 font-bold rounded-xl text-sm transition cursor-pointer shadow-sm"
            >
              Open Contact Form
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
