export function single<T>(source: Iterable<T>, fn: (value: T) => boolean = () => true): T | undefined {
  let result: T | undefined;
  let hasResult = false;
  for (let item of source) {
    if (hasResult && fn(item)) {
      throw new Error('More than one element was found');
    }
    if (fn(item)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}
