import { ParentSize } from "@visx/responsive";
import React, { useCallback, useEffect, useState } from "react";
import { SeriesVisType } from "../../state-provider/GraficasProvider";
import LeyendaComponent, { SeriesLegend } from "../leyenda/leyenda-component";
import { AccessorsType, AreaType, Grafica } from "./grafico-component";

export const graficoContainerStyle = { minWidth: 720 };

interface Props {
  className?: string;
  seriesLegend: SeriesLegend[];
  dataVis: SeriesVisType[];
  areaList?: AreaType[];
  unidad: string;
  title?: string;
  accessors: AccessorsType;
  timeDomain: [Date, Date];
}

export default function GraficoLeyendaComponent(props: Props) {
  const { className, seriesLegend, dataVis, ...graficoProps } = props;

  const [dataVisM, setDataVisM] = useState<SeriesVisType[]>([]);
  useEffect(() => {
    setDataVisM(dataVis);
  }, [dataVis]);

  const toggleSeries = useCallback(
    (prof: string) => {
      setDataVisM(
        dataVisM.map((series) => {
          if (series.profundidad === prof)
            return { ...series, showSeries: !series.showSeries };
          return series;
        })
      );
    },
    [setDataVisM, dataVisM]
  );

  return (
    <div className={` ${className}`}>
      <div className="ps-3 pt-2 pt-lg-3 d-flex gap-3 align-items-center">
        <div className="text-black-50" style={{ fontSize: "small" }}>
          {props.title}
        </div>
        <LeyendaComponent
          seriesLegend={seriesLegend}
          toggleSeries={toggleSeries}
        />
      </div>
      <ParentSize>
        {({ height, width }) => (
          <Grafica width={width} dataVis={dataVisM} {...graficoProps} />
        )}
      </ParentSize>
    </div>
  );
}
