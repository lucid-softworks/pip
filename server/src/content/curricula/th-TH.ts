import type { LanguageContent } from './builders.ts';

// Thai. No word spaces — tokens are full phrases. Polite particles are
// dropped here for brevity; expand as later units are written.
export const thai: LanguageContent = {
  prefix: 'th',
  source: 'en-US',
  target: 'th-TH',
  unitName: 'Hello, world',
  greetings: [
    {
      prompt: 'Hello, how are you?',
      answer: 'สวัสดี, สบายดีไหม?',
      tokens: ['สวัสดี,', 'สบายดีไหม?'],
      distractors: ['ลาก่อน', 'ฉัน', 'สบายดี', 'ขอบคุณ'],
      highlight: 'สบายดีไหม?',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'สบายดี, ขอบคุณ.',
      tokens: ['สบายดี,', 'ขอบคุณ.'],
      distractors: ['ไม่เป็นไร', 'มาก', 'คุณ', 'สวัสดี'],
      highlight: 'ขอบคุณ.',
    },
    {
      prompt: 'My name is Maria.',
      answer: 'ฉันชื่อมาเรีย.',
      tokens: ['ฉันชื่อ', 'มาเรีย.'],
      distractors: ['คุณ', 'ชื่อ', 'อะไร', 'ฉัน'],
      highlight: 'ฉันชื่อ',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'ยินดีที่ได้รู้จัก.',
      tokens: ['ยินดีที่ได้รู้จัก.'],
      distractors: ['สวัสดี', 'ขอบคุณ', 'ลาก่อน', 'ดี'],
      highlight: 'ยินดีที่ได้รู้จัก.',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'แล้วพบกันพรุ่งนี้.',
      tokens: ['แล้วพบกัน', 'พรุ่งนี้.'],
      distractors: ['ลาก่อน', 'วันนี้', 'เร็วๆ นี้', 'ทีหลัง'],
      highlight: 'พรุ่งนี้.',
    },
  ],
  numbers: [
    { source: 'one', target: 'หนึ่ง' },
    { source: 'two', target: 'สอง' },
    { source: 'three', target: 'สาม' },
    { source: 'four', target: 'สี่' },
    { source: 'five', target: 'ห้า' },
    { source: 'six', target: 'หก' },
    { source: 'seven', target: 'เจ็ด' },
    { source: 'eight', target: 'แปด' },
    { source: 'nine', target: 'เก้า' },
    { source: 'ten', target: 'สิบ' },
  ],
  family: [
    { source: 'mother', target: 'แม่' },
    { source: 'father', target: 'พ่อ' },
    { source: 'sister', target: 'พี่สาว' },
    { source: 'brother', target: 'พี่ชาย' },
    { source: 'son', target: 'ลูกชาย' },
    { source: 'daughter', target: 'ลูกสาว' },
  ],
  food: [
    { source: 'bread', target: 'ขนมปัง' },
    { source: 'water', target: 'น้ำ' },
    { source: 'coffee', target: 'กาแฟ' },
    { source: 'milk', target: 'นม' },
    { source: 'apple', target: 'แอปเปิ้ล' },
    { source: 'cheese', target: 'ชีส' },
  ],
};
