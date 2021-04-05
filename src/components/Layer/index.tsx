import { Note } from "../Note";
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
import { NotesContext } from "../../contexts/NotesContext";
import { useTextWidth } from "@imagemarker/use-text-width";
interface IProps extends SVGProps<ISVG> {
  pulseTrackable?: boolean;
  crossingTrackable?: boolean;
  children?: ReactNode;
}
export interface LayerProps {
  pulseTrackable?: boolean;
  crossingTrackable?: boolean;
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
  const { players } = useContext(PlayersContext);
  const { notes } = useContext(NotesContext);
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

      {/* {notes.map((note, index) => (
        <Note key={index} note={note} />
      ))} */}

      <Note
        note={{
          arrow: {
            from: { x: 500, y: 500 },
            to: { x: 700, y: 300 },
            color: "pink",
          },
          question: { color: "pink", text: "Por que o cara não atirou?" },
          answers: [
            {
              color: "blue",
              text: "Porque o cara é brabo",
            },
            {
              color: "red",
              text: "Porque ele tinha um problema na mão, era raquítico",
            },
            {
              color: "yellow",
              text: "Porque era o irmão dele, dado como morto há muito tempo",
            },
          ],
          fact: 1,
        }}
      />

      <Note
        note={{
          arrow: {
            from: { x: 600, y: 600 },
            to: { x: 300, y: 600 },
            color: "pink",
          },
          question: {
            color: "pink",
            text: "Por que o cara não atirou bla bla bla bla bla bla?",
          },
          answers: [
            {
              color: "blue",
              text: "Porque o cara é brabo",
            },
            {
              color: "red",
              text: "Porque ele tinha um problema na mão, era raquítico",
            },
            {
              color: "yellow",
              text: "Porque era o irmão dele, dado como morto há muito tempo",
            },
          ],
          fact: 1,
        }}
      />
    </svg>
  );
}
