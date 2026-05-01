import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { useT } from '@/i18n';

export type Status = 'idle' | 'correct' | 'wrong';

export type ExerciseProps<E> = {
  exercise: E;
  onResult: (correct: boolean) => void;
  onNext: () => void;
};

type FeedbackProps = {
  status: Status;
  correctText: string;
  correctTitle?: string;
  wrongTitle?: string;
};

export function Feedback({
  status,
  correctText,
  correctTitle,
  wrongTitle,
}: FeedbackProps) {
  const t = useT();
  if (status === 'idle') return null;
  const right = correctTitle ?? t('common.lovely');
  const wrong = wrongTitle ?? t('common.almost');
  return (
    <View style={feedbackStyles.feedback}>
      {status === 'correct' ? (
        <>
          <Text style={[feedbackStyles.title, { color: colors.moss }]}>{right}</Text>
          <Text style={feedbackStyles.body}>{correctText}</Text>
        </>
      ) : (
        <>
          <Text style={[feedbackStyles.title, { color: colors.berry }]}>{wrong}</Text>
          <Text style={feedbackStyles.body}>
            {t('lesson.feedback.theAnswerIs')}{' '}
            <Text style={{ fontFamily: fonts.bodyHeavy }}>{correctText}</Text>
          </Text>
        </>
      )}
    </View>
  );
}

const feedbackStyles = StyleSheet.create({
  feedback: {
    marginHorizontal: 24,
    marginTop: 4,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 18,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink2,
    lineHeight: 20,
  },
});

type ActionsRowProps = {
  status: Status;
  primaryEnabled?: boolean;
  primaryLabel?: string;
  onCheck: () => void;
  onSkip: () => void;
  onContinue: () => void;
  onTryAgain: () => void;
};

export function ActionsRow({
  status,
  primaryEnabled = true,
  primaryLabel,
  onCheck,
  onSkip,
  onContinue,
  onTryAgain,
}: ActionsRowProps) {
  const t = useT();
  const checkLabel = primaryLabel ?? t('common.check');
  return (
    <View style={actionStyles.actions}>
      {status === 'idle' && (
        <>
          <Pressable style={actionStyles.ghostBtn} onPress={onSkip}>
            <Text style={actionStyles.ghostBtnText}>{t('common.skip')}</Text>
          </Pressable>
          <Pressable
            style={[actionStyles.primaryBtn, !primaryEnabled && actionStyles.primaryBtnDisabled]}
            onPress={onCheck}
            disabled={!primaryEnabled}
          >
            <Text style={actionStyles.primaryBtnText}>{checkLabel}</Text>
          </Pressable>
        </>
      )}
      {status === 'correct' && (
        <Pressable style={[actionStyles.primaryBtn, { flex: 1 }]} onPress={onContinue}>
          <Text style={actionStyles.primaryBtnText}>{t('common.continue')}</Text>
        </Pressable>
      )}
      {status === 'wrong' && (
        <>
          <Pressable style={actionStyles.ghostBtn} onPress={onContinue}>
            <Text style={actionStyles.ghostBtnText}>{t('common.moveOn')}</Text>
          </Pressable>
          <Pressable
            style={[actionStyles.primaryBtn, actionStyles.primaryBtnCoral]}
            onPress={onTryAgain}
          >
            <Text style={actionStyles.primaryBtnText}>{t('common.tryAgain')}</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const actionStyles = StyleSheet.create({
  actions: {
    marginTop: 'auto',
    marginHorizontal: 24,
    marginBottom: 18,
    flexDirection: 'row',
    gap: 8,
  },
  ghostBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostBtnText: {
    color: colors.muted,
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  primaryBtn: {
    flex: 2,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.moss,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: {
    backgroundColor: colors.mossSoft,
  },
  primaryBtnCoral: {
    backgroundColor: colors.primary,
  },
  primaryBtnText: {
    color: colors.white,
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function normalize(s: string): string {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}
