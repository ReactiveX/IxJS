import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { distinctUntilChanged } from '../../asynciterable/operators/distinctuntilchanged';
import { DistinctOptions } from '../../asynciterable/operators/distinctoptions';

/**
 * @ignore
 */
export function distinctUntilChangedProto<TSource, TKey>(
  this: AsyncIterableX<TSource>,
  options?: DistinctOptions<TSource, TKey>
): AsyncIterableX<TSource> {
  return distinctUntilChanged(options)(this);
}

AsyncIterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}
