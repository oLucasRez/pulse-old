import { Vector } from "../types/Vector.type";
import { mod, mult, sub, sum } from "./Vector.helper";

export function calcCrossings(
  c1: Vector,
  r1: number,
  c2: Vector,
  r2: number
): Vector[] {
  const d = mod(sub(c1, c2));
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(r1 * r1 - a * a);
  const p3 = sum(c1, mult(sub(c2, c1), a / d));

  const crossing1 = {
    x: p3.x + ((c2.y - c1.y) * h) / d,
    y: p3.y - ((c2.x - c1.x) * h) / d,
  };
  const crossing2 = {
    x: p3.x - ((c2.y - c1.y) * h) / d,
    y: p3.y + ((c2.x - c1.x) * h) / d,
  };

  return [crossing1, crossing2];
}

export function includes(crossing: Vector, crossings: Vector[]) {
  return !crossings.filter(
    (_crossing) =>
      Math.floor(crossing.x) === Math.floor(_crossing.x) &&
      Math.floor(crossing.y) === Math.floor(_crossing.y)
  ).length;
}
