import React, { useEffect } from "react";
import LoadingComponent from "../../common/loading/LoadingComponent";
import { useSensoresContext } from "../../state-provider/SensoresProvider";
import SensoresFormComponent from "./SensoresFormComponent";

export default function SensoresFormContainer() {
  const {
    getLoading,
    dataSensores,
    getSensores,
    cancelSensores,
    postSensores,
    updateSensores,
  } = useSensoresContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getSensores(), []);

  if (getLoading) return <LoadingComponent className="mt-5 pt-5" />;
  if (dataSensores.length === 0) return <div>ERROR</div>;
  return (
    <SensoresFormComponent
      sensores={dataSensores}
      onCancel={cancelSensores}
      onSave={postSensores}
      updateSensores={updateSensores}
    />
  );
}
