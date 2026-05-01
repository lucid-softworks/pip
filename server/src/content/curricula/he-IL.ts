import type { LanguageContent } from './builders.ts';

// Hebrew (right-to-left). React Native handles bidi automatically when
// rendering Hebrew text — tokens are stored in logical (read-aloud) order.
export const hebrew: LanguageContent = {
  prefix: 'he',
  source: 'en-US',
  target: 'he-IL',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: 'שלום, מה שלומך?',
      tokens: ['שלום,', 'מה', 'שלומך?'],
      distractors: ['היי', 'אני', 'טוב', 'אתה'],
      highlight: 'שלומך?',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'אני בסדר, תודה.',
      tokens: ['אני', 'בסדר,', 'תודה.'],
      distractors: ['בבקשה', 'מאוד', 'אתה', 'טוב'],
      highlight: 'בסדר,',
    },
    {
      prompt: 'My name is Maria.',
      answer: 'קוראים לי מריה.',
      tokens: ['קוראים', 'לי', 'מריה.'],
      distractors: ['אני', 'השם', 'שלי', 'הוא'],
      highlight: 'קוראים',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'נעים מאוד.',
      tokens: ['נעים', 'מאוד.'],
      distractors: ['שלום', 'טוב', 'תודה', 'מצוין'],
      highlight: 'נעים',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'נתראה מחר.',
      tokens: ['נתראה', 'מחר.'],
      distractors: ['להתראות', 'בקרוב', 'היום', 'אחר כך'],
      highlight: 'מחר.',
    },
  ],
  numbers: [
    { source: 'one', target: 'אחת' },
    { source: 'two', target: 'שתיים' },
    { source: 'three', target: 'שלוש' },
    { source: 'four', target: 'ארבע' },
    { source: 'five', target: 'חמש' },
    { source: 'six', target: 'שש' },
    { source: 'seven', target: 'שבע' },
    { source: 'eight', target: 'שמונה' },
    { source: 'nine', target: 'תשע' },
    { source: 'ten', target: 'עשר' },
  ],
  family: [
    { source: 'mother', target: 'אמא' },
    { source: 'father', target: 'אבא' },
    { source: 'sister', target: 'אחות' },
    { source: 'brother', target: 'אח' },
    { source: 'son', target: 'בן' },
    { source: 'daughter', target: 'בת' },
  ],
  food: [
    { source: 'bread', target: 'לחם' },
    { source: 'water', target: 'מים' },
    { source: 'coffee', target: 'קפה' },
    { source: 'milk', target: 'חלב' },
    { source: 'apple', target: 'תפוח' },
    { source: 'cheese', target: 'גבינה' },
  ],
};
