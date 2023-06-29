import { postMethod, putMethod } from "./methods";

interface SensorConfigType {
  sensor_nombre: string;
  sensor_id: string;
  sensor_prof: string;
  hume_max: string;
  hume_min: string;
  temp_max: string;
  temp_min: string;
  ph_max: string;
  ph_min: string;
  conduc_max: string;
  conduc_min: string;
  pot_max: string;
  pot_min: string;
  sod_max: string;
  sod_min: string;
  fos_max: string;
  fos_min: string;
  [key: string]: string;
}
export interface ModemConfigType {
  modem_id: string;
  modem_nombre: string;
  campo_id: string;
  sede_id: string;
  modem_imei: string;
  sensores: SensorConfigType[];
  [key: string]: any;
}

interface ResponseType {
  status: boolean;
  code: string;
  data: ModemConfigType;
  msg: string;
}

export const getModemConfigURL = "api/consultas/modem/configuracion_sensores";
export const updateModemConfigURL =
  "api/consultas/modem/configuracion_sensores";

export const getModemConfigAPI = (api_url: string, modemId: string) =>
  postMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${api_url}?id_modem=${modemId}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });

export const updateModemConfigAPI = (modemConfig: ModemConfigType) => {
  const body: ResponseType = {
    status: true,
    code: "200",
    msg: "",
    data: modemConfig,
  };
  return putMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${updateModemConfigURL}`,
    body
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
};
