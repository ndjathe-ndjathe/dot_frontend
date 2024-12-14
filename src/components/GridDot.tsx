import React from 'react';
import { Point } from '../types/game';
import { theme } from '../styles/theme';

interface GridDotProps {
  x: number;
  y: number;
  isSelected: boolean;
  player?: number;
  onClick: (point: Point) => void;
  cellSize: number;
}

export function GridDot({ x, y, isSelected, player, onClick, cellSize }: GridDotProps) {
  return (
    <button
      className={`absolute rounded-full transition-all duration-200 
        ${isSelected 
          ? 'cursor-default shadow-md' 
          : 'hover:scale-125 hover:shadow-lg'}`}
      style={{
        left: x * cellSize,
        top: y * cellSize,
        transform: 'translate(-50%, -50%)',
        width: isSelected ? '16px' : '12px',
        height: isSelected ? '16px' : '12px',
        background: isSelected && player !== undefined 
          ? theme.colors.players[player] 
          : theme.colors.text.secondary,
      }}
      onClick={() => onClick({ x, y })}
      disabled={isSelected}
    />
  );
}