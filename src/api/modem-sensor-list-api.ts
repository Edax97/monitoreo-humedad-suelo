import { postMethod } from "./methods";

export interface SensorType {
  sensor_nombre: string;
  sensor_profundidad: string;
  sensor_estado: string;
  sensor_humedad: string;
  sensor_temperatura: string;
  sensor_conductividad: string;
  sensor_ph: string;
  sensor_potasio: string;
  sensor_sodio: string;
  sensor_fosforo: string;
  sensor_bateria: string;
  sensor_estado_descripcion: string;
  sensor_fecha: string;
}

interface ModemType {
  modem_id: number;
  modem_nombrepunto: string;
  modem_imei: number;
  sensor_Lista: SensorType[];
}
interface ResponseType {
  status: boolean;
  code: number;
  data: ModemType;
  msg: string;
}

export const getModemSensoresAPI = (api_url: string, modemId: string) =>
  postMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${api_url}?id_modem=${modemId}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
