import React, { useMemo } from "react";
import { useReporteAPI } from "../../../api-state/useReporteAPI";
import { RangeType } from "../../../state-provider/ReporteProvider";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import TableFilter from "../../common/table/TableFilter";
import ReporteTable, { ReporteRowType } from "./ReporteTable";

interface Props {
  timeRange: RangeType;
  modemId: string;
  page: number;
}
export default function ReporteContainer(props: Props) {
  const { dataReporte, error, loading } = useReporteAPI(
    props.timeRange?.[0] || null,
    props.timeRange?.[1] || null,
    props.modemId,
    props.page
  );

  const headers = useMemo(() => {
    if (!dataReporte) return [];
    return [
      { key: "fecha", label: "Fecha" },
      ...dataReporte.map((s) => ({
        key: `${s.sensor}`,
        label: `Sensor ${s.sensor} (${(+s.profundidad).toFixed(0)} cm)`,
      })),
    ];
  }, [dataReporte]);

  const pageReporte = useMemo<ReporteRowType[]>(() => {
    if (!dataReporte) return [];
    if (dataReporte.length === 0) return [];
    const firstSensor = dataReporte[0];
    return firstSensor.trama.map(({ fecha: dsensor_fecha_hora }, j) => {
      let row: ReporteRowType = { fecha: `${dsensor_fecha_hora}` };
      dataReporte.forEach((s) => {
        const humed = +(+s.trama[j].raprovechable).toFixed(1);
        const temp = +(+s.trama[j].temperatura).toFixed(1);
        const ph = +(+s.trama[j].pH).toFixed(1);
        row[
          `${s.sensor}`
        ] = `${humed}mm\xa0\xa0\xa0\xa0${temp}°C\xa0\xa0\xa0\xa0PH ${ph}`;
      });
      return row;
    });
  }, [dataReporte]);

  if (loading || !dataReporte) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent
        className="my-5"
        message="Error al obtener la data."
      />
    );
  return (
    <TableFilter
      dataLista={pageReporte}
      headersCSV={headers}
      render={(listaFiltered) => (
        <ReporteTable headers={headers} dataReporte={listaFiltered} />
      )}
    />
  );
}
