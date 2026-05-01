import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { CloseIcon, LeafIcon } from '@/components/Icons';
import { Mascot } from '@/components/Mascot';
import { PlayIcon } from '@/components/PlayIcon';
import { loadLesson } from '@/data/lessons';
import type { Lesson, TranslateTapExercise } from '@/data/types';
import { useSpeech } from '@/hooks/useSpeech';

type Props = {
  lessonId: string;
  onExit: () => void;
  onNeedBreather: () => void;
  onComplete: () => void;
};

type Status = 'idle' | 'correct' | 'wrong';

export function LessonScreen({ lessonId, onExit, onNeedBreather, onComplete }: Props) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);

  useEffect(() => {
    loadLesson(lessonId).then(setLesson);
  }, [lessonId]);

  if (!lesson) return <SafeAreaView style={styles.root} />;

  const exercise = lesson.exercises[exerciseIndex] as TranslateTapExercise;
  const progress = (exerciseIndex + 1) / lesson.exercises.length;

  const handleResult = (correct: boolean) => {
    if (correct) {
      setWrongStreak(0);
    } else {
      const next = wrongStreak + 1;
      setWrongStreak(next);
      if (next >= 3) {
        onNeedBreather();
        return;
      }
    }
  };

  const handleNext = () => {
    if (exerciseIndex >= lesson.exercises.length - 1) {
      onComplete();
    } else {
      setExerciseIndex((i) => i + 1);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.topRow}>
        <Pressable style={styles.iconBtn} onPress={onExit} hitSlop={8}>
          <CloseIcon size={18} color={colors.muted} />
        </Pressable>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <View style={styles.pacePill}>
          <LeafIcon size={12} color={colors.muted} />
          <Text style={styles.pacePillText}>No rush</Text>
        </View>
      </View>

      <TranslateTap
        key={exercise.id}
        exercise={exercise}
        onResult={handleResult}
        onNext={handleNext}
      />
    </SafeAreaView>
  );
}

type TapProps = {
  exercise: TranslateTapExercise;
  onResult: (correct: boolean) => void;
  onNext: () => void;
};

type Tile = {
  id: string;
  word: string;
};

function TranslateTap({ exercise, onResult, onNext }: TapProps) {
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<Status>('idle');
  const { speak, speaking } = useSpeech();

  const bank = useMemo<Tile[]>(() => {
    const all = [...exercise.answerTokens, ...exercise.distractors];
    return shuffle(all).map((word, i) => ({ id: `${i}-${word}`, word }));
  }, [exercise]);

  const promptLang = exercise.prompt.language;
  const answerLang = exercise.answer.language;

  const placeTile = (tile: Tile) => {
    if (status !== 'idle') return;
    if (usedIds.has(tile.id)) return;
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
    if (correct) {
      speak(exercise.answer.text, { language: answerLang });
    }
  };

  const skip = () => {
    onResult(false);
    onNext();
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

  return (
    <View style={styles.exBody}>
      <View style={styles.prompt}>
        <Text style={styles.kicker}>Translate the sentence</Text>
        <Text style={styles.promptTitle}>Tap the words to build the sentence</Text>
      </View>

      <View style={styles.speakerCard}>
        <View style={styles.character}>
          <Mascot size={36} />
        </View>
        <Text style={styles.speakerText}>{exercise.prompt.text}</Text>
        <Pressable
          style={styles.playBtn}
          onPress={() => speak(exercise.prompt.text, { language: promptLang })}
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
          <Text style={styles.placeholderText}>Tap words below…</Text>
        )}
        {placed.map((t) => (
          <Pressable key={t.id} onPress={() => removeTile(t.id)}>
            <View style={[styles.wordTile, styles.wordTilePlaced]}>
              <Text style={styles.wordTileText}>{t.word}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      {status !== 'idle' && (
        <View style={styles.feedback}>
          {status === 'correct' ? (
            <>
              <Text style={[styles.feedbackTitle, { color: colors.moss }]}>Lovely.</Text>
              <Text style={styles.feedbackBody}>{exercise.answer.text}</Text>
            </>
          ) : (
            <>
              <Text style={[styles.feedbackTitle, { color: colors.berry }]}>Almost.</Text>
              <Text style={styles.feedbackBody}>
                The phrase is: <Text style={{ fontFamily: fonts.bodyHeavy }}>{exercise.answer.text}</Text>
              </Text>
            </>
          )}
        </View>
      )}

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

      <View style={styles.actions}>
        {status === 'idle' && (
          <>
            <Pressable style={styles.ghostBtn} onPress={skip}>
              <Text style={styles.ghostBtnText}>Skip</Text>
            </Pressable>
            <Pressable
              style={[styles.primaryBtn, placed.length === 0 && styles.primaryBtnDisabled]}
              onPress={check}
              disabled={placed.length === 0}
            >
              <Text style={styles.primaryBtnText}>Check</Text>
            </Pressable>
          </>
        )}
        {status === 'correct' && (
          <Pressable style={[styles.primaryBtn, { flex: 1 }]} onPress={proceed}>
            <Text style={styles.primaryBtnText}>Continue</Text>
          </Pressable>
        )}
        {status === 'wrong' && (
          <>
            <Pressable style={styles.ghostBtn} onPress={proceed}>
              <Text style={styles.ghostBtnText}>Move on</Text>
            </Pressable>
            <Pressable style={[styles.primaryBtn, styles.primaryBtnCoral]} onPress={tryAgain}>
              <Text style={styles.primaryBtnText}>Try again</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

function normalize(s: string) {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  topRow: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  progressTrack: {
    flex: 1,
    height: 10,
    backgroundColor: colors.bg,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.moss,
    borderRadius: 999,
  },
  pacePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.bg,
    borderRadius: 999,
  },
  pacePillText: {
    color: colors.muted,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
  },
  exBody: { flex: 1 },
  prompt: { paddingHorizontal: 24, paddingTop: 14 },
  kicker: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: fonts.bodyHeavy,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  promptTitle: {
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
  placeholderText: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 13,
    paddingVertical: 12,
  },
  feedback: {
    marginHorizontal: 24,
    marginTop: 4,
    marginBottom: 8,
  },
  feedbackTitle: {
    fontFamily: fonts.display,
    fontSize: 18,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  feedbackBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink2,
    lineHeight: 20,
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
  wordTileUsed: {
    opacity: 0.35,
    borderColor: colors.lineSoft,
  },
  wordTileText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  wordTileTextUsed: { color: colors.muted },
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
