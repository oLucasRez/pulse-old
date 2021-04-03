//------------------------------------------------------------------< classes >
import { InitialPositioningState } from "./states";
//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { PlayersContext } from "../../contexts/PlayersContext";
import { DicesContext } from "../../contexts/DicesContext";
import { PulsesContext } from "../../contexts/PulsesContext";
//--------------------------------------------------------------------< types >
import { IDice } from "../../types/IDice";
import { IState, IContext } from "./states";
import { NotesContext } from "../../contexts/NotesContext";
//===============================================================[ < Window > ]
export function Window() {
  //-------------------------------------------------------------< properties >
  const playersContext = useContext(PlayersContext);
  const dicesContext = useContext(DicesContext);
  const pulsesContext = useContext(PulsesContext);
  const notesContext = useContext(NotesContext);
  //---------------------------------------------------------------------------
  const [memoDice, setMemoDice] = useState<IDice>({} as IDice);
  const [state, setState] = useState<IState>(new InitialPositioningState());
  const [current, setCurrent] = useState(0);
  const currentPlayer = playersContext.players[current];
  //---------------------------------------------------------------------------
  const _this: IContext = {
    playersContext,
    dicesContext,
    pulsesContext,
    currentPlayer,
    notesContext,
    nextPlayer,
    setState,
    memoDice,
    setMemoDice,
  };
  //----------------------------------------------------------------< methods >
  function nextPlayer(clockwise: -1 | 1) {
    const next = current + clockwise;
    if (
      (next < 0 || next >= playersContext.players.length) &&
      state.handleStepFinish
    )
      state.handleStepFinish(_this);
    else setCurrent(next);
  }
  //-----------------------------------------------------------------< return >
  console.log("window rendered");
  return state.draw(_this);
}
