import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { en, type TranslationKey, type Translations } from './translations/en';
import { es } from './translations/es';
import { fr } from './translations/fr';
import { de } from './translations/de';
import { pt } from './translations/pt';
import { it } from './translations/it';

export type { TranslationKey, Translations };

// Tables for each supported UI locale. Anything missing falls back to English.
const TABLES: Record<string, Partial<Translations>> = {
  en,
  es,
  fr,
  de,
  pt,
  it,
};

/** Languages we ship UI translations for (minus English which is canonical). */
export const SUPPORTED_UI_LOCALES = ['en', 'es', 'fr', 'de', 'pt', 'it'] as const;
export type UILocale = (typeof SUPPORTED_UI_LOCALES)[number];

function detectDeviceLocale(): string {
  try {
    const full = Intl.DateTimeFormat().resolvedOptions().locale;
    return full.split('-')[0].toLowerCase();
  } catch {
    return 'en';
  }
}

export function pickLocale(override?: string): UILocale {
  const lang = (override ?? detectDeviceLocale()).split('-')[0].toLowerCase();
  return (SUPPORTED_UI_LOCALES as readonly string[]).includes(lang)
    ? (lang as UILocale)
    : 'en';
}

function formatTemplate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : `{${key}}`,
  );
}

export function translate(
  locale: string,
  key: TranslationKey,
  vars?: Record<string, string | number>,
): string {
  const table = TABLES[locale] ?? en;
  const fromTable = table[key];
  const text = (fromTable ?? en[key] ?? key) as string;
  return formatTemplate(text, vars);
}

type I18nContextValue = {
  locale: UILocale;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: (k) => k,
});

type Props = {
  children: ReactNode;
  /** Optional override (e.g. the user picks a UI language in settings). */
  locale?: string;
};

export function I18nProvider({ children, locale }: Props) {
  const value = useMemo<I18nContextValue>(() => {
    const resolved = pickLocale(locale);
    return {
      locale: resolved,
      t: (k, v) => translate(resolved, k, v),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT() {
  return useContext(I18nContext).t;
}

export function useLocale(): UILocale {
  return useContext(I18nContext).locale;
}
