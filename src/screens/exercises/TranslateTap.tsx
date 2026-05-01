import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { Mascot } from '@/components/Mascot';
import { PlayIcon } from '@/components/PlayIcon';
import { useSpeech } from '@/hooks/useSpeech';
import type { TranslateTapExercise } from '@/data/types';
import {
  ActionsRow,
  type ExerciseProps,
  Feedback,
  type Status,
  normalize,
  shuffle,
} from './shared';

type Tile = { id: string; word: string };

export function TranslateTap({
  exercise,
  onResult,
  onNext,
}: ExerciseProps<TranslateTapExercise>) {
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<Status>('idle');
  const { speak, speaking } = useSpeech();

  const bank = useMemo<Tile[]>(() => {
    const all = [...exercise.answerTokens, ...exercise.distractors];
    return shuffle(all).map((word, i) => ({ id: `${i}-${word}`, word }));
  }, [exercise]);

  const placeTile = (tile: Tile) => {
    if (status !== 'idle' || usedIds.has(tile.id)) return;
    setUsedIds((s) => new Set(s).add(tile.id));
    setPlaced((p) => [...p, tile]);
  };

  const removeTile = (tileId: string) => {
    if (status !== 'idle') return;
    setPlaced((p) => p.filter((t) => t.id !== tileId));
    setUsedIds((s) => {
      const next = new Set(s);
      next.delete(tileId);
      return next;
    });
  };

  const check = () => {
    const built = placed.map((t) => t.word).join(' ').replace(/\s+,/g, ',').trim();
    const expected = exercise.answerTokens.join(' ');
    const correct = normalize(built) === normalize(expected);
    setStatus(correct ? 'correct' : 'wrong');
    onResult(correct);
    if (correct) speak(exercise.answer.text, { language: exercise.answer.language });
  };

  const proceed = () => {
    setPlaced([]);
    setUsedIds(new Set());
    setStatus('idle');
    onNext();
  };

  const tryAgain = () => {
    setPlaced([]);
    setUsedIds(new Set());
    setStatus('idle');
  };

  const skip = () => {
    onResult(false);
    proceed();
  };

  return (
    <View style={styles.body}>
      <View style={styles.prompt}>
        <Text style={styles.kicker}>Translate the sentence</Text>
        <Text style={styles.title}>Tap the words to build the sentence</Text>
      </View>

      <View style={styles.speakerCard}>
        <View style={styles.character}>
          <Mascot size={36} />
        </View>
        <Text style={styles.speakerText}>{exercise.prompt.text}</Text>
        <Pressable
          style={styles.playBtn}
          onPress={() => speak(exercise.answer.text, { language: exercise.answer.language })}
          hitSlop={8}
        >
          <PlayIcon size={14} color={colors.ink} playing={speaking} />
        </Pressable>
      </View>

      <View
        style={[
          styles.answerArea,
          status === 'correct' && styles.answerAreaCorrect,
          status === 'wrong' && styles.answerAreaWrong,
        ]}
      >
        {placed.length === 0 && status === 'idle' && (
          <Text style={styles.placeholder}>Tap words below…</Text>
        )}
        {placed.map((t) => (
          <Pressable key={t.id} onPress={() => removeTile(t.id)}>
            <View style={[styles.wordTile, styles.wordTilePlaced]}>
              <Text style={styles.wordTileText}>{t.word}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <Feedback status={status} correctText={exercise.answer.text} />

      <View style={styles.wordBank}>
        {bank.map((tile) => {
          const used = usedIds.has(tile.id);
          return (
            <Pressable
              key={tile.id}
              onPress={() => placeTile(tile)}
              disabled={used || status !== 'idle'}
            >
              <View style={[styles.wordTile, used && styles.wordTileUsed]}>
                <Text style={[styles.wordTileText, used && styles.wordTileTextUsed]}>
                  {tile.word}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <ActionsRow
        status={status}
        primaryEnabled={placed.length > 0}
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
  answerArea: {
    marginHorizontal: 24,
    marginTop: 4,
    marginBottom: 12,
    minHeight: 60,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.line,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'flex-start',
  },
  answerAreaCorrect: { borderBottomColor: colors.moss },
  answerAreaWrong: { borderBottomColor: colors.berry },
  placeholder: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 13,
    paddingVertical: 12,
  },
  wordBank: {
    marginHorizontal: 24,
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  wordTile: {
    backgroundColor: colors.paper,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.line,
  },
  wordTilePlaced: { backgroundColor: colors.bg },
  wordTileUsed: { opacity: 0.35, borderColor: colors.lineSoft },
  wordTileText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  wordTileTextUsed: { color: colors.muted },
});
