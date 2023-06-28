import React, { FormEvent, useCallback, useEffect, useState } from "react";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import SuccessMessageComponent from "../../common/message/SuccessMessageComponent";
import { PlantConfigType } from "../../../api/plantacion-configuracion-api";

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
  plantConfig: PlantConfigType;
  onSave: (plant: PlantConfigType) => any;
  saveLoading: boolean;
  saveSuccess: boolean;
  saveError: boolean;
}
export default function ParamsCampo(props: Props) {
  const [plantConfig, setPlantConfig] = useState<PlantConfigType | null>(null);

  useEffect(() => {
    setPlantConfig(props.plantConfig);
  }, [props.plantConfig]);

  const updateField = useCallback(
    (key: string, value: number) => {
      if (!plantConfig) return null;
      setPlantConfig({ ...plantConfig, [key]: `${value}` });
    },
    [plantConfig]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!plantConfig) return;
      props.onSave(plantConfig);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onSave]
  );

  if (!plantConfig) return null;
  return (
    <form action="#" onSubmit={onSubmit} style={{ width: "100%" }}>
      {Object.keys(fieldLabels).map((key) => (
        <div className="mb-3 d-flex align-items-center" key={`input-${key}`}>
          <div>{fieldLabels[key].label}</div>
          <input
            aria-label={fieldLabels[key].label}
            type="number"
            className="form-control ms-auto"
            style={{ width: "6rem" }}
            value={plantConfig[key]}
            onChange={(e) => updateField(key, +e.target.value)}
            required
          />
          <div className="ms-2 text-secondary" style={{ width: "2rem" }}>
            {fieldLabels[key].um}
          </div>
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
          className="btn btn-secondary"
          type="button"
          data-bs-dismiss="modal"
        >
          Cancelar
        </button>
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
