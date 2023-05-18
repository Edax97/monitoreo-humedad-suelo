import { ParentSize } from "@visx/responsive";
import React from "react";
import { useGraficasContext } from "../../state-provider/GraficasProvider";
import TimeAxisComponent from "./time-axis-component";

export default function TimeAxisContainer() {
  const { timeRange } = useGraficasContext();

  if (!timeRange) return null;
  return (
    <ParentSize>
      {({ width, height }) => (
        <TimeAxisComponent
          width={width}
          hMargin={50}
          domain={[timeRange.startDate, timeRange.endDate]}
        />
      )}
    </ParentSize>
  );
}
