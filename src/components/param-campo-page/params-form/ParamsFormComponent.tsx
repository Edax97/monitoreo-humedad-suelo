import React, { FormEvent, useCallback } from "react";
import { ParamsType } from "../../state-provider/param-provider";

export interface ParamsLabelsType {
  [key: string]: { label: string; um: string };
}

interface Props {
  params: ParamsType;
  paramsLabels: ParamsLabelsType;
  updateParams: (key: string, value: any) => any;
  onCancel: () => any;
  onSave: () => any;
}

export default function ParamsFormComponent(props: Props) {
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.onSave();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onSave]
  );

  return (
    <form action="#" onSubmit={onSubmit} style={{ width: "100%" }}>
      {Object.keys(props.paramsLabels).map((key) => (
        <div className="mb-3 d-flex align-items-center" key={`input-${key}`}>
          <div>{props.paramsLabels[key].label}</div>
          <input
            aria-label={props.paramsLabels[key].label}
            type="number"
            className="form-control ms-auto"
            style={{ width: "6rem" }}
            value={props.params[key]}
            onChange={(e) => props.updateParams(key, +e.target.value)}
            required
          />
          <div className="ms-2 text-secondary" style={{ width: "2rem" }}>
            {props.paramsLabels[key].um}
          </div>
        </div>
      ))}

      <div className="pt-5 d-flex justify-content-center gap-3">
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
