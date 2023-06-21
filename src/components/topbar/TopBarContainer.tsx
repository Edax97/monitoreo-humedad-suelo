import React, { useCallback, useMemo } from "react";
import Notification from "./Notifications";
import TopBar from "./TopBar";
import UserOptions from "./UserOptions";

export default function TopBarContainer() {
  const userName = useMemo(() => "User 1", []);
  const logout = useCallback(() => null, []);
  const notifications = useMemo(() => 10, []);

  return (
    <TopBar statusText={`Hola, ${userName}.`}>
      <Notification notifications={notifications} />
      <UserOptions userName={userName || ""} onLogout={logout} />
    </TopBar>
  );
}
