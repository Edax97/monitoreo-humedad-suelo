import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { ModemConfigType } from "../../../api/modem-config-api";
import FieldControl from "../../common/forms/FieldControl";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import SuccessMessageComponent from "../../common/message/SuccessMessageComponent";

interface Props {
  modemConfig: ModemConfigType;
  onSave: (modem: ModemConfigType) => any;
  saveLoading: boolean;
  saveSuccess: boolean;
  saveError: boolean;
}

export default function DatosEquipo(props: Props) {
  const [modemConfig, setModemConfig] = useState<ModemConfigType | null>(null);
  useEffect(() => {
    setModemConfig(props.modemConfig);
  }, [props.modemConfig]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!modemConfig) return;
      props.onSave(modemConfig);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onSave, modemConfig]
  );

  if (!modemConfig) return null;
  return (
    <form action="#" onSubmit={onSubmit}>
      <div className="">
        <FieldControl
          label="Nombre de Módem"
          ud=""
          type="text"
          value={modemConfig.modem_nombre}
          setValue={(v) => setModemConfig({ ...modemConfig, modem_nombre: v })}
          inputStyle={{ width: "11rem" }}
        />
      </div>
      <div className="mt-3">
        <FieldControl
          label="IMEI"
          ud=""
          type="text"
          value={modemConfig.modem_imei}
          setValue={(v) => setModemConfig({ ...modemConfig, modem_imei: v })}
          inputStyle={{ width: "11rem" }}
        />
      </div>
      {modemConfig.sensores.map((sensor, j) => (
        <div key={j}>
          <hr />
          <div className="mt-3">Sensor {sensor.sensor_id}</div>
          <div className="mt-2">
            <FieldControl
              label="Profundidad"
              ud="cm"
              type="number"
              value={sensor.sensor_prof}
              setValue={(v) =>
                setModemConfig({
                  ...modemConfig,
                  sensores: modemConfig.sensores.map((s) => {
                    if (s.sensor_id === sensor.sensor_id)
                      return { ...s, sensor_prof: v };
                    return s;
                  }),
                })
              }
              inputStyle={{ width: "11rem" }}
            />
          </div>
        </div>
      ))}

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
