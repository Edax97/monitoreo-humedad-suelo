import React from "react";
import ResizeObserver from "resize-observer-polyfill";
//import { DataXY, SeriesVisType } from "../../state-provider/GraficaProvider";
import {
  Annotation,
  AnnotationCircleSubject,
  AnnotationLabel,
  AreaSeries,
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
  //Tooltip,
} from "@visx/xychart";

import "./grafico-component.scss";
import { curveMonotoneX, timeFormat } from "d3";
import {
  DatumSensor,
  SeriesVisType,
} from "../../../state-provider/GraficasProvider";

export interface AreaType {
  label: string;
  showLabel: boolean;
  color: string;
  data: { x: Date | undefined; y: number }[];
}

export interface AccessorsType {
  xAccessor: (d: DatumSensor) => Date | null;
  yAccessor: (d: DatumSensor) => number;
}

interface Props {
  dataVis: SeriesVisType[];
  areaList?: AreaType[];
  unidad: string;
  width: number;
  height: number;
  accessors: AccessorsType;
  timeDomain: [Date, Date];
}

const axisColor = "rgb(135, 142, 155, 1)";
const gridColor = "rgba(135, 142, 155, 0.2)";

export function Grafica(props: Props) {
  const showAnnotations = props.width > 560;
  const bottom = props.width > 560 ? 20 : 5;

  return (
    <XYChart
      resizeObserverPolyfill={ResizeObserver}
      height={props.height}
      width={props.width}
      margin={{
        top: 10,
        bottom: bottom,
        right: 40,
        left: 40,
      }}
      xScale={{ type: "time", domain: props.timeDomain }}
      yScale={{ type: "linear", zero: false }}
    >
      {props.areaList?.map((area) => (
        <>
          <AreaSeries
            key={area.label}
            data={area.data}
            xAccessor={(d) => d.x}
            yAccessor={(d) => d.y}
            dataKey={area.label}
            fillOpacity="1"
            renderLine={false}
            fill={area.color}
          />
          {area.showLabel && showAnnotations && (
            <Annotation
              key={`a-${area.label}`}
              datum={area.data[1]}
              xAccessor={(d) => d.x}
              yAccessor={(d) => d.y}
              dx={0}
              dy={0}
            >
              <AnnotationLabel
                title={`${area.label}`}
                verticalAnchor="start"
                showAnchorLine={false}
                showBackground={false}
                width={150}
                titleFontSize={12}
                titleFontWeight={200}
                backgroundPadding={{ left: -150, top: 0 }}
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
      ))}
      <AnimatedAxis
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
      />
      <AnimatedAxis
        orientation="top"
        stroke={axisColor}
        strokeWidth={1}
        hideTicks={true}
        tickLabelProps={{
          display: "none",
        }}
      />
      <AnimatedAxis
        orientation="right"
        stroke={axisColor}
        tickStroke={axisColor}
        numTicks={4}
        strokeWidth={1}
        tickLabelProps={() => ({
          fill: axisColor,
          verticalAnchor: "end",
          fontSize: 10,
        })}
        hideZero={true}
        //rangePadding={{ start: 0, end: -10 }}
      />
      <AnimatedAxis
        orientation="left"
        stroke={axisColor}
        tickStroke={axisColor}
        numTicks={4}
        strokeWidth={1}
        tickLabelProps={() => ({
          fill: axisColor,
          verticalAnchor: "end",
          fontSize: 11,
        })}
        hideZero={true}
      />
      <AnimatedGrid rows={false} strokeDasharray={"3 7"} stroke={gridColor} />,
      {props.dataVis.map((dVis) => {
        const lastDatum = dVis.trama.slice(-1)[0];
        const lastDatumLabel = `${props.accessors.yAccessor(lastDatum)}`;
        const labelSize = lastDatumLabel.length;
        const hPadding = 5;

        if (!dVis.showSeries) return null;
        return (
          <>
            <AnimatedLineSeries
              curve={curveMonotoneX}
              key={dVis.profundidad}
              dataKey={`d-${dVis.profundidad}`}
              data={dVis.trama}
              colorAccessor={() => dVis.color}
              {...props.accessors}
            />
            {lastDatum && showAnnotations && (
              <Annotation
                key={`ld-${dVis.profundidad}`}
                datum={lastDatum}
                {...props.accessors}
                dx={4}
                dy={0}
              >
                <AnnotationCircleSubject stroke={dVis.color} radius={3} />
                <AnnotationLabel
                  title={lastDatumLabel}
                  verticalAnchor="start"
                  showAnchorLine={false}
                  maxWidth={labelSize * 6 + 2 * hPadding - 10}
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
      })}
      <Tooltip<DatumSensor>
        renderTooltip={(tooltip) => {
          const datumBySeries = tooltip.tooltipData?.datumByKey;
          if (!datumBySeries) return null;
          return (
            <div className="p-2 fw-normal">
              {props.dataVis.map((s, j) => {
                const keyData = datumBySeries[`d-${s.profundidad}`];
                if (!keyData) return null;
                return (
                  <div key={`tt-${s.profundidad}`}>
                    <div className="mb-1" style={{ color: s.color }}>
                      {`${s.profundidad} cm: ${props.accessors.yAccessor(
                        keyData.datum
                      )} ${props.unidad}`}
                    </div>
                    {j === props.dataVis.length - 1 ? (
                      <div>
                        {timeFormat("%d-%m-%y %H:%M")(keyData.datum.fecha)}
                      </div>
                    ) : null}
                  </div>
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
            (s) => `d-${s.profundidad}` === glyph.key
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
      />
    </XYChart>
  );
}
