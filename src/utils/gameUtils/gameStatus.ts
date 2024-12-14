import { GameState } from '../../types/game';
import { canScorePoints } from './canScorePoints';

export function isGameOver(gameState: GameState, gridSize: number): boolean {
  if (!gameState || !gameState.dots || gridSize < 0) {
    return false;
  }

  // Check if all dots are placed
  const totalPossibleDots = (gridSize + 1) * (gridSize + 1);
  const allDotsPlaced = gameState.dots.length === totalPossibleDots;

  // Check if there are no more possible squares to form
  const noMorePossiblePoints = !canScorePoints(gameState, gridSize);

  return allDotsPlaced || noMorePossiblePoints;
}