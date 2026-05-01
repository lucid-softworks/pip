import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { useContent } from '@/state/ContentProvider';
import { type Course, type CourseId, makeCourseId } from '@/data/types';
import { CheckIcon } from '@/components/Icons';
import { Mascot } from '@/components/Mascot';
import { useT, pickLocale, SUPPORTED_UI_LOCALES, type UILocale } from '@/i18n';

export type OnboardingResult = {
  courseId: CourseId;
  userName: string;
  dailyMinutes: number;
  uiLocale: UILocale;
};

type Props = {
  onFinish: (result: OnboardingResult) => void;
  /** If provided, overrides the auto-detected default for the base-language step. */
  initialUiLocale?: string;
  initialName?: string;
  /** Called as soon as the user picks a base language so the app re-renders in it. */
  onPickUiLocale?: (locale: UILocale) => void;
};

const TOTAL_STEPS = 6;
const DEFAULT_NAME = 'Friend';
const DEFAULT_COURSE: CourseId = makeCourseId('en-US', 'fr-FR');
const DEFAULT_MINUTES = 10;

export function OnboardingScreen({
  onFinish,
  initialUiLocale,
  initialName,
  onPickUiLocale,
}: Props) {
  const t = useT();
  const [step, setStep] = useState(0);
  const [uiLocale, setUiLocale] = useState<UILocale>(() => pickLocale(initialUiLocale));
  const [courseId, setCourseId] = useState<CourseId | null>(null);
  const [userName, setUserName] = useState(initialName ?? '');
  const [minutes, setMinutes] = useState<number | null>(null);

  const next = () => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const skipAll = () =>
    onFinish({
      courseId: DEFAULT_COURSE,
      userName: DEFAULT_NAME,
      dailyMinutes: DEFAULT_MINUTES,
      uiLocale,
    });
  const finish = () =>
    onFinish({
      courseId: courseId ?? DEFAULT_COURSE,
      userName: userName.trim() || DEFAULT_NAME,
      dailyMinutes: minutes ?? DEFAULT_MINUTES,
      uiLocale,
    });

  const pickUiLocale = (loc: UILocale) => {
    setUiLocale(loc);
    onPickUiLocale?.(loc);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headerRow}>
        <View style={styles.dots}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === step && styles.dotActive,
                i < step && styles.dotPast,
              ]}
            />
          ))}
        </View>
        {step > 0 ? (
          <Pressable onPress={back} hitSlop={8} style={styles.headerSideBtn}>
            <BackIcon />
          </Pressable>
        ) : (
          <View style={styles.headerSideBtn} />
        )}
        <Pressable onPress={skipAll} hitSlop={8} style={styles.skipBtn}>
          <Text style={styles.skipBtnText}>{t('common.skip')}</Text>
        </Pressable>
      </View>

      {step === 0 && <WelcomeStep onNext={next} />}
      {step === 1 && (
        <BaseLanguageStep selected={uiLocale} onPick={pickUiLocale} onNext={next} />
      )}
      {step === 2 && (
        <LanguageStep selected={courseId} onPick={setCourseId} onNext={next} />
      )}
      {step === 3 && (
        <NameStep
          value={userName}
          onChange={setUserName}
          onNext={next}
        />
      )}
      {step === 4 && (
        <RhythmStep selected={minutes} onPick={setMinutes} onNext={next} />
      )}
      {step === 5 && (
        <CompleteStep
          userName={userName.trim() || DEFAULT_NAME}
          courseId={courseId ?? DEFAULT_COURSE}
          minutes={minutes ?? DEFAULT_MINUTES}
          onFinish={finish}
        />
      )}
    </KeyboardAvoidingView>
  );
}

// ---------- Step 1: Welcome ----------

function WelcomeStep({ onNext }: { onNext: () => void }) {
  const t = useT();
  return (
    <View style={styles.body}>
      <View style={styles.welcomeArt}>
        <View style={styles.welcomeArtBg} />
        <Mascot size={120} />
      </View>
      <Text style={styles.title}>{t('onboarding.welcome.title')}</Text>
      <Text style={styles.subtitle}>
        {t('onboarding.welcome.subtitleA')}{' '}
        <Text style={styles.subtitleEm}>{t('onboarding.welcome.subtitleB')}</Text>
      </Text>
      <View style={styles.bullets}>
        <Bullet text={t('onboarding.welcome.bullet.noStreaks')} />
        <Bullet text={t('onboarding.welcome.bullet.noPunish')} />
        <Bullet text={t('onboarding.welcome.bullet.storiesOnly')} />
      </View>
      <PrimaryButton label={t('onboarding.welcome.cta')} onPress={onNext} />
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bullet}>
      <View style={styles.bulletDot}>
        <CheckIcon size={12} color={colors.moss} />
      </View>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

// ---------- Step 1.5: Base (UI) language ----------

const UI_LOCALE_FLAGS: Record<UILocale, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇵🇹',
  it: '🇮🇹',
};

function BaseLanguageStep({
  selected,
  onPick,
  onNext,
}: {
  selected: UILocale;
  onPick: (loc: UILocale) => void;
  onNext: () => void;
}) {
  const t = useT();
  return (
    <View style={styles.body}>
      <Text style={styles.kicker}>{t('onboarding.step.1of4')}</Text>
      <Text style={styles.title}>{t('onboarding.base.title')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.base.subtitle')}</Text>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {SUPPORTED_UI_LOCALES.map((loc) => {
          const isPicked = loc === selected;
          return (
            <Pressable
              key={loc}
              onPress={() => onPick(loc)}
              style={[styles.langRow, isPicked && styles.langRowPicked]}
            >
              <Text style={styles.langFlag}>{UI_LOCALE_FLAGS[loc]}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.langName}>
                  {t(`lang.uiLocale.${loc}` as const)}
                </Text>
              </View>
              {isPicked && (
                <View style={styles.pickedBadge}>
                  <CheckIcon size={14} color={colors.white} />
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      <PrimaryButton label={t('common.continue')} onPress={onNext} />
    </View>
  );
}

// ---------- Step 2: Language ----------

function LanguageStep({
  selected,
  onPick,
  onNext,
}: {
  selected: CourseId | null;
  onPick: (id: CourseId) => void;
  onNext: () => void;
}) {
  const { getCourses, getLanguage } = useContent();
  const t = useT();
  const courses = getCourses();

  return (
    <View style={styles.body}>
      <Text style={styles.kicker}>{t('onboarding.step.2of4')}</Text>
      <Text style={styles.title}>{t('onboarding.language.title')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.language.subtitle')}</Text>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {courses.map((c) => {
          const target = getLanguage(c.target);
          const isPicked = c.id === selected;
          const disabled = !c.available;
          return (
            <Pressable
              key={c.id}
              onPress={() => !disabled && onPick(c.id)}
              disabled={disabled}
              style={[
                styles.langRow,
                isPicked && styles.langRowPicked,
                disabled && styles.langRowDisabled,
              ]}
            >
              <Text style={[styles.langFlag, disabled && { opacity: 0.55 }]}>
                {target.flag}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.langName, disabled && { color: colors.muted }]}>
                  {target.name}
                </Text>
                <Text style={styles.langSub}>
                  {disabled ? t('onboarding.language.comingSoon') : t('onboarding.language.fromEnglish')}
                </Text>
              </View>
              {isPicked && (
                <View style={styles.pickedBadge}>
                  <CheckIcon size={14} color={colors.white} />
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      <PrimaryButton label={t('common.continue')} onPress={onNext} disabled={!selected} />
    </View>
  );
}

// ---------- Step 3: Name ----------

function NameStep({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  const t = useT();
  return (
    <View style={styles.body}>
      <Text style={styles.kicker}>{t('onboarding.step.3of4')}</Text>
      <Text style={styles.title}>{t('onboarding.name.title')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.name.subtitle')}</Text>

      <View style={styles.inputWrap}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={t('onboarding.name.placeholder')}
          placeholderTextColor={colors.muted}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={24}
          autoFocus
          returnKeyType="next"
          onSubmitEditing={onNext}
        />
      </View>

      <PrimaryButton label={t('common.continue')} onPress={onNext} />
    </View>
  );
}

// ---------- Step 4: Daily rhythm ----------

type RhythmOption = {
  minutes: number;
  subKey: 'onboarding.rhythm.coffeeBreak' | 'onboarding.rhythm.quickVisit' | 'onboarding.rhythm.realChunk' | 'onboarding.rhythm.deepDive';
};

const RHYTHM_OPTIONS: RhythmOption[] = [
  { minutes: 3, subKey: 'onboarding.rhythm.coffeeBreak' },
  { minutes: 5, subKey: 'onboarding.rhythm.quickVisit' },
  { minutes: 10, subKey: 'onboarding.rhythm.realChunk' },
  { minutes: 20, subKey: 'onboarding.rhythm.deepDive' },
];

function RhythmStep({
  selected,
  onPick,
  onNext,
}: {
  selected: number | null;
  onPick: (m: number) => void;
  onNext: () => void;
}) {
  const t = useT();
  return (
    <View style={styles.body}>
      <Text style={styles.kicker}>{t('onboarding.step.4of4')}</Text>
      <Text style={styles.title}>{t('onboarding.rhythm.title')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.rhythm.subtitle')}</Text>

      <View style={[styles.list, { gap: 10 }]}>
        {RHYTHM_OPTIONS.map((o) => {
          const isPicked = o.minutes === selected;
          return (
            <Pressable
              key={o.minutes}
              onPress={() => onPick(o.minutes)}
              style={[styles.rhythmRow, isPicked && styles.rhythmRowPicked]}
            >
              <Text style={[styles.rhythmTitle, isPicked && { color: colors.primary }]}>
                {t('home.minutes', { count: o.minutes })}
              </Text>
              <Text style={styles.rhythmSub}>{t(o.subKey)}</Text>
              {isPicked && (
                <View style={styles.pickedBadge}>
                  <CheckIcon size={14} color={colors.white} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <PrimaryButton label={t('common.continue')} onPress={onNext} disabled={selected === null} />
    </View>
  );
}

// ---------- Step 5: Complete ----------

function CompleteStep({
  userName,
  courseId,
  minutes,
  onFinish,
}: {
  userName: string;
  courseId: CourseId;
  minutes: number;
  onFinish: () => void;
}) {
  const { getLanguage } = useContent();
  const t = useT();
  const target = getLanguage(courseId.split(':')[1]);
  return (
    <View style={styles.body}>
      <View style={styles.welcomeArt}>
        <View style={styles.welcomeArtBg} />
        <Mascot size={120} />
      </View>
      <Text style={styles.title}>{t('onboarding.complete.title', { name: userName })}</Text>
      <Text style={styles.subtitle}>
        {t('onboarding.complete.subtitle', {
          flag: target.flag,
          language: target.name,
          minutes,
        })}
      </Text>
      <View style={styles.summaryCard}>
        <SummaryRow
          label={t('onboarding.complete.summary.learning')}
          value={`${target.flag}  ${target.name}`}
        />
        <SummaryRow
          label={t('onboarding.complete.summary.rhythm')}
          value={t('onboarding.complete.summary.minutesPerDay', { minutes })}
        />
        <SummaryRow
          label={t('onboarding.complete.summary.pricing')}
          value={t('onboarding.complete.summary.freeAll')}
        />
      </View>
      <PrimaryButton label={t('common.begin')} onPress={onFinish} />
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

// ---------- Shared bits ----------

function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.cta, disabled && styles.ctaDisabled]}
    >
      <Text style={styles.ctaText}>{label}</Text>
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

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  headerRow: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dots: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    width: 18,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
  },
  dotPast: {
    backgroundColor: colors.moss,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  headerSideBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  skipBtnText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 12,
    color: colors.muted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },

  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  kicker: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.ink,
    letterSpacing: -0.8,
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink2,
    lineHeight: 21,
    marginBottom: 22,
  },
  subtitleEm: {
    fontFamily: fonts.bodyHeavy,
    color: colors.ink,
  },

  // Welcome
  welcomeArt: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginTop: 8,
    marginBottom: 16,
    position: 'relative',
  },
  welcomeArtBg: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.butterSoft,
    top: 0,
    opacity: 0.7,
  },
  bullets: {
    gap: 10,
    marginBottom: 20,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bulletDot: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: colors.mossSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink2,
    flex: 1,
  },

  // Language
  list: { flex: 1 },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 18,
  },
  langRowPicked: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  langRowDisabled: {
    opacity: 0.7,
  },
  langFlag: { fontSize: 30 },
  langName: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.ink,
  },
  langSub: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  pickedBadge: {
    width: 26,
    height: 26,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Name
  inputWrap: {
    marginBottom: 16,
  },
  input: {
    height: 60,
    paddingHorizontal: 18,
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 18,
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    letterSpacing: -0.5,
  },

  // Rhythm
  rhythmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 18,
  },
  rhythmRowPicked: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  rhythmTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    letterSpacing: -0.5,
    width: 88,
  },
  rhythmSub: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
  },

  // Complete
  summaryCard: {
    padding: 16,
    backgroundColor: colors.bg,
    borderRadius: 18,
    marginBottom: 22,
    gap: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  summaryValue: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.ink,
  },

  // CTA
  cta: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  ctaDisabled: {
    backgroundColor: colors.line,
  },
  ctaText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    color: colors.white,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
