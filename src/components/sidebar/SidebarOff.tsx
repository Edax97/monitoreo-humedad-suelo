import React from "react";
import Logo from "../../assets/logo.png";
import BtnIcon from "../common/btn-icon/BtnIcon";
import SidebarContent from "./SidebarContent";

interface Props {
  onLogout: () => void;
}
export default function SidebarOff(props: Props) {
  return (
    <div
      className="offcanvas offcanvas-start bg-primary"
      tabIndex={-1}
      id="sidebar-off"
      style={{ maxWidth: "20rem" }}
    >
      <div className="offcanvas-header">
        <img src={Logo} alt="" height={48} />
        <BtnIcon type="button" data-bs-dismiss="offcanvas">
          <i className="bi bi-x text-white fs-4"></i>
        </BtnIcon>
      </div>
      <div className="offcanvas-body">
        <SidebarContent onLogout={props.onLogout} isOffcanvas />
      </div>
    </div>
  );
}
