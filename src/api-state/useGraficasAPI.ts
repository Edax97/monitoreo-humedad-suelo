import { timeFormat } from "d3";
import { useMemo } from "react";
import useSWR from "swr";
import { getDataGraficaAPI } from "../api/data-grafica-api";
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

export function useDataGraficaAPI(
  startDate: Date | null,
  endDate: Date | null,
  modemId: string
) {
  const [desde, hasta] = useMemo(() => {
    if (!startDate || !endDate) return ["", ""];
    return [
      `${timeFormat("%Y-%m-%d")(startDate)}`,
      `${timeFormat("%Y-%m-%d")(endDate)}`,
    ];
  }, [startDate, endDate]);

  const { data, error, isLoading, mutate } = useSWR(
    ["api/consultas/modem/lista_sensores_datos", modemId, desde, hasta],
    (args) => getDataGraficaAPI(...args)
  );
  const parametros = useMemo(
    () => ({
      nombre: 1,
      profundidad: 30.0,
      cc: 31.21,
      pmp: 19.09,
      dap: 1.43,
      agotamiento: 0.65,
      aprovechable: 51.99480000000001,
      raprovechable: 33.79662000000001,
    }),
    []
  );

  return {
    dataSonda: data || null,
    parametros: parametros || null,
    getError: !!error,
    getLoading: isLoading,
    mutate,
  };
}
