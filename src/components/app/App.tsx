import { useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./app.scss";

function App() {
  const isLogged = useMemo(() => false, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged) {
      navigate("/home");
      return;
    }
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return <Outlet />;
}

export default App;
