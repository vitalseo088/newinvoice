export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  defaultLocale: string;
  flag: string;
  phase: number;
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    defaultLocale: 'en-US',
    flag: '🇺🇸',
    phase: 1,
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    defaultLocale: 'es-ES',
    flag: '🇪🇸',
    phase: 1,
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    defaultLocale: 'fr-FR',
    flag: '🇫🇷',
    phase: 1,
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
    defaultLocale: 'de-DE',
    flag: '🇩🇪',
    phase: 1,
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    direction: 'ltr',
    defaultLocale: 'pt-BR',
    flag: '🇧🇷',
    phase: 1,
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    direction: 'ltr',
    defaultLocale: 'it-IT',
    flag: '🇮🇹',
    phase: 1,
  },
};

export const DEFAULT_LANGUAGE = 'en';

export const PHASE_1_LANGUAGES = Object.values(SUPPORTED_LANGUAGES).filter(
  (l) => l.phase === 1
);
