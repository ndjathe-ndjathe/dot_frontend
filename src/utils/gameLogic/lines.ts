import { Point, Line } from '../../types/game';

export function createLine(start: Point, end: Point, player: number): Line {
  return {
    start: { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) },
    end: { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) },
    player
  };
}