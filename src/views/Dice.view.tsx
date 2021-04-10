//---------------------------------------------------------------------< tags >
import { Text } from "../tags/Text.tag";
//------------------------------------------------------------------< helpers >
import { zero } from "../helpers/Vector.helper";
//--------------------------------------------------------------------< types >
import { Dice as DiceProps } from "../types/Dice.type";

interface Props extends DiceProps {
  size?: number;
  rotate?: number;
}
//=================================================================[ < Dice > ]
export function Dice({
  origin = zero,
  sides,
  color,
  value,
  size = 50,
  rotate = 0,
}: Props) {
  //-------------------------------------------------------------< properties >
  const { x, y } = origin;
  //----------------------------------------------------------------< methods >
  function points() {
    const r = size / 2;
    const arc = (2 * Math.PI) / sides;
    const circle = (Math.PI * size) / 2;
    let points = "";

    for (let i = 0; i < sides; i++) {
      const _x = Math.cos(i * arc - rotate / circle) * r + x;
      const _y = Math.sin(i * arc - rotate / circle) * r + y;

      points += `${_x},${_y} `;
    }

    return points.substr(0, points.length - 1);
  }
  //-----------------------------------------------------------------< return >
  console.log("dice render");
  return (
    <g className="dice-container">
      <polygon points={points()} fill={`var(--${color})`} />
      <Text
        origin={{ x, y: y + size * 0.03 }}
        font="sansserif regular"
        size={size * 0.4}
        fill="white"
        justify="middle"
      >
        {value}
      </Text>
    </g>
  );
}
