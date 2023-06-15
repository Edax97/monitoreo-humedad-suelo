import { RouterProvider } from "react-router-dom";
import ParamProvider from "../../state-provider/param-provider";
import SensoresProvider from "../../state-provider/SensoresProvider";
import { router } from "../../routes/router";

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
