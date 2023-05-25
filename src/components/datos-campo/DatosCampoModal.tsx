import React, { useState } from "react";
import Modal from "react-modal";
import BtnIconComponent from "../common/btn-icon/BtnIconComponent";
import CardComponent from "../common/card/CardComponent";
import { MdClose as Close } from "react-icons/md";
import DatosCampoContainer from "./DatosCampoContainer";

export default function DatosCampoDialog() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-outline-info bg-primary bg-opacity-10"
        onClick={() => setModalOpen(true)}
      >
        Datos de campo
      </button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        //appElement={[<App />]}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1001 },
          content: { border: "none", backgroundColor: "rgba(0,0,0,0)" },
        }}
      >
        <div className="d-flex justify-content-center pt-5 mt-4">
          <CardComponent>
            <div style={{ maxWidth: "580px" }}>
              <div className="pt-1 px-1 d-flex justify-content-end opacity-50">
                <BtnIconComponent onClick={() => setModalOpen(false)}>
                  <Close />
                </BtnIconComponent>
              </div>
              <div className="m-3 m-lg-5 mt-lg-3">
                <DatosCampoContainer />
              </div>
            </div>
          </CardComponent>
        </div>
      </Modal>
    </>
  );
}
