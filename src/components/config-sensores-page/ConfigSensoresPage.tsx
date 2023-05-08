import React from "react";
import TopBarComponent from "../common/top-bar/TopBarComponent";
import { MdArrowBackIos as Back } from "react-icons/md";
import { Link } from "react-router-dom";
import SensoresFormContainer from "./sensores-form/SensoresFormContainer";

export default function ConfigSensoresPage() {
  return (
    <>
      <header>
        <TopBarComponent statusText="Configuración de sensores">
          <Link
            to={"/"}
            className="ms-auto btn btn-outline-light d-flex align-items-center"
          >
            <Back className="fs-6 me-1" /> Regresar
          </Link>
        </TopBarComponent>
      </header>
      <main
        className="d-flex justify-content-center"
        style={{ paddingTop: "6rem" }}
      >
        <SensoresFormContainer />
      </main>
    </>
  );
}
