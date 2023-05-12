import { DatumHType } from "../components/state-provider/GraficaProvider";
import { RangeType } from "../components/state-provider/GraficasProvider";

interface DatumSensorAPI {
  humedad: number;
  aprovechable: number;
  raprovechable: number;
  fecha: string;
  cm: number;
  temepratura: number;
  conductividad: number;
  ph: number;
}
interface DataSensorType {
  sensor: string;
  profundidad: number;
  trama: DatumSensorAPI[];
}
export interface ParametrosType {
  [key: string]: number;
}

interface GetDataType {
  success: boolean;
  datos: DataSensorType[];
  error: string;
  parametros: ParametrosType;
}

export const fetchDataHumedad = () =>
  fetch("data_sonda.json").then<DatumHType[]>((res) => res.json());

export const getDataSondaAPI = (r: RangeType) =>
  fetch(`data-model.json`).then<GetDataType>((res) => res.json());
