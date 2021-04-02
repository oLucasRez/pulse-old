//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
import { Label } from "../Label";
//------------------------------------------------------------------< helpers >
import { zero } from "../../helpers/vectorHelper";
import { attachToCrossings, attachToPulses } from "./helpers";
//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { CrossingsContext } from "../../contexts/CrossingsContext";
import { PulsesContext } from "../../contexts/PulsesContext";
import { PlayersContext } from "../../contexts/PlayersContext";
import { DicesContext } from "../../contexts/DicesContext";
//-------------------------------------------------------------------< styles >
import "./styles.css";
//--------------------------------------------------------------------< types >
import { SVGProps, ReactNode, MouseEvent } from "react";
import { ISVG } from "../../types/ISVG";
import { IVector } from "../../types/IVector";
export interface LayerProps extends SVGProps<ISVG> {
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
}: LayerProps) {
  //-------------------------------------------------------------< properties >
  const { crossings } = useContext(CrossingsContext);
  const { pulses } = useContext(PulsesContext);
  const { players } = useContext(PlayersContext);
  const { getDice } = useContext(DicesContext);
  //---------------------------------------------------------------------------
  const [cursor, setCursor] = useState<IVector>(zero);
  //----------------------------------------------------------------< methods >
  function handleMove(e: MouseEvent<ISVG>) {
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

      {players.map((player, index) => {
        const dice = getDice(player.color);
        return (
          <g key={index}>
            {dice.origin && (
              <Label
                origin={dice.origin}
                size={24}
                font="cursive light"
                fill={dice.color}
              >
                {player.object}
              </Label>
            )}
          </g>
        );
      })}
    </svg>
  );
}
