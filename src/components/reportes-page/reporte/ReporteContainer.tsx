import React, { useEffect, useMemo, useState } from "react";
import { useGraficasAPI } from "../../../api-state/useGraficasAPI";
import {
  RangeType,
  useReporteContext,
} from "../../../state-provider/ReporteProvider";
import CardWidget from "../../common/card-widget/CardWidget";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import TableFilter from "../../common/table/TableFilter";
import TablePagination from "../../common/table/TablePagination";
import ReporteTable, { ReporteRowType } from "./ReporteTable";

export default function ReporteContainer() {
  const { timeRange, equipoSelected } = useReporteContext();
  const [maxTimeRange, setMaxTimeRange] = useState<RangeType>(null);

  useEffect(() => {
    if (!timeRange || !maxTimeRange) return setMaxTimeRange(timeRange);
    if (maxTimeRange[0] > timeRange[0] || maxTimeRange[1] < timeRange[1])
      setMaxTimeRange(timeRange);
  }, [timeRange, maxTimeRange]);

  const { dataSonda, getError, getLoading } = useGraficasAPI(
    maxTimeRange?.[0] || null,
    maxTimeRange?.[1] || null
  );

  const headers = useMemo(() => {
    if (!dataSonda) return [];
    return [
      { key: "fecha", label: "Fecha" },
      ...dataSonda.map((s) => ({
        key: `${s.sensor}`,
        label: `Sensor ${s.sensor} (${(+s.profundidad).toFixed(0)} cm)`,
      })),
    ];
  }, [dataSonda]);
  const dataReporte = useMemo<ReporteRowType[]>(() => {
    if (!dataSonda) return [];
    if (dataSonda.length === 0) return [];
    const firstSensor = dataSonda[0];

    return firstSensor.trama.map(({ fecha }, j) => {
      let row: ReporteRowType = { fecha: `${fecha}` };
      dataSonda.forEach((s) => {
        const humed = +s.trama[j].raprovechable.toFixed(1);
        const temp = +s.trama[j].Temperatura.toFixed(1);
        const ph = +s.trama[j].pH.toFixed(1);
        row[
          `${s.sensor}`
        ] = `${humed}mm\xa0\xa0\xa0\xa0${temp}°C\xa0\xa0\xa0\xa0PH ${ph}`;
      });
      return row;
    });
  }, [dataSonda]);

  const dataInRange = useMemo<ReporteRowType[]>(
    () =>
      dataReporte.filter((datum, j) => {
        if (!timeRange) return dataReporte;
        return (
          new Date(datum.fecha) > timeRange[0] &&
          new Date(datum.fecha) < timeRange[1] &&
          j % 2 === 0
        );
      }),
    [dataReporte, timeRange]
  );

  if (getLoading || !dataReporte) return <LoadingComponent className="my-5" />;
  if (getError)
    return (
      <ErrorMessageComponent
        className="my-5"
        message="Error al obtener la data."
      />
    );
  return (
    <CardWidget title={`Reporte ${equipoSelected?.name || ""}`} toolbar={true}>
      <div className="px-4 pt-4 pb-2">
        <TableFilter
          dataLista={dataInRange}
          headersCSV={headers}
          render={(listaFiltered) => (
            <TablePagination
              itemsPerPage={15}
              dataLista={listaFiltered}
              render={(lista) => (
                <ReporteTable headers={headers} dataReporte={lista} />
              )}
            />
          )}
        />
      </div>
    </CardWidget>
  );
}
