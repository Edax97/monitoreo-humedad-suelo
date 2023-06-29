import React, { ReactNode, useState } from "react";
import BtnIcon from "../btn-icon/BtnIcon";
import Modal from "react-bootstrap/Modal";

interface Props {
  children: ReactNode;
  title: string;
  showComponent: (onShow: () => any) => ReactNode;
}
export default function Dialog({ children, title, showComponent }: Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {showComponent(handleShow)}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="bg-primary bg-opacity-10">
          <div>
            <div className="d-flex align-items-top">
              <span className="pt-2">{title}</span>
              <BtnIcon className="ms-auto" onClick={handleClose}>
                <i className="bi bi-x fs-5"></i>
              </BtnIcon>
            </div>
            <div className="pt-3 p-2">{children}</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
