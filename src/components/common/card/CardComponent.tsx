import React, { ReactNode } from "react";
import "./card-component.scss";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function CardComponent(props: Props) {
  return (
    <div className="bg-white card border-0">
      <div
        className={`card bg-primary bg-opacity-10 card-primary ${
          props.className || ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}
