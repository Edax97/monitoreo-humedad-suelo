import { ParentSize } from "@visx/responsive";
import React, { useMemo } from "react";
import {
  DatumSensor,
  useGraficasContext,
} from "../../state-provider/GraficasProvider";
import { AccessorsType } from "../grafico/grafico-component";
import GraficoLeyendaComponent from "../grafico/GraficoLeyendaComponent";

export default function GraficoTemperaturaContainer() {
  const { dataVis, timeRange } = useGraficasContext();

  const accessors = useMemo<AccessorsType>(
    () => ({
      xAccessor: (d: DatumSensor) => d?.fecha,
      yAccessor: (d: DatumSensor) => d?.Temperatura,
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
    <ParentSize>
      {({ width, height }) => (
        <GraficoLeyendaComponent
          seriesLegend={seriesLegend}
          width={width}
          height={350}
          dataVis={dataVis}
          unidad="°C"
          accessors={accessors}
          timeDomain={[timeRange.startDate, timeRange.endDate]}
        />
      )}
    </ParentSize>
  );
}
