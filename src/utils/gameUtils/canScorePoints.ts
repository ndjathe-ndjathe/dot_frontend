import { Point, GameState } from '../../types/game';
import { checkForSquare } from '../gameLogic';
import { generateAvailablePoints } from './availablePoints';

export function canScorePoints(gameState: GameState, gridSize: number): boolean {
  if (!gameState || gridSize < 0) {
    return false;
  }

  const availablePoints = generateAvailablePoints(gameState, gridSize);
  
  // Check if any available point can form a square for either player
  for (const point of availablePoints) {
    // Check for player 1
    const simulatedDotsP1 = [...gameState.dots, { ...point, player: 0 }];
    if (checkForSquare(simulatedDotsP1, point)) {
      return true;
    }

    // Check for player 2
    const simulatedDotsP2 = [...gameState.dots, { ...point, player: 1 }];
    if (checkForSquare(simulatedDotsP2, point)) {
      return true;
    }
  }

  return false;
}