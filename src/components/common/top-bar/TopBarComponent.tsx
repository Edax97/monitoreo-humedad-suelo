import React, { ReactNode } from "react";
import { RiMenu5Fill as Menu } from "react-icons/ri";

interface Props {
  statusText: string;
  onMenu?: () => any;
  children: ReactNode;
}

export default function TopBarComponent(props: Props) {
  return (
    <div className="px-4 py-2 d-flex align-items-center gap-3 bg-primary bg-opacity-25">
      <div
        className="fs-5 d-flex align-items-center"
        role="button"
        onClick={props.onMenu}
      >
        <Menu />
      </div>
      <div
        className="fs-5 text-black text-opacity-75"
        style={{ letterSpacing: "0.01em" }}
      >
        {props.statusText}
      </div>
      {props.children}
    </div>
  );
}
