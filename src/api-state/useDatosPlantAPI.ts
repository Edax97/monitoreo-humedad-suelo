import useSWR from "swr";
import { getDatosPlantAPI } from "../api/datos-plant-api";

const getDatosPlantURL = "api/consultas/plantacion/datos";

export function useDatosPlantAPI(imei: string) {
  const { data, error, isLoading } = useSWR([getDatosPlantURL, imei], (args) =>
    getDatosPlantAPI(...args)
  );

  return { datosPlant: data, error: !!error, loading: isLoading };
}
