import React, { useState } from "react";
import Logo from "../../assets/saphi_logo.png";
import { FaLock as Lock } from "react-icons/fa";
import "./login.scss";

interface Props {
  onLogin: (email: string, password: string) => void;
  loginLoading: boolean;
}
export default function Login(props: Props) {
  const [isHidden, setIsHidden] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="d-flex align-items-center justify-content-around">
        <img src={Logo} alt="Logo" width={140} />
        <Lock className="ms-auto d-none d-lg-block display-5 text-white-50" />
      </div>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          props.onLogin(email, password);
        }}
      >
        <div className="mt-5">
          <input
            type="text"
            className="form-control bg-light bg-opacity-10 text-white placeholder-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group mt-3">
          <input
            id="password-field"
            type={isHidden ? "password" : "text"}
            className="form-control bg-light bg-opacity-10 text-white placeholder-white"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="input-group-text bg-light bg-opacity-10 text-white"
            type="button"
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? (
              <i className="bi bi-eye-fill" />
            ) : (
              <i className="bi bi-eye-slash-fill" />
            )}
          </button>
        </div>
        <div className="form-group mt-4">
          <button
            type="submit"
            className="w-100 btn btn-info submit px-3 text-white fw-bold"
            disabled={props.loginLoading}
          >
            Ingresar
          </button>
        </div>
      </form>
    </>
  );
}
