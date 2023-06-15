import React from "react";
import ResponsiveContainer from "../../common/table/ResponsiveContainer";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";

export interface ReporteRowType {
  fecha: string;
  [sensor: string]: string;
}
interface Props {
  dataReporte: ReporteRowType[];
  headers: LabelKeyObject[];
}
export default function ReporteTable(props: Props) {
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
          {props.dataReporte.map((row, j) => (
            <tr key={j}>
              {props.headers.map((h, i) => (
                <td key={i} className="px-3">
                  {row[h.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
