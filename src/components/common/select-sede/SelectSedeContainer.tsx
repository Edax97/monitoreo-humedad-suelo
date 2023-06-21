import React, { useEffect, useMemo, useState } from "react";
import { useSedeListAPI } from "../../../api-state/useSedeListAPI";
import { useSedeContext } from "../../../state-provider/SedeProvider";
import ErrorMessageComponent from "../message/ErrorMessageComponent";
import SelectValue, { SelectType } from "../select-value/SelectValue";

export default function SelectSedeContainer() {
  const { sedeList, error } = useSedeListAPI("1");

  const options = useMemo(() => {
    if (!sedeList) return [];
    return sedeList.map((sede) => ({
      value: `${sede.sedeId}`,
      label: sede.sedeName,
    }));
  }, [sedeList]);

  const { setSedeSelected } = useSedeContext();
  const [selected, setSelected] = useState<SelectType | null>(null);

  useEffect(() => {
    if (!options || options.length === 0) return;
    setSelected(options[0]);
  }, [options]);
  useEffect(() => {
    if (!selected) return;
    setSedeSelected({ id: `${selected.value}`, name: selected.label });
  }, [selected, setSedeSelected]);

  if (error)
    return (
      <ErrorMessageComponent className="my-3" message="Error al cargar data." />
    );
  return (
    <div className="d-flex align-items-center gap-3 bg-primary">
      <div className="opacity-75 text-white">Sede: </div>
      <SelectValue
        selected={selected}
        onSelect={setSelected}
        options={options}
        containerStyles={{ width: "9rem" }}
      />
    </div>
  );
}
