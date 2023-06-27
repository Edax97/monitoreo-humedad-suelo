import { useMemo } from "react";
import { ModemType } from "../api/plant-list-api";
import { usePlantListAPI } from "./usePlantListAPI";

export type ModemPlantType = ModemType & { plant_nombre: string };

export function useModemListAPI(sedeId: string) {
  const { plantList, error, loading } = usePlantListAPI(sedeId);

  const modemList = useMemo(() => {
    if (!plantList) return [];
    let list: ModemPlantType[] = [];
    plantList.forEach((plant) => {
      list = [
        ...list,
        ...plant.lista_modems.map((m) => ({
          ...m,
          plant_nombre: plant.plant_nombre,
        })),
      ];
    });
    return list;
  }, [plantList]);

  return { modemList, error, loading };
}
