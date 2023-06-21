import React from "react";
import { NavLink } from "react-router-dom";
import { opcionesLista } from "./opciones-lista";
import "./sidebar-content.scss";

interface Props {
  onLogout: () => void;
  sidebarClosed?: boolean;
  isOffcanvas?: boolean;
}
export default function SidebarContent(props: Props) {
  return (
    <>
      {opcionesLista.map((link) => {
        if (!link) return null;
        return (
          <div
            className="px-3 py-3"
            key={link.label}
            data-bs-dismiss={props.isOffcanvas && "offcanvas"}
          >
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `link d-flex gap-3 align-items-center ${
                  isActive ? `active` : ``
                }`
              }
            >
              <div className="fs-4">{link.icon}</div>
              {!props.sidebarClosed && <span>{link.label}</span>}
            </NavLink>
          </div>
        );
      })}
      <div className="px-2 py-2 text-white">
        <hr />
      </div>
      <div className="px-3 py-3">
        <div
          className="d-flex gap-3 align-items-center link"
          role="button"
          onClick={props.onLogout}
        >
          <i className="bi bi-box-arrow-right fs-4"></i>
          {!props.sidebarClosed && <span>Salir</span>}
        </div>
      </div>
    </>
  );
}
