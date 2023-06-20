import React from "react";
import { usePlantListAPI } from "../../../api-state/usePlantListAPI";
import { useSedeContext } from "../../../state-provider/SedeProvider";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import PlantsMap from "./PlantsMap";

export default function PlantsContainer() {
  const { sedeSelected } = useSedeContext();

  const { plantList, error, loading } = usePlantListAPI(sedeSelected?.id || "");

  if (loading || !plantList) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent
        className="my-5"
        message="Error al cargar la data"
      />
    );
  return <PlantsMap plantList={plantList} />;
}
