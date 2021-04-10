//---------------------------------------------------------------< interfaces >
import {
  DiceRollerState,
  DiceRollerContext,
} from "../../interfaces/DiceRoller";
//------------------------------------------------------------------< classes >
import { Pull } from "./Pull.state";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
//===============================================================[ < Origin > ]
export class Origin implements DiceRollerState {
  //-------------------------------------------------------------< handleDown >
  public handleDown(ctx: DiceRollerContext, e: MouseEvent<SVG>) {
    const { originState, pullState, setState } = ctx;
    const [, setOrigin] = originState;
    const [, setPull] = pullState;

    const { clientX: x, clientY: y } = e;

    setOrigin({ x, y });
    setPull({ x, y });

    setState(new Pull());
  }
}
