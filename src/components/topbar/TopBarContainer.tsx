import React, { useCallback, useMemo } from "react";
import SelectSedeContainer from "../common/select-sede/SelectSedeContainer";
import Notification from "./Notifications";
import TopBar from "./TopBar";
import UserOptions from "./UserOptions";

export default function TopBarContainer() {
  const userName = useMemo(() => "User 1", []);
  const logout = useCallback(() => null, []);
  const notifications = useMemo(() => 10, []);

  return (
    <TopBar statusText={`Hola, ${userName}.`}>
      <span className="d-none d-lg-block">
        <SelectSedeContainer />
      </span>
      <Notification notifications={notifications} />
      <UserOptions userName={userName || ""} onLogout={logout} />
    </TopBar>
  );
}
