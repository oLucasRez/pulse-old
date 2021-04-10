//---------------------------------------------------------------< components >
import { Window } from "./components/Window";
//-----------------------------------------------------------------< contexts >
import { PlayersProvider } from "./cruds/Players.crud";
import { CrossingsProvider } from "./contexts/CrossingsContext";
import { PulsesProvider } from "./cruds/Pulses.crud";
import { DicesProvider } from "./cruds/Dices.crud";
import { NotesProvider } from "./cruds/Notes.crud";
//==================================================================[ < App > ]
function App() {
  //-----------------------------------------------------------------< return >
  return (
    <div className="App">
      <PlayersProvider>
        <CrossingsProvider>
          <PulsesProvider>
            <DicesProvider>
              <NotesProvider>
                <Window />
              </NotesProvider>
            </DicesProvider>
          </PulsesProvider>
        </CrossingsProvider>
      </PlayersProvider>
    </div>
  );
}

export default App;
