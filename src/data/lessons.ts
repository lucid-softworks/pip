import type { Lesson, TranslateTapExercise, Unit } from './types';
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

// ---------- Builder ----------

type GreetingExercise = {
  prompt: string;
  answer: string;
  tokens: string[];
  distractors: string[];
  highlight?: string;
};

type GreetingsArgs = {
  prefix: string; // e.g. "fr"
  source: string;
  target: string;
  unitName: string; // e.g. "Hello, world"
  exercises: GreetingExercise[];
};

function makeGreetingsCurriculum({
  prefix,
  source,
  target,
  unitName,
  exercises,
}: GreetingsArgs): Curriculum {
  const lessonId = `${prefix}-unit-01-lesson-01-greetings`;
  const unitId = `${prefix}-unit-01`;

  const exerciseObjs: TranslateTapExercise[] = exercises.map((ex, i) => ({
    kind: 'translate-tap',
    id: `ex-${(i + 1).toString().padStart(2, '0')}`,
    direction: 'source-to-target',
    prompt: { text: ex.prompt, language: source },
    answer: { text: ex.answer, language: target },
    answerTokens: ex.tokens,
    distractors: ex.distractors,
    highlightToken: ex.highlight,
  }));

  const greetings: Lesson = {
    id: lessonId,
    unitId,
    unitName,
    title: 'Greetings',
    sourceLanguage: source,
    targetLanguage: target,
    estimatedMinutes: 3,
    newWordCount: exerciseObjs.length * 3,
    exercises: exerciseObjs,
  };

  return {
    source,
    target,
    units: [
      {
        id: unitId,
        name: unitName,
        level: 'A1',
        lessons: [
          { id: lessonId, title: 'Greetings', state: 'current' },
          { id: `${prefix}-unit-01-lesson-02`, title: 'Numbers 1–20', state: 'upcoming', meta: '20 words' },
          { id: `${prefix}-unit-01-lesson-03`, title: 'Family & friends', state: 'upcoming', meta: '5 lessons' },
          { id: `${prefix}-unit-01-lesson-04`, title: 'Food & drink', state: 'upcoming', meta: '5 lessons' },
          {
            id: `${prefix}-unit-01-story-01`,
            title: 'Story: First conversation',
            state: 'story',
            meta: 'Bonus story for subscribers',
            premium: true,
          },
        ],
      },
    ],
    lessons: { [lessonId]: greetings },
  };
}

// ---------- Curricula ----------

const french = makeGreetingsCurriculum({
  prefix: 'fr',
  source: 'en-US',
  target: 'fr-FR',
  unitName: 'Hello, world',
  exercises: [
    {
      prompt: 'Hello, how are you?',
      answer: 'Bonjour, comment ça va ?',
      tokens: ['Bonjour,', 'comment', 'ça', 'va', '?'],
      distractors: ['salut', 'tu', 'es', 'bien'],
      highlight: 'ça',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'Je vais bien, merci.',
      tokens: ['Je', 'vais', 'bien,', 'merci.'],
      distractors: ['suis', 'tu', "s'il", 'plaît', 'très'],
      highlight: 'vais',
    },
    {
      prompt: 'My name is Marie.',
      answer: "Je m'appelle Marie.",
      tokens: ['Je', "m'appelle", 'Marie.'],
      distractors: ['suis', 'mon', 'nom', 'tu', "t'appelles"],
      highlight: "m'appelle",
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'Enchantée de te rencontrer.',
      tokens: ['Enchantée', 'de', 'te', 'rencontrer.'],
      distractors: ['très', 'bien', 'je', 'vois', 'salut'],
      highlight: 'Enchantée',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'À demain.',
      tokens: ['À', 'demain.'],
      distractors: ['au', 'revoir', 'bientôt', 'plus', 'tard'],
      highlight: 'À',
    },
  ],
});

const spanish = makeGreetingsCurriculum({
  prefix: 'es',
  source: 'en-US',
  target: 'es-ES',
  unitName: 'Hello, world',
  exercises: [
    {
      prompt: 'Hello, how are you?',
      answer: '¿Hola, cómo estás?',
      tokens: ['¿Hola,', 'cómo', 'estás?'],
      distractors: ['adiós', 'tú', 'soy', 'bien', 'qué'],
      highlight: 'estás?',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'Estoy bien, gracias.',
      tokens: ['Estoy', 'bien,', 'gracias.'],
      distractors: ['soy', 'tú', 'por', 'favor', 'muy'],
      highlight: 'Estoy',
    },
    {
      prompt: 'My name is María.',
      answer: 'Me llamo María.',
      tokens: ['Me', 'llamo', 'María.'],
      distractors: ['mi', 'nombre', 'es', 'tú', 'te'],
      highlight: 'llamo',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'Mucho gusto.',
      tokens: ['Mucho', 'gusto.'],
      distractors: ['muy', 'bien', 'encantado', 'mucha', 'pena'],
      highlight: 'Mucho',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'Hasta mañana.',
      tokens: ['Hasta', 'mañana.'],
      distractors: ['adiós', 'pronto', 'luego', 'siempre'],
      highlight: 'Hasta',
    },
  ],
});

const italian = makeGreetingsCurriculum({
  prefix: 'it',
  source: 'en-US',
  target: 'it-IT',
  unitName: 'Hello, world',
  exercises: [
    {
      prompt: 'Hello, how are you?',
      answer: 'Ciao, come stai?',
      tokens: ['Ciao,', 'come', 'stai?'],
      distractors: ['salve', 'tu', 'sei', 'bene', 'molto'],
      highlight: 'stai?',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'Sto bene, grazie.',
      tokens: ['Sto', 'bene,', 'grazie.'],
      distractors: ['sono', 'tu', 'molto', 'prego', 'come'],
      highlight: 'Sto',
    },
    {
      prompt: 'My name is Maria.',
      answer: 'Mi chiamo Maria.',
      tokens: ['Mi', 'chiamo', 'Maria.'],
      distractors: ['nome', 'sono', 'ti', 'chiami', 'mio'],
      highlight: 'chiamo',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'Piacere di conoscerti.',
      tokens: ['Piacere', 'di', 'conoscerti.'],
      distractors: ['molto', 'bene', 'salve', 'ciao', 'incontrare'],
      highlight: 'Piacere',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'A domani.',
      tokens: ['A', 'domani.'],
      distractors: ['arrivederci', 'più', 'tardi', 'presto'],
      highlight: 'A',
    },
  ],
});

const german = makeGreetingsCurriculum({
  prefix: 'de',
  source: 'en-US',
  target: 'de-DE',
  unitName: 'Hello, world',
  exercises: [
    {
      prompt: 'Hello, how are you?',
      answer: 'Hallo, wie geht es dir?',
      tokens: ['Hallo,', 'wie', 'geht', 'es', 'dir?'],
      distractors: ['Tag', 'mir', 'ist', 'du', 'gut'],
      highlight: 'geht',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'Mir geht es gut, danke.',
      tokens: ['Mir', 'geht', 'es', 'gut,', 'danke.'],
      distractors: ['dir', 'ist', 'sehr', 'bitte', 'auch'],
      highlight: 'gut,',
    },
    {
      prompt: 'My name is Marie.',
      answer: 'Ich heiße Marie.',
      tokens: ['Ich', 'heiße', 'Marie.'],
      distractors: ['bin', 'mein', 'Name', 'du', 'heißt'],
      highlight: 'heiße',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'Freut mich.',
      tokens: ['Freut', 'mich.'],
      distractors: ['dich', 'sehr', 'gut', 'angenehm', 'kennen'],
      highlight: 'Freut',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'Bis morgen.',
      tokens: ['Bis', 'morgen.'],
      distractors: ['heute', 'gleich', 'später', 'bald', 'tschüss'],
      highlight: 'Bis',
    },
  ],
});

const portuguese = makeGreetingsCurriculum({
  prefix: 'pt',
  source: 'en-US',
  target: 'pt-BR',
  unitName: 'Hello, world',
  exercises: [
    {
      prompt: 'Hello, how are you?',
      answer: 'Olá, como vai você?',
      tokens: ['Olá,', 'como', 'vai', 'você?'],
      distractors: ['oi', 'eu', 'estou', 'bem', 'tudo'],
      highlight: 'vai',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'Estou bem, obrigada.',
      tokens: ['Estou', 'bem,', 'obrigada.'],
      distractors: ['sou', 'você', 'muito', 'por', 'favor'],
      highlight: 'obrigada.',
    },
    {
      prompt: 'My name is Maria.',
      answer: 'Meu nome é Maria.',
      tokens: ['Meu', 'nome', 'é', 'Maria.'],
      distractors: ['eu', 'sou', 'chamo', 'seu', 'nome'],
      highlight: 'nome',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'Prazer em conhecê-la.',
      tokens: ['Prazer', 'em', 'conhecê-la.'],
      distractors: ['muito', 'bem', 'oi', 'tudo', 'gosto'],
      highlight: 'Prazer',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'Até amanhã.',
      tokens: ['Até', 'amanhã.'],
      distractors: ['logo', 'depois', 'tchau', 'breve'],
      highlight: 'Até',
    },
  ],
});

const dutch = makeGreetingsCurriculum({
  prefix: 'nl',
  source: 'en-US',
  target: 'nl-NL',
  unitName: 'Hello, world',
  exercises: [
    {
      prompt: 'Hello, how are you?',
      answer: 'Hallo, hoe gaat het met je?',
      tokens: ['Hallo,', 'hoe', 'gaat', 'het', 'met', 'je?'],
      distractors: ['ik', 'goed', 'jij', 'ben', 'mij'],
      highlight: 'gaat',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'Het gaat goed, dank je.',
      tokens: ['Het', 'gaat', 'goed,', 'dank', 'je.'],
      distractors: ['ik', 'ben', 'graag', 'gedaan', 'jij'],
      highlight: 'goed,',
    },
    {
      prompt: 'My name is Marie.',
      answer: 'Ik heet Marie.',
      tokens: ['Ik', 'heet', 'Marie.'],
      distractors: ['ben', 'mijn', 'naam', 'jij', 'heeft'],
      highlight: 'heet',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'Aangenaam.',
      tokens: ['Aangenaam.'],
      distractors: ['leuk', 'fijn', 'mooi', 'goed', 'hallo'],
      highlight: 'Aangenaam.',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'Tot morgen.',
      tokens: ['Tot', 'morgen.'],
      distractors: ['ziens', 'snel', 'later', 'doei'],
      highlight: 'Tot',
    },
  ],
});

const polish = makeGreetingsCurriculum({
  prefix: 'pl',
  source: 'en-US',
  target: 'pl-PL',
  unitName: 'Hello, world',
  exercises: [
    {
      prompt: 'Hello, how are you?',
      answer: 'Cześć, jak się masz?',
      tokens: ['Cześć,', 'jak', 'się', 'masz?'],
      distractors: ['dzień', 'dobry', 'jestem', 'dobrze'],
      highlight: 'masz?',
    },
    {
      prompt: "I'm fine, thank you.",
      answer: 'Mam się dobrze, dziękuję.',
      tokens: ['Mam', 'się', 'dobrze,', 'dziękuję.'],
      distractors: ['proszę', 'bardzo', 'jestem', 'tak'],
      highlight: 'dobrze,',
    },
    {
      prompt: 'My name is Maria.',
      answer: 'Mam na imię Maria.',
      tokens: ['Mam', 'na', 'imię', 'Maria.'],
      distractors: ['jestem', 'mi', 'nazywam', 'twoje', 'się'],
      highlight: 'imię',
    },
    {
      prompt: 'Nice to meet you.',
      answer: 'Miło mi cię poznać.',
      tokens: ['Miło', 'mi', 'cię', 'poznać.'],
      distractors: ['bardzo', 'dobrze', 'witam', 'spotkać'],
      highlight: 'Miło',
    },
    {
      prompt: 'See you tomorrow.',
      answer: 'Do jutra.',
      tokens: ['Do', 'jutra.'],
      distractors: ['widzenia', 'później', 'wkrótce', 'pa'],
      highlight: 'jutra.',
    },
  ],
});

// ---------- Registry ----------

const ALL_CURRICULA: Curriculum[] = [french, spanish, italian, german, portuguese, dutch, polish];

const CURRICULA: Record<CourseId, Curriculum> = Object.fromEntries(
  ALL_CURRICULA.map((c) => [makeCourseId(c.source, c.target), c]),
);

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
