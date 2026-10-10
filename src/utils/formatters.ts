import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../config/languages';

/**
 * Formats a numeric currency amount according to the target locale and currency code/symbol
 */
export function formatLocalizedMoney(
  amount: number,
  currencyCode: string = 'USD',
  lang: string = DEFAULT_LANGUAGE,
  positionOverride?: 'left' | 'right'
): string {
  const langConfig = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
  const locale = langConfig.defaultLocale;

  try {
    // If currencyCode looks like a valid 3-letter ISO code
    if (/^[A-Z]{3}$/.test(currencyCode)) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    }
  } catch {
    // Fall back if custom symbol or unsupported code
  }

  // Standard localized number formatting
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (positionOverride === 'right') {
    return `${formattedNumber} ${currencyCode}`;
  }
  return `${currencyCode} ${formattedNumber}`;
}

/**
 * Formats a date string (YYYY-MM-DD) according to the target locale
 */
export function formatLocalizedDate(
  dateString: string | undefined,
  lang: string = DEFAULT_LANGUAGE,
  style: 'short' | 'medium' | 'long' = 'medium'
): string {
  if (!dateString) return '';
  const langConfig = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
  const locale = langConfig.defaultLocale;

  const date = new Date(dateString + 'T00:00:00');
  if (isNaN(date.getTime())) return dateString;

  const dateStyleMap: Record<string, Intl.DateTimeFormatOptions> = {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
  };

  try {
    return new Intl.DateTimeFormat(locale, dateStyleMap[style]).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Formats a regular number with correct decimal and thousands separators
 */
export function formatLocalizedNumber(
  value: number,
  lang: string = DEFAULT_LANGUAGE,
  decimals: number = 2
): string {
  const langConfig = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
  const locale = langConfig.defaultLocale;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
