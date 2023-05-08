import { DataSensorType } from "../components/state-provider/SensoresProvider";

interface DataSensoresAPIType {
  dataSensores: DataSensorType[];
}

export const getSensoresAPI = () =>
  fetch("data-sensores.json").then<DataSensoresAPIType>((r) => r.json());

export const postSensoresAPI = async (data: DataSensoresAPIType) => ({
  status: "OK",
  payload: data,
});
