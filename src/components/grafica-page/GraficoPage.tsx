import "./home-page.scss";
import SelectRangeContainer from "./select-range/SelectRangeContainer";
import { Outlet } from "react-router-dom";
import GraficoNavComponent from "./grafico-nav/GraficoNavComponent";
import DatosCampoComponent from "../datos-campo/DatosCampoComponent";

export default function GraficoPage() {
  return (
    <div className="app">
      <main className="my-4">
        <div className="container-lg">
          <div className="pt-2 d-flex align-items-center">
            <SelectRangeContainer />
            <div className="ms-auto">
              <DatosCampoComponent />
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
  );
}
