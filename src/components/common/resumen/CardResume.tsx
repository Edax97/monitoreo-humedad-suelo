import React, { ReactNode } from "react";

interface PropsType {
  titleCounter: string;
  counter?: number;
  icon: ReactNode;
  children?: ReactNode;
  className?: string;
}
export default function CardResume(props: PropsType) {
  return (
    <div className={`${props.className} card border-0 shadow`}>
      <div className="p-3 pt-4 mx-3">
        <div className=" opacity-75">{props.titleCounter}</div>
        <div className="mt-2 d-flex align-items-center">
          <span className="fs-2">{props.counter}</span>
          <span className="ms-auto fs-1 text-secondary">{props.icon}</span>
        </div>
        {props.children}
      </div>
    </div>
  );
}
