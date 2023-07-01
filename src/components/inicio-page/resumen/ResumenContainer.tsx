import React from "react";
import { useResumenAPI } from "../../../api-state/useResumenAPI";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import CardResumeDetails from "../../common/resumen/CardResumeDetails";
import { RiPlantFill as Plant } from "react-icons/ri";
import { useSedeContext } from "../../../state-provider/SedeProvider";

export default function ResumenContainer() {
  const { sedeSelected } = useSedeContext();

  const { resumen, error, loading } = useResumenAPI(sedeSelected?.id || "");

  if (loading || !resumen) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent
        className="my-5"
        message="Error al obtener los datos."
      />
    );
  return (
    <div className="row gy-4">
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Plantaciones"
          className="bg-success bg-opacity-50"
          counter={resumen.conteo_plantaciones}
          icon={<Plant />}
          to="/configuracion"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Módems"
          className="bg-info bg-opacity-50"
          counter={resumen.conteo_equipos}
          icon={<i className="bi bi-cpu"></i>}
          to="/configuracion"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Alertas"
          className="bg-danger bg-opacity-50"
          counter={resumen.conteo_alertas}
          icon={<i className="bi bi-exclamation-triangle"></i>}
          to="/alertas"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Dashboard"
          className=" bg-warning bg-opacity-50"
          icon={<i className="bi bi-graph-up"></i>}
          to="/"
        />
      </div>
    </div>
  );
}
