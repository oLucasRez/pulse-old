//---------------------------------------------------------------< components >
import { MagnetCursorLayer } from "../MagnetCursorLayer";
import { PlayersDisplayerLayer } from "../PlayersDisplayerLayer";
import { PulsesDisplayerLayer } from "../PulsesDisplayerLayer";
import { PulseCreatorLayer } from "../PulseCreatorLayer";
import { DiceRollerLayer } from "../DiceRollerLayer";
//===============================================================[ < Window > ]
export function Window() {
  //-----------------------------------------------------------------< return >
  console.log("window rendered");
  return (
    <>
      {/* <MagnetCursorLayer /> */}
      <PlayersDisplayerLayer />
      <PulsesDisplayerLayer />
      <PulseCreatorLayer color="orange" />
      {/* <DiceRollerLayer /> */}
    </>
  );
}
