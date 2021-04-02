//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
//==========================================================[ < outOfBounds > ]
export function outOfBounds(position: IVector, bodySize: number) {
  const left = position.x < bodySize / 2;
  const right = position.x >= window.innerWidth - bodySize / 2;
  const top = position.y < bodySize / 2;
  const bottom = position.y >= window.innerHeight - bodySize / 2;

  return {
    left,
    right,
    horizontal: left || right,
    top,
    bottom,
    vertical: top || bottom,
  };
}
