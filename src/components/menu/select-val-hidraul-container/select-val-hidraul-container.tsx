import React, { useEffect, useState } from "react";
import {
  useStateContext,
  VarHidraulType,
} from "../../state-provider/state-provider";
import { SelectValHidraul } from "../select-val-hidraul-component/select-val-hidraul";

export default function SelectValHidraulContainer() {
  const { varHidraul, setVarHidraul } = useStateContext();
  const [varHidraulT, setVarHidraulT] = useState<VarHidraulType>({
    cc: 0,
    pmp: 0,
  });

  useEffect(() => {
    setVarHidraulT(varHidraul);
  }, [varHidraul]);

  const updateCC = (v: number) => {
    if (v < 500 && v >= 0) setVarHidraulT((s: any) => ({ ...s, cc: v }));
  };
  const updatePMP = (v: number) => {
    if (v >= 0 && v < 500) setVarHidraulT((s: any) => ({ ...s, pmp: v }));
  };

  const select = () => {
    if (varHidraulT.cc < varHidraulT.pmp) return;
    setVarHidraul(varHidraulT);
  };
  const cancel = () => {
    setVarHidraulT(varHidraul);
  };

  return (
    <SelectValHidraul
      cc={varHidraulT.cc}
      pmp={varHidraulT.pmp}
      updateCC={updateCC}
      updatePMP={updatePMP}
      select={select}
      cancel={cancel}
    />
  );
}
