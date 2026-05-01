import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// ---------- better-auth required tables ----------

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  providerId: text('provider_id').notNull(),
  accountId: text('account_id').notNull(),
  password: text('password'),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ---------- App tables ----------

// Per-user app preferences (preferred name, daily minutes goal).
export const userProfile = pgTable('user_profile', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  preferredName: text('preferred_name'),
  dailyMinutesGoal: integer('daily_minutes_goal').notNull().default(10),
  reduceMotion: boolean('reduce_motion').notNull().default(false),
  slowSpeech: boolean('slow_speech').notNull().default(false),
  hapticFeedback: boolean('haptic_feedback').notNull().default(true),
  activeCourseId: text('active_course_id'),
  uiLocale: text('ui_locale'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Which courses the user is learning. courseId is the "source:target" pair, e.g. "en-US:fr-FR".
export const enrollment = pgTable(
  'enrollment',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    courseId: text('course_id').notNull(),
    enrolledAt: timestamp('enrolled_at').notNull().defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.courseId] }),
  }),
);

// Per-lesson per-user progress, so any device can pick up where the user left off.
export const lessonProgress = pgTable(
  'lesson_progress',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    lessonId: text('lesson_id').notNull(),
    completedExercises: integer('completed_exercises').notNull().default(0),
    totalExercises: integer('total_exercises').notNull(),
    completedAt: timestamp('completed_at'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.lessonId] }),
  }),
);

// Optional: a flat event log for any client-side learning event we want to sync.
// Useful as the first step toward analytics or richer per-day stats.
export const learningEvent = pgTable(
  'learning_event',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    courseId: text('course_id').notNull(),
    kind: text('kind').notNull(), // 'exercise_correct' | 'exercise_wrong' | 'lesson_started' | ...
    payload: text('payload'), // optional JSON-encoded blob, kept loose on purpose
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => ({
    userCreated: uniqueIndex('learning_event_user_created_idx').on(t.userId, t.createdAt, t.id),
  }),
);
