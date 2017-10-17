import { bindCallback } from '../internal/bindcallback';

export async function find<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): Promise<S | undefined>;
export async function find<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): Promise<T | undefined>;
export async function find<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): Promise<T | undefined> {
  const fn = bindCallback(predicate, thisArg, 2);
  let i = 0;

  for await (let item of source) {
    if (await fn(item, i++)) {
      return item;
    }
  }
  return undefined;
}
