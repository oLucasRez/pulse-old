//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
//------------------------------------------------------------------< helpers >
import { zero } from "../../helpers/Vector.helper";
import { attachToCrossings, attachToPulses } from "../../helpers/Layer.helper";
//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { CrossingsContext } from "../../contexts/CrossingsContext";
import { PulsesContext } from "../../contexts/PulsesContext";
//-------------------------------------------------------------------< styles >
import "../../styles/Layer.styles.css";
//--------------------------------------------------------------------< types >
import { SVGProps, ReactNode, MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
import { Vector } from "../../types/Vector.type";

interface IProps extends SVGProps<SVG> {
  pulseTrackable?: boolean;
  crossingTrackable?: boolean;
  children?: ReactNode;
}

export interface LayerProps {
  pulseTrackable?: boolean;
  crossingTrackable?: boolean;
  children?: ReactNode;
}
//================================================================[ < Layer > ]
export function Layer({
  pulseTrackable,
  crossingTrackable,
  children,
  onMouseMove,
  ...props
}: IProps) {
  //-------------------------------------------------------------< properties >
  const { crossings } = useContext(CrossingsContext);
  const { pulses } = useContext(PulsesContext);
  //---------------------------------------------------------------------------
  const [cursor, setCursor] = useState<Vector>(zero);
  //----------------------------------------------------------------< methods >
  function handleMove(e: MouseEvent<SVG>) {
    if (onMouseMove) {
      let _cursor = crossingTrackable
        ? attachToCrossings({ x: e.clientX, y: e.clientY }, crossings, 20)
        : { x: e.clientX, y: e.clientY };

      if (
        Math.floor(_cursor.x) === e.clientX &&
        Math.floor(_cursor.y) === e.clientY
      ) {
        _cursor = pulseTrackable
          ? attachToPulses({ x: e.clientX, y: e.clientY }, pulses, 20)
          : { x: e.clientX, y: e.clientY };
      }

      setCursor(_cursor);
      onMouseMove({ ...e, clientX: _cursor.x, clientY: _cursor.y });
    }
  }
  //-----------------------------------------------------------------< return >
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="layer-container"
      onMouseMove={handleMove}
    >
      {children}

      {(crossingTrackable || pulseTrackable) && (
        <Circle origin={cursor} radius={10} fill="line" />
      )}
    </svg>
  );
}
