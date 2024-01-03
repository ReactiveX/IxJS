import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { distinct } from '../../asynciterable/operators/distinct.js';
import { DistinctOptions } from '../../asynciterable/operators/distinctoptions.js';

/**
 * @ignore
 */
export function distinctProto<TSource, TKey>(
  this: AsyncIterableX<TSource>,
  options?: DistinctOptions<TSource, TKey>
): AsyncIterableX<TSource> {
  return distinct(options)(this);
}

AsyncIterableX.prototype.distinct = distinctProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    distinct: typeof distinctProto;
  }
}
