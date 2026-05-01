import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { CloseIcon } from '@/components/Icons';

type Props = {
  onClose: () => void;
};

const COOLDOWN_SECONDS = 25 * 60;

export function BreatherScreen({ onClose }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(COOLDOWN_SECONDS);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Pressable style={styles.iconBtn} onPress={onClose} hitSlop={8}>
          <CloseIcon size={18} color={colors.muted} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.art}>
          <View style={[styles.circle, styles.circleOuter]} />
          <View style={styles.circle} />
        </View>

        <Text style={styles.title}>Take a breather.</Text>

        <Text style={styles.message}>
          That was a tricky one. Brains learn better with{' '}
          <Text style={styles.messageEm}>short rests</Text> — research backs this up. Come back in a
          bit and try again.
        </Text>

        <View style={styles.countdown}>
          <View style={styles.timerBlock}>
            <Text style={styles.timer}>
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </Text>
            <Text style={styles.timerLabel}>Until this lesson reopens</Text>
          </View>
        </View>

        <View style={styles.meanwhile}>
          <Text style={styles.meanwhileHead}>In the meantime</Text>
          <Pressable style={styles.meanwhileItem} onPress={onClose}>
            <View style={[styles.meanwhileIcon, { backgroundColor: colors.mossSoft }]} />
            <View style={styles.meanwhileText}>
              <Text style={styles.meanwhileT1}>Review words you know</Text>
              <Text style={styles.meanwhileT2}>A gentle warm-up · 2 min</Text>
            </View>
          </Pressable>
          <Pressable style={styles.meanwhileItem} onPress={onClose}>
            <View style={[styles.meanwhileIcon, { backgroundColor: colors.lilacSoft }]} />
            <View style={styles.meanwhileText}>
              <Text style={styles.meanwhileT1}>Listen to a story</Text>
              <Text style={styles.meanwhileT2}>Always free for you · 4 min</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  top: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  art: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  circle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.lilacSoft,
  },
  circleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.5,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    color: colors.ink,
    letterSpacing: -0.8,
    marginBottom: 12,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink2,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
    marginBottom: 28,
  },
  messageEm: {
    fontFamily: fonts.bodyHeavy,
    color: colors.lilac,
  },
  countdown: {
    backgroundColor: colors.bg,
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    width: '100%',
    marginBottom: 28,
  },
  timerBlock: { flex: 1 },
  timer: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.ink,
    letterSpacing: -0.6,
  },
  timerLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  meanwhile: { width: '100%', gap: 8 },
  meanwhileHead: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 4,
  },
  meanwhileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: colors.bg2,
  },
  meanwhileIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
  },
  meanwhileText: { flex: 1 },
  meanwhileT1: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.ink,
  },
  meanwhileT2: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
});
