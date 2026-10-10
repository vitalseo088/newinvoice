export interface RouteMapping {
  id: string; // Internal canonical ID (e.g. 'invoice-generator', 'receipt-generator', 'about')
  type: 'tool' | 'info';
  slugs: Record<string, string>; // language code -> localized slug
}

export const ROUTES_CONFIG: RouteMapping[] = [
  // 12 Tools
  {
    id: 'invoice-generator',
    type: 'tool',
    slugs: {
      en: '', // root for English
      es: 'generador-facturas-gratis',
      fr: 'facture-gratuite-en-ligne',
      de: 'rechnung-schreiben-kostenlos',
      pt: 'gerador-de-nota-fiscal-gratis',
      it: 'creare-fattura-gratis',
    },
  },
  {
    id: 'receipt-generator',
    type: 'tool',
    slugs: {
      en: 'receipt-generator',
      es: 'crear-recibo-de-pago',
      fr: 'recu-de-paiement-gratuit',
      de: 'quittung-online-erstellen',
      pt: 'recibo-de-pagamento-simples',
      it: 'ricevuta-di-pagamento-facile',
    },
  },
  {
    id: 'quote-generator',
    type: 'tool',
    slugs: {
      en: 'quote-generator',
      es: 'hacer-presupuesto-online',
      fr: 'devis-gratuit-en-ligne',
      de: 'angebot-erstellen-vorlage',
      pt: 'gerador-de-orcamento-rapido',
      it: 'preventivo-gratuito-online',
    },
  },
  {
    id: 'estimate-generator',
    type: 'tool',
    slugs: {
      en: 'estimate-generator',
      es: 'estimacion-de-costos',
      fr: 'estimation-travaux-devis',
      de: 'kostenvoranschlag-muster',
      pt: 'estimativa-de-custos-obra',
      it: 'computo-metrico-stima',
    },
  },
  {
    id: 'credit-note-generator',
    type: 'tool',
    slugs: {
      en: 'credit-note-generator',
      es: 'nota-de-credito-facil',
      fr: 'facture-avoir-gratuit',
      de: 'gutschrift-muster-vorlage',
      pt: 'nota-de-credito-comercial',
      it: 'nota-di-credito-semplice',
    },
  },
  {
    id: 'purchase-order-generator',
    type: 'tool',
    slugs: {
      en: 'purchase-order-generator',
      es: 'orden-de-compra-formato',
      fr: 'bon-de-commande-modele',
      de: 'bestellschein-vorlage',
      pt: 'ordem-de-compra-padrao',
      it: 'ordine-di-acquisto-modulo',
    },
  },
  {
    id: 'sales-order-generator',
    type: 'tool',
    slugs: {
      en: 'sales-order-generator',
      es: 'nota-de-pedido-ventas',
      fr: 'bon-de-livraison-commande',
      de: 'auftragsbestaetigung-muster',
      pt: 'pedido-de-venda-rapido',
      it: 'conferma-ordine-vendita',
    },
  },
  {
    id: 'proforma-invoice-generator',
    type: 'tool',
    slugs: {
      en: 'proforma-invoice-generator',
      es: 'factura-proforma-online',
      fr: 'facture-proforma-modele',
      de: 'proforma-rechnung-vorlage',
      pt: 'fatura-proforma-exportacao',
      it: 'fattura-proforma-facile',
    },
  },
  {
    id: 'timesheet-generator',
    type: 'tool',
    slugs: {
      en: 'timesheet-generator',
      es: 'hoja-de-horas-trabajadas',
      fr: 'feuille-de-temps-travail',
      de: 'stundenzettel-ausfuellen',
      pt: 'folha-de-ponto-individual',
      it: 'foglio-ore-lavoro-mensile',
    },
  },
  {
    id: 'work-order-generator',
    type: 'tool',
    slugs: {
      en: 'work-order-generator',
      es: 'orden-de-trabajo-taller',
      fr: 'bon-d-intervention-modele',
      de: 'arbeitsauftrag-vorlage',
      pt: 'ordem-de-servico-simples',
      it: 'ordine-di-lavoro-riparazione',
    },
  },
  {
    id: 'account-statement-generator',
    type: 'tool',
    slugs: {
      en: 'account-statement-generator',
      es: 'estado-de-cuenta-cliente',
      fr: 'releve-de-compte-client',
      de: 'kontoauszug-vorlage-privat',
      pt: 'extrato-de-conta-corrente',
      it: 'estratto-conto-cliente',
    },
  },
  {
    id: 'packing-slip-generator',
    type: 'tool',
    slugs: {
      en: 'packing-slip-generator',
      es: 'albaran-de-entrega-gratis',
      fr: 'bon-de-livraison-gratuit',
      de: 'lieferschein-vorlage-pdf',
      pt: 'romaneio-de-carga-padrao',
      it: 'bolla-di-accompagnamento-ddt',
    },
  },
  // Info pages
  {
    id: 'about',
    type: 'info',
    slugs: {
      en: 'about',
      es: 'sobre-nosotros',
      fr: 'a-propos',
      de: 'ueber-uns',
      pt: 'sobre-nos',
      it: 'chi-siamo',
    },
  },
  {
    id: 'contact',
    type: 'info',
    slugs: {
      en: 'contact',
      es: 'contacto',
      fr: 'contact',
      de: 'kontakt',
      pt: 'contato',
      it: 'contatti',
    },
  },
  {
    id: 'privacy',
    type: 'info',
    slugs: {
      en: 'privacy',
      es: 'politica-de-privacidad',
      fr: 'politique-de-confidentialite',
      de: 'datenschutz',
      pt: 'politica-de-privacidade',
      it: 'informativa-privacy',
    },
  },
  {
    id: 'terms',
    type: 'info',
    slugs: {
      en: 'terms',
      es: 'terminos-de-uso',
      fr: 'conditions-d-utilisation',
      de: 'nutzungsbedingungen',
      pt: 'termos-de-uso',
      it: 'termini-di-servizio',
    },
  },
  {
    id: 'bugs',
    type: 'info',
    slugs: {
      en: 'bugs',
      es: 'reportar-error',
      fr: 'signaler-un-bug',
      de: 'fehler-melden',
      pt: 'reportar-erro',
      it: 'segnala-bug',
    },
  },
];

/**
 * Builds the URL path for a given route and language
 */
export function getLocalizedPath(id: string, lang: string = 'en'): string {
  const route = ROUTES_CONFIG.find((r) => r.id === id);
  if (!route) return lang === 'en' ? '/' : `/${lang}/`;

  const slug = route.slugs[lang] || route.slugs['en'] || '';

  if (lang === 'en') {
    return slug ? `/${slug}` : '/';
  }

  // Non-English subfolder
  return slug ? `/${lang}/${slug}` : `/${lang}/`;
}

/**
 * Resolves language and canonical page ID from a given pathname
 */
export function resolvePath(pathname: string): { lang: string; id: string; type: 'tool' | 'info' } {
  const clean = pathname.replace(/^\/+/, '').replace(/\/+$/, '').trim().toLowerCase();
  
  if (!clean) {
    return { lang: 'en', id: 'invoice-generator', type: 'tool' };
  }

  const parts = clean.split('/');
  const firstPart = parts[0];

  // Check if first part is a supported non-English language
  if (['es', 'fr', 'de', 'pt', 'it'].includes(firstPart)) {
    const lang = firstPart;
    const subSlug = parts[1] || '';

    if (!subSlug) {
      // Home page for this language (e.g., /es/ or /fr/)
      return { lang, id: 'invoice-generator', type: 'tool' };
    }

    // Find route matching the slug in this language
    const match = ROUTES_CONFIG.find((r) => r.slugs[lang] === subSlug);
    if (match) {
      return { lang, id: match.id, type: match.type };
    }

    // Fallback: check if matching English slug directly
    const fallback = ROUTES_CONFIG.find((r) => r.slugs['en'] === subSlug);
    if (fallback) {
      return { lang, id: fallback.id, type: fallback.type };
    }

    return { lang, id: 'invoice-generator', type: 'tool' };
  }

  // English route (at root)
  const match = ROUTES_CONFIG.find((r) => r.slugs['en'] === clean);
  if (match) {
    return { lang: 'en', id: match.id, type: match.type };
  }

  // Check aliases like /about-us, /privacy-policy, etc.
  if (['about', 'about-us'].includes(clean)) return { lang: 'en', id: 'about', type: 'info' };
  if (['contact', 'contact-us'].includes(clean)) return { lang: 'en', id: 'contact', type: 'info' };
  if (['privacy', 'privacy-policy'].includes(clean)) return { lang: 'en', id: 'privacy', type: 'info' };
  if (['terms', 'terms-of-use', 'terms-and-conditions'].includes(clean)) return { lang: 'en', id: 'terms', type: 'info' };
  if (['bugs', 'report-bugs', 'bug-report'].includes(clean)) return { lang: 'en', id: 'bugs', type: 'info' };

  return { lang: 'en', id: 'invoice-generator', type: 'tool' };
}
