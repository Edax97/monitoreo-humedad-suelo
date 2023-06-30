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

export const getParamsConfigURL = "api/params-data.json";
export const updateParamsConfigURL =
  "api/consultas/modem/configuracion_sensores";

export const getParamsConfigAPI = (api_url: string, modemId: string) =>
  fetch(api_url)
    .then<ResponseType>((res) => res.json())
    .then(({ status, data }) => {
      if (!status) throw Error("API Error");
      return data;
    });
