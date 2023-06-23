import React, { CSSProperties } from "react";
import { DatosPlantType } from "../../api/datos-plant-api";

const styleItem: CSSProperties = { width: "8rem" };

interface Props {
  datosPlant: DatosPlantType;
}
export default function DatosCampo(props: Props) {
  return (
    <div className="d-flex justify-content-around flex-wrap gap-3">
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Empresa</div>
        <div>{props.datosPlant.plant_empresa}</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Cultivo</div>
        <div>{props.datosPlant.plant_cultivo}</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Variedad</div>
        <div>{props.datosPlant.plant_variedad}</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Área</div>
        <div>{props.datosPlant.plant_area}</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Sistema de riego</div>
        <div>{props.datosPlant.plant_sistema_riego}</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Fecha de inicio</div>
        <div>{props.datosPlant.plant_fecha_inicio}</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Edad de cultivo</div>
        <div>{props.datosPlant.plant_edad_cultivo}</div>
      </div>
      <div style={styleItem}>
        <div className=" text-black text-opacity-50">Coordenadas</div>
        <a
          href={`https://maps.google.com/?q=${props.datosPlant.plant_coordenadas}&z=17`}
          target="_blank"
          rel="noreferrer"
        >
          {props.datosPlant.plant_coordenadas}
        </a>
      </div>
    </div>
  );
}
