import React from "react";
import { GoGear as Gear } from "react-icons/go";
import ParamCampoDialog from "../../../param-campo-page/ParamCampoDialog";
import ConfigSensoresDialog from "../../../config-sensores-page/ConfigSensoresDialog";
//import BtnIconComponent from "../../btn-icon/BtnIconComponent";

export default function ConfigComponent() {
  return (
    <div className="dropdown d-flex align-items-center">
      <button
        className="btn btn-sm text-primary opacity-75"
        id="dropdown-config"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        aria-label="configuración"
      >
        Configuración | <Gear />
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdown-config">
        <li>
          <button className="dropdown-item py-1">
            <ConfigSensoresDialog />
          </button>
        </li>
        <li>
          <button className="dropdown-item py-1">
            <ParamCampoDialog />
          </button>
        </li>
      </ul>
    </div>
  );
}
