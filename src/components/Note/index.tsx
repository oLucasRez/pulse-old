//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
import { Text } from "../SVGComponents/Text";
//------------------------------------------------------------------< helpers >
import { quadrant, sum } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
import { INote } from "../../types/INote";
import { Arrow } from "../Arrow";
//--------------------------------------------------------------------< types >
interface IProps {
  note: INote;
}
//-------------------------------------------------------------------< global >
const paragraphSpace = 10;
const fontSize = 16;
const paddingLeft = 16;
const maxFontWidth = 42;
//=================================================================[ < Note > ]
export function Note({ note }: IProps) {
  //-------------------------------------------------------------< properties >
  const [isHover, setIsHover] = useState(false);
  //---------------------------------------------------------------------------
  const { horizontal } = quadrant(note.arrow.to, note.arrow.from);
  //---------------------------------------------------------------------------
  const onEnterCircle = () => setIsHover(true);
  const onOutCircle = () => setIsHover(false);
  const arrowArrow = {
    ...note.arrow,
    color: isHover ? note.arrow.color : "line",
  };
  const originQuestion = sum(note.arrow.to, {
    x:
      horizontal === "right"
        ? paddingLeft
        : -(note.question.text.length < maxFontWidth
            ? note.question.text.length
            : maxFontWidth) * 8,
    y: 0,
  });
  const fillQuestion = isHover ? note.question.color : "line";
  const fillAnswer = (index: number) =>
    isHover
      ? note.fact
        ? note.fact === index
          ? note.answers[index].color
          : "line"
        : note.answers[index].color
      : "line";
  //---------------------------------------------------------------------------
  let line = Math.ceil(note.question.text.length / maxFontWidth);
  //-----------------------------------------------------------------< return >
  return (
    <g className="note-container">
      <Circle
        origin={note.arrow.from}
        radius={24}
        onEnter={onEnterCircle}
        onOut={onOutCircle}
      />
      <Arrow arrow={arrowArrow} />
      <Text
        font="cursive bold"
        size={fontSize}
        shadow={isHover}
        origin={originQuestion}
        fill={fillQuestion}
        max={maxFontWidth}
      >
        {note.question.text}
      </Text>
      {note.answers.map(({ text }, index) => {
        const origin = sum(note.arrow.to, {
          x:
            horizontal === "right"
              ? paddingLeft
              : -(note.question.text.length < maxFontWidth
                  ? note.question.text.length
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
