import { timeFormat } from "d3";

export function moverFecha(d: Date, days: number) {
  const dateUpdated = d.getDate() + days;
  d.setDate(dateUpdated);
  return d;
}
type RangeType = { startDate: Date; endDate: Date };
export function extendRange(r: RangeType): RangeType {
  const startDate = `${timeFormat("%Y-%m-%d")(r.startDate)} 00:00:00`;
  const endDate = `${timeFormat("%Y-%m-%d")(r.endDate)} 23:59:59`;
  return { startDate: new Date(startDate), endDate: new Date(endDate) };
}

type RangeArrayType = [Date, Date];
export function extendRangeArray(r: RangeArrayType): RangeArrayType {
  const startDate = `${timeFormat("%Y-%m-%d")(r[0])} 00:00:00`;
  const endDate = `${timeFormat("%Y-%m-%d")(r[1])} 23:59:59`;
  return [new Date(startDate), new Date(endDate)];
}
