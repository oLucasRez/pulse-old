//--------------------------------------------------------------------< types >
import { Vector } from "../types/Vector.type";
import { Color } from "../types/Color.type";
interface IProps {
  from: Vector;
  to: Vector;
  fill?: Color;
  stroke?: Color;
}
//=================================================================[ < Line > ]
export function Line({ from, to, fill, stroke }: IProps) {
  //-----------------------------------------------------------------< return >
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      fill={fill ? `var(--${fill})` : undefined}
      stroke={stroke ? `var(--${stroke})` : undefined}
    />
  );
}
