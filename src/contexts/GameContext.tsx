//--------------------------------------------------------------------< hooks >
import { useContext, useEffect, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
import { PlayersContext } from "./PlayersContext";
import { DicesContext } from "./DicesContext";
//--------------------------------------------------------------------< types >
import { IStep } from "../types/IStep";
import { IPlayer } from "../types/IPlayer";
import { ReactNode } from "react";
interface IData {
  clockwise: 1 | 0 | -1;
  step: IStep;
  currentPlayer: IPlayer;
  currentLightspotPlayer: IPlayer;
  overloads: {
    player: IPlayer;
    counter: number;
    isOverloaded: boolean;
  }[];
  nextStep: () => void;
  nextPlayer: () => void;
}
interface IProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const GameContext_old = createContext({} as IData);
//=========================================================[ < GameProvider > ]
export function GameProvider_old({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const { players } = useContext(PlayersContext);
  const { getDice } = useContext(DicesContext);
  //---------------------------------------------------------------------------
  const [clockwise, setClockwise] = useState<1 | 0 | -1>(1);
  const [step, setStep] = useState<IStep>("elements-creation");
  const [current, setCurrent] = useState(0);
  const [rounds, setRounds] = useState(1);
  const [_overloads, setOverloads] = useState<
    { counter: number; isOverloaded: boolean }[]
  >(
    players.map(() => {
      return { counter: 0, isOverloaded: false };
    })
  );
  //---------------------------------------------------------------------------
  const currentPlayer = players[current];
  const currentLightspotPlayer = players[rounds - 1];
  const overloads = players.map((player, index) => {
    return { player, ..._overloads[index] };
  });
  //----------------------------------------------------------------< methods >
  useEffect(() => {
    const currentDice = getDice(players[current].color);

    if (!currentDice) return;

    const __overloads = [..._overloads];

    __overloads[current].counter += currentDice.value ?? 0;

    if (__overloads[current].counter >= currentDice.value)
      __overloads[current] = { counter: 0, isOverloaded: true };

    setOverloads(__overloads);
  }, [current]);
  //---------------------------------------------------------------------------
  function nextStep() {
    switch (step) {
      case "elements-creation":
        // setStep("mainfact-creation");
        setStep("investigation");
        setClockwise(-1);
        break;
      case "mainfact-creation":
        setStep("investigation");
        setClockwise(1);
        break;
      case "investigation":
        setStep("conjectures");
        setClockwise(-1);
        setOverloads(
          _overloads.map((overload) => {
            return { ...overload, isOverloaded: false };
          })
        );
        break;
      case "conjectures":
        setStep("lightspot");
        setClockwise(0);
        break;
      case "lightspot":
        setStep("investigation");
        setClockwise(1);
        setRounds(rounds + 1);
        break;
      default:
        console.error("Passo não catalogado: " + step);
    }
  }

  function nextPlayer() {
    if (!((current + 1) % players.length)) nextStep();
    setCurrent((current + 1) % players.length);
  }
  //-----------------------------------------------------------------< return >
  console.log("game-provider rendered");
  return (
    <GameContext_old.Provider
      value={{
        clockwise,
        step,
        currentPlayer,
        currentLightspotPlayer,
        overloads,
        nextStep,
        nextPlayer,
      }}
    >
      {children}
    </GameContext_old.Provider>
  );
}
