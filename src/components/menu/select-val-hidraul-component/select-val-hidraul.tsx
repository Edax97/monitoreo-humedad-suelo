import React from "react";

interface Props {
  cc: number;
  updateCC: (cc: number) => any;
  pmp: number;
  updatePMP: (pmp: number) => any;
  select: () => any;
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
      <div className="dropdown-menu" aria-labelledby="dropdown-val">
        <form className="m-3">
          <div className="mb-2">
            <label htmlFor="input-cc" className="form-label">
              Capacidad de campo
            </label>
            <input
              id="input-cc"
              type="number"
              value={props.cc}
              onChange={(e) => props.updateCC(+e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="input-pmp" className="form-label">
              PMP
            </label>
            <input
              id="input-pmp"
              type="number"
              value={props.pmp}
              onChange={(e) => props.updatePMP(+e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-primary mt-2"
            onClick={props.select}
          >
            Definir valores
          </button>
        </form>
      </div>
    </div>
  );
}
