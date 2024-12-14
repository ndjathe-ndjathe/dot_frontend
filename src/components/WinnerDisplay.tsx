import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { theme } from '../styles/theme';
import { GameMode } from '../types/game';

interface WinnerDisplayProps {
  scores: number[];
  totalTime: number[];
  gameMode: GameMode;
  onNewGame: () => void;
}

export function WinnerDisplay({ scores, totalTime, gameMode, onNewGame }: WinnerDisplayProps) {
  const getWinner = () => {
    if (gameMode === 'multi') {
      if (scores[0] !== scores[1]) {
        return scores[0] > scores[1] ? 0 : 1;
      }
      // If scores are equal in multiplayer mode, player with less time wins
      return totalTime[0] < totalTime[1] ? 0 : totalTime[0] > totalTime[1] ? 1 : null;
    }
    // In single player mode, just compare scores
    return scores[0] > scores[1] ? 0 : scores[0] < scores[1] ? 1 : null;
  };

  const winner = getWinner();
  const isTie = winner === null;
  
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-yellow-100 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          
          {!isTie ? (
            <>
              <h2 className="text-2xl font-bold mb-2">
                {winner === 0 ? 'Player 1' : (gameMode === 'single' ? 'Computer' : 'Player 2')} Wins!
              </h2>
              <p className="text-gray-600 mb-2">
                Final Score: {scores[0]} - {scores[1]}
              </p>
              {gameMode === 'multi' && scores[0] === scores[1] && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                  <Clock size={16} />
                  <span>Won by time: {formatTime(totalTime[winner])} vs {formatTime(totalTime[winner === 0 ? 1 : 0])}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">It's a Tie!</h2>
              <p className="text-gray-600 mb-2">
                Both players scored {scores[0]} points
              </p>
              {gameMode === 'multi' && (
                <div className="text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={16} />
                    <span>Equal time: {formatTime(totalTime[0])}</span>
                  </div>
                </div>
              )}
            </>
          )}
          
          <button
            onClick={onNewGame}
            className="w-full py-3 rounded-lg font-medium text-white transition-transform hover:scale-[1.02]"
            style={{ background: theme.gradients.primary }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}