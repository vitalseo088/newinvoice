import React from 'react';
import { useTranslation } from 'react-i18next';
import { InvoiceData } from '../types/invoice';
import { calculateInvoiceTotals, formatDate, formatMoney } from '../utils/currency';
import { getFontCssFamily } from '../utils/fonts';
import { TEMPLATES } from '../utils/templates';
import {
  ArrowLeft,
  Download,
  Printer,
  Sliders,
  Globe,
  Building2,
  ShieldCheck,
  Receipt,
  Briefcase,
  FileText,
} from 'lucide-react';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  onBackToEdit: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onOpenCustomize?: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoice,
  onBackToEdit,
  onDownloadPdf,
  onPrint,
  onOpenCustomize,
}) => {
  const { t } = useTranslation('common');
  const totals = calculateInvoiceTotals(invoice);
  const accent = invoice.customization.accentColor || '#1A3263';
  const activeFontFamilyCss = getFontCssFamily(invoice.customization.fontFamily);
  const templateId = invoice.customization.template || 'classic-professional';
  const activeTemplateMeta = TEMPLATES.find((t) => t.id === templateId);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top action helper in preview */}
      <div className="w-full max-w-[960px] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5 px-2 no-print">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToEdit}
            className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-gray-50 px-4 py-2 rounded-lg shadow-2xs transition"
          >
            <ArrowLeft className="w-4 h-4" /> {t('preview.backToEdit')}
          </button>

          {/* Active template layout badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs text-gray-600 shadow-2xs">
            <span className="text-gray-400 font-medium">{t('preview.layout')}</span>
            <span className="font-bold text-[#1A3263]">
              {activeTemplateMeta?.name || templateId}
            </span>
            {onOpenCustomize && (
              <button
                type="button"
                onClick={onOpenCustomize}
                className="cursor-pointer text-[#1A3263] hover:underline ml-1 font-semibold flex items-center gap-0.5"
                title={t('preview.change')}
              >
                <Sliders className="w-3 h-3 inline" /> {t('preview.change')}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5 justify-end">
          <button
            type="button"
            onClick={onPrint}
            className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-gray-50 px-4 py-2 rounded-lg transition shadow-2xs"
          >
            <Printer className="w-4 h-4 text-[#1A3263]" /> {t('preview.print')}
          </button>
          <button
            type="button"
            onClick={onDownloadPdf}
            className="cursor-pointer inline-flex items-center gap-2 text-sm font-bold text-white bg-[#1A3263] hover:bg-[#132549] px-5 py-2 rounded-lg shadow-sm transition"
          >
            <Download className="w-4 h-4" /> {t('preview.downloadPdf')}
          </button>
        </div>
      </div>

      {/* The Actual Invoice Document Page */}
      <div
        id="invoice-print-area"
        className="w-full max-w-[960px] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden print:shadow-none print:border-none print:max-w-none transition-all"
        style={{ minHeight: '1100px', fontFamily: activeFontFamilyCss }}
      >
        {/* ========================================================= */}
        {/* TEMPLATE VARIANT 1: BOLD HEADER FULL-WIDTH BANNER */}
        {/* ========================================================= */}
        {templateId === 'bold-header' ? (
          <div>
            {/* Top Bold Header Banner */}
            <div
              className="p-6 sm:p-10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              style={{ backgroundColor: accent }}
            >
              <div className="flex items-center gap-4">
                {invoice.logoUrl ? (
                  <div className="p-2 bg-white/95 rounded-xl inline-block shadow-xs">
                    <img
                      src={invoice.logoUrl}
                      alt="Logo"
                      style={{ width: `${invoice.customization.logoWidth}px` }}
                      className="max-h-20 object-contain"
                    />
                  </div>
                ) : null}
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {invoice.fromName || 'Your Company'}
                  </div>
                  {invoice.fromAddress && (
                    <div className="text-white/80 text-xs sm:text-sm mt-0.5">
                      {invoice.fromAddress} {invoice.fromCityState ? `• ${invoice.fromCityState}` : ''}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                  {invoice.title || 'INVOICE'}
                </h1>
                <p className="text-base sm:text-lg font-bold text-white/90 font-mono mt-1">
                  #{invoice.number}
                </p>
                <div className="text-xs sm:text-sm text-white/80 mt-1">
                  Date: {formatDate(invoice.date, invoice.customization.dateFormat)}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-8 md:p-12 relative">
              {/* SENDER & CLIENT DETAILS IN BOLD HEADER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-gray-200 text-sm">
                <div>
                  <span
                    className="text-xs font-bold tracking-wider uppercase block mb-1.5"
                    style={{ color: accent }}
                  >
                    Issuer Details
                  </span>
                  <div className="font-bold text-base text-gray-900">{invoice.fromName}</div>
                  {invoice.fromEmail && <div className="text-gray-600">{invoice.fromEmail}</div>}
                  {invoice.fromPhone && <div className="text-gray-600">{invoice.fromPhone}</div>}
                  {invoice.fromTaxId && (
                    <div className="text-gray-500 mt-1 text-xs">Tax ID: {invoice.fromTaxId}</div>
                  )}
                </div>

                <div className="sm:text-right">
                  <span
                    className="text-xs font-bold tracking-wider uppercase block mb-1.5"
                    style={{ color: accent }}
                  >
                    Billed To
                  </span>
                  <div className="font-bold text-base text-gray-900">{invoice.toName || 'Client'}</div>
                  {invoice.toAddress && <div className="text-gray-600">{invoice.toAddress}</div>}
                  {(invoice.toCityState || invoice.toZip) && (
                    <div className="text-gray-600">
                      {invoice.toCityState} {invoice.toZip}
                    </div>
                  )}
                  {invoice.toEmail && <div className="text-gray-600">{invoice.toEmail}</div>}
                  {invoice.toTaxId && (
                    <div className="text-gray-500 mt-1 text-xs">VAT / Tax ID: {invoice.toTaxId}</div>
                  )}
                </div>
              </div>

              {/* INVOICE SUMMARY ROW */}
              <div className="my-8 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 block mb-1">
                    Invoice Date
                  </span>
                  <span className="font-bold text-gray-900 text-sm">
                    {formatDate(invoice.date, invoice.customization.dateFormat)}
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 block mb-1">
                    Payment Terms
                  </span>
                  <span className="font-bold text-gray-900 text-sm capitalize">
                    {invoice.paymentTerms.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 block mb-1">
                    Due Date
                  </span>
                  <span className="font-bold text-gray-900 text-sm">
                    {formatDate(invoice.dueDate, invoice.customization.dateFormat)}
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs uppercase font-bold text-gray-500 block mb-1">
                    Balance Due
                  </span>
                  <span className="font-black text-base sm:text-lg" style={{ color: accent }}>
                    {formatMoney(
                      totals.balanceDue,
                      invoice.customization.currencySymbol,
                      invoice.customization.currencyPosition
                    )}
                  </span>
                </div>
              </div>

              {renderLineItemsAndTotals()}
            </div>
          </div>
        ) : templateId === 'corporate-blue' ? (
          /* ========================================================= */
          /* TEMPLATE VARIANT 2: CORPORATE BLUE WITH DUAL CARDS */
          /* ========================================================= */
          <div className="p-4 sm:p-8 md:p-12 relative">
            {/* Corporate Top Status Strip */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-900">
                  ORIGINAL TAX INVOICE • CORPORATE RECORD
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-gray-500">
                SYSTEM REF: #{invoice.number}
              </span>
            </div>

            {/* Corporate Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6">
              <div>
                {invoice.logoUrl ? (
                  <img
                    src={invoice.logoUrl}
                    alt="Logo"
                    style={{ width: `${invoice.customization.logoWidth}px` }}
                    className="max-h-20 object-contain mb-2"
                  />
                ) : (
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {invoice.fromName || 'Corporate Provider'}
                  </div>
                )}
                {invoice.fromTaxId && (
                  <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 mt-1">
                    Tax / Registration: {invoice.fromTaxId}
                  </span>
                )}
              </div>

              <div className="text-left sm:text-right">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-blue-950">
                  {invoice.title || 'INVOICE'}
                </h1>
                <div className="mt-1 text-sm font-bold text-gray-600">
                  Date of Issue: {formatDate(invoice.date, invoice.customization.dateFormat)}
                </div>
                <div className="text-xs text-gray-500">
                  Payment Due: {formatDate(invoice.dueDate, invoice.customization.dateFormat)}
                </div>
              </div>
            </div>

            {/* Dual Structured Boxes for From & Bill To */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 block mb-1.5">
                  Service Provider / Creditor
                </span>
                <div className="font-bold text-gray-900 text-base mb-1">{invoice.fromName}</div>
                {invoice.fromAddress && <div className="text-xs sm:text-sm text-gray-600">{invoice.fromAddress}</div>}
                {(invoice.fromCityState || invoice.fromZip) && (
                  <div className="text-xs sm:text-sm text-gray-600">
                    {invoice.fromCityState} {invoice.fromZip}
                  </div>
                )}
                {invoice.fromEmail && <div className="text-xs sm:text-sm text-gray-600">{invoice.fromEmail}</div>}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 block mb-1.5">
                  Client / Debtor
                </span>
                <div className="font-bold text-gray-900 text-base mb-1">{invoice.toName || 'Client'}</div>
                {invoice.toAddress && <div className="text-xs sm:text-sm text-gray-600">{invoice.toAddress}</div>}
                {(invoice.toCityState || invoice.toZip) && (
                  <div className="text-xs sm:text-sm text-gray-600">
                    {invoice.toCityState} {invoice.toZip}
                  </div>
                )}
                {invoice.toEmail && <div className="text-xs sm:text-sm text-gray-600">{invoice.toEmail}</div>}
                {invoice.toTaxId && (
                  <div className="text-xs text-blue-900/80 font-medium mt-1">
                    Client Tax ID: {invoice.toTaxId}
                  </div>
                )}
              </div>
            </div>

            {renderLineItemsAndTotals()}
          </div>
        ) : templateId === 'modern-minimal' ? (
          /* ========================================================= */
          /* TEMPLATE VARIANT 3: MODERN MINIMAL */
          /* ========================================================= */
          <div className="p-4 sm:p-8 md:p-14 relative">
            {/* Minimal Header */}
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <h1 className="text-3xl sm:text-4xl font-light tracking-widest uppercase text-gray-900">
                  {invoice.title || 'INVOICE'}
                </h1>
                <p className="text-sm font-mono text-gray-400 mt-1">#{invoice.number}</p>
              </div>

              <div className="text-left sm:text-right">
                {invoice.logoUrl ? (
                  <img
                    src={invoice.logoUrl}
                    alt="Logo"
                    style={{ width: `${invoice.customization.logoWidth}px` }}
                    className="max-h-16 object-contain mb-1"
                  />
                ) : (
                  <div className="text-xl font-bold text-gray-900 tracking-tight">
                    {invoice.fromName}
                  </div>
                )}
                <div className="text-xs text-gray-400">
                  Issued: {formatDate(invoice.date, invoice.customization.dateFormat)}
                </div>
              </div>
            </div>

            {/* Minimal Two Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 text-sm">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-2">
                  FROM
                </span>
                <div className="font-semibold text-gray-900">{invoice.fromName}</div>
                {invoice.fromAddress && <div className="text-gray-500">{invoice.fromAddress}</div>}
                {invoice.fromEmail && <div className="text-gray-500">{invoice.fromEmail}</div>}
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-2">
                  BILLED TO
                </span>
                <div className="font-semibold text-gray-900">{invoice.toName || 'Client'}</div>
                {invoice.toAddress && <div className="text-gray-500">{invoice.toAddress}</div>}
                {invoice.toEmail && <div className="text-gray-500">{invoice.toEmail}</div>}
              </div>
            </div>

            {renderLineItemsAndTotals({ isMinimalTable: true })}
          </div>
        ) : templateId === 'creative-studio' ? (
          /* ========================================================= */
          /* TEMPLATE VARIANT 4: CREATIVE STUDIO */
          /* ========================================================= */
          <div className="p-4 sm:p-8 md:p-12 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {invoice.logoUrl ? (
                  <img
                    src={invoice.logoUrl}
                    alt="Logo"
                    style={{ width: `${invoice.customization.logoWidth}px` }}
                    className="max-h-20 object-contain"
                  />
                ) : (
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    {invoice.fromName || 'Studio'}
                  </div>
                )}
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-2xs"
                  style={{ backgroundColor: accent }}
                >
                  #{invoice.number}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {invoice.title || 'PROJECT INVOICE'}
                </h1>
                <div className="text-xs text-gray-500 font-medium mt-0.5">
                  Due: {formatDate(invoice.dueDate, invoice.customization.dateFormat)}
                </div>
              </div>
            </div>

            {/* Sender and client details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 text-sm border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Studio Creator
                </span>
                <div className="font-bold text-gray-900">{invoice.fromName}</div>
                {invoice.fromAddress && <div className="text-gray-600">{invoice.fromAddress}</div>}
                {invoice.fromEmail && <div className="text-gray-600">{invoice.fromEmail}</div>}
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Commissioned For
                </span>
                <div className="font-bold text-gray-900">{invoice.toName || 'Client'}</div>
                {invoice.toAddress && <div className="text-gray-600">{invoice.toAddress}</div>}
                {invoice.toEmail && <div className="text-gray-600">{invoice.toEmail}</div>}
              </div>
            </div>

            {renderLineItemsAndTotals()}
          </div>
        ) : templateId === 'elegant-business' ? (
          /* ========================================================= */
          /* TEMPLATE VARIANT 5: ELEGANT BUSINESS */
          /* ========================================================= */
          <div className="p-4 sm:p-8 md:p-14 relative font-serif">
            {/* Elegant Header with double border */}
            <div className="text-center pb-6 border-b-4 border-double border-gray-300">
              {invoice.logoUrl && (
                <div className="flex justify-center mb-3">
                  <img
                    src={invoice.logoUrl}
                    alt="Logo"
                    style={{ width: `${invoice.customization.logoWidth}px` }}
                    className="max-h-20 object-contain"
                  />
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-widest text-gray-900">
                {invoice.fromName || 'STATEMENT OF ACCOUNT'}
              </h1>
              <div className="text-sm font-sans uppercase tracking-wider text-gray-500 mt-1">
                {invoice.title || 'Professional Fee Statement'} • Ref #{invoice.number}
              </div>
            </div>

            {/* Sender & Client Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 text-sm font-sans border-b border-gray-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1 font-serif">
                  From:
                </span>
                <div className="font-bold text-base text-gray-900">{invoice.fromName}</div>
                {invoice.fromAddress && <div className="text-gray-600">{invoice.fromAddress}</div>}
                {invoice.fromEmail && <div className="text-gray-600">{invoice.fromEmail}</div>}
                {invoice.fromTaxId && <div className="text-gray-500 text-xs">Tax ID: {invoice.fromTaxId}</div>}
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1 font-serif">
                  Account For:
                </span>
                <div className="font-bold text-base text-gray-900">{invoice.toName || 'Client'}</div>
                {invoice.toAddress && <div className="text-gray-600">{invoice.toAddress}</div>}
                {invoice.toEmail && <div className="text-gray-600">{invoice.toEmail}</div>}
              </div>
            </div>

            {renderLineItemsAndTotals()}
          </div>
        ) : templateId === 'international-invoice' ? (
          /* ========================================================= */
          /* TEMPLATE VARIANT 6: INTERNATIONAL CROSS-BORDER */
          /* ========================================================= */
          <div className="p-4 sm:p-8 md:p-12 relative">
            {/* International Currency & Compliance Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 mb-6 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span className="font-extrabold uppercase">
                  CROSS-BORDER BILLING INVOICE
                </span>
                <span className="bg-emerald-200/60 font-bold px-2 py-0.5 rounded">
                  Currency: {invoice.customization.currency} ({invoice.customization.currencySymbol})
                </span>
              </div>
              <span className="font-semibold text-emerald-800">
                IBAN / SWIFT Settled Document
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-200">
              <div>
                {invoice.logoUrl ? (
                  <img
                    src={invoice.logoUrl}
                    alt="Logo"
                    style={{ width: `${invoice.customization.logoWidth}px` }}
                    className="max-h-20 object-contain mb-2"
                  />
                ) : (
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {invoice.fromName}
                  </div>
                )}
                {invoice.fromTaxId && (
                  <div className="text-xs text-gray-500">
                    Exporter NTN / Tax ID: <strong>{invoice.fromTaxId}</strong>
                  </div>
                )}
              </div>

              <div className="text-left sm:text-right">
                <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-900">
                  {invoice.title || 'INVOICE'}
                </h1>
                <div className="text-sm font-mono font-bold text-gray-500">#{invoice.number}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Issue Date: {formatDate(invoice.date, invoice.customization.dateFormat)}
                </div>
              </div>
            </div>

            {/* SENDER & CLIENT DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 text-sm border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-emerald-800">
                  Origin / Service Provider
                </span>
                <div className="font-bold text-gray-900 text-base">{invoice.fromName}</div>
                {invoice.fromAddress && <div className="text-gray-600">{invoice.fromAddress}</div>}
                {(invoice.fromCityState || invoice.fromZip) && (
                  <div className="text-gray-600">{invoice.fromCityState} {invoice.fromZip}</div>
                )}
                {invoice.fromEmail && <div className="text-gray-600">{invoice.fromEmail}</div>}
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-emerald-800">
                  Recipient / Importer
                </span>
                <div className="font-bold text-gray-900 text-base">{invoice.toName || 'Client'}</div>
                {invoice.toAddress && <div className="text-gray-600">{invoice.toAddress}</div>}
                {(invoice.toCityState || invoice.toZip) && (
                  <div className="text-gray-600">{invoice.toCityState} {invoice.toZip}</div>
                )}
                {invoice.toTaxId && (
                  <div className="text-xs text-gray-500 mt-1">Client VAT/Tax ID: {invoice.toTaxId}</div>
                )}
              </div>
            </div>

            {renderLineItemsAndTotals({ isInternational: true })}
          </div>
        ) : (
          /* ========================================================= */
          /* STANDARD / CLASSIC / SERVICE / FREELANCER / COMPACT DEFAULT */
          /* ========================================================= */
          <div className="p-4 sm:p-8 md:p-14 relative">
            {/* Header */}
            <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-gray-200">
              <div>
                {invoice.logoUrl ? (
                  <img
                    src={invoice.logoUrl}
                    alt="Logo"
                    style={{ width: `${invoice.customization.logoWidth}px` }}
                    className="max-h-24 object-contain mb-3"
                  />
                ) : (
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {invoice.fromName || 'Your Company'}
                  </div>
                )}
                {invoice.fromTaxId && (
                  <div className="text-xs text-gray-500">Tax ID / NTN: {invoice.fromTaxId}</div>
                )}
              </div>

              <div className="text-left sm:text-right">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-gray-900">
                  {invoice.title || 'INVOICE'}
                </h1>
                <p className="text-base sm:text-lg font-bold text-gray-500 mt-1 font-mono">
                  #{invoice.number}
                </p>
                {templateId === 'freelancer-invoice' && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mt-1">
                    Freelance Project
                  </span>
                )}
              </div>
            </div>

            {/* SENDER & CLIENT DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14 py-8 text-sm sm:text-base border-b border-gray-100">
              {/* FROM */}
              <div>
                <span
                  className="text-xs sm:text-sm font-bold tracking-wider uppercase block mb-2"
                  style={{ color: accent }}
                >
                  From
                </span>
                <div className="font-bold text-base sm:text-lg text-gray-900 mb-1">{invoice.fromName}</div>
                {invoice.fromAddress && <div className="text-gray-600">{invoice.fromAddress}</div>}
                {(invoice.fromCityState || invoice.fromZip) && (
                  <div className="text-gray-600">
                    {invoice.fromCityState} {invoice.fromZip}
                  </div>
                )}
                {invoice.fromEmail && <div className="text-gray-600">{invoice.fromEmail}</div>}
                {invoice.fromPhone && <div className="text-gray-600">{invoice.fromPhone}</div>}
                {invoice.fromAdditional && (
                  <div className="text-gray-500 mt-0.5 text-xs sm:text-sm">{invoice.fromAdditional}</div>
                )}
              </div>

              {/* BILL TO */}
              <div className="sm:text-right">
                <span
                  className="text-xs sm:text-sm font-bold tracking-wider uppercase block mb-2"
                  style={{ color: accent }}
                >
                  Bill To
                </span>
                <div className="font-bold text-base sm:text-lg text-gray-900 mb-1">{invoice.toName || 'Client'}</div>
                {invoice.toAddress && <div className="text-gray-600">{invoice.toAddress}</div>}
                {(invoice.toCityState || invoice.toZip) && (
                  <div className="text-gray-600">
                    {invoice.toCityState} {invoice.toZip}
                  </div>
                )}
                {invoice.toEmail && <div className="text-gray-600">{invoice.toEmail}</div>}
                {invoice.toPhone && <div className="text-gray-600">{invoice.toPhone}</div>}
                {invoice.toTaxId && (
                  <div className="text-gray-500 mt-1 text-xs sm:text-sm">Tax ID / VAT: {invoice.toTaxId}</div>
                )}
              </div>
            </div>

            {/* INVOICE SUMMARY ROW */}
            <div className="my-8 p-5 rounded-xl bg-[#F8FAFC] border border-gray-200/90 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-xs uppercase font-bold text-gray-500 block mb-1">
                  Invoice Date
                </span>
                <span className="font-bold text-gray-900 text-sm sm:text-base">
                  {formatDate(invoice.date, invoice.customization.dateFormat)}
                </span>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-gray-500 block mb-1">
                  Payment Terms
                </span>
                <span className="font-bold text-gray-900 text-sm sm:text-base capitalize">
                  {invoice.paymentTerms.replace('_', ' ')}
                </span>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-gray-500 block mb-1">
                  Due Date
                </span>
                <span className="font-bold text-gray-900 text-sm sm:text-base">
                  {formatDate(invoice.dueDate, invoice.customization.dateFormat)}
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-xs uppercase font-bold text-gray-500 block mb-1">
                  {invoice.poNumber ? 'P.O. Number' : 'Balance Due'}
                </span>
                {invoice.poNumber ? (
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{invoice.poNumber}</span>
                ) : (
                  <span className="font-extrabold text-base sm:text-lg" style={{ color: accent }}>
                    {formatMoney(
                      totals.balanceDue,
                      invoice.customization.currencySymbol,
                      invoice.customization.currencyPosition
                    )}
                  </span>
                )}
              </div>
            </div>

            {renderLineItemsAndTotals()}
          </div>
        )}
      </div>
    </div>
  );

  // Helper renderer for line items table, calculations breakdown, bank instructions, and signatures
  function renderLineItemsAndTotals(options?: { isMinimalTable?: boolean; isInternational?: boolean }) {
    const isMinimal = options?.isMinimalTable;

    return (
      <>
        {/* LINE ITEMS TABLE */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[520px] sm:min-w-0">
            <thead>
              <tr
                className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                  isMinimal
                    ? 'bg-transparent text-gray-700 border-b-2 border-gray-200'
                    : 'text-white'
                }`}
                style={!isMinimal ? { backgroundColor: accent } : undefined}
              >
                <th className="py-3.5 px-5">{t('preview.description')}</th>
                <th className="py-3.5 px-4 text-right w-28">{t('preview.rate')}</th>
                <th className="py-3.5 px-4 text-right w-24">{t('preview.qty')}</th>
                <th className="py-3.5 px-5 text-right w-36">{t('preview.amount')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm sm:text-base">
              {invoice.items.map((item, idx) => {
                const lineAmount = (Number(item.quantity) || 0) * (Number(item.rate) || 0);

                return (
                  <tr
                    key={item.id}
                    className={idx % 2 === 1 && !isMinimal ? 'bg-gray-50/50' : 'bg-white'}
                  >
                    <td className="py-4 px-5">
                      <div className="font-bold text-gray-900">{item.description}</div>
                      {item.details && (
                        <div className="text-xs sm:text-sm text-gray-600 whitespace-pre-line mt-1">
                          {item.details}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-700 font-mono">
                      {formatMoney(
                        item.rate,
                        invoice.customization.currencySymbol,
                        invoice.customization.currencyPosition
                      )}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-700 font-mono">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-5 text-right font-bold text-gray-900 font-mono">
                      {formatMoney(
                        lineAmount,
                        invoice.customization.currencySymbol,
                        invoice.customization.currencyPosition
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* TOTALS & SUMMARY SECTION */}
        <div className="mt-10 pt-4 flex flex-col sm:flex-row justify-between items-start gap-10">
          {/* Notes & Bank Details (Left) */}
          <div className="w-full sm:w-1/2 space-y-5 text-sm">
            {invoice.customization.showNotes && invoice.notes && (
              <div>
                <span
                  className="font-bold text-xs sm:text-sm tracking-wider uppercase block mb-1.5"
                  style={{ color: accent }}
                >
                  Notes & Terms
                </span>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                  {invoice.notes}
                </p>
              </div>
            )}

            {invoice.customization.showPaymentDetails && invoice.paymentDetails && (
              <div
                className={`p-4 rounded-xl border ${
                  templateId === 'freelancer-invoice'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="font-bold text-xs sm:text-sm tracking-wider uppercase block"
                    style={{ color: accent }}
                  >
                    Payment Details & Wire Instructions
                  </span>
                  {templateId === 'freelancer-invoice' && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Direct Deposit / ACH / IBAN
                    </span>
                  )}
                </div>
                <pre className="text-xs sm:text-sm text-gray-800 font-mono whitespace-pre-wrap leading-relaxed">
                  {invoice.paymentDetails}
                </pre>
              </div>
            )}
          </div>

          {/* Calculations Breakdown (Right) */}
          <div className="w-full sm:w-96 space-y-3 text-sm sm:text-base">
            <div className="flex justify-between text-gray-700">
              <span>{t('preview.subtotal')}:</span>
              <span className="font-bold text-gray-900 font-mono">
                {formatMoney(
                  totals.subtotal,
                  invoice.customization.currencySymbol,
                  invoice.customization.currencyPosition
                )}
              </span>
            </div>

            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-red-600">
                <span>
                  Discount ({invoice.customization.discountType === 'percent' ? `${invoice.customization.discountRate}%` : 'Flat'}):
                </span>
                <span className="font-bold font-mono">
                  -{formatMoney(
                    totals.discountAmount,
                    invoice.customization.currencySymbol,
                    invoice.customization.currencyPosition
                  )}
                </span>
              </div>
            )}

            {totals.taxAmount > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>
                  {invoice.customization.taxLabel || 'Tax'} ({invoice.customization.taxType === 'percent' ? `${invoice.customization.taxRate}%` : 'Flat'}):
                </span>
                <span className="font-bold text-gray-900 font-mono">
                  +{formatMoney(
                    totals.taxAmount,
                    invoice.customization.currencySymbol,
                    invoice.customization.currencyPosition
                  )}
                </span>
              </div>
            )}

            <div className="border-t-2 border-gray-200 pt-3 flex justify-between font-extrabold text-base sm:text-lg text-gray-900">
              <span>{t('preview.total')}:</span>
              <span className="font-mono">
                {formatMoney(
                  totals.total,
                  invoice.customization.currencySymbol,
                  invoice.customization.currencyPosition
                )}
              </span>
            </div>

            {invoice.customization.showAmountPaid && totals.amountPaid > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold text-sm sm:text-base">
                <span>{t('preview.amountPaid')}:</span>
                <span className="font-mono">
                  {formatMoney(
                    totals.amountPaid,
                    invoice.customization.currencySymbol,
                    invoice.customization.currencyPosition
                  )}
                </span>
              </div>
            )}

            <div
              className="mt-4 p-4 rounded-xl text-white flex justify-between items-center shadow-md"
              style={{ backgroundColor: accent }}
            >
              <span className="font-bold uppercase tracking-wider text-xs sm:text-sm">{t('preview.balanceDue')}</span>
              <span className="font-extrabold text-xl sm:text-2xl font-mono">
                {formatMoney(
                  totals.balanceDue,
                  invoice.customization.currencySymbol,
                  invoice.customization.currencyPosition
                )}
              </span>
            </div>
          </div>
        </div>

        {/* SIGNATURE SECTION */}
        {invoice.customization.showSignature && (invoice.signatureUrl || invoice.signerName) && (
          <div className="mt-14 pt-6 border-t border-gray-200 flex flex-col items-start w-72">
            {invoice.signatureUrl && (
              <img
                src={invoice.signatureUrl}
                alt="Signature"
                className="h-20 object-contain mb-2"
              />
            )}
            <div className="w-full border-b-2 border-gray-400 mb-1.5" />
            {invoice.signerName && (
              <div className="text-sm sm:text-base font-bold text-gray-900">{invoice.signerName}</div>
            )}
            {invoice.signerTitle && (
              <div className="text-xs sm:text-sm text-gray-500 font-medium">{invoice.signerTitle}</div>
            )}
          </div>
        )}

        {/* ATTACHMENTS & RECEIPTS */}
        {invoice.customization.showAttachments &&
          invoice.attachments.filter((a) => a.includeInPdf).length > 0 && (
            <div className="mt-14 pt-6 border-t border-gray-200">
              <span
                className="font-bold text-sm sm:text-base uppercase tracking-wider block mb-4"
                style={{ color: accent }}
              >
                Attached Proof & Receipts
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {invoice.attachments
                  .filter((a) => a.includeInPdf)
                  .map((att) => (
                    <div key={att.id} className="border border-gray-200 rounded-xl p-3 bg-gray-50">
                      <img
                        src={att.dataUrl}
                        alt={att.name}
                        className="w-full h-36 object-contain bg-white rounded-lg mb-2"
                      />
                      <span className="text-xs text-gray-700 truncate block font-semibold">
                        {att.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
      </>
    );
  }
};
