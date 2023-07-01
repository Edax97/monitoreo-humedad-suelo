//const getAlertasURL = "api/alertas-data.json";

import { postMethod, putMethod } from "./methods";

export interface PlantConfigType {
  campo_id: string;
  sede_id: string;
  campo_empresa: string;
  campo_cultivo: string;
  campo_variedad: string;
  campo_area: string;
  sistema_riego: string;
  fecha_inicio: string;
  edad_cultivo: string;
  coordenadas: string;
  [key: string]: string;
}

interface ResponseType {
  status: boolean;
  msg: string;
  data: PlantConfigType;
  code: string;
}

export const getPlantConfigURL = "api/consultas/plantacion/detalle_campo";
export const updatePlantConfigURL = "api/consultas/plantacion/detalle_campo";

export const getPlantConfigAPI = (api_url: string, plantId: string) =>
  postMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${api_url}?id_plantacion=${plantId}`
  ).then((r) => {
    if (!r.status) throw Error("API error");
    return r.data;
  });

export const updatePlantConfigAPI = (plantConfig: PlantConfigType) => {
  const body: ResponseType = {
    status: true,
    code: "200",
    msg: "",
    data: plantConfig,
  };
  return putMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${updatePlantConfigURL}`,
    body
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
};
