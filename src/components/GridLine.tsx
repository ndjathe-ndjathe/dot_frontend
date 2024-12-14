import React from 'react';
import { Line } from '../types/game';
import { theme } from '../styles/theme';

interface GridLineProps {
  line: Line;
  cellSize: number;
}

export function GridLine({ line, cellSize }: GridLineProps) {
  const startX = line.start.x * cellSize;
  const startY = line.start.y * cellSize;
  const endX = line.end.x * cellSize;
  const endY = line.end.y * cellSize;
  
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
  
  return (
    <div
      className="absolute rounded-full transform-gpu"
      style={{
        width: `${length}px`,
        height: '2px',
        left: startX,
        top: startY,
        transformOrigin: '0 50%',
        transform: `rotate(${angle}deg)`,
        background: theme.colors.players[line.player],
      }}
    />
  );
}