import React, { useCallback, useMemo, useState } from "react";
import { moverFecha } from "../../../../../api/utilities/date-utils";
import { useStateContext } from "../../../../state-provider/state-provider";
import SinceRangeComponent, { SinceType } from "./since-range-component";

export default function SinceRangeContainer() {
  const { setTimeRange } = useStateContext();

  const [sinceValue, setSinceValue] = useState<SinceType>({
    value: 0,
    label: "Seleccionar",
  });
  const sinceOptions = useMemo<SinceType[]>(
    () => [
      { value: 3, label: "3 días" },
      { value: 7, label: "7 días" },
      { value: 14, label: "14 días" },
      { value: 30, label: "30 días" },
    ],
    []
  );
  const selectSince = useCallback(() => {
    setTimeRange({
      startDate: moverFecha(new Date(), -sinceValue.value),
      endDate: new Date(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sinceValue]);

  return (
    <SinceRangeComponent
      sinceValue={sinceValue}
      setSinceValue={setSinceValue}
      sinceOptions={sinceOptions}
      selectSince={selectSince}
    />
  );
}
