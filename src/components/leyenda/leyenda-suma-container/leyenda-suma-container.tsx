import React, { useMemo } from "react";
import { useStateContext } from "../../state-provider/state-provider";
import Leyenda from "../leyenda-component/leyenda";

export default function LeyendaSumaContainer() {
  const { sondas } = useStateContext();

  const serieSuma = useMemo(
    () => ({
      color: "#5F264A",
      label: sondas
        .filter((s) => s.show)
        .map((s) => s.level)
        .join("+"),
    }),
    [sondas]
  );
  return serieSuma.label.length > 0 ? (
    <Leyenda infoText={null} series={[serieSuma]} />
  ) : null;
}
