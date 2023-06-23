import React from "react";
import LoginContainer from "../components/auth/LoginContainer";

export default function SigninPage() {
  return (
    <div
      className="vh-100 vw-100 p-3"
      style={{ backgroundColor: "var(--bs-link-hover-color" }}
    >
      <LoginContainer />
    </div>
  );
}
