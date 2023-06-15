import useSWR from "swr";
import { getAlertasAPI } from "../api/alertas-api";

const getAlertasURL = "api/alertas-data.json";

export function useAlertasAPI(tipo: string, sedeId: string) {
  const { data, error, isLoading } = useSWR(
    [getAlertasURL, tipo, sedeId],
    (args) => getAlertasAPI(...args)
  );

  return {
    alertas: data || [],
    error: !!error,
    loading: isLoading,
  };
}
