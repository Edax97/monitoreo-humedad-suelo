import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/error/ErrorPage";
import GraficoHumedadPage from "../components/grafica-page/grafico-humedad/GraficoHumedadPage";
import GraficoPHPage from "../components/grafica-page/grafico-ph/GraficoPHPage";
import GraficoTemperaturaPage from "../components/grafica-page/grafico-temperatura/GraficoTemperaturaPage";
import AlertasPage from "../pages/AlertasPage";
import GraficoPage from "../pages/GraficoPage";
import InicioPage from "../pages/InicioPage";
import ReportePage from "../pages/ReportePage";

export const router = createBrowserRouter([
  {
    path: "/inicio",
    element: <InicioPage />,
  },

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
  {
    path: "reporte",
    element: <ReportePage />,
  },
  {
    path: "alertas",
    element: <AlertasPage />,
  },
]);
