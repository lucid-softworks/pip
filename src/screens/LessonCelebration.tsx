import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, Easing } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { CheckIcon, ClockIcon, TargetIcon } from '@/components/Icons';
import { Mascot } from '@/components/Mascot';
import { useSpeech } from '@/hooks/useSpeech';
import type { Lesson } from '@/data/types';

type Props = {
  lesson: Lesson;
  correctCount: number;
  totalCount: number;
  elapsedSeconds: number;
  onContinue: () => void;
};

// Soft "lovely" copy — varies a little so it doesn't get rote. Tone-matched to "kind by design".
const CHEERS = [
  { kicker: 'Lovely.', body: "That's another one in the bag." },
  { kicker: 'Beautifully done.', body: 'New words tucked away — they stick best when you come back to them.' },
  { kicker: 'Look at you.', body: 'A few more minutes spent, a few more words you know.' },
  { kicker: 'Quietly excellent.', body: 'No rush, no streak — just steady, real progress.' },
  { kicker: 'There it is.', body: 'These small wins are what stack up over time.' },
];

function pickCheer(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return CHEERS[h % CHEERS.length];
}

function formatTime(seconds: number) {
  if (seconds < 60) return `${seconds} sec`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (s === 0) return `${m} min`;
  return `${m}m ${s}s`;
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

    // Soft TTS cue — read the lesson title in the target language as a tiny "you did it" moment.
    const t = setTimeout(() => {
      speak(lesson.title, { language: lesson.targetLanguage, rate: 0.85 });
    }, 500);
    return () => clearTimeout(t);
  }, [lesson.id, lesson.title, lesson.targetLanguage, scale, opacity, lift, speak]);

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
          <Text style={styles.kicker}>{cheer.kicker}</Text>
          <Text style={styles.title}>You finished {lesson.title}.</Text>
          <Text style={styles.body_text}>{cheer.body}</Text>
        </Animated.View>

        <Animated.View style={[styles.stats, { opacity, transform: [{ translateY: lift }] }]}>
          <Stat
            tint={colors.mossSoft}
            iconColor={colors.moss}
            icon={<CheckIcon size={16} color={colors.moss} />}
            value={`${correctCount}/${totalCount}`}
            label="exercises"
          />
          <Stat
            tint={colors.primarySoft}
            iconColor={colors.primary}
            icon={<TargetIcon size={16} color={colors.primary} />}
            value={`${lesson.newWordCount}`}
            label="new words"
          />
          <Stat
            tint={colors.skySoft}
            iconColor={colors.sky}
            icon={<ClockIcon size={16} color={colors.sky} />}
            value={formatTime(elapsedSeconds)}
            label="time"
          />
        </Animated.View>
      </View>

      <Pressable style={styles.cta} onPress={onContinue}>
        <Text style={styles.ctaText}>Continue</Text>
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
