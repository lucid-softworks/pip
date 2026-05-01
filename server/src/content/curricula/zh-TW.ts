import type { LanguageContent } from './builders.ts';

// Mandarin (Traditional script, Taiwan). Same Mandarin language as zh-CN
// at this level — only the script differs.
export const mandarinTraditional: LanguageContent = {
  prefix: 'zhtw',
  source: 'en-US',
  target: 'zh-TW',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: '你好，你好嗎？',
      tokens: ['你好，', '你好嗎？'],
      distractors: ['再見', '我', '很好', '謝謝'],
      highlight: '你好嗎？',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: '我很好，謝謝。',
      tokens: ['我', '很好，', '謝謝。'],
      distractors: ['你', '不客氣', '請', '是'],
      highlight: '很好,',
    },
    {
      prompt: 'My name is Maria.',
      answer: '我叫瑪麗亞。',
      tokens: ['我叫', '瑪麗亞。'],
      distractors: ['你', '什麼', '名字', '是'],
      highlight: '我叫',
    },
    {
      prompt: 'Nice to meet you.',
      answer: '很高興認識你。',
      tokens: ['很高興', '認識你。'],
      distractors: ['再見', '你好', '謝謝', '歡迎'],
      highlight: '認識你。',
    },
    {
      prompt: 'See you tomorrow.',
      answer: '明天見。',
      tokens: ['明天見。'],
      distractors: ['再見', '今天', '晚安', '等一下'],
      highlight: '明天見。',
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
    { source: 'sister', target: '姊姊' },
    { source: 'brother', target: '哥哥' },
    { source: 'son', target: '兒子' },
    { source: 'daughter', target: '女兒' },
  ],
  food: [
    { source: 'bread', target: '麵包' },
    { source: 'water', target: '水' },
    { source: 'coffee', target: '咖啡' },
    { source: 'milk', target: '牛奶' },
    { source: 'apple', target: '蘋果' },
    { source: 'cheese', target: '起司' },
  ],
};
