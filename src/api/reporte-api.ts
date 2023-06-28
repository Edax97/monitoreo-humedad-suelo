import { postMethod } from "./methods";

interface ReporteDatumType {
  humedad: string;
  aprovechable: string;
  raprovechable: string;
  fecha: string;
  cm: string;
  temperatura: string;
  conductividad: string;
  pH: string;
  potasio: string;
  sodio: string;
  fosforo: string;
}
export interface ReporteSensorType {
  sensor: number;
  profundidad: string;
  trama: ReporteDatumType[];
}

interface ResponseType {
  status: boolean;
  code: number;
  data: ReporteSensorType[];
  item_count: number;
  actual_page: number;
  pages_count: number;
  msg: string;
}

export const getReporteAPI = (
  api_url: string,
  modemId: string,
  desde: string,
  hasta: string,
  pagina: number
) =>
  postMethod<ResponseType>(
    `${
      process.env.REACT_APP_API_URL
    }/${api_url}?fecha_inicio=${desde}&fecha_final=${hasta}&numero_dias=&id_modem=${modemId}&modo_paginacion=${1}&numero_pagina=${pagina}`
  ).then((res) => {
    if (!res.status) throw Error("API Error");
    return res;
  });
