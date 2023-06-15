import React, { useMemo } from "react";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";
import { useAlertasAPI } from "../../api-state/useAlertasAPI";
import CardWidget from "../common/card-widget/CardWidget";
import LoadingComponent from "../common/loading/LoadingComponent";
import ErrorMessageComponent from "../common/message/ErrorMessageComponent";
import TableFilter from "../common/table/TableFilter";
import TablePagination from "../common/table/TablePagination";
import AlertasTable from "./AlertasTable";

export default function AlertasContainer() {
  const sedeId = useMemo(() => "1", []);
  const sedeName = useMemo(() => "Piura", []);
  const { alertas, error, loading } = useAlertasAPI("0", sedeId);

  const headers = useMemo<LabelKeyObject[]>(
    () => [
      { key: "equipo", label: "Equipo" },
      { key: "campo", label: "Equipo" },
      { key: "hora", label: "Equipo" },
      { key: "ultimo_cambio", label: "Ultimo cambio" },
      { key: "motivo", label: "Motivo" },
      { key: "estado", label: "Estado" },
      { key: "equipoId", label: "Detalles" },
    ],
    []
  );

  if (loading) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent
        className="my-5"
        message="Error al obtener los datos."
      />
    );

  return (
    <CardWidget title={`Alertas ${`sede ${sedeName}` || ""}`} toolbar={true}>
      <div className="px-4 pt-4 pb-2">
        <TableFilter
          dataLista={alertas}
          headersCSV={headers}
          render={(listaFiltered) => (
            <TablePagination
              itemsPerPage={15}
              dataLista={listaFiltered}
              render={(lista) => (
                <AlertasTable headers={headers} alertaLista={lista} />
              )}
            />
          )}
        />
      </div>
    </CardWidget>
  );
}
