import React from "react";
import { Link } from "react-router-dom";
import { GoGear as Gear } from "react-icons/go";
import BtnIconComponent from "../../btn-icon/BtnIconComponent";

export default function ConfigComponent() {
  return (
    <div className="dropdown d-flex align-items-center">
      <BtnIconComponent
        iconClassName="fs-5 text-white"
        id="dropdown-config"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        aria-label="configuración"
      >
        <Gear />
      </BtnIconComponent>
      <ul className="dropdown-menu" aria-labelledby="dropdown-config">
        <li>
          <Link className="dropdown-item py-1" to={"/config-sensores"}>
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
