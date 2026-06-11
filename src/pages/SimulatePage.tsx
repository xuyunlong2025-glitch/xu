import { useState } from 'react';
import { MatchResult as MatchResultType } from '../types';
import { MatchSimulator } from '../components/MatchSimulator';
import { MatchResult } from '../components/MatchResult';
import { useGameStore } from '../store/gameStore';

export const SimulatePage = () => {
  const { resetSelection } = useGameStore();
  const [matchResult, setMatchResult] = useState<MatchResultType | null>(null);

  const handleMatchComplete = (result: MatchResultType) => {
    setMatchResult(result);
  };

  const handlePlayAgain = () => {
    resetSelection();
    setMatchResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {matchResult ? (
        <MatchResult result={matchResult} onPlayAgain={handlePlayAgain} />
      ) : (
        <MatchSimulator onMatchComplete={handleMatchComplete} />
      )}
    </div>
  );
};
