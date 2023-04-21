import React, { useMemo } from "react";
import { useStateContext } from "../../state-provider/state-provider";
import Leyenda from "../leyenda-component/leyenda";

export default function LeyendaSeries() {
  const { sondas } = useStateContext();

  const series = useMemo(() => {
    return sondas
      .filter((s) => s.show)
      .map((s) => ({
        color: s.color,
        label: `${s.level} cm`,
      }));
  }, [sondas]);

  return <Leyenda infoText={null} series={series} />;
}
