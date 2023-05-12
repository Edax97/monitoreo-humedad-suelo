import { ParentSize } from "@visx/responsive";
import React, { useMemo } from "react";
import {
  DatumSensor,
  useGraficasContext,
} from "../../state-provider/GraficasProvider";
import { AreaType, Grafica } from "./grafico-component";

export default function GraficaSeries() {
  const { dataVis, timeRange } = useGraficasContext();

  const accessors = useMemo(
    () => ({
      xAccessor: (d: DatumSensor) => d?.fecha,
      yAccessor: (d: DatumSensor) => d?.raprovechable,
    }),
    []
  );

  const areaList = useMemo<AreaType[]>(
    () => [
      {
        label: "dominio-tiempo",
        showLabel: false,
        color: "#ffffff00",
        data: [
          { x: timeRange?.startDate, y: 0 },
          { x: timeRange?.endDate, y: 0 },
        ],
      },
    ],
    [timeRange]
  );

  if (dataVis.length === 0) return null;
  return (
    <ParentSize>
      {({ width, height }) => (
        <Grafica
          width={width}
          height={height}
          dataVis={dataVis}
          areaList={areaList}
          axisLabel="Lámina aprovechable (cm)"
          accessors={accessors}
        />
      )}
    </ParentSize>
  );
}
