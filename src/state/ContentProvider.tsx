import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { fetchCurriculum, fetchManifest, fetchStories } from '@/api/content';
import type {
  Course,
  CourseId,
  Curriculum,
  LanguageMeta,
  LanguageTag,
  Lesson,
  Manifest,
  Story,
  Unit,
} from '@/data/types';

const FALLBACK_LANGUAGE: LanguageMeta = { code: 'unknown', name: '???', flag: '🌐' };

type ContentValue = {
  ready: boolean;
  manifest: Manifest | null;
  /** Sync lookup. Falls back to a placeholder before manifest loads. */
  getLanguage: (code: LanguageTag) => LanguageMeta;
  /** Returns the catalog of courses, or [] if manifest hasn't loaded. */
  getCourses: () => Course[];
  /** Async — returns units for a course (cached). */
  loadUnitsForCourse: (id: CourseId) => Promise<Unit[]>;
  /** Async — returns a single lesson by id (cached, may pull a curriculum). */
  loadLesson: (id: string) => Promise<Lesson | null>;
  /** Async — returns the stories for a target language (cached). */
  loadStoriesForLanguage: (lang: LanguageTag) => Promise<Story[]>;
  /** Force a refetch of the manifest (e.g. after sign-in). */
  refresh: () => Promise<void>;
};

const ContentContext = createContext<ContentValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [manifest, setManifest] = useState<Manifest | null>(null);

  // Per-courseId / per-language caches kept in refs so the values are
  // stable identity across renders (no needless re-renders of consumers).
  const curriculumCache = useRef<Map<CourseId, Curriculum>>(new Map());
  const lessonCache = useRef<Map<string, Lesson>>(new Map());
  const storiesCache = useRef<Map<LanguageTag, Story[]>>(new Map());

  const refresh = useCallback(async () => {
    const next = await fetchManifest();
    setManifest(next);
  }, []);

  useEffect(() => {
    refresh().catch(() => {
      // Network / server failure on boot. Caller decides what to do (keep
      // showing a loading state, fall back to cached, etc.).
    });
  }, [refresh]);

  const getLanguage = useCallback(
    (code: LanguageTag): LanguageMeta => {
      if (!manifest) return FALLBACK_LANGUAGE;
      return manifest.languages.find((l) => l.code === code) ?? FALLBACK_LANGUAGE;
    },
    [manifest],
  );

  const getCourses = useCallback((): Course[] => manifest?.courses ?? [], [manifest]);

  const ensureCurriculum = useCallback(
    async (id: CourseId): Promise<Curriculum | null> => {
      const cached = curriculumCache.current.get(id);
      if (cached) return cached;
      const fetched = await fetchCurriculum(id);
      if (!fetched) return null;
      curriculumCache.current.set(id, fetched);
      for (const [lessonId, lesson] of Object.entries(fetched.lessons)) {
        lessonCache.current.set(lessonId, lesson);
      }
      return fetched;
    },
    [],
  );

  const loadUnitsForCourse = useCallback(
    async (id: CourseId): Promise<Unit[]> => {
      const c = await ensureCurriculum(id);
      return c?.units ?? [];
    },
    [ensureCurriculum],
  );

  const loadLesson = useCallback(
    async (id: string): Promise<Lesson | null> => {
      const cached = lessonCache.current.get(id);
      if (cached) return cached;
      // We don't know which course the lesson belongs to. Walk loaded curricula first,
      // then if still missing, ask all available curricula in parallel until we find it.
      if (!manifest) return null;
      for (const courseId of curriculumCache.current.keys()) {
        const c = curriculumCache.current.get(courseId)!;
        if (c.lessons[id]) return c.lessons[id];
      }
      // Not in any cached curriculum. Try the user's known courses (catalog availables).
      const availableIds = manifest.courses
        .filter((c) => c.available && !curriculumCache.current.has(c.id))
        .map((c) => c.id);
      for (const courseId of availableIds) {
        const c = await ensureCurriculum(courseId);
        if (c?.lessons[id]) return c.lessons[id];
      }
      return null;
    },
    [ensureCurriculum, manifest],
  );

  const loadStoriesForLanguage = useCallback(
    async (lang: LanguageTag): Promise<Story[]> => {
      const cached = storiesCache.current.get(lang);
      if (cached) return cached;
      const fetched = await fetchStories(lang);
      storiesCache.current.set(lang, fetched);
      return fetched;
    },
    [],
  );

  const value: ContentValue = {
    ready: manifest != null,
    manifest,
    getLanguage,
    getCourses,
    loadUnitsForCourse,
    loadLesson,
    loadStoriesForLanguage,
    refresh,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}
