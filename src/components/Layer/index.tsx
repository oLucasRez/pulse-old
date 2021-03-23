//-------------------------------------------------------------------< styles >
import "./styles.css";
//--------------------------------------------------------------------< types >
import { SVG } from "../../types/SVG";
import { ReactNode, SVGProps } from "react";
interface LayerProps extends SVGProps<SVG> {
  children: ReactNode;
}
//================================================================[ < Layer > ]
export function Layer({ children, ...props }: LayerProps) {
  //-----------------------------------------------------------------< return >
  return (
    <svg
      {...props}
      className="layer-container"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}
