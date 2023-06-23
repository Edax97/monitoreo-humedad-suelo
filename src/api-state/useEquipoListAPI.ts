import { useMemo } from "react";
import { EquipoType } from "../api/plant-list-api";
import { usePlantListLocal } from "./usePlantListAPI";

export type EquipoPlantType = EquipoType & { plant_nombre: string };

export function useEquipoListAPI(sedeId: string) {
  const { plantList, error, loading } = usePlantListLocal(sedeId);

  const equipoList = useMemo(() => {
    if (!plantList) return [];
    let list: EquipoPlantType[] = [];
    plantList.forEach((plant) => {
      list = [
        ...list,
        ...plant.lista_equipos.map((m) => ({
          ...m,
          plant_nombre: plant.plant_nombre,
        })),
      ];
    });
    return list;
  }, [plantList]);

  return { equipoList, error, loading };
}
