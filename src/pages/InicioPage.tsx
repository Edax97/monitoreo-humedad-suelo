import React from "react";
import PlantsContainer from "../components/inicio-page/plants/PlantsContainer";
import ResumenContainer from "../components/inicio-page/resumen/ResumenContainer";

export default function InicioPage() {
  return (
    <div className="container-fluid p-4 px-lg-5">
      <div>
        <PlantsContainer />
      </div>
      <div className="mt-4">
        <ResumenContainer />
      </div>
    </div>
  );
}
