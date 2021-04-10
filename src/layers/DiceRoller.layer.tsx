//---------------------------------------------------------------< interfaces >
import { DiceRollerState, DiceRollerContext } from "../interfaces/DiceRoller";
//------------------------------------------------------------------< classes >
import { Origin } from "../states/DiceRoller.layer/Origin.state";
//---------------------------------------------------------------< components >
import { Layer } from ".";
//------------------------------------------------------------------< helpers >
import { zero } from "../helpers/Vector.helper";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//--------------------------------------------------------------------< types >
import { LayerProps } from ".";
import { Dice } from "../types/Dice.type";
import { Vector } from "../types/Vector.type";
import { MouseEvent } from "react";
import { SVG } from "../types/SVG.type";

interface IProps extends LayerProps {
  dice: Dice;
  onRoll: (dice: Dice) => void;
}
//===========================================================[ < DiceRoller > ]
export function DiceRoller({ dice, onRoll, children, ...props }: IProps) {
  //-------------------------------------------------------------< properties >
  const originState = useState<Vector>(zero);
  const pullState = useState<Vector>(zero);
  const [state, setState] = useState<DiceRollerState>(new Origin());
  //---------------------------------------------------------------------------
  const _this: DiceRollerContext = {
    dice,
    originState,
    pullState,
    setState,
    onRoll,
  };
  //----------------------------------------------------------------< methods >
  function handleDown(e: MouseEvent<SVG>) {
    if (state.handleDown) state.handleDown(_this, e);
  }

  function handleMove(e: MouseEvent<SVG>) {
    if (state.handleMove) state.handleMove(_this, e);
  }

  function handleUp(e: MouseEvent<SVG>) {
    if (state.handleUp) state.handleUp(_this, e);
  }
  //-----------------------------------------------------------------< return >
  console.log("dice-roller-layer render");
  return (
    <Layer
      {...props}
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
    >
      {state.draw && state.draw(_this)}

      {children}
    </Layer>
  );
}
