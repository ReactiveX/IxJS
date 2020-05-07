import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { distinct } from '../../asynciterable/operators/distinct';
import { DistinctOptions } from '../../asynciterable/operators/distinctoptions';

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
