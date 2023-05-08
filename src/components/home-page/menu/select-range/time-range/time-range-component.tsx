import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "./time-range-component.scss";

export type SinceType = { value: number; label: string };
export type RangeType = [Date, Date] | null;

interface Props {
  tempRange: RangeType;
  setTempRange: (d: any) => any;
  selectRange: () => any;
  cancelSelection: () => any;
}

export default function TimeRangeComponent(props: Props) {
  return (
    <form className="mx-3 my-2">
      <div className="mb-3">
        <label className="mb-1">Seleccionar rango</label>
        <DateRangePicker
          value={props.tempRange}
          onChange={props.setTempRange}
          clearIcon={null}
          locale="es-ES"
          maxDate={new Date()}
        />
      </div>
      <div className="d-flex justify-content-center gap-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={props.cancelSelection}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.selectRange}
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}
