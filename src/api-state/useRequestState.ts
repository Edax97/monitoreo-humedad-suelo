import { useCallback, useState } from "react";

type CbAsyncType<T> = (...args: any[]) => Promise<T>;
export const useRequestState = <T>(cb: CbAsyncType<T>) => {
  const [reqState, setReqState] = useState({
    loading: false,
    error: false,
    success: false,
  });
  const onRequest = useCallback(
    (...args: any[]) => {
      setReqState((s) => ({
        ...s,
        loading: true,
        error: false,
        success: false,
      }));
      cb(...args)
        .then(() => {
          setReqState((s) => ({ ...s, loading: false, success: true }));
        })
        .catch(() =>
          setReqState((s) => ({ ...s, loading: false, error: true }))
        );
    },
    [cb]
  );

  return { reqState, onRequest };
};
