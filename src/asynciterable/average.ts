import { identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';

/**
 * Computes the average of the async-iterable sequence.
 * @param source The source async-iterable sequence to compute the average.
 * @param selector The selector used to get the value to average.
 * @param thisArg An optional thisArg for the selector.
 * @param signal An optional abort signal to cancel the operation at any time.
 */
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
