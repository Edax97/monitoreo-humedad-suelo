import { DatumHType } from "../components/state-provider/state-provider";
import dataSondas from "../data_sonda.json";

export const getDataHumedad = async () => {
  return dataSondas;
};

export const fetchDataHumedad = () =>
  fetch("data_sonda.json").then<DatumHType[]>((res) => res.json());
