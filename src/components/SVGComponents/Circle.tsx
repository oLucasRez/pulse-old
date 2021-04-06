//--------------------------------------------------------------------< types >
import { Vector } from "../../types/Vector.type";
import { Color } from "../../types/Color.type";
import { MouseEvent } from "react";
import { Circle as CircleType } from "../../types/Circle.type";

interface IProps {
  type?: "center" | "display" | "main" | "hover";
  origin: Vector;
  radius?: number;
  fill?: Color;
  stroke?: Color;
  onClick?: (e: MouseEvent<CircleType>) => void;
  onMove?: (e: MouseEvent<CircleType>) => void;
  onEnter?: (e: MouseEvent<CircleType>) => void;
  onOut?: (e: MouseEvent<CircleType>) => void;
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
