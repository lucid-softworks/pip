import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import { colors } from '@/theme/colors';

SplashScreen.preventAutoHideAsync().catch(() => {});

type Route =
  | { name: 'home' }
  | { name: 'lesson'; lessonId: string }
  | { name: 'breather'; returnLessonId: string };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'home' });

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
    setRoute({ name: 'lesson', lessonId });
  }, []);

  const goHome = useCallback(() => setRoute({ name: 'home' }), []);

  const handleBreather = useCallback(() => {
    setRoute((r) =>
      r.name === 'lesson'
        ? { name: 'breather', returnLessonId: r.lessonId }
        : r,
    );
  }, []);

  if (!ready) return <View style={styles.shell} />;

  return (
    <SafeAreaProvider>
      <View style={styles.shell}>
        <StatusBar style="dark" />
        {route.name === 'home' && <HomeScreen onOpenLesson={openLesson} />}
        {route.name === 'lesson' && (
          <LessonScreen
            lessonId={route.lessonId}
            onExit={goHome}
            onNeedBreather={handleBreather}
            onComplete={goHome}
          />
        )}
        {route.name === 'breather' && <BreatherScreen onClose={goHome} />}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
