import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { Mascot } from '@/components/Mascot';
import { PlayIcon } from '@/components/PlayIcon';
import { useSpeech } from '@/hooks/useSpeech';
import { useT } from '@/i18n';
import type { LocalizedText, MultipleChoiceExercise } from '@/data/types';
import {
  ActionsRow,
  type ExerciseProps,
  Feedback,
  type Status,
  shuffle,
} from './shared';

type Option = { id: string; text: LocalizedText; correct: boolean };

export function MultipleChoice({
  exercise,
  onResult,
  onNext,
}: ExerciseProps<MultipleChoiceExercise>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const { speak, speaking } = useSpeech();
  const t = useT();

  const options = useMemo<Option[]>(() => {
    const correct: Option = { id: 'c', text: exercise.correct, correct: true };
    const distractors: Option[] = exercise.distractors.map((t, i) => ({
      id: `d-${i}`,
      text: t,
      correct: false,
    }));
    return shuffle([correct, ...distractors]);
  }, [exercise]);

  const select = (option: Option) => {
    if (status !== 'idle') return;
    setSelectedId(option.id);
  };

  const check = () => {
    if (!selectedId) return;
    const picked = options.find((o) => o.id === selectedId);
    const correct = !!picked?.correct;
    setStatus(correct ? 'correct' : 'wrong');
    onResult(correct);
    if (correct) speak(exercise.correct.text, { language: exercise.correct.language });
  };

  const proceed = () => {
    setSelectedId(null);
    setStatus('idle');
    onNext();
  };

  const tryAgain = () => {
    setSelectedId(null);
    setStatus('idle');
  };

  const skip = () => {
    onResult(false);
    proceed();
  };

  return (
    <View style={styles.body}>
      <View style={styles.prompt}>
        <Text style={styles.kicker}>{t('lesson.choice.kicker')}</Text>
        <Text style={styles.title}>{t('lesson.choice.title')}</Text>
      </View>

      <View style={styles.speakerCard}>
        <View style={styles.character}>
          <Mascot size={36} />
        </View>
        <Text style={styles.speakerText}>{exercise.prompt.text}</Text>
        <Pressable
          style={styles.playBtn}
          onPress={() => speak(exercise.correct.text, { language: exercise.correct.language })}
          hitSlop={8}
        >
          <PlayIcon size={14} color={colors.ink} playing={speaking} />
        </Pressable>
      </View>

      <View style={styles.options}>
        {options.map((o) => {
          const isSelected = o.id === selectedId;
          const showRight = status !== 'idle' && o.correct;
          const showWrong = status === 'wrong' && isSelected && !o.correct;
          return (
            <Pressable
              key={o.id}
              onPress={() => select(o)}
              disabled={status !== 'idle'}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
                showRight && styles.optionRight,
                showWrong && styles.optionWrong,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  showRight && { color: colors.moss },
                  showWrong && { color: colors.berry },
                ]}
              >
                {o.text.text}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Feedback status={status} correctText={exercise.correct.text} />

      <ActionsRow
        status={status}
        primaryEnabled={!!selectedId}
        onCheck={check}
        onSkip={skip}
        onContinue={proceed}
        onTryAgain={tryAgain}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1 },
  prompt: { paddingHorizontal: 24, paddingTop: 14 },
  kicker: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: fonts.bodyHeavy,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.ink,
    letterSpacing: -0.6,
    lineHeight: 28,
  },
  speakerCard: {
    marginHorizontal: 24,
    marginTop: 22,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.bg,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  character: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.butter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerText: {
    flex: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    color: colors.ink,
    letterSpacing: -0.3,
  },
  playBtn: {
    width: 40,
    height: 40,
    backgroundColor: colors.paper,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  options: {
    marginHorizontal: 24,
    marginTop: 4,
    gap: 10,
  },
  option: {
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    justifyContent: 'center',
  },
  optionSelected: {
    borderColor: colors.sky,
    backgroundColor: colors.skySoft,
  },
  optionRight: {
    borderColor: colors.moss,
    backgroundColor: colors.mossSoft,
  },
  optionWrong: {
    borderColor: colors.berry,
    backgroundColor: colors.berrySoft,
  },
  optionText: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
    letterSpacing: -0.2,
  },
});
