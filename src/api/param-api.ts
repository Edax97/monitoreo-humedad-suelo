import { ParamsType } from "../components/state-provider/param-provider";

interface ParamsAPIType {
  success: boolean;
  error: string;
  datos: ParamsType[];
}

const paramsURL = "https://saphy-iot.com/api/consultaParametros/1";

export const fetchParamsAPI = () =>
  fetch(paramsURL)
    .then<ParamsAPIType>((r) => r.json())
    .then((d) => d.datos[0]);

export const postParamsAPI = async (params: ParamsType) => ({
  status: "OK",
  payload: params,
});
