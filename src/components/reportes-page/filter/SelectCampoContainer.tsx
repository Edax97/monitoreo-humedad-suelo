import React, { useEffect, useState } from "react";
import { useReporteContext } from "../../../state-provider/ReporteProvider";
import SelectValue, { SelectType } from "../../common/select-value/SelectValue";

const options = [
  { value: "0", label: "Paramonga 1" },
  { value: "1", label: "Paramonga 2" },
  { value: "2", label: "Paramonga 3" },
];

export default function SelectCampoContainer() {
  const { setCampoSelected } = useReporteContext();
  const [selected, setSelected] = useState<SelectType | null>(null);

  useEffect(() => {
    if (!selected) return;
    setCampoSelected({ id: `${selected.value}`, name: selected.label });
  }, [selected, setCampoSelected]);

  return (
    <SelectValue
      selected={selected}
      onSelect={setSelected}
      options={options}
      label="Campo"
    />
  );
}
