import React, { ReactNode, useEffect } from "react";

interface Props {
  modalId: string;
  children: ReactNode;
  trigger: (id: string) => ReactNode;
}
export default function Modal(props: Props) {
  useEffect(() => {
    const modalElement = document.getElementById(props.modalId);
    document.body.append(modalElement || "");
  }, [props.modalId]);

  return (
    <>
      {/* data-bs-toggle='modal' data-bs-target={id} */}
      {props.trigger(`#${props.modalId}`)}

      <div
        className="modal fade"
        id={props.modalId}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">{props.children}</div>
        </div>
      </div>
    </>
  );
}
