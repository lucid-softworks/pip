import type { LanguageTag } from './types';

export type LanguageMeta = {
  code: LanguageTag;
  name: string;
  flag: string;
};

// Catalog of every language pip knows about, regardless of whether a curriculum exists yet.
// Keep in roughly Duolingo-like presentation order: big ones first, then alphabetical.
export const LANGUAGES: LanguageMeta[] = [
  { code: 'en-US', name: 'English', flag: '🇬🇧' },

  // Big European languages
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'pt-BR', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'nl-NL', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl-PL', name: 'Polish', flag: '🇵🇱' },

  // Asian
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
  { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
  { code: 'vi-VN', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'th-TH', name: 'Thai', flag: '🇹🇭' },
  { code: 'id-ID', name: 'Indonesian', flag: '🇮🇩' },

  // Eastern European
  { code: 'ru-RU', name: 'Russian', flag: '🇷🇺' },
  { code: 'uk-UA', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'cs-CZ', name: 'Czech', flag: '🇨🇿' },
  { code: 'ro-RO', name: 'Romanian', flag: '🇷🇴' },
  { code: 'hu-HU', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'tr-TR', name: 'Turkish', flag: '🇹🇷' },
  { code: 'el-GR', name: 'Greek', flag: '🇬🇷' },

  // Nordic
  { code: 'sv-SE', name: 'Swedish', flag: '🇸🇪' },
  { code: 'nb-NO', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'da-DK', name: 'Danish', flag: '🇩🇰' },
  { code: 'fi-FI', name: 'Finnish', flag: '🇫🇮' },

  // Middle East / smaller
  { code: 'ar-SA', name: 'Arabic', flag: '🇸🇦' },
  { code: 'he-IL', name: 'Hebrew', flag: '🇮🇱' },

  // Celtic + minority European
  { code: 'cy-GB', name: 'Welsh', flag: '🏴\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}' },
  { code: 'ga-IE', name: 'Irish', flag: '🇮🇪' },
  { code: 'ca-ES', name: 'Catalan', flag: '🇪🇸' },
];

export function getLanguage(code: LanguageTag): LanguageMeta {
  return LANGUAGES.find((l) => l.code === code) ?? { code, name: code, flag: '🌐' };
}

export type CourseId = string;

export function makeCourseId(source: LanguageTag, target: LanguageTag): CourseId {
  return `${source}:${target}`;
}

export function parseCourseId(id: CourseId): { source: LanguageTag; target: LanguageTag } {
  const [source, target] = id.split(':');
  return { source, target };
}

export type Course = {
  id: CourseId;
  source: LanguageTag;
  target: LanguageTag;
  available: boolean;
};
