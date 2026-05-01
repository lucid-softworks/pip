import type { Lesson, Unit } from './types';

const greetings: Lesson = {
  id: 'unit-01-lesson-01-greetings',
  unitId: 'unit-01',
  unitName: 'Hello, world',
  title: 'Greetings',
  sourceLanguage: 'en-US',
  targetLanguage: 'fr-FR',
  estimatedMinutes: 3,
  newWordCount: 12,
  exercises: [
    {
      kind: 'translate-tap',
      id: 'ex-01',
      direction: 'source-to-target',
      prompt: { text: 'Hello, how are you?', language: 'en-US' },
      answer: { text: 'Bonjour, comment ça va ?', language: 'fr-FR' },
      answerTokens: ['Bonjour,', 'comment', 'ça', 'va', '?'],
      distractors: ['salut', 'tu', 'es', 'bien'],
      highlightToken: 'ça',
    },
    {
      kind: 'translate-tap',
      id: 'ex-02',
      direction: 'source-to-target',
      prompt: { text: "I'm fine, thank you.", language: 'en-US' },
      answer: { text: 'Je vais bien, merci.', language: 'fr-FR' },
      answerTokens: ['Je', 'vais', 'bien,', 'merci.'],
      distractors: ['suis', 'tu', "s'il", 'plaît', 'très'],
      highlightToken: 'vais',
    },
    {
      kind: 'translate-tap',
      id: 'ex-03',
      direction: 'source-to-target',
      prompt: { text: 'My name is Marie.', language: 'en-US' },
      answer: { text: "Je m'appelle Marie.", language: 'fr-FR' },
      answerTokens: ['Je', "m'appelle", 'Marie.'],
      distractors: ['suis', 'mon', 'nom', 'tu', "t'appelles"],
      highlightToken: "m'appelle",
    },
    {
      kind: 'translate-tap',
      id: 'ex-04',
      direction: 'source-to-target',
      prompt: { text: 'Nice to meet you.', language: 'en-US' },
      answer: { text: 'Enchantée de te rencontrer.', language: 'fr-FR' },
      answerTokens: ['Enchantée', 'de', 'te', 'rencontrer.'],
      distractors: ['très', 'bien', 'je', 'vois', 'salut'],
      highlightToken: 'Enchantée',
    },
    {
      kind: 'translate-tap',
      id: 'ex-05',
      direction: 'source-to-target',
      prompt: { text: 'See you tomorrow.', language: 'en-US' },
      answer: { text: 'À demain.', language: 'fr-FR' },
      answerTokens: ['À', 'demain.'],
      distractors: ['au', 'revoir', 'bientôt', 'plus', 'tard'],
      highlightToken: 'À',
    },
  ],
};

const lessons: Record<string, Lesson> = {
  [greetings.id]: greetings,
};

export const units: Unit[] = [
  {
    id: 'unit-01',
    name: 'Hello, world',
    level: 'A1',
    lessons: [
      { id: greetings.id, title: 'Greetings', state: 'current' },
      { id: 'unit-01-lesson-02', title: 'Numbers 1–20', state: 'upcoming', meta: '20 words' },
      { id: 'unit-01-lesson-03', title: 'Family & friends', state: 'upcoming', meta: '5 lessons' },
      { id: 'unit-01-lesson-04', title: 'Food & drink', state: 'upcoming', meta: '5 lessons' },
      {
        id: 'unit-01-story-01',
        title: 'Story: At the bakery',
        state: 'story',
        meta: 'Bonus story for subscribers',
        premium: true,
      },
    ],
  },
];

export async function loadLesson(id: string): Promise<Lesson | null> {
  return lessons[id] ?? null;
}

export async function loadUnits(): Promise<Unit[]> {
  return units;
}
