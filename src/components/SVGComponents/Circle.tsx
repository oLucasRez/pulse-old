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
}: IProps) {
  //-----------------------------------------------------------------< return >
  return (
    <circle
      className={type}
      cx={origin.x}
      cy={origin.y}
      r={radius ?? "0.25rem"}
      fill={fill ? `var(--${fill})` : undefined}
      stroke={stroke ? `var(--${stroke})` : undefined}
      onClick={onClick}
      onMouseMove={onMove}
    />
  );
}
