import { bindCallback } from '../util/bindcallback';

export async function findIndex<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): Promise<number> {
  const fn = bindCallback(predicate, thisArg, 2);
  let i = 0;

  for await (const item of source) {
    if (await fn(item, i++)) {
      return i;
    }
  }
  return -1;
}
