import { Elysia, t } from 'elysia';
import { and, eq, isNotNull } from 'drizzle-orm';
import { auth } from '../auth.ts';
import { db } from '../db/index.ts';
import { enrollment, lessonProgress, userProfile } from '../db/schema.ts';
import { CURRICULA_BY_ID } from '../content/curricula/index.ts';
import { type Lesson, makeCourseId } from '../content/types.ts';

type SessionUser = {
  id: string;
  email: string;
  name: string;
};

async function getUser(request: Request): Promise<SessionUser | null> {
  const result = await auth.api.getSession({ headers: request.headers });
  return result?.user ?? null;
}

// Index every lesson by id once at boot. Used for stats lookups so we can
// translate a completed lessonId into newWordCount / estimatedMinutes / title.
const LESSONS_BY_ID = new Map<string, Lesson & { courseId: string }>();
for (const c of Object.values(CURRICULA_BY_ID)) {
  const courseId = makeCourseId(c.source, c.target);
  for (const [id, l] of Object.entries(c.lessons)) {
    LESSONS_BY_ID.set(id, { ...l, courseId });
  }
}

async function getStateFor(userId: string) {
  const [profileRow] = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1);

  const enrollments = await db
    .select()
    .from(enrollment)
    .where(eq(enrollment.userId, userId));

  const progress = await db
    .select()
    .from(lessonProgress)
    .where(eq(lessonProgress.userId, userId));

  return {
    profile: profileRow ?? null,
    enrollments: enrollments.map((e) => ({
      courseId: e.courseId,
      enrolledAt: e.enrolledAt,
    })),
    progress: progress.map((p) => ({
      lessonId: p.lessonId,
      completedExercises: p.completedExercises,
      totalExercises: p.totalExercises,
      completedAt: p.completedAt,
      updatedAt: p.updatedAt,
    })),
  };
}

export const stateRoutes = new Elysia({ prefix: '/api/me' })
  .get('/', async ({ request, set }) => {
    const user = await getUser(request);
    if (!user) {
      set.status = 401;
      return { error: 'unauthorized' };
    }
    return { user };
  })
  .get('/state', async ({ request, set }) => {
    const user = await getUser(request);
    if (!user) {
      set.status = 401;
      return { error: 'unauthorized' };
    }
    return await getStateFor(user.id);
  })
  .get('/stats', async ({ request, set }) => {
    const user = await getUser(request);
    if (!user) {
      set.status = 401;
      return { error: 'unauthorized' };
    }

    const completed = await db
      .select()
      .from(lessonProgress)
      .where(
        and(eq(lessonProgress.userId, user.id), isNotNull(lessonProgress.completedAt)),
      );

    const weekAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
    let wordsKnown = 0;
    let minutesThisWeek = 0;
    const daysThisWeek = new Set<string>();
    type RecentRow = {
      lessonId: string;
      title: string;
      courseId: string;
      completedAt: string;
    };
    const recent: RecentRow[] = [];

    for (const p of completed) {
      const lesson = LESSONS_BY_ID.get(p.lessonId);
      if (!lesson || !p.completedAt) continue;
      wordsKnown += lesson.newWordCount;
      const completedAt = p.completedAt;
      if (completedAt.getTime() > weekAgoMs) {
        minutesThisWeek += lesson.estimatedMinutes;
        daysThisWeek.add(completedAt.toISOString().slice(0, 10));
      }
      recent.push({
        lessonId: p.lessonId,
        title: lesson.title,
        courseId: lesson.courseId,
        completedAt: completedAt.toISOString(),
      });
    }

    recent.sort((a, b) => b.completedAt.localeCompare(a.completedAt));

    return {
      wordsKnown,
      minutesThisWeek,
      daysActiveThisWeek: daysThisWeek.size,
      recentLessons: recent.slice(0, 5),
    };
  })
  .put(
    '/profile',
    async ({ request, set, body }) => {
      const user = await getUser(request);
      if (!user) {
        set.status = 401;
        return { error: 'unauthorized' };
      }
      const patch = {
        ...(body.preferredName !== undefined && { preferredName: body.preferredName }),
        ...(body.dailyMinutesGoal !== undefined && { dailyMinutesGoal: body.dailyMinutesGoal }),
        ...(body.activeCourseId !== undefined && { activeCourseId: body.activeCourseId }),
        ...(body.reduceMotion !== undefined && { reduceMotion: body.reduceMotion }),
        ...(body.slowSpeech !== undefined && { slowSpeech: body.slowSpeech }),
        ...(body.hapticFeedback !== undefined && { hapticFeedback: body.hapticFeedback }),
        ...(body.uiLocale !== undefined && { uiLocale: body.uiLocale }),
      };
      const [row] = await db
        .insert(userProfile)
        .values({ userId: user.id, ...patch })
        .onConflictDoUpdate({
          target: userProfile.userId,
          set: { ...patch, updatedAt: new Date() },
        })
        .returning();
      return { profile: row };
    },
    {
      body: t.Object({
        preferredName: t.Optional(t.String()),
        dailyMinutesGoal: t.Optional(t.Integer({ minimum: 0, maximum: 24 * 60 })),
        activeCourseId: t.Optional(t.String()),
        reduceMotion: t.Optional(t.Boolean()),
        slowSpeech: t.Optional(t.Boolean()),
        hapticFeedback: t.Optional(t.Boolean()),
        uiLocale: t.Optional(t.String()),
      }),
    },
  )
  .post(
    '/enrollments',
    async ({ request, set, body }) => {
      const user = await getUser(request);
      if (!user) {
        set.status = 401;
        return { error: 'unauthorized' };
      }
      const [row] = await db
        .insert(enrollment)
        .values({ userId: user.id, courseId: body.courseId })
        .onConflictDoNothing({ target: [enrollment.userId, enrollment.courseId] })
        .returning();
      // If onConflictDoNothing matched, returning() yields nothing — fetch it.
      const final =
        row ??
        (await db
          .select()
          .from(enrollment)
          .where(eq(enrollment.userId, user.id))
          .then((rows) => rows.find((r) => r.courseId === body.courseId)));
      return {
        enrollment: final
          ? { courseId: final.courseId, enrolledAt: final.enrolledAt }
          : null,
      };
    },
    {
      body: t.Object({
        courseId: t.String(),
      }),
    },
  )
  .put(
    '/progress',
    async ({ request, set, body }) => {
      const user = await getUser(request);
      if (!user) {
        set.status = 401;
        return { error: 'unauthorized' };
      }
      const completedAt = body.completed ? new Date() : null;
      const [row] = await db
        .insert(lessonProgress)
        .values({
          userId: user.id,
          lessonId: body.lessonId,
          completedExercises: body.completedExercises,
          totalExercises: body.totalExercises,
          completedAt,
        })
        .onConflictDoUpdate({
          target: [lessonProgress.userId, lessonProgress.lessonId],
          set: {
            completedExercises: body.completedExercises,
            totalExercises: body.totalExercises,
            ...(body.completed && { completedAt }),
            updatedAt: new Date(),
          },
        })
        .returning();
      return {
        progress: {
          lessonId: row.lessonId,
          completedExercises: row.completedExercises,
          totalExercises: row.totalExercises,
          completedAt: row.completedAt,
          updatedAt: row.updatedAt,
        },
      };
    },
    {
      body: t.Object({
        lessonId: t.String(),
        completedExercises: t.Integer({ minimum: 0 }),
        totalExercises: t.Integer({ minimum: 0 }),
        completed: t.Optional(t.Boolean()),
      }),
    },
  );
