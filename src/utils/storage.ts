import { InvoiceData, InvoiceMetadata } from '../types/invoice';

const CURRENT_ID_KEY = 'invoiceo_current_invoice_id';
const INVOICES_STORAGE_KEY = 'invoiceo_saved_invoices_v1';

export function getDefaultInvoice(): InvoiceData {
  const today = new Date().toISOString().split('T')[0];
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  const dueDateStr = dueDate.toISOString().split('T')[0];

  return {
    id: 'inv_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
    title: 'INVOICE',
    number: 'INV-0001',
    date: today,
    dueDate: dueDateStr,
    paymentTerms: 'net_30',
    poNumber: '',

    fromName: 'Acme Creative Studio LLC',
    fromEmail: 'billing@acmestudio.com',
    fromAddress: '742 Evergreen Terrace, Suite 300',
    fromCityState: 'Springfield, OR',
    fromZip: '97477',
    fromPhone: '+1 (555) 234-5678',
    fromTaxId: 'US-849201948',
    fromAdditional: 'www.acmestudio.com',
    logoUrl: '',

    toName: 'Apex Horizons Inc.',
    toEmail: 'accounts@apexhorizons.io',
    toAddress: '100 Montgomery St, 14th Floor',
    toCityState: 'San Francisco, CA',
    toZip: '94104',
    toPhone: '+1 (415) 890-1234',
    toMobile: '',
    toFax: '',
    toTaxId: 'TAX-US-992019',

    items: [
      {
        id: 'item_1',
        description: 'Brand Identity & Design System',
        details: 'Complete visual identity overhaul including logo marks, typography guide, and brand assets',
        quantity: 1,
        rate: 2850,
      },
      {
        id: 'item_2',
        description: 'Responsive Web Application UI/UX',
        details: 'Figma interactive prototypes for desktop and mobile viewports with developer specs',
        quantity: 45,
        rate: 85,
      },
      {
        id: 'item_3',
        description: 'Cloud Infrastructure Setup & Optimization',
        details: 'Production container setup, CI/CD pipeline, and DNS SSL routing configuration',
        quantity: 8,
        rate: 125,
      },
    ],

    amountPaid: 0,
    notes: 'Thank you for your business! Payment is appreciated within 30 days of invoice date. Please reference invoice number INV-0001 with your payment.',
    paymentDetails: 'Wire Transfer / ACH Details:\nBank: First Silicon Bank\nAccount: 9876543210\nRouting: 121000358\nSWIFT: FSBNUS33',

    signatureUrl: '',
    signerName: 'Alex Morgan',
    signerTitle: 'Creative Director & Founder',

    attachments: [],
    customFields: [
      { id: 'cf_1', label: 'Project Code', value: 'PRJ-2026-ALPHA' },
    ],

    customization: {
      template: 'classic-professional',
      accentColor: '#1A3263',
      fontFamily: 'Inter',
      fontSize: 'large',
      logoWidth: 150,
      pageSize: 'a4',
      pageMargins: 'normal',
      dateFormat: 'YYYY-MM-DD',
      currency: 'USD',
      currencySymbol: '$',
      currencyPosition: 'before',
      taxRate: 8.5,
      taxLabel: 'Tax (Sales)',
      taxType: 'percent',
      discountRate: 0,
      discountType: 'percent',
      showAmountPaid: true,
      showCustomFields: true,
      showPaymentDetails: true,
      showSignature: true,
      showNotes: true,
      showAttachments: true,
    },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function getAllInvoices(): InvoiceData[] {
  try {
    const raw = localStorage.getItem(INVOICES_STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultInvoice();
      localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify([initial]));
      localStorage.setItem(CURRENT_ID_KEY, initial.id);
      return [initial];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Auto-migrate previous default coral color to requested #1A3263
      const migrated = parsed.map((inv) => {
        if (inv.customization && inv.customization.accentColor === '#FF8F70') {
          return {
            ...inv,
            customization: {
              ...inv.customization,
              accentColor: '#1A3263',
            },
          };
        }
        return inv;
      });
      return migrated;
    }
    const initial = getDefaultInvoice();
    localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify([initial]));
    localStorage.setItem(CURRENT_ID_KEY, initial.id);
    return [initial];
  } catch (err) {
    console.error('Failed to read invoices from localStorage', err);
    return [getDefaultInvoice()];
  }
}

export function getCurrentInvoice(): InvoiceData {
  const all = getAllInvoices();
  const currentId = localStorage.getItem(CURRENT_ID_KEY);
  if (currentId) {
    const found = all.find((inv) => inv.id === currentId);
    if (found) return found;
  }
  const first = all[0] || getDefaultInvoice();
  localStorage.setItem(CURRENT_ID_KEY, first.id);
  return first;
}

export function saveInvoice(invoice: InvoiceData): { success: boolean; error?: string } {
  try {
    const all = getAllInvoices();
    const updated = {
      ...invoice,
      updatedAt: new Date().toISOString(),
    };
    const index = all.findIndex((i) => i.id === invoice.id);
    if (index >= 0) {
      all[index] = updated;
    } else {
      all.unshift(updated);
    }

    localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(all));
    localStorage.setItem(CURRENT_ID_KEY, invoice.id);
    return { success: true };
  } catch (err: any) {
    console.error('LocalStorage write error', err);
    return {
      success: false,
      error: err?.name === 'QuotaExceededError'
        ? 'Browser storage is full. Please remove some attachments or export/clear older invoices.'
        : 'Failed to save invoice to browser storage.',
    };
  }
}

export function setCurrentInvoiceId(id: string): void {
  try {
    localStorage.setItem(CURRENT_ID_KEY, id);
  } catch (e) {
    console.error(e);
  }
}

export function getBlankInvoice(numberStr = 'INV-0001', title = 'INVOICE'): InvoiceData {
  const today = new Date().toISOString().split('T')[0];
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  const dueDateStr = dueDate.toISOString().split('T')[0];

  return {
    id: 'inv_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
    title: title,
    number: numberStr,
    date: today,
    dueDate: dueDateStr,
    paymentTerms: 'net_30',
    poNumber: '',

    fromName: '',
    fromEmail: '',
    fromAddress: '',
    fromCityState: '',
    fromZip: '',
    fromPhone: '',
    fromTaxId: '',
    fromAdditional: '',
    logoUrl: '',

    toName: '',
    toEmail: '',
    toAddress: '',
    toCityState: '',
    toZip: '',
    toPhone: '',
    toMobile: '',
    toFax: '',
    toTaxId: '',

    items: [
      {
        id: 'item_1',
        description: '',
        details: '',
        quantity: 1,
        rate: 0,
      },
    ],

    amountPaid: 0,
    notes: '',
    paymentDetails: '',

    signatureUrl: '',
    signerName: '',
    signerTitle: '',

    attachments: [],
    customFields: [],

    customization: {
      template: 'classic-professional',
      accentColor: '#1A3263',
      fontFamily: 'Inter',
      fontSize: 'large',
      logoWidth: 150,
      pageSize: 'a4',
      pageMargins: 'normal',
      dateFormat: 'YYYY-MM-DD',
      currency: 'USD',
      currencySymbol: '$',
      currencyPosition: 'before',
      taxRate: 0,
      taxLabel: 'Tax',
      taxType: 'percent',
      discountRate: 0,
      discountType: 'percent',
      showAmountPaid: true,
      showCustomFields: false,
      showPaymentDetails: true,
      showSignature: true,
      showNotes: true,
      showAttachments: true,
    },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createNewDocument(prefix = 'INV-', documentTitle = 'INVOICE'): InvoiceData {
  const all = getAllInvoices();
  let maxNum = 0;
  const escapedPrefix = prefix.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`^${escapedPrefix}(\\d+)`, 'i');
  for (const inv of all) {
    const match = inv.number.match(regex);
    if (match) {
      const n = parseInt(match[1], 10);
      if (!isNaN(n) && n > maxNum) {
        maxNum = n;
      }
    }
  }
  const nextNum = maxNum + 1;
  const numPad = String(nextNum).padStart(4, '0');
  const newDoc = getBlankInvoice(`${prefix}${numPad}`, documentTitle);

  saveInvoice(newDoc);
  setCurrentInvoiceId(newDoc.id);
  return newDoc;
}

export function createNewInvoice(): InvoiceData {
  return createNewDocument('INV-', 'INVOICE');
}

export function duplicateInvoice(id: string): InvoiceData | null {
  const all = getAllInvoices();
  const original = all.find((i) => i.id === id);
  if (!original) return null;

  const copy: InvoiceData = {
    ...original,
    id: 'inv_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
    number: `${original.number}-COPY`,
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveInvoice(copy);
  setCurrentInvoiceId(copy.id);
  return copy;
}

export function deleteInvoice(id: string): { remainingInvoices: InvoiceData[]; newActive: InvoiceData } {
  let all = getAllInvoices();
  all = all.filter((i) => i.id !== id);

  if (all.length === 0) {
    const fresh = getDefaultInvoice();
    all = [fresh];
  }

  localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(all));
  const newActive = all[0];
  localStorage.setItem(CURRENT_ID_KEY, newActive.id);
  return { remainingInvoices: all, newActive };
}

/**
 * Compresses an image to fit safely in localStorage (max dimensions ~800px, JPEG/PNG quality)
 */
export async function compressImage(file: File, maxDim = 800, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Keep PNG if transparent or requested, otherwise JPEG
        const isPng = file.type === 'image/png';
        const dataUrl = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
