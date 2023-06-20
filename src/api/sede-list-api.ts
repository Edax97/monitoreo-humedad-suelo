export interface SedeType {
  sedeId: string;
  sedeName: string;
}
interface ResponseType {
  status: boolean;
  data: SedeType[];
  mensaje: string;
}

export const getSedeListAPI = (url: string, masterId: string) =>
  fetch(url)
    .then<ResponseType>((res) => res.json())
    .then(({ status, data }) => {
      if (!status) throw Error("API Error");
      return data;
    });
