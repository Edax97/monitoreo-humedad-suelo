import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/alert";
import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/modal";
import "animate.css";
import reportWebVitals from "./reportWebVitals";
import { SedeProvider } from "./state-provider/SedeProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import ParamProvider from "./state-provider/param-provider";
import SensoresProvider from "./state-provider/SensoresProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SedeProvider>
      <SensoresProvider>
        <ParamProvider>
          <RouterProvider router={router} />
        </ParamProvider>
      </SensoresProvider>
    </SedeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
