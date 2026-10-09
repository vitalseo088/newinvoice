import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldCheck, Download, AlertCircle, FileText } from 'lucide-react';
import { Header } from './components/Header';
import { ActionToolbar } from './components/ActionToolbar';
import { InvoiceEditor } from './components/InvoiceEditor';
import { InvoicePreview } from './components/InvoicePreview';
import { CustomizeModal } from './components/CustomizeModal';
import { MyInvoicesModal } from './components/MyInvoicesModal';
import { ImportExportModal } from './components/ImportExportModal';
import { SignatureModal } from './components/SignatureModal';
import { CompleteGuide } from './components/CompleteGuide';
import { ProfessionTemplateExample } from './data/professionExamples';
import { Footer } from './components/Footer';
import { InvoiceData } from './types/invoice';
import {
  getAllInvoices,
  getCurrentInvoice,
  saveInvoice,
  setCurrentInvoiceId,
  createNewInvoice,
  getBlankInvoice,
  duplicateInvoice,
  deleteInvoice,
  getDefaultInvoice,
} from './utils/storage';
import { generateInvoicePdf, downloadInvoicePdf, printInvoicePdfDirect } from './utils/pdfGenerator';

export default function App() {
  const [currentInvoice, setCurrentInvoice] = useState<InvoiceData>(() => getCurrentInvoice());
  const [allInvoices, setAllInvoices] = useState<InvoiceData[]>(() => getAllInvoices());
  const [activeTab, setActiveTab] = useState<'invoice' | 'preview'>('invoice');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [storageErrorToast, setStorageErrorToast] = useState<string | null>(null);

  // Modals state
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isMyInvoicesOpen, setIsMyInvoicesOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);

  // Autosave debounce timer
  const saveTimerRef = useRef<number | null>(null);

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
    }
    setAllInvoices(invoices);
  };

  // Create new blank invoice
  const handleNewInvoice = () => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    const fresh = createNewInvoice();
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
    if (window.confirm('Clear all fields on this invoice and make it blank? Any unsaved edits will be cleared.')) {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
      const reset = {
        ...getBlankInvoice(currentInvoice.number),
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
        savedInvoicesCount={allInvoices.length}
      />

      {/* 2. Main Centered Content Container */}
      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 pt-6 pb-4 print:p-0 print:m-0 print:max-w-none">
        {/* Page Heading & Information Banner with large font sizes */}
        <div className="mb-6 no-print">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Invoice Generator
          </h1>

          {/* Reference informational banner */}
          <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-white border border-[#1A3263]/15 rounded-xl text-sm sm:text-base text-gray-700 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-medium">
                Your invoices are saved automatically in this browser. Export a backup to keep your data safe.
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
          />
        </div>

        {/* 5. Complete Guide with Examples & Invoicing Knowledge Base */}
        <div className="no-print">
          <CompleteGuide
            onLoadExample={handleLoadProfessionExample}
            onOpenSettings={() => setIsCustomizeOpen(true)}
          />
        </div>
      </main>

      {/* 6. Footer */}
      <Footer
        onOpenImportExport={() => setIsImportExportOpen(true)}
        onNewInvoice={handleNewInvoice}
        onOpenMyInvoices={() => setIsMyInvoicesOpen(true)}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
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
