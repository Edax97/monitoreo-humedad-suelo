import React from "react";
import AlertasContainer from "../components/alertas-page/AlertasContainer";
import { useSedeContext } from "../state-provider/SedeProvider";

export default function AlertasPage() {
  const { sedeSelected } = useSedeContext();

  return (
    <div className="container py-4">
      <div className="fs-5 opacity-75">
        Alertas {sedeSelected ? `sede ${sedeSelected.name}` : ""}
      </div>
      <div className="pt-4">
        <AlertasContainer />
      </div>
    </div>
  );
}
