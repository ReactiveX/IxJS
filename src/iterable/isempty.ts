export function isEmpty<T>(source: Iterable<T>): boolean {
  for (const _ of source) {
    return false;
  }
  return true;
}
