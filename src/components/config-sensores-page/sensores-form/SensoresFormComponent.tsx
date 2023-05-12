import React, { FormEvent, useCallback } from "react";
import { DataSensorType } from "../../state-provider/SensoresProvider";

interface Props {
  onCancel: () => any;
  onSave: () => any;
  sensores: DataSensorType[];
  updateSensores: (codigo: number, prof: string) => any;
}
export default function SensoresFormComponent(props: Props) {
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.onSave();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onSave]
  );

  return (
    <form action="#" onSubmit={onSubmit}>
      {props.sensores.map((sensor) => (
        <>
          <div key={sensor.codigo} className="d-flex align-items-center">
            <span>{`Sensor N° ${sensor.codigo}`}</span>
            <span className="ms-3 opacity-50">{`Punto ID: ${sensor.idpunto}`}</span>
            <span className="ms-auto">Profundidad:</span>
            <input
              aria-label="Profundidad"
              type="number"
              className="form-control ms-3"
              style={{ width: "6rem" }}
              value={sensor.profundidad}
              onChange={(e) =>
                props.updateSensores(sensor.codigo, e.target.value)
              }
              required
            />
            <span className="ms-1 text-secondary">cm</span>
          </div>{" "}
          <hr className="mb-4 text-secondary opacity-50" />
        </>
      ))}
      <div className="mt-5 d-flex justify-content-center gap-3">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={props.onCancel}
        >
          Cancelar
        </button>
        <button className="btn btn-primary text-white" type="submit">
          Guardar
        </button>
      </div>
    </form>
  );
}
