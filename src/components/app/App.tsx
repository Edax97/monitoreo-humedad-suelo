import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GraficoPage from "../grafica-page/GraficoPage";
import ParamProvider from "../state-provider/param-provider";
import SensoresProvider from "../state-provider/SensoresProvider";
import GraficoHumedadPage from "../grafica-page/grafico-humedad/GraficoHumedadPage";
import GraficoPHPage from "../grafica-page/grafico-ph/GraficoPHPage";
import GraficoTemperaturaPage from "../grafica-page/grafico-temperatura/GraficoTemperaturaPage";
import ErrorPage from "../error/ErrorPage";

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
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <SensoresProvider>
      <ParamProvider>
        <RouterProvider router={router} />
      </ParamProvider>
    </SensoresProvider>
  );
}

export default App;
