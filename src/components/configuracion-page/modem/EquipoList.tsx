import React from "react";
import { ModemPlantType } from "../../../api-state/useModemList";
import Dialog from "../../common/modal/Dialog";
import ResponsiveContainer from "../../common/table/ResponsiveContainer";
import ControlVarContainer from "./ControlVarContainer";
import DatosEquipoContainer from "./DatosEquipoContainer";
import ParamsCampoContainer from "./ParamsCampoContainer";

interface Props {
  equipoList: ModemPlantType[];
}
export default function EquipoList(props: Props) {
  return (
    <ResponsiveContainer>
      <div className="px-lg-5">
        <table className="table mx-auto" style={{ fontSize: "small" }}>
          <thead>
            <tr>
              <th className="px-3">Módem</th>
              <th className="px-3">Plantación</th>
              <th className="px-3">Datos de equipo</th>
              <th className="px-3">Control de rangos</th>
              <th className="px-3">Parámetros de campo</th>
            </tr>
          </thead>
          <tbody className="text-dark text-opacity-75">
            {props.equipoList.map((equipo, j) => (
              <tr key={j}>
                <td className="px-3">{equipo.modem_nombrepunto}</td>
                <td className="px-3">{equipo.plant_nombre}</td>
                <td className="px-3">
                  <Dialog
                    title="Datos de equipo"
                    showComponent={(onShow) => (
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={onShow}
                      >
                        Datos de equipo
                      </button>
                    )}
                  >
                    <DatosEquipoContainer modemId={`${equipo.modem_id}`} />
                  </Dialog>
                </td>
                <td className="px-3">
                  <Dialog
                    title="Control de rangos"
                    showComponent={(onShow) => (
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={onShow}
                      >
                        Control de rangos
                      </button>
                    )}
                  >
                    <ControlVarContainer modemId={`${equipo.modem_id}`} />
                  </Dialog>
                </td>
                <td className="px-3">
                  <Dialog
                    title="Parámetros de campo"
                    showComponent={(onShow) => (
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={onShow}
                      >
                        Parámetros de campo
                      </button>
                    )}
                  >
                    <ParamsCampoContainer modemId={`${equipo.modem_id}`} />
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResponsiveContainer>
  );
}
