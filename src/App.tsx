//---------------------------------------------------------------< components >
import { Window } from "./components/Window";
//-----------------------------------------------------------------< contexts >
import { PlayersProvider } from "./contexts/PlayersContext";
import { CrossingsProvider } from "./contexts/CrossingsContext";
import { PulsesProvider } from "./contexts/PulsesContext";
import { DicesProvider } from "./contexts/DicesContext";
import { NotesProvider } from "./contexts/NotesContext";
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
