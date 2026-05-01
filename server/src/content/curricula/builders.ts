import {
  type Curriculum,
  type Exercise,
  type LanguageTag,
  type Lesson,
  type ListenSelectExercise,
  type LocalizedText,
  type MatchPairsExercise,
  type MultipleChoiceExercise,
  type TranslateTapExercise,
  type Unit,
} from '../types.ts';

// ---------- Phrase shapes ----------

/** A full sentence for translate-tap exercises. */
export type SentencePhrase = {
  prompt: string;
  answer: string;
  tokens: string[];
  distractors: string[];
  highlight?: string;
};

/** A short word/expression pair for vocab-style lessons. */
export type VocabPair = {
  source: string;
  target: string;
};

export type LanguageContent = {
  prefix: string;
  source: LanguageTag;
  target: LanguageTag;
  unitName: string;
  greetings: SentencePhrase[];
  numbers: VocabPair[];
  family: VocabPair[];
  food: VocabPair[];
};

// ---------- Helpers ----------

function loc(text: string, language: LanguageTag): LocalizedText {
  return { text, language };
}

function pickDistractors<T>(all: T[], pickIdx: number, n = 3): T[] {
  return all.filter((_, i) => i !== pickIdx).slice(0, n);
}

// ---------- Sentence-based builders (Greetings) ----------

function makeTranslateTap(
  id: string,
  phrase: SentencePhrase,
  source: LanguageTag,
  target: LanguageTag,
): TranslateTapExercise {
  return {
    kind: 'translate-tap',
    id,
    direction: 'source-to-target',
    prompt: loc(phrase.prompt, source),
    answer: loc(phrase.answer, target),
    answerTokens: phrase.tokens,
    distractors: phrase.distractors,
    highlightToken: phrase.highlight,
  };
}

function makeSentenceMC(
  id: string,
  pickIdx: number,
  phrases: SentencePhrase[],
  source: LanguageTag,
  target: LanguageTag,
): MultipleChoiceExercise {
  const pick = phrases[pickIdx];
  const others = pickDistractors(phrases, pickIdx);
  return {
    kind: 'multiple-choice',
    id,
    direction: 'source-to-target',
    prompt: loc(pick.prompt, source),
    correct: loc(pick.answer, target),
    distractors: others.map((p) => loc(p.answer, target)),
  };
}

function makeSentenceListen(
  id: string,
  pickIdx: number,
  phrases: SentencePhrase[],
  source: LanguageTag,
  target: LanguageTag,
): ListenSelectExercise {
  const pick = phrases[pickIdx];
  const others = pickDistractors(phrases, pickIdx);
  return {
    kind: 'listen-select',
    id,
    direction: 'target-to-source',
    audio: loc(pick.answer, target),
    correct: loc(pick.prompt, source),
    distractors: others.map((p) => loc(p.prompt, source)),
  };
}

function makeSentenceMatch(
  id: string,
  idxs: number[],
  phrases: SentencePhrase[],
  source: LanguageTag,
  target: LanguageTag,
): MatchPairsExercise {
  return {
    kind: 'match-pairs',
    id,
    pairs: idxs.map((i) => ({
      source: loc(phrases[i].prompt, source),
      target: loc(phrases[i].answer, target),
    })),
  };
}

// ---------- Vocab-based builders (Numbers/Family/Food) ----------

function makeVocabMC(
  id: string,
  pickIdx: number,
  pairs: VocabPair[],
  source: LanguageTag,
  target: LanguageTag,
): MultipleChoiceExercise {
  const pick = pairs[pickIdx];
  const others = pickDistractors(pairs, pickIdx);
  return {
    kind: 'multiple-choice',
    id,
    direction: 'source-to-target',
    prompt: loc(pick.source, source),
    correct: loc(pick.target, target),
    distractors: others.map((p) => loc(p.target, target)),
  };
}

function makeVocabListen(
  id: string,
  pickIdx: number,
  pairs: VocabPair[],
  source: LanguageTag,
  target: LanguageTag,
): ListenSelectExercise {
  const pick = pairs[pickIdx];
  const others = pickDistractors(pairs, pickIdx);
  return {
    kind: 'listen-select',
    id,
    direction: 'target-to-source',
    audio: loc(pick.target, target),
    correct: loc(pick.source, source),
    distractors: others.map((p) => loc(p.source, source)),
  };
}

function makeVocabMatch(
  id: string,
  idxs: number[],
  pairs: VocabPair[],
  source: LanguageTag,
  target: LanguageTag,
): MatchPairsExercise {
  return {
    kind: 'match-pairs',
    id,
    pairs: idxs.map((i) => ({
      source: loc(pairs[i].source, source),
      target: loc(pairs[i].target, target),
    })),
  };
}

// ---------- Lesson builders ----------

function buildGreetingsLesson(
  prefix: string,
  source: LanguageTag,
  target: LanguageTag,
  phrases: SentencePhrase[],
): Lesson {
  const lessonId = `${prefix}-unit-01-lesson-01-greetings`;
  const exercises: Exercise[] = [
    makeTranslateTap('ex-01', phrases[0], source, target),
    makeSentenceMC('ex-02', 1, phrases, source, target),
    makeSentenceListen('ex-03', 4, phrases, source, target),
    makeSentenceMatch('ex-04', [0, 1, 2, 3], phrases, source, target),
    makeTranslateTap('ex-05', phrases[3], source, target),
  ];
  return {
    id: lessonId,
    unitId: `${prefix}-unit-01`,
    unitName: 'Hello, world',
    title: 'Greetings',
    sourceLanguage: source,
    targetLanguage: target,
    estimatedMinutes: 4,
    newWordCount: 12,
    exercises,
  };
}

function buildNumbersLesson(
  prefix: string,
  source: LanguageTag,
  target: LanguageTag,
  pairs: VocabPair[],
): Lesson {
  // Expects 10 pairs (1-10).
  const lessonId = `${prefix}-unit-01-lesson-02-numbers`;
  const firstHalf = [0, 1, 2, 3, 4];
  const secondHalf = [5, 6, 7, 8, 9];
  const exercises: Exercise[] = [
    makeVocabMatch('ex-01', firstHalf, pairs, source, target),
    makeVocabMC('ex-02', 5, pairs, source, target),
    makeVocabListen('ex-03', 7, pairs, source, target),
    makeVocabMatch('ex-04', secondHalf, pairs, source, target),
    makeVocabMC('ex-05', 9, pairs, source, target),
  ];
  return {
    id: lessonId,
    unitId: `${prefix}-unit-01`,
    unitName: 'Hello, world',
    title: 'Numbers 1–10',
    sourceLanguage: source,
    targetLanguage: target,
    estimatedMinutes: 4,
    newWordCount: 10,
    exercises,
  };
}

function buildFamilyLesson(
  prefix: string,
  source: LanguageTag,
  target: LanguageTag,
  pairs: VocabPair[],
): Lesson {
  // Expects 6 pairs.
  const lessonId = `${prefix}-unit-01-lesson-03-family`;
  const exercises: Exercise[] = [
    makeVocabMatch('ex-01', [0, 1, 2], pairs, source, target),
    makeVocabMC('ex-02', 0, pairs, source, target),
    makeVocabListen('ex-03', 2, pairs, source, target),
    makeVocabMatch('ex-04', [3, 4, 5], pairs, source, target),
    makeVocabMC('ex-05', 3, pairs, source, target),
  ];
  return {
    id: lessonId,
    unitId: `${prefix}-unit-01`,
    unitName: 'Hello, world',
    title: 'Family',
    sourceLanguage: source,
    targetLanguage: target,
    estimatedMinutes: 4,
    newWordCount: 6,
    exercises,
  };
}

function buildFoodLesson(
  prefix: string,
  source: LanguageTag,
  target: LanguageTag,
  pairs: VocabPair[],
): Lesson {
  // Expects 6 pairs.
  const lessonId = `${prefix}-unit-01-lesson-04-food`;
  const exercises: Exercise[] = [
    makeVocabMatch('ex-01', [0, 1, 2], pairs, source, target),
    makeVocabMC('ex-02', 0, pairs, source, target),
    makeVocabListen('ex-03', 1, pairs, source, target),
    makeVocabMatch('ex-04', [3, 4, 5], pairs, source, target),
    makeVocabMC('ex-05', 4, pairs, source, target),
  ];
  return {
    id: lessonId,
    unitId: `${prefix}-unit-01`,
    unitName: 'Hello, world',
    title: 'Food & drink',
    sourceLanguage: source,
    targetLanguage: target,
    estimatedMinutes: 4,
    newWordCount: 6,
    exercises,
  };
}

// ---------- Top-level curriculum builder ----------

export function buildCurriculum(c: LanguageContent): Curriculum {
  const greetings = buildGreetingsLesson(c.prefix, c.source, c.target, c.greetings);
  const numbers = buildNumbersLesson(c.prefix, c.source, c.target, c.numbers);
  const family = buildFamilyLesson(c.prefix, c.source, c.target, c.family);
  const food = buildFoodLesson(c.prefix, c.source, c.target, c.food);

  const unit: Unit = {
    id: `${c.prefix}-unit-01`,
    name: c.unitName,
    level: 'A1',
    lessons: [
      { id: greetings.id, title: greetings.title, state: 'current', meta: '5 exercises · 4 min' },
      { id: numbers.id, title: numbers.title, state: 'upcoming', meta: '10 numbers · 4 min' },
      { id: family.id, title: family.title, state: 'upcoming', meta: '6 words · 4 min' },
      { id: food.id, title: food.title, state: 'upcoming', meta: '6 words · 4 min' },
      {
        id: `${c.prefix}-unit-01-story-01`,
        title: 'Story: First conversation',
        state: 'story',
        meta: 'Bonus story for subscribers',
        premium: true,
      },
    ],
  };

  return {
    source: c.source,
    target: c.target,
    units: [unit],
    lessons: {
      [greetings.id]: greetings,
      [numbers.id]: numbers,
      [family.id]: family,
      [food.id]: food,
    },
  };
}
