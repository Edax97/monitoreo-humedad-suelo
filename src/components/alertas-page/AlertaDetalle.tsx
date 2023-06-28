import React, { CSSProperties } from "react";
import { AlertaAPIType } from "../../api/alertas-api";

const itemStyle: CSSProperties = { width: "8rem" };
const labelClass = "text-secondary";

interface Props {
  alerta: AlertaAPIType;
}
export default function AlertaDetalle(props: Props) {
  return (
    <>
      <div className="d-flex gap-3 flex-wrap">
        <div style={itemStyle}>
          <div className={labelClass}>Sensor</div>
          <div>{props.alerta.sensor_name}</div>
        </div>
        <div style={itemStyle}>
          <div className={labelClass}>Módem</div>
          <div>{props.alerta.modem_name}</div>
        </div>
        <div style={itemStyle}>
          <div className={labelClass}>Plantación</div>
          <div>{props.alerta.plant_name}</div>
        </div>
        <div style={itemStyle}>
          <div className={labelClass}>Fecha</div>
          <div>{props.alerta.hora}</div>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <div
            className={`d-flex align-items-center gap-1 ${
              !!props.alerta.motivo.match(/[Tt]emp/) ? "text-danger" : ""
            }`}
          >
            <i className="fs-4 bi bi-thermometer-half opacity-75"></i>
            <span className="fs-6">{props.alerta.temp}°C</span>
          </div>
          <div
            className={`d-flex align-items-center gap-1 ${
              !!props.alerta.motivo.match(/[Hh]ume/) ? "text-danger" : ""
            }`}
          >
            <i className="fs-4 bi bi-droplet-half opacity-75"></i>
            <span className="fs-6">{props.alerta.hume}%</span>
          </div>
          <div
            className={`d-flex align-items-center gap-1 ${
              !!props.alerta.motivo.match(/[Pp][hH]/) ? "text-danger" : ""
            }`}
          >
            <span className="opacity-75" style={{ fontSize: "small" }}>
              PH
            </span>
            <span className="fs-6">{props.alerta.ph}</span>
          </div>
        </div>
      </div>
    </>
  );
}