import React, { useMemo } from "react";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";
import { useSedeListAPI } from "../../api-state/useSedeListAPI";
import CardWidget from "../common/card-widget/CardWidget";
import LoadingComponent from "../common/loading/LoadingComponent";
import ErrorMessageComponent from "../common/message/ErrorMessageComponent";
import TableFilter from "../common/table/TableFilter";
import TablePagination from "../common/table/TablePagination";
import SedeList from "./SedeList";

export default function SedeListContainer() {
  const { sedeList, error, loading } = useSedeListAPI("0");

  const headers = useMemo<LabelKeyObject[]>(
    () => [{ key: "sedeName", label: "Sede" }],
    []
  );

  if (loading || !sedeList) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent
        className="my-4"
        message="Error al cargar la data."
      />
    );
  return (
    <CardWidget title={`Sedes`} toolbar={true}>
      <div className="pt-4 pb-2">
        <TableFilter
          dataLista={sedeList}
          headersCSV={headers}
          render={(listaFiltered) => (
            <TablePagination
              itemsPerPage={15}
              dataLista={listaFiltered}
              render={(lista) => <SedeList sedeList={lista} />}
            />
          )}
        />
      </div>
    </CardWidget>
  );
}
