import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePlantListLocal } from "../../../api-state/usePlantListAPI";
import { useReporteContext } from "../../../state-provider/ReporteProvider";
import { useSedeContext } from "../../../state-provider/SedeProvider";
import SelectValue, { SelectType } from "../../common/select-value/SelectValue";

export default function SelectEquipoContainer() {
  const { setEquipoSelected, plantSelected: campoSelected } =
    useReporteContext();
  const [selected, setSelected] = useState<SelectType | null>(null);
  const { sedeSelected } = useSedeContext();
  const { plantList } = usePlantListLocal(sedeSelected?.id || "");
  const [params] = useSearchParams();

  const equipoList = useMemo(() => {
    if (!plantList || !campoSelected) return null;
    const plant = plantList.find((p) => p.plant_id === campoSelected.id);
    if (!plant) return null;
    return plant.lista_equipos;
  }, [plantList, campoSelected]);

  const options = useMemo(() => {
    if (!equipoList) return [];
    return equipoList.map((equipo) => ({
      value: `${equipo.modem_id}`,
      label: equipo.modem_nombrepunto,
    }));
  }, [equipoList]);

  useEffect(() => {
    if (options.length === 0) return;
    const optionS = options.find((o) => o.value === params.get("equipo_id"));
    if (optionS) return setSelected(optionS);
    setSelected(options[0]);
  }, [options, params]);

  useEffect(() => {
    if (!selected) return;
    setEquipoSelected({ id: `${selected.value}`, name: selected.label });
  }, [selected, setEquipoSelected]);

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="opacity-75 text-dark">Equipo: </div>
      <SelectValue
        selected={selected}
        onSelect={setSelected}
        options={options}
      />
    </div>
  );
}
