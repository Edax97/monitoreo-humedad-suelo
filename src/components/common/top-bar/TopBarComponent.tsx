import React, { ReactNode } from "react";
import { AiOutlineMenu } from "react-icons/ai";

interface Props {
  statusText: string;
  onMenu?: () => any;
  children: ReactNode;
}

export default function TopBarComponent(props: Props) {
  return (
    <div className="p-2 d-flex gap-3">
      <div className="text-primary fs-5" role="button" onClick={props.onMenu}>
        <AiOutlineMenu />
      </div>
      <div className="fs-5">{props.statusText}</div>
      {props.children}
    </div>
  );
}
