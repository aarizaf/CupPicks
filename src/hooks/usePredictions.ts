import { useState, useEffect } from 'react';
import type { Prediction } from '../types';

type PredictionsMap = Record<string, Prediction>;

const STORAGE_KEY = 'cuppicks-predictions';

function loadFromStorage(): PredictionsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PredictionsMap) : {};
  } catch {
    return {};
  }
}

export function usePredictions() {
  const [predictions, setPredictions] = useState<PredictionsMap>(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(predictions));
  }, [predictions]);

  const setPrediction = (matchId: string, score1: number | null, score2: number | null) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: { matchId, score1, score2 },
    }));
  };

  const clearPredictions = () => {
    setPredictions({});
  };

  return { predictions, setPrediction, clearPredictions };
}
