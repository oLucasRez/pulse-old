//------------------------------------------------------------------< classes >
import { BeginningState } from "./states";
//---------------------------------------------------------------< components >
import { Layer, LayerProps } from "../Layer";
//------------------------------------------------------------------< helpers >
import { zero } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//--------------------------------------------------------------------< types >
import { IDice } from "../../types/IDice";
import { IVector } from "../../types/IVector";
import { IContext, IState } from "./states";
import { MouseEvent } from "react";
import { ISVG } from "../../types/ISVG";
interface IProps extends LayerProps {
  dice: IDice;
  onRollStop: (dice: IDice) => void;
}
//======================================================[ < DiceRollerLayer > ]
export function DiceRollerLayer({ dice, onRollStop, ...props }: IProps) {
  //-------------------------------------------------------------< properties >
  const [origin, setOrigin] = useState<IVector>(zero);
  const [pull, setPull] = useState<IVector>(zero);
  const [state, setState] = useState<IState>(new BeginningState());
  //---------------------------------------------------------------------------
  const _this: IContext = {
    dice,
    origin,
    setOrigin,
    pull,
    setPull,
    setState,
    onRollStop,
  };
  //----------------------------------------------------------------< methods >
  function handleDown(e: MouseEvent<ISVG>) {
    if (state.handleDown) state.handleDown(_this, e);
  }

  function handleMove(e: MouseEvent<ISVG>) {
    if (state.handleMove) state.handleMove(_this, e);
  }

  function handleUp(e: MouseEvent<ISVG>) {
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
    </Layer>
  );
}
