import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  Eye,
  SlidersHorizontal,
  Download,
  Printer,
  ArrowLeft,
  MoreVertical,
  Plus,
  Copy,
  RotateCcw,
  Check,
  Loader2,
  FileDown,
} from 'lucide-react';

interface ActionToolbarProps {
  activeTab: 'invoice' | 'preview';
  onTabChange: (tab: 'invoice' | 'preview') => void;
  saveStatus: 'saved' | 'saving' | 'error';
  onOpenCustomize: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onNewInvoice: () => void;
  onDuplicateInvoice: () => void;
  onResetInvoice: () => void;
  isDownloadingPdf?: boolean;
  documentTypeLabel?: string;
}

export const ActionToolbar: React.FC<ActionToolbarProps> = ({
  activeTab,
  onTabChange,
  saveStatus,
  onOpenCustomize,
  onDownloadPdf,
  onPrint,
  onNewInvoice,
  onDuplicateInvoice,
  onResetInvoice,
  isDownloadingPdf = false,
  documentTypeLabel = 'Invoice',
}) => {
  const { t } = useTranslation('common');
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="w-full mb-6">
      {/* Horizontal Tabs & Actions bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 sm:p-3.5 rounded-xl border border-gray-200/90 shadow-sm">
        {/* Tab 1 (Invoice) & Tab 2 (Preview) Switcher with prominent active tab highlight */}
        <div className="flex w-full sm:w-auto p-1.5 bg-[#EAEFF8] rounded-xl gap-1.5 border border-[#1A3263]/15">
          <button
            type="button"
            onClick={() => onTabChange('invoice')}
            className={`flex-1 sm:flex-none justify-center inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all ${
              activeTab === 'invoice'
                ? 'bg-[#1A3263] text-white shadow-md ring-2 ring-[#1A3263]/30 scale-[1.01]'
                : 'text-gray-700 hover:text-[#1A3263] hover:bg-white/60'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'invoice' ? 'text-white' : 'text-gray-500'}`} />
            <span>{documentTypeLabel}</span>
            {activeTab === 'invoice' && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('preview')}
            className={`flex-1 sm:flex-none justify-center inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all ${
              activeTab === 'preview'
                ? 'bg-[#1A3263] text-white shadow-md ring-2 ring-[#1A3263]/30 scale-[1.01]'
                : 'text-gray-700 hover:text-[#1A3263] hover:bg-white/60'
            }`}
          >
            <Eye className={`w-4 h-4 ${activeTab === 'preview' ? 'text-white' : 'text-gray-500'}`} />
            <span>{t('preview.previewTab')}</span>
            {activeTab === 'preview' && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </button>
        </div>

        {/* Dynamic Actions depending on active tab */}
        <div className="flex items-center justify-end flex-wrap gap-2.5">
          {/* Save Status pill */}
          <div className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-600 border border-gray-200 rounded-lg bg-[#F8FAFC]">
            {saveStatus === 'saving' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#1A3263]" />
                <span className="font-semibold text-gray-700">{t('toolbar.saving')}</span>
              </>
            ) : saveStatus === 'error' ? (
              <span className="text-red-600 font-semibold">{t('toolbar.error')}</span>
            ) : (
              <>
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span className="font-semibold text-gray-700">{t('toolbar.saved')}</span>
              </>
            )}
          </div>

          {activeTab === 'invoice' ? (
            <>
              {/* Customize Button (Settings) */}
              <button
                type="button"
                onClick={onOpenCustomize}
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-gray-50 rounded-lg transition shadow-2xs"
                title={`${documentTypeLabel} · ${t('toolbar.customize')}`}
              >
                <SlidersHorizontal className="w-4 h-4 text-[#1A3263]" />
                {t('toolbar.customize')}
              </button>

              {/* New Invoice button placed on the right side of Customize / Settings */}
              <button
                type="button"
                onClick={onNewInvoice}
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-gray-50 rounded-lg transition shadow-2xs"
                title={`${t('toolbar.newInvoice')} ${documentTypeLabel.toLowerCase()}`}
              >
                <Plus className="w-4 h-4 text-[#1A3263] stroke-[2.5]" />
                <span className="hidden sm:inline">{t('toolbar.newInvoice')} {documentTypeLabel}</span>
                <span className="sm:hidden">{t('toolbar.newInvoice')}</span>
              </button>

              {/* Print Button */}
              <button
                type="button"
                onClick={onPrint}
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-gray-50 rounded-lg transition shadow-2xs"
                title={t('toolbar.print')}
              >
                <Printer className="w-4 h-4 text-[#1A3263]" />
                <span className="hidden sm:inline">{t('toolbar.print')}</span>
              </button>

              {/* Download PDF button */}
              <button
                type="button"
                onClick={onDownloadPdf}
                disabled={isDownloadingPdf}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#1A3263] hover:bg-[#132549] rounded-lg transition shadow-sm disabled:opacity-50"
              >
                {isDownloadingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {t('toolbar.downloadPdf')}
              </button>

              {/* More Actions Dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="cursor-pointer p-2.5 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  title={t('toolbar.moreActions')}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1.5 text-sm text-gray-700 animate-in fade-in duration-100">
                    <button
                      type="button"
                      onClick={() => {
                        setMoreOpen(false);
                        onNewInvoice();
                      }}
                      className="cursor-pointer w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-2.5 font-medium"
                    >
                      <Plus className="w-4 h-4 text-gray-500" /> {t('toolbar.newInvoice')} {documentTypeLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMoreOpen(false);
                        onPrint();
                      }}
                      className="cursor-pointer w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-2.5 font-medium"
                    >
                      <Printer className="w-4 h-4 text-gray-500" /> {t('toolbar.print')} {documentTypeLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMoreOpen(false);
                        onDuplicateInvoice();
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-2.5 font-medium"
                    >
                      <Copy className="w-4 h-4 text-gray-500" /> {t('toolbar.duplicate')}
                    </button>
                    <div className="my-1 border-t border-gray-100" />
                    <button
                      type="button"
                      onClick={() => {
                        setMoreOpen(false);
                        onResetInvoice();
                      }}
                      className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-medium"
                    >
                      <RotateCcw className="w-4 h-4" /> {t('toolbar.reset')}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* PREVIEW TAB ACTIONS */
            <>
              <button
                type="button"
                onClick={() => onTabChange('invoice')}
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-gray-50 rounded-lg transition shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('preview.backToEdit')}
              </button>

              <button
                type="button"
                onClick={onPrint}
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-gray-50 rounded-lg transition shadow-2xs"
              >
                <Printer className="w-4 h-4 text-[#1A3263]" />
                {t('toolbar.print')} {documentTypeLabel}
              </button>

              <button
                type="button"
                onClick={onDownloadPdf}
                disabled={isDownloadingPdf}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#1A3263] hover:bg-[#132549] rounded-lg transition shadow-sm disabled:opacity-50"
              >
                {isDownloadingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                {t('toolbar.downloadPdf')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
