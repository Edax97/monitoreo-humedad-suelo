import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DatosSondaPage from "../datos-sonda-page/DatosSondaPage";
import HomePage from "../home-page/HomePage";
import ParamCampoPage from "../param-campo-page/ParamCampoPage";
import { StateProvider } from "../state-provider/state-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "datos-sonda",
    element: <DatosSondaPage />,
  },
  {
    path: "param-campo",
    element: <ParamCampoPage />,
  },
]);

function App() {
  return (
    <StateProvider>
      <RouterProvider router={router} />
    </StateProvider>
  );
}

export default App;
