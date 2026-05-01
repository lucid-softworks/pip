import type { LanguageContent } from './builders.ts';

// Japanese — no word spaces in the script, so we tokenize at natural
// particle / phrase boundaries. Coarser than Latin languages but workable
// for translate-tap. Family terms use plain forms (not honorific).
export const japanese: LanguageContent = {
  prefix: 'ja',
  source: 'en-US',
  target: 'ja-JP',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: 'こんにちは、お元気ですか？',
      tokens: ['こんにちは、', 'お元気', 'ですか？'],
      distractors: ['ありがとう', 'はい', 'おはよう', '私は'],
      highlight: 'お元気',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: '元気です、ありがとう。',
      tokens: ['元気です、', 'ありがとう。'],
      distractors: ['いいえ', 'すみません', 'はい', 'お願いします'],
      highlight: 'ありがとう。',
    },
    {
      prompt: 'My name is Maria.',
      answer: '私の名前はマリアです。',
      tokens: ['私の', '名前は', 'マリアです。'],
      distractors: ['あなたの', 'は', 'です', '何'],
      highlight: '名前は',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'はじめまして。',
      tokens: ['はじめまして。'],
      distractors: ['よろしく', 'お願いします', 'こんにちは', 'どうも'],
      highlight: 'はじめまして。',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'また明日。',
      tokens: ['また', '明日。'],
      distractors: ['さようなら', '今日', 'おやすみ', 'じゃあね'],
      highlight: '明日。',
    },
  ],
  numbers: [
    { source: 'one', target: 'いち' },
    { source: 'two', target: 'に' },
    { source: 'three', target: 'さん' },
    { source: 'four', target: 'よん' },
    { source: 'five', target: 'ご' },
    { source: 'six', target: 'ろく' },
    { source: 'seven', target: 'なな' },
    { source: 'eight', target: 'はち' },
    { source: 'nine', target: 'きゅう' },
    { source: 'ten', target: 'じゅう' },
  ],
  family: [
    { source: 'mother', target: '母' },
    { source: 'father', target: '父' },
    { source: 'sister', target: '姉' },
    { source: 'brother', target: '兄' },
    { source: 'son', target: '息子' },
    { source: 'daughter', target: '娘' },
  ],
  food: [
    { source: 'bread', target: 'パン' },
    { source: 'water', target: '水' },
    { source: 'coffee', target: 'コーヒー' },
    { source: 'milk', target: '牛乳' },
    { source: 'apple', target: 'りんご' },
    { source: 'cheese', target: 'チーズ' },
  ],
};
