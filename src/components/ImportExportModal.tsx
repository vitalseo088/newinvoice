import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Download,
  FileJson,
  DatabaseBackup,
  AlertTriangle,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { InvoiceData } from '../types/invoice';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInvoice: InvoiceData;
  allInvoices: InvoiceData[];
  onImportInvoices: (invoices: InvoiceData[], strategy: 'copy' | 'replace') => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  currentInvoice,
  allInvoices,
  onImportInvoices,
}) => {
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [pendingImport, setPendingImport] = useState<{
    invoices: InvoiceData[];
    hasConflicts: boolean;
    conflictingNumbers: string[];
  } | null>(null);

  // Close with escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setImportError(null);
    setImportSuccess(null);
    setPendingImport(null);
    onClose();
  };

  const downloadJson = (data: any, filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCurrent = () => {
    const safeNum = (currentInvoice.number || 'invoice').replace(/[^a-zA-Z0-9_-]/g, '_');
    downloadJson(currentInvoice, `Invoice_${safeNum}.json`);
  };

  const handleExportAll = () => {
    const dateStr = new Date().toISOString().split('T')[0];
    const backupPayload = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      appName: 'Invoiceo.online',
      invoices: allInvoices,
    };
    downloadJson(backupPayload, `Invoiceo_Backup_${dateStr}.json`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(null);
    setPendingImport(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        let importedList: InvoiceData[] = [];

        // Check if single invoice or backup structure
        if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.invoices)) {
            importedList = parsed.invoices;
          } else if (Array.isArray(parsed)) {
            importedList = parsed;
          } else if (parsed.items && (parsed.number || parsed.id)) {
            importedList = [parsed];
          } else {
            throw new Error('Unrecognized JSON format. File does not contain valid invoice data.');
          }
        } else {
          throw new Error('Invalid JSON file format.');
        }

        // Validate basic invoice schema
        for (const inv of importedList) {
          if (!inv || typeof inv !== 'object' || !Array.isArray(inv.items)) {
            throw new Error('One or more invoices has invalid structure or missing line items.');
          }
        }

        // Check for conflicts
        const existingIds = new Set(allInvoices.map((i) => i.id));
        const existingNumbers = new Set(allInvoices.map((i) => i.number.toLowerCase()));

        const conflicts: string[] = [];
        for (const inv of importedList) {
          if (existingIds.has(inv.id) || existingNumbers.has(inv.number.toLowerCase())) {
            conflicts.push(inv.number);
          }
        }

        if (conflicts.length > 0) {
          setPendingImport({
            invoices: importedList,
            hasConflicts: true,
            conflictingNumbers: conflicts,
          });
        } else {
          onImportInvoices(importedList, 'copy');
          setImportSuccess(`Successfully imported ${importedList.length} invoice(s)!`);
        }
      } catch (err: any) {
        setImportError(err.message || 'Failed to read or parse JSON file.');
      }
    };
    reader.onerror = () => setImportError('Error reading file.');
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs cursor-pointer animate-in fade-in duration-150"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-export-title"
    >
      <div
        className="w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-hidden cursor-auto animate-in zoom-in-95 duration-150 relative border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1A3263]/15 flex items-center justify-center text-[#1A3263]">
              <DatabaseBackup className="w-5 h-5" />
            </div>
            <div>
              <h3 id="import-export-title" className="font-extrabold text-gray-900 text-lg">
                Import & Export Invoices
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                100% private in-browser backup and data portability
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-800 transition"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-130px)] overflow-y-auto">
          {/* Export Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
              Export Invoice Data
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleExportCurrent}
                className="cursor-pointer p-5 border-2 border-gray-200 rounded-xl hover:border-[#1A3263] hover:bg-[#1A3263]/5 transition text-left group"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <FileJson className="w-6 h-6 text-[#1A3263]" />
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-[#1A3263]" />
                </div>
                <h5 className="font-bold text-base text-gray-900">Current Invoice</h5>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Export #{currentInvoice.number} as a standalone JSON file with all settings.
                </p>
              </button>

              <button
                type="button"
                onClick={handleExportAll}
                className="cursor-pointer p-5 border-2 border-gray-200 rounded-xl hover:border-[#1A3263] hover:bg-[#1A3263]/5 transition text-left group"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <DatabaseBackup className="w-6 h-6 text-[#1A3263]" />
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-[#1A3263]" />
                </div>
                <h5 className="font-bold text-base text-gray-900">Full Invoices Backup</h5>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Download all {allInvoices.length} invoices in one comprehensive JSON archive.
                </p>
              </button>
            </div>
          </div>

          {/* Import Section */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
              Import Invoices From JSON
            </h4>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-[#1A3263] transition">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-base font-bold text-gray-800">
                Click to browse or drop JSON file
              </span>
              <span className="text-xs sm:text-sm text-gray-500 mt-1">
                Supports single invoice JSON or full Invoiceo backup archive
              </span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Status alerts */}
            {importError && (
              <div className="mt-3.5 p-3.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                <span>{importError}</span>
              </div>
            )}

            {importSuccess && (
              <div className="mt-3.5 p-3.5 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500 mt-0.5" />
                <span>{importSuccess}</span>
              </div>
            )}

            {/* Conflict resolution prompt */}
            {pendingImport && pendingImport.hasConflicts && (
              <div className="mt-4 p-4 border border-amber-200 bg-amber-50 rounded-xl">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Duplicate Invoice Detected ({pendingImport.conflictingNumbers.join(', ')})
                </div>
                <p className="text-xs sm:text-sm text-amber-800 mb-3.5 leading-relaxed">
                  The file contains invoice numbers that already exist in your local storage.
                  Choose how you'd like to handle them:
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onImportInvoices(pendingImport.invoices, 'copy');
                      setPendingImport(null);
                      setImportSuccess(`Imported ${pendingImport.invoices.length} invoices as new copies!`);
                    }}
                    className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition"
                  >
                    <Copy className="w-4 h-4" /> Import as Copies (New IDs)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onImportInvoices(pendingImport.invoices, 'replace');
                      setPendingImport(null);
                      setImportSuccess(`Overwrote ${pendingImport.conflictingNumbers.length} matching invoices!`);
                    }}
                    className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition"
                  >
                    Replace Existing
                  </button>

                  <button
                    type="button"
                    onClick={() => setPendingImport(null)}
                    className="cursor-pointer px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-amber-100 rounded-lg transition"
                  >
                    Cancel Import
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-[#F8FAFC] flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer px-6 py-2.5 text-sm font-bold text-gray-700 bg-white hover:bg-gray-100 hover:text-gray-900 border border-gray-300 rounded-lg transition shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
