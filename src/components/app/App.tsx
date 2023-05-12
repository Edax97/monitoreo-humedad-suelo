import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConfigSensoresPage from "../config-sensores-page/ConfigSensoresPage";
import GraficoPage from "../grafica-page/GraficoPage";
import ParamCampoPage from "../param-campo-page/ParamCampoPage";
import ParamProvider from "../state-provider/param-provider";
import SensoresProvider from "../state-provider/SensoresProvider";
import GraficoHumedadContainer from "../grafica-page/grafico-humedad/GraficoHumedadContainer";
import GraficoTemperaturaContainer from "../grafica-page/grafico-temperatura/GraficoTemperaturaContainer";
import GraficoPHContainer from "../grafica-page/grafico-ph/GraficoPHContainer";
import GraficasProvider from "../state-provider/GraficasProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GraficoPage />,
    children: [
      {
        index: true,
        element: <GraficoHumedadContainer />,
      },
      {
        path: "grafico-temperatura",
        element: <GraficoTemperaturaContainer />,
      },
      {
        path: "grafico-ph",
        element: <GraficoPHContainer />,
      },
    ],
  },
]);

function App() {
  return (
    <GraficasProvider>
      <SensoresProvider>
        <ParamProvider>
          <RouterProvider router={router} />
        </ParamProvider>
      </SensoresProvider>
    </GraficasProvider>
  );
}

export default App;
