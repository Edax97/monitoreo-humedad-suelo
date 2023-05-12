import React, { useMemo } from "react";
import { useGraficaContext } from "../../state-provider/GraficaProvider";
import LeyendaComponent from "./leyenda-component";

export default function LeyendaSuma() {
  const { sumaSondas } = useGraficaContext();

  const serieSuma = useMemo(
    () => ({
      color: sumaSondas.color,
      label: `${sumaSondas.level} cm`,
    }),
    [sumaSondas]
  );
  return sumaSondas.show ? (
    <LeyendaComponent infoText={null} series={[serieSuma]} />
  ) : null;
}
