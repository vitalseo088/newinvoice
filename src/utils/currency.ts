export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  position: 'before' | 'after';
}

export const CURRENCIES: CurrencyOption[] = [
  // Top Global Reserve & Major Currencies
  { code: 'USD', name: 'US Dollar ($)', symbol: '$', position: 'before' },
  { code: 'PKR', name: 'Pakistani Rupee (PKR - Rs)', symbol: 'Rs ', position: 'before' },
  { code: 'EUR', name: 'Euro (€)', symbol: '€', position: 'before' },
  { code: 'GBP', name: 'British Pound (£)', symbol: '£', position: 'before' },
  { code: 'CAD', name: 'Canadian Dollar (CA$)', symbol: 'CA$', position: 'before' },
  { code: 'AUD', name: 'Australian Dollar (AU$)', symbol: 'AU$', position: 'before' },
  { code: 'JPY', name: 'Japanese Yen (¥)', symbol: '¥', position: 'before' },
  { code: 'CHF', name: 'Swiss Franc (CHF)', symbol: 'CHF ', position: 'before' },
  { code: 'CNY', name: 'Chinese Yuan (¥)', symbol: '¥', position: 'before' },
  { code: 'INR', name: 'Indian Rupee (₹)', symbol: '₹', position: 'before' },
  { code: 'BDT', name: 'Bangladeshi Taka (৳)', symbol: '৳', position: 'before' },
  { code: 'AED', name: 'UAE Dirham (AED)', symbol: 'AED ', position: 'before' },
  { code: 'SAR', name: 'Saudi Riyal (SAR)', symbol: 'SAR ', position: 'before' },
  { code: 'SGD', name: 'Singapore Dollar (SG$)', symbol: 'SG$', position: 'before' },
  { code: 'NZD', name: 'New Zealand Dollar (NZ$)', symbol: 'NZ$', position: 'before' },
  { code: 'HKD', name: 'Hong Kong Dollar (HK$)', symbol: 'HK$', position: 'before' },

  // Middle East & Gulf Currencies
  { code: 'AED', name: 'UAE Dirham (AED)', symbol: 'AED ', position: 'before' },
  { code: 'SAR', name: 'Saudi Riyal (SAR)', symbol: 'SAR ', position: 'before' },
  { code: 'QAR', name: 'Qatari Riyal (QAR)', symbol: 'QAR ', position: 'before' },
  { code: 'KWD', name: 'Kuwaiti Dinar (KWD)', symbol: 'KWD ', position: 'before' },
  { code: 'BHD', name: 'Bahraini Dinar (BHD)', symbol: 'BHD ', position: 'before' },
  { code: 'OMR', name: 'Omani Rial (OMR)', symbol: 'OMR ', position: 'before' },
  { code: 'ILS', name: 'Israeli New Shekel (₪)', symbol: '₪', position: 'before' },
  { code: 'JOD', name: 'Jordanian Dinar (JOD)', symbol: 'JOD ', position: 'before' },
  { code: 'TRY', name: 'Turkish Lira (₺)', symbol: '₺', position: 'before' },

  // Asia & Pacific Currencies
  { code: 'MYR', name: 'Malaysian Ringgit (RM)', symbol: 'RM ', position: 'before' },
  { code: 'THB', name: 'Thai Baht (฿)', symbol: '฿', position: 'before' },
  { code: 'IDR', name: 'Indonesian Rupiah (Rp)', symbol: 'Rp ', position: 'before' },
  { code: 'PHP', name: 'Philippine Peso (₱)', symbol: '₱', position: 'before' },
  { code: 'VND', name: 'Vietnamese Dong (₫)', symbol: '₫', position: 'after' },
  { code: 'KRW', name: 'South Korean Won (₩)', symbol: '₩', position: 'before' },
  { code: 'TWD', name: 'New Taiwan Dollar (NT$)', symbol: 'NT$', position: 'before' },
  { code: 'LKR', name: 'Sri Lankan Rupee (Rs)', symbol: 'Rs ', position: 'before' },
  { code: 'NPR', name: 'Nepalese Rupee (Rs)', symbol: 'Rs ', position: 'before' },

  // Europe (Non-Eurozone & Scandinavian)
  { code: 'SEK', name: 'Swedish Krona (kr)', symbol: ' kr', position: 'after' },
  { code: 'NOK', name: 'Norwegian Krone (kr)', symbol: ' kr', position: 'after' },
  { code: 'DKK', name: 'Danish Krone (kr)', symbol: ' kr', position: 'after' },
  { code: 'PLN', name: 'Polish Zloty (zł)', symbol: ' zł', position: 'after' },
  { code: 'CZK', name: 'Czech Koruna (Kč)', symbol: ' Kč', position: 'after' },
  { code: 'HUF', name: 'Hungarian Forint (Ft)', symbol: ' Ft', position: 'after' },
  { code: 'RON', name: 'Romanian Leu (lei)', symbol: ' lei', position: 'after' },
  { code: 'BGN', name: 'Bulgarian Lev (лв)', symbol: ' лв', position: 'after' },
  { code: 'ISK', name: 'Icelandic Króna (kr)', symbol: ' kr', position: 'after' },
  { code: 'UAH', name: 'Ukrainian Hryvnia (₴)', symbol: '₴', position: 'before' },

  // Americas
  { code: 'MXN', name: 'Mexican Peso (MX$)', symbol: 'MX$', position: 'before' },
  { code: 'BRL', name: 'Brazilian Real (R$)', symbol: 'R$', position: 'before' },
  { code: 'ARS', name: 'Argentine Peso ($)', symbol: '$', position: 'before' },
  { code: 'CLP', name: 'Chilean Peso ($)', symbol: '$', position: 'before' },
  { code: 'COP', name: 'Colombian Peso ($)', symbol: '$', position: 'before' },
  { code: 'PEN', name: 'Peruvian Sol (S/)', symbol: 'S/ ', position: 'before' },
  { code: 'UYU', name: 'Uruguayan Peso ($U)', symbol: '$U ', position: 'before' },

  // Africa
  { code: 'ZAR', name: 'South African Rand (R)', symbol: 'R ', position: 'before' },
  { code: 'EGP', name: 'Egyptian Pound (E£)', symbol: 'E£ ', position: 'before' },
  { code: 'NGN', name: 'Nigerian Naira (₦)', symbol: '₦', position: 'before' },
  { code: 'KES', name: 'Kenyan Shilling (KSh)', symbol: 'KSh ', position: 'before' },
  { code: 'GHS', name: 'Ghanaian Cedi (GH₵)', symbol: 'GH₵ ', position: 'before' },
  { code: 'MAD', name: 'Moroccan Dirham (MAD)', symbol: 'MAD ', position: 'before' },
];

export function formatMoney(
  amount: number,
  symbol = '$',
  position: 'before' | 'after' = 'before',
  decimalPlaces = 2
): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  const formattedNumber = Math.abs(safeAmount).toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  const sign = safeAmount < 0 ? '-' : '';
  if (position === 'after') {
    return `${sign}${formattedNumber}${symbol}`;
  }
  return `${sign}${symbol}${formattedNumber}`;
}

export function calculateInvoiceTotals(invoice: {
  items: Array<{ quantity: number; rate: number }>;
  amountPaid: number;
  customization: {
    taxRate: number;
    taxType: 'percent' | 'flat';
    discountRate: number;
    discountType: 'percent' | 'flat';
  };
}) {
  const subtotal = invoice.items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    return sum + qty * rate;
  }, 0);

  const discountRate = Number(invoice.customization.discountRate) || 0;
  const discountAmount =
    invoice.customization.discountType === 'percent'
      ? (subtotal * discountRate) / 100
      : discountRate;

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  const taxRate = Number(invoice.customization.taxRate) || 0;
  const taxAmount =
    invoice.customization.taxType === 'percent'
      ? (discountedSubtotal * taxRate) / 100
      : taxRate;

  const total = discountedSubtotal + taxAmount;
  const amountPaid = Number(invoice.amountPaid) || 0;
  const balanceDue = Math.max(0, total - amountPaid);

  return {
    subtotal,
    discountAmount,
    taxAmount,
    total,
    amountPaid,
    balanceDue,
  };
}

export function computeDueDate(startDateIso: string, terms: string): string {
  if (terms === 'custom' || !startDateIso) return startDateIso;

  const date = new Date(startDateIso);
  if (isNaN(date.getTime())) return startDateIso;

  let daysToAdd = 0;
  switch (terms) {
    case 'on_receipt':
      daysToAdd = 0;
      break;
    case 'net_7':
      daysToAdd = 7;
      break;
    case 'net_15':
      daysToAdd = 15;
      break;
    case 'net_30':
      daysToAdd = 30;
      break;
    case 'net_45':
      daysToAdd = 45;
      break;
    case 'net_60':
      daysToAdd = 60;
      break;
    default:
      return startDateIso;
  }

  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
}

export function formatDate(dateIso: string, format: string): string {
  if (!dateIso) return '';
  const [year, month, day] = dateIso.split('-');
  if (!year || !month || !day) return dateIso;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNum = parseInt(month, 10);
  const monthShort = months[monthNum - 1] || month;

  switch (format) {
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'DD MMM YYYY':
      return `${day} ${monthShort} ${year}`;
    case 'YYYY-MM-DD':
    default:
      return dateIso;
  }
}
