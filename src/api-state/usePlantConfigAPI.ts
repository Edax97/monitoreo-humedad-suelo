import useSWR from "swr";
import { getPlantConfigAPI } from "../api/plantacion-configuracion-api";

const getPlantConfigURL = "api/plantacion-data.json";

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
