import React, { useMemo } from "react";
import { useStateContext } from "../../state-provider/state-provider";
import Leyenda from "../leyenda-component/leyenda";

export default function LeyendaSumaContainer() {
  const { sumaSondas } = useStateContext();

  const serieSuma = useMemo(
    () => ({
      color: sumaSondas.color,
      label: `${sumaSondas.level} cm`,
    }),
    [sumaSondas]
  );
  return sumaSondas.show ? (
    <Leyenda infoText={null} series={[serieSuma]} />
  ) : null;
}
