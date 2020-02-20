export function some<T, S extends T>(
  source: Iterable<T>,
  comparer: (value: T, index: number) => value is S
): boolean;
export function some<T>(
  source: Iterable<T>,
  comparer: (value: T, index: number) => boolean
): boolean;
export function some<T>(
  source: Iterable<T>,
  comparer: (value: T, index: number) => boolean
): boolean {
  let i = 0;
  for (const item of source) {
    if (comparer(item, i++)) {
      return true;
    }
  }
  return false;
}
