import React from "react";
import LoadingComponent from "../../common/loading/LoadingComponent";
import { useGraficasContext } from "../../../state-provider/GraficasProvider";
import GraficoCard from "../../common/grafico/GraficoCard";
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
      <GraficoCard className="mt-3">
        <GraficoPHContainer />
        <TimeAxisContainer />
      </GraficoCard>
    </>
  );
}
