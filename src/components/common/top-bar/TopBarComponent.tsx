import React, { ReactNode } from "react";
import { RiMenu5Fill as Menu } from "react-icons/ri";
import BtnIconComponent from "../btn-icon/BtnIconComponent";

interface Props {
  statusText: string;
  onMenu?: () => any;
  children: ReactNode;
}

export default function TopBarComponent(props: Props) {
  return (
    <div className="py-1 text-white bg-primary">
      <div
        className="container-lg d-flex align-items-center gap-3 "
        style={{ height: "48px" }}
      >
        <BtnIconComponent
          iconClassName="fs-5 text-white"
          onClick={props.onMenu}
        >
          <Menu />
        </BtnIconComponent>
        <div
          className="fs-5 text-opacity-75"
          style={{ letterSpacing: "0.01em" }}
        >
          {props.statusText}
        </div>
        {props.children}
      </div>
    </div>
  );
}
