import { Elysia, t } from 'elysia';
import { LANGUAGES } from '../content/languages.ts';
import { CURRICULA_BY_ID } from '../content/curricula/index.ts';
import { STORIES } from '../content/stories.ts';
import { type Course, makeCourseId } from '../content/types.ts';

// Pip's content "version" — bumps every server boot. Clients can compare to
// decide whether their cached content is stale. For now it's just a timestamp.
const CONTENT_VERSION = new Date().toISOString();

const COURSES: Course[] = LANGUAGES.filter((l) => l.code !== 'en-US').map((target) => {
  const id = makeCourseId('en-US', target.code);
  return {
    id,
    source: 'en-US',
    target: target.code,
    available: !!CURRICULA_BY_ID[id],
  };
});

export const contentRoutes = new Elysia({ prefix: '/api/content' })
  .get('/manifest', () => ({
    version: CONTENT_VERSION,
    languages: LANGUAGES,
    courses: COURSES,
  }))
  .get(
    '/curriculum/:courseId',
    ({ params, set }) => {
      const curriculum = CURRICULA_BY_ID[params.courseId];
      if (!curriculum) {
        set.status = 404;
        return { error: 'curriculum-not-found' };
      }
      return curriculum;
    },
    {
      params: t.Object({ courseId: t.String() }),
    },
  )
  .get(
    '/stories',
    ({ query }) => {
      const lang = query.language;
      if (!lang) return { stories: STORIES };
      return { stories: STORIES.filter((s) => s.language === lang) };
    },
    {
      query: t.Object({ language: t.Optional(t.String()) }),
    },
  );
