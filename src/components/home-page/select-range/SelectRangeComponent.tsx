import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import React from "react";
import Select, { SingleValue } from "react-select";
import "./select-range-component.scss";

export type SinceType = { value: number; label: string };
export type RangeType = [Date, Date] | null;

interface Props {
  tempRange: RangeType;
  sinceSelected: SinceType;
  sinceOptions: SinceType[];

  setTempRange: (range: any) => any;
  selectSince: (v: SingleValue<SinceType>) => any;
  onFilter: () => any;
}
export default function SelectRangeComponent(props: Props) {
  return (
    <div className="d-flex align-items-center">
      <span className="opacity-75">Seleccionar rango:</span>
      <DateRangePicker
        value={props.tempRange}
        onChange={props.setTempRange}
        clearIcon={null}
        locale="es-ES"
        maxDate={new Date()}
        className="text-dark text-opacity-50 ms-3"
      />
      <Select
        options={props.sinceOptions}
        value={props.sinceSelected}
        onChange={props.selectSince}
        className="ms-3 text-dark text-opacity-75 select-input"
        classNames={{
          option: (state) =>
            state.isSelected
              ? "bg-primary"
              : state.isFocused
              ? "bg-primary bg-opacity-25"
              : "",
        }}
      />
      <button
        className="ms-4 btn btn-primary text-white"
        onClick={props.onFilter}
      >
        Filtrar
      </button>
    </div>
  );
}
