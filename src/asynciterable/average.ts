import { identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';

export async function average(
  source: AsyncIterable<number>,
  selector?: (x: number, signal?: AbortSignal) => number | Promise<number>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<number>;
export async function average<TSource>(
  source: AsyncIterable<TSource>,
  selector?: (x: TSource, signal?: AbortSignal) => number | Promise<number>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<number>;
export async function average(
  source: AsyncIterable<any>,
  selector: (x: any, signal?: AbortSignal) => number | Promise<number> = identityAsync,
  thisArg?: any,
  signal?: AbortSignal
): Promise<number> {
  let sum = 0;
  let count = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    sum += await selector.call(thisArg, item, signal);
    count++;
  }

  if (count === 0) {
    throw new Error('Empty collection');
  }

  return sum / count;
}
