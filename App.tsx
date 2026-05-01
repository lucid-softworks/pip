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
import { TabBar, type TabKey } from '@/components/TabBar';
import { colors } from '@/theme/colors';
import { type CourseId, makeCourseId, parseCourseId } from '@/data/courses';

SplashScreen.preventAutoHideAsync().catch(() => {});

type Overlay =
  | { kind: 'none' }
  | { kind: 'lesson'; lessonId: string }
  | { kind: 'breather'; returnLessonId: string };

const DEFAULT_COURSE: CourseId = makeCourseId('en-US', 'fr-FR');
const DEFAULT_NAME = 'Friend';
const DEFAULT_MINUTES = 10;

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [userName, setUserName] = useState(DEFAULT_NAME);
  const [dailyMinutes, setDailyMinutes] = useState(DEFAULT_MINUTES);
  const [tab, setTab] = useState<TabKey>('learn');
  const [overlay, setOverlay] = useState<Overlay>({ kind: 'none' });
  const [activeCourseId, setActiveCourseId] = useState<CourseId>(DEFAULT_COURSE);
  const [enrolledCourses, setEnrolledCourses] = useState<Set<CourseId>>(
    () => new Set([DEFAULT_COURSE]),
  );

  const handleOnboardingFinish = useCallback((result: OnboardingResult) => {
    setUserName(result.userName);
    setDailyMinutes(result.dailyMinutes);
    setActiveCourseId(result.courseId);
    setEnrolledCourses(new Set([result.courseId]));
    setOnboarded(true);
  }, []);

  const enrollCourse = useCallback((id: CourseId) => {
    setEnrolledCourses((set) => {
      if (set.has(id)) return set;
      const next = new Set(set);
      next.add(id);
      return next;
    });
    setActiveCourseId(id);
  }, []);

  const switchCourse = useCallback((id: CourseId) => {
    setActiveCourseId(id);
  }, []);

  const activeTarget = parseCourseId(activeCourseId).target;

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

  const ready = nunitoLoaded && bricolageLoaded;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  const openLesson = useCallback((lessonId: string) => {
    setOverlay({ kind: 'lesson', lessonId });
  }, []);

  const closeOverlay = useCallback(() => setOverlay({ kind: 'none' }), []);

  const handleBreather = useCallback(() => {
    setOverlay((o) =>
      o.kind === 'lesson'
        ? { kind: 'breather', returnLessonId: o.lessonId }
        : o,
    );
  }, []);

  if (!ready) return <View style={styles.shell} />;

  if (!onboarded) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.shell} edges={['top', 'bottom']}>
          <OnboardingScreen onFinish={handleOnboardingFinish} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.shell} edges={['top', 'bottom']}>
        <View style={styles.body}>
          {tab === 'learn' && (
            <HomeScreen
              activeCourseId={activeCourseId}
              enrolledCourses={enrolledCourses}
              userName={userName}
              onOpenLesson={openLesson}
              onSwitchCourse={switchCourse}
              onEnrollCourse={enrollCourse}
            />
          )}
          {tab === 'stories' && <StoriesScreen targetLanguage={activeTarget} />}
          {tab === 'progress' && <ProgressScreen dailyMinutes={dailyMinutes} />}
          {tab === 'you' && <YouScreen userName={userName} />}
        </View>
        <TabBar active={tab} onChange={setTab} />

        {overlay.kind === 'lesson' && (
          <View style={styles.overlay} pointerEvents="auto">
            <LessonScreen
              lessonId={overlay.lessonId}
              onExit={closeOverlay}
              onNeedBreather={handleBreather}
              onComplete={closeOverlay}
            />
          </View>
        )}
        {overlay.kind === 'breather' && (
          <View style={styles.overlay} pointerEvents="auto">
            <BreatherScreen onClose={closeOverlay} />
          </View>
        )}
      </SafeAreaView>
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
