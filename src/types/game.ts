export type GameMode = 'single' | 'multi';
export type GridSize = 4 | 6 | 8 | 10;

export interface GameSettings {
  mode: GameMode;
  gridSize: GridSize;
  turnTime: number;
}

export interface Point {
  x: number;
  y: number;
  player?: number;
}

export interface Line {
  start: Point;
  end: Point;
  player: number;
}

export interface Square {
  topLeft: Point;
  player: number;
}

export interface GameState {
  currentPlayer: number;
  points: number[];
  dots: Point[];
  lines: Line[];
  squares: Square[];
  timeLeft: number;
  totalTime: number[];  // Track total time taken by each player
  lastMoveTime: number; // Track when the last move was made
}