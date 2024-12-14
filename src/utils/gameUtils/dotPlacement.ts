import { Point } from '../../types/game';

export function isDotPlaced(dots: Point[], point: Point | null): boolean {
  if (!point || point.x === undefined || point.y === undefined) {
    return false;
  }
  return dots.some(dot => dot.x === point.x && dot.y === point.y);
}