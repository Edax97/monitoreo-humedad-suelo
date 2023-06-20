import React, { useCallback, useEffect } from "react";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import { useGraficasContext } from "../../../state-provider/GraficasProvider";
import { useSensoresContext } from "../../../state-provider/SensoresProvider";
import SensoresFormComponent from "./SensoresFormComponent";

export default function SensoresFormContainer() {
  const {
    getLoading,
    dataSensores,
    getSensores,
    cancelSensores,
    postSensores,
    updateSensores,
    postLoading,
    postError,
    postSuccess,
  } = useSensoresContext();

  const { reloadData } = useGraficasContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getSensores(), []);

  const onSave = useCallback(() => {
    postSensores().then(() => {
      reloadData();
    });
  }, [postSensores, reloadData]);

  if (getLoading || !dataSensores)
    return <LoadingComponent className="mt-5 pt-5 mb-5 pb-5" />;
  if (dataSensores.length === 0)
    return (
      <div className="my-5">
        <ErrorMessageComponent message="Error al cargar la configuración." />
      </div>
    );
  return (
    <SensoresFormComponent
      sensores={dataSensores}
      onCancel={cancelSensores}
      onSave={onSave}
      updateSensores={updateSensores}
      saveLoading={postLoading}
      saveError={postError}
      saveSuccess={postSuccess}
    />
  );
}
