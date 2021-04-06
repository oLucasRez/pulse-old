import { WindowContext, WindowState } from ".";
import { DicesDisplayerLayer } from "../../components/Layers/DicesDisplayerLayer";
import { NoteCreatorLayer } from "../../components/Layers/NoteCreatorLayer";
import { PulsesDisplayerLayer } from "../../components/Layers/PulsesDisplayerLayer";
import { Note } from "../../types/Note.type";
import { FirstPulsesRollState } from "./FirstPulsesRollState";
import { InitialPositioningState } from "./InitialPositioningState";
import { InvestigationState } from "./InvestigationState";

//==================================================[ < DefineMainFactState > ]
export class DefineMainFactState implements WindowState {
  public handleText(ctx: WindowContext, text: string) {
    const {
      playersContext,
      nextPlayer,
      setState,
      currentPlayer,
      dicesContext,
    } = ctx;
    const { updatePlayer } = playersContext;
    const { getDice } = dicesContext;

    updatePlayer(getDice(currentPlayer.color).color, { object: text });

    setState(new InitialPositioningState());

    nextPlayer(1);
  }

  public handleStepFinish(ctx: WindowContext) {
    const { setState } = ctx;

    setState(new FirstPulsesRollState());
  }

  handleNote(ctx: WindowContext, note: Note) {
    const { notesContext, setState } = ctx;
    const { addNote } = notesContext;

    addNote(note);
    setState(new InvestigationState());
  }

  public draw(ctx: WindowContext) {
    const { pulsesContext } = ctx;
    const { getPulse } = pulsesContext;

    const pulse = getPulse("foreground");

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <NoteCreatorLayer
          from={pulse.origin}
          color={pulse.color}
          onNote={(note) => this.handleNote(ctx, note)}
        />
      </>
    );
  }
}
