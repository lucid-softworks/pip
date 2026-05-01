import type { LanguageContent } from './builders.ts';

// Korean — uses spaces between phrases (eojeol), so tokenization works.
// Greetings use polite -요 forms. Family terms simplified to neutral
// (어머니/아버지 + younger 여동생/남동생) to avoid the male/female-speaker split.
export const korean: LanguageContent = {
  prefix: 'ko',
  source: 'en-US',
  target: 'ko-KR',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: '안녕하세요, 어떻게 지내세요?',
      tokens: ['안녕하세요,', '어떻게', '지내세요?'],
      distractors: ['저는', '잘', '감사합니다', '당신은'],
      highlight: '지내세요?',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: '잘 지내요, 감사합니다.',
      tokens: ['잘', '지내요,', '감사합니다.'],
      distractors: ['아니요', '천만에요', '저는', '괜찮아요'],
      highlight: '지내요,',
    },
    {
      prompt: 'My name is Maria.',
      answer: '제 이름은 마리아예요.',
      tokens: ['제', '이름은', '마리아예요.'],
      distractors: ['당신의', '이름이', '뭐예요', '저는'],
      highlight: '이름은',
    },
    {
      prompt: 'Nice to meet you.',
      answer: '만나서 반가워요.',
      tokens: ['만나서', '반가워요.'],
      distractors: ['안녕히', '가세요', '처음', '뵙겠습니다'],
      highlight: '반가워요.',
    },
    {
      prompt: 'See you tomorrow.',
      answer: '내일 봐요.',
      tokens: ['내일', '봐요.'],
      distractors: ['안녕', '잘가요', '오늘', '나중에'],
      highlight: '내일',
    },
  ],
  numbers: [
    { source: 'one', target: '하나' },
    { source: 'two', target: '둘' },
    { source: 'three', target: '셋' },
    { source: 'four', target: '넷' },
    { source: 'five', target: '다섯' },
    { source: 'six', target: '여섯' },
    { source: 'seven', target: '일곱' },
    { source: 'eight', target: '여덟' },
    { source: 'nine', target: '아홉' },
    { source: 'ten', target: '열' },
  ],
  family: [
    { source: 'mother', target: '어머니' },
    { source: 'father', target: '아버지' },
    { source: 'sister', target: '여동생' },
    { source: 'brother', target: '남동생' },
    { source: 'son', target: '아들' },
    { source: 'daughter', target: '딸' },
  ],
  food: [
    { source: 'bread', target: '빵' },
    { source: 'water', target: '물' },
    { source: 'coffee', target: '커피' },
    { source: 'milk', target: '우유' },
    { source: 'apple', target: '사과' },
    { source: 'cheese', target: '치즈' },
  ],
};
