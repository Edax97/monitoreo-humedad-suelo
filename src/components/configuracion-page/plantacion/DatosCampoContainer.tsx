import React from "react";
import { usePlantConfigAPI } from "../../../api-state/usePlantConfigAPI";
import { useRequestState } from "../../../api-state/useRequestState";
import { PlantConfigType } from "../../../api/plant-config-api";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import DatosCampo from "./DatosCampo";

interface Props {
  plantId: string;
}
export default function DatosCampoContainer(props: Props) {
  const { plantConfig, error, loading, mutate } = usePlantConfigAPI(
    props.plantId
  );

  const { reqState: saveState, onRequest: onSave } = useRequestState(
    async (plant: PlantConfigType) => {
      mutate(plant);
      return plant;
    }
  );

  if (!plantConfig || loading) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent className="my-5" message="Error al cargar data." />
    );
  return (
    <DatosCampo
      plantConfig={plantConfig}
      onSave={onSave}
      saveLoading={saveState.loading}
      saveError={saveState.error}
      saveSuccess={saveState.success}
    />
  );
}
