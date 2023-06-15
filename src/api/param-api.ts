import { ParamsType } from "../state-provider/param-provider";

interface ParamsDataType {
  success: boolean;
  error: string;
  datos: ParamsType[];
}
interface ParamsResType {
  success: boolean;
  error: string;
  datos: null;
}

const paramsGetURL = "https://saphy-iot.com/api/consultaParametros/1";
const paramsPostURL = "https://saphy-iot.com/api/parametro/actualizar/1";

export const fetchParamsAPI = () =>
  fetch(paramsGetURL)
    .then<ParamsDataType>((r) => r.json())
    .then((d) => d.datos[0]);

export const postParamsAPI = (params: ParamsType) =>
  fetch(paramsPostURL, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then<ParamsResType>((r) => r.json());
