import { Dice } from "../types/Dice.type";
import { Vector } from "../types/Vector.type";
import { Dispatcher } from "../types/Dispatcher.type";
import { MouseEvent } from "react";
import { SVG } from "../types/SVG.type";
import { StateHook } from "../types/StateHook.type";

export interface DiceRollerContext {
  dice: Dice;
  originState: StateHook<Vector>;
  pullState: StateHook<Vector>;
  onRoll: (dice: Dice) => void;
  setState: Dispatcher<DiceRollerState>;
}

export interface DiceRollerState {
  handleDown?(ctx: DiceRollerContext, e: MouseEvent<SVG>): void;
  handleMove?(ctx: DiceRollerContext, e: MouseEvent<SVG>): void;
  handleUp?(ctx: DiceRollerContext, e: MouseEvent<SVG>): void;
  draw?(ctx: DiceRollerContext): JSX.Element;
}
