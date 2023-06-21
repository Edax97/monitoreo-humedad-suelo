import React, { useState } from "react";
import "./sidebar.scss";
import SidebarContent from "./SidebarContent";

interface Props {
  onLogout: () => void;
}
function Sidebar(props: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`Container bg-primary ${sidebarOpen && "px-2"}`}>
      <button
        className="Sidebarbutton bg-dark text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i
          className={`bi bi-chevron-double-${
            sidebarOpen ? "left" : "right"
          } fs-6`}
        ></i>
      </button>
      <SidebarContent onLogout={props.onLogout} sidebarClosed={!sidebarOpen} />
    </div>
  );
}

export default Sidebar;
