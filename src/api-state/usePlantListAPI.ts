import useSWR from "swr";
import { getPlantListAPI, getPlantListLocal } from "../api/plant-list-api";

const getPlantListURL = "api/consultas/plantaciones";
const plantListLocal = "api/plantacion-list-data.json";

export function usePlantListAPI(sedeId: string) {
  const { data, error, isLoading } = useSWR([getPlantListURL, sedeId], (args) =>
    getPlantListAPI(...args)
  );

  return { plantList: data, error: !!error, loading: isLoading };
}

export function usePlantListLocal(sedeId: string) {
  const { data, error, isLoading } = useSWR([plantListLocal, sedeId], (args) =>
    getPlantListLocal(...args)
  );

  return { plantList: data, error: !!error, loading: isLoading };
}
