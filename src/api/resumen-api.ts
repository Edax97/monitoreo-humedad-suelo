export interface ResumenType {
  plant_total: number;
  equipos_total: number;
  alertas_total: number;
}

interface ResponseType {
  status: boolean;
  data: ResumenType;
  mensaje: string;
}

export const getResumenAPI = (url: string, sedeId: string) =>
  fetch(url)
    .then<ResponseType>((res) => res.json())
    .then(({ status, data }) => {
      if (!status) throw Error("API Error");
      return data;
    });
