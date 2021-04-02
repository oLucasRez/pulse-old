//---------------------------------------------------------------< components >
import { Layer } from "../Layer";
import { ObjectTextarea } from "../ObjectTextarea";
//------------------------------------------------------------------< helpers >
import { zero } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< types >
import { IDice } from "../../types/IDice";
interface IProps {
  dice: IDice;
  onText: (text: string) => void;
}
//========================================================[ < TextareaLayer > ]
export function TextareaLayer({ dice, onText }: IProps) {
  //-----------------------------------------------------------------< return >
  console.log("players-displayer-layer render");
  return (
    <Layer>
      <ObjectTextarea
        origin={dice.origin ?? zero}
        color={dice.color}
        onText={onText}
      />
    </Layer>
  );
}
