import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, PHASE_1_LANGUAGES, LanguageConfig } from '../config/languages';
import { getLocalizedPath } from '../config/routes.config';

interface LanguageSwitcherProps {
  currentLang: string;
  currentRouteId: string;
  onSelectLanguage?: (lang: string) => void;
  variant?: 'header' | 'footer';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  currentRouteId,
  onSelectLanguage,
  variant = 'header',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLanguage = SUPPORTED_LANGUAGES[currentLang] || SUPPORTED_LANGUAGES['en'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langConfig: LanguageConfig, e: React.MouseEvent) => {
    if (onSelectLanguage) {
      e.preventDefault();
      onSelectLanguage(langConfig.code);
      setIsOpen(false);
    }
  };

  const isFooter = variant === 'footer';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Change language"
        className={`flex items-center gap-2 rounded transition cursor-pointer select-none text-xs font-semibold px-2.5 py-1.5 border ${
          isFooter
            ? 'bg-[#22252A] text-gray-200 border-gray-700 hover:border-gray-500 hover:text-white'
            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-2xs'
        }`}
      >
        <Globe className={`w-3.5 h-3.5 ${isFooter ? 'text-gray-400' : 'text-[#1A3263]'}`} />
        <span className="flex items-center gap-1.5">
          <span>{activeLanguage.flag}</span>
          <span>{activeLanguage.nativeName}</span>
        </span>
        <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            isFooter ? 'bottom-full mb-2 left-0' : 'top-full mt-1.5 right-0'
          } w-52 rounded bg-white shadow-xl border border-gray-200 py-1.5 z-50 focus:outline-hidden`}
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-600 border-b border-gray-100">
            Select Language
          </div>
          <div className="max-h-64 overflow-y-auto py-1">
            {PHASE_1_LANGUAGES.map((lang) => {
              const href = getLocalizedPath(currentRouteId, lang.code);
              const isSelected = lang.code === currentLang;

              return (
                <a
                  key={lang.code}
                  href={href}
                  onClick={(e) => handleSelect(lang, e)}
                  className={`flex items-center justify-between px-3 py-2 text-xs transition ${
                    isSelected
                      ? 'bg-blue-50 text-[#1A3263] font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-[10px] text-gray-600">({lang.name})</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#1A3263]" />}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
