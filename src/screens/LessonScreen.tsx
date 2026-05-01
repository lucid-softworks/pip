import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { CloseIcon, LeafIcon } from '@/components/Icons';
import { useContent } from '@/state/ContentProvider';
import { useT } from '@/i18n';
import type { Exercise, Lesson } from '@/data/types';
import { updateProgress } from '@/api/client';
import { TranslateTap } from './exercises/TranslateTap';
import { MultipleChoice } from './exercises/MultipleChoice';
import { ListenSelect } from './exercises/ListenSelect';
import { MatchPairs } from './exercises/MatchPairs';
import { LessonCelebration } from './LessonCelebration';

type Props = {
  lessonId: string;
  onExit: () => void;
  onNeedBreather: () => void;
  onComplete: () => void;
};

type Phase =
  | { kind: 'loading' }
  | { kind: 'exercising'; index: number }
  | { kind: 'celebrating' };

export function LessonScreen({ lessonId, onExit, onNeedBreather, onComplete }: Props) {
  const { loadLesson } = useContent();
  const t = useT();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [phase, setPhase] = useState<Phase>({ kind: 'loading' });
  const [wrongStreak, setWrongStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const startedAt = useRef<number>(Date.now());
  const elapsedAtFinish = useRef<number>(0);

  useEffect(() => {
    loadLesson(lessonId).then((l) => {
      setLesson(l);
      if (l) {
        setPhase({ kind: 'exercising', index: 0 });
        startedAt.current = Date.now();
      }
    });
  }, [lessonId, loadLesson]);

  if (!lesson || phase.kind === 'loading') return <View style={styles.root} />;

  const pushProgress = (count: number, finished: boolean) => {
    updateProgress({
      lessonId: lesson.id,
      completedExercises: count,
      totalExercises: lesson.exercises.length,
      completed: finished,
    }).catch(() => {
      // Fire-and-forget — UI shouldn't block on a slow network.
    });
  };

  const handleResult = (correct: boolean) => {
    if (correct) {
      setWrongStreak(0);
      const next = correctCount + 1;
      setCorrectCount(next);
      pushProgress(next, false);
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
    if (phase.kind !== 'exercising') return;
    if (phase.index >= lesson.exercises.length - 1) {
      pushProgress(correctCount, true);
      elapsedAtFinish.current = Math.round((Date.now() - startedAt.current) / 1000);
      setPhase({ kind: 'celebrating' });
    } else {
      setPhase({ kind: 'exercising', index: phase.index + 1 });
    }
  };

  if (phase.kind === 'celebrating') {
    return (
      <LessonCelebration
        lesson={lesson}
        correctCount={correctCount}
        totalCount={lesson.exercises.length}
        elapsedSeconds={elapsedAtFinish.current}
        onContinue={onComplete}
      />
    );
  }

  const exercise = lesson.exercises[phase.index];
  const progress = (phase.index + 1) / lesson.exercises.length;

  return (
    <View style={styles.root}>
      <View style={styles.topRow}>
        <Pressable style={styles.iconBtn} onPress={onExit} hitSlop={8}>
          <CloseIcon size={18} color={colors.muted} />
        </Pressable>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <View style={styles.pacePill}>
          <LeafIcon size={12} color={colors.muted} />
          <Text style={styles.pacePillText}>{t('common.noRush')}</Text>
        </View>
      </View>

      <ExerciseRenderer
        key={exercise.id}
        exercise={exercise}
        onResult={handleResult}
        onNext={handleNext}
      />
    </View>
  );
}

function ExerciseRenderer({
  exercise,
  onResult,
  onNext,
}: {
  exercise: Exercise;
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  switch (exercise.kind) {
    case 'translate-tap':
      return <TranslateTap exercise={exercise} onResult={onResult} onNext={onNext} />;
    case 'multiple-choice':
      return <MultipleChoice exercise={exercise} onResult={onResult} onNext={onNext} />;
    case 'listen-select':
      return <ListenSelect exercise={exercise} onResult={onResult} onNext={onNext} />;
    case 'match-pairs':
      return <MatchPairs exercise={exercise} onResult={onResult} onNext={onNext} />;
  }
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
});
