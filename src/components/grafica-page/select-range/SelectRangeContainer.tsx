import React, { useCallback, useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { moverFecha } from "../../../api/utilities/date-utils";
import { useGraficasContext } from "../../../state-provider/GraficasProvider";
import SelectRangeComponent from "./SelectRangeComponent";

export type SinceType = { value: number; label: string };
export type RangeType = { startDate: Date; endDate: Date } | null;
const sinceOptions: SinceType[] = [
  { value: 3, label: "3 días" },
  { value: 7, label: "7 días" },
  { value: 14, label: "14 días" },
  { value: 30, label: "30 días" },
  { value: 60, label: "60 días" },
];

export default function SelectRangeContainer() {
  const { timeRange, updateTimeRange } = useGraficasContext();

  const [tempRange, setTempRange] = useState<RangeType>(null);
  const [sinceSelected, setSinceSelected] = useState<SinceType>({
    value: 0,
    label: "Intervalo de ...",
  });
  const [validationError, setValidationError] = useState(false);

  const setStartDate = (startDate: any) => {
    if (!tempRange || !startDate) return;
    setValidationError(false);
    setTempRange({ ...tempRange, startDate });
  };
  const setEndDate = (endDate: any) => {
    if (!tempRange || !endDate) return;
    setValidationError(false);
    setTempRange({ ...tempRange, endDate });
  };

  const filterRange = useCallback(() => {
    if (!tempRange) return;
    if (tempRange.endDate < tempRange.startDate) {
      setValidationError(true);
      return;
    }
    updateTimeRange(tempRange);
  }, [tempRange, updateTimeRange]);

  const selectSince = useCallback((v: SingleValue<SinceType>) => {
    if (!v) return;
    setSinceSelected(v);
    setTempRange({
      startDate: moverFecha(new Date(), -v.value),
      endDate: new Date(),
    });
    setValidationError(false);
  }, []);

  useEffect(() => {
    setTempRange(timeRange);
  }, [timeRange]);

  useEffect(() => {
    updateTimeRange({
      startDate: moverFecha(new Date(), 0),
      endDate: new Date(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SelectRangeComponent
      tempRange={tempRange}
      sinceSelected={sinceSelected}
      sinceOptions={sinceOptions}
      validationError={validationError}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      selectSince={selectSince}
      onFilter={filterRange}
    />
  );
}
