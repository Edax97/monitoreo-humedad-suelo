import React from "react";
import LoadingComponent from "../../common/loading/LoadingComponent";
import { useGraficasContext } from "../../state-provider/GraficasProvider";
import { graficoContainerStyle } from "../grafico/GraficoLeyendaComponent";
import TimeAxisContainer from "../time-axis/time-axis-container";
import GraficoPHContainer from "./GraficoPHContainer";

export default function GraficoPHPage() {
  const { getLoading, getError } = useGraficasContext();

  if (getLoading) return <LoadingComponent className="mt-5 pt-5" />;
  if (getError)
    return (
      <div className="alert alert-danger mt-5">Error al cargar la data.</div>
    );

  return (
    <>
      <div
        className="mt-3 bg-secondary bg-opacity-25 card shadow px-lg-3"
        style={graficoContainerStyle}
      >
        <GraficoPHContainer />
        <TimeAxisContainer />
      </div>
    </>
  );
}
