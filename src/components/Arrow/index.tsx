//---------------------------------------------------------------< components >
import {
  mod,
  sub,
  sum,
  avg,
  mult,
  norm,
  rotate,
  angle,
  quadrant,
} from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
import { IArrow } from "../../types/IArrow";
interface IProps {
  arrow: IArrow;
}
//================================================================[ < Arrow > ]
export function Arrow({ arrow }: IProps) {
  //-------------------------------------------------------------< properties >
  const { from, to, color } = arrow;
  //---------------------------------------------------------------------------
  const curve =
    ((quadrant(to, from).horizontal === "left" ? 1 : -1) *
      (quadrant(to, from).vertical === "top" ? 1 : -1) *
      mod(sub(from, to))) /
    3;
  const bezier = sum(
    avg(from, to),
    mult(norm(rotate(sub(from, to), -Math.PI / 2)), curve)
  );
  //----------------------------------------------------------------< methods >
  function path(points: IVector[]) {
    let d = "M ";
    points.forEach((point) => {
      const { x, y } = sum(to, rotate(point, angle(sub(bezier, to))));
      d += `${x} ${y} `;
    });
    return d + "Z";
  }

  function p({ x, y }: IVector) {
    return `${x} ${y}`;
  }
  //-----------------------------------------------------------------< return >
  return (
    <g>
      <path
        d={path([
          { x: 0, y: 0 },
          { x: 12, y: -4 },
          { x: 12, y: 4 },
        ])}
        fill={`var(--${color})`}
        stroke={`var(--${color})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        strokeWidth="1"
        d={`M ${p(from)} Q ${p(bezier)} ${p(to)}`}
        stroke={`var(--${color})`}
        fill="transparent"
      />
    </g>
  );
}
