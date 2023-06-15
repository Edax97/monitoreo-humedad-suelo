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
    <SelectValue
      selected={selected}
      onSelect={setSelected}
      options={options}
      label="Equipo"
    />
  );
}
