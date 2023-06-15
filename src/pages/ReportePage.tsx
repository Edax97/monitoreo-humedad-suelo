import React from "react";
import ReporteContainer from "../components/reportes-page/reporte/ReporteContainer";
import SelectRangeContainer from "../components/reportes-page/filter/SelectRangeContainer";
import ReporteProvider from "../state-provider/ReporteProvider";
import SelectCampoContainer from "../components/reportes-page/filter/SelectCampoContainer";
import SelectEquipoContainer from "../components/reportes-page/filter/SelectEquipoContainer";

export default function ReportePage() {
  return (
    <ReporteProvider>
      <div className="container py-4">
        <div className="fs-5 opacity-75">Reportes</div>
        <div className="d-flex mt-4 gap-4 flex-wrap">
          <div>
            <SelectCampoContainer />
          </div>
          <div>
            <SelectEquipoContainer />
          </div>
          <SelectRangeContainer />
        </div>
        <div className="mt-4">
          <ReporteContainer />
        </div>
      </div>
    </ReporteProvider>
  );
}
