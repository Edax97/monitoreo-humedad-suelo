import React from "react";
import "./leyenda-component.scss";
import { GoDash } from "react-icons/go";

export interface SeriesLegend {
  label: string;
  color: string;
}

interface Props {
  infoText: string | null;
  series: SeriesLegend[];
}

export default function LeyendaComponent(props: Props) {
  return props.series.length > 0 ? (
    <div className="px-2 pb-1" style={{ fontSize: "small" }}>
      <div className="d-flex gap-3">
        {props.infoText && <div key="info">{props.infoText}</div>}
        {props.series.map((serie) => (
          <div key={serie.label} style={{ color: serie.color }}>
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
