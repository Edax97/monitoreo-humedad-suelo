import React from "react";
import { NavLink } from "react-router-dom";
import { SensorType } from "../../../api/plant-list-api";

interface Props {
  sensorLista: SensorType[];
}
export default function EquipoInfo(props: Props) {
  return (
    <div className="p-2">
      {props.sensorLista.map((sensor) => (
        <div className="mt-3">
          <div className="fs-6 text-secondary">{sensor.sensor_nombre}</div>
          <div className="mt-2 d-flex align-items-center gap-2 flex-wrap">
            <div className="ms-2 d-flex align-items-center gap-1">
              <i className="fs-4 bi bi-thermometer-half text-secondary"></i>
              <span className="fs-6">{sensor.sensor_temperatura}°C</span>
            </div>
            <div className="ms-2 d-flex align-items-center gap-1">
              <i className="fs-4 bi bi-droplet-half text-secondary"></i>
              <span className="fs-6">{sensor.sensor_humedad}%</span>
            </div>
            <div className="ms-2 d-flex align-items-center gap-1">
              <span className="text-secondary">PH</span>
              <span className="fs-6">{sensor.sensor_ph}</span>
            </div>
            <div className="ms-2 d-flex align-items-center gap-1">
              <i className="fs-4 bi bi-battery-half text-secondary"></i>
              <span className="fs-6">{sensor.sensor_bateria}%</span>
            </div>
            {sensor.sensor_estado === "1" ? (
              <div className="ms-2 text-success">CONECTADO</div>
            ) : (
              <div className="ms-2 text-danger">DESCONECTADO</div>
            )}
          </div>
        </div>
      ))}
      <div className=" mt-3 d-flex justify-content-end">
        <NavLink to="/" className="btn btn-outline-primary btn-sm">
          Dashboard
        </NavLink>
      </div>
    </div>
  );
}
