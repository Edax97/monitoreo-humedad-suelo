import React from "react";
import EquipoListContainer from "../components/configuracion-page/modem/EquipoListContainer";
import PlantListContainer from "../components/configuracion-page/plantacion/PlantListContainer";

export default function ConfiguracionPage() {
  return (
    <div className="container py-5">
      <div>
        <EquipoListContainer />
      </div>
      <div className="mt-4">
        <PlantListContainer />
      </div>
    </div>
  );
}
