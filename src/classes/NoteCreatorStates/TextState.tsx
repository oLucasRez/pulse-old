//---------------------------------------------------------------< interfaces >
import { NoteCreatorState, NoteCreatorContext } from ".";
//---------------------------------------------------------------< components >
import { Arrow } from "../../components/Arrow";
import { InputText } from "../../components/InputText";
//============================================================[ < TextState > ]
export class TextState implements NoteCreatorState {
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

  public draw(ctx: NoteCreatorContext) {
    const { from, toState, color, max } = ctx;
    const [to] = toState;

    return (
      <>
        <Arrow {...{ from, to, color }} />
        <InputText
          {...{ origin: to, color, max }}
          onText={(text) => this.handleText(ctx, text)}
        />
      </>
    );
  }
}
