import React, { useState } from "react";
import Modal from "react-modal";
import CardComponent from "../common/card/CardComponent";
import SensoresFormContainer from "./sensores-form/SensoresFormContainer";
import BtnIconComponent from "../common/btn-icon/BtnIconComponent";
import { MdClose as Close } from "react-icons/md";

//Modal.setAppElement(document.getElementById("app") || "");

export default function ConfigSensoresDialog() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div onClick={() => setModalOpen(true)}>Configuración de sensores</div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1001 },
          content: { border: "none", backgroundColor: "rgba(0,0,0,0)" },
        }}
      >
        <div className="d-flex justify-content-center pt-5 mt-4">
          <CardComponent>
            <div style={{ width: "640px" }}>
              <div className="pt-1 px-1 d-flex justify-content-end opacity-50">
                <BtnIconComponent onClick={() => setModalOpen(false)}>
                  <Close />
                </BtnIconComponent>
              </div>
              <div className="p-5">
                <SensoresFormContainer />
              </div>
            </div>
          </CardComponent>
        </div>
      </Modal>
    </>
  );
}
