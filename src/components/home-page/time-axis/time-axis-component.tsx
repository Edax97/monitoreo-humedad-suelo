import { AxisBottom } from "@visx/axis";
import { scaleTime } from "@visx/scale";

interface Props {
  width: number;
  hMargin: number;
  domain: Date[];
}

export default function TimeAxisComponent(props: Props) {
  const scaleFunction = scaleTime({
    domain: props.domain,
    range: [props.hMargin, props.width - props.hMargin],
    clamp: true,
  });

  return (
    <svg width={props.width} height={40}>
      <AxisBottom scale={scaleFunction} />
    </svg>
  );
}
