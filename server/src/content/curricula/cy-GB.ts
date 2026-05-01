import type { LanguageContent } from './builders.ts';

// Welsh — best-effort translations, native review encouraged. Uses informal "ti" forms.
export const welsh: LanguageContent = {
  prefix: 'cy',
  source: 'en-US',
  target: 'cy-GB',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: 'Helo, sut wyt ti?',
      tokens: ['Helo,', 'sut', 'wyt', 'ti?'],
      distractors: ['shwmae', 'da', 'iawn', 'fi'],
      highlight: 'wyt',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'Iawn, diolch.',
      tokens: ['Iawn,', 'diolch.'],
      distractors: ['da', 'iawn', 'plis', 'ti'],
      highlight: 'diolch.',
    },
    {
      prompt: 'My name is Maria.',
      answer: 'Maria ydw i.',
      tokens: ['Maria', 'ydw', 'i.'],
      distractors: ['fy', 'enw', 'yw', 'ti'],
      highlight: 'ydw',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'Neis cwrdd â ti.',
      tokens: ['Neis', 'cwrdd', 'â', 'ti.'],
      distractors: ['da', 'iawn', 'helo', 'fi'],
      highlight: 'cwrdd',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'Wela i ti yfory.',
      tokens: ['Wela', 'i', 'ti', 'yfory.'],
      distractors: ['hwyl', 'fawr', 'cyn', 'bo hir'],
      highlight: 'yfory.',
    },
  ],
  numbers: [
    { source: 'one', target: 'un' },
    { source: 'two', target: 'dau' },
    { source: 'three', target: 'tri' },
    { source: 'four', target: 'pedwar' },
    { source: 'five', target: 'pump' },
    { source: 'six', target: 'chwech' },
    { source: 'seven', target: 'saith' },
    { source: 'eight', target: 'wyth' },
    { source: 'nine', target: 'naw' },
    { source: 'ten', target: 'deg' },
  ],
  family: [
    { source: 'mother', target: 'mam' },
    { source: 'father', target: 'tad' },
    { source: 'sister', target: 'chwaer' },
    { source: 'brother', target: 'brawd' },
    { source: 'son', target: 'mab' },
    { source: 'daughter', target: 'merch' },
  ],
  food: [
    { source: 'bread', target: 'bara' },
    { source: 'water', target: 'dŵr' },
    { source: 'coffee', target: 'coffi' },
    { source: 'milk', target: 'llaeth' },
    { source: 'apple', target: 'afal' },
    { source: 'cheese', target: 'caws' },
  ],
};
