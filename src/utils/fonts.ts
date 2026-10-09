import { InvoiceFontFamily } from '../types/invoice';

export interface FontOption {
  id: InvoiceFontFamily;
  name: string;
  category: 'Modern Sans' | 'Geometric Sans' | 'Humanist Sans' | 'Editorial Serif' | 'Slab Serif' | 'Monospace';
  description: string;
  fontFamily: string;
  pdfFont: 'helvetica' | 'times' | 'courier';
}

export const INVOICE_FONTS: FontOption[] = [
  {
    id: 'Manrope',
    name: 'Manrope',
    category: 'Modern Sans',
    description: 'Modern geometric sans-serif with clean proportions',
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'Poppins',
    name: 'Poppins',
    category: 'Geometric Sans',
    description: 'Crisp, contemporary geometric sans with open curves',
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'Lato',
    name: 'Lato',
    category: 'Humanist Sans',
    description: 'Warm, transparent humanist sans-serif for business',
    fontFamily: "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'Roboto Slab',
    name: 'Roboto Slab',
    category: 'Slab Serif',
    description: 'Distinguished slab serif with dual geometric nature',
    fontFamily: "'Roboto Slab', Georgia, 'Times New Roman', serif",
    pdfFont: 'times',
  },
  {
    id: 'PT Sans',
    name: 'PT Sans',
    category: 'Humanist Sans',
    description: 'Clear, universal sans-serif with high legibility',
    fontFamily: "'PT Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'Inter',
    name: 'Inter',
    category: 'Modern Sans',
    description: 'Clean modern sans crafted for high-density reading',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'Roboto',
    name: 'Roboto',
    category: 'Geometric Sans',
    description: 'Classic crisp neo-grotesque standard font',
    fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'Montserrat',
    name: 'Montserrat',
    category: 'Geometric Sans',
    description: 'Bold urban geometric sans for striking invoice headers',
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'Open Sans',
    name: 'Open Sans',
    category: 'Humanist Sans',
    description: 'Neutral, friendly & balanced corporate sans',
    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'Plus Jakarta Sans',
    name: 'Plus Jakarta Sans',
    category: 'Modern Sans',
    description: 'Premium modern SaaS neo-grotesque font',
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'Playfair Display',
    name: 'Playfair Display',
    category: 'Editorial Serif',
    description: 'High-contrast luxury serif for executive invoices',
    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
    pdfFont: 'times',
  },
  {
    id: 'Raleway',
    name: 'Raleway',
    category: 'Geometric Sans',
    description: 'Elegant heading & body sans with sophisticated flair',
    fontFamily: "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    pdfFont: 'helvetica',
  },
  {
    id: 'JetBrains Mono',
    name: 'JetBrains Mono',
    category: 'Monospace',
    description: 'Modern developer monospace font for tech invoices',
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    pdfFont: 'courier',
  },
];

export function getFontConfig(fontId?: string): FontOption {
  const match = INVOICE_FONTS.find((f) => f.id === fontId);
  return match || INVOICE_FONTS[0];
}

export function getFontCssFamily(fontId?: string): string {
  return getFontConfig(fontId).fontFamily;
}

export function getPdfFontFamily(fontId?: string): 'helvetica' | 'times' | 'courier' {
  return getFontConfig(fontId).pdfFont;
}
