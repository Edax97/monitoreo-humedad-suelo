import React from "react";
import { useModemConfigAPI } from "../../../api-state/useModemConfigAPI";
import { useRequestState } from "../../../api-state/useRequestState";
import {
  ModemConfigType,
  updateModemConfigAPI,
} from "../../../api/modem-config-api";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import DatosEquipo from "./DatosEquipo";

interface Props {
  modemId: string;
}
export default function DatosEquipoContainer(props: Props) {
  const { modemConfig, error, loading, mutate } = useModemConfigAPI(
    props.modemId
  );

  const { reqState: saveState, onRequest: onSave } = useRequestState(
    (modem: ModemConfigType) => {
      return updateModemConfigAPI(modem).then((m) => mutate(m));
    }
  );

  if (!modemConfig || loading) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent className="my-5" message="Error al cargar data." />
    );
  return (
    <DatosEquipo
      modemConfig={modemConfig}
      onSave={onSave}
      saveLoading={saveState.loading}
      saveError={saveState.error}
      saveSuccess={saveState.success}
    />
  );
}
