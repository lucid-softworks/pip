import type { LanguageContent } from './builders.ts';

// Arabic (Modern Standard / Fusha). Native review encouraged — regional
// dialects (Egyptian, Levantine, Gulf, Maghrebi) differ noticeably from MSA
// for casual greetings. Right-to-left; RN handles bidi rendering.
export const arabic: LanguageContent = {
  prefix: 'ar',
  source: 'en-US',
  target: 'ar-SA',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: 'مرحبا، كيف حالك؟',
      tokens: ['مرحبا،', 'كيف', 'حالك؟'],
      distractors: ['أهلا', 'أنا', 'بخير', 'أنت'],
      highlight: 'حالك؟',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'أنا بخير، شكرا.',
      tokens: ['أنا', 'بخير،', 'شكرا.'],
      distractors: ['من', 'فضلك', 'جدا', 'أنت'],
      highlight: 'بخير،',
    },
    {
      prompt: 'My name is Maria.',
      answer: 'اسمي ماريا.',
      tokens: ['اسمي', 'ماريا.'],
      distractors: ['أنا', 'اسمك', 'هو', 'ما'],
      highlight: 'اسمي',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'تشرفت بلقائك.',
      tokens: ['تشرفت', 'بلقائك.'],
      distractors: ['أهلا', 'مرحبا', 'جدا', 'سعيد'],
      highlight: 'تشرفت',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'أراك غدا.',
      tokens: ['أراك', 'غدا.'],
      distractors: ['مع', 'السلامة', 'قريبا', 'اليوم'],
      highlight: 'غدا.',
    },
  ],
  numbers: [
    { source: 'one', target: 'واحد' },
    { source: 'two', target: 'اثنان' },
    { source: 'three', target: 'ثلاثة' },
    { source: 'four', target: 'أربعة' },
    { source: 'five', target: 'خمسة' },
    { source: 'six', target: 'ستة' },
    { source: 'seven', target: 'سبعة' },
    { source: 'eight', target: 'ثمانية' },
    { source: 'nine', target: 'تسعة' },
    { source: 'ten', target: 'عشرة' },
  ],
  family: [
    { source: 'mother', target: 'أم' },
    { source: 'father', target: 'أب' },
    { source: 'sister', target: 'أخت' },
    { source: 'brother', target: 'أخ' },
    { source: 'son', target: 'ابن' },
    { source: 'daughter', target: 'ابنة' },
  ],
  food: [
    { source: 'bread', target: 'خبز' },
    { source: 'water', target: 'ماء' },
    { source: 'coffee', target: 'قهوة' },
    { source: 'milk', target: 'حليب' },
    { source: 'apple', target: 'تفاحة' },
    { source: 'cheese', target: 'جبن' },
  ],
};
