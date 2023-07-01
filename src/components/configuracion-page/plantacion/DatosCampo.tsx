import { timeFormat } from "d3";
import React, {
  CSSProperties,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import DatePicker from "react-date-picker";
import { PlantConfigType } from "../../../api/plant-config-api";
import { intervaloDias } from "../../../api/utilities/date-utils";
import FieldControl from "../../common/forms/FieldControl";
import { InputControl } from "../../common/forms/InputControl";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import SuccessMessageComponent from "../../common/message/SuccessMessageComponent";
import "./datos-campo.scss";

const inputStyle: CSSProperties = { width: "11rem" };

interface Props {
  plantConfig: PlantConfigType;
  onSave: (plant: PlantConfigType) => any;
  saveLoading: boolean;
  saveSuccess: boolean;
  saveError: boolean;
}
export default function DatosCampo(props: Props) {
  const [plantConfig, setPlantConfig] = useState<PlantConfigType | null>(null);
  useEffect(() => {
    setPlantConfig(props.plantConfig);
  }, [props.plantConfig]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!plantConfig) return;
      props.onSave(plantConfig);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onSave, plantConfig]
  );

  const [lat, lon] = useMemo(() => {
    if (!plantConfig) return ["", ""];
    return plantConfig.coordenadas.split(",");
  }, [plantConfig]);

  const [inicio, edad] = useMemo(() => {
    if (!plantConfig) return [null, "0"];
    const inicio = new Date(plantConfig.fecha_inicio);
    const edad = (intervaloDias(inicio, new Date()) / 30).toFixed(1);
    setPlantConfig({ ...plantConfig, edad_cultivo: edad });
    return [inicio, edad];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantConfig?.fecha_inicio]);

  if (!plantConfig) return null;
  return (
    <form action="#" onSubmit={onSubmit}>
      <div className="">
        <FieldControl
          label="Empresa"
          ud=""
          type="text"
          value={plantConfig.campo_empresa}
          setValue={(v) => setPlantConfig({ ...plantConfig, campo_empresa: v })}
          inputStyle={inputStyle}
        />
      </div>
      <div className="mt-3">
        <FieldControl
          label="Cultivo"
          ud=""
          type="text"
          value={plantConfig.campo_cultivo}
          setValue={(v) => setPlantConfig({ ...plantConfig, campo_empresa: v })}
          inputStyle={inputStyle}
        />
      </div>
      <div className="mt-3">
        <FieldControl
          label="Variedad"
          ud=""
          type="text"
          value={plantConfig.campo_variedad}
          setValue={(v) =>
            setPlantConfig({ ...plantConfig, campo_variedad: v })
          }
          inputStyle={inputStyle}
        />
      </div>
      <div className="mt-3">
        <FieldControl
          label="Área"
          ud="Ha"
          type="number"
          value={plantConfig.campo_area}
          setValue={(v) => setPlantConfig({ ...plantConfig, campo_area: v })}
          inputStyle={inputStyle}
        />
      </div>
      <div className="mt-3">
        <FieldControl
          label="Sistema de riego"
          ud=""
          type="text"
          value={plantConfig.sistema_riego}
          setValue={(v) => setPlantConfig({ ...plantConfig, sistema_riego: v })}
          inputStyle={inputStyle}
        />
      </div>
      <div className="mt-3">
        <InputControl
          label="Fecha de inicio"
          ud=""
          inputStyle={inputStyle}
          render={(style) => (
            <DatePicker
              value={inicio}
              onChange={(v) =>
                setPlantConfig({
                  ...plantConfig,
                  fecha_inicio: timeFormat("%Y-%m-%d")(
                    new Date(v?.toString() || "")
                  ),
                })
              }
              clearIcon={null}
              locale="es-ES"
              maxDate={new Date()}
              className="text-dark text-opacity-75 select-date"
            />
          )}
        />
      </div>

      <div className="mt-3">
        <FieldControl
          label="Edad cultivo"
          ud=""
          type="text"
          value={`${edad} meses`}
          setValue={(v) => {}}
          inputStyle={inputStyle}
        />
      </div>

      <div className="mt-3">
        <div className="d-flex align-items-center flex-wrap gap-3 w-100">
          <div className="opacity-75">Coordenadas:</div>
          <div className="ms-auto d-flex align-items-center gap-2">
            <div className="text-secondary">Lat</div>
            <input
              type="number"
              className="form-control bg-light bg-opacity-25"
              style={{ width: "6rem" }}
              value={lat}
              onChange={(e) =>
                setPlantConfig({
                  ...plantConfig,
                  coordenadas: `${e.target.value},${lon}`,
                })
              }
              required
            />
            <div className="ms-2 text-secondary">Lon</div>
            <input
              type="number"
              className="form-control bg-light bg-opacity-25"
              style={{ width: "6rem" }}
              value={lon}
              onChange={(e) =>
                setPlantConfig({
                  ...plantConfig,
                  coordenadas: `${lat},${e.target.value}`,
                })
              }
              required
            />
          </div>
          <div style={{ width: "1.5rem" }} />
        </div>
      </div>

      {props.saveError && (
        <div className="mt-4">
          <ErrorMessageComponent message="Error al guardar." />
        </div>
      )}

      {props.saveSuccess && (
        <div className="mt-4">
          <SuccessMessageComponent message="Valores actualizados." />
        </div>
      )}

      <div className="mt-4 pt-2 d-flex justify-content-center gap-3">
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
