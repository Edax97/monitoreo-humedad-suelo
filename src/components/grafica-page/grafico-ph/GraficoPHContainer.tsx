import React, { useMemo } from "react";
import {
  DatumSensor,
  useGraficasContext,
} from "../../../state-provider/GraficasProvider";
import { AccessorsType } from "../../common/grafico/grafico-component";
import GraficoLeyendaComponent from "../../common/grafico/GraficoLeyendaComponent";

export default function GraficoPHContainer() {
  const { dataVis, timeRange } = useGraficasContext();

  const accessors = useMemo<AccessorsType>(
    () => ({
      xAccessor: (d: DatumSensor) => d?.fecha,
      yAccessor: (d: DatumSensor) => d?.pH,
    }),
    []
  );

  const seriesLegend = useMemo(() => {
    return dataVis
      .filter((s) => s.showSeries)
      .map((s) => ({
        color: s.color,
        label: `${s.profundidad} cm`,
        profundidad: s.profundidad,
      }));
  }, [dataVis]);

  if (dataVis.length === 0 || !timeRange) return null;
  return (
    <GraficoLeyendaComponent
      seriesLegend={seriesLegend}
      dataVis={dataVis}
      unidad=""
      title="PH"
      accessors={accessors}
      timeDomain={[timeRange.startDate, timeRange.endDate]}
    />
  );
}
