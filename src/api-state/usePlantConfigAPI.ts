import useSWR from "swr";
import { getPlantConfigAPI, getPlantConfigURL } from "../api/plant-config-api";

export function usePlantConfigAPI(plantId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    [getPlantConfigURL, plantId],
    (args) => getPlantConfigAPI(...args)
  );

  return {
    plantConfig: data,
    error: !!error,
    loading: isLoading,
    mutate,
  };
}
