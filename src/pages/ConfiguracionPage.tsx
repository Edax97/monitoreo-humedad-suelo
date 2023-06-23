import React from "react";
import EquipoListContainer from "../components/configuracion-page/EquipoListContainer";
import PlantListContainer from "../components/configuracion-page/PlantListContainer";
import SedeListContainer from "../components/configuracion-page/SedeListContainer";

export default function ConfiguracionPage() {
  return (
    <div className="container py-5">
      <div>
        <EquipoListContainer />
      </div>
      <div className="mt-4">
        <PlantListContainer />
      </div>
      <div className="mt-4">
        <SedeListContainer />
      </div>
    </div>
  );
}
