//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
import { IColor } from "../../types/IColor";
import { ReactNode, useMemo } from "react";
import { useTextWidth } from "@imagemarker/use-text-width";
export interface TextProps {
  origin: IVector;
  fill: IColor;
  font: "cursive light" | "cursive bold" | "sansserif regular";
  size: number;
  justify?: "start" | "middle" | "end";
  shadow?: boolean;
  max?: number;
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
  max,
  children,
}: TextProps) {
  //-------------------------------------------------------------< properties >
  const [fontFamily, fontWeight] = font.split(" ");
  const lines = useMemo(() => {
    if (!max) return [children?.toString()];

    const lines = [];
    const words = children ? children.toString().split(" ").reverse() : [];

    while (words.length > 0) {
      let line = "";
      let word = "";
      while (
        (line + words[words.length - 1]).length <= max &&
        words.length > 0
      ) {
        line += words.pop() + " ";
      }
      lines.push((line + word).substr(0, (line + word).length - 1));
    }

    return lines;
  }, []);
  //-----------------------------------------------------------------< return >
  return (
    <g style={{ zIndex: shadow ? 10 : undefined }}>
      {lines?.map((line, index) => (
        <g key={index}>
          {shadow && (
            <text
              x={origin.x}
              y={origin.y + index * size}
              strokeWidth={5}
              stroke={`var(--background)`}
              fill="none"
              fontFamily={dict[fontFamily]}
              fontWeight={dict[fontWeight]}
              fontSize={size}
              textAnchor={justify ?? "start"}
              dominantBaseline="middle"
            >
              {line}
            </text>
          )}
          <text
            x={origin.x}
            y={origin.y + index * size}
            fill={fill ? `var(--${fill})` : undefined}
            fontFamily={dict[fontFamily]}
            fontWeight={dict[fontWeight]}
            fontSize={size}
            textAnchor={justify ?? "start"}
            dominantBaseline="middle"
            cursor="default"
          >
            {line}
          </text>
        </g>
      ))}
    </g>
  );
}

// interface LineProps {
//   line: string;
// }

// function Line({line}: LineProps) {
//   return
// }

// interface WordProps {
//   word: string;
// }

// function Word({word}: WordProps) {
//   return
// }
