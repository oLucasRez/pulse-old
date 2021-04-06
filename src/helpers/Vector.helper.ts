//--------------------------------------------------------------------< types >
import { Vector } from "../types/Vector.type";
//-------------------------------------------------------------------< global >
export const zero: Vector = { x: 0, y: 0 };
export const max: Vector = { x: window.innerWidth, y: window.innerHeight };
//==================================================================[ < sum > ]
export function sum(vector: Vector, value: Vector | number): Vector {
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
//==================================================================[ < sub > ]
export function sub(vector1: Vector, vector2: Vector): Vector {
  const x = vector1.x - vector2.x;
  const y = vector1.y - vector2.y;

  return { x, y };
}
//=================================================================[ < mult > ]
export function mult(vector: Vector, scalar: number): Vector {
  const x = vector.x * scalar;
  const y = vector.y * scalar;

  return { x, y };
}
//==================================================================[ < mod > ]
export function mod(vector: Vector): number {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}
//=================================================================[ < flip > ]
export function flip(
  vector: Vector,
  axis: "horizontally" | "vertically"
): Vector {
  if (axis === "horizontally") return { x: vector.x, y: -vector.y };
  if (axis === "vertically") return { x: -vector.x, y: vector.y };
  return vector;
}
//=================================================================[ < norm > ]
export function norm(vector: Vector): Vector {
  const angle = Math.atan2(vector.y, vector.x);
  return { x: Math.cos(angle), y: Math.sin(angle) };
}
//==================================================================[ < avg > ]
export function avg(vector1: Vector, vector2: Vector): Vector {
  const x = (vector1.x + vector2.x) / 2;
  const y = (vector1.y + vector2.y) / 2;

  return { x, y };
}
//===============================================================[ < rotate > ]
export function rotate(vector: Vector, angle: number): Vector {
  const x = Math.cos(angle) * vector.x - Math.sin(angle) * vector.y;
  const y = Math.sin(angle) * vector.x + Math.cos(angle) * vector.y;

  return { x, y };
}
//================================================================[ < angle > ]
export function angle(vector: Vector): number {
  return Math.atan2(vector.y, vector.x);
}
//=================================================================[ < quad > ]
export function quad(
  vector: Vector,
  origin: Vector
): { vertical: "top" | "bottom"; horizontal: "left" | "right" } {
  return {
    vertical: vector.y < origin.y ? "top" : "bottom",
    horizontal: vector.x < origin.x ? "left" : "right",
  };
}
