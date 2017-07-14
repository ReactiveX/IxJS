/**
 * @ignore
 */
export function toInteger (value: any): number {
  const number = Number(value);
  if (isNaN(number)) { return 0; }
  if (number === 0 || !isFinite(number)) { return number; }
  return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
}
