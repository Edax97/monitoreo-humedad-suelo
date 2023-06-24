import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePlantListLocal } from "../../../api-state/usePlantListAPI";
import { useReporteContext } from "../../../state-provider/ReporteProvider";
import { useSedeContext } from "../../../state-provider/SedeProvider";
import SelectValue, { SelectType } from "../../common/select-value/SelectValue";

export default function SelectCampoContainer() {
  const { setPlantSelected: setCampoSelected } = useReporteContext();
  const { sedeSelected } = useSedeContext();
  const { plantList } = usePlantListLocal(sedeSelected?.id || "");
  const [params] = useSearchParams();

  const options = useMemo(() => {
    if (!plantList) return [];
    return plantList.map((plant) => ({
      value: plant.plant_id,
      label: plant.plant_nombre,
    }));
  }, [plantList]);

  const [selected, setSelected] = useState<SelectType | null>(null);

  useEffect(() => {
    if (options.length === 0) return;
    const optionS = options.find((o) => o.value === params.get("plant_id"));
    if (optionS) return setSelected(optionS);
    setSelected(options[0]);
  }, [options, params]);

  useEffect(() => {
    if (!selected) return;
    setCampoSelected({ id: `${selected.value}`, name: selected.label });
  }, [selected, setCampoSelected]);

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="opacity-75 text-dark">Campo: </div>
      <SelectValue
        selected={selected}
        onSelect={setSelected}
        options={options}
      />
    </div>
  );
}
