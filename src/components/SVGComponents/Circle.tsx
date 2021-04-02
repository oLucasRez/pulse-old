//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
import { IColor } from "../../types/IColor";
import { MouseEvent } from "react";
import { ICircle } from "../../types/ICircle";
interface IProps {
  type?: "center" | "display" | "main" | "hover";
  origin: IVector;
  radius?: number;
  fill?: IColor;
  stroke?: IColor;
  onClick?: (e: MouseEvent<ICircle>) => void;
  onMove?: (e: MouseEvent<ICircle>) => void;
  onEnter?: (e: MouseEvent<ICircle>) => void;
  onOut?: (e: MouseEvent<ICircle>) => void;
}
//===============================================================[ < Circle > ]
export function Circle({
  type,
  origin,
  radius,
  fill,
  stroke,
  onClick,
  onMove,
  onEnter,
  onOut,
}: IProps) {
  //-----------------------------------------------------------------< return >
  return (
    <circle
      className={type}
      cx={origin.x}
      cy={origin.y}
      r={radius ?? "0.25rem"}
      fill={fill ? `var(--${fill})` : "#00000000"}
      stroke={stroke ? `var(--${stroke})` : undefined}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseOut={onOut}
    />
  );
}
