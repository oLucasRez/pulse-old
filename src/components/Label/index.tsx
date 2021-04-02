//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
import { Text } from "../SVGComponents/Text";
//------------------------------------------------------------------< helpers >
import { sum } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//--------------------------------------------------------------------< types >
import { TextProps } from "../SVGComponents/Text";
//================================================================[ < Label > ]
export function Label({ children, origin, fill, ...props }: TextProps) {
  //-------------------------------------------------------------< properties >
  const [isHover, setIsHover] = useState(false);
  //-----------------------------------------------------------------< return >
  return (
    <g>
      <Circle
        origin={origin}
        radius={24}
        onEnter={() => setIsHover(true)}
        onOut={() => setIsHover(false)}
      />
      <Text
        {...props}
        origin={sum(origin, { x: 36, y: 0 })}
        fill={isHover ? fill : "line"}
      >
        {children}
      </Text>
    </g>
  );
}
