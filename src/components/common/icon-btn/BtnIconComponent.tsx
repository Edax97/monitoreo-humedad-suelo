import React, { ReactNode } from "react";

interface Props {
  className: string;
  children: ReactNode;
}

export default function BtnIconComponent(props: Props) {
  return <button>{props.children}</button>;
}
