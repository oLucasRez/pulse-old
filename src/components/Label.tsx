//---------------------------------------------------------------< components >
import { Circle } from "../tags/Circle.tag";
import { Text } from "../tags/Text.tag";
//------------------------------------------------------------------< helpers >
import { sum } from "../helpers/Vector.helper";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//--------------------------------------------------------------------< types >
import { TextProps } from "../tags/Text.tag";
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
        shadow={isHover}
        origin={sum(origin, { x: 36, y: 0 })}
        fill={isHover ? fill : "line"}
      >
        {children}
      </Text>
    </g>
  );
}
