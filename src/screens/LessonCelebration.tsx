import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, Easing } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { CheckIcon, ClockIcon, TargetIcon } from '@/components/Icons';
import { Mascot } from '@/components/Mascot';
import { useSpeech } from '@/hooks/useSpeech';
import type { Lesson, LocalizedText } from '@/data/types';
import { useT, type TranslationKey } from '@/i18n';

type Props = {
  lesson: Lesson;
  correctCount: number;
  totalCount: number;
  elapsedSeconds: number;
  onContinue: () => void;
};

// Soft "lovely" copy — varies a little so it doesn't get rote. Tone-matched
// to "kind by design". Each entry has a stable key so its translation lookup
// stays the same regardless of locale.
const CHEERS: { kickerKey: TranslationKey; bodyKey: TranslationKey }[] = [
  { kickerKey: 'celebration.cheer.lovely.kicker', bodyKey: 'celebration.cheer.lovely.body' },
  { kickerKey: 'celebration.cheer.beautifully.kicker', bodyKey: 'celebration.cheer.beautifully.body' },
  { kickerKey: 'celebration.cheer.lookAtYou.kicker', bodyKey: 'celebration.cheer.lookAtYou.body' },
  { kickerKey: 'celebration.cheer.quietly.kicker', bodyKey: 'celebration.cheer.quietly.body' },
  { kickerKey: 'celebration.cheer.thereItIs.kicker', bodyKey: 'celebration.cheer.thereItIs.body' },
];

function pickCheer(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return CHEERS[h % CHEERS.length];
}

/**
 * Find a phrase in the target language to read aloud after the lesson.
 * We walk exercises in reverse so the user hears the most-recent thing they
 * worked with. Match-pairs picks its first pair's target side.
 */
function pickTargetSnippet(lesson: Lesson): LocalizedText | null {
  for (let i = lesson.exercises.length - 1; i >= 0; i--) {
    const ex = lesson.exercises[i];
    switch (ex.kind) {
      case 'translate-tap':
        return ex.answer;
      case 'multiple-choice':
        return ex.correct;
      case 'listen-select':
        return ex.audio;
      case 'match-pairs':
        if (ex.pairs.length > 0) return ex.pairs[0].target;
        break;
    }
  }
  return null;
}

export function LessonCelebration({
  lesson,
  correctCount,
  totalCount,
  elapsedSeconds,
  onContinue,
}: Props) {
  const cheer = pickCheer(lesson.id);
  const { speak } = useSpeech();
  const t = useT();

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return t('celebration.time.seconds', { seconds });
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (s === 0) return t('celebration.time.minutes', { minutes: m });
    return t('celebration.time.minutesSeconds', { minutes: m, seconds: s });
  };

  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        damping: 14,
        stiffness: 160,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(lift, {
        toValue: 0,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Soft TTS cue — read one of the target-language phrases the user just
    // learned (the last exercise's answer), so the language they heard is the
    // language they're learning, not the English lesson title pronounced with
    // a target-language voice.
    const targetSnippet = pickTargetSnippet(lesson);
    if (targetSnippet) {
      const timer = setTimeout(() => {
        speak(targetSnippet.text, { language: targetSnippet.language, rate: 0.85 });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lesson, scale, opacity, lift, speak]);

  return (
    <View style={styles.root}>
      <View style={styles.body}>
        <Animated.View
          style={[
            styles.art,
            { opacity, transform: [{ scale }] },
          ]}
        >
          <View style={styles.halo} />
          <View style={styles.haloInner} />
          <Mascot size={120} />
        </Animated.View>

        <Animated.View style={{ opacity, transform: [{ translateY: lift }] }}>
          <Text style={styles.kicker}>{t(cheer.kickerKey)}</Text>
          <Text style={styles.title}>
            {t('celebration.youFinished', { title: lesson.title })}
          </Text>
          <Text style={styles.body_text}>{t(cheer.bodyKey)}</Text>
        </Animated.View>

        <Animated.View style={[styles.stats, { opacity, transform: [{ translateY: lift }] }]}>
          <Stat
            tint={colors.mossSoft}
            iconColor={colors.moss}
            icon={<CheckIcon size={16} color={colors.moss} />}
            value={`${correctCount}/${totalCount}`}
            label={t('celebration.stat.exercises')}
          />
          <Stat
            tint={colors.primarySoft}
            iconColor={colors.primary}
            icon={<TargetIcon size={16} color={colors.primary} />}
            value={`${lesson.newWordCount}`}
            label={t('celebration.stat.newWords')}
          />
          <Stat
            tint={colors.skySoft}
            iconColor={colors.sky}
            icon={<ClockIcon size={16} color={colors.sky} />}
            value={formatTime(elapsedSeconds)}
            label={t('celebration.stat.time')}
          />
        </Animated.View>
      </View>

      <Pressable style={styles.cta} onPress={onContinue}>
        <Text style={styles.ctaText}>{t('celebration.cta')}</Text>
      </Pressable>
    </View>
  );
}

function Stat({
  tint,
  iconColor: _iconColor,
  icon,
  value,
  label,
}: {
  tint: string;
  iconColor: string;
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <View style={[styles.statIcon, { backgroundColor: tint }]}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: 24, paddingBottom: 24 },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
  art: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    position: 'relative',
  },
  halo: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.butterSoft,
    opacity: 0.7,
  },
  haloInner: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.primarySoft,
    opacity: 0.55,
  },
  kicker: {
    fontFamily: fonts.display,
    fontSize: 40,
    color: colors.primary,
    letterSpacing: -1,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 8,
  },
  body_text: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink2,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
    marginBottom: 28,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    gap: 6,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: colors.ink,
    letterSpacing: -0.4,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.muted,
  },
  cta: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    color: colors.white,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
