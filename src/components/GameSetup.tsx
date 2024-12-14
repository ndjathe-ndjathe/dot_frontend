import React from 'react';
import { Clock, Users, User, Grid } from 'lucide-react';
import { GameMode, GridSize, GameSettings } from '../types/game';
import { theme } from '../styles/theme';

interface GameSetupProps {
  onStart: (settings: GameSettings) => void;
}

export function GameSetup({ onStart }: GameSetupProps) {
  const [mode, setMode] = React.useState<GameMode>('single');
  const [gridSize, setGridSize] = React.useState<GridSize>(4);
  const [turnTime, setTurnTime] = React.useState(30);

  return (
    <div className="relative bg-white p-8 rounded-xl shadow-lg max-w-md w-full overflow-hidden">
      {/* Gradient background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ background: theme.gradients.primary }}
      />

      {/* Logo */}
      <div className="relative mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-wider"
            style={{ background: theme.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          DOT
        </h1>
      </div>

      <div className="space-y-6 relative">
        <div>
          <label className="text-gray-700 font-medium mb-2 block">Game Mode</label>
          <div className="grid grid-cols-2 gap-4">
            {['single', 'multi'].map((m) => (
              <button
                key={m}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all
                  ${mode === m 
                    ? 'border-transparent text-white' 
                    : 'border-gray-200 hover:border-gray-300'}`}
                style={mode === m ? { background: theme.gradients.primary } : {}}
                onClick={() => setMode(m as GameMode)}
              >
                {m === 'single' ? <User size={20} /> : <Users size={20} />}
                <span>{m === 'single' ? 'vs Computer' : 'Two Players'}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-gray-700 font-medium mb-2 block">Grid Size</label>
          <div className="grid grid-cols-4 gap-2">
            {[4, 6, 8, 10].map(size => (
              <button
                key={size}
                className={`p-2 rounded-lg border-2 transition-all
                  ${gridSize === size 
                    ? 'border-transparent text-white' 
                    : 'border-gray-200 hover:border-gray-300'}`}
                style={gridSize === size ? { background: theme.gradients.primary } : {}}
                onClick={() => setGridSize(size as GridSize)}
              >
                {size}x{size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-gray-700 font-medium mb-2 block">Turn Time (seconds)</label>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={turnTime}
            onChange={(e) => setTurnTime(Number(e.target.value))}
            className="w-full accent-[#4A90E2]"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>10s</span>
            <span>{turnTime}s</span>
            <span>60s</span>
          </div>
        </div>

        <button
          onClick={() => onStart({ mode, gridSize, turnTime })}
          className="w-full py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          style={{ background: theme.gradients.primary }}
        >
          <Grid size={20} />
          Start Game
        </button>
      </div>
    </div>
  );
}