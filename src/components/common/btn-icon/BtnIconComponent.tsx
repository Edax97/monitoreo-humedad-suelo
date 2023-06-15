import React from "react";
import "./btn-icon-component.scss";

export default function BtnIconComponent(props: any) {
  const { iconClassName, children, ...btnProps } = props;
  return (
    <button className="btn-icon-comp btn-sm" {...btnProps}>
      <div
        className={`${iconClassName} d-flex align-items-center justify-content-center`}
      >
        {children}
      </div>
    </button>
  );
}
