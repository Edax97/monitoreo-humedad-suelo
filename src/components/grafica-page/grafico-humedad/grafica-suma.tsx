import { ParentSize } from "@visx/responsive";
import React, { useMemo } from "react";
import {
  DatumSensor,
  useGraficasContext,
} from "../../state-provider/GraficasProvider";
import GraficoLeyendaComponent from "../grafico/GraficoLeyendaComponent";
import { AccessorsType, AreaType } from "../grafico/grafico-component";

export default function GraficaSuma() {
  const { sumaVis, timeRange, parametros } = useGraficasContext();

  const accessors = useMemo<AccessorsType>(
    () => ({
      xAccessor: (d: DatumSensor) => d?.fecha,
      yAccessor: (d: DatumSensor) => d?.raprovechable,
    }),
    []
  );

  const areaList = useMemo<AreaType[]>(() => {
    if (!parametros || !timeRange) return [];
    return [
      {
        label: "rango-valores",
        showLabel: false,
        color: "#ffffff00",
        data: [
          { x: timeRange.startDate, y: 0 },
          { x: timeRange.endDate, y: 0 },
        ],
      },
      {
        label: " aprovechable",
        showLabel: false,
        color: "hsl(147, 68%, 88%)",
        data: [
          { x: timeRange.startDate, y: parametros.aprovechable },
          { x: timeRange.endDate, y: parametros.aprovechable },
        ],
      },
      {
        label: "raprovechable",
        showLabel: false,
        color: "hsl(0, 61%, 89%)",
        data: [
          { x: timeRange.startDate, y: parametros.raprovechable },
          { x: timeRange.endDate, y: parametros.raprovechable },
        ],
      },
    ];
  }, [timeRange, parametros]);

  const sumaLegend = useMemo(
    () => ({
      color: sumaVis?.color || "",
      label: `${sumaVis?.profundidad} cm`,
      profundidad: sumaVis?.profundidad || "",
    }),
    [sumaVis]
  );

  if (!sumaVis || !timeRange) return null;
  return (
    <ParentSize>
      {({ width, height }) => (
        <GraficoLeyendaComponent
          seriesLegend={[sumaLegend]}
          width={width}
          height={300}
          dataVis={[sumaVis]}
          areaList={areaList}
          unidad="mm"
          accessors={accessors}
          timeDomain={[timeRange.startDate, timeRange.endDate]}
        />
      )}
    </ParentSize>
  );
}
