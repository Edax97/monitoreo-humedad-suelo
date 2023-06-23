import React from "react";
import { EquipoPlantType } from "../../api-state/useEquipoListAPI";
import ResponsiveContainer from "../common/table/ResponsiveContainer";

interface Props {
  equipoList: EquipoPlantType[];
}
export default function EquipoList(props: Props) {
  return (
    <ResponsiveContainer>
      <table className="table mx-auto" style={{ fontSize: "small" }}>
        <thead>
          <tr>
            <th className="px-3">Equipo</th>
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
                <button className="btn btn-outline-info btn-sm">
                  Datos de equipo
                </button>
              </td>
              <td className="px-3">
                <button className="btn btn-outline-info btn-sm">
                  Control de rangos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
