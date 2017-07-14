export function isEmpty<T>(source: Iterable<T>): boolean {
  for (let _ of source) {
    return false;
  }
  return true;
}
