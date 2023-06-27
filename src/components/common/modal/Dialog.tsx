import React, { ReactNode } from "react";
import BtnIcon from "../btn-icon/BtnIcon";
import Modal from "./Modal";

interface Props {
  children: ReactNode;
  title: string;
  modalId: string;
  trigger: (id: string) => ReactNode;
}
export default function Dialog({ children, title, ...restProps }: Props) {
  return (
    <Modal {...restProps}>
      <div className=" bg-primary bg-opacity-10">
        <div className="pt-1 ps-3 pe-2 d-flex align-items-top">
          <span className="pt-2 opacity-75">{title}</span>
          <BtnIcon className="ms-auto" data-bs-dismiss="modal">
            <i className="bi bi-x fs-5"></i>
          </BtnIcon>
        </div>
        <div className="pt-3 px-4 pb-3">{children}</div>
      </div>
    </Modal>
  );
}
