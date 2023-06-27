import useSWR from "swr";
import { getResumenAPI } from "../api/resumen-api";

const getResumenURL = "api/consultas/sede/contadores";

export function useResumenAPI(sedeId: string) {
  const { data, error, isLoading } = useSWR([getResumenURL, sedeId], (args) =>
    getResumenAPI(...args)
  );

  return { resumen: data, error: !!error, loading: isLoading };
}
