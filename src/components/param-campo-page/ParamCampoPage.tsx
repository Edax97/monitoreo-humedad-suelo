import React from "react";
import { Link } from "react-router-dom";
import TopBarComponent from "../common/top-bar/TopBarComponent";
import ParamsFormContainer from "./params-form/ParamsFormContainer";
import { MdArrowBackIos as Back } from "react-icons/md";

export default function ParamCampoPage() {
  return (
    <>
      <header>
        <TopBarComponent statusText="Parámetros de campo">
          <Link
            to={"/"}
            className="ms-auto btn btn-outline-light d-flex align-items-center"
          >
            <Back className="fs-6 me-1" /> Regresar
          </Link>
        </TopBarComponent>
      </header>
      <main
        className="px-4 d-flex justify-content-center"
        style={{ paddingTop: "6rem" }}
      >
        <ParamsFormContainer />
      </main>
    </>
  );
}
