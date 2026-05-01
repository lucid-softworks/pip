import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { loadUnits } from '@/data/lessons';
import type { LessonStub, Unit } from '@/data/types';
import { CheckIcon, ClockIcon, LeafIcon, TargetIcon } from '@/components/Icons';
import { PlayIcon } from '@/components/PlayIcon';

type Props = {
  onOpenLesson: (lessonId: string) => void;
};

const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const TODAY_INDEX = 4;
const DONE_DAYS = new Set([0, 1, 2, 3]);

export function HomeScreen({ onOpenLesson }: Props) {
  const [units, setUnits] = useState<Unit[] | null>(null);

  useEffect(() => {
    loadUnits().then(setUnits);
  }, []);

  if (!units) return <View style={styles.root} />;

  const unit = units[0];
  const currentLesson = unit.lessons.find((l) => l.state === 'current') ?? unit.lessons[0];

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={styles.greet}>
            <Text style={styles.greetHi}>Welcome back,</Text>
            <Text style={styles.greetWho}>Luna.</Text>
          </View>
          <View style={styles.habitPill}>
            <LeafIcon size={14} color={colors.moss} />
            <Text style={styles.habitPillText}>240 words</Text>
          </View>
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

          <Pressable
            style={styles.currentCard}
            onPress={() => onOpenLesson(currentLesson.id)}
          >
            <View style={styles.glow} />
            <View style={styles.glow2} />
            <View style={styles.cardRow1}>
              <View style={styles.liveDot} />
              <Text style={styles.cardKicker}>Pick up where you left off</Text>
            </View>
            <Text style={styles.cardTitle}>{currentLesson.title}</Text>
            <View style={styles.progressTrack}>
              {[true, true, false, false, false].map((done, i) => (
                <View key={i} style={[styles.seg, done && styles.segDone]} />
              ))}
            </View>
            <View style={styles.cardRow2}>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <ClockIcon size={12} color={colors.paper} />
                  <Text style={styles.metaText}>3 min</Text>
                </View>
                <View style={styles.metaItem}>
                  <TargetIcon size={12} color={colors.paper} />
                  <Text style={styles.metaText}>10 new words</Text>
                </View>
              </View>
              <Pressable
                style={styles.playCta}
                onPress={() => onOpenLesson(currentLesson.id)}
              >
                <Text style={styles.playCtaText}>Resume</Text>
                <PlayIcon size={11} color={colors.white} />
              </Pressable>
            </View>
          </Pressable>

          <View style={styles.lessonList}>
            {unit.lessons
              .filter((l) => l.state !== 'current')
              .map((l) => (
                <LessonRow key={l.id} stub={l} onPress={() => onOpenLesson(l.id)} />
              ))}
          </View>
        </ScrollView>
      </View>

      <TabBar />
    </SafeAreaView>
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

function TabBar() {
  return (
    <View style={styles.tabbar}>
      {[
        { key: 'learn', label: 'Learn', active: true },
        { key: 'stories', label: 'Stories' },
        { key: 'progress', label: 'Progress' },
        { key: 'you', label: 'You' },
      ].map((t) => (
        <View key={t.key} style={styles.tab}>
          {t.active && <View style={styles.tabActiveBar} />}
          <View style={styles.tabIconBox}>
            <View
              style={[
                styles.tabIconDot,
                { backgroundColor: t.active ? colors.primary : colors.muted },
              ]}
            />
          </View>
          <Text style={[styles.tabLabel, t.active && styles.tabLabelActive]}>{t.label}</Text>
        </View>
      ))}
    </View>
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
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  greet: { flex: 1, minWidth: 0 },
  greetHi: { fontSize: 12, color: colors.muted, fontFamily: fonts.bodyBold },
  greetWho: {
    fontSize: 26,
    color: colors.ink,
    fontFamily: fonts.display,
    letterSpacing: -0.8,
    lineHeight: 30,
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
  tabbar: {
    height: 76,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 18,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.paper,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 6,
  },
  tabActiveBar: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 3,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  tabIconBox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconDot: {
    width: 14,
    height: 14,
    borderRadius: 4,
    opacity: 0.6,
  },
  tabLabel: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: fonts.bodyHeavy,
    letterSpacing: 0.2,
  },
  tabLabelActive: { color: colors.primary },
});
