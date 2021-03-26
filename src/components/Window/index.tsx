//---------------------------------------------------------------< components >
import { PulsesDisplayerLayer } from "../PulsesDisplayerLayer";
import { PulseCreatorLayer } from "../PulseCreatorLayer";
import { DiceRollerLayer } from "../DiceRollerLayer";
import { MagnetCursorLayer } from "../MagnetCursorLayer";
//===============================================================[ < Window > ]
export function Window() {
  //-----------------------------------------------------------------< return >
  console.log("window rendered");
  return (
    <>
      <MagnetCursorLayer />
      <PulsesDisplayerLayer />
      <PulseCreatorLayer color="orange" />
      {/* <DiceRollerLayer /> */}
    </>
  );
}
