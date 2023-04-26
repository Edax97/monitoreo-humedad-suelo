import React from "react";
import ResizeObserver from "resize-observer-polyfill";
import {
  DataXY,
  SeriesVisType,
  useStateContext,
} from "../../state-provider/state-provider";
import {
  Annotation,
  AnnotationCircleSubject,
  AnnotationLabel,
  AreaSeries,
  Axis, // any of these can be non-animated equivalents
  Grid,
  LineSeries,
  Tooltip,
  XYChart,
  //Tooltip,
} from "@visx/xychart";

import "./grafica.scss";

export interface AreaType {
  label: string;
  showLabel: boolean;
  color: string;
  data: DataXY[];
}

interface Props {
  dataVis: SeriesVisType[];
  areaList: AreaType[];
}

const accesors = {
  xAccessor: (d: DataXY) => d?.time,
  yAccessor: (d: DataXY) => d?.h,
};
const axisColor = "rgb(135, 142, 155)";
const gridColor = "rgba(135, 142, 155, 0.3)";
const backColor = "hsl(82, 95%, 95%)";

export function Grafica(props: Props) {
  return (
    <div className="chart-box" style={{ backgroundColor: backColor }}>
      <XYChart
        resizeObserverPolyfill={ResizeObserver}
        height={400}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
        children={[
          ...props.areaList.map((area) => (
            <>
              <AreaSeries
                data={area.data}
                {...accesors}
                dataKey={area.label}
                fillOpacity="1"
                renderLine={false}
                fill={area.color}
              />
              {area.showLabel && (
                <Annotation datum={area.data[1]} {...accesors}>
                  <AnnotationLabel
                    title={`${area.label}`}
                    verticalAnchor="start"
                    showAnchorLine={false}
                    showBackground={false}
                    maxWidth={25}
                    titleFontSize={12}
                    titleFontWeight={200}
                    backgroundPadding={{ left: 5, top: 2 }}
                    backgroundProps={{
                      height: 18,
                    }}
                    titleProps={{
                      fill: axisColor,
                    }}
                  />
                </Annotation>
              )}
            </>
          )),

          <Axis
            orientation="bottom"
            stroke={axisColor}
            tickStroke={axisColor}
            strokeWidth={1}
            tickLabelProps={() => ({
              fill: axisColor,
              verticalAnchor: "middle",
              fontSize: 10,
            })}
          />,
          <Axis
            orientation="right"
            stroke={axisColor}
            tickStroke={axisColor}
            strokeWidth={1}
            tickLabelProps={() => ({
              fill: axisColor,
              verticalAnchor: "end",
              fontSize: 10,
            })}
            hideZero={true}
          />,
          <Axis
            orientation="left"
            stroke={axisColor}
            tickStroke={axisColor}
            strokeWidth={1}
            tickLabelProps={() => ({
              fill: axisColor,
              verticalAnchor: "end",
              fontSize: 10,
            })}
            hideZero={true}
          />,

          <Grid rows={false} strokeDasharray={"3 7"} stroke={gridColor} />,

          ...props.dataVis.map((dVis) => {
            const lastDatum = dVis.data.find(
              (d) => d.time.toString() === dVis.lastDatum?.toString()
            );
            return (
              <>
                <LineSeries
                  dataKey={`d-${dVis.level}`}
                  data={dVis.data}
                  colorAccessor={() => dVis.color}
                  {...accesors}
                />
                {lastDatum && (
                  <Annotation datum={lastDatum} {...accesors} dx={4} dy={0}>
                    <AnnotationCircleSubject stroke={dVis.color} radius={3} />
                    <AnnotationLabel
                      title={`${lastDatum.h}`}
                      verticalAnchor="start"
                      showAnchorLine={false}
                      maxWidth={25}
                      titleFontSize={12}
                      backgroundPadding={{ left: 5, top: 2 }}
                      backgroundProps={{
                        height: 18,
                        fill: dVis.color,
                        rx: 3,
                        ry: 3,
                      }}
                      titleProps={{
                        fill: "white",
                      }}
                    />
                  </Annotation>
                )}
              </>
            );
          }),

          <Tooltip<DataXY>
            renderTooltip={(tooltip) => {
              return null;
              /* (
                  <div>
                    {" "}
                    Hi {`${tooltip.tooltipData?.nearestDatum?.datum.time}`}{" "}
                  </div>
                ) */
            }}
            showHorizontalCrosshair={true}
            showVerticalCrosshair={true}
            snapTooltipToDatumX={false}
            snapTooltipToDatumY={false}
          />,
        ]}
      />
    </div>
  );
}
