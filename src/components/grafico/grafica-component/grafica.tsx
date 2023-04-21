import React from "react";
import { DataXY, SeriesVisType } from "../../state-provider/state-provider";
import {
  Axis, // any of these can be non-animated equivalents
  Grid,
  LineSeries,
  XYChart,
  //Tooltip,
} from "@visx/xychart";
interface Props {
  dataVis: SeriesVisType[];
}

const accesors = {
  xAccessor: (d: DataXY) => d?.time,
  yAccessor: (d: DataXY) => d?.h,
};

export function Grafica(props: Props) {
  return (
    <div>
      <XYChart
        height={400}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
        children={[
          ...props.dataVis.map((dVis) => (
            <LineSeries
              dataKey={`depth-${dVis.level}`}
              data={dVis.data}
              color={dVis.color}
              {...accesors}
            />
          )),
          <Axis orientation="bottom" />,
          <Axis orientation="right" />,
          <Axis orientation="left" />,
          <Grid rows={false} strokeDasharray={"5"} />,
        ]}
      />
    </div>
  );
}
