import React from 'react';
import { InvoiceData } from '../types/invoice';
import { calculateInvoiceTotals, formatDate, formatMoney } from '../utils/currency';
import { getFontCssFamily } from '../utils/fonts';
import { ArrowLeft, Download, Printer } from 'lucide-react';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  onBackToEdit: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoice,
  onBackToEdit,
  onDownloadPdf,
  onPrint,
}) => {
  const totals = calculateInvoiceTotals(invoice);
  const accent = invoice.customization.accentColor || '#1A3263';
  const activeFontFamilyCss = getFontCssFamily(invoice.customization.fontFamily);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top action helper in preview */}
      <div className="w-full max-w-[960px] flex items-center justify-between mb-5 px-2 no-print">
        <button
          type="button"
          onClick={onBackToEdit}
          className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-gray-50 px-4 py-2.5 rounded-lg shadow-2xs transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Edit
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrint}
            className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-gray-50 px-4 py-2.5 rounded-lg transition shadow-2xs"
          >
            <Printer className="w-4 h-4 text-[#1A3263]" /> Print
          </button>
          <button
            type="button"
            onClick={onDownloadPdf}
            className="cursor-pointer inline-flex items-center gap-2 text-sm font-bold text-white bg-[#1A3263] hover:bg-[#132549] px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* The Actual Invoice Document Page with large typography */}
      <div
        id="invoice-print-area"
        className="w-full max-w-[960px] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden print:shadow-none print:border-none print:max-w-none transition-all"
        style={{ minHeight: '1100px', fontFamily: activeFontFamilyCss }}
      >
        <div className="p-8 sm:p-14 relative">
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
            </div>

            <div className="text-left sm:text-right">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-gray-900">
                {invoice.title || 'INVOICE'}
              </h1>
              <p className="text-base sm:text-lg font-bold text-gray-500 mt-1">#{invoice.number}</p>
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
              {invoice.fromTaxId && (
                <div className="text-gray-500 mt-1 text-xs sm:text-sm">Tax ID: {invoice.fromTaxId}</div>
              )}
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

          {/* LINE ITEMS TABLE */}
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: accent }}
                >
                  <th className="py-3.5 px-5">Description</th>
                  <th className="py-3.5 px-4 text-right w-28">Rate</th>
                  <th className="py-3.5 px-4 text-right w-24">Qty</th>
                  <th className="py-3.5 px-5 text-right w-36">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm sm:text-base">
                {invoice.items.map((item, idx) => {
                  const lineAmount = (Number(item.quantity) || 0) * (Number(item.rate) || 0);

                  return (
                    <tr
                      key={item.id}
                      className={idx % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}
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
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span
                    className="font-bold text-xs sm:text-sm tracking-wider uppercase block mb-1.5"
                    style={{ color: accent }}
                  >
                    Payment Details
                  </span>
                  <pre className="text-xs sm:text-sm text-gray-800 font-mono whitespace-pre-wrap leading-relaxed">
                    {invoice.paymentDetails}
                  </pre>
                </div>
              )}
            </div>

            {/* Calculations Breakdown (Right) with larger typography */}
            <div className="w-full sm:w-96 space-y-3 text-sm sm:text-base">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-900">
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
                  <span className="font-bold">
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
                  <span className="font-bold text-gray-900">
                    +{formatMoney(
                      totals.taxAmount,
                      invoice.customization.currencySymbol,
                      invoice.customization.currencyPosition
                    )}
                  </span>
                </div>
              )}

              <div className="border-t-2 border-gray-200 pt-3 flex justify-between font-extrabold text-base sm:text-lg text-gray-900">
                <span>Total:</span>
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
                  <span>Amount Paid:</span>
                  <span>
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
                <span className="font-bold uppercase tracking-wider text-xs sm:text-sm">Balance Due</span>
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

          {/* ATTACHMENTS & RECEIPTS IN PREVIEW */}
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
        </div>
      </div>
    </div>
  );
};
