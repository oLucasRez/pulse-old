//---------------------------------------------------------------< components >
import { PulsesDisplayerLayer } from "../PulsesDisplayerLayer";
import { PulseCreatorLayer } from "../PulseCreatorLayer";
import { DiceRollerLayer } from "../DiceRollerLayer";
//===============================================================[ < Window > ]
export function Window() {
  //-----------------------------------------------------------------< return >
  console.log("window rendered");
  return (
    <>
      <PulsesDisplayerLayer />
      {/* <PulseCreatorLayer color="orange" /> */}
      <DiceRollerLayer />
    </>
  );
}
