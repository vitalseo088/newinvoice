import React from 'react';
import {
  FileText,
  Plus,
  FolderOpen,
  Database,
  Sliders,
} from 'lucide-react';

interface HeaderProps {
  onOpenMyInvoices: () => void;
  onOpenImportExport: () => void;
  onOpenSettings: () => void;
  onNewInvoice: () => void;
  savedInvoicesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMyInvoices,
  onOpenImportExport,
  onOpenSettings,
  onNewInvoice,
  savedInvoicesCount,
}) => {
  return (
    <header className="h-[62px] bg-white text-gray-900 border-b border-gray-200 sticky top-0 z-40 select-none shadow-xs">
      <div className="max-w-[1320px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Brand: Text only website name, no icon, no tagline */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer tracking-tight text-xl sm:text-2xl font-black text-[#1A3263] hover:opacity-90 transition leading-none select-none text-left"
          >
            Invoiceo<span className="text-gray-900 font-extrabold">.online</span>
          </button>
        </div>

        {/* Navigation items: clean, solid, professional */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          {/* Invoice Generator: using same FileText icon as invoice */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-800 hover:text-[#1A3263] hover:bg-gray-100/90 active:bg-gray-200 rounded-lg transition border border-transparent hover:border-gray-200"
          >
            <FileText className="w-4 h-4 text-[#1A3263] stroke-[2.2]" />
            <span className="hidden md:inline">Invoice Generator</span>
          </button>

          {/* My Invoices */}
          <button
            type="button"
            onClick={onOpenMyInvoices}
            className="cursor-pointer relative flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-800 hover:text-[#1A3263] hover:bg-gray-100/90 active:bg-gray-200 rounded-lg transition border border-transparent hover:border-gray-200"
          >
            <FolderOpen className="w-4 h-4 text-gray-600 stroke-[2]" />
            <span className="hidden sm:inline">My Invoices</span>
            {savedInvoicesCount > 0 && (
              <span className="ml-0.5 px-2 py-0.5 rounded-full text-xs font-extrabold bg-[#1A3263] text-white leading-none">
                {savedInvoicesCount}
              </span>
            )}
          </button>

          {/* Import / Export */}
          <button
            type="button"
            onClick={onOpenImportExport}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-800 hover:text-[#1A3263] hover:bg-gray-100/90 active:bg-gray-200 rounded-lg transition border border-transparent hover:border-gray-200"
          >
            <Database className="w-4 h-4 text-gray-600 stroke-[2]" />
            <span className="hidden lg:inline">Import / Export</span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-800 hover:text-[#1A3263] hover:bg-gray-100/90 active:bg-gray-200 rounded-lg transition border border-transparent hover:border-gray-200"
            title="Invoice Settings & Customization"
          >
            <Sliders className="w-4 h-4 text-gray-600 stroke-[2]" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          {/* New Invoice option on the right side of Settings */}
          <button
            type="button"
            onClick={onNewInvoice}
            className="cursor-pointer flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm font-bold text-white bg-[#1A3263] hover:bg-[#122448] active:bg-[#0d1a36] rounded-lg shadow-2xs border border-[#1A3263] transition ml-1"
            title="Create a new invoice"
          >
            <Plus className="w-4 h-4 text-white stroke-[2.8]" />
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">New</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
