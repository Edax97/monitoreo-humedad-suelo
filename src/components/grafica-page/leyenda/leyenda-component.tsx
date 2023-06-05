import React from "react";
import "./leyenda-component.scss";
import { GoDash as Dash } from "react-icons/go";

export interface SeriesLegend {
  label: string;
  color: string;
  profundidad: string;
}

interface Props {
  seriesLegend: SeriesLegend[];
  toggleSeries?: (prof: string) => void;
}

export default function LeyendaComponent(props: Props) {
  return props.seriesLegend.length > 0 ? (
    <div className="d-flex flex-wrap" style={{ fontSize: "small" }}>
      {props.seriesLegend.map((serie) => (
        <div
          key={serie.label}
          style={{ color: serie.color }}
          role="button"
          onClick={() =>
            props.toggleSeries ? props.toggleSeries(serie.profundidad) : null
          }
          className="d-flex align-items-center px-1"
        >
          <i className="fs-5 fw-bolder pb-1">
            <Dash />
          </i>
          <span>{serie.label}</span>
        </div>
      ))}
    </div>
  ) : null;
}
