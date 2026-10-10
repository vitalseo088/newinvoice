import fs from 'fs';
import path from 'path';

// Define base URL
const BASE_URL = 'https://invoiceo.online';

// Languages in Phase 1
const LANGUAGES = ['en', 'es', 'fr', 'de', 'pt', 'it'];

// Pages config
const ROUTES = [
  { id: 'invoice-generator', slugs: { en: '', es: 'generador-facturas-gratis', fr: 'facture-gratuite-en-ligne', de: 'rechnung-schreiben-kostenlos', pt: 'gerador-de-nota-fiscal-gratis', it: 'creare-fattura-gratis' }, changefreq: 'daily', priority: '1.0' },
  { id: 'receipt-generator', slugs: { en: 'receipt-generator', es: 'crear-recibo-de-pago', fr: 'recu-de-paiement-gratuit', de: 'quittung-online-erstellen', pt: 'recibo-de-pagamento-simples', it: 'ricevuta-di-pagamento-facile' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'quote-generator', slugs: { en: 'quote-generator', es: 'hacer-presupuesto-online', fr: 'devis-gratuit-en-ligne', de: 'angebot-erstellen-vorlage', pt: 'gerador-de-orcamento-rapido', it: 'preventivo-gratuito-online' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'estimate-generator', slugs: { en: 'estimate-generator', es: 'estimacion-de-costos', fr: 'estimation-travaux-devis', de: 'kostenvoranschlag-muster', pt: 'estimativa-de-custos-obra', it: 'computo-metrico-stima' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'credit-note-generator', slugs: { en: 'credit-note-generator', es: 'nota-de-credito-facil', fr: 'facture-avoir-gratuit', de: 'gutschrift-muster-vorlage', pt: 'nota-de-credito-comercial', it: 'nota-di-credito-semplice' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'purchase-order-generator', slugs: { en: 'purchase-order-generator', es: 'orden-de-compra-formato', fr: 'bon-de-commande-modele', de: 'bestellschein-vorlage', pt: 'ordem-de-compra-padrao', it: 'ordine-di-acquisto-modulo' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'sales-order-generator', slugs: { en: 'sales-order-generator', es: 'nota-de-pedido-ventas', fr: 'bon-de-livraison-commande', de: 'auftragsbestaetigung-muster', pt: 'pedido-de-venda-rapido', it: 'conferma-ordine-vendita' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'proforma-invoice-generator', slugs: { en: 'proforma-invoice-generator', es: 'factura-proforma-online', fr: 'facture-proforma-modele', de: 'proforma-rechnung-vorlage', pt: 'fatura-proforma-exportacao', it: 'fattura-proforma-facile' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'timesheet-generator', slugs: { en: 'timesheet-generator', es: 'hoja-de-horas-trabajadas', fr: 'feuille-de-temps-travail', de: 'stundenzettel-ausfuellen', pt: 'folha-de-ponto-individual', it: 'foglio-ore-lavoro-mensile' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'work-order-generator', slugs: { en: 'work-order-generator', es: 'orden-de-trabajo-taller', fr: 'bon-d-intervention-modele', de: 'arbeitsauftrag-vorlage', pt: 'ordem-de-servico-simples', it: 'ordine-di-lavoro-riparazione' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'account-statement-generator', slugs: { en: 'account-statement-generator', es: 'estado-de-cuenta-cliente', fr: 'releve-de-compte-client', de: 'kontoauszug-vorlage-privat', pt: 'extrato-de-conta-corrente', it: 'estratto-conto-cliente' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'packing-slip-generator', slugs: { en: 'packing-slip-generator', es: 'albaran-de-entrega-gratis', fr: 'bon-de-livraison-gratuit', de: 'lieferschein-vorlage-pdf', pt: 'romaneio-de-carga-padrao', it: 'bolla-di-accompagnamento-ddt' }, changefreq: 'weekly', priority: '0.8' },
  { id: 'about', slugs: { en: 'about', es: 'sobre-nosotros', fr: 'a-propos', de: 'ueber-uns', pt: 'sobre-nos', it: 'chi-siamo' }, changefreq: 'monthly', priority: '0.5' },
  { id: 'contact', slugs: { en: 'contact', es: 'contacto', fr: 'contact', de: 'kontakt', pt: 'contato', it: 'contatti' }, changefreq: 'monthly', priority: '0.5' },
  { id: 'privacy', slugs: { en: 'privacy', es: 'politica-de-privacidad', fr: 'politique-de-confidentialite', de: 'datenschutz', pt: 'politica-de-privacidade', it: 'informativa-privacy' }, changefreq: 'monthly', priority: '0.4' },
  { id: 'terms', slugs: { en: 'terms', es: 'terminos-de-uso', fr: 'conditions-d-utilisation', de: 'nutzungsbedingungen', pt: 'termos-de-uso', it: 'termini-di-servizio' }, changefreq: 'monthly', priority: '0.4' },
  { id: 'bugs', slugs: { en: 'bugs', es: 'reportar-error', fr: 'signaler-un-bug', de: 'fehler-melden', pt: 'reportar-erro', it: 'segnala-bug' }, changefreq: 'monthly', priority: '0.4' },
];

function getUrl(route: typeof ROUTES[0], lang: string): string {
  const slug = (route.slugs as any)[lang] || (route.slugs as any)['en'] || '';
  if (lang === 'en') {
    return slug ? `${BASE_URL}/${slug}` : `${BASE_URL}/`;
  }
  return slug ? `${BASE_URL}/${lang}/${slug}` : `${BASE_URL}/${lang}/`;
}

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// 1. Generate individual sitemaps per language
const sitemaps: string[] = [];

for (const lang of LANGUAGES) {
  const sitemapFilename = `sitemap-${lang}.xml`;
  sitemaps.push(sitemapFilename);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const route of ROUTES) {
    const loc = getUrl(route, lang);
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;

    // Alternate hreflangs for search engines
    for (const altLang of LANGUAGES) {
      const altLoc = getUrl(route, altLang);
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altLoc}"/>\n`;
    }
    // x-default
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${getUrl(route, 'en')}"/>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  fs.writeFileSync(path.join(PUBLIC_DIR, sitemapFilename), xml, 'utf8');
  console.log(`Generated public/${sitemapFilename}`);
}

// 2. Generate sitemap index
let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const now = new Date().toISOString().split('T')[0];
for (const sitemap of sitemaps) {
  indexXml += `  <sitemap>\n`;
  indexXml += `    <loc>${BASE_URL}/${sitemap}</loc>\n`;
  indexXml += `    <lastmod>${now}</lastmod>\n`;
  indexXml += `  </sitemap>\n`;
}
indexXml += `</sitemapindex>\n`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml, 'utf8');
console.log(`Generated public/sitemap.xml`);

// 3. Generate robots.txt
let robotsTxt = `User-agent: *\nAllow: /\n\n`;
robotsTxt += `Sitemap: ${BASE_URL}/sitemap.xml\n`;
for (const sitemap of sitemaps) {
  robotsTxt += `Sitemap: ${BASE_URL}/${sitemap}\n`;
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8');
console.log(`Generated public/robots.txt`);
