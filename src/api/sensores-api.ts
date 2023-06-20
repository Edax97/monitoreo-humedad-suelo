import { DataSensorType } from "../state-provider/SensoresProvider";

const sensoresURL =
  "https://saphy-iot.com/api/consultaSensores/863192058179590";

const sensoresPostURL = "https://saphy-iot.com/api/sensor/actualizar";

interface GetSensoresAPIType {
  success: boolean;
  error: string;
  datos: DataSensorType[];
}

interface PostSensoresAPIType {
  datos: DataSensorType[];
}

export const getSensoresAPI = () =>
  fetch(sensoresURL)
    .then<GetSensoresAPIType>((r) => r.json())
    .then(({ success, datos }) => {
      if (!success) throw Error("API Error");
      return datos;
    });

export const postSensoresAPI = (data: PostSensoresAPIType) => {
  return Promise.all(
    data.datos.map((sensor) =>
      fetch(`${sensoresPostURL}/${sensor.codigo}`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: "x",
          profundidad: +sensor.profundidad,
        }),
      })
    )
  );
};
