import { max, timeFormat } from "d3";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { fetchDataSondaAPI, ParametrosType } from "../../api/data-sonda-api";
import { coloresList } from "../../api/utilities/colores";

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
  lastDatum: Date | null;
  showSeries: boolean;
  color: string;
}

export type RangeType = { startDate: Date; endDate: Date };

interface GraficaContextType {
  timeRange: RangeType | null;
  dataVis: SeriesVisType[];
  sumaVis: SeriesVisType | null;
  parametros: ParametrosType | null;
  getData: (range: RangeType) => any;
  reloadData: () => any;
  getLoading: boolean;
  getError: boolean;
}

const GraficasContext = createContext<GraficaContextType>(null!);

interface Props {
  children: ReactNode;
}
export default function GraficasProvider(props: Props) {
  const [timeRange, setTimeRange] = useState<RangeType | null>(null);
  //const [maxTimeRange, setMaxTimeRange] = useState<Range>(null);

  //const [dataSonda, setDataSonda] = useState<DataSondaType | null>(null);
  const [dataVis, setDataVis] = useState<SeriesVisType[]>([]);

  const [valores, setValores] = useState<ParametrosType | null>(null);

  const [getLoading, setGetLoading] = useState(false);
  const [getError, setGetError] = useState(false);

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
        aprovechable: +aprovechable.toFixed(1),
        raprovechable: +raprovechable.toFixed(1),
      };
    });
    return {
      profundidad: sumaProfundidad,
      showSeries: true,
      color: coloresList[5],
      lastDatum: firstSensor.lastDatum,
      trama: tramaSuma,
    };
  }, [dataVis]);

  const getData = useCallback((r: RangeType) => {
    if (!r) return;

    console.log("API request", new Date());

    setGetLoading(true);
    setGetError(false);
    const desde = `${timeFormat("%Y-%m-%d")(r.startDate)} 00:00:00`;
    const hasta = `${timeFormat("%Y-%m-%d")(r.endDate)} 23:59:59`;

    fetchDataSondaAPI(desde, hasta)
      .then((dataSonda) => {
        setGetLoading(false);
        setDataVis(
          dataSonda.datos.map(({ profundidad, trama }, i) => {
            const lastDatum = new Date(trama[0].fecha);
            const invTrama: DatumSensor[] = [];
            for (let j = 0; j < trama.length; j++) {
              const datum = trama[j];
              invTrama.push({
                ...datum,
                fecha: new Date(datum.fecha),
                aprovechable: +(+datum.aprovechable).toFixed(1),
                raprovechable: +(+datum.raprovechable).toFixed(1),
              });
            }
            return {
              profundidad: `${(+profundidad).toFixed(0)}`,
              trama: invTrama,
              showSeries: true,
              lastDatum,
              color: coloresList[i],
            };
          })
        );
        setValores(dataSonda.parametros);
        setTimeRange({ startDate: new Date(desde), endDate: new Date(hasta) });

        console.log("Response received.", new Date());
      })
      .catch((e) => {
        console.log("API Error", e);
        setGetLoading(false);
        setGetError(true);
      });
  }, []);

  const reloadData = useCallback(() => {
    if (!timeRange) return;
    getData(timeRange);
  }, [timeRange, getData]);

  return (
    <GraficasContext.Provider
      value={{
        timeRange,
        dataVis,
        sumaVis,
        parametros: valores,
        getData,
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
