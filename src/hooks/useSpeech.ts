import { useCallback, useEffect, useRef, useState } from 'react';
import * as Speech from 'expo-speech';

type SpeakOptions = {
  language: string;
  rate?: number;
  pitch?: number;
};

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const speakingRef = useRef(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const speak = useCallback((text: string, opts: SpeakOptions) => {
    if (speakingRef.current) {
      Speech.stop();
    }
    speakingRef.current = true;
    setSpeaking(true);
    Speech.speak(text, {
      language: opts.language,
      rate: opts.rate ?? 0.95,
      pitch: opts.pitch ?? 1,
      onDone: () => {
        speakingRef.current = false;
        setSpeaking(false);
      },
      onStopped: () => {
        speakingRef.current = false;
        setSpeaking(false);
      },
      onError: () => {
        speakingRef.current = false;
        setSpeaking(false);
      },
    });
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    speakingRef.current = false;
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking };
}
