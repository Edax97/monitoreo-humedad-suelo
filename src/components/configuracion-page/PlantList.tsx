import React from "react";
import ResponsiveContainer from "../common/table/ResponsiveContainer";
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
                <button className="btn btn-outline-info btn-sm">
                  Datos de campo
                </button>
              </td>
              <td className="px-3">
                <button className="btn btn-outline-info btn-sm">
                  Parámetros de plantación
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
