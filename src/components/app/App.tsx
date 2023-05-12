import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GraficoPage from "../grafica-page/GraficoPage";
import ParamProvider from "../state-provider/param-provider";
import SensoresProvider from "../state-provider/SensoresProvider";
import GraficoHumedadPage from "../grafica-page/grafico-humedad/GraficoHumedadPage";
import GraficasProvider from "../state-provider/GraficasProvider";
import GraficoPHPage from "../grafica-page/grafico-ph/GraficoPHPage";
import GraficoTemperaturaPage from "../grafica-page/grafico-temperatura/GraficoTemperaturaPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GraficoPage />,
    children: [
      {
        index: true,
        element: <GraficoHumedadPage />,
      },
      {
        path: "grafico-temperatura",
        element: <GraficoTemperaturaPage />,
      },
      {
        path: "grafico-ph",
        element: <GraficoPHPage />,
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
