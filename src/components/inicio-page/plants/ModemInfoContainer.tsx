import React from "react";
import { useModemSensoresAPI } from "../../../api-state/useModemSensoresAPI";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import ModemInfo from "./ModemInfo";

interface Props {
  plantId: string;
  modemId: string;
}
export default function ModemInfoContainer(props: Props) {
  const { modem, error, loading } = useModemSensoresAPI(props.modemId);

  if (loading || !modem) return <LoadingComponent className="my-4" />;
  if (error)
    return (
      <ErrorMessageComponent
        className="my-4"
        message="Error al cargar data de modem."
      />
    );
  return (
    <ModemInfo
      sensorLista={modem.sensor_Lista}
      plantId={props.plantId}
      modemId={props.modemId}
    />
  );
}
