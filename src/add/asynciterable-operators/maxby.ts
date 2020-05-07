import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { maxBy } from '../../asynciterable/maxby';
import { ExtremaByOptions } from '../../asynciterable/_extremaby';

/**
 * @ignore
 */
export function maxByProto<TSource, TKey>(
  this: AsyncIterable<TSource>,
  selector: (item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  options?: ExtremaByOptions<TKey>
): Promise<TSource[]> {
  return maxBy(this, selector, options);
}

AsyncIterableX.prototype.maxBy = maxByProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    maxBy: typeof maxByProto;
  }
}
