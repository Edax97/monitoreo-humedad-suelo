import useSWR from "swr";
import { getResumenAPI } from "../api/resumen-api";

const getResumenURL = "api/resumen-data.json";

export function useResumenAPI(sedeId: string) {
  const { data, error, isLoading } = useSWR([getResumenURL, sedeId], (args) =>
    getResumenAPI(...args)
  );

  return { resumen: data, error: !!error, loading: isLoading };
}
