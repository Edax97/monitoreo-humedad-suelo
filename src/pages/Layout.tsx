import React, { useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import SidebarOff from "../components/sidebar/SidebarOff";
import TopBarContainer from "../components/topbar/TopBarContainer";
import "./layout.scss";

export default function Layout() {
  const logout = useCallback(() => {}, []);
  return (
    <main>
      <TopBarContainer />
      <div className="sidebarState">
        <div
          className="header-below bg-primary d-none d-lg-block"
          style={{
            minHeight: "800px",
          }}
        >
          <Sidebar onLogout={logout} />
        </div>
        <div className="d-block d-lg-none">
          <SidebarOff onLogout={logout} />
        </div>
        <Outlet />
      </div>
    </main>
  );
}
