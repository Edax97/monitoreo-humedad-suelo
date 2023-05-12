/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import LoadingComponent from "../../common/loading/LoadingComponent";
import { useParamsContext } from "../../state-provider/param-provider";
import ParamsFormComponent, { ParamsLabelsType } from "./ParamsFormComponent";

const paramsLabels: ParamsLabelsType = {
  profundidad: { label: "Profundidad de raíz", um: "cm" },
  cc: { label: "Capacidad de campo", um: "%" },
  pmp: { label: "Punto de marchitez permanente", um: "%" },
  dap: { label: "Densidad aparente", um: "" },
  agotamiento: { label: "Constante de agotamiento", um: "" },
};

export default function ParamsFormContainer() {
  const {
    updateParams,
    cancelParams,
    postParams,
    params,
    fetchParams,
    fetchLoading,
  } = useParamsContext();

  useEffect(() => fetchParams(), []);

  if (fetchLoading) return <LoadingComponent className="mt-5 pt-5 mb-5 pb-5" />;
  if (params === null)
    return (
      <div className="my-5 alert alert-danger">Error al cargar parámetros.</div>
    );
  return (
    <ParamsFormComponent
      params={params}
      paramsLabels={paramsLabels}
      updateParams={updateParams}
      onCancel={cancelParams}
      onSave={postParams}
    />
  );
}
