import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export default function GraficoCard(props: Props) {
  return (
    <div
      className={`card shadow px-2 px-lg-3 py-2 ${props.className}`}
      style={{ backgroundColor: "var(--bs-gray-200)" }}
    >
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <div style={{ minWidth: 700 }}>{props.children}</div>
      </div>
    </div>
  );
}
