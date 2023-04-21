import React from "react";
import GraficaSeries from "../grafico/grafica-series-container/grafica-series";
import LeyendaSeries from "../leyenda/leyenda-series-container/leyenda-series";
import LeyendaSumaContainer from "../leyenda/leyenda-suma-container/leyenda-suma-container";
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
          <main className="mx-4">
            <div className="mt-3">
              <div>
                <LeyendaSeries />
              </div>
              <div>
                <GraficaSeries />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <LeyendaSumaContainer />
              </div>
              <div>GRAFICO 2</div>
            </div>
          </main>
        </div>
      </>
    </StateProvider>
  );
}

export default App;
