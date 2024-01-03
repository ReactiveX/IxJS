import { IterableX } from '../../iterable/iterablex.js';
import { distinctUntilChanged } from '../../iterable/operators/distinctuntilchanged.js';
import { DistinctOptions } from '../../iterable/operators/distinctoptions.js';

/**
 * @ignore
 */
export function distinctUntilChangedProto<TSource, TKey>(
  this: IterableX<TSource>,
  options?: DistinctOptions<TSource, TKey>
): IterableX<TSource> {
  return distinctUntilChanged(options)(this);
}

IterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}
