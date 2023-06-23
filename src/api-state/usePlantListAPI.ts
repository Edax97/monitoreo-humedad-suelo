import useSWR from "swr";
import { getPlantListAPI } from "../api/plant-list-api";

const getPlantListURL = "api/consultas/plantaciones";

export function usePlantListAPI(sedeId: string) {
  const { data, error, isLoading } = useSWR([getPlantListURL, sedeId], (args) =>
    getPlantListAPI(...args)
  );

  return { plantList: data, error: !!error, loading: isLoading };
}
