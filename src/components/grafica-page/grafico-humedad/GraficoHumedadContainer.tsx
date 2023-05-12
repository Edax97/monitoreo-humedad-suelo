import React from "react";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ConfigComponent from "../../common/menu/configuracion/configuracion-component";
import { useGraficasContext } from "../../state-provider/GraficasProvider";
import GraficaSeries from "../grafico/grafica-series";
import GraficaSuma from "../grafico/grafica-suma";
import LeyendaSeries from "../leyenda/leyenda-series";
import LeyendaSuma from "../leyenda/leyenda-suma";
import TimeAxisContainer from "../time-axis/time-axis-container";

const graphBackColor = "rgba(230, 240, 230, 0.8)";
const legendColor = "rgba(230, 240, 230, 0.8)";
const lineColor = "rgba(100,100,100,0.3)";

export default function GraficoHumedadContainer() {
  const { getLoading, getError } = useGraficasContext();

  if (getLoading) return <LoadingComponent className="mt-5 pt-5" />;
  if (getError)
    return (
      <div className="alert alert-danger mt-5">Error al cargar la data.</div>
    );
  return (
    <>
      <div className="d-flex justify-content-end">
        <ConfigComponent />
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
          <LeyendaSeries />
        </div>
        <div
          style={{
            borderTopStyle: "solid",
            borderColor: lineColor,
            borderWidth: "1px",
            borderRadius: "0.4rem",
            backgroundColor: graphBackColor,
            height: "25vh",
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
            height: "25vh",
          }}
        >
          <GraficaSuma />
        </div>
        <div className="pt-2">
          <TimeAxisContainer />
        </div>
      </div>
    </>
  );
}
