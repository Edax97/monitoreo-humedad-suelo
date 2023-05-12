import React, { useMemo } from "react";
import { useGraficasContext } from "../../state-provider/GraficasProvider";
import LeyendaComponent from "./leyenda-component";

export default function LeyendaSuma() {
  const { sumaVis } = useGraficasContext();

  const serieSuma = useMemo(
    () => ({
      color: sumaVis?.color || "",
      label: `${sumaVis?.profundidad} cm`,
    }),
    [sumaVis]
  );

  if (!sumaVis) return null;
  return <LeyendaComponent infoText={null} seriesLegend={[serieSuma]} />;
}
