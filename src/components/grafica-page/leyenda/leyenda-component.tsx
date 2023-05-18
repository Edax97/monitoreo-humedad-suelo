import React from "react";
import "./leyenda-component.scss";
import { GoDash } from "react-icons/go";

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
    <div className="px-2 pt-1" style={{ fontSize: "small" }}>
      <div className="d-flex gap-3">
        {props.seriesLegend.map((serie) => (
          <div
            key={serie.label}
            style={{ color: serie.color }}
            role="button"
            onClick={() =>
              props.toggleSeries ? props.toggleSeries(serie.profundidad) : null
            }
          >
            <i className="fs-5 fw-bolder">
              <GoDash />
            </i>
            <span>{serie.label}</span>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
