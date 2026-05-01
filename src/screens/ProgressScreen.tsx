import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { CheckIcon, ClockIcon, LeafIcon, TargetIcon } from '@/components/Icons';
import { getStats } from '@/api/client';
import type { Stats } from '@/api/types';
import { useContent } from '@/state/ContentProvider';
import { useT } from '@/i18n';

const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// Returns Mon-Sun indices (0..6) for the dates in `daysActive` (ISO YYYY-MM-DD).
function activeWeekdayIndices(isoDates: string[]): Set<number> {
  const result = new Set<number>();
  for (const iso of isoDates) {
    const d = new Date(iso + 'T12:00:00Z');
    // JS getUTCDay: Sun=0..Sat=6. We want Mon=0..Sun=6.
    const idx = (d.getUTCDay() + 6) % 7;
    result.add(idx);
  }
  return result;
}

function todayWeekdayIndex(): number {
  const d = new Date();
  return (d.getDay() + 6) % 7;
}

type Props = {
  dailyMinutes: number;
};

export function ProgressScreen({ dailyMinutes }: Props) {
  const { getLanguage } = useContent();
  const t = useT();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    getStats()
      .then((s) => {
        if (!cancelled && s) setStats(s);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const wordsKnown = stats?.wordsKnown ?? 0;
  const minutesThisWeek = stats?.minutesThisWeek ?? 0;
  const daysActive = stats?.daysActiveThisWeek ?? 0;
  const recentLessons = stats?.recentLessons ?? [];

  const activeIdx = activeWeekdayIndices(
    recentLessons
      .map((r) => r.completedAt.slice(0, 10))
      .filter((d) => {
        // only this week's days for the rhythm strip
        const t = new Date(d + 'T12:00:00Z').getTime();
        return t > Date.now() - 7 * 24 * 60 * 60 * 1000;
      }),
  );
  const todayIdx = todayWeekdayIndex();

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.title}>{t('progress.title')}</Text>
        <Text style={styles.sub}>{t('progress.subtitle')}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statRow}>
          <Stat
            icon={<TargetIcon size={18} color={colors.primary} />}
            value={wordsKnown.toLocaleString()}
            label={t('progress.stat.wordsKnown')}
            tint={colors.primarySoft}
          />
          <Stat
            icon={<ClockIcon size={18} color={colors.moss} />}
            value={`${minutesThisWeek}`}
            label={t('progress.stat.minutesThisWeek')}
            tint={colors.mossSoft}
          />
          <Stat
            icon={<LeafIcon size={18} color={colors.lilac} />}
            value={`${dailyMinutes}`}
            label={t('progress.stat.goalADay')}
            tint={colors.lilacSoft}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.cardKicker}>{t('progress.thisWeek')}</Text>
            <View style={styles.pill}>
              <LeafIcon size={12} color={colors.moss} />
              <Text style={styles.pillText}>{t('progress.daysOfSeven', { count: daysActive })}</Text>
            </View>
          </View>
          <View style={styles.weekGrid}>
            {WEEK.map((d, i) => {
              const isDone = activeIdx.has(i);
              const isToday = i === todayIdx;
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
          <Text style={styles.cardBody}>
            {daysActive >= 4
              ? t('progress.encouragement.steady')
              : daysActive > 0
              ? t('progress.encouragement.building')
              : t('progress.encouragement.fresh')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('progress.recentLabel')}</Text>
          {recentLessons.length === 0 && (
            <Text style={styles.empty}>{t('progress.recentEmpty')}</Text>
          )}
          {recentLessons.map((r) => {
            const target = getLanguage(r.courseId.split(':')[1]);
            return (
              <View key={r.lessonId} style={styles.row}>
                <View style={styles.rowMarker}>
                  <CheckIcon size={16} color={colors.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowTitle}>{r.title}</Text>
                  <Text style={styles.rowMeta}>
                    {target.flag} {target.name}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.encouragement}>
          <Text style={styles.encouragementTitle}>{t('progress.noStreaks.title')}</Text>
          <Text style={styles.encouragementBody}>{t('progress.noStreaks.body')}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({
  icon,
  value,
  label,
  tint,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  tint: string;
}) {
  return (
    <View style={styles.stat}>
      <View style={[styles.statIcon, { backgroundColor: tint }]}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  top: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 8,
  },
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
  scrollInner: { paddingHorizontal: 22, paddingBottom: 24, gap: 16 },

  statRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 18,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.ink,
    letterSpacing: -0.4,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
  },

  card: {
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 18,
    padding: 16,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardKicker: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.mossSoft,
    borderRadius: 999,
  },
  pillText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.moss,
  },
  weekGrid: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  weekDay: {
    flex: 1,
    height: 36,
    borderRadius: 10,
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
  weekDayText: { fontSize: 11, color: colors.muted, fontFamily: fonts.bodyHeavy },
  weekDayTextDone: { color: colors.white },
  weekDayTextToday: { color: colors.primary },
  cardBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink2,
    lineHeight: 18,
  },

  section: { gap: 8 },
  sectionLabel: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: colors.bg,
    borderRadius: 14,
  },
  rowMarker: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.moss,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.ink,
  },
  rowMeta: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    fontStyle: 'italic',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },

  encouragement: {
    padding: 16,
    backgroundColor: colors.lilacSoft,
    borderRadius: 18,
  },
  encouragementTitle: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: colors.ink,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  encouragementBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink2,
    lineHeight: 18,
  },
});
