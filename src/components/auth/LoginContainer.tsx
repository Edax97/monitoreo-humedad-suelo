import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessageComponent from "../common/message/ErrorMessageComponent";
import Login from "./Login";

export default function LoginContainer() {
  const navigate = useNavigate();
  const login = useCallback(
    (email: string, password: string) => {
      console.log("LOGIN", email, password);
      navigate("/home");
    },
    [navigate]
  );
  const loginLoading = useMemo(() => false, []);
  const loginError = useMemo(() => false, []);

  return (
    <div className="d-flex justify-content-center pt-xl-5">
      <div style={{ maxWidth: "380px", paddingTop: "8rem" }}>
        <Login onLogin={login} loginLoading={loginLoading} />
        {loginError && (
          <ErrorMessageComponent
            className="mt-3"
            message="Datos incorrectos."
          />
        )}
      </div>
    </div>
  );
}
