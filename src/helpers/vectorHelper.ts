import { IVector } from "../types/IVector";
//-----------------------------------------------------------------------------
export function sum(vector: IVector, value: IVector | number): IVector {
  if (typeof value === "number") {
    const x = vector.x + value;
    const y = vector.y + value;

    return { x, y };
  } else {
    const x = vector.x + value.x;
    const y = vector.y + value.y;

    return { x, y };
  }
}
//-----------------------------------------------------------------------------
export function sub(vector1: IVector, vector2: IVector): IVector {
  const x = vector1.x - vector2.x;
  const y = vector1.y - vector2.y;

  return { x, y };
}
//-----------------------------------------------------------------------------
export function mult(vector: IVector, scalar: number): IVector {
  const x = vector.x * scalar;
  const y = vector.y * scalar;

  return { x, y };
}
//-----------------------------------------------------------------------------
export function mod(vector: IVector): number {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}
//-----------------------------------------------------------------------------
export function flip(
  vector: IVector,
  axis: "horizontally" | "vertically"
): IVector {
  if (axis === "horizontally") return { x: vector.x, y: -vector.y };
  if (axis === "vertically") return { x: -vector.x, y: vector.y };
  return vector;
}
//-----------------------------------------------------------------------------
export function norm(vector: IVector): IVector {
  const angle = Math.atan2(vector.y, vector.x);
  return { x: Math.cos(angle), y: Math.sin(angle) };
}
//-----------------------------------------------------------------------------
export const zero: IVector = { x: 0, y: 0 };
//-----------------------------------------------------------------------------
export const max: IVector = { x: window.innerWidth, y: window.innerHeight };
