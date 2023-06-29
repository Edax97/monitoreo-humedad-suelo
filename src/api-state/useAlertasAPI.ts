import useSWR from "swr";
import { getAlertasAPI, getAlertasURL } from "../api/alertas-api";

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
