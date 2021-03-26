//---------------------------------------------------------------< components >
import { Layer } from "../Layer";
import { Circle } from "../SVGComponents/Circle";
//------------------------------------------------------------------< helpers >
import { zero } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { MagnetCursorContext } from "../../contexts/MagnetCursorContext";
//====================================================[ < MagnetCursorLayer > ]
export function MagnetCursorLayer() {
  //-------------------------------------------------------------< properties >
  const { magnetCursor } = useContext(MagnetCursorContext);
  //-----------------------------------------------------------------< return >
  console.log("magnet-cursor-layer render");
  return (
    <Layer>
      {magnetCursor !== zero && (
        <Circle origin={magnetCursor} radius={10} fill="line" />
      )}
    </Layer>
  );
}
