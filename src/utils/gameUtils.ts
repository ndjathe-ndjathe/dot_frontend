import { Point, GameState } from '../types/game';

export function isDotPlaced(dots: Point[], point: Point | null): boolean {
  if (!point || point.x === undefined || point.y === undefined) {
    return false;
  }
  return dots.some(dot => dot.x === point.x && dot.y === point.y);
}

export function generateAvailablePoints(gameState: GameState, gridSize: number): Point[] {
  if (!gameState || !gameState.dots || gridSize < 0) {
    return [];
  }

  const availablePoints: Point[] = [];
  
  for (let x = 0; x <= gridSize; x++) {
    for (let y = 0; y <= gridSize; y++) {
      if (!isDotPlaced(gameState.dots, { x, y })) {
        availablePoints.push({ x, y });
      }
    }
  }
  
  return availablePoints;
}

export function isGameOver(gameState: GameState, gridSize: number): boolean {
  if (!gameState || !gameState.dots || gridSize < 0) {
    return false;
  }

  const totalPossibleDots = (gridSize ) * (gridSize );
  return gameState.dots.length === totalPossibleDots;
}