import { timeFormat } from "d3";
import { useMemo } from "react";
import useSWR from "swr";
import { getReporteAPI } from "../api/reporte-api";

export function useReporteAPI(
  startDate: Date | null,
  endDate: Date | null,
  modemId: string,
  pagina: number
) {
  const [desde, hasta] = useMemo(() => {
    if (!startDate || !endDate) return ["", ""];
    return [
      `${timeFormat("%Y-%m-%d")(startDate)}`,
      `${timeFormat("%Y-%m-%d")(endDate)}`,
    ];
  }, [startDate, endDate]);

  const { data, error, isLoading } = useSWR(
    [
      "api/consultas/modem/lista_sensores_datos_reporte",
      modemId,
      desde,
      hasta,
      pagina,
    ],
    (args) => getReporteAPI(...args)
  );

  return {
    dataReporte: data?.data || null,
    pagesCount: data?.pages_count || null,
    error: !!error,
    loading: isLoading,
  };
}
