import React from "react";
import { ModemPlantType } from "../../../api-state/useModemList";
import Dialog from "../../common/modal/Dialog";
import ResponsiveContainer from "../../common/table/ResponsiveContainer";

interface Props {
  equipoList: ModemPlantType[];
}
export default function EquipoList(props: Props) {
  return (
    <ResponsiveContainer>
      <table className="table mx-auto" style={{ fontSize: "small" }}>
        <thead>
          <tr>
            <th className="px-3">Módem</th>
            <th className="px-3">Plantación</th>
            <th className="px-3">Datos de equipo</th>
            <th className="px-3">Control de rangos</th>
          </tr>
        </thead>
        <tbody className="text-dark text-opacity-75">
          {props.equipoList.map((equipo, j) => (
            <tr key={j}>
              <td className="px-3">{equipo.modem_nombrepunto}</td>
              <td className="px-3">{equipo.plant_nombre}</td>
              <td className="px-3">
                <Dialog
                  modalId="equipo_datos"
                  title="Datos de equipo"
                  trigger={(id) => (
                    <button
                      className="btn btn-outline-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={id}
                    >
                      Datos de equipo
                    </button>
                  )}
                >
                  EQUIPO FORM
                </Dialog>
              </td>
              <td className="px-3">
                <Dialog
                  modalId="equipo_control"
                  title="Control de rangos"
                  trigger={(id) => (
                    <button
                      className="btn btn-outline-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={id}
                    >
                      Control de rangos
                    </button>
                  )}
                >
                  CONTROL DE RANGO FORM
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
