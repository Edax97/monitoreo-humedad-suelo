import React from "react";
import GraficaSeries from "../grafico/grafica-series";
import LeyendaSeries from "../leyenda/leyenda-series";
const graphBackColor = "rgba(230, 240, 230, 0.8)";
const legendColor = "rgba(230, 240, 230, 0.8)";
const lineColor = "rgba(100,100,100,0.3)";
export default function GraficoPHContainer() {
  return (
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
  );
}
