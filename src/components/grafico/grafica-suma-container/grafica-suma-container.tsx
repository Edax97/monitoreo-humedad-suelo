import { ParentSize } from "@visx/responsive";
import React, { useMemo } from "react";
import { useStateContext } from "../../state-provider/state-provider";
import { AreaType, Grafica } from "../grafica-component/grafica";

export default function GraficaSumaContainer() {
  const { dataVis, timeRange, varHidraul } = useStateContext();
  const areaList = useMemo<AreaType[]>(
    () => [
      {
        label: "rango-humedad",
        showLabel: false,
        color: "#ffffff00",
        data: [
          { time: timeRange.startDate, h: 1.2 * varHidraul.cc },
          { time: timeRange.endDate, h: 1.2 * varHidraul.cc },
        ],
      },
      {
        label: "CC",
        showLabel: true,
        color: "hsl(147, 68%, 91%)",
        data: [
          { time: timeRange.startDate, h: varHidraul.cc },
          { time: timeRange.endDate, h: varHidraul.cc },
        ],
      },
      {
        label: "PMP",
        showLabel: true,
        color: "hsl(0, 61%, 94%)",
        data: [
          { time: timeRange.startDate, h: varHidraul.pmp },
          { time: timeRange.endDate, h: varHidraul.pmp },
        ],
      },
    ],
    [timeRange, varHidraul]
  );
  return (
    <ParentSize>
      {({ width, height }) => (
        <Grafica
          width={width}
          height={height}
          dataVis={[dataVis.suma]}
          areaList={areaList}
        />
      )}
    </ParentSize>
  );
}
