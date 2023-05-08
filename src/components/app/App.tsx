import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConfigSensoresPage from "../config-sensores-page/ConfigSensoresPage";
import HomePage from "../home-page/HomePage";
import ParamCampoPage from "../param-campo-page/ParamCampoPage";
import ParamProvider from "../state-provider/param-provider";
import SensoresProvider from "../state-provider/SensoresProvider";
import { StateProvider } from "../state-provider/state-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "config-sensores",
    element: <ConfigSensoresPage />,
  },
  {
    path: "param-campo",
    element: <ParamCampoPage />,
  },
]);

function App() {
  return (
    <StateProvider>
      <ParamProvider>
        <SensoresProvider>
          <RouterProvider router={router} />
        </SensoresProvider>
      </ParamProvider>
    </StateProvider>
  );
}

export default App;
