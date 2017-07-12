export function first<T>(source: Iterable<T>, fn: (value: T) => boolean = () => true): T | undefined {
  for (let item of source) {
    if (fn(item)) {
      return item;
    }
  }

  return undefined;
}
