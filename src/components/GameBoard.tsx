import React, { useState } from 'react';
import { Point, Square, GameState, Line } from '../types/game';
import { GridDot } from './GridDot';
import { GridLine } from './GridLine';
import { theme } from '../styles/theme';

interface GameBoardProps {
  gridSize: number;
  gameState: GameState;
  onDotClick: (point: Point) => void;
}

export function GameBoard({ gridSize, gameState, onDotClick }: GameBoardProps) {
  const [hoverPoint, setHoverPoint] = useState<Point | null>(null);
  const cellSize = 60;
  const boardSize = cellSize * (gridSize - 1); // Adjust to get correct number of cells
  const gridPadding = 40;

  const getPointWithPlayer = (x: number, y: number): { isSelected: boolean; player?: number } => {
    const dot = gameState.dots.find(dot => dot.x === x && dot.y === y);
    return {
      isSelected: !!dot,
      player: dot?.player
    };
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className="relative bg-white rounded-xl shadow-lg"
        style={{ 
          width: boardSize + 2 * gridPadding, 
          height: boardSize + 2 * gridPadding,
          background: theme.colors.background.white,
        }}
      >
        {/* Gradient background */}
        <div 
          className="absolute inset-0 opacity-5 rounded-xl"
          style={{ background: theme.gradients.primary }}
        />

        {/* Grid background with subtle lines */}
        <div 
          className="absolute"
          style={{
            inset: `${gridPadding}px`,
            backgroundImage: `
              linear-gradient(to right, rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${cellSize}px ${cellSize}px`,
          }}
        />

        {/* Completed squares */}
        <div className="absolute" style={{ inset: `${gridPadding}px` }}>
          {gameState.squares.map((square, idx) => (
            <div
              key={idx}
              className="absolute transition-all duration-300 ease-out"
              style={{
                left: square.topLeft.x * cellSize,
                top: square.topLeft.y * cellSize,
                width: cellSize,
                height: cellSize,
                background: `${theme.colors.players[square.player]}25`,
              }}
            />
          ))}
        </div>

        {/* Lines */}
        <div className="absolute" style={{ inset: `${gridPadding}px` }}>
          {gameState.lines.map((line, idx) => (
            <GridLine key={idx} line={line} cellSize={cellSize} />
          ))}
        </div>

        {/* Dots */}
        <div className="absolute" style={{ inset: `${gridPadding}px` }}>
          {Array.from({ length: gridSize }, (_, row) =>
            Array.from({ length: gridSize }, (_, col) => {
              const { isSelected, player } = getPointWithPlayer(col, row);
              return (
                <GridDot
                  key={`${row}-${col}`}
                  x={col}
                  y={row}
                  isSelected={isSelected}
                  player={player}
                  onClick={onDotClick}
                  cellSize={cellSize}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}