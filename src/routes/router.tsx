import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../components/app/App";
import ErrorPage from "../components/error/ErrorPage";
import GraficoHumedadPage from "../components/grafica-page/grafico-humedad/GraficoHumedadPage";
import GraficoPHPage from "../components/grafica-page/grafico-ph/GraficoPHPage";
import GraficoTemperaturaPage from "../components/grafica-page/grafico-temperatura/GraficoTemperaturaPage";
import AlertasPage from "../pages/AlertasPage";
import ConfiguracionPage from "../pages/ConfiguracionPage";
import GraficoPage from "../pages/GraficoPage";
import InicioPage from "../pages/InicioPage";
import Layout from "../pages/Layout";
import ReportePage from "../pages/ReportePage";
import SigninPage from "../pages/SigninPage";

export const router = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          path: "/",
          element: <SigninPage />,
        },
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "home",
              element: <InicioPage />,
            },
            {
              path: "dashboard",
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
            {
              path: "reporte",
              element: <ReportePage />,
            },
            {
              path: "alertas",
              element: <AlertasPage />,
            },
            {
              path: "configuracion",
              element: <ConfiguracionPage />,
            },
          ],
          errorElement: <ErrorPage />,
        },
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ],
  { basename: "/saphy" }
);
