import { AxisBottom } from "@visx/axis";
import { scaleTime } from "@visx/scale";

interface Props {
  width: number;
  marginS: number;
  marginE: number;
  domain: Date[];
}

export default function TimeAxisComponent(props: Props) {
  const scaleFunction = scaleTime({
    domain: props.domain,
    range: [props.marginS, props.width - props.marginE],
    clamp: true,
  });

  return (
    <svg width={props.width} height={40}>
      <AxisBottom scale={scaleFunction} />
    </svg>
  );
}
