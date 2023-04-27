import { ParentSize } from "@visx/responsive";
import React, { useMemo } from "react";
import { useStateContext } from "../state-provider/state-provider";
import TimeAxisComponent from "./time-axis-component";

export default function TimeAxisContainer() {
  const { timeRange } = useStateContext();
  const timeDomain = useMemo(
    () => [timeRange.startDate, timeRange.endDate],
    [timeRange]
  );

  return (
    <ParentSize>
      {({ width, height }) => (
        <TimeAxisComponent width={width} hMargin={60} domain={timeDomain} />
      )}
    </ParentSize>
  );
}
