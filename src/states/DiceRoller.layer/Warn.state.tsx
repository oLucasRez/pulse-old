//---------------------------------------------------------------< interfaces >
import {
  DiceRollerState,
  DiceRollerContext,
} from "../../interfaces/DiceRoller";
//------------------------------------------------------------------< classes >
import { Pull } from "./Pull.state";
//---------------------------------------------------------------< components >
import { Text } from "../../tags/Text.tag";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
//=================================================================[ < Warn > ]
export class Warn implements DiceRollerState {
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
  //-------------------------------------------------------------------< draw >
  public draw(ctx: DiceRollerContext) {
    const { originState } = ctx;
    const [origin] = originState;

    return (
      <Text
        origin={origin}
        fill="line"
        font="sansserif regular"
        size={16}
        justify="middle"
      >
        Clique e arraste para lançar o dado
      </Text>
    );
  }
}
