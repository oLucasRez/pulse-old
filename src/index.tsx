import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { PlayersProvider } from "./contexts/PlayersContext";
import { PulsesProvider } from "./contexts/PulsesContext";
import { MagnetCursorProvider } from "./contexts/MagnetCursorContext";

import "./global.css";
import { CrossingsProvider } from "./contexts/CrossingsContext";

ReactDOM.render(
  <StrictMode>
    <PlayersProvider>
      <CrossingsProvider>
        <PulsesProvider>
          <MagnetCursorProvider>
            <App />
          </MagnetCursorProvider>
        </PulsesProvider>
      </CrossingsProvider>
    </PlayersProvider>
  </StrictMode>,
  document.getElementById("root")
);
