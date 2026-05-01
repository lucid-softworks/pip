// Content types — mirror the mobile-side definitions. Kept here so the server
// is the source of truth for the shapes it serves.

export type LanguageTag = string;

export type LanguageMeta = {
  code: LanguageTag;
  name: string;
  flag: string;
};

export type CourseId = string;

export function makeCourseId(source: LanguageTag, target: LanguageTag): CourseId {
  return `${source}:${target}`;
}

export type Course = {
  id: CourseId;
  source: LanguageTag;
  target: LanguageTag;
  available: boolean;
};

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

export type Curriculum = {
  source: LanguageTag;
  target: LanguageTag;
  units: Unit[];
  lessons: Record<string, Lesson>;
};

export type StoryLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type Story = {
  id: string;
  title: string;
  blurb: string;
  language: LanguageTag;
  level: StoryLevel;
  minutes: number;
  thumbColor: 'butter' | 'sky' | 'lilac' | 'moss' | 'berry';
  freeThisWeek?: boolean;
};

export type Manifest = {
  version: string;
  languages: LanguageMeta[];
  courses: Course[];
};
