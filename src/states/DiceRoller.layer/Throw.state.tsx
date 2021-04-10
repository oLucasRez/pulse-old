//---------------------------------------------------------------< interfaces >
import {
  DiceRollerState,
  DiceRollerContext,
} from "../../interfaces/DiceRoller";
//------------------------------------------------------------------< classes >
import { Pull } from "./Pull.state";
import { Origin } from "./Origin.state";
//---------------------------------------------------------------< components >
import { DynamicDice } from "../../components/DynamicDice";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
import { Dice } from "../../types/Dice.type";
//================================================================[ < Throw > ]
export class Throw implements DiceRollerState {
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
  //-------------------------------------------------------------< handleStop >
  handleStop(ctx: DiceRollerContext, dice: Dice) {
    const { setState, onRoll } = ctx;

    onRoll(dice);
    setState(new Origin());
  }
  //-------------------------------------------------------------------< draw >
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
