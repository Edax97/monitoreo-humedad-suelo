import LoadingComponent from "../../common/loading/LoadingComponent";
import ConfigComponent from "../../common/menu/configuracion/configuracion-component";
import { useGraficasContext } from "../../state-provider/GraficasProvider";
import GraficaSeries from "./grafica-series";
import GraficaSuma from "./grafica-suma";
import TimeAxisContainer from "../time-axis/time-axis-container";

export default function GraficoHumedadPage() {
  const { getLoading, getError } = useGraficasContext();

  if (getError)
    return (
      <div className="alert alert-danger mt-5">Error al cargar la data.</div>
    );
  return (
    <>
      <div className="d-flex justify-content-end">
        <ConfigComponent />
      </div>
      {getLoading ? (
        <LoadingComponent className="mt-5 pt-5" />
      ) : (
        <>
          <div className="mt-2 bg-secondary bg-opacity-25 card shadow px-lg-3">
            <GraficaSeries />
            <div className="pb-2"></div>
          </div>
          <div className="mt-3 bg-secondary bg-opacity-25 card shadow px-lg-3">
            <GraficaSuma />
            <TimeAxisContainer />
          </div>
        </>
      )}
    </>
  );
}
