import React from "react";

interface Props {
  cc: number;
  updateCC: (cc: number) => any;
  pmp: number;
  updatePMP: (pmp: number) => any;
  select: () => any;
  cancel: () => any;
}

export function SelectValHidraul(props: Props) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        id="dropdown-val"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        Valores
      </button>
      <div
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="dropdown-val"
      >
        <form className="m-3" style={{ minWidth: "16rem" }}>
          <div className="d-flex gap-3 align-items-center mb-3">
            <label htmlFor="input-cc" className="m-0 lh-sm">
              Capacidad de campo
            </label>
            <div className="ms-auto" style={{ maxWidth: "5.5rem" }}>
              <input
                id="input-cc"
                type="number"
                className="form-control"
                value={props.cc}
                onChange={(e) => props.updateCC(+e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex gap-3 align-items-center mb-3">
            <label htmlFor="input-pmp" className="m-0 lh-sm">
              Punto de marchitez permanente
            </label>
            <div className="ms-auto" style={{ maxWidth: "5.5rem" }}>
              <input
                id="input-pmp"
                type="number"
                className="form-control"
                value={props.pmp}
                onChange={(e) => props.updatePMP(+e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2 d-flex justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={props.cancel}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={props.select}
            >
              Definir valores
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
