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
