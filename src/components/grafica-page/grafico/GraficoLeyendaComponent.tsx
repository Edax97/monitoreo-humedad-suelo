import React from "react";
import { SeriesVisType } from "../../state-provider/GraficasProvider";
import LeyendaComponent, { SeriesLegend } from "../leyenda/leyenda-component";
import { AccessorsType, AreaType, Grafica } from "./grafico-component";

interface Props {
  className?: string;
  infoText: string | null;
  seriesLegend: SeriesLegend[];
  dataVis: SeriesVisType[];
  areaList: AreaType[];
  unidad: string;
  width: number;
  height: number;
  axisLabel: string;
  accessors: AccessorsType;
}

export default function GraficoLeyendaComponent(props: Props) {
  const { className, infoText, seriesLegend, ...graficoProps } = props;

  return (
    <div className={` ${className}`}>
      <div className="ps-5">
        <LeyendaComponent infoText={infoText} seriesLegend={seriesLegend} />
      </div>
      <div>
        <Grafica {...graficoProps} />
      </div>
    </div>
  );
}
