import { timeFormat } from "d3";
import { useMemo } from "react";
import useSWR from "swr";
import { fetchDataSondaAPI } from "../api/data-sonda-api";
import { RangeType } from "../components/state-provider/GraficasProvider";

export function useGraficasAPI(range: RangeType | null) {
  const [desde, hasta] = useMemo(() => {
    if (!range) return ["", ""];
    return [
      `${timeFormat("%Y-%m-%d")(range.startDate)} 00:00:00`,
      `${timeFormat("%Y-%m-%d")(range.endDate)} 23:59:59`,
    ];
  }, [range]);

  const { data, error, isLoading, mutate } = useSWR(
    ["ConsultaPunto", "863192058179590", desde, hasta],
    (args) => fetchDataSondaAPI(...args)
  );

  return {
    dataSonda: data?.datos || null,
    parametros: data?.parametros || null,
    getError: !!error,
    getLoading: isLoading,
    mutate,
  };
}
