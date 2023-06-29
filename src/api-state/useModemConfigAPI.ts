import useSWR from "swr";
import { getModemConfigAPI, getModemConfigURL } from "../api/modem-config-api";

export function useModemConfigAPI(modemId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    [getModemConfigURL, modemId],
    (args) => getModemConfigAPI(...args)
  );

  return { modemConfig: data, error: !!error, loading: isLoading, mutate };
}
