import { getMethod, postMethod } from "./methods";

export interface ModemType {
  modem_id: number;
  modem_nombrepunto: string;
  modem_longitud: string;
  modem_latitud: string;
  modem_imei: number;
}

interface PuntoType {
  punto_id: number;
  punto_lon: string;
  punto_lat: string;
}
export interface PlantacionType {
  plant_id: number;
  plant_coordenadas: string;
  plant_nombre: string;
  lista_puntos: PuntoType[];
  lista_modems: ModemType[];
}

interface ResponseType {
  status: boolean;
  code: number;
  data: PlantacionType[];
  msg: string;
}

export const getPlantListLocal = (url: string, sedeId: string) =>
  getMethod<ResponseType>(url).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });

export const getPlantListAPI = (api_url: string, sedeId: string) =>
  postMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${api_url}?id_sede=${sedeId}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
