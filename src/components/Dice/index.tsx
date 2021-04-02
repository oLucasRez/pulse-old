//---------------------------------------------------------------< components >
import { Text } from "../SVGComponents/Text";
//------------------------------------------------------------------< helpers >
import { zero } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< types >
import { IDice } from "../../types/IDice";
interface IProps {
  dice: IDice;
  size?: number;
  rotate?: number;
}
//=================================================================[ < Dice > ]
export function Dice({ dice, size = 50, rotate = 0 }: IProps) {
  //-------------------------------------------------------------< properties >
  const { x, y } = dice.origin ?? zero;
  //----------------------------------------------------------------< methods >
  function getPoints() {
    const r = size / 2;
    const arc = (2 * Math.PI) / dice.sides;
    const circle = (Math.PI * size) / 2;
    let points = "";

    for (let i = 0; i < dice.sides; i++) {
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
      <polygon points={getPoints()} fill={`var(--${dice.color})`} />
      <Text
        origin={{ x, y: y + size * 0.03 }}
        font="sansserif regular"
        size={size * 0.4}
        fill="white"
        justify="middle"
      >
        {dice.value}
      </Text>
    </g>
  );
}
