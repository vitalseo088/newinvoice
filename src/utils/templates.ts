import { TemplateId } from '../types/invoice';

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  defaultAccent: string;
  previewColor: string;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    category: 'Standard',
    description: 'Clean, balanced, standard grid with neat dividers and traditional hierarchy.',
    defaultAccent: '#4F46E5', // Indigo
    previewColor: '#4F46E5',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'Modern',
    description: 'Spacious sans-serif aesthetic with understated borders and light typography.',
    defaultAccent: '#1F2937', // Charcoal
    previewColor: '#1F2937',
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    category: 'Business',
    description: 'Solid corporate styling with structured blue headers and executive badges.',
    defaultAccent: '#2563EB', // Blue
    previewColor: '#2563EB',
  },
  {
    id: 'elegant-business',
    name: 'Elegant Business',
    category: 'Consulting & Legal',
    description: 'Sophisticated serif styling with refined double rules and high-end elegance.',
    defaultAccent: '#7C3AED', // Royal Violet
    previewColor: '#7C3AED',
  },
  {
    id: 'bold-header',
    name: 'Bold Header',
    category: 'High Impact',
    description: 'High-contrast colored header block with clean reversed title and modern grid.',
    defaultAccent: '#FF8F70', // Warm Coral (brand accent)
    previewColor: '#FF8F70',
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    category: 'Agency & Design',
    description: 'Asymmetric creative accents, vibrant geometric tag, and studio personality.',
    defaultAccent: '#EC4899', // Pink / Rose
    previewColor: '#EC4899',
  },
  {
    id: 'compact-invoice',
    name: 'Compact Invoice',
    category: 'Item-Heavy',
    description: 'Dense, space-efficient layout suited for multiple line items and logistics.',
    defaultAccent: '#0D9488', // Teal
    previewColor: '#0D9488',
  },
  {
    id: 'service-invoice',
    name: 'Service Invoice',
    category: 'Services & Hourly',
    description: 'Highlights hours, rates, deliverables, and service scopes clearly.',
    defaultAccent: '#0284C7', // Sky Blue
    previewColor: '#0284C7',
  },
  {
    id: 'freelancer-invoice',
    name: 'Freelancer Invoice',
    category: 'Independent',
    description: 'Friendly, personalized framing with quick payment callout and modern cards.',
    defaultAccent: '#10B981', // Emerald
    previewColor: '#10B981',
  },
  {
    id: 'retail-invoice',
    name: 'Retail Invoice',
    category: 'Commerce',
    description: 'Receipt-inspired design with itemized layout and clear purchase summary.',
    defaultAccent: '#F59E0B', // Amber
    previewColor: '#F59E0B',
  },
  {
    id: 'international-invoice',
    name: 'International Invoice',
    category: 'Cross-Border',
    description: 'Emphasizes currency clarity, VAT/tax registration, and SWIFT/IBAN banking.',
    defaultAccent: '#059669', // Mint Forest
    previewColor: '#059669',
  },
  {
    id: 'premium-executive',
    name: 'Premium Executive',
    category: 'Executive',
    description: 'Distinguished charcoal and gold borders, refined balance due highlight.',
    defaultAccent: '#D97706', // Gold / Warm Ochre
    previewColor: '#B45309',
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
