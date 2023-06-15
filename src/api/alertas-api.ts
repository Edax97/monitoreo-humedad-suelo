//const getAlertasURL = "api/alertas-data.json";

export interface AlertaAPIType {
  equipo: string;
  equipoId: string;
  campo: string;
  hora: string;
  ultimo_cambio: string;
  motivo: string;
  estado: string;
}

interface ResponseType {
  success: boolean;
  error: string;
  data: AlertaAPIType[];
}

export const getAlertasAPI = (url: string, tipo: string, sedeId: string) =>
  fetch(url)
    .then<ResponseType>((res) => res.json())
    .then((r) => {
      if (!r.success) throw Error("API error");
      return r.data;
    });
