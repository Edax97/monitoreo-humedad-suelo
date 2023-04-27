import { ParentSize } from "@visx/responsive";
import React, { useMemo } from "react";
import { useStateContext } from "../../state-provider/state-provider";
import { AreaType, Grafica } from "../grafica-component/grafica";

export default function GraficaSeries() {
  const { dataVis, timeRange } = useStateContext();

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
          height={400}
          dataVis={dataVis.series}
          areaList={areaList}
        />
      )}
    </ParentSize>
  );
}
