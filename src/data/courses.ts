import type { LanguageTag } from './types';

export type LanguageMeta = {
  code: LanguageTag;
  name: string;
  flag: string;
};

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en-US', name: 'English', flag: '🇬🇧' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
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
