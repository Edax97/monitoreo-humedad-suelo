import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchDataHumedad } from "../../api/data-sonda-api";
import { moverFecha } from "../../api/utilities/date-utils";
import { max } from "d3";

export interface DatumHType {
  fecha: string;
  Nivel: number;
  "Humedad (%)": number;
}

export interface DataXY {
  time: any;
  h: number;
}

export interface SeriesVisType {
  level: number | string;
  color: string;
  data: DataXY[];
  lastDatum: Date | null;
}

export interface SondaType {
  level: number | string;
  show: boolean;
  color: string;
}

export interface VarHidraulType {
  cc: number;
  pmp: number;
}

interface Props {
  children: ReactNode;
}

interface GraficaContextType {
  timeRange: { startDate: Date; endDate: Date };
  dataVis: { series: SeriesVisType[]; suma: SeriesVisType };
  setTimeRange: (a: any) => any;
  sondas: SondaType[];
  setSondas: (a: any) => any;
  sumaSondas: SondaType;
  varHidraul: VarHidraulType;
  setVarHidraul: (a: any) => any;
}

const GraficaContext = createContext<GraficaContextType>(null!);

export function GraficaProvider(props: Props) {
  const [dataSondas, setDataHum] = useState<DatumHType[]>([]);
  useEffect(() => {
    //getDataHumedad().then((data) => setDataHum(data));
    fetchDataHumedad().then((data) => setDataHum(data));
  }, []);

  const [timeRange, setTimeRange] = useState({
    startDate: moverFecha(new Date(), -14),
    endDate: new Date(),
  });

  const [sondas, setSondas] = useState<SondaType[]>([
    { level: 30, show: true, color: "#E06469" },
    { level: 60, show: true, color: "#088395" },
  ]);
  const sumaSondas = useMemo(
    () => ({
      color: "#BE5A83",
      show: true,
      level: sondas
        .filter((s) => s.show)
        .map((s) => s.level)
        .join("+"),
    }),
    [sondas]
  );

  const dataFiltrada = useMemo(() => {
    return dataSondas.filter((d) => {
      const datum_time = new Date(d["fecha"]);
      const belongsRange =
        datum_time > timeRange.startDate && datum_time < timeRange.endDate;
      return belongsRange;
    });
  }, [dataSondas, timeRange]);

  const dataVis = useMemo(() => {
    const lastDatum = max(dataFiltrada, (d) => new Date(d["fecha"]));

    //dataVis = {30: [{x,y}], 60: [{x,y}], 'suma': [{x,y}]}
    const seriesVis = sondas
      .filter((s) => s.show)
      .map<SeriesVisType>((s) => ({
        level: s.level,
        color: s.color,
        data: [],
        lastDatum: lastDatum || null,
      }));
    const sumaVis: SeriesVisType = {
      level: sumaSondas.level,
      color: sumaSondas.color,
      data: [],
      lastDatum: lastDatum || null,
    };

    for (let j = dataFiltrada.length - 1; j >= 0; j--) {
      const datum = dataFiltrada[j];
      const datum_h = datum["Humedad (%)"];
      const datum_time = new Date(datum["fecha"]);
      //search datum.Nivel in SeriesVis and push in data
      const levelIndex = seriesVis.findIndex((l) => l.level === datum["Nivel"]);
      seriesVis[levelIndex]["data"].push({
        time: datum_time,
        h: datum_h,
      });

      //search for datum.fecha in sumaVis
      const timeIndex = sumaVis.data.findIndex(
        (index) => index.time.toString() === datum_time.toString()
      );
      if (timeIndex === -1) sumaVis.data.push({ time: datum_time, h: datum_h });
      else {
        sumaVis.data[timeIndex].h = parseFloat(
          (sumaVis.data[timeIndex].h + datum_h).toFixed(1)
        );
      }
    }

    return { series: seriesVis, suma: sumaVis };
  }, [dataFiltrada, sondas, sumaSondas]);

  const [varHidraul, setVarHidraul] = useState<VarHidraulType>({
    cc: 110,
    pmp: 80,
  });

  return (
    <GraficaContext.Provider
      value={{
        dataVis,
        timeRange,
        setTimeRange,
        sondas,
        setSondas,
        sumaSondas,
        varHidraul,
        setVarHidraul,
      }}
    >
      {props.children}
    </GraficaContext.Provider>
  );
}

export const useGraficaContext = () => useContext(GraficaContext);