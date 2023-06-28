import React from "react";
import Dialog from "../../common/modal/Dialog";
import ResponsiveContainer from "../../common/table/ResponsiveContainer";
import ParamsCampoContainer from "./ParamsCampoContainer";
import { PlantSedeType } from "./PlantListContainer";

interface Props {
  plantList: PlantSedeType[];
}
export default function PlantList(props: Props) {
  return (
    <ResponsiveContainer>
      <table className="table mx-auto" style={{ fontSize: "small" }}>
        <thead>
          <tr>
            <th className="px-3">Plantación</th>
            <th className="px-3">Sede</th>
            <th className="px-3">Datos de campo</th>
            <th className="px-3">Parámetros de plantación</th>
          </tr>
        </thead>
        <tbody className="text-dark text-opacity-75">
          {props.plantList.map((plant, j) => (
            <tr key={j}>
              <td className="px-3">{plant.plant_nombre}</td>
              <td className="px-3">{plant.sede_nombre}</td>
              <td className="px-3">
                <Dialog
                  modalId={`datos-campo-${j}`}
                  title="Datos de campo"
                  trigger={(id) => (
                    <button
                      className="btn btn-outline-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={id}
                    >
                      Datos de campo
                    </button>
                  )}
                >
                  DATOS DE CAMPO FORM
                </Dialog>
              </td>
              <td className="px-3">
                <Dialog
                  modalId={`parmas-campo-${j}`}
                  title="Parámetros de campo"
                  trigger={(id) => (
                    <button
                      className="btn btn-outline-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={id}
                    >
                      Parámetros de campo
                    </button>
                  )}
                >
                  <ParamsCampoContainer plantId={`${plant.plant_id}`} />
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
