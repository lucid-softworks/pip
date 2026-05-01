import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Props = {
  userName: string;
  onSignOut: () => void | Promise<void>;
  onUpdateName: (name: string) => void | Promise<void>;
};

export function YouScreen({ userName, onSignOut, onUpdateName }: Props) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [slowSpeech, setSlowSpeech] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(userName);

  const initial = userName.trim().charAt(0).toUpperCase() || 'F';

  const openEditName = () => {
    setDraftName(userName);
    setEditingName(true);
  };

  const saveName = async () => {
    const next = draftName.trim();
    if (!next || next === userName) {
      setEditingName(false);
      return;
    }
    setEditingName(false);
    await onUpdateName(next);
  };

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
        <Pressable style={styles.profile} onPress={openEditName}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{initial}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileMeta}>Tap to edit · free, the whole way</Text>
          </View>
          <ChevronRight />
        </Pressable>

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

        <Pressable
          style={styles.signOutRow}
          onPress={() => {
            Alert.alert(
              'Sign out?',
              'Your progress is saved on the server. You can sign back in any time.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign out', style: 'destructive', onPress: () => onSignOut() },
              ],
            );
          }}
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>

        <Text style={styles.version}>v0.1.0 · prerelease</Text>
      </ScrollView>

      <Modal
        visible={editingName}
        transparent
        animationType="slide"
        onRequestClose={() => setEditingName(false)}
        statusBarTranslucent
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalRoot}>
            <Pressable style={styles.modalBackdrop} onPress={() => setEditingName(false)} />
            <SafeAreaView edges={['bottom']} style={styles.sheetWrap}>
              <View style={styles.sheet}>
                <View style={styles.sheetHandle} />
                <Text style={styles.sheetTitle}>What should we call you?</Text>
                <Text style={styles.sheetSubtitle}>
                  Whatever you'd like — lowercase is fine, we won't fix it.
                </Text>
                <TextInput
                  value={draftName}
                  onChangeText={setDraftName}
                  style={styles.sheetInput}
                  autoFocus
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={24}
                  placeholder="Friend"
                  placeholderTextColor={colors.muted}
                  returnKeyType="done"
                  onSubmitEditing={saveName}
                />
                <View style={styles.sheetActions}>
                  <Pressable
                    style={[styles.sheetBtn, styles.sheetBtnGhost]}
                    onPress={() => setEditingName(false)}
                  >
                    <Text style={styles.sheetBtnGhostText}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.sheetBtn,
                      styles.sheetBtnPrimary,
                      !draftName.trim() && styles.sheetBtnDisabled,
                    ]}
                    onPress={saveName}
                    disabled={!draftName.trim()}
                  >
                    <Text style={styles.sheetBtnPrimaryText}>Save</Text>
                  </Pressable>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function ChevronRight() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6 L15 12 L9 18"
        stroke={colors.muted}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
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

  signOutRow: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  signOutText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.berry,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
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

  // Edit-name modal
  modalRoot: { flex: 1 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(42, 36, 24, 0.45)',
  },
  sheetWrap: {
    backgroundColor: colors.paper,
  },
  sheet: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: colors.paper,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    marginBottom: 14,
  },
  sheetTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  sheetSubtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
    marginBottom: 16,
  },
  sheetInput: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 14,
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  sheetActions: {
    flexDirection: 'row',
    gap: 8,
  },
  sheetBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBtnGhost: {
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  sheetBtnGhostText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.muted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  sheetBtnPrimary: {
    backgroundColor: colors.primary,
  },
  sheetBtnDisabled: {
    backgroundColor: colors.line,
  },
  sheetBtnPrimaryText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.white,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
