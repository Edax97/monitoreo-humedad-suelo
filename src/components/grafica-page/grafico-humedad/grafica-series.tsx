import React, { useMemo } from "react";
import {
  DatumSensor,
  useGraficasContext,
} from "../../../state-provider/GraficasProvider";
import GraficoLeyendaComponent from "../../common/grafico/GraficoLeyendaComponent";

export default function GraficaSeries() {
  const { dataVis, timeRange } = useGraficasContext();

  const accessors = useMemo(
    () => ({
      xAccessor: (d: DatumSensor) => d?.fecha,
      yAccessor: (d: DatumSensor) => d?.raprovechable,
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
      unidad="mm"
      title="Lámina de agua (mm)"
      accessors={accessors}
      timeDomain={[timeRange.startDate, timeRange.endDate]}
    />
  );
}
