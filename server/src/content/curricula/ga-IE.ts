import type { LanguageContent } from './builders.ts';

// Irish (Gaeilge) — best-effort translations, native review encouraged.
export const irish: LanguageContent = {
  prefix: 'ga',
  source: 'en-US',
  target: 'ga-IE',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: 'Dia duit, conas atá tú?',
      tokens: ['Dia', 'duit,', 'conas', 'atá', 'tú?'],
      distractors: ['mé', 'go', 'maith', 'agat'],
      highlight: 'atá',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'Tá mé go maith, go raibh maith agat.',
      tokens: ['Tá', 'mé', 'go', 'maith,', 'go', 'raibh', 'maith', 'agat.'],
      distractors: ['tú', 'le', 'do', 'thoil'],
      highlight: 'maith,',
    },
    {
      prompt: 'My name is Maria.',
      answer: 'Maria is ainm dom.',
      tokens: ['Maria', 'is', 'ainm', 'dom.'],
      distractors: ['mo', 'ainm', 'tú', 'mise'],
      highlight: 'ainm',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'Tá an-áthas orm bualadh leat.',
      tokens: ['Tá', 'an-áthas', 'orm', 'bualadh', 'leat.'],
      distractors: ['go', 'maith', 'mé', 'duit'],
      highlight: 'bualadh',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'Feicfidh mé amárach thú.',
      tokens: ['Feicfidh', 'mé', 'amárach', 'thú.'],
      distractors: ['slán', 'go', 'fóill', 'inniu'],
      highlight: 'amárach',
    },
  ],
  numbers: [
    { source: 'one', target: 'a haon' },
    { source: 'two', target: 'a dó' },
    { source: 'three', target: 'a trí' },
    { source: 'four', target: 'a ceathair' },
    { source: 'five', target: 'a cúig' },
    { source: 'six', target: 'a sé' },
    { source: 'seven', target: 'a seacht' },
    { source: 'eight', target: 'a hocht' },
    { source: 'nine', target: 'a naoi' },
    { source: 'ten', target: 'a deich' },
  ],
  family: [
    { source: 'mother', target: 'máthair' },
    { source: 'father', target: 'athair' },
    { source: 'sister', target: 'deirfiúr' },
    { source: 'brother', target: 'deartháir' },
    { source: 'son', target: 'mac' },
    { source: 'daughter', target: 'iníon' },
  ],
  food: [
    { source: 'bread', target: 'arán' },
    { source: 'water', target: 'uisce' },
    { source: 'coffee', target: 'caife' },
    { source: 'milk', target: 'bainne' },
    { source: 'apple', target: 'úll' },
    { source: 'cheese', target: 'cáis' },
  ],
};
