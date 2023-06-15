import React, { useMemo } from "react";
import {
  DatumSensor,
  useGraficasContext,
} from "../../../state-provider/GraficasProvider";
import GraficoLeyendaComponent from "../../common/grafico/GraficoLeyendaComponent";
import {
  AccessorsType,
  AreaType,
} from "../../common/grafico/grafico-component";

export default function GraficaSuma() {
  const { sumaVis, timeRange, parametros } = useGraficasContext();

  const accessors = useMemo<AccessorsType>(
    () => ({
      xAccessor: (d: DatumSensor) => d?.fecha,
      yAccessor: (d: DatumSensor) => d?.raprovechable,
    }),
    []
  );

  const maximumValue = useMemo(() => {
    if (!sumaVis) return 0;
    const maxDatum = sumaVis.trama.reduce(
      (b, a) => (accessors.yAccessor(a) > b ? accessors.yAccessor(a) : b),
      0
    );
    return maxDatum;
  }, [sumaVis, accessors]);

  const areaList = useMemo<AreaType[]>(() => {
    if (!parametros || !timeRange) return [];
    return [
      {
        label: "Saturación",
        showLabel: true,
        color: "hsl(200, 68%, 88%)",
        data: [
          { x: timeRange.startDate, y: maximumValue * 1.1 },
          { x: timeRange.endDate, y: maximumValue * 1.1 },
        ],
      },
      {
        label: "y-zerp",
        showLabel: false,
        color: "rgba(0,0,0,0)",
        data: [
          { x: timeRange.startDate, y: 0 },
          { x: timeRange.endDate, y: 0 },
        ],
      },
      {
        label: "Lámina aprovechable",
        showLabel: true,
        color: "hsl(147, 68%, 88%)",
        data: [
          { x: timeRange.startDate, y: parametros.aprovechable },
          { x: timeRange.endDate, y: parametros.aprovechable },
        ],
      },
      {
        label: "Lámina rápid. aprovechable",
        showLabel: true,
        color: "hsl(0, 61%, 89%)",
        data: [
          { x: timeRange.startDate, y: parametros.raprovechable },
          { x: timeRange.endDate, y: parametros.raprovechable },
        ],
      },
    ];
  }, [timeRange, parametros, maximumValue]);

  const sumaLegend = useMemo(
    () => ({
      color: sumaVis?.color || "",
      label: `${sumaVis?.profundidad} cm`,
      profundidad: sumaVis?.profundidad || "",
    }),
    [sumaVis]
  );

  if (!sumaVis || !timeRange) return null;
  return (
    <GraficoLeyendaComponent
      seriesLegend={[sumaLegend]}
      dataVis={[sumaVis]}
      areaList={areaList}
      unidad="mm"
      title="Lámina de agua (mm)"
      accessors={accessors}
      timeDomain={[timeRange.startDate, timeRange.endDate]}
    />
  );
}
