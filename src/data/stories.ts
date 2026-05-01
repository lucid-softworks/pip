import type { LanguageTag } from './types';

export type StoryLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type Story = {
  id: string;
  title: string;
  blurb: string;
  language: LanguageTag;
  level: StoryLevel;
  minutes: number;
  thumbColor: 'butter' | 'sky' | 'lilac' | 'moss' | 'berry';
  freeThisWeek?: boolean;
};

const stories: Story[] = [
  // French
  {
    id: 'fr-story-cafe',
    title: 'Un matin au café',
    blurb: 'Anya commande son tout premier café en français…',
    language: 'fr-FR',
    level: 'A1',
    minutes: 4,
    thumbColor: 'butter',
    freeThisWeek: true,
  },
  {
    id: 'fr-story-umbrella',
    title: 'Le parapluie perdu',
    blurb: 'Un après-midi pluvieux, un inconnu très gentil…',
    language: 'fr-FR',
    level: 'A1',
    minutes: 5,
    thumbColor: 'sky',
  },
  {
    id: 'fr-story-market',
    title: 'Au marché du dimanche',
    blurb: "On goûte des fromages, on hésite, on rit beaucoup.",
    language: 'fr-FR',
    level: 'A2',
    minutes: 6,
    thumbColor: 'moss',
  },
  {
    id: 'fr-story-letter',
    title: 'Une lettre pour grand-mère',
    blurb: 'Émilie cherche les mots justes pour dire merci.',
    language: 'fr-FR',
    level: 'A2',
    minutes: 7,
    thumbColor: 'lilac',
  },
  {
    id: 'fr-story-train',
    title: 'Le train de minuit',
    blurb: "Un trajet, une rencontre, une ville qui s'éveille.",
    language: 'fr-FR',
    level: 'B1',
    minutes: 8,
    thumbColor: 'berry',
  },
  // Spanish
  {
    id: 'es-story-panaderia',
    title: 'Una mañana en la panadería',
    blurb: 'Marcos pide pan recién hecho por primera vez…',
    language: 'es-ES',
    level: 'A1',
    minutes: 4,
    thumbColor: 'butter',
    freeThisWeek: true,
  },
  {
    id: 'es-story-llaves',
    title: 'Las llaves perdidas',
    blurb: 'Un piso, dos vecinos, y una llave que aparece donde menos se espera.',
    language: 'es-ES',
    level: 'A1',
    minutes: 5,
    thumbColor: 'sky',
  },
  {
    id: 'es-story-mercado',
    title: 'En el mercado de los domingos',
    blurb: 'Aceitunas, naranjas y un vendedor que cuenta chistes.',
    language: 'es-ES',
    level: 'A2',
    minutes: 6,
    thumbColor: 'moss',
  },
  {
    id: 'es-story-carta',
    title: 'Una carta para la abuela',
    blurb: 'Sofía busca las palabras justas para dar las gracias.',
    language: 'es-ES',
    level: 'A2',
    minutes: 7,
    thumbColor: 'lilac',
  },
];

export async function loadStories(): Promise<Story[]> {
  return stories;
}

export async function loadStoriesForLanguage(language: LanguageTag): Promise<Story[]> {
  return stories.filter((s) => s.language === language);
}
