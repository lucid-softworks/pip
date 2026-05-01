export type LanguageTag = string;

export type LocalizedText = {
  text: string;
  language: LanguageTag;
};

export type Direction = 'source-to-target' | 'target-to-source';

export type TranslateTapExercise = {
  kind: 'translate-tap';
  id: string;
  direction: Direction;
  prompt: LocalizedText;
  answer: LocalizedText;
  answerTokens: string[];
  distractors: string[];
  highlightToken?: string;
};

export type Exercise = TranslateTapExercise;

export type Lesson = {
  id: string;
  unitId: string;
  unitName: string;
  title: string;
  sourceLanguage: LanguageTag;
  targetLanguage: LanguageTag;
  estimatedMinutes: number;
  newWordCount: number;
  exercises: Exercise[];
};

export type LessonStub = {
  id: string;
  title: string;
  state: 'done' | 'current' | 'upcoming' | 'story';
  meta?: string;
  premium?: boolean;
};

export type Unit = {
  id: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  lessons: LessonStub[];
};
