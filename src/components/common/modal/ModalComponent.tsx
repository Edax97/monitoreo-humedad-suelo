import React, { ReactNode, SetStateAction } from "react";
import "./modal-component.scss";

interface Props {
  setModalOpen: (m: SetStateAction<boolean>) => any;
  children: ReactNode;
}
export default function ModalComponent(props: Props) {
  return (
    <>
      <div className="darkBG" onClick={() => props.setModalOpen(false)}></div>
      <div className="d-flex justify-content-center centered">
        <div className="">{props.children}</div>
      </div>
    </>
  );
}
