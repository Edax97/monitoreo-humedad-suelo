import React from "react";
import ResizeObserver from "resize-observer-polyfill";
import { DataXY, SeriesVisType } from "../../state-provider/state-provider";
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
import { timeFormat } from "d3";

export interface AreaType {
  label: string;
  showLabel: boolean;
  color: string;
  data: DataXY[];
}

interface Props {
  dataVis: SeriesVisType[];
  areaList: AreaType[];
  width: number;
  height: number;
}

const accesors = {
  xAccessor: (d: DataXY) => d?.time,
  yAccessor: (d: DataXY) => d?.h,
};
const axisColor = "rgb(135, 142, 155)";
const gridColor = "rgba(135, 142, 155, 0.3)";

export function Grafica(props: Props) {
  return (
    <XYChart
      resizeObserverPolyfill={ResizeObserver}
      height={props.height}
      width={props.width}
      margin={{
        top: 20,
        bottom: 10,
        right: 60,
        left: 60,
      }}
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
                  titleFontSize={14}
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
            display: "none",
            verticalAnchor: "middle",
            fontSize: 10,
          })}
          hideTicks={true}
        />,
        <Axis
          orientation="top"
          stroke={axisColor}
          strokeWidth={1}
          hideTicks={true}
          tickLabelProps={{
            display: "none",
          }}
          top={10}
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
          rangePadding={{ start: 0, end: -10 }}
        />,
        <Axis
          orientation="left"
          label="Humedad (%)"
          labelProps={{
            fill: axisColor,
            fontSize: 16,
            textAnchor: "middle",
          }}
          labelOffset={29}
          stroke={axisColor}
          tickStroke={axisColor}
          strokeWidth={1}
          tickLabelProps={() => ({
            fill: axisColor,
            verticalAnchor: "end",
            fontSize: 11,
          })}
          hideZero={true}
          rangePadding={{ start: 0, end: -10 }}
        />,

        <Grid rows={false} strokeDasharray={"3 7"} stroke={gridColor} />,

        ...props.dataVis.map((dVis) => {
          const lastDatum = dVis.data.find(
            (d) => d.time.toString() === dVis.lastDatum?.toString()
          );
          const lastDatumLabel = `${lastDatum?.h}`;
          const labelSize = lastDatumLabel.length;
          const hPadding = 5;

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
                    maxWidth={labelSize * 3.5 + 2 * hPadding}
                    titleFontSize={15}
                    backgroundPadding={{ left: hPadding, top: 3 }}
                    backgroundProps={{
                      height: 24,
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
            const datumBySeries = tooltip.tooltipData?.datumByKey;
            return (
              <div className="p-2 fw-normal">
                {props.dataVis.map((s, j) => {
                  const datum = datumBySeries
                    ? datumBySeries[`d-${s.level}`].datum
                    : null;
                  return (
                    <>
                      <div className="mb-1" style={{ color: s.color }}>
                        {`${s.level} cm: ${datum?.h}`}
                      </div>
                      {j === props.dataVis.length - 1 ? (
                        <div>{timeFormat("%d-%m-%y %H:%M")(datum?.time)}</div>
                      ) : null}
                    </>
                  );
                })}
              </div>
            );
          }}
          showHorizontalCrosshair={true}
          showVerticalCrosshair={true}
          verticalCrosshairStyle={{ strokeWidth: 1 }}
          horizontalCrosshairStyle={{ strokeWidth: 1 }}
          snapTooltipToDatumX={true}
          showSeriesGlyphs={true}
          renderGlyph={(glyph) => {
            const glyphColor = props.dataVis.find(
              (s) => `d-${s.level}` === glyph.key
            )?.color;

            return glyphColor ? (
              <g>
                <circle
                  cx={0}
                  cy={0}
                  r={4}
                  fill="white"
                  stroke={glyphColor}
                  strokeWidth={2}
                ></circle>
              </g>
            ) : null;
          }}
        />,
      ]}
    />
  );
}
