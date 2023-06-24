import { timeFormat } from "d3";
import { useMemo } from "react";
import useSWR from "swr";
import { fetchDataSondaAPI } from "../api/data-sonda-api";

export function useGraficasAPI(
  startDate: Date | null,
  endDate: Date | null,
  equipoId: string
) {
  const [desde, hasta] = useMemo(() => {
    if (!startDate || !endDate) return ["", ""];
    return [
      `${timeFormat("%Y-%m-%d")(startDate)} 00:00:00`,
      `${timeFormat("%Y-%m-%d")(endDate)} 23:59:59`,
    ];
  }, [startDate, endDate]);

  const { data, error, isLoading, mutate } = useSWR(
    ["ConsultaPunto", equipoId, desde, hasta],
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
