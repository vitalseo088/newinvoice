export type TemplateId =
  | 'classic-professional'
  | 'modern-minimal'
  | 'corporate-blue'
  | 'elegant-business'
  | 'bold-header'
  | 'creative-studio'
  | 'compact-invoice'
  | 'service-invoice'
  | 'freelancer-invoice'
  | 'retail-invoice'
  | 'international-invoice'
  | 'premium-executive';

export type PaymentTerms =
  | 'on_receipt'
  | 'net_7'
  | 'net_15'
  | 'net_30'
  | 'net_45'
  | 'net_60'
  | 'custom';

export type PageSize = 'a4' | 'letter';
export type PageMargins = 'compact' | 'normal' | 'wide';
export type DateFormat = 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'DD MMM YYYY';

export interface LineItem {
  id: string;
  description: string;
  details?: string;
  quantity: number;
  rate: number;
}

export interface Attachment {
  id: string;
  name: string;
  dataUrl: string;
  size: number;
  includeInPdf: boolean;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export type InvoiceFontFamily =
  | 'Manrope'
  | 'Poppins'
  | 'Lato'
  | 'Roboto Slab'
  | 'PT Sans'
  | 'Inter'
  | 'Roboto'
  | 'Montserrat'
  | 'Open Sans'
  | 'Plus Jakarta Sans'
  | 'Playfair Display'
  | 'Raleway'
  | 'JetBrains Mono';

export interface InvoiceCustomization {
  template: TemplateId;
  accentColor: string;
  fontFamily: InvoiceFontFamily;
  fontSize: 'small' | 'medium' | 'large';
  logoWidth: number; // in pixels (e.g., 140)
  pageSize: PageSize;
  pageMargins: PageMargins;
  dateFormat: DateFormat;
  currency: string;
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  taxRate: number; // percentage, e.g. 10
  taxLabel: string; // e.g. "Tax", "VAT", "GST"
  taxType: 'percent' | 'flat';
  discountRate: number;
  discountType: 'percent' | 'flat';
  showAmountPaid: boolean;
  showCustomFields: boolean;
  showPaymentDetails: boolean;
  showSignature: boolean;
  showNotes: boolean;
  showAttachments: boolean;
}

export interface InvoiceData {
  id: string;
  title: string;
  number: string;
  date: string; // ISO YYYY-MM-DD
  dueDate: string; // ISO YYYY-MM-DD
  paymentTerms: PaymentTerms;
  poNumber?: string;

  // From
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromCityState: string;
  fromZip: string;
  fromPhone: string;
  fromTaxId: string;
  fromAdditional: string;
  logoUrl?: string;

  // Bill To
  toName: string;
  toEmail: string;
  toAddress: string;
  toCityState: string;
  toZip: string;
  toPhone: string;
  toMobile?: string;
  toFax?: string;
  toTaxId?: string;

  // Items
  items: LineItem[];

  // Totals adjustments
  amountPaid: number;

  // Notes and Terms
  notes: string;
  paymentDetails: string; // Bank account, SWIFT, PayPal, etc.

  // Signature
  signatureUrl?: string;
  signerName?: string;
  signerTitle?: string;

  // Attachments
  attachments: Attachment[];

  // Custom Fields
  customFields: CustomField[];

  // Customization
  customization: InvoiceCustomization;

  createdAt: string;
  updatedAt: string;
}

export interface InvoiceMetadata {
  id: string;
  number: string;
  title: string;
  clientName: string;
  total: number;
  currencySymbol: string;
  date: string;
  dueDate: string;
  updatedAt: string;
}
