import { RouterProvider } from "react-router-dom";
import ParamProvider from "../../state-provider/param-provider";
import SensoresProvider from "../../state-provider/SensoresProvider";
import { router } from "../../routes/router";
import "./app.scss";
import { SedeProvider } from "../../state-provider/SedeProvider";

function App() {
  return (
    <SedeProvider>
      <SensoresProvider>
        <ParamProvider>
          <RouterProvider router={router} />
        </ParamProvider>
      </SensoresProvider>
    </SedeProvider>
  );
}

export default App;
