import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import {
  type Course,
  type CourseId,
  getLanguage,
} from '@/data/courses';
import { loadCourses } from '@/data/lessons';
import { CheckIcon } from '@/components/Icons';

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
  const [mode, setMode] = useState<Mode>('switch');
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    loadCourses().then(setCourses);
  }, []);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => setMode('switch'), 250);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const enrolled = courses?.filter((c) => enrolledCourses.has(c.id)) ?? [];
  const addable = courses?.filter((c) => !enrolledCourses.has(c.id)) ?? [];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalRoot}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <SafeAreaView edges={['bottom']} style={styles.sheetWrap}>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <View style={styles.header}>
              {mode === 'add' && (
                <Pressable
                  style={styles.backBtn}
                  onPress={() => setMode('switch')}
                  hitSlop={8}
                >
                  <BackIcon />
                </Pressable>
              )}
              <Text style={styles.title}>
                {mode === 'switch' ? 'Your courses' : 'Add a language'}
              </Text>
              <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={8}>
                <CloseIcon />
              </Pressable>
            </View>

            {mode === 'switch' && (
              <>
                <Text style={styles.subtitle}>Tap one to switch.</Text>
                <View style={styles.list}>
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
                </View>
                <Pressable style={styles.addCta} onPress={() => setMode('add')}>
                  <Text style={styles.addCtaText}>+ Add a language</Text>
                </Pressable>
              </>
            )}

            {mode === 'add' && (
              <>
                <Text style={styles.subtitle}>Pick another to start learning.</Text>
                <View style={styles.list}>
                  {addable.length === 0 && (
                    <Text style={styles.empty}>You've enrolled in everything we've got.</Text>
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
                </View>
              </>
            )}
          </View>
        </SafeAreaView>
      </View>
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
        <Text style={styles.rowSub}>From {source.name}</Text>
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
          {disabled ? 'Coming soon' : `From ${source.name}`}
        </Text>
      </View>
      {!disabled && <Text style={styles.addHint}>+ Add</Text>}
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
  modalRoot: { flex: 1 },
  backdrop: {
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
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    letterSpacing: -0.5,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    marginBottom: 14,
  },
  list: {
    gap: 8,
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
