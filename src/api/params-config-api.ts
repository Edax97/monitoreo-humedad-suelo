import { postMethod, putMethod } from "./methods";

export interface ParamsConfigType {
  prof_raiz: string;
  capacidad_campo: string;
  pmp: string;
  densidad_ap: string;
  const_agotamiento: string;
  [key: string]: string;
}

interface ResponseType {
  status: boolean;
  code: string;
  data: ParamsConfigType;
  msg: string;
}

export const getParamsConfigURL = "api/consultas/modem/detalle_parametros";
export const updateParamsConfigURL = "api/consultas/modem/detalle_parametros";

export const getParamsConfigAPI = (api_url: string, modemId: string) =>
  postMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${api_url}?id_modem=${modemId}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });

export const updateParamsConfigAPI = (
  params: ParamsConfigType,
  modemId: string
) => {
  return putMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${updateParamsConfigURL}?id_modem=${modemId}&profundidad=${params.prof_raiz}&capacidad=${params.capacidad_campo}&pmp_campo=${params.pmp}&densidad=${params.densidad_ap}&agotamiento=${params.const_agotamiento}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
};
