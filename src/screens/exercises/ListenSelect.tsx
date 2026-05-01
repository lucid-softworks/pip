import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { PlayIcon } from '@/components/PlayIcon';
import { useSpeech } from '@/hooks/useSpeech';
import type { ListenSelectExercise, LocalizedText } from '@/data/types';
import {
  ActionsRow,
  type ExerciseProps,
  Feedback,
  type Status,
  shuffle,
} from './shared';

type Option = { id: string; text: LocalizedText; correct: boolean };

export function ListenSelect({
  exercise,
  onResult,
  onNext,
}: ExerciseProps<ListenSelectExercise>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const { speak, speaking } = useSpeech();
  const playedOnce = useRef(false);

  const options = useMemo<Option[]>(() => {
    const correct: Option = { id: 'c', text: exercise.correct, correct: true };
    const distractors: Option[] = exercise.distractors.map((t, i) => ({
      id: `d-${i}`,
      text: t,
      correct: false,
    }));
    return shuffle([correct, ...distractors]);
  }, [exercise]);

  // Auto-play the audio once when this exercise mounts.
  useEffect(() => {
    if (playedOnce.current) return;
    playedOnce.current = true;
    const t = setTimeout(() => {
      speak(exercise.audio.text, { language: exercise.audio.language });
    }, 250);
    return () => clearTimeout(t);
  }, [exercise, speak]);

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

  const replay = () => speak(exercise.audio.text, { language: exercise.audio.language });

  return (
    <View style={styles.body}>
      <View style={styles.prompt}>
        <Text style={styles.kicker}>Listen up</Text>
        <Text style={styles.title}>What did you hear?</Text>
      </View>

      <Pressable style={styles.audioCard} onPress={replay}>
        <View style={styles.audioPlay}>
          <PlayIcon size={28} color={colors.white} playing={speaking} />
        </View>
        <Text style={styles.audioHint}>Tap to replay</Text>
      </Pressable>

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

      <Feedback
        status={status}
        correctText={`${exercise.audio.text} → ${exercise.correct.text}`}
      />

      <ActionsRow
        status={status}
        primaryEnabled={!!selectedId}
        primaryLabel="Check"
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
  audioCard: {
    marginHorizontal: 24,
    marginTop: 22,
    marginBottom: 18,
    paddingVertical: 22,
    backgroundColor: colors.lilacSoft,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  audioPlay: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.lilac,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioHint: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.lilac,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  options: {
    marginHorizontal: 24,
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
