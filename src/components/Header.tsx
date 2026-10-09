import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Plus,
  FolderOpen,
  Database,
  Sliders,
  LayoutTemplate,
  Menu,
  X,
} from 'lucide-react';

interface HeaderProps {
  onOpenMyInvoices: () => void;
  onOpenImportExport: () => void;
  onOpenSettings: () => void;
  onNewInvoice: () => void;
  onOpenTemplates: () => void;
  savedInvoicesCount: number;
  onSelectHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMyInvoices,
  onOpenImportExport,
  onOpenSettings,
  onNewInvoice,
  onOpenTemplates,
  savedInvoicesCount,
  onSelectHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHomeClick = () => {
    setMobileMenuOpen(false);
    if (onSelectHome) {
      onSelectHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="h-[62px] bg-white text-gray-900 border-b border-gray-200 sticky top-0 z-40 select-none shadow-xs">
      <div className="max-w-[1320px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Brand: Text only website name, no icon, no tagline */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleHomeClick}
            className="cursor-pointer tracking-tight text-xl sm:text-2xl font-black text-[#1A3263] hover:opacity-90 transition leading-none select-none text-left"
          >
            Invoiceo<span className="text-gray-900 font-extrabold">.online</span>
          </button>
        </div>

        {/* Desktop Navigation items: visible on lg and up */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {/* Invoice Generator */}
          <button
            type="button"
            onClick={handleHomeClick}
            className="cursor-pointer flex items-center gap-2 px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-bold text-gray-800 hover:text-[#1A3263] hover:bg-gray-100/90 active:bg-gray-200 rounded-lg transition border border-transparent hover:border-gray-200"
          >
            <div className="w-7 h-7 rounded-lg bg-[#1A3263]/10 text-[#1A3263] flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span>Invoice Generator</span>
          </button>

          {/* Templates */}
          <button
            type="button"
            onClick={onOpenTemplates}
            className="cursor-pointer flex items-center gap-2 px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-bold text-gray-800 hover:text-[#1A3263] hover:bg-gray-100/90 active:bg-gray-200 rounded-lg transition border border-transparent hover:border-gray-200"
            title="Browse Invoice Templates & Layouts"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <LayoutTemplate className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span>Templates</span>
          </button>

          {/* My Invoices */}
          <button
            type="button"
            onClick={onOpenMyInvoices}
            className="cursor-pointer relative flex items-center gap-2 px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-bold text-gray-800 hover:text-[#1A3263] hover:bg-gray-100/90 active:bg-gray-200 rounded-lg transition border border-transparent hover:border-gray-200"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <FolderOpen className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <span>My Invoices</span>
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
            className="cursor-pointer flex items-center gap-2 px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-bold text-gray-800 hover:text-[#1A3263] hover:bg-gray-100/90 active:bg-gray-200 rounded-lg transition border border-transparent hover:border-gray-200"
          >
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <Database className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <span>Import / Export</span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="cursor-pointer flex items-center gap-2 px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-bold text-gray-800 hover:text-[#1A3263] hover:bg-gray-100/90 active:bg-gray-200 rounded-lg transition border border-transparent hover:border-gray-200"
            title="Invoice Settings & Customization"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Sliders className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <span>Settings</span>
          </button>

          {/* New Invoice option on the right side of Settings */}
          <button
            type="button"
            onClick={onNewInvoice}
            className="cursor-pointer flex items-center gap-2 px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-bold text-white bg-[#1A3263] hover:bg-[#122448] active:bg-[#0d1a36] rounded-lg shadow-2xs border border-[#1A3263] transition ml-1"
            title="Create a new invoice"
          >
            <div className="w-6 h-6 rounded-md bg-white/20 text-white flex items-center justify-center shrink-0">
              <Plus className="w-3.5 h-3.5 text-white stroke-[2.8]" />
            </div>
            <span>New Invoice</span>
          </button>
        </nav>

        {/* Mobile & Tablet controls: Quick New button + Hamburger Toggle (< lg) */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick New button */}
          <button
            type="button"
            onClick={onNewInvoice}
            className="cursor-pointer flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-white bg-[#1A3263] hover:bg-[#122448] active:bg-[#0d1a36] rounded-lg shadow-2xs transition"
            title="Create a new invoice"
          >
            <Plus className="w-3.5 h-3.5 text-white stroke-[2.8]" />
            <span>New</span>
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cursor-pointer p-2 rounded-lg text-gray-700 hover:text-[#1A3263] hover:bg-gray-100 border border-gray-200 transition focus:outline-none focus:ring-2 focus:ring-[#1A3263]/20"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-800 stroke-[2.5]" />
            ) : (
              <Menu className="w-5 h-5 text-gray-800 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer / Dropdown Menu & Scrim */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 top-[62px] bg-black/40 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-150"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown Menu */}
          <div
            ref={mobileMenuRef}
            className="absolute top-[62px] left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 lg:hidden animate-in slide-in-from-top-2 duration-150 py-3 px-4 max-h-[calc(100vh-75px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-1">
              {/* Invoice Generator */}
              <button
                type="button"
                onClick={handleHomeClick}
                className="cursor-pointer flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 text-left text-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1A3263]/10 flex items-center justify-center text-[#1A3263]">
                    <FileText className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Invoice Generator</div>
                    <div className="text-xs text-gray-500">Create & edit your invoice</div>
                  </div>
                </div>
              </button>

              {/* Templates */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTemplates();
                }}
                className="cursor-pointer flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 text-left text-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <LayoutTemplate className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Templates Library</div>
                    <div className="text-xs text-gray-500">12 layouts & profession templates</div>
                  </div>
                </div>
              </button>

              {/* My Invoices */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyInvoices();
                }}
                className="cursor-pointer flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 text-left text-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <FolderOpen className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">My Invoices</div>
                    <div className="text-xs text-gray-500">Saved browser invoices</div>
                  </div>
                </div>
                {savedInvoicesCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-[#1A3263] text-white">
                    {savedInvoicesCount}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 font-medium">0 saved</span>
                )}
              </button>

              {/* Import / Export */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenImportExport();
                }}
                className="cursor-pointer flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 text-left text-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Database className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Import / Export Backup</div>
                    <div className="text-xs text-gray-500">Backup, transfer or restore data</div>
                  </div>
                </div>
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="cursor-pointer flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 text-left text-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Sliders className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Invoice Settings</div>
                    <div className="text-xs text-gray-500">Colors, typography, taxes & layout</div>
                  </div>
                </div>
              </button>

              {/* New Invoice Button */}
              <div className="pt-2 border-t border-gray-100 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNewInvoice();
                  }}
                  className="cursor-pointer flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-[#1A3263] hover:bg-[#122448] active:bg-[#0d1a36] text-white font-bold transition shadow-2xs"
                >
                  <Plus className="w-4 h-4 text-white stroke-[2.8]" />
                  <span>Start New Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
