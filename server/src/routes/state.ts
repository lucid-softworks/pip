import { Elysia, t } from 'elysia';
import { eq } from 'drizzle-orm';
import { auth } from '../auth.ts';
import { db } from '../db/index.ts';
import { enrollment, lessonProgress, userProfile } from '../db/schema.ts';

type SessionUser = {
  id: string;
  email: string;
  name: string;
};

async function getUser(request: Request): Promise<SessionUser | null> {
  const result = await auth.api.getSession({ headers: request.headers });
  return result?.user ?? null;
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
