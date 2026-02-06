export function startOfTodayISO() {
  const d = new Date();
  d.setHours(0,0,0,0);
  return d.toISOString();
}
export function endOfTodayISO() {
  const d = new Date();
  d.setHours(23,59,59,999);
  return d.toISOString();
}
