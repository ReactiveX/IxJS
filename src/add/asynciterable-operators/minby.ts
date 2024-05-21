import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { minBy } from '../../asynciterable/minby.js';
import { ExtremaOptions } from '../../asynciterable/extremaoptions.js';

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
