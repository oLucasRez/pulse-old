//---------------------------------------------------------------< components >
import { Layer, LayerProps } from ".";
import { ObjectTextarea } from "../ObjectTextarea";
//------------------------------------------------------------------< helpers >
import { zero } from "../../helpers/Vector.helper";
//--------------------------------------------------------------------< types >
import { Dice } from "../../types/Dice.type";

interface IProps extends LayerProps {
  dice: Dice;
  onText: (text: string) => void;
}
//========================================================[ < TextareaLayer > ]
export function TextareaLayer({ dice, onText, children }: IProps) {
  //-----------------------------------------------------------------< return >
  console.log("textarea-layer render");
  return (
    <Layer>
      {children}

      <ObjectTextarea
        origin={dice.origin ?? zero}
        color={dice.color}
        onText={onText}
      />
    </Layer>
  );
}
