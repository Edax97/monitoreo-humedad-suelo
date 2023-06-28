//const getAlertasURL = "api/alertas-data.json";

export interface PlantConfigType {
  campo_id: string;
  campo_name: string;
  sede_id: string;
  campo_empresa: string;
  cultivo: string;
  variedad: string;
  area: string;
  sistema_riego: string;
  fecha_inicio: string;
  edad_cultivo: string;
  coordenadas: string;
  prof_raiz: string;
  capacidad_campo: string;
  pmp: string;
  densidad_ap: string;
  const_agotamiento: string;
  [key: string]: string;
}

interface ResponseType {
  status: boolean;
  msg: string;
  data: PlantConfigType;
  code: string;
}

export const getPlantConfigAPI = (url: string, plantId: string) =>
  fetch(url)
    .then<ResponseType>((res) => res.json())
    .then((r) => {
      if (!r.status) throw Error("API error");
      return r.data;
    });
