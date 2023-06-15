import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useGraficasAPI } from "../api-state/useGraficasAPI";
import { ParametrosType } from "../api/data-sonda-api";
import { coloresList } from "../api/utilities/colores";
import { extendRange } from "../api/utilities/date-utils";

export interface DatumSensor {
  Humedad: number;
  aprovechable: number;
  raprovechable: number;
  fecha: Date;
  cm: number;
  Temperatura: number;
  Conductividad: number;
  pH: number;
}

export interface SeriesVisType {
  profundidad: string;
  trama: DatumSensor[];
  showSeries: boolean;
  color: string;
}

export type RangeType = { startDate: Date; endDate: Date };

interface GraficaContextType {
  timeRange: RangeType | null;
  updateTimeRange: (range: RangeType) => any;
  dataVis: SeriesVisType[];
  sumaVis: SeriesVisType | null;
  reloadData: () => any;
  parametros: ParametrosType | null;
  getLoading: boolean;
  getError: boolean;
}

const GraficasContext = createContext<GraficaContextType>(null!);

interface Props {
  children: ReactNode;
}
export default function GraficasProvider(props: Props) {
  const [timeRange, setTimeRange] = useState<RangeType | null>(null);

  const [maxTimeRange, setMaxTimeRange] = useState<RangeType | null>(null);

  useEffect(() => {
    if (!timeRange || !maxTimeRange) return setMaxTimeRange(timeRange);
    if (
      maxTimeRange.startDate > timeRange.startDate ||
      maxTimeRange.endDate < timeRange.endDate
    )
      setMaxTimeRange(timeRange);
  }, [timeRange, maxTimeRange]);

  const updateTimeRange = useCallback((range: RangeType) => {
    setTimeRange(extendRange(range));
  }, []);

  const { dataSonda, parametros, getError, getLoading, mutate } =
    useGraficasAPI(
      maxTimeRange?.startDate || null,
      maxTimeRange?.endDate || null
    );

  const dataVis = useMemo<SeriesVisType[]>(() => {
    if (!dataSonda || !timeRange) return [];
    return dataSonda.map(({ profundidad, trama }, i) => {
      const tramaFiltered = trama
        .map((datum) => ({
          ...datum,
          fecha: new Date(datum.fecha),
        }))
        .filter(
          (datum, j) =>
            datum.fecha > timeRange.startDate &&
            datum.fecha < timeRange.endDate &&
            j % 1 === 0
        );
      return {
        profundidad: `${(+profundidad).toFixed(0)}`,
        trama: tramaFiltered,
        showSeries: true,
        color: coloresList[i],
      };
    });
  }, [dataSonda, timeRange]);

  const sumaVis = useMemo<SeriesVisType | null>(() => {
    if (dataVis.length === 0) return null;
    const firstSensor = dataVis[0];

    const sumaProfundidad = dataVis.map((s) => s.profundidad).join("+");

    const tramaSuma = firstSensor.trama.map((datum, j) => {
      let [Humedad, aprovechable, raprovechable] = [0, 0, 0];
      dataVis.forEach((sensor) => {
        const datumSensor = sensor.trama[j];
        Humedad += datumSensor?.Humedad || 0;
        aprovechable += datumSensor?.aprovechable || 0;
        raprovechable += datumSensor?.raprovechable || 0;
      });
      return {
        ...datum,
        Humedad,
        aprovechable: +aprovechable.toFixed(2),
        raprovechable: +raprovechable.toFixed(2),
      };
    });
    return {
      profundidad: sumaProfundidad,
      showSeries: true,
      color: coloresList[5],
      trama: tramaSuma,
    };
  }, [dataVis]);

  const reloadData = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <GraficasContext.Provider
      value={{
        timeRange,
        updateTimeRange,
        dataVis,
        sumaVis,
        parametros,
        reloadData,
        getLoading,
        getError,
      }}
    >
      {props.children}
    </GraficasContext.Provider>
  );
}

export const useGraficasContext = () => useContext(GraficasContext);

/*
const getData = useCallback((desde: string, hasta: string) => {
    console.log("API request", new Date());

    setGetLoading(true);
    setGetError(false);

    fetchDataSondaAPI("ConsultaPunto", "863192058179590", desde, hasta)
      .then((dataSonda) => {
        setGetLoading(false);
        setDataSonda(dataSonda);
        setTimeRange({
          startDate: new Date(desde),
          endDate: new Date(hasta),
        });
        setMaxTimeRange({
          startDate: new Date(desde),
          endDate: new Date(hasta),
        });
        console.log("Response received.", new Date());
      })
      .catch((e) => {
        console.log("API Error", e);
        setGetLoading(false);
        setGetError(true);
      });
  }, []);

  const updateData = useCallback(
    (r: RangeType) => {
      const desde = `${timeFormat("%Y-%m-%d")(r.startDate)} 00:00:00`;
      const hasta = `${timeFormat("%Y-%m-%d")(r.endDate)} 23:59:59`;
      if (!maxTimeRange) {
        getData(desde, hasta);
        return;
      }
      if (
        new Date(desde) < maxTimeRange.startDate ||
        new Date(hasta) > maxTimeRange.endDate
      ) {
        getData(desde, hasta);
        return;
      }

      setTimeRange({
        startDate: new Date(desde),
        endDate: new Date(hasta),
      });
    },
    [getData, maxTimeRange]
  );

  const reloadData = useCallback(() => {
    if (!timeRange) return;
    const desde = `${timeFormat("%Y-%m-%d")(timeRange.startDate)} 00:00:00`;
    const hasta = `${timeFormat("%Y-%m-%d")(timeRange.endDate)} 23:59:59`;
    getData(desde, hasta);
  }, [timeRange, getData]);
*/
