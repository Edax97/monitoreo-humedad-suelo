import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { fetchParamsAPI, postParamsAPI } from "../../api/param-api";

export interface ParamsType {
  profRaiz: number;
  cc: number;
  pmp: number;
  dap: number;
  kAgotam: number;
  [key: string]: number;
}

export interface ParamsContextType {
  initialParams: ParamsType | null;
  params: ParamsType | null;
  updateParams: (key: string, value: any) => any;
  fetchParams: () => any;
  postParams: () => any;
  cancelParams: () => any;
  fetchLoading: boolean;
  postLoading: boolean;
  postError: boolean;
}

const ParamsContext = createContext<ParamsContextType>(null!);

interface Props {
  children: ReactNode;
}

export default function ParamProvider(props: Props) {
  const [params, setParams] = useState<ParamsType | null>(null);
  const [initialParams, setInitialParams] = useState<ParamsType | null>(null);

  const [fetchLoading, setFetchLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [postError, setPostError] = useState(false);

  const updateParams = (key: string, value: any) =>
    setParams((p) => {
      if (!p) return p;
      return { ...p, [key]: +value };
    });

  const fetchParams = () => {
    setFetchLoading(true);
    fetchParamsAPI().then((data) => {
      console.log("Fetch data", data);
      setInitialParams(data);
      setParams(data);
      setFetchLoading(false);
    });
  };
  const postParams = () => {
    if (params === null) return;
    setPostLoading(true);
    postParamsAPI(params).then((r) => {
      console.log("Post data", r);
      setPostLoading(false);
    });
  };

  const cancelParams = useCallback(
    () => setParams(initialParams),
    [initialParams]
  );

  return (
    <ParamsContext.Provider
      value={{
        initialParams,
        params,
        updateParams,
        fetchParams,
        postParams,
        cancelParams,
        fetchLoading,
        postLoading,
        postError,
      }}
    >
      {props.children}
    </ParamsContext.Provider>
  );
}

export const useParamsContext = () => useContext(ParamsContext);
