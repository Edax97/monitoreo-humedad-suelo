import React, { useEffect, useState } from "react";
import { useStateContext } from "../../state-provider/state-provider";
import { SelectValHidraul } from "../select-val-hidraul-component/select-val-hidraul";

export default function SelectValHidraulContainer() {
  const { varHidraul, setVarHidraul } = useStateContext();

  const [cc, setCC] = useState(120);
  const [pmp, setPMP] = useState(40);

  useEffect(() => {
    setCC(setVarHidraul.cc);
    setPMP(setVarHidraul.pmp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = () => {
    setVarHidraul({ cc, pmp });
  };

  const updateCC = (v: number) => {
    if (v > 0) setCC(v);
  };
  const updatePMP = (v: number) => {
    if (v > 0) setPMP(v);
  };

  return (
    <SelectValHidraul
      cc={varHidraul.cc}
      pmp={varHidraul.pmp}
      updateCC={updateCC}
      updatePMP={updatePMP}
      select={select}
    />
  );
}
