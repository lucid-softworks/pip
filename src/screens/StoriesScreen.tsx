import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { useContent } from '@/state/ContentProvider';
import type { LanguageTag, Story } from '@/data/types';
import { CheckIcon, ClockIcon } from '@/components/Icons';
import { useT } from '@/i18n';

type Props = {
  targetLanguage: LanguageTag;
};

const THUMB_COLOR_MAP: Record<Story['thumbColor'], { bg: string; fg: string }> = {
  butter: { bg: colors.butterSoft, fg: colors.butter },
  sky: { bg: colors.skySoft, fg: colors.sky },
  lilac: { bg: colors.lilacSoft, fg: colors.lilac },
  moss: { bg: colors.mossSoft, fg: colors.moss },
  berry: { bg: colors.berrySoft, fg: colors.berry },
};

export function StoriesScreen({ targetLanguage }: Props) {
  const { loadStoriesForLanguage, getLanguage } = useContent();
  const t = useT();
  const [stories, setStories] = useState<Story[] | null>(null);
  const lang = getLanguage(targetLanguage);

  useEffect(() => {
    setStories(null);
    loadStoriesForLanguage(targetLanguage).then(setStories);
  }, [targetLanguage, loadStoriesForLanguage]);

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.title}>{t('stories.title')}</Text>
        <View style={styles.bookmarkBtn}>
          <BookmarkIcon />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.introSmall}>
            {t('stories.intro.kicker', { flag: lang.flag, language: lang.name })}
          </Text>
          <Text style={styles.introTitle}>
            {t('stories.intro.title', { language: lang.name })}
          </Text>
          <Text style={styles.introBody}>{t('stories.intro.body')}</Text>
        </View>

        <View style={styles.freeStrip}>
          <View style={styles.freeStripIcon}>
            <CheckIcon size={14} color={colors.moss} />
          </View>
          <Text style={styles.freeStripText}>
            <Text style={styles.freeStripStrong}>{t('stories.freeStrip.strong')}</Text>{' '}
            {t('stories.freeStrip.body')}
          </Text>
        </View>

        <View style={styles.list}>
          {stories?.map((story) => {
            const locked = !story.freeThisWeek;
            return <StoryCard key={story.id} story={story} locked={locked} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function StoryCard({ story, locked }: { story: Story; locked: boolean }) {
  const t = useT();
  const palette = THUMB_COLOR_MAP[story.thumbColor];
  return (
    <Pressable style={[styles.card, locked && styles.cardLocked]}>
      <View style={[styles.thumb, { backgroundColor: palette.bg }]}>
        {locked ? (
          <View style={styles.lockOverlay}>
            <LockIcon color={colors.muted} />
          </View>
        ) : (
          <HeadphonesIcon color={palette.fg} />
        )}
      </View>
      <View style={styles.cardInfo}>
        <View style={styles.topRow}>
          <Text style={styles.level}>{`${story.level} · ${levelLabel(story.level, t)}`}</Text>
        </View>
        <Text style={styles.cardTitle}>{story.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>
          {story.blurb}
        </Text>
        <View style={styles.bottomRow}>
          <View style={styles.metaItem}>
            <ClockIcon size={12} color={colors.muted} />
            <Text style={styles.metaText}>{t('stories.duration', { count: story.minutes })}</Text>
          </View>
          {story.freeThisWeek && (
            <Text style={[styles.metaText, { color: colors.moss, fontFamily: fonts.bodyHeavy }]}>
              {t('stories.freeThisWeek')}
            </Text>
          )}
          {locked && (
            <Text style={[styles.metaText, { color: colors.lilac, fontFamily: fonts.bodyHeavy }]}>
              {t('stories.pip+')}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

function levelLabel(
  level: Story['level'],
  t: (key: 'stories.level.beginner' | 'stories.level.intermediate' | 'stories.level.advanced') => string,
): string {
  switch (level) {
    case 'A1':
    case 'A2':
      return t('stories.level.beginner');
    case 'B1':
    case 'B2':
      return t('stories.level.intermediate');
    case 'C1':
      return t('stories.level.advanced');
  }
}

function BookmarkIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 4 H17 V20 L12 17 L7 20 Z"
        stroke={colors.muted}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function HeadphonesIcon({ color }: { color: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 14 V12 a8 8 0 0 1 16 0 v2"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
      />
      <Path
        d="M4 14 V18 a2 2 0 0 0 2 2 H8 V14 H4 Z"
        stroke={color}
        strokeWidth={1.9}
        strokeLinejoin="round"
      />
      <Path
        d="M20 14 V18 a2 2 0 0 1 -2 2 H16 V14 H20 Z"
        stroke={color}
        strokeWidth={1.9}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function LockIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 11 V8 a5 5 0 0 1 10 0 v3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M5 11 H19 V20 H5 Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  top: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.ink,
    letterSpacing: -0.7,
  },
  bookmarkBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  scroll: { flex: 1 },
  scrollInner: { paddingHorizontal: 22, paddingBottom: 24 },
  intro: { marginTop: 8, marginBottom: 16 },
  introSmall: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  introTitle: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.ink,
    letterSpacing: -0.6,
    lineHeight: 28,
    marginBottom: 8,
  },
  introBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink2,
    lineHeight: 20,
  },
  freeStrip: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.mossSoft,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  freeStripIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeStripText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink2,
    lineHeight: 18,
  },
  freeStripStrong: {
    fontFamily: fonts.bodyHeavy,
    color: colors.ink,
  },
  list: { gap: 10 },
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 18,
  },
  cardLocked: { opacity: 0.85 },
  thumb: {
    width: 88,
    height: 88,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockOverlay: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: { flex: 1, justifyContent: 'space-between' },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  level: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 10,
    color: colors.muted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 17,
    color: colors.ink,
    letterSpacing: -0.4,
    marginTop: 4,
  },
  cardDesc: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink2,
    lineHeight: 18,
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: colors.muted,
  },
});
