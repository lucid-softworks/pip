import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts as useNunito,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import {
  useFonts as useBricolage,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
} from '@expo-google-fonts/bricolage-grotesque';

import { HomeScreen } from '@/screens/HomeScreen';
import { LessonScreen } from '@/screens/LessonScreen';
import { BreatherScreen } from '@/screens/BreatherScreen';
import { StoriesScreen } from '@/screens/StoriesScreen';
import { ProgressScreen } from '@/screens/ProgressScreen';
import { YouScreen } from '@/screens/YouScreen';
import { OnboardingScreen, type OnboardingResult } from '@/screens/OnboardingScreen';
import { AuthScreen } from '@/screens/AuthScreen';
import { TabBar, type TabKey } from '@/components/TabBar';
import { colors } from '@/theme/colors';
import { type CourseId, makeCourseId, parseCourseId } from '@/data/types';
import { ContentProvider } from '@/state/ContentProvider';
import { I18nProvider } from '@/i18n';
import {
  addEnrollment,
  getMe,
  getState,
  signOut,
  updateProfile,
  updateProgress,
} from '@/api/client';
import {
  clearPrefs,
  getPrefs,
  getToken,
  setPrefs,
} from '@/api/storage';
import type { AuthSuccess, RemoteProgress, RemoteState } from '@/api/types';

SplashScreen.preventAutoHideAsync().catch(() => {});

type Overlay =
  | { kind: 'none' }
  | { kind: 'lesson'; lessonId: string }
  | { kind: 'breather'; returnLessonId: string };

type AuthPhase = 'loading' | 'unauth' | 'authed';

const DEFAULT_COURSE: CourseId = makeCourseId('en-US', 'fr-FR');
const DEFAULT_NAME = 'Friend';
const DEFAULT_MINUTES = 10;

export default function App() {
  const [authPhase, setAuthPhase] = useState<AuthPhase>('loading');
  const [accountName, setAccountName] = useState<string | null>(null);

  const [onboarded, setOnboarded] = useState(false);
  const [userName, setUserName] = useState(DEFAULT_NAME);
  const [dailyMinutes, setDailyMinutes] = useState(DEFAULT_MINUTES);
  const [uiLocale, setUiLocaleState] = useState<string | undefined>(undefined);
  const [tab, setTab] = useState<TabKey>('learn');
  const [overlay, setOverlay] = useState<Overlay>({ kind: 'none' });
  const [activeCourseId, setActiveCourseId] = useState<CourseId>(DEFAULT_COURSE);
  const [enrolledCourses, setEnrolledCourses] = useState<Set<CourseId>>(
    () => new Set([DEFAULT_COURSE]),
  );
  const [progress, setProgress] = useState<RemoteProgress[]>([]);

  // ---------- Hydration helpers ----------

  const applyRemoteState = useCallback(async (state: RemoteState) => {
    const { profile, enrollments } = state;
    if (profile) {
      const name = profile.preferredName ?? null;
      if (name) setUserName(name);
      setDailyMinutes(profile.dailyMinutesGoal);
      if (profile.activeCourseId) setActiveCourseId(profile.activeCourseId);
      if (profile.uiLocale) setUiLocaleState(profile.uiLocale);
      setOnboarded(Boolean(profile.preferredName));
      await setPrefs({
        onboarded: Boolean(profile.preferredName),
        userName: name,
        dailyMinutes: profile.dailyMinutesGoal,
        activeCourseId: profile.activeCourseId,
        uiLocale: profile.uiLocale,
      });
    } else {
      setOnboarded(false);
      await setPrefs({ onboarded: false });
    }
    if (enrollments.length > 0) {
      setEnrolledCourses(new Set(enrollments.map((e) => e.courseId)));
    }
    setProgress(state.progress ?? []);
  }, []);

  const refreshProgress = useCallback(async () => {
    try {
      const state = await getState();
      if (state) setProgress(state.progress ?? []);
    } catch {
      // Best-effort — leave existing progress in place on failure.
    }
  }, []);

  // ---------- Boot: load token + prefs, validate session ----------

  useEffect(() => {
    (async () => {
      const [token, prefs] = await Promise.all([getToken(), getPrefs()]);
      if (prefs.userName) setUserName(prefs.userName);
      if (prefs.dailyMinutes !== null) setDailyMinutes(prefs.dailyMinutes);
      if (prefs.activeCourseId) {
        setActiveCourseId(prefs.activeCourseId);
        setEnrolledCourses(new Set([prefs.activeCourseId]));
      }
      if (prefs.uiLocale) setUiLocaleState(prefs.uiLocale);
      setOnboarded(prefs.onboarded);

      if (!token) {
        setAuthPhase('unauth');
        return;
      }

      try {
        const me = await getMe();
        if (!me) {
          setAuthPhase('unauth');
          return;
        }
        setAccountName(me.user.name);

        // Pull server state and let it overwrite local prefs — server wins.
        const state = await getState();
        if (state) await applyRemoteState(state);

        setAuthPhase('authed');
      } catch {
        // Network failure on boot — keep them on auth screen so they can retry.
        setAuthPhase('unauth');
      }
    })();
  }, [applyRemoteState]);

  // ---------- Auth callbacks ----------

  const handleAuthed = useCallback(
    async (result: AuthSuccess, mode: 'sign-in' | 'sign-up') => {
      setAccountName(result.user.name);

      if (mode === 'sign-up') {
        // Brand new account → run onboarding next; default the name field to the account name.
        await setPrefs({ onboarded: false, userName: result.user.name });
        setUserName(result.user.name);
        setOnboarded(false);
      } else {
        // Existing user — pull whatever they had on another device.
        try {
          const state = await getState();
          if (state) await applyRemoteState(state);
        } catch {
          // If sync fails, fall back to local prefs (already loaded above).
        }
      }

      setAuthPhase('authed');
    },
    [applyRemoteState],
  );

  const handleUpdateName = useCallback(async (name: string) => {
    setUserName(name);
    await setPrefs({ userName: name });
    updateProfile({ preferredName: name }).catch(() => {});
  }, []);

  const handleUpdateUiLocale = useCallback(async (locale: string) => {
    setUiLocaleState(locale);
    await setPrefs({ uiLocale: locale });
    updateProfile({ uiLocale: locale }).catch(() => {});
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut();
    await clearPrefs();
    setOnboarded(false);
    setUserName(DEFAULT_NAME);
    setDailyMinutes(DEFAULT_MINUTES);
    setActiveCourseId(DEFAULT_COURSE);
    setEnrolledCourses(new Set([DEFAULT_COURSE]));
    setTab('learn');
    setAccountName(null);
    setAuthPhase('unauth');
  }, []);

  // ---------- Onboarding callback ----------

  const handleOnboardingFinish = useCallback(async (result: OnboardingResult) => {
    setUserName(result.userName);
    setDailyMinutes(result.dailyMinutes);
    setActiveCourseId(result.courseId);
    setEnrolledCourses(new Set([result.courseId]));
    setUiLocaleState(result.uiLocale);
    setOnboarded(true);
    await setPrefs({
      onboarded: true,
      userName: result.userName,
      dailyMinutes: result.dailyMinutes,
      activeCourseId: result.courseId,
      uiLocale: result.uiLocale,
    });
    // Push to server in parallel; failures are non-fatal here since prefs are saved locally.
    Promise.all([
      updateProfile({
        preferredName: result.userName,
        dailyMinutesGoal: result.dailyMinutes,
        activeCourseId: result.courseId,
        uiLocale: result.uiLocale,
      }),
      addEnrollment(result.courseId),
    ]).catch(() => {
      // Silent — user can retry implicitly the next time they make a change.
    });
  }, []);

  // ---------- Course callbacks (persist locally + remotely) ----------

  const enrollCourse = useCallback(async (id: CourseId) => {
    setEnrolledCourses((set) => {
      if (set.has(id)) return set;
      const next = new Set(set);
      next.add(id);
      return next;
    });
    setActiveCourseId(id);
    await setPrefs({ activeCourseId: id });
    Promise.all([addEnrollment(id), updateProfile({ activeCourseId: id })]).catch(() => {});
  }, []);

  const switchCourse = useCallback(async (id: CourseId) => {
    setActiveCourseId(id);
    await setPrefs({ activeCourseId: id });
    updateProfile({ activeCourseId: id }).catch(() => {});
  }, []);

  const activeTarget = parseCourseId(activeCourseId).target;

  // ---------- Lesson overlay callbacks ----------

  const openLesson = useCallback((lessonId: string) => {
    setOverlay({ kind: 'lesson', lessonId });
  }, []);

  const closeOverlay = useCallback(() => setOverlay({ kind: 'none' }), []);

  const handleLessonComplete = useCallback(() => {
    setOverlay({ kind: 'none' });
    // Pull updated progress so home reflects the just-finished lesson.
    refreshProgress();
  }, [refreshProgress]);

  const handleBreather = useCallback(() => {
    setOverlay((o) =>
      o.kind === 'lesson'
        ? { kind: 'breather', returnLessonId: o.lessonId }
        : o,
    );
  }, []);

  // ---------- Fonts ----------

  const [nunitoLoaded] = useNunito({
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });
  const [bricolageLoaded] = useBricolage({
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
  });

  const fontsReady = nunitoLoaded && bricolageLoaded;
  const ready = fontsReady && authPhase !== 'loading';

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  // ---------- Render ----------

  if (!ready) return <View style={styles.shell} />;

  return (
    <SafeAreaProvider>
      <I18nProvider locale={uiLocale}>
        <ContentProvider>
          <StatusBar style="dark" />
        <SafeAreaView style={styles.shell} edges={['top', 'bottom']}>
          {authPhase === 'unauth' ? (
            <AuthScreen onAuthed={handleAuthed} />
          ) : !onboarded ? (
            <OnboardingScreen
              onFinish={handleOnboardingFinish}
              initialName={accountName ?? userName}
              initialUiLocale={uiLocale}
              onPickUiLocale={setUiLocaleState}
            />
          ) : (
            <>
              <View style={styles.body}>
                {tab === 'learn' && (
                  <HomeScreen
                    activeCourseId={activeCourseId}
                    enrolledCourses={enrolledCourses}
                    userName={userName}
                    progress={progress}
                    onOpenLesson={openLesson}
                    onSwitchCourse={switchCourse}
                    onEnrollCourse={enrollCourse}
                  />
                )}
                {tab === 'stories' && <StoriesScreen targetLanguage={activeTarget} />}
                {tab === 'progress' && <ProgressScreen dailyMinutes={dailyMinutes} />}
                {tab === 'you' && (
                  <YouScreen
                    userName={userName}
                    uiLocale={uiLocale}
                    onSignOut={handleSignOut}
                    onUpdateName={handleUpdateName}
                    onUpdateUiLocale={handleUpdateUiLocale}
                  />
                )}
              </View>
              <TabBar active={tab} onChange={setTab} />

              {overlay.kind === 'lesson' && (
                <View style={styles.overlay} pointerEvents="auto">
                  <LessonScreen
                    lessonId={overlay.lessonId}
                    onExit={closeOverlay}
                    onNeedBreather={handleBreather}
                    onComplete={handleLessonComplete}
                  />
                </View>
              )}
              {overlay.kind === 'breather' && (
                <View style={styles.overlay} pointerEvents="auto">
                  <BreatherScreen onClose={closeOverlay} />
                </View>
              )}
            </>
          )}
          </SafeAreaView>
        </ContentProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  body: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.paper,
  },
});
