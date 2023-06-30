import useSWR from "swr";
import {
  getParamsConfigAPI,
  getParamsConfigURL,
} from "../api/params-config-api";

export function useParamsConfigAPI(modemId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    [getParamsConfigURL, modemId],
    (args) => getParamsConfigAPI(...args)
  );

  return {
    paramsConfig: data,
    error: !!error,
    loading: isLoading,
    mutate,
  };
}
