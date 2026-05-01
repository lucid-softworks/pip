import type { LanguageContent } from './builders.ts';

// Cantonese (Hong Kong). Written with Traditional Chinese characters plus
// Cantonese-specific particles and vocabulary. Native review encouraged —
// Cantonese as it's actually spoken differs from Standard Written Chinese.
export const cantonese: LanguageContent = {
  prefix: 'yue',
  source: 'en-US',
  target: 'yue-HK',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: '你好，你點呀？',
      tokens: ['你好，', '你點呀？'],
      distractors: ['再見', '我', '幾好', '多謝'],
      highlight: '你點呀？',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: '我幾好，多謝。',
      tokens: ['我', '幾好，', '多謝。'],
      distractors: ['你', '唔該', '對唔住', '係'],
      highlight: '幾好,',
    },
    {
      prompt: 'My name is Maria.',
      answer: '我叫瑪麗亞。',
      tokens: ['我叫', '瑪麗亞。'],
      distractors: ['你', '咩', '名', '係'],
      highlight: '我叫',
    },
    {
      prompt: 'Nice to meet you.',
      answer: '好開心識你。',
      tokens: ['好開心', '識你。'],
      distractors: ['你好', '再見', '多謝', '歡迎'],
      highlight: '好開心',
    },
    {
      prompt: 'See you tomorrow.',
      answer: '聽日見。',
      tokens: ['聽日見。'],
      distractors: ['再見', '今日', '夜', '一陣'],
      highlight: '聽日見。',
    },
  ],
  numbers: [
    { source: 'one', target: '一' },
    { source: 'two', target: '二' },
    { source: 'three', target: '三' },
    { source: 'four', target: '四' },
    { source: 'five', target: '五' },
    { source: 'six', target: '六' },
    { source: 'seven', target: '七' },
    { source: 'eight', target: '八' },
    { source: 'nine', target: '九' },
    { source: 'ten', target: '十' },
  ],
  family: [
    { source: 'mother', target: '媽媽' },
    { source: 'father', target: '爸爸' },
    { source: 'sister', target: '家姐' },
    { source: 'brother', target: '哥哥' },
    { source: 'son', target: '仔' },
    { source: 'daughter', target: '女' },
  ],
  food: [
    { source: 'bread', target: '麵包' },
    { source: 'water', target: '水' },
    { source: 'coffee', target: '咖啡' },
    { source: 'milk', target: '牛奶' },
    { source: 'apple', target: '蘋果' },
    { source: 'cheese', target: '芝士' },
  ],
};
