import React, { useEffect } from 'react';
import {
  X,
  Palette,
  Check,
  SlidersHorizontal,
  Type,
  DollarSign,
  LayoutTemplate,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InvoiceCustomization } from '../types/invoice';
import { CURRENCIES } from '../utils/currency';
import { PRESET_ACCENT_COLORS, TEMPLATES } from '../utils/templates';
import { INVOICE_FONTS } from '../utils/fonts';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  customization: InvoiceCustomization;
  onChange: (customization: InvoiceCustomization) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  customization,
  onChange,
}) => {
  const { t } = useTranslation('common');

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

  const update = <K extends keyof InvoiceCustomization>(key: K, value: InvoiceCustomization[K]) => {
    onChange({
      ...customization,
      [key]: value,
    });
  };

  const handleCurrencySelect = (code: string) => {
    const found = CURRENCIES.find((c) => c.code === code);
    if (found) {
      onChange({
        ...customization,
        currency: found.code,
        currencySymbol: found.symbol,
        currencyPosition: found.position,
      });
    }
  };

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
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{t('customize.title', 'Invoice Customization')}</h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {t('customize.subtitle', 'Configure branding colors, typography, currency, taxes, and visible fields')}
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

        {/* Content body with scrolling */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-sm">
          {/* 1. Template Layout & Style */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-[#1A3263]" /> {t('customize.templateLayout', 'Template Layout Design')}
              </label>
              <span className="text-xs text-gray-500 font-medium">
                {t('customize.active', 'Active:')} <strong className="text-[#1A3263]">{TEMPLATES.find((t) => t.id === customization.template)?.name || customization.template}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {TEMPLATES.map((tpl) => {
                const isSelected = customization.template === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      onChange({
                        ...customization,
                        template: tpl.id,
                        accentColor: tpl.defaultAccent || customization.accentColor,
                        fontFamily: tpl.recommendedFont || customization.fontFamily,
                      });
                    }}
                    className={`cursor-pointer p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#1A3263] ring-2 ring-[#1A3263]/20 bg-[#1A3263]/5 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                          {tpl.category}
                        </span>
                        <div
                          className="w-2.5 h-2.5 rounded-full border border-white"
                          style={{ backgroundColor: tpl.defaultAccent }}
                        />
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                        {tpl.name}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span>{tpl.recommendedFont}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#1A3263] stroke-[3]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Color & Branding */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
            <div>
              <label className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-[#1A3263]" /> {t('customize.colorBranding', 'Accent Color')}
              </label>
              <div className="flex items-center flex-wrap gap-2.5 mb-3">
                {PRESET_ACCENT_COLORS.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => update('accentColor', col)}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-xs relative transition hover:scale-110"
                    style={{ backgroundColor: col }}
                    title={col}
                  >
                    {customization.accentColor.toLowerCase() === col.toLowerCase() && (
                      <Check className="w-4 h-4 text-white absolute inset-0 m-auto stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={customization.accentColor}
                  onChange={(e) => update('accentColor', e.target.value)}
                  className="w-10 h-10 p-0.5 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customization.accentColor}
                  onChange={(e) => update('accentColor', e.target.value)}
                  placeholder="#1A3263"
                  className="text-sm font-mono border border-gray-300 rounded-lg px-3 py-2 w-32 uppercase outline-none focus:border-[#1A3263]"
                />
                <span className="text-xs text-gray-400">{t('customize.customHex', 'Custom hex code')}</span>
              </div>
            </div>

            <div>
              <label className="text-sm sm:text-base font-bold text-gray-800 mb-2 block">
                {t('customize.logoWidth', 'Logo Width')} ({customization.logoWidth}px)
              </label>
              <input
                type="range"
                min={80}
                max={260}
                step={10}
                value={customization.logoWidth}
                onChange={(e) => update('logoWidth', Number(e.target.value))}
                className="w-full accent-[#1A3263]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1.5 font-medium">
                <span>{t('customize.compact', 'Compact')} (80px)</span>
                <span>{t('customize.medium', 'Medium')} (150px)</span>
                <span>{t('customize.large', 'Large')} (260px)</span>
              </div>
            </div>
          </section>

          {/* 3. Typography & Page Layout */}
          <section className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <label className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
                <Type className="w-4 h-4 text-[#1A3263]" /> {t('customize.typography', 'Typography & Document Sizing')}
              </label>
              <span className="text-xs text-gray-500 font-medium">
                {t('customize.activeFont', 'Active font:')} <strong className="text-[#1A3263]">{customization.fontFamily}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.fontFamily', 'Font Family')}</label>
                <select
                  value={customization.fontFamily}
                  onChange={(e) => update('fontFamily', e.target.value as any)}
                  className="w-full text-xs sm:text-sm font-medium border border-gray-300 rounded-lg px-2.5 py-2 bg-white outline-none focus:border-[#1A3263]"
                >
                  {INVOICE_FONTS.map((f) => (
                    <option key={f.id} value={f.id} style={{ fontFamily: f.fontFamily }}>
                      {f.name} — {f.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.fontSize', 'Font Size')}</label>
                <select
                  value={customization.fontSize}
                  onChange={(e) => update('fontSize', e.target.value as any)}
                  className="w-full text-xs sm:text-sm font-medium border border-gray-300 rounded-lg px-2.5 py-2 bg-white outline-none focus:border-[#1A3263]"
                >
                  <option value="small">{t('customize.fontSizeSmall', 'Small (Dense)')}</option>
                  <option value="medium">{t('customize.fontSizeMedium', 'Medium (Standard)')}</option>
                  <option value="large">{t('customize.fontSizeLarge', 'Large (Relaxed)')}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.pageSize', 'PDF Page Size')}</label>
                <select
                  value={customization.pageSize}
                  onChange={(e) => update('pageSize', e.target.value as any)}
                  className="w-full text-xs sm:text-sm font-medium border border-gray-300 rounded-lg px-2.5 py-2 bg-white outline-none focus:border-[#1A3263]"
                >
                  <option value="a4">{t('customize.pageSizeA4', 'A4 (Standard Worldwide)')}</option>
                  <option value="letter">{t('customize.pageSizeLetter', 'US Letter (North America)')}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.pageMargins', 'Page Margins')}</label>
                <select
                  value={customization.pageMargins}
                  onChange={(e) => update('pageMargins', e.target.value as any)}
                  className="w-full text-xs sm:text-sm font-medium border border-gray-300 rounded-lg px-2.5 py-2 bg-white outline-none focus:border-[#1A3263]"
                >
                  <option value="compact">{t('customize.marginCompact', 'Compact (28pt)')}</option>
                  <option value="normal">{t('customize.marginNormal', 'Normal (40pt)')}</option>
                  <option value="wide">{t('customize.marginWide', 'Wide (54pt)')}</option>
                </select>
              </div>
            </div>

            {/* Quick Font Selector Chips */}
            <div>
              <span className="text-xs text-gray-500 font-medium block mb-2">
                {t('customize.quickFontSwitcher', 'Quick Font Switcher:')}
              </span>
              <div className="flex flex-wrap gap-2">
                {INVOICE_FONTS.map((f) => {
                  const isActive = customization.fontFamily === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => update('fontFamily', f.id)}
                      style={{ fontFamily: f.fontFamily }}
                      className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                        isActive
                          ? 'bg-[#1A3263] text-white border-[#1A3263] shadow-xs scale-[1.02]'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                      }`}
                      title={f.description}
                    >
                      <span>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 4. Currency & Formatting */}
          <section className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <label className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#1A3263]" /> {t('customize.currencyFormatting', 'Currency & Formatting')}
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500 font-medium">{t('customize.quickPick', 'Quick pick:')}</span>
                {['USD', 'PKR', 'EUR', 'GBP', 'AED', 'SAR', 'CAD', 'INR'].map((code) => {
                  const isCurActive = customization.currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleCurrencySelect(code)}
                      className={`cursor-pointer px-2 py-0.5 rounded text-xs font-bold transition ${
                        isCurActive
                          ? 'bg-[#1A3263] text-white shadow-2xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.currency', 'Currency')}</label>
                <select
                  value={customization.currency}
                  onChange={(e) => handleCurrencySelect(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium border border-gray-300 rounded-lg px-2.5 py-2 bg-white outline-none focus:border-[#1A3263]"
                >
                  {CURRENCIES.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.currencySymbol', 'Currency Symbol')}</label>
                <input
                  type="text"
                  value={customization.currencySymbol}
                  onChange={(e) => update('currencySymbol', e.target.value)}
                  className="w-full text-xs sm:text-sm font-mono border border-gray-300 rounded-lg px-2.5 py-2 outline-none focus:border-[#1A3263]"
                  placeholder="Rs / PKR / $"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.dateFormat', 'Date Format')}</label>
                <select
                  value={customization.dateFormat}
                  onChange={(e) => update('dateFormat', e.target.value as any)}
                  className="w-full text-xs sm:text-sm font-medium border border-gray-300 rounded-lg px-2.5 py-2 bg-white outline-none focus:border-[#1A3263]"
                >
                  <option value="YYYY-MM-DD">YYYY-MM-DD (2026-10-08)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (10/08/2026)</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY (08/10/2026)</option>
                  <option value="DD MMM YYYY">DD MMM YYYY (08 Oct 2026)</option>
                </select>
              </div>
            </div>
          </section>

          {/* 5. Taxes & Discounts Defaults */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.taxLabel', 'Tax Label')}</label>
              <input
                type="text"
                value={customization.taxLabel}
                onChange={(e) => update('taxLabel', e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-2 outline-none focus:border-[#FF8F70]"
                placeholder="Tax / VAT / GST"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.defaultTaxRate', 'Default Tax Rate (%)')}</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={customization.taxRate}
                onChange={(e) => update('taxRate', Number(e.target.value))}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-2 outline-none focus:border-[#FF8F70]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.defaultDiscount', 'Default Discount')}</label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={customization.discountRate}
                onChange={(e) => update('discountRate', Number(e.target.value))}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-2 outline-none focus:border-[#FF8F70]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">{t('customize.discountType', 'Discount Type')}</label>
              <select
                value={customization.discountType}
                onChange={(e) => update('discountType', e.target.value as any)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-2 bg-white outline-none focus:border-[#FF8F70]"
              >
                <option value="percent">{t('customize.discountPercent', 'Percentage (%)')}</option>
                <option value="flat">{t('customize.discountFlat', 'Flat Amount')}</option>
              </select>
            </div>
          </section>

          {/* 6. Section Visibility Toggles */}
          <section className="pt-4 border-t border-gray-200">
            <label className="text-sm font-semibold text-gray-800 mb-3 block">
              {t('customize.optionalSections', 'Optional Sections Visibility')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { key: 'showAmountPaid', label: t('customize.showAmountPaid', 'Amount Paid & Balance Due') },
                { key: 'showPaymentDetails', label: t('customize.showPaymentDetails', 'Payment & Bank Instructions') },
                { key: 'showSignature', label: t('customize.showSignature', 'Signature Section') },
                { key: 'showNotes', label: t('customize.showNotes', 'Notes and Terms') },
                { key: 'showAttachments', label: t('customize.showAttachments', 'Attachments & Receipts') },
                { key: 'showCustomFields', label: t('customize.showCustomFields', 'Custom Project Fields') },
              ].map(({ key, label }) => {
                const isChecked = Boolean((customization as any)[key]);
                return (
                  <label
                    key={key}
                    className="flex items-center gap-2.5 p-2 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs font-medium text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => update(key as any, e.target.checked)}
                      className="rounded text-[#FF8F70] focus:ring-[#FF8F70] h-4 w-4"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 bg-[#F8FAFC]">
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            {t('customize.instantApply', 'Changes apply instantly to editor, preview, and PDF')}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-6 py-2.5 text-sm font-bold text-white bg-[#1A3263] hover:bg-[#132549] rounded-lg shadow-sm transition"
          >
            {t('customize.done', 'Done Customizing')}
          </button>
        </div>
      </div>
    </div>
  );
};
