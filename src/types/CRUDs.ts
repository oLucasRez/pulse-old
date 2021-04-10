import { DicesContextData } from "../cruds/Dices.crud";
import { NotesContextData } from "../cruds/Notes.crud";
import { PlayersContextData } from "../cruds/Players.crud";
import { PulsesContextData } from "../cruds/Pulses.crud";

export interface CRUDs {
  dices: DicesContextData;
  notes: NotesContextData;
  players: PlayersContextData;
  pulses: PulsesContextData;
}
