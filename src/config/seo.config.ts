import { ROUTES_CONFIG, getLocalizedPath } from './routes.config';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './languages';

export const DOMAIN = 'invoiceo.online';
export const BASE_URL = `https://${DOMAIN}`;

export interface HreflangTag {
  lang: string;
  href: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  hreflangs: HreflangTag[];
  jsonLd: Record<string, any>[];
}

/**
 * Returns complete SEO metadata, canonical URLs, bidirectional hreflang tags,
 * and Schema.org structured data (WebApplication & SoftwareApplication) for any page & language.
 */
export function getSeoMetadata(pageId: string, currentLang: string = DEFAULT_LANGUAGE): SeoMetadata {
  const currentPath = getLocalizedPath(pageId, currentLang);
  const canonicalUrl = `${BASE_URL}${currentPath}`;

  // Bidirectional hreflang links: one per supported language + x-default pointing to English
  const hreflangs: HreflangTag[] = Object.keys(SUPPORTED_LANGUAGES).map((langCode) => ({
    lang: langCode,
    href: `${BASE_URL}${getLocalizedPath(pageId, langCode)}`,
  }));

  // x-default hreflang pointing to the root English URL
  hreflangs.push({
    lang: 'x-default',
    href: `${BASE_URL}${getLocalizedPath(pageId, 'en')}`,
  });

  return {
    title: '', // filled dynamically
    description: '',
    canonicalUrl,
    ogTitle: '',
    ogDescription: '',
    ogUrl: canonicalUrl,
    hreflangs,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Invoiceo',
        url: canonicalUrl,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
      },
    ],
  };
}
