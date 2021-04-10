import { CRUDs } from "../types/CRUDs";
import { Dispatcher } from "../types/Dispatcher.type";
import { Player } from "../types/Player.type";

export interface StepProps {
  currentPlayer: Player;
  nextPlayer: () => void;
}

export interface StepContext {
  CRUDs: CRUDs;
  currentPlayer: Player;
  nextPlayer: () => void;
  setState: Dispatcher<StepState>;
}

export interface StepState {
  draw(ctx: StepContext): JSX.Element;
}
