import React, { useMemo } from "react";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";
import { useAlertasAPI } from "../../api-state/useAlertasAPI";
import { useSedeContext } from "../../state-provider/SedeProvider";
import CardWidget from "../common/card-widget/CardWidget";
import LoadingComponent from "../common/loading/LoadingComponent";
import ErrorMessageComponent from "../common/message/ErrorMessageComponent";
import TableFilter from "../common/table/TableFilter";
import TablePagination from "../common/table/TablePagination";
import AlertasTable from "./AlertasTable";

export default function AlertasContainer() {
  const { sedeSelected } = useSedeContext();

  const { alertas, error, loading } = useAlertasAPI(sedeSelected?.id || "");

  const headers = useMemo<LabelKeyObject[]>(
    () => [
      { key: "sensor_name", label: "Sensor" },
      { key: "modem_name", label: "Módem" },
      { key: "plant_name", label: "Plantación" },
      { key: "hora", label: "Hora" },
      { key: "motivo", label: "Motivo" },
      { key: "estado", label: "Estado" },
      { key: "temp", label: "Temp. (%)" },
      { key: "hume", label: "Hume. (mm)" },
      { key: "ph", label: "PH" },
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
    <CardWidget title={`Alertas ${sedeSelected?.name || ""}`} toolbar={true}>
      <div className="pt-4 pb-2">
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
