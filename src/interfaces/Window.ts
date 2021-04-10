import { Dispatcher } from "../types/Dispatcher.type";
import { Player } from "../types/Player.type";

export interface WindowContext {
  currentPlayer: Player;
  nextPlayer: (clockwise: -1 | 1) => void;
  setState: Dispatcher<WindowState>;
}

export interface WindowState {
  nextStep: (ctx: WindowContext) => void;
  draw(ctx: WindowContext): JSX.Element;
}
