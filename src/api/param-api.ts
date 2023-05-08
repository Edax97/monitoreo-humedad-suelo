import { ParamsType } from "../components/state-provider/param-provider";

export const fetchParamsAPI = () =>
  fetch("data-params.json").then<ParamsType>((r) => r.json());

export const postParamsAPI = async (params: ParamsType) => ({
  status: "OK",
  payload: params,
});
