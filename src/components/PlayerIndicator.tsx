import React from 'react';
import { theme } from '../styles/theme';

interface PlayerIndicatorProps {
  player: number;
  isActive: boolean;
  gameMode: 'single' | 'multi';
}

export function PlayerIndicator({ player, isActive, gameMode }: PlayerIndicatorProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
      isActive ? 'bg-gray-50' : ''
    }`}>
      <div
        className="w-4 h-4 rounded-full"
        style={{ background: theme.colors.players[player] }}
      />
      <span className="font-medium">
        {player === 0 ? 'Player 1' : (gameMode === 'single' ? 'Computer' : 'Player 2')}
      </span>
    </div>
  );
}