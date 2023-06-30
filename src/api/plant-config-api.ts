//const getAlertasURL = "api/alertas-data.json";

export interface PlantConfigType {
  campo_id: string;
  sede_id: string;
  campo_empresa: string;
  cultivo: string;
  variedad: string;
  area: string;
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

export const getPlantConfigURL = "api/plantacion-data.json";

export const getPlantConfigAPI = (url: string, plantId: string) =>
  fetch(url)
    .then<ResponseType>((res) => res.json())
    .then((r) => {
      if (!r.status) throw Error("API error");
      return r.data;
    });
