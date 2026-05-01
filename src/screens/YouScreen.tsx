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
import { useT } from '@/i18n';

type Props = {
  userName: string;
  onSignOut: () => void | Promise<void>;
  onUpdateName: (name: string) => void | Promise<void>;
};

export function YouScreen({ userName, onSignOut, onUpdateName }: Props) {
  const t = useT();
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
        <Text style={styles.title}>{t('you.title')}</Text>
        <Text style={styles.sub}>{t('you.subtitle')}</Text>
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
            <Text style={styles.profileMeta}>{t('you.profile.tagline')}</Text>
          </View>
          <ChevronRight />
        </Pressable>

        <Text style={styles.helperHint}>{t('you.languageHint')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('you.section.settings')}</Text>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>{t('you.setting.slowSpeech.title')}</Text>
              <Text style={styles.settingHelper}>{t('you.setting.slowSpeech.help')}</Text>
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
              <Text style={styles.settingTitle}>{t('you.setting.reduceMotion.title')}</Text>
              <Text style={styles.settingHelper}>{t('you.setting.reduceMotion.help')}</Text>
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
              <Text style={styles.settingTitle}>{t('you.setting.haptic.title')}</Text>
              <Text style={styles.settingHelper}>{t('you.setting.haptic.help')}</Text>
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
          <Text style={styles.sectionLabel}>{t('you.section.about')}</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>{t('you.about.title')}</Text>
            <Text style={styles.aboutBody}>{t('you.about.body')}</Text>
          </View>
        </View>

        <Pressable
          style={styles.signOutRow}
          onPress={() => {
            Alert.alert(
              t('you.signOut.confirmTitle'),
              t('you.signOut.confirmBody'),
              [
                { text: t('common.cancel'), style: 'cancel' },
                { text: t('you.signOut'), style: 'destructive', onPress: () => onSignOut() },
              ],
            );
          }}
        >
          <Text style={styles.signOutText}>{t('you.signOut')}</Text>
        </Pressable>

        <Text style={styles.version}>v0.1.0 · prerelease</Text>
      </ScrollView>

      <Modal
        visible={editingName}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setEditingName(false)}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <SafeAreaView style={styles.sheetRoot} edges={['bottom']}>
            <View style={styles.sheetHeader}>
              <Pressable
                style={styles.sheetHeaderSideBtn}
                onPress={() => setEditingName(false)}
                hitSlop={8}
              >
                <Text style={styles.sheetHeaderCancel}>{t('common.cancel')}</Text>
              </Pressable>
              <Text style={styles.sheetHeaderTitle}>{t('you.editName.title')}</Text>
              <Pressable
                style={styles.sheetHeaderSideBtn}
                onPress={saveName}
                disabled={!draftName.trim()}
                hitSlop={8}
              >
                <Text
                  style={[
                    styles.sheetHeaderSave,
                    !draftName.trim() && { color: colors.muted },
                  ]}
                >
                  {t('common.save')}
                </Text>
              </Pressable>
            </View>
            <View style={styles.sheetBody}>
              <Text style={styles.sheetTitle}>{t('you.editName.heading')}</Text>
              <Text style={styles.sheetSubtitle}>{t('you.editName.subtitle')}</Text>
              <TextInput
                value={draftName}
                onChangeText={setDraftName}
                style={styles.sheetInput}
                autoFocus
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={24}
                placeholder={t('onboarding.name.placeholder')}
                placeholderTextColor={colors.muted}
                returnKeyType="done"
                onSubmitEditing={saveName}
              />
            </View>
          </SafeAreaView>
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

  // Edit-name modal — native pageSheet with iOS-style header bar.
  sheetRoot: { flex: 1, backgroundColor: colors.paper },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  sheetHeaderSideBtn: {
    minWidth: 60,
  },
  sheetHeaderTitle: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 16,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  sheetHeaderCancel: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink2,
  },
  sheetHeaderSave: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    color: colors.primary,
    textAlign: 'right',
  },
  sheetBody: {
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  sheetTitle: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.ink,
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  sheetSubtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
    marginBottom: 18,
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
  },
});
