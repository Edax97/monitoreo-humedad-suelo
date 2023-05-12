import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { getSensoresAPI, postSensoresAPI } from "../../api/sensores-api";

export interface DataSensorType {
  codigo: number;
  idpunto: number;
  nombre: string;
  profundidad: string;
}

interface SensoresContextType {
  dataSensores: DataSensorType[];
  initialDataSensores: DataSensorType[];
  getSensores: () => any;
  postSensores: () => any;
  updateSensores: (codigo: number, prof: string) => any;
  cancelSensores: () => any;
  getLoading: boolean;
  postLoading: boolean;
  postError: boolean;
}

const SensoresContext = createContext<SensoresContextType>(null!);

interface Props {
  children: ReactNode;
}
export default function SensoresProvider(props: Props) {
  const [dataSensores, setDataSensores] = useState<DataSensorType[]>([]);
  const [initialDataSensores, setInitialDataSensores] = useState<
    DataSensorType[]
  >([]);
  const [getLoading, setGetLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);

  const getSensores = useCallback(() => {
    setGetLoading(true);
    getSensoresAPI()
      .then((data) => data.datos)
      .then((sensores) => {
        setDataSensores(sensores);
        setInitialDataSensores(sensores);
        setGetLoading(false);
      });
  }, []);
  const postSensores = useCallback(() => {
    setPostLoading(true);
    setPostError(false);
    postSensoresAPI({ datos: dataSensores }).then((r) => {
      console.log("POST", console.log(r.payload));
      setPostLoading(false);
    });
  }, [dataSensores]);

  const updateSensores = useCallback((codigo: number, profundidad: string) => {
    setDataSensores((sensores) =>
      sensores.map((s) => (s.codigo === codigo ? { ...s, profundidad } : s))
    );
  }, []);

  const cancelSensores = useCallback(
    () => setDataSensores(initialDataSensores),
    [initialDataSensores]
  );

  return (
    <SensoresContext.Provider
      value={{
        dataSensores,
        initialDataSensores,
        getSensores,
        postSensores,
        updateSensores,
        cancelSensores,
        getLoading,
        postLoading,
        postError,
      }}
    >
      {props.children}
    </SensoresContext.Provider>
  );
}

export const useSensoresContext = () => useContext(SensoresContext);
