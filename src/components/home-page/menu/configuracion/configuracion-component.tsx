import React from "react";
import { Link } from "react-router-dom";
import { GoGear as Gear } from "react-icons/go";

export default function ConfigComponent() {
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-primary"
        id="dropdown-config"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        Configuracion | <Gear />
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdown-config">
        <li>
          <Link className="dropdown-item py-1" to={"/datos-sonda"}>
            Configuración de sensores
          </Link>
        </li>
        <li>
          <Link className="dropdown-item py-1" to={"/param-campo"}>
            Parámetros de campo
          </Link>
        </li>
      </ul>
    </div>
  );
}
