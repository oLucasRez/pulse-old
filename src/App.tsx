//---------------------------------------------------------------< components >
import { Window } from "./components/Window";
//-----------------------------------------------------------------< contexts >
import { PlayersProvider } from "./contexts/PlayersContext";
import { CrossingsProvider } from "./contexts/CrossingsContext";
import { PulsesProvider } from "./contexts/PulsesContext";
import { MagnetCursorProvider } from "./contexts/MagnetCursorContext";
import { DicesProvider } from "./contexts/DicesContext";
import { GameProvider } from "./contexts/GameContext";
//==================================================================[ < App > ]
function App() {
  //-----------------------------------------------------------------< return >
  return (
    <div className="App">
      <PlayersProvider>
        <CrossingsProvider>
          <PulsesProvider>
            <MagnetCursorProvider>
              <DicesProvider>
                <GameProvider>
                  <Window />
                </GameProvider>
              </DicesProvider>
            </MagnetCursorProvider>
          </PulsesProvider>
        </CrossingsProvider>
      </PlayersProvider>
    </div>
  );
}

export default App;
