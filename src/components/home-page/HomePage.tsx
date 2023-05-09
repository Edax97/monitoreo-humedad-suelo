import React from "react";
import GraficaSeries from "./grafico/grafica-series";
import TimeAxisContainer from "./time-axis/time-axis-container";
import "./home-page.scss";
import TopBarComponent from "../common/top-bar/TopBarComponent";
import GraficaSuma from "./grafico/grafica-suma";
import LeyendaSeries from "./leyenda/leyenda-series";
import LeyendaSuma from "./leyenda/leyenda-suma";
import ConfigComponent from "../common/menu/configuracion/configuracion-component";
import SelectRangeContainer from "./select-range/SelectRangeContainer";

const graphBackColor = "rgba(230, 240, 230, 0.8)";
const legendColor = "rgba(230, 240, 230, 0.8)";
const lineColor = "rgba(100,100,100,0.3)";

export default function HomePage() {
  return (
    <div className="app">
      <header>
        <TopBarComponent statusText="Lámina de agua aprovechable">
          <div className="ms-auto d-flex gap-3">
            <ConfigComponent />
          </div>
        </TopBarComponent>
      </header>
      <main className="my-4">
        <div className="container-lg">
          <div className="pt-3">
            <SelectRangeContainer />
          </div>
          <div
            className="mt-5"
            style={{
              borderStyle: "solid",
              borderColor: lineColor,
              borderWidth: "1px",
              borderRadius: "0.4rem",
            }}
          >
            <div style={{ backgroundColor: legendColor }}>
              <LeyendaSeries />
            </div>
            <div
              style={{
                borderTopStyle: "solid",
                borderColor: lineColor,
                borderWidth: "1px",
                borderRadius: "0.4rem",
                backgroundColor: graphBackColor,
                height: "30vh",
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
            <div style={{ backgroundColor: legendColor }}>
              <LeyendaSuma />
            </div>
            <div
              style={{
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
                borderColor: lineColor,
                borderWidth: "1px",
                backgroundColor: graphBackColor,
                height: "30vh",
              }}
            >
              <GraficaSuma />
            </div>
            <div className="pt-2">
              <TimeAxisContainer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
