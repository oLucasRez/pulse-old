//---------------------------------------------------------------< components >
import { Dice } from "../Dice";
//------------------------------------------------------------------< helpers >
import { zero, mod, sum, flip, mult } from "../../helpers/vectorHelper";
import { outOfBounds } from "./helpers";
//--------------------------------------------------------------------< hooks >
import { useState, useMemo, useEffect } from "react";
//--------------------------------------------------------------------< types >
import { IDice } from "../../types/IDice";
import { IVector } from "../../types/IVector";
interface IProps {
  dice: IDice;
  force: IVector;
  size?: number;
  overloadable?: boolean;
  onStop: (dice: IDice) => void;
}
//-------------------------------------------------------------------< global >
const friction = 0.95;
//==========================================================[ < DynamicDice > ]
export function DynamicDice({ dice, force, size = 50, onStop }: IProps) {
  //-------------------------------------------------------------< properties >
  const { origin = zero } = dice;
  //---------------------------------------------------------------------------
  const [offset, setOffset] = useState<IVector>(zero);
  const [velocity, setVelocity] = useState<IVector>(force);
  const [spin, setSpin] = useState(0);
  const [spinVelocity, setSpinVelocity] = useState(0);
  //---------------------------------------------------------------------------
  const random = useMemo(
    () =>
      !dice.value ? Math.floor(Math.random() * dice.sides + 1) : dice.value,
    [offset]
  );
  //----------------------------------------------------------------< methods >
  useEffect(() => {
    if (stopCondition()) return;

    const interval = setInterval(() => updateInstant(), 1000 / 24);

    return () => clearInterval(interval);
  }, [offset]);
  //---------------------------------------------------------------------------
  function stopCondition() {
    if (mod(velocity) <= 1) {
      const absOrigin = sum(origin, offset);
      onStop({ ...dice, origin: absOrigin, value: random });
      return true;
    }

    return false;
  }
  //---------------------------------------------------------------------------
  function updateInstant() {
    const absPosition = sum(sum(origin, offset), velocity);
    const outOf = outOfBounds(absPosition, size);

    let _velocity = velocity;

    if (outOf.horizontal) {
      if (outOf.left) setSpinVelocity(spinVelocity - _velocity.y);
      if (outOf.right) setSpinVelocity(spinVelocity + _velocity.y);

      _velocity = flip(velocity, "vertically");
    }
    if (outOf.vertical) {
      if (outOf.top) setSpinVelocity(spinVelocity + _velocity.x);
      if (outOf.bottom) setSpinVelocity(spinVelocity - _velocity.x);

      _velocity = flip(velocity, "horizontally");
    }

    setVelocity(mult(_velocity, friction));
    setOffset(sum(offset, _velocity));
    setSpin((spin + spinVelocity) * friction);
  }
  //-----------------------------------------------------------------< return >
  console.log("dynamic-dice render");
  return (
    <Dice
      dice={{ ...dice, origin: sum(origin, offset), value: random }}
      rotate={spin}
    />
  );
}
