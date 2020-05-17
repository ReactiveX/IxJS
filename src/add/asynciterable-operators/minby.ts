import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { minBy } from '../../asynciterable/minby';
import { ExtremaOptions } from '../../asynciterable/extremaoptions';

/**
 * @ignore
 */
export function minByProto<TSource, TKey>(
  this: AsyncIterable<TSource>,
  options?: ExtremaOptions<TSource, TKey>
): Promise<TSource[]> {
  return minBy(this, options);
}

AsyncIterableX.prototype.minBy = minByProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    minBy: typeof minByProto;
  }
}
