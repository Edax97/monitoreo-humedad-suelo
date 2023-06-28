import React, { useMemo } from "react";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";
import { usePlantListAPI } from "../../../api-state/usePlantListAPI";
import { PlantacionType } from "../../../api/plant-list-api";
import { useSedeContext } from "../../../state-provider/SedeProvider";
import CardWidget from "../../common/card-widget/CardWidget";
import LoadingComponent from "../../common/loading/LoadingComponent";
import ErrorMessageComponent from "../../common/message/ErrorMessageComponent";
import TableFilter from "../../common/table/TableFilter";
import TablePagination from "../../common/table/TablePagination";
import PlantList from "./PlantList";

export type PlantSedeType = PlantacionType & { sede_nombre: string };

export default function PlantListContainer() {
  const { sedeSelected } = useSedeContext();

  const { plantList, error, loading } = usePlantListAPI(sedeSelected?.id || "");

  const plantSedeList = useMemo<PlantSedeType[]>(() => {
    if (!plantList || !sedeSelected) return [];
    return plantList.map((plant) => ({
      ...plant,
      sede_nombre: sedeSelected.name,
    }));
  }, [plantList, sedeSelected]);

  const headers = useMemo<LabelKeyObject[]>(
    () => [
      { key: "plant_id", label: "Id" },
      { key: "plant_nombre", label: "Plantación" },
      { key: "sede_nombre", label: "Sede" },
    ],
    []
  );

  if (loading) return <LoadingComponent className="my-5" />;
  if (error)
    return (
      <ErrorMessageComponent
        className="my-4"
        message="Error al cargar la data."
      />
    );
  return (
    <CardWidget
      title={`Plantaciones ${sedeSelected?.name || ""}`}
      toolbar={true}
    >
      <div className="px-4 pt-4 pb-2">
        <TableFilter
          dataLista={plantSedeList}
          headersCSV={headers}
          render={(listaFiltered) => (
            <TablePagination
              itemsPerPage={15}
              dataLista={listaFiltered}
              render={(lista) => <PlantList plantList={lista} />}
            />
          )}
        />
      </div>
    </CardWidget>
  );
}
