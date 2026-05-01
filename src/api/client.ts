import { API_BASE_URL } from '@/config';
import { clearToken, getToken, setToken } from './storage';
import type {
  AuthSession,
  AuthSuccess,
  AuthUser,
  ProfilePatch,
  ProgressUpdate,
  RemoteEnrollment,
  RemoteProfile,
  RemoteState,
  Stats,
} from './types';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string | null,
    public friendly: string,
  ) {
    super(`API ${status}: ${friendly}`);
  }
}

export class NetworkError extends Error {
  constructor(public cause: unknown, public url: string = API_BASE_URL) {
    const detail = cause instanceof Error ? cause.message : String(cause ?? 'unknown');
    super(`Couldn't reach pip-server at ${url}\n\n${detail}`);
  }
}

type RequestOptions = RequestInit & { auth?: boolean };

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const headers = new Headers(opts.headers);
  if (!headers.has('content-type') && opts.body) {
    headers.set('content-type', 'application/json');
  }
  // RN fetch omits Origin by default; better-auth's originCheck rejects requests
  // with no Origin/Referer. Sending the API base URL makes us a same-origin
  // caller, which better-auth auto-trusts via baseURL.
  if (!headers.has('origin')) {
    headers.set('origin', API_BASE_URL);
  }
  if (opts.auth !== false) {
    const token = await getToken();
    if (token) headers.set('authorization', `Bearer ${token}`);
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, { ...opts, headers });
  } catch (e) {
    throw new NetworkError(e);
  }

  if (!res.ok) {
    let code: string | null = null;
    let friendly = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      code = body?.code ?? null;
      friendly = body?.message ?? body?.error ?? friendly;
    } catch {
      // body wasn't JSON; keep the default friendly message
    }
    throw new ApiError(res.status, code, friendly);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// ---------- Auth ----------

export async function signUp(args: { email: string; password: string; name: string }) {
  const data = await request<AuthSuccess>('/api/auth/sign-up/email', {
    method: 'POST',
    body: JSON.stringify(args),
    auth: false,
  });
  await setToken(data.token);
  return data;
}

export async function signIn(args: { email: string; password: string }) {
  const data = await request<AuthSuccess>('/api/auth/sign-in/email', {
    method: 'POST',
    body: JSON.stringify(args),
    auth: false,
  });
  await setToken(data.token);
  return data;
}

export async function signOut(): Promise<void> {
  try {
    await request('/api/auth/sign-out', { method: 'POST' });
  } catch {
    // Even if the server call fails (offline, expired token), still clear locally.
  }
  await clearToken();
}

type MeResult =
  | { user: AuthUser; session: AuthSession }
  | { error: string };

export async function getMe(): Promise<{ user: AuthUser; session: AuthSession } | null> {
  try {
    const r = await request<MeResult>('/me');
    if ('user' in r) return r;
    return null;
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return null;
    throw e;
  }
}

// ---------- App state sync ----------

export async function getState(): Promise<RemoteState | null> {
  try {
    return await request<RemoteState>('/api/me/state');
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return null;
    throw e;
  }
}

export async function updateProfile(patch: ProfilePatch): Promise<RemoteProfile> {
  const data = await request<{ profile: RemoteProfile }>('/api/me/profile', {
    method: 'PUT',
    body: JSON.stringify(patch),
  });
  return data.profile;
}

export async function addEnrollment(courseId: string): Promise<RemoteEnrollment | null> {
  const data = await request<{ enrollment: RemoteEnrollment | null }>(
    '/api/me/enrollments',
    {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    },
  );
  return data.enrollment;
}

export async function updateProgress(update: ProgressUpdate): Promise<void> {
  await request('/api/me/progress', {
    method: 'PUT',
    body: JSON.stringify(update),
  });
}

export async function getStats(): Promise<Stats | null> {
  try {
    return await request<Stats>('/api/me/stats');
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return null;
    throw e;
  }
}
