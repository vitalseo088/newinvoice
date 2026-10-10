import React from 'react';
import i18n from '../utils/i18n';
import { TOOLS_CONFIG } from '../data/toolsConfig';
import { LanguageSwitcher } from './LanguageSwitcher';

export type InfoPageSlug = 'about' | 'contact' | 'privacy' | 'terms' | 'bugs';

interface FooterProps {
  onOpenImportExport?: () => void;
  onNewInvoice?: () => void;
  onOpenMyInvoices?: () => void;
  onOpenCustomize?: () => void;
  currentToolSlug?: string;
  onSelectTool: (slug: string) => void;
  onNavigatePage: (page: InfoPageSlug) => void;
  currentInfoPage?: string | null;
  currentLang?: string;
  currentRouteId?: string;
  onSelectLanguage?: (lang: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentToolSlug = 'invoice-generator',
  onSelectTool,
  onNavigatePage,
  currentInfoPage,
  currentLang = 'en',
  currentRouteId = 'invoice-generator',
  onSelectLanguage,
}) => {
  const tr = (key: string) => i18n.t(key, { lng: currentLang, defaultValue: key });
  return (
    <footer className="bg-[#2D3139] text-gray-300 mt-6 sm:mt-8 border-t border-gray-700/60 no-print">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Tools Part 1 (6 tools) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {tr('common:footer.toolsColumn1')}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {TOOLS_CONFIG.slice(0, 6).map((tool) => {
                const isActive = !currentInfoPage && currentToolSlug === tool.slug;
                return (
                  <li key={tool.id}>
                    <button
                      type="button"
                      onClick={() => onSelectTool(tool.slug)}
                      className={`hover:text-white transition cursor-pointer text-left flex items-center justify-between w-full group ${
                        isActive ? 'text-white font-bold' : 'text-gray-300'
                      }`}
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {i18n.t(`seo:tools.${tool.id}.shortName`, { lng: currentLang, defaultValue: tool.name })}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1.5" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 2: Tools Part 2 (6 tools) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {tr('common:footer.toolsColumn2')}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {TOOLS_CONFIG.slice(6, 12).map((tool) => {
                const isActive = !currentInfoPage && currentToolSlug === tool.slug;
                return (
                  <li key={tool.id}>
                    <button
                      type="button"
                      onClick={() => onSelectTool(tool.slug)}
                      className={`hover:text-white transition cursor-pointer text-left flex items-center justify-between w-full group ${
                        isActive ? 'text-white font-bold' : 'text-gray-300'
                      }`}
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {i18n.t(`seo:tools.${tool.id}.shortName`, { lng: currentLang, defaultValue: tool.name })}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1.5" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {tr('common:footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('about')}
                  className={`hover:text-white transition cursor-pointer text-left flex items-center justify-between w-full group ${
                    currentInfoPage === 'about' ? 'text-white font-bold' : 'text-gray-300'
                  }`}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                    {tr('common:footer.about')}
                  </span>
                  {currentInfoPage === 'about' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1.5" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className={`hover:text-white transition cursor-pointer text-left flex items-center justify-between w-full group ${
                    currentInfoPage === 'contact' ? 'text-white font-bold' : 'text-gray-300'
                  }`}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                    {tr('common:footer.contact')}
                  </span>
                  {currentInfoPage === 'contact' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1.5" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('privacy')}
                  className={`hover:text-white transition cursor-pointer text-left flex items-center justify-between w-full group ${
                    currentInfoPage === 'privacy' ? 'text-white font-bold' : 'text-gray-300'
                  }`}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                    {tr('common:footer.privacy')}
                  </span>
                  {currentInfoPage === 'privacy' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1.5" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('terms')}
                  className={`hover:text-white transition cursor-pointer text-left flex items-center justify-between w-full group ${
                    currentInfoPage === 'terms' ? 'text-white font-bold' : 'text-gray-300'
                  }`}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                    {tr('common:footer.terms')}
                  </span>
                  {currentInfoPage === 'terms' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1.5" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('bugs')}
                  className={`hover:text-amber-300 transition cursor-pointer text-left flex items-center justify-between w-full group ${
                    currentInfoPage === 'bugs' ? 'text-amber-300 font-bold' : 'text-gray-300'
                  }`}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                    {tr('common:footer.bugs')}
                  </span>
                  {currentInfoPage === 'bugs' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 ml-1.5" />
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Website */}
          <div>
            <div className="mb-3">
              <span className="font-extrabold text-white text-lg tracking-tight">
                Invoiceo<span className="text-blue-300">.online</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
              {tr('common:footer.browserOnlyNote')}
            </p>
            <div>
              <LanguageSwitcher
                currentLang={currentLang}
                currentRouteId={currentRouteId}
                onSelectLanguage={onSelectLanguage}
                variant="footer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Separate Copyright bottom bar */}
      <div className="border-t border-gray-700/80 bg-[#22252B] py-5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-400">
          <div>
            © {new Date().getFullYear()} Invoiceo.online. {tr('common:footer.allRightsReserved')}
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => onNavigatePage('about')}
              className={`hover:text-gray-200 transition underline underline-offset-4 cursor-pointer ${
                currentInfoPage === 'about' ? 'text-white font-bold' : ''
              }`}
            >
              {tr('common:footer.about')}
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className={`hover:text-gray-200 transition underline underline-offset-4 cursor-pointer ${
                currentInfoPage === 'contact' ? 'text-white font-bold' : ''
              }`}
            >
              {tr('common:footer.contact')}
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage('bugs')}
              className={`hover:text-amber-300 transition underline underline-offset-4 cursor-pointer ${
                currentInfoPage === 'bugs' ? 'text-amber-300 font-bold' : ''
              }`}
            >
              {tr('common:footer.bugs')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
