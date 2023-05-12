import { ParentSize } from "@visx/responsive";
import React, { useMemo } from "react";
import {
  DatumSensor,
  useGraficasContext,
} from "../../state-provider/GraficasProvider";
import { AccessorsType, AreaType, Grafica } from "./grafico-component";

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
          { x: timeRange.startDate, y: 1.2 * 0 },
          { x: timeRange.endDate, y: 1.2 * 0 },
        ],
      },
      {
        label: " aprovechable",
        showLabel: false,
        color: "hsl(147, 68%, 91%)",
        data: [
          { x: timeRange.startDate, y: parametros.aprovechable },
          { x: timeRange.endDate, y: parametros.aprovechable },
        ],
      },
      {
        label: "raprovechable",
        showLabel: false,
        color: "hsl(0, 61%, 94%)",
        data: [
          { x: timeRange.startDate, y: parametros.raprovechable },
          { x: timeRange.endDate, y: parametros.raprovechable },
        ],
      },
    ];
  }, [timeRange, parametros]);

  if (!sumaVis) return null;
  return (
    <ParentSize>
      {({ width, height }) => (
        <Grafica
          width={width}
          height={height}
          dataVis={[sumaVis]}
          areaList={areaList}
          axisLabel="Lámina aprovechable (cm)"
          accessors={accessors}
        />
      )}
    </ParentSize>
  );
}
