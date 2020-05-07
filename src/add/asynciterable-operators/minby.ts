import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { minBy } from '../../asynciterable/minby';
import { ExtremaByOptions } from '../../asynciterable/_extremaby';

/**
 * @ignore
 */
export function minByProto<TSource, TKey>(
  this: AsyncIterable<TSource>,
  selector: (item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  options?: ExtremaByOptions<TKey>
): Promise<TSource[]> {
  return minBy(this, selector, options);
}

AsyncIterableX.prototype.minBy = minByProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    minBy: typeof minByProto;
  }
}
