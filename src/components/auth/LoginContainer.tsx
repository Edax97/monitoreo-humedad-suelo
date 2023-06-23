import { useCallback, useMemo } from "react";
import ErrorMessageComponent from "../common/message/ErrorMessageComponent";
import Login from "./Login";

export default function LoginContainer() {
  const login = useCallback(
    (email: string, password: string) => console.log("LOGIN", email, password),
    []
  );
  const loginLoading = useMemo(() => false, []);
  const loginError = useMemo(() => false, []);

  const onLogin = useCallback(
    (email: string, password: string) => {
      login(email, password);
    },
    [login]
  );

  return (
    <div className="d-flex justify-content-center pt-xl-5">
      <div style={{ maxWidth: "380px", paddingTop: "8rem" }}>
        <Login onLogin={onLogin} loginLoading={loginLoading} />
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
