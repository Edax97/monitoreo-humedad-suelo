import React from "react";
import { useParamsConfigAPI } from "../../../api-state/useParamsConfigAPI";
import { useRequestState } from "../../../api-state/useRequestState";
import {
  ParamsConfigType,
  updateParamsConfigAPI,
} from "../../../api/params-config-api";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import ParamsCampo from "./ParamsCampo";

interface Props {
  modemId: string;
}
export default function ParamsCampoContainer(props: Props) {
  const { paramsConfig, error, loading, mutate } = useParamsConfigAPI(
    props.modemId
  );

  const { reqState: saveState, onRequest: onSave } = useRequestState(
    (params: ParamsConfigType) => {
      return updateParamsConfigAPI(params, props.modemId).then((par) =>
        mutate(par)
      );
    }
  );

  if (!paramsConfig || loading) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent className="my-5" message="Error al cargar data." />
    );
  return (
    <div>
      <ParamsCampo
        paramsConfig={paramsConfig}
        onSave={onSave}
        saveLoading={saveState.loading}
        saveSuccess={saveState.success}
        saveError={saveState.error}
      />
    </div>
  );
}
