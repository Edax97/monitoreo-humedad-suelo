import { Outlet } from "react-router-dom";
import DatosCampoDialog from "../components/datos-campo/DatosCampoDialog";
import GraficoNavComponent from "../components/grafica-page/grafico-nav/GraficoNavComponent";
import SelectRangeContainer from "../components/grafica-page/select-range/SelectRangeContainer";
import SelectCampoContainer from "../components/reportes-page/filter/SelectCampoContainer";
import SelectEquipoContainer from "../components/reportes-page/filter/SelectEquipoContainer";
import GraficasProvider from "../state-provider/GraficasProvider";
import ReporteProvider from "../state-provider/ReporteProvider";

export default function GraficoPage() {
  return (
    <ReporteProvider>
      <GraficasProvider>
        <div className="app">
          <main className="my-4">
            <div className="container-lg">
              <div className="fs-5 opacity-75">Dashboard</div>
              <div className="pt-4 d-flex align-items-center flex-wrap gap-4">
                <div>
                  <SelectCampoContainer />
                </div>
                <div>
                  <SelectEquipoContainer />
                </div>
                <SelectRangeContainer />
              </div>
              <div className="mt-3 text-end">
                <DatosCampoDialog />
              </div>
              <div className="mt-1 pt-2">
                <GraficoNavComponent />
              </div>
              <div>
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </GraficasProvider>
    </ReporteProvider>
  );
}
