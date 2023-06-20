export interface SensorType {
  sensor_nombre: string;
  sensor_profundidad: string;
  sensor_estado: string;
  sensor_humedad: string;
  sensor_temperatura: string;
  sensor_conductividad: string;
  sensor_ph: string;
  sensor_potasio: string;
  sensor_sodio: string;
  sensor_fosforo: string;
  sensor_bateria: string;
  sensor_estado_descripcion: string;
  sensor_fecha: string;
}
interface EquipoType {
  modem_id: number;
  modem_nombrepunto: string;
  modem_imei: number;
  sensor_Lista: SensorType[];
}
interface PuntoType {
  punto_id: number;
  punto_lon: string;
  punto_lat: string;
}
export interface PlantacionType {
  plant_id: string;
  plant_coordenadas: string;
  lista_puntos: PuntoType[];
  lista_equipos: EquipoType[];
}

interface ResponseType {
  status: boolean;
  code: number;
  data: PlantacionType[];
  mssg: string;
}

export const getPlantListAPI = (url: string, sedeId: string) =>
  fetch(url)
    .then<ResponseType>((res) => res.json())
    .then(({ status, data }) => {
      if (!status) throw Error("API Error");
      return data;
    });
