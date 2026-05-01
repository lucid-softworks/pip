import { type CourseId, type Curriculum, makeCourseId } from '../types.ts';
import { buildCurriculum } from './builders.ts';

import { french } from './fr-FR.ts';
import { spanish } from './es-ES.ts';
import { italian } from './it-IT.ts';
import { german } from './de-DE.ts';
import { portuguese } from './pt-BR.ts';
import { dutch } from './nl-NL.ts';
import { polish } from './pl-PL.ts';
import { russian } from './ru-RU.ts';
import { swedish } from './sv-SE.ts';
import { norwegian } from './nb-NO.ts';
import { greek } from './el-GR.ts';
import { turkish } from './tr-TR.ts';
import { indonesian } from './id-ID.ts';

export const ALL_CURRICULA: Curriculum[] = [
  buildCurriculum(french),
  buildCurriculum(spanish),
  buildCurriculum(italian),
  buildCurriculum(german),
  buildCurriculum(portuguese),
  buildCurriculum(dutch),
  buildCurriculum(polish),
  buildCurriculum(russian),
  buildCurriculum(swedish),
  buildCurriculum(norwegian),
  buildCurriculum(greek),
  buildCurriculum(turkish),
  buildCurriculum(indonesian),
];

export const CURRICULA_BY_ID: Record<CourseId, Curriculum> = Object.fromEntries(
  ALL_CURRICULA.map((c) => [makeCourseId(c.source, c.target), c]),
);
