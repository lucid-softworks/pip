import type { LanguageContent } from './builders.ts';

// Hindi in Devanagari script. Uses spaces between words so tokenization
// works the same as Latin/Cyrillic languages.
export const hindi: LanguageContent = {
  prefix: 'hi',
  source: 'en-US',
  target: 'hi-IN',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: 'नमस्ते, आप कैसे हैं?',
      tokens: ['नमस्ते,', 'आप', 'कैसे', 'हैं?'],
      distractors: ['मैं', 'ठीक', 'धन्यवाद', 'तुम'],
      highlight: 'कैसे',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'मैं ठीक हूं, धन्यवाद.',
      tokens: ['मैं', 'ठीक', 'हूं,', 'धन्यवाद.'],
      distractors: ['आप', 'बहुत', 'अच्छा', 'कृपया'],
      highlight: 'ठीक',
    },
    {
      prompt: 'My name is Maria.',
      answer: 'मेरा नाम मारिया है.',
      tokens: ['मेरा', 'नाम', 'मारिया', 'है.'],
      distractors: ['आपका', 'क्या', 'मैं', 'हूं'],
      highlight: 'नाम',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'आपसे मिलकर खुशी हुई.',
      tokens: ['आपसे', 'मिलकर', 'खुशी', 'हुई.'],
      distractors: ['नमस्ते', 'बहुत', 'अच्छा', 'धन्यवाद'],
      highlight: 'खुशी',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'कल मिलते हैं.',
      tokens: ['कल', 'मिलते', 'हैं.'],
      distractors: ['अलविदा', 'जल्दी', 'आज', 'फिर'],
      highlight: 'कल',
    },
  ],
  numbers: [
    { source: 'one', target: 'एक' },
    { source: 'two', target: 'दो' },
    { source: 'three', target: 'तीन' },
    { source: 'four', target: 'चार' },
    { source: 'five', target: 'पाँच' },
    { source: 'six', target: 'छह' },
    { source: 'seven', target: 'सात' },
    { source: 'eight', target: 'आठ' },
    { source: 'nine', target: 'नौ' },
    { source: 'ten', target: 'दस' },
  ],
  family: [
    { source: 'mother', target: 'माँ' },
    { source: 'father', target: 'पिता' },
    { source: 'sister', target: 'बहन' },
    { source: 'brother', target: 'भाई' },
    { source: 'son', target: 'बेटा' },
    { source: 'daughter', target: 'बेटी' },
  ],
  food: [
    { source: 'bread', target: 'रोटी' },
    { source: 'water', target: 'पानी' },
    { source: 'coffee', target: 'कॉफी' },
    { source: 'milk', target: 'दूध' },
    { source: 'apple', target: 'सेब' },
    { source: 'cheese', target: 'पनीर' },
  ],
};
