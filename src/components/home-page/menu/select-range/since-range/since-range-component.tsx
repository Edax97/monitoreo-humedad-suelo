import React from "react";
import Select from "react-select";
export type SinceType = { value: number; label: string };

interface Props {
  sinceValue: SinceType;
  setSinceValue: (i: any) => any;
  sinceOptions: SinceType[];
  selectSince: () => any;
}
export default function SinceRangeComponent(props: Props) {
  return (
    <form className="my-2 mx-3" style={{ width: "12rem" }}>
      <div className="mb-3 d-flex gap-2 align-items-center">
        <label>Últimos </label>
        <Select
          options={props.sinceOptions}
          onChange={props.setSinceValue}
          value={props.sinceValue}
          classNames={{
            option: (state) =>
              state.isSelected
                ? "bg-primary"
                : state.isFocused
                ? "bg-primary bg-opacity-25"
                : "",
          }}
        />
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.selectSince}
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}
