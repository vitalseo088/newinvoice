import React, { useEffect } from 'react';
import { getSeoMetadata } from '../config/seo.config';

interface SeoHeadProps {
  pageId: string;
  lang: string;
  title: string;
  description: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ pageId, lang, title, description }) => {
  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // 2. Update primary meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update OpenGraph tags
    const setOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOgTag('og:title', title);
    setOgTag('og:description', description);
    setOgTag('og:type', 'website');

    // 4. Update html lang attribute
    document.documentElement.lang = lang;

    // 5. Update canonical link
    const seoData = getSeoMetadata(pageId, lang);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seoData.canonicalUrl);
    setOgTag('og:url', seoData.canonicalUrl);

    // 6. Update bidirectional hreflang links
    // Remove existing hreflang tags to avoid duplicates
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach((el) => el.remove());

    // Inject clean hreflang tags
    seoData.hreflangs.forEach(({ lang: tagLang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', tagLang);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    });

    // 7. Inject / update Schema.org structured data JSON-LD
    let scriptTag = document.querySelector('script[type="application/ld+json"]#seo-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('id', 'seo-jsonld');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(seoData.jsonLd);
  }, [pageId, lang, title, description]);

  return null;
};
