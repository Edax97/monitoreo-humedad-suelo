import React, { useMemo } from "react";
import { useStateContext } from "../../state-provider/state-provider";
import LeyendaComponent from "./leyenda-component";

export default function LeyendaSuma() {
  const { sumaSondas } = useStateContext();

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
