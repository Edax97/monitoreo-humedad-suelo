import React, { CSSProperties } from "react";
import Select, { SingleValue } from "react-select";

export interface SelectType {
  value: string;
  label: string;
}

interface Props {
  selected: SelectType | null;
  options: SelectType[];
  onSelect: (v: SingleValue<SelectType>) => any;
  containerStyles?: CSSProperties;
}
export default function SelectValue(props: Props) {
  return (
    <Select
      options={props.options}
      value={props.selected}
      onChange={props.onSelect}
      className="text-opacity-75"
      classNames={{
        option: (state) =>
          state.isSelected
            ? "bg-primary"
            : state.isFocused
            ? "bg-primary bg-opacity-25"
            : "",
      }}
      styles={{
        container: (style) => ({
          ...style,
          ...props.containerStyles,
          fontSize: "small",
        }),
      }}
    />
  );
}
