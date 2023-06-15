import React from "react";
import Select, { SingleValue } from "react-select";

export interface SelectType {
  value: string;
  label: string;
}

interface Props {
  selected: SelectType | null;
  options: SelectType[];
  onSelect: (v: SingleValue<SelectType>) => any;
  label?: string;
}
export default function SelectValue(props: Props) {
  return (
    <div className="d-flex align-items-center gap-3">
      {props.label && <div className="opacity-75">{props.label}: </div>}
      <Select
        options={props.options}
        value={props.selected}
        onChange={props.onSelect}
        className="text-dark text-opacity-75 select-input"
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
  );
}
