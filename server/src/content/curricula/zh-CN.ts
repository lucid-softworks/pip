import type { LanguageContent } from './builders.ts';

// Mandarin Chinese (Simplified, mainland). No word spaces — tokenize at
// natural phrase boundaries. Coarser than spaced languages but workable.
export const mandarinSimplified: LanguageContent = {
  prefix: 'zhcn',
  source: 'en-US',
  target: 'zh-CN',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: '你好，你好吗？',
      tokens: ['你好，', '你好吗？'],
      distractors: ['再见', '我', '很好', '谢谢'],
      highlight: '你好吗？',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: '我很好，谢谢。',
      tokens: ['我', '很好，', '谢谢。'],
      distractors: ['你', '不客气', '请', '是'],
      highlight: '很好,',
    },
    {
      prompt: 'My name is Maria.',
      answer: '我叫玛丽亚。',
      tokens: ['我叫', '玛丽亚。'],
      distractors: ['你', '什么', '名字', '是'],
      highlight: '我叫',
    },
    {
      prompt: 'Nice to meet you.',
      answer: '很高兴认识你。',
      tokens: ['很高兴', '认识你。'],
      distractors: ['再见', '你好', '谢谢', '欢迎'],
      highlight: '认识你。',
    },
    {
      prompt: 'See you tomorrow.',
      answer: '明天见。',
      tokens: ['明天见。'],
      distractors: ['再见', '今天', '晚安', '一会儿'],
      highlight: '明天见。',
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
    { source: 'mother', target: '妈妈' },
    { source: 'father', target: '爸爸' },
    { source: 'sister', target: '姐姐' },
    { source: 'brother', target: '哥哥' },
    { source: 'son', target: '儿子' },
    { source: 'daughter', target: '女儿' },
  ],
  food: [
    { source: 'bread', target: '面包' },
    { source: 'water', target: '水' },
    { source: 'coffee', target: '咖啡' },
    { source: 'milk', target: '牛奶' },
    { source: 'apple', target: '苹果' },
    { source: 'cheese', target: '奶酪' },
  ],
};
