import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldCheck, Download, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Header } from './components/Header';
import { ActionToolbar } from './components/ActionToolbar';
import { InvoiceEditor } from './components/InvoiceEditor';
import { InvoicePreview } from './components/InvoicePreview';
import { CustomizeModal } from './components/CustomizeModal';
import { MyInvoicesModal } from './components/MyInvoicesModal';
import { ImportExportModal } from './components/ImportExportModal';
import { SignatureModal } from './components/SignatureModal';
import { TemplatesLibrary } from './components/TemplatesLibrary';
import { CompleteGuide } from './components/CompleteGuide';
import { ProfessionTemplateExample } from './data/professionExamples';
import { Footer, InfoPageSlug } from './components/Footer';
import { InvoiceData, TemplateId, InvoiceFontFamily } from './types/invoice';
import { TEMPLATES } from './utils/templates';
import { TOOLS_CONFIG, getToolBySlug } from './data/toolsConfig';
import {
  getAllInvoices,
  getCurrentInvoice,
  saveInvoice,
  setCurrentInvoiceId,
  createNewInvoice,
  createNewDocument,
  getBlankInvoice,
  duplicateInvoice,
  deleteInvoice,
  getDefaultInvoice,
} from './utils/storage';
import { generateInvoicePdf, downloadInvoicePdf, printInvoicePdfDirect } from './utils/pdfGenerator';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ReportBugsPage } from './pages/ReportBugsPage';

export type AppRoute =
  | { type: 'tool'; slug: string }
  | { type: 'info'; page: InfoPageSlug };

function parseRouteFromLocation(): AppRoute {
  if (typeof window === 'undefined') return { type: 'tool', slug: 'invoice-generator' };
  const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  const path = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '').trim().toLowerCase();
  const raw = hash || path;

  if (raw === 'about') return { type: 'info', page: 'about' };
  if (raw === 'contact' || raw === 'contact-us') return { type: 'info', page: 'contact' };
  if (raw === 'privacy' || raw === 'privacy-policy') return { type: 'info', page: 'privacy' };
  if (raw === 'terms' || raw === 'terms-of-use' || raw === 'terms-and-conditions') return { type: 'info', page: 'terms' };
  if (raw === 'bugs' || raw === 'report-bugs' || raw === 'bug-report') return { type: 'info', page: 'bugs' };

  if (raw) {
    const fromSlug = getToolBySlug(raw);
    if (fromSlug) return { type: 'tool', slug: fromSlug.slug };
  }
  return { type: 'tool', slug: 'invoice-generator' };
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => parseRouteFromLocation());
  const currentToolSlug = currentRoute.type === 'tool' ? currentRoute.slug : 'invoice-generator';
  const currentTool = getToolBySlug(currentToolSlug) || TOOLS_CONFIG[0];

  const [currentInvoice, setCurrentInvoice] = useState<InvoiceData>(() => {
    const initialRoute = parseRouteFromLocation();
    const slug = initialRoute.type === 'tool' ? initialRoute.slug : 'invoice-generator';
    const tool = getToolBySlug(slug) || TOOLS_CONFIG[0];
    const all = getAllInvoices();
    if (tool.slug !== 'invoice-generator') {
      const match = all.find(
        (i) => i.number.startsWith(tool.numberPrefix) || i.title.toUpperCase().includes(tool.shortName.toUpperCase())
      );
      if (match) return match;
      const initialDoc = tool.getDefaultData();
      saveInvoice(initialDoc);
      return initialDoc;
    }
    return getCurrentInvoice();
  });
  const [allInvoices, setAllInvoices] = useState<InvoiceData[]>(() => getAllInvoices());
  const [activeTab, setActiveTab] = useState<'invoice' | 'preview'>('invoice');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [storageErrorToast, setStorageErrorToast] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isMyInvoicesOpen, setIsMyInvoicesOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);

  // Autosave debounce timer
  const saveTimerRef = useRef<number | null>(null);

  // Sync route from URL popstate / hashchange (browser Back / Forward navigation)
  useEffect(() => {
    const onLocationChange = () => {
      const route = parseRouteFromLocation();
      setCurrentRoute(route);

      if (route.type === 'tool') {
        const tool = getToolBySlug(route.slug) || TOOLS_CONFIG[0];
        const all = getAllInvoices();
        const match = all.find(
          (i) => i.number.startsWith(tool.numberPrefix) || i.title.toUpperCase().includes(tool.shortName.toUpperCase())
        );
        if (match) {
          setCurrentInvoice(match);
          setCurrentInvoiceId(match.id);
        } else if (tool.slug !== 'invoice-generator') {
          const fresh = tool.getDefaultData();
          saveInvoice(fresh);
          setCurrentInvoice(fresh);
          setAllInvoices(getAllInvoices());
        }
      }
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Update dynamic page title, meta description, and social meta tags per active route
  useEffect(() => {
    let title = currentTool.metaTitle;
    let desc = currentTool.metaDescription;

    if (currentRoute.type === 'info') {
      switch (currentRoute.page) {
        case 'about':
          title = 'About Us | Free & Private Invoice Suite - Invoiceo.online';
          desc = 'Learn about Invoiceo.online: 100% free, private browser-based invoicing with zero subscriptions and 12 document tools.';
          break;
        case 'contact':
          title = 'Contact Us | Support & Feedback - Invoiceo.online';
          desc = 'Contact the Invoiceo.online team for support, feature suggestions, partnership inquiries, or general feedback.';
          break;
        case 'privacy':
          title = 'Privacy Policy | 100% Client-Side Privacy - Invoiceo.online';
          desc = 'Our strict privacy policy. Zero cloud databases, in-browser PDF rendering, and total user data ownership.';
          break;
        case 'terms':
          title = 'Terms of Use | Free Invoicing Tools - Invoiceo.online';
          desc = 'Terms of use and service agreement for Invoiceo.online free commercial invoicing and document generators.';
          break;
        case 'bugs':
          title = 'Report a Bug | Issue & Glitch Tracker - Invoiceo.online';
          desc = 'Report layout glitches, math/tax discrepancies, or PDF rendering bugs to Invoiceo developers.';
          break;
      }
    }

    document.title = title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', desc);
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', title);
    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', desc);
  }, [currentRoute, currentTool]);

  // Navigate to an individual tool's dedicated page
  const handleSelectTool = (slug: string) => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    const tool = getToolBySlug(slug) || TOOLS_CONFIG[0];
    setCurrentRoute({ type: 'tool', slug: tool.slug });

    // Update browser URL history seamlessly without reload
    try {
      const newPath = tool.slug === 'invoice-generator' ? '/' : `/${tool.slug}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState(null, '', newPath);
      }
    } catch {
      try {
        window.location.hash = `#/${tool.slug}`;
      } catch {}
    }

    // Switch or create document for this tool
    const isCurrentMatching =
      currentInvoice.title.toUpperCase().includes(tool.shortName.toUpperCase()) ||
      currentInvoice.number.startsWith(tool.numberPrefix);

    if (!isCurrentMatching) {
      const all = getAllInvoices();
      const existing = all.find(
        (inv) =>
          inv.number.startsWith(tool.numberPrefix) ||
          inv.title.toUpperCase().includes(tool.shortName.toUpperCase())
      );
      if (existing) {
        setCurrentInvoice(existing);
        setCurrentInvoiceId(existing.id);
      } else {
        const fresh = tool.getDefaultData();
        saveInvoice(fresh);
        setCurrentInvoice(fresh);
        setAllInvoices(getAllInvoices());
      }
    }

    setActiveTab('invoice');
    setSaveStatus('saved');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to dedicated info page (About, Contact, Privacy, Terms, Report Bugs)
  const handleNavigatePage = (page: InfoPageSlug) => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    setCurrentRoute({ type: 'info', page });

    const pathSlug = page === 'bugs' ? 'report-bugs' : page;
    try {
      const newPath = `/${pathSlug}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState(null, '', newPath);
      }
    } catch {
      try {
        window.location.hash = `#/${pathSlug}`;
      } catch {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    handleSelectTool('invoice-generator');
  };

  // Trigger autosave on invoice change
  const handleInvoiceChange = useCallback((updated: InvoiceData) => {
    setCurrentInvoice(updated);
    setSaveStatus('saving');

    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = window.setTimeout(() => {
      const res = saveInvoice(updated);
      if (res.success) {
        setSaveStatus('saved');
        setAllInvoices(getAllInvoices());
      } else {
        setSaveStatus('error');
        setStorageErrorToast(res.error || 'Failed to autosave invoice to localStorage.');
      }
    }, 450);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  // Switch invoice
  const handleSelectInvoice = (id: string) => {
    setCurrentInvoiceId(id);
    const invoices = getAllInvoices();
    const found = invoices.find((i) => i.id === id);
    if (found) {
      setCurrentInvoice(found);
      const matchingTool = TOOLS_CONFIG.find(
        (t) =>
          found.number.startsWith(t.numberPrefix) ||
          found.title.toUpperCase().includes(t.shortName.toUpperCase())
      );
      if (matchingTool) {
        setCurrentRoute({ type: 'tool', slug: matchingTool.slug });
        try {
          const newPath = matchingTool.slug === 'invoice-generator' ? '/' : `/${matchingTool.slug}`;
          if (window.location.pathname !== newPath) {
            window.history.pushState(null, '', newPath);
          }
        } catch {}
      } else {
        setCurrentRoute({ type: 'tool', slug: 'invoice-generator' });
      }
    }
    setAllInvoices(invoices);
  };

  // Create new blank document for the active tool
  const handleNewInvoice = () => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    const targetTool = currentRoute.type === 'tool' ? currentTool : TOOLS_CONFIG[0];
    if (currentRoute.type === 'info') {
      setCurrentRoute({ type: 'tool', slug: 'invoice-generator' });
      try {
        window.history.pushState(null, '', '/');
      } catch {}
    }
    const fresh = createNewDocument(targetTool.numberPrefix, targetTool.documentTitle);
    setCurrentInvoice(fresh);
    setAllInvoices(getAllInvoices());
    setActiveTab('invoice');
    setSaveStatus('saved');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Duplicate invoice
  const handleDuplicateInvoice = (id?: string) => {
    const targetId = id || currentInvoice.id;
    const duplicated = duplicateInvoice(targetId);
    if (duplicated) {
      setCurrentInvoice(duplicated);
      setAllInvoices(getAllInvoices());
      setActiveTab('invoice');
    }
  };

  // Reset current invoice to blank
  const handleResetInvoice = () => {
    if (
      window.confirm(
        `Clear all fields on this ${currentTool.shortName.toLowerCase()} and make it blank? Any unsaved edits will be cleared.`
      )
    ) {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
      const reset = {
        ...getBlankInvoice(currentInvoice.number, currentTool.documentTitle),
        id: currentInvoice.id,
      };
      saveInvoice(reset);
      setCurrentInvoice(reset);
      setAllInvoices(getAllInvoices());
      setSaveStatus('saved');
    }
  };

  // Delete invoice
  const handleDeleteInvoice = (id: string) => {
    const { remainingInvoices, newActive } = deleteInvoice(id);
    setAllInvoices(remainingInvoices);
    setCurrentInvoice(newActive);
  };

  // Load a profession example from guide
  const handleLoadProfessionExample = (example: ProfessionTemplateExample) => {
    const updated: InvoiceData = {
      ...currentInvoice,
      ...example.data,
      id: currentInvoice.id,
      customization: {
        ...currentInvoice.customization,
        template: example.template,
        fontFamily: example.fontFamily,
        accentColor: example.accentColor,
        currency: example.suggestedCurrency,
        currencySymbol: example.suggestedCurrencySymbol,
      },
      updatedAt: new Date().toISOString(),
    };
    saveInvoice(updated);
    setCurrentInvoice(updated);
    setAllInvoices(getAllInvoices());
    setActiveTab('invoice');
  };

  // Smooth scroll to Templates library section
  const handleOpenTemplates = () => {
    if (currentRoute.type === 'info') {
      handleSelectTool('invoice-generator');
      setTimeout(() => {
        const el = document.getElementById('invoice-templates');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('invoice-templates');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Apply layout design styling without overwriting items
  const handleApplyTemplateLayout = (
    templateId: TemplateId,
    font?: InvoiceFontFamily,
    accent?: string
  ) => {
    const updated: InvoiceData = {
      ...currentInvoice,
      customization: {
        ...currentInvoice.customization,
        template: templateId,
        ...(font ? { fontFamily: font } : {}),
        ...(accent ? { accentColor: accent } : {}),
      },
      updatedAt: new Date().toISOString(),
    };
    saveInvoice(updated);
    setCurrentInvoice(updated);
    setAllInvoices(getAllInvoices());
    const tplName = TEMPLATES.find((t) => t.id === templateId)?.name || templateId;
    setToastMessage(`Switched to "${tplName}" layout!`);
    setTimeout(() => setToastMessage(null), 3500);
    setActiveTab('invoice');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Live preview a template layout immediately
  const handlePreviewTemplate = (
    templateId: TemplateId,
    exampleData?: ProfessionTemplateExample
  ) => {
    let updated: InvoiceData = {
      ...currentInvoice,
      customization: {
        ...currentInvoice.customization,
        template: templateId,
        ...(exampleData
          ? {
              fontFamily: exampleData.fontFamily,
              accentColor: exampleData.accentColor,
              currency: exampleData.suggestedCurrency,
              currencySymbol: exampleData.suggestedCurrencySymbol,
            }
          : {}),
      },
      updatedAt: new Date().toISOString(),
    };

    if (exampleData) {
      updated = {
        ...updated,
        ...exampleData.data,
      };
    }

    saveInvoice(updated);
    setCurrentInvoice(updated);
    setAllInvoices(getAllInvoices());
    setActiveTab('preview');
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Open settings focused on chosen template
  const handleOpenSettingsWithTemplate = (templateId: TemplateId) => {
    const tpl = TEMPLATES.find((t) => t.id === templateId);
    const updated: InvoiceData = {
      ...currentInvoice,
      customization: {
        ...currentInvoice.customization,
        template: templateId,
        ...(tpl
          ? {
              fontFamily: tpl.recommendedFont,
              accentColor: tpl.defaultAccent,
            }
          : {}),
      },
      updatedAt: new Date().toISOString(),
    };
    saveInvoice(updated);
    setCurrentInvoice(updated);
    setAllInvoices(getAllInvoices());
    setIsCustomizeOpen(true);
  };

  // Import invoices handler
  const handleImportInvoices = (imported: InvoiceData[], strategy: 'copy' | 'replace') => {
    let currentList = getAllInvoices();

    if (strategy === 'copy') {
      const newItems = imported.map((inv) => ({
        ...inv,
        id: 'inv_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        number: `${inv.number}-COPY`,
        updatedAt: new Date().toISOString(),
      }));
      currentList = [...newItems, ...currentList];
    } else {
      // replace
      const importedIds = new Set(imported.map((i) => i.id));
      const importedNums = new Set(imported.map((i) => i.number.toLowerCase()));

      currentList = currentList.filter(
        (i) => !importedIds.has(i.id) && !importedNums.has(i.number.toLowerCase())
      );
      currentList = [...imported, ...currentList];
    }

    try {
      localStorage.setItem('invoiceo_saved_invoices_v1', JSON.stringify(currentList));
      const active = imported[0] || currentList[0];
      setCurrentInvoice(active);
      setCurrentInvoiceId(active.id);
      setAllInvoices(currentList);
    } catch (e: any) {
      setStorageErrorToast('Import failed due to storage limits.');
    }
  };

  // Download PDF
  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      const res = await downloadInvoicePdf(currentInvoice);
      if (!res.success) {
        setStorageErrorToast(res.error || 'Failed to generate PDF. Please try again.');
      }
    } catch (err: any) {
      console.error('PDF error', err);
      setStorageErrorToast('Error building PDF document: ' + (err.message || 'Unknown error'));
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Helper to detect if app is embedded in an iframe (e.g. AI Studio preview)
  const isInsideIframe = () => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  };

  // Print invoice handler: Directly trigger the system / browser print dialog
  const handlePrint = () => {
    // If user is currently editing, make sure the preview view is ready for print layout
    // Browser print triggers the @media print rules which prints #invoice-print-area
    try {
      window.print();
    } catch (e) {
      console.warn('Direct window.print encountered an error, trying fallback:', e);
      // Fallback: If window.print fails, we can trigger direct PDF autoPrint
      printInvoicePdfDirect(currentInvoice);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] flex flex-col font-sans">
      {/* 1. Header Navigation */}
      <Header
        onOpenMyInvoices={() => setIsMyInvoicesOpen(true)}
        onOpenImportExport={() => setIsImportExportOpen(true)}
        onOpenSettings={() => setIsCustomizeOpen(true)}
        onNewInvoice={handleNewInvoice}
        onOpenTemplates={handleOpenTemplates}
        savedInvoicesCount={allInvoices.length}
        onSelectHome={() => handleSelectTool('invoice-generator')}
      />

      {/* Floating or inline toast notification for template changes */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200 no-print">
          <div className="flex items-center gap-2.5 px-4 py-3 bg-[#1A3263] text-white rounded-xl shadow-xl border border-white/10 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 2. Main Centered Content Container */}
      {currentRoute.type === 'info' ? (
        <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 pt-6 pb-8">
          {currentRoute.page === 'about' && (
            <AboutPage onNavigateHome={handleNavigateHome} onSelectTool={handleSelectTool} />
          )}
          {currentRoute.page === 'contact' && (
            <ContactPage onNavigateHome={handleNavigateHome} />
          )}
          {currentRoute.page === 'privacy' && (
            <PrivacyPage
              onNavigateHome={handleNavigateHome}
              onOpenImportExport={() => setIsImportExportOpen(true)}
            />
          )}
          {currentRoute.page === 'terms' && (
            <TermsPage onNavigateHome={handleNavigateHome} />
          )}
          {currentRoute.page === 'bugs' && (
            <ReportBugsPage onNavigateHome={handleNavigateHome} />
          )}
        </main>
      ) : (
        <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 pt-6 pb-4 print:p-0 print:m-0 print:max-w-none">
          {/* Page Heading & Information Banner with large font sizes */}
          <div className="mb-6 no-print bg-white border border-gray-200/90 rounded-2xl shadow-xs p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#1A3263]/10 text-[#1A3263] border border-[#1A3263]/15">
                {currentTool.badgeText}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                100% Free • No Signup Required • High-Resolution PDF
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              {currentTool.h1}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl">
              {currentTool.description}
            </p>

            {/* Reference informational banner */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-slate-50/80 border border-[#1A3263]/15 rounded-xl text-sm sm:text-base text-gray-700">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  Your documents are saved automatically in this browser. Export a backup to keep your data safe.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsImportExportOpen(true)}
                className="cursor-pointer text-sm font-bold text-[#1A3263] hover:text-[#132549] underline underline-offset-4 shrink-0 transition"
              >
                Export Backup
              </button>
            </div>
          </div>

          {/* Storage error alert if quota reached */}
          {storageErrorToast && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>{storageErrorToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setStorageErrorToast(null)}
                className="cursor-pointer text-xs font-semibold text-red-700 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* 3. Action Toolbar & Horizontal Tab Switcher */}
          <div className="no-print mb-6">
            <ActionToolbar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              saveStatus={saveStatus}
              onOpenCustomize={() => setIsCustomizeOpen(true)}
              onDownloadPdf={handleDownloadPdf}
              onPrint={handlePrint}
              onNewInvoice={handleNewInvoice}
              onDuplicateInvoice={() => handleDuplicateInvoice()}
              onResetInvoice={handleResetInvoice}
              isDownloadingPdf={isDownloadingPdf}
              documentTypeLabel={currentTool.shortName}
            />
          </div>

          {/* 4. Main View: Interactive Editor + Print-Ready Preview */}
          <div className={activeTab === 'invoice' ? 'block print:hidden' : 'hidden'}>
            <InvoiceEditor
              key={currentInvoice.id}
              invoice={currentInvoice}
              onChange={handleInvoiceChange}
              onOpenSignatureModal={() => setIsSignatureOpen(true)}
            />
          </div>

          <div className={activeTab === 'preview' ? 'w-full' : 'hidden print:block w-full'}>
            <InvoicePreview
              key={currentInvoice.id}
              invoice={currentInvoice}
              onBackToEdit={() => setActiveTab('invoice')}
              onDownloadPdf={handleDownloadPdf}
              onPrint={handlePrint}
              onOpenCustomize={() => setIsCustomizeOpen(true)}
            />
          </div>

          {/* 5. Invoice Template Library Section */}
          <TemplatesLibrary
            currentTemplateId={currentInvoice.customization.template}
            onApplyLayout={handleApplyTemplateLayout}
            onLoadFullProfession={(example) => {
              handleLoadProfessionExample(example);
              setToastMessage(`Loaded ${example.profession} invoice template!`);
              setTimeout(() => setToastMessage(null), 4000);
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            onPreviewTemplate={handlePreviewTemplate}
            onOpenSettingsWithTemplate={handleOpenSettingsWithTemplate}
          />

          {/* 6. Complete Guide with Examples & Invoicing Knowledge Base */}
          <div className="no-print">
            <CompleteGuide
              onLoadExample={handleLoadProfessionExample}
              onOpenSettings={() => setIsCustomizeOpen(true)}
            />
          </div>
        </main>
      )}

      {/* 7. Footer */}
      <Footer
        onOpenImportExport={() => setIsImportExportOpen(true)}
        onNewInvoice={handleNewInvoice}
        onOpenMyInvoices={() => setIsMyInvoicesOpen(true)}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        currentToolSlug={currentTool.slug}
        onSelectTool={handleSelectTool}
        onNavigatePage={handleNavigatePage}
        currentInfoPage={currentRoute.type === 'info' ? currentRoute.page : null}
      />

      {/* Modals */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        customization={currentInvoice.customization}
        onChange={(cust) => {
          handleInvoiceChange({
            ...currentInvoice,
            customization: cust,
          });
        }}
      />

      <MyInvoicesModal
        isOpen={isMyInvoicesOpen}
        onClose={() => setIsMyInvoicesOpen(false)}
        invoices={allInvoices}
        currentInvoiceId={currentInvoice.id}
        onSelectInvoice={handleSelectInvoice}
        onNewInvoice={handleNewInvoice}
        onDuplicateInvoice={handleDuplicateInvoice}
        onDeleteInvoice={handleDeleteInvoice}
        onExportSingle={(inv) => {
          const blob = new Blob([JSON.stringify(inv, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Invoice_${inv.number || 'export'}.json`;
          a.click();
        }}
      />

      <ImportExportModal
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        currentInvoice={currentInvoice}
        allInvoices={allInvoices}
        onImportInvoices={handleImportInvoices}
      />

      <SignatureModal
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
        currentSignature={currentInvoice.signatureUrl}
        currentName={currentInvoice.signerName}
        currentTitle={currentInvoice.signerTitle}
        onSave={(url, name, title) => {
          handleInvoiceChange({
            ...currentInvoice,
            signatureUrl: url,
            signerName: name,
            signerTitle: title,
          });
        }}
      />
    </div>
  );
}
