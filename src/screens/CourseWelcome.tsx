import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { useContent } from '@/state/ContentProvider';
import { useT } from '@/i18n';

type Props = {
  courseId: string;
  onContinue: () => void;
};

export function CourseWelcome({ courseId, onContinue }: Props) {
  const { getLanguage } = useContent();
  const t = useT();
  const target = getLanguage(courseId.split(':')[1]);

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
  }, [scale, opacity, lift]);

  return (
    <View style={styles.root}>
      <View style={styles.body}>
        <Animated.View
          style={[styles.art, { opacity, transform: [{ scale }] }]}
        >
          <View style={styles.halo} />
          <View style={styles.haloInner} />
          <Text style={styles.flag}>{target.flag}</Text>
        </Animated.View>

        <Animated.View style={{ opacity, transform: [{ translateY: lift }] }}>
          <Text style={styles.title}>
            {t('welcome.course.title', { language: target.name })}
          </Text>
          <Text style={styles.body_text}>{t('welcome.course.body')}</Text>
        </Animated.View>
      </View>

      <Pressable style={styles.cta} onPress={onContinue}>
        <Text style={styles.ctaText}>{t('welcome.course.cta')}</Text>
      </Pressable>
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
  flag: {
    fontSize: 96,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    color: colors.ink,
    letterSpacing: -0.8,
    textAlign: 'center',
    marginBottom: 12,
  },
  body_text: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink2,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
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
