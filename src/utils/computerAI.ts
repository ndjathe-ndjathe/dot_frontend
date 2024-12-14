import { Point, GameState } from '../types/game';
import { checkForSquare } from './gameLogic';
import { generateAvailablePoints } from './gameUtils';

export function makeComputerMove(gameState: GameState, gridSize: number): Point | null {
  if (!gameState || gridSize < 0) {
    return null;
  }

  const availablePoints = generateAvailablePoints(gameState, gridSize-1);
  console.log(availablePoints)
  if (availablePoints.length === 0) {
    return null;
  }

  // First, try to complete a square using computer's dots
  for (const point of availablePoints) {
    const simulatedDots = [...gameState.dots, { ...point, player: 1 }];
    if (checkForSquare(simulatedDots, point)) {
      console.log('🤖 Computer found a square completion move:', point);
      return point;
    }
  }

  // If no square can be completed, make a strategic move
  // Try to avoid moves that would set up the opponent for a square
  const safePoints = availablePoints.filter(point => {
    const simulatedDots = [...gameState.dots, { ...point, player: 1 }];
    return !availablePoints.some(nextPoint => {
      const withOpponentMove = [...simulatedDots, { ...nextPoint, player: 0 }];
      return checkForSquare(withOpponentMove, nextPoint);
    });
  });

  const selectedPoint = safePoints.length > 0
    ? safePoints[Math.floor(Math.random() * safePoints.length)]
    : availablePoints[Math.floor(Math.random() * availablePoints.length)];

  console.log('🤖 Computer selected point:', {
    point: selectedPoint,
    strategy: safePoints.length > 0 ? 'Safe move (avoiding opponent squares)' : 'Random move',
    availableSafePoints: safePoints.length,
    totalAvailablePoints: availablePoints.length
  });

  return selectedPoint;
}