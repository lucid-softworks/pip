import { type CourseId, type Curriculum, makeCourseId } from '../types.ts';
import { buildCurriculum } from './builders.ts';

import { french } from './fr-FR.ts';
import { spanish } from './es-ES.ts';
import { spanishLatam } from './es-MX.ts';
import { italian } from './it-IT.ts';
import { german } from './de-DE.ts';
import { portuguese } from './pt-BR.ts';
import { portuguesePT } from './pt-PT.ts';
import { dutch } from './nl-NL.ts';
import { polish } from './pl-PL.ts';
import { russian } from './ru-RU.ts';
import { ukrainian } from './uk-UA.ts';
import { swedish } from './sv-SE.ts';
import { norwegian } from './nb-NO.ts';
import { danish } from './da-DK.ts';
import { finnish } from './fi-FI.ts';
import { greek } from './el-GR.ts';
import { turkish } from './tr-TR.ts';
import { czech } from './cs-CZ.ts';
import { romanian } from './ro-RO.ts';
import { hungarian } from './hu-HU.ts';
import { catalan } from './ca-ES.ts';
import { welsh } from './cy-GB.ts';
import { irish } from './ga-IE.ts';
import { indonesian } from './id-ID.ts';
import { vietnamese } from './vi-VN.ts';
import { thai } from './th-TH.ts';
import { hindi } from './hi-IN.ts';
import { hebrew } from './he-IL.ts';
import { arabic } from './ar-SA.ts';
import { japanese } from './ja-JP.ts';
import { korean } from './ko-KR.ts';
import { mandarinSimplified } from './zh-CN.ts';
import { mandarinTraditional } from './zh-TW.ts';
import { cantonese } from './yue-HK.ts';

export const ALL_CURRICULA: Curriculum[] = [
  // Romance
  buildCurriculum(french),
  buildCurriculum(spanish),
  buildCurriculum(spanishLatam),
  buildCurriculum(italian),
  buildCurriculum(portuguese),
  buildCurriculum(portuguesePT),
  buildCurriculum(romanian),
  buildCurriculum(catalan),
  // Germanic
  buildCurriculum(german),
  buildCurriculum(dutch),
  buildCurriculum(swedish),
  buildCurriculum(norwegian),
  buildCurriculum(danish),
  // Slavic + Baltic
  buildCurriculum(polish),
  buildCurriculum(russian),
  buildCurriculum(ukrainian),
  buildCurriculum(czech),
  // Other European
  buildCurriculum(greek),
  buildCurriculum(turkish),
  buildCurriculum(hungarian),
  buildCurriculum(finnish),
  buildCurriculum(welsh),
  buildCurriculum(irish),
  // Asian
  buildCurriculum(indonesian),
  buildCurriculum(vietnamese),
  buildCurriculum(thai),
  buildCurriculum(hindi),
  buildCurriculum(japanese),
  buildCurriculum(korean),
  buildCurriculum(mandarinSimplified),
  buildCurriculum(mandarinTraditional),
  buildCurriculum(cantonese),
  // Middle East
  buildCurriculum(hebrew),
  buildCurriculum(arabic),
];

export const CURRICULA_BY_ID: Record<CourseId, Curriculum> = Object.fromEntries(
  ALL_CURRICULA.map((c) => [makeCourseId(c.source, c.target), c]),
);
