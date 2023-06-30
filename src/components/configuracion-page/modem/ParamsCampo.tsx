import React, { FormEvent, useCallback, useEffect, useState } from "react";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import SuccessMessageComponent from "../../common/message/SuccessMessageComponent";
import FieldControl from "../../common/forms/FieldControl";
import { ParamsConfigType } from "../../../api/params-config-api";

interface FieldLabelsType {
  [key: string]: { label: string; um: string };
}

const fieldLabels: FieldLabelsType = {
  prof_raiz: { label: "Profundidad de raíz", um: "cm" },
  capacidad_campo: { label: "Capacidad de campo", um: "%" },
  pmp: { label: "Punto de marchitez permanente", um: "%" },
  densidad_ap: { label: "Densidad aparente", um: "" },
  const_agotamiento: { label: "Constante de agotamiento", um: "" },
};

interface Props {
  paramsConfig: ParamsConfigType;
  onSave: (params: ParamsConfigType) => any;
  saveLoading: boolean;
  saveSuccess: boolean;
  saveError: boolean;
}
export default function ParamsCampo(props: Props) {
  const [paramsConfig, setParamsConfig] = useState<ParamsConfigType | null>(
    null
  );

  useEffect(() => {
    setParamsConfig(props.paramsConfig);
  }, [props.paramsConfig]);

  const updateField = useCallback(
    (key: string, value: number) => {
      if (!paramsConfig) return null;
      setParamsConfig({ ...paramsConfig, [key]: `${value}` });
    },
    [paramsConfig]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!paramsConfig) return;
      props.onSave(paramsConfig);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onSave, paramsConfig]
  );

  if (!paramsConfig) return null;
  return (
    <form action="#" onSubmit={onSubmit}>
      {Object.keys(fieldLabels).map((key) => (
        <div className="mb-3" key={`input-${key}`}>
          <FieldControl
            label={fieldLabels[key].label}
            ud={fieldLabels[key].um}
            type="number"
            value={paramsConfig[key]}
            setValue={(v) => updateField(key, +v)}
            inputStyle={{ width: "7rem" }}
          />
        </div>
      ))}

      {props.saveError && (
        <div className="mt-4">
          <ErrorMessageComponent message="Error al actualizar parámetros." />
        </div>
      )}

      {props.saveSuccess && (
        <div className="mt-4">
          <SuccessMessageComponent message="Los parámetros han sido actualizados." />
        </div>
      )}

      <div className="pt-4 d-flex justify-content-center gap-3">
        <button
          className="btn btn-primary text-white"
          type="submit"
          disabled={props.saveLoading}
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
