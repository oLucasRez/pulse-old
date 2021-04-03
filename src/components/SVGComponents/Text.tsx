//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
import { IColor } from "../../types/IColor";
import { ReactNode } from "react";
export interface TextProps {
  origin: IVector;
  fill: IColor;
  font: "cursive light" | "cursive bold" | "sansserif regular";
  size: number;
  justify?: "start" | "middle" | "end";
  shadow?: boolean;
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
const dict: any = {
  cursive: "Kalam",
  sansserif: "Rubik",

  light: "300",
  regular: "500",
  bold: "700",
};
//=================================================================[ < Text > ]
export function Text({
  origin,
  fill,
  font,
  size,
  justify,
  shadow,
  children,
}: TextProps) {
  //-------------------------------------------------------------< properties >
  const [fontFamily, fontWeight] = font.split(" ");
  //-----------------------------------------------------------------< return >
  return (
    <g>
      {shadow && (
        <text
          {...origin}
          strokeWidth={5}
          stroke={`var(--background)`}
          fill="none"
          fontFamily={dict[fontFamily]}
          fontWeight={dict[fontWeight]}
          fontSize={size}
          textAnchor={justify ?? "start"}
          dominantBaseline="middle"
        >
          {children}
        </text>
      )}
      <text
        {...origin}
        fill={fill ? `var(--${fill})` : undefined}
        fontFamily={dict[fontFamily]}
        fontWeight={dict[fontWeight]}
        fontSize={size}
        textAnchor={justify ?? "start"}
        dominantBaseline="middle"
      >
        {children}
      </text>
    </g>
  );
}
