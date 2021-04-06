//------------------------------------------------------------------< helpers >
import { quad } from "../helpers/Vector.helper";
//--------------------------------------------------------------------< hooks >
import { KeyboardEvent, useState } from "react";
//-------------------------------------------------------------------< styles >
import "../styles/InputText.styles.css";
//--------------------------------------------------------------------< types >
import { Vector } from "../types/Vector.type";
import { Color } from "../types/Color.type";
import { ChangeEvent } from "react";
import { Textarea } from "../types/Textarea.type";

interface IProps {
  origin: Vector;
  color: Color;
  max?: number;
  onText?: (text: string) => void;
}
//============================================================[ < InputText > ]
export function InputText({ origin, color, max = 300, onText }: IProps) {
  //-------------------------------------------------------------< properties >
  const { horizontal } = quad(origin, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const padding = 20;
  const area = max * 360;
  const width =
    (horizontal === "left" ? origin.x : window.innerWidth - origin.x) - padding;
  const height = area / width;
  //---------------------------------------------------------------------------
  const [text, setText] = useState("");
  //----------------------------------------------------------------< methods >
  function handleInput(e: ChangeEvent<Textarea>) {
    setText(e.target.value);
  }

  function handleEnter(e: KeyboardEvent<Textarea>) {
    if (e.shiftKey || e.key !== "Enter") return;

    if (onText) onText(text);
  }
  //-----------------------------------------------------------------< return >
  console.log("input-text render");
  return (
    <foreignObject
      className="input-text"
      alignmentBaseline="middle"
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <div
        className="container"
        style={{
          left: horizontal === "left" ? origin.x - 10 - width : origin.x + 10,
          top: origin.y,
        }}
      >
        <textarea
          className="input"
          maxLength={max}
          onChange={handleInput}
          onKeyPress={handleEnter}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            color: `var(--${color})`,
          }}
        />
        <span>{max - text.length}</span>
      </div>
    </foreignObject>
  );
}
