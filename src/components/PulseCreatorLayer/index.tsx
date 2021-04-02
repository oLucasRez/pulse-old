//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
import { Layer, LayerProps } from "../Layer";
//------------------------------------------------------------------< helpers >
import { sub, zero, mod } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { PulsesContext } from "../../contexts/PulsesContext";
import { DicesContext } from "../../contexts/DicesContext";
//--------------------------------------------------------------------< types >
import { IDice } from "../../types/IDice";
import { MouseEvent } from "react";
import { ISVG } from "../../types/ISVG";
interface IProps extends LayerProps {
  dice: IDice;
  onPulseCreated: () => void;
}
//====================================================[ < PulseCreatorLayer > ]
export function PulseCreatorLayer({ dice, onPulseCreated, ...props }: IProps) {
  //-------------------------------------------------------------< properties >
  const { value: amount, color } = dice;
  //---------------------------------------------------------------------------
  const { addPulse } = useContext(PulsesContext);
  const { getDice } = useContext(DicesContext);
  //---------------------------------------------------------------------------
  const [gap, setGap] = useState<number>(0);
  //----------------------------------------------------------------< methods >
  function handleMouseMove(e: MouseEvent<ISVG>) {
    const { clientX: x, clientY: y } = e;

    const d = sub({ x, y }, getDice(dice.color).origin ?? zero);
    const _gap = mod(d);

    setGap(_gap);
  }

  function handleClick(e: MouseEvent<ISVG>) {
    addPulse({
      origin: getDice(dice.color).origin ?? zero,
      gap,
      amount,
      color,
    });
    onPulseCreated();
  }

  function drawPulses() {
    const origin = getDice(dice.color).origin ?? zero;

    const pulses = [];

    pulses.push(
      <Circle key={1} type="main" origin={origin} radius={gap} stroke={color} />
    );

    for (let i = 2; i <= amount; i++) {
      pulses.push(
        <Circle
          key={i}
          type="display"
          origin={origin}
          radius={gap * i}
          stroke="line"
        />
      );
    }

    return pulses;
  }
  //-----------------------------------------------------------------< return >
  console.log("pulse-creator-layer render");
  return (
    <Layer {...props} onMouseMove={handleMouseMove} onClick={handleClick}>
      {drawPulses()}
    </Layer>
  );
}
