import { IterableX } from '../../iterable/iterablex';
import { distinct } from '../../iterable/operators/distinct';
import { DistinctOptions } from '../..//iterable/operators/distinctoptions';

/**
 * @ignore
 */
export function distinctProto<TSource, TKey>(
  this: IterableX<TSource>,
  options?: DistinctOptions<TSource, TKey>
): IterableX<TSource> {
  return distinct(options)(this);
}

IterableX.prototype.distinct = distinctProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    distinct: typeof distinctProto;
  }
}
