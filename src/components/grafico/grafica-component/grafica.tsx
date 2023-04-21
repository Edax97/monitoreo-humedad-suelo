import React from "react";
import { DataXY, DatumVisType } from "../../state-provider/state-provider";
import {
  Axis, // any of these can be non-animated equivalents
  Grid,
  LineSeries,
  XYChart,
  //Tooltip,
} from "@visx/xychart";
interface Props {
  dataVis: DatumVisType[];
}

const accesors = {
  xAccessor: (d: DataXY) => d.time,
  yAccessor: (d: DataXY) => d.h,
};

export function Grafica(props: Props) {
  return (
    <div>
      <XYChart
        height={400}
        xScale={{ type: "linear" }}
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
          <Grid rows={false} />,
        ]}
      />
    </div>
  );
}
