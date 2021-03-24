//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
import { IColor } from "../../types/IColor";
import { ICircle } from "../../types/ICircle";
import { MouseEvent } from "react";
interface IProps {
  key?: number;
  type: "center" | "display" | "main" | "hover";
  origin: IVector;
  radius?: number;
  fill?: IColor;
  stroke?: IColor;
  onClick?: (e: MouseEvent<ICircle>) => void;
  onEnter?: (e: MouseEvent<ICircle>) => void;
  onMove?: (e: MouseEvent<ICircle>) => void;
  onOut?: (e: MouseEvent<ICircle>) => void;
}
//===============================================================[ < Circle > ]
export function Circle({
  key,
  type,
  origin,
  radius,
  fill,
  stroke,
  onClick,
  onMove,
}: IProps) {
  //-----------------------------------------------------------------< return >
  return (
    <circle
      key={key}
      className={type}
      cx={origin.x}
      cy={origin.y}
      r={radius}
      fill={fill ? `var(--${fill})` : undefined}
      stroke={stroke ? `var(--${stroke})` : undefined}
      onClick={onClick}
      onMouseMove={onMove}
    />
  );
}
