//---------------------------------------------------------------< interfaces >
import { StepState, StepContext } from "../../interfaces/Step";
//------------------------------------------------------------------< classes >
import { PulseRoll } from "./PulseRoll.state";
//---------------------------------------------------------------< components >
import { NoteCreator } from "../../layers/NoteCreator.layer";
import { ObjectLabels } from "../../components/ObjectLabels";
//--------------------------------------------------------------------< types >
import { Note } from "../../types/Note.type";
//================================================================[ < Write > ]
export class Write implements StepState {
  //-------------------------------------------------------------< handleNote >
  handleNote(ctx: StepContext, note: Note) {
    const { CRUDs, setState, nextPlayer } = ctx;
    const { getNote, addNote, updateNote } = CRUDs.notes;

    if (getNote(note.arrow.from))
      updateNote(note.arrow.from, { question: note.question });
    else addNote(note);

    nextPlayer();

    setState(new PulseRoll());
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: StepContext) {
    const { CRUDs } = ctx;
    const { getPulse } = CRUDs.pulses;

    const pulse = getPulse("foreground");

    return (
      <NoteCreator
        from={pulse.origin}
        color={pulse.color}
        onNote={(note) => this.handleNote(ctx, note)}
      >
        <ObjectLabels />
      </NoteCreator>
    );
  }
}
