import { DatumSensor } from "../state-provider/GraficasProvider";
import { postMethod } from "./methods";

interface DataSensorType {
  sensor: string;
  profundidad: number;
  trama: DatumSensor[];
}

interface ResponseType {
  status: boolean;
  code: number;
  data: DataSensorType[];
  msg: string;
}

export const getDataGraficaAPI = (
  api_url: string,
  modemId: string,
  desde: string,
  hasta: string
) =>
  postMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${api_url}?fecha_inicio=${desde}&fecha_final=${hasta}&numero_dias=&id_modem=${modemId}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
