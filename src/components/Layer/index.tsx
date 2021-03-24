//-------------------------------------------------------------------< styles >
import "./styles.css";
//--------------------------------------------------------------------< types >
import { ISVG } from "../../types/ISVG";
import { SVGProps, ReactNode } from "react";
interface IProps extends SVGProps<ISVG> {
  children: ReactNode;
}
//================================================================[ < Layer > ]
export function Layer({ children, ...props }: IProps) {
  //-----------------------------------------------------------------< return >
  return (
    <svg {...props} className="layer-container">
      {children}
    </svg>
  );
}
