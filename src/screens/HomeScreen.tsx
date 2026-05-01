import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { useContent } from '@/state/ContentProvider';
import {
  type CourseId,
  type LessonStub,
  type Unit,
  parseCourseId,
} from '@/data/types';
import type { RemoteProgress } from '@/api/types';
import { CheckIcon, ClockIcon, LeafIcon, TargetIcon } from '@/components/Icons';
import { PlayIcon } from '@/components/PlayIcon';
import { LanguageSheet } from '@/components/LanguageSheet';

type Props = {
  activeCourseId: CourseId;
  enrolledCourses: Set<CourseId>;
  userName: string;
  progress: RemoteProgress[];
  onOpenLesson: (lessonId: string) => void;
  onSwitchCourse: (id: CourseId) => void;
  onEnrollCourse: (id: CourseId) => void;
};

const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const TODAY_INDEX = 4;
const DONE_DAYS = new Set([0, 1, 2, 3]);

type ResolvedLesson = LessonStub & {
  /** completedExercises / totalExercises if we have any progress for it. */
  segments?: { done: number; total: number };
};

function resolveUnitState(unit: Unit, progress: RemoteProgress[]): ResolvedLesson[] {
  const byId = new Map(progress.map((p) => [p.lessonId, p]));
  let firstUnfinishedAssigned = false;

  return unit.lessons.map((stub) => {
    if (stub.state === 'story') return stub;
    const p = byId.get(stub.id);
    if (p?.completedAt) {
      return { ...stub, state: 'done' as const };
    }
    const segments = p
      ? { done: p.completedExercises, total: p.totalExercises }
      : undefined;
    if (!firstUnfinishedAssigned) {
      firstUnfinishedAssigned = true;
      return { ...stub, state: 'current' as const, segments };
    }
    return { ...stub, state: 'upcoming' as const, segments };
  });
}

export function HomeScreen({
  activeCourseId,
  enrolledCourses,
  userName,
  progress,
  onOpenLesson,
  onSwitchCourse,
  onEnrollCourse,
}: Props) {
  const { loadUnitsForCourse, getLanguage } = useContent();
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setUnits(null);
    loadUnitsForCourse(activeCourseId).then(setUnits);
  }, [activeCourseId, loadUnitsForCourse]);

  const target = getLanguage(parseCourseId(activeCourseId).target);

  const resolved = useMemo<ResolvedLesson[]>(() => {
    if (!units || units.length === 0) return [];
    return resolveUnitState(units[0], progress);
  }, [units, progress]);

  if (!units || units.length === 0) return <View style={styles.root} />;

  const unit = units[0];
  const currentLesson = resolved.find((l) => l.state === 'current') ?? resolved[0];
  const allLessonsDone = resolved
    .filter((l) => l.state !== 'story')
    .every((l) => l.state === 'done');

  return (
    <View style={styles.root}>
      <View style={styles.body}>
        <View style={styles.topRow}>
          <Pressable style={styles.langChip} onPress={() => setSheetOpen(true)}>
            <Text style={styles.langChipFlag}>{target.flag}</Text>
            <Text style={styles.langChipName}>{target.name}</Text>
            <ChevronDown />
          </Pressable>
          <View style={styles.habitPill}>
            <LeafIcon size={14} color={colors.moss} />
            <Text style={styles.habitPillText}>240 words</Text>
          </View>
        </View>

        <View style={styles.greetRow}>
          <Text style={styles.greetHi}>Welcome back,</Text>
          <Text style={styles.greetWho}>{userName}.</Text>
        </View>

        <View style={styles.encourage}>
          <View style={styles.weekGrid}>
            {WEEK.map((d, i) => {
              const isDone = DONE_DAYS.has(i);
              const isToday = i === TODAY_INDEX;
              return (
                <View
                  key={i}
                  style={[
                    styles.weekDay,
                    isDone && styles.weekDayDone,
                    isToday && styles.weekDayToday,
                  ]}
                >
                  <Text
                    style={[
                      styles.weekDayText,
                      isDone && styles.weekDayTextDone,
                      isToday && styles.weekDayTextToday,
                    ]}
                  >
                    {d}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.encourageText}>
            <Text style={styles.encourageStrong}>4 of last 5 days</Text>
            <Text style={styles.encourageSub}>Lovely rhythm. No pressure to keep it perfect.</Text>
          </View>
        </View>

        <ScrollView
          style={styles.chapters}
          contentContainerStyle={styles.chaptersInner}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.chapterHead}>
            <Text style={styles.chapterLabel}>
              {`Unit 01 · ${unit.level} · ${unit.name}`}
            </Text>
          </View>

          {!allLessonsDone && (
            <Pressable
              style={styles.currentCard}
              onPress={() => onOpenLesson(currentLesson.id)}
            >
              <View style={styles.glow} />
              <View style={styles.glow2} />
              <View style={styles.cardRow1}>
                <View style={styles.liveDot} />
                <Text style={styles.cardKicker}>
                  {currentLesson.segments?.done
                    ? 'Pick up where you left off'
                    : 'Up next'}
                </Text>
              </View>
              <Text style={styles.cardTitle}>{currentLesson.title}</Text>
              <View style={styles.progressTrack}>
                {(() => {
                  const total = currentLesson.segments?.total ?? 5;
                  const done = currentLesson.segments?.done ?? 0;
                  return Array.from({ length: total }).map((_, i) => (
                    <View key={i} style={[styles.seg, i < done && styles.segDone]} />
                  ));
                })()}
              </View>
              <View style={styles.cardRow2}>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <ClockIcon size={12} color={colors.paper} />
                    <Text style={styles.metaText}>3 min</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <TargetIcon size={12} color={colors.paper} />
                    <Text style={styles.metaText}>
                      {currentLesson.meta ?? 'A new lesson'}
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={styles.playCta}
                  onPress={() => onOpenLesson(currentLesson.id)}
                >
                  <Text style={styles.playCtaText}>
                    {currentLesson.segments?.done ? 'Resume' : 'Start'}
                  </Text>
                  <PlayIcon size={11} color={colors.white} />
                </Pressable>
              </View>
            </Pressable>
          )}

          {allLessonsDone && (
            <View style={styles.allDoneCard}>
              <Text style={styles.allDoneTitle}>You did the whole unit. ✨</Text>
              <Text style={styles.allDoneBody}>
                Take a beat. The next unit will be here soon — and your finished lessons will
                always be here to revisit.
              </Text>
            </View>
          )}

          <View style={styles.lessonList}>
            {resolved
              .filter((l) => l.state !== 'current')
              .map((l) => (
                <LessonRow key={l.id} stub={l} onPress={() => onOpenLesson(l.id)} />
              ))}
          </View>
        </ScrollView>
      </View>

      <LanguageSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        activeCourseId={activeCourseId}
        enrolledCourses={enrolledCourses}
        onSwitchCourse={onSwitchCourse}
        onEnrollCourse={onEnrollCourse}
      />
    </View>
  );
}

function ChevronDown() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 10 L12 15 L17 10"
        stroke={colors.muted}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function LessonRow({ stub, onPress }: { stub: LessonStub; onPress: () => void }) {
  let markerStyle: ViewStyle = styles.markerUpcoming;
  let markerContent: React.ReactNode = (
    <Text style={styles.markerNum}>·</Text>
  );

  if (stub.state === 'done') {
    markerStyle = styles.markerDone;
    markerContent = <CheckIcon size={18} color={colors.white} />;
  } else if (stub.state === 'story') {
    markerStyle = styles.markerStory;
    markerContent = <Text style={[styles.markerNum, { color: colors.lilac }]}>♢</Text>;
  }

  return (
    <Pressable
      style={[styles.lessonRow, stub.state === 'done' && styles.lessonRowDone]}
      onPress={onPress}
    >
      <View style={[styles.marker, markerStyle]}>{markerContent}</View>
      <View style={styles.lessonInfo}>
        <View style={styles.lessonTitleRow}>
          <Text style={styles.lessonTitle}>{stub.title}</Text>
          {stub.premium && (
            <View style={styles.premiumTag}>
              <Text style={styles.premiumTagText}>Pip+</Text>
            </View>
          )}
        </View>
        {stub.meta && <Text style={styles.lessonMeta}>{stub.meta}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  body: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  topRow: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 8,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
  },
  langChipFlag: { fontSize: 18 },
  langChipName: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.ink,
    letterSpacing: -0.1,
  },
  habitPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.mossSoft,
    borderRadius: 999,
  },
  habitPillText: { fontSize: 12, color: colors.moss, fontFamily: fonts.bodyHeavy },
  greetRow: {
    paddingHorizontal: 22,
    paddingBottom: 16,
  },
  greetHi: { fontSize: 12, color: colors.muted, fontFamily: fonts.bodyBold },
  greetWho: {
    fontSize: 26,
    color: colors.ink,
    fontFamily: fonts.display,
    letterSpacing: -0.8,
    lineHeight: 30,
  },
  encourage: {
    marginHorizontal: 22,
    marginBottom: 18,
    padding: 14,
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weekGrid: { flexDirection: 'row', gap: 4 },
  weekDay: {
    width: 18,
    height: 26,
    borderRadius: 5,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayDone: { backgroundColor: colors.moss },
  weekDayToday: {
    backgroundColor: colors.primarySoft,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  weekDayText: { fontSize: 9, color: colors.muted, fontFamily: fonts.bodyHeavy },
  weekDayTextDone: { color: colors.white },
  weekDayTextToday: { color: colors.primary },
  encourageText: { flex: 1 },
  encourageStrong: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.ink,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  encourageSub: {
    fontSize: 12,
    color: colors.ink2,
    fontFamily: fonts.body,
    lineHeight: 16,
  },
  chapters: { flex: 1 },
  chaptersInner: { paddingHorizontal: 22, paddingBottom: 16 },
  chapterHead: { paddingTop: 4, marginBottom: 12 },
  chapterLabel: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: colors.muted,
    fontFamily: fonts.bodyHeavy,
    textTransform: 'uppercase',
  },
  allDoneCard: {
    padding: 18,
    backgroundColor: colors.mossSoft,
    borderRadius: 20,
    marginBottom: 12,
  },
  allDoneTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  allDoneBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink2,
    lineHeight: 18,
  },
  currentCard: {
    backgroundColor: colors.ink,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.primary,
    opacity: 0.35,
    top: -50,
    right: -50,
  },
  glow2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.butter,
    opacity: 0.3,
    bottom: -30,
    left: 60,
  },
  cardRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  cardKicker: {
    color: colors.paper,
    opacity: 0.7,
    fontSize: 10,
    letterSpacing: 1.4,
    fontFamily: fonts.bodyHeavy,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: colors.paper,
    fontFamily: fonts.display,
    fontSize: 24,
    letterSpacing: -0.6,
    marginBottom: 14,
  },
  progressTrack: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 14,
  },
  seg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 999,
  },
  segDone: { backgroundColor: colors.primary },
  cardRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  metaRow: { flexDirection: 'row', gap: 14 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: {
    color: colors.paper,
    opacity: 0.8,
    fontSize: 11,
    fontFamily: fonts.body,
  },
  playCta: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playCtaText: {
    color: colors.white,
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    letterSpacing: -0.2,
  },
  lessonList: { gap: 8 },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    backgroundColor: colors.bg,
    borderRadius: 16,
  },
  lessonRowDone: { backgroundColor: 'transparent' },
  marker: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDone: { backgroundColor: colors.moss },
  markerUpcoming: {
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.line,
  },
  markerStory: { backgroundColor: colors.lilacSoft },
  markerNum: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.muted,
  },
  lessonInfo: { flex: 1 },
  lessonTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  lessonTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  lessonMeta: {
    fontSize: 11,
    color: colors.muted,
    fontFamily: fonts.body,
    marginTop: 3,
  },
  premiumTag: {
    backgroundColor: colors.lilacSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  premiumTagText: {
    color: colors.lilac,
    fontFamily: fonts.bodyHeavy,
    fontSize: 9,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
