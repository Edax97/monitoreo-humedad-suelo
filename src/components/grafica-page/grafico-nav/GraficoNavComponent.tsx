import React from "react";
import { NavLink } from "react-router-dom";

export default function GraficoNavComponent() {
  return (
    <div className="d-flex gap-2 align-items-center flex-wrap">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `btn btn-sm ${
            isActive ? "btn-primary text-white" : "btn-outline-primary"
          }`
        }
      >
        Humedad
      </NavLink>
      <NavLink
        to="/grafico-temperatura"
        className={({ isActive }) =>
          `btn btn-sm ${
            isActive ? "btn-primary text-white" : "btn-outline-primary"
          }`
        }
      >
        Temperatura
      </NavLink>
      <NavLink
        to="/grafico-ph"
        className={({ isActive }) =>
          `btn btn-sm ${
            isActive ? "btn-primary text-white" : "btn-outline-primary"
          }`
        }
      >
        PH
      </NavLink>
      <NavLink
        to="#"
        className={({ isActive }) => `btn btn-sm btn-outline-secondary`}
      >
        Nitrogen
      </NavLink>
      <NavLink
        to="#"
        className={({ isActive }) => `btn btn-sm btn-outline-secondary`}
      >
        Phosphorus
      </NavLink>
      <NavLink
        to="#"
        className={({ isActive }) => `btn btn-sm btn-outline-secondary`}
      >
        Potasium
      </NavLink>
      <NavLink
        to="#"
        className={({ isActive }) => `btn btn-sm btn-outline-secondary`}
      >
        Conductivity
      </NavLink>
    </div>
  );
}
