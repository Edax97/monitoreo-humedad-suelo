import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getDataHumedad } from "../../api/data-humedad";
import { moverFecha } from "../../api/utilities/date-utils";

export interface DatumHType {
  fecha: string;
  Nivel: number;
  "Humedad (%)": number;
}

export interface DataXY {
  time: any;
  h: number;
}

export interface DatumVisType {
  level: number | "suma";
  color: string;
  data: DataXY[];
}

export interface SondaType {
  level: number;
  show: boolean;
  color: string;
}

interface VarHidraulType {
  cc: number;
  pmp: number;
}

interface Props {
  children: ReactNode;
}

interface StateContextType {
  dataVis: DatumVisType[];
  timeRange: any;
  setTimeRange: (a: any) => any;
  sondas: SondaType[];
  setSondas: (a: any) => any;
  varHidraul: VarHidraulType;
  setVarHidraul: (a: any) => any;
}

const StateContext = createContext<StateContextType>(null!);

export function StateProvider(props: Props) {
  const [dataSondas, setDataHum] = useState<DatumHType[]>([]);
  useEffect(() => {
    getDataHumedad().then((data) => setDataHum(data));
  }, []);

  const [timeRange, setTimeRange] = useState<any>({
    startDate: moverFecha(new Date(), -14),
    endDate: new Date(),
  });

  const [sondas, setSondas] = useState<SondaType[]>([
    { level: 30, show: true, color: "#05BFDB" },
    { level: 60, show: true, color: "#0A4D68" },
  ]);

  const dataFiltrada = useMemo(() => {
    return dataSondas
      .filter((d) => {
        const s_found = sondas.find((s) => s.level === d["Nivel"]);
        return s_found?.show;
      })
      .slice(0, 300);
  }, [dataSondas, sondas]);

  const dataVis = useMemo(() => {
    //dataVis = {30: [{x,y}], 60: [{x,y}], 'suma': [{x,y}]}
    const dataVisT = sondas
      .filter((s) => s.show)
      .map<DatumVisType>((s) => ({ level: s.level, color: s.color, data: [] }))
      .concat({ level: "suma", data: [], color: "black" });

    dataFiltrada.forEach((datum) => {
      //search datum.level in dataVisT and push in data
      const levelIndex = dataVisT.findIndex((l) => l.level === datum["Nivel"]);
      dataVisT[levelIndex]["data"].push({
        time: datum["fecha"],
        h: datum["Humedad (%)"],
      });
    });
    return dataVisT;
  }, [dataFiltrada, sondas]);

  const [varHidraul, setVarHidraul] = useState<VarHidraulType>({
    cc: 120,
    pmp: 40,
  });

  return (
    <StateContext.Provider
      value={{
        dataVis,
        timeRange,
        setTimeRange,
        sondas,
        setSondas,
        varHidraul,
        setVarHidraul,
      }}
    >
      {props.children}
      <div>DATA HUMEDAD FILTRADA</div>
      <div className="mt-5">
        {dataFiltrada.slice(0, 100).map((d) => (
          <div
            key={`${d.fecha}-${d.Nivel}`}
          >{`${d.Nivel}  |  ${d.fecha}  |  ${d["Humedad (%)"]}`}</div>
        ))}
      </div>
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
