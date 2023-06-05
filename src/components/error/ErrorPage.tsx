import React from "react";

export default function ErrorPage() {
  return (
    <div style={{ height: "100vh", backgroundColor: "var(--bs-gray-300)" }}>
      <div className="text-center pt-5">
        <div className="pt-3 display-5 opacity-75">Página no encontrada.</div>
        <div className="pt-3 fs-5">
          Parece que la ruta especificada no existe. 🙃
        </div>
      </div>
    </div>
  );
}
