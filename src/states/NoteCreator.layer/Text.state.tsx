//---------------------------------------------------------------< interfaces >
import {
  NoteCreatorState,
  NoteCreatorContext,
} from "../../interfaces/NoteCreator";
//---------------------------------------------------------------< components >
import { Arrow } from "../../views/Arrow.view";
import { InputText } from "../../components/InputText";
//=================================================================[ < Text > ]
export class Text implements NoteCreatorState {
  //-------------------------------------------------------------< handleText >
  handleText(ctx: NoteCreatorContext, text: string) {
    const { from, toState, onNote, color } = ctx;
    const [to] = toState;

    onNote({
      arrow: {
        color,
        from,
        to,
      },
      question: { text, color },
      answers: [],
    });
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: NoteCreatorContext) {
    const { from, toState, color, currentText, max } = ctx;
    const [to] = toState;

    return (
      <>
        <Arrow {...{ from, to, color }} />
        <InputText
          {...{ origin: to, color, max }}
          value={currentText}
          onText={(text) => this.handleText(ctx, text)}
        />
      </>
    );
  }
}
