import React from "react";
import { useDatosPlantAPI } from "../../api-state/useDatosPlantAPI";
import LoadingComponent from "../common/loading/LoadingComponent";
import ErrorMessageComponent from "../common/message/ErrorMessageComponent";
import DatosCampo from "./DatosCampo";

export default function DatosCampoContainer() {
  const { datosPlant, error, loading } = useDatosPlantAPI("863192058179509");

  if (loading || !datosPlant) return <LoadingComponent className="m-5" />;
  if (error)
    return (
      <ErrorMessageComponent
        className="my-4"
        message="Error al cargar la data"
      />
    );
  return <DatosCampo datosPlant={datosPlant} />;
}
