export type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthSession = {
  id: string;
  token: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  userAgent?: string;
};

export type AuthSuccess = {
  token: string;
  user: AuthUser;
};

export type LocalPrefs = {
  onboarded: boolean;
  userName: string | null;
  dailyMinutes: number | null;
  activeCourseId: string | null;
};

export type RemoteProfile = {
  userId: string;
  preferredName: string | null;
  dailyMinutesGoal: number;
  reduceMotion: boolean;
  slowSpeech: boolean;
  hapticFeedback: boolean;
  activeCourseId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RemoteEnrollment = {
  courseId: string;
  enrolledAt: string;
};

export type RemoteProgress = {
  lessonId: string;
  completedExercises: number;
  totalExercises: number;
  completedAt: string | null;
  updatedAt: string;
};

export type RemoteState = {
  profile: RemoteProfile | null;
  enrollments: RemoteEnrollment[];
  progress: RemoteProgress[];
};

export type ProfilePatch = Partial<{
  preferredName: string;
  dailyMinutesGoal: number;
  activeCourseId: string;
  reduceMotion: boolean;
  slowSpeech: boolean;
  hapticFeedback: boolean;
}>;

export type ProgressUpdate = {
  lessonId: string;
  completedExercises: number;
  totalExercises: number;
  completed?: boolean;
};
