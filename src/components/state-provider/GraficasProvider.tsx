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
import { moverFecha } from "../../api/utilities/date-utils";

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
    const lastDatum = max(firstSensor.trama, (d) => d["fecha"]) || null;

    const sumaProfundidad = dataVis.map((s) => s.profundidad).join("+");

    const tramaSuma = firstSensor.trama.map((datum) => {
      let [Humedad, aprovechable, raprovechable] = [0, 0, 0];
      dataVis.forEach((sensor) => {
        const datumSensor = sensor.trama.find(
          (d) => d.fecha.toString() === datum.fecha.toString()
        );
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
      lastDatum,
      trama: tramaSuma,
    };
  }, [dataVis]);

  const getData = useCallback((r: RangeType) => {
    if (!r) return;
    setGetLoading(true);
    setGetError(false);
    const desde = `${timeFormat("%Y-%m-%d")(r.startDate)} 00:00:00`;
    const hasta = `${timeFormat("%Y-%m-%d")(
      moverFecha(r.endDate, 1)
    )} 00:00:00`;

    fetchDataSondaAPI(desde, hasta)
      .then((dataSonda) => {
        setGetLoading(false);
        setDataVis(
          dataSonda.datos.map(({ profundidad, trama }, i) => {
            const lastDatum = max(trama, (d) => new Date(d["fecha"])) || null;
            const invTrama: DatumSensor[] = [];
            for (let j = trama.length - 1; j >= 0; j--) {
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
      })
      .catch((e) => {
        console.log("API Error", e);
        setGetLoading(false);
        setGetError(true);
      });
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
