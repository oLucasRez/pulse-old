//---------------------------------------------------------------< components >
import { Layer } from "../Layer";
import { Text } from "../SVGComponents/Text";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { PlayersContext } from "../../contexts/PlayersContext";
import { Dice } from "../Dice";
import { DicesContext } from "../../contexts/DicesContext";
//================================================[ < PlayersDisplayerLayer > ]
export function PlayersDisplayerLayer() {
  //-------------------------------------------------------------< properties >
  const { players } = useContext(PlayersContext);
  const { dices, getDiceByPlayer } = useContext(DicesContext);
  //-----------------------------------------------------------------< return >
  console.log("players-displayer-layer render");
  return (
    <Layer>
      {players.map((player, index) => {
        const dice = getDiceByPlayer(player);
        return (
          dice && (
            <g key={index}>
              <Dice
                // origin={{ x: 64, y: 48 * (index + 1) }}
                dice={{
                  ...dice,
                  origin: { x: 64, y: 48 * (index + 1) },
                  value: dice.sides,
                }}
                size={36}
                // sides={player.dice}
                // color={player.color}
                // value={player.dice}
              />
              <Text
                origin={{ x: 96, y: 48 * (index + 1) }}
                size={24}
                font="Kalam 300"
                fill={dice.color}
              >
                {player.object}
              </Text>
            </g>
          )
        );
      })}
      {dices.map(
        (dice, index) => dice.value && <Dice key={index} dice={dice} />
      )}
    </Layer>
  );
}
