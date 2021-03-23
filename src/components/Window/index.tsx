//---------------------------------------------------------------< components >
import { PulsesDisplayerLayer } from "../PulsesDisplayerLayer";
import { PulseCreatorLayer } from "../PulseCreatorLayer";
//===============================================================[ < Window > ]
export function Window() {
  //-----------------------------------------------------------------< return >
  console.log("window rendered");
  return (
    <>
      <PulsesDisplayerLayer />
      <PulseCreatorLayer color="orange" />
    </>
  );
}
