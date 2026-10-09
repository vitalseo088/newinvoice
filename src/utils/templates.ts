import { TemplateId, InvoiceFontFamily } from '../types/invoice';

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  defaultAccent: string;
  previewColor: string;
  recommendedFont: InvoiceFontFamily;
  layoutStyle: string;
  bestForProfessions: string[];
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    category: 'Standard',
    description: 'Clean, balanced, standard grid with neat dividers and traditional hierarchy.',
    defaultAccent: '#1A3263',
    previewColor: '#1A3263',
    recommendedFont: 'Inter',
    layoutStyle: 'Two-column symmetrical grid with clean accent divider lines',
    bestForProfessions: ['Consultants', 'Handymen', 'Accountants', 'General Businesses'],
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'Modern',
    description: 'Spacious sans-serif aesthetic with understated borders and light typography.',
    defaultAccent: '#1F2937',
    previewColor: '#1F2937',
    recommendedFont: 'PT Sans',
    layoutStyle: 'Airy borderless headers, thin rules, minimal totals',
    bestForProfessions: ['Photographers', 'Writers', 'Architects', 'Designers'],
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    category: 'Business',
    description: 'Solid corporate styling with structured blue headers and executive badges.',
    defaultAccent: '#2563EB',
    previewColor: '#2563EB',
    recommendedFont: 'Poppins',
    layoutStyle: 'Dual-panel client boxes, executive badge, corporate headers',
    bestForProfessions: ['Tech Agencies', 'Software Companies', 'B2B Firms'],
  },
  {
    id: 'elegant-business',
    name: 'Elegant Business',
    category: 'Consulting & Legal',
    description: 'Sophisticated serif styling with refined double rules and high-end elegance.',
    defaultAccent: '#7C3AED',
    previewColor: '#7C3AED',
    recommendedFont: 'Playfair Display',
    layoutStyle: 'Double-rule framing, refined serif typography, formal layout',
    bestForProfessions: ['Lawyers & Legal', 'High-end Advisory', 'Boutique Studios'],
  },
  {
    id: 'bold-header',
    name: 'Bold Header',
    category: 'High Impact',
    description: 'High-contrast colored header block with clean reversed title and modern grid.',
    defaultAccent: '#B45309',
    previewColor: '#B45309',
    recommendedFont: 'Roboto Slab',
    layoutStyle: 'Full-width solid color top banner with inverted typography',
    bestForProfessions: ['General Contractors', 'Builders', 'Construction', 'Trades'],
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    category: 'Agency & Design',
    description: 'Asymmetric creative accents, vibrant geometric tag, and studio personality.',
    defaultAccent: '#EC4899',
    previewColor: '#EC4899',
    recommendedFont: 'Manrope',
    layoutStyle: 'Asymmetrical header tag, playful badges, creative deliverables scope',
    bestForProfessions: ['Design Agencies', 'UI/UX Studios', 'Marketing Consultants'],
  },
  {
    id: 'compact-invoice',
    name: 'Compact Invoice',
    category: 'Item-Heavy',
    description: 'Dense, space-efficient layout suited for multiple line items and logistics.',
    defaultAccent: '#0D9488',
    previewColor: '#0D9488',
    recommendedFont: 'Inter',
    layoutStyle: 'Condensed spacing, multi-row table efficiency, compact summary',
    bestForProfessions: ['Cleaners & Janitorial', 'Auto Mechanics', 'Parts & Hardware'],
  },
  {
    id: 'service-invoice',
    name: 'Service Invoice',
    category: 'Services & Hourly',
    description: 'Highlights hours, rates, deliverables, and service scopes clearly.',
    defaultAccent: '#0E7490',
    previewColor: '#0E7490',
    recommendedFont: 'Lato',
    layoutStyle: 'Hourly rates breakdown, diagnostic scope, service guarantee box',
    bestForProfessions: ['Plumbers & HVAC', 'Electricians', 'Field Techs', 'Service Trades'],
  },
  {
    id: 'freelancer-invoice',
    name: 'Freelancer Invoice',
    category: 'Independent',
    description: 'Friendly, personalized framing with quick payment callout and modern cards.',
    defaultAccent: '#166534',
    previewColor: '#166534',
    recommendedFont: 'Poppins',
    layoutStyle: 'Modern card containers, prominent direct bank/IBAN payment card',
    bestForProfessions: ['Freelancers & Contractors', 'Software Engineers', 'Copywriters'],
  },
  {
    id: 'retail-invoice',
    name: 'Retail Invoice',
    category: 'Commerce',
    description: 'Receipt-inspired design with itemized layout and clear purchase summary.',
    defaultAccent: '#EA580C',
    previewColor: '#EA580C',
    recommendedFont: 'Roboto',
    layoutStyle: 'Receipt-style order badge, itemized purchase list, receipt footer',
    bestForProfessions: ['Wholesalers', 'Retail Stores', 'E-commerce Merchants'],
  },
  {
    id: 'international-invoice',
    name: 'International Invoice',
    category: 'Cross-Border',
    description: 'Emphasizes currency clarity, VAT/tax registration, and SWIFT/IBAN banking.',
    defaultAccent: '#059669',
    previewColor: '#059669',
    recommendedFont: 'Plus Jakarta Sans',
    layoutStyle: 'Prominent currency badge, cross-border SWIFT/IBAN wire instructions',
    bestForProfessions: ['International Contractors', 'Remote Talent', 'Exporters'],
  },
  {
    id: 'premium-executive',
    name: 'Premium Executive',
    category: 'Executive',
    description: 'Distinguished charcoal and gold borders, refined balance due highlight.',
    defaultAccent: '#D97706',
    previewColor: '#B45309',
    recommendedFont: 'Montserrat',
    layoutStyle: 'Charcoal and gold borders, luxury badge, executive authorization',
    bestForProfessions: ['Executive Coaches', 'C-Suite Advisors', 'Management Firms'],
  },
];

export const PRESET_ACCENT_COLORS = [
  '#1A3263', // Primary Deep Navy
  '#2563EB', // Royal Blue
  '#0D9488', // Teal
  '#10B981', // Emerald
  '#4F46E5', // Indigo
  '#7C3AED', // Violet
  '#EA580C', // Orange
  '#FF8F70', // Coral
  '#1F2937', // Slate Dark
  '#B45309', // Warm Bronze
];
