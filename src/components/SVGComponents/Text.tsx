//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
import { IColor } from "../../types/IColor";
import { ReactNode } from "react";
interface IProps {
  origin: IVector;
  fill: IColor;
  font: "Kalam 300" | "Kalam 700" | "Rubik 500";
  size: number;
  justify?: "start" | "middle" | "end";
  children: ReactNode;
}
//=================================================================[ < Text > ]
export function Text({ origin, fill, font, size, justify, children }: IProps) {
  //-----------------------------------------------------------------< return >
  return (
    <text
      x={origin.x}
      y={origin.y}
      fill={fill ? `var(--${fill})` : undefined}
      fontFamily={font.split(" ")[0]}
      fontWeight={font.split(" ")[1]}
      fontSize={size}
      textAnchor={justify ?? "start"}
      dominantBaseline="middle"
    >
      {children}
    </text>
  );
}
