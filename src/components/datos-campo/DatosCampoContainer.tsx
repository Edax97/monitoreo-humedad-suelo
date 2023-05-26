import React, { CSSProperties } from "react";

export default function DatosCampoContainer() {
  const styleItem: CSSProperties = { width: "8rem" };
  return (
    <div className="d-flex flex-wrap gap-3">
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Empresa</div>
        <div>AIPSA</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Cultivo</div>
        <div>CAÑA DE AZÚCAR</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Variedad</div>
        <div>MEX 70-485</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Área</div>
        <div>76.52 Ha</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Sistema de riego</div>
        <div>GOTEO</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Fecha de inicio</div>
        <div>24/09/2022</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Edad de cultivo</div>
        <div>7.03 Meses</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Coordenadas</div>
        <a href="https://www.google.com/maps/place/10%C2%B035'32.0%22S+77%C2%B045'52.1%22W/@-10.5922283,-77.7666698,815m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d-10.5922336!4d-77.7644811">
          -10,5915846,-77,7643026
        </a>
      </div>
    </div>
  );
}
