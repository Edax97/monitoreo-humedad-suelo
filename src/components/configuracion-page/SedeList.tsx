import React from "react";
import { SedeType } from "../../api/sede-list-api";
import ResponsiveContainer from "../common/table/ResponsiveContainer";

interface Props {
  sedeList: SedeType[];
}
export default function SedeList(props: Props) {
  return (
    <ResponsiveContainer>
      <table className="table mx-auto" style={{ fontSize: "small" }}>
        <thead>
          <tr>
            <th className="px-3">Sede</th>
            <th className="px-3">Datos de sede</th>
          </tr>
        </thead>
        <tbody className="text-dark text-opacity-75">
          {props.sedeList.map((plant, j) => (
            <tr key={j}>
              <td className="px-3">{plant.sedeName}</td>
              <td className="px-3">
                <button className="btn btn-outline-info btn-sm">
                  Datos de sede
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
