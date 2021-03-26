//---------------------------------------------------------------< components >
import { Layer } from "../Layer";
import { Text } from "../SVGComponents/Text";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { PlayersContext } from "../../contexts/PlayersContext";
import { Dice } from "../Dice";
//================================================[ < PlayersDisplayerLayer > ]
export function PlayersDisplayerLayer() {
  //-------------------------------------------------------------< properties >
  const { players } = useContext(PlayersContext);
  //-----------------------------------------------------------------< return >
  console.log("players-displayer-layer render");
  return (
    <Layer>
      {players.map((player, index) => (
        <g key={index}>
          <Dice
            origin={{ x: 64, y: 48 * (index + 1) }}
            size={36}
            sides={player.dice}
            color={player.color}
            value={player.dice}
          />
          <Text
            origin={{ x: 96, y: 48 * (index + 1) }}
            size={24}
            font="Kalam 300"
            fill={player.color}
          >
            {player.object}
          </Text>
        </g>
      ))}
    </Layer>
  );
}
