import React from "react";
import Dialog from "../../common/modal/Dialog";
import ResponsiveContainer from "../../common/table/ResponsiveContainer";
import DatosCampoContainer from "./DatosCampoContainer";
import { PlantSedeType } from "./PlantListContainer";

interface Props {
  plantList: PlantSedeType[];
}
export default function PlantList(props: Props) {
  return (
    <ResponsiveContainer>
      <div className="px-lg-5">
        <table className="table" style={{ fontSize: "small" }}>
          <thead>
            <tr>
              <th className="px-3">Plantación</th>
              <th className="px-3">Sede</th>
              <th className="px-3">Datos de plantación</th>
            </tr>
          </thead>
          <tbody className="text-dark text-opacity-75">
            {props.plantList.map((plant, j) => (
              <tr key={j}>
                <td className="px-3">{plant.plant_nombre}</td>
                <td className="px-3">{plant.sede_nombre}</td>
                <td className="px-3">
                  <Dialog
                    title="Datos de plantación"
                    showComponent={(onShow) => (
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={onShow}
                      >
                        Datos de plantación
                      </button>
                    )}
                  >
                    <DatosCampoContainer plantId={`${plant.plant_id}`} />
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResponsiveContainer>
  );
}
