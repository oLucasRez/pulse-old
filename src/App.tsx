//---------------------------------------------------------------< components >
import { Window } from "./components/Window";
//-----------------------------------------------------------------< contexts >
import { PulsesProvider } from "./contexts/PulsesContext";
//==================================================================[ < App > ]
function App() {
  //-----------------------------------------------------------------< return >
  return (
    <div className="App">
      <PulsesProvider>
        <Window />
      </PulsesProvider>
    </div>
  );
}

export default App;
