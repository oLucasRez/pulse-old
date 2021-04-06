//---------------------------------------------------------------< interfaces >
import { DiceRollerContext, DiceRollerState } from ".";
//------------------------------------------------------------------< classes >
import { PullState } from "./PullState";
//---------------------------------------------------------------< components >
import { Text } from "../../components/SVGComponents/Text";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
//============================================================[ < WarnState > ]
export class WarnState implements DiceRollerState {
  public handleDown(ctx: DiceRollerContext, e: MouseEvent<SVG>) {
    const { originState, pullState, setState } = ctx;
    const [, setOrigin] = originState;
    const [, setPull] = pullState;

    const { clientX: x, clientY: y } = e;

    setOrigin({ x, y });
    setPull({ x, y });
    setState(new PullState());
  }

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
