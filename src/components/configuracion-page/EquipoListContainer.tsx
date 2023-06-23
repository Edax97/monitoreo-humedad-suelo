import React, { useMemo } from "react";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";
import { useEquipoListAPI } from "../../api-state/useEquipoListAPI";
import { useSedeContext } from "../../state-provider/SedeProvider";
import CardWidget from "../common/card-widget/CardWidget";
import LoadingComponent from "../common/loading/LoadingComponent";
import ErrorMessageComponent from "../common/message/ErrorMessageComponent";
import TableFilter from "../common/table/TableFilter";
import TablePagination from "../common/table/TablePagination";
import EquipoList from "./EquipoList";

export default function EquipoListContainer() {
  const { sedeSelected } = useSedeContext();

  const { equipoList, error, loading } = useEquipoListAPI(
    sedeSelected?.id || ""
  );

  const headers = useMemo<LabelKeyObject[]>(
    () => [
      { key: "modem_id", label: "Id" },
      { key: "modem_nombrepunto", label: "Equipo" },
      { key: "plant_nombre", label: "Plantación" },
    ],
    []
  );

  if (loading || !equipoList) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent
        className="my-4"
        message="Error al cargar la data."
      />
    );
  return (
    <CardWidget title={`Equipos ${sedeSelected?.name || ""}`} toolbar={true}>
      <div className="px-4 pt-4 pb-2">
        <TableFilter
          dataLista={equipoList}
          headersCSV={headers}
          render={(listaFiltered) => (
            <TablePagination
              itemsPerPage={15}
              dataLista={listaFiltered}
              render={(lista) => <EquipoList equipoList={lista} />}
            />
          )}
        />
      </div>
    </CardWidget>
  );
}
