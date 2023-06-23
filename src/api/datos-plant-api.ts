import { postMethod } from "./methods";

export interface DatosPlantType {
  plant_empresa: string;
  plant_cultivo: string;
  plant_variedad: string;
  plant_area: string;
  plant_imei: string;
  plant_sistema_riego: string;
  plant_fecha_inicio: string;
  plant_edad_cultivo: string;
  plant_coordenadas: string;
}

interface ResponseType {
  status: boolean;
  code: string;
  msg: string;
  data: DatosPlantType;
}

export const getDatosPlantAPI = (api_url: string, imei: string) =>
  postMethod<ResponseType>(
    `${process.env.REACT_APP_API_URL}/${api_url}?imei=${imei}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
