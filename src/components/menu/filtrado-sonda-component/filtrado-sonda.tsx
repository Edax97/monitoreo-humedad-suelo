import React from "react";
import { SondaType } from "../../state-provider/state-provider";

interface Props {
  sondas: SondaType[];
  toggleSonda: (level: number) => any;
}

export function FiltradoSonda(props: Props) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        type="button"
        id="dropdown-sondas"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        Sondas
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdown-sondas">
        {props.sondas.map((sonda) => (
          <li>
            <button
              className="dropdown-item d-inline"
              onClick={() => props.toggleSonda(sonda.level)}
            >
              <input className="me-3" type="checkbox" checked={sonda.show} />
              {sonda.level} cm
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
