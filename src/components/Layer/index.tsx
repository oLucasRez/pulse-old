//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { MagnetCursorContext } from "../../contexts/MagnetCursorContext";
//-------------------------------------------------------------------< styles >
import "./styles.css";
//--------------------------------------------------------------------< types >
import { ISVG } from "../../types/ISVG";
import { SVGProps, ReactNode, MouseEvent } from "react";
interface IProps extends SVGProps<ISVG> {
  children: ReactNode;
}
//================================================================[ < Layer > ]
export function Layer({ children, onMouseMove, ...props }: IProps) {
  const { track } = useContext(MagnetCursorContext);

  function handleMove(e: MouseEvent<ISVG>) {
    if (onMouseMove) onMouseMove(e);
    track({ x: e.clientX, y: e.clientY });
  }
  //-----------------------------------------------------------------< return >
  return (
    <svg {...props} className="layer-container" onMouseMove={handleMove}>
      {children}
    </svg>
  );
}
