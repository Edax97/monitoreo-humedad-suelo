import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../state-provider/state-provider";
import TimeRangeComponent, { RangeType } from "./time-range-component";

export default function TimeRangeContainer() {
  const { timeRange, setTimeRange } = useStateContext();

  const [tempRange, setTempRange] = useState<RangeType>(null);
  useEffect(() => {
    setTempRange([timeRange.startDate, timeRange.endDate]);
  }, [timeRange]);

  const selectRange = () => {
    //validation
    if (tempRange === null) return;
    setTimeRange({ startDate: tempRange[0], endDate: tempRange[1] });
  };
  const cancelSelection = () =>
    setTempRange([timeRange.startDate, timeRange.endDate]);

  return (
    <TimeRangeComponent
      tempRange={tempRange}
      setTempRange={setTempRange}
      selectRange={selectRange}
      cancelSelection={cancelSelection}
    />
  );
}
