import React, { useRef } from 'react';
import {
  Upload,
  Plus,
  Trash2,
  PenTool,
  Paperclip,
  Building2,
  User,
} from 'lucide-react';
import { InvoiceData, LineItem, PaymentTerms } from '../types/invoice';
import { calculateInvoiceTotals, computeDueDate, formatMoney, CURRENCIES } from '../utils/currency';
import { compressImage } from '../utils/storage';
import { getFontCssFamily } from '../utils/fonts';

interface InvoiceEditorProps {
  invoice: InvoiceData;
  onChange: (updated: InvoiceData) => void;
  onOpenSignatureModal: () => void;
}

export const InvoiceEditor: React.FC<InvoiceEditorProps> = ({
  invoice,
  onChange,
  onOpenSignatureModal,
}) => {
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const totals = calculateInvoiceTotals(invoice);

  // Field updater
  const updateField = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    onChange({
      ...invoice,
      [key]: value,
    });
  };

  // Customization field updater
  const updateCustomization = (key: string, value: any) => {
    onChange({
      ...invoice,
      customization: {
        ...invoice.customization,
        [key]: value,
      },
    });
  };

  // Terms change -> auto updates due date
  const handleTermsChange = (newTerms: PaymentTerms) => {
    const newDueDate = computeDueDate(invoice.date, newTerms);
    onChange({
      ...invoice,
      paymentTerms: newTerms,
      dueDate: newDueDate,
    });
  };

  const handleDateChange = (newDate: string) => {
    const newDueDate = computeDueDate(newDate, invoice.paymentTerms);
    onChange({
      ...invoice,
      date: newDate,
      dueDate: newDueDate,
    });
  };

  // Logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImage(file, 600, 0.9);
      updateField('logoUrl', dataUrl);
    } catch (err) {
      console.error('Logo upload error', err);
    }
  };

  // Photo / Attachment upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const newAttachments = [...invoice.attachments];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await compressImage(file, 900, 0.85);
        newAttachments.push({
          id: 'att_' + Date.now().toString(36) + '_' + i,
          name: file.name,
          dataUrl: compressed,
          size: file.size,
          includeInPdf: true,
        });
      }
      updateField('attachments', newAttachments);
    } catch (err) {
      console.error('Attachment upload failed', err);
    }
    e.target.value = '';
  };

  // Line item handlers
  const handleAddItem = () => {
    const newItem: LineItem = {
      id: 'item_' + Date.now().toString(36),
      description: '',
      details: '',
      quantity: 1,
      rate: 0,
    };
    updateField('items', [...invoice.items, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof LineItem, val: any) => {
    const updated = invoice.items.map((it) => {
      if (it.id === id) {
        return { ...it, [field]: val };
      }
      return it;
    });
    updateField('items', updated);
  };

  const handleRemoveItem = (id: string) => {
    if (invoice.items.length <= 1) {
      // Keep at least one empty item
      updateField('items', [
        {
          id: 'item_' + Date.now().toString(36),
          description: '',
          details: '',
          quantity: 1,
          rate: 0,
        },
      ]);
      return;
    }
    updateField(
      'items',
      invoice.items.filter((it) => it.id !== id)
    );
  };

  return (
    <div
      className="w-full bg-white rounded-xl border border-gray-200/90 shadow-sm p-4 sm:p-6 md:p-10 transition-all"
      style={{ fontFamily: getFontCssFamily(invoice.customization.fontFamily) }}
    >
      {/* 1. Header: Editable Title & Logo */}
      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-gray-200">
        <div className="w-full sm:w-auto">
          <input
            type="text"
            value={invoice.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 border-b-2 border-dashed border-gray-300 hover:border-gray-400 focus:border-[#1A3263] focus:ring-0 outline-none w-full sm:w-auto uppercase py-1"
            placeholder="INVOICE"
          />
          <div className="text-xs sm:text-sm text-gray-500 mt-1.5 flex items-center gap-1.5 font-medium">
            <span>Click title above to edit (e.g. Tax Invoice, Bill, Receipt)</span>
          </div>
        </div>

        {/* Logo area */}
        <div className="flex flex-col items-start sm:items-end">
          {invoice.logoUrl ? (
            <div className="relative group border border-gray-200 rounded-lg p-2 bg-gray-50/50">
              <img
                src={invoice.logoUrl}
                alt="Business Logo"
                style={{ width: `${invoice.customization.logoWidth}px` }}
                className="max-h-28 object-contain rounded"
              />
              <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-semibold bg-white text-gray-800 rounded shadow-xs hover:bg-gray-100"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => updateField('logoUrl', '')}
                  className="px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded shadow-xs hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="w-48 h-24 border-2 border-dashed border-gray-300 hover:border-[#1A3263] hover:bg-[#1A3263]/5 rounded-xl flex flex-col items-center justify-center text-gray-600 hover:text-[#1A3263] transition group"
            >
              <Upload className="w-6 h-6 mb-1 text-gray-400 group-hover:text-[#1A3263]" />
              <span className="text-sm font-bold">+ Add Logo</span>
              <span className="text-xs text-gray-400">PNG, JPG, WebP</span>
            </button>
          )}
          <input
            ref={logoInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* 2. Sender (From) and Client (Bill To) 2-column layout with larger typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 py-8 border-b border-gray-200">
        {/* FROM */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide pb-1 border-b border-gray-100">
            <Building2 className="w-4 h-4 text-[#1A3263]" />
            From (Your Business)
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              value={invoice.fromName}
              onChange={(e) => updateField('fromName', e.target.value)}
              placeholder="e.g. Acme Corporation"
              className="w-full text-sm sm:text-base font-medium border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={invoice.fromEmail}
              onChange={(e) => updateField('fromEmail', e.target.value)}
              placeholder="billing@acme.com"
              className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              value={invoice.fromAddress}
              onChange={(e) => updateField('fromAddress', e.target.value)}
              placeholder="123 Business Way, Suite 400"
              className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">City, State</label>
              <input
                type="text"
                value={invoice.fromCityState}
                onChange={(e) => updateField('fromCityState', e.target.value)}
                placeholder="New York, NY"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">ZIP / Postal Code</label>
              <input
                type="text"
                value={invoice.fromZip}
                onChange={(e) => updateField('fromZip', e.target.value)}
                placeholder="10001"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={invoice.fromPhone}
                onChange={(e) => updateField('fromPhone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Tax ID / Business #</label>
              <input
                type="text"
                value={invoice.fromTaxId}
                onChange={(e) => updateField('fromTaxId', e.target.value)}
                placeholder="EIN / VAT / GST"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Website / Additional Info</label>
            <input
              type="text"
              value={invoice.fromAdditional}
              onChange={(e) => updateField('fromAdditional', e.target.value)}
              placeholder="e.g. www.acme.com"
              className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
            />
          </div>
        </div>

        {/* BILL TO */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide pb-1 border-b border-gray-100">
            <User className="w-4 h-4 text-[#1A3263]" />
            Bill To (Client)
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Client / Company Name</label>
            <input
              type="text"
              value={invoice.toName}
              onChange={(e) => updateField('toName', e.target.value)}
              placeholder="e.g. John Doe / Global Tech Inc."
              className="w-full text-sm sm:text-base font-medium border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Client Email</label>
            <input
              type="email"
              value={invoice.toEmail}
              onChange={(e) => updateField('toEmail', e.target.value)}
              placeholder="accounts@client.com"
              className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              value={invoice.toAddress}
              onChange={(e) => updateField('toAddress', e.target.value)}
              placeholder="456 Client Plaza"
              className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">City, State</label>
              <input
                type="text"
                value={invoice.toCityState}
                onChange={(e) => updateField('toCityState', e.target.value)}
                placeholder="Los Angeles, CA"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">ZIP / Postal Code</label>
              <input
                type="text"
                value={invoice.toZip}
                onChange={(e) => updateField('toZip', e.target.value)}
                placeholder="90001"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={invoice.toPhone}
                onChange={(e) => updateField('toPhone', e.target.value)}
                placeholder="+1 (555) 987-6543"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Client Tax ID / VAT</label>
              <input
                type="text"
                value={invoice.toTaxId || ''}
                onChange={(e) => updateField('toTaxId', e.target.value)}
                placeholder="Optional Client Tax ID"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Mobile (Optional)</label>
              <input
                type="text"
                value={invoice.toMobile || ''}
                onChange={(e) => updateField('toMobile', e.target.value)}
                placeholder="Mobile number"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Fax (Optional)</label>
              <input
                type="text"
                value={invoice.toFax || ''}
                onChange={(e) => updateField('toFax', e.target.value)}
                placeholder="Fax number"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/20 outline-none transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Invoice Details Row (Number, Date, Due Date, Payment Terms, PO) */}
      <div className="py-6 border-b border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Invoice Number</label>
            <input
              type="text"
              value={invoice.number}
              onChange={(e) => updateField('number', e.target.value)}
              placeholder="INV-0001"
              className="w-full text-sm sm:text-base font-bold border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 bg-gray-50/50 focus:bg-white focus:border-[#1A3263] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Invoice Date</label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3 py-2.5 bg-white focus:border-[#1A3263] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Payment Terms</label>
            <select
              value={invoice.paymentTerms}
              onChange={(e) => handleTermsChange(e.target.value as PaymentTerms)}
              className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3 py-2.5 bg-white focus:border-[#1A3263] outline-none font-medium"
            >
              <option value="on_receipt">On Receipt</option>
              <option value="net_7">Net 7 Days</option>
              <option value="net_15">Net 15 Days</option>
              <option value="net_30">Net 30 Days</option>
              <option value="net_45">Net 45 Days</option>
              <option value="net_60">Net 60 Days</option>
              <option value="custom">Custom Due Date</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Due Date</label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3 py-2.5 bg-white focus:border-[#1A3263] outline-none"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">P.O. Number (Opt.)</label>
            <input
              type="text"
              value={invoice.poNumber || ''}
              onChange={(e) => updateField('poNumber', e.target.value)}
              placeholder="PO-8823"
              className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2.5 bg-white focus:border-[#1A3263] outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Line items table with larger fonts */}
      <div className="py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide">Line Items</h4>
          <span className="sm:hidden text-xs text-gray-400 font-medium">← Scroll table horizontally →</span>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-200 text-xs sm:text-sm font-bold text-gray-700">
                <th className="py-3 px-3.5 w-12 text-center">#</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 w-32 text-right">Rate</th>
                <th className="py-3 px-4 w-28 text-right">Qty</th>
                <th className="py-3 px-4 w-36 text-right">Amount</th>
                <th className="py-3 px-3 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm sm:text-base">
              {invoice.items.map((item, idx) => {
                const lineAmount = (Number(item.quantity) || 0) * (Number(item.rate) || 0);

                return (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-3.5 text-center text-gray-400 font-mono text-xs sm:text-sm">
                      {idx + 1}
                    </td>

                    <td className="py-3.5 px-4">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        placeholder="Item or service description"
                        className="w-full text-sm sm:text-base font-medium border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1A3263] outline-none mb-2"
                      />
                      <textarea
                        value={item.details || ''}
                        onChange={(e) => handleUpdateItem(item.id, 'details', e.target.value)}
                        rows={1}
                        placeholder="Additional item notes, specifications, or details (optional)"
                        className="w-full text-xs sm:text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:border-[#1A3263] outline-none resize-y"
                      />
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
                          {invoice.customization.currencySymbol}
                        </span>
                        <input
                          type="number"
                          step="any"
                          value={item.rate}
                          onChange={(e) => handleUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-full pl-7 pr-2.5 py-2 text-sm sm:text-base text-right border border-gray-300 rounded-lg focus:border-[#1A3263] outline-none"
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)
                        }
                        className="w-full px-2.5 py-2 text-sm sm:text-base text-right border border-gray-300 rounded-lg focus:border-[#1A3263] outline-none"
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-gray-900 text-sm sm:text-base font-mono">
                      {formatMoney(
                        lineAmount,
                        invoice.customization.currencySymbol,
                        invoice.customization.currencyPosition
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#1A3263] bg-[#1A3263]/5 hover:bg-[#1A3263]/10 border border-[#1A3263]/30 rounded-lg transition shadow-2xs"
          >
            <Plus className="w-4 h-4" /> Add Line Item
          </button>
        </div>
      </div>

      {/* 5. Totals & Notes Section */}
      <div className="py-6 border-b border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Notes & Payment details */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide">
                Notes & Terms
              </label>
              <span className="text-xs text-gray-400 font-medium">{invoice.notes.length}/1000</span>
            </div>
            <textarea
              rows={4}
              maxLength={1000}
              value={invoice.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Notes - any relevant information not covered, additional terms and conditions"
              className="w-full text-sm sm:text-base text-gray-700 border border-[#B8C0CC] rounded-lg p-3.5 focus:border-[#1A3263] outline-none leading-relaxed"
            />
          </div>

          {invoice.customization.showPaymentDetails && (
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide mb-1.5">
                Payment Instructions / Bank Wire Info
              </label>
              <textarea
                rows={3}
                value={invoice.paymentDetails}
                onChange={(e) => updateField('paymentDetails', e.target.value)}
                placeholder="Bank Name, Routing Number, Account Number, SWIFT/BIC, or PayPal link..."
                className="w-full text-sm sm:text-base text-gray-700 border border-[#B8C0CC] rounded-lg p-3.5 focus:border-[#1A3263] outline-none font-mono"
              />
            </div>
          )}
        </div>

        {/* Right column: Calculations and Totals with prominent typography */}
        <div className="lg:col-span-5 bg-[#F8FAFC] border border-gray-200 rounded-xl p-6 space-y-3.5">
          {/* Currency Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Currency
              </label>
              <div className="flex items-center gap-1">
                {['PKR', 'USD', 'EUR', 'AED', 'SAR'].map((code) => {
                  const isQuick = invoice.customization.currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        const found = CURRENCIES.find((c) => c.code === code);
                        if (found) {
                          onChange({
                            ...invoice,
                            customization: {
                              ...invoice.customization,
                              currency: found.code,
                              currencySymbol: found.symbol,
                              currencyPosition: found.position,
                            },
                          });
                        }
                      }}
                      className={`cursor-pointer px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                        isQuick
                          ? 'bg-[#1A3263] text-white shadow-2xs'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-[#1A3263]'
                      }`}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
            </div>
            <select
              value={invoice.customization.currency}
              onChange={(e) => {
                const selectedCode = e.target.value;
                const found = CURRENCIES.find((c) => c.code === selectedCode);
                if (found) {
                  onChange({
                    ...invoice,
                    customization: {
                      ...invoice.customization,
                      currency: found.code,
                      currencySymbol: found.symbol,
                      currencyPosition: found.position,
                    },
                  });
                }
              }}
              className="cursor-pointer text-xs sm:text-sm font-semibold bg-white border border-gray-300 text-gray-800 rounded-lg px-2.5 py-1.5 focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] outline-none max-w-[210px]"
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-gray-600 font-medium">Subtotal</span>
            <span className="font-bold text-gray-900">
              {formatMoney(
                totals.subtotal,
                invoice.customization.currencySymbol,
                invoice.customization.currencyPosition
              )}
            </span>
          </div>

          {/* Discount row */}
          <div className="flex items-center justify-between gap-2 text-sm sm:text-base pt-2 border-t border-gray-200/70">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Discount</span>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={invoice.customization.discountRate}
                  onChange={(e) => updateCustomization('discountRate', parseFloat(e.target.value) || 0)}
                  className="w-16 text-sm px-2 py-1 text-right outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateCustomization(
                      'discountType',
                      invoice.customization.discountType === 'percent' ? 'flat' : 'percent'
                    )
                  }
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 font-bold border-l border-gray-200"
                >
                  {invoice.customization.discountType === 'percent' ? '%' : invoice.customization.currencySymbol}
                </button>
              </div>
            </div>
            <span className="font-bold text-red-600">
              -{formatMoney(
                totals.discountAmount,
                invoice.customization.currencySymbol,
                invoice.customization.currencyPosition
              )}
            </span>
          </div>

          {/* Tax row */}
          <div className="flex items-center justify-between gap-2 text-sm sm:text-base pt-2 border-t border-gray-200/70">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={invoice.customization.taxLabel}
                onChange={(e) => updateCustomization('taxLabel', e.target.value)}
                className="w-24 text-sm font-semibold border-b border-dashed border-gray-400 outline-none text-gray-800 bg-transparent"
                placeholder="Tax"
              />
              <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={invoice.customization.taxRate}
                  onChange={(e) => updateCustomization('taxRate', parseFloat(e.target.value) || 0)}
                  className="w-16 text-sm px-2 py-1 text-right outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateCustomization(
                      'taxType',
                      invoice.customization.taxType === 'percent' ? 'flat' : 'percent'
                    )
                  }
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 font-bold border-l border-gray-200"
                >
                  {invoice.customization.taxType === 'percent' ? '%' : invoice.customization.currencySymbol}
                </button>
              </div>
            </div>
            <span className="font-bold text-gray-900">
              +{formatMoney(
                totals.taxAmount,
                invoice.customization.currencySymbol,
                invoice.customization.currencyPosition
              )}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center text-base sm:text-lg font-extrabold text-gray-900 pt-3 border-t-2 border-gray-300">
            <span>Total</span>
            <span className="text-lg sm:text-xl font-bold font-mono">
              {formatMoney(
                totals.total,
                invoice.customization.currencySymbol,
                invoice.customization.currencyPosition
              )}
            </span>
          </div>

          {/* Amount Paid if enabled */}
          {invoice.customization.showAmountPaid && (
            <div className="flex items-center justify-between gap-2 text-sm sm:text-base pt-2 border-t border-gray-200/70">
              <span className="text-gray-600 font-medium">Amount Paid</span>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                <span className="px-2 text-gray-400 text-sm">
                  {invoice.customization.currencySymbol}
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={invoice.amountPaid}
                  onChange={(e) => updateField('amountPaid', parseFloat(e.target.value) || 0)}
                  className="w-28 text-sm sm:text-base px-2 py-1 text-right outline-none font-bold text-emerald-600"
                />
              </div>
            </div>
          )}

          {/* Balance Due highlight banner in #1A3263 */}
          <div className="mt-4 p-4 rounded-xl bg-[#1A3263] text-white flex items-center justify-between shadow-md">
            <span className="font-bold text-sm uppercase tracking-wider text-gray-200">Balance Due</span>
            <span className="font-extrabold text-xl sm:text-2xl font-mono text-white">
              {formatMoney(
                totals.balanceDue,
                invoice.customization.currencySymbol,
                invoice.customization.currencyPosition
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 6. Signature & Attachments Section */}
      <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Signature Box */}
        {invoice.customization.showSignature && (
          <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[#1A3263]" /> Signature
              </span>
              {invoice.signatureUrl && (
                <button
                  type="button"
                  onClick={() => updateField('signatureUrl', '')}
                  className="text-xs sm:text-sm text-red-600 font-semibold hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            {invoice.signatureUrl ? (
              <div className="space-y-2">
                <div className="border border-gray-200 rounded-lg bg-white p-3 flex items-center justify-center">
                  <img src={invoice.signatureUrl} alt="Signature" className="h-16 object-contain" />
                </div>
                <div className="text-sm font-bold text-gray-900">{invoice.signerName}</div>
                <div className="text-xs text-gray-500 font-medium">{invoice.signerTitle}</div>
                <button
                  type="button"
                  onClick={onOpenSignatureModal}
                  className="text-xs sm:text-sm text-[#1A3263] font-semibold hover:underline block pt-1"
                >
                  Edit signature / signer details
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenSignatureModal}
                className="w-full py-6 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-600 hover:border-[#1A3263] hover:text-[#1A3263] hover:bg-white transition"
              >
                <PenTool className="w-5 h-5 mb-1.5" />
                <span className="text-sm font-bold">+ Add Authorized Signature</span>
                <span className="text-xs text-gray-400">Draw with cursor/finger or upload file</span>
              </button>
            )}
          </div>
        )}

        {/* Attachments / Photos Box */}
        {invoice.customization.showAttachments && (
          <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[#1A3263]" /> Photos & Receipts
              </span>
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="text-xs sm:text-sm text-[#1A3263] font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Photo
              </button>
            </div>

            {invoice.attachments.length === 0 ? (
              <div
                onClick={() => photoInputRef.current?.click()}
                className="py-6 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-600 hover:border-[#1A3263] hover:text-[#1A3263] cursor-pointer hover:bg-white transition"
              >
                <Upload className="w-5 h-5 mb-1.5 text-gray-400" />
                <span className="text-sm font-bold">Upload photos, receipts, or proof of work</span>
                <span className="text-xs text-gray-400">PNG, JPG, WebP (auto-compressed)</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {invoice.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-lg text-sm"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={att.dataUrl} alt={att.name} className="w-9 h-9 object-cover rounded-md" />
                      <span className="truncate max-w-[170px] text-gray-800 font-semibold text-xs sm:text-sm">
                        {att.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-gray-600 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={att.includeInPdf}
                          onChange={(e) => {
                            const updated = invoice.attachments.map((a) =>
                              a.id === att.id ? { ...a, includeInPdf: e.target.checked } : a
                            );
                            updateField('attachments', updated);
                          }}
                          className="rounded text-[#1A3263] focus:ring-[#1A3263] h-4 w-4"
                        />
                        <span>In PDF</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          updateField(
                            'attachments',
                            invoice.attachments.filter((a) => a.id !== att.id)
                          );
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <input
              ref={photoInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};
