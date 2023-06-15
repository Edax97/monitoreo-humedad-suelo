import React from "react";
import AlertasContainer from "../components/alertas-page/AlertasContainer";

export default function AlertasPage() {
  return (
    <div className="container py-4">
      <div className="fs-5 opacity-75">Alertas</div>
      <div className="pt-4">
        <AlertasContainer />
      </div>
    </div>
  );
}
