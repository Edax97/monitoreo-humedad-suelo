import React from "react";
import { useResumenAPI } from "../../../api-state/useResumenAPI";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import CardResumeDetails from "../../common/resumen/CardResumeDetails";
import { RiPlantFill as Plant } from "react-icons/ri";

export default function ResumenContainer() {
  const { resumen, error, loading } = useResumenAPI("1");

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
          titleCounter="Total de plantaciones"
          className="bg-success bg-opacity-50"
          counter={resumen.plant_total}
          icon={<Plant />}
          to="/configuracion"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Equipos"
          className="bg-info bg-opacity-50"
          counter={resumen.equipos_total}
          icon={<i className="bi bi-cpu"></i>}
          to="/configuracion"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Alertas"
          className="bg-danger bg-opacity-50"
          counter={resumen.alertas_total}
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
