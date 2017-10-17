export function last<T, S extends T>(
  source: Iterable<T>,
  predicate?: (value: T, index: number) => value is S
): S | undefined;
export function last<T>(
  source: Iterable<T>,
  predicate?: (value: T, index: number) => boolean
): T | undefined;
export function last<T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => boolean = () => true
): T | undefined {
  let i = 0,
    result: T | undefined;
  for (let item of source) {
    if (predicate(item, i++)) {
      result = item;
    }
  }

  return result;
}
