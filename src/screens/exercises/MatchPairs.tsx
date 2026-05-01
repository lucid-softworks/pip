import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { useSpeech } from '@/hooks/useSpeech';
import type { MatchPairsExercise } from '@/data/types';
import {
  ActionsRow,
  type ExerciseProps,
  type Status,
  shuffle,
} from './shared';

type Card = {
  key: string;
  pairId: number;
  side: 'source' | 'target';
  text: string;
  language: string;
};

export function MatchPairs({
  exercise,
  onResult,
  onNext,
}: ExerciseProps<MatchPairsExercise>) {
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [picked, setPicked] = useState<Card | null>(null);
  const [wrongPair, setWrongPair] = useState<{ a: string; b: string } | null>(null);
  const [wrongTaps, setWrongTaps] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const { speak } = useSpeech();

  const sources = useMemo<Card[]>(
    () =>
      shuffle(
        exercise.pairs.map((p, i) => ({
          key: `s-${i}`,
          pairId: i,
          side: 'source' as const,
          text: p.source.text,
          language: p.source.language,
        })),
      ),
    [exercise],
  );

  const targets = useMemo<Card[]>(
    () =>
      shuffle(
        exercise.pairs.map((p, i) => ({
          key: `t-${i}`,
          pairId: i,
          side: 'target' as const,
          text: p.target.text,
          language: p.target.language,
        })),
      ),
    [exercise],
  );

  // Once everything is matched, declare the exercise done.
  useEffect(() => {
    if (matched.size === exercise.pairs.length && status === 'idle') {
      const correct = wrongTaps === 0;
      setStatus('correct'); // always advance — match-pairs is gentle
      onResult(correct);
    }
  }, [matched, exercise.pairs.length, wrongTaps, status, onResult]);

  const tap = (card: Card) => {
    if (status !== 'idle') return;
    if (matched.has(card.pairId)) return;

    if (!picked) {
      setPicked(card);
      if (card.side === 'target') {
        speak(card.text, { language: card.language });
      }
      return;
    }

    if (picked.key === card.key) {
      setPicked(null);
      return;
    }

    if (picked.side === card.side) {
      // Switching sides — replace selection.
      setPicked(card);
      if (card.side === 'target') {
        speak(card.text, { language: card.language });
      }
      return;
    }

    // Two different-side cards selected. Match check.
    if (picked.pairId === card.pairId) {
      setMatched((s) => new Set(s).add(card.pairId));
      setPicked(null);
      const targetCard = card.side === 'target' ? card : picked;
      speak(targetCard.text, { language: targetCard.language });
    } else {
      setWrongPair({ a: picked.key, b: card.key });
      setWrongTaps((n) => n + 1);
      setTimeout(() => {
        setWrongPair(null);
        setPicked(null);
      }, 600);
    }
  };

  const proceed = () => onNext();

  const renderCard = (card: Card) => {
    const isMatched = matched.has(card.pairId);
    const isPicked = picked?.key === card.key;
    const isWrong = wrongPair?.a === card.key || wrongPair?.b === card.key;
    return (
      <Pressable
        key={card.key}
        onPress={() => tap(card)}
        disabled={isMatched}
        style={[
          styles.card,
          isMatched && styles.cardMatched,
          isPicked && styles.cardPicked,
          isWrong && styles.cardWrong,
        ]}
      >
        <Text
          style={[
            styles.cardText,
            isMatched && styles.cardTextMatched,
            isPicked && { color: colors.primary },
            isWrong && { color: colors.berry },
          ]}
          numberOfLines={2}
        >
          {card.text}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.body}>
      <View style={styles.prompt}>
        <Text style={styles.kicker}>Match the pairs</Text>
        <Text style={styles.title}>Tap a word, then its match.</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.column}>{sources.map(renderCard)}</View>
        <View style={styles.column}>{targets.map(renderCard)}</View>
      </View>

      <View style={styles.spacer} />

      <ActionsRow
        status={status === 'correct' ? 'correct' : 'idle'}
        primaryEnabled={false}
        primaryLabel="Match all"
        onCheck={() => {}}
        onSkip={() => {
          onResult(false);
          proceed();
        }}
        onContinue={proceed}
        onTryAgain={proceed}
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
  grid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 18,
    gap: 10,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  card: {
    minHeight: 54,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPicked: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  cardMatched: {
    borderColor: colors.mossSoft,
    backgroundColor: colors.mossSoft,
    opacity: 0.5,
  },
  cardWrong: {
    borderColor: colors.berry,
    backgroundColor: colors.berrySoft,
  },
  cardText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.ink,
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  cardTextMatched: {
    color: colors.muted,
    textDecorationLine: 'line-through',
  },
  spacer: { flex: 1 },
});
