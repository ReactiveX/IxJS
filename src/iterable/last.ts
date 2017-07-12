export function last<T>(source: Iterable<T>, fn: (value: T) => boolean = () => true): T | undefined {
  let result: T | undefined;
  for (let item of source) {
    if (fn(item)) {
      result = item;
    }
  }

  return result;
}
