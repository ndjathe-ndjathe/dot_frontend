import { Point, GameState } from '../../types/game';
import { isDotPlaced } from './dotPlacement';

export function generateAvailablePoints(gameState: GameState, gridSize: number): Point[] {
  if (!gameState || !gameState.dots || gridSize < 0) {
    return [];
  }

  const availablePoints: Point[] = [];
  
  // Only generate points within the grid bounds (0 to gridSize inclusive)
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (!isDotPlaced(gameState.dots, { x, y })) {
        availablePoints.push({ x, y });
      }
    }
  }

  console.log(availablePoints)
  
  return availablePoints;
}