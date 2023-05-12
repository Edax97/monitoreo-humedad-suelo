import React, { useMemo } from "react";
import { useGraficasContext } from "../../state-provider/GraficasProvider";
import LeyendaComponent from "./leyenda-component";

export default function LeyendaSeries() {
  const { dataVis } = useGraficasContext();

  const series = useMemo(() => {
    return dataVis
      .filter((s) => s.showSeries)
      .map((s) => ({
        color: s.color,
        label: `${s.profundidad} cm`,
      }));
  }, [dataVis]);

  if (series.length === 0) return null;
  return <LeyendaComponent infoText={null} series={series} />;
}
