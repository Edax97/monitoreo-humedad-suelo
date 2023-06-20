import React from "react";
import PlantsContainer from "../components/inicio-page/plants/PlantsContainer";
import ResumenContainer from "../components/inicio-page/resumen/ResumenContainer";
import SelectSedeContainer from "../components/inicio-page/select-sede/SelectSedeContainer";

export default function InicioPage() {
  return (
    <div className="container-fluid p-4 px-lg-5">
      <div>
        <SelectSedeContainer />
      </div>
      <div className="mt-4">
        <PlantsContainer />
      </div>
      <div className="mt-4">
        <ResumenContainer />
      </div>
    </div>
  );
}
