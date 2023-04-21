import React from "react";
import { useStateContext } from "../../state-provider/state-provider";
import { Grafica } from "../grafica-component/grafica";

export default function GraficaSeries() {
  const { dataVis } = useStateContext();

  return <Grafica dataVis={dataVis.series} />;
}
