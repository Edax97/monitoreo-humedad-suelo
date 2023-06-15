import { Outlet } from "react-router-dom";
import DatosCampoDialog from "../components/datos-campo/DatosCampoModal";
import GraficoNavComponent from "../components/grafica-page/grafico-nav/GraficoNavComponent";
import SelectRangeContainer from "../components/grafica-page/select-range/SelectRangeContainer";
import GraficasProvider from "../state-provider/GraficasProvider";

export default function GraficoPage() {
  return (
    <GraficasProvider>
      <div className="app">
        <main className="my-4">
          <div className="container-lg">
            <div className="fs-5 opacity-75">Dashboard</div>
            <div className="pt-4 d-flex align-items-center flex-wrap gap-3">
              <SelectRangeContainer />
              <div className="ms-auto">
                <div>
                  <DatosCampoDialog />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-2">
              <GraficoNavComponent />
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </GraficasProvider>
  );
}
