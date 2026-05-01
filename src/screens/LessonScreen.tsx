import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { CloseIcon, LeafIcon } from '@/components/Icons';
import { useContent } from '@/state/ContentProvider';
import type { Exercise, Lesson } from '@/data/types';
import { updateProgress } from '@/api/client';
import { TranslateTap } from './exercises/TranslateTap';
import { MultipleChoice } from './exercises/MultipleChoice';
import { ListenSelect } from './exercises/ListenSelect';
import { MatchPairs } from './exercises/MatchPairs';

type Props = {
  lessonId: string;
  onExit: () => void;
  onNeedBreather: () => void;
  onComplete: () => void;
};

export function LessonScreen({ lessonId, onExit, onNeedBreather, onComplete }: Props) {
  const { loadLesson } = useContent();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    loadLesson(lessonId).then(setLesson);
  }, [lessonId, loadLesson]);

  if (!lesson) return <View style={styles.root} />;

  const exercise = lesson.exercises[exerciseIndex];
  const progress = (exerciseIndex + 1) / lesson.exercises.length;

  const pushProgress = (count: number, finished: boolean) => {
    if (!lesson) return;
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
      const next = completedCount + 1;
      setCompletedCount(next);
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
    if (exerciseIndex >= lesson.exercises.length - 1) {
      pushProgress(completedCount, true);
      onComplete();
    } else {
      setExerciseIndex((i) => i + 1);
    }
  };

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
          <Text style={styles.pacePillText}>No rush</Text>
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
