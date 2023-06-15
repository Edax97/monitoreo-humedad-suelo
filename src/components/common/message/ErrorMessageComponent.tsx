import React from "react";

interface Props {
  message: string;
  className?: string;
}
export default function ErrorMessageComponent(props: Props) {
  return (
    <div className={`${props.className || ""}`}>
      <div className="alert alert-danger alert-dismissible">
        {props.message}
        <button className="btn-close btn-sm" data-bs-dismiss="alert"></button>
      </div>
    </div>
  );
}
