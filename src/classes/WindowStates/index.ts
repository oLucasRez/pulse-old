import { DicesContextData } from "../../contexts/DicesContext";
import { NotesContextData } from "../../contexts/NotesContext";
import { PlayersContextData } from "../../contexts/PlayersContext";
import { PulsesContextData } from "../../contexts/PulsesContext";
import { Dice } from "../../types/Dice.type";
import { Dispatcher } from "../../types/Dispatcher.type";
import { Player } from "../../types/Player.type";
import { Pulse } from "../../types/Pulse.type";

export interface WindowContext {
  playersContext: PlayersContextData;
  dicesContext: DicesContextData;
  pulsesContext: PulsesContextData;
  notesContext: NotesContextData;
  currentPlayer: Player;
  nextPlayer: (clockwise: -1 | 1) => void;
  setState: Dispatcher<WindowState>;
}

export interface WindowState {
  handleRoll?(ctx: WindowContext, dice: Dice): void;
  handlePulse?(ctx: WindowContext, pulse: Pulse): void;
  handleStepFinish?(ctx: WindowContext): void;
  handleText?(ctx: WindowContext, text: string): void;
  draw(ctx: WindowContext): JSX.Element;
}
