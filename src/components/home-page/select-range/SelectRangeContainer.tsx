import React, { useCallback, useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { moverFecha } from "../../../api/utilities/date-utils";
import { useStateContext } from "../../state-provider/state-provider";
import SelectRangeComponent, {
  RangeType,
  SinceType,
} from "./SelectRangeComponent";

const sinceOptions: SinceType[] = [
  { value: 3, label: "3 días" },
  { value: 7, label: "7 días" },
  { value: 14, label: "14 días" },
  { value: 30, label: "30 días" },
  { value: 60, label: "60 días" },
];

export default function SelectRangeContainer() {
  const { timeRange, setTimeRange } = useStateContext();

  const [tempRange, setTempRange] = useState<RangeType>(null);
  const [sinceSelected, setSinceSelected] = useState<SinceType>({
    value: 0,
    label: "Intervalo de ...",
  });

  const filterRange = useCallback(() => {
    if (!tempRange) return;
    setTimeRange({ startDate: tempRange[0], endDate: tempRange[1] });
    //getData()
  }, [tempRange, setTimeRange]);

  const selectSince = useCallback((v: SingleValue<SinceType>) => {
    if (!v) return;
    setSinceSelected(v);
    setTempRange([moverFecha(new Date(), -v.value), new Date()]);
  }, []);

  useEffect(() => {
    setTempRange([timeRange.startDate, timeRange.endDate]);
  }, [timeRange]);

  return (
    <SelectRangeComponent
      tempRange={tempRange}
      sinceSelected={sinceSelected}
      sinceOptions={sinceOptions}
      setTempRange={setTempRange}
      selectSince={selectSince}
      onFilter={filterRange}
    />
  );
}
