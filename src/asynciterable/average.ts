import { identityAsync } from '../internal/identity';

export async function average(
    source: Iterable<number | PromiseLike<number>> | AsyncIterable<number>,
    selector?: (x: number) => number | Promise<number>): Promise<number>;
export async function average<TSource>(
    source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
    selector?: (x: TSource) => number | Promise<number>): Promise<number>;
export async function average(
    source: AsyncIterable<any>,
    selector: (x: any) => number | Promise<number> = identityAsync): Promise<number> {
  let sum = 0;
  let count = 0;
  for await (let item of source) {
    sum += await selector(item);
    count++;
  }

  if (count === 0) {
    throw new Error('Empty collection');
  }

  return sum / count;
}
