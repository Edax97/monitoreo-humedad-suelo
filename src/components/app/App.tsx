import React from "react";
import GraficaSeries from "../grafico/grafica-series-container/grafica-series";
import GraficaSumaContainer from "../grafico/grafica-suma-container/grafica-suma-container";
import LeyendaSeries from "../leyenda/leyenda-series-container/leyenda-series";
import LeyendaSumaContainer from "../leyenda/leyenda-suma-container/leyenda-suma-container";
import FiltradoSondaContainer from "../menu/filtrado-sonda-container/filtrado-sonda-container";
import SelectRangeContainer from "../menu/select-range/select-range-container/select-range-container";
import SelectValHidraulContainer from "../menu/select-val-hidraul-container/select-val-hidraul-container";
import { StateProvider } from "../state-provider/state-provider";
import TimeAxisContainer from "../time-axis/time-axis-container";
import "./App.scss";

const graphBackColor = "rgba(247, 255, 224, 0.8)";
const lineColor = "rgba(100,100,100,0.3)";

function App() {
  return (
    <StateProvider>
      <>
        <div className="app my-4 mx-5">
          <header>
            <div className="d-flex">
              <div className="ms-auto d-flex gap-3">
                <div>
                  <SelectRangeContainer />
                </div>
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
            <div
              className="mt-3"
              style={{
                borderStyle: "solid",
                borderColor: lineColor,
                borderWidth: "1px",
                borderRadius: "0.4rem",
              }}
            >
              <div>
                <LeyendaSeries />
              </div>
              <div
                style={{
                  borderTopStyle: "solid",
                  borderColor: lineColor,
                  borderWidth: "1px",
                  borderRadius: "0.4rem",
                  backgroundColor: graphBackColor,
                  height: "35vh",
                }}
              >
                <GraficaSeries />
              </div>
            </div>
            <div
              className="mt-2"
              style={{
                borderStyle: "solid",
                borderColor: lineColor,
                borderWidth: "1px",
                borderRadius: "0.4rem",
              }}
            >
              <div>
                <LeyendaSumaContainer />
              </div>
              <div
                style={{
                  borderTopStyle: "solid",
                  borderBottomStyle: "solid",
                  borderColor: lineColor,
                  borderWidth: "1px",
                  backgroundColor: graphBackColor,
                  height: "35vh",
                }}
              >
                <GraficaSumaContainer />
              </div>
              <div className="pt-2">
                <TimeAxisContainer />
              </div>
            </div>
          </main>
        </div>
      </>
    </StateProvider>
  );
}

export default App;
