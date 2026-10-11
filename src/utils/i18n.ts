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

import nlCommon from '../locales/nl/common.json';
import nlPdf from '../locales/nl/pdf.json';
import nlSeo from '../locales/nl/seo.json';

import plCommon from '../locales/pl/common.json';
import plPdf from '../locales/pl/pdf.json';
import plSeo from '../locales/pl/seo.json';

import trCommon from '../locales/tr/common.json';
import trPdf from '../locales/tr/pdf.json';
import trSeo from '../locales/tr/seo.json';

import idCommon from '../locales/id/common.json';
import idPdf from '../locales/id/pdf.json';
import idSeo from '../locales/id/seo.json';

import viCommon from '../locales/vi/common.json';
import viPdf from '../locales/vi/pdf.json';
import viSeo from '../locales/vi/seo.json';

import ruCommon from '../locales/ru/common.json';
import ruPdf from '../locales/ru/pdf.json';
import ruSeo from '../locales/ru/seo.json';

import arCommon from '../locales/ar/common.json';
import arPdf from '../locales/ar/pdf.json';
import arSeo from '../locales/ar/seo.json';

import urCommon from '../locales/ur/common.json';
import urPdf from '../locales/ur/pdf.json';
import urSeo from '../locales/ur/seo.json';

import hiCommon from '../locales/hi/common.json';
import hiPdf from '../locales/hi/pdf.json';
import hiSeo from '../locales/hi/seo.json';

import jaCommon from '../locales/ja/common.json';
import jaPdf from '../locales/ja/pdf.json';
import jaSeo from '../locales/ja/seo.json';

import koCommon from '../locales/ko/common.json';
import koPdf from '../locales/ko/pdf.json';
import koSeo from '../locales/ko/seo.json';

import filCommon from '../locales/fil/common.json';
import filPdf from '../locales/fil/pdf.json';
import filSeo from '../locales/fil/seo.json';

import svCommon from '../locales/sv/common.json';
import svPdf from '../locales/sv/pdf.json';
import svSeo from '../locales/sv/seo.json';

import daCommon from '../locales/da/common.json';
import daPdf from '../locales/da/pdf.json';
import daSeo from '../locales/da/seo.json';

import noCommon from '../locales/no/common.json';
import noPdf from '../locales/no/pdf.json';
import noSeo from '../locales/no/seo.json';

import fiCommon from '../locales/fi/common.json';
import fiPdf from '../locales/fi/pdf.json';
import fiSeo from '../locales/fi/seo.json';

import csCommon from '../locales/cs/common.json';
import csPdf from '../locales/cs/pdf.json';
import csSeo from '../locales/cs/seo.json';

import roCommon from '../locales/ro/common.json';
import roPdf from '../locales/ro/pdf.json';
import roSeo from '../locales/ro/seo.json';

import huCommon from '../locales/hu/common.json';
import huPdf from '../locales/hu/pdf.json';
import huSeo from '../locales/hu/seo.json';

import elCommon from '../locales/el/common.json';
import elPdf from '../locales/el/pdf.json';
import elSeo from '../locales/el/seo.json';

export const resources = {
  en: { common: enCommon, pdf: enPdf, seo: enSeo },
  es: { common: esCommon, pdf: esPdf, seo: esSeo },
  fr: { common: frCommon, pdf: frPdf, seo: frSeo },
  de: { common: deCommon, pdf: dePdf, seo: deSeo },
  pt: { common: ptCommon, pdf: ptPdf, seo: ptSeo },
  it: { common: itCommon, pdf: itPdf, seo: itSeo },
  nl: { common: nlCommon, pdf: nlPdf, seo: nlSeo },
  pl: { common: plCommon, pdf: plPdf, seo: plSeo },
  tr: { common: trCommon, pdf: trPdf, seo: trSeo },
  id: { common: idCommon, pdf: idPdf, seo: idSeo },
  vi: { common: viCommon, pdf: viPdf, seo: viSeo },
  ru: { common: ruCommon, pdf: ruPdf, seo: ruSeo },
  ar: { common: arCommon, pdf: arPdf, seo: arSeo },
  ur: { common: urCommon, pdf: urPdf, seo: urSeo },
  hi: { common: hiCommon, pdf: hiPdf, seo: hiSeo },
  ja: { common: jaCommon, pdf: jaPdf, seo: jaSeo },
  ko: { common: koCommon, pdf: koPdf, seo: koSeo },
  fil: { common: filCommon, pdf: filPdf, seo: filSeo },
  sv: { common: svCommon, pdf: svPdf, seo: svSeo },
  da: { common: daCommon, pdf: daPdf, seo: daSeo },
  no: { common: noCommon, pdf: noPdf, seo: noSeo },
  fi: { common: fiCommon, pdf: fiPdf, seo: fiSeo },
  cs: { common: csCommon, pdf: csPdf, seo: csSeo },
  ro: { common: roCommon, pdf: roPdf, seo: roSeo },
  hu: { common: huCommon, pdf: huPdf, seo: huSeo },
  el: { common: elCommon, pdf: elPdf, seo: elSeo },
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
