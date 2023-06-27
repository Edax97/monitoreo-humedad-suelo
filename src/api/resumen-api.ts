import { postMethod } from "./methods";

export interface ResumenType {
  conteo_plantaciones: number;
  conteo_equipos: number;
  conteo_alertas: number;
}

interface ResponseType {
  status: boolean;
  code: string;
  data: ResumenType;
  msg: string;
}

export const getResumenLocal = (url: string, sedeId: string) =>
  fetch(url)
    .then<ResponseType>((res) => res.json())
    .then(({ status, data }) => {
      if (!status) throw Error("API Error");
      return data;
    });

export const getResumenAPI = (api_url: string, sedeId: string) =>
  postMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${api_url}?id_sede=${sedeId}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
