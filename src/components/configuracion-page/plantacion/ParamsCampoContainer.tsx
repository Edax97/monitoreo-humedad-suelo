import React from "react";
import { usePlantConfigAPI } from "../../../api-state/usePlantConfigAPI";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import ParamsCampo from "./ParamsCampo";

interface Props {
  plantId: string;
}
export default function ParamsCampoContainer(props: Props) {
  const { plantConfig, error, loading } = usePlantConfigAPI(props.plantId);

  if (!plantConfig || loading) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent className="my-5" message="Error al cargar data." />
    );
  return (
    <div>
      <ParamsCampo
        plantConfig={plantConfig}
        onSave={(plant) => console.log("Saving params campo", plant)}
        saveLoading={false}
        saveSuccess={false}
        saveError={false}
      />
    </div>
  );
}
