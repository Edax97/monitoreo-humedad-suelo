import { AlertaAPIType } from "../../api/alertas-api";
import React from "react";
import ResponsiveContainer from "../common/table/ResponsiveContainer";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";

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
            {props.headers.map((h) => (
              <th key={h.key} className="px-3">
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-dark text-opacity-75">
          {props.alertaLista.map((alerta, j) => (
            <tr key={j}>
              <td className="px-3">{alerta.equipo}</td>
              <td className="px-3">{alerta.campo}</td>
              <td className="px-3">{alerta.hora}</td>
              <td className="px-3">{alerta.ultimo_cambio}</td>
              <td className="px-3">{alerta.motivo}</td>
              <td
                className={`px-3 ${
                  alerta.estado === "ACTIVO" ? "text-danger" : "text-primary"
                }`}
              >
                {alerta.estado}
              </td>
              <td className="px-3">
                <button type="button" className="btn btn-outline-info btn-sm">
                  Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
