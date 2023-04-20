import React from "react";
import FiltradoSondaContainer from "../menu/filtrado-sonda-container/filtrado-sonda-container";
import SelectValHidraulContainer from "../menu/select-val-hidraul-container/select-val-hidraul-container";
import { StateProvider } from "../state-provider/state-provider";
import "./App.scss";

function App() {
  return (
    <StateProvider>
      <>
        <div className="app m-4">
          <header>
            <div className="d-flex">
              <div className="ms-auto d-flex gap-3">
                <div>FILTRADO-FECHA</div>
                <div>
                  <FiltradoSondaContainer />
                </div>
                <div>
                  <SelectValHidraulContainer />
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="ms-3">
              <div>LEYENDA 1</div>
              <div>GRAFICO 1</div>
            </div>
            <div className="ms-3">
              <div>LEYENDA 2</div>
              <div>GRAFICO 2</div>
            </div>
          </main>
        </div>
      </>
    </StateProvider>
  );
}

export default App;
