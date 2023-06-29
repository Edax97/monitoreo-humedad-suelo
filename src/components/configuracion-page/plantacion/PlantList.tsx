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
                  title="Datos de campo"
                  showComponent={(onShow) => (
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={onShow}
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
                  title="Parámetros de campo"
                  showComponent={(onShow) => (
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={onShow}
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
