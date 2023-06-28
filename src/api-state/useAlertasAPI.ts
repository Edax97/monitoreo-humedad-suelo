import useSWR from "swr";
import { getAlertasAPI } from "../api/alertas-api";

const getAlertasURL = "api/alertas-data.json";

export function useAlertasAPI(sedeId: string) {
  const { data, error, isLoading } = useSWR([getAlertasURL, sedeId], (args) =>
    getAlertasAPI(...args)
  );

  return {
    alertas: data || [],
    error: !!error,
    loading: isLoading,
  };
}
