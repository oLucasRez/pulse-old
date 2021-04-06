//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-------------------------------------------------------------------< styles >
import "../styles/ObjectTextarea.styles.css";
import { HiCheckCircle as Check } from "react-icons/hi";
//--------------------------------------------------------------------< types >
import { Vector } from "../types/Vector.type";
import { Color } from "../types/Color.type";
import { ChangeEvent } from "react";
import { Textarea } from "../types/Textarea.type";
interface IProps {
  origin: Vector;
  color: Color;
  onText: (text: string) => void;
}
//=======================================================[ < ObjectTextarea > ]
export function ObjectTextarea({ origin, color, onText }: IProps) {
  //-------------------------------------------------------------< properties >
  const [value, setValue] = useState("");
  //----------------------------------------------------------------< methods >
  function handleInput(e: ChangeEvent<Textarea>) {
    setValue(e.target.value);
  }

  function handleClick() {
    if (!value.length) return;

    onText(value);
  }
  //-----------------------------------------------------------------< return >
  console.log("object-textarea render");
  return (
    <foreignObject
      className="object-textarea"
      alignmentBaseline="middle"
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <div
        className="container"
        style={{ left: `${origin.x}px`, top: `${origin.y}px` }}
      >
        <textarea
          className="input"
          maxLength={30}
          onChange={handleInput}
          style={{
            borderBottom: `2px solid var(--${color})`,
            color: `var(--${color})`,
          }}
          color={color}
        />
        <span>{30 - value.length}</span>
        <Check
          className={value.length ? "enabled" : "disabled"}
          onClick={handleClick}
          style={{ color: `var(--${color})` }}
        />
      </div>
    </foreignObject>
  );
}
