import React, { useMemo } from "react";
import { useStateContext } from "../../state-provider/state-provider";
import { Grafica } from "../grafica-component/grafica";

export default function GraficaSeries() {
  const { dataVis: dataVisT } = useStateContext();

  const dataVis = useMemo(
    () => dataVisT.filter((d) => d.level !== "suma"),
    [dataVisT]
  );

  return <Grafica dataVis={dataVis} />;
}
