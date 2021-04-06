import { WindowState } from ".";
import { DicesDisplayerLayer } from "../../components/Layers/DicesDisplayerLayer";
import { PulsesDisplayerLayer } from "../../components/Layers/PulsesDisplayerLayer";
import { Notes } from "../../components/Notes";

//===================================================[ < InvestigationState > ]
export class InvestigationState implements WindowState {
  public draw() {
    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer>
          <Notes />
        </DicesDisplayerLayer>
      </>
    );
  }
}
