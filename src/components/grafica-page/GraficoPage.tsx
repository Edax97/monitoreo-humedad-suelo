import SelectRangeContainer from "./select-range/SelectRangeContainer";
import { Outlet } from "react-router-dom";
import GraficoNavComponent from "./grafico-nav/GraficoNavComponent";
import DatosCampoDialog from "../datos-campo/DatosCampoModal";
import GraficasProvider from "../state-provider/GraficasProvider";

export default function GraficoPage() {
  return (
    <GraficasProvider>
      <div className="app">
        <main className="my-4">
          <div className="container-lg">
            <div className="pt-2 d-flex align-items-center flex-wrap gap-3">
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
