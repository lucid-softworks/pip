import * as SecureStore from 'expo-secure-store';
import type { LocalPrefs } from './types';

const KEY_TOKEN = 'pip.session.token';
const KEY_PREFS = 'pip.prefs';

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(KEY_TOKEN);
}

export async function setToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(KEY_TOKEN, token);
}

export async function clearToken(): Promise<void> {
  await SecureStore.deleteItemAsync(KEY_TOKEN);
}

const EMPTY_PREFS: LocalPrefs = {
  onboarded: false,
  userName: null,
  dailyMinutes: null,
  activeCourseId: null,
  uiLocale: null,
  seenCourses: [],
};

export async function getPrefs(): Promise<LocalPrefs> {
  const raw = await SecureStore.getItemAsync(KEY_PREFS);
  if (!raw) return EMPTY_PREFS;
  try {
    const parsed = JSON.parse(raw) as Partial<LocalPrefs>;
    return { ...EMPTY_PREFS, ...parsed };
  } catch {
    return EMPTY_PREFS;
  }
}

export async function setPrefs(patch: Partial<LocalPrefs>): Promise<LocalPrefs> {
  const current = await getPrefs();
  const next = { ...current, ...patch };
  await SecureStore.setItemAsync(KEY_PREFS, JSON.stringify(next));
  return next;
}

export async function clearPrefs(): Promise<void> {
  await SecureStore.deleteItemAsync(KEY_PREFS);
}
