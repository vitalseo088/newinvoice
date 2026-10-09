import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Search,
  Copy,
  Trash2,
  FileDown,
  ExternalLink,
  Calendar,
  AlertTriangle,
  FolderOpen,
} from 'lucide-react';
import { InvoiceData } from '../types/invoice';
import { calculateInvoiceTotals, formatDate, formatMoney } from '../utils/currency';
import { generateInvoicePdf } from '../utils/pdfGenerator';

interface MyInvoicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoices: InvoiceData[];
  currentInvoiceId: string;
  onSelectInvoice: (id: string) => void;
  onNewInvoice: () => void;
  onDuplicateInvoice: (id: string) => void;
  onDeleteInvoice: (id: string) => void;
  onExportSingle: (invoice: InvoiceData) => void;
}

export const MyInvoicesModal: React.FC<MyInvoicesModalProps> = ({
  isOpen,
  onClose,
  invoices,
  currentInvoiceId,
  onSelectInvoice,
  onNewInvoice,
  onDuplicateInvoice,
  onDeleteInvoice,
  onExportSingle,
}) => {
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Close with escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = invoices.filter((inv) => {
    const q = search.toLowerCase();
    return (
      inv.number.toLowerCase().includes(q) ||
      inv.toName.toLowerCase().includes(q) ||
      inv.fromName.toLowerCase().includes(q) ||
      inv.title.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs cursor-pointer animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl bg-white shadow-2xl overflow-hidden cursor-auto animate-in zoom-in-95 duration-150 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1A3263]/15 flex items-center justify-center text-[#1A3263]">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">My Saved Invoices</h3>
              <p className="text-xs sm:text-sm text-gray-500">
                All invoices stored safely in your browser ({invoices.length} total)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-800 transition"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-88">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice # or client..."
              className="w-full pl-10 pr-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#1A3263] outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              onNewInvoice();
              onClose();
            }}
            className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#1A3263] hover:bg-[#132549] rounded-lg shadow-sm transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> New Invoice
          </button>
        </div>

        {/* Invoices List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-base font-medium">No invoices found matching "{search}"</p>
            </div>
          ) : (
            filtered.map((inv) => {
              const isCurrent = inv.id === currentInvoiceId;
              const totals = calculateInvoiceTotals(inv);

              return (
                <div
                  key={inv.id}
                  className={`py-4 px-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
                    isCurrent ? 'bg-[#1A3263]/5 border-2 border-[#1A3263]/30' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="font-bold text-base text-gray-900">
                        {inv.number || 'Untitled'}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-[#1A3263] text-white">
                          ACTIVE
                        </span>
                      )}
                      <span className="text-sm text-gray-500 font-medium truncate">
                        • {inv.toName ? `Client: ${inv.toName}` : 'No Client Named'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(inv.date, 'YYYY-MM-DD')}
                      </span>
                      <span>
                        Total:{' '}
                        <strong className="text-gray-900 font-semibold font-mono">
                          {formatMoney(
                            totals.total,
                            inv.customization.currencySymbol,
                            inv.customization.currencyPosition
                          )}
                        </strong>
                      </span>
                      <span>
                        Due:{' '}
                        <strong className="text-[#1A3263] font-bold font-mono">
                          {formatMoney(
                            totals.balanceDue,
                            inv.customization.currencySymbol,
                            inv.customization.currencyPosition
                          )}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {!isCurrent && (
                      <button
                        onClick={() => {
                          onSelectInvoice(inv.id);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg transition flex items-center gap-1.5"
                        title="Open Invoice"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-gray-500" /> Open
                      </button>
                    )}

                    <button
                      onClick={() => onDuplicateInvoice(inv.id)}
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => generateInvoicePdf(inv)}
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                      title="Download PDF"
                    >
                      <FileDown className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onExportSingle(inv)}
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition text-xs font-mono font-bold"
                      title="Export JSON"
                    >
                      JSON
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(inv.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                      disabled={invoices.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
              <div className="flex items-center gap-2.5 text-red-600 mb-2.5">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="font-bold text-base">Delete Invoice?</h4>
              </div>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Are you sure you want to delete this invoice? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2.5">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDeleteInvoice(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-[#F8FAFC] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
