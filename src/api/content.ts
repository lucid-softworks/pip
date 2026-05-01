import { API_BASE_URL } from '@/config';
import type {
  Curriculum,
  Manifest,
  Story,
} from '@/data/types';
import { ApiError, NetworkError } from './client';

async function fetchJson<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { origin: API_BASE_URL },
    });
  } catch (e) {
    throw new NetworkError(e);
  }
  if (!res.ok) {
    let friendly = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      friendly = body?.error ?? body?.message ?? friendly;
    } catch {}
    throw new ApiError(res.status, null, friendly);
  }
  return (await res.json()) as T;
}

export async function fetchManifest(): Promise<Manifest> {
  return fetchJson<Manifest>('/api/content/manifest');
}

export async function fetchCurriculum(courseId: string): Promise<Curriculum | null> {
  try {
    return await fetchJson<Curriculum>(
      `/api/content/curriculum/${encodeURIComponent(courseId)}`,
    );
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export async function fetchStories(language?: string): Promise<Story[]> {
  const path = language
    ? `/api/content/stories?language=${encodeURIComponent(language)}`
    : '/api/content/stories';
  const data = await fetchJson<{ stories: Story[] }>(path);
  return data.stories;
}
