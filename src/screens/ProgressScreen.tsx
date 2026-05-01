import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { CheckIcon, ClockIcon, LeafIcon, TargetIcon } from '@/components/Icons';

const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const TODAY_INDEX = 4;
const DONE_DAYS = new Set([0, 1, 2, 3]);

const RECENT = [
  { id: 'r-01', title: 'Greetings', meta: '12 words · 3 min' },
  { id: 'r-02', title: 'Numbers 1–20', meta: '20 words · 4 min' },
  { id: 'r-03', title: 'Polite phrases', meta: '8 words · 3 min' },
];

type Props = {
  dailyMinutes: number;
};

export function ProgressScreen({ dailyMinutes }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.sub}>Quietly cheering you on.</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statRow}>
          <Stat icon={<TargetIcon size={18} color={colors.primary} />} value="240" label="words known" tint={colors.primarySoft} />
          <Stat icon={<ClockIcon size={18} color={colors.moss} />} value={`${dailyMinutes} min`} label="goal a day" tint={colors.mossSoft} />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.cardKicker}>This week's rhythm</Text>
            <View style={styles.pill}>
              <LeafIcon size={12} color={colors.moss} />
              <Text style={styles.pillText}>4 of 7</Text>
            </View>
          </View>
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
          <Text style={styles.cardBody}>
            Lovely steady pace. Missed days don't undo what you've learned.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Recently completed</Text>
          {RECENT.map((r) => (
            <View key={r.id} style={styles.row}>
              <View style={styles.rowMarker}>
                <CheckIcon size={16} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{r.title}</Text>
                <Text style={styles.rowMeta}>{r.meta}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.encouragement}>
          <Text style={styles.encouragementTitle}>No streaks, no pressure.</Text>
          <Text style={styles.encouragementBody}>
            Pip tracks what you know, not what you missed. Whenever you come back, you pick up where
            you left off.
          </Text>
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
