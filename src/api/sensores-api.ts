import { DataSensorType } from "../components/state-provider/SensoresProvider";

const sensoresURL =
  "https://saphy-iot.com/api/consultaSensores/863192058179590";

interface GetSensoresAPIType {
  success: boolean;
  error: string;
  datos: DataSensorType[];
}

interface PostSensoresAPIType {
  datos: DataSensorType[];
}

export const getSensoresAPI = () =>
  fetch(sensoresURL).then<GetSensoresAPIType>((r) => r.json());

export const postSensoresAPI = async (data: PostSensoresAPIType) => ({
  status: "OK",
  payload: data,
});
