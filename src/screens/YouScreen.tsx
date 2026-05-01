import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Props = {
  userName: string;
};

export function YouScreen({ userName }: Props) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [slowSpeech, setSlowSpeech] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const initial = userName.trim().charAt(0).toUpperCase() || 'F';

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.title}>You</Text>
        <Text style={styles.sub}>Settings, your way.</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{initial}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileMeta}>Free, the whole way · joined this week</Text>
          </View>
        </View>

        <Text style={styles.helperHint}>
          Tap the language chip on Home to switch courses or add a new language.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Settings</Text>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>Slower speech</Text>
              <Text style={styles.settingHelper}>Read prompts a little more slowly</Text>
            </View>
            <Switch
              value={slowSpeech}
              onValueChange={setSlowSpeech}
              thumbColor={colors.paper}
              trackColor={{ false: colors.line, true: colors.moss }}
            />
          </View>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>Reduce motion</Text>
              <Text style={styles.settingHelper}>Calmer transitions</Text>
            </View>
            <Switch
              value={reduceMotion}
              onValueChange={setReduceMotion}
              thumbColor={colors.paper}
              trackColor={{ false: colors.line, true: colors.moss }}
            />
          </View>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>Haptic feedback</Text>
              <Text style={styles.settingHelper}>Gentle taps on correct answers</Text>
            </View>
            <Switch
              value={hapticFeedback}
              onValueChange={setHapticFeedback}
              thumbColor={colors.paper}
              trackColor={{ false: colors.line, true: colors.moss }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>Pip is free, the whole way.</Text>
            <Text style={styles.aboutBody}>
              Stories are the only paid part. No streaks, no leagues, no shame. We're rooting for
              you.
            </Text>
          </View>
        </View>

        <Text style={styles.version}>v0.1.0 · prerelease</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  top: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 8 },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.ink,
    letterSpacing: -0.7,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },
  scroll: { flex: 1 },
  scrollInner: { paddingHorizontal: 22, paddingBottom: 24, gap: 18 },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: colors.bg,
    borderRadius: 18,
    marginTop: 8,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.white,
    letterSpacing: -0.6,
  },
  profileName: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.ink,
    letterSpacing: -0.4,
  },
  profileMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },

  helperHint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    fontStyle: 'italic',
    paddingHorizontal: 4,
  },

  section: { gap: 8 },
  sectionLabel: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
  },
  settingTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.ink,
  },
  settingHelper: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },

  aboutCard: {
    padding: 14,
    backgroundColor: colors.butterSoft,
    borderRadius: 16,
  },
  aboutTitle: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: colors.ink,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  aboutBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink2,
    lineHeight: 18,
  },
  version: {
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.muted,
    marginTop: 8,
  },
});
