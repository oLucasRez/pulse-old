//------------------------------------------------------------------< helpers >
import {
  mod,
  sub,
  sum,
  avg,
  mult,
  norm,
  rotate,
  angle,
  quad,
} from "../helpers/Vector.helper";
//--------------------------------------------------------------------< types >
import { Arrow as Props } from "../types/Arrow.type";
import { Vector } from "../types/Vector.type";
//================================================================[ < Arrow > ]
export function Arrow({ from, to, color }: Props) {
  //-------------------------------------------------------------< properties >
  const { horizontal, vertical } = quad(to, from);
  const curve =
    ((horizontal === "left" ? 1 : -1) *
      (vertical === "top" ? 1 : -1) *
      mod(sub(from, to))) /
    3;
  const bezier = sum(
    avg(from, to),
    mult(norm(rotate(sub(from, to), -Math.PI / 2)), curve)
  );
  //----------------------------------------------------------------< methods >
  function path(points: Vector[]) {
    let d = "M ";
    points.forEach((point) => {
      const { x, y } = sum(to, rotate(point, angle(sub(bezier, to))));
      d += `${x} ${y} `;
    });
    return d;
  }

  function p({ x, y }: Vector) {
    return `${x} ${y}`;
  }
  //-----------------------------------------------------------------< return >
  console.log("arrow render");
  return (
    <g>
      <path
        d={path([
          { x: 7, y: -6 },
          { x: -7, y: 0 },
          { x: 7, y: 6 },
        ])}
        fill="transparent"
        stroke={`var(--${color})`}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={`M ${p(from)} Q ${p(bezier)} ${p(to)}`}
        stroke={`var(--${color})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="transparent"
      />
    </g>
  );
}
