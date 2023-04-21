import React from "react";
import { useStateContext } from "../../state-provider/state-provider";
import { SelectValHidraul } from "../select-val-hidraul-component/select-val-hidraul";

export default function SelectValHidraulContainer() {
  const { varHidraul, setVarHidraul } = useStateContext();

  const select = () => {
    //setVarHidraul({ cc, pmp });
  };

  const updateCC = (v: number) => {
    if (v < 500 && v > 0) setVarHidraul({ cc: v });
  };
  const updatePMP = (v: number) => {
    if (v > 0 && v < 500) setVarHidraul({ pmp: v });
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
