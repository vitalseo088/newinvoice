import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../config/languages';

import enCommon from '../locales/en/common.json';
import enPdf from '../locales/en/pdf.json';
import enSeo from '../locales/en/seo.json';

import esCommon from '../locales/es/common.json';
import esPdf from '../locales/es/pdf.json';
import esSeo from '../locales/es/seo.json';

import frCommon from '../locales/fr/common.json';
import frPdf from '../locales/fr/pdf.json';
import frSeo from '../locales/fr/seo.json';

import deCommon from '../locales/de/common.json';
import dePdf from '../locales/de/pdf.json';
import deSeo from '../locales/de/seo.json';

import ptCommon from '../locales/pt/common.json';
import ptPdf from '../locales/pt/pdf.json';
import ptSeo from '../locales/pt/seo.json';

import itCommon from '../locales/it/common.json';
import itPdf from '../locales/it/pdf.json';
import itSeo from '../locales/it/seo.json';

export const resources = {
  en: {
    common: enCommon,
    pdf: enPdf,
    seo: enSeo,
  },
  es: {
    common: esCommon,
    pdf: esPdf,
    seo: esSeo,
  },
  fr: {
    common: frCommon,
    pdf: frPdf,
    seo: frSeo,
  },
  de: {
    common: deCommon,
    pdf: dePdf,
    seo: deSeo,
  },
  pt: {
    common: ptCommon,
    pdf: ptPdf,
    seo: ptSeo,
  },
  it: {
    common: itCommon,
    pdf: itPdf,
    seo: itSeo,
  },
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
