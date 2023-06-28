import { AlertaAPIType } from "../../api/alertas-api";
import React from "react";
import ResponsiveContainer from "../common/table/ResponsiveContainer";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";
import Dialog from "../common/modal/Dialog";
import AlertaDetalle from "./AlertaDetalle";

interface Props {
  alertaLista: AlertaAPIType[];
  headers: LabelKeyObject[];
}

export default function AlertasTable(props: Props) {
  return (
    <ResponsiveContainer>
      <table className="table mx-auto" style={{ fontSize: "small" }}>
        <thead>
          <tr>
            <th className="px-3">Sensor</th>
            <th className="px-3">Modem</th>
            <th className="px-3">Plantación</th>
            <th className="px-3">Fecha</th>
            <th className="px-3">Motivo</th>
            <th className="px-3">Estado</th>
            <th className="px-3">Detalles</th>
          </tr>
        </thead>
        <tbody className="text-dark text-opacity-75">
          {props.alertaLista.map((alerta, j) => (
            <tr key={j}>
              <td className="px-3">{alerta.sensor_name}</td>
              <td className="px-3">{alerta.modem_name}</td>
              <td className="px-3">{alerta.plant_name}</td>
              <td className="px-3">{alerta.hora}</td>
              <td className="px-3">{alerta.motivo}</td>
              <td
                className={`px-3 ${
                  alerta.estado === "ACTIVO" ? "text-danger" : "text-primary"
                }`}
              >
                {alerta.estado}
              </td>
              <td className="px-3">
                <Dialog
                  modalId={`alerta_detalle_${j}`}
                  title={`Alerta ${alerta.motivo}`}
                  trigger={(id) => (
                    <button
                      type="button"
                      className="btn btn-outline-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={id}
                    >
                      Detalles
                    </button>
                  )}
                >
                  <div className="m-1">
                    <AlertaDetalle alerta={alerta} />
                  </div>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
