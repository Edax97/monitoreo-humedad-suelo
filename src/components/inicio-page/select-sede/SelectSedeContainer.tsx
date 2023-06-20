import React, { useEffect, useMemo, useState } from "react";
import { useSedeListAPI } from "../../../api-state/useSedeListAPI";
import { useSedeContext } from "../../../state-provider/SedeProvider";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import SelectValue, { SelectType } from "../../common/select-value/SelectValue";

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
    if (!selected) return;
    setSedeSelected({ id: `${selected.value}`, name: selected.label });
  }, [selected, setSedeSelected]);

  if (error)
    return (
      <ErrorMessageComponent className="my-3" message="Error al cargar data." />
    );
  return (
    <SelectValue
      selected={selected}
      onSelect={setSelected}
      options={options}
      label="Sede"
      selectStyle={{ width: "9rem" }}
    />
  );
}
