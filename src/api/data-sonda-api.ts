import {
  DatumSensor,
  RangeType,
} from "../components/state-provider/GraficasProvider";

interface DataSensorType {
  sensor: string;
  profundidad: number;
  trama: DatumSensor[];
}
export interface ParametrosType {
  [key: string]: number;
}

export interface GetDataType {
  success: boolean;
  datos: DataSensorType[];
  totales: DatumSensor[];
  error: string;
  parametros: ParametrosType;
}

export const getDataSondaAPI = (r: RangeType) =>
  fetch(`data-model.json`).then<GetDataType>((res) => res.json());

export const fetchDataSondaAPI = (
  sondaAPI: string,
  imei: string,
  desde: string,
  hasta: string
) => {
  return fetch(`https://saphy-iot.com/api/${sondaAPI}/${imei}`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      desde: desde,
      hasta: hasta,
      cant_registro: 0,
    }),
  })
    .then<GetDataType>((res) => res.json())
    .then((r) => {
      if (!r.success) throw Error("API error");
      return r;
    });
};
