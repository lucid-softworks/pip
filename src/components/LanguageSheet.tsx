import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import type { Course, CourseId } from '@/data/types';
import { useContent } from '@/state/ContentProvider';
import { CheckIcon } from '@/components/Icons';
import { useT } from '@/i18n';

type Props = {
  visible: boolean;
  onClose: () => void;
  activeCourseId: CourseId;
  enrolledCourses: Set<CourseId>;
  onSwitchCourse: (id: CourseId) => void;
  onEnrollCourse: (id: CourseId) => void;
};

type Mode = 'switch' | 'add';

export function LanguageSheet({
  visible,
  onClose,
  activeCourseId,
  enrolledCourses,
  onSwitchCourse,
  onEnrollCourse,
}: Props) {
  const { getCourses, getLanguage } = useContent();
  const t = useT();
  const courses = getCourses();
  const [mode, setMode] = useState<Mode>('switch');

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => setMode('switch'), 250);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const enrolled = courses.filter((c) => enrolledCourses.has(c.id));
  const addable = courses.filter((c) => !enrolledCourses.has(c.id));

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.sheetRoot} edges={['bottom']}>
        <View style={styles.header}>
          {mode === 'add' ? (
            <Pressable
              style={styles.headerSideBtn}
              onPress={() => setMode('switch')}
              hitSlop={8}
            >
              <BackIcon />
            </Pressable>
          ) : (
            <View style={styles.headerSideBtn} />
          )}
          <Text style={styles.title}>
            {mode === 'switch' ? t('lang.yourCourses') : t('lang.addLanguage')}
          </Text>
          <Pressable style={styles.headerSideBtn} onPress={onClose} hitSlop={8}>
            <CloseIcon />
          </Pressable>
        </View>

        {mode === 'switch' && (
          <>
            <Text style={styles.subtitle}>{t('lang.tapToSwitch')}</Text>
            <ScrollView
              contentContainerStyle={styles.listInner}
              showsVerticalScrollIndicator={false}
            >
              {enrolled.map((c) => (
                <CourseRow
                  key={c.id}
                  course={c}
                  active={c.id === activeCourseId}
                  onPress={() => {
                    onSwitchCourse(c.id);
                    onClose();
                  }}
                />
              ))}
              <Pressable style={styles.addCta} onPress={() => setMode('add')}>
                <Text style={styles.addCtaText}>+ {t('lang.addLanguage')}</Text>
              </Pressable>
            </ScrollView>
          </>
        )}

        {mode === 'add' && (
          <>
            <Text style={styles.subtitle}>{t('lang.pickAnother')}</Text>
            <ScrollView
              contentContainerStyle={styles.listInner}
              showsVerticalScrollIndicator={false}
            >
              {addable.length === 0 && (
                <Text style={styles.empty}>{t('lang.fullCatalog')}</Text>
              )}
              {addable.map((c) => (
                <AddableRow
                  key={c.id}
                  course={c}
                  onPress={() => {
                    if (!c.available) return;
                    onEnrollCourse(c.id);
                    onClose();
                  }}
                />
              ))}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
}

function CourseRow({
  course,
  active,
  onPress,
}: {
  course: Course;
  active: boolean;
  onPress: () => void;
}) {
  const { getLanguage } = useContent();
  const t = useT();
  const target = getLanguage(course.target);
  const source = getLanguage(course.source);
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, active && styles.rowActive]}
    >
      <Text style={styles.flag}>{target.flag}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{target.name}</Text>
        <Text style={styles.rowSub}>{t('lang.fromSource', { source: source.name })}</Text>
      </View>
      {active && (
        <View style={styles.activeBadge}>
          <CheckIcon size={14} color={colors.white} />
        </View>
      )}
    </Pressable>
  );
}

function AddableRow({ course, onPress }: { course: Course; onPress: () => void }) {
  const { getLanguage } = useContent();
  const t = useT();
  const target = getLanguage(course.target);
  const source = getLanguage(course.source);
  const disabled = !course.available;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.row, disabled && styles.rowDisabled]}
    >
      <Text style={[styles.flag, disabled && { opacity: 0.55 }]}>{target.flag}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowTitle, disabled && { color: colors.muted }]}>{target.name}</Text>
        <Text style={styles.rowSub}>
          {disabled ? t('lang.comingSoon') : t('lang.fromSource', { source: source.name })}
        </Text>
      </View>
      {!disabled && <Text style={styles.addHint}>{t('common.add')}</Text>}
    </Pressable>
  );
}

function BackIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 5 L7 12 L14 19"
        stroke={colors.ink}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CloseIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 6 L18 18 M18 6 L6 18"
        stroke={colors.muted}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  sheetRoot: {
    flex: 1,
    backgroundColor: colors.paper,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  headerSideBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    marginBottom: 14,
  },
  listInner: {
    gap: 8,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    backgroundColor: colors.bg,
    borderRadius: 16,
  },
  rowActive: {
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  rowDisabled: {
    opacity: 0.7,
  },
  flag: { fontSize: 28 },
  rowTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  rowSub: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  activeBadge: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addHint: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.moss,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    fontStyle: 'italic',
    paddingVertical: 14,
  },
  addCta: {
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addCtaText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.ink2,
    letterSpacing: -0.1,
  },
});
