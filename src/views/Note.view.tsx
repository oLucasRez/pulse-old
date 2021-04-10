//--------------------------------------------------------------------< views >
import { Arrow } from "./Arrow.view";
//---------------------------------------------------------------------< tags >
import { Circle } from "../tags/Circle.tag";
import { Text } from "../tags/Text.tag";
//------------------------------------------------------------------< helpers >
import { quad, sum } from "../helpers/Vector.helper";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//--------------------------------------------------------------------< types >
import { Note as Props } from "../types/Note.type";
//-------------------------------------------------------------------< global >
const paragraphSpace = 10;
const fontSize = 16;
const paddingLeft = 16;
const maxFontWidth = 42;
//=================================================================[ < Note > ]
export function Note({ arrow, question, fact, answers }: Props) {
  //-------------------------------------------------------------< properties >
  const [isHover, setIsHover] = useState(false);
  //---------------------------------------------------------------------------
  const { horizontal } = quad(arrow.to, arrow.from);
  //---------------------------------------------------------------------------
  const onEnterCircle = () => setIsHover(true);
  const onOutCircle = () => setIsHover(false);
  const arrowArrow = {
    ...arrow,
    color: isHover ? arrow.color : "line",
  };
  const originQuestion = sum(arrow.to, {
    x:
      horizontal === "right"
        ? paddingLeft
        : -(question.text.length < maxFontWidth
            ? question.text.length
            : maxFontWidth) * 8,
    y: 0,
  });
  const fillQuestion = isHover ? question.color : "line";
  const fillAnswer = (index: number) =>
    isHover
      ? fact
        ? fact === index
          ? answers[index].color
          : "line"
        : answers[index].color
      : "line";
  //---------------------------------------------------------------------------
  let line = Math.ceil(question.text.length / maxFontWidth);
  //-----------------------------------------------------------------< return >
  return (
    <g className="note-container">
      <Circle
        origin={arrow.from}
        radius={24}
        onEnter={onEnterCircle}
        onOut={onOutCircle}
      />
      <Arrow {...arrowArrow} />
      <Text
        font="cursive bold"
        size={fontSize}
        shadow={isHover}
        origin={originQuestion}
        fill={fillQuestion}
        max={maxFontWidth}
      >
        {question.text}
      </Text>
      {answers.map(({ text }, index) => {
        const origin = sum(arrow.to, {
          x:
            horizontal === "right"
              ? paddingLeft
              : -(question.text.length < maxFontWidth
                  ? question.text.length
                  : maxFontWidth) * 8,
          y: fontSize * line + paragraphSpace * (index + 1),
        });
        line += Math.ceil(text.length / maxFontWidth);
        return (
          <Text
            key={index}
            fill={fillAnswer(index)}
            font="cursive light"
            size={fontSize}
            origin={origin}
            max={maxFontWidth}
          >
            {text}
          </Text>
        );
      })}
    </g>
  );
}
