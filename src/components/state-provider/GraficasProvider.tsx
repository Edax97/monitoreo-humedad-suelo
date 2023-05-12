import { max } from "d3";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getDataSondaAPI, ParametrosType } from "../../api/data-sonda-api";
import { coloresList } from "../../api/utilities/colores";
import { moverFecha } from "../../api/utilities/date-utils";

export interface DatumSensor {
  humedad: number;
  aprovechable: number;
  raprovechable: number;
  fecha: Date;
  cm: number;
  temepratura: number;
  conductividad: number;
  ph: number;
}

export interface SeriesVisType {
  profundidad: number | string;
  trama: DatumSensor[];
  lastDatum: Date | null;
  showSeries: boolean;
  color: string;
}

export type RangeType = { startDate: Date; endDate: Date } | null;

interface GraficaContextType {
  timeRange: RangeType;
  dataVis: SeriesVisType[];
  sumaVis: SeriesVisType | null;
  parametros: ParametrosType | null;
  getData: (range: RangeType) => any;
  getLoading: boolean;
  getError: boolean;
}

const GraficasContext = createContext<GraficaContextType>(null!);

interface Props {
  children: ReactNode;
}
export default function GraficasProvider(props: Props) {
  const [timeRange, setTimeRange] = useState<RangeType>(null);
  //const [maxTimeRange, setMaxTimeRange] = useState<Range>(null);

  //const [dataSonda, setDataSonda] = useState<DataSondaType | null>(null);
  const [dataVis, setDataVis] = useState<SeriesVisType[]>([]);

  const [valores, setValores] = useState<ParametrosType | null>(null);

  const [getLoading, setGetLoading] = useState(false);
  const [getError, setGetError] = useState(false);

  const sumaVis = useMemo<SeriesVisType | null>(() => {
    if (dataVis.length === 0) return null;
    const firstSensor = dataVis[0];
    const lastDatum = max(firstSensor.trama, (d) => d["fecha"]) || null;

    const sumaProfundidad = dataVis.map((s) => s.profundidad).join("+");

    const tramaSuma = firstSensor.trama.map((datum) => {
      let [humedad, aprovechable, raprovechable] = [0, 0, 0];
      dataVis.forEach((sensor) => {
        const datumSensor = sensor.trama.find(
          (d) => d.fecha.toString() === datum.fecha.toString()
        );
        humedad += datumSensor?.humedad || 0;
        aprovechable += datumSensor?.aprovechable || 0;
        raprovechable += datumSensor?.aprovechable || 0;
      });
      return { ...datum, humedad, aprovechable, raprovechable };
    });
    return {
      profundidad: sumaProfundidad,
      showSeries: true,
      color: coloresList[-1],
      lastDatum,
      trama: tramaSuma,
    };
  }, [dataVis]);

  const getData = useCallback((r: RangeType) => {
    if (!r) return;
    setGetLoading(true);
    setGetError(false);
    getDataSondaAPI(r)
      .then((dataSonda) => {
        setDataVis(
          dataSonda.datos.map(({ profundidad, trama }, i) => {
            const lastDatum = max(trama, (d) => new Date(d["fecha"])) || null;
            const invTrama: DatumSensor[] = [];
            for (let j = trama.length - 1; j >= 0; j--) {
              const datum = trama[j];
              invTrama.push({ ...datum, fecha: new Date(datum.fecha) });
            }
            return {
              profundidad,
              trama: invTrama,
              showSeries: true,
              lastDatum,
              color: coloresList[i],
            };
          })
        );
        setValores(dataSonda.parametros);
        setTimeRange(r);
        setGetLoading(false);
      })
      .catch((e) => {
        console.log("API Error", e);
        setGetLoading(false);
        setGetError(true);
      });
  }, []);

  useEffect(() => {
    getData({ startDate: moverFecha(new Date(), -7), endDate: new Date() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GraficasContext.Provider
      value={{
        timeRange,
        dataVis,
        sumaVis,
        parametros: valores,
        getData,
        getLoading,
        getError,
      }}
    >
      {props.children}
    </GraficasContext.Provider>
  );
}

export const useGraficasContext = () => useContext(GraficasContext);
