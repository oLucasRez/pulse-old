//---------------------------------------------------------------< interfaces >
import { WindowState, WindowContext } from "../interfaces/Window";
//--------------------------------------------------------------------< cruds >
import { Players as PlayersCRUD } from "../cruds/Players.crud";
//-------------------------------------------------------------------< states >
import { Setup } from "../states/Window/Setup.state";
//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//===============================================================[ < Window > ]
export function Window() {
  //-------------------------------------------------------------< properties >
  const { players } = useContext(PlayersCRUD);
  //---------------------------------------------------------------------------
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState<WindowState>(new Setup());
  //---------------------------------------------------------------------------
  const currentPlayer = players[current];
  const _this: WindowContext = { currentPlayer, nextPlayer, setState };
  //----------------------------------------------------------------< methods >
  function nextPlayer(clockwise: -1 | 1) {
    const next = current + clockwise;

    if (next < 0 || next >= players.length) state.nextStep(_this);
    else setCurrent(next);
  }
  //-----------------------------------------------------------------< return >
  console.log("window rendered");
  return state.draw(_this);
}
