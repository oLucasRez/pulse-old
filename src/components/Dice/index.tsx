//-------------------------------------------------------------------< styles >
import "./styles.css";
//--------------------------------------------------------------------< types >
interface DiceProps {
  x: number;
  y: number;
  sides: number;
  currentValue: number;
  color: string;
}
//=================================================================[ < Dice > ]
export function Dice({ x, y, sides, currentValue, color }: DiceProps) {
  //-------------------------------------------------------------< properties >
  const size = 50;
  //----------------------------------------------------------------< methods >
  function getPoints() {
    const r = size / 2;
    const arc = (2 * Math.PI) / sides;
    let points = "";

    for (let i = 0; i < sides; i++) {
      const _x = Math.cos(i * arc) * r + x;
      const _y = Math.sin(i * arc) * r + y;

      points += `${_x},${_y} `;
    }

    return points.substr(0, points.length - 1);
  }
  //-----------------------------------------------------------------< return >
  return (
    <g className="dice-container">
      <polygon points={getPoints()} fill={`var(--${color})`} />
      <text x={x} y={y + size * 0.03} fontSize={size * 0.4} fill="var(--white)">
        {currentValue}
      </text>
    </g>
  );
}
