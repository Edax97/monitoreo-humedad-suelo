import useSWR from "swr";
import { getSedeListAPI } from "../api/sede-list-api";

const getSedeListURL = "api/sede-list-data.json";

export function useSedeListAPI(masterId: string) {
  const { data, error, isLoading } = useSWR(
    [getSedeListURL, masterId],
    (args) => getSedeListAPI(...args)
  );

  return { sedeList: data, error: !!error, loading: isLoading };
}
