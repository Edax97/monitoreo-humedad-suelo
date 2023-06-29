import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { ModemConfigType } from "../../../api/modem-config-api";
import InputSm from "../../common/forms/InputSm";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import SuccessMessageComponent from "../../common/message/SuccessMessageComponent";

interface Props {
  modemConfig: ModemConfigType;
  onSave: (modem: ModemConfigType) => any;
  saveLoading: boolean;
  saveSuccess: boolean;
  saveError: boolean;
}
export default function ControlVar(props: Props) {
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

  const updateVar = useCallback(
    (key: string, sensor_id: string, v: string) => {
      if (!modemConfig) return;
      setModemConfig({
        ...modemConfig,
        sensores: modemConfig.sensores.map((s) => {
          if (s.sensor_id === sensor_id) return { ...s, [key]: v };
          return s;
        }),
      });
    },
    [modemConfig]
  );

  if (!modemConfig) return null;
  return (
    <form action="#" onSubmit={onSubmit}>
      {modemConfig.sensores.map((sensor, j) => (
        <div key={j}>
          <div className="fw-bold">Sensor {sensor.sensor_id}</div>
          <table className="table">
            <thead>
              <tr className="opacity-75">
                <td></td>
                <td>Mínimo</td>
                <td>Máximo</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura (°C)</td>
                <td>
                  <InputSm
                    value={sensor.temp_min}
                    onChange={(e) =>
                      updateVar("temp_min", sensor.sensor_id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <InputSm
                    value={sensor.temp_max}
                    onChange={(e) =>
                      updateVar("temp_max", sensor.sensor_id, e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Humedad (%)</td>
                <td>
                  <InputSm
                    value={sensor.hume_min}
                    onChange={(e) =>
                      updateVar("hume_min", sensor.sensor_id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <InputSm
                    value={sensor.hume_max}
                    onChange={(e) =>
                      updateVar("hume_max", sensor.sensor_id, e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>PH</td>
                <td>
                  <InputSm
                    value={sensor.ph_min}
                    onChange={(e) =>
                      updateVar("ph_min", sensor.sensor_id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <InputSm
                    value={sensor.ph_max}
                    onChange={(e) =>
                      updateVar("ph_max", sensor.sensor_id, e.target.value)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {j < modemConfig.sensores.length - 1 && <hr className="my-3" />}
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

/* 
<div className="mt-3">
            <FieldControl
              label="Temperatura Mínima"
              ud="°C"
              type="number"
              value={sensor.temp_min}
              setValue={(v) =>
                setModemConfig({
                  ...modemConfig,
                  sensores: modemConfig.sensores.map((s) => {
                    if (s.sensor_id === sensor.sensor_id)
                      return { ...s, temp_min: v };
                    return s;
                  }),
                })
              }
              inputStyle={inputStyle}
            />
          </div>
          <div className="mt-2">
            <FieldControl
              label="Temperatura Máxima"
              ud="°C"
              type="number"
              value={sensor.temp_max}
              setValue={(v) =>
                setModemConfig({
                  ...modemConfig,
                  sensores: modemConfig.sensores.map((s) => {
                    if (s.sensor_id === sensor.sensor_id)
                      return { ...s, temp_max: v };
                    return s;
                  }),
                })
              }
              inputStyle={inputStyle}
            />
          </div>
          <div className="mt-3">
            <FieldControl
              label="Humedad Mínima"
              ud="%"
              type="number"
              value={sensor.hume_min}
              setValue={(v) =>
                setModemConfig({
                  ...modemConfig,
                  sensores: modemConfig.sensores.map((s) => {
                    if (s.sensor_id === sensor.sensor_id)
                      return { ...s, hume_min: v };
                    return s;
                  }),
                })
              }
              inputStyle={inputStyle}
            />
          </div>
          <div className="mt-2">
            <FieldControl
              label="Humedad Máxima"
              ud="%"
              type="number"
              value={sensor.hume_max}
              setValue={(v) =>
                setModemConfig({
                  ...modemConfig,
                  sensores: modemConfig.sensores.map((s) => {
                    if (s.sensor_id === sensor.sensor_id)
                      return { ...s, hume_max: v };
                    return s;
                  }),
                })
              }
              inputStyle={inputStyle}
            />
          </div>
          <div className="mt-3">
            <FieldControl
              label="PH Mínimo"
              ud=""
              type="number"
              value={sensor.ph_min}
              setValue={(v) =>
                setModemConfig({
                  ...modemConfig,
                  sensores: modemConfig.sensores.map((s) => {
                    if (s.sensor_id === sensor.sensor_id)
                      return { ...s, ph_min: v };
                    return s;
                  }),
                })
              }
              inputStyle={inputStyle}
            />
          </div>
          <div className="mt-2">
            <FieldControl
              label="PH Máximo"
              ud=""
              type="number"
              value={sensor.ph_max}
              setValue={(v) =>
                setModemConfig({
                  ...modemConfig,
                  sensores: modemConfig.sensores.map((s) => {
                    if (s.sensor_id === sensor.sensor_id)
                      return { ...s, ph_max: v };
                    return s;
                  }),
                })
              }
              inputStyle={inputStyle}
            />
          </div>
*/
