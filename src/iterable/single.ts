export function single<T, S extends T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => value is S
): S | undefined;
export function single<T>(
  source: Iterable<T>,
  predicate?: (value: T, index: number) => boolean
): T | undefined;
export function single<T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => boolean = () => true
): T | undefined {
  let result: T | undefined;
  let hasResult = false;
  let i = 0;
  for (const item of source) {
    if (hasResult && predicate(item, i++)) {
      throw new Error('More than one element was found');
    }
    if (predicate(item, i++)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}
