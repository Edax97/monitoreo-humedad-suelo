import useSWR from "swr";
import { getModemSensoresAPI } from "../api/modem-sensor-list-api";

const getModemURL = "api/consultas/modem/lista_ultimos_datos_modem";

export function useModemSensoresAPI(modemId: string) {
  const { data, error, isLoading } = useSWR([getModemURL, modemId], (args) =>
    getModemSensoresAPI(...args)
  );

  return { modem: data, error: !!error, loading: isLoading };
}
