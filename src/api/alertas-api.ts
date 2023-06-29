//const getAlertasURL = "api/alertas-data.json";

import { postMethod } from "./methods";

export interface AlertaAPIType {
  alerta_id: string;
  sensor_nombre: string;
  modem_nombre: string;
  plantacion_nombre: string;
  alerta_hora: string;
  alerta_motivo: string;
  alerta_estado: string;
  alerta_temp: string;
  alerta_hume: string;
  alerta_ph: string;
  alerta_conduc: string;
  alerta_pot: string;
  alerta_sod: string;
  alerta_fos: string;
}

interface ResponseType {
  status: boolean;
  code: string;
  msg: string;
  data: AlertaAPIType[];
}

export const getAlertasURL = "api/consultas/alertas/lista";

export const getAlertasLocal = (url: string, sedeId: string) =>
  fetch(url)
    .then<ResponseType>((res) => res.json())
    .then((r) => {
      if (!r.status) throw Error("API error");
      return r.data;
    });

export const getAlertasAPI = (api_url: string, sedeId: string) =>
  postMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${api_url}?id_sede=${sedeId}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
