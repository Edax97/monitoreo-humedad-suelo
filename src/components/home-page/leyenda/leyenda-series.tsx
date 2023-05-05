import React, { useMemo } from "react";
import { useStateContext } from "../../state-provider/state-provider";
import LeyendaComponent from "./leyenda-component";

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

  return <LeyendaComponent infoText={null} series={series} />;
}
