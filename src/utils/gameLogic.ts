import { Point, Square, Line } from '../types/game';

export function createLine(start: Point, end: Point, player: number): Line {
  return {
    start: { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) },
    end: { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) },
    player
  };
}

export function getSquareLines(square: Square): Line[] {
  const { topLeft, player } = square;
  const x = topLeft.x;
  const y = topLeft.y;

  return [
    createLine({ x, y }, { x: x + 1, y }, player),
    createLine({ x: x + 1, y }, { x: x + 1, y: y + 1 }, player),
    createLine({ x, y: y + 1 }, { x: x + 1, y: y + 1 }, player),
    createLine({ x, y }, { x, y: y + 1 }, player),
  ];
}

export function checkForSquare(dots: Point[], point: Point): Square | null {
  const currentPlayer = dots.find(d => d.x === point.x && d.y === point.y)?.player;
  if (currentPlayer === undefined) return null;

  // Only consider dots placed by the current player
  const playerDots = dots.filter(dot => dot.player === currentPlayer);

  const possibleSquares = [
    // Check square where point is top-left
    { topLeft: point, points: [
      point,
      { x: point.x + 1, y: point.y },
      { x: point.x, y: point.y + 1 },
      { x: point.x + 1, y: point.y + 1 }
    ]},
    // Check square where point is top-right
    { topLeft: { x: point.x - 1, y: point.y }, points: [
      { x: point.x - 1, y: point.y },
      point,
      { x: point.x - 1, y: point.y + 1 },
      { x: point.x, y: point.y + 1 }
    ]},
    // Check square where point is bottom-left
    { topLeft: { x: point.x, y: point.y - 1 }, points: [
      { x: point.x, y: point.y - 1 },
      { x: point.x + 1, y: point.y - 1 },
      point,
      { x: point.x + 1, y: point.y }
    ]},
    // Check square where point is bottom-right
    { topLeft: { x: point.x - 1, y: point.y - 1 }, points: [
      { x: point.x - 1, y: point.y - 1 },
      { x: point.x, y: point.y - 1 },
      { x: point.x - 1, y: point.y },
      point
    ]}
  ];

  for (const square of possibleSquares) {
    if (square.points.every(p => 
      playerDots.some(dot => dot.x === p.x && dot.y === p.y)
    )) {
      return { topLeft: square.topLeft, player: currentPlayer };
    }
  }

  return null;
}