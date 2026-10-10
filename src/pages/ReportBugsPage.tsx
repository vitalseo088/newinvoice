import React, { useState, useEffect } from 'react';
import {
  Bug,
  Send,
  CheckCircle2,
  AlertTriangle,
  Monitor,
  Smartphone,
  RefreshCw,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

interface ReportBugsPageProps {
  onNavigateHome: () => void;
}

export const ReportBugsPage: React.FC<ReportBugsPageProps> = ({ onNavigateHome }) => {
  const { t } = useTranslation('common');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('PDF Export');
  const [severity, setSeverity] = useState('Medium');
  const [steps, setSteps] = useState('');
  const [expected, setExpected] = useState('');
  const [email, setEmail] = useState('');
  const [includeSystemInfo, setIncludeSystemInfo] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [bugRef, setBugRef] = useState('');

  // Auto-detected system telemetry for diagnostics
  const [systemInfo, setSystemInfo] = useState({
    browser: '',
    os: '',
    screen: '',
    viewport: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
      let browser = 'Unknown Browser';
      if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
      else if (ua.includes('Edg')) browser = 'Microsoft Edge';
      else if (ua.includes('Chrome')) browser = 'Google Chrome';
      else if (ua.includes('Safari')) browser = 'Apple Safari';

      let os = 'Unknown OS';
      if (ua.includes('Win')) os = 'Windows';
      else if (ua.includes('Mac')) os = 'macOS';
      else if (ua.includes('Linux')) os = 'Linux';
      else if (ua.includes('Android')) os = 'Android';
      else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

      setSystemInfo({
        browser,
        os,
        screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !steps.trim()) return;
    const ref = 'BUG-' + Math.floor(100000 + Math.random() * 900000);
    setBugRef(ref);
    setSubmitted(true);
  };

  const handleReset = () => {
    setTitle('');
    setCategory('PDF Export');
    setSeverity('Medium');
    setSteps('');
    setExpected('');
    setEmail('');
    setSubmitted(false);
  };

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
        <span className="text-gray-900 font-semibold">{t('reportBugs.breadcrumb', 'Report Bugs')}</span>
      </nav>

      {/* Header */}
      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-6 sm:p-10 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-900 border border-amber-200 mb-3">
          <Bug className="w-3.5 h-3.5 text-amber-700" />
          <span>{t('reportBugs.badge', 'Issue & Glitch Tracker')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
          {t('reportBugs.title', 'Report a Bug or Calculation Issue')}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
          {t('reportBugs.subtitle', 'Spotted a PDF rendering flaw, formatting anomaly, or math discrepancy? Your bug reports help ensure Invoiceo.online remains fast, accurate, and completely dependable for thousands of businesses.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Bug Report Form (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('reportBugs.submittedTitle', 'Bug Report Recorded!')}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                <Trans
                  i18nKey="reportBugs.submittedDesc"
                  values={{ bugRef }}
                  components={{ 1: <strong className="text-gray-900 font-mono" /> }}
                  defaults="Thank you for helping us maintain Invoiceo's quality. Your report reference ID is <1>{{bugRef}}</1>. Our engineering team reviews reported reproduction steps daily."
                />
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 transition cursor-pointer"
                >
                  {t('reportBugs.submitAnother', 'Submit Another Bug')}
                </button>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="px-4 py-2 bg-[#1A3263] hover:bg-[#132549] rounded-xl text-xs font-bold text-white transition cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{t('reportBugs.returnToInvoicing', 'Return to Invoicing')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-gray-900">{t('reportBugs.formTitle', 'Describe the Issue')}</h2>
              </div>

              <div>
                <label htmlFor="bug-title" className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t('reportBugs.issueTitle', 'Issue Summary / Title')} <span className="text-red-500">*</span>
                </label>
                <input
                  id="bug-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('reportBugs.issueTitlePlaceholder', 'e.g. PDF logo blurry on mobile export, or Tax not calculating on shipping')}
                  className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bug-category" className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('reportBugs.category', 'Category')}
                  </label>
                  <select
                    id="bug-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] bg-white transition"
                  >
                    <option value="PDF Export">{t('reportBugs.catPdf', 'PDF Export / Vector Quality')}</option>
                    <option value="Calculation">{t('reportBugs.catCalc', 'Calculation / Math / Currency')}</option>
                    <option value="UI & Layout">{t('reportBugs.catUi', 'UI & Visual Layout / Overflow')}</option>
                    <option value="Mobile / Tablet">{t('reportBugs.catMobile', 'Mobile or Tablet Display')}</option>
                    <option value="Storage & Backup">{t('reportBugs.catStorage', 'Saved Invoices / JSON Import-Export')}</option>
                    <option value="Templates">{t('reportBugs.catTemplates', 'Templates & Customization Styles')}</option>
                    <option value="Other">{t('reportBugs.catOther', 'Other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bug-severity" className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('reportBugs.severity', 'Severity')}
                  </label>
                  <select
                    id="bug-severity"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] bg-white transition"
                  >
                    <option value="Low">{t('reportBugs.sevLow', 'Low (Typo, minor cosmetic issue)')}</option>
                    <option value="Medium">{t('reportBugs.sevMed', 'Medium (Awkward layout, workaround available)')}</option>
                    <option value="High">{t('reportBugs.sevHigh', 'High (Feature not functioning as expected)')}</option>
                    <option value="Critical">{t('reportBugs.sevCrit', 'Critical (PDF export failed or data error)')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bug-steps" className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t('reportBugs.stepsToReproduce', 'Steps to Reproduce')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="bug-steps"
                  rows={4}
                  required
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  placeholder={t('reportBugs.stepsPlaceholder', '1. Go to Receipt Generator\n2. Add item with 15% discount\n3. Click Download PDF\n4. Observe discrepancy')}
                  className="w-full text-sm font-mono text-xs sm:text-sm border border-gray-300 rounded-xl p-3.5 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] transition"
                />
              </div>

              <div>
                <label htmlFor="bug-expected" className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t('reportBugs.expectedVsActual', 'Expected vs. Actual Result')} <span className="text-gray-400 font-normal">{t('contact.optional', '(optional)')}</span>
                </label>
                <textarea
                  id="bug-expected"
                  rows={2}
                  value={expected}
                  onChange={(e) => setExpected(e.target.value)}
                  placeholder={t('reportBugs.expectedPlaceholder', 'Expected discount to deduct $15, but it deducted $10...')}
                  className="w-full text-sm border border-gray-300 rounded-xl p-3 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] transition"
                />
              </div>

              <div>
                <label htmlFor="bug-email" className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t('reportBugs.emailLabel', 'Your Email')} <span className="text-gray-400 font-normal">{t('reportBugs.emailHint', '(optional, if you’d like follow-up confirmation)')}</span>
                </label>
                <input
                  id="bug-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('reportBugs.emailPlaceholder', 'you@company.com')}
                  className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] transition"
                />
              </div>

              {/* Auto-detected System Specs Checkbox */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
                <input
                  id="include-specs"
                  type="checkbox"
                  checked={includeSystemInfo}
                  onChange={(e) => setIncludeSystemInfo(e.target.checked)}
                  className="mt-1 h-4 w-4 text-[#1A3263] rounded border-gray-300 cursor-pointer"
                />
                <label htmlFor="include-specs" className="text-xs text-gray-600 cursor-pointer">
                  <span className="font-bold text-gray-900 block mb-0.5">
                    {t('reportBugs.includeSpecs', 'Include detected technical diagnostics')}
                  </span>
                  <span>
                    {t('reportBugs.includeSpecsDesc', 'Auto-attaches browser ({{browser}} on {{os}}) and viewport ({{viewport}}) to accelerate reproduction.', {
                      browser: systemInfo.browser,
                      os: systemInfo.os,
                      viewport: systemInfo.viewport,
                    })}
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500">
                  {t('reportBugs.footerNotice', 'Bug reports are reviewed directly by developers.')}
                </span>
                <button
                  type="submit"
                  disabled={!title.trim() || !steps.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A3263] hover:bg-[#132549] disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-sm transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('reportBugs.submitBtn', 'Submit Bug Report')}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Quick Diagnostics Sidebar (1 col) */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
              {t('reportBugs.selfFixTitle', 'Quick Self-Fix Checklist')}
            </h3>

            <div className="space-y-3.5 text-xs text-gray-600">
              <div className="flex items-start gap-2.5">
                <RefreshCw className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block mb-0.5">{t('reportBugs.fix1Title', 'Force Browser Reload:')}</strong>
                  <span>{t('reportBugs.fix1Desc', 'Press Ctrl + Shift + R to ensure you have the latest build.')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Monitor className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block mb-0.5">{t('reportBugs.fix2Title', 'Ad-Blocker Notice:')}</strong>
                  <span>{t('reportBugs.fix2Desc', 'Some aggressive privacy extensions block canvas rendering used for PDF creation. Try whitelisting the site.')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block mb-0.5">{t('reportBugs.fix3Title', 'Direct Developer Mail:')}</strong>
                  <span>{t('reportBugs.fix3Desc', 'For critical issues, email developer support directly at bugs@invoiceo.online.')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
