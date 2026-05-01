import type { Lesson, Unit } from './types';
import {
  type Course,
  type CourseId,
  LANGUAGES,
  makeCourseId,
} from './courses';

type Curriculum = {
  source: string;
  target: string;
  units: Unit[];
  lessons: Record<string, Lesson>;
};

// ---------- French (en-US -> fr-FR) ----------

const greetingsFr: Lesson = {
  id: 'fr-unit-01-lesson-01-greetings',
  unitId: 'fr-unit-01',
  unitName: 'Hello, world',
  title: 'Greetings',
  sourceLanguage: 'en-US',
  targetLanguage: 'fr-FR',
  estimatedMinutes: 3,
  newWordCount: 12,
  exercises: [
    {
      kind: 'translate-tap',
      id: 'ex-01',
      direction: 'source-to-target',
      prompt: { text: 'Hello, how are you?', language: 'en-US' },
      answer: { text: 'Bonjour, comment ça va ?', language: 'fr-FR' },
      answerTokens: ['Bonjour,', 'comment', 'ça', 'va', '?'],
      distractors: ['salut', 'tu', 'es', 'bien'],
      highlightToken: 'ça',
    },
    {
      kind: 'translate-tap',
      id: 'ex-02',
      direction: 'source-to-target',
      prompt: { text: "I'm fine, thank you.", language: 'en-US' },
      answer: { text: 'Je vais bien, merci.', language: 'fr-FR' },
      answerTokens: ['Je', 'vais', 'bien,', 'merci.'],
      distractors: ['suis', 'tu', "s'il", 'plaît', 'très'],
      highlightToken: 'vais',
    },
    {
      kind: 'translate-tap',
      id: 'ex-03',
      direction: 'source-to-target',
      prompt: { text: 'My name is Marie.', language: 'en-US' },
      answer: { text: "Je m'appelle Marie.", language: 'fr-FR' },
      answerTokens: ['Je', "m'appelle", 'Marie.'],
      distractors: ['suis', 'mon', 'nom', 'tu', "t'appelles"],
      highlightToken: "m'appelle",
    },
    {
      kind: 'translate-tap',
      id: 'ex-04',
      direction: 'source-to-target',
      prompt: { text: 'Nice to meet you.', language: 'en-US' },
      answer: { text: 'Enchantée de te rencontrer.', language: 'fr-FR' },
      answerTokens: ['Enchantée', 'de', 'te', 'rencontrer.'],
      distractors: ['très', 'bien', 'je', 'vois', 'salut'],
      highlightToken: 'Enchantée',
    },
    {
      kind: 'translate-tap',
      id: 'ex-05',
      direction: 'source-to-target',
      prompt: { text: 'See you tomorrow.', language: 'en-US' },
      answer: { text: 'À demain.', language: 'fr-FR' },
      answerTokens: ['À', 'demain.'],
      distractors: ['au', 'revoir', 'bientôt', 'plus', 'tard'],
      highlightToken: 'À',
    },
  ],
};

const frenchCurriculum: Curriculum = {
  source: 'en-US',
  target: 'fr-FR',
  units: [
    {
      id: 'fr-unit-01',
      name: 'Hello, world',
      level: 'A1',
      lessons: [
        { id: greetingsFr.id, title: 'Greetings', state: 'current' },
        { id: 'fr-unit-01-lesson-02', title: 'Numbers 1–20', state: 'upcoming', meta: '20 words' },
        { id: 'fr-unit-01-lesson-03', title: 'Family & friends', state: 'upcoming', meta: '5 lessons' },
        { id: 'fr-unit-01-lesson-04', title: 'Food & drink', state: 'upcoming', meta: '5 lessons' },
        {
          id: 'fr-unit-01-story-01',
          title: 'Story: At the bakery',
          state: 'story',
          meta: 'Bonus story for subscribers',
          premium: true,
        },
      ],
    },
  ],
  lessons: { [greetingsFr.id]: greetingsFr },
};

// ---------- Spanish (en-US -> es-ES) ----------

const greetingsEs: Lesson = {
  id: 'es-unit-01-lesson-01-greetings',
  unitId: 'es-unit-01',
  unitName: 'Hello, world',
  title: 'Greetings',
  sourceLanguage: 'en-US',
  targetLanguage: 'es-ES',
  estimatedMinutes: 3,
  newWordCount: 12,
  exercises: [
    {
      kind: 'translate-tap',
      id: 'ex-01',
      direction: 'source-to-target',
      prompt: { text: 'Hello, how are you?', language: 'en-US' },
      answer: { text: '¿Hola, cómo estás?', language: 'es-ES' },
      answerTokens: ['¿Hola,', 'cómo', 'estás?'],
      distractors: ['adiós', 'tú', 'soy', 'bien', 'qué'],
      highlightToken: 'estás?',
    },
    {
      kind: 'translate-tap',
      id: 'ex-02',
      direction: 'source-to-target',
      prompt: { text: "I'm fine, thank you.", language: 'en-US' },
      answer: { text: 'Estoy bien, gracias.', language: 'es-ES' },
      answerTokens: ['Estoy', 'bien,', 'gracias.'],
      distractors: ['soy', 'tú', 'por', 'favor', 'muy'],
      highlightToken: 'Estoy',
    },
    {
      kind: 'translate-tap',
      id: 'ex-03',
      direction: 'source-to-target',
      prompt: { text: 'My name is María.', language: 'en-US' },
      answer: { text: 'Me llamo María.', language: 'es-ES' },
      answerTokens: ['Me', 'llamo', 'María.'],
      distractors: ['mi', 'nombre', 'es', 'tú', 'te'],
      highlightToken: 'llamo',
    },
    {
      kind: 'translate-tap',
      id: 'ex-04',
      direction: 'source-to-target',
      prompt: { text: 'Nice to meet you.', language: 'en-US' },
      answer: { text: 'Mucho gusto.', language: 'es-ES' },
      answerTokens: ['Mucho', 'gusto.'],
      distractors: ['muy', 'bien', 'encantado', 'mucha', 'pena'],
      highlightToken: 'Mucho',
    },
    {
      kind: 'translate-tap',
      id: 'ex-05',
      direction: 'source-to-target',
      prompt: { text: 'See you tomorrow.', language: 'en-US' },
      answer: { text: 'Hasta mañana.', language: 'es-ES' },
      answerTokens: ['Hasta', 'mañana.'],
      distractors: ['adiós', 'pronto', 'luego', 'siempre'],
      highlightToken: 'Hasta',
    },
  ],
};

const spanishCurriculum: Curriculum = {
  source: 'en-US',
  target: 'es-ES',
  units: [
    {
      id: 'es-unit-01',
      name: 'Hello, world',
      level: 'A1',
      lessons: [
        { id: greetingsEs.id, title: 'Greetings', state: 'current' },
        { id: 'es-unit-01-lesson-02', title: 'Numbers 1–20', state: 'upcoming', meta: '20 words' },
        { id: 'es-unit-01-lesson-03', title: 'Family & friends', state: 'upcoming', meta: '5 lessons' },
        { id: 'es-unit-01-lesson-04', title: 'Food & drink', state: 'upcoming', meta: '5 lessons' },
        {
          id: 'es-unit-01-story-01',
          title: 'Story: At the market',
          state: 'story',
          meta: 'Bonus story for subscribers',
          premium: true,
        },
      ],
    },
  ],
  lessons: { [greetingsEs.id]: greetingsEs },
};

// ---------- Registry ----------

const CURRICULA: Record<CourseId, Curriculum> = {
  [makeCourseId(frenchCurriculum.source, frenchCurriculum.target)]: frenchCurriculum,
  [makeCourseId(spanishCurriculum.source, spanishCurriculum.target)]: spanishCurriculum,
};

const POSSIBLE_TARGETS = LANGUAGES.filter((l) => l.code !== 'en-US').map((l) => l.code);

export async function loadUnitsForCourse(id: CourseId): Promise<Unit[]> {
  return CURRICULA[id]?.units ?? [];
}

export async function loadLesson(id: string): Promise<Lesson | null> {
  for (const c of Object.values(CURRICULA)) {
    const lesson = c.lessons[id];
    if (lesson) return lesson;
  }
  return null;
}

export async function loadCourses(source = 'en-US'): Promise<Course[]> {
  return POSSIBLE_TARGETS.map((target) => {
    const id = makeCourseId(source, target);
    return {
      id,
      source,
      target,
      available: !!CURRICULA[id],
    };
  });
}
