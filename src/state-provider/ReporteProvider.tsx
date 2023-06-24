import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";

import React from "react";
import { extendRangeArray } from "../api/utilities/date-utils";

export type RangeType = [Date, Date] | null;
interface CampoType {
  id: string;
  name: string;
}
interface EquipoType {
  id: string;
  name: string;
}

interface ReporteContextType {
  timeRange: RangeType;
  updateTimeRange: (r: RangeType) => void;
  plantSelected: CampoType | null;
  equipoSelected: EquipoType | null;
  setPlantSelected: Dispatch<SetStateAction<CampoType | null>>;
  setEquipoSelected: Dispatch<SetStateAction<EquipoType | null>>;
}

const ReporteContext = createContext<ReporteContextType>(null!);
export const useReporteContext = () => useContext(ReporteContext);

interface Props {
  children: ReactNode;
}
export default function ReporteProvider({ children }: Props) {
  const [timeRange, setTimeRange] = useState<RangeType>(null);
  const [plantSelected, setPlantSelected] = useState<CampoType | null>(null);
  const [equipoSelected, setEquipoSelected] = useState<EquipoType | null>(null);

  const updateTimeRange = useCallback((r: RangeType) => {
    if (!r) return;
    setTimeRange(extendRangeArray(r));
  }, []);

  return (
    <ReporteContext.Provider
      value={{
        timeRange,
        plantSelected,
        equipoSelected,
        updateTimeRange,
        setPlantSelected,
        setEquipoSelected,
      }}
    >
      {children}
    </ReporteContext.Provider>
  );
}
