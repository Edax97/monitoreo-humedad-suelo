import { useCallback, useEffect } from "react";
import { moverFecha } from "../../../api/utilities/date-utils";
import {
  RangeType,
  useReporteContext,
} from "../../../state-provider/ReporteProvider";
import SelectRange, { SinceType } from "../../common/select-range/SelectRange";

const sinceOptions: SinceType[] = [
  { value: 3, label: "3 días" },
  { value: 7, label: "7 días" },
  { value: 14, label: "14 días" },
  { value: 30, label: "30 días" },
  { value: 60, label: "60 días" },
];

export default function SelectRangeContainer() {
  const { timeRange, updateTimeRange } = useReporteContext();

  useEffect(() => {
    updateTimeRange([moverFecha(new Date(), -14), new Date()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilter = useCallback(
    (range: RangeType) => {
      updateTimeRange(range);
    },
    [updateTimeRange]
  );

  return (
    <SelectRange
      timeRange={timeRange}
      sinceOptions={sinceOptions}
      onFilter={onFilter}
    />
  );
}
