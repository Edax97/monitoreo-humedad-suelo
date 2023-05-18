import React, { useCallback, useEffect, useState } from "react";
import { SeriesVisType } from "../../state-provider/GraficasProvider";
import LeyendaComponent, { SeriesLegend } from "../leyenda/leyenda-component";
import { AccessorsType, AreaType, Grafica } from "./grafico-component";

interface Props {
  className?: string;
  seriesLegend: SeriesLegend[];
  dataVis: SeriesVisType[];
  areaList?: AreaType[];
  unidad: string;
  width: number;
  height: number;
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
      <div className="ps-5">
        <LeyendaComponent
          seriesLegend={seriesLegend}
          toggleSeries={toggleSeries}
        />
      </div>
      <div>
        <Grafica dataVis={dataVisM} {...graficoProps} />
      </div>
    </div>
  );
}
