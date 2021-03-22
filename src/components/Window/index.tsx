//---------------------------------------------------------------< components >
import { Pulse } from "../Pulse";
//-------------------------------------------------------------------< styles >
import "./styles.css";
//===============================================================[ < Window > ]
export function Window() {
  //-----------------------------------------------------------------< return >
  return (
    <svg className="window-container">
      <Pulse x="50%" y="50%" gap={2} amount={3} color="foreground" />
    </svg>
  );
}
