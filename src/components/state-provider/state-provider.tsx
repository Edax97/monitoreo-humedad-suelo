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
}

export interface SondaType {
  level: number;
  show: boolean;
  color: string;
}

interface Props {
  children: ReactNode;
}

const StateContext = createContext<any>(null);

export function StateProvider(props: Props) {
  const [dataHum, setDataHum] = useState<DatumHType[]>([]);
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
    return dataHum.filter((d) => {
      /* for (const s in sondas) {
        if (s.level == d["Nivel"]) return s.show;
      } */
      return false;
    });
  }, [dataHum, timeRange, sondas]);

  const dataVis = useMemo(() => dataHum, [dataHum]);

  const [varHidraul, setVarHidraul] = useState({ cc: 120, pmp: 40 });

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
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
