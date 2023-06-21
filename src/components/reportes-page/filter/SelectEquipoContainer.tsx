import React, { useEffect, useState } from "react";
import { useReporteContext } from "../../../state-provider/ReporteProvider";
import SelectValue, { SelectType } from "../../common/select-value/SelectValue";

const options = [
  { value: "0", label: "AIPSA 1" },
  { value: "1", label: "AIPSA 2" },
];

export default function SelectEquipoContainer() {
  const { setEquipoSelected } = useReporteContext();
  const [selected, setSelected] = useState<SelectType | null>(null);

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
