export function moverFecha(d: Date, days: number) {
  const dateUpdated = d.getDate() + days;
  d.setDate(dateUpdated);
  return d;
}
