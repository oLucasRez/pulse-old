//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
import { IColor } from "../../types/IColor";
interface IProps {
  from: IVector;
  to: IVector;
  fill?: IColor;
  stroke?: IColor;
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
