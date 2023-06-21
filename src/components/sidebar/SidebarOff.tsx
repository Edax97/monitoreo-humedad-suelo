import React from "react";
import Logo from "../../assets/logo.png";
import BtnIcon from "../common/btn-icon/BtnIcon";
import SelectSedeContainer from "../common/select-sede/SelectSedeContainer";
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
        <div className="mx-3">
          <SelectSedeContainer />
        </div>
        <div className="mt-3">
          <SidebarContent onLogout={props.onLogout} isOffcanvas />
        </div>
      </div>
    </div>
  );
}
