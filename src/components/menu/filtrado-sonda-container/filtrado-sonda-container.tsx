import React, { useCallback } from "react";
import {
  useStateContext,
  SondaType,
} from "../../state-provider/state-provider";
import { FiltradoSonda } from "../filtrado-sonda-component/filtrado-sonda";

export default function FiltradoSondaContainer() {
  const { sondas, setSondas } = useStateContext();
  const toggleSonda = useCallback(
    (level: number) => {
      setSondas(
        sondas.map((sonda: SondaType) => {
          if (sonda.level === level) return { ...sonda, show: !sonda.show };
          return sonda;
        })
      );
    },
    [sondas, setSondas]
  );
  return <FiltradoSonda sondas={sondas} toggleSonda={toggleSonda} />;
}
