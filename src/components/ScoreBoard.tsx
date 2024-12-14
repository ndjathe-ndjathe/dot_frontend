import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { theme } from '../styles/theme';

interface ScoreBoardProps {
  scores: number[];
  currentPlayer: number;
  timeLeft: number;
  totalTime: number[];
  gameMode: 'single' | 'multi';
}

export function ScoreBoard({ scores, currentPlayer, timeLeft, totalTime, gameMode }: ScoreBoardProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-md overflow-hidden">
      {/* Gradient background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ background: theme.gradients.primary }}
      />

      <div className="grid grid-cols-2 gap-4 relative">
        <div 
          className={`p-4 rounded-xl transition-all duration-300 ${
            currentPlayer === 0 ? 'text-white' : 'bg-gray-50'
          }`}
          style={currentPlayer === 0 ? { background: theme.gradients.primary } : {}}
        >
          <div className="text-sm opacity-80">Player 1</div>
          <div className="text-2xl font-bold">{scores[0]}</div>
          <div className="text-sm mt-1 opacity-80">
            Total: {formatTime(totalTime[0])}
          </div>
        </div>
        <div 
          className={`p-4 rounded-xl transition-all duration-300 ${
            currentPlayer === 1 ? 'text-white' : 'bg-gray-50'
          }`}
          style={currentPlayer === 1 ? { background: theme.gradients.primary } : {}}
        >
          <div className="text-sm opacity-80">
            {gameMode === 'single' ? 'Computer' : 'Player 2'}
          </div>
          <div className="text-2xl font-bold">{scores[1]}</div>
          <div className="text-sm mt-1 opacity-80">
            Total: {formatTime(totalTime[1])}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <div className="text-sm text-gray-600">Time Left</div>
        </div>
        <div className="text-xl font-semibold">{timeLeft}s</div>
        <div 
          className="mt-1 h-1 rounded-full bg-gray-200 overflow-hidden"
        >
          <div 
            className="h-full transition-all duration-1000"
            style={{ 
              background: theme.gradients.primary,
              width: `${(timeLeft / 60) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}