import { ParentSize } from "@visx/responsive";
import React, { useMemo } from "react";
import { useGraficaContext } from "../../state-provider/GraficaProvider";
import { AreaType, Grafica } from "./grafico-component";

export default function GraficaSeries() {
  const { dataVis, timeRange } = useGraficaContext();

  const areaList = useMemo<AreaType[]>(
    () => [
      {
        label: "dominio-tiempo",
        showLabel: false,
        color: "#ffffff00",
        data: [
          { time: timeRange.startDate, h: 0 },
          { time: timeRange.endDate, h: 0 },
        ],
      },
    ],
    [timeRange]
  );

  return (
    <ParentSize>
      {({ width, height }) => (
        <Grafica
          width={width}
          height={height}
          dataVis={dataVis.series}
          areaList={areaList}
        />
      )}
    </ParentSize>
  );
}