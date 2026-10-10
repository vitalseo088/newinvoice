import React, { useState, useMemo } from 'react';
import {
  LayoutTemplate,
  Check,
  Eye,
  Sliders,
  Sparkles,
  Search,
  Briefcase,
  Layers,
  ArrowRight,
  Palette,
  Type,
  FileCheck2,
  DollarSign,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TemplateId, InvoiceData, InvoiceFontFamily } from '../types/invoice';
import { TEMPLATES, TemplateMeta } from '../utils/templates';
import { PROFESSION_EXAMPLES, ProfessionTemplateExample } from '../data/professionExamples';
import { getFontCssFamily } from '../utils/fonts';

interface TemplatesLibraryProps {
  currentTemplateId: TemplateId;
  onApplyLayout: (templateId: TemplateId, font?: InvoiceFontFamily, accent?: string) => void;
  onLoadFullProfession: (example: ProfessionTemplateExample) => void;
  onPreviewTemplate: (templateId: TemplateId, exampleData?: ProfessionTemplateExample) => void;
  onOpenSettingsWithTemplate: (templateId: TemplateId) => void;
}

type FilterCategory = 'all' | 'layouts' | 'professions';

export const TemplatesLibrary: React.FC<TemplatesLibraryProps> = ({
  currentTemplateId,
  onApplyLayout,
  onLoadFullProfession,
  onPreviewTemplate,
  onOpenSettingsWithTemplate,
}) => {
  const { t } = useTranslation('common');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfessionModal, setSelectedProfessionModal] = useState<ProfessionTemplateExample | null>(null);

  // Filtered layouts
  const filteredLayouts = useMemo(() => {
    return TEMPLATES.filter((tpl) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        tpl.name.toLowerCase().includes(q) ||
        tpl.category.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q) ||
        tpl.bestForProfessions.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // Filtered professions
  const filteredProfessions = useMemo(() => {
    return PROFESSION_EXAMPLES.filter((prof) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        prof.profession.toLowerCase().includes(q) ||
        prof.tagline.toLowerCase().includes(q) ||
        prof.template.toLowerCase().includes(q) ||
        prof.suggestedCurrency.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <section id="invoice-templates" className="no-print mt-10 mb-8 scroll-mt-20">
      {/* Container Card */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-5 sm:p-8 md:p-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A3263]/10 text-[#1A3263] text-xs font-bold uppercase tracking-wider mb-2">
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>{t('templates.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {t('templates.title')}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
              {t('templates.subtitle')}
            </p>
          </div>

          {/* Quick Active Template pill */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs sm:text-sm text-gray-700 shrink-0">
            <span className="text-gray-500 font-medium">{t('templates.activeLayout')}</span>
            <span className="font-bold text-[#1A3263]">
              {TEMPLATES.find((t) => t.id === currentTemplateId)?.name || 'Classic Professional'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* Filter Navigation & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 pb-6">
          {/* Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`cursor-pointer px-3 sm:px-4 py-2 rounded-lg transition-all ${
                filterCategory === 'all'
                  ? 'bg-white text-[#1A3263] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('templates.allTemplates')} ({TEMPLATES.length + PROFESSION_EXAMPLES.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('layouts')}
              className={`cursor-pointer px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                filterCategory === 'layouts'
                  ? 'bg-white text-[#1A3263] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t('templates.layoutStyles')} ({TEMPLATES.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('professions')}
              className={`cursor-pointer px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                filterCategory === 'professions'
                  ? 'bg-white text-[#1A3263] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t('templates.byProfession')} ({PROFESSION_EXAMPLES.length})</span>
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('templates.searchPlaceholder')}
              className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2 border border-gray-300 rounded-xl bg-white outline-none focus:border-[#1A3263] focus:ring-2 focus:ring-[#1A3263]/10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-700"
              >
                {t('templates.clear')}
              </button>
            )}
          </div>
        </div>

        {/* Section 1: Distinct Layout Archetypes */}
        {(filterCategory === 'all' || filterCategory === 'layouts') && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#1A3263]" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {t('templates.layoutDesignsTitle')}
                </h3>
              </div>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">
                {t('templates.layoutDesignsSubtitle')}
              </span>
            </div>

            {filteredLayouts.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">{t('templates.noLayoutsMatch')} "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLayouts.map((tpl) => {
                  const isActive = currentTemplateId === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      className={`flex flex-col rounded-xl border transition-all duration-200 overflow-hidden bg-white ${
                        isActive
                          ? 'border-[#1A3263] ring-2 ring-[#1A3263]/20 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {/* Visual Mini Document Thumbnail */}
                      <div className="h-44 bg-[#F8FAFC] border-b border-gray-100 p-4 relative overflow-hidden flex flex-col justify-between select-none">
                        {/* Mini Simulated Layout Rendering based on archetype */}
                        <div className="w-full bg-white rounded-lg shadow-2xs border border-gray-200/80 p-2.5 h-full flex flex-col justify-between">
                          {/* Layout Header Simulation */}
                          {tpl.id === 'bold-header' ? (
                            <div
                              className="w-full p-2 rounded text-white text-[10px] font-bold flex justify-between items-center mb-1.5"
                              style={{ backgroundColor: tpl.defaultAccent }}
                            >
                              <span>INVOICE</span>
                              <span className="font-mono opacity-80">#INV-001</span>
                            </div>
                          ) : tpl.id === 'corporate-blue' ? (
                            <div className="border-b-2 border-blue-600 pb-1 flex justify-between items-center mb-1.5">
                              <span className="text-[10px] font-extrabold text-blue-900 tracking-wider">
                                CORPORATE
                              </span>
                              <span className="text-[8px] bg-blue-100 text-blue-800 font-bold px-1 rounded">
                                ORIGINAL
                              </span>
                            </div>
                          ) : tpl.id === 'elegant-business' ? (
                            <div className="border-b-2 border-double border-purple-400 pb-1 text-center mb-1.5">
                              <span
                                className="text-[10px] font-serif font-bold text-purple-900 tracking-wider uppercase block"
                                style={{ fontFamily: 'Playfair Display, serif' }}
                              >
                                Fee Statement
                              </span>
                            </div>
                          ) : tpl.id === 'creative-studio' ? (
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[10px] font-bold text-gray-900">STUDIO</span>
                              <span
                                className="text-[8px] text-white font-bold px-1.5 py-0.5 rounded-full"
                                style={{ backgroundColor: tpl.defaultAccent }}
                              >
                                #INV-42
                              </span>
                            </div>
                          ) : tpl.id === 'modern-minimal' ? (
                            <div className="flex justify-between items-baseline mb-1.5 border-b border-gray-100 pb-1">
                              <span className="text-[10px] font-light text-gray-800 tracking-widest uppercase">
                                INVOICE
                              </span>
                              <span className="text-[8px] text-gray-400 font-mono">0012</span>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-gray-100">
                              <span className="text-[10px] font-bold text-gray-800">INVOICE</span>
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: tpl.defaultAccent }}
                              />
                            </div>
                          )}

                          {/* Mini Details Grid */}
                          <div className="grid grid-cols-2 gap-2 text-[8px] text-gray-400 py-1">
                            <div>
                              <div className="h-1.5 w-12 bg-gray-200 rounded-sm mb-1" />
                              <div className="h-1 w-16 bg-gray-100 rounded-sm" />
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <div className="h-1.5 w-10 bg-gray-200 rounded-sm mb-1" />
                              <div className="h-1 w-14 bg-gray-100 rounded-sm" />
                            </div>
                          </div>

                          {/* Mini Line Item Bars */}
                          <div className="space-y-1 my-1">
                            <div className="flex justify-between text-[7px] text-gray-400 border-b border-gray-100 pb-0.5">
                              <span>Service Deliverable</span>
                              <span className="font-mono">$800</span>
                            </div>
                            <div className="flex justify-between text-[7px] text-gray-400">
                              <span>Hourly Scope</span>
                              <span className="font-mono">$240</span>
                            </div>
                          </div>

                          {/* Mini Total Bar */}
                          <div
                            className="pt-1 mt-auto border-t border-gray-100 flex justify-between items-center text-[8px] font-bold"
                            style={{ color: tpl.defaultAccent }}
                          >
                            <span>Total Due</span>
                            <span className="font-mono font-extrabold">$1,040.00</span>
                          </div>
                        </div>

                        {/* Active Badge floating top right */}
                        {isActive && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#1A3263] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" /> {t('templates.active')}
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 text-base">{tpl.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                              {tpl.category}
                            </span>
                          </div>

                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                            {tpl.description}
                          </p>

                          {/* Meta Specs */}
                          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Type className="w-3.5 h-3.5 text-gray-400" />
                              <span className="font-medium text-gray-700">{tpl.recommendedFont}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-3 h-3 rounded-full border border-gray-200"
                                style={{ backgroundColor: tpl.defaultAccent }}
                              />
                              <span className="font-mono text-gray-600 text-[11px]">
                                {tpl.defaultAccent}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onApplyLayout(tpl.id, tpl.recommendedFont, tpl.defaultAccent)}
                            className={`cursor-pointer flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                              isActive
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-[#1A3263] hover:bg-[#122448] text-white shadow-2xs'
                            }`}
                          >
                            {isActive ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>{t('templates.applied')}</span>
                              </>
                            ) : (
                              <>
                                <span>{t('templates.useLayout')}</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => onPreviewTemplate(tpl.id)}
                            className="cursor-pointer p-2 rounded-lg text-gray-700 hover:text-[#1A3263] hover:bg-gray-100 border border-gray-200 transition"
                            title="Live Preview this layout"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onOpenSettingsWithTemplate(tpl.id)}
                            className="cursor-pointer p-2 rounded-lg text-gray-700 hover:text-[#1A3263] hover:bg-gray-100 border border-gray-200 transition"
                            title="Customize colors & settings"
                          >
                            <Sliders className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Section 2: Templates by Profession */}
        {(filterCategory === 'all' || filterCategory === 'professions') && (
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#1A3263]" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {t('templates.professionsTitle')}
                </h3>
              </div>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">
                {t('templates.professionsSubtitle')}
              </span>
            </div>

            {filteredProfessions.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">{t('templates.noProfessionsMatch')} "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfessions.map((prof) => {
                  const matchingLayout = TEMPLATES.find((t) => t.id === prof.template);
                  const isCurrentLayout = currentTemplateId === prof.template;

                  return (
                    <div
                      key={prof.id}
                      className="flex flex-col rounded-xl border border-gray-200 hover:border-gray-300 bg-white shadow-2xs hover:shadow-sm transition-all overflow-hidden"
                    >
                      {/* Top Header Card */}
                      <div className="p-4 bg-slate-50/80 border-b border-gray-100 flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md border ${prof.badgeColor}`}
                            >
                              {prof.profession}
                            </span>
                            <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                              {prof.suggestedCurrency} ({prof.suggestedCurrencySymbol.trim()})
                            </span>
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base mt-1">
                            {prof.data.title || 'INVOICE'} • {prof.data.fromName?.split(' ')[0]}
                          </h4>
                        </div>

                        <div
                          className="w-4 h-4 rounded-full shrink-0 border border-white shadow-2xs"
                          style={{ backgroundColor: prof.accentColor }}
                          title={`Accent: ${prof.accentColor}`}
                        />
                      </div>

                      {/* Content details */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                            {prof.tagline}
                          </p>

                          {/* Sample Items preview box */}
                          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200/80 mb-3 space-y-1">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                              {t('templates.sampleLineItems')}
                            </span>
                            {prof.data.items?.slice(0, 2).map((item, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center text-xs text-gray-700"
                              >
                                <span className="truncate pr-2">{item.description}</span>
                                <span className="font-mono text-gray-900 font-semibold shrink-0">
                                  {prof.suggestedCurrencySymbol}
                                  {item.rate.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Linked layout & typography info */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                              <LayoutTemplate className="w-3.5 h-3.5 text-gray-400" />
                              <span>{t('templates.layoutLabel')} <strong>{matchingLayout?.name || prof.template}</strong></span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Type className="w-3.5 h-3.5 text-gray-400" />
                              <span>{prof.fontFamily}</span>
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedProfessionModal(prof)}
                            className="cursor-pointer flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-[#1A3263] hover:bg-[#122448] text-white transition flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <span>{t('templates.useTemplate')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onPreviewTemplate(prof.template, prof)}
                            className="cursor-pointer p-2 rounded-lg text-gray-700 hover:text-[#1A3263] hover:bg-gray-100 border border-gray-200 transition"
                            title="Preview with sample profession data"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onOpenSettingsWithTemplate(prof.template)}
                            className="cursor-pointer p-2 rounded-lg text-gray-700 hover:text-[#1A3263] hover:bg-gray-100 border border-gray-200 transition"
                            title="Open Settings for this template"
                          >
                            <Sliders className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Choice Modal when clicking "Use Template" on a profession template */}
      {selectedProfessionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs cursor-pointer animate-in fade-in duration-150"
          onClick={() => setSelectedProfessionModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white text-gray-800 shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 cursor-auto border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1A3263]/10 text-[#1A3263] flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {selectedProfessionModal.profession}
                </h3>
                <p className="text-xs text-gray-500">
                  {t('templates.modalTitle')}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
              {t('templates.modalDesc')}
            </p>

            <div className="space-y-3">
              {/* Option 1: Load Full Template Data */}
              <button
                type="button"
                onClick={() => {
                  onLoadFullProfession(selectedProfessionModal);
                  setSelectedProfessionModal(null);
                }}
                className="cursor-pointer w-full p-3.5 rounded-xl border-2 border-[#1A3263] bg-[#1A3263]/5 hover:bg-[#1A3263]/10 text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-extrabold text-[#1A3263]">
                    {t('templates.loadFullTemplate')}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {t('templates.loadFullTemplateDesc')} {selectedProfessionModal.suggestedCurrency}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#1A3263] shrink-0 ml-2" />
              </button>

              {/* Option 2: Apply Layout & Styling Only */}
              <button
                type="button"
                onClick={() => {
                  onApplyLayout(
                    selectedProfessionModal.template,
                    selectedProfessionModal.fontFamily,
                    selectedProfessionModal.accentColor
                  );
                  setSelectedProfessionModal(null);
                }}
                className="cursor-pointer w-full p-3.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    {t('templates.applyLayoutOnly')}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {t('templates.applyLayoutOnlyDesc')}
                  </div>
                </div>
                <Layers className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
              </button>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProfessionModal(null)}
                className="cursor-pointer px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                {t('templates.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
