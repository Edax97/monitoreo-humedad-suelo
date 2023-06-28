//const getAlertasURL = "api/alertas-data.json";

export interface AlertaAPIType {
  sensor_name: string;
  modem_name: string;
  plant_name: string;
  hora: string;
  motivo: string;
  estado: string;
  temp: string;
  hume: string;
  ph: string;
}

interface ResponseType {
  success: boolean;
  error: string;
  data: AlertaAPIType[];
}

export const getAlertasAPI = (url: string, sedeId: string) =>
  fetch(url)
    .then<ResponseType>((res) => res.json())
    .then((r) => {
      if (!r.success) throw Error("API error");
      return r.data;
    });
