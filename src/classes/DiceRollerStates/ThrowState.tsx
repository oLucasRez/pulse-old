//---------------------------------------------------------------< interfaces >
import { DiceRollerContext, DiceRollerState } from ".";
//------------------------------------------------------------------< classes >
import { PullState } from "./PullState";
import { InitialState } from "./InitialState";
//---------------------------------------------------------------< components >
import { DynamicDice } from "../../components/DynamicDice";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
import { Dice } from "../../types/Dice.type";
//===========================================================[ < ThrowState > ]
export class ThrowState implements DiceRollerState {
  public handleDown(ctx: DiceRollerContext, e: MouseEvent<SVG>) {
    const { originState, pullState, setState } = ctx;
    const [, setOrigin] = originState;
    const [, setPull] = pullState;

    const { clientX: x, clientY: y } = e;

    setOrigin({ x, y });
    setPull({ x, y });
    setState(new PullState());
  }

  handleStop(ctx: DiceRollerContext, dice: Dice) {
    const { setState, onRoll } = ctx;

    setState(new InitialState());
    onRoll(dice);
  }

  public draw(ctx: DiceRollerContext) {
    const { originState, pullState, dice } = ctx;
    const [origin] = originState;
    const [pull] = pullState;

    const x = (origin.x - pull.x) * 0.5;
    const y = (origin.y - pull.y) * 0.5;

    return (
      <DynamicDice
        overloadable
        dice={{ ...dice, origin: pull, value: 0 }}
        force={{ x, y }}
        onStop={(dice) => this.handleStop(ctx, dice)}
      />
    );
  }
}
