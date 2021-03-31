//---------------------------------------------------------------< components >
import { Text } from "../SVGComponents/Text";
//------------------------------------------------------------------< helpers >
import { zero, sum, mod, flip, mult } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< hooks >
import { useState, useEffect, useContext, useMemo } from "react";
//-----------------------------------------------------------------< contexts >
import { DicesContext } from "../../contexts/DicesContext";
//--------------------------------------------------------------------< types >
import { IDice } from "../../types/IDice";
import { IVector } from "../../types/IVector";
import { PlayersContext } from "../../contexts/PlayersContext";
import { GameContext } from "../../contexts/GameContext";
interface IProps {
  dice: IDice;
  force?: IVector;
  size?: number;
  overloadable?: boolean;
}
//-------------------------------------------------------------------< global >
const friction = 0.95;
//=================================================================[ < Dice > ]
export function Dice({ dice, force, size = 50, overloadable }: IProps) {
  //-------------------------------------------------------------< properties >
  const { x, y } = dice.origin ?? zero;
  //---------------------------------------------------------------------------
  const { currentPlayer, nextPlayer } = useContext(GameContext);
  const { updateDice, onRolled } = useContext(DicesContext);
  //---------------------------------------------------------------------------
  const [offset, setOffset] = useState<IVector>(zero);
  const [velocity, setVelocity] = useState<IVector>(force ?? zero);
  const [spin, setSpin] = useState(0);
  const [spinVelocity, setSpinVelocity] = useState(0);
  //---------------------------------------------------------------------------
  const random = useMemo(
    () =>
      !dice.value ? Math.floor(Math.random() * dice.sides + 1) : dice.value,
    [offset]
  );
  const vector = sum(sum(dice.origin ?? zero, offset), velocity);
  const outOf = {
    left: vector.x < size / 2,
    right: vector.x >= window.innerWidth - size / 2,
    top: vector.y < size / 2,
    bottom: vector.y >= window.innerHeight - size / 2,
  };
  //----------------------------------------------------------------< methods >
  useEffect(() => {
    if (mod(velocity) <= 1) {
      if (overloadable) {
        onRolled();
        updateDice(currentPlayer.color, {
          value: random,
          origin: sum({ x, y }, offset),
        });
      }
      return;
    }

    const interval = setInterval(() => {
      let _velocity = velocity;

      if (outOf.left || outOf.right) {
        if (outOf.left) setSpinVelocity(spinVelocity - _velocity.y);
        if (outOf.right) setSpinVelocity(spinVelocity + _velocity.y);
        _velocity = flip(velocity, "vertically");
      }
      if (outOf.top || outOf.bottom) {
        if (outOf.top) setSpinVelocity(spinVelocity + _velocity.x);
        if (outOf.bottom) setSpinVelocity(spinVelocity - _velocity.x);
        _velocity = flip(velocity, "horizontally");
      }

      setVelocity(mult(_velocity, friction));
      setOffset(sum(offset, _velocity));
      setSpin((spin + spinVelocity) * friction);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, [offset]);
  //---------------------------------------------------------------------------
  function getPoints() {
    const r = size / 2;
    const arc = (2 * Math.PI) / dice.sides;
    const circle = (Math.PI * size) / 2;
    let points = "";

    for (let i = 0; i < dice.sides; i++) {
      const _x = Math.cos(i * arc - spin / circle) * r + x + offset.x;
      const _y = Math.sin(i * arc - spin / circle) * r + y + offset.y;

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
        origin={sum({ x, y: y + size * 0.03 }, offset)}
        font="Rubik 500"
        size={size * 0.4}
        fill="white"
        justify="middle"
      >
        {random}
      </Text>
    </g>
  );
}
