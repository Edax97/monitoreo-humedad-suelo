import React, { ReactNode, useCallback, useState } from "react";
import Paginacion from "./Paginacion";

interface Props {
  pageCount: number;
  currentPage: (page: number) => ReactNode;
  hiddenPages: (prev: number, next: number) => ReactNode;
}
export default function APIPagination(props: Props) {
  const [page, setPage] = useState<number>(1);

  const prev = useCallback(
    (page: number) => {
      if (page === 1) return props.pageCount || 1;
      return page - 1;
    },
    [props.pageCount]
  );
  const next = useCallback(
    (page: number) => {
      if (page === props.pageCount) return 1;
      return page + 1;
    },
    [props.pageCount]
  );
  return (
    <>
      <div className="d-none">{props.hiddenPages(prev(page), next(page))}</div>
      {props.currentPage(page)}
      <div className="d-flex justify-content-end pt-3">
        <Paginacion
          pageCount={props.pageCount || 1}
          onPageChange={(item) => {
            setPage(item.selected + 1);
          }}
        />
      </div>
    </>
  );
}
