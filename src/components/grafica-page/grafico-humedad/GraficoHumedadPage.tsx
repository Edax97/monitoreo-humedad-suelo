import LoadingComponent from "../../common/loading/LoadingComponent";
import ConfigComponent from "../../common/menu/configuracion/configuracion-component";
import { useGraficasContext } from "../../state-provider/GraficasProvider";
import GraficaSeries from "./grafica-series";
import GraficaSuma from "./grafica-suma";
import TimeAxisContainer from "../time-axis/time-axis-container";

export default function GraficoHumedadPage() {
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
      <div className="mt-2 bg-primary bg-opacity-10 border border-secondary border-opacity-50 rounded">
        <GraficaSeries />
      </div>
      <div className="mt-3 bg-primary bg-opacity-10 border border-secondary border-opacity-50 rounded-top">
        <GraficaSuma />
      </div>
      <div className="pt-2 rounded-bottom border border-top-0 border-secondary border-opacity-50">
        <TimeAxisContainer />
      </div>
    </>
  );
}
